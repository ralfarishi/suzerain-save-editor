import { MoonIcon, SunDimIcon } from "@phosphor-icons/react";
import { useState, memo } from "react";

export function useTheme() {
	const [theme, setTheme] = useState<"light" | "dark">(() => {
		if (typeof document !== "undefined") {
			return document.documentElement.classList.contains("dark") ? "dark" : "light";
		}
		return "dark";
	});

	const toggleTheme = () => {
		const newTheme = theme === "light" ? "dark" : "light";
		setTheme(newTheme);
		localStorage.setItem("theme", newTheme);
		document.documentElement.classList.toggle("dark", newTheme === "dark");
	};

	return { theme, toggleTheme };
}

export const ThemeSwitcher = memo(function ThemeSwitcher() {
	const { theme, toggleTheme } = useTheme();

	return (
		<button
			type="button"
			onClick={toggleTheme}
			aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
			className="relative flex items-center h-8 w-16 rounded-full border-2 border-slate-400 dark:border-white/20 bg-slate-300 dark:bg-slate-800 transition-none focus:outline-none cursor-pointer hover-tactile shadow-inner"
			title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
		>
			<span
				className={`
				absolute w-6 h-6 rounded-full border border-black/20 dark:border-white/20 flex items-center justify-center font-mono text-[9px] font-bold text-white dark:text-zinc-950 shadow-sm
				${theme === "dark" ? "right-1 bg-brass dark:bg-brass-light" : "left-1 bg-slate-500 dark:bg-slate-400"}
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

export const ThemeNavButton = memo(function ThemeNavButton() {
	const { theme, toggleTheme } = useTheme();

	return (
		<button
			type="button"
			onClick={toggleTheme}
			aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
			className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-slate-800/80 border border-white/10 hover:border-brass/40 active:scale-95 text-slate-200 transition-all cursor-pointer group"
			title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
		>
			{theme === "light" ? (
				<SunDimIcon weight="bold" className="w-5 h-5 text-amber-400 mb-0.5 group-active:scale-90" />
			) : (
				<MoonIcon weight="bold" className="w-5 h-5 text-brass mb-0.5 group-active:scale-90" />
			)}
			<span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-300">
				Theme
			</span>
		</button>
	);
});
