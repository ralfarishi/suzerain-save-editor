// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from "vitest";
import {
	computeRecommendation,
	encodeSelectionToUrl,
	decodeSelectionFromUrl,
	loadSelectionFromStorage,
	saveSelectionToStorage,
} from "../recommendation";
import { runs } from "../../data/runs";

describe("recommendation engine & URL/storage helpers", () => {
	beforeEach(() => {
		localStorage.clear();
	});

	it("returns empty recommendation for empty selection", () => {
		const res = computeRecommendation([]);
		expect(res.groups).toHaveLength(0);
		expect(res.uncoverable).toHaveLength(0);
		expect(res.totalRuns).toBe(0);
		expect(res.crossRunConflicts).toHaveLength(0);
	});

	it("identifies uncoverable achievements and caps bonusAchievements at BONUS_CAP = 5", () => {
		const firstRun = runs[0];
		const target = firstRun.achievements[0];
		const res = computeRecommendation([target, "NonExistent_Achievement_XYZ"]);

		expect(res.uncoverable).toEqual(["NonExistent_Achievement_XYZ"]);
		expect(res.totalRuns).toBe(1);
		expect(res.groups[0].targetAchievements).toContain(target);
		expect(res.groups[0].bonusAchievements.length).toBeLessThanOrEqual(5);
	});

	it("detects intra-run exclusive conflicts", () => {
		let matchedPair: [string, string] | null = null;
		for (const r of runs) {
			const set = new Set(r.achievements);
			for (const [a, b] of r.exclusivePairs) {
				if (set.has(a) && set.has(b) && computeRecommendation([a, b]).totalRuns === 1) {
					matchedPair = [a, b];
					break;
				}
			}
			if (matchedPair) break;
		}
		expect(matchedPair).not.toBeNull();
		if (!matchedPair) return;

		const [a, b] = matchedPair;
		const res = computeRecommendation([a, b]);
		const allIntra = res.groups.flatMap((g) => g.intraRunConflicts);
		expect(allIntra.length).toBeGreaterThan(0);
		expect(
			allIntra.some(
				(c) =>
					(c.achievementA === a && c.achievementB === b) ||
					(c.achievementA === b && c.achievementB === a)
			)
		).toBe(true);
	});

	it("detects cross-run conflicts when conflicting achievements are in separate runs", () => {
		const runWithCross = runs.find(
			(r) => r.crossRunExclusivePairs && r.crossRunExclusivePairs.length > 0
		);
		if (!runWithCross || !runWithCross.crossRunExclusivePairs) return;

		const [a, b] = runWithCross.crossRunExclusivePairs[0];
		const res = computeRecommendation([a, b]);
		if (res.totalRuns > 1) {
			expect(res.crossRunConflicts.length).toBeGreaterThan(0);
		}
	});

	it("round-trips selection via encodeSelectionToUrl and decodeSelectionFromUrl", () => {
		const input = ["A New Hope", "Soll's Legacy", "Prologue: Rise to Power"];
		const encoded = encodeSelectionToUrl(input);
		const decoded = decodeSelectionFromUrl(encoded);
		expect(decoded).toEqual(input);
		expect(decodeSelectionFromUrl("")).toEqual([]);
	});

	it("falls back to empty array when localStorage has corrupted JSON or non-array data", () => {
		localStorage.setItem("planner_selected_achievements", "{corrupted");
		expect(loadSelectionFromStorage()).toEqual([]);

		localStorage.setItem("planner_selected_achievements", JSON.stringify({ not: "an array" }));
		expect(loadSelectionFromStorage()).toEqual([]);

		saveSelectionToStorage(["Goal A", "Goal B"]);
		expect(loadSelectionFromStorage()).toEqual(["Goal A", "Goal B"]);
	});
});
