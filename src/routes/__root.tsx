import { lazy, Suspense, useState, useEffect } from "react";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { SaveProvider } from "../context/SaveContext";
import { AppHeader } from "../components/layout/AppHeader";
import { DiffReviewDrawer } from "../components/layout/DiffReviewDrawer";
import { LiveAchievementToasts } from "../components/layout/ToastNotification";

const QuickSearchModal = lazy(() =>
	import("../components/layout/QuickSearchModal").then((m) => ({
		default: m.QuickSearchModal,
	})),
);

export const Route = createRootRoute({
	component: RootComponent,
});

function RootShell() {
	const [isQuickSearchOpen, setIsQuickSearchOpen] = useState(false);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
				e.preventDefault();
				setIsQuickSearchOpen((prev) => !prev);
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);

	return (
		<>
			<AppHeader onOpenQuickSearch={() => setIsQuickSearchOpen(true)} />
			<Outlet />
			{isQuickSearchOpen && (
				<Suspense fallback={null}>
					<QuickSearchModal
						isOpen={isQuickSearchOpen}
						onClose={() => setIsQuickSearchOpen(false)}
					/>
				</Suspense>
			)}
			<DiffReviewDrawer />
			<LiveAchievementToasts />
		</>
	);
}

function RootComponent() {
	return (
		<SaveProvider>
			<RootShell />
		</SaveProvider>
	);
}
