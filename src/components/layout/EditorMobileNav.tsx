import { useState, memo, useCallback } from "react";
import { TabData } from "../../data/types";
import { MobileSectionDrawer } from "./MobileSectionDrawer";
import { FloatingMobileDock } from "./FloatingMobileDock";
import { MobileHeader } from "./MobileHeader";

interface EditorMobileNavProps {
	fileLoaded: boolean;
	hasErrors: boolean;
	onReset: () => void;
	onDownload: () => void;
	activeTabId?: string;
	onTabChange?: (tabId: string) => void;
	tabs?: TabData[];
	errorCounts?: Record<string, number>;
	filename?: string;
	onShowHelp?: () => void;
	onUploadClick?: () => void;
	onOpenPresets?: () => void;
}

export const EditorMobileNav = memo(function EditorMobileNav({
	fileLoaded,
	hasErrors,
	onReset,
	onDownload,
	activeTabId,
	onTabChange,
	tabs = [],
	errorCounts = {},
	filename = "",
	onShowHelp,
	onUploadClick,
	onOpenPresets,
}: EditorMobileNavProps) {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const handleSelectTab = useCallback(
		(tabId: string) => {
			if (onTabChange) {
				onTabChange(tabId);
			}
		},
		[onTabChange]
	);

	return (
		<>
			{/* Mobile Top Status Header */}
			<MobileHeader title="Suzerain" subtitle="Registry" />

			{/* Option A: Floating Island Dock */}
			<FloatingMobileDock
				fileLoaded={fileLoaded}
				filename={filename}
				hasErrors={hasErrors}
				onReset={onReset}
				onDownload={onDownload}
				onOpenSections={() => setIsDrawerOpen(true)}
				onOpenPresets={onOpenPresets}
				onShowHelp={onShowHelp}
				onUploadClick={onUploadClick}
			/>

			{/* Category Section Drawer */}
			{fileLoaded && (
				<MobileSectionDrawer
					isOpen={isDrawerOpen}
					onClose={() => setIsDrawerOpen(false)}
					tabs={tabs}
					activeTabId={activeTabId || ""}
					onSelectTab={handleSelectTab}
					errorCounts={errorCounts}
				/>
			)}
		</>
	);
});
