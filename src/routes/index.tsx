import { createFileRoute } from "@tanstack/react-router";
import { SaveEditor } from "../components/SaveEditor";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

function SaveEditorRoute() {
	useDocumentMeta({
		title: "Suzerain Save Editor | Edit Sordland & Rizia Save Files Online",
		description:
			"Free, 100% client-side Suzerain save editor for Sordland & Rizia (v3.1+). Edit budget, decrees, public opinion, audit 220 achievements, and explore causal walkthroughs.",
		canonicalPath: "/",
	});
	return <SaveEditor />;
}

export const Route = createFileRoute("/")({
	validateSearch: (search: Record<string, unknown>): { tab?: string; focus?: string } => ({
		tab: typeof search.tab === "string" ? search.tab : undefined,
		focus: typeof search.focus === "string" ? search.focus : undefined,
	}),
	component: SaveEditorRoute,
});
