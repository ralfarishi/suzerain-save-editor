import { steamAchievements, steamAchievementById } from "../data/steam_achievements";
import { achievementAuditMeta } from "../data/achievement_audit_meta";
import { parseAllSaveVariables } from "./lua-variables";

export { parseAllSaveVariables };

export type SaveAuditStatus = "completed" | "in_progress" | "missed" | "other_campaign";

export interface AchievementAuditDetail {
	status: SaveAuditStatus;
	badgeLabel: string;
	badgeColor: "success" | "warning" | "danger" | "muted";
	reason: string;
	turnInfo?: string;
}

export interface SaveAuditSummary {
	campaignName: string;
	storyPack: string;
	turnNo: number;
	total: number;
	completedCount: number;
	inProgressCount: number;
	missedCount: number;
	otherCampaignCount: number;
}

interface EntityUpdateRecord {
	nameInDatabase: string;
	fieldName: string;
	fieldValue: string;
}

/**
 * Indexes save.entityUpdates by nameInDatabase -> { fieldName: fieldValue }.
 * Exposes enacted decrees, journal completion (IsDone, IsEnacted, IsFinished), TurnNo, etc.
 */
export function parseEntityUpdates(
	entityUpdates: EntityUpdateRecord[] | undefined | null
): Map<string, Record<string, string>> {
	const map = new Map<string, Record<string, string>>();
	if (!Array.isArray(entityUpdates)) return map;

	for (const rec of entityUpdates) {
		if (!rec || typeof rec.nameInDatabase !== "string" || typeof rec.fieldName !== "string") {
			continue;
		}
		let entry = map.get(rec.nameInDatabase);
		if (!entry) {
			entry = {};
			map.set(rec.nameInDatabase, entry);
		}
		entry[rec.fieldName] = String(rec.fieldValue ?? "");
	}

	return map;
}

/**
 * Normalizes turn string into an ordinal number for comparison.
 * Prologue = 0, Turn 1 = 1 ... Turn 10 = 10, Epilogue = 11.
 */
export function parseTurnNumber(turnStr?: string | null): number | null {
	if (!turnStr) return null;
	const lower = turnStr.toLowerCase();
	if (lower.includes("prologue")) return 0;
	if (lower.includes("epilogue")) return 11;
	const match = /turn\s*(\d+)/i.exec(lower);
	if (match) return parseInt(match[1], 10);
	return null;
}

/**
 * Evaluates whether a specific achievement is completed, missed, or in-progress
 * based on the user's active save variables and current turn.
 */
