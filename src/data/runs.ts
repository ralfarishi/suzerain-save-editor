// Achievement-first run data for the Planner recommendation engine.
// Unified directly with communityPathways (Single Source of Truth).
// Derived 100% from Torpor Games engine archives and in-scene dialogue scripts.

import { communityPathways } from "./pathways";

export type RunTag =
  | "Sordland"
  | "Rizia"
  | "Authoritarian"
  | "Reformist"
  | "Diplomatic"
  | "Economy"
  | "Military"
  | "Special";

export interface Run {
  id: string;
  title: string;
  subtitle: string;
  game: "Sordland" | "Rizia" | "Both";
  tags: RunTag[];
  description: string;
  /** Links to a Pathway ID for "View Walkthrough" CTA */
  pathwayId?: string;
  /** All achievement names obtainable in one playthrough of this run */
  achievements: string[];
  /**
   * Binary exclusive pairs WITHIN this run.
   * User can obtain one OR the other per playthrough, not both.
   */
  exclusivePairs: [string, string][];
  /**
   * Groups of achievements where only ONE can be obtained per playthrough.
   * e.g., all Sordland endings, all ideology archetypes, all Rizia legacy titles.
   */
  exclusiveGroups: string[][];
  /**
   * Pairs of achievements exclusive with achievements in ANOTHER run.
   */
  crossRunExclusivePairs?: [string, string][];
  sourceVersion: string;
  isVerifiedLatest: boolean;
}

export const runs: Run[] = communityPathways.map((pathway) => ({
  id: pathway.id,
  title: pathway.title,
  subtitle: pathway.subtitle,
  game: pathway.game,
  tags: pathway.tags.filter((t): t is RunTag => t !== "Both"),
  description: pathway.description,
  pathwayId: pathway.id,
  achievements: pathway.achievements,
  exclusivePairs: pathway.exclusivePairs || [],
  exclusiveGroups: pathway.exclusiveGroups || [],
  crossRunExclusivePairs: pathway.crossRunExclusivePairs || [],
  sourceVersion: pathway.sourceVersion || "3.1.0",
  isVerifiedLatest: pathway.isVerifiedLatest ?? true,
}));

// ─── Achievement → Run index (built at module load) ──────────────────────────

export const achievementRunIndex = new Map<string, Run[]>();

for (const run of runs) {
  for (const ach of run.achievements) {
    const existing = achievementRunIndex.get(ach) ?? [];
    if (!existing.includes(run)) {
      existing.push(run);
      achievementRunIndex.set(ach, existing);
    }
  }
}

export const UNASSIGNABLE_ACHIEVEMENTS = new Set<string>();
