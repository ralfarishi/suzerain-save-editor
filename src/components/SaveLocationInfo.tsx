import { useState, useRef, useEffect } from "react";
import { AppleLogoIcon, LinuxLogoIcon, WindowsLogoIcon, XIcon, CopyIcon, CheckIcon } from "@phosphor-icons/react";
import { useDialogBehavior } from "../hooks/useDialogBehavior";

interface SaveLocationInfoProps {
	isOpen: boolean;
	onClose: () => void;
}

type OsTab = "windows" | "mac" | "linux";

const OS_ITEMS: Array<{ id: OsTab; label: string; path: string; note?: string }> = [
	{
		id: "windows",
		label: "Windows",
		path: "%AppData%\\..\\LocalLow\\Torpor Games\\Suzerain\\",
	},
	{
		id: "mac",
		label: "macOS",
		path: "~/Library/Application Support/Torpor Games/Suzerain/",
	},
	{
		id: "linux",
		label: "Linux / Steam Deck",
		path: "~/.local/share/Steam/steamapps/compatdata/1207650/pfx/drive_c/users/steamuser/AppData/LocalLow/Torpor Games/Suzerain/",
		note: "Native Linux: ~/.config/unity3d/Torpor Games/Suzerain/",
	},
];

export default function SaveLocationInfo({ isOpen, onClose }: SaveLocationInfoProps) {
	const [activeOs, setActiveOs] = useState<OsTab>("windows");
	const [copied, setCopied] = useState(false);
	const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useDialogBehavior(isOpen, onClose);

	useEffect(() => {
		return () => {
			if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
		};
	}, []);

	if (!isOpen) return null;

	const currentItem = OS_ITEMS.find((i) => i.id === activeOs) ?? OS_ITEMS[0];

	const handleCopy = () => {
		navigator.clipboard?.writeText(currentItem.path).then(() => {
			setCopied(true);
			if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
			copyTimerRef.current = setTimeout(() => {
				setCopied(false);
				copyTimerRef.current = null;
			}, 1800);
		});
	};

	return (
		<div
			className="fixed inset-0 z-70 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs touch-none overscroll-none animate-fade-in"
			onClick={onClose}
			role="dialog"
			aria-modal="true"
			aria-label="Where to Find Your Save File"
		>
			<div
				className="bg-white dark:bg-warm-surface-dark rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col border-2 border-brass overflow-hidden relative text-slate-900 dark:text-slate-100 animate-zoom-in-95"
				onClick={(e) => e.stopPropagation()}
			>
				{/* Header */}
				<div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-200 dark:border-white/10 shrink-0">
					<h3 className="text-base sm:text-xl font-serif font-black uppercase tracking-widest text-slate-900 dark:text-white">
						Where to Find Your Save File
					</h3>
					<button
						type="button"
						aria-label="Close modal"
						onClick={onClose}
						className="p-1.5 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass"
					>
						<XIcon className="w-5 h-5 sm:w-6 sm:h-6" />
					</button>
				</div>

				{/* Body Content */}
				<div className="p-4 sm:p-5 space-y-4 overflow-y-auto flex-1 text-slate-700 dark:text-slate-200">
					<p className="text-sm sm:text-base leading-relaxed">
						Your Suzerain save file is a{" "}
						<code className="px-1.5 py-0.5 bg-slate-100 dark:bg-black/60 text-brass font-mono text-xs sm:text-sm border border-brass/40 font-bold rounded">
							.json
						</code>{" "}
						file (e.g. <span className="font-mono text-xs text-brass font-bold">Active_date_time.json</span>). Select your platform below to copy the folder path:
					</p>

					{/* OS Tabs */}
					<div className="flex flex-wrap gap-2">
						<button
							type="button"
							onClick={() => setActiveOs("windows")}
							className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors ${
								activeOs === "windows"
									? "bg-brass text-slate-950"
									: "bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10"
							}`}
						>
							<WindowsLogoIcon className="w-4 h-4" />
							<span>Windows</span>
						</button>
						<button
							type="button"
							onClick={() => setActiveOs("mac")}
							className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors ${
								activeOs === "mac"
									? "bg-brass text-slate-950"
									: "bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10"
							}`}
						>
							<AppleLogoIcon className="w-4 h-4" />
							<span>macOS</span>
						</button>
						<button
							type="button"
							onClick={() => setActiveOs("linux")}
							className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors ${
								activeOs === "linux"
									? "bg-brass text-slate-950"
									: "bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10"
							}`}
						>
							<LinuxLogoIcon className="w-4 h-4" />
							<span>Linux / Steam Deck</span>
						</button>
					</div>

					{/* Active Path Box */}
					<div className="p-4 bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl space-y-2.5">
						<div className="flex items-center justify-between gap-2">
							<span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
								{currentItem.label}
							</span>
							<button
								type="button"
								onClick={handleCopy}
								className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white dark:bg-white/10 border border-slate-300 dark:border-white/15 text-xs font-semibold text-slate-800 dark:text-white hover:border-brass cursor-pointer transition-colors"
							>
								{copied ? (
									<>
										<CheckIcon className="w-3.5 h-3.5 text-emerald-500" weight="bold" />
										<span>Copied!</span>
									</>
								) : (
									<>
										<CopyIcon className="w-3.5 h-3.5 text-brass" />
										<span>Copy Path</span>
									</>
								)}
							</button>
						</div>
						<code className="block p-3 bg-white dark:bg-black/60 text-slate-800 dark:text-slate-200 text-xs font-mono break-all select-all border border-slate-200 dark:border-white/10 rounded-lg">
							{currentItem.path}
						</code>
						{currentItem.note && (
							<p className="text-xs font-mono text-slate-500 dark:text-slate-400 break-all">
								{currentItem.note}
							</p>
						)}
					</div>
				</div>

				{/* Footer */}
				<div className="p-4 sm:p-5 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-black/40 flex justify-end shrink-0">
					<button
						type="button"
						onClick={onClose}
						className="px-5 py-2 bg-brass hover:bg-brass-light text-slate-950 font-bold uppercase tracking-widest text-xs rounded-lg transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass"
					>
						Got It
					</button>
				</div>
			</div>
		</div>
	);
}
