import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "@tanstack/react-router";
import type { SteamAchievement } from "../../data/steam_achievements";
import type { AchievementWalkthrough } from "../../data/achievement_walkthroughs";
import type { AchievementAuditDetail } from "../../utils/save-audit";
import { useSave } from "../../context/SaveContext";
import { findFieldLocation, getFieldById } from "../../utils/save-manager";
import { fetchCausalGraph, type CausalGraph } from "../../utils/causal-graph";
import { useDialogBehavior } from "../../hooks/useDialogBehavior";
import {
	XIcon,
	ChatsIcon,
	WarningIcon,
	CheckCircleIcon,
	CalendarIcon,
	ScrollIcon,
	TrophyIcon,
	CoinsIcon,
	ClockIcon,
	ArrowRightIcon,
	XCircleIcon,
	WrenchIcon,
	ArrowSquareOutIcon,
} from "@phosphor-icons/react";

interface Props {
	achievement: SteamAchievement | null;
	isOpen: boolean;
	auditDetail?: AchievementAuditDetail;
	currentTurn?: number;
	onClose: () => void;
}

let cachedWalkthroughs: Record<string, AchievementWalkthrough> | null = null;
let walkthroughsPromise: Promise<Record<string, AchievementWalkthrough>> | null = null;

function loadWalkthroughs(): Promise<Record<string, AchievementWalkthrough>> {
	if (cachedWalkthroughs) return Promise.resolve(cachedWalkthroughs);
	if (!walkthroughsPromise) {
		walkthroughsPromise = import("../../data/achievement_walkthroughs")
			.then((mod) => {
				cachedWalkthroughs = mod.achievementWalkthroughs;
				return cachedWalkthroughs;
			})
			.catch((err) => {
				walkthroughsPromise = null;
				throw err;
			});
	}
	return walkthroughsPromise;
}

