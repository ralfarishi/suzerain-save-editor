import { useState, useMemo } from "react";
import { communityPathways } from "../../data/pathways";
import { PathwayCard } from "./PathwayCard";

export function PathwaysList() {
	const [activeFilter, setActiveFilter] = useState<"All" | "Sordland" | "Rizia" | "Special">("All");

	const filteredPathways = useMemo(() => {
		if (activeFilter === "All") return communityPathways;
		return communityPathways.filter((pathway) => pathway.tags.includes(activeFilter));
	}, [activeFilter]);

	return (
		<div className="space-y-6">
			{/* Filter Controls */}
			<div className="flex flex-wrap gap-3 mb-8 pb-6 border-b-2 border-slate-200 dark:border-white/10">
				{(["All", "Sordland", "Rizia", "Special"] as const).map((filter) => (
					<button type="button"
						key={filter}
						onClick={() => setActiveFilter(filter)}
						className={`
							px-6 py-3 font-bold uppercase tracking-widest text-xs transition-all border-2 border-slate-900 dark:border-white/20
							${
								activeFilter === filter
									? "bg-brass text-slate-900 shadow-[4px_4px_0px_0px_#8B6508] -translate-y-0.5"
									: "bg-white dark:bg-black/20 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.05)] active:translate-y-1 active:shadow-none"
							}
						`}
					>
						[ {filter} ]
					</button>
				))}
			</div>

			{/* List of Pathway Cards */}
			<div className="grid grid-cols-1 gap-8">
				{filteredPathways.map((pathway) => (
					<PathwayCard key={pathway.id} pathway={pathway} />
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
