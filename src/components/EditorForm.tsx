import { memo, useState, useCallback, useMemo } from "react";
import { GameField, Section } from "../data/data";
import { FieldValues } from "../utils/save-manager";
import { FormToolbar, ViewDensity } from "./FormToolbar";
import { SectionAccordion } from "./SectionAccordion";

interface EditorFormProps {
	sections: Section[];
	values: FieldValues;
	initialValues: FieldValues;
	errors: Record<string, string>;
	onChange: (id: string, value: string | number | boolean) => void;
	onUpdateValues: (newValues: FieldValues) => void;
	onResetTab?: () => void;
}

export const EditorForm = memo(function EditorForm({
	sections,
	values,
	initialValues,
	errors,
	onChange,
	onUpdateValues,
	onResetTab,
}: EditorFormProps) {
	const [searchQuery, setSearchQuery] = useState("");
	const [showModifiedOnly, setShowModifiedOnly] = useState(false);
	const [density, setDensity] = useState<ViewDensity>("comfortable");
	const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});
	const [allCollapsed, setAllCollapsed] = useState(false);

	const handleToggleCollapse = useCallback((title: string) => {
		setCollapsedSections((prev) => ({
			...prev,
			[title]: !prev[title],
		}));
	}, []);

	const handleToggleCollapseAll = useCallback(() => {
		setAllCollapsed((prev) => {
			const nextState = !prev;
			const newMap: Record<string, boolean> = {};
			sections.forEach((s) => {
				newMap[s.title] = nextState;
			});
			setCollapsedSections(newMap);
			return nextState;
		});
	}, [sections]);

	// Calculate total modified count across all sections in this tab
	const totalModifiedCount = useMemo(() => {
		let count = 0;
		sections.forEach((section) => {
			section.fields.forEach((field: GameField) => {
				const val = values[field.id];
				const initVal = initialValues[field.id];
				const isModified =
					field.type === "boolean-date"
						? val !== initVal || values[field.dateId] !== initialValues[field.dateId]
						: val !== initVal && initVal !== undefined;
				if (isModified) count++;
			});
		});
		return count;
	}, [sections, values, initialValues]);

	return (
		<div className="space-y-4">
			<FormToolbar
				searchQuery={searchQuery}
				onSearchChange={setSearchQuery}
				showModifiedOnly={showModifiedOnly}
				onToggleModifiedOnly={() => setShowModifiedOnly((prev) => !prev)}
				density={density}
				onDensityChange={setDensity}
				allCollapsed={allCollapsed}
				onToggleCollapseAll={handleToggleCollapseAll}
				modifiedCount={totalModifiedCount}
				sections={sections}
				values={values}
				onUpdateValues={onUpdateValues}
				onResetTab={onResetTab}
			/>

			<div className="space-y-4">
				{sections.map((section) => (
					<SectionAccordion
						key={section.title}
						section={section}
						values={values}
						initialValues={initialValues}
						errors={errors}
						onChange={onChange}
						density={density}
						isCollapsed={Boolean(collapsedSections[section.title])}
						onToggleCollapse={() => handleToggleCollapse(section.title)}
						searchQuery={searchQuery}
						showModifiedOnly={showModifiedOnly}
					/>
				))}
			</div>
		</div>
	);
});
