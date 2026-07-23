import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { steamAchievements } from "../../data/steam_achievements";
import { runs } from "../../data/runs";
import {
  MagnifyingGlassIcon,
  XIcon,
  CheckSquareIcon,
  SquareIcon,
  TrophyIcon,
  FunnelIcon,
} from "@phosphor-icons/react";

type GameFilter = "All" | "Sordland" | "Rizia";
type CategoryFilter = "All" | "Collectibles" | "Chapters" | "Endings & Ideology";

const ENDING_KEYWORDS = [
  "Chapter IV",
  "Impeached",
  "Coup",
  "Assassinated",
  "Exile",
  "Retirement",
  "Sollist",
  "Democrat",
  "Malenyevist",
  "Capitalist",
  "Authoritarian",
  "Pluralist",
  "Centrist",
  "Wruhec",
  "Unified",
  "War",
];

// Derived at module load — single source of truth from runs.ts.
// Sordland filter: achievements in any Sordland run.
// Rizia filter: achievements in any Rizia run.
// Cross-game achievements (game === "Both") appear in both filters.
const SORDLAND_NAMES = new Set<string>(
  runs
    .filter((r) => r.game === "Sordland" || r.game === "Both")
    .flatMap((r) => r.achievements)
);

const RIZIA_NAMES = new Set<string>(
  runs
    .filter((r) => r.game === "Rizia" || r.game === "Both")
    .flatMap((r) => r.achievements)
);

const PAGE_SIZE = 30;

interface AchievementPickerProps {
  selected: string[];
  onChange: (selected: string[]) => void;
}

