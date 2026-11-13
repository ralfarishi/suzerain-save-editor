import React from "react";
import { FunnelIcon, ScalesIcon, EyeSlashIcon, ArrowCounterClockwiseIcon, WarningCircleIcon } from "@phosphor-icons/react";
import { CausalGraph, DialogueGraphNode, SceneChunk, SceneSummary } from "../../utils/causal-graph";
import { CausalNodeInspector } from "./CausalNodeInspector";

interface DialogueTreeRendererProps {
	graph: CausalGraph;
	detailPanelRef: React.RefObject<HTMLDivElement | null>;
	sceneListRef: React.RefObject<HTMLDivElement | null>;
	filteredScenes: SceneSummary[];
	sceneIndexMap: Map<number, number>;
	turnGroupScenesMap: Map<string, SceneSummary[]>;
	sceneChunk: SceneChunk | null;
	loadingScene: boolean;
	sceneError: string | null;
	onRetryScene: () => void;
	onlyLogicNodes: boolean;
	onToggleLogicNodes: (checked: boolean) => void;
	displayedNodes: DialogueGraphNode[];
	totalReadableNodes: number;
	isSceneBlurred: boolean;
	saveTurnNo: number;
	onRevealScene: (convId: number) => void;
	onSelectScene: (scene: SceneSummary) => void;
	highlightedNodeId: number | null;
	fileLoaded: boolean;
	variablesMap: Map<string, string | number | boolean>;
	showTechnicalKeys: boolean;
	appliedKey: string | null;
	expandedImpactKey: string | null;
	onToggleImpactKey: (key: string) => void;
	onInspectVarKey: (varKey: string) => void;
	onJumpToFix: (varKey: string) => void;
	onApplyVariable: (rawKey: string, valueStr: string) => void;
	onSelectSceneById: (convId: number, nodeId?: number) => void;
}

