import { useMemo, useState } from "react";
import { RecommendationResult } from "../../utils/recommendation";
import { RunGroupCard } from "./RunGroupCard";
import {
  TrophyIcon,
  RepeatIcon,
  QuestionMarkIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react";

interface PlannerResultProps {
  result: RecommendationResult;
  totalSelected: number;
}

export function PlannerResult({ result, totalSelected }: PlannerResultProps) {
  const { groups, uncoverable, totalRuns, crossRunConflicts } = result;

  const [activeRunTab, setActiveRunTab] = useState<number | "all">("all");
  const [forceExpandState, setForceExpandState] = useState<boolean | undefined>(
    undefined
  );
  const [expandKey, setExpandKey] = useState(0);

  const coverableCount = totalSelected - uncoverable.length;

  const summaryColor = useMemo(() => {
    if (totalRuns === 1) return "text-emerald-500 dark:text-emerald-400";
    if (totalRuns === 2) return "text-amber-500 dark:text-amber-400";
    return "text-orange-400";
  }, [totalRuns]);

  const visibleGroups = useMemo(() => {
    if (activeRunTab === "all") return groups;
    if (typeof activeRunTab === "number" && groups[activeRunTab]) {
      return [groups[activeRunTab]];
    }
    return groups;
  }, [groups, activeRunTab]);

  return (
    <div className="space-y-6">
      {/* Summary Banner */}
      <div className="border-2 border-slate-300 dark:border-white/15 bg-amber-50/80 dark:bg-black/30 p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.08)]">
        <div className="flex flex-wrap gap-6 items-center justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
              Minimum Playthroughs Required
            </p>
            <p className={`text-5xl font-serif font-black ${summaryColor}`}>
              {totalRuns}
              <span className="text-xl text-slate-500 dark:text-slate-400 ml-2 font-normal">
                {totalRuns === 1 ? "run" : "runs"}
              </span>
            </p>
          </div>
          <div className="flex gap-6 text-center">
            <div>
              <p className="text-2xl font-serif font-black text-slate-900 dark:text-white">
                {coverableCount}
              </p>
              <p className="text-[10px] uppercase font-bold tracking-widest text-slate-500">
                Mapped
              </p>
            </div>
            {uncoverable.length > 0 && (
              <div>
                <p className="text-2xl font-serif font-black text-amber-500">
                  {uncoverable.length}
                </p>
                <p className="text-[10px] uppercase font-bold tracking-widest text-slate-500">
                  Need Attention
                </p>
              </div>
            )}
            {/* Count total intra-run conflicts across all groups */}
            {groups.some((g) => g.intraRunConflicts.length > 0) && (
              <div>
                <p className="text-2xl font-serif font-black text-amber-400">
                  {groups.reduce((sum, g) => sum + g.intraRunConflicts.length, 0)}
                </p>
                <p className="text-[10px] uppercase font-bold tracking-widest text-slate-500">
                  Conflicts
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cross-run conflict warning — shown when two selected achievements are
          exclusive in a single playthrough but split across different runs */}
      {crossRunConflicts.length > 0 && (
        <div className="border-2 border-red-400/60 dark:border-red-500/40 bg-red-50/70 dark:bg-red-950/20 p-5">
          <div className="flex items-start gap-3 mb-4">
            <WarningCircleIcon
              weight="fill"
              className="w-5 h-5 text-red-500 shrink-0 mt-0.5"
            />
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-red-700 dark:text-red-400 mb-1">
                Cross-Run Conflict{crossRunConflicts.length !== 1 ? "s" : ""} Detected ({crossRunConflicts.length})
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                These achievement pairs cannot be obtained in the same playthrough.
                Both are achievable — you will need separate playthroughs of the same campaign.
              </p>
            </div>
          </div>
          <div className="space-y-3">
            {crossRunConflicts.map((conflict, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-black/20 border border-red-200 dark:border-red-900/50 p-3"
              >
                <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono mb-2">
                  <span className="px-2 py-0.5 bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-300 font-bold">
                    {conflict.achievementA}
                  </span>
                  <span className="text-slate-400 shrink-0 font-sans">vs</span>
                  <span className="px-2 py-0.5 bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-300 font-bold">
                    {conflict.achievementB}
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">
                  {conflict.reason}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Run Groups */}
      {groups.length > 0 && (
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <RepeatIcon className="w-5 h-5 text-brass" />
              <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white uppercase tracking-widest">
                Playthrough Plan
              </h3>
            </div>

            {/* Expand / Collapse All Toggle */}
            {groups.length > 1 && activeRunTab === "all" && (
              <button
                type="button"
                onClick={() => {
                  setForceExpandState((prev) =>
                    prev === false ? true : false
                  );
                  setExpandKey((k) => k + 1);
                }}
                className="text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-brass transition-colors cursor-pointer active:scale-95"
              >
                {forceExpandState === false ? "Expand All Runs" : "Collapse All Runs"}
              </button>
            )}
          </div>

          {/* Segmented Run Tabs for multi-run results */}
          {groups.length > 1 && (
            <div className="flex flex-wrap gap-1.5 mb-5 p-1 bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/10">
              <button
                type="button"
                onClick={() => {
                  setActiveRunTab("all");
                  setForceExpandState(undefined);
                }}
                className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-widest border transition-all cursor-pointer active:scale-95 ${
                  activeRunTab === "all"
                    ? "bg-brass text-slate-900 border-brass-light shadow-[0_2px_0_0_#684b06]"
                    : "bg-transparent text-slate-600 dark:text-slate-400 border-transparent hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                All Runs ({groups.length})
              </button>
              {groups.map((group, idx) => (
                <button
                  key={group.run.id}
                  type="button"
                  onClick={() => {
                    setActiveRunTab(idx);
                    setForceExpandState(true);
                  }}
                  className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-widest border transition-all cursor-pointer active:scale-95 ${
                    activeRunTab === idx
                      ? "bg-brass text-slate-900 border-brass-light shadow-[0_2px_0_0_#684b06]"
                      : "bg-transparent text-slate-600 dark:text-slate-400 border-transparent hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  Run {idx + 1} ({group.targetAchievements.length})
                </button>
              ))}
            </div>
          )}

          <div className="space-y-6">
            {visibleGroups.map((group) => {
              const actualIdx = groups.indexOf(group);
              const isDefaultExpanded =
                forceExpandState !== undefined
                  ? forceExpandState
                  : groups.length <= 2 || actualIdx === 0;

              return (
                <div
                  key={`${group.run.id}-${expandKey}`}
                  style={{ animationDelay: `${actualIdx * 80}ms` }}
                  className="animate-card-stagger"
                >
                  <RunGroupCard
                    group={group}
                    runIndex={actualIdx}
                    defaultExpanded={isDefaultExpanded}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Uncoverable achievements */}
      {uncoverable.length > 0 && (
        <div className="border-2 border-amber-400/50 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-950/15 p-5">
          <div className="flex items-start gap-3 mb-4">
            <QuestionMarkIcon
              weight="bold"
              className="w-5 h-5 text-amber-500 shrink-0 mt-0.5"
            />
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-amber-700 dark:text-amber-400 mb-1">
                No Matching Run Found ({uncoverable.length})
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                These are RNG-based or have very specific conditions. Check the{" "}
                <a
                  href="https://steamcommunity.com/sharedfiles/filedetails/?id=3670692943"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-warm-accent hover:underline"
                >
                  official Steam guide
                </a>{" "}
                for exact conditions.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {uncoverable.map((name) => (
              <span
                key={name}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-black/20 border border-amber-300 dark:border-amber-800/50 text-xs font-mono text-amber-800 dark:text-amber-300"
              >
                <TrophyIcon className="w-3 h-3 shrink-0" />
                {name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
