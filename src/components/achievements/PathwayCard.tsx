import { Pathway, PathwayTag } from "../../data/pathways";
import { steamAchievements } from "../../data/steam_achievements";
import { WarningIcon, ListNumbersIcon, CaretDownIcon, TrophyIcon, CheckCircleIcon, XCircleIcon, ArrowSquareOutIcon } from "@phosphor-icons/react";
import { useState } from "react";

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
	Special: {
		bg: "bg-amber-200/70 dark:bg-brass/30",
		border: "border-amber-400 dark:border-brass",
		text: "text-amber-950 dark:text-brass-light",
		symbol: "★",
	},
};

export function PathwayCard({ pathway, highlighted }: { pathway: Pathway; highlighted?: boolean }) {
	const [expanded, setExpanded] = useState(false);

	return (
		<div
			id={pathway.id}
			className={`p-6 border-2 bg-amber-50/50 dark:bg-black/20 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.08)] relative overflow-hidden bg-noise scroll-mt-24 transition-all duration-700 ${
				highlighted
					? "border-brass shadow-[0_0_0_3px_rgba(184,134,11,0.4),4px_4px_0px_0px_rgba(0,0,0,0.08)] animate-pulse-subtle"
					: "border-slate-300 dark:border-white/15"
			}`}
		>
			<div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.03] dark:opacity-5 pointer-events-none text-9xl font-serif font-black rotate-[-20deg] select-none">
				CLASSIFIED
			</div>
			
			<div className="relative z-10">
				{/* Classification Stamps */}
				<div className="flex items-center gap-2.5 mb-5 flex-wrap">
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

					{/* Declassified Certification Seal */}
					{pathway.isVerifiedLatest ? (
						<span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-500/40 text-emerald-900 dark:text-emerald-300 text-[10px] font-serif font-black uppercase tracking-widest rounded-md shadow-sm">
							<CheckCircleIcon weight="fill" className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
							<span>VERIFIED DOSSIER • V{pathway.sourceVersion}</span>
						</span>
					) : (
						<span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-500/40 text-amber-900 dark:text-amber-300 text-[10px] font-serif font-black uppercase tracking-widest rounded-md shadow-sm">
							<WarningIcon weight="fill" className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
							<span>LEGACY DOSSIER • V{pathway.sourceVersion}</span>
						</span>
					)}
				</div>
				
				<h5 className="font-serif text-3xl font-bold text-slate-900 dark:text-white leading-tight">
					Operation: {pathway.title}
				</h5>
				<p className="font-serif italic text-sm text-slate-600 dark:text-slate-400 mb-6 mt-1">
					{pathway.subtitle}
				</p>

				<p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 flex-wrap mb-6">
					<span className="font-medium">Verified Source:</span>
					<a
						href={pathway.sourceLink}
						target="_blank"
						rel="noopener noreferrer"
						className="text-warm-accent hover:text-warm-accent-hover hover:underline inline-flex items-center gap-1"
					>
						{pathway.sourceName}
						<ArrowSquareOutIcon className="w-3 h-3" />
					</a>
				</p>

				<div className="mb-6">
					<p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-serif">
						{pathway.description}
					</p>
				</div>

				{(pathway.disclaimer || !pathway.isVerifiedLatest) && (
					<div className="border-l-4 border-amber-600 bg-amber-100/50 dark:bg-amber-950/30 p-4 mb-6 shadow-inner relative overflow-hidden">
						<div className="absolute -right-4 -bottom-4 text-amber-600/10 font-serif font-black text-6xl rotate-12 select-none">!</div>
						<div className="flex gap-3 relative z-10">
							<WarningIcon weight="fill" className="w-5 h-5 text-amber-600 shrink-0" />
							<p className="text-xs font-mono text-amber-900 dark:text-amber-400">
								{!pathway.isVerifiedLatest && <strong className="block mb-1 tracking-widest uppercase">Warning: Outdated Intel (v{pathway.sourceVersion})</strong>}
								{pathway.disclaimer || "Core strategy is viable, but specific dialogue options may differ in the latest administration. Use with caution."}
							</p>
						</div>
					</div>
				)}

				<div className="mb-8 border-2 border-slate-300 dark:border-white/15 bg-white dark:bg-warm-surface-dark shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)]">
					<button type="button" 
						onClick={() => setExpanded(!expanded)}
						className="w-full flex items-center justify-between p-4 bg-slate-50 dark:bg-white/5 border-b-2 border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
					>
						<div className="flex items-center gap-3">
							<ListNumbersIcon className="w-5 h-5 text-slate-500" />
							<span className="font-bold text-sm uppercase tracking-wider text-slate-900 dark:text-white">
								Operational Briefing Steps
							</span>
						</div>
						<CaretDownIcon className={`w-5 h-5 text-slate-400 transition-transform ${expanded ? "rotate-180" : ""}`} />
					</button>
					{expanded && (
						<div className="p-5 space-y-6 relative overflow-hidden">
							<div className="absolute top-10 bottom-10 left-[2.1rem] w-0.5 bg-slate-200 dark:bg-white/10 z-0"></div>
							
							{pathway.steps.map((step, idx) => (
								<div key={step.phase} className="flex gap-4 relative z-10">
									<div className="w-8 h-8 rounded-full border-2 border-slate-900 dark:border-white bg-white dark:bg-warm-bg-dark flex items-center justify-center font-bold font-serif shrink-0 text-slate-900 dark:text-white shadow-sm">
										{idx + 1}
									</div>
									<div>
										<h6 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
											{step.phase}
										</h6>
										<ul className="mt-2 space-y-1">
											{step.actions.map((action, aIdx) => (
												<li key={aIdx} className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed flex items-start gap-2">
													<span className="w-1.5 h-1.5 rounded-full bg-brass shrink-0 mt-1.5"></span>
													{action}
												</li>
											))}
										</ul>
									</div>
								</div>
							))}
						</div>
					)}
				</div>

				<div className="pt-6 border-t-2 border-dashed border-slate-300 dark:border-white/15">
					<h6 className="text-xs font-black tracking-widest uppercase text-slate-400 mb-4">
						Associated Commendations (Primary & Compatible)
					</h6>
					
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{pathway.achievements.map((ach) => {
							const achievementData = steamAchievements.find((a) => a.name === ach);
							return (
								<div key={ach} className="flex gap-5 p-5 border border-slate-200 dark:border-white/10 bg-white dark:bg-warm-surface-dark shadow-[2px_2px_0px_0px_rgba(0,0,0,0.05)] items-center">
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
									<div>
										<p className="font-serif font-bold text-slate-900 dark:text-white uppercase tracking-wider text-sm line-clamp-1">
											{ach}
										</p>
										<p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider mt-0.5">
											Primary Goal
										</p>
									</div>
								</div>
							);
						})}
						
						{pathway.compatibleAchievements.map((ach) => {
							const achievementData = steamAchievements.find((a) => a.name === ach);
							return (
								<div key={ach} className="flex gap-5 p-5 border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.05)] items-center">
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
									<div>
										<p className="font-serif font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-sm line-clamp-1">
											{ach}
										</p>
										<p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider mt-0.5">
											Compatible
										</p>
									</div>
								</div>
							);
						})}
					</div>
					
					{pathway.incompatibleAchievements.length > 0 && (
						<div className="mt-4 p-4 border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/20">
							<p className="text-xs font-bold uppercase tracking-wider text-red-800 dark:text-red-400 mb-2">
								Incompatible Achievements
							</p>
							<div className="flex flex-wrap gap-2">
								{pathway.incompatibleAchievements.map(ach => (
									<span key={ach} className="text-xs font-mono text-red-600 dark:text-red-400 flex items-center gap-1 bg-white dark:bg-black/20 px-2 py-1 border border-red-200 dark:border-red-900/50">
										<XCircleIcon className="w-3 h-3" /> {ach}
									</span>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
