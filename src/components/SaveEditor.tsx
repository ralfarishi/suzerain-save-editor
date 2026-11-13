import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useSearch, useNavigate } from "@tanstack/react-router";
import { appData } from "../data/data";
import { EditorTabs } from "./EditorTabs";
import { EditorForm } from "./EditorForm";
import { MagicWandSidebar } from "./MagicWandSidebar";
import { RawVariableInspectorDrawer } from "./RawVariableInspectorDrawer";
import { findFieldLocation } from "../utils/save-manager";

import { useSaveEditor } from "../hooks/useSaveEditor";
import { EditorMobileNav } from "./layout/EditorMobileNav";
import { EditorFooter } from "./layout/EditorFooter";
import { LandingScreen } from "./layout/LandingScreen";
import { ToastNotification } from "./layout/ToastNotification";

// Lazy load the modal for better initial load performance
const SaveLocationInfo = lazy(() => import("./SaveLocationInfo"));

function SaveLocationSkeleton() {
	return (
		<div className="fixed inset-0 z-70 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-fade-in">
			<div className="bg-white dark:bg-warm-surface-dark rounded-xl shadow-2xl max-w-2xl w-full border-2 border-brass p-6 space-y-4">
				<div className="h-6 w-56 rounded bg-zinc-200 dark:bg-slate-800 animate-shimmer" />
				<div className="h-4 w-full rounded bg-zinc-200 dark:bg-slate-800 animate-shimmer" />
				<div className="space-y-3">
					<div className="h-16 w-full rounded-lg bg-zinc-200 dark:bg-slate-800 animate-shimmer" />
					<div className="h-16 w-full rounded-lg bg-zinc-200 dark:bg-slate-800 animate-shimmer" />
					<div className="h-16 w-full rounded-lg bg-zinc-200 dark:bg-slate-800 animate-shimmer" />
				</div>
			</div>
		</div>
	);
}

