import { memo } from "react";
import { GameField } from "../../data/data";
import { NumberField } from "./NumberField";
import { CheckboxField } from "./CheckboxField";
import { RadioField } from "./RadioField";
import { SelectField } from "./SelectField";
import { BooleanDateField } from "./BooleanDateField";

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

	const handleUndo = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (initialValue !== undefined) {
			onChange(field.id, initialValue as string | number | boolean);
		}
		if (field.type === "boolean-date" && initialDateValue !== undefined) {
			onChange(field.dateId as string, initialDateValue);
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
				/>
			);
		case "radio":
			return (
				<RadioField
					field={field}
					value={value}
					onChange={onChange}
					cardBaseClass={cardBaseClass}
					isModified={isModified}
					handleUndo={handleUndo}
				/>
			);
		case "select":
			return (
				<SelectField
					field={field}
					value={value}
					onChange={onChange}
					cardBaseClass={cardBaseClass}
					isModified={isModified}
					handleUndo={handleUndo}
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
				/>
			);
		default:
			return null;
	}
});
