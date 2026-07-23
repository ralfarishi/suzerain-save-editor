import { Dropzone } from "../Dropzone";
import { QuestionIcon } from "@phosphor-icons/react";

interface LandingScreenProps {
	onFileLoaded: (content: string, name: string) => void;
	onShowHelp: () => void;
}

export function LandingScreen({ onFileLoaded, onShowHelp }: LandingScreenProps) {
	return (
		<div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-auto">
			<div className="text-center mb-10">
				<h2 className="text-3xl sm:text-4xl font-bold font-serif uppercase tracking-widest mb-3 text-slate-900 dark:text-white">
					Suzerain Save Editor
				</h2>
				<p className="text-sm font-serif text-slate-600 dark:text-slate-300 max-w-lg mx-auto mb-6 leading-relaxed">
					Upload your Suzerain save file (<code className="px-1.5 py-0.5 bg-black/10 dark:bg-black/40 font-mono text-xs text-brass rounded">.json</code>) to edit budget, public opinion, decrees, and achievement pathways.
				</p>

				<button
					type="button"
					onClick={onShowHelp}
					className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:text-brass dark:hover:text-brass transition-colors cursor-pointer"
				>
					<QuestionIcon className="w-4 h-4 text-brass" />
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
