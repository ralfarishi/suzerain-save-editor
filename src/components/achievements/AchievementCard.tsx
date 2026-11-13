import { memo } from "react";
import type { SteamAchievement, AchievementTriggerType } from "../../data/steam_achievements";
import { achievementPathwaysMap } from "../../data/pathways";
import type { AchievementAuditDetail } from "../../utils/save-audit";
import {
	QuestionIcon,
	BooksIcon,
	ChatsIcon,
	ScrollIcon,
	BookOpenIcon,
	TrophyIcon,
	ShieldCheckIcon,
	CoinsIcon,
	CheckCircleIcon,
	ClockIcon,
	XCircleIcon,
} from "@phosphor-icons/react";
import { Tooltip } from "../Tooltip";
import { useSave } from "../../context/SaveContext";

const TRIGGER_LABELS: Record<AchievementTriggerType, { label: string; icon: typeof ChatsIcon; badgeClass: string }> = {
	in_scene: {
		label: "Dialogue Choice",
		icon: ChatsIcon,
		badgeClass: "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300",
	},
	conditional: {
		label: "Policy Decision",
		icon: ScrollIcon,
		badgeClass: "bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800 text-purple-800 dark:text-purple-300",
	},
	story: {
		label: "Story Arc",
		icon: BookOpenIcon,
		badgeClass: "bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300",
	},
	collectible: {
		label: "Collectible",
		icon: TrophyIcon,
		badgeClass: "bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300",
	},
	tactical: {
		label: "Tactical / War",
		icon: ShieldCheckIcon,
		badgeClass: "bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300",
	},
};

interface Props {
	ach: SteamAchievement;
	auditDetail?: AchievementAuditDetail;
	onNavigateToGuides: () => void;
	onOpenWalkthrough: (ach: SteamAchievement) => void;
}

export const AchievementCard = memo(({ ach, auditDetail, onNavigateToGuides, onOpenWalkthrough }: Props) => {
	const { showTechnicalKeys, recentlyChangedAchievementIds } = useSave();
	const lowerAchName = ach.name.toLowerCase();
	const pathwaysWithAch = achievementPathwaysMap.get(lowerAchName) || [];
	const triggerInfo = ach.triggerType ? TRIGGER_LABELS[ach.triggerType] : undefined;
	const TriggerIcon = triggerInfo?.icon;
	const isPulsing = recentlyChangedAchievementIds.has(ach.id);

	return (
		<div
			className={`group flex flex-col p-4 bg-slate-50 dark:bg-white/5 border-2 border-slate-200 dark:border-white/10 hover:border-brass/50 transition-colors rounded-xl shadow-sm relative z-0 hover:z-10 ${
				isPulsing ? "animate-unlock-pulse border-brass ring-2 ring-brass/40" : ""
			}`}
		>
			<div className="flex gap-4">
				<div className="shrink-0 w-16 h-16 p-1 bg-white dark:bg-black/40 border-2 border-slate-300 dark:border-white/20 group-hover:border-brass/50 transition-colors rounded-lg">
					<img
						src={ach.icon}
						alt={ach.name}
						className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-opacity duration-200 rounded"
						loading="lazy"
						decoding="async"
					/>
				</div>
				<div className="flex-1 min-w-0 flex flex-col justify-center">
					<div className="flex items-center gap-1.5 flex-wrap mb-1.5">
						{auditDetail && auditDetail.status !== "other_campaign" && (
							<span
								title={auditDetail.reason}
								className={`inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border ${
									auditDetail.status === "completed"
										? "bg-emerald-100 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300"
										: auditDetail.status === "missed"
										? "bg-rose-100 dark:bg-rose-950/60 border-rose-300 dark:border-rose-700 text-rose-800 dark:text-rose-300"
										: "bg-amber-100 dark:bg-amber-950/60 border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-300"
								}`}
							>
								{auditDetail.status === "completed" ? (
									<CheckCircleIcon weight="bold" className="w-3 h-3" />
								) : auditDetail.status === "missed" ? (
									<XCircleIcon weight="bold" className="w-3 h-3" />
								) : (
									<ClockIcon weight="bold" className="w-3 h-3" />
								)}
								{auditDetail.badgeLabel}
							</span>
						)}
						{triggerInfo && TriggerIcon && (
							<span className={`inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border ${triggerInfo.badgeClass}`}>
								<TriggerIcon className="w-3 h-3" />
								{triggerInfo.label}
							</span>
						)}
						{showTechnicalKeys && (
							<span className="font-mono text-[9px] uppercase tracking-wider text-slate-500 bg-slate-200/70 dark:bg-white/10 px-1.5 py-0.5 rounded">
								{ach.id}
							</span>
						)}
						{showTechnicalKeys && ach.rewards?.exp && (
							<span className="inline-flex items-center gap-1 font-mono text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-700 dark:text-slate-300">
								+{ach.rewards.exp} EXP
							</span>
						)}
						{showTechnicalKeys && ach.rewards?.currency ? (
							<span className="inline-flex items-center gap-0.5 font-mono text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200">
								<CoinsIcon className="w-2.5 h-2.5" />
								{ach.rewards.currency}
							</span>
						) : null}
					</div>

					<h3
						className="font-bold text-slate-900 dark:text-white line-clamp-1 uppercase tracking-wider text-sm"
						title={ach.name}
					>
						{ach.name}
					</h3>
					<p
						className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed"
						title={ach.description || "Hidden Achievement"}
					>
						{ach.description || (
							<span className="italic opacity-50">Hidden Achievement</span>
						)}
					</p>

					<div className="mt-2.5 flex items-center gap-2 flex-wrap">
						{ach.hint && (
							<Tooltip content={ach.hint}>
								<div className="flex items-center gap-1.5 px-2 py-1 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 rounded group/tooltip cursor-help transition-all hover:bg-blue-100 dark:hover:bg-blue-900/40">
									<QuestionIcon
										weight="bold"
										className="w-3 h-3 text-blue-600 dark:text-blue-400 group-hover/tooltip:scale-110 transition-transform"
									/>
									<span className="text-[10px] text-blue-700 dark:text-blue-300 font-bold uppercase tracking-wider">
										Hint
									</span>
								</div>
							</Tooltip>
						)}

						{/* Primary Walkthrough CTA */}
						<button
							type="button"
							onClick={() => onOpenWalkthrough(ach)}
							className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white dark:bg-white/10 hover:bg-amber-50 dark:hover:bg-white/15 border-2 border-slate-300 dark:border-white/20 hover:border-brass dark:hover:border-brass text-slate-900 dark:text-slate-100 font-mono text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer"
							title="Open Achievement Hunting Walkthrough"
						>
							<ScrollIcon className="w-3 h-3 text-brass" />
							<span>Walkthrough</span>
						</button>

						{pathwaysWithAch.length > 0 && (
							<button
								type="button"
								onClick={onNavigateToGuides}
								className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-warm-accent hover:text-warm-accent-hover transition-colors cursor-pointer ml-auto"
							>
								<BooksIcon className="w-3.5 h-3.5" />
								<span>Pathway</span>
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
});

AchievementCard.displayName = "AchievementCard";
