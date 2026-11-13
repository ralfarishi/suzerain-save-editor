import { useState, memo } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import {
	SlidersHorizontalIcon,
	TrophyIcon,
	MagicWandIcon,
	DotsThreeOutlineVerticalIcon,
	XIcon,
	FileArrowDownIcon,
	FileArrowUpIcon,
	RowsIcon,
	ArrowCounterClockwiseIcon,
	QuestionIcon,
	ShieldCheckIcon,
	ShareNetworkIcon,
	TrashIcon,
	ListDashesIcon,
	GridFourIcon,
	SunDimIcon,
	MoonIcon,
	CheckIcon,
	SparkleIcon,
	CompassIcon,
	CodeIcon,
	PencilSimpleLineIcon,
} from "@phosphor-icons/react";
import { useSave } from "../../context/SaveContext";
import { useTheme } from "../ThemeSwitcher";
import { useDialogBehavior } from "../../hooks/useDialogBehavior";

interface FloatingMobileDockProps {
	// Editor specific
	fileLoaded?: boolean;
	filename?: string;
	hasErrors?: boolean;
	onReset?: () => void;
	onDownload?: () => void;
	onOpenSections?: () => void;
	onOpenPresets?: () => void;
	onShowHelp?: () => void;
	onUploadClick?: () => void;

	// Achievements specific
	activeAchievementsTab?: "guides" | "gallery" | "walkthrough";
	onSelectAchievementsTab?: (tab: "guides" | "gallery" | "walkthrough") => void;

	// Planner specific
	canCompute?: boolean;
	selectedCount?: number;
	onCompute?: () => void;
	onClearPlanner?: () => void;
	onSharePlanner?: () => void;
	isPlannerCopied?: boolean;
}

