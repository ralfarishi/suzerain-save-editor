import { GameField } from "../../data/data";
import { UndoButton } from "./UndoButton";
import { ViewDensity } from "../FormToolbar";

interface CheckboxFieldProps {
	field: GameField;
	value: boolean | null | undefined;
	onChange: (id: string, value: boolean) => void;
	cardBaseClass: string;
	isModified: boolean;
	handleUndo: (e: React.MouseEvent) => void;
	density?: ViewDensity;
}

export function CheckboxField({
	field,
	value,
	onChange,
	cardBaseClass,
	isModified,
	handleUndo,
	density = "comfortable",
}: CheckboxFieldProps) {
	const checked = Boolean(value);
	const isCompact = density === "compact";

	return (
		<div
			className={`${cardBaseClass} flex items-center justify-between cursor-pointer ${isCompact ? "min-h-0 py-1.5 px-3 gap-2" : "min-h-[72px]"}`}
			role="button"
			tabIndex={0}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") onChange(field.id, !checked);
			}}
			onClick={() => onChange(field.id, !checked)}
		>
			<div className="flex flex-col items-start gap-0.5 pr-2 flex-1 min-w-0">
				<label
					htmlFor={field.id}
					className={`${isCompact ? "text-[11px]" : "text-xs"} font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 cursor-pointer select-none truncate w-full`}
				>
					{field.label}
				</label>
				<UndoButton isModified={isModified} onUndo={handleUndo} />
			</div>
			<button
				type="button"
				id={field.id}
				aria-label={`Toggle ${field.label}`}
				className={`relative flex items-center ${isCompact ? "h-6 w-12" : "h-7 w-14"} rounded-full border-2 border-slate-300 dark:border-white/20 bg-slate-200 dark:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass cursor-pointer shrink-0`}
				onClick={(e) => {
					e.stopPropagation();
					onChange(field.id, !checked);
				}}
			>
				<span
					className={`
							absolute left-1 ${isCompact ? "w-4 h-4 text-[8px]" : "w-5 h-5 text-[9px]"} rounded-full border border-black/20 dark:border-white/20 transition-transform duration-150 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex items-center justify-center font-mono font-bold text-white dark:text-zinc-950
							${
								checked
									? `${isCompact ? "translate-x-5" : "translate-x-6"} bg-brass dark:bg-brass-light`
									: "translate-x-0 bg-slate-500 dark:bg-slate-400"
							}
						`}
				>
					{checked ? "ON" : "OFF"}
				</span>
			</button>
		</div>
	);
}
