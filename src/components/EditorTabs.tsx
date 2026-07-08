import { TabData } from "../data/data";
import { memo } from "react";

interface EditorTabsProps {
	tabs: TabData[];
	activeTabId: string;
	onTabChange: (id: string) => void;
	errorCounts?: Record<string, number>;
}

export const EditorTabs = memo(function EditorTabs({ tabs, activeTabId, onTabChange, errorCounts = {} }: EditorTabsProps) {
	return (
		<div className="flex flex-wrap gap-2 mb-8 border-b-4 border-slate-300 dark:border-white/10 pb-0 items-end px-2">
			{tabs.map((tab) => (
				<button type="button"
					key={tab.id}
					onClick={() => onTabChange(tab.id)}
					className={`
            px-5 py-3 text-xs font-bold uppercase tracking-wider transition-all duration-150 border-2 inline-flex items-center justify-center gap-3 rounded-t cursor-pointer hover-tactile -mb-[4px]
            ${
							activeTabId === tab.id
								? errorCounts[tab.id] > 0
									? "bg-red-50 text-red-900 border-red-300 border-b-red-50 dark:bg-red-950 dark:text-red-200 dark:border-red-900 dark:border-b-red-950 z-10 pt-4"
									: "bg-white text-slate-900 border-slate-300 border-b-white dark:bg-warm-surface-dark dark:text-white dark:border-white/10 dark:border-b-warm-surface-dark z-10 pt-4 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]"
								: errorCounts[tab.id] > 0
									? "bg-red-100 text-red-700 border-red-200 border-b-transparent dark:bg-red-900/30 dark:border-red-900/50 hover:bg-red-200 hover:border-red-300 z-0 opacity-80 hover:opacity-100"
									: "bg-slate-100 text-slate-600 border-slate-200 border-b-transparent hover:bg-slate-200 hover:border-slate-300 dark:bg-black/30 dark:text-slate-400 dark:border-white/5 dark:border-b-transparent dark:hover:bg-white/5 dark:hover:border-white/10 z-0 shadow-inner"
						}
          `}
				>
					<span className="flex items-center gap-2">
						{/* Simulated Grommet */}
						<div className={`w-2 h-2 rounded-full border border-slate-300/50 shadow-inner ${activeTabId === tab.id ? 'bg-slate-200 dark:bg-white/10' : 'bg-slate-300 dark:bg-white/5'}`}></div>
						{tab.label}
					</span>
					{errorCounts[tab.id] > 0 && (
						<span className="px-1.5 py-0.5 text-[10px] font-black font-mono bg-red-600 text-white rounded-sm min-w-[20px] h-[20px] flex items-center justify-center shadow-sm">
							{errorCounts[tab.id]}
						</span>
					)}
				</button>
			))}
		</div>
	);
});

