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
			<button
				onClick={() => setIsOpen(true)}
				className="fixed right-6 bottom-6 p-4 bg-warm-accent hover:bg-warm-accent-hover text-white dark:text-zinc-950 dark:font-bold rounded-full shadow-lg shadow-warm-accent/30 hover:scale-110 transition-all z-40 group focus:outline-none cursor-pointer"
				title="Story Presets"
				id="magic-wand-fab"
			>
				<SparkleIcon weight="fill" className="w-7 h-7 text-inherit" />
				<span className="absolute -top-1 -right-1 flex h-4 w-4">
					<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-warm-accent/80 opacity-75"></span>
					<span className="relative inline-flex rounded-full h-4 w-4 bg-warm-accent border-2 border-white dark:border-warm-surface-dark"></span>
				</span>
			</button>

			{/* Backdrop */}
			{isOpen && (
				<div
					className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
					onClick={handleClose}
				/>
			)}

			{/* Sidebar Drawer */}
			<div
				className={`fixed top-0 right-0 h-full w-full max-w-md bg-warm-surface-light dark:bg-warm-surface-dark shadow-2xl z-50 transform transition-transform duration-300 ease-in-out border-l border-warm-border-light dark:border-warm-border-dark ${
					isOpen ? "translate-x-0" : "translate-x-full"
				}`}
			>
				<div className="flex flex-col h-full">
					{/* Header */}
					<div className="flex items-center justify-between p-6 border-b border-warm-border-light dark:border-warm-border-dark">
						<div className="flex items-center gap-3">
							<div className="p-2 bg-warm-accent/10 dark:bg-warm-accent/20 rounded-lg">
								<SparkleIcon weight="duotone" className="w-6 h-6 text-warm-accent" />
							</div>
							<h2 className="text-xl font-bold">Story Presets</h2>
						</div>
						<button
							onClick={handleClose}
							className="p-2 text-slate-500 hover:text-red-500 hover:bg-slate-100 dark:hover:bg-white/10 rounded-full transition-colors cursor-pointer"
						>
							<XCircleIcon className="w-6 h-6" />
						</button>
					</div>

					{/* Inline Confirm Banner */}
					<div
						className={`accordion-grid ${
							pendingPresetId
								? "accordion-grid-open opacity-100 mt-4 mx-4"
								: "opacity-0 pointer-events-none mx-4 mt-0"
						}`}
					>
						<div className="overflow-hidden">
							{bannerPreset && (
								<div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-300 dark:border-amber-700/50 rounded-xl">
									<div className="flex items-start gap-2 mb-3">
										<WarningIcon weight="fill" className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
										<div>
											<p className="text-sm font-semibold text-amber-800 dark:text-amber-200">
												Apply "{bannerPreset.name}"?
											</p>
											<p className="text-xs text-amber-700 dark:text-amber-300 mt-0.5">
												This will override multiple field values. This cannot be undone unless you reset the tab.
											</p>
										</div>
									</div>
									<div className="flex gap-2">
										<button
											onClick={handleConfirmApply}
											className="flex-1 py-2 text-sm font-semibold text-white dark:text-zinc-950 dark:font-bold bg-warm-accent hover:bg-warm-accent-hover rounded-lg transition-colors cursor-pointer"
										>
											Confirm
										</button>
										<button
											onClick={handleCancelApply}
											className="flex-1 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
										>
											Cancel
										</button>
									</div>
								</div>
							)}
						</div>
					</div>

					{/* Preset List */}
					<div className="flex-1 overflow-y-auto p-6 space-y-4">
						<p className="text-sm text-slate-600 dark:text-slate-400">
							Instantly shape your save. Click a preset to review before applying.
						</p>

						{storyPresets.map((preset) => (
							<div
								key={preset.id}
								className={`group border rounded-xl p-5 transition-all cursor-pointer ${
									pendingPresetId === preset.id
										? "border-warm-accent bg-warm-accent/5 dark:bg-warm-accent/10"
										: "border-warm-border-light dark:border-warm-border-dark bg-slate-50 dark:bg-white/5 hover:border-warm-accent/70 dark:hover:border-warm-accent"
								}`}
								onClick={() => handleSelectPreset(preset.id)}
							>
								<div className="flex justify-between items-start mb-2">
									<h3 className="font-bold text-slate-900 dark:text-white group-hover:text-warm-accent transition-colors">
										{preset.name}
									</h3>
									<span className="text-xs font-semibold px-2 py-1 bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-300 rounded">
										{preset.category}
									</span>
								</div>
								<p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
									{preset.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
}
