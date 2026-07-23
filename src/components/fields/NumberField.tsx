import { useState, useRef } from "react";
import { NumberField as NumberFieldType } from "../../data/types";
import { UndoButton } from "./UndoButton";
import { WarningCircleIcon } from "@phosphor-icons/react";
import { ViewDensity } from "../FormToolbar";

interface NumberFieldProps {
	field: NumberFieldType;
	value: number | null | undefined;
	error: string | undefined;
	onChange: (id: string, value: number) => void;
	initialValue?: number | null | undefined;
	cardBaseClass: string;
	isModified: boolean;
	handleUndo: (e: React.MouseEvent) => void;
	density?: ViewDensity;
}

export function NumberField({
	field,
	value,
	error,
	onChange,
	cardBaseClass,
	isModified,
	handleUndo,
	density = "comfortable",
}: NumberFieldProps) {
	const [prevPropValue, setPrevPropValue] = useState(value);
	const [localValue, setLocalValue] = useState<string>(value !== null && value !== undefined ? String(value) : "");
	const debounceTimer = useRef<NodeJS.Timeout | null>(null);

	const isCompact = density === "compact";

	// Derive state directly during render if the prop changed
	if (value !== prevPropValue) {
		setPrevPropValue(value);
		setLocalValue(value !== null && value !== undefined ? String(value) : "");
	}

	const handleChange = (valStr: string) => {
		setLocalValue(valStr);
		if (debounceTimer.current) clearTimeout(debounceTimer.current);

		debounceTimer.current = setTimeout(() => {
			const parsed = parseFloat(valStr);
			if (!isNaN(parsed)) {
				onChange(field.id, parsed);
			}
		}, 300);
	};

	const handleBlur = () => {
		if (debounceTimer.current) clearTimeout(debounceTimer.current);
		const parsed = parseFloat(localValue);
		if (!isNaN(parsed)) {
			onChange(field.id, parsed);
		}
	};

	return (
		<div className={`${cardBaseClass} col-span-1`}>
			<div className={`flex ${isCompact ? "flex-col gap-1.5" : "flex-col md:flex-row md:items-center justify-between gap-3"}`}>
				<div className="flex-1 min-w-0">
					<div className="flex items-center justify-between gap-2 mb-1">
						<label
							htmlFor={field.id}
							className={`block ${isCompact ? "text-[11px]" : "text-xs"} font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 cursor-pointer select-none truncate`}
						>
							{field.label}
						</label>
						<UndoButton isModified={isModified} onUndo={handleUndo} />
					</div>
				</div>

				<div className="flex items-center gap-3">
					<div className="flex-1 space-y-0.5">
						<input
							type="range"
							id={`${field.id}-range`}
							aria-label={`${field.label} range`}
							min={field.min ?? 0}
							max={field.max ?? 100}
							value={localValue || 0}
							onChange={(e) => handleChange(e.target.value)}
							onBlur={handleBlur}
							className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brass dark:accent-brass-light"
						/>
						{!isCompact && (
							<div className="flex justify-between px-1 text-[9px] font-mono font-bold text-slate-400 dark:text-slate-500 select-none">
								<span>{field.min ?? 0}</span>
								<span>{field.max ?? 100}</span>
							</div>
						)}
					</div>
					<input
						type="number"
						id={field.id}
						value={localValue}
						min={field.min}
						max={field.max}
						onChange={(e) => handleChange(e.target.value)}
						onBlur={handleBlur}
						className={`${isCompact ? "w-16 px-2 py-1 text-xs" : "w-20 px-2 py-1.5 text-sm"} border-2 shadow-inner font-mono text-center rounded-lg transition-colors outline-none
                            ${
								error
									? "border-warm-error bg-white dark:bg-warm-surface-dark text-warm-error focus:ring-2 focus:ring-warm-error/20"
									: "border-slate-300 dark:border-white/10 bg-white dark:bg-black/20 text-slate-900 dark:text-slate-100 focus:border-brass dark:focus:border-brass-light"
							}
                        `}
					/>
				</div>
			</div>

			{error && (
				<div className="mt-2 flex items-center gap-1.5 text-warm-error text-xs font-bold animate-in slide-in-from-top-1">
					<WarningCircleIcon weight="fill" className="w-3.5 h-3.5" />
					<span>{error}</span>
				</div>
			)}
		</div>
	);
}
