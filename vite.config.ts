import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

export default defineConfig({
	plugins: [
		TanStackRouterVite({
			autoCodeSplitting: true,
		}),
		react(),
		tailwindcss(),
	],
	build: {
		outDir: "dist",
		sourcemap: false,
		minify: "esbuild",
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes("node_modules")) {
						if (id.includes("react-dom") || id.includes("\\react\\") || id.includes("/react/") || id.includes("scheduler")) {
							return "react-vendor";
						}
						if (id.includes("@tanstack/react-router")) {
							return "router";
						}
						if (id.includes("@phosphor-icons")) {
							return "icons";
						}
						return;
					}
					if (id.includes("src/data/achievement_walkthroughs") || id.includes("src\\data\\achievement_walkthroughs")) {
						return "data-walkthroughs";
					}
					if (id.includes("src/data/pathways") || id.includes("src\\data\\pathways")) {
						return "data-pathways";
					}
					if (id.includes("src/data/steam_achievements") || id.includes("src\\data\\steam_achievements")) {
						return "data-achievements";
					}
				},
			},
		},
	},
});

