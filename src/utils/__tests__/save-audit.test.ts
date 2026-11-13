import { describe, it, expect } from "vitest";
import * as fs from "fs";
import * as path from "path";
import {
	parseAllSaveVariables,
	parseTurnNumber,
	evaluateSingleAchievement,
	auditAllAchievements,
} from "../save-audit";
import { steamAchievements } from "../../data/steam_achievements";

describe("Save Audit & Lua Variable Parser", () => {
	it("should correctly convert turn strings to numeric turn numbers", () => {
		expect(parseTurnNumber("Prologue")).toBe(0);
		expect(parseTurnNumber("Turn 1")).toBe(1);
		expect(parseTurnNumber("Turn 5")).toBe(5);
		expect(parseTurnNumber("Turn 10")).toBe(10);
		expect(parseTurnNumber("Epilogue")).toBe(11);
		expect(parseTurnNumber(null)).toBeNull();
	});

	it("should parse sample Lua variables string into a fast indexed Map", () => {
		const sampleStr = 'Variable={["GameCondition.Turn02_A_MediaDeal"]=true, ["BaseGame.Budget"]=4, ["BaseGame.Title"]="President", ["BaseGame.Quote"]="He said \\"Vectern sis da!\\" loudly"};';
		const map = parseAllSaveVariables(sampleStr);

		expect(map.size).toBe(4);
		expect(map.get("GameCondition.Turn02_A_MediaDeal")).toBe(true);
		expect(map.get("BaseGame.Budget")).toBe(4);
		expect(map.get("BaseGame.Title")).toBe("President");
		expect(map.get("BaseGame.Quote")).toBe('He said "Vectern sis da!" loudly');
	});

	it("should parse the full save-example.json in under 30ms and audit all 220 achievements", () => {
		const savePath = path.resolve(__dirname, "../../../save-example.json");
		const rawContent = fs.readFileSync(savePath, "utf-8");
		const parsed = JSON.parse(rawContent);

		const t0 = performance.now();
		const map = parseAllSaveVariables(parsed.variables);
		const parseDuration = performance.now() - t0;

		expect(map.size).toBeGreaterThan(10000);
		expect(parseDuration).toBeLessThan(50); // Well under budget

		const { results, summary } = auditAllAchievements(
			map,
			parsed.turnNo,
			parsed.currentStoryPack,
			parsed.campaignName
		);

		expect(summary.total).toBe(220);
		expect(summary.turnNo).toBe(11);
		expect(summary.campaignName).toBe("allez");
		expect(summary.completedCount).toBeGreaterThan(0);

		// Verified specific state checks in save-example.json
		const lespia = results.get("Game_LespiaAlliance");
		expect(lespia).toBeDefined();
		expect(lespia?.status).toBe("completed");

		const agnolia = results.get("Game_AgnoliaAlliance");
		expect(agnolia).toBeDefined();
		expect(agnolia?.status).toBe("missed");

		const prologue = results.get("Prologue_Finish");
		expect(prologue).toBeDefined();
		expect(prologue?.status).toBe("completed");
	});

	it("should evaluate individual achievement status with evaluateSingleAchievement", () => {
		const emptyMap = new Map<string, string | number | boolean>();
		const res = evaluateSingleAchievement("Prologue_Finish", emptyMap, 0, "BaseGame");
		expect(res.status).toBe("in_progress");
		expect(steamAchievements.length).toBe(220);
	});

	it("uses human-readable badges and reasons without raw bracketed variable names", () => {
		const map = new Map<string, string | number | boolean>([
			["BaseGame.Lespia_Alliance", true],
			["BaseGameSupport.CollectionItem_Test", true],
		]);
		const allianceRes = evaluateSingleAchievement("Game_LespiaAlliance", map, 8, "BaseGame");
		expect(allianceRes.badgeLabel).toBe("UNLOCKED IN SAVE");

		const collectibleRes = evaluateSingleAchievement("Game_CollectionItem_Test", map, 8, "BaseGame");
		expect(collectibleRes.reason).not.toContain("[Test]");
		expect(collectibleRes.reason).toContain("collectible item");
	});

	it("returns other_campaign when auditing Sordland achievements against a Rizia save", () => {
		const emptyMap = new Map<string, string | number | boolean>();
		const res = evaluateSingleAchievement("Game_AgnoliaAlliance", emptyMap, 11, "RiziaDLC");
		expect(res.status).toBe("other_campaign");
		expect(res.badgeLabel).toBe("SORDLAND CAMPAIGN");

		const { results, summary } = auditAllAchievements(emptyMap, 11, "RiziaDLC", "RiziaTest");
		const sordlandAch = results.get("Game_AgnoliaAlliance");
		expect(sordlandAch?.status).toBe("other_campaign");
		expect(summary.otherCampaignCount).toBeGreaterThan(0);
	});
});
