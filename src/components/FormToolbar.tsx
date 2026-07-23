import { memo, useMemo } from "react";
import {
	MagnifyingGlassIcon,
	FunnelIcon,
	RowsIcon,
	ListDashesIcon,
	CaretDownIcon,
	CaretRightIcon,
	XIcon,
	ArrowLineUpIcon,
	ArrowLineDownIcon,
	CheckCircleIcon,
	XCircleIcon,
	ArrowCounterClockwiseIcon,
} from "@phosphor-icons/react";
import { GameField, Section } from "../data/data";
import { FieldValues } from "../utils/save-manager";

export type ViewDensity = "comfortable" | "compact";

interface FormToolbarProps {
	searchQuery: string;
	onSearchChange: (q: string) => void;
	showModifiedOnly: boolean;
	onToggleModifiedOnly: () => void;
	density: ViewDensity;
	onDensityChange: (density: ViewDensity) => void;
	allCollapsed: boolean;
	onToggleCollapseAll: () => void;
	modifiedCount: number;
	sections: Section[];
	values: FieldValues;
	onUpdateValues: (newValues: FieldValues) => void;
	onResetTab?: () => void;
}

export const FormToolbar = memo(function FormToolbar({
	searchQuery,
	onSearchChange,
	showModifiedOnly,
	onToggleModifiedOnly,
	density,
	onDensityChange,
	allCollapsed,
	onToggleCollapseAll,
	modifiedCount,
	sections,
	values,
	onUpdateValues,
	onResetTab,
}: FormToolbarProps) {
	const { numberFields, checkboxFields } = useMemo(() => {
		const nums: GameField[] = [];
		const checks: GameField[] = [];
		sections.forEach((sec) => {
			sec.fields.forEach((f) => {
				if (f.type === "number") nums.push(f);
				else if (f.type === "checkbox") checks.push(f);
			});
		});
		return { numberFields: nums, checkboxFields: checks };
	}, [sections]);

	const handleMaxAll = () => {
		const newValues = { ...values };
		numberFields.forEach((f) => {
			if (f.type === "number" && f.max !== undefined) {
				newValues[f.id] = f.max;
			}
		});
		onUpdateValues(newValues);
	};

	const handleMinAll = () => {
		const newValues = { ...values };
		numberFields.forEach((f) => {
			if (f.type === "number" && f.min !== undefined) {
				newValues[f.id] = f.min;
			}
		});
		onUpdateValues(newValues);
	};

	const handleCheckAll = () => {
		const newValues = { ...values };
		checkboxFields.forEach((f) => {
			newValues[f.id] = true;
		});
		onUpdateValues(newValues);
	};

	const handleUncheckAll = () => {
		const newValues = { ...values };
		checkboxFields.forEach((f) => {
			newValues[f.id] = false;
		});
		onUpdateValues(newValues);
	};

	return (
		<div className="bg-slate-100 dark:bg-warm-surface-dark border-2 border-slate-200 dark:border-warm-border-dark p-3 rounded-lg mb-6 flex flex-wrap items-center justify-between gap-3 shadow-sm">
			{/* Search Input */}
			<div className="relative flex-1 min-w-[220px]">
				<MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
				<input
					type="text"
					value={searchQuery}
					onChange={(e) => onSearchChange(e.target.value)}
					placeholder="Search fields by name or key..."
					className="w-full pl-9 pr-8 py-1.5 text-xs font-mono rounded border border-slate-300 dark:border-white/10 bg-white dark:bg-black/20 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-brass dark:focus:border-brass-light transition-colors"
				/>
				{searchQuery && (
					<button
						type="button"
						onClick={() => onSearchChange("")}
						className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
					>
						<XIcon className="w-3.5 h-3.5" />
					</button>
				)}
			</div>

			<div className="flex items-center flex-wrap gap-2">
				{/* Bulk Number Actions */}
				{numberFields.length > 0 && (
					<div className="flex items-center gap-1 border-r border-slate-300 dark:border-white/10 pr-2">
						<button
							type="button"
							onClick={handleMaxAll}
							title="Maximize All Numbers"
							className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 hover:bg-emerald-200 dark:hover:bg-emerald-900/80 rounded transition-colors cursor-pointer"
						>
							<ArrowLineUpIcon className="w-3.5 h-3.5" />
							<span className="hidden sm:inline">Max All</span>
						</button>
						<button
							type="button"
							onClick={handleMinAll}
							title="Minimize All Numbers"
							className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-rose-800 dark:text-rose-300 bg-rose-100 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-800 hover:bg-rose-200 dark:hover:bg-rose-900/80 rounded transition-colors cursor-pointer"
						>
							<ArrowLineDownIcon className="w-3.5 h-3.5" />
							<span className="hidden sm:inline">Min All</span>
						</button>
					</div>
				)}

				{/* Bulk Checkbox Actions */}
				{checkboxFields.length > 0 && (
					<div className="flex items-center gap-1 border-r border-slate-300 dark:border-white/10 pr-2">
						<button
							type="button"
							onClick={handleCheckAll}
							title="Check All Boxes"
							className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-sky-800 dark:text-sky-300 bg-sky-100 dark:bg-sky-950/60 border border-sky-300 dark:border-sky-800 hover:bg-sky-200 dark:hover:bg-sky-900/80 rounded transition-colors cursor-pointer"
						>
							<CheckCircleIcon className="w-3.5 h-3.5" />
							<span className="hidden sm:inline">Check All</span>
						</button>
						<button
							type="button"
							onClick={handleUncheckAll}
							title="Uncheck All Boxes"
							className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 hover:bg-amber-200 dark:hover:bg-amber-900/80 rounded transition-colors cursor-pointer"
						>
							<XCircleIcon className="w-3.5 h-3.5" />
							<span className="hidden sm:inline">Uncheck All</span>
						</button>
					</div>
				)}

				{/* Modified Filter Toggle */}
				<button
					type="button"
					onClick={onToggleModifiedOnly}
					className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded border transition-colors cursor-pointer ${
						showModifiedOnly
							? "bg-brass/10 border-brass text-brass-dark dark:bg-brass-light/10 dark:border-brass-light dark:text-brass-light"
							: "bg-white dark:bg-slate-800 border-slate-300 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
					}`}
				>
					<FunnelIcon className="w-3.5 h-3.5" />
					<span className="hidden sm:inline">Modified Only</span>
					{modifiedCount > 0 && (
						<span className="px-1.5 py-0.2 font-mono text-[10px] bg-brass text-white dark:bg-brass-light dark:text-zinc-950 rounded-full font-bold">
							{modifiedCount}
						</span>
					)}
				</button>

				{/* Density Switch */}
				<div className="flex items-center border border-slate-300 dark:border-white/10 rounded overflow-hidden bg-white dark:bg-slate-800 p-0.5">
					<button
						type="button"
						onClick={() => onDensityChange("comfortable")}
						title="Comfortable Grid"
						className={`p-1 rounded text-xs flex items-center gap-1 font-mono transition-colors cursor-pointer ${
							density === "comfortable"
								? "bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white font-bold"
								: "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
						}`}
					>
						<RowsIcon className="w-3.5 h-3.5" />
					</button>
					<button
						type="button"
						onClick={() => onDensityChange("compact")}
						title="Compact Grid"
						className={`p-1 rounded text-xs flex items-center gap-1 font-mono transition-colors cursor-pointer ${
							density === "compact"
								? "bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white font-bold"
								: "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
						}`}
					>
						<ListDashesIcon className="w-3.5 h-3.5" />
					</button>
				</div>

				{/* Reset Tab Button */}
				{onResetTab && (
					<button
						type="button"
						onClick={onResetTab}
						title="Reset Active Tab to Loaded State"
						className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold uppercase tracking-wider bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-300 dark:border-white/10 text-slate-700 dark:text-slate-300 rounded transition-colors cursor-pointer"
					>
						<ArrowCounterClockwiseIcon className="w-3.5 h-3.5" />
						<span className="hidden md:inline">Reset Tab</span>
					</button>
				)}

				{/* Collapse / Expand All Button */}
				<button
					type="button"
					onClick={onToggleCollapseAll}
					className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold uppercase tracking-wider bg-white dark:bg-slate-800 border border-slate-300 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 rounded transition-colors cursor-pointer"
				>
					{allCollapsed ? (
						<>
							<CaretRightIcon className="w-3.5 h-3.5" />
							<span className="hidden sm:inline">Expand All</span>
						</>
					) : (
						<>
							<CaretDownIcon className="w-3.5 h-3.5" />
							<span className="hidden sm:inline">Collapse All</span>
						</>
					)}
				</button>
			</div>
		</div>
	);
});

