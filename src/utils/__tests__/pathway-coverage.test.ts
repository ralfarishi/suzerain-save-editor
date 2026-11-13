import { describe, expect, it } from "vitest";
import { communityPathways } from "../../data/pathways";
import { runs, achievementRunIndex } from "../../data/runs";
import { steamAchievements } from "../../data/steam_achievements";
import { computeRecommendation } from "../recommendation";

describe("Unified Pathway System & Full Achievement Coverage", () => {
	it("should have exactly 10 comprehensive archetype pathways", () => {
		expect(communityPathways).toHaveLength(10);
		expect(runs).toHaveLength(10);
	});

	it("should cover 100% of all 220 official achievements across the 10 pathways", () => {
		expect(steamAchievements).toHaveLength(220);

		const allSteamNames = new Set(steamAchievements.map((a) => a.name));
		expect(allSteamNames.size).toBe(220);

		const pathwayCoveredNames = new Set<string>();
		for (const p of communityPathways) {
			for (const name of p.achievements) {
				pathwayCoveredNames.add(name);
			}
		}

		const missingFromPathways = [...allSteamNames].filter((name) => !pathwayCoveredNames.has(name));
		expect(
			missingFromPathways,
			`All 220 achievements must be covered in pathways. Missing: ${missingFromPathways.join(", ")}`
		).toEqual([]);
		expect(pathwayCoveredNames.size).toBe(220);
	});

	it("should have all 220 achievements indexed in achievementRunIndex", () => {
		for (const steamAch of steamAchievements) {
			const matchingRuns = achievementRunIndex.get(steamAch.name);
			expect(
				matchingRuns,
				`Achievement ${steamAch.name} must be mapped to at least one run in achievementRunIndex`
			).toBeDefined();
			expect(matchingRuns!.length).toBeGreaterThan(0);
		}
	});

	it("should ensure every pathway has valid steps with narrative and technical details", () => {
		for (const p of communityPathways) {
			expect(p.id).toBeTruthy();
			expect(p.title).toBeTruthy();
			expect(p.subtitle).toBeTruthy();
			expect(p.description).toBeTruthy();
			expect(p.achievements.length).toBeGreaterThan(0);
			expect(p.steps.length).toBeGreaterThan(0);

			for (const step of p.steps) {
				expect(step.phase).toBeTruthy();
				expect(step.actions.length).toBeGreaterThan(0);
			}
		}
	});

	it("should execute the planner recommendation solver instantly on diverse selection", () => {
		const testSelection = [
			"Democrat",
			"Grand National Assembly",
			"The Constitution of '56",
			"Drain the Swamp",
			"Romus The Conqueror",
			"Wruhec's Second Coming",
		];

		const startTime = performance.now();
		const result = computeRecommendation(testSelection);
		const duration = performance.now() - startTime;

		expect(result).toBeDefined();
		expect(result.groups.length).toBeGreaterThan(0);
		expect(result.uncoverable).toHaveLength(0);
		// Sub-millisecond or few milliseconds execution time
		expect(duration).toBeLessThan(100);
	});
});
