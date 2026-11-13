import React, { createContext, useContext, useState, useCallback, useMemo, useEffect, useRef } from "react";
import {
	parseSaveFile,
	SaveData,
	FieldValues,
	getFieldById,
	findFieldLocation,
	isValidLuaKey,
} from "../utils/save-manager";
import {
	parseEntityUpdates,
	auditAllAchievements,
	AchievementAuditDetail,
	SaveAuditSummary,
	SaveAuditStatus,
} from "../utils/save-audit";
import { steamAchievements } from "../data/steam_achievements";
import { convertDatetimeLocalToInitialDate } from "../utils/date-helpers";
import { humanizeVariableKey } from "../utils/save-formatters";

const DEV_MODE_STORAGE_KEY = "suzerain-dev-mode";

interface ModifiedEntry {
	key: string;
	label: string;
	tabId: string | null;
	sectionTitle: string | null;
	fieldId: string | null;
	oldValue: string | number | boolean | undefined;
	newValue: string | number | boolean | undefined;
}

interface AchievementTransition {
	id: string;
	title: string;
	fromStatus: SaveAuditStatus;
	toStatus: SaveAuditStatus;
}

interface SaveContextValue {
	fileLoaded: boolean;
	filename: string;
	originalData: SaveData | null;
	initialParsedValues: FieldValues;
	initialVariablesMap: Map<string, string | number | boolean>;
	parsedValues: FieldValues;
	extraVariables: Record<string, string | number | boolean>;
	variablesMap: Map<string, string | number | boolean>;
	entityUpdatesMap: Map<string, Record<string, string>>;
	errors: Record<string, string>;
	hasValidationErrors: boolean;
	auditResults: Map<string, AchievementAuditDetail>;
	auditSummary: SaveAuditSummary | null;
	isLoadingSample: boolean;
	showTechnicalKeys: boolean;
	toggleTechnicalKeys: () => void;
	modifiedEntries: ModifiedEntry[];
	recentTransitions: AchievementTransition[];
	recentlyChangedAchievementIds: Set<string>;
	dismissTransition: (id: string) => void;
	isDiffDrawerOpen: boolean;
	setIsDiffDrawerOpen: (open: boolean) => void;
	loadSaveContent: (content: string, name: string) => { errorCount: number };
	loadSampleSave: () => Promise<void>;
	revertVariable: (key: string) => void;
	revertAllChanges: () => void;
	unloadSave: () => void;
	resetSave: () => void;
	setParsedValues: React.Dispatch<React.SetStateAction<FieldValues>>;
	updateVariable: (keyOrId: string, value: string | number | boolean) => void;
	bulkUpdateVariables: (patch: Record<string, string | number | boolean>) => void;
}

const SaveContext = createContext<SaveContextValue | null>(null);

const achievementTitleById = new Map<string, string>(
	steamAchievements.map((a) => [a.id, a.name])
);

function readInitialDevMode(): boolean {
	try {
		if (typeof window !== "undefined" && window.localStorage) {
			return window.localStorage.getItem(DEV_MODE_STORAGE_KEY) === "true";
		}
	} catch {
		// Ignore storage access errors
	}
	return false;
}

export function validateFieldValue(
	id: string,
	value: string | number | boolean | null | undefined
): string | null {
	const field = getFieldById(id);
	if (!field) return null;

	if (field.type === "number") {
		if (value === null || value === undefined || value === "") {
			return "Please enter a valid number";
		}
		const numVal =
			typeof value === "string" ? parseFloat(value) : typeof value === "number" ? value : NaN;
		if (Number.isNaN(numVal) || !Number.isFinite(numVal)) {
			return "Please enter a valid number";
		}
		if (field.min !== undefined && field.max !== undefined) {
			if (numVal < field.min || numVal > field.max) {
				return `Value must be between ${field.min} and ${field.max}`;
			}
		}
	}
	return null;
}

function validateAllFields(values: FieldValues): Record<string, string> {
	const nextErrors: Record<string, string> = {};
	for (const id of Object.keys(values)) {
		const err = validateFieldValue(id, values[id]);
		if (err) {
			nextErrors[id] = err;
		}
	}
	return nextErrors;
}



