// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { renderHook, act, render, screen } from "@testing-library/react";
import React from "react";
import { SaveProvider, useSave } from "../SaveContext";
import { useSaveFileUpload } from "../../hooks/useSaveFileUpload";
import { DiffReviewDrawer } from "../../components/layout/DiffReviewDrawer";

vi.mock("@tanstack/react-router", () => ({
	useNavigate: () => vi.fn(),
}));

const SAMPLE_SAVE = JSON.stringify({
	saveFileType: 1,
	variables: [
		"Variable={",
		'["BaseGame.GovernmentBudget"] = 4',
		'["BaseGame.Public_Opinion"] = 10',
		'["BaseGame.Relations_Deana_Loved"] = true',
		"}",
	].join("\n"),
});

const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
	<SaveProvider>{children}</SaveProvider>
);

describe("SaveContext immutable baseline, diff, and revert", () => {
	beforeEach(() => {
		localStorage.clear();
	});

	afterEach(() => {
		vi.restoreAllMocks();
		vi.useRealTimers();
	});

	it("keeps initialParsedValues and initialVariablesMap immutable across edits", () => {
		const { result } = renderHook(() => useSave(), { wrapper });

		act(() => {
			result.current.loadSaveContent(SAMPLE_SAVE, "test-save.json");
		});

		expect(result.current.fileLoaded).toBe(true);
		expect(result.current.initialVariablesMap.get("BaseGame.GovernmentBudget")).toBe(4);
		expect(result.current.modifiedEntries).toHaveLength(0);

		act(() => {
			result.current.bulkUpdateVariables({
				"BaseGame.GovernmentBudget": 20,
				"BaseGame.UnmappedNewKey": true,
			});
		});

		// Baseline remains immutable
		expect(result.current.initialVariablesMap.get("BaseGame.GovernmentBudget")).toBe(4);
		expect(result.current.initialVariablesMap.has("BaseGame.UnmappedNewKey")).toBe(false);

		// Modified entries cover union of initial and current keys (including newly inserted key)
		const keys = result.current.modifiedEntries.map((e) => e.key);
		expect(keys).toContain("BaseGame.GovernmentBudget");
		expect(keys).toContain("BaseGame.UnmappedNewKey");

		const inserted = result.current.modifiedEntries.find(
			(e) => e.key === "BaseGame.UnmappedNewKey"
		);
		expect(inserted?.oldValue).toBeUndefined();
		expect(inserted?.newValue).toBe(true);
	});

	it("reverts both existing and newly inserted keys back to initial snapshot", () => {
		const { result } = renderHook(() => useSave(), { wrapper });

		act(() => {
			result.current.loadSaveContent(SAMPLE_SAVE, "test-save.json");
		});

		act(() => {
			result.current.bulkUpdateVariables({
				"BaseGame.GovernmentBudget": 20,
				"BaseGame.UnmappedNewKey": "custom",
			});
		});

		expect(result.current.modifiedEntries).toHaveLength(2);

		// Revert newly inserted key (oldValue === undefined) -> removes from variablesMap and extraVariables
		act(() => {
			result.current.revertVariable("BaseGame.UnmappedNewKey");
		});

		expect(result.current.variablesMap.has("BaseGame.UnmappedNewKey")).toBe(false);
		expect("BaseGame.UnmappedNewKey" in result.current.extraVariables).toBe(false);
		expect(result.current.modifiedEntries).toHaveLength(1);

		// Revert existing mapped key
		act(() => {
			result.current.revertVariable("BaseGame.GovernmentBudget");
		});

		expect(result.current.variablesMap.get("BaseGame.GovernmentBudget")).toBe(4);
		expect(result.current.parsedValues["gov-budget"]).toBe(4);
		expect(result.current.modifiedEntries).toHaveLength(0);
	});

	it("revertAllChanges restores 100% of initial state", () => {
		const { result } = renderHook(() => useSave(), { wrapper });

		act(() => {
			result.current.loadSaveContent(SAMPLE_SAVE, "test-save.json");
		});

		act(() => {
			result.current.bulkUpdateVariables({
				"BaseGame.GovernmentBudget": 99,
				"BaseGame.Public_Opinion": -50,
				"BaseGame.ExtraInsertedFlag": true,
			});
		});

		expect(result.current.modifiedEntries.length).toBe(3);

		act(() => {
			result.current.revertAllChanges();
		});

		expect(result.current.modifiedEntries).toHaveLength(0);
		expect(result.current.variablesMap.get("BaseGame.GovernmentBudget")).toBe(4);
		expect(result.current.variablesMap.has("BaseGame.ExtraInsertedFlag")).toBe(false);
		expect(Object.keys(result.current.extraVariables)).toHaveLength(0);
	});

	it("ignores stale loadSampleSave response if user loads a local save while fetching", async () => {
		let resolveFetch!: (val: Response) => void;
		const fetchPromise = new Promise<Response>((resolve) => {
			resolveFetch = resolve;
		});
		vi.spyOn(globalThis, "fetch").mockReturnValue(fetchPromise);

		const { result } = renderHook(() => useSave(), { wrapper });

		let samplePromise!: Promise<void>;
		act(() => {
			samplePromise = result.current.loadSampleSave();
		});

		expect(result.current.isLoadingSample).toBe(true);

		act(() => {
			result.current.loadSaveContent(SAMPLE_SAVE, "local-user-save.json");
		});

		expect(result.current.filename).toBe("local-user-save.json");
		expect(result.current.isLoadingSample).toBe(false);

		const samplePayload = JSON.stringify({
			saveFileType: 1,
			variables: 'Variable={["BaseGame.GovernmentBudget"]=999}',
		});
		await act(async () => {
			resolveFetch(new Response(samplePayload, { status: 200 }));
			await samplePromise;
		});

		expect(result.current.filename).toBe("local-user-save.json");
		expect(result.current.variablesMap.get("BaseGame.GovernmentBudget")).toBe(4);
	});

	it("clears pulseTimers on unloadSave without mutating unloaded state", () => {
		vi.useFakeTimers();
		const { result } = renderHook(() => useSave(), { wrapper });

		act(() => {
			result.current.loadSaveContent(SAMPLE_SAVE, "test-save.json");
		});

		act(() => {
			result.current.bulkUpdateVariables({
				"BaseGame.Lespia_Alliance": true,
			});
		});

		expect(result.current.recentlyChangedAchievementIds.size).toBeGreaterThan(0);

		act(() => {
			result.current.unloadSave();
		});

		expect(result.current.fileLoaded).toBe(false);
		expect(result.current.recentlyChangedAchievementIds.size).toBe(0);

		act(() => {
			vi.advanceTimersByTime(3000);
		});

		expect(result.current.recentlyChangedAchievementIds.size).toBe(0);
	});

	it("useSaveFileUpload surfaces malformed JSON errors instead of throwing", async () => {
		const { result: saveHook } = renderHook(() => useSave(), { wrapper });
		const { result: uploadHook } = renderHook(
			() => useSaveFileUpload(saveHook.current.loadSaveContent),
			{ wrapper }
		);

		const badFile = new File(["{not-valid-json"], "broken.json", { type: "application/json" });
		await act(async () => {
			uploadHook.current.processFile(badFile);
			await new Promise((r) => setTimeout(r, 20));
		});

		expect(uploadHook.current.error).toBeTruthy();
		expect(saveHook.current.fileLoaded).toBe(false);
	});

	it("DiffReviewDrawer blocks export when SaveContext has validation errors", () => {
		function TestHarness() {
			const ctx = useSave();
			return (
				<div>
					<button
						type="button"
						onClick={() => {
							ctx.loadSaveContent(SAMPLE_SAVE, "test.json");
							ctx.setIsDiffDrawerOpen(true);
						}}
					>
						Open
					</button>
					<button
						type="button"
						onClick={() => ctx.updateVariable("gov-budget", 9999)}
					>
						Invalidate
					</button>
					<DiffReviewDrawer />
				</div>
			);
		}

		render(
			<SaveProvider>
				<TestHarness />
			</SaveProvider>
		);

		act(() => {
			screen.getByText("Open").click();
		});

		const downloadBtn = screen.getByRole("button", { name: /Download Save File/i }) as HTMLButtonElement;
		expect(downloadBtn.disabled).toBe(false);

		act(() => {
			screen.getByText("Invalidate").click();
		});

		expect(downloadBtn.disabled).toBe(true);
		expect(screen.getByRole("alert").textContent).toContain("invalid field");
	});

	it("keeps radio-group updates consistent in parsedValues, variablesMap, and extraVariables", () => {
		const radioSave = JSON.stringify({
			saveFileType: 1,
			variables: [
				"Variable={",
				'["BaseGame.Turn01_InT_Investment_Railway"] = true',
				'["BaseGame.Turn01_InT_Investment_Highway"] = false',
				"}",
			].join("\n"),
		});
		const { result } = renderHook(() => useSave(), { wrapper });

		act(() => {
			result.current.loadSaveContent(radioSave, "radio.json");
		});

		// Update by field.id
		act(() => {
			result.current.updateVariable("infrastructure-project", "highway-project");
		});

		expect(result.current.parsedValues["infrastructure-project"]).toBe("highway-project");
		expect(result.current.variablesMap.get("BaseGame.Turn01_InT_Investment_Highway")).toBe(true);
		expect(result.current.variablesMap.get("BaseGame.Turn01_InT_Investment_Railway")).toBe(false);
		expect("infrastructure-project" in result.current.extraVariables).toBe(false);

		// Update by option Lua key
		act(() => {
			result.current.updateVariable("BaseGame.Turn01_InT_Investment_Railway", true);
		});

		expect(result.current.parsedValues["infrastructure-project"]).toBe("railway-project");
		expect(result.current.variablesMap.get("BaseGame.Turn01_InT_Investment_Railway")).toBe(true);
		expect(result.current.variablesMap.get("BaseGame.Turn01_InT_Investment_Highway")).toBe(false);
	});
});
