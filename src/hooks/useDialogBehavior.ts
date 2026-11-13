import { useEffect, useRef } from "react";

interface UseDialogBehaviorOptions {
	lockScroll?: boolean;
}

const openDialogStack: symbol[] = [];
const scrollLockStack: symbol[] = [];
let initialBodyOverflow: string | null = null;

function removeToken(stack: symbol[], token: symbol): void {
	const idx = stack.lastIndexOf(token);
	if (idx !== -1) {
		stack.splice(idx, 1);
	}
}

export function useDialogBehavior(
	isOpen: boolean,
	onClose: () => void,
	options: UseDialogBehaviorOptions = {}
) {
	const { lockScroll = true } = options;
	const onCloseRef = useRef(onClose);
	onCloseRef.current = onClose;
	const previousFocusRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		if (!isOpen) return;

		const token = Symbol("dialog");
		openDialogStack.push(token);

		previousFocusRef.current =
			document.activeElement instanceof HTMLElement ? document.activeElement : null;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				if (openDialogStack[openDialogStack.length - 1] !== token) return;
				e.stopPropagation();
				onCloseRef.current();
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		if (lockScroll) {
			scrollLockStack.push(token);
			if (scrollLockStack.length === 1) {
				initialBodyOverflow = document.body.style.overflow;
				document.body.style.overflow = "hidden";
			}
		}

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			removeToken(openDialogStack, token);
			if (lockScroll) {
				removeToken(scrollLockStack, token);
				if (scrollLockStack.length === 0 && initialBodyOverflow !== null) {
					document.body.style.overflow = initialBodyOverflow;
					initialBodyOverflow = null;
				}
			}
			const prevEl = previousFocusRef.current;
			if (prevEl && prevEl.isConnected) {
				prevEl.focus();
			}
			previousFocusRef.current = null;
		};
	}, [isOpen, lockScroll]);
}
