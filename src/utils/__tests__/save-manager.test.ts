import { describe, expect, it } from "vitest";
import { parseSaveFile, generateSaveFile, getFieldById, findFieldLocation, upsertLuaVariable } from "../save-manager";
import { parseAllSaveVariables } from "../lua-variables";
import { SaveData } from "../save-manager";

describe("save-manager", () => {
	const sampleVariablesString = 
		`Variable={\n` +
		`["BaseGame.GovernmentBudget"] = 4\n` +
		`["BaseGame.Public_Opinion"] = 10\n` +
		`["BaseGame.Relations_Deana_Loved"] = true\n` +
		`["BaseGame.Relations_Monica_Opinion"] = 15\n` +
		`["BaseGame.Relations_Deana_Opinion"] = false\n` +
		`["BaseGame.Faction_USP_AgainstProposal"] = true\n` +
		`["BaseGame.Reform_Albin_Convinced"] = false\n` +
		`["BaseGame.Reform_Gloria_Convinced"] = true\n` +
		`["BaseGame.Turn01_InT_Investment_Railway"] = true\n` +
		`["BaseGame.Turn01_InT_Investment_Highway"] = false\n` +
		`["BaseGame.Turn03_InT_Investment_Date"] = "15/04/1954 08:30 AM"\n` +
		`}`;

	const sampleSaveData: SaveData = {
		saveFileType: 1,
		variables: sampleVariablesString,
		customKey: "customValue",
	};

	describe("getFieldById", () => {
		it("retrieves a field definition by its ID", () => {
			const field = getFieldById("gov-budget");
			expect(field).toBeDefined();
			expect(field?.type).toBe("number");
			if (field?.type === "number") {
				expect(field.key).toBe("BaseGame.GovernmentBudget");
			}
		});

		it("returns undefined for non-existent field ID", () => {
			const field = getFieldById("non-existent-id");
			expect(field).toBeUndefined();
		});
	});

	describe("parseSaveFile", () => {
		it("correctly parses numbers, checkboxes, and radio-groups from variables string", () => {
			const parsed = parseSaveFile(JSON.stringify(sampleSaveData));
			expect(parsed.values["gov-budget"]).toBe(4);
			expect(parsed.values["public-opinion"]).toBe(10);
			expect(parsed.values["deana-loved"]).toBe(true);
			expect(parsed.values["deana-opinion"]).toBe(false);
			expect(parsed.values["usp-against"]).toBe(true);
			expect(parsed.values["albin-convinced-reform"]).toBe(false);
			expect(parsed.values["infrastructure-project"]).toBe("railway-project"); // From radio-group ID
		});

		it("returns the exact parsed original data structure", () => {
			const parsed = parseSaveFile(JSON.stringify(sampleSaveData));
			expect(parsed.originalData.customKey).toBe("customValue");
		});

		it("rejects malformed JSON and non-string currentStoryPack or invalid turnNo", () => {
			expect(() => parseSaveFile("{bad json")).toThrow();
			expect(() =>
				parseSaveFile(
					JSON.stringify({ saveFileType: 1, variables: "Variable={}", currentStoryPack: 123 })
				)
			).toThrow(/currentStoryPack/);
			expect(() =>
				parseSaveFile(
					JSON.stringify({ saveFileType: 1, variables: "Variable={}", turnNo: "invalid" })
				)
			).toThrow(/turnNo/);
		});
	});

	describe("upsertLuaVariable safety", () => {
		it("preserves $&, $$, quotes, and backslashes without corruption", () => {
			const initial = 'Variable={["BaseGame.Title"]="Old", ["BaseGame.Other"]=1}';
			const specialValue = 'Price $& $$ and "quotes" + C:\\path\\to\\file';
			const updated = upsertLuaVariable(initial, "BaseGame.Title", specialValue);
			const parsedMap = parseAllSaveVariables(updated);
			expect(parsedMap.get("BaseGame.Title")).toBe(specialValue);
			expect(parsedMap.get("BaseGame.Other")).toBe(1);
		});
	});

	describe("generateSaveFile", () => {
		it("re-serializes values back to the same Lua format string", () => {
			const parsed = parseSaveFile(JSON.stringify(sampleSaveData));
			const updatedValues = {
				...parsed.values,
				"gov-budget": 20,
				"public-opinion": -5,
				"deana-loved": false,
				"infrastructure-project": "highway-project", // Switch radio option in the parent field
			};

			const newJsonStr = generateSaveFile(parsed.originalData, updatedValues);
			const newSaveData = JSON.parse(newJsonStr) as SaveData;
			const newVariables = newSaveData.variables;

			expect(newVariables).toContain('["BaseGame.GovernmentBudget"]=20');
			expect(newVariables).toContain('["BaseGame.Public_Opinion"]=-5');
			expect(newVariables).toContain('["BaseGame.Relations_Deana_Loved"]=false');
			expect(newVariables).toContain('["BaseGame.Turn01_InT_Investment_Railway"]=false');
			expect(newVariables).toContain('["BaseGame.Turn01_InT_Investment_Highway"]=true');
		});
	});

	describe("findFieldLocation", () => {
		it("locates a field by its field id", () => {
			const loc = findFieldLocation("gov-budget");
			expect(loc).toBeDefined();
			expect(loc?.fieldId).toBe("gov-budget");
			expect(loc?.tabId).toBe("money-opinion");
		});

		it("locates a field by its Lua variable key", () => {
			const loc = findFieldLocation("BaseGame.GovernmentBudget");
			expect(loc).toBeDefined();
			expect(loc?.fieldId).toBe("gov-budget");
		});

		it("locates a radio field by one of its option Lua keys", () => {
			const loc = findFieldLocation("BaseGame.Turn01_InT_Investment_Highway");
			expect(loc).toBeDefined();
			expect(loc?.fieldId).toBe("infrastructure-project");
		});

		it("returns null for unmapped keys", () => {
			expect(findFieldLocation("BaseGame.NonExistent_Unmapped_Key")).toBeNull();
		});
	});
});
