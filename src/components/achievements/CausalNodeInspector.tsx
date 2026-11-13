import {
	CheckCircleIcon,
	XCircleIcon,
	ClockIcon,
	WrenchIcon,
	CaretDownIcon,
	GitBranchIcon,
	ArrowSquareOutIcon,
} from "@phosphor-icons/react";
import {
	CausalGraph,
	DialogueGraphNode,
	SceneChunk,
	evaluatePredicateAgainstSave,
	getSemanticLabel,
} from "../../utils/causal-graph";
import { formatSaveValue, formatExpectedRequirement } from "../../utils/save-formatters";

interface CausalNodeInspectorProps {
	graph: CausalGraph;
	sceneChunk: SceneChunk;
	node: DialogueGraphNode;
	nodeIdx: number;
	totalDisplayedNodes: number;
	isHighlighted: boolean;
	fileLoaded: boolean;
	variablesMap: Map<string, string | number | boolean>;
	saveTurnNo: number;
	showTechnicalKeys: boolean;
	appliedKey: string | null;
	expandedImpactKey: string | null;
	onToggleImpactKey: (key: string) => void;
	onInspectVarKey: (varKey: string) => void;
	onJumpToFix: (varKey: string) => void;
	onApplyVariable: (rawKey: string, valueStr: string) => void;
	onSelectSceneById: (convId: number, nodeId?: number) => void;
}

