import { useMemo, memo } from "react";
import { TabData } from "../data/data";
import { FieldValues, SaveData } from "../utils/save-manager";
import {
	ArrowLineDownIcon,
	ArrowLineUpIcon,
	CheckCircleIcon,
	XCircleIcon,
} from "@phosphor-icons/react";
interface BulkActionsProps {
	activeTab: TabData;
	values: FieldValues;
	originalData: SaveData | null;
	onUpdateValues: (newValues: FieldValues) => void;
	onShowToast: (type: "success" | "error", message: string) => void;
}

export const BulkActions = memo(function BulkActions({ activeTab, values, onUpdateValues, onShowToast }: BulkActionsProps) {
	const { numberFields, checkboxFields } = useMemo(() => {
		const nums: import("../data/data").GameField[] = [];
		const checks: import("../data/data").GameField[] = [];
		for (const section of activeTab.sections) {
			for (const field of section.fields) {
				if (field.type === "number") nums.push(field);
				else if (field.type === "checkbox") checks.push(field);
			}
		}
		return { numberFields: nums, checkboxFields: checks };
	}, [activeTab]);

	// Memoize state calculations
	const allMaxed = useMemo(
		() =>
			numberFields.length > 0 &&
			numberFields.every((f) => {
				const val = values[f.id] as number;
				return f.max !== undefined && val === f.max;
			}),
		[numberFields, values]
	);

	const allMined = useMemo(
		() =>
			numberFields.length > 0 &&
			numberFields.every((f) => {
				const val = values[f.id] as number;
				return f.min !== undefined && val === f.min;
			}),
		[numberFields, values]
	);

	const allChecked = useMemo(
		() => checkboxFields.length > 0 && checkboxFields.every((f) => values[f.id] === true),
		[checkboxFields, values]
	);

	const allUnchecked = useMemo(
		() => checkboxFields.length > 0 && checkboxFields.every((f) => !values[f.id]),
		[checkboxFields, values]
	);

	const handleMaxAll = () => {
		const newValues = { ...values };
		let changed = false;
		numberFields.forEach((field) => {
			if (field.max !== undefined && newValues[field.id] !== field.max) {
				newValues[field.id] = field.max;
				changed = true;
			}
		});

		if (changed) {
			onUpdateValues(newValues);
			onShowToast("success", "All fields set to maximum values.");
		} else {
			onShowToast("success", "All fields are already maximized.");
		}
	};

	const handleMinAll = () => {
		const newValues = { ...values };
		let changed = false;
		numberFields.forEach((field) => {
			if (field.min !== undefined && newValues[field.id] !== field.min) {
				newValues[field.id] = field.min;
				changed = true;
			}
		});

		if (changed) {
			onUpdateValues(newValues);
			onShowToast("success", "All fields set to minimum values.");
		} else {
			onShowToast("success", "All fields are already minimized.");
		}
	};

	const handleCheckAll = () => {
		const newValues = { ...values };
		let changed = false;
		checkboxFields.forEach((field) => {
			if (newValues[field.id] !== true) {
				newValues[field.id] = true;
				changed = true;
			}
		});

		if (changed) {
			onUpdateValues(newValues);
			onShowToast("success", "All checkboxes checked.");
		} else {
			onShowToast("success", "All checkboxes are already checked.");
		}
	};

	const handleUncheckAll = () => {
		const newValues = { ...values };
		let changed = false;
		checkboxFields.forEach((field) => {
			if (newValues[field.id] !== false) {
				newValues[field.id] = false;
				changed = true;
			}
		});

		if (changed) {
			onUpdateValues(newValues);
			onShowToast("success", "All checkboxes unchecked.");
		} else {
			onShowToast("success", "All checkboxes are already unchecked.");
		}
	};

	const showNumberActions = ["money-opinion", "rizia", "rizia-military-unit"].includes(
		activeTab.id
	);
	const showCheckboxActions = ["presidential-decrees", "assembly-court"].includes(activeTab.id);

	if (!showNumberActions && !showCheckboxActions) return null;

	return (
		<div className="flex flex-wrap gap-3 p-4 mb-8 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,0.05)]">
			{showNumberActions && (
				<>
					<button type="button"
						onClick={handleMaxAll}
						disabled={allMaxed}
						className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-all cursor-pointer border
              ${
								allMaxed
									? "text-slate-400 bg-slate-100 border-slate-200 dark:bg-white/5 dark:text-slate-500 dark:border-white/5 cursor-not-allowed"
									: "text-green-800 bg-green-100 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50 border-green-300 dark:border-green-800"
							}
            `}
					>
						<ArrowLineUpIcon className="w-4 h-4" />
						Maximize All
					</button>
					<button type="button"
						onClick={handleMinAll}
						disabled={allMined}
						className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-all cursor-pointer border
              ${
								allMined
									? "text-slate-400 bg-slate-100 border-slate-200 dark:bg-white/5 dark:text-slate-500 dark:border-white/5 cursor-not-allowed"
									: "text-red-800 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 border-red-300 dark:border-red-800"
							}
            `}
					>
						<ArrowLineDownIcon className="w-4 h-4" />
						Minimize All
					</button>
				</>
			)}

			{showCheckboxActions && (
				<>
					<button type="button"
						onClick={handleCheckAll}
						disabled={allChecked}
						className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-all cursor-pointer border
              ${
								allChecked
									? "text-slate-400 bg-slate-100 border-slate-200 dark:bg-white/5 dark:text-slate-500 dark:border-white/5 cursor-not-allowed"
									: "text-blue-800 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 border-blue-300 dark:border-blue-800"
							}
            `}
					>
						<CheckCircleIcon className="w-4 h-4" />
						Check All
					</button>
					<button type="button"
						onClick={handleUncheckAll}
						disabled={allUnchecked}
						className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-all cursor-pointer border
              ${
								allUnchecked
									? "text-slate-400 bg-slate-100 border-slate-200 dark:bg-white/5 dark:text-slate-500 dark:border-white/5 cursor-not-allowed"
									: "text-amber-800 bg-amber-100 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:hover:bg-amber-900/50 border-amber-300 dark:border-amber-800"
							}
            `}
					>
						<XCircleIcon className="w-4 h-4" />
						Uncheck All
					</button>
				</>
			)}
		</div>
	);
});

