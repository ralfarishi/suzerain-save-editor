import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useCallback } from "react";
import { ArrowLeftIcon, GridFourIcon, ListDashesIcon, ShieldCheckIcon } from "@phosphor-icons/react";
import { ThemeSwitcher } from "../components/ThemeSwitcher";
import { PathwaysList } from "../components/achievements/PathwaysList";
import { AchievementGallery } from "../components/achievements/AchievementGallery";

export const Route = createFileRoute("/achievements")({
	component: AchievementsHub,
});

function AchievementsHub() {
	const [activeTab, setActiveTab] = useState<"guides" | "gallery">("guides");


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

			{/* Mobile Nav Console - 'The Chancellor's Desk' Aesthetic */}
			<nav className="md:hidden fixed bottom-0 left-0 right-0 z-60 bg-warm-bg-light dark:bg-warm-bg-dark border-t-4 border-warm-border-light dark:border-warm-border-dark shadow-[0_-10px_30px_-5px_rgba(0,0,0,0.3)]">
				<div className="absolute inset-0 bg-noise opacity-[0.03] dark:opacity-[0.05] pointer-events-none"></div>
				
				<div className="relative max-w-lg mx-auto px-4 py-3 flex items-end justify-between gap-4">
					<div className="flex gap-2 p-1 bg-warm-surface-light dark:bg-black/20 rounded-xl border border-warm-border-light dark:border-white/5 shadow-tactile">
						<Link
							to="/"
							className="flex items-center justify-center w-11 h-11 bg-white dark:bg-warm-surface-dark rounded-lg text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-warm-border-dark active:shadow-tactile-press active:translate-y-0.5 transition-all group"
							title="Back to Editor"
						>
							<ArrowLeftIcon weight="bold" className="w-5 h-5 group-active:scale-90 transition-transform" />
						</Link>
						<ThemeSwitcher />
					</div>

					<div className="flex items-center bg-warm-surface-light dark:bg-black/20 p-1 rounded-xl border border-warm-border-light dark:border-white/5 shadow-inner">
						<button type="button"
							aria-label="Pathways & Guides"
							onClick={() => setActiveTab("guides")}
							className={`w-11 h-11 flex items-center justify-center rounded-lg transition-all ${
								activeTab === "guides" 
									? "bg-brass text-slate-900 shadow-sm" 
									: "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
							}`}
						>
							<ListDashesIcon weight={activeTab === "guides" ? "bold" : "regular"} className="w-5 h-5" />
						</button>
						<button type="button"
							aria-label="Raw Achievements"
							onClick={() => setActiveTab("gallery")}
							className={`w-11 h-11 flex items-center justify-center rounded-lg transition-all ${
								activeTab === "gallery" 
									? "bg-brass text-slate-900 shadow-sm" 
									: "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
							}`}
						>
							<GridFourIcon weight={activeTab === "gallery" ? "bold" : "regular"} className="w-5 h-5" />
						</button>
					</div>
				</div>
				<div className="h-4 bg-transparent"></div>
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
						<PathwaysList />
					) : (
						<AchievementGallery onNavigateToGuides={handleNavigateToGuides} />
					)}
				</div>
			</main>
		</div>
	);
}
