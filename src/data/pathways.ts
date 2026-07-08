export type PathwayTag = "Sordland" | "Rizia" | "Reformist" | "Authoritarian" | "Diplomatic" | "Economy" | "Special";

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
	/** ID of a Magic Wand preset that helps set up this pathway's save state */
	presetId?: string;
}

export const communityPathways: Pathway[] = [
	{
		id: "sordland-run-a-dictator",
		title: "Run A — Dictator / Emergency Path",
		subtitle: "Article 100 → SSP kills → Dictator constitution → Soll's Legacy",
		sourceName: "All Suzerain Achievements and How to Get Them (Build 153)",
		sourceLink: "https://steamcommunity.com/sharedfiles/filedetails/?id=3670692943",
		sourceVersion: "3.1.0",
		isVerifiedLatest: true,
		presetId: "sordland-run-a-emergency",
		description:
			"The most concentrated single-run achievement cluster on the authoritarian path. Declare a State of Emergency with Hawker, form the SSP, kill both Petr and Hawker via independent SSP events, pass the Dictator constitution, and end with Soll's Legacy. Compatible with Crocodile Tears, Chessmaster, and both Sollist/Authoritarian ideology endings.",
		disclaimer:
			"Petr Vectern and Orso Hawker SSP kills are triggered by two fully independent plot events — the spy scandal and the emergency-betrayal arc. They are NOT mutually exclusive. Both kills are achievable in a single run.",
		tags: ["Sordland", "Authoritarian"],
		achievements: [
			"Article 100",
			"Hawker's Plan",
			"Sssh!",
			"By Any Means Necessary",
			"Alexius Maximus Reginald the Third",
			"Crocodile Tears",
			"Chessmaster",
			"Soll's Legacy",
			"End of an Era",
			"Obstructionist",
		],
		compatibleAchievements: [
			"Authoritarian",
			"Sollist",
			"Militarist State",
			"Police State",
			"An Offer You Cannot Refuse",
			"“Donations”",
			"Just Another Funeral",
			"The Constitution of '56",
			"Sordish War Machine",
		],
		incompatibleAchievements: [
			"Democrat",
			"Man of the People",
			"The Bludish Dream",
			"A Sordland For All",
			"Freedom and Justice",
			"Vectern sis da!",
		],
		steps: [
			{
				phase: "Prologue",
				actions: [
					"Do NOT join Young Sords or Red Youth — those are separate run targets.",
					"Pick a non-extreme economic stance. You need budget flexibility for the SSP and emergency path.",
				],
			},
			{
				phase: "Turn 1: Foundation",
				actions: [
					"[CRITICAL] Sign the Campaign Finance Bill (do NOT veto). This is the fork away from the democratic path — vetoing locks you out of Merkopa's Most Unfair Election System later.",
					"Pick either L-1 Railway or H-3 Highway as your first infrastructure project (Grand L-1/H-3 Opening).",
					"During the political overview with Petr: take everything from the office, mention the whiskey bottle. Picks up Collectible: Sordish Goat Statue + Collectible: Whiskey Bottle.",
					"Invest in Armadine and avoid a trade war — sets up Collectible: Armadine Radio.",
				],
			},
			{
				phase: "Turn 2",
				actions: [
					"Attend Circas's funeral — this is automatic plot and gives Just Another Funeral (1/3) + Collectible: Circas's Poem Book.",
					"Accept the Koronti media deal when he offers it. This unlocks An Offer You Cannot Refuse.",
				],
			},
			{
				phase: "Turn 3: Form the SSP",
				actions: [
					"[CRITICAL] Choose the Interior (Lileas's) focus for Law & Order. This forms the Secret State Police and unlocks Sssh!.",
					"The SSP is required for every kill order in this run — Petr, Hawker, and any other target.",
				],
			},
			{
				phase: "Turn 4: Chessmaster Setup",
				actions: [
					"[CRITICAL] Play chess with Lucian and deliberately lose (Chessmaster condition 1/4).",
					"[CRITICAL] Do NOT follow Lucian's spy-scandal advice later, and keep him out of the loop on Petr's affairs (Chessmaster condition 2/4).",
					"Complete the railway or highway issue cleanly to receive Collectible: Ceremonial Scissors.",
				],
			},
			{
				phase: "Turn 5: Declare the Emergency",
				actions: [
					"[CRITICAL] When Orso Hawker proposes the State of Emergency, collaborate with him and declare Article 100. Article 100 achievement unlocks immediately.",
					"Reject both superpower aid offers, or pick one consistent with your endgame alliance choice — this doesn't affect emergency progression.",
				],
			},
			{
				phase: "Turn 6",
				actions: [
					"Accept the 3rd Koronti or Tusk bribe when offered. Unlocks \"Donations\".",
					"[CRITICAL] Extend the State of Emergency the first time it comes up for review. (Hawker's Plan progress — 1/2 extensions needed.)",
				],
			},
			{
				phase: "Turn 7: Two SSP Kills (Independent Events)",
				actions: [
					"[CRITICAL] Spy Scandal — Kill Petr Vectern: when the spy scandal breaks, use the SSP to kill him (or choose to blame him alone so he commits suicide). Either resolution triggers Crocodile Tears setup + Just Another Funeral (2/3). Also satisfies By Any Means Necessary.",
					"[CRITICAL] Emergency Betrayal Arc — Kill Hawker: this is a completely separate event from the spy scandal. After aligning with Hawker in Turn 5, you must later betray the Old Guard and go against them. When Hawker rules on the emergency's legality, order Karl to eliminate him. Triggers Alexius Maximus Reginald the Third (his dog also dies) + By Any Means Necessary.",
					"[CRITICAL] Do NOT pick Lucian as VP. (Chessmaster condition 3/4.)",
				],
			},
			{
				phase: "Turn 8",
				actions: [
					"[CRITICAL] Extend the State of Emergency a second time. Hawker's Plan unlocks after this second extension.",
					"Suppress Turn 8 unrest using the military (Militarist State) OR police (Police State) — pick one per run.",
					"If Petr was killed in Turn 7, organize a state funeral for him here. Crocodile Tears unlocks.",
					"[CRITICAL] Get betrayed at Congress (via de-Sollinization) or at the Supreme Court (get impeached) — Chessmaster unlocks (condition 4/4). This simultaneously sets up Impeached if the constitution retains impeachment power and Lucian dislikes you.",
					"Veto bills toward 8 total for Obstructionist. Track your count.",
				],
			},
			{
				phase: "Turn 9: The Dictator Constitution",
				actions: [
					"[CRITICAL] Remove the Member of Honor position AND replace Hawker with Ovid Grecer on the Supreme Court. Both steps are required prerequisites for End of an Era / No Sordland For Old Men.",
					"[CRITICAL] Pass the constitution with no veto limits and no presidential impeachment. This is Soll's Legacy — the ultimate goal of this run.",
					"Use the 'Run A: Emergency Foundations' preset from the Preset Archives (✦ button) to ensure Assembly and Court votes are sufficient before calling the vote.",
					"Keep vetoing bills toward 8 total — Obstructionist unlocks at 8 vetoes.",
					"Lean authoritarian + planned economy in all ideology-related dialogue. Deivid Wisci's endgame assessment will confirm Sollist or Authoritarian based on this.",
				],
			},
			{
				phase: "Turn 10: Soll's Trial & Endgame",
				actions: [
					"[CRITICAL] Put Soll on trial: choose imprisonment for End of an Era, OR reinstate the death penalty by decree and execute him for No Sordland For Old Men. Pick one — they are mutually exclusive.",
					"Reach 8 total vetoes this turn if not already done. Obstructionist unlocks.",
					"Declare war on Rumburg without paying reparations to unlock Sordish War Machine.",
					"When Deivid Wisci assesses you, confirm Sollist or Authoritarian answers to unlock those ideology achievements.",
					"Attend Serge's funeral if he died (Just Another Funeral 3/3).",
				],
			},
		],
	},

	// ─── Run B — Democratic Reformer (v3.1.0 VERIFIED) ───
	{
		id: "sordland-run-b-democratic",
		title: "Run B — Democratic Reformer",
		subtitle: "Veto the bill → build the coalition → pass the constitution → win re-election",
		sourceName: "All Suzerain Achievements and How to Get Them (Build 153)",
		sourceLink: "https://steamcommunity.com/sharedfiles/filedetails/?id=3670692943",
		sourceVersion: "3.1.0",
		isVerifiedLatest: true,
		presetId: "sordland-radical-reformer",
		description:
			"The single most achievement-dense Sordland run. One playthrough captures Man of the People, The Bludish Dream, We Are All Citizens Of Sordland, A Sordland For All, Rags to Riches, Catchphrase, Lawmaker, I Still Love You, Freedom and Justice, and Democrat simultaneously. Note: Pluralist (3% threshold) requires different USP concessions than Articles 6 & 7 — they are mutually exclusive within the same run. Target one or the other; Articles 6 & 7 is recommended as it unlocks more achievements.",
		disclaimer:
			"Pluralist (3% election threshold) and A Sordland For All (Articles 6 & 7) are NOT compatible in the same constitutional negotiation — Gloria Tory will not concede both. Run two separate saves if you want both: one with Articles 6 & 7 (this run), one with 3% threshold only.",
		tags: ["Sordland", "Reformist", "Diplomatic"],
		achievements: [
			"Man of the People",
			"Freedom and Justice",
			"A Sordland For All",
			"The Bludish Dream",
			"We Are All Citizens Of Sordland",
			"Lawmaker",
			"Catchphrase",
			"Rags to Riches",
			"Democrat",
			"I Still Love You",
			"Speaking Louder Makes You Right",
		],
		compatibleAchievements: [
			"The Constitution of '56",
			"Grand National Assembly",
			"Welfare State",
			"Drain the Swamp",
			"An Offer You Cannot Refuse",
			"“Donations”",
			"Just Another Funeral",
			"Pluralist",
		],
		incompatibleAchievements: [
			"Article 100",
			"Hawker's Plan",
			"Soll's Legacy",
			"Iron Dictator",
			"Yollak Bluderat!",
			"Operation Bear Trap",
		],
		steps: [
			{
				phase: "Prologue",
				actions: [
					"Allow Bludish refugees in when the option is presented. This is the first branching point: refusing them sets you on the Yollak Bluderat! path, which is completely incompatible with The Bludish Dream and A Sordland For All.",
					"You do not need to pick a specific background — any background works. Focus on choices that signal a progressive, civic-minded president.",
				],
			},
			{
				phase: "Turn 1: The Foundation Vote",
				actions: [
					"[CRITICAL] Veto the Campaign Finance Bill when it comes to your desk. This is the single most important fork in Run B. Vetoing it is a required prerequisite for Man of the People, Pluralist, and Freedom and Justice. Signing it locks all three out permanently.",
					"Invest in Armadine and take steps to avoid a trade war. This sets up the Rags to Riches eligibility (you need to have started from a non-wealthy background and made smart economic plays).",
					"[CRITICAL] When Walter Tusk offers you his large bribe specifically, accept it. This is what triggers Rags to Riches — it must be Tusk's big offer, not a smaller bribe or Koronti's deal. Also pick up the Collectible: Cigar Box in this scene.",
					"During the political overview meeting with Petr, mention the whiskey bottle. This gives you the Collectible: Whiskey Bottle.",
					"Pick the 'A'Morgna wes core' dialogue option whenever it appears in this turn. This is Catchphrase counter 1 of 7.",
				],
			},
			{
				phase: "Turn 2",
				actions: [
					"Attend Circas's funeral — this is an automatic story event. It contributes Just Another Funeral progress (1/3) and gives you the Collectible: Circas's Poem Book.",
					"Accept the Koronti media deal when he offers it. This unlocks An Offer You Cannot Refuse.",
					"Pick 'A'Morgna wes core' again wherever it appears. Catchphrase counter: 2 of 7.",
				],
			},
			{
				phase: "Turn 3: The Anti-Corruption Push",
				actions: [
					"For Law & Order funding, choose the Justice focus — Nia's plan. This establishes the ACP (Anti-Corruption Police) rather than the SSP, and unlocks Drain the Swamp. This is the opposite choice from Run A.",
					"Pick 'A'Morgna wes core' again. Catchphrase counter: 3 of 7.",
				],
			},
			{
				phase: "Turn 4",
				actions: [
					"Improve workers' rights when the option is presented. This contributes to Man of the People, which requires a suite of progressive policies — this is one of them.",
					"Pick 'A'Morgna wes core' again. Catchphrase counter: 4 of 7.",
				],
			},
			{
				phase: "Turn 5: Securing the Alliance",
				actions: [
					"Do NOT declare a State of Emergency. Declining here keeps the full democratic path open. Declaring it permanently closes you off from every democratic reform achievement.",
					"Increase funding for health and education. Both are required for Welfare State, and together with the Turn 1 veto and workers' rights, they feed into Man of the People.",
					"[CRITICAL] When dealing with Frens Ricter (PFJP leader), do not bribe him to secure his bloc. Accept his offer as a genuine political alliance instead. Bribing him blocks Freedom and Justice entirely.",
					"Pick 'A'Morgna wes core' again. Catchphrase counter: 5 of 7.",
				],
			},
			{
				phase: "Turn 6: Launch the Reform",
				actions: [
					"Accept a third bribe offer from Koronti or Tusk when it arrives — this unlocks the 'Donations' achievement (3 bribes accepted total).",
					"[CRITICAL] Formally initiate the constitutional reform process this turn, aiming for a democratic overhaul. This triggers the Freedom and Justice chain — once you confirm Ricter's alliance, Freedom and Justice will unlock when the reform passes.",
					"Pick 'A'Morgna wes core' again. Catchphrase counter: 6 of 7.",
				],
			},
			{
				phase: "Turn 7: The Bludish Package",
				actions: [
					"[CRITICAL] Push to amend Articles 6 & 7 during the constitutional negotiation. To succeed you need: Gloria Tory, Albin, and Frens Ricter all on board, plus spend at least 1 Personal Wealth lobbying. When these conditions are met, A Sordland For All unlocks. Note: if you also want Pluralist (3% threshold), that requires different concessions from Gloria Tory — you cannot have both in the same run. Articles 6 & 7 is the recommended choice as it chains into more achievements.",
					"[CRITICAL] Separately establish the Bludish Autonomous Zone and the Minority Rights Committee this turn. Both structures are required prerequisites for The Bludish Dream. In addition, you must arrest Ejall (the Bludish extremist) and revert the EPA back to 10% as part of securing USP support. All four of these steps must be done — Zone, Committee, Ejall arrest, EPA revert.",
					"[CRITICAL] Throughout the game (not just this turn), maintain an overall positive relationship with the Bludish minority: allow their refugees in (done in Prologue), invest in Bergia, veto any anti-Bludish legislation, and be conciliatory at the Aschraf ceremony. A few slip-ups are forgivable if the overall arc is clearly positive.",
					"Pick 'A'Morgna wes core' one final time — this is the 7th and last opportunity. Catchphrase unlocks.",
				],
			},
			{
				phase: "Turn 8: Monica and the Commission",
				actions: [
					"[CRITICAL] When Mansoun Leke approaches you about forming the Minority Rights Commission, immediately promise your support. This is a required setup step for We Are All Citizens Of Sordland — if you decline or delay, the achievement chain breaks.",
					"[CRITICAL] During the office exploration scene with Petr, take everything from the cabinets — specifically, make sure to pick up the photo from the filing cabinet. This is I Still Love You step 1 of 2. Missing the photo here makes the achievement impossible.",
					"Vote to pass the Women's Rights bill when it comes up — this is a prerequisite condition for I Still Love You step 2.",
					"Sign bills wherever you can. You need 10 total bill-signings for Lawmaker, so track your count from here through Turn 9.",
				],
			},
			{
				phase: "Turn 9: The Payoff",
				actions: [
					"[CRITICAL] When the scene plays out with Monica drinking at home, show her the photo you picked up from the filing cabinet and reaffirm that you love her just as much now. This triggers I Still Love You. Missing the photo in Turn 8 means this moment is unavailable.",
					"[CRITICAL] Once the Minority Rights Commission bill clears the National Assembly, sign it immediately. This triggers We Are All Citizens Of Sordland.",
					"Continue signing bills. By the end of Turn 9 you need 10 total. If you're short, check what else is on your desk — health, education, and stimulus bills all count toward Lawmaker.",
					"Complete the full package of health funding, education investment, and economic stimulus. Combined with the Turn 1 veto and prior workers' rights improvements, this triggers Man of the People.",
					"Push the 3% election threshold only if you did NOT take the Articles 6 & 7 path in Turn 7. If you already did Articles 6 & 7, skip Pluralist for this run.",
				],
			},
			{
				phase: "Turn 10: The Vote",
				actions: [
					"The constitution comes to a final National Assembly vote. During the extended vote scene, you will be given repeated dialogue options. [CRITICAL] Pick the all-caps ('shouting') dialogue option exactly 4 times in a row during this single scene. All 4 must be within this one scene — scattering them across different turns in the game does not count. This unlocks Speaking Louder Makes You Right.",
					"The constitution passes — The Constitution of '56 and Grand National Assembly unlock together.",
					"Freedom and Justice unlocks here as well, since you initiated reform without bribing Ricter and now the constitution is law.",
					"[CRITICAL] When Deivid Wisci conducts his final ideological assessment, pick balanced, pluralistic, centre-left answers. Confirm that you identify as a Democrat. Democrat unlocks.",
				],
			},
		],
	},

	// ─── Run C1 — Rizia: Family & Faith (v3.1.0 VERIFIED) ───
	{
		id: "rizia-run-c1-faith",
		title: "Run C1 — Rizia: Family & Faith",
		subtitle: "Marry Lucita → theocracy decrees → declare son as heir → Wruhec's Second Coming",
		sourceName: "All Suzerain Achievements and How to Get Them (Build 153)",
		sourceLink: "https://steamcommunity.com/sharedfiles/filedetails/?id=3670692943",
		sourceVersion: "3.1.0",
		isVerifiedLatest: true,
		presetId: "rizia-golden-kingdom",
		description:
			"The faith-focused Rizia run. Spare Bruno the boar (A King's Best Friend), romance and marry Lucita using Lena's ring (Ready To Love Again), accept Taddeus as war councillor and install Angelica as Duchess (Mom and Dad), decree 5 sanctuaries (Sanctuary! Sanctuary!), and enact full theocratic reform (Wruhec's Second Coming + By Nur's Will, I Decree!). Say 'Halaita' 10 times (So It Is) and 'Glovurius axa Rizia' 10 times (Blaze of Glory) throughout. Alternative to theocracy: keep all three religions happy for Nurists United instead — both cannot be done in the same run.",
		disclaimer:
			"Wruhec's Second Coming (full theocracy) and Nurists United (all religions happy) are mutually exclusive — pick one per run. Theocracy is also incompatible with Out And Proud (decriminalizing homosexuality) — see Run C2 for the romance/LGBT path.",
		tags: ["Rizia", "Authoritarian"],
		achievements: [
			"Wruhec's Second Coming",
			"By Nur's Will, I Decree!",
			"The Prince",
			"Ready To Love Again",
			"Mom and Dad",
			"Sanctuary! Sanctuary!",
			"So It Is",
			"Blaze of Glory",
			"A King's Best Friend",
			"It's Not You, It's Me",
		],
		compatibleAchievements: [
			"Smolak's Smokes",
			"My Rule Continues",
			"The Force in South Merkopa",
		],
		incompatibleAchievements: [
			"Nurists United",
			"Out And Proud",
			"Reform Or Die",
			"Rizian Charter of Fundamental Law",
		],
		steps: [
			{
				phase: "Prologue: Setting the Stage",
				actions: [
					"[CRITICAL] When the opening choices are presented, choose to spend the evening with your family — do not go hunting alone or choose the military focus. Choosing family here is the prerequisite for A King's Best Friend (you need to be on the hunting trip later with the right companions).",
					"Choose to love your wife Lena and pick the affectionate options. This gives you the Collectible: Lena's Wedding Ring which you will give to Lucita later in Turn 8 for Ready To Love Again.",
					"Be religious in your opening choices — agree with religious framing and show reverence. This opens the St. Dast's Scepter collectible path with Sal Ignacius.",
					"Be warm and friendly toward Pabel in your early interactions. This is required for the Turn 4 drinking game scene that leads to It's Not You, It's Me.",
					"Pick 'Halaita' and 'Glovurius axa Rizia' every time they appear as dialogue options from the very start. Both need 10 uses over the course of the entire game — So It Is (1/10) and Blaze of Glory (1/10).",
				],
			},
			{
				phase: "Turn 1: The Hunting Trip",
				actions: [
					"[CRITICAL] Go on the hunting trip with Rico, Hugo, or Vina (the KA-74 outing). When you encounter the boar, aim to shoot it — but at the critical moment, spare Bruno. The act of sparing him, not the hunting trip itself, is what counts. This sets up A King's Best Friend for later in the run.",
					"If you shoot Bruno instead, you will get the Dog Toy and Bull Figurine collectibles (via Vina/Rico marriage) but permanently block A King's Best Friend. Choose only one path per run.",
					"At the Plavo convocation with Sal Ignacius, be openly religious, agree with his framing, and accept the scepter he offers. You receive the Collectible: St. Dast's Scepter.",
					"Continue saying 'Halaita' and 'Glovurius' at every opportunity. So It Is (2/10), Blaze of Glory (2/10).",
				],
			},
			{
				phase: "Turn 2",
				actions: [
					"Multiple 'Halaita' opportunities appear in this turn — pick all of them. So It Is reaches 4/10.",
					"One 'Glovurius' opportunity. Blaze of Glory reaches 3/10.",
					"No critical forks this turn — focus on maintaining good relations with religious advisors.",
				],
			},
			{
				phase: "Turn 3: The Investigation",
				actions: [
					"[CRITICAL] When the investigation into your father's death begins, agree with Pabel's assessment of what happened. Then fund either Lucita or Titus to lead the investigation, and keep the focus on Sal Ignacius as a person of interest. Completing this sequence correctly gives you the Collectible: Mandragora Extract.",
					"Continue picking 'Halaita' whenever it appears. So It Is reaches 5/10.",
				],
			},
			{
				phase: "Turn 4: The Drinking Game",
				actions: [
					"[CRITICAL] When the noble drinking game is arranged, join it. Invite Pabel to attend with you, and at the end of the night, let him escort you to your room. This opens both the It's Not You, It's Me scene and the Out And Proud path (the latter only matters if you're doing Run C2).",
					"[CRITICAL] During the Lucita scene, show genuine interest — ask her about herself, engage warmly. This starts the romance arc that leads to Ready To Love Again and The Prince later in the run. It also opens the Azaro Chess Piece collectible.",
					"[CRITICAL] The It's Not You, It's Me achievement happens in this scene: Pabel will hint at romantic interest — acknowledge it briefly then gently reject him. Then when Lucita comes to your room, let her in and reject her as well. Both rejections must happen in the same night to unlock It's Not You, It's Me.",
					"Say 'Halaita' and 'Glovurius' at all opportunities. So It Is reaches 6/10, Blaze of Glory reaches 5/10.",
				],
			},
			{
				phase: "Turn 5: Diplomacy and Luxury",
				actions: [
					"During the MITZ trade negotiation with Morella, accept the terms on your first attempt and aim for a satisfactory outcome without renegotiating. Success on the first try gives you the Collectible: Morellan Tin Bird.",
					"Fully fund the royal yacht restoration, including importing Wehzek timber to reduce the cost. Complete restoration gives you the Collectible: RRN Rizania Model.",
					"In the Wehlen trade deal, make sure to include tobacco as part of the terms. This sets up the Smolak's Smokes achievement next turn.",
					"Say 'Halaita' and 'Glovurius' at every opportunity. So It Is reaches 7/10, Blaze of Glory reaches 6/10.",
				],
			},
			{
				phase: "Turn 6: The Religious Direction",
				actions: [
					"[CRITICAL] In your meeting with Sal Ignacius regarding the religious direction of Rizia, clearly state that Rizia should remain a Wruhecist state and that you are open to greater religious influence in government. This is the direct prerequisite for Wruhec's Second Coming — a non-committal or secular answer here closes the theocracy path.",
					"If you completed the Wehlen tobacco deal in Turn 5, distribute free cigarettes to the population this turn via Smolak's connection. Smolak's Smokes unlocks.",
					"Say 'Halaita' and 'Glovurius' again. So It Is reaches 8/10, Blaze of Glory reaches 7/10.",
				],
			},
			{
				phase: "Turn 7: House Affairs",
				actions: [
					"[CRITICAL] When the Angelica Sazon situation arises, pardon her before the Iza University decision is made. Then depose or arrest Rico and install Angelica as the new Duchess. This grants the Collectible: Iza Gate Key and is a prerequisite for Mom and Dad.",
					"[CRITICAL] When Taddeus presents his petition, accept him as your war councillor. Combined with the Angelica Sazon step, this unlocks Mom and Dad.",
					"[CRITICAL] Continue following Sal Ignacius's religious guidance. Do NOT legalize homosexuality or change the state religion this turn — doing so immediately closes the Wruhec's Second Coming path. The theocracy decrees come in Turn 8.",
					"Say 'Halaita' and 'Glovurius' at every chance. So It Is reaches 9/10, Blaze of Glory reaches 8/10.",
				],
			},
			{
				phase: "Turn 8: Marriage, Heir, and Theocracy",
				actions: [
					"[CRITICAL] Marry Lucita. When the moment arrives, give her Lena's ring (the one from the Prologue collectible) rather than any other ring. Using Lena's ring is the specific condition for Ready To Love Again.",
					"[CRITICAL] After your son is born, formally declare him as your heir. This triggers The Prince, and you also receive the Collectible: Lucita's Dagger.",
					"Decree 5 sanctuaries via the religious policy tab. All 5 must be in place this turn. When the 5th is enacted, Sanctuary! Sanctuary! unlocks.",
					"[CRITICAL] Enact all the new theocratic religious decrees Sal Ignacius proposes — including banning non-Wruhecist religions and integrating religious law further into governance. When you complete the full set, Wruhec's Second Coming and By Nur's Will, I Decree! both unlock.",
					"Alternative path (mutually exclusive): if you want Nurists United instead of Wruhec's Second Coming, keep all three religious groups (Wruhecist, Dastnurist, Golcondist) happy throughout the game — restore all sanctuaries, fund the theological school, offer religious tax relief, and unban Golcondism. You cannot pursue both Nurists United and Wruhec's Second Coming in the same run.",
					"Say 'Halaita' one final time — this is your 10th opportunity. So It Is unlocks.",
				],
			},
			{
				phase: "Turn 9: Final Flourish",
				actions: [
					"Seek out the remaining two 'Glovurius axa Rizia' dialogue options — Turns 9 is your last chance to reach 10 if you missed any earlier. Blaze of Glory unlocks at 10.",
					"A King's Best Friend unlocks during this stretch if all conditions are met — having spared Bruno and maintained the storyline through the game.",
					"If you are doing the theocracy path, do NOT decriminalize homosexuality here. That action is reserved for Run C2 only.",
				],
			},
		],
	},

	// ─── Run C2 — Rizia: Family & Romance (v3.1.0 VERIFIED) ───
	{
		id: "rizia-run-c2-romance",
		title: "Run C2 — Rizia: Family & Romance",
		subtitle: "Spare Bruno → drinking game → decriminalize → make Pabel a lord → Out And Proud",
		sourceName: "All Suzerain Achievements and How to Get Them (Build 153)",
		sourceLink: "https://steamcommunity.com/sharedfiles/filedetails/?id=3670692943",
		sourceVersion: "3.1.0",
		isVerifiedLatest: true,
		presetId: "rizia-golden-kingdom",
		description:
			"The romance-focused Rizia run. Spare Bruno (A King's Best Friend), reject both Pabel and Lucita in the same drinking-game night (It's Not You, It's Me), then decriminalize homosexuality by the start of Turn 8, grant Pabel a lordship, and publicly acknowledge the relationship (Out And Proud + Collectible: Pabel's Poem). Continue saying 'Halaita' (So It Is) and 'Glovurius' (Blaze of Glory) throughout. This run is fully incompatible with theocracy — if you want Wruhec's Second Coming, use Run C1.",
		disclaimer:
			"Out And Proud requires decriminalizing homosexuality no later than the start of Turn 8. The decriminalization decree itself is available in Turn 7 — do it there. Waiting until Turn 9 is too late.",
		tags: ["Rizia", "Reformist"],
		achievements: [
			"Out And Proud",
			"It's Not You, It's Me",
			"A King's Best Friend",
			"So It Is",
			"Blaze of Glory",
		],
		compatibleAchievements: [
			"The Prince",
			"Ready To Love Again",
			"Smolak's Smokes",
			"Nurists United",
			"My Rule Continues",
		],
		incompatibleAchievements: [
			"Wruhec's Second Coming",
			"By Nur's Will, I Decree!",
			"Tradition is Our Compass",
		],
		steps: [
			{
				phase: "Prologue: The Same Start",
				actions: [
					"[CRITICAL] Choose family time (not hunting alone, not military focus) — same as Run C1. This is the prerequisite for getting on the Bruno hunting trip in Turn 1.",
					"Be warm and friendly toward Pabel from the very first meeting. His comfort with you is required for the Turn 4 drinking game scene.",
					"Begin saying 'Halaita' and 'Glovurius axa Rizia' every time they appear. You need 10 of each across the full game — So It Is (1/10) and Blaze of Glory (1/10).",
				],
			},
			{
				phase: "Turn 1: Spare Bruno",
				actions: [
					"[CRITICAL] Go on the KA-74 hunting trip with Rico, Hugo, or Vina. When you encounter the boar, aim but spare Bruno at the decisive moment. This sets up A King's Best Friend. Shooting him instead permanently blocks the achievement.",
					"Continue 'Halaita' and 'Glovurius' tracking. So It Is (2/10), Blaze of Glory (2/10).",
				],
			},
			{
				phase: "Turns 2–3",
				actions: [
					"No critical forks for this achievement cluster. Maintain friendly relations with Pabel.",
					"Pick every 'Halaita' and 'Glovurius' option available. So It Is reaches 5/10, Blaze of Glory reaches 3/10.",
				],
			},
			{
				phase: "Turn 4: The Drinking Game",
				actions: [
					"[CRITICAL] When the drinking game is held, join it. Make sure Pabel is invited and let him escort you to your room at the end of the night.",
					"[CRITICAL] In the night scene, Pabel will hint at feelings — briefly engage, then reject him gently. Then when Lucita comes to your room, let her in, but reject her too. Both rejections must happen in this same scene for It's Not You, It's Me to unlock.",
					"Unlike Run C1, you are not required to pursue a romance with Lucita after this — the rejection is the endpoint for It's Not You, It's Me.",
					"Continue 'Halaita' and 'Glovurius'. So It Is reaches 6/10, Blaze of Glory reaches 5/10.",
				],
			},
			{
				phase: "Turns 5–6",
				actions: [
					"Complete the MITZ deal on your first attempt (Collectible: Morellan Tin Bird) and fully fund the yacht (Collectible: RRN Rizania Model) — same as Run C1, these are compatible.",
					"Do NOT restrict or discourage Pabel. Maintain his loyalty and positive relationship.",
					"[CRITICAL] In Turn 6, when Sal Ignacius asks about religious direction — do NOT commit to theocracy. Give a more neutral or secular answer. Committing to Wruhecist supremacy here will conflict with decriminalization in Turn 7.",
					"Say 'Halaita' and 'Glovurius' at every opportunity. So It Is reaches 8/10, Blaze of Glory reaches 7/10.",
				],
			},
			{
				phase: "Turn 7: Decriminalize",
				actions: [
					"[CRITICAL] Enact the decree to decriminalize homosexuality in Turn 7. This must be done before the start of Turn 8 — it is the hard deadline for Out And Proud. Do not wait until Turn 9; that is too late.",
					"This directly conflicts with the theocracy decrees (Run C1). You cannot decriminalize AND enact religious bans in the same run.",
					"Pick 'Halaita' and 'Glovurius' at all available moments. So It Is reaches 9/10, Blaze of Glory reaches 8/10.",
				],
			},
			{
				phase: "Turn 8–9: The Public Acknowledgment",
				actions: [
					"[CRITICAL] Grant Pabel a formal lordship — elevate him to a noble title within Rizia's court.",
					"[CRITICAL] Publicly acknowledge the relationship with Pabel. This is the final step that triggers Out And Proud. You also receive the Collectible: Pabel's Poem.",
					"Collect your final 'So It Is' and 'Blaze of Glory' opportunities. Both need to reach 10 — So It Is unlocks, Blaze of Glory unlocks.",
					"A King's Best Friend unlocks here as well if all prior conditions were met (spared Bruno, maintained the story arc).",
				],
			},
		],
	},

	// ─── Run D — Rizia: Diplomacy & Economy (v3.1.0 VERIFIED) ───
	{
		id: "rizia-run-d-diplomacy",
		title: "Run D — Rizia: Diplomacy & Economy",
		subtitle: "Third Way → Pales alliance → Zille reunion → Great Unification → Golden Age",
		sourceName: "All Suzerain Achievements and How to Get Them (Build 153)",
		sourceLink: "https://steamcommunity.com/sharedfiles/filedetails/?id=3670692943",
		sourceVersion: "3.1.0",
		isVerifiedLatest: true,
		presetId: "rizia-golden-kingdom",
		description:
			"The most politically complex Rizia run. Pursue Third Way diplomacy with Pales to form a military alliance (Peace to the Duke), bring Zille home without a referendum by earning Smolak's trust (Trustworthy Friends), arrange Vina's marriage to Axel Reinhart (Glovurius axa Rizia axa Pales), achieve Great Unification with both Pales and Zille secured, distance from Rumburg to exit GRACE (Fall from GRACE), fund the Intermerkopum (Intermerkopum Alliance), complete all three Sordland trade deals (Sords, Our Friends), appoint Rusty to the Porte Drazon Stock Exchange (The Golden Bells Ring), enact tax credits with his cooperation (The Kingdom Incorporated), and maintain high living standards for a Golden Age of Rizia. Use the 'Rizia: Golden Kingdom' preset to ensure your Budget, Authority, and Relations are in good shape.",
		disclaimer:
			"Great Unification requires BOTH Zille AND Pales secured through diplomacy — not the war path. Do not start the Pales war. Peace to the Duke requires Axel Reinhart to be a military ally, not a defeated enemy. Run D is fundamentally incompatible with Run C1's theocracy path and the Romus Conqueror war path.",
		tags: ["Rizia", "Diplomatic", "Economy"],
		achievements: [
			"Great Unification",
			"Glovurius axa Rizia axa Pales",
			"Peace to the Duke",
			"Intermerkopum Alliance",
			"Fall from GRACE",
			"Sords, Our Friends",
			"Golden Age of Rizia",
			"The Golden Bells Ring",
			"The Kingdom Incorporated",
			"Case Closed",
		],
		compatibleAchievements: [
			"Trustworthy Friends",
			"Smolak's Smokes",
			"My Rule Continues",
			"Blaze of Glory",
			"So It Is",
		],
		incompatibleAchievements: [
			"Romus The Conqueror",
			"Blitzkrieg",
			"Father's Son",
			"Long Arm of Tzarborough",
			"Tattered Kingdom",
		],
		steps: [
			{
				phase: "Turn 1: Third Way",
				actions: [
					"Choose the 'Third Way' diplomatic stance when it is presented as an option. This is the foundational prerequisite for Peace to the Duke — it signals to Pales that you are interested in partnership rather than conquest.",
					"Begin the Sordland relationship-building early: initiate talks around wine and whiskey trade, the resort deal, and bond discussions. All three Sordland deals must be completed without reneging to unlock Sords, Our Friends — plant the seeds now.",
				],
			},
			{
				phase: "Turn 3: Investments and Investigations",
				actions: [
					"[CRITICAL] Send a diplomatic envoy to Pales. This is required progress toward Peace to the Duke — Pales needs to see goodwill efforts from Rizia before Axel Reinhart will agree to a military alliance later.",
					"[CRITICAL] Fund the Golden Guard when the option is presented. This sets up the Case Closed / House Cleaning investigation chain. Stay focused on the Su Omina branch of the investigation for Case Closed specifically.",
					"[CRITICAL] Purchase the entire Aureus oil field by Turn 4. Full purchase gives you the ROG Plaque collectible. This is also linked to the Save the Princess option if you were doing the war path — but in Run D, you buy it for economic reasons, not military ones.",
				],
			},
			{
				phase: "Turn 4: The Sordland Bond",
				actions: [
					"When the Sordland bond talks conclude, accept the terms and choose to hold the discussions in Holsord with a 1-budget contribution. This counts as progress toward Sords, Our Friends (deal 1 of 3).",
				],
			},
			{
				phase: "Turn 5: Wehlen and GRACE",
				actions: [
					"[CRITICAL] Close the Wehlen trade deal with two specific inclusions: wine (which connects to the Sordland wine deal chain) and environmental protections. Both are needed to satisfy Sords, Our Friends and to build the Trustworthy Friends bond with Wiktor Smolak of Wehlen.",
					"[CRITICAL] Take concrete steps to distance Rizia from Rumburg this turn: be openly critical of their regional influence in diplomatic conversations, be dismissive or rude to Beatrice Kern in meetings, and signal support for independent regional alliances. These actions establish the prerequisites for Fall from GRACE — Rizia being seen as diverging from Rumburg's sphere.",
					"In the MITZ talks with Morella, achieve a satisfactory deal on the first attempt for the Collectible: Morellan Tin Bird.",
					"In the Golden Guard investigation, keep the focus on Su Omina's role — this keeps you on track for Case Closed.",
				],
			},
			{
				phase: "Turn 6: Protect the Diplomatic Path",
				actions: [
					"[CRITICAL] Do not start the Pales war in Turn 6. Keeping relations with Pales non-hostile is the foundational requirement of this entire run. Once war starts, Peace to the Duke, Glovurius, and Great Unification are all permanently blocked.",
					"If you completed the Wehlen tobacco deal in Turn 5, distribute free cigarettes this turn. Smolak's Smokes unlocks.",
				],
			},
			{
				phase: "Turn 7: The Stock Exchange",
				actions: [
					"[CRITICAL] Issue the Porte Drazon Stock Exchange decree this turn. Establishing the exchange is the prerequisite for The Golden Bells Ring — you cannot appoint Rusty or receive the payoff without founding it first.",
					"During the Derdia visit, send authority and budget to support their insurance scheme. This is progress toward A Little Help From My Friends.",
				],
			},
			{
				phase: "Turn 8: The Alliance Package",
				actions: [
					"[CRITICAL] Fund and formally establish the Intermerkopum — the regional alliance with Morella, Derdia, Wehlen, and Pales. Keep all member relations positive and do not offer territorial concessions via referendum. When the alliance is ratified, Intermerkopum Alliance unlocks and you receive the Collectible: Intermerkopum Rings.",
					"[CRITICAL] When Axel Reinhart (Duke of Pales) visits, propose a formal military alliance. This requires that Rizia's power projection is at Strong or higher — use the 'Rizia: Golden Kingdom' preset's Authority values if needed. When Axel agrees, Peace to the Duke unlocks.",
					"[CRITICAL] Appoint Rusty to head the Porte Drazon Stock Exchange (founded in Turn 7). Also ensure your global image is good, or that the maximum Sordish bond payout has been received. Meeting either condition combined with Rusty's appointment unlocks The Golden Bells Ring.",
					"Decree tax credits for businesses and collaborate with Rusty's economic framework. These two actions together unlock The Kingdom Incorporated.",
				],
			},
			{
				phase: "Turn 9: Unification",
				actions: [
					"[CRITICAL] The Zille return negotiation happens this turn. For Trustworthy Friends, Wiktor Smolak must agree to transfer Zille back to Rizia without a referendum — this is achieved by building trust through the Wehlen trade deal earlier. The agreement is confirmed on the blimp. Trustworthy Friends unlocks.",
					"[CRITICAL] Vina's marriage to Axel Reinhart must be arranged this turn. You need both Vina and Pales to view you positively. Fund the unification ceremony. Glovurius axa Rizia axa Pales unlocks.",
					"With both Zille (via Smolak) and Pales (via Axel Reinhart's alliance and Vina's marriage) now secured peacefully, Great Unification unlocks.",
					"Golden Age of Rizia requires that you have maintained high living standards, adequate welfare, workers' rights, and economic growth throughout the game without triggering destabilization. If all these conditions are met by end of Turn 9, the achievement fires in the epilogue.",
				],
			},
			{
				phase: "Turn 10: GRACE Exit and Sordland",
				actions: [
					"[CRITICAL] Formally confirm Rizia's exit from GRACE (the Rumburg-led economic bloc). Be openly dismissive of Beatrice's objections. Fall from GRACE unlocks.",
					"[CRITICAL] Confirm that all three Sordland trade deals are completed and honored — the wine/whiskey deal, the resort partnership, and the bond. You must not have reneged on any of them. Sords, Our Friends unlocks.",
					"Case Closed unlocks in the epilogue if the Golden Guard investigation was kept focused on Su Omina throughout.",
				],
			},
		],
	},

	// ─── Special & Hidden Achievements (v3.1.0 VERIFIED) ───
	{
		id: "special-hidden-achievements",
		title: "Special & Hidden Achievements",
		subtitle: "Endings, RNG events, ideology compass, legacy titles, and cross-save chains",
		sourceName: "All Suzerain Achievements and How to Get Them (Build 153)",
		sourceLink: "https://steamcommunity.com/sharedfiles/filedetails/?id=3670692943",
		sourceVersion: "3.1.0",
		isVerifiedLatest: true,
		description:
			"These achievements do not fit a linear turn-by-turn run structure. They cover mutually exclusive Sordland and Rizia endings (pick one per playthrough), ideology compass identities confirmed by Deivid Wisci, Rizia legacy titles (priority-ordered), and standalone hidden achievements. Only one ending can unlock per run — plan your run around which ending you want before starting.",
		disclaimer:
			"Every Vote Matters is RNG-dependent (lose the constitutional vote by exactly 1) and cannot be reliably forced. Chessmaster's exact betrayal trigger has a known community-reported bug. House Cleaning and Theocracy have a known conflict where Titus's betrayal can fire incorrectly. These are noted where applicable.",
		tags: ["Sordland", "Rizia", "Special"],
		achievements: [],
		compatibleAchievements: [],
		incompatibleAchievements: [],
		steps: [
			{
				phase: "Sordland Endings — Pick One Per Run",
				actions: [
					"A Morgna her coren! — Win re-election as a popular, successful president. Requires high public opinion and a stable economy by the final election.",
					"Just Another Sordish President — Fail to win re-election and retire normally in the epilogue. Let your popularity drop without triggering a dramatic crisis.",
					"A New Hope — Pass the 3% election threshold reform, lose the election, get expelled from the USP by Lileas, and start your own party (do not rejoin Lileas afterward).",
					"Forced Out — Lose the USP primary to Lileas via de-Sollinization, without having formed the SSP.",
					"Demoted — Get expelled from the USP, then join the People's Front. Requires WPB to be unbanned, a socialist political lean, support from Mansoun Leke, and enough residual popularity to be placed on the ticket as VP.",
					"Impeached — The constitution must retain impeachment power, you must have a high corruption score, and Lucian must dislike you significantly.",
					"Coup d'État — Mishandle Turn 8 unrest while avoiding war, OR cede cities to Rumburg without ATO/CSP protection, AND do not purge the general staff.",
					"World At War — Go to war with Rumburg in Turn 9 and join either ATO or CSP — this triggers nuclear escalation.",
					"Path To Exile — Flee Sordland during the Turn 10 family dinner. Requires an active war, ongoing unrest, or a credible coup threat to make exile the available option.",
					"Assassinated — Do not have Serge's watch AND either upset the Oligarchs severely OR beat Rumburg in war without imprisoning Livia Suno.",
					"Early Retirement — Choose to retire voluntarily during the Turn 10 family dinner.",
					"Hail the Queen — Lose the Rumburg war. Requires poor military preparation, no ATO/CSP ally, and letting Rumburg's offensive succeed.",
					"Vectern sis da! — WIN the war against Rumburg. Requires funding the military adequately, recovering the economy, securing at least one military ally, expanding military industry, and following Iosef Lancea's strategic advice throughout.",
				],
			},
			{
				phase: "Sordland Hidden & Misc",
				actions: [
					"638 Ways to Kill Rayne — Survive two assassination attempts in the same run: the military parade assassination (triggered by mishandled unrest) AND the Rummish retaliation attempt (triggered by winning the war without imprisoning Livia Suno). Requires Serge's watch for both.",
					"Thank You Serge — Survive an assassination attempt because Serge's watch protects you. Additionally, give Serge 2 Political Will during the drive to Narbel while attempting constitutional reform.",
					"Every Vote Matters — Lose the constitutional vote in the National Assembly by exactly 1 vote. This is essentially RNG-dependent and cannot be reliably forced.",
					"Yes I'm Alone... — Estrange all three close companions: block Monica from politics (after the Benfi incident), blame Petr for the spy scandal (so he is expelled or dies), and be rude to or allow Serge to be killed.",
					"Two Birds For Beatrice — Cross-save chain: win the Rumburg war as Anton AND flip off Beatrice at capitulation in Sordland. Then load the save into Rizia, get expelled from GRACE, and flip off Beatrice again there.",
					"Master of Crisis — Trigger 4 of the late-game crises (debt crisis, unrest, war, impeachment, coup) through general mismanagement and unpopularity.",
					"True Master of Crisis — Avoid every crisis entirely throughout the whole run. Maintain strong economy, low unrest, no war, no impeachment threat.",
				],
			},
			{
				phase: "Sordland Ideology Compass — Pick One Per Run",
				actions: [
					"These are confirmed by Deivid Wisci during his endgame assessment. Your answers throughout the game inform which label he assigns — they are not just a one-time choice at the end.",
					"Malenyevist — Act communist throughout: nationalize industries, expand welfare, support Marxist rhetoric, align with CSP.",
					"Capitalist — Act capitalist throughout: privatize, cut taxes, support free markets, align with ATO.",
					"Centrist — Take no strong stance on economic ideology; balance both sides consistently.",
					"Democrat — Balanced politically, not overly socialist or capitalist. Pass democratic reform. (See Run B.)",
					"Authoritarian — Expand executive power, suppress opposition, control media, but de-Sollinize. (See Run A.)",
					"Sollist — As Authoritarian but also protect Soll's legacy: keep the planned economy, enact the dictator constitution, and put Soll on trial rather than honoring him. (See Run A.)",
				],
			},
			{
				phase: "Rizia Endings — Pick One Per Run",
				actions: [
					"My Rule Continues — Standard peaceful ending: no coup, civil war, or revolution occurs.",
					"The King Is Dead — Plan a House Strike with Titus, but also raise provincial levies — the other noble houses retaliate and kill you.",
					"The King Behind Bars — Attempt a violent Plan B reform push (with Titus already suspicious that you're moving against him), fail, and choose to stay in Rizia rather than flee — you are arrested.",
					"Away from My Land — Same failed violent Plan B as above, but choose to flee into exile instead of staying.",
					"Hugo, I Go — Same failed Plan B chain but exile is triggered after Hugo is crowned.",
					"Et Tu Titus? — Same failed Plan B chain, different specific trigger within that event sequence.",
					"Fragmentation — Civil war triggered by either: sustained bad living standards causing destabilization, OR a noble house coup from angering a noble house.",
					"Return of the King — Win the civil war in the epilogue. Requires Intermerkopum alliance, happy religious groups, overwhelming military power, and having abolished provincial levies. Cannot be a Rumburg vassal.",
					"Long Arm of Tzarborough — Lose the civil war while allied with Rumburg — you become their vassal state.",
					"Tattered Kingdom — Lose Zille AND the Pales Administrative District AND lease both Monqiz and Caleqabiz to Rumburg or their allies.",
					"South Merkopa's Newest Member — Give minimal support and intelligence to Zille, agree to the Turn 8 referendum, then meddle with the results — Zille goes independent.",
					"Father's Son — Deliberately lose the Pales war. Retreat the frontline and allow cities to fall.",
					"Not So Fun Anymore — Cross-save: win Sordland vs Rumburg, then in Rizia cause a coup or revolution, and flee to Rumburg.",
				],
			},
			{
				phase: "Rizia Legacy Titles — Priority Order (Highest First)",
				actions: [
					"These are mutually exclusive and awarded in priority order — only the highest applicable title fires.",
					"Make Yourself Great Again (highest priority) — Great Unification completed plus many positive 'green' modifiers across the board.",
					"Wruhec's Chosen — Extreme authoritarian reforms plus full theocratic absolutism. Excludes Conqueror and Great Unification paths.",
					"I hereby declare... — Pass 28 or more decrees during your reign. Excludes most other legacy title paths.",
					"Funny Man — Choose many humorous dialogue options throughout the run. Excludes nearly all other legacy titles.",
					"No Alcohol for me Please (lowest priority) — Never drink alcohol in any scene throughout the entire game. Excludes nearly all other legacy titles.",
				],
			},
			{
				phase: "Rizia Hidden & Misc",
				actions: [
					"Tradition is Our Compass — Never break any Rizian tradition across the entire game. Avoid: prologue party, disruptive coronation speech, Friendship Day interjection, inheritance/landowner tax, privatizing crown lands, implementing free press, decriminalizing homosexuality, equal pay, electoral reform, removing provincial police or levies, legalizing substances, mass amnesty, changing or removing the state religion, skipping the opening clemency decree, not uncorking the wine yourself, failing to fully repair the yacht, Vina's husband changing her name, including Pabel in the drinking game, 'hierarchies are meant to be broken' dialogue, skipping the council reshuffle, statocratic or theocratic reform, and changing succession after your son's birth. Safest marriage option: Vina married to Rico, or leave her unmarried.",
					"I Want to Believe — Requires a Turn 6 save state with no Morella revolutionaries and high resources. Boost living standards and rights immediately, keep Dastnurist pamphlets intact, comply with Rusty's requests, keep Rusty non-hostile, Morella non-hostile, Lespia non-friendly, and radicalism below 4 — then leak the UFO story.",
					"The Second Revolt — Let living standards and workers' rights deteriorate through Turn 8, which triggers the Turn 9 destabilization event.",
					"Reform Or Die — Declare reform intent from the very start, collaborate with Rusty, hire the Palantor PMC, prepare a violent Plan B, then activate it via the gas-station call to Rusty.",
					"Arcasia Did It — Adarfo must take the RPP (either Manus leaves or conditions deteriorate). Then ask Rusty to eliminate Adarfo cleanly.",
					"Completely Justified — Arrest and execute 5 or more of the following: Manus (via the Golden Guard), Axel (post-war), Taddeus (House Strike), Adarfo (dissent), any murder suspect, Pabel (if he helped Vina escape), Rico (if the Wehlen deal is broken). The death penalty must not be revoked.",
					"The End of Powder and Blood — Cross-save: arrest both Oligarchs in Sordland, then in Rizia: smuggler deal in Turn 3, betray Vulturio in Turn 5, abolish provincial levies, and remove provincial police.",
					"Let it Rayne — Cross-save: start from a Sordland economic-recovery save. In Rizia, invest 1 budget in Holsord talks in Turn 4, then buy large bonds for 4 budget and do not renege.",
					"Pipe Nightmares — Anger either Lespia or Morella while no public reform is ongoing — the pipeline gets sabotaged.",
					"Game of Spoons — At the Rumburg high tea: use the middle spoon for sugar, the outer spoon for scone jam, and the inner spoon for the petit four.",
					"Pearl of the Between-Seas — Decree the tourism campaign in Turn 8, achieve global destination status, maintain a good global image, have curtailed the drug trade, have no destabilization, have decent living standards, and not be at war with Pales.",
					"Economic Wonder of South Merkopa — Be very pro-business: privatize welfare and crown lands, collaborate with Rusty, enact tax credits.",
					"A Toras Pays His Debts — Take heavy government spending and the full 4-budget loan from Rusty, then repay the 6-budget debt in full by Turn 9.",
					"The Green Kingdom — Fund the Arufelde cleanup in Turns 2 and 5, build the Zpana dam, establish the renewable industry in Turn 8, and skip the Esqiris expansion and Wehlen oil deal.",
					"Blitzkrieg — Feign a western attack, sabotage Fort Ales's air defenses, then launch a simultaneous combined-arms assault on both cities from the north.",
					"Lieutenant Commander Sazon — After Hugo suggests it, send Manus Sazon to the Pales war front. Win the war, do not remove provincial levies afterward, and protect the Sazon Levies.",
				],
			},
		],
	},
];

export const achievementPathwaysMap = new Map<string, Pathway[]>();
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