export function SaveProvider({ children }: { children: React.ReactNode }) {
	const [fileLoaded, setFileLoaded] = useState(false);
	const [filename, setFilename] = useState("");
	const [originalData, setOriginalData] = useState<SaveData | null>(null);
	const [initialParsedValues, setInitialParsedValues] = useState<FieldValues>({});
	const [initialVariablesMap, setInitialVariablesMap] = useState<Map<string, string | number | boolean>>(new Map());
	const [parsedValues, setParsedValues] = useState<FieldValues>({});
	const [extraVariables, setExtraVariables] = useState<Record<string, string | number | boolean>>({});
	const [variablesMap, setVariablesMap] = useState<Map<string, string | number | boolean>>(new Map());
	const [entityUpdatesMap, setEntityUpdatesMap] = useState<Map<string, Record<string, string>>>(new Map());
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [auditResults, setAuditResults] = useState<Map<string, AchievementAuditDetail>>(new Map());
	const [auditSummary, setAuditSummary] = useState<SaveAuditSummary | null>(null);
	const [isLoadingSample, setIsLoadingSample] = useState(false);
	const [showTechnicalKeys, setShowTechnicalKeys] = useState<boolean>(readInitialDevMode);
	const [recentTransitions, setRecentTransitions] = useState<AchievementTransition[]>([]);
	const [recentlyChangedAchievementIds, setRecentlyChangedAchievementIds] = useState<Set<string>>(new Set());
	const [isDiffDrawerOpen, setIsDiffDrawerOpen] = useState(false);

	const prevAuditStatusRef = useRef<Map<string, SaveAuditStatus>>(new Map());
	const isInitialAuditRef = useRef<boolean>(true);
	const pulseTimersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());
	const sampleAbortControllerRef = useRef<AbortController | null>(null);
	const loadGenerationRef = useRef(0);

	const clearPulseTimers = useCallback(() => {
		const timers = pulseTimersRef.current;
		for (const timer of timers.values()) {
			clearTimeout(timer);
		}
		timers.clear();
	}, []);

	useEffect(() => {
		return () => {
			clearPulseTimers();
			sampleAbortControllerRef.current?.abort();
		};
	}, [clearPulseTimers]);

	const toggleTechnicalKeys = useCallback(() => {
		setShowTechnicalKeys((prev) => {
			const next = !prev;
			try {
				if (typeof window !== "undefined" && window.localStorage) {
					window.localStorage.setItem(DEV_MODE_STORAGE_KEY, String(next));
				}
			} catch {
				// Ignore storage access errors
			}
			return next;
		});
	}, []);

	const dismissTransition = useCallback((id: string) => {
		setRecentTransitions((prev) => prev.filter((t) => t.id !== id));
	}, []);

	const runAudit = useCallback(
		(
			vMap: Map<string, string | number | boolean>,
			data: SaveData | null,
			eMap?: Map<string, Record<string, string>>
		) => {
			const { results, summary } = auditAllAchievements(
				vMap,
				data?.turnNo ?? 0,
				data?.currentStoryPack ?? "Sordland",
				data?.campaignName ?? "Active Run",
				eMap
			);

			if (isInitialAuditRef.current) {
				const initialStatusMap = new Map<string, SaveAuditStatus>();
				for (const [id, detail] of results.entries()) {
					initialStatusMap.set(id, detail.status);
				}
				prevAuditStatusRef.current = initialStatusMap;
				isInitialAuditRef.current = false;
			} else {
				const newTransitions: AchievementTransition[] = [];
				const nextStatusMap = new Map<string, SaveAuditStatus>();

				for (const [id, detail] of results.entries()) {
					nextStatusMap.set(id, detail.status);
					const prevStatus = prevAuditStatusRef.current.get(id);
					if (prevStatus && prevStatus !== detail.status) {
						newTransitions.push({
							id,
							title: achievementTitleById.get(id) ?? id,
							fromStatus: prevStatus,
							toStatus: detail.status,
						});
					}
				}
				prevAuditStatusRef.current = nextStatusMap;

				if (newTransitions.length > 0) {
					setRecentTransitions((prev) => {
						const existingIds = new Set(newTransitions.map((t) => t.id));
						const filtered = prev.filter((t) => !existingIds.has(t.id));
						return [...filtered, ...newTransitions].slice(-4);
					});

					setRecentlyChangedAchievementIds((prev) => {
						const next = new Set(prev);
						for (const t of newTransitions) {
							next.add(t.id);
							const existingTimer = pulseTimersRef.current.get(t.id);
							if (existingTimer) {
								clearTimeout(existingTimer);
							}
							const timer = setTimeout(() => {
								setRecentlyChangedAchievementIds((curr) => {
									const updated = new Set(curr);
									updated.delete(t.id);
									return updated;
								});
								pulseTimersRef.current.delete(t.id);
							}, 2500);
							pulseTimersRef.current.set(t.id, timer);
						}
						return next;
					});
				}
			}

			setAuditResults(results);
			setAuditSummary(summary);
		},
		[]
	);

	const applySaveContent = useCallback(
		(content: string, name: string): { errorCount: number } => {
			const { values, originalData: data, variablesMap: vMap } = parseSaveFile(content);
			const eMap = parseEntityUpdates(data.entityUpdates);
			const initialErrors = validateAllFields(values);

			clearPulseTimers();
			isInitialAuditRef.current = true;
			prevAuditStatusRef.current = new Map();
			setRecentTransitions([]);
			setRecentlyChangedAchievementIds(new Set());
			setIsDiffDrawerOpen(false);

			setOriginalData(data);
			setInitialParsedValues({ ...values });
			setInitialVariablesMap(new Map(vMap));
			setParsedValues({ ...values });
			setExtraVariables({});
			setVariablesMap(new Map(vMap));
			setEntityUpdatesMap(eMap);
			setErrors(initialErrors);
			setFilename(name);
			setFileLoaded(true);

			return { errorCount: Object.keys(initialErrors).length };
		},
		[clearPulseTimers]
	);

	const loadSaveContent = useCallback(
		(content: string, name: string): { errorCount: number } => {
			loadGenerationRef.current += 1;
			sampleAbortControllerRef.current?.abort();
			sampleAbortControllerRef.current = null;
			setIsLoadingSample(false);
			return applySaveContent(content, name);
		},
		[applySaveContent]
	);

	const bulkUpdateVariables = useCallback(
		(patch: Record<string, string | number | boolean>) => {
			if (!originalData) return;

			setParsedValues((prev) => {
				const next = { ...prev };
				for (const [keyOrId, val] of Object.entries(patch)) {
					if (val === undefined) continue;
					const field = getFieldById(keyOrId);
					if (field) {
						next[field.id] = val;
					} else {
						const loc = findFieldLocation(keyOrId);
						const parentField = loc ? getFieldById(loc.fieldId) : undefined;
						if (parentField && parentField.type === "radio-group") {
							const opt = parentField.options.find((o) => o.key === keyOrId || o.id === keyOrId);
							if (opt && val === true) {
								next[parentField.id] = opt.id;
							}
						} else {
							next[keyOrId] = val;
						}
					}
				}
				return next;
			});

			setExtraVariables((prev) => {
				const next = { ...prev };
				for (const [keyOrId, val] of Object.entries(patch)) {
					if (val === undefined) continue;
					const field = getFieldById(keyOrId);
					if (field && field.type === "radio-group") {
						continue;
					}
					if (field && "key" in field && field.key) {
						next[field.key] = val;
					} else {
						const loc = findFieldLocation(keyOrId);
						const parentField = loc ? getFieldById(loc.fieldId) : undefined;
						if (parentField && parentField.type === "boolean-date" && keyOrId === parentField.dateId) {
							next[parentField.dateKey] = convertDatetimeLocalToInitialDate(String(val));
						} else if (parentField && parentField.type === "radio-group") {
							continue;
						} else if (isValidLuaKey(keyOrId)) {
							next[keyOrId] = val;
						}
					}
				}
				return next;
			});

			setVariablesMap((prev) => {
				const next = new Map(prev);
				for (const [keyOrId, val] of Object.entries(patch)) {
					if (val === undefined) continue;
					const field = getFieldById(keyOrId);
					if (field && field.type === "radio-group") {
						for (const opt of field.options) {
							next.set(opt.key, opt.id === val);
						}
					} else if (field && "key" in field && field.key) {
						next.set(field.key, val);
					} else {
						const loc = findFieldLocation(keyOrId);
						const parentField = loc ? getFieldById(loc.fieldId) : undefined;
						if (parentField && parentField.type === "boolean-date" && keyOrId === parentField.dateId) {
							next.set(parentField.dateKey, convertDatetimeLocalToInitialDate(String(val)));
						} else if (parentField && parentField.type === "radio-group" && val === true) {
							for (const opt of parentField.options) {
								next.set(opt.key, opt.key === keyOrId || opt.id === keyOrId);
							}
						} else {
							next.set(keyOrId, val);
						}
					}
				}
				return next;
			});

			setErrors((prevErrors) => {
				const nextErrors = { ...prevErrors };
				for (const [keyOrId, val] of Object.entries(patch)) {
					if (val === undefined) continue;
					const field = getFieldById(keyOrId);
					const targetId = field ? field.id : keyOrId;
					const err = validateFieldValue(targetId, val);
					if (err) {
						nextErrors[targetId] = err;
					} else {
						delete nextErrors[targetId];
					}
				}
				return nextErrors;
			});
		},
		[originalData]
	);

	useEffect(() => {
		if (!fileLoaded || !originalData) return;
		runAudit(variablesMap, originalData, entityUpdatesMap);
	}, [fileLoaded, variablesMap, originalData, entityUpdatesMap, runAudit]);

	const updateVariable = useCallback(
		(keyOrId: string, value: string | number | boolean) => {
			bulkUpdateVariables({ [keyOrId]: value });
		},
		[bulkUpdateVariables]
	);

	const revertVariable = useCallback(
		(key: string) => {
			const oldValue = initialVariablesMap.get(key);
			const loc = findFieldLocation(key);
			const field = loc ? getFieldById(loc.fieldId) : getFieldById(key);

			setVariablesMap((prev) => {
				const next = new Map(prev);
				if (oldValue === undefined) {
					next.delete(key);
				} else {
					next.set(key, oldValue);
				}
				if (field && field.type === "radio-group") {
					for (const opt of field.options) {
						const optOld = initialVariablesMap.get(opt.key);
						if (optOld === undefined) {
							next.delete(opt.key);
						} else {
							next.set(opt.key, optOld);
						}
					}
				}
				return next;
			});

			setExtraVariables((prev) => {
				const next = { ...prev };
				delete next[key];
				if (field && field.type === "radio-group") {
					for (const opt of field.options) {
						delete next[opt.key];
					}
				}
				return next;
			});

			setParsedValues((prev) => {
				const next = { ...prev };
				if (field) {
					if (field.type === "boolean-date" && key === field.dateKey) {
						const origDate = initialParsedValues[field.dateId];
						if (origDate === undefined) {
							delete next[field.dateId];
						} else {
							next[field.dateId] = origDate;
						}
					} else {
						const origVal = initialParsedValues[field.id];
						if (origVal === undefined) {
							delete next[field.id];
						} else {
							next[field.id] = origVal;
						}
					}
				} else if (key in next) {
					const origVal = initialParsedValues[key];
					if (origVal === undefined) {
						delete next[key];
					} else {
						next[key] = origVal;
					}
				}
				return next;
			});

			if (field) {
				setErrors((prevErrors) => {
					const nextErrors = { ...prevErrors };
					const targetId =
						field.type === "boolean-date" && key === field.dateKey ? field.dateId : field.id;
					const origVal = initialParsedValues[targetId];
					const err = origVal === undefined ? null : validateFieldValue(targetId, origVal);
					if (err) {
						nextErrors[targetId] = err;
					} else {
						delete nextErrors[targetId];
					}
					return nextErrors;
				});
			}
		},
		[initialVariablesMap, initialParsedValues]
	);

	const revertAllChanges = useCallback(() => {
		setParsedValues({ ...initialParsedValues });
		setExtraVariables({});
		setVariablesMap(new Map(initialVariablesMap));
		setErrors(validateAllFields(initialParsedValues));
	}, [initialParsedValues, initialVariablesMap]);

	const modifiedEntries = useMemo<ModifiedEntry[]>(() => {
		if (!fileLoaded) return [];
		const allKeys = new Set<string>([...initialVariablesMap.keys(), ...variablesMap.keys()]);
		const entries: ModifiedEntry[] = [];

		for (const key of allKeys) {
			const oldValue = initialVariablesMap.get(key);
			const newValue = variablesMap.get(key);
			if (oldValue === newValue) continue;

			const loc = findFieldLocation(key);
			const field = loc ? getFieldById(loc.fieldId) : getFieldById(key);
			let label = field ? field.label : humanizeVariableKey(key);
			if (field && field.type === "radio-group") {
				const opt = field.options.find((o) => o.key === key);
				if (opt) {
					label = `${field.label}: ${opt.label}`;
				}
			} else if (field && field.type === "boolean-date" && key === field.dateKey) {
				label = `${field.label} (Date)`;
			}

			entries.push({
				key,
				label,
				tabId: loc?.tabId ?? null,
				sectionTitle: loc?.sectionTitle ?? null,
				fieldId: loc?.fieldId ?? null,
				oldValue,
				newValue,
			});
		}

		return entries;
	}, [fileLoaded, initialVariablesMap, variablesMap]);

	const loadSampleSave = useCallback(async () => {
		sampleAbortControllerRef.current?.abort();
		const controller = new AbortController();
		sampleAbortControllerRef.current = controller;
		const gen = ++loadGenerationRef.current;

		try {
			setIsLoadingSample(true);
			const res = await fetch("/sample-save.json", { signal: controller.signal });
			if (!res.ok) {
				return;
			}
			const text = await res.text();
			if (gen !== loadGenerationRef.current || controller.signal.aborted) {
				return;
			}
			applySaveContent(text, "sample-save.json (Rizia Turn 11)");
		} catch {
			// Failed to fetch, aborted, or failed to parse sample save
		} finally {
			if (gen === loadGenerationRef.current) {
				setIsLoadingSample(false);
				if (sampleAbortControllerRef.current === controller) {
					sampleAbortControllerRef.current = null;
				}
			}
		}
	}, [applySaveContent]);

	const unloadSave = useCallback(() => {
		loadGenerationRef.current += 1;
		sampleAbortControllerRef.current?.abort();
		sampleAbortControllerRef.current = null;
		setIsLoadingSample(false);
		clearPulseTimers();
		setFileLoaded(false);
		setFilename("");
		setOriginalData(null);
		setInitialParsedValues({});
		setInitialVariablesMap(new Map());
		setParsedValues({});
		setExtraVariables({});
		setVariablesMap(new Map());
		setEntityUpdatesMap(new Map());
		setErrors({});
		setAuditResults(new Map());
		setAuditSummary(null);
		setRecentTransitions([]);
		setRecentlyChangedAchievementIds(new Set());
		setIsDiffDrawerOpen(false);
		prevAuditStatusRef.current = new Map();
		isInitialAuditRef.current = true;
	}, [clearPulseTimers]);

	const hasValidationErrors = useMemo(() => Object.keys(errors).length > 0, [errors]);

	const value = useMemo<SaveContextValue>(
		() => ({
			fileLoaded,
			filename,
			originalData,
			initialParsedValues,
			initialVariablesMap,
			parsedValues,
			extraVariables,
			variablesMap,
			entityUpdatesMap,
			errors,
			hasValidationErrors,
			auditResults,
			auditSummary,
			isLoadingSample,
			showTechnicalKeys,
			toggleTechnicalKeys,
			modifiedEntries,
			recentTransitions,
			recentlyChangedAchievementIds,
			dismissTransition,
			isDiffDrawerOpen,
			setIsDiffDrawerOpen,
			loadSaveContent,
			loadSampleSave,
			revertVariable,
			revertAllChanges,
			unloadSave,
			resetSave: unloadSave,
			setParsedValues,
			updateVariable,
			bulkUpdateVariables,
		}),
		[
			fileLoaded,
			filename,
			originalData,
			initialParsedValues,
			initialVariablesMap,
			parsedValues,
			extraVariables,
			variablesMap,
			entityUpdatesMap,
			errors,
			hasValidationErrors,
			auditResults,
			auditSummary,
			isLoadingSample,
			showTechnicalKeys,
			toggleTechnicalKeys,
			modifiedEntries,
			recentTransitions,
			recentlyChangedAchievementIds,
			dismissTransition,
			isDiffDrawerOpen,
			loadSaveContent,
			loadSampleSave,
			revertVariable,
			revertAllChanges,
			unloadSave,
			updateVariable,
			bulkUpdateVariables,
		]
	);

	return <SaveContext.Provider value={value}>{children}</SaveContext.Provider>;
}

export function useSave(): SaveContextValue {
	const ctx = useContext(SaveContext);
	if (!ctx) {
		throw new Error("useSave must be used within a SaveProvider");
	}
	return ctx;
}