export function DialogueTreeRenderer({
	graph,
	detailPanelRef,
	sceneListRef,
	filteredScenes,
	sceneIndexMap,
	turnGroupScenesMap,
	sceneChunk,
	loadingScene,
	sceneError,
	onRetryScene,
	onlyLogicNodes,
	onToggleLogicNodes,
	displayedNodes,
	totalReadableNodes,
	isSceneBlurred,
	saveTurnNo,
	onRevealScene,
	onSelectScene,
	highlightedNodeId,
	fileLoaded,
	variablesMap,
	showTechnicalKeys,
	appliedKey,
	expandedImpactKey,
	onToggleImpactKey,
	onInspectVarKey,
	onJumpToFix,
	onApplyVariable,
	onSelectSceneById,
}: DialogueTreeRendererProps) {
	const currentIdx = sceneChunk ? (sceneIndexMap.get(sceneChunk.conversationId) ?? -1) : -1;
	const prevSceneItem = currentIdx > 0 ? filteredScenes[currentIdx - 1] : null;
	const nextSceneItem =
		currentIdx >= 0 && currentIdx < filteredScenes.length - 1
			? filteredScenes[currentIdx + 1]
			: null;
	const sameTurnScenes = sceneChunk
		? (turnGroupScenesMap.get(`${sceneChunk.storyPack}:${sceneChunk.turn}`) ?? [])
		: [];
	const turnIdx = sceneChunk
		? sameTurnScenes.findIndex((s) => s.conversationId === sceneChunk.conversationId)
		: -1;

	return (
		<div ref={detailPanelRef} className="lg:col-span-7 scroll-mt-4">
			<div className="rounded-xl border-2 border-slate-200 dark:border-white/15 bg-white dark:bg-warm-surface-dark shadow-sm overflow-hidden">
				<div className="border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-black/20">
					<div className="px-4 py-3 flex items-center justify-between gap-3 flex-wrap">
						<div className="flex items-center gap-2 min-w-0">
							<ScalesIcon className="w-4 h-4 text-brass shrink-0" />
							<span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 truncate">
								{sceneChunk ? sceneChunk.title : "Select a scene to inspect"}
							</span>
						</div>

						{sceneChunk && (
							<label className="inline-flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300 cursor-pointer">
								<FunnelIcon className="w-3.5 h-3.5" />
								<input
									type="checkbox"
									checked={onlyLogicNodes}
									onChange={(e) => onToggleLogicNodes(e.target.checked)}
									className="accent-brass"
								/>
								<span>
									Key Choices Only ({displayedNodes.length} of {totalReadableNodes})
								</span>
							</label>
						)}
					</div>

					{sceneChunk && (
						<div className="px-4 py-2 border-t border-slate-200/80 dark:border-white/10 bg-slate-100/70 dark:bg-black/30 flex items-center justify-between gap-2 flex-wrap text-[11px]">
							<div className="flex items-center gap-1.5 flex-wrap text-slate-600 dark:text-slate-300 font-medium">
								<span className="font-bold text-slate-800 dark:text-white">
									{sceneChunk.storyPack === "StoryPack_Rizia" ? "Rizia" : "Sordland"}
								</span>
								<span>·</span>
								<span>{sceneChunk.turnLabel}</span>
								{turnIdx >= 0 && (
									<>
										<span>·</span>
										<span className="px-1.5 py-0.5 rounded bg-slate-200/80 dark:bg-white/10 text-slate-800 dark:text-slate-200 font-bold">
											Scene {sceneChunk.conversationId}
										</span>
										<span>·</span>
										<span className="px-1.5 py-0.5 rounded bg-brass/15 text-slate-900 dark:text-brass-light font-bold">
											{turnIdx + 1} of {sameTurnScenes.length} in {sceneChunk.turnLabel}
										</span>
									</>
								)}
							</div>

							<div className="flex items-center gap-1.5">
								<button
									type="button"
									onClick={() => sceneListRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
									className="lg:hidden px-2 py-0.5 rounded border border-slate-300 dark:border-white/15 bg-white dark:bg-white/5 text-slate-700 dark:text-slate-200 hover:border-brass cursor-pointer font-semibold"
								>
									↑ Scenes
								</button>
								<button
									type="button"
									disabled={!prevSceneItem}
									onClick={() => prevSceneItem && onSelectScene(prevSceneItem)}
									className="px-2 py-0.5 rounded border border-slate-300 dark:border-white/15 bg-white dark:bg-white/5 text-slate-700 dark:text-slate-200 hover:border-brass disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer font-semibold"
								>
									← Prev
								</button>
								<button
									type="button"
									disabled={!nextSceneItem}
									onClick={() => nextSceneItem && onSelectScene(nextSceneItem)}
									className="px-2 py-0.5 rounded border border-slate-300 dark:border-white/15 bg-white dark:bg-white/5 text-slate-700 dark:text-slate-200 hover:border-brass disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer font-semibold"
								>
									Next →
								</button>
							</div>
						</div>
					)}
				</div>

				{loadingScene ? (
					<div className="min-h-[320px] p-4 space-y-4">
						{Array.from({ length: 4 }).map((_, idx) => (
							<div
								key={idx}
								className="p-4 rounded-xl border border-slate-200 dark:border-white/10 space-y-2.5"
							>
								<div className="h-5 w-24 rounded bg-zinc-200 dark:bg-slate-800 animate-shimmer" />
								<div className="h-4 w-full rounded bg-zinc-200 dark:bg-slate-800 animate-shimmer" />
								<div className="h-4 w-3/4 rounded bg-zinc-200 dark:bg-slate-800 animate-shimmer" />
								<div className="h-9 w-full rounded-lg bg-zinc-200 dark:bg-slate-800 animate-shimmer" />
							</div>
						))}
					</div>
				) : sceneError ? (
					<div className="p-8 text-center space-y-3">
						<WarningCircleIcon className="w-8 h-8 text-red-500 mx-auto" weight="duotone" />
						<p className="text-sm font-semibold text-red-700 dark:text-red-300">
							{sceneError}
						</p>
						<button
							type="button"
							onClick={onRetryScene}
							className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brass hover:bg-brass-light text-slate-950 text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors"
						>
							<ArrowCounterClockwiseIcon className="w-3.5 h-3.5" weight="bold" />
							<span>Retry</span>
						</button>
					</div>
				) : !sceneChunk ? (
					<div className="p-10 text-center text-sm text-slate-500 dark:text-slate-400">
						Pick any scene on the left to see its key choices, story requirements, and quick save fixes.
					</div>
				) : (
					<div className="relative">
						{isSceneBlurred && (
							<div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 bg-slate-900/40 backdrop-blur-xs">
								<div className="p-5 rounded-xl bg-white dark:bg-warm-surface-dark border-2 border-brass shadow-2xl text-center max-w-sm space-y-3">
									<EyeSlashIcon className="w-8 h-8 text-brass mx-auto" weight="duotone" />
									<p className="text-sm font-bold text-slate-900 dark:text-white">
										Spoiler Guard Active
									</p>
									<p className="text-xs text-slate-600 dark:text-slate-300">
										This scene takes place in Turn {sceneChunk.turn}, which is ahead of your current save (Turn {saveTurnNo}).
									</p>
									<button
										type="button"
										onClick={() => onRevealScene(sceneChunk.conversationId)}
										className="px-4 py-2 rounded-lg bg-brass hover:bg-brass-light text-slate-950 text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors"
									>
										Turn {sceneChunk.turn} (Future) — Click to Reveal
									</button>
								</div>
							</div>
						)}

						<div
							className={`max-h-[620px] overflow-y-auto divide-y divide-slate-200 dark:divide-white/10 ${
								isSceneBlurred ? "blur-sm select-none pointer-events-none" : ""
							}`}
						>
							{displayedNodes.length === 0 ? (
								<div className="p-8 text-center text-xs text-slate-500 dark:text-slate-400">
									This scene has no tracked story conditions or variable outcomes. Uncheck{" "}
									<strong className="text-slate-700 dark:text-slate-200">Key Choices Only</strong>{" "}
									above to view all dialogue lines.
								</div>
							) : (
								displayedNodes.map((node, nodeIdx) => (
									<CausalNodeInspector
										key={node.id}
										graph={graph}
										sceneChunk={sceneChunk}
										node={node}
										nodeIdx={nodeIdx}
										totalDisplayedNodes={displayedNodes.length}
										isHighlighted={highlightedNodeId === node.id}
										fileLoaded={fileLoaded}
										variablesMap={variablesMap}
										saveTurnNo={saveTurnNo}
										showTechnicalKeys={showTechnicalKeys}
										appliedKey={appliedKey}
										expandedImpactKey={expandedImpactKey}
										onToggleImpactKey={onToggleImpactKey}
										onInspectVarKey={onInspectVarKey}
										onJumpToFix={onJumpToFix}
										onApplyVariable={onApplyVariable}
										onSelectSceneById={onSelectSceneById}
									/>
								))
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
