import { useState, useMemo, useEffect } from "react";
import { communityPathways } from "../../data/pathways";
import { PathwayCard } from "./PathwayCard";

const FILTER_CONFIG: Record<"All" | "Sordland" | "Rizia" | "Special", { label: string; iconSymbol?: string }> = {
	All: { label: "All Operations", iconSymbol: "🗂" },
	Sordland: { label: "Republic of Sordland", iconSymbol: "§" },
	Rizia: { label: "Kingdom of Rizia", iconSymbol: "✦" },
	Special: { label: "Special & Hidden", iconSymbol: "★" },
};

interface PathwaysListProps {
	/** When provided, scrolls to and briefly highlights this pathway card. */
	highlightId?: string;
}

export function PathwaysList({ highlightId }: PathwaysListProps = {}) {
	const [activeFilter, setActiveFilter] = useState<"All" | "Sordland" | "Rizia" | "Special">("All");
	const [highlightedId, setHighlightedId] = useState<string | undefined>(highlightId);

	const filteredPathways = useMemo(() => {
		if (activeFilter === "All") return communityPathways;
		return communityPathways.filter((pathway) => pathway.tags.includes(activeFilter));
	}, [activeFilter]);

	// Scroll to and briefly highlight the target pathway when a highlightId is provided.
	useEffect(() => {
		if (!highlightId) return;

		// Give the DOM time to render all cards
		const id = setTimeout(() => {
			const el = document.getElementById(highlightId);
			if (el) {
				el.scrollIntoView({ behavior: "smooth", block: "start" });
			}
			// Remove highlight ring after 2.5 s so it doesn't linger
			const clearId = setTimeout(() => setHighlightedId(undefined), 2500);
			return () => clearTimeout(clearId);
		}, 150);

		return () => clearTimeout(id);
	}, [highlightId]);

	return (
		<div className="space-y-6">
			{/* Filter Controls - Official State Dossier Tabs */}
			<div className="flex flex-wrap gap-2.5 mb-8 pb-6 border-b-2 border-slate-200 dark:border-white/10">
				{(["All", "Sordland", "Rizia", "Special"] as const).map((filter) => {
					const config = FILTER_CONFIG[filter];

					return (
						<button
							type="button"
							key={filter}
							onClick={() => setActiveFilter(filter)}
							className={`
								flex items-center gap-2 px-5 py-2.5 rounded-lg font-serif font-bold uppercase tracking-widest text-xs transition-all border-2 cursor-pointer
								${
									activeFilter === filter
										? "bg-brass text-slate-900 border-brass-light shadow-[0_3px_0_0_#684b06] -translate-y-0.5"
										: "bg-slate-100 dark:bg-black/30 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-white/10 hover:border-brass/50 hover:text-slate-900 dark:hover:text-white"
								}
							`}
						>
							{config.iconSymbol && <span className="text-sm leading-none">{config.iconSymbol}</span>}
							<span>{config.label}</span>
						</button>
					);
				})}
			</div>

			{/* List of Pathway Cards */}
			<div className="grid grid-cols-1 gap-8">
				{filteredPathways.map((pathway) => (
					<PathwayCard
						key={pathway.id}
						pathway={pathway}
						highlighted={highlightedId === pathway.id}
					/>
				))}
				
				{filteredPathways.length === 0 && (
					<div className="py-12 text-center text-slate-500 dark:text-slate-400 font-serif italic">
						No operational briefings found for this category.
					</div>
				)}
			</div>
		</div>
	);
}
