import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { appData } from "../data/data";
import {
	generateSaveFile,
	FieldValues,
	getFieldById,
	parseLastModified,
	getCurrentDatetimeLocal,
} from "../utils/save-manager";
import { useSave, validateFieldValue } from "../context/SaveContext";
import { getDefaultExportFilename, triggerJsonDownload } from "../utils/save-formatters";

export function useSaveEditor() {
	const saveCtx = useSave();
	const {
		fileLoaded,
		originalData,
		parsedValues: values,
		initialParsedValues: initialValues,
		errors,
		hasValidationErrors: hasErrors,
		filename,
		extraVariables,
		loadSaveContent,
		bulkUpdateVariables,
		revertAllChanges,
	} = saveCtx;

	const [activeTabId, setActiveTabId] = useState(appData[0].id);
	const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);
	const [showHelp, setShowHelp] = useState(false);
	const [stamped, setStamped] = useState(false);

	const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const stampTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const valuesRef = useRef(values);
	valuesRef.current = values;
	const originalDataRef = useRef(originalData);
	originalDataRef.current = originalData;
	const stampedRef = useRef(stamped);
	stampedRef.current = stamped;

	const handleCloseToast = useCallback(() => {
		if (toastTimeoutRef.current) {
			clearTimeout(toastTimeoutRef.current);
			toastTimeoutRef.current = null;
		}
		setToast(null);
	}, []);

	const handleShowToast = useCallback(
		(type: "success" | "error", message: string, duration = 4000) => {
			if (toastTimeoutRef.current) {
				clearTimeout(toastTimeoutRef.current);
			}
			setToast({ type, message });
			toastTimeoutRef.current = setTimeout(() => {
				setToast(null);
				toastTimeoutRef.current = null;
			}, duration);
		},
		[]
	);

	useEffect(() => {
		return () => {
			if (toastTimeoutRef.current) {
				clearTimeout(toastTimeoutRef.current);
			}
			if (stampTimeoutRef.current) {
				clearTimeout(stampTimeoutRef.current);
			}
		};
	}, []);

	const validateField = useCallback(
		(id: string, value: string | number | boolean | null | undefined) =>
			validateFieldValue(id, value),
		[]
	);

	const handleFileLoaded = useCallback(
		(content: string, name: string) => {
			try {
				const { errorCount } = loadSaveContent(content, name);
				setActiveTabId(appData[0].id);

				if (errorCount > 0) {
					handleShowToast("error", `Loaded with ${errorCount} invalid values.`);
				} else {
					handleShowToast("success", "Save file loaded successfully.");
				}
			} catch (error) {
				handleShowToast(
					"error",
					error instanceof Error
						? error.message
						: "Could not load save file. Please select a valid Suzerain save."
				);
			}
		},
		[loadSaveContent, handleShowToast]
	);

	const handleValueChange = useCallback(
		(id: string, value: string | number | boolean) => {
			const patch: Record<string, string | number | boolean> = { [id]: value };
			const field = getFieldById(id);
			if (
				field &&
				field.type === "boolean-date" &&
				value === true &&
				!valuesRef.current[field.dateId]
			) {
				const lastMod = originalDataRef.current?.lastModified;
				patch[field.dateId] = parseLastModified(lastMod) || getCurrentDatetimeLocal();
			}

			bulkUpdateVariables(patch);
		},
		[bulkUpdateVariables]
	);

	const handleBulkUpdate = useCallback(
		(newValues: Partial<FieldValues>) => {
			const normalizedPatch: Record<string, string | number | boolean> = {};
			for (const [keyOrId, val] of Object.entries(newValues)) {
				if (val === undefined) continue;
				const field = getFieldById(keyOrId);
				normalizedPatch[field ? field.id : keyOrId] = val;
			}
			bulkUpdateVariables(normalizedPatch);
		},
		[bulkUpdateVariables]
	);

	const handleResetTab = useCallback(() => {
		const activeTab = appData.find((t) => t.id === activeTabId);
		if (!activeTab) return;

		const patch: Record<string, string | number | boolean> = {};
		activeTab.sections.forEach((section) => {
			section.fields.forEach((field) => {
				if (initialValues[field.id] !== undefined) {
					patch[field.id] = initialValues[field.id];
				}
				if (field.type === "boolean-date" && initialValues[field.dateId] !== undefined) {
					patch[field.dateId] = initialValues[field.dateId];
				}
			});
		});
		handleBulkUpdate(patch);
		handleShowToast("success", "Tab restored to original save values.");
	}, [activeTabId, initialValues, handleBulkUpdate, handleShowToast]);

	const handleDownload = useCallback(() => {
		if (!originalData || stampedRef.current) return;

		if (hasErrors) {
			handleShowToast("error", "Please fix the highlighted values before exporting.");
			return;
		}

		try {
			const newContent = generateSaveFile(originalData, values, extraVariables);
			triggerJsonDownload(newContent, getDefaultExportFilename(filename));

			setStamped(true);
			handleShowToast("success", "Save file exported successfully.");
			if (stampTimeoutRef.current) {
				clearTimeout(stampTimeoutRef.current);
			}
			stampTimeoutRef.current = setTimeout(() => {
				setStamped(false);
				stampTimeoutRef.current = null;
			}, 900);
		} catch {
			handleShowToast("error", "Failed to generate save file.");
			setStamped(false);
		}
	}, [originalData, values, extraVariables, hasErrors, filename, handleShowToast]);

	const handleReset = useCallback(() => {
		revertAllChanges();
		handleShowToast("success", "All changes reverted to original save values.");
	}, [revertAllChanges, handleShowToast]);

	const activeTab = useMemo(() => appData.find((t) => t.id === activeTabId), [activeTabId]);

	const errorCounts = useMemo(() => {
		const counts: Record<string, number> = {};
		appData.forEach((tab) => {
			let count = 0;
			tab.sections.forEach((section) => {
				section.fields.forEach((field) => {
					if (errors[field.id]) count++;
					if (field.type === "boolean-date" && errors[field.dateId]) count++;
				});
			});
			counts[tab.id] = count;
		});
		return counts;
	}, [errors]);

	return {
		fileLoaded,
		originalData,
		values,
		initialValues,
		errors,
		activeTabId,
		setActiveTabId,
		filename,
		toast,
		setToast,
		showHelp,
		setShowHelp,
		stamped,
		validateField,
		handleShowToast,
		handleCloseToast,
		handleFileLoaded,
		handleValueChange,
		handleBulkUpdate,
		handleResetTab,
		handleDownload,
		handleReset,
		activeTab,
		hasErrors,
		errorCounts,
	};
}
