import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { ThemeSwitcher } from "../ThemeSwitcher";
import {
	CodeIcon,
	FileArrowDownIcon,
	GithubLogoIcon,
	MagicWandIcon,
	MagnifyingGlassIcon,
	TrophyIcon,
	SlidersHorizontalIcon,
	DotsThreeVerticalIcon,
	ArrowCounterClockwiseIcon,
	XCircleIcon,
} from "@phosphor-icons/react";
import { useSave } from "../../context/SaveContext";

interface AppHeaderProps {
	onOpenQuickSearch: () => void;
}

function formatCampaignName(raw: string | undefined): string {
	if (!raw) return "Active Save";
	if (raw === "StoryPack_Main") return "Sordland";
	if (raw === "StoryPack_Rizia") return "Rizia";
	return raw;
}

export function AppHeader({ onOpenQuickSearch }: AppHeaderProps) {
	const location = useLocation();
	const pathname = location.pathname;
	const {
		fileLoaded,
		auditSummary,
		showTechnicalKeys,
		toggleTechnicalKeys,
		modifiedEntries,
		hasValidationErrors,
		setIsDiffDrawerOpen,
		revertAllChanges,
		unloadSave,
	} = useSave();

	const [menuOpen, setMenuOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!menuOpen) return;
		const handleClickOutside = (e: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
				setMenuOpen(false);
			}
		};
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape") setMenuOpen(false);
		};
		document.addEventListener("mousedown", handleClickOutside);
		window.addEventListener("keydown", handleEscape);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			window.removeEventListener("keydown", handleEscape);
		};
	}, [menuOpen]);

	const isEditorActive = pathname === "/" || pathname === "";
	const isAchievementsActive = pathname.startsWith("/achievements");
	const isPlannerActive = pathname.startsWith("/planner");

	const unsavedCount = modifiedEntries.length;

	return (
		<header className="hidden md:block bg-slate-900 dark:bg-black border-b-4 border-brass sticky top-0 z-50 shadow-md">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
				{/* Left: Brand & Concise Single-Line Nav */}
				<div className="flex items-center gap-6 min-w-0">
					<Link
						to="/"
						className="flex items-center gap-2.5 shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass rounded-lg px-1"
					>
						<div className="w-7 h-7 rounded-full border-2 border-brass flex items-center justify-center shrink-0">
							<span className="text-brass font-serif font-bold text-base leading-none">§</span>
						</div>
						<span className="text-base lg:text-lg font-serif font-black uppercase tracking-widest text-white group-hover:text-brass transition-colors whitespace-nowrap">
							Suzerain
						</span>
					</Link>

					<nav aria-label="Primary Navigation" className="flex items-center gap-1">
						<Link
							to="/"
							className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass ${
								isEditorActive
									? "bg-brass/15 text-brass border border-brass/40"
									: "text-slate-300 hover:text-white hover:bg-white/5 border border-transparent"
							}`}
						>
							<SlidersHorizontalIcon weight={isEditorActive ? "bold" : "regular"} className="w-3.5 h-3.5 shrink-0" />
							<span>Editor</span>
						</Link>
						<Link
							to="/achievements"
							className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass ${
								isAchievementsActive
									? "bg-brass/15 text-brass border border-brass/40"
									: "text-slate-300 hover:text-white hover:bg-white/5 border border-transparent"
							}`}
						>
							<TrophyIcon weight={isAchievementsActive ? "bold" : "regular"} className="w-3.5 h-3.5 shrink-0" />
							<span>Guides & Achievements</span>
						</Link>
						<Link
							to="/planner"
							className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass ${
								isPlannerActive
									? "bg-brass/15 text-brass border border-brass/40"
									: "text-slate-300 hover:text-white hover:bg-white/5 border border-transparent"
							}`}
						>
							<MagicWandIcon weight={isPlannerActive ? "bold" : "regular"} className="w-3.5 h-3.5 shrink-0" />
							<span>Planner</span>
						</Link>
					</nav>
				</div>

				{/* Right: Search, Primary Save CTA, Theme & Utility Menu */}
				<div className="flex items-center gap-2 shrink-0">
					<button
						type="button"
						onClick={onOpenQuickSearch}
						className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-800 border border-white/10 text-xs text-slate-300 hover:text-white transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass"
						title="Quick Search (Ctrl+K)"
					>
						<MagnifyingGlassIcon className="w-3.5 h-3.5 text-brass shrink-0" />
						<span className="hidden lg:inline font-medium">Search</span>
						<kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-black/50 border border-white/10 rounded text-slate-400">
							Ctrl+K
						</kbd>
					</button>

					{fileLoaded && (
						<button
							type="button"
							onClick={() => setIsDiffDrawerOpen(true)}
							title={hasValidationErrors ? "Fix validation errors before exporting" : "Review & Export Save"}
							className={`inline-flex items-center gap-2 px-3.5 py-1.5 font-bold uppercase tracking-wider text-xs border rounded-lg whitespace-nowrap transition-transform cursor-pointer hover-tactile focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass ${
								hasValidationErrors
									? "bg-red-600 hover:bg-red-500 text-white border-red-500"
									: "bg-brass hover:bg-brass-light text-slate-950 border-brass"
							}`}
						>
							<FileArrowDownIcon weight="bold" className="w-4 h-4 shrink-0" />
							<span>{hasValidationErrors ? "Fix Errors" : "Export"}</span>
							{unsavedCount > 0 && (
								<span className="px-1.5 py-0.2 rounded-full bg-slate-950 text-brass text-[10px] font-mono font-bold">
									{unsavedCount}
								</span>
							)}
						</button>
					)}

					<ThemeSwitcher />

					{/* Overflow Menu for Save Info, Dev Mode & Links */}
					<div className="relative" ref={menuRef}>
						<button
							type="button"
							onClick={() => setMenuOpen((p) => !p)}
							aria-expanded={menuOpen}
							aria-label="More options"
							className={`p-2 rounded-lg border transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass ${
								menuOpen || showTechnicalKeys
									? "bg-white/10 border-brass/50 text-brass"
									: "bg-transparent border-white/10 text-slate-300 hover:text-white hover:bg-white/10"
							}`}
						>
							<DotsThreeVerticalIcon weight="bold" className="w-4 h-4" />
						</button>

						{menuOpen && (
							<div className="absolute right-0 mt-2 w-64 rounded-xl bg-slate-900 border border-white/15 shadow-2xl py-2 z-60 animate-fade-in">
								{fileLoaded && (
									<div className="px-3.5 py-2 border-b border-white/10 space-y-2">
										<div className="flex items-center gap-2 text-xs text-slate-200">
											<span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
											<span className="font-semibold truncate">
												{formatCampaignName(auditSummary?.campaignName || auditSummary?.storyPack)} · Turn {auditSummary?.turnNo ?? 0}
											</span>
										</div>
										<div className="flex items-center gap-1.5">
											{unsavedCount > 0 && (
												<button
													type="button"
													onClick={() => {
														revertAllChanges();
														setMenuOpen(false);
													}}
													className="flex-1 inline-flex items-center justify-center gap-1 px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-[11px] font-semibold text-amber-300 cursor-pointer"
												>
													<ArrowCounterClockwiseIcon className="w-3.5 h-3.5" />
													<span>Revert All</span>
												</button>
											)}
											<button
												type="button"
												onClick={() => {
													unloadSave();
													setMenuOpen(false);
												}}
												className="flex-1 inline-flex items-center justify-center gap-1 px-2 py-1 rounded bg-white/5 hover:bg-red-500/20 text-[11px] font-semibold text-slate-300 hover:text-red-300 cursor-pointer"
											>
												<XCircleIcon className="w-3.5 h-3.5" />
												<span>Close Save</span>
											</button>
										</div>
									</div>
								)}

								<button
									type="button"
									onClick={toggleTechnicalKeys}
									className="w-full px-3.5 py-2.5 flex items-center justify-between text-xs text-slate-200 hover:bg-white/5 transition-colors cursor-pointer"
								>
									<span className="inline-flex items-center gap-2 font-medium">
										<CodeIcon className="w-4 h-4 text-brass" />
										<span>Developer Mode</span>
									</span>
									<span
										className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
											showTechnicalKeys
												? "bg-brass text-slate-950"
												: "bg-white/10 text-slate-400"
										}`}
									>
										{showTechnicalKeys ? "On" : "Off"}
									</span>
								</button>

								<a
									href="https://github.com/ralfarishi/suzerain-save-editor"
									target="_blank"
									rel="noopener noreferrer"
									className="w-full px-3.5 py-2.5 flex items-center gap-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
								>
									<GithubLogoIcon className="w-4 h-4 text-slate-400" />
									<span>View on GitHub</span>
								</a>
							</div>
						)}
					</div>
				</div>
			</div>
		</header>
	);
}
