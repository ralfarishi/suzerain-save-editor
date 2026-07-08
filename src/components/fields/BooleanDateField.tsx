import { GameField } from "../../data/data";
import { UndoButton } from "./UndoButton";
import { CalendarDotsIcon } from "@phosphor-icons/react";

interface BooleanDateFieldProps {
	field: GameField;
	value: boolean | null | undefined;
	dateValue?: string;
	onChange: (id: string, value: boolean | string) => void;
	cardBaseClass: string;
	isModified: boolean;
	handleUndo: (e: React.MouseEvent) => void;
}

export function BooleanDateField({
	field,
	value,
	dateValue,
	onChange,
	cardBaseClass,
	isModified,
	handleUndo,
}: BooleanDateFieldProps) {
	if (!field.dateId) return null;

	const isChecked = Boolean(value);

	return (
		<div className={`${cardBaseClass} transition-all duration-300 min-h-[110px] flex flex-col justify-between`}>
			<div
				className="flex items-center justify-between mb-4 cursor-pointer"
				role="button"
				tabIndex={0}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") onChange(field.id, !isChecked);
				}}
				onClick={() => onChange(field.id, !isChecked)}
			>
				<div className="flex flex-col items-start gap-1 pr-4">
					<label
						htmlFor={field.id}
						className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1 cursor-pointer select-none"
					>
						{field.label}
					</label>
					<UndoButton isModified={isModified} onUndo={handleUndo} />
				</div>
				<button
					type="button"
					id={field.id}
					aria-label={`Toggle ${field.label}`}
					className="relative flex items-center h-8 w-16 rounded-full border-2 border-slate-300 dark:border-white/20 bg-slate-200 dark:bg-slate-800 transition-all focus:outline-none cursor-pointer shrink-0"
					onClick={(e) => {
						e.stopPropagation();
						onChange(field.id, !isChecked);
					}}
				>
					<span
						className={`
								absolute w-6 h-6 rounded-full border border-black/20 dark:border-white/20 transition-all duration-300 flex items-center justify-center font-mono text-[9px] font-bold text-white dark:text-zinc-950
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
				<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
					<CalendarDotsIcon className="h-4 w-4 text-slate-400" aria-hidden="true" />
				</div>
				<input
					type="datetime-local"
					id={field.dateId}
					aria-label={`${field.label} date`}
					value={dateValue ?? ""}
					onChange={(e) => onChange(field.dateId as string, e.target.value)}
					disabled={!isChecked}
					className={`w-full bg-slate-50 dark:bg-white/5 border-2 border-slate-300 dark:border-white/10 px-3 py-2 pl-10 text-sm font-mono focus:border-brass dark:focus:border-brass-light outline-none text-slate-900 dark:text-slate-100 transition-colors
						${!isChecked ? "cursor-not-allowed" : "cursor-pointer hover:border-slate-400 dark:hover:border-white/20"}
					`}
				/>
			</div>
		</div>
	);
}
