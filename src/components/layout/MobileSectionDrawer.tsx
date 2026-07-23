import { TabData } from "../../data/types";
import { XIcon, CheckCircleIcon, RowsIcon } from "@phosphor-icons/react";

interface MobileSectionDrawerProps {
	isOpen: boolean;
	onClose: () => void;
	tabs: TabData[];
	activeTabId: string;
	onSelectTab: (tabId: string) => void;
	errorCounts?: Record<string, number>;
}

export function MobileSectionDrawer({
	isOpen,
	onClose,
	tabs,
	activeTabId,
	onSelectTab,
	errorCounts = {},
}: MobileSectionDrawerProps) {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-70 md:hidden flex flex-col justify-end bg-black/70 backdrop-blur-sm touch-none overscroll-none animate-in fade-in duration-200">
			{/* Backdrop click to close */}
			<button
				type="button"
				aria-label="Close drawer"
				className="flex-1 w-full cursor-default"
				onClick={onClose}
			/>

			{/* Drawer Panel */}
			<div className="bg-slate-900 dark:bg-black border-t-4 border-brass rounded-t-2xl shadow-2xl bg-noise max-h-[80vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300">
				{/* Header */}
				<div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
					<div className="flex items-center gap-2">
						<RowsIcon weight="bold" className="w-5 h-5 text-brass" />
						<h3 className="font-serif font-bold text-sm uppercase tracking-widest text-white">
							State Record Sections
						</h3>
					</div>
					<button
						type="button"
						onClick={onClose}
						className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-white/5 active:scale-95 transition-all cursor-pointer"
						aria-label="Close section drawer"
					>
						<XIcon weight="bold" className="w-5 h-5" />
					</button>
				</div>

				{/* Tab List */}
				<div className="p-4 space-y-2 overflow-y-auto">
					{tabs.map((tab) => {
						const isActive = tab.id === activeTabId;
						const errorCount = errorCounts[tab.id] || 0;

						return (
							<button
								key={tab.id}
								type="button"
								onClick={() => {
									onSelectTab(tab.id);
									onClose();
								}}
								className={`
									w-full flex items-center justify-between p-3.5 rounded-xl border-2 font-serif text-sm font-bold uppercase tracking-wider transition-all cursor-pointer text-left
									${
										isActive
											? "bg-brass text-slate-900 border-brass shadow-[2px_2px_0px_0px_#8B6508]"
											: "bg-slate-800/80 text-slate-200 border-white/10 hover:border-brass/40 hover:bg-slate-800"
									}
								`}
							>
								<span className="truncate">{tab.label}</span>

								<div className="flex items-center gap-2 shrink-0">
									{errorCount > 0 && (
										<span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-red-600 text-white rounded-full">
											{errorCount} {errorCount === 1 ? "err" : "errs"}
										</span>
									)}
									{isActive && (
										<CheckCircleIcon weight="fill" className="w-5 h-5 text-slate-900" />
									)}
								</div>
							</button>
						);
					})}
				</div>

				{/* Bottom Bar */}
				<div className="p-4 border-t border-white/10 bg-black/40 text-center">
					<p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
						Select a category to jump directly to field controls
					</p>
				</div>
			</div>
		</div>
	);
}
