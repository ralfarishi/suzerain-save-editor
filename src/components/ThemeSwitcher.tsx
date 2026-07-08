import { MoonIcon, SunDimIcon } from "@phosphor-icons/react";
import { useEffect, useState, memo } from "react";

export const ThemeSwitcher = memo(function ThemeSwitcher() {
	const [theme, setTheme] = useState<"light" | "dark">("dark");

	useEffect(() => {
		// Initialize theme state from document class set by head script
		const isDark = document.documentElement.classList.contains("dark");
		setTheme(isDark ? "dark" : "light");
	}, []);

	const toggleTheme = () => {
		const newTheme = theme === "light" ? "dark" : "light";
		setTheme(newTheme);
		localStorage.setItem("theme", newTheme);
		document.documentElement.classList.toggle("dark", newTheme === "dark");
	};

	return (
		<button type="button"
			onClick={toggleTheme}
			aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
			className="relative flex items-center h-8 w-16 rounded-full border-2 border-slate-400 dark:border-white/20 bg-slate-300 dark:bg-slate-800 transition-none focus:outline-none cursor-pointer hover-tactile shadow-inner"
			title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
		>
			<span className={`
				absolute w-6 h-6 rounded-full border border-black/20 dark:border-white/20 flex items-center justify-center font-mono text-[9px] font-bold text-white dark:text-zinc-950 shadow-sm
				${theme === "dark" 
					? "right-1 bg-brass dark:bg-brass-light" 
					: "left-1 bg-slate-500 dark:bg-slate-400"
				}
			`}>
				{theme === "light" ? <SunDimIcon weight="bold" className="w-3.5 h-3.5" /> : <MoonIcon weight="bold" className="w-3.5 h-3.5" />}
			</span>
		</button>
	);
});

