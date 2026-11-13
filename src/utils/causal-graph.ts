export interface VariablePredicate {
	var: string;
	op: string;
	value: string;
}

export interface VariableMutation {
	var: string;
	op: string;
	value: string;
}

export interface DialogueGraphNode {
	id: number;
	speaker: string;
	isPlayerChoice: boolean;
	text: string;
	conditionsRaw: string | null;
	variablesRead: VariablePredicate[];
	variablesModified: VariableMutation[];
	outgoingIds: Array<{ convId: number; nodeId: number }>;
}

export interface SceneSummary {
	conversationId: number;
	title: string;
	storyPack: "StoryPack_Main" | "StoryPack_Rizia";
	turn: number;
	turnLabel: string;
	isDevNote: boolean;
	rootNodeId: number;
	nodeCount: number;
	decisionCount: number;
	variablesRead: string[];
	variablesModified: string[];
	achievementsLinked: string[];
	chunkPath?: string;
}

export interface SceneChunk {
	conversationId: number;
	title: string;
	storyPack: "StoryPack_Main" | "StoryPack_Rizia";
	turn: number;
	turnLabel: string;
	isDevNote: boolean;
	rootNodeId: number;
	nodes: Record<string, DialogueGraphNode>;
}

export type VariableSourceType =
	| "dialogue"
	| "conversation_fragment"
	| "decision"
	| "decree"
	| "decree_approval"
	| "bill";

export interface VariableMutationRef {
	sourceType?: VariableSourceType;
	convId?: number;
	nodeId?: number;
	entityId?: string;
	title?: string;
	turn: number;
	value: string;
}

export interface VariableReadRef {
	sourceType?: VariableSourceType;
	convId?: number;
	nodeId?: number;
	entityId?: string;
	title?: string;
	turn: number;
	condition: string;
}

export interface VariableIndex {
	rawKey?: string;
	category: string;
	storyPack: "StoryPack_Main" | "StoryPack_Rizia" | "Shared";
	initialValue: string | number | boolean;
	mutatedIn: VariableMutationRef[];
	readIn: VariableReadRef[];
	achievements: string[];
}

export interface SemanticLabel {
	label: string;
	source: string;
}

export interface AchievementGraphLink {
	id: string;
	storyPacks: string[];
	conditionRaw: string;
	predicates: VariablePredicate[];
}

export interface CausalGraph {
	version: string;
	generatedAt: string;
	stats: {
		sceneCount: number;
		totalNodes: number;
		activeVariableCount: number;
		achievementCount: number;
	};
	scenes: Record<string, SceneSummary>;
	variables: Record<string, VariableIndex>;
	achievements: Record<string, AchievementGraphLink>;
	semanticDictionary: Record<string, SemanticLabel>;
}

let cachedGraphPromise: Promise<CausalGraph> | null = null;
const sceneChunkCache = new Map<number, SceneChunk>();

export function resetCausalGraphCache(): void {
	cachedGraphPromise = null;
	sceneChunkCache.clear();
}

export function fetchCausalGraph(): Promise<CausalGraph> {
	if (!cachedGraphPromise) {
		cachedGraphPromise = fetch("/data/causal-graph.json")
			.then((res) => {
				if (!res.ok) {
					throw new Error(`Failed to load causal-graph.json (${res.status})`);
				}
				return res.json() as Promise<CausalGraph>;
			})
			.catch((err) => {
				cachedGraphPromise = null;
				throw err;
			});
	}
	return cachedGraphPromise;
}

export async function fetchSceneChunk(convId: number, signal?: AbortSignal): Promise<SceneChunk> {
	const existing = sceneChunkCache.get(convId);
	if (existing) return existing;

	const res = await fetch(`/data/scenes/${convId}.json`, { signal });
	if (!res.ok) {
		throw new Error(`Failed to load scene chunk ${convId} (${res.status})`);
	}
	const chunk = (await res.json()) as SceneChunk;
	sceneChunkCache.set(convId, chunk);
	return chunk;
}

