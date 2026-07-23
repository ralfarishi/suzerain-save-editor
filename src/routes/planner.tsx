import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useCallback, useEffect, useRef } from "react";
import {
  ArrowLeftIcon,
  MagicWandIcon,
  TrashIcon,
  ShareNetworkIcon,
  ShieldCheckIcon,
} from "@phosphor-icons/react";
import { ThemeSwitcher, ThemeNavButton } from "../components/ThemeSwitcher";
import { AchievementPicker } from "../components/planner/AchievementPicker";
import { PlannerResult } from "../components/planner/PlannerResult";
import {
  computeRecommendation,
  loadSelectionFromStorage,
  saveSelectionToStorage,
  encodeSelectionToUrl,
  decodeSelectionFromUrl,
  RecommendationResult,
} from "../utils/recommendation";

export const Route = createFileRoute("/planner")({
  validateSearch: (search: Record<string, unknown>) => ({
    a: typeof search.a === "string" ? search.a : undefined,
  }),
  component: PlannerPage,
});

function PlannerPage() {
  const { a } = Route.useSearch();

  // URL param takes priority over localStorage (share links)
  const [selected, setSelected] = useState<string[]>(() => {
    if (a) {
      const decoded = decodeSelectionFromUrl(a);
      if (decoded.length > 0) return decoded;
    }
    return loadSelectionFromStorage();
  });

  // Auto-compute when arriving via a share link so result is immediately visible
  const [result, setResult] = useState<RecommendationResult | null>(() => {
    if (a) {
      const decoded = decodeSelectionFromUrl(a);
      if (decoded.length > 0) return computeRecommendation(decoded);
    }
    return null;
  });

  const [copied, setCopied] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  // Persist selections to localStorage on every change
  useEffect(() => {
    saveSelectionToStorage(selected);
  }, [selected]);

  const handleChange = useCallback((next: string[]) => {
    setSelected(next);
    // Clear result when selection changes
    setResult(null);
  }, []);

  const handleCompute = useCallback(() => {
    if (selected.length === 0) return;
    const computed = computeRecommendation(selected);
    setResult(computed);

    // On mobile (< xl), smoothly bring the computed result into view
    if (window.innerWidth < 1280) {
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    }
  }, [selected]);

  const handleClear = useCallback(() => {
    setSelected([]);
    setResult(null);
  }, []);

  const handleShare = useCallback(async () => {
    const encoded = encodeSelectionToUrl(selected);
    const url = `${window.location.origin}/planner?a=${encoded}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable — silently ignore
    }
  }, [selected]);

  const canCompute = selected.length > 0;

  return (
    <div className="min-h-screen">
      {/* Desktop Header */}
      <header className="hidden md:block bg-slate-50 dark:bg-warm-surface-dark border-b-4 border-slate-300 dark:border-white/10 sticky top-0 z-50 bg-noise shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-serif font-black uppercase tracking-widest text-slate-900 dark:text-white">
              Sordland <span className="text-brass">Planner</span>
            </h1>
          </div>
          <div className="flex items-center gap-6">
            <Link
              to="/achievements"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-warm-accent transition-colors"
            >
              <ShieldCheckIcon className="w-4 h-4" />
              Walkthroughs
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-warm-accent transition-colors"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              Back to Editor
            </Link>
            <ThemeSwitcher />
          </div>
        </div>
      </header>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-60 bg-slate-900 dark:bg-black border-t-4 border-brass shadow-[0_-10px_30px_rgba(0,0,0,0.5)] bg-noise">
        <div className="h-1 bg-brass w-full" />
        <div className="max-w-lg mx-auto grid grid-cols-4 gap-1.5 p-2">
          {/* Back */}
          <Link
            to="/"
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-slate-800/80 border border-white/10 hover:border-brass/40 active:scale-95 text-slate-200 transition-all group"
            title="Back to Editor"
          >
            <ArrowLeftIcon weight="bold" className="w-5 h-5 text-slate-300 mb-0.5" />
            <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-300">
              Editor
            </span>
          </Link>

          {/* Theme */}
          <ThemeNavButton />

          {/* Walkthroughs */}
          <Link
            to="/achievements"
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-slate-800/80 border border-white/10 hover:border-brass/40 active:scale-95 text-slate-200 transition-all"
            title="Walkthroughs"
          >
            <ShieldCheckIcon className="w-5 h-5 text-slate-300 mb-0.5" />
            <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-300">
              Guides
            </span>
          </Link>

          {/* Compute */}
          <button
            type="button"
            onClick={handleCompute}
            disabled={!canCompute}
            className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl border transition-all cursor-pointer ${
              canCompute
                ? "bg-brass text-slate-900 border-brass-light shadow-[0_3px_0_0_#684b06]"
                : "bg-slate-800/80 text-slate-500 border-white/10 opacity-50 cursor-not-allowed"
            }`}
          >
            <MagicWandIcon weight="fill" className="w-5 h-5 mb-0.5" />
            <span className="text-[9px] font-mono font-bold uppercase tracking-wider">
              Plan
            </span>
          </button>
        </div>
        <div className="h-2 bg-transparent" />
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 pb-32">
        {/* Page Header */}
        <div className="mb-10">
          <h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-3 mb-2">
            <MagicWandIcon className="w-8 h-8 text-brass" />
            Achievement Planner
          </h2>
          <p className="font-serif italic text-slate-600 dark:text-slate-400 max-w-2xl">
            Select the achievements you want to unlock. The planner groups them
            into the minimum number of playthroughs, respecting which goals are
            mutually exclusive.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_480px] gap-10 items-start">
          {/*
           * DOM ORDER: result panel is FIRST so it appears at the top on mobile
           * (no scrolling past 220 achievements to see the result).
           * On xl screens, xl:order-1/2 restores the visual left-right layout.
           */}

          {/* Result panel — visually RIGHT on desktop, TOP on mobile */}
          <div ref={resultRef} className="xl:order-2 xl:sticky xl:top-24 xl:max-h-[calc(100vh-7rem)] xl:overflow-y-auto pr-1 scroll-mt-24">
            {/* Compute button */}
            <button
              type="button"
              onClick={handleCompute}
              disabled={!canCompute}
              className={`w-full mb-6 py-4 flex items-center justify-center gap-3 font-serif font-black uppercase tracking-widest text-sm border-2 transition-all cursor-pointer ${
                canCompute
                  ? "bg-brass text-slate-900 border-brass-light shadow-[0_4px_0_0_#684b06] hover:-translate-y-0.5 active:translate-y-0 active:shadow-none"
                  : "bg-slate-100 dark:bg-black/30 text-slate-400 border-slate-300 dark:border-white/10 cursor-not-allowed opacity-60"
              }`}
            >
              <MagicWandIcon weight="fill" className="w-5 h-5" />
              {canCompute
                ? `Compute Plan (${selected.length} selected)`
                : "Select achievements to begin"}
            </button>

            {result ? (
              <PlannerResult result={result} totalSelected={selected.length} />
            ) : (
              <div className="border-2 border-dashed border-slate-300 dark:border-white/10 p-10 text-center text-slate-400 dark:text-slate-500 font-serif italic">
                <MagicWandIcon className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="text-sm">
                  Select achievements below, then click{" "}
                  <strong className="text-brass font-bold">Compute Plan</strong>{" "}
                  to see your optimal playthrough schedule.
                </p>
              </div>
            )}
          </div>

          {/* Picker — visually LEFT on desktop, BELOW result on mobile */}
          <div className="xl:order-1">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white uppercase tracking-widest">
                Select Achievements
              </h3>
              {selected.length > 0 && (
                <div className="flex items-center gap-2">
                  {/* Share */}
                  <button
                    type="button"
                    onClick={handleShare}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest border-2 border-slate-300 dark:border-white/15 text-slate-600 dark:text-slate-400 hover:border-brass/50 hover:text-brass transition-all cursor-pointer"
                  >
                    <ShareNetworkIcon className="w-3.5 h-3.5" />
                    {copied ? "Copied!" : "Share"}
                  </button>
                  {/* Clear */}
                  <button
                    type="button"
                    onClick={handleClear}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest border-2 border-red-300/50 dark:border-red-900/50 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all cursor-pointer"
                  >
                    <TrashIcon className="w-3.5 h-3.5" />
                    Clear
                  </button>
                </div>
              )}
            </div>
            <AchievementPicker selected={selected} onChange={handleChange} />
          </div>
        </div>
      </main>
    </div>
  );
}
