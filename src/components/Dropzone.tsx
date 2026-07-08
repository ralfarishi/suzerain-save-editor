import { FileArrowUpIcon, WarningCircleIcon } from "@phosphor-icons/react";
import React, { useCallback, useState, memo } from "react";

interface DropzoneProps {
	onFileLoaded: (content: string, filename: string) => void;
}

export const Dropzone = memo(function Dropzone({ onFileLoaded }: DropzoneProps) {
	const [isDragging, setIsDragging] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleDragOver = useCallback((e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(true);
	}, []);

	const handleDragLeave = useCallback((e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(false);
	}, []);

	const processFile = useCallback(
		(file: File) => {
			setError(null);
			if (!file.name.endsWith(".json")) {
				setError("Only .json files are supported");
				return;
			}

			const reader = new FileReader();
			reader.onload = (event) => {
				const content = event.target?.result as string;
				onFileLoaded(content, file.name);
			};
			reader.onerror = () => {
				setError("Error reading file");
			};
			reader.readAsText(file);
		},
		[onFileLoaded]
	);

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

	const handleFileInput = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const file = e.target.files?.[0];
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
          relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 cursor-pointer overflow-hidden
           ${
						isDragging
							? "border-brass bg-amber-50 dark:bg-amber-950/20 scale-[1.02]"
							: "border-slate-400 dark:border-slate-500 bg-slate-50/50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 shadow-inner"
					}
        `}
			>
				{error && (
					<div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none select-none animate-stamp-down">
						<div className="border-4 border-red-600/70 text-red-600/70 font-serif font-black uppercase text-3xl md:text-4xl px-8 py-3 rounded-xl -rotate-12 border-double tracking-widest bg-white/90 dark:bg-warm-surface-dark/95 shadow-lg backdrop-blur-sm">
							[ CORRUPTED INTEL ]
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
						className={`w-16 h-16 rounded-full border-2 shadow flex items-center justify-center mb-2 transition-colors ${
							isDragging 
								? "border-brass bg-amber-100 dark:bg-amber-900/30" 
								: "bg-white dark:bg-warm-surface-dark border-slate-200 dark:border-white/10"
						}`}
					>
						<FileArrowUpIcon
							className={`w-8 h-8 ${isDragging ? "text-brass" : "text-slate-500 dark:text-slate-400"}`}
						/>
					</div>

					<div>
						<h3 className="font-serif font-bold text-xl text-slate-900 dark:text-white mb-2">Deposit Classified Save File Here</h3>
						<p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
							Drag & drop your Suzerain save file (.json) to initiate the decryption protocol, or click to browse.
						</p>
					</div>
				</div>
			</div>

			{error && (
				<div className="mt-6 p-4 bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 flex items-center gap-3 text-red-700 dark:text-red-400 font-mono text-sm shadow-inner animate-fade-in">
					<WarningCircleIcon className="w-5 h-5 shrink-0" weight="fill" />
					<span>ERROR LOG: {error}. Please provide a valid Sordish registry file.</span>
				</div>
			)}
		</div>
	);
});


