import { memo } from "react";
import { GameField } from "../../data/data";
import { NumberField } from "./NumberField";
import { CheckboxField } from "./CheckboxField";
import { RadioField } from "./RadioField";
import { BooleanDateField } from "./BooleanDateField";
import { ViewDensity } from "../FormToolbar";

interface FormFieldProps {
	field: GameField;
	value: string | number | boolean | null | undefined;
	error: string | undefined;
	onChange: (id: string, value: string | number | boolean) => void;
	dateValue?: string;
	initialValue?: string | number | boolean | null | undefined;
	initialDateValue?: string;
	density?: ViewDensity;
	isHighlighted?: boolean;
}

export const FormField = memo(function FormField({
	field,
	value,
	error,
	onChange,
	dateValue,
	initialValue,
	initialDateValue,
	density = "comfortable",
	isHighlighted = false,
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

	const handleUndo = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (initialValue !== undefined) {
			onChange(field.id, initialValue as string | number | boolean);
		}
		if (field.type === "boolean-date" && initialDateValue !== undefined) {
			onChange(field.dateId as string, initialDateValue);
		}
	};

	const paddingClass = density === "compact" ? "p-2.5" : "p-4";

	// Common classes for visual states
	const cardBaseClass = `${paddingClass} rounded-lg border hover-tactile transition-colors duration-150 ${
		isHighlighted
			? "ring-2 ring-brass ring-offset-2 dark:ring-offset-warm-surface-dark border-brass bg-brass/10"
			: hasError
				? "border-warm-error-border bg-warm-error-bg/30 text-warm-error"
				: isModified
					? "border-brass/40 bg-brass/5 dark:border-brass-light/40 dark:bg-brass-light/5"
					: "bg-warm-surface-light border-warm-border-light dark:bg-warm-surface-dark dark:border-warm-border-dark hover:border-warm-accent/30"
	}`;

	const renderField = () => {
		switch (field.type) {
			case "number":
				return (
					<NumberField
						field={field}
						value={value as number}
						error={error}
						onChange={onChange}
						initialValue={initialValue as number}
						cardBaseClass={cardBaseClass}
						isModified={isModified}
						handleUndo={handleUndo}
						density={density}
					/>
				);
			case "checkbox":
				return (
					<CheckboxField
						field={field}
						value={value as boolean}
						onChange={onChange}
						cardBaseClass={cardBaseClass}
						isModified={isModified}
						handleUndo={handleUndo}
						density={density}
					/>
				);
			case "radio-group":
				return (
					<RadioField
						field={field}
						value={value}
						onChange={onChange}
						cardBaseClass={cardBaseClass}
						isModified={isModified}
						handleUndo={handleUndo}
						density={density}
					/>
				);
			case "boolean-date":
				return (
					<BooleanDateField
						field={field}
						value={value as boolean}
						dateValue={dateValue}
						onChange={onChange}
						cardBaseClass={cardBaseClass}
						isModified={isModified}
						handleUndo={handleUndo}
						density={density}
					/>
				);
			default:
				return null;
		}
	};

	return (
		<div
			data-field-id={field.id}
			className={field.type === "radio-group" ? "col-span-full" : "col-span-1"}
		>
			{renderField()}
		</div>
	);
});
