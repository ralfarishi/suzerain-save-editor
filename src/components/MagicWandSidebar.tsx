import { useState, useMemo, useCallback } from "react";
import {
	SparkleIcon,
	XCircleIcon,
	WarningIcon,
	MagnifyingGlassIcon,
	CheckCircleIcon,
	FunnelIcon,
} from "@phosphor-icons/react";
import { storyPresets, type StoryPreset } from "../data/presets";
import { FieldValues } from "../utils/save-manager";
import { useDialogBehavior } from "../hooks/useDialogBehavior";

interface MagicWandSidebarProps {
	onApplyPreset: (presetValues: Partial<FieldValues>) => void;
	onShowToast: (type: "success" | "error", message: string) => void;
	isOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
}

type PresetCategory = "All" | "Sordland" | "Rizia" | "Economy" | "Politics";

export function MagicWandSidebar({
	onApplyPreset,
	onShowToast,
	isOpen: controlledIsOpen,
	onOpenChange,
}: MagicWandSidebarProps) {
	const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(false);
	const isOpen = controlledIsOpen ?? uncontrolledIsOpen;
	const setIsOpen = useCallback(
		(next: boolean) => {
			if (onOpenChange) onOpenChange(next);
			else setUncontrolledIsOpen(next);
		},
		[onOpenChange]
	);

	const [selectedCategory, setSelectedCategory] = useState<PresetCategory>("All");
	const [searchQuery, setSearchQuery] = useState("");
	const [pendingPresetId, setPendingPresetId] = useState<string | null>(null);
	const [bannerPreset, setBannerPreset] = useState<StoryPreset | null>(null);

	const handleClose = useCallback(() => {
		setIsOpen(false);
		setPendingPresetId(null);
	}, [setIsOpen]);

	useDialogBehavior(isOpen, handleClose);

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
		onShowToast("success", `Applied strategic preset: ${preset.name}`);
		setPendingPresetId(null);
		setIsOpen(false);
	};

	const handleCancelApply = () => {
		setPendingPresetId(null);
	};

	const filteredPresets = useMemo(() => {
		const query = searchQuery.toLowerCase().trim();
		return storyPresets.filter((p) => {
			if (selectedCategory !== "All" && p.category !== selectedCategory) {
				return false;
			}
			if (!query) return true;
			return (
				p.name.toLowerCase().includes(query) ||
				p.description.toLowerCase().includes(query) ||
				p.highlights.some((h) => h.toLowerCase().includes(query))
			);
		});
	}, [selectedCategory, searchQuery]);

	return (
		<>
			{/* Magic Wand FAB Button (desktop only; mobile accesses Presets via FloatingMobileDock Actions) */}
			<button
				type="button"
				aria-label="Preset Archives"
				onClick={() => setIsOpen(true)}
				className="hidden md:inline-flex fixed right-4 bottom-8 p-4 bg-brass hover:bg-brass-light text-slate-950 font-bold rounded-2xl shadow-[0_8px_25px_rgba(0,0,0,0.3)] border-2 border-brass-light active:scale-95 transition-all z-40 group cursor-pointer"
				title="Preset Archives"
				id="magic-wand-fab"
			>
				<SparkleIcon weight="fill" className="w-5 h-5 sm:w-6 sm:h-6 text-slate-950" />
				<span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
					<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brass-light opacity-75" />
					<span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-brass border-2 border-white dark:border-black" />
				</span>
			</button>

			{/* Backdrop */}
			{isOpen && (
				<div
					className="fixed inset-0 bg-black/60 z-60 backdrop-blur-xs transition-opacity duration-200 touch-none overscroll-none"
					role="presentation"
					onClick={handleClose}
				/>
			)}

			{/* Sidebar Drawer */}
			<div
				role="dialog"
				aria-modal={isOpen}
				aria-hidden={!isOpen}
				inert={!isOpen ? true : undefined}
				aria-label="Story Presets"
				className={`fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-warm-surface-dark shadow-[-10px_0_30px_rgba(0,0,0,0.3)] z-60 transform transition-transform duration-200 ease-out border-l-4 border-brass flex flex-col ${
					isOpen ? "translate-x-0" : "translate-x-full pointer-events-none"
				}`}
			>
				{/* Header */}
				<div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-black/40 shrink-0">
					<div className="flex items-center gap-2.5">
						<span className="w-6 h-6 rounded-full border-2 border-brass flex items-center justify-center text-brass font-serif font-bold text-xs leading-none">
							§
						</span>
						<h2 className="font-serif font-black text-sm uppercase tracking-widest text-slate-900 dark:text-white">
							Story Presets
						</h2>
					</div>
					<button
						type="button"
						aria-label="Close"
						onClick={handleClose}
						className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg bg-white/5 transition-colors cursor-pointer"
					>
						<XCircleIcon className="w-6 h-6" />
					</button>
				</div>

				{/* Search & Filter Header */}
				<div className="p-4 border-b border-slate-200 dark:border-white/10 bg-slate-100/60 dark:bg-black/20 space-y-3 shrink-0">
					{/* Search Bar */}
					<div className="relative">
						<MagnifyingGlassIcon
							weight="bold"
							className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
						/>
						<input
							type="text"
							placeholder="Search presets..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="w-full pl-9 pr-3 py-2 bg-white dark:bg-black/40 border border-slate-300 dark:border-white/15 rounded-lg text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-brass outline-none transition-colors"
						/>
					</div>

					{/* Category Tabs */}
					<div className="flex items-center gap-1.5 flex-wrap">
						<span className="text-[10px] font-mono font-bold uppercase text-slate-500 dark:text-slate-400 mr-1 flex items-center gap-1">
							<FunnelIcon className="w-3 h-3" />
							Campaign:
						</span>
						{(["All", "Sordland", "Rizia", "Economy", "Politics"] as PresetCategory[]).map((cat) => (
							<button
								key={cat}
								type="button"
								onClick={() => setSelectedCategory(cat)}
								className={`px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider rounded-md border transition-all cursor-pointer ${
									selectedCategory === cat
										? "bg-brass text-slate-950 border-brass font-black"
										: "bg-white dark:bg-white/5 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-brass/40"
								}`}
							>
								{cat}
							</button>
						))}
					</div>
				</div>

				{/* Confirmation Banner */}
				{pendingPresetId && bannerPreset && (
					<div className="shrink-0 mx-4 mt-3 animate-fade-in">
						<div className="p-4 bg-amber-50 dark:bg-amber-950/30 border-2 border-brass/60 rounded-xl shadow-md">
							<div className="flex items-start gap-2.5 mb-2.5">
								<WarningIcon weight="fill" className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
								<div className="flex-1">
									<p className="text-xs font-serif font-black text-slate-900 dark:text-amber-200 uppercase tracking-wider">
										Apply "{bannerPreset.name}"?
									</p>
									<p className="text-[11px] font-sans text-slate-600 dark:text-amber-300/80 mt-0.5 leading-relaxed">
										This will update {Object.keys(bannerPreset.values).length} settings in your save:
									</p>

										{/* Human-Friendly Strategic Changes */}
										<ul className="mt-2 space-y-1">
											{bannerPreset.highlights.map((highlight, idx) => (
												<li
													key={idx}
													className="text-[11px] font-mono flex items-center gap-1.5 text-slate-800 dark:text-amber-100"
												>
													<CheckCircleIcon weight="bold" className="w-3.5 h-3.5 text-brass shrink-0" />
													<span>{highlight}</span>
												</li>
											))}
										</ul>
									</div>
								</div>

								<div className="flex gap-2 mt-3 pt-2.5 border-t border-brass/20">
									<button
										type="button"
										onClick={handleConfirmApply}
										className="flex-1 py-2 text-xs font-serif font-black uppercase tracking-wider text-slate-950 bg-brass hover:bg-brass-light border border-brass-light rounded-lg shadow-sm active:scale-95 transition-all cursor-pointer"
									>
										Confirm & Apply
									</button>
									<button
										type="button"
										onClick={handleCancelApply}
										className="flex-1 py-2 text-xs font-serif font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 bg-white dark:bg-white/10 hover:bg-slate-100 dark:hover:bg-white/15 border border-slate-300 dark:border-white/10 rounded-lg active:scale-95 transition-all cursor-pointer"
									>
										Cancel
									</button>
								</div>
							</div>
						</div>
				)}

				{/* Preset List */}
				<div className="flex-1 overflow-y-auto p-4 space-y-3">
					<p className="text-xs text-slate-500 dark:text-slate-400 italic mb-2 px-1">
						Quick-fill presets for popular story paths.
					</p>

					{filteredPresets.map((preset) => {
						const isSelected = pendingPresetId === preset.id;
						return (
							<div
								key={preset.id}
								role="button"
								tabIndex={0}
								className={`group border-2 p-3.5 rounded-xl transition-all cursor-pointer shadow-xs flex flex-col gap-2 ${
									isSelected
										? "border-brass bg-amber-50/70 dark:bg-amber-950/25 shadow-sm"
										: "border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 hover:border-brass/60"
								}`}
								onClick={() => handleSelectPreset(preset.id)}
								onKeyDown={(e) => {
									if (e.key === "Enter" || e.key === " ") handleSelectPreset(preset.id);
								}}
							>
								<div className="flex items-start gap-3">
									<div className="p-2 rounded-lg bg-amber-50 dark:bg-white/5 text-brass group-hover:bg-brass group-hover:text-slate-950 transition-colors shrink-0">
										<SparkleIcon weight="fill" className="w-4 h-4" />
									</div>

									<div className="flex-1 min-w-0">
										<div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
											<h3 className="font-serif font-black text-xs uppercase tracking-wider text-slate-900 dark:text-white group-hover:text-brass transition-colors truncate">
												{preset.name}
											</h3>
											<span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border border-slate-300 dark:border-white/15 bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300">
												{preset.category}
											</span>
										</div>

										<p className="text-xs text-slate-600 dark:text-slate-400 font-sans leading-relaxed line-clamp-2">
											{preset.description}
										</p>

										{/* Key highlights preview snippet */}
										<div className="mt-2 flex flex-wrap gap-1">
											{preset.highlights.slice(0, 2).map((h, i) => (
												<span
													key={i}
													className="text-[9px] font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-black/30 px-1.5 py-0.5 rounded border border-slate-200 dark:border-white/5 truncate max-w-[200px]"
												>
													{h}
												</span>
											))}
											{preset.highlights.length > 2 && (
												<span className="text-[9px] font-mono text-slate-400 px-1 py-0.5">
													+{preset.highlights.length - 2} more
												</span>
											)}
										</div>
									</div>
								</div>
							</div>
						);
					})}

					{filteredPresets.length === 0 && (
						<div className="text-center py-8 text-slate-400 font-serif italic text-xs">
							No presets found matching "{searchQuery}".
						</div>
					)}
				</div>
			</div>
		</>
	);
}
