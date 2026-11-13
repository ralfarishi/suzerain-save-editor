import { Pathway, PathwayTag } from "../../data/pathways";
import { steamAchievementByName, type SteamAchievement } from "../../data/steam_achievements";
import { AchievementWalkthroughModal } from "./AchievementWalkthroughModal";
import {
	WarningIcon,
	ListNumbersIcon,
	CaretDownIcon,
	TrophyIcon,
	CheckCircleIcon,
	XCircleIcon,
	ShieldCheckIcon,
	CodeIcon,
	FileTextIcon,
	CrosshairIcon,
} from "@phosphor-icons/react";
import { useState, useMemo, useRef } from "react";
import { useSave } from "../../context/SaveContext";

function doesPhaseMatchTurn(phase: string, turnNo: number): boolean {
	const lower = phase.toLowerCase();
	if (turnNo === 0) return lower.includes("prologue");
	if (turnNo >= 11) return lower.includes("epilogue") || lower.includes(`turn ${turnNo}`);
	const turnMatches = Array.from(lower.matchAll(/turn\s*(\d+)/g)).map((m) => Number(m[1]));
	if (turnMatches.includes(turnNo)) return true;
	const rangeMatch = /turns?\s*(\d+)\s*[-–—]\s*(\d+)/.exec(lower);
	if (rangeMatch) {
		const start = Number(rangeMatch[1]);
		const end = Number(rangeMatch[2]);
		return turnNo >= start && turnNo <= end;
	}
	return false;
}

const STATUS_BADGE_TEXT: Record<string, string> = {
	completed: "Unlocked",
	in_progress: "Next Up",
	missed: "Missed",
	other_campaign: "Other Campaign",
};

const TAG_STAMP_STYLES: Record<PathwayTag, { bg: string; border: string; text: string; symbol?: string }> = {
	Sordland: {
		bg: "bg-blue-100 dark:bg-blue-950/60",
		border: "border-blue-300 dark:border-blue-500/40",
		text: "text-blue-900 dark:text-blue-300",
		symbol: "§",
	},
	Rizia: {
		bg: "bg-purple-100 dark:bg-purple-950/60",
		border: "border-purple-300 dark:border-purple-500/40",
		text: "text-purple-900 dark:text-purple-300",
		symbol: "✦",
	},
	Both: {
		bg: "bg-amber-100 dark:bg-amber-950/60",
		border: "border-amber-300 dark:border-amber-500/40",
		text: "text-amber-900 dark:text-amber-300",
		symbol: "❖",
	},
	Reformist: {
		bg: "bg-emerald-100 dark:bg-emerald-950/60",
		border: "border-emerald-300 dark:border-emerald-500/40",
		text: "text-emerald-900 dark:text-emerald-300",
	},
	Authoritarian: {
		bg: "bg-red-100 dark:bg-red-950/60",
		border: "border-red-300 dark:border-red-500/40",
		text: "text-red-900 dark:text-red-300",
	},
	Diplomatic: {
		bg: "bg-sky-100 dark:bg-sky-950/60",
		border: "border-sky-300 dark:border-sky-500/40",
		text: "text-sky-900 dark:text-sky-300",
	},
	Economy: {
		bg: "bg-amber-100 dark:bg-amber-950/60",
		border: "border-amber-300 dark:border-amber-500/40",
		text: "text-amber-900 dark:text-amber-300",
	},
	Military: {
		bg: "bg-rose-100 dark:bg-rose-950/60",
		border: "border-rose-300 dark:border-rose-500/40",
		text: "text-rose-900 dark:text-rose-300",
		symbol: "⚔",
	},
	Special: {
		bg: "bg-amber-200/70 dark:bg-brass/30",
		border: "border-amber-400 dark:border-brass",
		text: "text-amber-950 dark:text-brass-light",
		symbol: "★",
	},
};

