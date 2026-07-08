import { useState, useCallback, useMemo, useEffect } from "react";
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

export function useSaveEditor() {
	const [fileLoaded, setFileLoaded] = useState(false);
	const [originalData, setOriginalData] = useState<SaveData | null>(null);
	const [values, setValues] = useState<FieldValues>({});
	const [initialValues, setInitialValues] = useState<FieldValues>({});
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [activeTabId, setActiveTabId] = useState(appData[0].id);
	const [filename, setFilename] = useState("");
	const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);
	const [showHelp, setShowHelp] = useState(false);
	const [stamped, setStamped] = useState(false);

	useEffect(() => {
		if (toast) {
			const timer = setTimeout(() => setToast(null), 3000);
			return () => clearTimeout(timer);
		}
	}, [toast]);

	const handleShowToast = useCallback((type: "success" | "error", message: string) => {
		setToast({ type, message });
	}, []);

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
					message:
						error instanceof Error
							? error.message
							: "Failed to parse save file. Please ensure it is a valid Suzerain save.",
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

		setStamped(true);

		setTimeout(() => {
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
				setTimeout(() => setStamped(false), 500);
			} catch (error) {
				setToast({ type: "error", message: "Failed to generate save file." });
				setStamped(false);
			}
		}, 800);
	}, [originalData, values, errors]);

	const handleReset = useCallback(() => {
		setFileLoaded(false);
		setOriginalData(null);
		setValues({});
		setInitialValues({});
		setFilename("");
		setErrors({});
	}, []);

	const activeTab = useMemo(() => appData.find((t) => t.id === activeTabId), [activeTabId]);
	const hasErrors = Object.keys(errors).length > 0;

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
		handleShowToast,
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
