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
				<div className="absolute bottom-full left-1/2 mb-2 w-64 p-3 bg-amber-50 dark:bg-amber-950/90 border-2 border-brass dark:border-brass-light shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] z-50 animate-tooltip">
					<div className="flex items-start gap-2">
						<div className="p-1 bg-brass text-white dark:text-zinc-950 shrink-0 shadow-sm border border-brass-light">
							<QuestionIcon weight="bold" className="w-4 h-4" />
						</div>
						<div className="text-xs leading-relaxed text-slate-900 dark:text-amber-100 font-mono tracking-tight">
							{content}
						</div>
					</div>
					{/* Arrow */}
					<div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[2px] border-[6px] border-transparent border-t-brass dark:border-t-brass-light" />
				</div>
			)}
		</div>
	);
}
