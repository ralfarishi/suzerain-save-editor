import React from "react";
import { ScrollIcon, CaretRightIcon } from "@phosphor-icons/react";
import { SceneSummary } from "../../utils/causal-graph";

type StoryPackFilter = "All" | "StoryPack_Main" | "StoryPack_Rizia";

interface SceneListPanelProps {
	sceneListRef: React.RefObject<HTMLDivElement | null>;
	sceneRowRefs: React.MutableRefObject<Map<number, HTMLButtonElement>>;
	filteredScenes: SceneSummary[];
	visibleScenes: SceneSummary[];
	visibleLimit: number;
	onShowMore: () => void;
	turnGroupCounts: Map<string, number>;
	packFilter: StoryPackFilter;
	selectedSceneId: number | null;
	fileLoaded: boolean;
	isSaveRizia: boolean;
	saveTurnNo: number;
	showTechnicalKeys: boolean;
	onSelectScene: (scene: SceneSummary) => void;
}

export function SceneListPanel({
	sceneListRef,
	sceneRowRefs,
	filteredScenes,
	visibleScenes,
	visibleLimit,
	onShowMore,
	turnGroupCounts,
	packFilter,
	selectedSceneId,
	fileLoaded,
	isSaveRizia,
	saveTurnNo,
	showTechnicalKeys,
	onSelectScene,
}: SceneListPanelProps) {
	return (
		<div
			ref={sceneListRef}
			className="lg:col-span-5 rounded-xl border-2 border-slate-200 dark:border-white/15 bg-white dark:bg-warm-surface-dark shadow-sm overflow-hidden scroll-mt-4"
		>
			<div className="px-4 py-3 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-black/20 flex items-center justify-between">
				<span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
					<ScrollIcon className="w-4 h-4 text-brass" />
					Scenes
				</span>
				<span className="text-xs text-slate-500 dark:text-slate-400">
					{filteredScenes.length} scenes
				</span>
			</div>

			<div className="max-h-[300px] lg:max-h-[680px] overflow-y-auto divide-y divide-slate-200 dark:divide-white/10">
				{visibleScenes.map((scene, idx) => {
					const prevScene = idx > 0 ? visibleScenes[idx - 1] : null;
					const showCampaignHeader =
						packFilter === "All" && (!prevScene || prevScene.storyPack !== scene.storyPack);
					const showTurnHeader =
						!prevScene || prevScene.storyPack !== scene.storyPack || prevScene.turn !== scene.turn;
					const isSelected = selectedSceneId === scene.conversationId;
					const isRiziaScene = scene.storyPack === "StoryPack_Rizia";
					const isOtherCampaign = fileLoaded && isSaveRizia !== isRiziaScene;
					const isCurrentTurn = fileLoaded && !isOtherCampaign && scene.turn === saveTurnNo;
					const turnGroupCount =
						turnGroupCounts.get(`${scene.storyPack}:${scene.turn}`) ?? 0;

					return (
						<div key={scene.conversationId}>
							{showCampaignHeader && (
								<div className="px-3.5 py-2 bg-slate-200/80 dark:bg-black/60 border-b border-slate-300 dark:border-white/15 text-[11px] font-bold uppercase tracking-widest text-slate-700 dark:text-brass-light sticky top-0 z-20">
									{isRiziaScene ? "Kingdom of Rizia (DLC)" : "Republic of Sordland"}
								</div>
							)}
							{showTurnHeader && (
								<div className="px-3.5 py-1.5 bg-slate-100/90 dark:bg-black/35 border-b border-slate-200 dark:border-white/10 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
									<span>{scene.turnLabel}</span>
									<span className="text-slate-400 dark:text-slate-500">
										{turnGroupCount} {turnGroupCount === 1 ? "scene" : "scenes"}
									</span>
								</div>
							)}
							<button
								ref={(el) => {
									if (el) sceneRowRefs.current.set(scene.conversationId, el);
									else sceneRowRefs.current.delete(scene.conversationId);
								}}
								type="button"
								onClick={() => onSelectScene(scene)}
								className={`w-full text-left p-3.5 transition-colors cursor-pointer flex items-start justify-between gap-3 ${
									isSelected
										? "bg-amber-50 dark:bg-brass/15 border-l-4 border-brass"
										: isCurrentTurn
											? "bg-amber-50/40 dark:bg-brass/5 border-l-4 border-brass/70 hover:bg-amber-50 dark:hover:bg-brass/10"
											: "hover:bg-slate-50 dark:hover:bg-white/5"
								}`}
							>
								<div className="min-w-0 flex-1">
									<div className="flex items-center gap-1.5 flex-wrap mb-1">
										<span className="px-1.5 py-0.5 text-[10px] font-bold uppercase rounded bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300">
											{scene.turnLabel}
										</span>
										<span
											className={`px-1.5 py-0.5 text-[10px] font-bold uppercase rounded ${
												isRiziaScene
													? "bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300"
													: "bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300"
											}`}
										>
											{isRiziaScene ? "Rizia" : "Sordland"}
										</span>
										{isCurrentTurn && (
											<span className="px-1.5 py-0.5 text-[10px] font-bold uppercase rounded bg-brass text-slate-950">
												Current Turn
											</span>
										)}
										{isOtherCampaign && (
											<span className="px-1.5 py-0.5 text-[10px] uppercase rounded bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400">
												Different Campaign
											</span>
										)}
									</div>
									<p className="text-sm font-bold text-slate-900 dark:text-white truncate">
										{scene.title}
									</p>
									<p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
										{scene.variablesModified.length === 0 && scene.variablesRead.length === 0 ? (
											<span>No tracked story effects</span>
										) : (
											<span>
												In scene: {scene.variablesModified.length}{" "}
												{scene.variablesModified.length === 1 ? "outcome" : "outcomes"} ·{" "}
												{scene.variablesRead.length}{" "}
												{scene.variablesRead.length === 1 ? "requirement" : "requirements"}
											</span>
										)}
										{showTechnicalKeys && (
											<span className="ml-1.5 opacity-70">({scene.decisionCount} choices)</span>
										)}
									</p>
								</div>
								<CaretRightIcon className="w-4 h-4 text-slate-400 shrink-0 mt-1" />
							</button>
						</div>
					);
				})}

				{visibleLimit < filteredScenes.length && (
					<div className="p-3 text-center">
						<button
							type="button"
							onClick={onShowMore}
							className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg border border-brass text-brass hover:bg-brass hover:text-slate-950 transition-colors cursor-pointer"
						>
							Show More ({filteredScenes.length - visibleLimit} remaining)
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
