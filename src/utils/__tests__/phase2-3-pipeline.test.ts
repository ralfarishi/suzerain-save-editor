import { describe, it, expect } from "vitest";
import { upsertLuaVariable, generateSaveFile, SaveData, isValidLuaKey } from "../save-manager";
import { parseEntityUpdates, parseAllSaveVariables, auditAllAchievements } from "../save-audit";
import { evaluatePredicateAgainstSave, parseLiteralValue, getSemanticLabel } from "../causal-graph";

describe("Phase 2: Arbitrary Lua Key Upsert & EntityUpdates", () => {
	const baseSave: SaveData = {
		saveFileType: 1,
		turnNo: 5,
		currentStoryPack: "StoryPack_Main",
		campaignName: "Test Run",
		variables: 'Variable={["BaseGame.Budget"]=5, ["BaseGame.ExistingFlag"]=false}',
	};

	it("updates an existing Lua variable in-place", () => {
		const updated = upsertLuaVariable(baseSave.variables, "BaseGame.ExistingFlag", true);
		expect(updated).toContain('["BaseGame.ExistingFlag"]=true');
		expect(updated).not.toContain('["BaseGame.ExistingFlag"]=false');
	});

	it("inserts a missing arbitrary Lua key safely", () => {
		const updated = upsertLuaVariable(baseSave.variables, "BaseGame.Agnolia_Alliance", true);
		expect(updated).toContain('["BaseGame.Agnolia_Alliance"]=true');
		const map = parseAllSaveVariables(updated);
		expect(map.get("BaseGame.Agnolia_Alliance")).toBe(true);
		expect(map.get("BaseGame.Budget")).toBe(5);
	});

	it("rejects invalid Lua keys to prevent syntax corruption", () => {
		expect(() => upsertLuaVariable(baseSave.variables, 'Bad"Key', true)).toThrow();
		expect(() => upsertLuaVariable(baseSave.variables, "Bad]Key=1", true)).toThrow();
	});

	it("generateSaveFile includes extraVariables alongside appData fields", () => {
		const outJson = generateSaveFile(baseSave, {}, { "RiziaDLC.CustomFlag": true, "BaseGame.Budget": 9 });
		const parsed = JSON.parse(outJson) as SaveData;
		const map = parseAllSaveVariables(parsed.variables);
		expect(map.get("RiziaDLC.CustomFlag")).toBe(true);
		expect(map.get("BaseGame.Budget")).toBe(9);
	});

	it("parseEntityUpdates indexes entityUpdates by nameInDatabase", () => {
		const map = parseEntityUpdates([
			{ nameInDatabase: "Decree_Test", fieldName: "IsEnacted", fieldValue: "True" },
			{ nameInDatabase: "Decree_Test", fieldName: "TurnNo", fieldValue: "4" },
		]);
		expect(map.get("Decree_Test")).toEqual({ IsEnacted: "True", TurnNo: "4" });
		expect(parseEntityUpdates(undefined).size).toBe(0);
	});
});

describe("Phase 3: Causal Predicate Evaluation & Reactive Audit", () => {
	it("parseLiteralValue parses booleans, numbers, and strings", () => {
		expect(parseLiteralValue("true")).toBe(true);
		expect(parseLiteralValue("false")).toBe(false);
		expect(parseLiteralValue("7")).toBe(7);
		expect(parseLiteralValue("-2.5")).toBe(-2.5);
		expect(parseLiteralValue('"Sordland"')).toBe("Sordland");
	});

	it("evaluatePredicateAgainstSave evaluates operators and turn deadlines", () => {
		const vars = new Map<string, string | number | boolean>([
			["BaseGame.AMorgnaWesCore", 7],
			["BaseGame.Agnolia_Alliance", false],
		]);

		expect(
			evaluatePredicateAgainstSave(
				{ var: "BaseGame.AMorgnaWesCore", op: ">=", value: "7" },
				vars,
				8,
				8
			)
		).toBe("completed");

		expect(
			evaluatePredicateAgainstSave(
				{ var: "BaseGame.Agnolia_Alliance", op: "==", value: "true" },
				vars,
				6,
				5
			)
		).toBe("missed");

		expect(
			evaluatePredicateAgainstSave(
				{ var: "BaseGame.Agnolia_Alliance", op: "==", value: "true" },
				vars,
				4,
				5
			)
		).toBe("upcoming");
	});

	it("auditAllAchievements reflects variable mutations immediately", () => {
		const vars = new Map<string, string | number | boolean>([
			["BaseGame.Agnolia_Alliance", false],
		]);
		const before = auditAllAchievements(vars, 6, "StoryPack_Main", "Sordland");
		expect(before.results.get("Game_AgnoliaAlliance")?.status).toBe("missed");

		vars.set("BaseGame.Agnolia_Alliance", true);
		const after = auditAllAchievements(vars, 6, "StoryPack_Main", "Sordland");
		expect(after.results.get("Game_AgnoliaAlliance")?.status).toBe("completed");
	});

	it("isValidLuaKey accepts dotted and dotless keys and rejects unsafe syntax", () => {
		expect(isValidLuaKey("TurnNo")).toBe(true);
		expect(isValidLuaKey("BaseGame.Agnolia_Alliance")).toBe(true);
		expect(isValidLuaKey('Bad"Key')).toBe(false);
		expect(isValidLuaKey("Bad Key")).toBe(false);
	});

	it("getSemanticLabel formats Tier 3 fallback labels deterministically", () => {
		expect(getSemanticLabel(null, "RiziaDLC.Policy_RD_AbolishLevies")).toBe(
			"Abolish Levies (Rizia · Policy)"
		);
		expect(getSemanticLabel(null, "BaseGameSupport.Journal_Turn03_Gasom")).toBe(
			"Turn03 Gasom (Sordland · Journal)"
		);
	});
});
