import { memo } from "react";
import { useSave } from "../../context/SaveContext";

interface MobileHeaderProps {
	title?: string;
	subtitle?: string;
}

export const MobileHeader = memo(function MobileHeader({
	title = "Suzerain",
	subtitle = "Companion",
}: MobileHeaderProps) {
	const { fileLoaded, filename, auditSummary } = useSave();

	return (
		<div className="md:hidden sticky top-0 z-40 bg-slate-900 dark:bg-black border-b-4 border-brass px-4 py-2.5 shadow-md flex items-center justify-between">
			{/* Brand Logo & Title */}
			<div className="flex items-center gap-2.5">
				<div className="w-6 h-6 rounded-full border-2 border-brass flex items-center justify-center shrink-0">
					<span className="text-brass font-serif font-bold text-xs leading-none">§</span>
				</div>
				<h1 className="text-xs font-serif font-black uppercase tracking-widest text-white">
					{title} <span className="text-brass">{subtitle}</span>
				</h1>
			</div>

			{/* Active File / Status Badge */}
			<div className="flex items-center gap-1.5 px-2.5 py-1 bg-black/60 rounded-md border border-white/10 text-[10px] font-mono text-slate-300">
				<span
					className={`w-2 h-2 rounded-full ${
						fileLoaded
							? "bg-emerald-400"
							: "bg-slate-500 opacity-50"
					}`}
				/>
				<span className="truncate max-w-[140px] uppercase font-bold tracking-wider">
					{fileLoaded
						? auditSummary?.campaignName
							? `${auditSummary.campaignName} Turn ${auditSummary.turnNo}`
							: filename || "Active Save"
						: "No Save Loaded"}
				</span>
			</div>
		</div>
	);
});
