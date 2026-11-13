import { CheckCircleIcon, XCircleIcon, XIcon, TrophyIcon } from "@phosphor-icons/react";
import { useSave } from "../../context/SaveContext";

interface ToastNotificationProps {
	toast: { type: "success" | "error"; message: string } | null;
	onClose?: () => void;
}

export function ToastNotification({ toast, onClose }: ToastNotificationProps) {
	if (!toast) return null;

	return (
		<div
			className={`
      fixed bottom-6 right-6 max-w-sm w-full border-2 p-4 rounded-xl shadow-2xl flex gap-3 animate-telegram-toast z-50 justify-between items-start
      ${toast.type === "success" ? "bg-amber-50 dark:bg-amber-950 border-brass dark:border-brass-light" : "bg-red-50 dark:bg-red-950/80 border-red-500"}
    `}
		>
			<div className="flex gap-3">
				{toast.type === "success" ? (
					<CheckCircleIcon className="w-6 h-6 shrink-0 text-brass dark:text-brass-light mt-0.5" />
				) : (
					<XCircleIcon className="w-6 h-6 shrink-0 text-red-600 dark:text-red-400 mt-0.5" />
				)}
				<div
					className={`text-sm ${toast.type === "success" ? "text-slate-900 dark:text-amber-200" : "text-red-900 dark:text-red-200"}`}
				>
					<h4 className="font-bold uppercase tracking-wider mb-1 text-xs">
						{toast.type === "success" ? "SAVED" : "SOMETHING WENT WRONG"}
					</h4>
					<p className="leading-relaxed opacity-90">{toast.message}</p>
				</div>
			</div>
			{onClose && (
				<button
					type="button"
					onClick={onClose}
					className="text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 transition-colors p-0.5 rounded cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass"
					aria-label="Close notification"
				>
					<XIcon className="w-4 h-4" />
				</button>
			)}
		</div>
	);
}

const STATUS_LABEL: Record<string, string> = {
	completed: "Unlocked in Save",
	in_progress: "Achievable Next",
	missed: "Missed",
	other_campaign: "Other Campaign",
};

export function LiveAchievementToasts() {
	const { recentTransitions, dismissTransition } = useSave();

	if (recentTransitions.length === 0) return null;

	return (
		<div className="fixed bottom-20 md:bottom-6 left-4 right-4 md:left-auto md:right-6 z-70 flex flex-col gap-2 max-w-sm md:w-full pointer-events-none">
			{recentTransitions.map((t) => {
				const isUnlocked = t.toStatus === "completed";
				return (
					<div
						key={t.id}
						className={`pointer-events-auto border-2 p-3.5 rounded-xl shadow-2xl flex items-start justify-between gap-3 animate-telegram-toast ${
							isUnlocked
								? "bg-emerald-950/95 border-emerald-400 text-emerald-100"
								: "bg-slate-900/95 border-brass text-slate-100"
						}`}
					>
						<div className="flex items-start gap-2.5 min-w-0">
							<TrophyIcon
								weight="fill"
								className={`w-5 h-5 shrink-0 mt-0.5 ${isUnlocked ? "text-emerald-400" : "text-brass"}`}
							/>
							<div className="min-w-0">
								<div className="text-[11px] font-bold uppercase tracking-wider text-brass-light">
									{isUnlocked ? "Achievement Ready!" : "Achievement Status Changed"}
								</div>
								<div className="text-sm font-semibold truncate">{t.title}</div>
								<div className="text-xs opacity-80 mt-0.5">
									Now: {STATUS_LABEL[t.toStatus] ?? t.toStatus}
								</div>
							</div>
						</div>
						<button
							type="button"
							onClick={() => dismissTransition(t.id)}
							aria-label="Dismiss achievement notification"
							className="p-1 text-slate-400 hover:text-white rounded cursor-pointer"
						>
							<XIcon className="w-4 h-4" />
						</button>
					</div>
				);
			})}
		</div>
	);
}
