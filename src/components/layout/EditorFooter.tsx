export function EditorFooter() {
	return (
		<footer className="mt-auto border-t border-slate-200 dark:border-white/10 py-6 bg-slate-100 dark:bg-black/40">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex flex-col md:flex-row justify-between items-center gap-4">
					<div className="flex items-center gap-3">
						<div className="w-6 h-6 rounded-full border border-slate-400 dark:border-white/20 flex items-center justify-center shrink-0">
							<span className="text-slate-500 dark:text-slate-400 font-serif font-bold text-xs leading-none">
								§
							</span>
						</div>
						<p className="text-[11px] uppercase tracking-widest text-slate-500 dark:text-slate-400 font-semibold">
							© {new Date().getFullYear()} Suzerain Save Editor
						</p>
					</div>

					<div className="flex flex-wrap justify-center gap-5">
						<a
							href="https://steamcommunity.com/sharedfiles/filedetails/?id=3341333208"
							target="_blank"
							rel="noopener noreferrer"
							className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-brass dark:hover:text-brass-light transition-colors"
						>
							Steam Guide
						</a>
						<a
							href="https://github.com/stevenhoekerd/Magic-Symon"
							target="_blank"
							rel="noopener noreferrer"
							className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-brass dark:hover:text-brass-light transition-colors"
						>
							Magic-Symon (Data Reference)
						</a>
						<a
							href="https://trolledd.github.io/suzerain/"
							target="_blank"
							rel="noopener noreferrer"
							className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-brass dark:hover:text-brass-light transition-colors"
						>
							Original Save Editor
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}
