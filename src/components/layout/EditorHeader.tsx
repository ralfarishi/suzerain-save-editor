import { Link } from "@tanstack/react-router";
import { ThemeSwitcher } from "../ThemeSwitcher";
import { ArrowCounterClockwiseIcon, FileArrowDownIcon, GithubLogoIcon } from "@phosphor-icons/react";

interface EditorHeaderProps {
	fileLoaded: boolean;
	filename: string;
	hasErrors: boolean;
	onReset: () => void;
	onDownload: () => void;
}

export function EditorHeader({
	fileLoaded,
	filename,
	hasErrors,
	onReset,
	onDownload,
}: EditorHeaderProps) {
	return (
		<header className="hidden md:block bg-slate-900 dark:bg-black border-b-4 border-brass sticky top-0 z-50 bg-noise shadow-md">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
				<div className="flex items-center gap-4">
					<div className="w-8 h-8 rounded-full border-2 border-brass flex items-center justify-center shrink-0">
						<span className="text-brass font-serif font-bold text-lg leading-none">§</span>
					</div>
					<h1 className="text-xl font-serif font-black uppercase tracking-widest text-white">
						Suzerain <span className="text-brass">Registry</span>
					</h1>
				</div>

				<div className="flex items-center gap-6">
					<Link
						to="/achievements"
						className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-brass transition-colors"
					>
						Walkthroughs
					</Link>
					<a
						href="https://github.com/ralfarishi/suzerain-save-editor"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="View on GitHub"
						className="text-slate-400 hover:text-white transition-colors"
						title="View on GitHub"
					>
						<GithubLogoIcon className="w-5 h-5" />
					</a>
					<div className="w-px h-6 bg-slate-700"></div>
					<ThemeSwitcher />

					{fileLoaded && (
						<>
							<div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-black/50 rounded border border-white/10 text-xs font-mono text-slate-300 shadow-inner">
								<span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
								{filename}
							</div>

							<button type="button"
								aria-label="Reset / Upload New File"
								onClick={onReset}
								className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded transition-colors cursor-pointer"
								title="Reset / Upload New File"
							>
								<ArrowCounterClockwiseIcon className="w-5 h-5" />
							</button>

							<div className="relative group">
								<button type="button"
									onClick={onDownload}
									disabled={hasErrors}
									className={`
										flex items-center gap-2 px-5 py-2 font-bold uppercase tracking-wider text-xs border-2 rounded transition-all cursor-pointer hover-tactile
										${
											hasErrors
												? "bg-slate-800 text-slate-500 border-slate-700 cursor-not-allowed opacity-50"
												: "bg-brass hover:bg-brass-light text-slate-900 border-brass shadow-[2px_2px_0px_0px_#8B6508] active:shadow-none active:translate-y-1"
										}
									`}
								>
									<FileArrowDownIcon weight="bold" className="w-5 h-5" />
									Seal & Commit
								</button>
								{!hasErrors && (
									<div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-600 shadow-sm border-2 border-slate-900 animate-pulse"></div>
								)}
							</div>
						</>
					)}
				</div>
			</div>
		</header>
	);
}
