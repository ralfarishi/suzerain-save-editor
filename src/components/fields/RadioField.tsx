import { GameField } from "../../data/data";
import { UndoButton } from "./UndoButton";

interface RadioFieldProps {
	field: GameField;
	value: string | number | boolean | null | undefined;
	onChange: (id: string, value: string | number | boolean) => void;
	cardBaseClass: string;
	isModified: boolean;
	handleUndo: (e: React.MouseEvent) => void;
}

export function RadioField({
	field,
	value,
	onChange,
	cardBaseClass,
	isModified,
	handleUndo,
}: RadioFieldProps) {
	if (!field.options) return null;

	return (
		<div className={`${cardBaseClass} col-span-full`}>
			<div className="flex items-center justify-between mb-4">
				<span className="block text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">
					{field.label}
				</span>
				<UndoButton isModified={isModified} onUndo={handleUndo} />
			</div>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4" role="radiogroup" aria-label={field.label}>
				{field.options.map((option) => {
					const isSelected = value === option.id;
					return (
						<button
							key={option.id}
							type="button"
							role="radio"
							aria-checked={isSelected}
							onClick={() => onChange(field.id, option.id as string | number | boolean)}
							className={`
								p-4 border-2 rounded-xl text-left transition-all duration-200 cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,0.02)]
								${
									isSelected
										? "border-brass bg-brass/10 dark:bg-brass-light/10 shadow-[2px_2px_0px_0px_rgba(202,138,4,0.3)]"
										: "border-slate-200 dark:border-white/10 bg-white dark:bg-black/20 hover:border-slate-300 dark:hover:border-white/20 hover:bg-slate-50 dark:hover:bg-white/5 shadow-inner"
								}
							`}
						>
							<div
								className={`text-sm font-bold uppercase tracking-wider mb-1 ${isSelected ? "text-brass dark:text-brass-light" : "text-slate-900 dark:text-slate-200"}`}
							>
								{option.label}
							</div>
							{option.description && (
								<div
									className={`text-xs ${isSelected ? "text-amber-900/70 dark:text-amber-200/70" : "text-slate-500 dark:text-slate-400"}`}
								>
									{option.description}
								</div>
							)}
						</button>
					);
				})}
			</div>
		</div>
	);
}