export function CausalNodeInspector({
	graph,
	sceneChunk,
	node,
	nodeIdx,
	totalDisplayedNodes,
	isHighlighted,
	fileLoaded,
	variablesMap,
	saveTurnNo,
	showTechnicalKeys,
	appliedKey,
	expandedImpactKey,
	onToggleImpactKey,
	onInspectVarKey,
	onJumpToFix,
	onApplyVariable,
	onSelectSceneById,
}: CausalNodeInspectorProps) {
	return (
		<div
			data-node-id={node.id}
			className={`p-4 space-y-2.5 transition-colors duration-300 ${
				isHighlighted
					? "bg-amber-50/80 dark:bg-brass/15 ring-2 ring-inset ring-brass"
					: ""
			}`}
		>
			<div className="flex items-center gap-2 flex-wrap">
				<span className="px-1.5 py-0.5 text-[10px] font-bold uppercase rounded bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300">
					Scene {sceneChunk.conversationId} · Line {nodeIdx + 1} / {totalDisplayedNodes}
				</span>
				{showTechnicalKeys && (
					<span className="px-1.5 py-0.5 text-[10px] font-mono font-bold bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300 rounded">
						#{node.id}
					</span>
				)}
				{node.isPlayerChoice ? (
					<span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-brass/20 text-slate-900 dark:text-brass-light rounded">
						Player Choice
					</span>
				) : (
					<span className="text-xs font-serif font-bold text-slate-800 dark:text-slate-200">
						{node.speaker}
					</span>
				)}
			</div>

			{node.text && (
				<p className="text-sm font-serif text-slate-800 dark:text-slate-200 leading-relaxed">
					“{node.text}”
				</p>
			)}

			{/* Predicates (Requirements) */}
			{node.variablesRead.length > 0 && (
				<div className="space-y-1.5 pt-1">
					{node.variablesRead.map((pred, idx) => {
						const label = getSemanticLabel(graph, pred.var);
						const status = fileLoaded
							? evaluatePredicateAgainstSave(
									pred,
									variablesMap,
									saveTurnNo,
									sceneChunk.turn
								)
							: null;
						const currentVal = fileLoaded ? variablesMap.get(pred.var) : undefined;
						const canQuickSet = pred.op === "==" || pred.op === "=";

						return (
							<div
								key={`${pred.var}-${idx}`}
								className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 p-2.5 rounded-lg bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 text-xs"
							>
								<div className="min-w-0 flex-1">
									<div className="flex items-center gap-1.5 flex-wrap">
										<span className="text-[10px] uppercase font-bold text-amber-700 dark:text-amber-400">
											REQUIRES
										</span>
										<button
											type="button"
											onClick={() => onInspectVarKey(pred.var)}
											className="text-left font-bold text-slate-900 dark:text-white hover:text-brass underline decoration-dotted cursor-pointer truncate"
										>
											{label}
										</button>
									</div>
									{showTechnicalKeys && (
										<div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 mt-0.5 break-all">
											{pred.var} {pred.op} {pred.value}
										</div>
									)}
									<div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-2 flex-wrap">
										<span className="font-semibold text-slate-700 dark:text-slate-300">
											{formatExpectedRequirement(pred.op, pred.value)}
										</span>
										{fileLoaded && (
											<>
												<span>·</span>
												<span>
													In your save: <span className="font-semibold">{formatSaveValue(currentVal)}</span>
												</span>
											</>
										)}
									</div>
								</div>

								<div className="flex items-center gap-1.5 flex-wrap shrink-0">
									{status === "completed" && (
										<span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold uppercase bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded">
											<CheckCircleIcon weight="fill" className="w-3 h-3" />
											Met
										</span>
									)}
									{status === "missed" && (
										<span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold uppercase bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 rounded">
											<XCircleIcon weight="fill" className="w-3 h-3" />
											Missed
										</span>
									)}
									{status === "upcoming" && (
										<span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold uppercase bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 rounded">
											<ClockIcon weight="fill" className="w-3 h-3" />
											Upcoming
										</span>
									)}

									{fileLoaded && (
										<button
											type="button"
											onClick={() => onJumpToFix(pred.var)}
											className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-bold bg-slate-900 dark:bg-white/15 text-white hover:bg-slate-800 dark:hover:bg-white/25 rounded cursor-pointer"
										>
											<ArrowSquareOutIcon weight="bold" className="w-3 h-3 text-brass" />
											<span>Jump to Fix</span>
										</button>
									)}

									{fileLoaded && canQuickSet && status !== "completed" && (
										<button
											type="button"
											onClick={() => onApplyVariable(pred.var, pred.value)}
											className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-bold bg-brass text-slate-950 hover:bg-brass-light rounded cursor-pointer"
										>
											<WrenchIcon weight="bold" className="w-3 h-3" />
											{appliedKey === `${pred.var}=${pred.value}` ? "Applied" : "Apply"}
										</button>
									)}
								</div>
							</div>
						);
					})}
				</div>
			)}

			{/* Mutations (Effects) */}
			{node.variablesModified.length > 0 && (
				<div className="space-y-1.5 pt-1">
					{node.variablesModified.map((mut, idx) => {
						const label = getSemanticLabel(graph, mut.var);
						const currentVal = fileLoaded ? variablesMap.get(mut.var) : undefined;
						const isSimpleAssign = mut.op === "=" && !mut.value.includes("Variable[");
						const varIdx = graph.variables[mut.var];
						const laterChecks = (varIdx?.readIn ?? []).filter(
							(r) =>
								r.convId !== undefined &&
								r.convId !== sceneChunk.conversationId &&
								(r.turn < 0 || sceneChunk.turn < 0 || r.turn >= sceneChunk.turn)
						);
						const linkedAchs = varIdx?.achievements ?? [];
						const impactKey = `${node.id}:${mut.var}:${idx}`;
						const isImpactOpen = expandedImpactKey === impactKey;

						return (
							<div
								key={`${mut.var}-${idx}`}
								className="p-2.5 rounded-lg bg-emerald-50/40 dark:bg-emerald-950/15 border border-emerald-200 dark:border-emerald-900/40 text-xs space-y-2"
							>
								<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
									<div className="min-w-0 flex-1">
										<div className="flex items-center gap-1.5 flex-wrap">
											<span className="text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-400">
												EFFECT
											</span>
											<button
												type="button"
												onClick={() => onInspectVarKey(mut.var)}
												className="text-left font-bold text-slate-900 dark:text-white hover:text-brass underline decoration-dotted cursor-pointer truncate"
											>
												{label}
											</button>
										</div>
										{showTechnicalKeys && (
											<div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 mt-0.5 break-all">
												{mut.var} {mut.op} {mut.value}
											</div>
										)}
										{fileLoaded && (
											<div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
												In your save: <span className="font-semibold">{formatSaveValue(currentVal)}</span>
											</div>
										)}
									</div>

									<div className="flex items-center gap-1.5 shrink-0 flex-wrap">
										{laterChecks.length > 0 && (
											<button
												type="button"
												onClick={() => onToggleImpactKey(impactKey)}
												className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded-md bg-white dark:bg-black/30 border border-emerald-300 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-200 hover:border-brass transition-colors cursor-pointer"
											>
												<GitBranchIcon className="w-3.5 h-3.5 text-brass" />
												<span>Matters later ({laterChecks.length})</span>
												<CaretDownIcon
													className={`w-3 h-3 transition-transform duration-150 ${
														isImpactOpen ? "rotate-180" : ""
													}`}
												/>
											</button>
										)}

										<button
											type="button"
											onClick={() => onInspectVarKey(mut.var)}
											className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-semibold rounded-md bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-white/20 transition-colors cursor-pointer"
											title="Open full story impact drawer"
										>
											<span>
												Impact{linkedAchs.length > 0 ? ` (${linkedAchs.length} Ach)` : ""}
											</span>
										</button>

										{fileLoaded && isSimpleAssign && (
											<button
												type="button"
												onClick={() => onApplyVariable(mut.var, mut.value)}
												className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold border border-emerald-600 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-600 hover:text-white rounded cursor-pointer"
											>
												<WrenchIcon weight="bold" className="w-3 h-3" />
												{appliedKey === `${mut.var}=${mut.value}` ? "Applied" : "Apply to Save"}
											</button>
										)}
									</div>
								</div>

								{isImpactOpen && laterChecks.length > 0 && (() => {
									const groupedByTurn = new Map<number, typeof laterChecks>();
									for (const r of laterChecks) {
										const t = r.turn;
										const arr = groupedByTurn.get(t) ?? [];
										arr.push(r);
										groupedByTurn.set(t, arr);
									}
									const sortedTurns = Array.from(groupedByTurn.keys()).sort((a, b) => a - b);

									return (
										<div className="pt-2 border-t border-emerald-200/70 dark:border-emerald-800/40 space-y-2.5 animate-fade-in">
											<div className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
												Where This Matters Later ({laterChecks.length})
											</div>
											<div className="space-y-2">
												{sortedTurns.slice(0, 4).map((t) => {
													const turnItems = groupedByTurn.get(t) ?? [];
													const turnTitle =
														t === 0 ? "Prologue" : t === 11 ? "Epilogue" : t > 0 ? `Turn ${t}` : "General";
													return (
														<div key={t} className="space-y-1">
															<div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
																{turnTitle} ({turnItems.length}{" "}
																{turnItems.length === 1 ? "scene" : "scenes"})
															</div>
															<div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
																{turnItems.slice(0, 4).map((r, rIdx) => (
																	<button
																		key={`${r.convId}-${r.nodeId}-${rIdx}`}
																		type="button"
																		onClick={() => {
																			if (r.convId !== undefined) {
																				onSelectSceneById(r.convId, r.nodeId);
																			}
																		}}
																		className="text-left px-2.5 py-2 rounded-md bg-white dark:bg-black/35 border border-emerald-200 dark:border-white/10 hover:border-brass transition-colors cursor-pointer flex items-center justify-between gap-2"
																	>
																		<span className="text-[11px] font-bold text-slate-900 dark:text-white truncate">
																			{r.title || `Scene ${r.convId}`}
																		</span>
																		<span className="text-[10px] font-bold text-brass shrink-0">
																			Open →
																		</span>
																	</button>
																))}
															</div>
														</div>
													);
												})}
											</div>
											{sortedTurns.length > 4 && (
												<button
													type="button"
													onClick={() => onInspectVarKey(mut.var)}
													className="text-[11px] font-semibold text-brass hover:underline cursor-pointer"
												>
													View all {laterChecks.length} scenes in Impact Drawer →
												</button>
											)}
										</div>
									);
								})()}
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}
