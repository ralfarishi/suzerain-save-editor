// Pure recommendation algorithm — no UI dependencies.
// Uses exact minimum set cover (bitmask enumeration) over ≤6 runs.
// Instantaneous at runtime; worst case is 2^6 = 64 subset evaluations.

import { Run, runs, achievementRunIndex } from "../data/runs";

export interface ConflictPair {
  achievementA: string;
  achievementB: string;
  reason: string;
}

/**
 * A conflict between two achievements that belong to DIFFERENT runs.
 * Both can still be obtained — but they require separate playthroughs
 * of the same campaign segment.
 */
export interface CrossRunConflict {
  runAId: string;
  runBId: string;
  runATitle: string;
  runBTitle: string;
  achievementA: string;
  achievementB: string;
  reason: string;
}

export interface RunGroup {
  run: Run;
  /** Selected achievements this run can cover */
  targetAchievements: string[];
  /** Top unselected achievements in this run worth grabbing (bonus) */
  bonusAchievements: string[];
  /** Selected achievements that conflict WITHIN this single run */
  intraRunConflicts: ConflictPair[];
}

export interface RecommendationResult {
  groups: RunGroup[];
  /** Achievements with no run assignment at all (RNG / unmapped) */
  uncoverable: string[];
  totalRuns: number;
  /** Pairs of achievements exclusive across run boundaries (same game, different playthroughs) */
  crossRunConflicts: CrossRunConflict[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function buildCoverageMap(
  selected: string[]
): Map<string, Run[]> {
  const map = new Map<string, Run[]>();
  for (const name of selected) {
    const matchingRuns = achievementRunIndex.get(name);
    if (matchingRuns && matchingRuns.length > 0) {
      map.set(name, matchingRuns);
    }
  }
  return map;
}

function runCoversAll(run: Run, achievements: string[]): boolean {
  const set = new Set(run.achievements);
  return achievements.every((a) => set.has(a));
}

/**
 * Exact minimum set cover via bitmask enumeration.
 * With ≤6 runs this is at most 2^6 = 64 iterations.
 */
function findMinimumCover(
  coverable: string[],
  candidateRuns: Run[]
): Run[] {
  if (coverable.length === 0) return [];

  const n = candidateRuns.length;
  let bestMask = -1;
  let bestCount = n + 1;

  for (let mask = 1; mask < 1 << n; mask++) {
    const subset: Run[] = [];
    for (let i = 0; i < n; i++) {
      if (mask & (1 << i)) subset.push(candidateRuns[i]);
    }
    const subsetCount = subset.length;
    if (subsetCount >= bestCount) continue;

    // Check if this subset covers all coverable achievements
    const covered = new Set<string>();
    for (const run of subset) {
      for (const ach of run.achievements) {
        covered.add(ach);
      }
    }
    if (coverable.every((a) => covered.has(a))) {
      bestMask = mask;
      bestCount = subsetCount;
    }
  }

  if (bestMask === -1) return candidateRuns; // fallback: all runs
  return candidateRuns.filter((_, i) => bestMask & (1 << i));
}

/**
 * Detects conflicts between achievements that belong to different chosen runs.
 * These are achievements that are exclusive in a single playthrough, so a player
 * must replay the relevant campaign segment — but both CAN be obtained eventually.
 */
function detectCrossRunConflicts(
  chosenRuns: Run[],
  selectedSet: Set<string>
): CrossRunConflict[] {
  const conflicts: CrossRunConflict[] = [];
  const seen = new Set<string>();

  for (let i = 0; i < chosenRuns.length; i++) {
    const runA = chosenRuns[i];
    if (!runA.crossRunExclusivePairs || runA.crossRunExclusivePairs.length === 0) continue;

    const runASet = new Set(runA.achievements);

    for (let j = 0; j < chosenRuns.length; j++) {
      if (i === j) continue;
      const runB = chosenRuns[j];
      const runBSet = new Set(runB.achievements);

      for (const [achA, achB] of runA.crossRunExclusivePairs) {
        // Only flag if the user actually selected BOTH conflicting achievements
        if (!selectedSet.has(achA) || !selectedSet.has(achB)) continue;
        // Confirm ownership: achA in runA, achB in runB
        if (!runASet.has(achA) || !runBSet.has(achB)) continue;

        // Deduplicate symmetric pairs (A-B and B-A produce the same conflict)
        const key = [achA, achB].sort().join("|");
        if (seen.has(key)) continue;
        seen.add(key);

        conflicts.push({
          runAId: runA.id,
          runBId: runB.id,
          runATitle: runA.title,
          runBTitle: runB.title,
          achievementA: achA,
          achievementB: achB,
          reason:
            `Requires separate playthroughs — both are obtainable, but not in the same run.`,
        });
      }
    }
  }

  return conflicts;
}

function detectIntraRunConflicts(
  run: Run,
  targetAchievements: string[]
): ConflictPair[] {
  const conflicts: ConflictPair[] = [];
  const targetSet = new Set(targetAchievements);

  // Check binary exclusive pairs
  for (const [a, b] of run.exclusivePairs) {
    if (targetSet.has(a) && targetSet.has(b)) {
      conflicts.push({
        achievementA: a,
        achievementB: b,
        reason: "Mutually exclusive choices in a single playthrough",
      });
    }
  }

  // Check exclusive groups (only 1 can be achieved per run)
  for (const group of run.exclusiveGroups) {
    const inGroup = group.filter((a) => targetSet.has(a));
    if (inGroup.length > 1) {
      for (let i = 0; i < inGroup.length - 1; i++) {
        for (let j = i + 1; j < inGroup.length; j++) {
          // Avoid duplicates already caught by pairs
          const alreadyCaught = conflicts.some(
            (c) =>
              (c.achievementA === inGroup[i] && c.achievementB === inGroup[j]) ||
              (c.achievementA === inGroup[j] && c.achievementB === inGroup[i])
          );
          if (!alreadyCaught) {
            conflicts.push({
              achievementA: inGroup[i],
              achievementB: inGroup[j],
              reason: "Only one can be achieved per playthrough in this run",
            });
          }
        }
      }
    }
  }

  return conflicts;
}

const BONUS_CAP = 5;

function getBonusAchievements(
  run: Run,
  targetAchievements: string[],
  allSelected: string[]
): string[] {
  const targetSet = new Set(targetAchievements);
  const selectedSet = new Set(allSelected);

  // Filter: in this run, not selected, not a progression chapter, not a collectible
  const candidates = run.achievements.filter(
    (a) =>
      !selectedSet.has(a) &&
      !a.startsWith("Collectible:") &&
      !a.startsWith("Chapter") &&
      !a.startsWith("Prologue") &&
      !a.startsWith("Rizia Prologue") &&
      !targetSet.has(a)
  );

  return candidates.slice(0, BONUS_CAP);
}

// ─── Main Entry Point ────────────────────────────────────────────────────────

export function computeRecommendation(
  selectedNames: string[]
): RecommendationResult {
  if (selectedNames.length === 0) {
    return {
      groups: [],
      uncoverable: [],
      totalRuns: 0,
    };
  }

  // 1. Build coverage map and split coverable / uncoverable
  const coverageMap = buildCoverageMap(selectedNames);
  const uncoverable = selectedNames.filter((a) => !coverageMap.has(a));
  const coverable = selectedNames.filter((a) => coverageMap.has(a));

  // 2. Find minimum set cover
  const chosenRuns = findMinimumCover(coverable, runs);

  // 3. Assign achievements to runs greedily (primary run first)
  const assignedTo = new Map<string, Run>();

  for (const run of chosenRuns) {
    const runSet = new Set(run.achievements);
    for (const ach of coverable) {
      if (runSet.has(ach) && !assignedTo.has(ach)) {
        assignedTo.set(ach, run);
      }
    }
  }

  const selectedSet = new Set(selectedNames);

  // 5. Build run groups
  const groups: RunGroup[] = chosenRuns.map((run) => {
    const runSet = new Set(run.achievements);
    // Only include achievements whose primary owner is this run (deduplication fix:
    // shared achievements like progression chapters now appear in exactly one card).
    const targetAchievements = coverable.filter(
      (a) => assignedTo.get(a) === run && runSet.has(a)
    );

    const intraRunConflicts = detectIntraRunConflicts(run, targetAchievements);
    const bonusAchievements = getBonusAchievements(
      run,
      targetAchievements,
      selectedNames
    );

    return {
      run,
      targetAchievements,
      bonusAchievements,
      intraRunConflicts,
    };
  });

  // Sort: most target achievements first
  groups.sort((a, b) => b.targetAchievements.length - a.targetAchievements.length);

  // 6. Detect cross-run conflicts (achievements exclusive in one playthrough but spread across runs)
  const crossRunConflicts = detectCrossRunConflicts(chosenRuns, selectedSet);

  return {
    groups,
    uncoverable,
    totalRuns: chosenRuns.length,
    crossRunConflicts,
  };
}

// ─── URL State Codec ─────────────────────────────────────────────────────────
// Encodes/decodes selected achievement names as compact URL params.

export function encodeSelectionToUrl(selected: string[]): string {
  return selected.map((s) => encodeURIComponent(s)).join(",");
}

export function decodeSelectionFromUrl(raw: string): string[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((s) => decodeURIComponent(s))
    .filter(Boolean);
}

// ─── LocalStorage persistence ────────────────────────────────────────────────

const STORAGE_KEY = "planner_selected_achievements";

export function loadSelectionFromStorage(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((v) => typeof v === "string");
  } catch {
    return [];
  }
}

export function saveSelectionToStorage(selected: string[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selected));
  } catch {
    // Storage unavailable — silent fail
  }
}
