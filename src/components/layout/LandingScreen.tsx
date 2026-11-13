import { useState } from "react";
import { Dropzone } from "../Dropzone";
import {
	ShieldCheckIcon,
	CircleNotchIcon,
	CopyIcon,
	CheckIcon,
	WindowsLogoIcon,
	AppleLogoIcon,
	LinuxLogoIcon,
	CaretDownIcon,
	FolderOpenIcon,
} from "@phosphor-icons/react";
import { useSave } from "../../context/SaveContext";

interface LandingScreenProps {
	onFileLoaded: (content: string, name: string) => void;
	onShowHelp: () => void;
}

type OsTab = "windows" | "mac" | "linux";

const SAVE_PATHS: Record<OsTab, { label: string; path: string; note?: string }> = {
	windows: {
		label: "Windows",
		path: "%AppData%\\..\\LocalLow\\Torpor Games\\Suzerain\\",
	},
	mac: {
		label: "Mac",
		path: "~/Library/Application Support/Torpor Games/Suzerain/",
	},
	linux: {
		label: "Deck / Linux",
		path: "~/.local/share/Steam/steamapps/compatdata/1207650/pfx/drive_c/users/steamuser/AppData/LocalLow/Torpor Games/Suzerain/",
		note: "Native Linux: ~/.config/unity3d/Torpor Games/Suzerain/",
	},
};

export function LandingScreen({ onFileLoaded }: LandingScreenProps) {
	const { loadSampleSave, isLoadingSample } = useSave();
	const [showPaths, setShowPaths] = useState(false);
	const [activeOs, setActiveOs] = useState<OsTab>("windows");
	const [copied, setCopied] = useState(false);

	const handleCopyPath = () => {
		const pathToCopy = SAVE_PATHS[activeOs].path;
		navigator.clipboard?.writeText(pathToCopy).then(() => {
			setCopied(true);
			setTimeout(() => setCopied(false), 1800);
		});
	};

	return (
		<div className="animate-tab-fade max-w-2xl mx-auto space-y-6">
			<div className="text-center">
				<h2 className="text-3xl sm:text-4xl font-bold font-serif uppercase tracking-widest mb-2.5 text-slate-900 dark:text-white">
					Suzerain Save Editor
				</h2>
				<p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-lg mx-auto leading-relaxed">
					Load your save file to edit budget, public opinion, decrees, and track achievement progress.
				</p>
			</div>

			{/* Hero Dropzone */}
			<Dropzone onFileLoaded={onFileLoaded} />

			{/* Clean Sample Save Option */}
			<div className="flex flex-col items-center gap-2.5">
				<div className="flex items-center gap-3 w-full max-w-xs">
					<div className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
					<span className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
						or
					</span>
					<div className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
				</div>
				<button
					type="button"
					onClick={loadSampleSave}
					disabled={isLoadingSample}
					className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-300 dark:border-white/15 bg-white dark:bg-warm-surface-dark hover:border-brass dark:hover:border-brass text-slate-800 dark:text-slate-100 font-semibold text-xs tracking-wide transition-colors cursor-pointer disabled:opacity-50 shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass"
				>
					{isLoadingSample ? (
						<>
							<CircleNotchIcon className="w-4 h-4 animate-spin text-brass" />
							<span>Loading sample save...</span>
						</>
					) : (
						<>
							<ShieldCheckIcon className="w-4 h-4 text-brass" weight="bold" />
							<span>Try with Sample Save (Rizia · Turn 11)</span>
						</>
					)}
				</button>
			</div>

			{/* Compact Collapsible Save Path Guide */}
			<div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-warm-surface-dark/70 overflow-hidden">
				<button
					type="button"
					onClick={() => setShowPaths((p) => !p)}
					aria-expanded={showPaths}
					className="w-full px-4 py-3 flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-white/5 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass"
				>
					<span className="inline-flex items-center gap-2">
						<FolderOpenIcon className="w-4 h-4 text-brass" />
						<span>Where do I find my Suzerain save file?</span>
					</span>
					<CaretDownIcon
						className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
							showPaths ? "rotate-0" : "-rotate-90"
						}`}
					/>
				</button>

				{showPaths && (
					<div className="px-4 pb-4 pt-2 border-t border-slate-200 dark:border-white/10 space-y-3 animate-fade-in">
						<div className="flex flex-wrap items-center justify-between gap-2">
							<div className="flex items-center gap-1.5">
								<button
									type="button"
									onClick={() => setActiveOs("windows")}
									className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold cursor-pointer transition-colors ${
										activeOs === "windows"
											? "bg-brass text-slate-950"
											: "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10"
									}`}
								>
									<WindowsLogoIcon className="w-3.5 h-3.5" />
									<span>Windows</span>
								</button>
								<button
									type="button"
									onClick={() => setActiveOs("mac")}
									className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold cursor-pointer transition-colors ${
										activeOs === "mac"
											? "bg-brass text-slate-950"
											: "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10"
									}`}
								>
									<AppleLogoIcon className="w-3.5 h-3.5" />
									<span>Mac</span>
								</button>
								<button
									type="button"
									onClick={() => setActiveOs("linux")}
									className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold cursor-pointer transition-colors ${
										activeOs === "linux"
											? "bg-brass text-slate-950"
											: "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10"
									}`}
								>
									<LinuxLogoIcon className="w-3.5 h-3.5" />
									<span>Deck / Linux</span>
								</button>
							</div>

							<button
								type="button"
								onClick={handleCopyPath}
								className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-slate-300 dark:border-white/15 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-brass transition-colors cursor-pointer"
							>
								{copied ? (
									<>
										<CheckIcon className="w-3.5 h-3.5 text-emerald-500" weight="bold" />
										<span>Copied</span>
									</>
								) : (
									<>
										<CopyIcon className="w-3.5 h-3.5 text-brass" />
										<span>Copy Path</span>
									</>
								)}
							</button>
						</div>

						<code className="block p-2.5 rounded-lg bg-slate-100 dark:bg-black/50 border border-slate-200 dark:border-white/10 text-xs font-mono text-slate-700 dark:text-slate-300 break-all select-all">
							{SAVE_PATHS[activeOs].path}
						</code>
						{SAVE_PATHS[activeOs].note && (
							<p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono break-all">
								{SAVE_PATHS[activeOs].note}
							</p>
						)}
						<p className="text-[11px] text-slate-500 dark:text-slate-400">
							100% client-side — your save never leaves your browser. Always keep a backup of your original <code className="font-mono">.json</code> file.
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