export function evaluateSingleAchievement(
	achievementId: string,
	variablesMap: Map<string, string | number | boolean>,
	currentTurnNo: number,
	currentStoryPack: string,
	entityUpdatesMap?: Map<string, Record<string, string>>
): AchievementAuditDetail {
	const wt = achievementAuditMeta[achievementId];
	const ach = steamAchievementById.get(achievementId);
	const targetTurn = wt ? parseTurnNumber(wt.turn) : null;
	const storyPack = typeof currentStoryPack === "string" ? currentStoryPack : "";
	const isRiziaCampaign = storyPack.toLowerCase().includes("rizia");

	// Campaign mismatch check
	const achGame = wt?.game || "Sordland";
	const hasBaseGameState =
		variablesMap.has("BaseGameSetup.CurrentTurn") ||
		variablesMap.has("BaseGameSetup.IsStoryPackCompleted") ||
		variablesMap.has("BaseGame.GovernmentBudget");
	if (isRiziaCampaign && achGame === "Sordland" && !hasBaseGameState) {
		return {
			status: "other_campaign",
			badgeLabel: "SORDLAND CAMPAIGN",
			badgeColor: "muted",
			reason: "This achievement belongs to the Sordland base game campaign.",
			turnInfo: wt?.turn,
		};
	} else if (!isRiziaCampaign && achGame === "Rizia") {
		return {
			status: "other_campaign",
			badgeLabel: "RIZIA CAMPAIGN",
			badgeColor: "muted",
			reason: "This achievement belongs to the Rizia DLC campaign.",
			turnInfo: wt?.turn,
		};
	}

	// Check enacted/completed entity updates if available
	if (entityUpdatesMap) {
		const entity = entityUpdatesMap.get(achievementId);
		if (
			entity &&
			(entity.IsDone === "true" || entity.IsEnacted === "true" || entity.IsFinished === "true")
		) {
			return {
				status: "completed",
				badgeLabel: "UNLOCKED IN SAVE",
				badgeColor: "success",
				reason: "Completed via enacted decree or journal entry in your save.",
				turnInfo: wt?.turn,
			};
		}
	}

	// 1. Direct Alliance Evaluations
	if (achievementId === "Game_AgnoliaAlliance") {
		const allied = variablesMap.get("BaseGame.Agnolia_Alliance") === true;
		if (allied) {
			return {
				status: "completed",
				badgeLabel: "UNLOCKED IN SAVE",
				badgeColor: "success",
				reason: "Agnolia military alliance is signed and active in save.",
				turnInfo: "Turn 5",
			};
		}
		if (currentTurnNo > 5) {
			return {
				status: "missed",
				badgeLabel: "MISSED IN RUN",
				badgeColor: "danger",
				reason: "Turn 5 trade summit passed without signing the alliance.",
				turnInfo: "Turn 5",
			};
		}
		return {
			status: "in_progress",
			badgeLabel: "ACHIEVABLE",
			badgeColor: "warning",
			reason: "Upcoming in Turn 5 Agnolia trade visit.",
			turnInfo: "Turn 5",
		};
	}

	if (achievementId === "Game_LespiaAlliance") {
		const allied = variablesMap.get("BaseGame.Lespia_Alliance") === true;
		if (allied) {
			return {
				status: "completed",
				badgeLabel: "UNLOCKED IN SAVE",
				badgeColor: "success",
				reason: "Lespia military alliance is signed and active in save.",
				turnInfo: "Turn 8",
			};
		}
		if (currentTurnNo > 8) {
			return {
				status: "missed",
				badgeLabel: "MISSED IN RUN",
				badgeColor: "danger",
				reason: "Turn 8 Lespia visit passed without signing the alliance.",
				turnInfo: "Turn 8",
			};
		}
		return {
			status: "in_progress",
			badgeLabel: "ACHIEVABLE",
			badgeColor: "warning",
			reason: "Upcoming in Turn 8 Lespia visit.",
			turnInfo: "Turn 8",
		};
	}

	if (achievementId === "Game_ValgslandAlliance") {
		const allied = variablesMap.get("BaseGame.Valgsland_Alliance") === true;
		if (allied) {
			return {
				status: "completed",
				badgeLabel: "UNLOCKED IN SAVE",
				badgeColor: "success",
				reason: "Valgsland military alliance is signed and active in save.",
				turnInfo: "Turn 8",
			};
		}
		if (currentTurnNo > 8) {
			return {
				status: "missed",
				badgeLabel: "MISSED IN RUN",
				badgeColor: "danger",
				reason: "Turn 8 Valgsland visit passed without signing the alliance.",
				turnInfo: "Turn 8",
			};
		}
		return {
			status: "in_progress",
			badgeLabel: "ACHIEVABLE",
			badgeColor: "warning",
			reason: "Upcoming in Turn 8 Valgsland visit.",
			turnInfo: "Turn 8",
		};
	}

	// 2. Collectible Items check
	if (achievementId.startsWith("Game_CollectionItem_")) {
		const itemName = achievementId.replace("Game_CollectionItem_", "");
		const sordlandKey = `BaseGameSupport.CollectionItem_${itemName}`;
		const riziaKey = `RiziaDLCSupport.CollectionItem_${itemName}`;

		const isCollected =
			variablesMap.get(sordlandKey) === true || variablesMap.get(riziaKey) === true;

		if (isCollected) {
			return {
				status: "completed",
				badgeLabel: "COLLECTED",
				badgeColor: "success",
				reason: "This collectible item has been acquired in your save.",
				turnInfo: wt?.turn,
			};
		}
		if (targetTurn !== null && currentTurnNo > targetTurn) {
			return {
				status: "missed",
				badgeLabel: "MISSED IN RUN",
				badgeColor: "danger",
				reason: `Missed in ${wt?.turn || "earlier turn"}: item was not picked up.`,
				turnInfo: wt?.turn,
			};
		}
		return {
			status: "in_progress",
			badgeLabel: "ACHIEVABLE",
			badgeColor: "warning",
			reason: `Available for collection in ${wt?.turn || "current campaign"}.`,
			turnInfo: wt?.turn,
		};
	}

	// 3. Prologue and Story Chapter Completions
	if (achievementId === "Prologue_Finish") {
		const done =
			variablesMap.get("BaseGameSetup.IsPrologueCompleted") === true ||
			variablesMap.get("RiziaDLCSetup.IsPrologueCompleted") === true;
		return done
			? {
					status: "completed",
					badgeLabel: "COMPLETED",
					badgeColor: "success",
					reason: "Prologue was completed in this save.",
					turnInfo: "Prologue",
				}
			: {
					status: "in_progress",
					badgeLabel: "IN PROGRESS",
					badgeColor: "warning",
					reason: "Currently in prologue.",
					turnInfo: "Prologue",
				};
	}

	if (achievementId === "Chapter1_Finish") {
		return currentTurnNo >= 4
			? {
					status: "completed",
					badgeLabel: "COMPLETED",
					badgeColor: "success",
					reason: "Chapter I completed (passed Turn 3).",
					turnInfo: "Turn 3",
				}
			: {
					status: "in_progress",
					badgeLabel: "IN PROGRESS",
					badgeColor: "warning",
					reason: "Reach end of Turn 3.",
					turnInfo: "Turn 3",
				};
	}

	if (achievementId === "Chapter2_Finish") {
		return currentTurnNo >= 8
			? {
					status: "completed",
					badgeLabel: "COMPLETED",
					badgeColor: "success",
					reason: "Chapter II completed (passed Turn 7).",
					turnInfo: "Turn 7",
				}
			: {
					status: "in_progress",
					badgeLabel: "IN PROGRESS",
					badgeColor: "warning",
					reason: "Reach end of Turn 7.",
					turnInfo: "Turn 7",
				};
	}

	if (achievementId === "Chapter3_Finish") {
		return currentTurnNo >= 9
			? {
					status: "completed",
					badgeLabel: "COMPLETED",
					badgeColor: "success",
					reason: "Chapter III completed (passed Turn 8).",
					turnInfo: "Turn 8",
				}
			: {
					status: "in_progress",
					badgeLabel: "IN PROGRESS",
					badgeColor: "warning",
					reason: "Reach end of Turn 8.",
					turnInfo: "Turn 8",
				};
	}

	if (achievementId === "Chapter4_Finish") {
		const storyDone =
			variablesMap.get("BaseGameSetup.IsStoryPackCompleted") === true ||
			variablesMap.get("RiziaDLCSetup.IsStoryPackCompleted") === true;
		return currentTurnNo >= 11 || storyDone
			? {
					status: "completed",
					badgeLabel: "COMPLETED",
					badgeColor: "success",
					reason: "Main story campaign completed.",
					turnInfo: "Turn 11",
				}
			: {
					status: "in_progress",
					badgeLabel: "IN PROGRESS",
					badgeColor: "warning",
					reason: "Complete final turn and epilogue.",
					turnInfo: "Turn 11",
				};
	}

	// 4. In-Scene and Scene-Condition Check
	if (wt?.sceneFile) {
		const sceneBase = wt.sceneFile.replace(/^Sordland_/, "").replace(/\.md$/, "");
		const condKey = `GameCondition.${sceneBase}`;
		const sceneVisited = variablesMap.get(condKey) === true;

		// If scene was visited and it's a direct in_scene trigger achievement
		if (sceneVisited && ach?.triggerType === "in_scene") {
			return {
				status: "completed",
				badgeLabel: "UNLOCKED IN SAVE",
				badgeColor: "success",
				reason: "This scene has already occurred in your save.",
				turnInfo: wt.turn,
			};
		}

		if (targetTurn !== null && currentTurnNo > targetTurn) {
			if (!sceneVisited) {
				return {
					status: "missed",
					badgeLabel: "MISSED IN RUN",
					badgeColor: "danger",
					reason: `The required scene in ${wt.turn || "an earlier turn"} was not visited.`,
					turnInfo: wt.turn,
				};
			}
		}
	}

	// 5. Default Timeline Turn Evaluation
	if (targetTurn !== null) {
		if (currentTurnNo > targetTurn) {
			return {
				status: "missed",
				badgeLabel: "MISSED IN RUN",
				badgeColor: "danger",
				reason: `The Turn ${targetTurn} decision window has passed (your save is on Turn ${currentTurnNo}).`,
				turnInfo: wt?.turn,
			};
		}
		return {
			status: "in_progress",
			badgeLabel: "ACHIEVABLE",
			badgeColor: "warning",
			reason: `Scheduled for ${wt?.turn || "future turn"}.`,
			turnInfo: wt?.turn,
		};
	}

	return {
		status: "in_progress",
		badgeLabel: "IN PROGRESS",
		badgeColor: "warning",
		reason: "Progress depends on upcoming choices in this run.",
		turnInfo: wt?.turn,
	};
}

