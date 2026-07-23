import { lazy, Suspense } from "react";
import { appData } from "../data/data";
import { EditorTabs } from "./EditorTabs";
import { EditorForm } from "./EditorForm";
import { BulkActions } from "./BulkActions";
import { MagicWandSidebar } from "./MagicWandSidebar";
import { ArrowCounterClockwiseIcon } from "@phosphor-icons/react";

import { useSaveEditor } from "../hooks/useSaveEditor";
import { EditorHeader } from "./layout/EditorHeader";
import { EditorMobileNav } from "./layout/EditorMobileNav";
import { EditorFooter } from "./layout/EditorFooter";
import { LandingScreen } from "./layout/LandingScreen";
import { ToastNotification } from "./layout/ToastNotification";

// Lazy load the modal for better initial load performance
const SaveLocationInfo = lazy(() => import("./SaveLocationInfo"));

export function SaveEditor() {
	const {
		fileLoaded,
		originalData,
		values,
		initialValues,
		errors,
		activeTabId,
		setActiveTabId,
		filename,
		toast,
		showHelp,
		setShowHelp,
		stamped,
		handleShowToast,
		handleCloseToast,
		handleFileLoaded,
		handleValueChange,
		handleBulkUpdate,
		handleResetTab,
		handleDownload,
		handleReset,
		activeTab,
		hasErrors,
		errorCounts,
	} = useSaveEditor();

	return (
		<div className="min-h-screen flex flex-col">
			<EditorHeader
				fileLoaded={fileLoaded}
				filename={filename}
				hasErrors={hasErrors}
				onReset={handleReset}
				onDownload={handleDownload}
			/>
			
			<EditorMobileNav
				fileLoaded={fileLoaded}
				hasErrors={hasErrors}
				onReset={handleReset}
				onDownload={handleDownload}
				activeTabId={activeTabId}
				onTabChange={setActiveTabId}
				tabs={appData}
				errorCounts={errorCounts}
				filename={filename}
				onShowHelp={() => setShowHelp(true)}
			/>

			{/* Main Content */}
			<main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{!fileLoaded ? (
					<LandingScreen onFileLoaded={handleFileLoaded} onShowHelp={() => setShowHelp(true)} />
				) : (
					<div className="animate-in fade-in duration-500">
						<EditorTabs
							tabs={appData}
							activeTabId={activeTabId}
							onTabChange={setActiveTabId}
							errorCounts={errorCounts}
						/>

						{activeTab && (
							<div className="relative w-full">
								{appData.map((tab) => {
									const isActive = tab.id === activeTabId;
									const hasNumberActions = ["money-opinion", "rizia", "rizia-military-unit"].includes(tab.id);
									const hasCheckboxActions = ["presidential-decrees", "assembly-court"].includes(tab.id);
									const hasControls = hasNumberActions || hasCheckboxActions;

									return (
										<div
											key={tab.id}
											className={`accordion-grid ${
												isActive ? "accordion-grid-open opacity-100" : "opacity-0 pointer-events-none"
											}`}
										>
											<div className="overflow-hidden">
												<div className="pt-2 pb-6">
													<EditorForm
														sections={tab.sections}
														values={values}
														initialValues={initialValues}
														errors={errors}
														onChange={handleValueChange}
														onUpdateValues={handleBulkUpdate}
														onResetTab={handleResetTab}
													/>
												</div>
											</div>
										</div>
									);
								})}
							</div>
						)}
					</div>
				)}
			</main>

			{/* Magic Wand Sidebar (Only show if a file is loaded) */}
			{fileLoaded && (
				<MagicWandSidebar onApplyPreset={handleBulkUpdate} onShowToast={handleShowToast} />
			)}

			<EditorFooter />
			
			<ToastNotification toast={toast} onClose={handleCloseToast} />

			{/* Help Modal - Lazy Loaded */}
			<Suspense fallback={null}>
				<SaveLocationInfo isOpen={showHelp} onClose={() => setShowHelp(false)} />
			</Suspense>

			{/* Fullscreen Stamp Animation Overlay */}
			{stamped && (
				<div className="fixed inset-0 flex items-center justify-center z-[100] pointer-events-none select-none animate-in fade-in duration-100 backdrop-blur-[2px]">
					<div className="border-8 border-red-600/80 text-red-600/80 font-serif font-black uppercase text-4xl md:text-7xl px-8 py-4 rounded-3xl -rotate-12 border-double tracking-widest shadow-2xl animate-stamp-down bg-white/10">
						[ SAVED & DOWNLOADED ]
					</div>
				</div>
			)}
		</div>
	);
}