export function AchievementPicker({ selected, onChange }: AchievementPickerProps) {
  const [query, setQuery] = useState("");
  const [gameFilter, setGameFilter] = useState<GameFilter>("All");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const selectedSet = useMemo(() => new Set(selected), [selected]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return steamAchievements.filter((ach) => {
      if (q && !ach.name.toLowerCase().includes(q)) return false;
      if (gameFilter === "Sordland" && !SORDLAND_NAMES.has(ach.name))
        return false;
      if (gameFilter === "Rizia" && !RIZIA_NAMES.has(ach.name))
        return false;

      if (categoryFilter === "Collectibles" && !ach.name.startsWith("Collectible:"))
        return false;
      if (
        categoryFilter === "Chapters" &&
        !(ach.name.startsWith("Chapter") || ach.name.startsWith("Prologue"))
      )
        return false;
      if (
        categoryFilter === "Endings & Ideology" &&
        !ENDING_KEYWORDS.some((kw) => ach.name.includes(kw))
      )
        return false;

      return true;
    });
  }, [query, gameFilter, categoryFilter]);

  const visible = useMemo(
    () => filtered.slice(0, visibleCount),
    [filtered, visibleCount]
  );

  // Infinite scroll observer
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((c) => Math.min(c + PAGE_SIZE, filtered.length));
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [filtered.length]);

  // Reset pagination on filter change
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [query, gameFilter, categoryFilter]);

  const toggle = useCallback(
    (name: string) => {
      if (selectedSet.has(name)) {
        onChange(selected.filter((s) => s !== name));
      } else {
        onChange([...selected, name]);
      }
    },
    [selected, selectedSet, onChange]
  );

  const clearAll = useCallback(() => onChange([]), [onChange]);

  return (
    <div className="space-y-4">
      {/* Selected chips */}
      {selected.length > 0 && (
        <div className="p-4 border-2 border-brass/30 bg-brass/5 dark:bg-brass/10 animate-fade-in">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-brass">
              Selected ({selected.length})
            </p>
            <button
              type="button"
              onClick={clearAll}
              className="text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-red-500 transition-colors cursor-pointer active:scale-95"
            >
              Clear all
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {selected.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => toggle(name)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-brass text-slate-900 text-[10px] font-bold uppercase tracking-wider hover:bg-red-500 hover:text-white transition-all cursor-pointer active:scale-95 animate-pop-spring"
              >
                {name}
                <XIcon className="w-2.5 h-2.5" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="space-y-2.5">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search achievements..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-warm-surface-dark border-2 border-slate-300 dark:border-white/15 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-brass transition-colors"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors cursor-pointer"
              >
                <XIcon className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Game filter */}
          <div className="flex items-center gap-1.5 shrink-0">
            <FunnelIcon className="w-4 h-4 text-slate-400 shrink-0" />
            {(["All", "Sordland", "Rizia"] as GameFilter[]).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setGameFilter(f)}
                className={`px-3 py-2 text-[10px] font-black uppercase tracking-widest border-2 transition-all cursor-pointer active:scale-95 ${
                  gameFilter === f
                    ? "bg-brass text-slate-900 border-brass-light shadow-[0_2px_0_0_#684b06]"
                    : "bg-white dark:bg-black/30 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-white/10 hover:border-brass/50"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Category filter pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mr-1">
            Category:
          </span>
          {(
            ["All", "Collectibles", "Chapters", "Endings & Ideology"] as CategoryFilter[]
          ).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoryFilter(cat)}
              className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider border transition-all cursor-pointer active:scale-95 ${
                categoryFilter === cat
                  ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white"
                  : "bg-slate-100 dark:bg-black/20 text-slate-500 dark:text-slate-400 border-slate-300 dark:border-white/10 hover:border-brass/40 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="text-xs text-slate-500 dark:text-slate-400">
        Showing {visible.length} of {filtered.length} achievements
        {query && ` matching "${query}"`}
      </p>

      {/* Achievement grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {visible.map((ach) => {
          const isSelected = selectedSet.has(ach.name);
          return (
            <button
              key={ach.name}
              type="button"
              onClick={() => toggle(ach.name)}
              className={`flex items-center gap-3 p-3 text-left border-2 transition-all cursor-pointer group active:scale-[0.98] ${
                isSelected
                  ? "border-brass bg-brass/10 dark:bg-brass/15 shadow-[2px_2px_0px_0px_rgba(184,134,11,0.3)]"
                  : "border-slate-200 dark:border-white/10 bg-white dark:bg-warm-surface-dark hover:border-brass/40 hover:bg-amber-50/50 dark:hover:bg-white/5"
              }`}
            >
              {/* Icon */}
              <div
                className={`w-10 h-10 shrink-0 rounded-full border-2 flex items-center justify-center overflow-hidden transition-colors ${
                  isSelected
                    ? "border-brass bg-amber-50 dark:bg-amber-900/20"
                    : "border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-black/20"
                }`}
              >
                <img
                  src={ach.icon}
                  alt={ach.name}
                  className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal"
                  loading="lazy"
                />
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p
                  className={`text-xs font-bold leading-snug line-clamp-2 transition-colors ${
                    isSelected
                      ? "text-slate-900 dark:text-white"
                      : "text-slate-700 dark:text-slate-300"
                  }`}
                >
                  {ach.name}
                </p>
                {ach.description && (
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 line-clamp-1">
                    {ach.description}
                  </p>
                )}
              </div>

              {/* Checkbox */}
              <div className="shrink-0">
                {isSelected ? (
                  <CheckSquareIcon
                    weight="fill"
                    className="w-5 h-5 text-brass animate-pop-spring"
                  />
                ) : (
                  <SquareIcon className="w-5 h-5 text-slate-300 dark:text-slate-600 group-hover:text-brass/50 transition-colors" />
                )}
              </div>
            </button>
          );
        })}

        {filtered.length === 0 && (
          <div className="col-span-full py-16 text-center text-slate-400 font-serif italic">
            <TrophyIcon className="w-10 h-10 mx-auto mb-3 opacity-30" />
            No achievements found
          </div>
        )}
      </div>

      {/* Infinite scroll sentinel */}
      <div ref={sentinelRef} className="h-4" />
    </div>
  );
}
