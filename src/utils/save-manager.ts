import { appData, GameField } from "../data/data";
import { convertToDatetimeLocal, convertDatetimeLocalToInitialDate } from "./date-helpers";

export function parseLastModified(lastModified: string | undefined): string {
	if (!lastModified) return "";
	const match = /^(\d{2})-(\d{2})-(\d{4})_(\d{2})-(\d{2})/.exec(lastModified);
	if (!match) return "";
	const [_, day, month, year, hour, minute] = match;
	return `${year}-${month}-${day}T${hour}:${minute}`;
}

export function getCurrentDatetimeLocal(): string {
	const now = new Date();
	const pad = (n: number) => n.toString().padStart(2, "0");
	return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
}

export interface SaveData {
	variables: string;
	[key: string]: any;
}

export type FieldValues = Record<string, string | number | boolean>;

// Create a Map for O(1) field lookups by both ID and Key
let fieldsMap: Map<string, GameField> | null = null;
let allFieldsList: GameField[] | null = null;

function getFieldsMap(): Map<string, GameField> {
	if (!fieldsMap) {
		fieldsMap = new Map();
		const fieldsList: GameField[] = [];
		for (const tab of appData) {
			for (const section of tab.sections) {
				for (const field of section.fields) {
					fieldsMap.set(field.id, field);
					if (field.key) {
						fieldsMap.set(field.key, field);
					}
					fieldsList.push(field);
				}
			}
		}
		allFieldsList = fieldsList;
	}
	return fieldsMap;
}

// Helper to get a single field by ID or Key (O(1) lookup)
export function getFieldById(idOrKey: string): GameField | undefined {
	return getFieldsMap().get(idOrKey);
}

// Helper to flatten fields (deduplicated)
export function getAllFields(): GameField[] {
	getFieldsMap();
	return allFieldsList || [];
}

export function parseSaveFile(jsonContent: string): {
	values: FieldValues;
	originalData: SaveData;
} {
	const data: SaveData = JSON.parse(jsonContent);

	// Strict file verification validation
	if (
		!data ||
		typeof data !== "object" ||
		data.saveFileType === undefined ||
		typeof data.variables !== "string" ||
		!data.variables.includes("Variable={")
	) {
		throw new Error("Invalid Suzerain save file: incorrect file structure.");
	}

	const variablesString = data.variables;
	const values: FieldValues = {};
	const fields = getAllFields();

	for (const field of fields) {
		if (field.type === "number") {
			// Allow for optional spaces around '=' and support floating point numbers
			const match = new RegExp(`\\[\\"${field.key}\\"\\]\\s*=\\s*(-?[\\d.]+)`).exec(
				variablesString
			);
			if (match) {
				values[field.id] = parseFloat(match[1]);
			}
		} else if (field.type === "checkbox") {
			// Allow optional spaces around '=' to match number field pattern
			const match = new RegExp(`\\[\\"${field.key}\\"\\]\\s*=\\s*(true|false)`).exec(
				variablesString
			);
			if (match) {
				values[field.id] = match[1] === "true";
			}
		} else if (field.type === "boolean-date") {
			// Allow optional spaces around '=' to match number field pattern
			const boolMatch = new RegExp(`\\[\\"${field.key}\\"\\]\\s*=\\s*(true|false)`).exec(
				variablesString
			);
			const dateMatch = new RegExp(`\\[\\"${field.dateKey}\\"\\]\\s*=\\s*\\"(.*?)\\"`).exec(
				variablesString
			);

			const isChecked = boolMatch ? boolMatch[1] === "true" : false;
			values[field.id] = isChecked;

			let dateVal = "";
			if (dateMatch && dateMatch[1]) {
				dateVal = convertToDatetimeLocal(dateMatch[1]);
			}

			// Fallback: If checked/unlocked, but date is empty, supply a fallback
			if (isChecked && !dateVal) {
				dateVal = parseLastModified(data.lastModified) || getCurrentDatetimeLocal();
			}
			values[field.dateId] = dateVal;
		} else if (field.type === "radio-group") {
			for (const option of field.options) {
				// Allow optional spaces around '=' to match number field pattern
				const match = new RegExp(`\\[\\"${option.key}\\"\\]\\s*=\\s*(true|false)`).exec(
					variablesString
				);
				if (match && match[1] === "true") {
					values[field.id] = option.id; // Store the ID of the selected option
					break;
				}
			}
		}
	}

	return { values, originalData: data };
}

export function generateSaveFile(originalData: SaveData, values: FieldValues): string {
	let vs = originalData.variables;
	const fields = getAllFields();

	for (const field of fields) {
		if (field.type === "number") {
			const val = values[field.id] ?? 0;
			vs = vs.replace(
				new RegExp(`\\[\\"${field.key}\\"\\]\\s*=\\s*(-?[\\d.]+)`),
				`["${field.key}"]=${val}`
			);
		} else if (field.type === "checkbox") {
			const val = values[field.id] ?? false;
			vs = vs.replace(
				new RegExp(`\\[\\"${field.key}\\"\\]\\s*=\\s*(true|false)`),
				`["${field.key}"]=${val}`
			);
		} else if (field.type === "boolean-date") {
			const isChecked = values[field.id] === true;
			const dateVal = (values[field.dateId] as string) || "";

			vs = vs.replace(
				new RegExp(`\\[\\"${field.key}\\"\\]\\s*=\\s*(true|false)`),
				`["${field.key}"]=${isChecked}`
			);

			const formattedDate = isChecked ? convertDatetimeLocalToInitialDate(dateVal) : "";
			vs = vs.replace(
				new RegExp(`\\[\\"${field.dateKey}\\"\\]\\s*=\\s*\\"(.*?)\\"`),
				`["${field.dateKey}"]="${formattedDate}"`
			);
		} else if (field.type === "radio-group") {
			const selectedId = values[field.id];
			for (const option of field.options) {
				const isSelected = option.id === selectedId;
				vs = vs.replace(
					new RegExp(`\\[\\"${option.key}\\"\\]\\s*=\\s*(true|false)`),
					`["${option.key}"]=${isSelected}`
				);
			}
		}
	}

	const newData = { ...originalData, variables: vs };
	return JSON.stringify(newData);
}
