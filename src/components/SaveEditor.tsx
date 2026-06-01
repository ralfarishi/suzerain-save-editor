import { useState, useCallback, useEffect, lazy, Suspense, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { appData } from "../data/data";
import {
	parseSaveFile,
	generateSaveFile,
	FieldValues,
	SaveData,
	getFieldById,
	parseLastModified,
	getCurrentDatetimeLocal,
} from "../utils/save-manager";
import { Dropzone } from "./Dropzone";
import { EditorTabs } from "./EditorTabs";
import { EditorForm } from "./EditorForm";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { BulkActions } from "./BulkActions";
import {
	ArrowCounterClockwiseIcon,
	CheckCircleIcon,
	FileArrowDownIcon,
	GithubLogoIcon,
	QuestionIcon,
	XCircleIcon,
	TrophyIcon,
} from "@phosphor-icons/react";

import { MagicWandSidebar } from "./MagicWandSidebar";

// Lazy load the modal for better initial load performance
const SaveLocationInfo = lazy(() => import("./SaveLocationInfo"));

export function SaveEditor() {
	const [fileLoaded, setFileLoaded] = useState(false);
	const [originalData, setOriginalData] = useState<SaveData | null>(null);
	const [values, setValues] = useState<FieldValues>({});
	const [initialValues, setInitialValues] = useState<FieldValues>({});
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [activeTabId, setActiveTabId] = useState(appData[0].id);
	const [filename, setFilename] = useState("");
	const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);
	const [showHelp, setShowHelp] = useState(false);

	// Clear toast after 3 seconds
	useEffect(() => {
		if (toast) {
			const timer = setTimeout(() => setToast(null), 3000);
			return () => clearTimeout(timer);
		}
	}, [toast]);

	const handleShowToast = useCallback((type: "success" | "error", message: string) => {
		setToast({ type, message });
	}, []);

	// Optimized validation using O(1) field lookup
	const validateField = useCallback(
		(id: string, value: string | number | boolean | null | undefined) => {
			const field = getFieldById(id);
			if (!field) return null;

			if (field.type === "number") {
				if (value === null || value === undefined) return "Invalid number";
				const numVal =
					typeof value === "string" ? parseFloat(value) : typeof value === "number" ? value : NaN;
				if (isNaN(numVal)) return "Invalid number";
				if (field.min !== undefined && field.max !== undefined) {
					if (numVal < field.min || numVal > field.max) {
						return `Value must be between ${field.min} and ${field.max}`;
					}
				}
			}
			return null;
		},
		[],
	);

	const handleFileLoaded = useCallback(
		(content: string, name: string) => {
			try {
				const { values: parsedValues, originalData: data } = parseSaveFile(content);

				// Immediate validation of all parsed values
				const newErrors: Record<string, string> = {};
				Object.keys(parsedValues).forEach((id) => {
					const error = validateField(id, parsedValues[id]);
					if (error) {
						newErrors[id] = error;
					}
				});

				setValues(parsedValues);
				setInitialValues(parsedValues);
				setOriginalData(data);
				setFilename(name);
				setFileLoaded(true);
				setActiveTabId(appData[0].id);
				setErrors(newErrors);

				if (Object.keys(newErrors).length > 0) {
					setToast({
						type: "error",
						message: `Loaded with ${Object.keys(newErrors).length} validation errors.`,
					});
				} else {
					setToast({ type: "success", message: "Save file loaded successfully" });
				}
			} catch (error) {
				setToast({
					type: "error",
					message: error instanceof Error ? error.message : "Failed to parse save file. Please ensure it is a valid Suzerain save.",
				});
			}
		},
		[validateField],
	);

	const handleValueChange = useCallback(
		(id: string, value: string | number | boolean) => {
			setValues((prev) => {
				const next = { ...prev, [id]: value };
				const field = getFieldById(id);
				if (field && field.type === "boolean-date" && value === true) {
					if (!prev[field.dateId]) {
						const lastMod = originalData?.lastModified;
						const fallback = parseLastModified(lastMod) || getCurrentDatetimeLocal();
						next[field.dateId] = fallback;
					}
				}
				return next;
			});

			const error = validateField(id, value);
			setErrors((prev) => {
				const newErrors = { ...prev };
				if (error) {
					newErrors[id] = error;
				} else {
					delete newErrors[id];
				}
				return newErrors;
			});
		},
		[validateField, originalData],
	);

	const handleBulkUpdate = useCallback(
		(newValues: Partial<FieldValues>) => {
			setValues((prev) => {
				const merged = { ...prev, ...newValues } as FieldValues;
				
				setErrors((prevErrors) => {
					const newErrors = { ...prevErrors };
					Object.keys(newValues).forEach((id) => {
						const error = validateField(id, newValues[id]);
						if (error) {
							newErrors[id] = error;
						} else {
							delete newErrors[id];
						}
					});
					return newErrors;
				});

				return merged;
			});
		},
		[validateField],
	);

	const handleResetTab = useCallback(() => {
		const activeTab = appData.find((t) => t.id === activeTabId);
		if (!activeTab) return;

		const newValues = { ...values };
		activeTab.sections.forEach((section) => {
			section.fields.forEach((field) => {
				if (initialValues[field.id] !== undefined) {
					newValues[field.id] = initialValues[field.id];
				}
			});
		});
		handleBulkUpdate(newValues);
		setToast({ type: "success", message: "Tab values reset to original." });
	}, [activeTabId, values, initialValues, handleBulkUpdate]);

	const handleDownload = useCallback(() => {
		if (!originalData) return;

		if (Object.keys(errors).length > 0) {
			setToast({ type: "error", message: "Please fix validation errors before downloading." });
			return;
		}

		try {
			const newContent = generateSaveFile(originalData, values);
			const blob = new Blob([newContent], { type: "application/json" });
			const url = URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = "new-save.json";
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(url);

			setToast({ type: "success", message: "Save file generated successfully." });
		} catch (error) {
			setToast({ type: "error", message: "Failed to generate save file." });
		}
	}, [originalData, values, errors]);

	const handleReset = useCallback(() => {
		setFileLoaded(false);
		setOriginalData(null);
		setValues({});
		setInitialValues({});
		setFilename("");
		setErrors({});
	}, []);

	// Memoize activeTab lookup to prevent unnecessary recalculations
	const activeTab = useMemo(() => appData.find((t) => t.id === activeTabId), [activeTabId]);

	const hasErrors = Object.keys(errors).length > 0;

	// Calculate errors per tab for the UI indicators
	const errorCounts = useMemo(() => {
		const counts: Record<string, number> = {};
		appData.forEach((tab) => {
			let count = 0;
			tab.sections.forEach((section) => {
				section.fields.forEach((field) => {
					if (errors[field.id]) count++;
					// Special case for boolean-date fields
					if (field.type === "boolean-date" && errors[field.dateId]) count++;
				});
			});
			counts[tab.id] = count;
		});
		return counts;
	}, [errors]);

	return (
		<div className="min-h-screen flex flex-col transition-colors duration-300">
			{/* Desktop Header - Hidden on Mobile */}
			<header className="hidden md:block bg-white/80 dark:bg-warm-bg-dark/90 border-b border-slate-200 dark:border-white/10 sticky top-0 z-50 backdrop-blur-md transition-colors duration-300">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
					<div className="flex items-center gap-3">
						<h1 className="text-xl font-bold text-slate-900 dark:text-white">
							Suzerain{" "}
							<span className="font-light text-warm-accent"> Save Editor</span>
						</h1>
					</div>

					<div className="flex items-center gap-4">
						<Link
							to="/achievements"
							className="text-sm font-medium text-slate-600 hover:text-warm-accent dark:text-slate-400 transition-colors"
						>
							Walkthroughs
						</Link>
						<a
							href="https://github.com/ralfarishi/suzerain-save-editor"
							target="_blank"
							rel="noopener noreferrer"
							className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
							title="View on GitHub"
						>
							<GithubLogoIcon className="w-5 h-5" />
						</a>
						<ThemeSwitcher />

						{fileLoaded && (
							<>
								<div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-black/20 rounded-full border border-slate-200 dark:border-white/10 text-sm opacity-70">
									<span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
									{filename}
								</div>

								<button
									onClick={handleReset}
									className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
									title="Reset / Upload New File"
								>
									<ArrowCounterClockwiseIcon className="w-5 h-5" />
								</button>

								<button
									onClick={handleDownload}
									disabled={hasErrors}
									className={`
                    flex items-center gap-2 px-4 py-2 font-medium rounded-lg transition-all shadow-lg active:scale-95
                    ${
											hasErrors
												? "bg-slate-200 text-slate-400 cursor-not-allowed dark:bg-white/5 shadow-none"
												: "bg-warm-accent hover:bg-warm-accent-hover text-white dark:text-zinc-950 dark:font-bold shadow-warm-accent/20"
										}
                  `}
								>
									<FileArrowDownIcon weight="bold" className="w-5 h-5" />
									Download
								</button>
							</>
						)}
					</div>
				</div>
			</header>

			{/* Mobile Nav Console - 'The Chancellor's Desk' Aesthetic */}
			<nav className="md:hidden fixed bottom-0 left-0 right-0 z-60 bg-warm-bg-light dark:bg-warm-bg-dark border-t-4 border-warm-border-light dark:border-warm-border-dark shadow-[0_-10px_30px_-5px_rgba(0,0,0,0.3)]">
				<div className="absolute inset-0 bg-noise opacity-[0.03] dark:opacity-[0.05] pointer-events-none"></div>
				
				<div className="relative max-w-lg mx-auto px-4 py-3 flex items-end justify-between gap-4">
					{/* Left Utility Cluster */}
					<div className="flex gap-2 p-1 bg-warm-surface-light dark:bg-black/20 rounded-xl border border-warm-border-light dark:border-white/5 shadow-tactile">
						<Link
							to="/achievements"
							className="flex items-center justify-center w-11 h-11 bg-white dark:bg-warm-surface-dark rounded-lg text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-warm-border-dark active:shadow-tactile-press active:translate-y-0.5 transition-all group"
							title="Walkthroughs"
						>
							<TrophyIcon weight="duotone" className="w-5 h-5 group-active:scale-90 transition-transform" />
						</Link>
						
						<ThemeSwitcher />
						
						{fileLoaded && (
							<button
								onClick={handleReset}
								className="flex items-center justify-center w-11 h-11 bg-white dark:bg-warm-surface-dark rounded-lg text-slate-500 dark:text-warm-error border border-slate-200 dark:border-warm-border-dark active:shadow-tactile-press active:translate-y-0.5 transition-all group cursor-pointer"
								title="Reset"
							>
								<ArrowCounterClockwiseIcon weight="bold" className="w-5 h-5 group-active:rotate-[-45deg] transition-transform" />
							</button>
						)}
					</div>

					{/* Center Branding/Status - A small "brass" plate */}
					<div className="hidden min-[380px]:flex flex-col items-center mb-1">
						<div className="w-12 h-1 bg-brass dark:bg-brass-light rounded-full mb-1.5 opacity-40"></div>
						<span className="text-[10px] font-black tracking-[0.2em] uppercase opacity-30 dark:opacity-20 italic">
							{fileLoaded ? "Active File" : "Stationary"}
						</span>
					</div>

					{/* Right Action Toggle */}
					<button
						onClick={fileLoaded ? handleDownload : () => {}}
						disabled={fileLoaded && hasErrors}
						className={`
							relative h-14 min-w-[80px] px-6 rounded-xl transition-all flex items-center justify-center gap-3 border-t overflow-hidden group cursor-pointer
							${!fileLoaded 
								? "bg-slate-200 dark:bg-warm-surface-dark text-slate-400 border-slate-300 dark:border-warm-border-dark shadow-[0_4px_0_0_rgba(0,0,0,0.1)]" 
								: hasErrors 
									? "bg-slate-300 dark:bg-slate-700 text-slate-100 border-slate-400 opacity-60 shadow-none cursor-not-allowed" 
									: "bg-warm-accent hover:bg-warm-accent-hover text-white dark:text-zinc-950 dark:font-bold border-warm-accent/30 shadow-[0_4px_0_0_var(--accent-hover-color)] active:shadow-none active:translate-y-1"}
						`}
					>
						<div className="absolute inset-0 bg-noise opacity-10 pointer-events-none"></div>
						
						{fileLoaded ? (
							<>
								<FileArrowDownIcon weight="bold" className="w-6 h-6 animate-in zoom-in duration-300" />
								<span className="text-xs font-black uppercase tracking-widest">Commit</span>
							</>
						) : (
							<span className="text-xs font-black tracking-tighter uppercase italic px-2">RAYNE</span>
						)}

						{hasErrors && fileLoaded && (
							<div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-pulse"></div>
						)}
						{!hasErrors && fileLoaded && (
							<div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)] animate-pulse"></div>
						)}
					</button>
				</div>

				{/* Safe Area Spacer for modern phones */}
				<div className="h-4 bg-transparent"></div>
			</nav>

			{/* Mobile Brand Bar - Minimal top indicator */}
			<div className="md:hidden flex items-center justify-center py-4 px-6 border-b border-slate-200 dark:border-white/5 bg-white/50 dark:bg-warm-bg-dark/50 backdrop-blur-sm">
				<h1 className="text-sm font-bold opacity-40 uppercase tracking-[0.2em]">
					Suzerain <span className="font-light">Editor</span>
				</h1>
			</div>

			{/* Main Content */}
			<main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{!fileLoaded ? (
					<div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
						<div className="text-center mb-12">
							<h2 className="text-4xl font-bold mb-4 opacity-90">Modify Your Legacy</h2>
							<p className="text-lg opacity-60 max-w-2xl mx-auto mb-8">
								Edit your Suzerain save files with ease. Adjust budget, public opinion, decisions,
								and more in a modern, secure interface.
							</p>

							<button
								onClick={() => setShowHelp(true)}
								className="inline-flex items-center gap-2 text-warm-accent hover:underline cursor-pointer"
							>
								<QuestionIcon className="w-4 h-4" />
								Where can I find my save file?
							</button>
						</div>
						<Dropzone onFileLoaded={handleFileLoaded} />
					</div>
				) : (
					<div className="animate-in fade-in duration-500">
						<EditorTabs
							tabs={appData}
							activeTabId={activeTabId}
							onTabChange={setActiveTabId}
							errorCounts={errorCounts}
						/>

						{activeTab && (
							<div className="relative w-full">
								{appData.map((tab) => {
									const isActive = tab.id === activeTabId;
									const hasNumberActions = ["money-opinion", "rizia", "rizia-military-unit"].includes(tab.id);
									const hasCheckboxActions = ["presidential-decrees", "assembly-court"].includes(tab.id);
									const hasControls = hasNumberActions || hasCheckboxActions;

									return (
										<div
											key={tab.id}
											className={`accordion-grid ${
												isActive
													? "accordion-grid-open opacity-100"
													: "opacity-0 pointer-events-none"
											}`}
										>
											<div className="overflow-hidden">
												<div className="pt-2 pb-6">
													{hasControls && (
														<div className="flex justify-between items-center mb-6">
															<BulkActions
																activeTab={tab}
																values={values}
																originalData={originalData}
																onUpdateValues={handleBulkUpdate}
																onShowToast={handleShowToast}
															/>

															{/* Reset Tab Button */}
															{["money-opinion", "rizia", "rizia-military-unit"].includes(tab.id) && (
																<button
																	onClick={handleResetTab}
																	className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 cursor-pointer"
																>
																	<ArrowCounterClockwiseIcon className="w-4 h-4" />
																	Reset Tab
																</button>
															)}
														</div>
													)}

													<div className="space-y-12">
														{tab.sections.map((section) => (
															<EditorForm
																key={section.title}
																section={section}
																values={values}
																initialValues={initialValues}
																errors={errors}
																onChange={handleValueChange}
															/>
														))}
													</div>
												</div>
											</div>
										</div>
									);
								})}
							</div>
						)}
					</div>
				)}
			</main>
			
			{/* Magic Wand Sidebar (Only show if a file is loaded) */}
			{fileLoaded && (
				<MagicWandSidebar onApplyPreset={handleBulkUpdate} onShowToast={handleShowToast} />
			)}

			<footer className="mt-auto border-t border-slate-200 dark:border-white/5 py-6 bg-slate-50/50 dark:bg-black/20">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col md:flex-row justify-between items-center gap-8">
						<div className="text-center md:text-left">
							<p className="text-sm text-slate-500 dark:text-slate-400">
								© {new Date().getFullYear()} Suzerain Save Editor. All rights reserved.
							</p>
						</div>

						<div className="flex flex-col items-center md:items-end gap-4">
							<span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
								Resources
							</span>
							<div className="flex flex-wrap justify-center gap-6">
								<a
									href="https://steamcommunity.com/sharedfiles/filedetails/?id=3341333208"
									target="_blank"
									rel="noopener noreferrer"
									className="text-sm text-slate-500 hover:text-warm-accent transition-colors"
								>
									Steam Guide
								</a>
								<a
									href="https://github.com/stevenhoekerd/Magic-Symon"
									target="_blank"
									rel="noopener noreferrer"
									className="text-sm text-slate-500 hover:text-warm-accent transition-colors"
								>
									Magic-Symon
								</a>
								<a
									href="https://trolledd.github.io/suzerain/"
									target="_blank"
									rel="noopener noreferrer"
									className="text-sm text-slate-500 hover:text-warm-accent transition-colors"
								>
									Suzerain Editor (trolledd)
								</a>
							</div>
						</div>
					</div>
				</div>
			</footer>

			{/* Toast Notification */}
			{toast && (
				<div
					className={`
          fixed bottom-8 right-8 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-slide-in-right z-50
          ${toast.type === "success" ? "bg-warm-accent text-white dark:text-zinc-950 dark:font-bold" : "bg-warm-error text-white dark:text-zinc-950 dark:font-bold"}
        `}
				>
					{toast.type === "success" ? (
						<CheckCircleIcon className="w-6 h-6" />
					) : (
						<XCircleIcon className="w-6 h-6" />
					)}
					<div>
						<h4 className="font-bold capitalize">{toast.type}</h4>
						<p className="text-sm opacity-90">{toast.message}</p>
					</div>
				</div>
			)}

			{/* Help Modal - Lazy Loaded */}
			<Suspense fallback={null}>
				<SaveLocationInfo isOpen={showHelp} onClose={() => setShowHelp(false)} />
			</Suspense>
		</div>
	);
}
