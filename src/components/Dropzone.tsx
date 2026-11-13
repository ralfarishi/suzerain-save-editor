import { FileArrowUpIcon, WarningCircleIcon } from "@phosphor-icons/react";
import React, { useCallback, useState, memo } from "react";
import { useSaveFileUpload } from "../hooks/useSaveFileUpload";

interface DropzoneProps {
	onFileLoaded: (content: string, filename: string) => void;
}

export const Dropzone = memo(function Dropzone({ onFileLoaded }: DropzoneProps) {
	const [isDragging, setIsDragging] = useState(false);
	const { error, processFile, handleFileInput } = useSaveFileUpload(onFileLoaded);

	const handleDragOver = useCallback((e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(true);
	}, []);

	const handleDragLeave = useCallback((e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(false);
	}, []);

	const handleDrop = useCallback(
		(e: React.DragEvent) => {
			e.preventDefault();
			setIsDragging(false);

			const file = e.dataTransfer.files[0];
			if (file) {
				processFile(file);
			}
		},
		[processFile]
	);

	return (
		<div className="w-full h-full">
			<div
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				onDrop={handleDrop}
				className={`
          relative border-2 border-dashed rounded-xl p-10 sm:p-12 text-center transition-colors duration-150 cursor-pointer overflow-hidden
           ${
						isDragging
							? "border-brass bg-amber-50 dark:bg-amber-950/20"
							: "border-slate-300 dark:border-slate-600 bg-slate-50/50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10"
					}
        `}
			>
				{error && (
					<div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none select-none animate-stamp-down">
						<div className="border-4 border-red-600/70 text-red-600/80 font-serif font-black uppercase text-2xl md:text-3xl px-6 py-2.5 rounded-xl -rotate-12 tracking-widest bg-white/95 dark:bg-warm-surface-dark/95 shadow-lg">
							Invalid Save File
						</div>
					</div>
				)}
				<input
					type="file"
					accept=".json"
					aria-label="Upload Save File"
					onChange={handleFileInput}
					className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
				/>

				<div className={`flex flex-col items-center gap-4 relative z-0 transition-opacity ${error ? "opacity-30" : "opacity-100"}`}>
					<div
						className={`w-14 h-14 rounded-full border-2 shadow-sm flex items-center justify-center transition-colors ${
							isDragging
								? "border-brass bg-amber-100 dark:bg-amber-900/30"
								: "bg-white dark:bg-warm-surface-dark border-slate-200 dark:border-white/10"
						}`}
					>
						<FileArrowUpIcon
							className={`w-7 h-7 ${isDragging ? "text-brass" : "text-slate-500 dark:text-slate-400"}`}
						/>
					</div>

					<div>
						<h3 className="font-serif font-bold text-xl text-slate-900 dark:text-white mb-1.5">
							Load Your Suzerain Save File
						</h3>
						<p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
							Drag & drop your Suzerain save file (.json) here, or click to browse.
						</p>
					</div>
				</div>
			</div>

			{error && (
				<div className="mt-4 p-4 bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 flex items-center gap-3 text-red-700 dark:text-red-300 text-sm animate-fade-in">
					<WarningCircleIcon className="w-5 h-5 shrink-0" weight="fill" />
					<span>Could not load file: {error} Please select a valid Suzerain save file.</span>
				</div>
			)}
		</div>
	);
});