export const FloatingMobileDock = memo(function FloatingMobileDock({
	fileLoaded: propFileLoaded,
	filename: propFilename,
	hasErrors = false,
	onReset,
	onOpenSections,
	onOpenPresets,
	onShowHelp,
	onUploadClick,
	activeAchievementsTab = "guides",
	onSelectAchievementsTab,
	canCompute = false,
	selectedCount = 0,
	onCompute,
	onClearPlanner,
	onSharePlanner,
	isPlannerCopied = false,
}: FloatingMobileDockProps) {
	const location = useLocation();
	const pathname = location.pathname;
	const {
		fileLoaded: contextFileLoaded,
		filename: contextFilename,
		loadSampleSave,
		isLoadingSample,
		auditSummary,
		showTechnicalKeys,
		toggleTechnicalKeys,
		modifiedEntries,
		setIsDiffDrawerOpen,
	} = useSave();
	const { theme, toggleTheme } = useTheme();
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	useDialogBehavior(isDrawerOpen, () => setIsDrawerOpen(false));

	const isFileLoaded = propFileLoaded ?? contextFileLoaded;
	const activeFilename = propFilename || contextFilename;

	const isEditorActive = pathname === "/" || pathname === "";
	const isDossierActive = pathname.startsWith("/achievements");
	const isPlannerActive = pathname.startsWith("/planner");

	return (
		<>
			{/* Floating Island Dock (Option A) */}
			<div className="md:hidden fixed bottom-4 inset-x-0 mx-auto w-[calc(100%-2rem)] max-w-sm z-50 pointer-events-none">
				<nav
					aria-label="Mobile Navigation Dock"
					className="pointer-events-auto bg-white/95 dark:bg-[#121420]/95 backdrop-blur-md border-2 border-slate-300 dark:border-brass/40 rounded-2xl shadow-[0_10px_30px_rgba(15,23,42,0.14)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.65)] px-2 py-1.5 flex items-center justify-between gap-1 select-none"
				>
					{/* 1. Editor Tab */}
					<Link
						to="/"
						className={`relative flex-1 min-w-0 min-h-[48px] h-12 flex flex-col items-center justify-center rounded-xl transition-all cursor-pointer group ${
							isEditorActive
								? "bg-brass text-slate-950 font-bold shadow-sm"
								: "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 active:scale-95"
						}`}
						title="State Record Editor"
					>
						<SlidersHorizontalIcon
							weight={isEditorActive ? "bold" : "duotone"}
							className={`w-5 h-5 mb-0.5 ${isEditorActive ? "text-slate-950" : "text-slate-500 dark:text-slate-400 group-hover:text-brass"}`}
						/>
						<span
							className={`text-[10px] font-mono uppercase tracking-wider truncate max-w-full px-1 ${
								isEditorActive ? "font-black text-slate-950" : "font-bold text-slate-600 dark:text-slate-400"
							}`}
						>
							Editor
						</span>
						{isFileLoaded && !isEditorActive && (
							<span
								className="absolute top-1.5 right-2 w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.8)]"
								title="Active save file loaded"
							/>
						)}
					</Link>

					{/* 2. Dossiers / Walkthroughs Tab */}
					<Link
						to="/achievements"
						className={`relative flex-1 min-w-0 min-h-[48px] h-12 flex flex-col items-center justify-center rounded-xl transition-all cursor-pointer group ${
							isDossierActive
								? "bg-brass text-slate-950 font-bold shadow-sm"
								: "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 active:scale-95"
						}`}
						title="State Intelligence & Dossiers"
					>
						<TrophyIcon
							weight={isDossierActive ? "bold" : "duotone"}
							className={`w-5 h-5 mb-0.5 ${isDossierActive ? "text-slate-950" : "text-amber-600 dark:text-amber-400 group-hover:text-amber-500"}`}
						/>
						<span
							className={`text-[10px] font-mono uppercase tracking-wider truncate max-w-full px-1 ${
								isDossierActive ? "font-black text-slate-950" : "font-bold text-slate-600 dark:text-slate-400"
							}`}
						>
							Dossier
						</span>
					</Link>

					{/* 3. Planner Tab */}
					<Link
						to="/planner"
						className={`relative flex-1 min-w-0 min-h-[48px] h-12 flex flex-col items-center justify-center rounded-xl transition-all cursor-pointer group ${
							isPlannerActive
								? "bg-brass text-slate-950 font-bold shadow-sm"
								: "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 active:scale-95"
						}`}
						title="Tactical Pathway Planner"
					>
						<MagicWandIcon
							weight={isPlannerActive ? "bold" : "duotone"}
							className={`w-5 h-5 mb-0.5 ${isPlannerActive ? "text-slate-950" : "text-brass group-hover:text-brass-light"}`}
						/>
						<span
							className={`text-[10px] font-mono uppercase tracking-wider truncate max-w-full px-1 ${
								isPlannerActive ? "font-black text-slate-950" : "font-bold text-slate-600 dark:text-slate-400"
							}`}
						>
							Planner
						</span>
					</Link>

					{/* 4. Actions Trigger Button */}
					<button
						type="button"
						onClick={() => setIsDrawerOpen(true)}
						aria-label="Open tactical actions"
						className="relative flex-1 min-w-0 min-h-[48px] h-12 flex flex-col items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 active:scale-95 text-slate-800 dark:text-slate-200 transition-all cursor-pointer group"
						title="Open Quick Actions Console"
					>
						<DotsThreeOutlineVerticalIcon
							weight="fill"
							className="w-5 h-5 mb-0.5 text-brass group-hover:text-brass-light"
						/>
						<span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 truncate max-w-full px-1">
							Actions
						</span>

						{/* Notification / Attention Dot */}
						{hasErrors && (
							<span className="absolute top-1.5 right-2 w-2 h-2 rounded-full bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.9)]" />
						)}
						{isPlannerActive && selectedCount > 0 && (
							<span className="absolute top-1.5 right-2 px-1 min-w-[14px] h-[14px] rounded-full bg-brass text-slate-950 text-[9px] font-mono font-black flex items-center justify-center">
								{selectedCount > 9 ? "9+" : selectedCount}
							</span>
						)}
					</button>
				</nav>
			</div>

			{/* Contextual Quick Actions Drawer */}
			{isDrawerOpen && (
				<div className="fixed inset-0 z-60 md:hidden flex flex-col justify-end bg-black/70 backdrop-blur-xs animate-fade-in">
					{/* Backdrop tap to dismiss */}
					<button
						type="button"
						aria-label="Close actions drawer"
						className="flex-1 w-full cursor-default"
						onClick={() => setIsDrawerOpen(false)}
					/>

					{/* Action Sheet Container */}
					<div className="bg-white dark:bg-[#121420] border-t-2 border-brass rounded-t-2xl shadow-[0_-12px_40px_rgba(15,23,42,0.2)] dark:shadow-[0_-12px_40px_rgba(0,0,0,0.8)] max-h-[85vh] flex flex-col overflow-hidden animate-sheet-slide-up">
						{/* Sheet Header */}
						<div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-black/40">
							<div className="flex items-center gap-2">
								<span className="w-5 h-5 rounded-full border border-brass flex items-center justify-center text-brass font-serif font-bold text-xs leading-none">
									§
								</span>
								<h3 className="font-serif font-black text-xs uppercase tracking-widest text-brass">
									Command Console
								</h3>
							</div>
							<button
								type="button"
								onClick={() => setIsDrawerOpen(false)}
								className="p-1.5 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg bg-slate-200/70 dark:bg-white/5 active:scale-95 transition-all cursor-pointer"
								aria-label="Close actions"
							>
								<XIcon weight="bold" className="w-4 h-4" />
							</button>
						</div>

						{/* Sheet Body: Contextual Actions */}
						<div className="p-4 space-y-3 overflow-y-auto">
							{/* ========================================================= */}
							{/* EDITOR CONTEXT                                            */}
							{/* ========================================================= */}
							{isEditorActive && (
								<>
									{isFileLoaded ? (
										<>
											{/* Status Tag */}
											<div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/10 text-xs font-mono">
												<span className="text-slate-500 dark:text-slate-400 uppercase tracking-wider">Active File:</span>
												<span className="font-bold text-brass truncate max-w-[200px]">
													{activeFilename || "Loaded Save"}
												</span>
											</div>

											{/* Primary Review & Export */}
											<button
												type="button"
												onClick={() => {
													setIsDrawerOpen(false);
													setIsDiffDrawerOpen(true);
												}}
												disabled={hasErrors}
												className={`w-full flex items-center justify-between p-3.5 rounded-xl font-serif text-sm font-black uppercase tracking-wider transition-colors cursor-pointer border ${
													hasErrors
														? "bg-slate-800 text-slate-500 border-slate-700 opacity-60 cursor-not-allowed"
														: "bg-brass text-slate-950 border-brass-light shadow-[0_3px_0_0_#684b06] active:translate-y-0.5"
												}`}
											>
												<span className="flex items-center gap-2.5">
													<FileArrowDownIcon weight="bold" className="w-5 h-5" />
													<span>Review & Export Save</span>
												</span>
												<span className="text-[11px] font-mono">
													{hasErrors ? "Fix Issues" : modifiedEntries.length > 0 ? `${modifiedEntries.length} unsaved` : "Ready"}
												</span>
											</button>

											{/* Category Sections Jumper */}
											{onOpenSections && (
												<button
													type="button"
													onClick={() => {
														setIsDrawerOpen(false);
														onOpenSections();
													}}
													className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 active:scale-98 transition-transform cursor-pointer"
												>
													<span className="flex items-center gap-2.5 text-xs font-serif font-bold uppercase tracking-wider">
														<RowsIcon weight="bold" className="w-5 h-5 text-brass" />
														<span>Jump to Section</span>
													</span>
													<span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase">Browse</span>
												</button>
											)}

											{/* Preset Archives Trigger */}
											{onOpenPresets && (
												<button
													type="button"
													onClick={() => {
														setIsDrawerOpen(false);
														onOpenPresets();
													}}
													className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 active:scale-98 transition-transform cursor-pointer"
												>
													<span className="flex items-center gap-2.5 text-xs font-serif font-bold uppercase tracking-wider">
														<SparkleIcon weight="bold" className="w-5 h-5 text-amber-500 dark:text-amber-400" />
														<span>Story Presets</span>
													</span>
													<span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase">Presets</span>
												</button>
											)}

											{/* Reset Values */}
											{onReset && (
												<button
													type="button"
													onClick={() => {
														setIsDrawerOpen(false);
														onReset();
													}}
													className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 active:scale-98 transition-transform cursor-pointer"
												>
													<span className="flex items-center gap-2.5 text-xs font-serif font-bold uppercase tracking-wider">
														<ArrowCounterClockwiseIcon weight="bold" className="w-5 h-5 text-slate-500 dark:text-slate-400" />
														<span>Revert All Changes</span>
													</span>
													<span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase">Reset</span>
												</button>
											)}
										</>
									) : (
										<>
											{/* Stationary / Unloaded State */}
											{onUploadClick && (
												<button
													type="button"
													onClick={() => {
														setIsDrawerOpen(false);
														onUploadClick();
													}}
													className="w-full flex items-center justify-between p-3.5 rounded-xl bg-brass text-slate-950 font-serif text-sm font-black uppercase tracking-wider shadow-md active:scale-98 cursor-pointer"
												>
													<span className="flex items-center gap-2.5">
														<FileArrowUpIcon weight="bold" className="w-5 h-5" />
														<span>Upload Save File</span>
													</span>
													<span className="text-[11px] font-mono">Select</span>
												</button>
											)}

											<button
												type="button"
												onClick={() => {
													setIsDrawerOpen(false);
													loadSampleSave();
												}}
												disabled={isLoadingSample}
												className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-brass/50 text-brass active:scale-98 transition-all cursor-pointer"
											>
												<span className="flex items-center gap-2.5 text-xs font-serif font-bold uppercase tracking-wider">
													<ShieldCheckIcon weight="bold" className="w-5 h-5" />
													<span>{isLoadingSample ? "Checking Save..." : "Try Sample Save (Rizia, Turn 11)"}</span>
												</span>
												<span className="text-[10px] font-mono text-slate-400 uppercase">Demo</span>
											</button>
										</>
									)}

									{/* Help / Location Guide */}
									{onShowHelp && (
										<button
											type="button"
											onClick={() => {
												setIsDrawerOpen(false);
												onShowHelp();
											}}
											className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-white/10 text-slate-300 active:scale-98 transition-all cursor-pointer"
										>
											<span className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider">
												<QuestionIcon weight="bold" className="w-4 h-4 text-slate-400" />
												<span>Where are Suzerain save files located?</span>
											</span>
											<span className="text-[10px] font-mono text-slate-400">Help</span>
										</button>
									)}
								</>
							)}

							{/* ========================================================= */}
							{/* DOSSIERS / ACHIEVEMENTS CONTEXT                            */}
							{/* ========================================================= */}
							{isDossierActive && (
								<>
									<div className="space-y-1.5">
										<span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 block px-1">
											View
										</span>
										<div className="grid grid-cols-3 gap-2">
											<button
												type="button"
												onClick={() => {
													onSelectAchievementsTab?.("guides");
													setIsDrawerOpen(false);
												}}
												className={`flex items-center justify-center gap-1.5 p-3 rounded-xl font-serif text-xs font-bold uppercase tracking-wider border transition-colors cursor-pointer ${
													activeAchievementsTab === "guides"
														? "bg-brass text-slate-950 border-brass-light font-black"
														: "bg-slate-100 text-slate-700 border-slate-200 dark:bg-white/5 dark:text-slate-300 dark:border-white/10 hover:border-brass/40"
												}`}
											>
												<ListDashesIcon weight="bold" className="w-4 h-4 shrink-0" />
												<span>Guides</span>
											</button>
											<button
												type="button"
												onClick={() => {
													onSelectAchievementsTab?.("gallery");
													setIsDrawerOpen(false);
												}}
												className={`flex items-center justify-center gap-1.5 p-3 rounded-xl font-serif text-xs font-bold uppercase tracking-wider border transition-colors cursor-pointer ${
													activeAchievementsTab === "gallery"
														? "bg-brass text-slate-950 border-brass-light font-black"
														: "bg-slate-100 text-slate-700 border-slate-200 dark:bg-white/5 dark:text-slate-300 dark:border-white/10 hover:border-brass/40"
												}`}
											>
												<GridFourIcon weight="bold" className="w-4 h-4 shrink-0" />
												<span>All (220)</span>
											</button>
											<button
												type="button"
												onClick={() => {
													onSelectAchievementsTab?.("walkthrough");
													setIsDrawerOpen(false);
												}}
												className={`flex items-center justify-center gap-1.5 p-3 rounded-xl font-serif text-xs font-bold uppercase tracking-wider border transition-colors cursor-pointer ${
													activeAchievementsTab === "walkthrough"
														? "bg-brass text-slate-950 border-brass-light font-black"
														: "bg-slate-100 text-slate-700 border-slate-200 dark:bg-white/5 dark:text-slate-300 dark:border-white/10 hover:border-brass/40"
												}`}
											>
												<CompassIcon weight="bold" className="w-4 h-4 shrink-0" />
												<span>Scenes</span>
											</button>
										</div>
									</div>

									{/* Sample Save Audit Action */}
									{!isFileLoaded ? (
										<button
											type="button"
											onClick={() => {
												setIsDrawerOpen(false);
												loadSampleSave();
											}}
											disabled={isLoadingSample}
											className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-brass/50 text-brass active:scale-98 transition-transform cursor-pointer"
										>
											<span className="flex items-center gap-2.5 text-xs font-serif font-bold uppercase tracking-wider">
												<ShieldCheckIcon weight="bold" className="w-5 h-5" />
												<span>{isLoadingSample ? "Checking Save..." : "Try Sample Save"}</span>
											</span>
											<span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase">Demo</span>
										</button>
									) : (
										<div className="flex items-center justify-between p-3 rounded-xl bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/10 text-xs font-mono">
											<span className="text-slate-500 dark:text-slate-400">Active Save:</span>
											<span className="font-bold text-brass truncate max-w-[180px]">
												{auditSummary?.campaignName || "Active Run"} (Turn {auditSummary?.turnNo ?? 0})
											</span>
										</div>
									)}
								</>
							)}

							{/* ========================================================= */}
							{/* PLANNER CONTEXT                                           */}
							{/* ========================================================= */}
							{isPlannerActive && (
								<>
									{/* Compute Action */}
									<button
										type="button"
										onClick={() => {
											setIsDrawerOpen(false);
											onCompute?.();
										}}
										disabled={!canCompute}
										className={`w-full flex items-center justify-between p-3.5 rounded-xl font-serif text-sm font-black uppercase tracking-wider transition-all cursor-pointer border ${
											canCompute
												? "bg-brass text-slate-950 border-brass-light shadow-[0_3px_0_0_#684b06] active:translate-y-0.5"
												: "bg-slate-800 text-slate-500 border-slate-700 opacity-60 cursor-not-allowed"
										}`}
									>
										<span className="flex items-center gap-2.5">
											<MagicWandIcon weight="bold" className="w-5 h-5" />
											<span>Build Playthrough Plan</span>
										</span>
										<span className="text-[11px] font-mono">
											{selectedCount} Selected
										</span>
									</button>

									{/* Share Selection */}
									{onSharePlanner && (
										<button
											type="button"
											onClick={() => {
												onSharePlanner();
											}}
											className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-white/10 text-slate-200 active:scale-98 transition-all cursor-pointer"
										>
											<span className="flex items-center gap-2.5 text-xs font-serif font-bold uppercase tracking-wider">
												{isPlannerCopied ? (
													<CheckIcon weight="bold" className="w-5 h-5 text-emerald-400" />
												) : (
													<ShareNetworkIcon weight="bold" className="w-5 h-5 text-brass" />
												)}
												<span>{isPlannerCopied ? "Link Copied to Clipboard!" : "Copy Share Link"}</span>
											</span>
											<span className="text-[10px] font-mono text-slate-400 uppercase">Share</span>
										</button>
									)}

									{/* Clear Selection */}
									{onClearPlanner && selectedCount > 0 && (
										<button
											type="button"
											onClick={() => {
												setIsDrawerOpen(false);
												onClearPlanner();
											}}
											className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-white/10 text-slate-300 active:scale-98 transition-all cursor-pointer"
										>
											<span className="flex items-center gap-2.5 text-xs font-serif font-bold uppercase tracking-wider">
												<TrashIcon weight="bold" className="w-5 h-5 text-red-400" />
												<span>Clear All Selections</span>
											</span>
											<span className="text-[10px] font-mono text-slate-400 uppercase">Reset</span>
										</button>
									)}
								</>
							)}

							{/* ========================================================= */}
							{/* GLOBAL UTILITIES: CHANGES, DEV MODE & THEME               */}
							{/* ========================================================= */}
							{isFileLoaded && modifiedEntries.length > 0 && (
								<button
									type="button"
									onClick={() => {
										setIsDrawerOpen(false);
										setIsDiffDrawerOpen(true);
									}}
									className="w-full flex items-center justify-between p-3 rounded-xl bg-amber-500/15 border border-amber-400/40 text-amber-300 cursor-pointer"
								>
									<span className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider">
										<PencilSimpleLineIcon weight="bold" className="w-4 h-4" />
										<span>Changes ({modifiedEntries.length})</span>
									</span>
									<span className="text-[10px] font-mono uppercase">Review</span>
								</button>
							)}

							<div className="flex items-center justify-between p-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
								<div className="flex items-center gap-2.5">
									<CodeIcon weight="bold" className="w-5 h-5 text-brass" />
									<span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
										Developer Mode
									</span>
								</div>
								<button
									type="button"
									onClick={toggleTechnicalKeys}
									className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer ${
										showTechnicalKeys
											? "bg-brass text-slate-950"
											: "bg-slate-200 hover:bg-slate-300 text-slate-800 dark:bg-white/10 dark:hover:bg-white/20 dark:text-white"
									}`}
								>
									{showTechnicalKeys ? "ON" : "OFF"}
								</button>
							</div>

							<div className="flex items-center justify-between p-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
								<div className="flex items-center gap-2.5">
									{theme === "light" ? (
										<SunDimIcon weight="bold" className="w-5 h-5 text-amber-500" />
									) : (
										<MoonIcon weight="bold" className="w-5 h-5 text-brass" />
									)}
									<span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
										Theme: {theme === "light" ? "Light Mode" : "Dark Mode"}
									</span>
								</div>
								<button
									type="button"
									onClick={toggleTheme}
									className="px-3 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 dark:bg-white/10 dark:hover:bg-white/20 text-xs font-mono font-bold uppercase tracking-wider dark:text-white transition-colors cursor-pointer active:scale-95"
								>
									Switch
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
});
