import { CheckCircleIcon, XCircleIcon } from "@phosphor-icons/react";

interface ToastNotificationProps {
	toast: { type: "success" | "error"; message: string } | null;
}

export function ToastNotification({ toast }: ToastNotificationProps) {
	if (!toast) return null;

	return (
		<div
			className={`
      fixed bottom-6 right-6 max-w-sm w-full border-2 p-4 rounded shadow-2xl flex gap-3 animate-telegram-toast z-50
      ${toast.type === "success" ? "bg-amber-50 dark:bg-amber-950 border-brass dark:border-brass-light" : "bg-red-50 dark:bg-red-950/80 border-red-500"}
    `}
		>
			{toast.type === "success" ? (
				<CheckCircleIcon className="w-6 h-6 shrink-0 text-brass dark:text-brass-light mt-0.5" />
			) : (
				<XCircleIcon className="w-6 h-6 shrink-0 text-red-600 dark:text-red-400 mt-0.5" />
			)}
			<div
				className={`font-mono text-sm ${toast.type === "success" ? "text-slate-900 dark:text-amber-200" : "text-red-900 dark:text-red-200"}`}
			>
				<h4 className="font-bold uppercase tracking-wider mb-1">
					{toast.type === "success" ? "TELEGRAM RECEIVED" : "ERROR LOG"}
				</h4>
				<p className="leading-relaxed opacity-90">{toast.message}</p>
			</div>
		</div>
	);
}
