import { ArrowCounterClockwiseIcon } from "@phosphor-icons/react";

export const UndoButton = ({ isModified, onUndo }: { isModified: boolean; onUndo: (e: React.MouseEvent) => void }) => {
	if (!isModified) return null;
	return (
		<button
			type="button"
			onClick={onUndo}
			className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-brass dark:text-brass-light hover:text-brass-light dark:hover:text-brass transition-colors bg-brass/10 dark:bg-brass-light/10 hover:bg-brass/20 dark:hover:bg-brass-light/20 px-1.5 py-0.5 rounded cursor-pointer animate-in fade-in zoom-in-95 duration-250"
			title="Undo changes to this field"
			aria-label="Undo changes to this field"
		>
			<ArrowCounterClockwiseIcon className="w-3 h-3" />
			Undo
		</button>
	);
};
