import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useDialogBehavior } from "../../hooks/useDialogBehavior";
import {
	MagnifyingGlassIcon,
	SlidersHorizontalIcon,
	TrophyIcon,
	CompassIcon,
	XIcon,
	ArrowRightIcon,
} from "@phosphor-icons/react";
import { appData } from "../../data/data";
import { steamAchievements } from "../../data/steam_achievements";
import { fetchCausalGraph, SceneSummary } from "../../utils/causal-graph";
import { useSave } from "../../context/SaveContext";

interface QuickSearchModalProps {
	isOpen: boolean;
	onClose: () => void;
}

interface SearchFieldEntry {
	type: "field";
	id: string;
	label: string;
	key?: string;
	tabId: string;
	tabLabel: string;
	sectionTitle: string;
}

interface SearchAchievementEntry {
	type: "achievement";
	id: string;
	name: string;
	description: string;
}

interface SearchSceneEntry {
	type: "scene";
	conversationId: number;
	title: string;
	turnLabel: string;
	storyPack: string;
}

type SearchResultItem = SearchFieldEntry | SearchAchievementEntry | SearchSceneEntry;

const MAX_RESULTS_PER_GROUP = 8;

let cachedFieldIndex: SearchFieldEntry[] | null = null;
function getFieldIndex(): SearchFieldEntry[] {
	if (!cachedFieldIndex) {
		const list: SearchFieldEntry[] = [];
		for (const tab of appData) {
			for (const section of tab.sections) {
				for (const field of section.fields) {
					list.push({
						type: "field",
						id: field.id,
						label: field.label,
						key: "key" in field ? field.key : undefined,
						tabId: tab.id,
						tabLabel: tab.label,
						sectionTitle: section.title,
					});
				}
			}
		}
		cachedFieldIndex = list;
	}
	return cachedFieldIndex;
}

