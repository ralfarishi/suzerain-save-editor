import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo, memo, useEffect, useRef, useCallback } from "react";
import {
	ArrowLeftIcon,
	TrophyIcon,
	ArrowSquareOutIcon,
	WarningIcon,
	CheckCircleIcon,
	XCircleIcon,
	CaretDownIcon,
	CaretUpIcon,
	ShieldCheckIcon,
	MagnifyingGlassIcon,
	BooksIcon,
	ListDashesIcon,
	GridFourIcon,
	QuestionIcon,
} from "@phosphor-icons/react";
import { communityPathways, type Pathway, type PathwayTag } from "../data/pathways";
import { steamAchievements } from "../data/steam_achievements";
import { ThemeSwitcher } from "../components/ThemeSwitcher";
import { Tooltip } from "../components/Tooltip";

export const Route = createFileRoute("/achievements")({
	component: AchievementsHub,
});

const TAG_STYLES: Record<PathwayTag, string> = {
	Sordland: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
	Rizia: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
	Reformist: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
	Authoritarian: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
	Diplomatic: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300",
	Economy: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
};

function PathwayCard({ pathway }: { pathway: Pathway }) {
	const [expanded, setExpanded] = useState(false);

	return (
		<div className="bg-warm-surface-light dark:bg-warm-surface-dark rounded-2xl border border-warm-border-light dark:border-warm-border-dark shadow-sm hover:shadow-lg transition-all duration-300">
			{/* Card Header */}
			<div className="p-6 border-b border-warm-border-light dark:border-warm-border-dark">
				<div className="flex items-start justify-between gap-4 mb-3">
					<div className="flex-1">
						<div className="flex items-center gap-2 mb-1 flex-wrap">
							{pathway.tags.map((tag) => (
								<span
									key={tag}
									className={`text-xs font-semibold px-2 py-0.5 rounded-full ${TAG_STYLES[tag]}`}
								>
									{tag}
								</span>
							))}
							{pathway.isVerifiedLatest ? (
								<span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
									<ShieldCheckIcon className="w-3 h-3" />v{pathway.sourceVersion}
								</span>
							) : (
								<span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
									<WarningIcon className="w-3 h-3" />v{pathway.sourceVersion} — May be outdated
								</span>
							)}
						</div>
						<h2 className="text-xl font-bold text-slate-900 dark:text-white">{pathway.title}</h2>
						<p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{pathway.subtitle}</p>
					</div>
					<div className="p-3 bg-warm-accent/10 dark:bg-warm-accent/20 text-warm-accent rounded-xl shrink-0">
						<TrophyIcon className="w-5 h-5" />
					</div>
				</div>

				{/* Source Credit */}
				<p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 flex-wrap">
					<span className="font-medium">Verified Source:</span>
					<a
						href={pathway.sourceLink}
						target="_blank"
						rel="noopener noreferrer"
						className="text-warm-accent hover:text-warm-accent-hover hover:underline inline-flex items-center gap-1"
					>
						{pathway.sourceName}
						<ArrowSquareOutIcon className="w-3 h-3" />
					</a>
				</p>
			</div>

			{/* Disclaimer Banner */}
			{pathway.disclaimer && (
				<div className="mx-6 mt-4 flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/50 rounded-lg">
					<WarningIcon weight="fill" className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
					<p className="text-xs text-amber-700 dark:text-amber-300 leading-relaxed">
						{pathway.disclaimer}
					</p>
				</div>
			)}

			{/* Description */}
			<div className="px-6 pt-4 pb-2">
				<p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
					{pathway.description}
				</p>
			</div>

			{/* Achievements Grid */}
			<div className="px-6 py-4 space-y-3">
				<div>
					<span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 block">
						Primary Achievements
					</span>
					<div className="flex flex-wrap gap-2">
						{pathway.achievements.map((ach) => (
							<span
								key={ach}
								className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1 bg-warm-accent/10 dark:bg-warm-accent/20 text-warm-accent rounded-full border border-warm-accent/30"
							>
								<TrophyIcon className="w-3 h-3" />
								{ach}
							</span>
						))}
					</div>
				</div>

				<div className="grid grid-cols-2 gap-3">
					<div>
						<span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 block">
							Also Compatible
						</span>
						<div className="flex flex-col gap-1">
							{pathway.compatibleAchievements.map((ach) => (
								<span
									key={ach}
									className="inline-flex items-center gap-1.5 text-xs text-green-700 dark:text-green-400"
								>
									<CheckCircleIcon weight="fill" className="w-3.5 h-3.5 shrink-0" />
									{ach}
								</span>
							))}
						</div>
					</div>
					<div>
						<span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 block">
							Incompatible
						</span>
						<div className="flex flex-col gap-1">
							{pathway.incompatibleAchievements.map((ach) => (
								<span
									key={ach}
									className="inline-flex items-center gap-1.5 text-xs text-warm-error"
								>
									<XCircleIcon weight="fill" className="w-3.5 h-3.5 shrink-0" />
									{ach}
								</span>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* Walkthrough Toggle */}
			<div className="px-6 pb-6">
				<button
					onClick={() => setExpanded((v) => !v)}
					className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-warm-accent bg-warm-accent/5 hover:bg-warm-accent/15 border border-warm-accent/20 rounded-lg transition-colors cursor-pointer"
				>
					{expanded ? (
						<>
							<CaretUpIcon className="w-4 h-4" /> Hide Step-by-Step Walkthrough
						</>
					) : (
						<>
							<CaretDownIcon className="w-4 h-4" /> Show Step-by-Step Walkthrough
						</>
					)}
				</button>

				<div
					className={`accordion-grid ${
						expanded ? "accordion-grid-open opacity-100" : "opacity-0 pointer-events-none"
					}`}
				>
					<div className="overflow-hidden">
						<div className="pt-4 space-y-4">
							{pathway.steps.map((step, idx) => (
								<div
									key={step.phase}
									className="border border-warm-border-light dark:border-warm-border-dark rounded-xl overflow-hidden"
								>
									<div className="flex items-center gap-3 px-4 py-3 bg-slate-50 dark:bg-slate-800/60 border-b border-warm-border-light dark:border-warm-border-dark">
										<span className="flex items-center justify-center w-6 h-6 rounded-full bg-warm-accent text-white dark:text-zinc-950 dark:font-bold text-xs font-bold shrink-0">
											{idx + 1}
										</span>
										<h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
											{step.phase}
										</h3>
									</div>
									<ul className="p-4 space-y-2.5">
										{step.actions.map((action, aIdx) => (
											<li
												key={aIdx}
												className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed"
											>
												<span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-warm-accent shrink-0" />
												{action}
											</li>
										))}
									</ul>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

// Precompute pathway mappings to achievements for O(1) lookups
const achievementPathwaysMap = new Map<string, Pathway[]>();
communityPathways.forEach((p) => {
	const allAchs = [...p.achievements, ...p.compatibleAchievements];
	allAchs.forEach((achName) => {
		const lowerName = achName.toLowerCase();
		if (!achievementPathwaysMap.has(lowerName)) {
			achievementPathwaysMap.set(lowerName, []);
		}
		achievementPathwaysMap.get(lowerName)!.push(p);
	});
});

// Extracted Memoized Achievement Card
const AchievementCard = memo(({ ach, onNavigateToGuides }: { ach: any, onNavigateToGuides: () => void }) => {
	const lowerAchName = ach.name.toLowerCase();
	const pathwaysWithAch = achievementPathwaysMap.get(lowerAchName) || [];

	return (
		<div
			className="group flex gap-4 p-4 bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 rounded-xl transition-colors contain-paint"
		>
			<div className="shrink-0 w-16 h-16 rounded-xl overflow-hidden bg-slate-100 dark:bg-black/50 border border-slate-200 dark:border-white/10 group-hover:border-warm-accent/50 transition-colors">
				<img
					src={ach.icon}
					alt={ach.name}
					className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
					loading="lazy"
					decoding="async"
				/>
			</div>
			<div className="flex-1 min-w-0 flex flex-col justify-center">
				<h3
					className="font-bold text-slate-900 dark:text-white line-clamp-1"
					title={ach.name}
				>
					{ach.name}
				</h3>
				<p
					className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed"
					title={ach.description || "Hidden Achievement"}
				>
					{ach.description || (
						<span className="italic opacity-50">Hidden Achievement</span>
					)}
				</p>

				{ach.hint && (
					<div className="mt-1.5 flex items-center gap-1.5">
						<Tooltip content={ach.hint}>
							<div className="flex items-center gap-1.5 px-2 py-1 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 rounded-lg group/tooltip cursor-help transition-all hover:bg-blue-100 dark:hover:bg-blue-900/40">
								<QuestionIcon
									weight="bold"
									className="w-3 h-3 text-blue-600 dark:text-blue-400 group-hover/tooltip:scale-110 transition-transform"
								/>
								<span className="text-[10px] text-blue-700 dark:text-blue-300 font-bold uppercase tracking-wider">
									Hint
								</span>
							</div>
						</Tooltip>
					</div>
				)}

				{pathwaysWithAch.length > 0 && (
					<button
						onClick={onNavigateToGuides}
						className="mt-2.5 flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-warm-accent hover:text-warm-accent-hover w-fit transition-colors cursor-pointer"
					>
						<BooksIcon className="w-3.5 h-3.5" />
						Verify Guide Available
					</button>
				)}
			</div>
		</div>
	);
});

AchievementCard.displayName = "AchievementCard";

function AchievementGallery({ onNavigateToGuides }: { onNavigateToGuides: () => void }) {
	const [searchQuery, setSearchQuery] = useState("");
	const [displayLimit, setDisplayLimit] = useState(24);
	const observerTarget = useRef<HTMLDivElement>(null);

	const filtered = useMemo(() => {
		const query = searchQuery.toLowerCase();
		return steamAchievements
			.filter(
				(ach) =>
					ach.name.toLowerCase().includes(query) || ach.description.toLowerCase().includes(query),
			)
			.sort((a, b) => a.name.localeCompare(b.name));
	}, [searchQuery]);

	// Infinite Scroll Logic
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && displayLimit < filtered.length) {
					setDisplayLimit((prev) => prev + 24);
				}
			},
			{ threshold: 1.0 },
		);

		if (observerTarget.current) {
			observer.observe(observerTarget.current);
		}

		return () => observer.disconnect();
	}, [displayLimit, filtered.length]);

	// Reset limit on search
	useEffect(() => {
		setDisplayLimit(24);
	}, [searchQuery]);

	const visibleAchievements = useMemo(() => {
		return filtered.slice(0, displayLimit);
	}, [filtered, displayLimit]);

	return (
		<div className="space-y-6">
			<div className="relative">
				<MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
				<input
					type="text"
					placeholder="Search 220 achievements by name or description..."
					className="w-full pl-12 pr-4 py-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-warm-accent outline-none text-slate-800 dark:text-slate-100 transition-colors"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
			</div>

			{filtered.length === 0 ? (
				<div className="py-12 text-center text-slate-500 dark:text-slate-400">
					<TrophyIcon className="w-12 h-12 mx-auto mb-3 opacity-20" />
					<p>No achievements found matching "{searchQuery}"</p>
				</div>
			) : (
				<>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{visibleAchievements.map((ach) => (
							<AchievementCard 
								key={ach.name} 
								ach={ach} 
								onNavigateToGuides={onNavigateToGuides} 
							/>
						))}
					</div>
					
					{/* Infinite Scroll Anchor */}
					{displayLimit < filtered.length && (
						<div 
							ref={observerTarget} 
							className="h-20 flex items-center justify-center"
						>
							<div className="w-6 h-6 border-2 border-warm-accent border-t-transparent rounded-full animate-spin"></div>
						</div>
					)}
				</>
			)}
		</div>
	);
}

function AchievementsHub() {
	const [activeTab, setActiveTab] = useState<"guides" | "gallery">("guides");
	const [showOutdated, setShowOutdated] = useState(false);

	const handleNavigateToGuides = useCallback(() => {
		setActiveTab("guides");
	}, []);

	return (
		<div className="min-h-screen transition-colors duration-300">
			{/* Desktop Header - Hidden on Mobile */}
			<header className="hidden md:block bg-white/80 dark:bg-warm-bg-dark/90 border-b border-slate-200 dark:border-white/10 sticky top-0 z-50 backdrop-blur-md transition-colors duration-300">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
					<div className="flex items-center gap-3">
						<h1 className="text-xl font-bold text-slate-900 dark:text-white">
							Suzerain{" "}
							<span className="font-light text-warm-accent">Save Editor</span>
						</h1>
					</div>
					<div className="flex items-center gap-6">
						<Link
							to="/"
							className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-warm-accent transition-colors"
						>
							<ArrowLeftIcon className="w-4 h-4" />
							Back to Editor
						</Link>
						<ThemeSwitcher />
					</div>
				</div>
			</header>

			{/* Mobile Nav Console - 'The Chancellor's Desk' Aesthetic */}
			<nav className="md:hidden fixed bottom-0 left-0 right-0 z-60 bg-warm-bg-light dark:bg-warm-bg-dark border-t-4 border-warm-border-light dark:border-warm-border-dark shadow-[0_-10px_30px_-5px_rgba(0,0,0,0.3)]">
				<div className="absolute inset-0 bg-noise opacity-[0.03] dark:opacity-[0.05] pointer-events-none"></div>
				
				<div className="relative max-w-lg mx-auto px-4 py-3 flex items-end justify-between gap-4">
					{/* Left Utility Cluster */}
					<div className="flex gap-2 p-1 bg-warm-surface-light dark:bg-black/20 rounded-xl border border-warm-border-light dark:border-white/5 shadow-tactile">
						<Link
							to="/"
							className="flex items-center justify-center w-11 h-11 bg-white dark:bg-warm-surface-dark rounded-lg text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-warm-border-dark active:shadow-tactile-press active:translate-y-0.5 transition-all group"
							title="Back to Editor"
						>
							<ArrowLeftIcon weight="bold" className="w-5 h-5 group-active:scale-90 transition-transform" />
						</Link>
						<ThemeSwitcher />
					</div>

					{/* Center Branding/Status - A small "brass" plate */}
					<div className="hidden min-[380px]:flex flex-col items-center mb-1">
						<div className="w-12 h-1 bg-brass dark:bg-brass-light rounded-full mb-1.5 opacity-40"></div>
						<span className="text-[10px] font-black tracking-[0.2em] uppercase opacity-30 dark:opacity-20 italic">
							Archives
						</span>
					</div>

					{/* Right Action Toggle */}
					<button
						onClick={() => setActiveTab(activeTab === "guides" ? "gallery" : "guides")}
						className="relative h-14 px-6 bg-warm-accent hover:bg-warm-accent-hover text-white dark:text-zinc-950 dark:font-bold rounded-xl shadow-[0_4px_0_0_var(--accent-hover-color)] active:shadow-none active:translate-y-1 transition-all flex items-center gap-3 border-t border-warm-accent/30 overflow-hidden group cursor-pointer"
					>
						<div className="absolute inset-0 bg-noise opacity-10 pointer-events-none"></div>
						<div className="relative flex items-center justify-center">
							{activeTab === "guides" ? (
								<GridFourIcon weight="bold" className="w-5 h-5 text-inherit animate-in slide-in-from-top-4 duration-300" />
							) : (
								<ListDashesIcon weight="bold" className="w-5 h-5 text-inherit animate-in slide-in-from-bottom-4 duration-300" />
							)}
						</div>
						<span className="relative text-xs font-black uppercase tracking-widest text-inherit">
							{activeTab === "guides" ? "Gallery" : "Guides"}
						</span>
						
						{/* Indicator LED */}
						<div className="w-1.5 h-1.5 rounded-full bg-warm-accent shadow-[0_0_8px_var(--accent-color)] animate-pulse"></div>
					</button>
				</div>

				{/* Safe Area Spacer for modern phones */}
				<div className="h-4 bg-transparent"></div>
			</nav>

			{/* Mobile Header Bar */}
			<div className="md:hidden flex items-center justify-center py-4 px-6 border-b border-slate-200 dark:border-white/5 bg-white/50 dark:bg-warm-bg-dark/50 backdrop-blur-sm">
				<h1 className="text-sm font-bold opacity-40 uppercase tracking-[0.2em]">
					Achievements <span className="font-light">Hub</span>
				</h1>
			</div>

			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
				{/* Page Header */}
				<div className="mb-8">
					<h2 className="text-4xl font-bold opacity-90 mb-3">Community Hub</h2>
					<p className="text-lg opacity-60 max-w-2xl">
						Explore the complete Sordland & Rizia achievement database, and follow verified pathways
						to stack achievements on your next playthrough.
					</p>
				</div>

				{/* Tabs Navigation - Hidden on Mobile (moved to Dock) */}
				<div className="hidden md:flex gap-2 p-1.5 bg-slate-100 dark:bg-black/20 rounded-xl w-fit mb-8 border border-slate-200 dark:border-white/5">
					<button
						onClick={() => setActiveTab("guides")}
						className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all cursor-pointer ${
							activeTab === "guides"
								? "bg-white dark:bg-white/10 text-warm-accent shadow-sm"
								: "text-slate-500 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-white/5"
						}`}
					>
						<ListDashesIcon
							weight={activeTab === "guides" ? "bold" : "regular"}
							className="w-4 h-4"
						/>
						Pathways & Guides
					</button>
					<button
						onClick={() => setActiveTab("gallery")}
						className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all cursor-pointer ${
							activeTab === "gallery"
								? "bg-white dark:bg-white/10 text-warm-accent shadow-sm"
								: "text-slate-500 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-white/5"
						}`}
					>
						<GridFourIcon
						weight={activeTab === "gallery" ? "bold" : "regular"}
							className="w-4 h-4"
						/>
						All Achievements ({steamAchievements.length})
					</button>
				</div>
				{/* Tab Contents Container */}
				<div className="relative w-full">
					{/* Guides Tab */}
					<div
						className={`accordion-grid ${
							activeTab === "guides"
								? "accordion-grid-open opacity-100"
								: "opacity-0 pointer-events-none"
						}`}
					>
						<div className="overflow-hidden">
							<div className="mb-8 flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700/50 rounded-xl mt-1">
								<ShieldCheckIcon weight="duotone" className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
								<div>
									<p className="text-sm font-semibold text-blue-700 dark:text-blue-300">
										About These Guides
									</p>
									<p className="text-xs text-blue-600 dark:text-blue-400 mt-0.5 leading-relaxed">
										All pathways are cross-referenced against Reddit, Steam Community Guides, and the
										Suzerain Wiki. Guides marked with{" "}
										<span className="font-semibold">⚠ outdated</span> are sourced from older versions
										— core strategy is still accurate but specific dialogue choices may differ in
										v3.1.0+. Always keep a backup save before applying any preset.
									</p>
								</div>
							</div>

							{/* Pathway Cards — toggleable outdated versions */}
							{(() => {
								const verifiedOnly = communityPathways.filter((p) => p.isVerifiedLatest);
								const displayed = showOutdated ? communityPathways : verifiedOnly;
								const hiddenCount = communityPathways.length - verifiedOnly.length;
								return (
									<>
										{hiddenCount > 0 && (
											<div className="flex justify-between items-center mb-6 px-4 py-3 bg-slate-100 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/5 transition-all shadow-sm">
												<p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
													{hiddenCount} pathway{hiddenCount > 1 ? "s" : ""} hidden — pending re-verification for v3.1.0+.
												</p>
												<button
													onClick={() => setShowOutdated(prev => !prev)}
													className="text-xs font-bold text-warm-accent hover:text-warm-accent-hover hover:underline cursor-pointer transition-colors"
												>
													{showOutdated ? "Hide Outdated Guides" : "Show Outdated Guides"}
												</button>
											</div>
										)}
										<div className="space-y-6 pb-6">
											{displayed.map((pathway) => (
												<PathwayCard key={pathway.id} pathway={pathway} />
											))}
										</div>
									</>
								);
							})()}
						</div>
					</div>

					{/* Gallery Tab */}
					<div
						className={`accordion-grid ${
							activeTab === "gallery"
								? "accordion-grid-open opacity-100"
								: "opacity-0 pointer-events-none"
						}`}
					>
						<div className="overflow-hidden">
							<div className="pt-1 pb-6">
								<AchievementGallery onNavigateToGuides={handleNavigateToGuides} />
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
