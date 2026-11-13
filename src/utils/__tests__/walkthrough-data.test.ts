import { describe, it, expect } from "vitest";
import { steamAchievements } from "../../data/steam_achievements";
import { achievementWalkthroughs } from "../../data/achievement_walkthroughs";

describe("Achievement Walkthroughs Integrity", () => {
	it("should have exactly 220 achievements in steamAchievements", () => {
		expect(steamAchievements.length).toBe(220);
	});

	it("should have a valid walkthrough entry for every steam achievement", () => {
		for (const ach of steamAchievements) {
			const wt = achievementWalkthroughs[ach.id];
			expect(wt, `Missing walkthrough for ${ach.id} (${ach.name})`).toBeDefined();
			expect(wt.achievementId).toBe(ach.id);
			expect(wt.achievementName).toBe(ach.name);
			expect(["Sordland", "Rizia", "Both"]).toContain(wt.game);
			expect([
				"Dialogue Choice",
				"Policy Decision",
				"Story Progression",
				"Collectible Item",
				"Tactical / Endgame",
			]).toContain(wt.category);
			expect(wt.timeline).toBeDefined();
			expect(wt.timeline.turn).toBeTruthy();
			expect(wt.timeline.sceneTitle).toBeTruthy();
			expect(Array.isArray(wt.prerequisites)).toBe(true);
			expect(wt.prerequisites.length).toBeGreaterThan(0);
			expect(Array.isArray(wt.dialogueSteps)).toBe(true);
			expect(wt.dialogueSteps.length).toBeGreaterThan(0);
		}
	});

	it("should correctly structure key dialogue choice achievements", () => {
		const mediaDeal = achievementWalkthroughs["Game_MediaDeal"];
		expect(mediaDeal).toBeDefined();
		expect(mediaDeal.timeline.turn).toBe("Turn 2");
		expect(mediaDeal.timeline.sceneFile).toBe("Sordland_Turn02_A_MediaDeal.md");
		expect(mediaDeal.category).toBe("Dialogue Choice");
		expect(mediaDeal.prerequisites.length).toBeGreaterThan(0);

		const acp = achievementWalkthroughs["Game_ACP"];
		expect(acp).toBeDefined();
		expect(acp.timeline.turn).toBe("Turn 5");
		expect(acp.timeline.sceneFile).toBe("Sordland_Turn05_SnO_FoundedPolice.md");

		const agnolia = achievementWalkthroughs["Game_AgnoliaAlliance"];
		expect(agnolia).toBeDefined();
		expect(agnolia.timeline.turn).toBe("Turn 5");
		expect(agnolia.timeline.sceneFile).toBe("Sordland_Turn05_FPnT_AgnoliaTradeVisit.md");
	});

	it("should correctly categorize collectibles and story progression", () => {
		const goatStatue = achievementWalkthroughs["Game_CollectionItem_GoatStatue"];
		expect(goatStatue).toBeDefined();
		expect(goatStatue.category).toBe("Collectible Item");

		const prologue = achievementWalkthroughs["Prologue_Finish"];
		expect(prologue).toBeDefined();
		expect(prologue.category).toBe("Story Progression");
	});
});
