import { Dropzone } from "../Dropzone";
import { QuestionIcon } from "@phosphor-icons/react";

interface LandingScreenProps {
	onFileLoaded: (content: string, name: string) => void;
	onShowHelp: () => void;
}

export function LandingScreen({ onFileLoaded, onShowHelp }: LandingScreenProps) {
	return (
		<div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-auto">
			<div className="text-center mb-12">
				<h2 className="text-4xl font-bold font-serif uppercase tracking-widest mb-4 text-slate-900 dark:text-white">
					State Archive Decryption
				</h2>
				<p className="text-sm font-serif opacity-70 mb-8 italic">
					A secure interface for amending state records and classified presidential decisions.
				</p>

				<button type="button"
					onClick={onShowHelp}
					className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-brass transition-colors cursor-pointer"
				>
					<QuestionIcon className="w-4 h-4" />
					Where can I find my save file?
				</button>
			</div>
			<div className="relative">
				<div className="absolute inset-0 bg-amber-50 dark:bg-amber-950/20 shadow-xl rounded-xl -rotate-2 border-2 border-slate-200 dark:border-white/10"></div>
				<div className="relative bg-white dark:bg-warm-surface-dark border-2 border-slate-300 dark:border-white/15 rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] bg-noise">
					<Dropzone onFileLoaded={onFileLoaded} />
				</div>
			</div>
		</div>
	);
}
