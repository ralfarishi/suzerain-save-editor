import { AppleLogoIcon, LinuxLogoIcon, WindowsLogoIcon, XIcon } from "@phosphor-icons/react";

interface SaveLocationInfoProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function SaveLocationInfo({ isOpen, onClose }: SaveLocationInfoProps) {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-70 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm touch-none overscroll-none animate-in fade-in duration-200">
			<div className="bg-slate-900 dark:bg-black rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] md:max-h-none flex flex-col border-4 border-brass overflow-hidden bg-noise relative text-slate-100 animate-in zoom-in-95 duration-200">
				{/* Top Brass Accent Line */}
				<div className="absolute top-0 left-0 w-full h-1.5 bg-brass opacity-90" />

				{/* Header */}
				<div className="flex items-center justify-between p-4 sm:p-5 border-b-2 border-white/10 mt-1 shrink-0">
					<h3 className="text-base sm:text-xl font-serif font-black uppercase tracking-widest text-white">
						Where to Find Your Save File
					</h3>
					<button
						type="button"
						aria-label="Close modal"
						onClick={onClose}
						className="p-1.5 hover:bg-white/10 transition-colors text-slate-400 hover:text-white rounded-lg cursor-pointer"
					>
						<XIcon className="w-5 h-5 sm:w-6 sm:h-6" />
					</button>
				</div>

				{/* Body Content */}
				<div className="p-4 sm:p-5 space-y-3 sm:space-y-4 overflow-y-auto md:overflow-y-visible flex-1 text-slate-200">
					<p className="font-serif text-sm sm:text-base leading-relaxed opacity-90">
						Your Suzerain save file is a{" "}
						<code className="px-2 py-0.5 bg-black/60 text-brass font-mono text-xs sm:text-sm border border-brass/40 font-bold rounded">
							.json
						</code>{" "}
						file (e.g. <span className="font-mono text-xs text-brass">Active_date_time.json</span>). You can find it in your operating system folder:
					</p>

					<div className="space-y-3 sm:space-y-4 font-mono text-xs sm:text-sm">
						{/* Windows */}
						<div className="p-3 sm:p-4 bg-slate-800/80 border-2 border-white/10 rounded-lg shadow-inner">
							<div className="flex items-center gap-2 mb-2 font-bold text-white uppercase tracking-wider">
								<WindowsLogoIcon className="w-4 h-4 sm:w-5 sm:h-5 text-brass" />
								<span>Windows</span>
							</div>
							<code className="block p-2.5 sm:p-3 bg-black/60 text-slate-300 break-all select-all border border-dashed border-white/10 rounded">
								%AppData%\..\LocalLow\Torpor Games\Suzerain\
							</code>
						</div>

						{/* macOS */}
						<div className="p-3 sm:p-4 bg-slate-800/80 border-2 border-white/10 rounded-lg shadow-inner">
							<div className="flex items-center gap-2 mb-2 font-bold text-white uppercase tracking-wider">
								<AppleLogoIcon className="w-4 h-4 sm:w-5 sm:h-5 text-brass" />
								<span>macOS</span>
							</div>
							<code className="block p-2.5 sm:p-3 bg-black/60 text-slate-300 break-all select-all border border-dashed border-white/10 rounded">
								~/Library/Application Support/Torpor Games/Suzerain/
							</code>
						</div>

						{/* Linux */}
						<div className="p-3 sm:p-4 bg-slate-800/80 border-2 border-white/10 rounded-lg shadow-inner">
							<div className="flex items-center gap-2 mb-2 font-bold text-white uppercase tracking-wider">
								<LinuxLogoIcon className="w-4 h-4 sm:w-5 sm:h-5 text-brass" />
								<span>Linux</span>
							</div>
							<code className="block p-2.5 sm:p-3 bg-black/60 text-slate-300 break-all select-all border border-dashed border-white/10 rounded">
								~/.config/unity3d/Torpor Games/Suzerain/
							</code>
						</div>
					</div>
				</div>

				{/* Footer */}
				<div className="p-4 sm:p-6 border-t-2 border-dashed border-white/10 bg-black/40 flex justify-end shrink-0">
					<button
						type="button"
						onClick={onClose}
						className="px-5 sm:px-6 py-2 sm:py-2.5 bg-brass hover:bg-brass-light text-slate-900 font-serif font-bold uppercase tracking-widest text-xs border-2 border-brass-light rounded-lg shadow-[0_3px_0_0_#684b06] active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
					>
						Got It
					</button>
				</div>
			</div>
		</div>
	);
}
