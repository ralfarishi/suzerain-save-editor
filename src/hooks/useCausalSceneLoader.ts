import { useState, useEffect, useCallback, useRef } from "react";
import { CausalGraph, SceneChunk, fetchCausalGraph, fetchSceneChunk } from "../utils/causal-graph";

export function useCausalSceneLoader() {
	const [graph, setGraph] = useState<CausalGraph | null>(null);
	const [loadError, setLoadError] = useState<string | null>(null);
	const [selectedSceneId, setSelectedSceneId] = useState<number | null>(null);
	const [sceneChunk, setSceneChunk] = useState<SceneChunk | null>(null);
	const [loadingScene, setLoadingScene] = useState(false);
	const [sceneError, setSceneError] = useState<string | null>(null);

	const sceneAbortRef = useRef<AbortController | null>(null);
	const requestIdRef = useRef(0);

	const loadGraph = useCallback(() => {
		let cancelled = false;
		setLoadError(null);
		fetchCausalGraph()
			.then((data) => {
				if (!cancelled) {
					setGraph(data);
				}
			})
			.catch((err) => {
				if (!cancelled) {
					setLoadError(err instanceof Error ? err.message : "Could not load scene explorer.");
				}
			});
		return () => {
			cancelled = true;
		};
	}, []);

	useEffect(() => {
		const cleanup = loadGraph();
		return () => {
			cleanup();
			sceneAbortRef.current?.abort();
		};
	}, [loadGraph]);

	const selectSceneById = useCallback(async (convId: number) => {
		sceneAbortRef.current?.abort();
		const controller = new AbortController();
		sceneAbortRef.current = controller;
		const reqId = ++requestIdRef.current;

		setSelectedSceneId(convId);
		setLoadingScene(true);
		setSceneError(null);
		setSceneChunk(null);

		try {
			const chunk = await fetchSceneChunk(convId, controller.signal);
			if (reqId !== requestIdRef.current || controller.signal.aborted) {
				return;
			}
			setSceneChunk(chunk);
		} catch (err) {
			if (reqId !== requestIdRef.current || controller.signal.aborted) {
				return;
			}
			setSceneChunk(null);
			setSceneError(err instanceof Error ? err.message : "Failed to load scene details.");
		} finally {
			if (reqId === requestIdRef.current) {
				setLoadingScene(false);
				if (sceneAbortRef.current === controller) {
					sceneAbortRef.current = null;
				}
			}
		}
	}, []);

	const retryScene = useCallback(() => {
		if (selectedSceneId !== null) {
			void selectSceneById(selectedSceneId);
		}
	}, [selectedSceneId, selectSceneById]);

	return {
		graph,
		loadError,
		retryGraph: loadGraph,
		selectedSceneId,
		setSelectedSceneId,
		sceneChunk,
		loadingScene,
		sceneError,
		selectSceneById,
		retryScene,
	};
}
