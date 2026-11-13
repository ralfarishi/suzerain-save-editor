import { useState, useEffect, useMemo } from "react";
import { XIcon, MagnifyingGlassIcon, ArrowCounterClockwiseIcon, PlusIcon } from "@phosphor-icons/react";
import { useSave } from "../context/SaveContext";
import { isValidLuaKey } from "../utils/save-manager";
import { useDialogBehavior } from "../hooks/useDialogBehavior";

interface RawVariableInspectorDrawerProps {
	isOpen: boolean;
	initialQuery?: string;
	onClose: () => void;
}

export function RawVariableInspectorDrawer({
	isOpen,
	initialQuery = "",
	onClose,
}: RawVariableInspectorDrawerProps) {
	const { variablesMap, initialVariablesMap, updateVariable, revertVariable } = useSave();
	const [query, setQuery] = useState(initialQuery);

	useDialogBehavior(isOpen, onClose);

	useEffect(() => {
		if (isOpen) {
			setQuery(initialQuery);
		}
	}, [isOpen, initialQuery]);

	const filteredEntries = useMemo(() => {
		const q = query.trim().toLowerCase();
		const list: Array<[string, string | number | boolean]> = [];
		for (const [k, v] of variablesMap.entries()) {
			if (!q || k.toLowerCase().includes(q)) {
				list.push([k, v]);
				if (list.length >= 60) break;
			}
		}
		return list;
	}, [variablesMap, query]);

	if (!isOpen) return null;

	const trimmedQuery = query.trim();
	const exactMatchExists = trimmedQuery ? variablesMap.has(trimmedQuery) : true;
	const canInsertNew = Boolean(trimmedQuery && !exactMatchExists && isValidLuaKey(trimmedQuery));

	return (
		<div
			className="fixed inset-0 z-80 flex justify-end bg-black/70 backdrop-blur-xs animate-fade-in"
			onClick={onClose}
			role="dialog"
			aria-modal="true"
			aria-label="Raw Save Variable Inspector"
		>
			<div
				className="w-full max-w-lg h-full bg-white dark:bg-warm-surface-dark border-l-4 border-brass shadow-2xl flex flex-col animate-drawer-slide"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="px-6 py-4 border-b border-slate-200 dark:border-white/10 flex items-center justify-between bg-slate-50 dark:bg-black/40 shrink-0">
					<div>
						<h2 className="text-lg font-serif font-bold uppercase tracking-wider text-slate-900 dark:text-white">
							Raw Save Variable Inspector
						</h2>
						<p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
							Inspect and edit save variables not shown in the standard tabs.
						</p>
					</div>
					<button
						type="button"
						onClick={onClose}
						aria-label="Close inspector"
						className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-200/60 dark:hover:bg-white/10 transition-colors cursor-pointer"
					>
						<XIcon className="w-5 h-5" />
					</button>
				</div>

				<div className="p-4 border-b border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-black/20">
					<div className="relative">
						<MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
						<input
							type="text"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							placeholder="Filter by variable key..."
							className="w-full pl-9 pr-8 py-2 text-xs font-mono rounded-lg border border-slate-300 dark:border-white/15 bg-white dark:bg-black/40 text-slate-900 dark:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brass"
						/>
						{query && (
							<button
								type="button"
								onClick={() => setQuery("")}
								aria-label="Clear filter"
								className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
							>
								<XIcon className="w-3.5 h-3.5" />
							</button>
						)}
					</div>

					{canInsertNew && (
						<div className="mt-3 p-3 rounded-lg border border-brass/40 bg-amber-50 dark:bg-amber-950/30 flex items-center justify-between gap-2">
							<div className="text-xs text-slate-700 dark:text-amber-200 truncate">
								<span className="font-mono font-bold">{trimmedQuery}</span> is not set in this save.
							</div>
							<button
								type="button"
								onClick={() => updateVariable(trimmedQuery, true)}
								className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-brass text-slate-950 text-xs font-bold shrink-0 cursor-pointer hover:bg-brass-light"
							>
								<PlusIcon className="w-3.5 h-3.5" weight="bold" />
								<span>Add (True)</span>
							</button>
						</div>
					)}
				</div>

				<div className="flex-1 overflow-y-auto p-4 space-y-2.5">
					{filteredEntries.length === 0 ? (
						<p className="text-center py-8 text-xs text-slate-500 dark:text-slate-400">
							No matching variables found in this save.
						</p>
					) : (
						filteredEntries.map(([key, val]) => {
							const orig = initialVariablesMap.get(key);
							const isModified = orig !== val;
							return (
								<div
									key={key}
									className={`p-3 rounded-xl border text-xs ${
										isModified
											? "border-brass/50 bg-brass/5"
											: "border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-black/30"
									}`}
								>
									<div className="flex items-center justify-between gap-2 mb-2">
										<span className="font-mono font-semibold text-slate-800 dark:text-slate-200 break-all">
											{key}
										</span>
										{isModified && (
											<button
												type="button"
												onClick={() => revertVariable(key)}
												title="Revert variable"
												className="p-1 text-slate-500 hover:text-red-500 cursor-pointer shrink-0"
											>
												<ArrowCounterClockwiseIcon className="w-3.5 h-3.5" />
											</button>
										)}
									</div>

									{typeof val === "boolean" ? (
										<div className="flex items-center gap-2">
											<button
												type="button"
												onClick={() => updateVariable(key, true)}
												className={`px-3 py-1 rounded font-mono font-bold cursor-pointer ${
													val ? "bg-emerald-600 text-white" : "bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-300"
												}`}
											>
												true
											</button>
											<button
												type="button"
												onClick={() => updateVariable(key, false)}
												className={`px-3 py-1 rounded font-mono font-bold cursor-pointer ${
													!val ? "bg-rose-600 text-white" : "bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-300"
												}`}
											>
												false
											</button>
										</div>
									) : typeof val === "number" ? (
										<input
											type="number"
											value={val}
											onChange={(e) => {
												const parsed = parseFloat(e.target.value);
												if (!isNaN(parsed)) updateVariable(key, parsed);
											}}
											className="w-full px-2.5 py-1.5 rounded border border-slate-300 dark:border-white/15 bg-white dark:bg-black/50 font-mono text-slate-900 dark:text-white"
										/>
									) : (
										<input
											type="text"
											value={String(val)}
											onChange={(e) => updateVariable(key, e.target.value)}
											className="w-full px-2.5 py-1.5 rounded border border-slate-300 dark:border-white/15 bg-white dark:bg-black/50 font-mono text-slate-900 dark:text-white"
										/>
									)}
								</div>
							);
						})
					)}
				</div>
			</div>
		</div>
	);
}
