import { AppleLogoIcon, LinuxLogoIcon, WindowsLogoIcon, XIcon } from "@phosphor-icons/react";

interface SaveLocationInfoProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function SaveLocationInfo({ isOpen, onClose }: SaveLocationInfoProps) {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
			<div className="bg-slate-50 dark:bg-warm-surface-dark rounded shadow-2xl max-w-2xl w-full border-4 border-slate-300 dark:border-white/10 overflow-hidden animate-zoom-in-95 bg-noise relative">
				<div className="absolute top-0 left-0 w-full h-2 bg-brass dark:bg-brass-light opacity-80"></div>
				
				<div className="flex items-center justify-between p-6 border-b-2 border-slate-200 dark:border-white/10 mt-2">
					<h3 className="text-xl font-serif font-black uppercase tracking-widest text-slate-900 dark:text-white">
						Declassified Intel Location
					</h3>
					<button type="button"
						aria-label="Close modal"
						onClick={onClose}
						className="p-1 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors text-slate-500 dark:text-slate-400 cursor-pointer"
					>
						<XIcon className="w-6 h-6" />
					</button>
				</div>

				<div className="p-6 space-y-6">
					<p className="text-slate-700 dark:text-slate-300 font-serif text-lg leading-relaxed">
						Your state save file is typically classified under{" "}
						<code className="px-2 py-1 bg-amber-100 dark:bg-black/30 text-slate-900 dark:text-amber-200 font-mono text-sm border border-amber-200 dark:border-white/10 font-bold">
							Active_date_time.json
						</code>
						. Locate it in the following central registries:
					</p>

					<div className="space-y-4 font-mono text-sm">
						<div className="p-4 bg-white dark:bg-black/20 border-2 border-slate-200 dark:border-white/10 shadow-inner">
							<div className="flex items-center gap-2 mb-2 font-bold text-slate-900 dark:text-white uppercase tracking-wider">
								<WindowsLogoIcon className="w-5 h-5 text-slate-400" />
								<span>Windows Registry</span>
							</div>
							<code className="block p-3 bg-slate-50 dark:bg-black/40 text-slate-600 dark:text-slate-400 break-all select-all border border-dashed border-slate-300 dark:border-white/10">
								%AppData%\..\LocalLow\Torpor Games\Suzerain\
							</code>
						</div>

						<div className="p-4 bg-white dark:bg-black/20 border-2 border-slate-200 dark:border-white/10 shadow-inner">
							<div className="flex items-center gap-2 mb-2 font-bold text-slate-900 dark:text-white uppercase tracking-wider">
								<AppleLogoIcon className="w-5 h-5 text-slate-400" />
								<span>macOS Archive</span>
							</div>
							<code className="block p-3 bg-slate-50 dark:bg-black/40 text-slate-600 dark:text-slate-400 break-all select-all border border-dashed border-slate-300 dark:border-white/10">
								~/Library/Application Support/Torpor Games/Suzerain/
							</code>
						</div>

						<div className="p-4 bg-white dark:bg-black/20 border-2 border-slate-200 dark:border-white/10 shadow-inner">
							<div className="flex items-center gap-2 mb-2 font-bold text-slate-900 dark:text-white uppercase tracking-wider">
								<LinuxLogoIcon className="w-5 h-5 text-slate-400" />
								<span>Linux Subsystem</span>
							</div>
							<code className="block p-3 bg-slate-50 dark:bg-black/40 text-slate-600 dark:text-slate-400 break-all select-all border border-dashed border-slate-300 dark:border-white/10">
								~/.config/unity3d/Torpor Games/Suzerain/
							</code>
						</div>
					</div>
				</div>

				<div className="p-6 border-t-2 border-dashed border-slate-300 dark:border-white/10 bg-slate-100/50 dark:bg-black/20 flex justify-end">
					<button type="button"
						onClick={onClose}
						className="px-6 py-2 bg-brass hover:bg-brass-light text-white dark:text-zinc-950 font-bold uppercase tracking-widest text-xs border-2 border-brass-light shadow-tactile-press hover-tactile cursor-pointer"
					>
						Acknowledged
					</button>
				</div>
			</div>
		</div>
	);
}
