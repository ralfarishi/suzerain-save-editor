import { GameField } from "../../data/data";
import { UndoButton } from "./UndoButton";
import { CaretDownIcon } from "@phosphor-icons/react";

interface SelectFieldProps {
	field: GameField;
	value: string | number | boolean | null | undefined;
	onChange: (id: string, value: string | number | boolean) => void;
	cardBaseClass: string;
	isModified: boolean;
	handleUndo: (e: React.MouseEvent) => void;
}

export function SelectField({
	field,
	value,
	onChange,
	cardBaseClass,
	isModified,
	handleUndo,
}: SelectFieldProps) {
	if (!field.options) return null;

	return (
		<div className={`${cardBaseClass} min-h-[110px] flex flex-col justify-between`}>
			<div className="flex items-center justify-between mb-4">
				<label
					htmlFor={field.id}
					className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1"
				>
					{field.label}
				</label>
				<UndoButton isModified={isModified} onUndo={handleUndo} />
			</div>
			<div className="relative">
				<select
					id={field.id}
					value={String(value ?? "")}
					onChange={(e) => {
						const selectedOption = field.options?.find((opt) => String(opt.id) === e.target.value);
						if (selectedOption) {
							onChange(field.id, selectedOption.id as string | number | boolean);
						}
					}}
					className="w-full appearance-none bg-slate-50 dark:bg-white/5 border-2 border-slate-300 dark:border-white/10 text-slate-900 dark:text-slate-100 rounded-lg px-4 py-3 pr-10 font-mono text-sm shadow-inner focus:border-brass dark:focus:border-brass-light outline-none cursor-pointer hover:border-slate-400 dark:hover:border-white/20 transition-colors"
				>
					{field.options.map((option) => (
						<option key={option.id} value={String(option.id)} className="dark:bg-slate-800">
							{option.label}
						</option>
					))}
				</select>
				<div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-500">
					<CaretDownIcon weight="bold" className="w-4 h-4" />
				</div>
			</div>
		</div>
	);
}
