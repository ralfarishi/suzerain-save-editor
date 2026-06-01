export type PathwayTag = "Sordland" | "Rizia" | "Reformist" | "Authoritarian" | "Diplomatic" | "Economy";

export interface WalkthroughStep {
	phase: string;
	actions: string[];
}

export interface Pathway {
	id: string;
	title: string;
	subtitle: string;
	sourceName: string;
	sourceLink: string;
	sourceVersion?: string;
	isVerifiedLatest: boolean;
	description: string;
	disclaimer?: string;
	tags: PathwayTag[];
	achievements: string[];
	compatibleAchievements: string[];
	incompatibleAchievements: string[];
	steps: WalkthroughStep[];
}

export const communityPathways: Pathway[] = [
// ─── v3.1.0 VERIFIED ───
	{
		id: "sordland-democratic-reformer",
		title: "The Democratic Reformer",
		subtitle: "Pass constitutional reform & secure a second term",
		sourceName: "Suzerain Community v3.1 Meta-Guide",
		sourceLink: "https://www.reddit.com/r/suzerain/",
		sourceVersion: "3.1.0",
		isVerifiedLatest: true,
		description:
			"The definitive 'good' path for Sordland. Pass a democratic constitution, fix the economy via the Gasom deal, and build a coalition of progressive forces to win re-election as a true Democrat.",
		tags: ["Sordland", "Reformist"],
		achievements: ["The Constitution of '56", "Vectern sis da!", "Second Term", "Democrat"],
		compatibleAchievements: ["Sordish Economic Recovery", "Honorary Soldier", "United Against Communism", "Man of the People"],
		incompatibleAchievements: ["Iron Dictator", "State of Emergency"],
		steps: [
			{
				phase: "Prologue: Foundation",
				actions: [
					"Background: Law student, protest, help everyone. Economics: Don't pick extreme stances yet.",
					"Veto the Campaign Finance Bill immediately to signal democratic intent.",
					"Invest in the Railway or Highway — both work, but Railway is slightly better for economic synergy.",
					"Accept the Gasom deal. Invest 2 bars (Personal Wealth) if possible, but 4 bars (Government Budget) is safer for recovery.",
				],
			},
			{
				phase: "Turn 1–4: The Reform Coalition",
				actions: [
					"Work with Nia Morgan on the most democratic constitution. Lower threshold to 3% or 8%.",
					"Meet with Frens Ricter (PFJP) early. Be transparent about your goals to secure their bloc.",
					"Increase funding for Health and Education. This is critical for public support.",
					"Negotiate the Gasom energy prices to 1/1 to stabilize the region for the long term.",
				],
			},
			{
				phase: "Turn 5–7: Passing the Reform",
				actions: [
					"The 'Salad Conversation' with Justice Isabel Edmonds: Appeal to her legacy and the survival of Sordland. Do not flatter her.",
					"Convince Gloria Tory (USP Conservative) to support 8% threshold if you need her bloc, or skip her if you have enough independent support.",
					"Pass the Assembly vote with at least 167 votes (2/3rds is 166).",
					"Secure the Supreme Court vote (6 justices required). Use the ACP to pressure the Old Guard if needed.",
				],
			},
			{
				phase: "Turn 8–10: Re-election",
				actions: [
					"Sign the Women's Liberation Act and the Minority Rights Act.",
					"Handle the Rumburg threat diplomatically. Appeal to the AN and get them sanctioned.",
					"When Deivid Wisci asks at the end: Confirm you are a 'Democrat'.",
					"Win re-election on a platform of continued reform.",
				],
			},
		],
	},

	// ─── v3.1.0 VERIFIED ───
	{
		id: "sordland-bludish-dream",
		title: "The Bludish Dream",
		subtitle: "Achieve true reconciliation with the Bludish people",
		sourceName: "Suzerain Wiki & Community Guides",
		sourceLink: "https://suzerain.fandom.com/wiki/Achievements",
		sourceVersion: "3.1.0",
		isVerifiedLatest: true,
		description:
			"A highly specific path that requires incredible diplomatic finesse. You must pass a democratic constitution, amend Articles 6 and 7, and successfully implement the Bergia Autonomous Zone without triggering a nationalist coup.",
		tags: ["Sordland", "Reformist", "Diplomatic"],
		achievements: ["A Sordland For All", "We Are All Citizens Of Sordland"],
		compatibleAchievements: ["Democrat", "Welfare State"],
		incompatibleAchievements: ["Iron Dictator", "Operation Bear Trap"],
		steps: [
			{
				phase: "Phase 1: Building Trust",
				actions: [
					"Veto ALL anti-Bludish bills (Religious Harmony, Unified Education).",
					"Do NOT participate in Operation Bear Trap with Wehlen.",
					"Invest in Bergia regional investment early on.",
					"Attend the Aschraf Anniversary and make a conciliatory speech.",
				],
			},
			{
				phase: "Phase 2: Articles 6 & 7",
				actions: [
					"During the Constitutional process, move to amend Articles 6 & 7 to define all as citizens of Sordland.",
					"Negotiate with the WPB and independent leaders (Mansoun Leke).",
					"You must convince both Nia Morgan and Gloria Tory on this—Tory will require you to back down on other points.",
					"Abolish the Member of Honor position to satisfy the progressives during this negotiation.",
				],
			},
			{
				phase: "Phase 3: The Minority Rights Act",
				actions: [
					"Collaborate with Mansoun Leke on the Minority Rights Act.",
					"Establish the Bergia Autonomous Zone by decree or commission.",
					"Ensure the Sordish military (Iosef) is not too unhappy, or they will coup you if unrest is high.",
					"Pass the Sordish Commission for Bludish Rights.",
				],
			},
		],
	},

	{
		id: "rizia-romus-conqueror",
		title: "Rizia: Romus The Conqueror",
		subtitle: "Lead Rizia through war and conquest",
		sourceName: "Steam Community — Rizia Tactics",
		sourceLink: "https://steamcommunity.com/app/1207650/guides/",
		sourceVersion: "3.1.0",
		isVerifiedLatest: true,
		description:
			"The aggressive path for the Kingdom of Rizia. Antagonize Pales, lead the tactical invasion personally, and unify the territories through overwhelming military force. Requires careful management of Rizia's military units.",
		tags: ["Rizia", "Authoritarian"],
		achievements: ["Romus The Conqueror", "Great Unification"],
		compatibleAchievements: ["The Prince", "My Rule Continues"],
		incompatibleAchievements: ["Peaceful Reunification", "Abdication"],
		steps: [
			{
				phase: "Chapter I: Military Expansion",
				actions: [
					"Prioritize military expansion over economic infrastructure.",
					"Build the tank factory and expand the naval dockyards.",
					"Recruit Azaro military specialists and increase manpower early.",
					"Antagonize Pales in early diplomatic meetings; demand full reclamation.",
				],
			},
			{
				phase: "Tactical Phase: The Pales War",
				actions: [
					"When diplomacy fails, choose to personally lead the invasion as Romus Toras.",
					"Utilize the tactical combat system: Use tanks for break-throughs and ships for naval bombardment.",
					"Focus on capturing the port city of Pales early to cut off their supplies.",
					"Maintain high Energy resources to keep the war machine running (use the editor if needed).",
				],
			},
			{
				phase: "Final Phase: Conquest",
				actions: [
					"Capture the capital city of Pales to force a total surrender.",
					"Exile or imprison the Duke of Pales; do not offer terms.",
					"Declare the unification of Pales and Rizia under the Romus Toras crown.",
					"Ensure Hugo's loyalty with spoils of war to prevent internal strife after the conflict.",
				],
			},
		],
	},

	{
		id: "sordland-emergency-path",
		title: "The Emergency Path",
		subtitle: "Work with the Old Guard to preserve the Status Quo",
		sourceName: "Suzerain Old Guard Strategy Hub",
		sourceLink: "https://www.google.com/search?q=suzerain+emergency+path+guide",
		sourceVersion: "3.1.0",
		isVerifiedLatest: true,
		description:
			"The most controversial path. Instead of reform, declare a State of Emergency in Turn 1. You must keep the Old Guard (Chief Justice Orso Hawker) satisfied by following their 'Plan', while avoiding a total collapse of public opinion and the economy.",
		tags: ["Sordland", "Authoritarian"],
		achievements: ["Article 100", "Hawker's Plan", "Soll's Legacy"],
		compatibleAchievements: ["United Against Communism", "Rumburg Victory", "Police State"],
		incompatibleAchievements: ["The Reformist Constitution", "Democrat", "The Bludish Dream"],
		steps: [
			{
				phase: "Turn 1: The Declaration",
				actions: [
					"When meeting with Orso Hawker and Heron Garaci after the opening events, agree that the country is in chaos.",
					"Declare a State of Emergency immediately. This unlocks the 'Article 100' achievement.",
					"Ban the Red Youth or Young Sords (Old Guard usually prefers banning Red Youth) to stabilize the nationalist base.",
					"Agree to Hawker's list of demands: Embargo Rumburg, tighten immigration, and prioritize state control of education.",
				],
			},
			{
				phase: "Turn 2–6: Maintaining the Emergency",
				actions: [
					"Extend the State of Emergency every time it comes up for review (requires 'Hawker's Plan').",
					"Use the Secret State Police to aggressively target opposition leaders like Frens Ricter or the Oligarchs.",
					"Keep your budget in the black; an economic collapse under an emergency is a death sentence for your presidency.",
					"Do NOT attempt to pass any constitutional reforms — the Old Guard will remove you if you stray from the status quo.",
				],
			},
			{
				phase: "Turn 7–10: The Exit Strategy",
				actions: [
					"If you follow Hawker's Plan perfectly, they will support your first and second term without requiring a vote.",
					"Go to the war with Rumburg. The Emergency powers make military mobilization faster and the 'War Machine' achievement easier.",
					"Keep Soll satisfied — visit him on the island and show respect to the Founder's legacy.",
					"Win the war or win re-election to cement the Sollist status quo forever.",
				],
			},
		],
	},

	// ─── v3.1.0 VERIFIED ───
	{
		id: "sordland-iron-dictator",
		title: "The Iron Dictator",
		subtitle: "Seize absolute power and crush all opposition",
		sourceName: "r/suzerain — Community Strategy Threads",
		sourceLink: "https://www.reddit.com/r/suzerain/",
		sourceVersion: "3.1.0",
		isVerifiedLatest: true,
		description:
			"The hardest path in Sordland. Expand executive powers to their absolute limits, neutralise Chief Justice Orso Hawker's Old Guard bloc, control the press, and ensure loyalty through fear. Requires precise management of the 11-justice Supreme Court.",
		tags: ["Sordland", "Authoritarian"],
		achievements: ["The Constitution of Sordland", "Iron Dictator", "State of Emergency", "Second Term"],
		compatibleAchievements: ["Sordish Media Control", "Rumburg Victory"],
		incompatibleAchievements: ["The Reformist Constitution", "The Bludish Dream", "Vectern sis da!"],
		steps: [
			{
				phase: "Prologue: Building the Authoritarian Foundation",
				actions: [
					"Retain Lucian Galade as Chief of Staff — his loyalty and strategic advice are essential on this path.",
					"Establish the Secret State Police (SSP) in your very first cabinet session — this is non-negotiable.",
					"Approach Kesaro Kibener (NFP leader) early and signal willingness to adopt nationalist policies in exchange for his assembly bloc's votes.",
					"Reject the Wehlen trade deal to assert nationalistic, self-reliant economic credibility.",
				],
			},
			{
				phase: "Turn 1–2: Consolidate Early Power",
				actions: [
					"Pass the Sordish Radio & TV Council (Media Control) decree immediately — state media is your propaganda shield.",
					"Approve Capital Punishment and Private Prisons decrees to lock in Kesaro Kibener's NFP cooperation.",
					"Use the SSP to gather intelligence dossiers on the Old Guard justices led by Chief Justice Orso Hawker.",
					"Keep a close eye on Iosef Lancea (Defence Minister) — use the SSP to monitor his loyalty and act if he shows opposition signals.",
				],
			},
			{
				phase: "Turn 3–4: Breaking the Supreme Court",
				actions: [
					"The Old Guard bloc on the Supreme Court is led by Chief Justice Orso Hawker and includes Justice Heron Garaci — they will block your constitution unless neutralised.",
					"Use SSP intelligence dossiers to coerce or arrange the removal of Heron Garaci — he is the most active obstacle after Hawker.",
					"Target Centrist justices (Isabel Edmonds, Arnold Dalton) with political pressure or deals — they can often be persuaded to abstain.",
					"Declare a State of Emergency if your public approval drops dangerously — this also directly unlocks the 'State of Emergency' achievement.",
				],
			},
			{
				phase: "Turn 5: The Dictator Constitution Vote",
				actions: [
					"Ensure your NFP + USP loyalist bloc totals at least 180 Assembly seats before calling the vote.",
					"You need a minimum of 6 justices to not actively oppose the constitution — coercion of Old Guard members is key.",
					"Immediately appoint loyal replacements to any justice seat freed through removal or impeachment.",
					"Pass the Relocation to Rural decree beforehand to neutralise key opposition assembly members.",
				],
			},
			{
				phase: "Turn 6–7: Securing Re-election",
				actions: [
					"Win the war against Rumburg — a military victory creates a massive public approval surge that papers over authoritarian moves.",
					"Maintain media suppression through your state-run TV to prevent negative election coverage.",
					"Keep Public Opinion above 50 — with full media control and a war victory this is very achievable.",
					"Win re-election. With the judiciary, military, and press under your control, the outcome is almost guaranteed.",
				],
			},
		],
	},

	// ─── v3.1.0 VERIFIED ───
	{
		id: "rizia-golden-prosperous-king",
		title: "Rizia: The Prosperous Kingdom",
		subtitle: "Master the economy & diplomacy of the Kingdom of Rizia",
		sourceName: "Suzerain Steam Community Hub — Rizia DLC Guides",
		sourceLink: "https://steamcommunity.com/app/1207650/guides/",
		sourceVersion: "3.1.0 (Sovereign Update)",
		isVerifiedLatest: true,
		description:
			"Navigate the complex politics of King Romus Toras of Rizia. Balance Energy, Authority, and Budget resources while managing noble house rivalries between Hugo and Sal Ignatius, the church, and the Pales question. The Sovereign update (v3.1) significantly reworked this DLC — earlier guides are unreliable.",
		tags: ["Rizia", "Diplomatic", "Economy"],
		achievements: ["A Prosperous Kingdom", "Sovereign", "The Intermerkopum", "Peaceful Reunification"],
		compatibleAchievements: ["The Patriarch", "A New Dynasty"],
		incompatibleAchievements: ["The Warmaster", "Abdication"],
		steps: [
			{
				phase: "Before You Begin: Use the Save Editor",
				actions: [
					"Use the Rizia tab in this editor to set RiziaDLC.Resources_Budget to max before loading your save.",
					"Set Relations_Hugo and Relations_Sal to positive starting values to ease early council management.",
					"Do not max Energy or Authority — the game uses them as a balance mechanic and maxing them from the start can cause scripted events to behave unexpectedly.",
				],
			},
			{
				phase: "Prologue: The Council of Rizia",
				actions: [
					"In your first council session, favour Hugo's faction over Sal Ignatius's bloc when the two conflict — Hugo's noble house is the backbone of early legislative stability.",
					"Accept any opening diplomatic overture from Pales for talks rather than sending troops — this is required for 'Peaceful Reunification'.",
					"Refuse the Church's opening financial demands but offer a vague future concession — negotiate properly in Chapter II from a position of strength.",
					"Prioritise the Eastern Trade Route investment over early military expansion (Tanks, Ships).",
				],
			},
			{
				phase: "Chapter I: Economic Foundation",
				actions: [
					"Sign trade partnership agreements with Wehlen and Agnolia — both deals are needed to reach the 'A Prosperous Kingdom' economic threshold.",
					"Attend the Intermerkopum summit and accept terms with minor concessions — full membership unlocks 'The Intermerkopum' achievement.",
					"Keep Sal Ignatius's relation score positive even when siding with Hugo — offer symbolic concessions to prevent his bloc defecting.",
					"Keep Budget high throughout (use the editor if it drops critically) — a Budget crisis can trigger an early game-over branch.",
				],
			},
			{
				phase: "Chapter II: Noble Houses & The Church",
				actions: [
					"Formally grant the Church limited autonomous status during the Chapter II church dialogue — outright refusal triggers a faith-based coalition against the crown.",
					"When the Hugo vs. Sal Ignatius rivalry peaks, side with Hugo on the core dispute but offer Sal a ceremonial or administrative role as a face-saving gesture.",
					"Do NOT tax the noble houses at this stage — a noble loyalty collapse causes assembly majority loss heading into Chapter III.",
					"Spend Energy resources carefully on your most pressing decrees — Energy does not regenerate quickly.",
				],
			},
			{
				phase: "Chapter III–IV: Pales & The Sovereign Speech",
				actions: [
					"Open formal reunification negotiations with Pales through diplomatic channels — military escalation permanently locks out 'Peaceful Reunification'.",
					"Accept Pales's core demand for cultural and regional autonomy. This is the ONLY dialogue path that unlocks 'Peaceful Reunification'.",
					"Ensure Manpower and Ships resources are at safe levels before Chapter IV using the Rizia tab in the editor — even on a diplomatic path, Rizia must appear militarily credible.",
					"In the final council session, deliver the 'Sovereign' declaration speech to unlock the namesake achievement and complete this pathway.",
				],
			},
		],
	},
];
