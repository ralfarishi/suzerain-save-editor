import { createFileRoute } from "@tanstack/react-router";
import { useCallback } from "react";
import { GridFourIcon, ListDashesIcon, ShieldCheckIcon, GitBranchIcon } from "@phosphor-icons/react";
import { PathwaysList } from "../components/achievements/PathwaysList";
import { AchievementGallery } from "../components/achievements/AchievementGallery";
import { CausalWalkthroughExplorer } from "../components/achievements/CausalWalkthroughExplorer";
import { MobileHeader } from "../components/layout/MobileHeader";
import { FloatingMobileDock } from "../components/layout/FloatingMobileDock";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

type AchievementsTab = "guides" | "gallery" | "walkthrough";

interface AchievementsSearch {
	pathway?: string;
	tab?: AchievementsTab;
	q?: string;
	scene?: string;
	var?: string;
}

export const Route = createFileRoute("/achievements")({
	validateSearch: (search: Record<string, unknown> = {}): AchievementsSearch => ({
		pathway: typeof search.pathway === "string" ? search.pathway : undefined,
		tab:
			search.tab === "guides" || search.tab === "gallery" || search.tab === "walkthrough"
				? search.tab
				: undefined,
		q: typeof search.q === "string" ? search.q : undefined,
		scene: typeof search.scene === "string" ? search.scene : undefined,
		var: typeof search.var === "string" ? search.var : undefined,
	}),
	component: AchievementsHub,
});

function AchievementsHub() {
	useDocumentMeta({
		title: "Suzerain Achievement Guide & Causal Walkthrough | Suzerain Save Editor",
		description:
			"Browse all 220 Suzerain Steam achievements, live save-audit status, turn-by-turn Sordland & Rizia pathways, and the interactive Causal Walkthrough Explorer.",
		canonicalPath: "/achievements",
	});
	const { pathway, tab, q, scene, var: varKey } = Route.useSearch();
	const navigate = Route.useNavigate();
	const activeTab: AchievementsTab = tab ?? "guides";

	const handleSelectTab = useCallback(
		(nextTab: AchievementsTab) => {
			if (tab !== nextTab) {
				void navigate({
					search: (prev) => ({ ...prev, tab: nextTab }),
					replace: true,
				});
			}
		},
		[navigate, tab]
	);

	const handleNavigateToGuides = useCallback(() => {
		handleSelectTab("guides");
	}, [handleSelectTab]);

	return (
		<div className="min-h-screen">
			{/* Mobile Top Header Banner */}
			<MobileHeader title="Guides &" subtitle="Achievements" />

			{/* Floating Island Dock */}
			<FloatingMobileDock
				activeAchievementsTab={activeTab}
				onSelectAchievementsTab={handleSelectTab}
			/>

			{/* Main Content */}
			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 pb-32">
				{/* Section Header */}
				<div className="mb-10">
					<div className="flex flex-col justify-between items-start gap-4">
						<div>
							<h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-3">
								<ShieldCheckIcon className="w-8 h-8 text-brass" />
								Guides & Achievements
							</h2>
							<p className="text-slate-600 dark:text-slate-300 mt-2 max-w-2xl text-sm sm:text-base">
								Turn-by-turn guides and achievement checklists built from Suzerain's official story scripts.
							</p>
						</div>

						{/* Mobile Tabs */}
						<div className="flex md:hidden items-center gap-1.5 w-full mt-2 overflow-x-auto pb-1">
							{(
								[
									["guides", "Guides (10)"],
									["gallery", "All (220)"],
									["walkthrough", "Scene Explorer"],
								] as const
							).map(([tabKey, label]) => (
								<button
									key={tabKey}
									type="button"
									onClick={() => handleSelectTab(tabKey)}
									className={`px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider shrink-0 border transition-colors cursor-pointer ${
										activeTab === tabKey
											? "bg-brass text-slate-950 border-brass"
											: "bg-slate-100 dark:bg-black/40 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-white/10"
									}`}
								>
									{label}
								</button>
							))}
						</div>

						{/* Desktop Tabs - Filing Cabinet Style */}
						<div className="hidden md:flex items-end gap-2 border-b-4 border-slate-300 dark:border-white/10 w-full mt-6">
							<button
								type="button"
								onClick={() => handleSelectTab("guides")}
								className={`
									px-7 py-3 rounded-t-lg font-bold uppercase tracking-widest text-xs transition-colors duration-150 flex items-center gap-2 border-2 border-b-0 relative -mb-[4px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass
									${
										activeTab === "guides"
											? "bg-amber-50 dark:bg-warm-surface-dark text-slate-900 dark:text-white border-slate-300 dark:border-white/10 shadow-sm z-10"
											: "bg-slate-200 dark:bg-black/40 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white border-transparent hover:bg-slate-300 dark:hover:bg-black/60 z-0"
									}
								`}
							>
								<ListDashesIcon className="w-4 h-4" />
								Playthrough Guides (10)
							</button>
							<button
								type="button"
								onClick={() => handleSelectTab("gallery")}
								className={`
									px-7 py-3 rounded-t-lg font-bold uppercase tracking-widest text-xs transition-colors duration-150 flex items-center gap-2 border-2 border-b-0 relative -mb-[4px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass
									${
										activeTab === "gallery"
											? "bg-amber-50 dark:bg-warm-surface-dark text-slate-900 dark:text-white border-slate-300 dark:border-white/10 shadow-sm z-10"
											: "bg-slate-200 dark:bg-black/40 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white border-transparent hover:bg-slate-300 dark:hover:bg-black/60 z-0"
									}
								`}
							>
								<GridFourIcon className="w-4 h-4" />
								All Achievements (220)
							</button>
							<button
								type="button"
								onClick={() => handleSelectTab("walkthrough")}
								className={`
									px-7 py-3 rounded-t-lg font-bold uppercase tracking-widest text-xs transition-colors duration-150 flex items-center gap-2 border-2 border-b-0 relative -mb-[4px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass
									${
										activeTab === "walkthrough"
											? "bg-amber-50 dark:bg-warm-surface-dark text-slate-900 dark:text-white border-slate-300 dark:border-white/10 shadow-sm z-10"
											: "bg-slate-200 dark:bg-black/40 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white border-transparent hover:bg-slate-300 dark:hover:bg-black/60 z-0"
									}
								`}
							>
								<GitBranchIcon className="w-4 h-4" />
								Scene & Choice Explorer
							</button>
						</div>
					</div>
				</div>

				{/* Content Area */}
				<div key={activeTab} className="animate-tab-fade">
					{activeTab === "guides" ? (
						<PathwaysList highlightId={pathway} />
					) : activeTab === "walkthrough" ? (
						<CausalWalkthroughExplorer
							initialSceneId={scene ? Number(scene) : undefined}
							initialVarKey={varKey}
						/>
					) : (
						<AchievementGallery onNavigateToGuides={handleNavigateToGuides} initialQuery={q} />
					)}
				</div>
			</main>
		</div>
	);
}
