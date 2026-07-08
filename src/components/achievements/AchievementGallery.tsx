import { useState, useMemo, useEffect, useRef } from "react";
import { steamAchievements } from "../../data/steam_achievements";
import { AchievementCard } from "./AchievementCard";
import { MagnifyingGlassIcon, TrophyIcon } from "@phosphor-icons/react";

export function AchievementGallery({ onNavigateToGuides }: { onNavigateToGuides: () => void }) {
	const [searchQuery, setSearchQuery] = useState("");
	const [displayLimit, setDisplayLimit] = useState(24);
	const observerTarget = useRef<HTMLDivElement>(null);

	const filtered = useMemo(() => {
		const query = searchQuery.toLowerCase();
		return steamAchievements
			.filter(
				(ach) =>
					ach.name.toLowerCase().includes(query) || ach.description.toLowerCase().includes(query),
			)
			.sort((a, b) => a.name.localeCompare(b.name));
	}, [searchQuery]);

	// Infinite Scroll Logic
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && displayLimit < filtered.length) {
					setDisplayLimit((prev) => prev + 24);
				}
			},
			{ threshold: 1.0 },
		);

		if (observerTarget.current) {
			observer.observe(observerTarget.current);
		}

		return () => observer.disconnect();
	}, [displayLimit, filtered.length]);

	const visibleAchievements = useMemo(() => {
		return filtered.slice(0, displayLimit);
	}, [filtered, displayLimit]);

	return (
		<div className="space-y-6">
			<div className="relative">
				<MagnifyingGlassIcon weight="bold" className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" />
				<input
					type="text"
					placeholder="QUERY ACHIEVEMENT DATABASE..."
					className="w-full pl-16 pr-6 py-4 bg-amber-50 dark:bg-black/40 border-2 border-slate-300 dark:border-white/20 shadow-inner font-mono font-bold uppercase placeholder:text-slate-400 focus:border-brass dark:focus:border-brass-light outline-none text-slate-900 dark:text-slate-100 transition-colors bg-noise"
					value={searchQuery}
					onChange={(e) => {
						setSearchQuery(e.target.value);
						setDisplayLimit(24);
					}}
				/>
				<div className="absolute right-5 top-1/2 -translate-y-1/2 text-[10px] font-black tracking-widest uppercase text-slate-400 pointer-events-none hidden sm:block">
					[ INDEX_SEARCH ]
				</div>
			</div>

			{filtered.length === 0 ? (
				<div className="py-12 text-center text-slate-500 dark:text-slate-400">
					<TrophyIcon className="w-12 h-12 mx-auto mb-3 opacity-20" />
					<p>No achievements found matching "{searchQuery}"</p>
				</div>
			) : (
				<>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{visibleAchievements.map((ach) => (
							<AchievementCard 
								key={ach.name} 
								ach={ach} 
								onNavigateToGuides={onNavigateToGuides} 
							/>
						))}
					</div>
					
					{/* Infinite Scroll Anchor */}
					{displayLimit < filtered.length && (
						<div 
							ref={observerTarget} 
							className="h-20 flex items-center justify-center"
						>
							<div className="w-6 h-6 border-2 border-warm-accent border-t-transparent rounded-full animate-spin"></div>
						</div>
					)}
				</>
			)}
		</div>
	);
}
