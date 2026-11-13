import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { achievementWalkthroughs } from '../../data/achievement_walkthroughs';
import { steamAchievements } from '../../data/steam_achievements';

function extractCleanJson(filepath: string) {
	const buf = fs.readFileSync(filepath);
	const str = buf.toString('utf8');
	const first = str.indexOf('{');
	const last = str.lastIndexOf('}');
	if (first !== -1 && last !== -1) {
		return JSON.parse(str.slice(first, last + 1));
	}
	return null;
}

const BASE_TEXTASSET_DIR = path.resolve('Suzerain Dialogues Database/BASE/TextAsset');
const SCENES_DIR = path.resolve('Suzerain Dialogues Database/Scenes_Clean_Markdown');
const MATRIX_PATH = path.resolve('Suzerain Dialogues Database/ULTIMATE_ACHIEVEMENTS_MATRIX.md');

const hasBaseAssets = fs.existsSync(BASE_TEXTASSET_DIR);
const activeScenesDir = fs.existsSync(SCENES_DIR) ? SCENES_DIR : null;

function getNormalizedSceneSet(dir: string): Set<string> {
	return new Set(
		fs.readdirSync(dir).map((f) => f.toLowerCase())
	);
}

describe.skipIf(!hasBaseAssets)('Ground-Truth Asset Audit (Torpor Games Official Dumps)', () => {
	const config = extractCleanJson(path.join(BASE_TEXTASSET_DIR, 'achievementsConfig.dat'));
	const cond = extractCleanJson(path.join(BASE_TEXTASSET_DIR, 'ConditionalAchievementData.dat'));
	const coll = extractCleanJson(path.join(BASE_TEXTASSET_DIR, 'CollectionItemData.dat'));

	it('should verify 100% ID parity against official achievementsConfig.dat (220 achievements)', () => {
		expect(config).not.toBeNull();
		expect(config.achievements).toHaveLength(220);

		const officialIds: string[] = config.achievements.map((a: { id: string }) => a.id);
		const appIds = Object.keys(achievementWalkthroughs);

		expect(appIds).toHaveLength(220);
		expect(steamAchievements).toHaveLength(220);

		for (const officialId of officialIds) {
			expect(achievementWalkthroughs[officialId]).toBeDefined();
		}
	});

	it('should verify all 22 conditional achievement formulas from ConditionalAchievementData.dat', () => {
		expect(cond).not.toBeNull();
		expect(cond.items).toHaveLength(22);

		for (const item of cond.items) {
			const id: string = item.NameInDatabase;
			const condition: string = item.ConditionalAchievementProperties?.Condition;
			const walkthrough = achievementWalkthroughs[id];

			expect(walkthrough, `Walkthrough missing for conditional achievement ${id}`).toBeDefined();
			expect(walkthrough.saveVariables.length).toBeGreaterThan(0);

			// Extract variable tokens from condition formula (e.g. BaseGame.AMorgnaWesCore)
			const varTokens = condition.match(/(?:BaseGame|RiziaDLC)[a-zA-Z0-9_.]+/g) || [];
			for (const token of varTokens) {
				const hasToken = walkthrough.saveVariables.some(
					(v) => v.includes(token) || token.includes(v)
				);
				expect(
					hasToken,
					`Achievement ${id} should track engine variable ${token}. Current: ${walkthrough.saveVariables.join(', ')}`
				).toBe(true);
			}
		}
	});

	it('should verify all 36 collection items from CollectionItemData.dat with exact namespaces', () => {
		expect(coll).not.toBeNull();
		expect(coll.items).toHaveLength(36);

		for (const item of coll.items) {
			const props = item.CollectionItemProperties;
			let id: string = props.AchievementId;
			if (id === 'Rizia_CollectionItem_KorontiResortPostcard') {
				// Internal developer typo in Steam config registration
				id = 'Rizia_CollectionItem_KorontiReportPostcard';
			}

			const walkthrough = achievementWalkthroughs[id];
			expect(walkthrough, `Walkthrough missing for collectible ${id}`).toBeDefined();

			const expectedVar: string = props.IsUnlockedVariable;
			expect(
				walkthrough.saveVariables,
				`Collectible ${id} must contain exact engine variable ${expectedVar}`
			).toContain(expectedVar);
		}
	});

	it.skipIf(!activeScenesDir || !fs.existsSync(MATRIX_PATH))(
		'should verify all 105 referenced in-scene script files in developer matrix exist on disk',
		() => {
			const existingScenes = getNormalizedSceneSet(activeScenesDir!);

			const matrixContent = fs.readFileSync(MATRIX_PATH, 'utf8');
			const matches = matrixContent.match(/\[`([^`]+\.md)`\]/g) || [];

			expect(matches.length).toBeGreaterThan(100);

			for (const m of matches) {
				const filename = m.slice(2, -2).trim().toLowerCase();
				expect(
					existingScenes.has(filename),
					`Matrix references non-existent scene file: ${filename}`
				).toBe(true);
			}
		}
	);

	it.skipIf(!activeScenesDir)(
		'should verify all walkthrough scene files exist on disk',
		() => {
			const existingScenes = getNormalizedSceneSet(activeScenesDir!);

		let checkedSceneFiles = 0;
		for (const [id, w] of Object.entries(achievementWalkthroughs)) {
			if (w.timeline?.sceneFile) {
				const parts = w.timeline.sceneFile.split(/[,&]/).map((s) => s.trim());
				for (const p of parts) {
					let candidate = path.basename(p).toLowerCase();
					if (!candidate.endsWith('.md')) candidate += '.md';
					expect(
						existingScenes.has(candidate),
						`Achievement ${id} references invalid sceneFile: ${candidate}`
					).toBe(true);
					checkedSceneFiles++;
				}
			}
		}

		expect(checkedSceneFiles).toBeGreaterThan(200);
	});

	it('should ensure zero placeholder or generic fallback strings across all 220 walkthroughs', () => {
		const forbiddenPhrases = [
			'Picking hostile or contradictory dialogue options in Turn',
			'Mid/Late Game',
			'Cabinet / State Decision',
			'Find and collect this item',
			'Pick up or accept',
		];

		for (const [id, w] of Object.entries(achievementWalkthroughs)) {
			const serialized = JSON.stringify(w);
			for (const phrase of forbiddenPhrases) {
				expect(
					serialized.includes(phrase),
					`Achievement ${id} contains forbidden placeholder: "${phrase}"`
				).toBe(false);
			}

			// Structural integrity checks
			expect(w.prerequisites.length).toBeGreaterThan(0);
			expect(w.timeline.turn.length).toBeGreaterThan(3);
			expect(w.timeline.sceneTitle.length).toBeGreaterThan(3);
			expect(w.dialogueSteps.length).toBeGreaterThan(0);
			expect(w.pitfalls.length).toBeGreaterThan(0);
			expect(Array.isArray(w.saveVariables)).toBe(true);
		}
	});
});
