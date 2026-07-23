import { BooleanDateField as BooleanDateFieldType } from "../../data/types";
import { UndoButton } from "./UndoButton";
import { CalendarDotsIcon } from "@phosphor-icons/react";
import { ViewDensity } from "../FormToolbar";

interface BooleanDateFieldProps {
	field: BooleanDateFieldType;
	value: boolean | null | undefined;
	dateValue?: string;
	onChange: (id: string, value: boolean | string) => void;
	cardBaseClass: string;
	isModified: boolean;
	handleUndo: (e: React.MouseEvent) => void;
	density?: ViewDensity;
}

export function BooleanDateField({
	field,
	value,
	dateValue,
	onChange,
	cardBaseClass,
	isModified,
	handleUndo,
	density = "comfortable",
}: BooleanDateFieldProps) {
	if (!field.dateId) return null;

	const isChecked = Boolean(value);
	const isCompact = density === "compact";

	return (
		<div className={`${cardBaseClass} transition-all duration-300 ${isCompact ? "min-h-0 py-2 px-3 flex flex-col gap-2" : "min-h-[72px] flex flex-col justify-between"}`}>
			<div
				className="flex items-center justify-between gap-2 cursor-pointer"
				role="button"
				tabIndex={0}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") onChange(field.id, !isChecked);
				}}
				onClick={() => onChange(field.id, !isChecked)}
			>
				<div className="flex flex-col items-start gap-0.5 pr-2 flex-1 min-w-0">
					<label
						htmlFor={field.id}
						className={`${isCompact ? "text-[11px]" : "text-xs"} font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 cursor-pointer select-none truncate w-full`}
					>
						{field.label}
					</label>
					<UndoButton isModified={isModified} onUndo={handleUndo} />
				</div>
				<button
					type="button"
					id={field.id}
					aria-label={`Toggle ${field.label}`}
					className={`relative flex items-center ${isCompact ? "h-6 w-12" : "h-7 w-14"} rounded-full border-2 border-slate-300 dark:border-white/20 bg-slate-200 dark:bg-slate-800 transition-all focus:outline-none cursor-pointer shrink-0`}
					onClick={(e) => {
						e.stopPropagation();
						onChange(field.id, !isChecked);
					}}
				>
					<span
						className={`
								absolute ${isCompact ? "w-4 h-4 text-[8px]" : "w-5 h-5 text-[9px]"} rounded-full border border-black/20 dark:border-white/20 transition-all duration-300 flex items-center justify-center font-mono font-bold text-white dark:text-zinc-950
								${
									isChecked
										? "right-1 bg-brass dark:bg-brass-light translate-x-0"
										: "left-1 bg-slate-500 dark:bg-slate-400 translate-x-0"
								}
							`}
					>
						{isChecked ? "ON" : "OFF"}
					</span>
				</button>
			</div>

			<div
				className={`relative transition-all duration-300 ${isChecked ? "opacity-100 translate-y-0" : "opacity-30 translate-y-1 pointer-events-none"}`}
			>
				<div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
					<CalendarDotsIcon className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" aria-hidden="true" />
				</div>
				<input
					type="datetime-local"
					id={field.dateId}
					aria-label={`${field.label} date`}
					value={dateValue ?? ""}
					onChange={(e) => onChange(field.dateId as string, e.target.value)}
					disabled={!isChecked}
					className={`w-full bg-slate-50 dark:bg-black/20 border border-slate-300 dark:border-white/10 ${isCompact ? "px-2 py-1 pl-8 text-xs" : "px-3 py-1.5 pl-9 text-xs"} font-mono rounded focus:border-brass dark:focus:border-brass-light outline-none text-slate-900 dark:text-slate-100 transition-colors
						${!isChecked ? "cursor-not-allowed" : "cursor-pointer hover:border-slate-400 dark:hover:border-white/20"}
					`}
				/>
			</div>
		</div>
	);
}
