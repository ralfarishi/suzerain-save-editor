import { MoonIcon, SunDimIcon } from "@phosphor-icons/react";
import { useState, useEffect, useCallback, memo } from "react";

type ThemeMode = "light" | "dark";

const themeListeners = new Set<(next: ThemeMode) => void>();

function readCurrentTheme(): ThemeMode {
	if (typeof document !== "undefined") {
		return document.documentElement.classList.contains("dark") ? "dark" : "light";
	}
	return "dark";
}

function applyTheme(next: ThemeMode): void {
	try {
		if (typeof window !== "undefined" && window.localStorage) {
			window.localStorage.setItem("theme", next);
		}
	} catch {
		// Ignore storage access errors (private browsing / quota exceeded)
	}
	if (typeof document !== "undefined") {
		document.documentElement.classList.toggle("dark", next === "dark");
	}
	for (const listener of themeListeners) {
		listener(next);
	}
}

export function useTheme() {
	const [theme, setTheme] = useState<ThemeMode>(readCurrentTheme);

	useEffect(() => {
		themeListeners.add(setTheme);
		return () => {
			themeListeners.delete(setTheme);
		};
	}, []);

	const toggleTheme = useCallback(() => {
		const next: ThemeMode = readCurrentTheme() === "light" ? "dark" : "light";
		applyTheme(next);
	}, []);

	return { theme, toggleTheme };
}

export const ThemeSwitcher = memo(function ThemeSwitcher() {
	const { theme, toggleTheme } = useTheme();

	return (
		<button
			type="button"
			onClick={toggleTheme}
			aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
			className="relative flex items-center h-8 w-16 rounded-full border-2 border-slate-400 dark:border-white/20 bg-slate-300 dark:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass cursor-pointer hover-tactile shadow-inner"
			title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
		>
			<span
				className={`
				absolute left-1 w-6 h-6 rounded-full border border-black/20 dark:border-white/20 flex items-center justify-center font-mono text-[9px] font-bold text-white dark:text-zinc-950 shadow-sm transition-transform duration-150 ease-[cubic-bezier(0.34,1.56,0.64,1)]
				${theme === "dark" ? "translate-x-7 bg-brass dark:bg-brass-light" : "translate-x-0 bg-slate-500 dark:bg-slate-400"}
			`}
			>
				{theme === "light" ? (
					<SunDimIcon weight="bold" className="w-3.5 h-3.5" />
				) : (
					<MoonIcon weight="bold" className="w-3.5 h-3.5" />
				)}
			</span>
		</button>
	);
});