export function AchievementWalkthroughModal({ achievement, isOpen, auditDetail, currentTurn, onClose }: Props) {
	const overlayRef = useRef<HTMLDivElement>(null);
	const navigate = useNavigate();
	const { fileLoaded, variablesMap, updateVariable, showTechnicalKeys, recentlyChangedAchievementIds } = useSave();
	const [toggledVar, setToggledVar] = useState<string | null>(null);
	const [causalGraph, setCausalGraph] = useState<CausalGraph | null>(null);
	const [walkthroughsMap, setWalkthroughsMap] = useState<Record<string, AchievementWalkthrough> | null>(
		() => cachedWalkthroughs,
	);

	useEffect(() => {
		if (!isOpen || walkthroughsMap) return;
		let cancelled = false;
		loadWalkthroughs()
			.then((data) => {
				if (!cancelled) setWalkthroughsMap(data);
			})
			.catch(() => {
				// Non-fatal: modal renders conditionFormula & causal graph fallback
			});
		return () => {
			cancelled = true;
		};
	}, [isOpen, walkthroughsMap]);

	useEffect(() => {
		if (!isOpen || causalGraph) return;
		let cancelled = false;
		fetchCausalGraph()
			.then((g) => {
				if (!cancelled) setCausalGraph(g);
			})
			.catch(() => {
				// Non-fatal: modal works without causal graph cross-links
			});
		return () => {
			cancelled = true;
		};
	}, [isOpen, causalGraph]);

	useDialogBehavior(isOpen, onClose);

	if (!isOpen || !achievement) return null;

	const walkthrough = walkthroughsMap?.[achievement.id];
	const isPulsing = recentlyChangedAchievementIds.has(achievement.id);

	const matchedSceneId = (() => {
		if (!causalGraph) return undefined;
		const candidates: string[] = [];
		if (walkthrough?.timeline?.sceneFile) candidates.push(walkthrough.timeline.sceneFile);
		if (achievement.triggerScenes) candidates.push(...achievement.triggerScenes);

		for (const sceneFile of candidates) {
			const normalizedTarget = sceneFile
				.replace(/\.md$/i, "")
				.replace(/^(Sordland|Rizia|Prologue)_/i, "")
				.replace(/[^a-z0-9]/gi, "")
				.toLowerCase();
			if (!normalizedTarget) continue;
			for (const scene of Object.values(causalGraph.scenes)) {
				const normalizedTitle = scene.title
					.replace(/^(Sordland|Rizia|Prologue)\//i, "")
					.replace(/[^a-z0-9]/gi, "")
					.toLowerCase();
				if (normalizedTitle === normalizedTarget || normalizedTitle.endsWith(normalizedTarget)) {
					return scene.conversationId;
				}
			}
		}
		return undefined;
	})();

	const conditionEntries = (() => {
		const map = new Map<string, { varKey: string; op?: string; value?: string }>();
		const graphPreds = causalGraph?.achievements[achievement.id]?.predicates;
		if (graphPreds && graphPreds.length > 0) {
			for (const p of graphPreds) {
				if (!map.has(p.var)) {
					map.set(p.var, { varKey: p.var, op: p.op, value: p.value });
				}
			}
		} else if (achievement.conditionFormula) {
			const re = /([A-Za-z0-9_]+\.[A-Za-z0-9_]+)\s*(==|!=|>=|<=|>|<|=)?\s*(true|false|-?\d+(?:\.\d+)?)?/g;
			for (const m of achievement.conditionFormula.matchAll(re)) {
				const varKey = m[1];
				if (!map.has(varKey)) {
					map.set(varKey, { varKey, op: m[2], value: m[3] });
				}
			}
		}
		// Only fall back to walkthrough.saveVariables if conditionFormula yielded nothing
		if (map.size === 0 && walkthrough?.saveVariables) {
			for (const v of walkthrough.saveVariables) {
				if (!map.has(v)) {
					map.set(v, { varKey: v });
				}
			}
		}
		return Array.from(map.values());
	})();

	const handleJumpToFix = (varKey: string) => {
		const loc = findFieldLocation(varKey);
		onClose();
		if (loc) {
			navigate({ to: "/", search: { tab: loc.tabId, focus: loc.fieldId } });
		} else {
			navigate({ to: "/", search: { focus: varKey } });
		}
	};

	return createPortal(
		<div className="fixed inset-0 z-70 flex items-center justify-center p-3 sm:p-6 animate-fade-in">
			{/* Backdrop */}
			<div
				ref={overlayRef}
				onClick={onClose}
				className="absolute inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
			/>

			{/* Modal Dialog Content */}
			<div
				role="dialog"
				aria-modal="true"
				aria-labelledby="walkthrough-modal-title"
				className={`relative z-10 w-full max-w-2xl max-h-[90vh] flex flex-col bg-slate-50 dark:bg-warm-surface-dark border-2 border-brass rounded-xl shadow-2xl overflow-hidden animate-zoom-in-95 ${
					isPulsing ? "animate-unlock-pulse" : ""
				}`}
			>
				{/* Top Brass Identification Bar */}
				<div className="h-1.5 w-full bg-brass" />

				{/* Header */}
				<div className="p-4 sm:p-5 border-b border-slate-200 dark:border-white/10 flex items-start justify-between gap-4 bg-white/50 dark:bg-black/30">
					<div className="flex items-center gap-3.5 min-w-0">
						<div className="shrink-0 w-14 h-14 p-1 bg-white dark:bg-black/40 border border-slate-300 dark:border-white/20 rounded-lg">
							<img
								src={achievement.icon}
								alt={achievement.name}
								className="w-full h-full object-cover rounded"
								loading="lazy"
							/>
						</div>
						<div className="min-w-0">
							<div className="flex items-center gap-2 flex-wrap mb-1">
								{showTechnicalKeys && (
									<span className="font-mono text-[9px] uppercase tracking-wider text-slate-500 bg-slate-200/80 dark:bg-white/10 px-1.5 py-0.5 rounded">
										{achievement.id}
									</span>
								)}
								{walkthrough && (
									<span className="font-mono text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border border-brass/50 bg-amber-50 dark:bg-amber-950/30 text-brass">
										{walkthrough.game}
									</span>
								)}
								{walkthrough && (
									<span className="font-mono text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300">
										{walkthrough.category}
									</span>
								)}
							</div>
							<h2
								id="walkthrough-modal-title"
								className="font-serif font-black text-slate-900 dark:text-white uppercase tracking-wider text-base sm:text-lg line-clamp-1"
							>
								{achievement.name}
							</h2>
						</div>
					</div>

					<button
						type="button"
						onClick={onClose}
						className="shrink-0 p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white border-2 border-slate-300 dark:border-white/10 hover:border-slate-500 transition-colors cursor-pointer"
						aria-label="Close Walkthrough Dossier"
					>
						<XIcon weight="bold" className="w-5 h-5" />
					</button>
				</div>

				{/* Scrollable Content Body */}
				<div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
					{/* Save Status Assessment (when save data is loaded) */}
					{auditDetail && auditDetail.status !== "other_campaign" && (
						<div
							className={`p-4 border-2 rounded-xl ${
								auditDetail.status === "completed"
									? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500/40 text-emerald-900 dark:text-emerald-100"
									: auditDetail.status === "missed"
									? "bg-rose-50 dark:bg-rose-950/30 border-rose-500/40 text-rose-900 dark:text-rose-100"
									: "bg-amber-50 dark:bg-amber-950/30 border-amber-500/40 text-amber-900 dark:text-amber-100"
							}`}
						>
							<div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
								<div className="flex items-center gap-2">
									{auditDetail.status === "completed" ? (
										<CheckCircleIcon weight="fill" className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
									) : auditDetail.status === "missed" ? (
										<XCircleIcon weight="fill" className="w-4 h-4 text-rose-600 dark:text-rose-400" />
									) : (
										<ClockIcon weight="fill" className="w-4 h-4 text-amber-600 dark:text-amber-400" />
									)}
									<span className="font-serif font-black text-xs uppercase tracking-wider">
										Save Status: {auditDetail.badgeLabel}
									</span>
								</div>
								{currentTurn !== undefined && (
									<span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-black/10 dark:bg-white/10">
										Active Save: Turn {currentTurn}
									</span>
								)}
							</div>
							<p className="text-xs leading-relaxed opacity-90">
								{auditDetail.reason}
							</p>
						</div>
					)}

					{/* Description */}
					<div className="p-3.5 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10">
						<div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-1.5">
							<ScrollIcon className="w-3.5 h-3.5 text-brass" />
							<span>Description</span>
						</div>
						<p className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
							{achievement.description || "Hidden Achievement."}
						</p>

						{showTechnicalKeys && (achievement.rewards?.exp || achievement.rewards?.currency) && (
							<div className="mt-3 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center gap-3 text-xs font-mono">
								{achievement.rewards.exp && (
									<span className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-300 font-bold">
										<TrophyIcon className="w-3.5 h-3.5 text-brass" />
										+{achievement.rewards.exp} EXP
									</span>
								)}
								{achievement.rewards.currency ? (
									<span className="inline-flex items-center gap-1 text-amber-700 dark:text-amber-300 font-bold">
										<CoinsIcon className="w-3.5 h-3.5 text-brass" />
										{achievement.rewards.currency} Tokens
									</span>
								) : null}
							</div>
						)}
					</div>

					{/* A. Decision Prerequisites Checklist */}
					{walkthrough?.prerequisites && walkthrough.prerequisites.length > 0 && (
						<div>
							<h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
								<CheckCircleIcon className="w-3.5 h-3.5 text-treasury-teal" />
								<span>How to Unlock (Prerequisites & Strategy)</span>
							</h3>
							<div className="space-y-2">
								{walkthrough.prerequisites.map((req, idx) => (
									<div
										key={idx}
										className="flex items-start gap-2.5 p-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-700 dark:text-slate-300 leading-relaxed"
									>
										<div className="w-4 h-4 shrink-0 rounded bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700 flex items-center justify-center text-[10px] font-bold text-emerald-700 dark:text-emerald-300 mt-0.5">
											{idx + 1}
										</div>
										<div className="flex-1">{req}</div>
									</div>
								))}
							</div>
						</div>
					)}

					{/* B. Timeline & Location Encounter */}
					{walkthrough?.timeline && (
						<div>
							<h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
								<CalendarIcon className="w-3.5 h-3.5 text-brass" />
								<span>Encounter Timeline & In-Game Scene</span>
							</h3>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
								<div className="p-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10">
									<div className="text-[10px] font-mono text-slate-400 uppercase">Turn / Phase</div>
									<div className="text-sm font-bold font-serif text-slate-900 dark:text-white mt-0.5">
										{walkthrough.timeline.turn}
									</div>
								</div>
								<div className="p-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-start justify-between gap-2">
									<div className="min-w-0">
										<div className="text-[10px] font-mono text-slate-400 uppercase">Scene & Location</div>
										<div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5 leading-snug">
											{walkthrough.timeline.sceneTitle}
										</div>
										{showTechnicalKeys && walkthrough.timeline.sceneFile && (
											<div className="font-mono text-[9px] text-slate-400 mt-1 truncate" title={walkthrough.timeline.sceneFile}>
												Script Reference: {walkthrough.timeline.sceneFile}
											</div>
										)}
									</div>
									{matchedSceneId !== undefined && (
										<button
											type="button"
											onClick={() => {
												onClose();
												navigate({
													to: "/achievements",
													search: { tab: "walkthrough", scene: String(matchedSceneId) } as Record<string, string>,
												});
											}}
											className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold border border-brass/50 bg-brass/10 text-slate-900 dark:text-brass-light hover:bg-brass/20 rounded-md cursor-pointer"
											title="Open this scene in Scene Explorer"
										>
											<ChatsIcon weight="bold" className="w-3.5 h-3.5 text-brass" />
											<span>Open Scene</span>
										</button>
									)}
								</div>
							</div>
						</div>
					)}

					{/* C. Key Dialogue Choices */}
					{walkthrough?.dialogueSteps && walkthrough.dialogueSteps.length > 0 && (
						<div>
							<h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
								<ChatsIcon className="w-3.5 h-3.5 text-brass" />
								<span>Specific Required Choices & Dialogue Options</span>
							</h3>
							<div className="space-y-3">
								{walkthrough.dialogueSteps.map((step, idx) => (
									<div
										key={idx}
										className="p-3.5 bg-amber-50/60 dark:bg-black/30 border-2 border-brass/30 dark:border-brass/20 space-y-2"
									>
										<div className="flex items-center justify-between gap-2 flex-wrap">
											{step.context && (
												<div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
													{step.context}
												</div>
											)}
											{step.speaker && (
												<span className="font-mono text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-slate-200/80 dark:bg-white/10 text-slate-700 dark:text-slate-300">
													Speaker: {step.speaker}
												</span>
											)}
										</div>
										<div className="flex items-start gap-2 text-sm font-semibold text-slate-900 dark:text-white">
											<ArrowRightIcon className="w-4 h-4 text-brass shrink-0 mt-0.5" />
											<span>"{step.recommendedChoice}"</span>
										</div>
										{step.notes && (
											<div className="text-[11px] text-slate-500 dark:text-slate-400 italic pl-6">
												{step.notes}
											</div>
										)}
									</div>
								))}
							</div>
						</div>
					)}

					{/* D. Missable Warning / Pitfalls */}
					{walkthrough?.pitfalls && walkthrough.pitfalls.length > 0 && (
						<div className="p-4 bg-red-50/50 dark:bg-red-950/20 border-2 border-red-300 dark:border-red-900/50 space-y-1.5">
							<div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-red-800 dark:text-red-400">
								<WarningIcon className="w-4 h-4" />
								<span>Lockout Warnings & Pitfalls</span>
							</div>
							<ul className="list-disc list-inside space-y-1 text-xs text-red-700 dark:text-red-300 leading-relaxed">
								{walkthrough.pitfalls.map((pit, idx) => (
									<li key={idx}>{pit}</li>
								))}
							</ul>
						</div>
					)}

					{/* Save State Variables Footprint */}
					{conditionEntries.length > 0 && (
						<div className="p-3.5 rounded-xl bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/5 space-y-2">
							<div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
								Save File Conditions
							</div>
							<div className="space-y-2">
								{conditionEntries.map(({ varKey: v, op, value }) => {
									const currentVal = fileLoaded ? variablesMap.get(v) : undefined;
									const isBoolTrue = currentVal === true;
									const loc = findFieldLocation(v);
									const fieldDef = loc ? getFieldById(loc.fieldId) : getFieldById(v);
									const semanticLabel = causalGraph?.semanticDictionary[v]?.label;
									const humanLabel =
										semanticLabel ||
										(fieldDef ? fieldDef.label : v.replace(/^(BaseGame|RiziaDLC|RiziaDLCSupport|BaseGameSupport|Rizia)\./i, "").replace(/_/g, " "));
									const expectedText =
										op && value
											? value === "true"
												? op === "!="
													? "Needs: No"
													: "Needs: Yes"
												: value === "false"
												? op === "!="
													? "Needs: Yes"
													: "Needs: No"
												: `Needs: ${op === "==" ? "" : `${op} `}${value}`
											: null;

									return (
										<div
											key={v}
											className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 text-xs bg-white dark:bg-white/10 px-3 py-2.5 border border-slate-300 dark:border-white/10 text-slate-700 dark:text-slate-200 rounded-lg"
										>
											<div className="min-w-0 flex-1">
												<div className="font-semibold text-slate-900 dark:text-white truncate">
													{humanLabel}
												</div>
												{showTechnicalKeys && (
													<div className="font-mono text-[10px] text-slate-500 dark:text-slate-400 break-all">
														{v}
													</div>
												)}
												{(expectedText || fileLoaded) && (
													<div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-2 flex-wrap">
														{expectedText && (
															<span className="font-semibold text-slate-700 dark:text-slate-300">
																{expectedText}
															</span>
														)}
														{expectedText && fileLoaded && <span>·</span>}
														{fileLoaded && (
															<span>
																In your save:{" "}
																<span className="font-semibold">
																	{currentVal === undefined
																		? "Not set"
																		: currentVal === true
																		? "Yes"
																		: currentVal === false
																		? "No"
																		: String(currentVal)}
																</span>
															</span>
														)}
													</div>
												)}
											</div>
											<div className="flex items-center gap-1.5 flex-wrap shrink-0">
												{(() => {
													const varIdx = causalGraph?.variables[v];
													const hasGraphRefs =
														varIdx !== undefined &&
														((varIdx.mutatedIn?.length ?? 0) > 0 || (varIdx.readIn?.length ?? 0) > 0);
													if (hasGraphRefs) {
														return (
															<button
																type="button"
																onClick={() => {
																	onClose();
																	navigate({
																		to: "/achievements",
																		search: { tab: "walkthrough", var: v } as Record<string, string>,
																	});
																}}
																className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold border border-brass/50 bg-brass/10 text-slate-900 dark:text-brass-light hover:bg-brass/20 rounded-md cursor-pointer"
																title="See which scene & dialogue choice sets this condition"
															>
																<ChatsIcon weight="bold" className="w-3.5 h-3.5 text-brass" />
																<span>Find Choice</span>
															</button>
														);
													}
													if (matchedSceneId !== undefined) {
														return (
															<button
																type="button"
																onClick={() => {
																	onClose();
																	navigate({
																		to: "/achievements",
																		search: { tab: "walkthrough", scene: String(matchedSceneId) } as Record<string, string>,
																	});
																}}
																className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold border border-brass/50 bg-brass/10 text-slate-900 dark:text-brass-light hover:bg-brass/20 rounded-md cursor-pointer"
																title="Open this scene in Scene Explorer"
															>
																<ChatsIcon weight="bold" className="w-3.5 h-3.5 text-brass" />
																<span>Open Scene</span>
															</button>
														);
													}
													return null;
												})()}
												{fileLoaded && (
													<>
														<button
															type="button"
															onClick={() => handleJumpToFix(v)}
															className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold bg-slate-900 dark:bg-white/15 text-white hover:bg-slate-800 dark:hover:bg-white/25 rounded-md cursor-pointer"
														>
															<ArrowSquareOutIcon weight="bold" className="w-3.5 h-3.5 text-brass" />
															<span>Jump to Fix</span>
														</button>
														{typeof currentVal !== "number" && (!fieldDef || fieldDef.type === "checkbox" || fieldDef.type === "boolean-date") && (
															<button
																type="button"
																onClick={() => {
																	updateVariable(v, !isBoolTrue);
																	setToggledVar(v);
																	setTimeout(() => setToggledVar((c) => (c === v ? null : c)), 1200);
																}}
																className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold bg-brass text-slate-950 hover:bg-brass-light rounded-md cursor-pointer"
															>
																<WrenchIcon weight="bold" className="w-3 h-3" />
																<span>{toggledVar === v ? "Updated" : isBoolTrue ? "Set No" : "Set Yes"}</span>
															</button>
														)}
													</>
												)}
											</div>
										</div>
									);
								})}
							</div>
						</div>
					)}
				</div>

				{/* Footer */}
				<div className="p-3 sm:p-4 border-t border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-black/40 flex items-center justify-between text-xs text-slate-500">
					<span>Suzerain Companion</span>
					<button
						type="button"
						onClick={onClose}
						className="px-4 py-1.5 bg-slate-900 text-white dark:bg-brass dark:text-slate-950 font-bold uppercase tracking-wider rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
					>
						Close
					</button>
				</div>
			</div>
		</div>,
		document.body
	);
}