export function QuickSearchModal({ isOpen, onClose }: QuickSearchModalProps) {
	const navigate = useNavigate();
	const { showTechnicalKeys } = useSave();
	const [query, setQuery] = useState("");
	const [scenes, setScenes] = useState<SceneSummary[]>([]);
	const [scenesLoaded, setScenesLoaded] = useState(false);
	const [activeIndex, setActiveIndex] = useState(0);
	const inputRef = useRef<HTMLInputElement>(null);

	useDialogBehavior(isOpen, onClose);

	// Lazy-load causal graph index only when QuickSearchModal is opened
	useEffect(() => {
		if (!isOpen) return;
		setQuery("");
		setActiveIndex(0);
		const raf = requestAnimationFrame(() => {
			inputRef.current?.focus();
		});

		if (!scenesLoaded) {
			let cancelled = false;
			fetchCausalGraph()
				.then((graph) => {
					if (cancelled) return;
					const list = Object.values(graph.scenes).filter((s) => !s.isDevNote);
					setScenes(list);
					setScenesLoaded(true);
				})
				.catch(() => {
					// Ignore fetch failure in quick search; Settings & Achievements still work
				});
			return () => {
				cancelled = true;
				cancelAnimationFrame(raf);
			};
		}

		return () => cancelAnimationFrame(raf);
	}, [isOpen, scenesLoaded]);

	const { fieldResults, achievementResults, sceneResults, flatResults } = useMemo(() => {
		const q = query.trim().toLowerCase();
		const allFields = getFieldIndex();

		const matchedFields: SearchFieldEntry[] = [];
		for (const f of allFields) {
			if (
				!q ||
				f.label.toLowerCase().includes(q) ||
				f.sectionTitle.toLowerCase().includes(q) ||
				f.tabLabel.toLowerCase().includes(q) ||
				(f.key && f.key.toLowerCase().includes(q))
			) {
				matchedFields.push(f);
				if (matchedFields.length >= MAX_RESULTS_PER_GROUP) break;
			}
		}

		const matchedAchievements: SearchAchievementEntry[] = [];
		for (const ach of steamAchievements) {
			if (
				!q ||
				ach.name.toLowerCase().includes(q) ||
				ach.description.toLowerCase().includes(q) ||
				(showTechnicalKeys && ach.id.toLowerCase().includes(q))
			) {
				matchedAchievements.push({
					type: "achievement",
					id: ach.id,
					name: ach.name,
					description: ach.description,
				});
				if (matchedAchievements.length >= MAX_RESULTS_PER_GROUP) break;
			}
		}

		const matchedScenes: SearchSceneEntry[] = [];
		for (const s of scenes) {
			if (!q || s.title.toLowerCase().includes(q) || s.turnLabel.toLowerCase().includes(q)) {
				matchedScenes.push({
					type: "scene",
					conversationId: s.conversationId,
					title: s.title,
					turnLabel: s.turnLabel,
					storyPack: s.storyPack === "StoryPack_Rizia" ? "Rizia" : "Sordland",
				});
				if (matchedScenes.length >= MAX_RESULTS_PER_GROUP) break;
			}
		}

		return {
			fieldResults: matchedFields,
			achievementResults: matchedAchievements,
			sceneResults: matchedScenes,
			flatResults: [...matchedFields, ...matchedAchievements, ...matchedScenes] as SearchResultItem[],
		};
	}, [query, scenes, showTechnicalKeys]);

	useEffect(() => {
		setActiveIndex(0);
	}, [query]);

	const handleSelect = useCallback(
		(item: SearchResultItem) => {
			onClose();
			if (item.type === "field") {
				navigate({
					to: "/",
					search: { tab: item.tabId, focus: item.id },
				});
			} else if (item.type === "achievement") {
				navigate({
					to: "/achievements",
					search: { tab: "gallery", q: item.name } as Record<string, string>,
				});
			} else {
				navigate({
					to: "/achievements",
					search: { tab: "walkthrough", scene: String(item.conversationId) } as Record<string, string>,
				});
			}
		},
		[navigate, onClose]
	);

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			if (e.key === "Escape") {
				e.preventDefault();
				onClose();
			} else if (e.key === "ArrowDown") {
				e.preventDefault();
				setActiveIndex((prev) => (flatResults.length > 0 ? (prev + 1) % flatResults.length : 0));
			} else if (e.key === "ArrowUp") {
				e.preventDefault();
				setActiveIndex((prev) =>
					flatResults.length > 0 ? (prev - 1 + flatResults.length) % flatResults.length : 0
				);
			} else if (e.key === "Enter" && flatResults[activeIndex]) {
				e.preventDefault();
				handleSelect(flatResults[activeIndex]);
			}
		},
		[flatResults, activeIndex, handleSelect, onClose]
	);

	if (!isOpen) return null;

	let runningIdx = 0;

	return (
		<div
			className="fixed inset-0 z-80 flex items-start justify-center pt-[10vh] px-4 bg-black/70 backdrop-blur-xs animate-fade-in"
			onClick={onClose}
			role="dialog"
			aria-modal="true"
			aria-label="Quick Search"
		>
			<div
				className="w-full max-w-2xl bg-white dark:bg-warm-surface-dark border-2 border-brass rounded-xl shadow-2xl overflow-hidden animate-zoom-in-95"
				onClick={(e) => e.stopPropagation()}
				onKeyDown={handleKeyDown}
			>
				{/* Search Input Bar */}
				<div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-200 dark:border-white/10">
					<MagnifyingGlassIcon className="w-5 h-5 text-brass shrink-0" weight="bold" />
					<input
						ref={inputRef}
						type="text"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						placeholder="Search save settings, achievements, or story scenes..."
						className="flex-1 bg-transparent text-sm sm:text-base text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
					/>
					<button
						type="button"
						onClick={onClose}
						aria-label="Close quick search"
						className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-md cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass"
					>
						<XIcon className="w-5 h-5" />
					</button>
				</div>

				{/* Results List */}
				<div className="max-h-[60vh] overflow-y-auto divide-y divide-slate-100 dark:divide-white/5">
					{flatResults.length === 0 ? (
						<div className="py-12 text-center text-sm text-slate-500 dark:text-slate-400">
							No matching settings, achievements, or scenes found for "{query}".
						</div>
					) : (
						<>
							{/* Settings Group */}
							{fieldResults.length > 0 && (
								<div className="p-2">
									<div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
										<SlidersHorizontalIcon className="w-3.5 h-3.5 text-brass" />
										<span>Save Settings</span>
									</div>
									{fieldResults.map((item) => {
										const itemIdx = runningIdx++;
										const isActive = itemIdx === activeIndex;
										return (
											<button
												key={`field-${item.id}`}
												type="button"
												onClick={() => handleSelect(item)}
												onMouseEnter={() => setActiveIndex(itemIdx)}
												className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-left transition-colors cursor-pointer ${
													isActive
														? "bg-brass/15 text-slate-900 dark:text-white"
														: "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5"
												}`}
											>
												<div className="min-w-0">
													<div className="text-sm font-semibold truncate">{item.label}</div>
													<div className="text-xs text-slate-500 dark:text-slate-400 truncate">
														{item.tabLabel} · {item.sectionTitle}
														{showTechnicalKeys && item.key ? ` · ${item.key}` : ""}
													</div>
												</div>
												<ArrowRightIcon className="w-4 h-4 text-brass shrink-0 opacity-75" />
											</button>
										);
									})}
								</div>
							)}

							{/* Achievements Group */}
							{achievementResults.length > 0 && (
								<div className="p-2">
									<div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
										<TrophyIcon className="w-3.5 h-3.5 text-amber-500" />
										<span>Achievements</span>
									</div>
									{achievementResults.map((item) => {
										const itemIdx = runningIdx++;
										const isActive = itemIdx === activeIndex;
										return (
											<button
												key={`ach-${item.id}`}
												type="button"
												onClick={() => handleSelect(item)}
												onMouseEnter={() => setActiveIndex(itemIdx)}
												className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-left transition-colors cursor-pointer ${
													isActive
														? "bg-brass/15 text-slate-900 dark:text-white"
														: "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5"
												}`}
											>
												<div className="min-w-0">
													<div className="text-sm font-semibold truncate">{item.name}</div>
													<div className="text-xs text-slate-500 dark:text-slate-400 truncate">
														{item.description}
													</div>
												</div>
												<ArrowRightIcon className="w-4 h-4 text-brass shrink-0 opacity-75" />
											</button>
										);
									})}
								</div>
							)}

							{/* Scenes Group */}
							{sceneResults.length > 0 && (
								<div className="p-2">
									<div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
										<CompassIcon className="w-3.5 h-3.5 text-emerald-500" />
										<span>Story Scenes</span>
									</div>
									{sceneResults.map((item) => {
										const itemIdx = runningIdx++;
										const isActive = itemIdx === activeIndex;
										return (
											<button
												key={`scene-${item.conversationId}`}
												type="button"
												onClick={() => handleSelect(item)}
												onMouseEnter={() => setActiveIndex(itemIdx)}
												className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-left transition-colors cursor-pointer ${
													isActive
														? "bg-brass/15 text-slate-900 dark:text-white"
														: "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5"
												}`}
											>
												<div className="min-w-0">
													<div className="text-sm font-semibold truncate">{item.title}</div>
													<div className="text-xs text-slate-500 dark:text-slate-400 truncate">
														{item.storyPack} · {item.turnLabel}
													</div>
												</div>
												<ArrowRightIcon className="w-4 h-4 text-brass shrink-0 opacity-75" />
											</button>
										);
									})}
								</div>
							)}
						</>
					)}
				</div>

				{/* Footer Hint */}
				<div className="px-4 py-2.5 bg-slate-50 dark:bg-black/40 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
					<span>↑↓ to navigate · Enter to open · Esc to close</span>
					<span>Showing top {MAX_RESULTS_PER_GROUP} per category</span>
				</div>
			</div>
		</div>
	);
}
