import { memo } from "react";

import { achievementPathwaysMap } from "../../data/pathways";
import { QuestionIcon, BooksIcon } from "@phosphor-icons/react";
import { Tooltip } from "../Tooltip";

export const AchievementCard = memo(({ ach, onNavigateToGuides }: { ach: any, onNavigateToGuides: () => void }) => {
	const lowerAchName = ach.name.toLowerCase();
	const pathwaysWithAch = achievementPathwaysMap.get(lowerAchName) || [];

	return (
		<div
			className="group flex gap-4 p-4 bg-slate-50 dark:bg-white/5 border-2 border-slate-200 dark:border-white/10 hover:border-brass/50 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)] bg-noise relative z-0 hover:z-10"
		>
			<div className="shrink-0 w-16 h-16 p-1 bg-white dark:bg-black/40 border-2 border-slate-300 dark:border-white/20 group-hover:border-brass/50 transition-colors shadow-inner">
				<img
					src={ach.icon}
					alt={ach.name}
					className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
					loading="lazy"
					decoding="async"
				/>
			</div>
			<div className="flex-1 min-w-0 flex flex-col justify-center">
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

				{ach.hint && (
					<div className="mt-1.5 flex items-center gap-1.5">
						<Tooltip content={ach.hint}>
							<div className="flex items-center gap-1.5 px-2 py-1 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 rounded-lg group/tooltip cursor-help transition-all hover:bg-blue-100 dark:hover:bg-blue-900/40">
								<QuestionIcon
									weight="bold"
									className="w-3 h-3 text-blue-600 dark:text-blue-400 group-hover/tooltip:scale-110 transition-transform"
								/>
								<span className="text-[10px] text-blue-700 dark:text-blue-300 font-bold uppercase tracking-wider">
									Hint
								</span>
							</div>
						</Tooltip>
					</div>
				)}

				{pathwaysWithAch.length > 0 && (
					<button type="button"
						onClick={onNavigateToGuides}
						className="mt-2.5 flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-warm-accent hover:text-warm-accent-hover w-fit transition-colors cursor-pointer"
					>
						<BooksIcon className="w-3.5 h-3.5" />
						Verify Guide Available
					</button>
				)}
			</div>
		</div>
	);
});

AchievementCard.displayName = "AchievementCard";
