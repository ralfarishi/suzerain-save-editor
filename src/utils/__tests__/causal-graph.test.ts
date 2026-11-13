// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import {
	fetchCausalGraph,
	fetchSceneChunk,
	resetCausalGraphCache,
	evaluateConditionLocally,
	SceneChunk,
} from "../causal-graph";
import { useCausalSceneLoader } from "../../hooks/useCausalSceneLoader";

describe("causal-graph & useCausalSceneLoader", () => {
	beforeEach(() => {
		resetCausalGraphCache();
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("recovers fetchCausalGraph after a rejected fetch", async () => {
		const fetchSpy = vi
			.spyOn(globalThis, "fetch")
			.mockRejectedValueOnce(new Error("Network offline"))
			.mockResolvedValueOnce(
				new Response(
					JSON.stringify({
						version: "1",
						generatedAt: "2026-01-01",
						stats: { sceneCount: 0, totalNodes: 0, activeVariableCount: 0, achievementCount: 0 },
						scenes: {},
						variables: {},
						achievements: {},
						semanticDictionary: {},
					}),
					{ status: 200 }
				)
			);

		await expect(fetchCausalGraph()).rejects.toThrow("Network offline");
		const graph = await fetchCausalGraph();
		expect(graph.version).toBe("1");
		expect(fetchSpy).toHaveBeenCalledTimes(2);
	});

	it("ignores stale scene responses when switching scenes rapidly", async () => {
		let resolveScene1!: (res: Response) => void;
		let resolveScene2!: (res: Response) => void;

		const scene1Chunk: SceneChunk = {
			conversationId: 101,
			title: "Scene One",
			storyPack: "StoryPack_Main",
			turn: 1,
			turnLabel: "Turn 1",
			isDevNote: false,
			rootNodeId: 1,
			nodes: {},
		};
		const scene2Chunk: SceneChunk = {
			conversationId: 202,
			title: "Scene Two",
			storyPack: "StoryPack_Main",
			turn: 2,
			turnLabel: "Turn 2",
			isDevNote: false,
			rootNodeId: 1,
			nodes: {},
		};

		vi.spyOn(globalThis, "fetch").mockImplementation((input) => {
			const url = String(input);
			if (url.includes("causal-graph.json")) {
				return Promise.resolve(
					new Response(
						JSON.stringify({
							version: "1",
							generatedAt: "2026-01-01",
							stats: { sceneCount: 2, totalNodes: 0, activeVariableCount: 0, achievementCount: 0 },
							scenes: {},
							variables: {},
							achievements: {},
							semanticDictionary: {},
						}),
						{ status: 200 }
					)
				);
			}
			if (url.includes("/101.json")) {
				return new Promise<Response>((resolve) => {
					resolveScene1 = resolve;
				});
			}
			if (url.includes("/202.json")) {
				return new Promise<Response>((resolve) => {
					resolveScene2 = resolve;
				});
			}
			return Promise.reject(new Error(`Unexpected URL: ${url}`));
		});

		const { result } = renderHook(() => useCausalSceneLoader());
		await act(async () => {
			await new Promise((r) => setTimeout(r, 0));
		});

		act(() => {
			void result.current.selectSceneById(101);
			void result.current.selectSceneById(202);
		});

		await act(async () => {
			resolveScene2(new Response(JSON.stringify(scene2Chunk), { status: 200 }));
			await new Promise((r) => setTimeout(r, 0));
		});

		expect(result.current.selectedSceneId).toBe(202);
		expect(result.current.sceneChunk?.conversationId).toBe(202);

		// Now late-resolve scene 101 -> must NOT overwrite scene 202
		await act(async () => {
			resolveScene1(new Response(JSON.stringify(scene1Chunk), { status: 200 }));
			await new Promise((r) => setTimeout(r, 0));
		});

		expect(result.current.selectedSceneId).toBe(202);
		expect(result.current.sceneChunk?.conversationId).toBe(202);
	});

	it("fetchSceneChunk forwards AbortSignal", async () => {
		const controller = new AbortController();
		const spy = vi
			.spyOn(globalThis, "fetch")
			.mockResolvedValueOnce(new Response(JSON.stringify({ conversationId: 55 }), { status: 200 }));

		await fetchSceneChunk(55, controller.signal);
		expect(spy).toHaveBeenCalledWith("/data/scenes/55.json", { signal: controller.signal });
	});

	it("evaluateConditionLocally handles ==, !=, >=, <=, and, or", () => {
		const vars = new Map<string, string | number | boolean>([
			["BaseGame.Budget", 4],
			["BaseGame.Agnolia_Alliance", true],
			["BaseGame.Title", "President"],
		]);

		expect(evaluateConditionLocally('Variable["BaseGame.Budget"] >= 4', vars)).toBe(true);
		expect(evaluateConditionLocally('Variable["BaseGame.Budget"] <= 3', vars)).toBe(false);
		expect(evaluateConditionLocally('Variable["BaseGame.Title"] == "President"', vars)).toBe(true);
		expect(evaluateConditionLocally('Variable["BaseGame.Title"] != "King"', vars)).toBe(true);
		expect(
			evaluateConditionLocally(
				'Variable["BaseGame.Agnolia_Alliance"] == true and Variable["BaseGame.Budget"] >= 4',
				vars
			)
		).toBe(true);
		expect(
			evaluateConditionLocally(
				'Variable["BaseGame.Budget"] == 99 or Variable["BaseGame.Agnolia_Alliance"] == true',
				vars
			)
		).toBe(true);
		expect(
			evaluateConditionLocally(
				'Variable["BaseGame.Budget"] == 99 and Variable["BaseGame.Agnolia_Alliance"] == true',
				vars
			)
		).toBe(false);
	});
});
