const SAFE_LUA_KEY_REGEX = /^[A-Za-z0-9_]+(?:\.[A-Za-z0-9_]+)*$/;

export function isValidLuaKey(rawKey: string): boolean {
	return SAFE_LUA_KEY_REGEX.test(rawKey);
}

function escapeRegExp(str: string): string {
	return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function unescapeLuaString(raw: string): string {
	return raw.replace(/\\(.)/g, (_, ch: string) => {
		if (ch === "n") return "\n";
		if (ch === "r") return "\r";
		if (ch === "t") return "\t";
		return ch;
	});
}

export function formatLuaValue(val: string | number | boolean): string {
	if (typeof val === "boolean") {
		return val ? "true" : "false";
	}
	if (typeof val === "number") {
		if (!Number.isFinite(val)) {
			throw new Error("Please enter a valid number.");
		}
		return String(val);
	}
	const escaped = String(val)
		.replace(/\\/g, "\\\\")
		.replace(/"/g, '\\"')
		.replace(/\r?\n/g, "\\n");
	return `"${escaped}"`;
}

/**
 * Fast single-pass Lua Variable Parser.
 * Parses the raw Lua table string Variable={["Key"]=value, ...} into a Map.
 */
export function parseAllSaveVariables(
	variablesString: string
): Map<string, string | number | boolean> {
	const map = new Map<string, string | number | boolean>();
	if (!variablesString) return map;

	const regex = /\["([^"]+)"\]\s*=\s*("(?:\\[\s\S]|[^"\\])*"|true|false|-?\d+(?:\.\d+)?)/g;
	let match: RegExpExecArray | null;

	while ((match = regex.exec(variablesString)) !== null) {
		const key = match[1];
		const rawVal = match[2];

		if (rawVal === "true") {
			map.set(key, true);
		} else if (rawVal === "false") {
			map.set(key, false);
		} else if (rawVal.startsWith('"') && rawVal.endsWith('"')) {
			map.set(key, unescapeLuaString(rawVal.slice(1, -1)));
		} else {
			const num = parseFloat(rawVal);
			map.set(key, Number.isNaN(num) ? rawVal : num);
		}
	}

	return map;
}

/**
 * Safely updates or inserts a Lua variable in the Variable={...} table string.
 * Uses a replacer function to avoid $& / $$ special replacement token corruption.
 */
export function upsertLuaVariable(
	variablesString: string,
	rawKey: string,
	value: string | number | boolean
): string {
	if (!SAFE_LUA_KEY_REGEX.test(rawKey)) {
		throw new Error(`Could not update setting "${rawKey}".`);
	}

	const formattedVal = formatLuaValue(value);
	const escapedKey = escapeRegExp(rawKey);
	const existingPattern = new RegExp(
		`\\[\\"${escapedKey}\\"\\]\\s*=\\s*(?:"(?:\\\\[\\s\\S]|[^"\\\\])*"|true|false|-?\\d+(?:\\.\\d+)?)`
	);

	if (existingPattern.test(variablesString)) {
		return variablesString.replace(existingPattern, () => `["${rawKey}"]=${formattedVal}`);
	}

	const tableStart = variablesString.indexOf("Variable={");
	if (tableStart === -1) {
		throw new Error("Save file data is missing or corrupted.");
	}
	const insertPos = tableStart + "Variable={".length;
	return (
		variablesString.slice(0, insertPos) +
		`["${rawKey}"]=${formattedVal}, ` +
		variablesString.slice(insertPos)
	);
}