/**
 * Evaluates all 220 achievements against the given variable map and returns an indexed lookup.
 */
export function auditAllAchievements(
	variablesMap: Map<string, string | number | boolean>,
	currentTurnNo: number,
	currentStoryPack: string,
	campaignName: string,
	entityUpdatesMap?: Map<string, Record<string, string>>
): {
	results: Map<string, AchievementAuditDetail>;
	summary: SaveAuditSummary;
} {
	const results = new Map<string, AchievementAuditDetail>();
	let completedCount = 0;
	let inProgressCount = 0;
	let missedCount = 0;
	let otherCampaignCount = 0;

	for (const ach of steamAchievements) {
		const detail = evaluateSingleAchievement(
			ach.id,
			variablesMap,
			currentTurnNo,
			currentStoryPack,
			entityUpdatesMap
		);
		results.set(ach.id, detail);

		if (detail.status === "completed") completedCount++;
		else if (detail.status === "in_progress") inProgressCount++;
		else if (detail.status === "missed") missedCount++;
		else if (detail.status === "other_campaign") otherCampaignCount++;
	}

	const summary: SaveAuditSummary = {
		campaignName,
		storyPack: currentStoryPack,
		turnNo: currentTurnNo,
		total: steamAchievements.length,
		completedCount,
		inProgressCount,
		missedCount,
		otherCampaignCount,
	};

	return { results, summary };
}
