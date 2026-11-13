import { memo, useMemo, useState, useRef, useEffect } from "react";
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
	SlidersHorizontalIcon,
	CodeIcon,
} from "@phosphor-icons/react";
import { GameField, Section } from "../data/data";
import { FieldValues } from "../utils/save-manager";
import { useSave } from "../context/SaveContext";

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
	onOpenRawInspector?: () => void;
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
	onOpenRawInspector,
}: FormToolbarProps) {
	const { showTechnicalKeys } = useSave();
	const [bulkMenuOpen, setBulkMenuOpen] = useState(false);
	const [confirmResetTab, setConfirmResetTab] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!bulkMenuOpen) {
			setConfirmResetTab(false);
			return;
		}
		const handleClickOutside = (e: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
				setBulkMenuOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [bulkMenuOpen]);

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
		setBulkMenuOpen(false);
	};

	const handleMinAll = () => {
		const newValues = { ...values };
		numberFields.forEach((f) => {
			if (f.type === "number" && f.min !== undefined) {
				newValues[f.id] = f.min;
			}
		});
		onUpdateValues(newValues);
		setBulkMenuOpen(false);
	};

	const handleCheckAll = () => {
		const newValues = { ...values };
		checkboxFields.forEach((f) => {
			newValues[f.id] = true;
		});
		onUpdateValues(newValues);
		setBulkMenuOpen(false);
	};

	const handleUncheckAll = () => {
		const newValues = { ...values };
		checkboxFields.forEach((f) => {
			newValues[f.id] = false;
		});
		onUpdateValues(newValues);
		setBulkMenuOpen(false);
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
					placeholder={showTechnicalKeys ? "Search settings by name or key..." : "Search settings by name..."}
					className="w-full pl-9 pr-8 py-1.5 text-xs rounded border border-slate-300 dark:border-white/10 bg-white dark:bg-black/20 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-brass transition-colors"
				/>
				{searchQuery && (
					<button
						type="button"
						onClick={() => onSearchChange("")}
						aria-label="Clear search"
						className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
					>
						<XIcon className="w-3.5 h-3.5" />
					</button>
				)}
			</div>

			<div className="flex items-center flex-wrap gap-2">
				{/* Modified Filter Toggle */}
				<button
					type="button"
					onClick={onToggleModifiedOnly}
					className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded border transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass ${
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
						title="Standard View"
						aria-label="Standard View"
						className={`p-1 rounded text-xs flex items-center gap-1 transition-colors cursor-pointer ${
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
						title="Compact View"
						aria-label="Compact View"
						className={`p-1 rounded text-xs flex items-center gap-1 transition-colors cursor-pointer ${
							density === "compact"
								? "bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white font-bold"
								: "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
						}`}
					>
						<ListDashesIcon className="w-3.5 h-3.5" />
					</button>
				</div>

				{/* Collapse / Expand All Button */}
				<button
					type="button"
					onClick={onToggleCollapseAll}
					className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold uppercase tracking-wider bg-white dark:bg-slate-800 border border-slate-300 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 rounded transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass"
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

				{/* Bulk Actions Dropdown */}
				<div className="relative" ref={menuRef}>
					<button
						type="button"
						onClick={() => setBulkMenuOpen((prev) => !prev)}
						aria-expanded={bulkMenuOpen}
						className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider bg-white dark:bg-slate-800 border border-slate-300 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:border-brass rounded transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass"
					>
						<SlidersHorizontalIcon className="w-3.5 h-3.5 text-brass" />
						<span>Bulk Actions</span>
						<CaretDownIcon className="w-3 h-3" />
					</button>

					{bulkMenuOpen && (
						<div className="absolute right-0 mt-2 w-64 rounded-xl border-2 border-slate-200 dark:border-white/15 bg-white dark:bg-warm-surface-dark shadow-xl z-40 p-1.5 space-y-1 animate-zoom-in-95">
							{numberFields.length > 0 && (
								<>
									<button
										type="button"
										onClick={handleMaxAll}
										className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 cursor-pointer text-left"
									>
										<ArrowLineUpIcon className="w-4 h-4" />
										<span>Max All Numbers</span>
									</button>
									<button
										type="button"
										onClick={handleMinAll}
										className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-rose-700 dark:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-950/50 cursor-pointer text-left"
									>
										<ArrowLineDownIcon className="w-4 h-4" />
										<span>Min All Numbers</span>
									</button>
								</>
							)}

							{checkboxFields.length > 0 && (
								<>
									<button
										type="button"
										onClick={handleCheckAll}
										className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-sky-700 dark:text-sky-300 hover:bg-sky-50 dark:hover:bg-sky-950/50 cursor-pointer text-left"
									>
										<CheckCircleIcon className="w-4 h-4" />
										<span>Check All Toggles</span>
									</button>
									<button
										type="button"
										onClick={handleUncheckAll}
										className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-amber-700 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-950/50 cursor-pointer text-left"
									>
										<XCircleIcon className="w-4 h-4" />
										<span>Uncheck All Toggles</span>
									</button>
								</>
							)}

							{onOpenRawInspector && showTechnicalKeys && (
								<button
									type="button"
									onClick={() => {
										setBulkMenuOpen(false);
										onOpenRawInspector();
									}}
									className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer text-left"
								>
									<CodeIcon className="w-4 h-4 text-brass" />
									<span>Raw Save Variable Inspector</span>
								</button>
							)}

							{onResetTab && (
								<div className="pt-1 mt-1 border-t border-slate-200 dark:border-white/10">
									{confirmResetTab ? (
										<div className="p-2 rounded-lg bg-red-50 dark:bg-red-950/40 space-y-2">
											<p className="text-[11px] font-semibold text-red-700 dark:text-red-300">
												Restore this tab to original save values?
											</p>
											<div className="flex items-center gap-2">
												<button
													type="button"
													onClick={() => {
														onResetTab();
														setConfirmResetTab(false);
														setBulkMenuOpen(false);
													}}
													className="px-2.5 py-1 rounded bg-red-600 text-white text-xs font-bold cursor-pointer hover:bg-red-700"
												>
													Reset Tab
												</button>
												<button
													type="button"
													onClick={() => setConfirmResetTab(false)}
													className="px-2 py-1 text-xs text-slate-600 dark:text-slate-300 cursor-pointer"
												>
													Cancel
												</button>
											</div>
										</div>
									) : (
										<button
											type="button"
											onClick={() => setConfirmResetTab(true)}
											title="Restore this tab to original save values"
											className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-700 dark:hover:text-red-300 cursor-pointer text-left"
										>
											<ArrowCounterClockwiseIcon className="w-4 h-4" />
											<span>Reset Tab</span>
										</button>
									)}
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
});
