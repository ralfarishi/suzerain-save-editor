import { useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "@tanstack/react-router";
import { XIcon, ArrowSquareOutIcon, CaretDownIcon, CaretRightIcon, TrophyIcon } from "@phosphor-icons/react";
import { CausalGraph, VariableIndex, getSemanticLabel } from "../../utils/causal-graph";
import { steamAchievements } from "../../data/steam_achievements";
import { findFieldLocation } from "../../utils/save-manager";
import { useSave } from "../../context/SaveContext";
import { useDialogBehavior } from "../../hooks/useDialogBehavior";
import { formatSaveValue, formatTurnLabel } from "../../utils/save-formatters";

interface CausalChainDrawerProps {
	graph: CausalGraph;
	varKey: string | null;
	onClose: () => void;
	onSelectSceneById: (convId: number, nodeId?: number) => void;
}

const achievementNameMap = new Map<string, string>(
	steamAchievements.map((a) => [a.id, a.name])
);

export function CausalChainDrawer({
	graph,
	varKey,
	onClose,
	onSelectSceneById,
}: CausalChainDrawerProps) {
	const navigate = useNavigate();
	const { fileLoaded, variablesMap, showTechnicalKeys } = useSave();
	const [settersOpen, setSettersOpen] = useState(true);
	const [checkersOpen, setCheckersOpen] = useState(true);

	useDialogBehavior(Boolean(varKey), onClose);

	if (!varKey) return null;

	const varIndex: VariableIndex | undefined = graph.variables[varKey];
	const mutatedIn = varIndex?.mutatedIn ?? [];
	const readIn = varIndex?.readIn ?? [];
	const linkedAchievements = varIndex?.achievements ?? [];
	const humanLabel = getSemanticLabel(graph, varKey);
	const currentVal = fileLoaded ? variablesMap.get(varKey) : undefined;

	const handleJumpToFix = () => {
		const loc = findFieldLocation(varKey);
		onClose();
		if (loc) {
			navigate({ to: "/", search: { tab: loc.tabId, focus: loc.fieldId } });
		} else {
			navigate({ to: "/", search: { focus: varKey } });
		}
	};

	return createPortal(
		<div
			className="fixed inset-0 z-80 flex justify-end bg-black/70 backdrop-blur-xs animate-fade-in"
			onClick={onClose}
			role="dialog"
			aria-modal="true"
			aria-label="How This Choice Affects Your Story"
		>
			<div
				className="w-full max-w-lg h-full bg-white dark:bg-warm-surface-dark border-l-4 border-brass shadow-2xl flex flex-col animate-drawer-slide"
				onClick={(e) => e.stopPropagation()}
			>
				{/* Header */}
				<div className="px-6 py-4 border-b border-slate-200 dark:border-white/10 flex items-start justify-between gap-4 bg-slate-50 dark:bg-black/40 shrink-0">
					<div className="min-w-0">
						<div className="text-[11px] font-bold uppercase tracking-wider text-brass mb-1">
							How This Choice Affects Your Story
						</div>
						<h3 className="text-base sm:text-lg font-serif font-bold text-slate-900 dark:text-white leading-snug">
							{humanLabel}
						</h3>
						{showTechnicalKeys && (
							<div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 break-all mt-1">
								{varKey}
							</div>
						)}
					</div>
					<button
						type="button"
						onClick={onClose}
						aria-label="Close story impact drawer"
						className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-200/60 dark:hover:bg-white/10 transition-colors cursor-pointer shrink-0"
					>
						<XIcon className="w-5 h-5" />
					</button>
				</div>

				{/* Body */}
				<div className="flex-1 overflow-y-auto p-6 space-y-5">
					{/* Current Save Value + Jump to Fix */}
					{fileLoaded && (
						<div className="p-4 rounded-xl border border-brass/40 bg-amber-50/60 dark:bg-amber-950/20 flex items-center justify-between gap-3 flex-wrap">
							<div>
								<div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
									In Your Save
								</div>
								<div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
									{formatSaveValue(currentVal)}
								</div>
							</div>
							<button
								type="button"
								onClick={handleJumpToFix}
								className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900 dark:bg-brass text-white dark:text-slate-950 text-xs font-bold uppercase tracking-wider cursor-pointer hover:opacity-90"
							>
								<ArrowSquareOutIcon weight="bold" className="w-4 h-4" />
								<span>Jump to Fix in Save</span>
							</button>
						</div>
					)}

					{!varIndex ? (
						<p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
							This save flag is tracked by the game engine or chapter progression rather than a specific dialogue choice.
						</p>
					) : (
						<>
							{/* Where This Is Set */}
							<div className="border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden">
								<button
									type="button"
									onClick={() => setSettersOpen((p) => !p)}
									className="w-full px-4 py-3 bg-slate-50 dark:bg-black/30 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 cursor-pointer"
								>
									<span>Where This Is Set ({mutatedIn.length})</span>
									{settersOpen ? <CaretDownIcon className="w-4 h-4" /> : <CaretRightIcon className="w-4 h-4" />}
								</button>
								{settersOpen && (
									<div className="p-3 space-y-2 max-h-56 overflow-y-auto">
										{mutatedIn.length === 0 ? (
											<p className="text-xs text-slate-500 dark:text-slate-400 px-1">None recorded.</p>
										) : (
											mutatedIn.map((m, idx) => (
												<button
													key={idx}
													type="button"
													disabled={m.convId === undefined}
													onClick={() => {
														if (m.convId !== undefined) {
															onSelectSceneById(m.convId, m.nodeId);
															onClose();
														}
													}}
													className="w-full text-left p-2.5 rounded-lg bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-xs transition-colors cursor-pointer disabled:cursor-default"
												>
													<div className="flex items-center justify-between gap-2">
														<div className="font-semibold text-slate-900 dark:text-white">
															{formatTurnLabel(m.turn)} · {m.title || (m.convId !== undefined ? `Scene ${m.convId}` : "Story Event")}
														</div>
														{m.convId !== undefined && (
															<span className="text-[10px] font-bold uppercase text-brass shrink-0">
																{m.nodeId !== undefined ? "Jump to Choice →" : "Open Scene →"}
															</span>
														)}
													</div>
													<div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
														Sets to: <span className="font-semibold text-brass">{m.value}</span>
													</div>
												</button>
											))
										)}
									</div>
								)}
							</div>

							{/* Where This Matters Later */}
							<div className="border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden">
								<button
									type="button"
									onClick={() => setCheckersOpen((p) => !p)}
									className="w-full px-4 py-3 bg-slate-50 dark:bg-black/30 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 cursor-pointer"
								>
									<span>Where This Matters Later ({readIn.length})</span>
									{checkersOpen ? <CaretDownIcon className="w-4 h-4" /> : <CaretRightIcon className="w-4 h-4" />}
								</button>
								{checkersOpen && (
									<div className="p-3 space-y-2 max-h-56 overflow-y-auto">
										{readIn.length === 0 ? (
											<p className="text-xs text-slate-500 dark:text-slate-400 px-1">None recorded.</p>
										) : (
											readIn.map((r, idx) => (
												<button
													key={idx}
													type="button"
													disabled={r.convId === undefined}
													onClick={() => {
														if (r.convId !== undefined) {
															onSelectSceneById(r.convId, r.nodeId);
															onClose();
														}
													}}
													className="w-full text-left p-2.5 rounded-lg bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-xs transition-colors cursor-pointer disabled:cursor-default"
												>
													<div className="flex items-center justify-between gap-2">
														<div className="font-semibold text-slate-900 dark:text-white">
															{formatTurnLabel(r.turn)} · {r.title || (r.convId !== undefined ? `Scene ${r.convId}` : "Story Check")}
														</div>
														{r.convId !== undefined && (
															<span className="text-[10px] font-bold uppercase text-brass shrink-0">
																{r.nodeId !== undefined ? "Jump to Check →" : "Open Scene →"}
															</span>
														)}
													</div>
													{showTechnicalKeys && (
														<div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-0.5">
															{r.condition}
														</div>
													)}
												</button>
											))
										)}
									</div>
								)}
							</div>

							{/* Related Achievements */}
							{linkedAchievements.length > 0 && (
								<div className="space-y-2">
									<div className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
										<TrophyIcon className="w-4 h-4 text-brass" />
										<span>Related Achievements ({linkedAchievements.length})</span>
									</div>
									<div className="flex flex-wrap gap-2">
										{linkedAchievements.map((achId) => {
											const name = achievementNameMap.get(achId) ?? achId;
											return (
												<button
													key={achId}
													type="button"
													onClick={() => {
														onClose();
														navigate({
															to: "/achievements",
															search: { tab: "gallery", q: name } as Record<string, string>,
														});
													}}
													className="px-2.5 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-brass/40 text-xs font-semibold text-slate-800 dark:text-amber-200 hover:border-brass cursor-pointer"
												>
													{name}
													{showTechnicalKeys && (
														<span className="ml-1.5 font-mono text-[10px] opacity-60">({achId})</span>
													)}
												</button>
											);
										})}
									</div>
								</div>
							)}
						</>
					)}
				</div>
			</div>
		</div>,
		document.body
	);
}
