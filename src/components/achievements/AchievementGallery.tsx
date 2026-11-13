import { useState, useMemo, useEffect, useRef } from "react";
import { steamAchievements, type SteamAchievement, type AchievementTriggerType } from "../../data/steam_achievements";
import { AchievementCard } from "./AchievementCard";
import { AchievementWalkthroughModal } from "./AchievementWalkthroughModal";
import { useSave } from "../../context/SaveContext";
import { useSaveFileUpload } from "../../hooks/useSaveFileUpload";
import {
	MagnifyingGlassIcon,
	TrophyIcon,
	FunnelIcon,
	ShieldCheckIcon,
	FileArrowUpIcon,
	CheckCircleIcon,
	ClockIcon,
	XCircleIcon,
	ArrowCounterClockwiseIcon,
	CircleNotchIcon,
	WarningCircleIcon,
} from "@phosphor-icons/react";

const TRIGGER_FILTERS: { id: "all" | AchievementTriggerType; label: string }[] = [
	{ id: "all", label: "All Types" },
	{ id: "in_scene", label: "Dialogue Choice" },
	{ id: "conditional", label: "Policy Decision" },
	{ id: "story", label: "Story Arc" },
	{ id: "collectible", label: "Collectible" },
	{ id: "tactical", label: "Tactical / War" },
];

type AuditFilterType = "all" | "completed" | "in_progress" | "missed";

const AUDIT_FILTER_LABELS: Record<AuditFilterType, string> = {
	all: "All",
	completed: "Unlocked",
	in_progress: "Achievable Next",
	missed: "Missed",
};

function formatStoryPack(pack: string): string {
	if (pack === "StoryPack_Rizia") return "Rizia";
	if (pack === "StoryPack_Main") return "Sordland";
	return pack;
}

