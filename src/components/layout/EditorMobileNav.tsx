import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ThemeNavButton } from "../ThemeSwitcher";
import {
	ArrowCounterClockwiseIcon,
	FileArrowDownIcon,
	TrophyIcon,
	RowsIcon,
	FileArrowUpIcon,
	QuestionIcon,
	MagicWandIcon,
} from "@phosphor-icons/react";
import { TabData } from "../../data/types";
import { MobileSectionDrawer } from "./MobileSectionDrawer";

interface EditorMobileNavProps {
	fileLoaded: boolean;
	hasErrors: boolean;
	onReset: () => void;
	onDownload: () => void;
	activeTabId?: string;
	onTabChange?: (tabId: string) => void;
	tabs?: TabData[];
	errorCounts?: Record<string, number>;
	filename?: string;
	onShowHelp?: () => void;
	onUploadClick?: () => void;
}

export function EditorMobileNav({
	fileLoaded,
	hasErrors,
	onReset,
	onDownload,
	activeTabId,
	onTabChange,
	tabs = [],
	errorCounts = {},
	filename = "",
	onShowHelp,
	onUploadClick,
}: EditorMobileNavProps) {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const handleSelectTab = (tabId: string) => {
		if (onTabChange) {
			onTabChange(tabId);
		}
	};

	return (
		<>
			{/* Top Mobile Header Banner */}
			<div className="md:hidden sticky top-0 z-40 bg-slate-900 dark:bg-black border-b-4 border-brass px-4 py-2.5 bg-noise shadow-md flex items-center justify-between">
				<div className="flex items-center gap-2.5">
					<div className="w-6 h-6 rounded-full border-2 border-brass flex items-center justify-center shrink-0">
						<span className="text-brass font-serif font-bold text-xs leading-none">§</span>
					</div>
					<h1 className="text-xs font-serif font-black uppercase tracking-widest text-white">
						Suzerain <span className="text-brass">Registry</span>
					</h1>
				</div>

				{/* Active File / Status Badge */}
				<div className="flex items-center gap-1.5 px-2.5 py-1 bg-black/60 rounded-md border border-white/10 text-[10px] font-mono text-slate-300">
					<span
						className={`w-2 h-2 rounded-full ${
							fileLoaded
								? "bg-green-500 animate-pulse shadow-[0_0_6px_rgba(34,197,94,0.8)]"
								: "bg-slate-500 opacity-50"
						}`}
					/>
					<span className="truncate max-w-[120px] uppercase font-bold tracking-wider">
						{fileLoaded ? filename || "Active Save" : "No File Loaded"}
					</span>
				</div>
			</div>

			{/* Bottom Tactical Switchboard Command Console */}
			<nav className="md:hidden fixed bottom-0 left-0 right-0 z-60 bg-slate-900 dark:bg-black border-t-4 border-brass shadow-[0_-10px_30px_rgba(0,0,0,0.5)] bg-noise">
				{/* Top Accent Brass Line */}
				<div className="h-1 bg-brass w-full" />

				{fileLoaded ? (
					/* ========================================================================= */
					/* ACTIVE SAVE STATE NAVBAR: 5 Switchboard Tactical Actions                  */
					/* ========================================================================= */
					<div className="max-w-lg mx-auto grid grid-cols-6 gap-1 p-2">
						{/* 1. Sections Jumper Drawer */}
						<button
							type="button"
							onClick={() => setIsDrawerOpen(true)}
							className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-slate-800/80 border border-white/10 hover:border-brass/40 active:scale-95 text-slate-200 transition-all cursor-pointer group"
							title="Jump to Category Section"
						>
							<RowsIcon weight="bold" className="w-5 h-5 text-brass mb-0.5 group-active:scale-90" />
							<span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-300">
								Sections
							</span>
						</button>

						{/* 2. Walkthroughs & Guides */}
						<Link
							to="/achievements"
							className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-slate-800/80 border border-white/10 hover:border-brass/40 active:scale-95 text-slate-200 transition-all group"
							title="Walkthroughs & Guides"
						>
							<TrophyIcon weight="duotone" className="w-5 h-5 text-amber-400 mb-0.5 group-active:scale-90" />
							<span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-300">
								Guides
							</span>
						</Link>

						{/* 3. Achievement Planner */}
						<Link
							to="/planner"
							className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-slate-800/80 border border-white/10 hover:border-brass/40 active:scale-95 text-slate-200 transition-all group"
							title="Achievement Planner"
						>
							<MagicWandIcon weight="duotone" className="w-5 h-5 text-brass mb-0.5 group-active:scale-90" />
							<span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-300">
								Planner
							</span>
						</Link>

						{/* 4. Theme Switcher */}
						<ThemeNavButton />

						{/* 5. Reset Save Values */}
						<button
							type="button"
							aria-label="Reset Save"
							onClick={onReset}
							className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-slate-800/80 border border-white/10 hover:border-brass/40 active:scale-95 text-slate-300 transition-all cursor-pointer group"
							title="Reset Tab Values to Initial State"
						>
							<ArrowCounterClockwiseIcon
								weight="bold"
								className="w-5 h-5 text-slate-400 mb-0.5 group-active:rotate-[-45deg] transition-transform"
							/>
							<span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-300">
								Reset
							</span>
						</button>

						{/* 6. Primary Action: Commit & Seal */}
						<button
							type="button"
							onClick={onDownload}
							disabled={hasErrors}
							className={`
								relative flex flex-col items-center justify-center py-2 px-1 rounded-xl border text-slate-900 font-bold transition-all cursor-pointer group overflow-hidden
								${
									hasErrors
										? "bg-slate-800 text-slate-500 border-slate-700 opacity-60 cursor-not-allowed"
										: "bg-brass border-brass-light shadow-[0_3px_0_0_#684b06] active:shadow-none active:translate-y-0.5"
								}
							`}
							title="Seal & Commit Modified Save File"
						>
							<div className="flex items-center gap-1">
								<FileArrowDownIcon weight="bold" className="w-5 h-5 mb-0.5 text-slate-950" />
								<span
									className={`w-1.5 h-1.5 rounded-full ${
										hasErrors
											? "bg-red-500 shadow-[0_0_4px_rgba(239,68,68,0.8)]"
											: "bg-green-950 shadow-[0_0_4px_rgba(34,197,94,0.8)] animate-pulse"
									}`}
								/>
							</div>
							<span className="text-[9px] font-serif font-black uppercase tracking-wider text-slate-950">
								Save
							</span>
						</button>
					</div>
				) : (
					/* ========================================================================= */
					/* NO FILE LOADED (STATIONARY STATE): 4 Meaningful Landing Actions           */
					/* ========================================================================= */
					<div className="max-w-lg mx-auto grid grid-cols-5 gap-1.5 p-2">
						{/* 1. Upload Save File */}
						<button
							type="button"
							onClick={onUploadClick || (() => window.scrollTo({ top: 0, behavior: "smooth" }))}
							className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-brass/20 border-2 border-brass/60 text-brass hover:bg-brass/30 active:scale-95 transition-all cursor-pointer group"
							title="Upload Save File"
						>
							<FileArrowUpIcon weight="bold" className="w-5 h-5 mb-0.5 text-brass group-active:scale-90" />
							<span className="text-[9px] font-mono font-black uppercase tracking-wider text-brass">
								Upload
							</span>
						</button>

						{/* 2. Save Location Help */}
						<button
							type="button"
							onClick={onShowHelp}
							className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-slate-800/80 border border-white/10 hover:border-brass/40 active:scale-95 text-slate-300 transition-all cursor-pointer group"
							title="Where to find save file?"
						>
							<QuestionIcon weight="bold" className="w-5 h-5 text-slate-400 mb-0.5 group-active:scale-90" />
							<span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-300">
								Help
							</span>
						</button>

						{/* 3. Walkthroughs & Guides */}
						<Link
							to="/achievements"
							className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-slate-800/80 border border-white/10 hover:border-brass/40 active:scale-95 text-slate-300 transition-all group"
							title="Walkthroughs & Guides"
						>
							<TrophyIcon weight="duotone" className="w-5 h-5 text-amber-400 mb-0.5 group-active:scale-90" />
							<span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-300">
								Guides
							</span>
						</Link>

						{/* 4. Achievement Planner */}
						<Link
							to="/planner"
							className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-slate-800/80 border border-white/10 hover:border-brass/40 active:scale-95 text-slate-300 transition-all group"
							title="Achievement Planner"
						>
							<MagicWandIcon weight="duotone" className="w-5 h-5 text-brass mb-0.5 group-active:scale-90" />
							<span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-300">
								Planner
							</span>
						</Link>

						{/* 5. Theme Switcher */}
						<ThemeNavButton />
					</div>
				)}

				<div className="h-2 bg-transparent" />
			</nav>

			{/* Slide-Up Category Section Drawer */}
			{fileLoaded && (
				<MobileSectionDrawer
					isOpen={isDrawerOpen}
					onClose={() => setIsDrawerOpen(false)}
					tabs={tabs}
					activeTabId={activeTabId || ""}
					onSelectTab={handleSelectTab}
					errorCounts={errorCounts}
				/>
			)}
		</>
	);
}
