import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useCallback } from "react";
import { ArrowLeftIcon, GridFourIcon, ListDashesIcon, ShieldCheckIcon, MagicWandIcon } from "@phosphor-icons/react";
import { ThemeSwitcher, ThemeNavButton } from "../components/ThemeSwitcher";
import { PathwaysList } from "../components/achievements/PathwaysList";
import { AchievementGallery } from "../components/achievements/AchievementGallery";

export const Route = createFileRoute("/achievements")({
	validateSearch: (search: Record<string, unknown>) => ({
		pathway: typeof search.pathway === "string" ? search.pathway : undefined,
	}),
	component: AchievementsHub,
});

function AchievementsHub() {
	const { pathway } = Route.useSearch();
	// When deep-linked from the planner, ensure the guides tab is active
	const [activeTab, setActiveTab] = useState<"guides" | "gallery">(pathway ? "guides" : "guides");


	const handleNavigateToGuides = useCallback(() => {
		setActiveTab("guides");
	}, []);

	return (
		<div className="min-h-screen">
			{/* Desktop Header - Hidden on Mobile */}
			<header className="hidden md:block bg-slate-50 dark:bg-warm-surface-dark border-b-4 border-slate-300 dark:border-white/10 sticky top-0 z-50 bg-noise shadow-md">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
					<div className="flex items-center gap-3">
						<h1 className="text-xl font-serif font-black uppercase tracking-widest text-slate-900 dark:text-white">
							Sordland <span className="text-brass">Registry</span>
						</h1>
					</div>
					<div className="flex items-center gap-6">
						<Link
							to="/planner"
							className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-warm-accent transition-colors"
						>
							<MagicWandIcon className="w-4 h-4" />
							Planner
						</Link>
						<Link
							to="/"
							className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-warm-accent transition-colors"
						>
							<ArrowLeftIcon className="w-4 h-4" />
							Back to Editor
						</Link>
						<ThemeSwitcher />
					</div>
				</div>
			</header>

			{/* Mobile Nav Switchboard Bar */}
			<nav className="md:hidden fixed bottom-0 left-0 right-0 z-60 bg-slate-900 dark:bg-black border-t-4 border-brass shadow-[0_-10px_30px_rgba(0,0,0,0.5)] bg-noise">
				<div className="h-1 bg-brass w-full" />
				
				<div className="max-w-lg mx-auto grid grid-cols-5 gap-1.5 p-2">
					{/* 1. Back to Editor */}
					<Link
						to="/"
						className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-slate-800/80 border border-white/10 hover:border-brass/40 active:scale-95 text-slate-200 transition-all group"
						title="Back to Editor"
					>
						<ArrowLeftIcon weight="bold" className="w-5 h-5 text-slate-300 mb-0.5 group-active:scale-90" />
						<span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-300">
							Editor
						</span>
					</Link>

					{/* 2. Theme Switcher */}
					<ThemeNavButton />

					{/* 3. Achievement Planner */}
					<Link
						to="/planner"
						className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-slate-800/80 border border-white/10 hover:border-brass/40 active:scale-95 text-slate-200 transition-all group"
						title="Achievement Planner"
					>
						<MagicWandIcon weight="duotone" className="w-5 h-5 text-brass mb-0.5 group-active:scale-90" />
						<span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-300">
							Planner
						</span>
					</Link>

					{/* 4. Operational Pathways Tab */}
					<button
						type="button"
						onClick={() => setActiveTab("guides")}
						className={`
							flex flex-col items-center justify-center py-2 px-1 rounded-xl border transition-all cursor-pointer
							${
								activeTab === "guides"
									? "bg-brass text-slate-900 border-brass-light shadow-[0_3px_0_0_#684b06]"
									: "bg-slate-800/80 text-slate-300 border-white/10 hover:border-brass/40"
							}
						`}
					>
						<ListDashesIcon weight={activeTab === "guides" ? "bold" : "regular"} className="w-5 h-5 mb-0.5" />
						<span className="text-[9px] font-mono font-bold uppercase tracking-wider">
							Pathways
						</span>
					</button>

					{/* 4. Raw Achievements Gallery Tab */}
					<button
						type="button"
						onClick={() => setActiveTab("gallery")}
						className={`
							flex flex-col items-center justify-center py-2 px-1 rounded-xl border transition-all cursor-pointer
							${
								activeTab === "gallery"
									? "bg-brass text-slate-900 border-brass-light shadow-[0_3px_0_0_#684b06]"
									: "bg-slate-800/80 text-slate-300 border-white/10 hover:border-brass/40"
							}
						`}
					>
						<GridFourIcon weight={activeTab === "gallery" ? "bold" : "regular"} className="w-5 h-5 mb-0.5" />
						<span className="text-[9px] font-mono font-bold uppercase tracking-wider">
							Gallery
						</span>
					</button>
				</div>
				<div className="h-2 bg-transparent" />
			</nav>

			{/* Main Content */}
			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 pb-32">
				{/* Section Header */}
				<div className="mb-12">
					<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
						<div>
							<h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-3">
								<ShieldCheckIcon className="w-8 h-8 text-brass" />
								Verified Walkthroughs
							</h2>
							<p className="font-serif italic text-slate-600 dark:text-slate-400 mt-2 max-w-2xl">
								Detailed turn-by-turn strategies and raw achievement data parsed from the official community guides.
							</p>
						</div>

						{/* Desktop Tabs - Filing Cabinet Style */}
						<div className="hidden md:flex items-end gap-2 border-b-4 border-slate-300 dark:border-white/10 w-full mt-8">
							<button type="button"
								onClick={() => setActiveTab("guides")}
								className={`
									px-8 py-3 rounded-t-lg font-bold uppercase tracking-widest text-xs transition-all flex items-center gap-2 border-2 border-b-0 relative -mb-[4px]
									${
										activeTab === "guides"
											? "bg-amber-50 dark:bg-warm-surface-dark text-slate-900 dark:text-white border-slate-300 dark:border-white/10 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-10 pt-4"
											: "bg-slate-200 dark:bg-black/40 text-slate-500 hover:text-slate-700 dark:text-slate-400 border-transparent hover:bg-slate-300 dark:hover:bg-black/60 z-0"
									}
								`}
							>
								<ListDashesIcon className="w-5 h-5" />
								Operational Pathways
							</button>
							<button type="button"
								onClick={() => setActiveTab("gallery")}
								className={`
									px-8 py-3 rounded-t-lg font-bold uppercase tracking-widest text-xs transition-all flex items-center gap-2 border-2 border-b-0 relative -mb-[4px]
									${
										activeTab === "gallery"
											? "bg-amber-50 dark:bg-warm-surface-dark text-slate-900 dark:text-white border-slate-300 dark:border-white/10 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-10 pt-4"
											: "bg-slate-200 dark:bg-black/40 text-slate-500 hover:text-slate-700 dark:text-slate-400 border-transparent hover:bg-slate-300 dark:hover:bg-black/60 z-0"
									}
								`}
							>
								<GridFourIcon className="w-5 h-5" />
								Raw Achievements
							</button>
						</div>
					</div>
				</div>

				{/* Content Area */}
				<div className="animate-in fade-in duration-500">
					{activeTab === "guides" ? (
						<PathwaysList highlightId={pathway} />
					) : (
						<AchievementGallery onNavigateToGuides={handleNavigateToGuides} />
					)}
				</div>
			</main>
		</div>
	);
}
