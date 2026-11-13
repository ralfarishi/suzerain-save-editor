import { useState, useMemo, useEffect } from "react";
import { communityPathways } from "../../data/pathways";
import { PathwayCard } from "./PathwayCard";

const FILTER_CONFIG: Record<"All" | "Sordland" | "Rizia" | "Special", { label: string; iconSymbol?: string }> = {
	All: { label: "All Guides", iconSymbol: "◈" },
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

	const counts = useMemo(() => {
		return {
			All: communityPathways.length,
			Sordland: communityPathways.filter((p) => p.tags.includes("Sordland")).length,
			Rizia: communityPathways.filter((p) => p.tags.includes("Rizia")).length,
			Special: communityPathways.filter((p) => p.tags.includes("Special")).length,
		};
	}, []);

	const filteredPathways = useMemo(() => {
		if (activeFilter === "All") return communityPathways;
		return communityPathways.filter((pathway) => pathway.tags.includes(activeFilter));
	}, [activeFilter]);

	// Scroll to and briefly highlight the target pathway when a highlightId is provided.
	useEffect(() => {
		setHighlightedId(highlightId);
		if (!highlightId) return;

		let clearId: ReturnType<typeof setTimeout> | null = null;
		const scrollId = setTimeout(() => {
			const el = document.getElementById(highlightId);
			if (el) {
				el.scrollIntoView({ behavior: "smooth", block: "start" });
			}
			clearId = setTimeout(() => setHighlightedId(undefined), 2500);
		}, 150);

		return () => {
			clearTimeout(scrollId);
			if (clearId) clearTimeout(clearId);
		};
	}, [highlightId]);

	return (
		<div className="space-y-6">
			{/* Filter Controls - Official State Dossier Tabs */}
			<div className="flex flex-nowrap sm:flex-wrap overflow-x-auto sm:overflow-visible no-scrollbar gap-2 sm:gap-2.5 mb-6 sm:mb-8 pb-3 sm:pb-6 border-b-2 border-slate-200 dark:border-white/10">
				{(["All", "Sordland", "Rizia", "Special"] as const).map((filter) => {
					const config = FILTER_CONFIG[filter];
					const count = counts[filter];

					return (
						<button
							type="button"
							key={filter}
							onClick={() => setActiveFilter(filter)}
							className={`
								flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg font-serif font-bold uppercase tracking-wider sm:tracking-widest text-[11px] sm:text-xs transition-all border-2 cursor-pointer whitespace-nowrap shrink-0
								${
									activeFilter === filter
										? "bg-brass text-slate-900 border-brass-light shadow-[0_3px_0_0_#684b06] -translate-y-0.5"
										: "bg-slate-100 dark:bg-black/30 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-white/10 hover:border-brass/50 hover:text-slate-900 dark:hover:text-white"
								}
							`}
						>
							{config.iconSymbol && <span className="text-sm leading-none">{config.iconSymbol}</span>}
							<span>{config.label}</span>
							<span
								className={`ml-1 text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${
									activeFilter === filter
										? "bg-slate-950/20 text-slate-950"
										: "bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-400"
								}`}
							>
								{count}
							</span>
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
