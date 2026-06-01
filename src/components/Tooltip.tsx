import * as React from "react";
import { QuestionIcon } from "@phosphor-icons/react";

interface TooltipProps {
	children: React.ReactNode;
	content: React.ReactNode;
}

export function Tooltip({ children, content }: TooltipProps) {
	const [isVisible, setIsVisible] = React.useState(false);

	return (
		<div className="relative inline-block">
			<div
				onMouseEnter={() => setIsVisible(true)}
				onMouseLeave={() => setIsVisible(false)}
				onFocus={() => setIsVisible(true)}
				onBlur={() => setIsVisible(false)}
				className="cursor-help"
			>
				{children}
			</div>
			{isVisible && (
				<div className="absolute bottom-full left-1/2 mb-2 w-64 p-3 bg-warm-surface-light dark:bg-warm-surface-dark border border-warm-border-light dark:border-warm-border-dark rounded-xl shadow-xl z-50 animate-tooltip">
					<div className="flex items-start gap-2">
						<div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg shrink-0">
							<QuestionIcon weight="bold" className="w-4 h-4" />
						</div>
						<div className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
							{content}
						</div>
					</div>
					{/* Arrow */}
					<div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-8 border-transparent border-t-warm-border-light dark:border-t-warm-border-dark" />
					<div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1.5 border-8 border-transparent border-t-warm-surface-light dark:border-t-warm-surface-dark" />
				</div>
			)}
		</div>
	);
}
