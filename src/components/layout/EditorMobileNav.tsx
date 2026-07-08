import { Link } from "@tanstack/react-router";
import { ThemeSwitcher } from "../ThemeSwitcher";
import { ArrowCounterClockwiseIcon, FileArrowDownIcon, TrophyIcon } from "@phosphor-icons/react";

interface EditorMobileNavProps {
	fileLoaded: boolean;
	hasErrors: boolean;
	onReset: () => void;
	onDownload: () => void;
}

export function EditorMobileNav({ fileLoaded, hasErrors, onReset, onDownload }: EditorMobileNavProps) {
	return (
		<>
			<nav className="md:hidden fixed bottom-0 left-0 right-0 z-60 bg-slate-900 dark:bg-black border-t-4 border-brass shadow-[0_-10px_30px_-5px_rgba(0,0,0,0.3)] bg-noise">
				<div className="relative max-w-lg mx-auto px-4 py-3 flex items-end justify-between gap-4">
					<div className="flex gap-2 p-1 bg-black/40 rounded-xl border border-white/10 shadow-inner">
						<Link
							to="/achievements"
							className="flex items-center justify-center w-11 h-11 bg-slate-800 rounded-lg text-slate-400 border border-white/10 active:scale-95 transition-all group"
							title="Walkthroughs"
						>
							<TrophyIcon
								weight="duotone"
								className="w-5 h-5 group-active:scale-90 transition-transform"
							/>
						</Link>

						<ThemeSwitcher />

						{fileLoaded && (
							<button type="button"
								aria-label="Reset"
								onClick={onReset}
								className="flex items-center justify-center w-11 h-11 bg-slate-800 rounded-lg text-slate-400 border border-white/10 active:scale-95 transition-all group cursor-pointer"
								title="Reset"
							>
								<ArrowCounterClockwiseIcon
									weight="bold"
									className="w-5 h-5 group-active:rotate-[-45deg] transition-transform"
								/>
							</button>
						)}
					</div>

					<div className="hidden min-[380px]:flex flex-col items-center mb-1">
						<div className="w-12 h-1 bg-brass rounded-full mb-1.5 opacity-60"></div>
						<span className="text-[10px] font-black tracking-[0.2em] uppercase opacity-40 text-white italic">
							{fileLoaded ? "Active File" : "Stationary"}
						</span>
					</div>

					<button type="button"
						onClick={fileLoaded ? onDownload : () => {}}
						disabled={fileLoaded && hasErrors}
						className={`
							relative h-14 min-w-[80px] px-6 rounded-xl transition-all flex items-center justify-center gap-3 border-t overflow-hidden group cursor-pointer
							${
								!fileLoaded
									? "bg-slate-800 text-slate-500 border-slate-700 shadow-[0_4px_0_0_rgba(0,0,0,0.2)]"
									: hasErrors
										? "bg-slate-800 text-slate-500 border-slate-700 opacity-60 shadow-none cursor-not-allowed"
										: "bg-brass hover:bg-brass-light text-slate-900 font-bold border-brass-light/30 shadow-[0_4px_0_0_#8B6508] active:shadow-none active:translate-y-1"
							}
						`}
					>
						<div className="absolute inset-0 bg-noise opacity-10 pointer-events-none"></div>

						{fileLoaded ? (
							<>
								<FileArrowDownIcon
									weight="bold"
									className="w-6 h-6 animate-in zoom-in duration-300"
								/>
								<span className="text-xs font-black uppercase tracking-widest">Seal & Commit</span>
							</>
						) : (
							<span className="text-xs font-black tracking-tighter uppercase italic px-2">
								RAYNE
							</span>
						)}

						{hasErrors && fileLoaded && (
							<div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-pulse"></div>
						)}
						{!hasErrors && fileLoaded && (
							<div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)] animate-pulse"></div>
						)}
					</button>
				</div>
				<div className="h-4 bg-transparent"></div>
			</nav>

			<div className="md:hidden flex items-center justify-center py-4 px-6 border-b-4 border-brass bg-slate-900 dark:bg-black bg-noise">
				<h1 className="text-sm font-bold opacity-80 uppercase tracking-[0.2em] text-white">
					Suzerain <span className="font-light text-brass">Registry</span>
				</h1>
			</div>
		</>
	);
}
