import { useState, useMemo } from "react";
import { RunGroup } from "../../utils/recommendation";
import { steamAchievements } from "../../data/steam_achievements";
import { ConflictAlert } from "./ConflictAlert";
import {
  TrophyIcon,
  CaretDownIcon,
  ArrowSquareOutIcon,
  CheckCircleIcon,
  SparkleIcon,
} from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";

const RUN_TAG_STYLES: Record<string, { bg: string; border: string; text: string }> = {
  Sordland: {
    bg: "bg-blue-100 dark:bg-blue-950/60",
    border: "border-blue-300 dark:border-blue-500/40",
    text: "text-blue-900 dark:text-blue-300",
  },
  Rizia: {
    bg: "bg-purple-100 dark:bg-purple-950/60",
    border: "border-purple-300 dark:border-purple-500/40",
    text: "text-purple-900 dark:text-purple-300",
  },
  Authoritarian: {
    bg: "bg-red-100 dark:bg-red-950/60",
    border: "border-red-300 dark:border-red-500/40",
    text: "text-red-900 dark:text-red-300",
  },
  Reformist: {
    bg: "bg-emerald-100 dark:bg-emerald-950/60",
    border: "border-emerald-300 dark:border-emerald-500/40",
    text: "text-emerald-900 dark:text-emerald-300",
  },
  Diplomatic: {
    bg: "bg-sky-100 dark:bg-sky-950/60",
    border: "border-sky-300 dark:border-sky-500/40",
    text: "text-sky-900 dark:text-sky-300",
  },
  Economy: {
    bg: "bg-amber-100 dark:bg-amber-950/60",
    border: "border-amber-300 dark:border-amber-500/40",
    text: "text-amber-900 dark:text-amber-300",
  },
  Military: {
    bg: "bg-orange-100 dark:bg-orange-950/60",
    border: "border-orange-300 dark:border-orange-500/40",
    text: "text-orange-900 dark:text-orange-300",
  },
  Special: {
    bg: "bg-amber-200/70 dark:bg-brass/30",
    border: "border-amber-400 dark:border-brass",
    text: "text-amber-950 dark:text-brass-light",
  },
};

interface RunGroupCardProps {
  group: RunGroup;
  runIndex: number;
  defaultExpanded?: boolean;
}

