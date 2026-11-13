import { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
	XIcon,
	FileArrowDownIcon,
	ArrowCounterClockwiseIcon,
	ArrowSquareOutIcon,
	CheckCircleIcon,
	SignOutIcon,
	WarningCircleIcon,
} from "@phosphor-icons/react";
import { useSave } from "../../context/SaveContext";
import { generateSaveFile } from "../../utils/save-manager";
import { useDialogBehavior } from "../../hooks/useDialogBehavior";
import {
	formatSaveValue,
	getDefaultExportFilename,
	triggerJsonDownload,
} from "../../utils/save-formatters";

export function DiffReviewDrawer() {
	const navigate = useNavigate();
	const {
		fileLoaded,
		filename,
		originalData,
		parsedValues,
		extraVariables,
		errors,
		hasValidationErrors,
		modifiedEntries,
		showTechnicalKeys,
		isDiffDrawerOpen,
		setIsDiffDrawerOpen,
		revertVariable,
		revertAllChanges,
		unloadSave,
	} = useSave();

	const [exportFilename, setExportFilename] = useState(() => getDefaultExportFilename(filename));
	const [confirmRevertAll, setConfirmRevertAll] = useState(false);
	const [confirmUnload, setConfirmUnload] = useState(false);
	const [downloadStatus, setDownloadStatus] = useState<"idle" | "success" | "error">("idle");

	useEffect(() => {
		if (isDiffDrawerOpen) {
			setExportFilename(getDefaultExportFilename(filename));
			setConfirmRevertAll(false);
			setConfirmUnload(false);
			setDownloadStatus("idle");
		}
	}, [isDiffDrawerOpen, filename]);

	useDialogBehavior(isDiffDrawerOpen, () => setIsDiffDrawerOpen(false));

	if (!isDiffDrawerOpen || !fileLoaded || !originalData) return null;

	const handleDownload = () => {
		if (hasValidationErrors) {
			setDownloadStatus("error");
			return;
		}
		try {
			const newContent = generateSaveFile(originalData, parsedValues, extraVariables);
			const finalName = exportFilename.trim()
				? exportFilename.trim().endsWith(".json")
					? exportFilename.trim()
					: `${exportFilename.trim()}.json`
				: getDefaultExportFilename(filename);
			triggerJsonDownload(newContent, finalName);
			setDownloadStatus("success");
		} catch {
			setDownloadStatus("error");
		}
	};

	const handleJumpToField = (tabId: string | null, fieldId: string | null, key: string) => {
		setIsDiffDrawerOpen(false);
		if (tabId && fieldId) {
			navigate({
				to: "/",
				search: { tab: tabId, focus: fieldId },
			});
		} else {
			navigate({
				to: "/",
				search: { focus: key },
			});
		}
	};

	return (
		<div
			className="fixed inset-0 z-80 flex justify-end bg-black/70 backdrop-blur-xs animate-fade-in"
			onClick={() => setIsDiffDrawerOpen(false)}
			role="dialog"
			aria-modal="true"
			aria-label="Review and Export Save Changes"
		>
			<div
				className="w-full max-w-lg h-full bg-white dark:bg-warm-surface-dark border-l-4 border-brass shadow-2xl flex flex-col animate-drawer-slide"
				onClick={(e) => e.stopPropagation()}
			>
				{/* Header */}
				<div className="px-6 py-4 border-b border-slate-200 dark:border-white/10 flex items-center justify-between bg-slate-50 dark:bg-black/40 shrink-0">
					<div>
						<h2 className="text-lg font-serif font-bold uppercase tracking-wider text-slate-900 dark:text-white">
							Review & Export Save
						</h2>
						<p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
							{modifiedEntries.length === 0
								? "No changes made yet — ready to export as-is."
								: `${modifiedEntries.length} ${modifiedEntries.length === 1 ? "setting" : "settings"} modified from original save.`}
						</p>
					</div>
					<button
						type="button"
						onClick={() => setIsDiffDrawerOpen(false)}
						aria-label="Close review drawer"
						className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-200/60 dark:hover:bg-white/10 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass"
					>
						<XIcon className="w-5 h-5" />
					</button>
				</div>

				{/* Diff List */}
				<div className="flex-1 overflow-y-auto p-6 space-y-3">
					{modifiedEntries.length === 0 ? (
						<div className="py-12 px-4 text-center rounded-xl border border-dashed border-slate-300 dark:border-white/10 bg-slate-50/70 dark:bg-white/5">
							<CheckCircleIcon className="w-10 h-10 text-emerald-500 mx-auto mb-3" weight="duotone" />
							<p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
								Your save matches the original loaded file.
							</p>
							<p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
								Any edits you make in the Save Editor, Achievements, or Scene Explorer will appear here for review.
							</p>
						</div>
					) : (
						modifiedEntries.map((entry) => (
							<div
								key={entry.key}
								className="p-3.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/80 dark:bg-black/30 flex items-start justify-between gap-3"
							>
								<div className="min-w-0 flex-1">
									<div className="text-sm font-semibold text-slate-900 dark:text-white truncate">
										{entry.label}
									</div>
									{showTechnicalKeys && (
										<div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 truncate mt-0.5">
											{entry.key}
										</div>
									)}
									<div className="flex flex-wrap items-center gap-2 mt-2 text-xs font-mono">
										<span className="px-2 py-0.5 rounded bg-slate-200/80 dark:bg-white/10 text-slate-600 dark:text-slate-300 line-through">
											{formatSaveValue(entry.oldValue)}
										</span>
										<span className="text-slate-400">→</span>
										<span className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60 border border-brass/40 text-amber-900 dark:text-amber-300 font-bold">
											{formatSaveValue(entry.newValue)}
										</span>
									</div>
								</div>

								<div className="flex items-center gap-1 shrink-0">
									<button
										type="button"
										onClick={() => handleJumpToField(entry.tabId, entry.fieldId, entry.key)}
										title={entry.tabId && entry.fieldId ? "Jump to setting" : "Inspect raw variable"}
										aria-label={`Jump to ${entry.label}`}
										className="p-1.5 rounded-lg text-slate-500 hover:text-brass hover:bg-brass/10 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass"
									>
										<ArrowSquareOutIcon className="w-4 h-4" />
									</button>
									<button
										type="button"
										onClick={() => revertVariable(entry.key)}
										title="Revert this change"
										aria-label={`Revert ${entry.label}`}
										className="p-1.5 rounded-lg text-slate-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass"
									>
										<ArrowCounterClockwiseIcon className="w-4 h-4" />
									</button>
								</div>
							</div>
						))
					)}
				</div>

				{/* Footer: Filename, Download & Safe Reset Actions */}
				<div className="p-6 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-black/40 space-y-4 shrink-0">
					<div>
						<label
							htmlFor="export-filename-input"
							className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5"
						>
							Export Filename
						</label>
						<input
							id="export-filename-input"
							type="text"
							value={exportFilename}
							onChange={(e) => setExportFilename(e.target.value)}
							className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-white/15 bg-white dark:bg-black/60 text-sm font-mono text-slate-900 dark:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brass"
						/>
					</div>

					{downloadStatus === "success" && (
						<div className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-700 dark:text-emerald-300">
							<CheckCircleIcon className="w-4 h-4 shrink-0" weight="fill" />
							<span>Save file downloaded! Keep a backup of your original before replacing it.</span>
						</div>
					)}

					{hasValidationErrors && (
						<div
							role="alert"
							className="flex items-center gap-2 p-2.5 rounded-lg bg-red-500/10 border border-red-500/30 text-xs text-red-700 dark:text-red-300"
						>
							<WarningCircleIcon className="w-4 h-4 shrink-0" weight="fill" />
							<span>
								Fix {Object.keys(errors).length} invalid field{" "}
								{Object.keys(errors).length === 1 ? "value" : "values"} before exporting.
							</span>
						</div>
					)}

					{downloadStatus === "error" && !hasValidationErrors && (
						<div className="flex items-center gap-2 p-2.5 rounded-lg bg-red-500/10 border border-red-500/30 text-xs text-red-700 dark:text-red-300">
							<WarningCircleIcon className="w-4 h-4 shrink-0" weight="fill" />
							<span>Could not generate save file. Please check your edited values.</span>
						</div>
					)}

					<button
						type="button"
						onClick={handleDownload}
						disabled={hasValidationErrors}
						className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brass hover:bg-brass-light text-slate-950 font-bold uppercase tracking-wider text-xs border-2 border-brass transition-transform hover-tactile cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass"
					>
						<FileArrowDownIcon weight="bold" className="w-5 h-5" />
						<span>Download Save File</span>
					</button>

					{/* Secondary Actions: Revert All & Close Save */}
					<div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-200 dark:border-white/10">
						{modifiedEntries.length > 0 ? (
							confirmRevertAll ? (
								<div className="flex items-center gap-2">
									<span className="text-xs text-red-600 dark:text-red-400 font-semibold">Revert all?</span>
									<button
										type="button"
										onClick={() => {
											revertAllChanges();
											setConfirmRevertAll(false);
										}}
										className="px-2.5 py-1 rounded bg-red-600 text-white text-xs font-bold cursor-pointer hover:bg-red-700"
									>
										Yes, Revert
									</button>
									<button
										type="button"
										onClick={() => setConfirmRevertAll(false)}
										className="px-2 py-1 rounded text-xs text-slate-500 hover:text-slate-800 dark:hover:text-white cursor-pointer"
									>
										Cancel
									</button>
								</div>
							) : (
								<button
									type="button"
									onClick={() => setConfirmRevertAll(true)}
									className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 transition-colors cursor-pointer"
								>
									<ArrowCounterClockwiseIcon className="w-3.5 h-3.5" />
									<span>Revert All Edits</span>
								</button>
							)
						) : (
							<span />
						)}

						{confirmUnload ? (
							<div className="flex items-center gap-2">
								<span className="text-xs text-slate-600 dark:text-slate-300">Close save?</span>
								<button
									type="button"
									onClick={() => {
										unloadSave();
									}}
									className="px-2.5 py-1 rounded bg-slate-800 dark:bg-white/20 text-white text-xs font-bold cursor-pointer hover:bg-slate-700"
								>
									Close
								</button>
								<button
									type="button"
									onClick={() => setConfirmUnload(false)}
									className="px-2 py-1 rounded text-xs text-slate-500 hover:text-slate-800 dark:hover:text-white cursor-pointer"
								>
									Cancel
								</button>
							</div>
						) : (
							<button
								type="button"
								onClick={() => {
									if (modifiedEntries.length > 0) {
										setConfirmUnload(true);
									} else {
										unloadSave();
									}
								}}
								className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
							>
								<SignOutIcon className="w-3.5 h-3.5" />
								<span>Close Save</span>
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
