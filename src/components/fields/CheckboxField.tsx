import { GameField } from "../../data/data";
import { UndoButton } from "./UndoButton";

interface CheckboxFieldProps {
	field: GameField;
	value: boolean | null | undefined;
	onChange: (id: string, value: boolean) => void;
	cardBaseClass: string;
	isModified: boolean;
	handleUndo: (e: React.MouseEvent) => void;
}

export function CheckboxField({
	field,
	value,
	onChange,
	cardBaseClass,
	isModified,
	handleUndo,
}: CheckboxFieldProps) {
	const checked = Boolean(value);

	return (
		<div
			className={`${cardBaseClass} flex items-center justify-between cursor-pointer min-h-[110px]`}
			role="button"
			tabIndex={0}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") onChange(field.id, !checked);
			}}
			onClick={() => onChange(field.id, !checked)}
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
					onChange(field.id, !checked);
				}}
			>
				<span
					className={`
							absolute w-6 h-6 rounded-full border border-black/20 dark:border-white/20 transition-all duration-300 flex items-center justify-center font-mono text-[9px] font-bold text-white dark:text-zinc-950
							${
								checked
									? "right-1 bg-brass dark:bg-brass-light translate-x-0"
									: "left-1 bg-slate-500 dark:bg-slate-400 translate-x-0"
							}
						`}
				>
					{checked ? "ON" : "OFF"}
				</span>
			</button>
		</div>
	);
}
