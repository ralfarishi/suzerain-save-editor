export type FieldType = "number" | "checkbox" | "radio-group" | "boolean-date";

export interface BaseField {
	id: string;
	label: string;
	type: FieldType;
}

export interface NumberField extends BaseField {
	type: "number";
	key: string;
	min?: number;
	max?: number;
}

export interface CheckboxField extends BaseField {
	type: "checkbox";
	key: string;
}

export interface RadioOption {
	key: string;
	id: string;
	label: string;
}

export interface RadioGroupField extends BaseField {
	type: "radio-group";
	options: RadioOption[];
}

export interface BooleanDateField extends BaseField {
	type: "boolean-date";
	key: string;
	dateKey: string;
	dateId: string;
}

export type GameField = NumberField | CheckboxField | RadioGroupField | BooleanDateField;

export interface Section {
	title: string;
	fields: GameField[];
}

export interface TabData {
	id: string;
	label: string;
	sections: Section[];
}
