export function formatSaveValue(val: string | number | boolean | undefined): string {
	if (val === undefined) return "Not set";
	if (val === true) return "Yes";
	if (val === false) return "No";
	return String(val);
}

export function formatTurnLabel(turn: number): string {
	if (turn === 0) return "Prologue";
	if (turn === 11) return "Epilogue";
	if (turn < 0) return "General";
	return `Turn ${turn}`;
}

export function formatExpectedRequirement(op: string, rawValue: string): string {
	const v = rawValue.trim().toLowerCase();
	const prettyVal =
		v === "true" ? "Yes" : v === "false" ? "No" : rawValue.replace(/^["']|["']$/g, "");
	if (op === "==" || op === "=") return `Needs: ${prettyVal}`;
	if (op === "~=" || op === "!=") return `Needs: Not ${prettyVal}`;
	if (op === ">=") return `Needs: ≥ ${prettyVal}`;
	if (op === "<=") return `Needs: ≤ ${prettyVal}`;
	return `Needs: ${op} ${prettyVal}`;
}

export function humanizeVariableKey(key: string): string {
	return key
		.replace(/^(BaseGame|RiziaDLC|Rizia)\./i, "")
		.replace(/_/g, " ")
		.replace(/([a-z])([A-Z])/g, "$1 $2")
		.trim();
}

export function getDefaultExportFilename(originalFilename: string): string {
	if (!originalFilename) return "suzerain-save-edited.json";
	const cleanName = originalFilename.replace(/\s*\([^)]*\)\s*$/, "").trim();
	const base = cleanName.replace(/\.json$/i, "");
	return `${base || "suzerain-save"}-edited.json`;
}

export function triggerJsonDownload(content: string, downloadFilename: string): void {
	const blob = new Blob([content], { type: "application/json" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = downloadFilename;
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	URL.revokeObjectURL(url);
}