export function parseLiteralValue(raw: string): string | number | boolean {
	const trimmed = raw.trim();
	if (trimmed === "true") return true;
	if (trimmed === "false") return false;
	if (/^-?\d+(?:\.\d+)?$/.test(trimmed)) {
		return parseFloat(trimmed);
	}
	return trimmed.replace(/^["']|["']$/g, "");
}

export type PredicateSaveStatus = "completed" | "missed" | "upcoming";

export function evaluatePredicateAgainstSave(
	pred: VariablePredicate,
	variablesMap: Map<string, string | number | boolean>,
	saveTurnNo: number,
	stepTurn: number
): PredicateSaveStatus {
	const actual = variablesMap.get(pred.var);
	const expected = parseLiteralValue(pred.value);

	let isMet = false;
	if (actual !== undefined) {
		if (pred.op === "==" || pred.op === "=") {
			isMet = actual === expected;
		} else if (pred.op === "~=") {
			isMet = actual !== expected;
		} else if (typeof actual === "number" && typeof expected === "number") {
			if (pred.op === ">=") isMet = actual >= expected;
			else if (pred.op === "<=") isMet = actual <= expected;
			else if (pred.op === ">") isMet = actual > expected;
			else if (pred.op === "<") isMet = actual < expected;
		}
	}

	if (isMet) return "completed";
	if (stepTurn >= 0 && saveTurnNo > stepTurn) return "missed";
	return "upcoming";
}

function evaluateSingleClause(
	clause: string,
	variablesMap: Map<string, string | number | boolean>
): boolean {
	const trimmed = clause.trim().replace(/^\(+|\)+$/g, "").trim();
	if (!trimmed) return true;

	const opMatch =
		/^(?:Variable\[["']([^"']+)["']\]|([A-Za-z0-9_.]+))\s*(==|~=!=|!=|~=|=|>=|<=|>|<)\s*(.+)$/.exec(
			trimmed
		);

	if (opMatch) {
		const key = opMatch[1] || opMatch[2];
		const op = opMatch[3];
		const expected = parseLiteralValue(opMatch[4]);
		const actual = variablesMap.get(key);
		if (actual === undefined) return false;

		if (op === "==" || op === "=") return actual === expected;
		if (op === "!=" || op === "~=") return actual !== expected;
		if (typeof actual === "number" && typeof expected === "number") {
			if (op === ">=") return actual >= expected;
			if (op === "<=") return actual <= expected;
			if (op === ">") return actual > expected;
			if (op === "<") return actual < expected;
		}
		return false;
	}

	const notMatch = /^not\s+(?:Variable\[["']([^"']+)["']\]|([A-Za-z0-9_.]+))$/i.exec(trimmed);
	if (notMatch) {
		const key = notMatch[1] || notMatch[2];
		return variablesMap.get(key) !== true;
	}

	const bareMatch = /^(?:Variable\[["']([^"']+)["']\]|([A-Za-z0-9_.]+))$/.exec(trimmed);
	if (bareMatch) {
		const key = bareMatch[1] || bareMatch[2];
		return variablesMap.get(key) === true;
	}

	return false;
}

/**
 * Evaluates a Lua-style condition expression (supporting `and`, `or`, `==`, `!=`/`~=`, `>=`, `<=`, `>`, `<`)
 * against the active save's variable map.
 */
export function evaluateConditionLocally(
	conditionRaw: string,
	variablesMap: Map<string, string | number | boolean>
): boolean {
	if (!conditionRaw || !conditionRaw.trim()) return true;

	const orBranches = conditionRaw.split(/\s+or\s+/i);
	return orBranches.some((orBranch) => {
		const andClauses = orBranch.split(/\s+and\s+/i);
		return andClauses.every((clause) => evaluateSingleClause(clause, variablesMap));
	});
}

export function getSemanticLabel(graph: CausalGraph | null, rawKey: string): string {
	const fromDict = graph?.semanticDictionary[rawKey]?.label;
	if (fromDict) return fromDict;

	const dotIdx = rawKey.indexOf(".");
	const ns = dotIdx >= 0 ? rawKey.slice(0, dotIdx) : "General";
	let short = dotIdx >= 0 ? rawKey.slice(dotIdx + 1) : rawKey;

	const pack = rawKey.startsWith("Rizia")
		? "Rizia"
		: rawKey.startsWith("BaseGame")
			? "Sordland"
			: "Shared";

	let cat = "Campaign";
	if (short.includes("Journal")) cat = "Journal";
	else if (short.includes("Policy") || short.includes("Decree")) cat = "Policy";
	else if (short.includes("CollectionItem")) cat = "Collectible";
	else if (short.includes("Relationship") || short.includes("Relation")) cat = "Relationship";
	else if (short.includes("Decision")) cat = "Decision";
	else if (ns === "GameCondition") cat = "Story Event";

	for (const pfx of ["Policy_RD_", "Journal_", "Decision_", "CollectionItem_", "Turn0", "Turn1", "Turn"]) {
		if (short.startsWith(pfx)) {
			short = short.slice(pfx.length);
			break;
		}
	}

	const humanized = short
		.replace(/_/g, " ")
		.replace(/([a-z])([A-Z])/g, "$1 $2")
		.replace(/\s+/g, " ")
		.trim();

	return `${humanized} (${pack} · ${cat})`;
}
