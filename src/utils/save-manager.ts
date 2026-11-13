import { appData, GameField } from "../data/data";
import { convertToDatetimeLocal, convertDatetimeLocalToInitialDate } from "./date-helpers";
import { isValidLuaKey, upsertLuaVariable, parseAllSaveVariables } from "./lua-variables";

export { isValidLuaKey, upsertLuaVariable };

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

export interface SaveEntityUpdate {
	nameInDatabase: string;
	fieldName: string;
	fieldValue: string;
}

export interface SaveData {
	saveFileType: number | string;
	variables: string;
	lastModified?: string;
	currentStoryPack?: string;
	turnNo?: number;
	campaignName?: string;
	entityUpdates?: SaveEntityUpdate[];
	[key: string]: unknown;
}

export type FieldValues = Record<string, string | number | boolean>;

// Create a Map for O(1) field lookups by both ID and Key
let fieldsMap: Map<string, GameField> | null = null;
let allFieldsList: GameField[] | null = null;
let fieldLocationMap: Map<string, FieldLocation> | null = null;

export interface FieldLocation {
	tabId: string;
	sectionTitle: string;
	fieldId: string;
}

function getFieldsMap(): Map<string, GameField> {
	if (!fieldsMap) {
		fieldsMap = new Map();
		fieldLocationMap = new Map();
		const fieldsList: GameField[] = [];
		for (const tab of appData) {
			for (const section of tab.sections) {
				for (const field of section.fields) {
					const loc: FieldLocation = {
						tabId: tab.id,
						sectionTitle: section.title,
						fieldId: field.id,
					};
					fieldsMap.set(field.id, field);
					fieldLocationMap.set(field.id, loc);
					if ("key" in field && field.key) {
						fieldsMap.set(field.key, field);
						fieldLocationMap.set(field.key, loc);
					}
					if (field.type === "boolean-date") {
						fieldLocationMap.set(field.dateKey, loc);
						fieldLocationMap.set(field.dateId, loc);
					}
					if (field.type === "radio-group") {
						for (const option of field.options) {
							fieldLocationMap.set(option.key, loc);
							fieldLocationMap.set(option.id, loc);
						}
					}
					fieldsList.push(field);
				}
			}
		}
		allFieldsList = fieldsList;
	}
	return fieldsMap;
}

export function findFieldLocation(keyOrId: string): FieldLocation | null {
	getFieldsMap();
	return fieldLocationMap?.get(keyOrId) ?? null;
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
	variablesMap: Map<string, string | number | boolean>;
} {
	const raw: unknown = JSON.parse(jsonContent);

	// Strict file verification validation
	if (
		!raw ||
		typeof raw !== "object" ||
		Array.isArray(raw) ||
		!("saveFileType" in raw) ||
		(raw as Record<string, unknown>).saveFileType === undefined ||
		typeof (raw as Record<string, unknown>).variables !== "string" ||
		!((raw as Record<string, unknown>).variables as string).includes("Variable={")
	) {
		throw new Error("This doesn't look like a valid Suzerain save file.");
	}

	const data = raw as SaveData;

	if (data.currentStoryPack !== undefined && typeof data.currentStoryPack !== "string") {
		throw new Error("Invalid save file: currentStoryPack must be a string.");
	}
	if (
		data.turnNo !== undefined &&
		(typeof data.turnNo !== "number" || !Number.isFinite(data.turnNo))
	) {
		throw new Error("Invalid save file: turnNo must be a finite number.");
	}
	if (data.entityUpdates !== undefined && !Array.isArray(data.entityUpdates)) {
		throw new Error("Invalid save file: entityUpdates must be an array.");
	}

	const variablesMap = parseAllSaveVariables(data.variables);
	const values: FieldValues = {};
	const fields = getAllFields();

	for (const field of fields) {
		if (field.type === "number") {
			const val = variablesMap.get(field.key);
			if (typeof val === "number" && Number.isFinite(val)) {
				values[field.id] = val;
			}
		} else if (field.type === "checkbox") {
			const val = variablesMap.get(field.key);
			if (typeof val === "boolean") {
				values[field.id] = val;
			}
		} else if (field.type === "boolean-date") {
			const isChecked = variablesMap.get(field.key) === true;
			values[field.id] = isChecked;

			const dateRaw = variablesMap.get(field.dateKey);
			let dateVal = "";
			if (typeof dateRaw === "string" && dateRaw) {
				dateVal = convertToDatetimeLocal(dateRaw);
			}

			// Fallback: If checked/unlocked, but date is empty, supply a fallback
			if (isChecked && !dateVal) {
				dateVal =
					parseLastModified(typeof data.lastModified === "string" ? data.lastModified : undefined) ||
					getCurrentDatetimeLocal();
			}
			values[field.dateId] = dateVal;
		} else if (field.type === "radio-group") {
			for (const option of field.options) {
				if (variablesMap.get(option.key) === true) {
					values[field.id] = option.id; // Store the ID of the selected option
					break;
				}
			}
		}
	}

	return { values, originalData: data, variablesMap };
}

export function generateSaveFile(
	originalData: SaveData,
	values: FieldValues,
	extraVariables?: Record<string, string | number | boolean>
): string {
	let vs = originalData.variables;
	const fields = getAllFields();

	for (const field of fields) {
		if (field.type === "number") {
			const val = values[field.id] ?? 0;
			vs = upsertLuaVariable(vs, field.key, typeof val === "number" ? val : Number(val) || 0);
		} else if (field.type === "checkbox") {
			const val = values[field.id] === true;
			vs = upsertLuaVariable(vs, field.key, val);
		} else if (field.type === "boolean-date") {
			const isChecked = values[field.id] === true;
			const dateVal = (values[field.dateId] as string) || "";
			vs = upsertLuaVariable(vs, field.key, isChecked);

			const formattedDate = isChecked ? convertDatetimeLocalToInitialDate(dateVal) : "";
			vs = upsertLuaVariable(vs, field.dateKey, formattedDate);
		} else if (field.type === "radio-group") {
			const selectedId = values[field.id];
			for (const option of field.options) {
				const isSelected = option.id === selectedId;
				vs = upsertLuaVariable(vs, option.key, isSelected);
			}
		}
	}

	if (extraVariables) {
		for (const [rawKey, val] of Object.entries(extraVariables)) {
			if (val !== undefined && isValidLuaKey(rawKey)) {
				vs = upsertLuaVariable(vs, rawKey, val);
			}
		}
	}

	const newData = { ...originalData, variables: vs };
	return JSON.stringify(newData);
}