export function PathwayCard({ pathway, highlighted }: { pathway: Pathway; highlighted?: boolean }) {
	const [expanded, setExpanded] = useState(false);
	const [openTechStep, setOpenTechStep] = useState<number | null>(null);
	const [selectedWalkthroughAch, setSelectedWalkthroughAch] = useState<SteamAchievement | null>(null);
	const { fileLoaded, auditResults, auditSummary, showTechnicalKeys } = useSave();
	const currentPhaseRef = useRef<HTMLDivElement>(null);

	// Calculate live save compatibility when a save file is active
	const saveAlignment = useMemo(() => {
		if (!fileLoaded || !auditResults || auditResults.size === 0) return null;

		let completedCount = 0;
		let inProgressCount = 0;
		let missedCount = 0;

		for (const achName of pathway.achievements) {
			const achId = steamAchievementByName.get(achName)?.id ?? achName;
			const detail = auditResults.get(achId);
			if (!detail) continue;
			if (detail.status === "completed") completedCount++;
			else if (detail.status === "in_progress") inProgressCount++;
			else if (detail.status === "missed") missedCount++;
		}

		const total = pathway.achievements.length;
		const activeCount = completedCount + inProgressCount;
		const matchPercent = total > 0 ? Math.round((activeCount / total) * 100) : 0;

		return {
			turnNo: auditSummary?.turnNo ?? 0,
			campaignName: auditSummary?.campaignName ?? "Active Save",
			completedCount,
			inProgressCount,
			missedCount,
			matchPercent,
		};
	}, [fileLoaded, auditResults, auditSummary, pathway.achievements]);

	return (
		<div
			id={pathway.id}
			className={`p-6 rounded-xl border-2 bg-amber-50/40 dark:bg-black/20 shadow-sm relative overflow-hidden scroll-mt-24 transition-colors duration-300 ${
				highlighted
					? "border-brass ring-2 ring-brass/40"
					: "border-slate-300 dark:border-white/15"
			}`}
		>

			<div className="relative z-10">
				{/* Classification Stamps */}
				<div className="flex items-center gap-2.5 mb-4 flex-wrap">
					{pathway.tags.map((tag) => {
						const style = TAG_STAMP_STYLES[tag] || {
							bg: "bg-slate-200 dark:bg-slate-800/40",
							border: "border-slate-300 dark:border-slate-500/40",
							text: "text-slate-800 dark:text-slate-300",
						};

						return (
							<span
								key={tag}
								className={`inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-serif font-black uppercase tracking-widest border rounded-md shadow-sm ${style.bg} ${style.border} ${style.text}`}
							>
								{style.symbol && <span className="text-xs leading-none">{style.symbol}</span>}
								<span>{tag}</span>
							</span>
						);
					})}

					{/* Verified Badge */}
					<span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-500/40 text-emerald-900 dark:text-emerald-300 text-[10px] font-bold uppercase tracking-wider rounded-md">
						<CheckCircleIcon weight="fill" className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
						<span>Verified for Suzerain v{pathway.sourceVersion || "3.1.0"}</span>
					</span>

					{/* Live Save Compatibility Pill */}
					{saveAlignment && (
						<span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brass/15 border border-brass/50 text-slate-900 dark:text-brass-light text-[10px] font-bold uppercase tracking-wider rounded-md ml-auto">
							<ShieldCheckIcon weight="bold" className="w-3.5 h-3.5 text-brass" />
							<span>
								Live Save: {saveAlignment.matchPercent}% Match (Turn {saveAlignment.turnNo})
							</span>
						</span>
					)}
				</div>

				<h5 className="font-serif text-3xl font-bold text-slate-900 dark:text-white leading-tight">
					{pathway.title}
				</h5>
				<p className="font-serif italic text-sm text-slate-600 dark:text-slate-400 mb-4 mt-1">
					{pathway.subtitle}
				</p>

				{/* Source Subtitle */}
				<div className="flex items-center justify-between gap-2 flex-wrap mb-6 text-xs text-slate-600 dark:text-slate-400">
					<div className="flex items-center gap-2">
						<ShieldCheckIcon className="w-4 h-4 text-brass shrink-0" weight="bold" />
						<span className="font-semibold text-slate-800 dark:text-slate-200">
							{pathway.sourceName}
						</span>
					</div>
					{saveAlignment && pathway.steps.some((s) => doesPhaseMatchTurn(s.phase, saveAlignment.turnNo)) && (
						<button
							type="button"
							onClick={() => {
								setExpanded(true);
								requestAnimationFrame(() => {
									requestAnimationFrame(() => {
										currentPhaseRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
									});
								});
							}}
							className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brass/15 hover:bg-brass/25 border border-brass/50 text-xs font-bold text-slate-900 dark:text-brass-light cursor-pointer transition-colors"
						>
							<CrosshairIcon className="w-3.5 h-3.5 text-brass" weight="bold" />
							<span>Jump to Current Phase</span>
						</button>
					)}
				</div>

				<div className="mb-6">
					<p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-serif">
						{pathway.description}
					</p>
				</div>

				{pathway.disclaimer && (
					<div className="border-l-4 border-amber-600 bg-amber-100/50 dark:bg-amber-950/30 p-4 mb-6 shadow-inner relative overflow-hidden">
						<div className="absolute -right-4 -bottom-4 text-amber-600/10 font-serif font-black text-6xl rotate-12 select-none">!</div>
						<div className="flex gap-3 relative z-10">
							<WarningIcon weight="fill" className="w-5 h-5 text-amber-600 shrink-0" />
							<p className="text-xs font-mono text-amber-900 dark:text-amber-400 leading-relaxed">
								{pathway.disclaimer}
							</p>
						</div>
					</div>
				)}

				{/* Operational Briefing Accordion */}
				<div className="mb-8 border-2 border-slate-300 dark:border-white/15 bg-white dark:bg-warm-surface-dark shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)]">
					<button
						type="button"
						onClick={() => setExpanded(!expanded)}
						className="w-full flex items-center justify-between p-4 bg-slate-50 dark:bg-white/5 border-b-2 border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
					>
						<div className="flex items-center gap-3">
							<ListNumbersIcon className="w-5 h-5 text-slate-500" />
							<span className="font-bold text-sm uppercase tracking-wider text-slate-900 dark:text-white">
								Playthrough Steps ({pathway.steps.length} Phases)
							</span>
						</div>
						<CaretDownIcon className={`w-5 h-5 text-slate-400 transition-transform ${expanded ? "rotate-180" : ""}`} />
					</button>

					{expanded && (
						<div className="p-5 space-y-6 relative overflow-hidden">
							<div className="absolute top-10 bottom-10 left-[2.1rem] w-0.5 bg-slate-200 dark:bg-white/10 z-0"></div>

							{pathway.steps.map((step, idx) => {
								const isCurrentTurn = Boolean(
									saveAlignment && doesPhaseMatchTurn(step.phase, saveAlignment.turnNo)
								);
								const hasTechDetails =
									showTechnicalKeys &&
									step.technicalDetails &&
									(step.technicalDetails.sceneFile ||
										(step.technicalDetails.saveVariables &&
											step.technicalDetails.saveVariables.length > 0));
								const isTechOpen = openTechStep === idx;

								return (
									<div
										key={step.phase}
										ref={isCurrentTurn ? currentPhaseRef : undefined}
										className={`flex gap-4 relative z-10 p-3 rounded-lg transition-colors ${
											isCurrentTurn
												? "border-2 border-brass bg-brass/5 dark:bg-brass/10"
												: ""
										}`}
									>
										<div
											className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold font-serif shrink-0 shadow-sm ${
												isCurrentTurn
													? "border-brass bg-brass text-slate-950"
													: "border-slate-900 dark:border-white bg-white dark:bg-warm-bg-dark text-slate-900 dark:text-white"
											}`}
										>
											{idx + 1}
										</div>
										<div className="flex-1 min-w-0">
											<div className="flex items-center gap-2 flex-wrap">
												<h6 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
													{step.phase}
												</h6>
												{isCurrentTurn && (
													<span className="text-[9px] font-mono font-bold uppercase tracking-wider bg-brass text-slate-950 px-2 py-0.5 rounded">
														Current Turn in Active Save
													</span>
												)}
											</div>

											{step.context && (
												<p className="mt-1 text-xs italic font-serif text-slate-500 dark:text-slate-400">
													{step.context}
												</p>
											)}

											<ul className="mt-2 space-y-1.5">
												{step.actions.map((action, aIdx) => (
													<li
														key={aIdx}
														className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed flex items-start gap-2"
													>
														<span className="w-1.5 h-1.5 rounded-full bg-brass shrink-0 mt-2"></span>
														<span>{action}</span>
													</li>
												))}
											</ul>

											{/* Collapsible Technical Parameters for Modders / Power Users */}
											{hasTechDetails && (
												<div className="mt-3">
													<button
														type="button"
														onClick={() => setOpenTechStep(isTechOpen ? null : idx)}
														className="inline-flex items-center gap-1.5 text-[11px] font-mono text-slate-500 hover:text-brass dark:hover:text-brass-light transition-colors cursor-pointer"
													>
														<CodeIcon className="w-3.5 h-3.5" />
														<span>
															{isTechOpen
																? "Hide Technical Parameters"
																: "View Technical Parameters & Save Variables"}
														</span>
														<CaretDownIcon
															className={`w-3 h-3 transition-transform ${isTechOpen ? "rotate-180" : ""}`}
														/>
													</button>

													{isTechOpen && (
														<div className="mt-2 p-3 bg-slate-100 dark:bg-black/40 border border-slate-300 dark:border-white/10 rounded font-mono text-xs space-y-1.5">
															{step.technicalDetails?.sceneFile && (
																<div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
																	<FileTextIcon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
																	<span className="text-[10px] uppercase text-slate-400">
																		Scene File:
																	</span>
																	<code className="text-brass text-[11px]">
																		{step.technicalDetails.sceneFile}
																	</code>
																</div>
															)}
															{step.technicalDetails?.saveVariables &&
																step.technicalDetails.saveVariables.length > 0 && (
																	<div>
																		<span className="text-[10px] uppercase text-slate-400 block mb-1">
																			Tracked Engine Variables:
																		</span>
																		<div className="flex flex-wrap gap-1">
																			{step.technicalDetails.saveVariables.map((v) => (
																				<span
																					key={v}
																					className="px-1.5 py-0.5 bg-slate-200 dark:bg-white/10 rounded text-[10px] text-slate-800 dark:text-slate-200"
																				>
																					{v}
																				</span>
																			))}
																		</div>
																	</div>
																)}
														</div>
													)}
												</div>
											)}
										</div>
									</div>
								);
							})}
						</div>
					)}
				</div>

				{/* Associated Commendations */}
				<div className="pt-6 border-t-2 border-dashed border-slate-300 dark:border-white/15">
					<h6 className="text-xs font-black tracking-widest uppercase text-slate-400 mb-4">
						Associated Commendations ({pathway.achievements.length} Achievements In Scope)
					</h6>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{pathway.achievements.map((ach) => {
							const achievementData = steamAchievementByName.get(ach);
							const auditDetail = achievementData ? auditResults?.get(achievementData.id) : undefined;
							const auditStatus = auditDetail?.status;

							return (
								<div
									key={ach}
									className="flex gap-4 p-4 border border-slate-200 dark:border-white/10 bg-white dark:bg-warm-surface-dark shadow-[2px_2px_0px_0px_rgba(0,0,0,0.05)] items-center"
								>
									<div className="w-12 h-12 shrink-0 border-[3px] border-double border-brass bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center rounded-full shadow-inner overflow-hidden">
										{achievementData ? (
											<img
												src={achievementData.icon}
												alt={ach}
												className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal opacity-90"
											/>
										) : (
											<TrophyIcon className="w-6 h-6 text-brass" />
										)}
									</div>
									<div className="flex-1 min-w-0">
										<div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
											{showTechnicalKeys && achievementData?.id && (
												<span className="font-mono text-[8px] uppercase tracking-wider text-slate-400 bg-slate-100 dark:bg-white/10 px-1 py-0.5 rounded">
													{achievementData.id}
												</span>
											)}
											{auditStatus && (
												<span
													className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${
														auditStatus === "completed"
															? "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300"
															: auditStatus === "missed"
																? "bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300"
																: auditStatus === "other_campaign"
																	? "bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400"
																	: "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300"
													}`}
												>
													{STATUS_BADGE_TEXT[auditStatus] ?? auditDetail?.badgeLabel}
												</span>
											)}
										</div>
										<p className="font-serif font-bold text-slate-900 dark:text-white uppercase tracking-wider text-sm line-clamp-1">
											{ach}
										</p>
										<div className="flex items-center gap-2 mt-0.5">
											<p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">
												Primary Goal
											</p>
											{showTechnicalKeys && achievementData?.rewards?.exp && (
												<span className="font-mono text-[9px] text-slate-400 font-bold">
													+{achievementData.rewards.exp} EXP
												</span>
											)}
											{achievementData && (
												<button
													type="button"
													onClick={() => setSelectedWalkthroughAch(achievementData)}
													className="ml-auto text-[9px] font-mono font-bold uppercase tracking-wider text-brass hover:underline cursor-pointer"
												>
													Walkthrough →
												</button>
											)}
										</div>
									</div>
								</div>
							);
						})}

						{pathway.compatibleAchievements?.map((ach) => {
							const achievementData = steamAchievementByName.get(ach);
							return (
								<div
									key={ach}
									className="flex gap-4 p-4 border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.05)] items-center"
								>
									<div className="w-10 h-10 shrink-0 border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-black/20 flex items-center justify-center rounded-full overflow-hidden">
										{achievementData ? (
											<img
												src={achievementData.icon}
												alt={ach}
												className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal opacity-80"
											/>
										) : (
											<CheckCircleIcon className="w-5 h-5 text-slate-400" />
										)}
									</div>
									<div className="flex-1 min-w-0">
										<div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
											{showTechnicalKeys && achievementData?.id && (
												<span className="font-mono text-[8px] uppercase tracking-wider text-slate-400 bg-slate-100 dark:bg-white/10 px-1 py-0.5 rounded">
													{achievementData.id}
												</span>
											)}
										</div>
										<p className="font-serif font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-sm line-clamp-1">
											{ach}
										</p>
										<div className="flex items-center gap-2 mt-0.5">
											<p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">
												Compatible
											</p>
											{achievementData && (
												<button
													type="button"
													onClick={() => setSelectedWalkthroughAch(achievementData)}
													className="ml-auto text-[9px] font-mono font-bold uppercase tracking-wider text-slate-500 hover:text-slate-900 dark:hover:text-white hover:underline cursor-pointer"
												>
													Walkthrough →
												</button>
											)}
										</div>
									</div>
								</div>
							);
						})}
					</div>

					{pathway.incompatibleAchievements && pathway.incompatibleAchievements.length > 0 && (
						<div className="mt-4 p-4 border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/20">
							<p className="text-xs font-bold uppercase tracking-wider text-red-800 dark:text-red-400 mb-2">
								Incompatible Achievements
							</p>
							<div className="flex flex-wrap gap-2">
								{pathway.incompatibleAchievements.map((ach) => (
									<span
										key={ach}
										className="text-xs font-mono text-red-600 dark:text-red-400 flex items-center gap-1 bg-white dark:bg-black/20 px-2 py-1 border border-red-200 dark:border-red-900/50"
									>
										<XCircleIcon className="w-3 h-3" /> {ach}
									</span>
								))}
							</div>
						</div>
					)}
				</div>
			</div>

			<AchievementWalkthroughModal
				achievement={selectedWalkthroughAch}
				isOpen={Boolean(selectedWalkthroughAch)}
				onClose={() => setSelectedWalkthroughAch(null)}
			/>
		</div>
	);
}
