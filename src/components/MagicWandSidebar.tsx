import { useState } from "react";
import { SparkleIcon, XCircleIcon, WarningIcon } from "@phosphor-icons/react";
import { storyPresets } from "../data/presets";
import { FieldValues } from "../utils/save-manager";

interface MagicWandSidebarProps {
	onApplyPreset: (presetValues: Partial<FieldValues>) => void;
	onShowToast: (type: "success" | "error", message: string) => void;
}

export function MagicWandSidebar({ onApplyPreset, onShowToast }: MagicWandSidebarProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [pendingPresetId, setPendingPresetId] = useState<string | null>(null);
	const [bannerPreset, setBannerPreset] = useState<typeof storyPresets[0] | null>(null);

	const handleSelectPreset = (presetId: string) => {
		setPendingPresetId(presetId);
		const preset = storyPresets.find((p) => p.id === presetId);
		if (preset) {
			setBannerPreset(preset);
		}
	};

	const handleConfirmApply = () => {
		const preset = storyPresets.find((p) => p.id === pendingPresetId) || bannerPreset;
		if (!preset) return;
		onApplyPreset(preset.values);
		onShowToast("success", `Applied preset: ${preset.name}`);
		setPendingPresetId(null);
		setIsOpen(false);
	};

	const handleCancelApply = () => {
		setPendingPresetId(null);
	};

	const handleClose = () => {
		setIsOpen(false);
		setPendingPresetId(null);
	};

	return (
		<>
			{/* Magic Wand FAB */}
			<button type="button"
				aria-label="Preset Archives"
				onClick={() => setIsOpen(true)}
				className="fixed right-5 bottom-20 md:bottom-6 p-3.5 sm:p-4 bg-brass hover:bg-brass-light text-slate-900 font-bold rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] border-2 border-brass-light active:shadow-none active:translate-y-1 transition-all z-50 group cursor-pointer"
				title="Preset Archives"
				id="magic-wand-fab"
			>
				<SparkleIcon weight="fill" className="w-6 h-6 text-inherit" />
				<span className="absolute -top-1 -right-1 flex h-4 w-4">
					<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brass-light opacity-75"></span>
					<span className="relative inline-flex rounded-full h-4 w-4 bg-brass border-2 border-white dark:border-warm-surface-dark"></span>
				</span>
			</button>

			{/* Backdrop */}
			{isOpen && (
				<div
					className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm transition-opacity duration-200 touch-none overscroll-none"
					role="presentation"
					onClick={handleClose}
				/>
			)}

			{/* Sidebar Drawer */}
			<div
				className={`fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-warm-surface-dark shadow-[-10px_0_30px_rgba(0,0,0,0.2)] z-60 transform transition-transform duration-200 ease-out border-l-4 border-brass flex flex-col ${
					isOpen ? "translate-x-0" : "translate-x-full"
				}`}
			>
				{/* Header */}
				<div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 shrink-0">
					<div className="flex items-center gap-3">
						<SparkleIcon weight="duotone" className="w-5 h-5 text-slate-400" />
						<h2 className="font-serif font-bold text-lg uppercase tracking-wider text-slate-900 dark:text-white">Preset Archives</h2>
					</div>
					<button type="button"
						aria-label="Close"
						onClick={handleClose}
						className="p-1 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded transition-colors cursor-pointer"
					>
						<XCircleIcon className="w-6 h-6" />
					</button>
				</div>

				{/* Inline Confirm Banner */}
				<div
					className={`accordion-grid shrink-0 ${
						pendingPresetId
							? "accordion-grid-open opacity-100 mt-4 mx-4"
							: "opacity-0 pointer-events-none mx-4 mt-0"
					}`}
				>
					<div className="overflow-hidden">
						{bannerPreset && (
							<div className="p-4 bg-amber-50 dark:bg-amber-950/20 border-2 border-amber-300 dark:border-amber-700/50 shadow-inner rounded-lg">
								<div className="flex items-start gap-2 mb-3">
									<WarningIcon weight="fill" className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
									<div>
										<p className="text-sm font-bold text-slate-900 dark:text-amber-200 uppercase tracking-wider">
											Apply "{bannerPreset.name}"?
										</p>
										<p className="text-xs text-amber-800 dark:text-amber-400 mt-1 leading-relaxed">
											This will override {Object.keys(bannerPreset.values).length} field parameters.
										</p>
										{/* Key Changes Preview */}
										<div className="mt-2 pt-2 border-t border-amber-200 dark:border-amber-800/40 flex flex-wrap gap-1 max-h-24 overflow-y-auto">
											{Object.entries(bannerPreset.values).map(([k, v]) => (
												<span
													key={k}
													className="px-1.5 py-0.5 text-[10px] font-mono bg-amber-100 dark:bg-amber-900/40 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-700/60 rounded"
												>
													<strong className="font-bold">{k}:</strong> {String(v)}
												</span>
											))}
										</div>
									</div>
								</div>
								<div className="flex gap-2 mt-3">
									<button type="button"
										onClick={handleConfirmApply}
										className="flex-1 py-2 text-xs font-bold uppercase tracking-wider text-white dark:text-zinc-950 bg-brass hover:bg-brass-light border-2 border-brass-light shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)] active:shadow-none transition-all cursor-pointer hover-tactile"
									>
										Confirm Apply
									</button>
									<button type="button"
										onClick={handleCancelApply}
										className="flex-1 py-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 border-2 border-slate-300 dark:border-white/10 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.05)] active:shadow-none transition-all cursor-pointer hover-tactile"
									>
										Cancel
									</button>
								</div>
							</div>
						)}
					</div>
				</div>

				{/* Preset List */}
				<div className="flex-1 overflow-y-auto p-6 space-y-4 bg-noise">
					<p className="text-sm text-slate-600 dark:text-slate-400 italic font-serif mb-6">
						Select a classified timeline configuration to override current state parameters.
					</p>

					{storyPresets.map((preset) => (
						<div
							key={preset.id}
							role="button"
							tabIndex={0}
							className={`group border-2 p-4 transition-all cursor-pointer shadow-sm flex flex-col gap-2 rounded-lg ${
								pendingPresetId === preset.id
									? "border-brass bg-amber-50 dark:bg-amber-950/20"
									: "border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 hover:border-brass dark:hover:border-brass-light"
							}`}
							onClick={() => handleSelectPreset(preset.id)}
							onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSelectPreset(preset.id); }}
						>
							<div className="flex items-start gap-4">
								<div className="p-2 rounded bg-slate-50 dark:bg-white/5 group-hover:bg-amber-50 dark:group-hover:bg-amber-950/30 transition-colors shrink-0">
									<SparkleIcon weight="fill" className="w-5 h-5 text-amber-600" />
								</div>
								<div className="flex-1">
									<div className="flex justify-between items-start mb-1">
										<h3 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-sm group-hover:text-brass transition-colors">
											{preset.name}
										</h3>
										<span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 rounded-full border border-slate-200 dark:border-white/10">
											{Object.keys(preset.values).length} parameters
										</span>
									</div>
									<p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
										{preset.description}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
}