export function RunGroupCard({
  group,
  runIndex,
  defaultExpanded = true,
}: RunGroupCardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [showBonus, setShowBonus] = useState(false);
  const { run, targetAchievements, bonusAchievements, intraRunConflicts } = group;

  const achievementMap = useMemo(() => {
    return new Map(steamAchievements.map((a) => [a.name, a]));
  }, []);

  return (
    <div className="border-2 border-slate-300 dark:border-white/15 bg-amber-50/50 dark:bg-black/20 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.08)] relative overflow-hidden bg-noise transition-all duration-300">
      {/* Run number watermark */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-[0.03] dark:opacity-[0.06] pointer-events-none font-serif font-black text-[120px] leading-none select-none">
        {runIndex + 1}
      </div>

      <div className="relative z-10 p-5 sm:p-6">
        {/* Header - Clickable for Accordion Expand/Collapse */}
        <div className="flex items-start justify-between gap-4">
          <button
            type="button"
            onClick={() => setIsExpanded((v) => !v)}
            className="flex items-start gap-4 flex-1 text-left cursor-pointer group/hdr"
          >
            <div className="w-10 h-10 shrink-0 rounded-full border-2 border-brass bg-brass/20 flex items-center justify-center font-serif font-black text-brass text-lg group-hover/hdr:scale-105 transition-transform">
              {runIndex + 1}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                {run.tags.map((tag) => {
                  const style = RUN_TAG_STYLES[tag] ?? {
                    bg: "bg-slate-800/40",
                    border: "border-slate-500/40",
                    text: "text-slate-300",
                  };
                  return (
                    <span
                      key={tag}
                      className={`inline-flex items-center px-2 py-0.5 text-[9px] font-serif font-black uppercase tracking-widest border rounded-md ${style.bg} ${style.border} ${style.text}`}
                    >
                      {tag}
                    </span>
                  );
                })}
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider bg-brass/10 border border-brass/30 text-brass">
                  <CheckCircleIcon weight="fill" className="w-3 h-3 text-emerald-500" />
                  {targetAchievements.length} targets
                </span>
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-tight group-hover/hdr:text-brass transition-colors">
                {run.title}
              </h3>
              <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                {run.subtitle}
              </p>
            </div>
          </button>

          <div className="flex items-center gap-2 shrink-0">
            {/* View walkthrough link */}
            {run.pathwayId && (
              <Link
                to="/achievements"
                search={{ pathway: run.pathwayId }}
                className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest border-2 border-brass/50 text-brass hover:bg-brass hover:text-slate-900 transition-all cursor-pointer active:scale-95"
              >
                <ArrowSquareOutIcon className="w-3.5 h-3.5" />
                Guide
              </Link>
            )}

            {/* Direct Save Editor Preset CTA */}
            <Link
              to="/"
              className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest border-2 border-slate-300 dark:border-white/20 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-all cursor-pointer active:scale-95"
              title="Open Save Editor to configure save state"
            >
              <SparkleIcon weight="fill" className="w-3.5 h-3.5 text-amber-500" />
              Editor
            </Link>

            {/* Expand / Collapse toggle button */}
            <button
              type="button"
              onClick={() => setIsExpanded((v) => !v)}
              className="p-1.5 text-slate-400 hover:text-brass transition-colors cursor-pointer"
              title={isExpanded ? "Collapse Run Details" : "Expand Run Details"}
            >
              <CaretDownIcon
                className={`w-5 h-5 transition-transform duration-300 ${
                  isExpanded ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Collapsible Content Section */}
        {isExpanded && (
          <div className="mt-5 pt-4 border-t border-slate-200 dark:border-white/10 animate-fade-in">
            {/* Intra-run conflicts */}
            {intraRunConflicts.length > 0 && (
              <div className="mb-4">
                <ConflictAlert conflicts={intraRunConflicts} variant="intra" />
              </div>
            )}

            {/* Target achievements */}
            <div className="mb-5">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
                <CheckCircleIcon weight="fill" className="w-3.5 h-3.5 text-emerald-500" />
                Your targets this playthrough ({targetAchievements.length})
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {targetAchievements.map((name) => {
                  const ach = achievementMap.get(name);
                  return (
                    <div
                      key={name}
                      className="flex items-center gap-3 p-3 bg-white dark:bg-warm-surface-dark border border-slate-200 dark:border-white/10 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.04)]"
                    >
                      <div className="w-9 h-9 shrink-0 rounded-full border-2 border-double border-brass bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center overflow-hidden">
                        {ach ? (
                          <img
                            src={ach.icon}
                            alt={name}
                            className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal opacity-90"
                          />
                        ) : (
                          <TrophyIcon className="w-4 h-4 text-brass" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-900 dark:text-white leading-snug line-clamp-2">
                          {name}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bonus achievements */}
            {bonusAchievements.length > 0 && (
              <div className="border-t border-dashed border-slate-200 dark:border-white/10 pt-4">
                <button
                  type="button"
                  onClick={() => setShowBonus((v) => !v)}
                  className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-brass transition-colors w-full cursor-pointer mb-3"
                >
                  <SparkleIcon weight="fill" className="w-3.5 h-3.5 text-brass/60" />
                  Bonus grabs in this run ({bonusAchievements.length})
                  <CaretDownIcon
                    className={`w-3.5 h-3.5 ml-auto transition-transform ${showBonus ? "rotate-180" : ""}`}
                  />
                </button>
                {showBonus && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 animate-in fade-in duration-200">
                    {bonusAchievements.map((name) => {
                      const ach = achievementMap.get(name);
                      return (
                        <div
                          key={name}
                          className="flex items-center gap-3 p-2.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10"
                        >
                          <div className="w-7 h-7 shrink-0 rounded-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-black/20 flex items-center justify-center overflow-hidden">
                            {ach ? (
                              <img
                                src={ach.icon}
                                alt={name}
                                className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal opacity-80"
                              />
                            ) : (
                              <TrophyIcon className="w-3 h-3 text-slate-400" />
                            )}
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-400 leading-snug line-clamp-2">
                            {name}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
