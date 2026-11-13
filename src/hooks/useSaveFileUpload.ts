import { useState, useCallback, useRef, useEffect } from "react";

const MAX_SAVE_FILE_BYTES = 25 * 1024 * 1024; // 25 MB

export function useSaveFileUpload(
	onFileLoaded: (content: string, filename: string) => void
) {
	const [error, setError] = useState<string | null>(null);
	const readerRef = useRef<FileReader | null>(null);

	useEffect(() => {
		return () => {
			if (readerRef.current && readerRef.current.readyState === FileReader.LOADING) {
				readerRef.current.abort();
			}
			readerRef.current = null;
		};
	}, []);

	const clearError = useCallback(() => {
		setError(null);
	}, []);

	const processFile = useCallback(
		(file: File) => {
			setError(null);

			if (!/\.json$/i.test(file.name)) {
				setError("Please choose a Suzerain save file (.json).");
				return;
			}

			if (file.size > MAX_SAVE_FILE_BYTES) {
				setError("Save file is too large (maximum 25 MB).");
				return;
			}

			if (readerRef.current && readerRef.current.readyState === FileReader.LOADING) {
				readerRef.current.abort();
			}

			const reader = new FileReader();
			readerRef.current = reader;

			reader.onload = (event) => {
				if (readerRef.current !== reader) return;
				const content = event.target?.result;
				if (typeof content !== "string" || !content) {
					setError("The selected file is empty or unreadable.");
					return;
				}
				try {
					onFileLoaded(content, file.name);
				} catch (err) {
					setError(
						err instanceof Error
							? err.message
							: "Could not load save file. Please select a valid Suzerain save."
					);
				}
			};

			reader.onerror = () => {
				if (readerRef.current !== reader) return;
				setError("Could not read the selected file.");
			};

			reader.readAsText(file);
		},
		[onFileLoaded]
	);

	const handleFileInput = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const file = e.target.files?.[0];
			e.target.value = "";
			if (file) {
				processFile(file);
			}
		},
		[processFile]
	);

	return {
		error,
		setError,
		clearError,
		processFile,
		handleFileInput,
	};
}
