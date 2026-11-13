import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
	MagnifyingGlassIcon,
	EyeSlashIcon,
	EyeIcon,
	CrosshairIcon,
	ArrowCounterClockwiseIcon,
} from "@phosphor-icons/react";
import {
	SceneSummary,
	parseLiteralValue,
	getSemanticLabel,
} from "../../utils/causal-graph";
import { findFieldLocation } from "../../utils/save-manager";
import { useSave } from "../../context/SaveContext";
import { useCausalSceneLoader } from "../../hooks/useCausalSceneLoader";
import { CausalChainDrawer } from "./CausalChainDrawer";
import { SceneListPanel } from "./SceneListPanel";
import { DialogueTreeRenderer } from "./DialogueTreeRenderer";

type StoryPackFilter = "All" | "StoryPack_Main" | "StoryPack_Rizia";

const SPOILER_GUARD_STORAGE_KEY = "suzerain-spoiler-guard";

function readInitialSpoilerGuard(): boolean {
	try {
		if (typeof window !== "undefined" && window.localStorage) {
			const stored = window.localStorage.getItem(SPOILER_GUARD_STORAGE_KEY);
			if (stored === "false") return false;
			if (stored === "true") return true;
		}
	} catch {
		// Ignore storage access errors
	}
	return true;
}

interface CausalWalkthroughExplorerProps {
	initialSceneId?: number;
	initialVarKey?: string;
}

