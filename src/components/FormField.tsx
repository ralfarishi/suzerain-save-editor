import { useEffect, useState, useRef, memo } from "react";
import { CalendarDotsIcon, CheckIcon, WarningCircleIcon, ArrowCounterClockwiseIcon } from "@phosphor-icons/react";
import { GameField } from "../data/data";

interface FormFieldProps {
	field: GameField;
	value: string | number | boolean | null | undefined;
	error: string | undefined;
	onChange: (id: string, value: string | number | boolean) => void;
	dateValue?: string;
	initialValue?: string | number | boolean | null | undefined;
	initialDateValue?: string;
}

export const FormField = memo(function FormField({
	field,
	value,
	error,
	onChange,
	dateValue,
	initialValue,
	initialDateValue,
}: FormFieldProps) {
	const hasError = !!error;

	// Determine if the field's value has been modified from its initial loaded state
	const isModified = (() => {
		if (field.type === "boolean-date") {
			const boolModified = value !== initialValue;
			const dateModified = dateValue !== initialDateValue;
			return boolModified || dateModified;
		}
		return value !== initialValue && initialValue !== undefined;
	})();

	// Local state for number inputs to prevent visual typing lag
	const [localNumberValue, setLocalNumberValue] = useState<string>("");
	const debounceTimer = useRef<NodeJS.Timeout | null>(null);

	// Sync local state with prop value when it changes externally (e.g., preset/reset/undo)
	useEffect(() => {
		if (field.type === "number") {
			const stringVal = value !== null && value !== undefined ? String(value) : "";
			setLocalNumberValue(stringVal);
		}
	}, [value, field.type]);

	// Clean up timer on unmount
	useEffect(() => {
		return () => {
			if (debounceTimer.current) {
				clearTimeout(debounceTimer.current);
			}
		};
	}, []);

	const handleNumberChange = (valStr: string) => {
		setLocalNumberValue(valStr);

		if (debounceTimer.current) {
			clearTimeout(debounceTimer.current);
		}

		// Propagate to parent after 300ms of inactivity
		debounceTimer.current = setTimeout(() => {
			const parsed = parseFloat(valStr);
			if (!isNaN(parsed)) {
				onChange(field.id, parsed);
			}
		}, 300);
	};

	const handleNumberBlur = () => {
		if (debounceTimer.current) {
			clearTimeout(debounceTimer.current);
		}
		const parsed = parseFloat(localNumberValue);
		if (!isNaN(parsed)) {
			onChange(field.id, parsed);
		}
	};

	const handleUndo = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (initialValue !== undefined) {
			onChange(field.id, initialValue as string | number | boolean);
		}
		if (field.type === "boolean-date" && initialDateValue !== undefined) {
			onChange(field.dateId, initialDateValue);
		}
	};

	// Common classes for visual states
	const cardBaseClass = `p-4 rounded-lg border hover-tactile transition-all duration-200 ${
		hasError
			? "border-warm-error-border bg-warm-error-bg/30 text-warm-error"
			: isModified
				? "border-brass/40 bg-brass/5 dark:border-brass-light/40 dark:bg-brass-light/5"
				: "bg-warm-surface-light border-warm-border-light dark:bg-warm-surface-dark dark:border-warm-border-dark hover:border-warm-accent/30"
	}`;

	const renderUndoButton = () => {
		if (!isModified) return null;
		return (
			<button
				onClick={handleUndo}
				className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-brass dark:text-brass-light hover:text-brass-light dark:hover:text-brass transition-colors bg-brass/10 dark:bg-brass-light/10 hover:bg-brass/20 dark:hover:bg-brass-light/20 px-1.5 py-0.5 rounded cursor-pointer animate-in fade-in zoom-in-95 duration-250"
				title="Undo changes to this field"
			>
				<ArrowCounterClockwiseIcon className="w-3 h-3" />
				Undo
			</button>
		);
	};

	switch (field.type) {
		case "number":
			return (
				<div className={`${cardBaseClass} flex flex-col justify-between min-h-[110px]`}>
					<div className="flex justify-between items-start mb-2">
						<div className="flex items-center gap-2">
							<label
								htmlFor={field.id}
								className="block text-sm font-semibold opacity-90 cursor-pointer"
							>
								{field.label}
							</label>
							{renderUndoButton()}
						</div>
						{(field.min !== undefined || field.max !== undefined) && !hasError && (
							<div className="text-[10px] uppercase tracking-wider opacity-50 flex gap-2">
								<span>{field.min}</span>
								<span className="opacity-30">|</span>
								<span>{field.max}</span>
							</div>
						)}
					</div>

					<div className="relative">
						<input
							type="number"
							id={field.id}
							value={localNumberValue}
							onChange={(e) => handleNumberChange(e.target.value)}
							onBlur={handleNumberBlur}
							min={field.min}
							max={field.max}
							className={`w-full rounded-md px-3 py-2.5 outline-none transition-all font-medium text-lg
								${
									hasError
										? "bg-warm-error-bg border border-warm-error-border text-warm-error placeholder-warm-error/40"
										: "bg-slate-50 border border-slate-200 text-slate-900 dark:bg-black/40 dark:border-warm-border-dark dark:text-slate-100 focus:ring-2 focus:ring-warm-accent focus:border-transparent hover:border-slate-400 dark:hover:border-slate-600"
								}
              `}
						/>
					</div>

					{hasError && (
						<div className="mt-2 text-xs text-warm-error flex items-center gap-1 bg-warm-error-bg border border-warm-error-border/30 p-1.5 rounded">
							<WarningCircleIcon className="w-3.5 h-3.5" />
							<span>{error}</span>
						</div>
					)}
				</div>
			);

		case "checkbox":
			const checked = !!value;
			return (
				<div
					className={`${cardBaseClass} flex items-center justify-between cursor-pointer min-h-[110px]`}
					onClick={() => onChange(field.id, !checked)}
				>
					<div className="flex flex-col items-start gap-1 pr-4">
						<label className="text-sm font-bold cursor-pointer select-none opacity-90 pointer-events-none">
							{field.label}
						</label>
						{renderUndoButton()}
					</div>
					<div
						className={`w-8 h-8 rounded-lg flex items-center justify-center border-2 transition-all duration-300 ring-offset-2 dark:ring-offset-warm-bg-dark ${
							checked
								? "bg-warm-accent border-warm-accent text-white dark:text-zinc-950 dark:font-bold shadow-lg shadow-warm-accent/40 ring-2 ring-warm-accent/50"
								: "bg-white dark:bg-black/40 border-warm-border-light dark:border-warm-border-dark text-transparent"
						}`}
					>
						<CheckIcon
							className={`w-5 h-5 transition-transform duration-300 ${checked ? "scale-100" : "scale-50"}`}
						/>
					</div>
				</div>
			);

		case "radio-group":
			return (
				<div className="p-6 rounded-lg border border-warm-border-light bg-warm-surface-light dark:bg-warm-surface-dark dark:border-warm-border-dark col-span-full transition-all duration-300 hover:shadow-lg">
					<div className="flex items-center justify-between mb-5">
						<div className="flex items-center gap-3">
							<div className="w-1.5 h-5 bg-warm-accent rounded-full" />
							<label className="text-sm font-bold uppercase tracking-wider opacity-60">
								{field.label}
							</label>
						</div>
						{renderUndoButton()}
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
						{field.options.map((option) => {
							const isSelected = value === option.id;
							return (
								<label
									key={option.id}
									className={`
                    relative flex items-center p-4 rounded-xl cursor-pointer border-2 transition-all duration-300 group hover-tactile
                    ${
											isSelected
												? "bg-warm-accent text-white dark:text-zinc-950 dark:font-bold border-warm-accent shadow-md shadow-warm-accent/20"
												: "bg-white border-warm-border-light hover:border-warm-accent/50 hover:bg-warm-accent/5 dark:bg-black/40 dark:border-warm-border-dark dark:hover:bg-warm-accent/10"
										}
                  `}
								>
									<input
										type="radio"
										name={field.id}
										value={option.id}
										checked={isSelected}
										onChange={() => onChange(field.id, option.id)}
										className="sr-only"
									/>
									<div
										className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
											isSelected
												? "border-white bg-white dark:border-zinc-950 dark:bg-zinc-950"
												: "border-slate-300 dark:border-slate-600 bg-transparent group-hover:border-warm-accent/50"
										}`}
									>
										<div
											className={`w-2 h-2 rounded-full transition-all duration-300 ${
												isSelected ? "bg-warm-accent scale-100" : "bg-transparent scale-0"
											}`}
										/>
									</div>
									<span className="ml-4 text-sm font-bold transition-colors">{option.label}</span>
								</label>
							);
						})}
					</div>
				</div>
			);

		case "boolean-date":
			const isChecked = !!value;
			return (
				<div className={`${cardBaseClass} transition-all duration-300 hover:shadow-lg min-h-[110px] flex flex-col justify-between`}>
					<div
						className="flex items-center justify-between mb-4 cursor-pointer"
						onClick={() => onChange(field.id, !isChecked)}
					>
						<div className="flex flex-col items-start gap-1 pr-4">
							<label className="text-sm font-bold cursor-pointer select-none opacity-90">
								{field.label}
							</label>
							{renderUndoButton()}
						</div>
						<div
							className={`w-8 h-8 rounded-lg flex items-center justify-center border-2 transition-all duration-300 ${
								isChecked
									? "bg-warm-accent border-warm-accent text-white dark:text-zinc-950 dark:font-bold shadow-lg shadow-warm-accent/40"
									: "bg-white dark:bg-black/40 border-warm-border-light dark:border-warm-border-dark text-transparent"
							}`}
						>
							<CheckIcon
								className={`w-5 h-5 transition-transform duration-300 ${isChecked ? "scale-100" : "scale-50"}`}
							/>
						</div>
					</div>

					<div
						className={`relative transition-all duration-300 ${isChecked ? "opacity-100 translate-y-0" : "opacity-30 translate-y-1 pointer-events-none"}`}
					>
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<CalendarDotsIcon className="h-4 w-4 opacity-50" />
						</div>
						<input
							type="datetime-local"
							id={field.dateId}
							value={dateValue ?? ""}
							onChange={(e) => onChange(field.dateId, e.target.value)}
							disabled={!isChecked}
							className={`w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 pl-10 text-sm focus:ring-2 focus:ring-warm-accent focus:border-transparent outline-none text-slate-900 dark:bg-black/40 dark:border-warm-border-dark dark:text-slate-100 transition-all
                ${!isChecked ? "cursor-not-allowed" : "cursor-pointer hover:border-slate-400"}
              `}
						/>
					</div>
				</div>
			);

		default:
			return null;
	}
});
