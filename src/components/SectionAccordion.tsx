import { memo } from "react";
import { GameField, Section } from "../data/data";
import { FieldValues } from "../utils/save-manager";
import { FormField } from "./fields";
import { ViewDensity } from "./FormToolbar";
import { CaretDownIcon, CaretRightIcon } from "@phosphor-icons/react";

interface SectionAccordionProps {
	section: Section;
	values: FieldValues;
	initialValues: FieldValues;
	errors: Record<string, string>;
	onChange: (id: string, value: string | number | boolean) => void;
	density: ViewDensity;
	isCollapsed: boolean;
	onToggleCollapse: () => void;
	searchQuery: string;
	showModifiedOnly: boolean;
}

export const SectionAccordion = memo(function SectionAccordion({
	section,
	values,
	initialValues,
	errors,
	onChange,
	density,
	isCollapsed,
	onToggleCollapse,
	searchQuery,
	showModifiedOnly,
}: SectionAccordionProps) {
	// Filter fields based on search query and modified filter
	const filteredFields = section.fields.filter((field: GameField) => {
		const val = values[field.id];
		const initVal = initialValues[field.id];
		const isModified = field.type === "boolean-date"
			? val !== initVal || values[field.dateId] !== initialValues[field.dateId]
			: val !== initVal && initVal !== undefined;

		if (showModifiedOnly && !isModified) return false;

		if (searchQuery.trim()) {
			const query = searchQuery.toLowerCase().trim();
			const matchLabel = field.label.toLowerCase().includes(query);
			const matchId = field.id.toLowerCase().includes(query);
			const matchKey = field.key.toLowerCase().includes(query);
			if (!matchLabel && !matchId && !matchKey) return false;
		}

		return true;
	});

	// Compute modified count and error count in this section
	let sectionModifiedCount = 0;
	let sectionErrorCount = 0;

	section.fields.forEach((field: GameField) => {
		const val = values[field.id];
		const initVal = initialValues[field.id];
		const isModified = field.type === "boolean-date"
			? val !== initVal || values[field.dateId] !== initialValues[field.dateId]
			: val !== initVal && initVal !== undefined;
		if (isModified) sectionModifiedCount++;

		if (errors[field.id] || (field.type === "boolean-date" && errors[field.dateId])) {
			sectionErrorCount++;
		}
	});

	// If filtering is active and no fields match, hide this section
	if ((searchQuery || showModifiedOnly) && filteredFields.length === 0) {
		return null;
	}

	return (
		<div className="border-2 border-slate-200 dark:border-warm-border-dark rounded-lg overflow-hidden bg-white dark:bg-warm-surface-dark transition-all duration-200 shadow-sm">
			{/* Accordion Header */}
			<button
				type="button"
				onClick={onToggleCollapse}
				className="w-full px-5 py-4 flex items-center justify-between gap-4 bg-slate-50 dark:bg-black/20 hover:bg-slate-100 dark:hover:bg-black/40 transition-colors cursor-pointer select-none"
			>
				<div className="flex items-center gap-3">
					<span className="w-1.5 h-6 bg-brass dark:bg-brass-light rounded-full shrink-0"></span>
					<h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 tracking-tight text-left">
						{section.title}
					</h3>
					<span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500">
						({filteredFields.length} {filteredFields.length === 1 ? "field" : "fields"})
					</span>
				</div>

				<div className="flex items-center gap-2">
					{sectionModifiedCount > 0 && (
						<span className="px-2 py-0.5 text-[10px] font-bold font-mono bg-brass/20 text-brass-dark dark:bg-brass-light/20 dark:text-brass-light rounded-full border border-brass/30 dark:border-brass-light/30">
							{sectionModifiedCount} modified
						</span>
					)}
					{sectionErrorCount > 0 && (
						<span className="px-2 py-0.5 text-[10px] font-bold font-mono bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 rounded-full border border-red-300 dark:border-red-800">
							{sectionErrorCount} {sectionErrorCount === 1 ? "error" : "errors"}
						</span>
					)}
					<div className="p-1 rounded text-slate-400 dark:text-slate-500">
						{isCollapsed ? (
							<CaretRightIcon className="w-5 h-5" />
						) : (
							<CaretDownIcon className="w-5 h-5" />
						)}
					</div>
				</div>
			</button>

			{/* Accordion Body */}
			{!isCollapsed && (
				<div className="p-5 border-t border-slate-200 dark:border-warm-border-dark">
					<div
						className={`grid gap-3 ${
							density === "compact"
								? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2"
								: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
						}`}
					>
						{filteredFields.map((field: GameField) => (
							<FormField
								key={field.id}
								field={field}
								value={values[field.id]}
								error={errors[field.id]}
								onChange={onChange}
								dateValue={
									field.type === "boolean-date" ? (values[field.dateId] as string) : undefined
								}
								initialValue={initialValues[field.id]}
								initialDateValue={
									field.type === "boolean-date" ? (initialValues[field.dateId] as string) : undefined
								}
								density={density}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	);
});
