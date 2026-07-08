import { memo } from "react";
import { GameField, Section } from "../data/data";
import { FieldValues } from "../utils/save-manager";
import { FormField } from "./fields";

interface EditorFormProps {
	section: Section;
	values: FieldValues;
	initialValues: FieldValues;
	errors: Record<string, string>;
	onChange: (id: string, value: string | number | boolean) => void;
}

export const EditorForm = memo(function EditorForm({
	section,
	values,
	initialValues,
	errors,
	onChange,
}: EditorFormProps) {
	return (
		<div className="space-y-8">
			<div>
				<h2 className="text-2xl font-bold mb-6 flex items-center gap-3 opacity-90">
					<span className="w-1 h-8 bg-warm-accent rounded-full"></span>
					{section.title}
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
					{section.fields.map((field: GameField) => (
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
						/>
					))}
				</div>
			</div>
		</div>
	);
});
