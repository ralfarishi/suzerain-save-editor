import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";

import "./styles.css";

function RoutePendingSkeleton() {
	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
			<div className="h-8 w-56 rounded-lg bg-zinc-200 dark:bg-slate-800 animate-shimmer mb-2" />
			<div className="h-4 w-80 rounded bg-zinc-200 dark:bg-slate-800 animate-shimmer mb-8" />
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{Array.from({ length: 6 }).map((_, idx) => (
					<div
						key={idx}
						className="h-36 rounded-xl border border-warm-border-light dark:border-warm-border-dark bg-warm-surface-light dark:bg-warm-surface-dark p-5 flex flex-col justify-between"
					>
						<div className="flex items-center gap-2">
							<div className="h-5 w-20 rounded bg-zinc-200 dark:bg-slate-800 animate-shimmer" />
							<div className="h-5 w-16 rounded bg-zinc-200 dark:bg-slate-800 animate-shimmer" />
						</div>
						<div className="space-y-2">
							<div className="h-5 w-3/4 rounded bg-zinc-200 dark:bg-slate-800 animate-shimmer" />
							<div className="h-4 w-full rounded bg-zinc-200 dark:bg-slate-800 animate-shimmer" />
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

// Create a new router instance
const router = createRouter({
	routeTree,
	defaultPreloadStaleTime: 0,
	scrollRestoration: true,
	defaultPendingComponent: RoutePendingSkeleton,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

// Render the app
const rootElement = document.getElementById("root");
if (!rootElement) {
	throw new Error("Root element not found");
}

createRoot(rootElement).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
);