export function AchievementGallery({
	onNavigateToGuides,
	initialQuery = "",
}: {
	onNavigateToGuides: () => void;
	initialQuery?: string;
}) {
	const {
		fileLoaded,
		filename,
		auditSummary,
		auditResults,
		loadSampleSave,
		isLoadingSample,
		resetSave,
		loadSaveContent,
		showTechnicalKeys,
	} = useSave();

	const [searchQuery, setSearchQuery] = useState(initialQuery);
	const [selectedTrigger, setSelectedTrigger] = useState<"all" | AchievementTriggerType>("all");
	const [auditFilter, setAuditFilter] = useState<AuditFilterType>("all");
	const [selectedWalkthroughAch, setSelectedWalkthroughAch] = useState<SteamAchievement | null>(null);
	const [displayLimit, setDisplayLimit] = useState(24);
	const observerTarget = useRef<HTMLDivElement>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (initialQuery) {
			setSearchQuery(initialQuery);
		}
	}, [initialQuery]);

	const countsByTrigger = useMemo(() => {
		const counts: Record<string, number> = { all: steamAchievements.length };
		for (const ach of steamAchievements) {
			if (ach.triggerType) {
				counts[ach.triggerType] = (counts[ach.triggerType] || 0) + 1;
			}
		}
		return counts;
	}, []);

	const { error: uploadError, handleFileInput } = useSaveFileUpload(loadSaveContent);

	const filtered = useMemo(() => {
		const query = searchQuery.toLowerCase().trim();
		return steamAchievements
			.filter((ach) => {
				if (selectedTrigger !== "all" && ach.triggerType !== selectedTrigger) {
					return false;
				}
				if (fileLoaded && auditFilter !== "all") {
					const detail = auditResults.get(ach.id);
					if (!detail || detail.status !== auditFilter) {
						return false;
					}
				}
				if (!query) return true;

				return (
					ach.name.toLowerCase().includes(query) ||
					ach.description.toLowerCase().includes(query) ||
					(showTechnicalKeys && ach.id.toLowerCase().includes(query)) ||
					(ach.triggerScenes && ach.triggerScenes.some((s) => s.toLowerCase().includes(query)))
				);
			})
			.sort((a, b) => a.name.localeCompare(b.name));
	}, [searchQuery, selectedTrigger, fileLoaded, auditFilter, auditResults, showTechnicalKeys]);

	// Infinite Scroll Logic
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && displayLimit < filtered.length) {
					setDisplayLimit((prev) => prev + 24);
				}
			},
			{ threshold: 1.0 },
		);

		if (observerTarget.current) {
			observer.observe(observerTarget.current);
		}

		return () => observer.disconnect();
	}, [displayLimit, filtered.length]);

	const visibleAchievements = useMemo(() => {
		return filtered.slice(0, displayLimit);
	}, [filtered, displayLimit]);

	return (
		<div className="space-y-6">
			{/* Save Status Header Banner */}
			{fileLoaded && auditSummary ? (
				<div className="p-4 sm:p-5 bg-white dark:bg-slate-900 border-2 border-brass rounded-xl text-slate-900 dark:text-white shadow-sm">
					<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
						<div>
							<div className="flex items-center gap-2 mb-1">
								<ShieldCheckIcon weight="fill" className="w-5 h-5 text-brass" />
								<span className="text-xs font-bold uppercase tracking-widest text-brass">
									Save File Loaded
								</span>
							</div>
							<div className="flex items-center gap-3 flex-wrap text-sm">
								<span className="font-serif font-black uppercase text-base text-slate-900 dark:text-white">
									{auditSummary.campaignName}
								</span>
								<span className="text-slate-400 text-xs">|</span>
								<span className="text-xs text-slate-600 dark:text-slate-300 font-medium">
									Campaign: {formatStoryPack(auditSummary.storyPack)}
								</span>
								<span className="text-slate-400 text-xs">|</span>
								<span className="text-xs text-brass font-bold bg-brass/10 px-2 py-0.5 border border-brass/30 rounded">
									Turn {auditSummary.turnNo}
								</span>
								<span className="text-slate-400 text-xs hidden sm:inline">|</span>
								<span className="font-mono text-[11px] text-slate-500 dark:text-slate-400 hidden sm:inline">
									{filename}
								</span>
							</div>
						</div>

						<div className="flex items-center gap-2 flex-wrap">
							<button
								type="button"
								onClick={() => fileInputRef.current?.click()}
								className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-white/20 font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
								title="Upload a different save file"
							>
								<FileArrowUpIcon className="w-3.5 h-3.5 text-brass" />
								<span>Change Save</span>
							</button>
							<button
								type="button"
								onClick={resetSave}
								className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950 text-slate-700 dark:text-slate-300 hover:text-rose-700 dark:hover:text-rose-200 border border-slate-300 dark:border-white/10 hover:border-rose-400 dark:hover:border-rose-700 font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
								title="Reset active save audit"
							>
								<ArrowCounterClockwiseIcon className="w-3.5 h-3.5" />
								<span>Clear</span>
							</button>
						</div>
					</div>

					{/* Save Audit Filter Tabs */}
					<div className="mt-4 pt-4 border-t border-slate-200 dark:border-white/10 space-y-2 sm:space-y-0 sm:flex sm:items-center sm:gap-2 sm:flex-wrap">
						<span className="block sm:inline text-[11px] sm:text-xs uppercase font-bold text-slate-500 dark:text-slate-400 sm:mr-2">
							Progress:
						</span>
						<div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
						<button
							type="button"
							onClick={() => {
								setAuditFilter("all");
								setDisplayLimit(24);
							}}
							className={`inline-flex items-center justify-center sm:justify-start gap-1.5 px-2.5 py-1.5 sm:py-1 rounded text-[11px] sm:text-xs font-bold uppercase tracking-wider border transition-colors cursor-pointer ${
								auditFilter === "all"
									? "bg-brass text-slate-950 border-brass"
									: "bg-slate-100 dark:bg-black/40 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/30"
							}`}
						>
							<span>All</span>
							<span className="text-[10px] opacity-75 font-normal">({auditSummary.total})</span>
						</button>

						<button
							type="button"
							onClick={() => {
								setAuditFilter("completed");
								setDisplayLimit(24);
							}}
							className={`inline-flex items-center justify-center sm:justify-start gap-1.5 px-2.5 py-1.5 sm:py-1 rounded text-[11px] sm:text-xs font-bold uppercase tracking-wider border transition-colors cursor-pointer ${
								auditFilter === "completed"
									? "bg-emerald-600 text-white border-emerald-500"
									: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800/60 hover:border-emerald-500"
							}`}
						>
							<CheckCircleIcon weight="bold" className="w-3.5 h-3.5 shrink-0" />
							<span>Unlocked</span>
							<span className="text-[10px] opacity-75 font-normal">({auditSummary.completedCount})</span>
						</button>

						<button
							type="button"
							onClick={() => {
								setAuditFilter("in_progress");
								setDisplayLimit(24);
							}}
							className={`inline-flex items-center justify-center sm:justify-start gap-1.5 px-2.5 py-1.5 sm:py-1 rounded text-[11px] sm:text-xs font-bold uppercase tracking-wider border transition-colors cursor-pointer ${
								auditFilter === "in_progress"
									? "bg-amber-600 text-white border-amber-500"
									: "bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800/60 hover:border-amber-500"
							}`}
						>
							<ClockIcon weight="bold" className="w-3.5 h-3.5 shrink-0" />
							<span className="truncate">Achievable Next</span>
							<span className="text-[10px] opacity-75 font-normal">({auditSummary.inProgressCount})</span>
						</button>

						<button
							type="button"
							onClick={() => {
								setAuditFilter("missed");
								setDisplayLimit(24);
							}}
							className={`inline-flex items-center justify-center sm:justify-start gap-1.5 px-2.5 py-1.5 sm:py-1 rounded text-[11px] sm:text-xs font-bold uppercase tracking-wider border transition-colors cursor-pointer ${
								auditFilter === "missed"
									? "bg-rose-700 text-white border-rose-600"
									: "bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800/60 hover:border-rose-500"
							}`}
						>
							<XCircleIcon weight="bold" className="w-3.5 h-3.5 shrink-0" />
							<span>Missed</span>
							<span className="text-[10px] opacity-75 font-normal">({auditSummary.missedCount})</span>
						</button>
						</div>
					</div>
				</div>
			) : (
				<div className="p-4 sm:p-5 bg-amber-50 dark:bg-warm-surface-dark border-2 border-slate-300 dark:border-white/10 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
					<div className="space-y-1">
						<div className="flex items-center gap-2">
							<ShieldCheckIcon className="w-5 h-5 text-brass" />
							<h3 className="font-serif font-black uppercase tracking-wider text-sm text-slate-900 dark:text-white">
								Check Your Progress Across All 220 Achievements
							</h3>
						</div>
						<p className="text-xs text-slate-600 dark:text-slate-300 max-w-xl">
							Load your Suzerain save file to see which achievements you've earned, missed, or can still unlock.
						</p>
					</div>

					<div className="flex items-center gap-3 flex-wrap">
						<button
							type="button"
							onClick={loadSampleSave}
							disabled={isLoadingSample}
							className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-brass dark:hover:bg-brass-light text-white dark:text-slate-950 text-xs font-bold uppercase tracking-wider border border-transparent transition-colors cursor-pointer shadow-sm disabled:opacity-50"
							title="Test with the bundled sample save file"
						>
							{isLoadingSample ? (
								<CircleNotchIcon className="w-4 h-4 animate-spin" />
							) : (
								<ShieldCheckIcon weight="bold" className="w-4 h-4" />
							)}
							<span>{isLoadingSample ? "Checking Save..." : "Try Sample Save (Rizia, Turn 11)"}</span>
						</button>

						<button
							type="button"
							onClick={() => fileInputRef.current?.click()}
							className="inline-flex items-center gap-1.5 px-3 py-2 bg-white dark:bg-white/10 hover:bg-slate-100 dark:hover:bg-white/15 text-slate-800 dark:text-slate-200 border-2 border-slate-300 dark:border-white/20 font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
						>
							<FileArrowUpIcon className="w-4 h-4 text-brass" />
							<span>Upload .json</span>
						</button>
					</div>
				</div>
			)}

			{/* Hidden file input for gallery upload */}
			<input
				ref={fileInputRef}
				type="file"
				accept=".json"
				aria-label="Upload Save File"
				className="hidden"
				onChange={handleFileInput}
			/>

			{uploadError && (
				<div
					role="alert"
					className="p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-300 dark:border-red-800/60 flex items-center gap-2.5 text-red-700 dark:text-red-300 text-xs font-medium"
				>
					<WarningCircleIcon className="w-4 h-4 shrink-0" weight="fill" />
					<span>{uploadError}</span>
				</div>
			)}

			{/* Search & Trigger Filter Bar */}
			<div className="space-y-3">
				<div className="relative">
					<MagnifyingGlassIcon weight="bold" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
					<input
						type="text"
						placeholder="Search achievements by name or description..."
						className="w-full pl-12 pr-6 py-3.5 rounded-xl bg-white dark:bg-black/40 border-2 border-slate-300 dark:border-white/20 shadow-inner font-medium placeholder:text-slate-400 focus:border-brass dark:focus:border-brass-light outline-none text-slate-900 dark:text-slate-100 transition-colors text-sm"
						value={searchQuery}
						onChange={(e) => {
							setSearchQuery(e.target.value);
							setDisplayLimit(24);
						}}
					/>
				</div>

				{/* Filter Buttons */}
				<div className="flex items-center gap-2 flex-nowrap sm:flex-wrap overflow-x-auto sm:overflow-visible no-scrollbar pb-1 sm:pb-0">
					<div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mr-1 shrink-0">
						<FunnelIcon className="w-3.5 h-3.5" />
						<span>Type:</span>
					</div>
					{TRIGGER_FILTERS.map((filter) => {
						const isSelected = selectedTrigger === filter.id;
						const count = countsByTrigger[filter.id] ?? 0;
						return (
							<button
								key={filter.id}
								type="button"
								onClick={() => {
									setSelectedTrigger(filter.id);
									setDisplayLimit(24);
								}}
								className={`inline-flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider border-2 transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
									isSelected
										? "bg-slate-900 text-white border-slate-900 dark:bg-brass dark:text-slate-950 dark:border-brass"
										: "bg-white dark:bg-white/5 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/30"
								}`}
							>
								<span>{filter.label}</span>
								<span className={`text-[10px] px-1 rounded ${isSelected ? "bg-white/20 dark:bg-black/20" : "bg-slate-100 dark:bg-white/10 text-slate-500"}`}>
									{count}
								</span>
							</button>
						);
					})}
				</div>
			</div>

			{filtered.length === 0 ? (
				<div className="py-12 text-center text-slate-500 dark:text-slate-400 border-2 border-dashed border-slate-300 dark:border-white/10">
					<TrophyIcon className="w-12 h-12 mx-auto mb-3 opacity-20" />
					<p className="font-mono text-sm">NO ACHIEVEMENTS FOUND MATCHING CRITERIA</p>
					<button
						type="button"
						onClick={() => {
							setSearchQuery("");
							setSelectedTrigger("all");
							setAuditFilter("all");
						}}
						className="mt-3 text-xs font-mono font-bold uppercase tracking-wider text-warm-accent hover:underline cursor-pointer"
					>
						Reset Search & Filters
					</button>
				</div>
			) : (
				<>
					<div className="text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
						<span>Showing {visibleAchievements.length} of {filtered.length} achievements</span>
						{fileLoaded && (
							<span className="font-bold text-brass">
								Showing: {AUDIT_FILTER_LABELS[auditFilter]}
							</span>
						)}
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{visibleAchievements.map((ach) => (
							<AchievementCard 
								key={ach.id} 
								ach={ach}
								auditDetail={auditResults.get(ach.id)}
								onNavigateToGuides={onNavigateToGuides} 
								onOpenWalkthrough={(target) => setSelectedWalkthroughAch(target)}
							/>
						))}
					</div>
					
					{/* Infinite Scroll Anchor with Card Skeletons */}
					{displayLimit < filtered.length && (
						<div ref={observerTarget} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
							{Array.from({ length: 3 }).map((_, idx) => (
								<div
									key={idx}
									className="h-32 rounded-xl border-2 border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 animate-shimmer"
								/>
							))}
						</div>
					)}
				</>
			)}

			{/* Walkthrough Dossier Modal */}
			<AchievementWalkthroughModal
				achievement={selectedWalkthroughAch}
				isOpen={Boolean(selectedWalkthroughAch)}
				auditDetail={selectedWalkthroughAch ? auditResults.get(selectedWalkthroughAch.id) : undefined}
				currentTurn={auditSummary?.turnNo}
				onClose={() => setSelectedWalkthroughAch(null)}
			/>
		</div>
	);
}
