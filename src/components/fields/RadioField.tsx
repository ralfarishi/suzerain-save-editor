import { RadioGroupField } from "../../data/types";
import { UndoButton } from "./UndoButton";
import { ViewDensity } from "../FormToolbar";

interface RadioFieldProps {
	field: RadioGroupField;
	value: string | number | boolean | null | undefined;
	onChange: (id: string, value: string | number | boolean) => void;
	cardBaseClass: string;
	isModified: boolean;
	handleUndo: (e: React.MouseEvent) => void;
	density?: ViewDensity;
}

export function RadioField({
	field,
	value,
	onChange,
	cardBaseClass,
	isModified,
	handleUndo,
	density = "comfortable",
}: RadioFieldProps) {
	if (!field.options) return null;

	const isCompact = density === "compact";

	return (
		<div className={`${cardBaseClass} col-span-full`}>
			<div className="flex items-center justify-between mb-3">
				<span className={`${isCompact ? "text-[11px]" : "text-xs"} font-black uppercase tracking-wider text-slate-400 dark:text-slate-500`}>
					{field.label}
				</span>
				<UndoButton isModified={isModified} onUndo={handleUndo} />
			</div>
			<div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3`} role="radiogroup" aria-label={field.label}>
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
								${isCompact ? "p-2.5 rounded-lg" : "p-3.5 rounded-xl"} border-2 text-left transition-all duration-200 cursor-pointer shadow-sm
								${
									isSelected
										? "border-brass bg-brass/10 dark:bg-brass-light/10 text-brass-dark dark:text-brass-light"
										: "border-slate-200 dark:border-white/10 bg-white dark:bg-black/20 hover:border-slate-300 dark:hover:border-white/20 hover:bg-slate-50 dark:hover:bg-white/5"
								}
							`}
						>
							<div
								className={`${isCompact ? "text-xs mb-0.5" : "text-sm mb-1"} font-bold uppercase tracking-wider ${isSelected ? "text-brass dark:text-brass-light" : "text-slate-900 dark:text-slate-200"}`}
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
