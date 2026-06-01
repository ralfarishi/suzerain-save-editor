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
		<div className="flex flex-wrap gap-2 mb-8 border-b border-slate-200 dark:border-white/10 pb-4">
			{tabs.map((tab) => (
				<button
					key={tab.id}
					onClick={() => onTabChange(tab.id)}
					className={`
            px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border-2 inline-flex items-center justify-center gap-2
            ${
							activeTabId === tab.id
								? errorCounts[tab.id] > 0
									? "bg-warm-error text-white dark:text-zinc-950 dark:font-bold shadow-lg shadow-warm-error/25 border-warm-error"
									: "bg-warm-accent text-white dark:text-zinc-950 dark:font-bold shadow-lg shadow-warm-accent/25 border-warm-accent"
								: errorCounts[tab.id] > 0
									? "bg-warm-error-bg text-warm-error border-warm-error-border dark:bg-warm-error-bg/30"
									: "bg-slate-200 text-slate-600 hover:bg-slate-300 dark:bg-black/20 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white border-transparent"
						}
          `}
				>
					<span>{tab.label}</span>
					{errorCounts[tab.id] > 0 && (
						<span className="px-1.5 py-0.5 text-[10px] font-bold bg-warm-error text-white dark:text-zinc-950 rounded-full min-w-[18px] h-[18px] flex items-center justify-center shadow-sm">
							{errorCounts[tab.id]}
						</span>
					)}
				</button>
			))}
		</div>
	);
});