export function CausalWalkthroughExplorer({
	initialSceneId,
	initialVarKey,
}: CausalWalkthroughExplorerProps) {
	const navigate = useNavigate();
	const { fileLoaded, originalData, variablesMap, auditSummary, updateVariable, showTechnicalKeys } =
		useSave();

	const {
		graph,
		loadError,
		retryGraph,
		selectedSceneId,
		setSelectedSceneId,
		sceneChunk,
		loadingScene,
		sceneError,
		selectSceneById,
		retryScene,
	} = useCausalSceneLoader();

	const [query, setQuery] = useState("");
	const [packFilter, setPackFilter] = useState<StoryPackFilter>(() => {
		if (!fileLoaded) return "All";
		return auditSummary?.storyPack?.toLowerCase().includes("rizia")
			? "StoryPack_Rizia"
			: "StoryPack_Main";
	});
	const [turnFilter, setTurnFilter] = useState<string>("All");
	const [onlyEffectScenes, setOnlyEffectScenes] = useState(false);
	const [visibleLimit, setVisibleLimit] = useState(40);

	const [spoilerGuard, setSpoilerGuard] = useState<boolean>(readInitialSpoilerGuard);
	const [revealedSceneIds, setRevealedSceneIds] = useState<Set<number>>(new Set());

	const [onlyLogicNodes, setOnlyLogicNodes] = useState(true);
	const [inspectedVarKey, setInspectedVarKey] = useState<string | null>(null);
	const [appliedKey, setAppliedKey] = useState<string | null>(null);
	const [highlightedNodeId, setHighlightedNodeId] = useState<number | null>(null);
	const [pendingNodeId, setPendingNodeId] = useState<number | null>(null);
	const [expandedImpactKey, setExpandedImpactKey] = useState<string | null>(null);

	const sceneRowRefs = useRef<Map<number, HTMLButtonElement>>(new Map());
	const sceneListRef = useRef<HTMLDivElement>(null);
	const detailPanelRef = useRef<HTMLDivElement>(null);

	const scrollRafRef = useRef<number | null>(null);
	const jumpRafRef = useRef<number | null>(null);
	const highlightTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const appliedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		return () => {
			if (scrollRafRef.current !== null) cancelAnimationFrame(scrollRafRef.current);
			if (jumpRafRef.current !== null) cancelAnimationFrame(jumpRafRef.current);
			if (highlightTimerRef.current) clearTimeout(highlightTimerRef.current);
			if (appliedTimerRef.current) clearTimeout(appliedTimerRef.current);
		};
	}, []);

	const saveTurnNo = auditSummary?.turnNo ?? 0;
	const savePack = auditSummary?.storyPack ?? "";
	const isSaveRizia = savePack.toLowerCase().includes("rizia");

	// Reset per-scene manual reveals & default pack filter when switching saves
	useEffect(() => {
		setRevealedSceneIds(new Set());
		if (fileLoaded) {
			setPackFilter(isSaveRizia ? "StoryPack_Rizia" : "StoryPack_Main");
		}
	}, [fileLoaded, originalData, isSaveRizia]);

	const toggleSpoilerGuard = useCallback(() => {
		setSpoilerGuard((prev) => {
			const next = !prev;
			try {
				if (typeof window !== "undefined" && window.localStorage) {
					window.localStorage.setItem(SPOILER_GUARD_STORAGE_KEY, String(next));
				}
			} catch {
				// Ignore storage access errors
			}
			return next;
		});
	}, []);

	const handleSelectScene = useCallback(
		(scene: SceneSummary) => {
			void selectSceneById(scene.conversationId);
			if (typeof window !== "undefined" && window.innerWidth < 1024) {
				if (scrollRafRef.current !== null) cancelAnimationFrame(scrollRafRef.current);
				scrollRafRef.current = requestAnimationFrame(() => {
					scrollRafRef.current = null;
					detailPanelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
				});
			}
		},
		[selectSceneById]
	);

	const handleSelectSceneById = useCallback(
		(convId: number, nodeId?: number) => {
			if (!graph) return;
			const target = graph.scenes[String(convId)];
			if (!target) return;

			if (nodeId !== undefined) {
				setOnlyLogicNodes(false);
				setPendingNodeId(nodeId);
			}
			if (sceneChunk && sceneChunk.conversationId === convId && !loadingScene) {
				setSelectedSceneId(convId);
			} else {
				handleSelectScene(target);
			}
		},
		[graph, handleSelectScene, sceneChunk, loadingScene, setSelectedSceneId]
	);

	// Auto-select initialSceneId or initialVarKey when navigated from Quick Search or Achievement Modal
	useEffect(() => {
		if (!graph) return;
		if (initialSceneId !== undefined && !Number.isNaN(initialSceneId)) {
			const target = graph.scenes[String(initialSceneId)];
			if (target) {
				setPackFilter("All");
				handleSelectScene(target);
			}
		}
		if (initialVarKey) {
			setInspectedVarKey(initialVarKey);
		}
	}, [graph, initialSceneId, initialVarKey, handleSelectScene]);

	// Scroll to and highlight pending dialogue node once scene chunk finishes loading
	useEffect(() => {
		if (pendingNodeId === null || loadingScene || !sceneChunk) return;
		const targetId = pendingNodeId;
		setPendingNodeId(null);

		let raf2 = 0;
		const raf1 = requestAnimationFrame(() => {
			raf2 = requestAnimationFrame(() => {
				const el = document.querySelector(`[data-node-id="${targetId}"]`) as HTMLElement | null;
				if (el) {
					el.scrollIntoView({ behavior: "smooth", block: "center" });
					setHighlightedNodeId(targetId);
					if (highlightTimerRef.current) clearTimeout(highlightTimerRef.current);
					highlightTimerRef.current = setTimeout(() => {
						setHighlightedNodeId((curr) => (curr === targetId ? null : curr));
						highlightTimerRef.current = null;
					}, 2200);
				}
			});
		});

		return () => {
			cancelAnimationFrame(raf1);
			if (raf2) cancelAnimationFrame(raf2);
		};
	}, [pendingNodeId, loadingScene, sceneChunk]);

	const handleApplyVariable = useCallback(
		(rawKey: string, valueStr: string) => {
			if (!fileLoaded) return;
			const parsed = parseLiteralValue(valueStr);
			updateVariable(rawKey, parsed);
			const key = `${rawKey}=${valueStr}`;
			setAppliedKey(key);
			if (appliedTimerRef.current) clearTimeout(appliedTimerRef.current);
			appliedTimerRef.current = setTimeout(() => {
				setAppliedKey((curr) => (curr === key ? null : curr));
				appliedTimerRef.current = null;
			}, 1500);
		},
		[fileLoaded, updateVariable]
	);

	const handleJumpToFix = useCallback(
		(varKey: string) => {
			const loc = findFieldLocation(varKey);
			if (loc) {
				navigate({ to: "/", search: { tab: loc.tabId, focus: loc.fieldId } });
			} else {
				navigate({ to: "/", search: { focus: varKey } });
			}
		},
		[navigate]
	);

	const filteredScenes = useMemo(() => {
		if (!graph) return [];
		const q = query.toLowerCase().trim();
		const varMatchedConvIds = new Set<number>();
		if (q) {
			for (const [varKey, vIdx] of Object.entries(graph.variables)) {
				const label = getSemanticLabel(graph, varKey);
				if (varKey.toLowerCase().includes(q) || label.toLowerCase().includes(q)) {
					for (const m of vIdx.mutatedIn ?? []) {
						if (m.convId !== undefined) varMatchedConvIds.add(m.convId);
					}
					for (const r of vIdx.readIn ?? []) {
						if (r.convId !== undefined) varMatchedConvIds.add(r.convId);
					}
				}
			}
		}
		const list = Object.values(graph.scenes).filter((s) => {
			if (s.isDevNote) return false;
			if (onlyEffectScenes && s.variablesModified.length === 0 && s.variablesRead.length === 0)
				return false;
			if (packFilter !== "All" && s.storyPack !== packFilter) return false;
			if (turnFilter !== "All" && String(s.turn) !== turnFilter) return false;
			if (!q) return true;
			if (s.title.toLowerCase().includes(q)) return true;
			if (varMatchedConvIds.has(s.conversationId)) return true;
			if (s.variablesRead.some((v) => v.toLowerCase().includes(q))) return true;
			if (s.variablesModified.some((v) => v.toLowerCase().includes(q))) return true;
			return false;
		});
		list.sort((a, b) => {
			const packA = a.storyPack === "StoryPack_Rizia" ? 1 : 0;
			const packB = b.storyPack === "StoryPack_Rizia" ? 1 : 0;
			return packA - packB || a.turn - b.turn || a.title.localeCompare(b.title);
		});
		return list;
	}, [graph, query, packFilter, turnFilter, onlyEffectScenes]);

	const { turnGroupCounts, turnGroupScenesMap, sceneIndexMap } = useMemo(() => {
		const counts = new Map<string, number>();
		const groups = new Map<string, SceneSummary[]>();
		const indices = new Map<number, number>();

		filteredScenes.forEach((s, idx) => {
			indices.set(s.conversationId, idx);
			const key = `${s.storyPack}:${s.turn}`;
			counts.set(key, (counts.get(key) ?? 0) + 1);
			const arr = groups.get(key);
			if (arr) arr.push(s);
			else groups.set(key, [s]);
		});

		return {
			turnGroupCounts: counts,
			turnGroupScenesMap: groups,
			sceneIndexMap: indices,
		};
	}, [filteredScenes]);

	const visibleScenes = useMemo(
		() => filteredScenes.slice(0, visibleLimit),
		[filteredScenes, visibleLimit]
	);

	const handleJumpToCurrentTurn = useCallback(() => {
		const idx = filteredScenes.findIndex((s) => s.turn === saveTurnNo);
		if (idx === -1) return;
		if (idx >= visibleLimit) {
			setVisibleLimit(idx + 20);
		}
		const targetScene = filteredScenes[idx];
		handleSelectScene(targetScene);
		if (jumpRafRef.current !== null) cancelAnimationFrame(jumpRafRef.current);
		jumpRafRef.current = requestAnimationFrame(() => {
			jumpRafRef.current = null;
			const rowEl = sceneRowRefs.current.get(targetScene.conversationId);
			rowEl?.scrollIntoView({ block: "center", behavior: "smooth" });
		});
	}, [filteredScenes, saveTurnNo, visibleLimit, handleSelectScene]);

	const { displayedNodes, totalReadableNodes } = useMemo(() => {
		if (!sceneChunk) return { displayedNodes: [], totalReadableNodes: 0 };
		const nodes = Object.values(sceneChunk.nodes);
		const allReadable = nodes.filter(
			(n) =>
				n.text.trim().length > 0 ||
				(n.variablesRead?.length ?? 0) > 0 ||
				(n.variablesModified?.length ?? 0) > 0
		);
		const filtered = onlyLogicNodes
			? allReadable.filter(
					(n) => (n.variablesRead?.length ?? 0) > 0 || (n.variablesModified?.length ?? 0) > 0
				)
			: allReadable;
		filtered.sort((a, b) => a.id - b.id);
		return { displayedNodes: filtered, totalReadableNodes: allReadable.length };
	}, [sceneChunk, onlyLogicNodes]);

	const handleToggleImpactKey = useCallback((key: string) => {
		setExpandedImpactKey((curr) => (curr === key ? null : key));
	}, []);

	const handleRevealScene = useCallback((convId: number) => {
		setRevealedSceneIds((prev) => new Set(prev).add(convId));
	}, []);

	if (loadError) {
		return (
			<div className="p-6 rounded-xl border-2 border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-950/30 text-sm text-red-700 dark:text-red-300 flex items-center justify-between gap-4 flex-wrap">
				<span>{loadError}</span>
				<button
					type="button"
					onClick={() => {
						retryGraph();
					}}
					className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
				>
					<ArrowCounterClockwiseIcon className="w-3.5 h-3.5" weight="bold" />
					<span>Retry</span>
				</button>
			</div>
		);
	}

	if (!graph) {
		return (
			<div className="space-y-6 animate-fade-in" aria-label="Loading Scene & Choice Explorer...">
				<div className="h-24 rounded-xl border-2 border-slate-200 dark:border-white/10 bg-white dark:bg-warm-surface-dark p-4 space-y-3">
					<div className="h-9 w-full rounded-lg bg-zinc-200 dark:bg-slate-800 animate-shimmer" />
					<div className="h-4 w-72 rounded bg-zinc-200 dark:bg-slate-800 animate-shimmer" />
				</div>
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
					<div className="lg:col-span-5 rounded-xl border-2 border-slate-200 dark:border-white/10 bg-white dark:bg-warm-surface-dark p-4 space-y-3">
						{Array.from({ length: 8 }).map((_, i) => (
							<div key={i} className="h-14 rounded-lg bg-zinc-200 dark:bg-slate-800 animate-shimmer" />
						))}
					</div>
					<div className="lg:col-span-7 rounded-xl border-2 border-slate-200 dark:border-white/10 bg-white dark:bg-warm-surface-dark p-6 min-h-[420px] space-y-4">
						<div className="h-6 w-64 rounded bg-zinc-200 dark:bg-slate-800 animate-shimmer" />
						<div className="h-24 w-full rounded-lg bg-zinc-200 dark:bg-slate-800 animate-shimmer" />
						<div className="h-24 w-full rounded-lg bg-zinc-200 dark:bg-slate-800 animate-shimmer" />
					</div>
				</div>
			</div>
		);
	}

	const isSceneBlurred =
		Boolean(sceneChunk) &&
		spoilerGuard &&
		fileLoaded &&
		(sceneChunk?.turn ?? 0) > saveTurnNo &&
		!revealedSceneIds.has(sceneChunk!.conversationId);

	return (
		<div className="space-y-6">
			{/* Top Filter Bar */}
			<div className="p-4 rounded-xl border-2 border-slate-200 dark:border-white/15 bg-white dark:bg-warm-surface-dark shadow-sm space-y-4">
				<div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
					<div className="relative flex-1">
						<MagnifyingGlassIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
						<input
							type="text"
							value={query}
							onChange={(e) => {
								setQuery(e.target.value);
								setVisibleLimit(40);
							}}
							placeholder={
								showTechnicalKeys
									? "Search scenes, choices, story events, or variable key..."
									: "Search scenes, choices, or story events (e.g. Agnolia Alliance)..."
							}
							className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-slate-50 dark:bg-black/30 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brass"
						/>
					</div>

					<div className="flex flex-wrap items-center gap-2">
						<div className="inline-flex rounded-lg overflow-hidden border border-slate-300 dark:border-white/15 bg-slate-100 dark:bg-black/30">
							{(
								[
									["All", "All"],
									["StoryPack_Main", "Sordland"],
									["StoryPack_Rizia", "Rizia"],
								] as const
							).map(([val, label]) => (
								<button
									key={val}
									type="button"
									onClick={() => {
										setPackFilter(val);
										setVisibleLimit(40);
									}}
									className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors ${
										packFilter === val
											? "bg-brass text-slate-950"
											: "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
									}`}
								>
									{label}
								</button>
							))}
						</div>

						<select
							value={turnFilter}
							onChange={(e) => {
								setTurnFilter(e.target.value);
								setVisibleLimit(40);
							}}
							aria-label="Filter by Turn"
							className="px-2.5 py-1.5 text-xs font-bold uppercase rounded-lg bg-slate-50 dark:bg-black/30 border border-slate-300 dark:border-white/15 text-slate-800 dark:text-slate-200"
						>
							<option value="All">All Turns</option>
							<option value="0">Prologue</option>
							{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((t) => (
								<option key={t} value={String(t)}>
									Turn {t}
								</option>
							))}
							<option value="11">Epilogue</option>
							<option value="-1">General / Untimed</option>
						</select>

						{fileLoaded && (
							<>
								<button
									type="button"
									onClick={handleJumpToCurrentTurn}
									className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brass/15 hover:bg-brass/25 border border-brass/50 text-xs font-bold text-slate-900 dark:text-brass-light cursor-pointer transition-colors"
								>
									<CrosshairIcon className="w-3.5 h-3.5 text-brass" weight="bold" />
									<span>Jump to Turn {saveTurnNo}</span>
								</button>

								<button
									type="button"
									onClick={toggleSpoilerGuard}
									aria-pressed={spoilerGuard}
									className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold cursor-pointer transition-colors ${
										spoilerGuard
											? "bg-slate-900 dark:bg-brass text-white dark:text-slate-950 border-slate-900 dark:border-brass"
											: "bg-slate-50 dark:bg-black/30 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-white/15"
									}`}
									title="Blur scenes ahead of your current save turn"
								>
									{spoilerGuard ? (
										<EyeSlashIcon className="w-3.5 h-3.5" weight="bold" />
									) : (
										<EyeIcon className="w-3.5 h-3.5" />
									)}
									<span>Spoiler Guard: {spoilerGuard ? "ON" : "OFF"}</span>
								</button>
							</>
						)}

						<label className="inline-flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300 cursor-pointer px-2">
							<input
								type="checkbox"
								checked={onlyEffectScenes}
								onChange={(e) => {
									setOnlyEffectScenes(e.target.checked);
									setVisibleLimit(40);
								}}
								className="accent-brass"
							/>
							With Story Effects Only
						</label>
					</div>
				</div>

				<div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
					<span>
						Scenes: <strong className="text-slate-900 dark:text-white">{filteredScenes.length}</strong> of{" "}
						{graph.stats.sceneCount}
					</span>
					<span>
						Tracked Choices:{" "}
						<strong className="text-slate-900 dark:text-white">{graph.stats.activeVariableCount}</strong>
					</span>
					<span>
						Dialogue Lines:{" "}
						<strong className="text-slate-900 dark:text-white">
							{graph.stats.totalNodes.toLocaleString()}
						</strong>
					</span>
				</div>
			</div>

			{/* Two-Column Explorer */}
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
				<SceneListPanel
					sceneListRef={sceneListRef}
					sceneRowRefs={sceneRowRefs}
					filteredScenes={filteredScenes}
					visibleScenes={visibleScenes}
					visibleLimit={visibleLimit}
					onShowMore={() => setVisibleLimit((c) => c + 40)}
					turnGroupCounts={turnGroupCounts}
					packFilter={packFilter}
					selectedSceneId={selectedSceneId}
					fileLoaded={fileLoaded}
					isSaveRizia={isSaveRizia}
					saveTurnNo={saveTurnNo}
					showTechnicalKeys={showTechnicalKeys}
					onSelectScene={handleSelectScene}
				/>

				<DialogueTreeRenderer
					graph={graph}
					detailPanelRef={detailPanelRef}
					sceneListRef={sceneListRef}
					filteredScenes={filteredScenes}
					sceneIndexMap={sceneIndexMap}
					turnGroupScenesMap={turnGroupScenesMap}
					sceneChunk={sceneChunk}
					loadingScene={loadingScene}
					sceneError={sceneError}
					onRetryScene={retryScene}
					onlyLogicNodes={onlyLogicNodes}
					onToggleLogicNodes={setOnlyLogicNodes}
					displayedNodes={displayedNodes}
					totalReadableNodes={totalReadableNodes}
					isSceneBlurred={isSceneBlurred}
					saveTurnNo={saveTurnNo}
					onRevealScene={handleRevealScene}
					onSelectScene={handleSelectScene}
					highlightedNodeId={highlightedNodeId}
					fileLoaded={fileLoaded}
					variablesMap={variablesMap}
					showTechnicalKeys={showTechnicalKeys}
					appliedKey={appliedKey}
					expandedImpactKey={expandedImpactKey}
					onToggleImpactKey={handleToggleImpactKey}
					onInspectVarKey={setInspectedVarKey}
					onJumpToFix={handleJumpToFix}
					onApplyVariable={handleApplyVariable}
					onSelectSceneById={handleSelectSceneById}
				/>
			</div>

			{/* Progressive Disclosure Drawer for Cross-Turn Causal Impact */}
			<CausalChainDrawer
				graph={graph}
				varKey={inspectedVarKey}
				onClose={() => setInspectedVarKey(null)}
				onSelectSceneById={handleSelectSceneById}
			/>
		</div>
	);
}
