// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { useDialogBehavior } from "../useDialogBehavior";

function DialogHarness({
	open,
	onClose,
	lockScroll = true,
}: {
	open: boolean;
	onClose: () => void;
	lockScroll?: boolean;
}) {
	useDialogBehavior(open, onClose, { lockScroll });
	return open ? <div role="dialog">open</div> : null;
}

describe("useDialogBehavior", () => {
	beforeEach(() => {
		document.body.style.overflow = "auto";
	});

	it("closes only the topmost stacked dialog on Escape and preserves body overflow until last closes", () => {
		const closeOuter = vi.fn();
		const closeInner = vi.fn();

		const { rerender } = render(
			<>
				<DialogHarness open={true} onClose={closeOuter} />
				<DialogHarness open={false} onClose={closeInner} />
			</>
		);

		expect(document.body.style.overflow).toBe("hidden");

		rerender(
			<>
				<DialogHarness open={true} onClose={closeOuter} />
				<DialogHarness open={true} onClose={closeInner} />
			</>
		);

		expect(document.body.style.overflow).toBe("hidden");

		// First Escape closes only inner (topmost) dialog
		fireEvent.keyDown(window, { key: "Escape" });
		expect(closeInner).toHaveBeenCalledTimes(1);
		expect(closeOuter).not.toHaveBeenCalled();

		// Simulate inner closing while outer remains open
		rerender(
			<>
				<DialogHarness open={true} onClose={closeOuter} />
				<DialogHarness open={false} onClose={closeInner} />
			</>
		);

		expect(document.body.style.overflow).toBe("hidden");

		// Second Escape closes outer dialog
		fireEvent.keyDown(window, { key: "Escape" });
		expect(closeOuter).toHaveBeenCalledTimes(1);

		rerender(
			<>
				<DialogHarness open={false} onClose={closeOuter} />
				<DialogHarness open={false} onClose={closeInner} />
			</>
		);

		expect(document.body.style.overflow).toBe("auto");
	});
});