export function SaveEditor() {
	const search = useSearch({ from: "/" });
	const navigate = useNavigate({ from: "/" });
	const {
		fileLoaded,
		values,
		initialValues,
		errors,
		activeTabId,
		setActiveTabId,
		filename,
		toast,
		showHelp,
		setShowHelp,
		stamped,
		handleShowToast,
		handleCloseToast,
		handleFileLoaded,
		handleValueChange,
		handleBulkUpdate,
		handleResetTab,
		handleDownload,
		handleReset,
		activeTab,
		hasErrors,
		errorCounts,
	} = useSaveEditor();

	const [highlightedFieldId, setHighlightedFieldId] = useState<string | null>(null);
	const [forcedOpenSection, setForcedOpenSection] = useState<{ section: string; nonce: number } | null>(null);
	const [rawInspectorOpen, setRawInspectorOpen] = useState(false);
	const [rawInspectorQuery, setRawInspectorQuery] = useState("");
	const [presetsOpen, setPresetsOpen] = useState(false);
	const highlightTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		return () => {
			if (highlightTimerRef.current) {
				clearTimeout(highlightTimerRef.current);
			}
		};
	}, []);

	const handleEditorFileLoaded = useCallback(
		(content: string, name: string) => {
			handleFileLoaded(content, name);
			if (search.tab) {
				navigate({
					search: (prev) => ({ ...prev, tab: undefined }),
					replace: true,
				});
			}
		},
		[handleFileLoaded, search.tab, navigate]
	);

	const handleTabChange = useCallback(
		(nextTabId: string) => {
			setActiveTabId(nextTabId);
			if (search.tab !== nextTabId) {
				navigate({
					search: (prev) => ({ ...prev, tab: nextTabId }),
					replace: true,
				});
			}
		},
		[setActiveTabId, search.tab, navigate]
	);

	// Handle ?tab=<tabId>&focus=<fieldId> deep linking
	useEffect(() => {
		if (!fileLoaded) return;

		if (search.tab && appData.some((t) => t.id === search.tab) && search.tab !== activeTabId) {
			setActiveTabId(search.tab);
		}

		if (!search.focus) return;

		const focusTarget = search.focus;
		const loc = findFieldLocation(focusTarget);

		if (!loc) {
			// Fallback for unmapped Lua keys
			setRawInspectorQuery(focusTarget);
			setRawInspectorOpen(true);
			navigate({
				search: (prev) => ({ ...prev, focus: undefined }),
				replace: true,
			});
			return;
		}

		setActiveTabId(loc.tabId);
		setForcedOpenSection((prev) => ({
			section: loc.sectionTitle,
			nonce: (prev?.nonce ?? 0) + 1,
		}));

		let raf2 = 0;
		const raf1 = requestAnimationFrame(() => {
			raf2 = requestAnimationFrame(() => {
				const el = document.querySelector(`[data-field-id="${CSS.escape(loc.fieldId)}"]`) as HTMLElement | null;
				if (el) {
					el.scrollIntoView({ behavior: "smooth", block: "center" });
					const focusable = el.querySelector("input, select, button") as HTMLElement | null;
					focusable?.focus({ preventScroll: true });
					setHighlightedFieldId(loc.fieldId);
					if (highlightTimerRef.current) {
						clearTimeout(highlightTimerRef.current);
					}
					highlightTimerRef.current = setTimeout(() => {
						setHighlightedFieldId(null);
						highlightTimerRef.current = null;
					}, 2000);
				}
				// Clear `focus` from URL search params after focusing so tab switches/reloads don't re-trigger
				navigate({
					search: (prev) => ({ ...prev, focus: undefined }),
					replace: true,
				});
			});
		});

		return () => {
			cancelAnimationFrame(raf1);
			if (raf2) cancelAnimationFrame(raf2);
		};
	}, [fileLoaded, search.tab, search.focus, setActiveTabId, navigate]);

	return (
		<div className="min-h-screen flex flex-col">
			<EditorMobileNav
				fileLoaded={fileLoaded}
				hasErrors={hasErrors}
				onReset={handleReset}
				onDownload={handleDownload}
				activeTabId={activeTabId}
				onTabChange={handleTabChange}
				tabs={appData}
				errorCounts={errorCounts}
				filename={filename}
				onShowHelp={() => setShowHelp(true)}
				onOpenPresets={() => setPresetsOpen(true)}
			/>

			{/* Main Content */}
			<main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32">
				{!fileLoaded ? (
					<LandingScreen onFileLoaded={handleEditorFileLoaded} onShowHelp={() => setShowHelp(true)} />
				) : (
					<div className="animate-fade-in">
						<EditorTabs
							tabs={appData}
							activeTabId={activeTabId}
							onTabChange={handleTabChange}
							errorCounts={errorCounts}
						/>

						{activeTab && (
							<div key={activeTabId} className="pt-2 pb-6 animate-tab-fade">
								<EditorForm
									sections={activeTab.sections}
									values={values}
									initialValues={initialValues}
									errors={errors}
									onChange={handleValueChange}
									onUpdateValues={handleBulkUpdate}
									onResetTab={handleResetTab}
									forcedOpenSection={forcedOpenSection}
									highlightedFieldId={highlightedFieldId}
									onOpenRawInspector={() => {
										setRawInspectorQuery("");
										setRawInspectorOpen(true);
									}}
								/>
							</div>
						)}
					</div>
				)}
			</main>

			{/* Magic Wand Sidebar (Only show if a file is loaded) */}
			{fileLoaded && (
				<MagicWandSidebar
					onApplyPreset={handleBulkUpdate}
					onShowToast={handleShowToast}
					isOpen={presetsOpen}
					onOpenChange={setPresetsOpen}
				/>
			)}

			<EditorFooter />

			<ToastNotification toast={toast} onClose={handleCloseToast} />

			{/* Help Modal - Lazy Loaded */}
			{showHelp && (
				<Suspense fallback={<SaveLocationSkeleton />}>
					<SaveLocationInfo isOpen={showHelp} onClose={() => setShowHelp(false)} />
				</Suspense>
			)}

			{/* Raw Save Variable Inspector Fallback Drawer */}
			<RawVariableInspectorDrawer
				isOpen={rawInspectorOpen}
				initialQuery={rawInspectorQuery}
				onClose={() => setRawInspectorOpen(false)}
			/>

			{/* Fullscreen Stamp Animation Overlay */}
			{stamped && (
				<div className="fixed inset-0 flex items-center justify-center z-[100] pointer-events-none select-none animate-fade-in backdrop-blur-[2px]">
					<div className="border-8 border-red-600/80 text-red-600/80 font-serif font-black uppercase text-4xl md:text-7xl px-8 py-4 rounded-3xl -rotate-12 border-double tracking-widest shadow-2xl animate-stamp-down bg-white/10">
						[ SAVED & EXPORTED ]
					</div>
				</div>
			)}
		</div>
	);
}
