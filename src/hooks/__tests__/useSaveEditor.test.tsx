// @vitest-environment jsdom
import { describe, expect, it, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import type { ReactNode } from "react";
import { SaveProvider } from "../../context/SaveContext";
import { useSaveEditor } from "../useSaveEditor";
import { appData } from "../../data/data";
import type { NumberField, BooleanDateField } from "../../data/types";
import * as saveFormatters from "../../utils/save-formatters";

function findBoundedNumberField(): { tabId: string; field: NumberField } {
	for (const tab of appData) {
		for (const section of tab.sections) {
			for (const field of section.fields) {
				if (field.type === "number" && field.min !== undefined && field.max !== undefined) {
					return { tabId: tab.id, field };
				}
			}
		}
	}
	throw new Error("Expected at least one bounded number field in appData");
}

function findBooleanDateField(): { tabId: string; field: BooleanDateField } {
	for (const tab of appData) {
		for (const section of tab.sections) {
			for (const field of section.fields) {
				if (field.type === "boolean-date") {
					return { tabId: tab.id, field };
				}
			}
		}
	}
	throw new Error("Expected at least one boolean-date field in appData");
}

const wrapper = ({ children }: { children: ReactNode }) => (
	<SaveProvider>{children}</SaveProvider>
);

describe("useSaveEditor", () => {
	beforeEach(() => {
		vi.restoreAllMocks();
	});

	it("validates number field bounds and NaN", () => {
		const { field } = findBoundedNumberField();
		const { result } = renderHook(() => useSaveEditor(), { wrapper });

		expect(result.current.validateField(field.id, "not-a-number")).toBe(
			"Please enter a valid number"
		);

		const min = field.min!;
		const max = field.max!;
		expect(result.current.validateField(field.id, min - 1)).toBe(
			`Value must be between ${min} and ${max}`
		);
		expect(result.current.validateField(field.id, max + 1)).toBe(
			`Value must be between ${min} and ${max}`
		);
		expect(result.current.validateField(field.id, min)).toBeNull();
		expect(result.current.validateField(field.id, max)).toBeNull();
	});

	it("auto-populates dateId when boolean-date is toggled true and date is empty", () => {
		const { field } = findBooleanDateField();
		const { result } = renderHook(() => useSaveEditor(), { wrapper });

		const saveJson = JSON.stringify({
			saveFileType: 1,
			currentStoryPack: "StoryPack_BaseGame",
			turnNo: 1,
			lastModified: "15-04-1954_08-30-00",
			variables: [
				"Variable={",
				`["${field.key}"]=false,`,
				`["${field.dateKey}"]=""`,
				"};",
			].join("\n"),
			entityUpdates: [],
		});

		act(() => {
			result.current.handleFileLoaded(saveJson, "test.json");
		});

		act(() => {
			result.current.handleValueChange(field.dateId, "");
		});

		act(() => {
			result.current.handleValueChange(field.id, true);
		});

		expect(result.current.values[field.id]).toBe(true);
		expect(result.current.values[field.dateId]).toBe("1954-04-15T08:30");
	});

	it("clears validation errors on handleResetTab and blocks handleDownload while errors exist", () => {
		const { tabId, field } = findBoundedNumberField();
		const { result } = renderHook(() => useSaveEditor(), { wrapper });

		const invalidValue = field.min! - 10;
		const validValue = field.min!;

		const saveJson = JSON.stringify({
			saveFileType: 1,
			currentStoryPack: "StoryPack_BaseGame",
			turnNo: 1,
			variables: ["Variable={", `["${field.key}"]=${validValue}`, "};"].join("\n"),
			entityUpdates: [],
		});

		const downloadSpy = vi.spyOn(saveFormatters, "triggerJsonDownload").mockImplementation(() => {});

		act(() => {
			result.current.handleFileLoaded(saveJson, "test.json");
			result.current.setActiveTabId(tabId);
		});

		act(() => {
			result.current.handleValueChange(field.id, invalidValue);
		});

		expect(result.current.hasErrors).toBe(true);
		expect(result.current.errors[field.id]).toBeTruthy();

		act(() => {
			result.current.handleDownload();
		});

		expect(downloadSpy).not.toHaveBeenCalled();
		expect(result.current.toast).toEqual({
			type: "error",
			message: "Please fix the highlighted values before exporting.",
		});

		act(() => {
			result.current.handleResetTab();
		});

		expect(result.current.hasErrors).toBe(false);
		expect(result.current.errors[field.id]).toBeUndefined();
		expect(result.current.values[field.id]).toBe(validValue);
	});
});
