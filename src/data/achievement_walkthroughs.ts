// Ground-truth Walkthroughs for all 220 Suzerain & Rizia achievements.
// Extracted from in-game dialogue scenes, matrix conditions, and verified turn guides.

export interface DialogueOptionStep {
	speaker?: string;
	context?: string;
	recommendedChoice: string;
	notes?: string;
}

export type WalkthroughCategory =
	| "Dialogue Choice"
	| "Policy Decision"
	| "Story Progression"
	| "Collectible Item"
	| "Tactical / Endgame";

export interface AchievementWalkthrough {
	achievementId: string;
	achievementName: string;
	game: "Sordland" | "Rizia" | "Both";
	category: WalkthroughCategory;
	timeline: {
		turn: string;
		sceneTitle: string;
		sceneFile?: string | null;
	};
	prerequisites: string[];
	dialogueSteps: DialogueOptionStep[];
	pitfalls: string[];
	saveVariables: string[];
}

export const achievementWalkthroughs: Record<string, AchievementWalkthrough> = {
  "Prologue_Finish": {
    "achievementId": "Prologue_Finish",
    "achievementName": "Prologue: Rise to Power",
    "game": "Sordland",
    "category": "Story Progression",
    "timeline": {
      "turn": "Prologue (1923 - 1953)",
      "sceneTitle": "Youth, Military Service & Rise to the Presidency",
      "sceneFile": "Prologue_Archive.md"
    },
    "prerequisites": [
      "Navigate Anton Rayne's backstory: choose birth family background, student activism, military service during the civil war, marriage with Monica, and political rise within the USP.",
      "Win the 1953 General Election against the opposition to become President of Sordland."
    ],
    "dialogueSteps": [
      {
        "speaker": "Anton Rayne",
        "context": "1953 Sordish Election Night Victory Speech",
        "recommendedChoice": "Step onto the balcony of the USP Headquarters, thank the citizens of Sordland, and proclaim a new morning for the Republic.",
        "notes": "Concludes the Prologue and unlocks the achievement as Chapter I commences."
      }
    ],
    "pitfalls": [
      "Quitting or restarting the run before completing the Prologue and reaching Turn 1 inauguration prevents this achievement from unlocking."
    ],
    "saveVariables": [
      "BaseGame.Prologue_Finished"
    ]
  },
  "Chapter1_Finish": {
    "achievementId": "Chapter1_Finish",
    "achievementName": "Chapter I: President Rayne",
    "game": "Sordland",
    "category": "Story Progression",
    "timeline": {
      "turn": "Turn 1 to Turn 3",
      "sceneTitle": "Inauguration, Assassination Shock & The Reform Package Debate",
      "sceneFile": "Sordland_Turn03_EnT_BusinessCouncil.md"
    },
    "prerequisites": [
      "Successfully navigate the first three turns: inaugural ball, Bernard Circas assassination crisis, choosing the initial mega-infrastructure project (L-1 or H-3), and budget allocations in Turn 3.",
      "Decide whether to pursue a Democratic Reformist Constitution or declare an Autocrat State of Emergency."
    ],
    "dialogueSteps": [
      {
        "speaker": "Anton Rayne",
        "context": "Turn 3: Concluding the ministerial budget meeting and constitutional roadmap",
        "recommendedChoice": "Finalize your government's core policy stance (Reform or Emergency) and adjourn the cabinet.",
        "notes": "Unlocks at the end of Turn 3 upon transitioning into Chapter II."
      }
    ],
    "pitfalls": [
      "Early economic deadlock or failing to set a clear constitutional direction."
    ],
    "saveVariables": [
      "BaseGame.Chapter1_Finished"
    ]
  },
  "Chapter2_Finish": {
    "achievementId": "Chapter2_Finish",
    "achievementName": "Chapter II: A New Sordland",
    "game": "Sordland",
    "category": "Story Progression",
    "timeline": {
      "turn": "Turn 4 to Turn 6",
      "sceneTitle": "Regional Crises, Bilateral Diplomacy & Law Enforcement Reforms",
      "sceneFile": "Sordland_Turn06_InT_RailwayOpening.md"
    },
    "prerequisites": [
      "Successfully navigate Turns 4 through 6: resolve Taurus worker strikes, undertake bilateral state visits to Agnolia and Wehlen, and establish the Anti-Corruption Police (ACP) or Secret State Police (SSP).",
      "Attend the inauguration of the first completed mega-infrastructure project in Turn 6."
    ],
    "dialogueSteps": [
      {
        "speaker": "Anton Rayne",
        "context": "Turn 6: Concluding the mega-infrastructure grand opening and party consultations",
        "recommendedChoice": "Celebrate the completion of the transit link and prepare the administration for the upcoming assembly vote.",
        "notes": "Unlocks at the end of Turn 6 as Chapter III begins."
      }
    ],
    "pitfalls": [
      "Incurring severe debt spirals or failing to resolve labor strikes."
    ],
    "saveVariables": [
      "BaseGame.Chapter2_Finished"
    ]
  },
  "Game_MediaDeal": {
    "achievementId": "Game_MediaDeal",
    "achievementName": "An Offer You Cannot Refuse",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Turn 2",
      "sceneTitle": "Private Meeting with Marcel Koronti at HOS Country Club",
      "sceneFile": "Sordland_Turn02_A_MediaDeal.md"
    },
    "prerequisites": [
      "Accept Marcel Koronti's phone invitation in Turn 1/2.",
      "Travel with Lucian Galade and Petr Vectern to the HOS Country Club in Conriat."
    ],
    "dialogueSteps": [
      {
        "speaker": "Marcel Koronti",
        "context": "When Marcel Koronti proposes biased media coverage in exchange for future government favors",
        "recommendedChoice": "A deal is a deal. It will be upheld.",
        "notes": "Accepts Koronti's pact. The Heart of Sordland conglomerate will spin news positively for your administration."
      }
    ],
    "pitfalls": [
      "Declining the initial phone call from Marcel Koronti in Turn 1/2 prevents the meeting from occurring.",
      "Choosing 'Mr. Koronti, I have to reject' or refusing backroom pacts permanently forfeits Koronti's media support."
    ],
    "saveVariables": []
  },
  "Chapter3_Finish": {
    "achievementId": "Chapter3_Finish",
    "achievementName": "Chapter III: Victim of Changes",
    "game": "Sordland",
    "category": "Story Progression",
    "timeline": {
      "turn": "Turn 7 to Turn 8",
      "sceneTitle": "Grand National Assembly Vote, Supreme Court Trial & Foreign Alliances",
      "sceneFile": "Sordland_Turn08_FPnT_LespiaVisit.md"
    },
    "prerequisites": [
      "Successfully pass or conclude the constitutional vote in the Grand National Assembly (Turn 7) and Supreme Court.",
      "Attend the Aschraf Anniversary in Bergia, address public unrest, and conduct foreign state visits to Lespia or Valgsland."
    ],
    "dialogueSteps": [
      {
        "speaker": "Anton Rayne",
        "context": "Turn 8: Debriefing the international alliance summits and domestic unrest response",
        "recommendedChoice": "Solidify foreign partnerships and review internal security measures ahead of late-game challenges.",
        "notes": "Unlocks at the conclusion of Turn 8 as Chapter IV commences."
      }
    ],
    "pitfalls": [
      "Suffering an overwhelming constitutional defeat that shatters political authority."
    ],
    "saveVariables": [
      "BaseGame.Chapter3_Finished"
    ]
  },
  "Chapter4_Finish": {
    "achievementId": "Chapter4_Finish",
    "achievementName": "Chapter IV: Checkmate",
    "game": "Sordland",
    "category": "Story Progression",
    "timeline": {
      "turn": "Turn 9 to Turn 10",
      "sceneTitle": "Rumburg Border Incident, Party Primary & The 1957 General Election",
      "sceneFile": "Sordland_Turn10_A_DeividFinalTalk.md"
    },
    "prerequisites": [
      "Reach the climax of your presidential term: respond to Rumburg shooting down the Sordish patrol aircraft, face Lileas Graf at the USP Party Congress, and conclude the 1957 election campaign."
    ],
    "dialogueSteps": [
      {
        "speaker": "Anton Rayne",
        "context": "Turn 10: Final farewell meeting with Foreign Minister Deivid Wisci and election night tally",
        "recommendedChoice": "Reflect on your four-year legacy as President and prepare for the national election results.",
        "notes": "Unlocks as the main four-year presidential term concludes and epilogues trigger."
      }
    ],
    "pitfalls": [
      "Early military coup or premature impeachment trial."
    ],
    "saveVariables": [
      "BaseGame.Chapter4_Finished"
    ]
  },
  "Game_SuccessfulRitual": {
    "achievementId": "Game_SuccessfulRitual",
    "achievementName": "First Step To Golconda",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Turn 7",
      "sceneTitle": "Archsanctuary of Deyr Descension Day Ceremony",
      "sceneFile": "Sordland_Turn07_A_DayofDescension.md"
    },
    "prerequisites": [
      "Attend the holy Descension Day service in Deyr alongside Archpriest and Lucian Galade.",
      "Consult Lucian on religious customs before entering the cathedral."
    ],
    "dialogueSteps": [
      {
        "speaker": "Anton Rayne",
        "context": "Step 1: Approaching the altar",
        "recommendedChoice": "Grab the sceptre with your left hand, then touch the altar with your right.",
        "notes": "Strict religious protocol of the Sordish Archsanctuary."
      },
      {
        "speaker": "Anton Rayne",
        "context": "Step 2: Veneration of the Archpriest",
        "recommendedChoice": "Sceptre in hand, kneel before the Archpriest.",
        "notes": "Demonstrates presidential humility before Dastist religious authority."
      },
      {
        "speaker": "Anton Rayne",
        "context": "Step 3: Blessing of the Sword",
        "recommendedChoice": "Touch the sword with your right hand.",
        "notes": "Symbolizes righteous defense of Sordland under god's grace."
      },
      {
        "speaker": "Anton Rayne",
        "context": "Step 4: Presenting the Sceptre",
        "recommendedChoice": "Hand the sceptre to the Archpriest and wait for him to give you the sword.",
        "notes": "Completes the sacred ceremonial exchange."
      },
      {
        "speaker": "Anton Rayne",
        "context": "Step 5: Returning the Holy Sword",
        "recommendedChoice": "Hand the sword back to the Archpriest with both hands.",
        "notes": "Executes all 5 ritual motions flawlessly, gaining the Archpriest's full public endorsement."
      }
    ],
    "pitfalls": [
      "Failing ANY of the 5 ceremonial motions (e.g. grabbing sceptre with wrong hand, kissing the ring instead of kneeling, or refusing to touch the sword) causes the Archpriest to shake his head in disapproval.",
      "Antagonizing the Archpriest in conversation before the cathedral service begins."
    ],
    "saveVariables": []
  },
  "Game_Bribe": {
    "achievementId": "Game_Bribe",
    "achievementName": "“Donations”",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Turn 2",
      "sceneTitle": "Private Tender Meeting with Walter Tusk or Corporate Privatization",
      "sceneFile": "Sordland_Turn02_A_ContractBribe.md"
    },
    "prerequisites": [
      "Meet with Walter Tusk in Turn 2 or privatize SSC/Nedam in Turn 7.",
      "Willing to accept illicit personal funds in exchange for state favors."
    ],
    "dialogueSteps": [
      {
        "speaker": "Walter Tusk",
        "context": "When Walter Tusk offers a thick envelope of cash to guarantee the infrastructure contract to Underhall Construction",
        "recommendedChoice": "Take the envelope and accept the donation.",
        "notes": "Adds +1 Personal Wealth immediately. Beware of Anti-Corruption Police scrutiny later."
      }
    ],
    "pitfalls": [
      "Refusing Walter Tusk's cash envelope in Turn 2 or privatizing state corporations without accepting kickbacks.",
      "Strictly adhering to clean anti-corruption procurement principles throughout all corporate tenders."
    ],
    "saveVariables": []
  },
  "Game_AgnoliaAlliance": {
    "achievementId": "Game_AgnoliaAlliance",
    "achievementName": "\"Freedom or Peril\"",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Turn 5",
      "sceneTitle": "Emergency Crisis Summit at the Presidential Palace",
      "sceneFile": "Sordland_Turn05_FPnT_AgnoliaTradeVisit.md"
    },
    "prerequisites": [
      "Travel to Agnolia in Turn 5 with Foreign Minister Deivid Wisci.",
      "Prepare either +1 Budget or willingness to recognize Agnolia's claim over Heljiland island."
    ],
    "dialogueSteps": [
      {
        "speaker": "Maartin van Hoorten",
        "context": "Negotiating the bilateral trade and security agreement in Svaered",
        "recommendedChoice": "Agree to pay 1 Budget for steel or recognize Heljiland as Agnolia, then propose a full military alliance.",
        "notes": "Secures a military alliance with Agnolia, committing their military to support Sordland in the war against Rumburg."
      }
    ],
    "pitfalls": [
      "Refusing both the steel tariff surcharge (+1 Budget) and recognition of Heljiland causes PM van Hoorten to storm out with no deal.",
      "Recognizing Valgsland's claim over Heljiland permanently terminates any possibility of an Agnolia alliance."
    ],
    "saveVariables": []
  },
  "Game_PassedAssembly": {
    "achievementId": "Game_PassedAssembly",
    "achievementName": "Grand National Assembly",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Turn 7",
      "sceneTitle": "Grand National Assembly Constitutional Reform Vote",
      "sceneFile": "Sordland_Turn07_A_AssemblyVote.md"
    },
    "prerequisites": [
      "Draft a constitutional reform proposal with Nia Morgna and Lucian Galade.",
      "Secure support from either Gloria Tory (USP Conservatives) or Albin Clavin (USP Reformists), plus Frens Ricter (PFJP) or Marcel Koronti's lobbying."
    ],
    "dialogueSteps": [
      {
        "speaker": "Anton Rayne",
        "context": "During the assembly voting session in Turn 7",
        "recommendedChoice": "Work the floor, lobby independent and wavering MPs, and cast your vote in favor.",
        "notes": "Reaches at least 167 votes (or 225 supermajority), successfully passing the constitutional reform through the Assembly."
      }
    ],
    "pitfalls": [
      "Failing to secure Gloria Tory (conservatives) or Albin Clavin (reformists), resulting in fewer than the 167 required votes.",
      "Alienating Frens Ricter (PFJP) by refusing democratic threshold concessions without alternative oligarch lobbying."
    ],
    "saveVariables": []
  },
  "Game_NewConstitution": {
    "achievementId": "Game_NewConstitution",
    "achievementName": "The Constitution of '56",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Turn 7",
      "sceneTitle": "Supreme Court Deliberation on Constitutional Amendments",
      "sceneFile": "Sordland_Turn07_A_CourtVote.md"
    },
    "prerequisites": [
      "Pass the reform bill in the Assembly with at least 167 votes.",
      "Convince Justice Isabel Edmonds during the private salad lunch meeting."
    ],
    "dialogueSteps": [
      {
        "speaker": "Isabel Edmonds",
        "context": "Salad lunch meeting at the Supreme Court cafeteria in Turn 7",
        "recommendedChoice": "Emphasize judicial independence, rule of law, and democratic balance without showing hostility to the court.",
        "notes": "Secures the 3 Centrist Justices. Combined with Justice Garaci (convinced via Heron Garaci/ACP), reaches the required 6 votes to enact the new constitution."
      }
    ],
    "pitfalls": [
      "Failing to persuade Justice Isabel Edmonds during the salad lunch by sounding like an arrogant tyrant or attacking the court's dignity.",
      "Failing to secure Justice Heron Garaci through ACP pressure on the Old Guard or promising him the Chief Justice post."
    ],
    "saveVariables": []
  },
  "Game_EconomicDepression": {
    "achievementId": "Game_EconomicDepression",
    "achievementName": "Sordish Depression",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Turn 9",
      "sceneTitle": "Ministry of Economy Briefing on Sordish Economic Collapse",
      "sceneFile": "Sordland_Turn09_EnT_EconomicOverviewAndAction.md"
    },
    "prerequisites": [
      "Trigger severe economic instability by exceeding -8 Government Budget or causing a Trade War.",
      "Enact incoherent economic decisions, refuse infrastructure investments, and mismanage inflation.",
      "Reach Turn 9 with economic development at rock bottom (0-2 bars)."
    ],
    "dialogueSteps": [
      {
        "speaker": "Symon Holl",
        "context": "Cabinet economic debrief in Turn 9",
        "recommendedChoice": "Acknowledge the catastrophic collapse of the Sordish economy and bankruptcy of the treasury.",
        "notes": "The game officially designates the economy as the 'Sordish Depression'."
      }
    ],
    "pitfalls": [
      "Maintaining safe fiscal thresholds (-7 to +3 Budget) or achieving positive infrastructure synergies prevents the depression from occurring."
    ],
    "saveVariables": []
  },
  "Game_ACP": {
    "achievementId": "Game_ACP",
    "achievementName": "Drain the Swamp",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Turn 5",
      "sceneTitle": "Cabinet Deliberation on Law Enforcement and Anti-Corruption",
      "sceneFile": "Sordland_Turn05_SnO_FoundedPolice.md"
    },
    "prerequisites": [
      "Increase the Ministry of Justice and Interior budget in Turn 3.",
      "Allocate the newly available funds to Justice Minister Nia Morgna rather than Interior."
    ],
    "dialogueSteps": [
      {
        "speaker": "Nia Morgna",
        "context": "Turn 5 police reform summit",
        "recommendedChoice": "Found the Anti-Corruption Police (ACP) under the Ministry of Justice.",
        "notes": "Creates the independent ACP force capable of investigating the Old Guard, Oligarchs, or political opposition."
      }
    ],
    "pitfalls": [
      "Allocating the Turn 3 justice budget to Interior Minister Lileas Graf instead of Justice Minister Nia Morgna.",
      "Defunding or maintaining a flat budget for the Ministry of Justice and Interior in Turn 3."
    ],
    "saveVariables": []
  },
  "Game_Railway": {
    "achievementId": "Game_Railway",
    "achievementName": "Grand L-1 Opening",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Turn 6",
      "sceneTitle": "Turn 6 Inauguration of the L-1 High-Speed Railway",
      "sceneFile": "Sordland_Turn06_InT_RailwayOpening.md"
    },
    "prerequisites": [
      "Select the L-1 High-Speed Railway project in Turn 1/2.",
      "Award contract to SSC, Taurus, or Underhall and ensure on-time completion by Turn 6."
    ],
    "dialogueSteps": [
      {
        "speaker": "Anton Rayne",
        "context": "Inaugural ribbon-cutting ceremony at Conriat station",
        "recommendedChoice": "Cut the inaugural ribbon, board the express locomotive, and address the press on Sordish infrastructure progress.",
        "notes": "Unlocks upon officially opening the L-1 high-speed rail line connecting Lachaven to Holsord."
      }
    ],
    "pitfalls": [
      "Selecting Taurus without passing the Worker's Rights Act, causing crippling labor strikes that delay completion past Turn 6.",
      "Running out of government budget and refusing to pay contractor overruns."
    ],
    "saveVariables": []
  },
  "Game_Lawmaker": {
    "achievementId": "Game_Lawmaker",
    "achievementName": "Lawmaker",
    "game": "Sordland",
    "category": "Policy Decision",
    "timeline": {
      "turn": "Prologue",
      "sceneTitle": "Prologue Archive",
      "sceneFile": "Prologue_Archive.md"
    },
    "prerequisites": [
      "Sign at least 10 legislative bills across the presidential term."
    ],
    "dialogueSteps": [
      {
        "context": "Policy decision during Prologue",
        "recommendedChoice": "Approve decree / bill supporting Lawmaker",
        "notes": "Ensures the required prerequisite game state flag is established."
      }
    ],
    "pitfalls": [
      "Vetoing more than 3 bills will make reaching 10 signed bills impossible."
    ],
    "saveVariables": [
      "BaseGame.SignedBillCount"
    ]
  },
  "Game_EconomicRecovery": {
    "achievementId": "Game_EconomicRecovery",
    "achievementName": "Sordish Economic Recovery",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Turn 9",
      "sceneTitle": "Ministry of Economy Proclamation of Sordish Economic Recovery",
      "sceneFile": "Sordland_Turn09_EnT_EconomicOverviewAndAction.md"
    },
    "prerequisites": [
      "Maintain Government Budget within safe margins (-7 to +3) to avoid a trade war or debt crisis.",
      "Synergize mega-infrastructure (e.g., L-1 Rail + Conriat Industrial Zone or H-3 Highway + Agnland trade).",
      "Sign 2 profitable trade agreements (Agnolia, Wehlen, Lespia, or Valgsland).",
      "Reach maximum economic development (10 bars) by Turn 9."
    ],
    "dialogueSteps": [
      {
        "speaker": "Symon Holl",
        "context": "Turn 9 cabinet economic review",
        "recommendedChoice": "Review the thriving national economic indicators and celebrate the complete recovery of Sordland.",
        "notes": "Symon Holl proudly declares the historic 'Sordish Economic Recovery Period'."
      }
    ],
    "pitfalls": [
      "Triggering a Trade War or Debt Crisis by exceeding -8 or +8 Government Budget.",
      "Mixing contradictory economic policies (e.g. nationalizing while trading with capitalist Lespia, or privatizing while aligning with Valgsland)."
    ],
    "saveVariables": []
  },
  "Game_WelfareState": {
    "achievementId": "Game_WelfareState",
    "achievementName": "Welfare State",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Turn 8",
      "sceneTitle": "Public Health and Education System Modernization",
      "sceneFile": "Sordland_Turn08_PSnW_HealthOverviewAndPandemic.md"
    },
    "prerequisites": [
      "Increase budgets for both the Ministry of Health and the Ministry of Education in Turn 3.",
      "Construct new rural clinics and medical school faculties, and expand educational access.",
      "Enact universal healthcare vaccination programs and maintain state welfare coverage."
    ],
    "dialogueSteps": [
      {
        "speaker": "Pascal Benwall",
        "context": "Turn 8 joint welfare review with Pascal Benwall and Ciara Walda",
        "recommendedChoice": "Approve comprehensive rural medical coverage and universal modern education standards.",
        "notes": "Significantly enhances both healthcare and education across Sordland, creating a genuine welfare state."
      }
    ],
    "pitfalls": [
      "Privatizing healthcare or education, which undermines universal public service coverage.",
      "Defunding either the Ministry of Health or Ministry of Education in Turn 3."
    ],
    "saveVariables": []
  },
  "Game_JoinedATO": {
    "achievementId": "Game_JoinedATO",
    "achievementName": "United Against Communism",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Turn 9",
      "sceneTitle": "State Visit to Arcasia and Bilateral Summit with President Dwight Walker",
      "sceneFile": "Sordland_Turn09_FPnT_ArcasiaVisit.md"
    },
    "prerequisites": [
      "Pursue free-market capitalist policies and accept Arcasian economic aid.",
      "Do not align with United Contana or join the CSP."
    ],
    "dialogueSteps": [
      {
        "speaker": "Dwight Walker",
        "context": "Private evening drink with President Walker in Turn 9",
        "recommendedChoice": "Formally accept President Walker's offer and sign the Arcasia Treaty Organization (ATO) charter.",
        "notes": "Sordland officially enters the Western Arcasian capitalist bloc, placing the nation under ATO's nuclear shield."
      }
    ],
    "pitfalls": [
      "Nationalizing private corporations, accepting United Contana aid, or signing military pacts with Valgsland.",
      "Refusing Arcasia's military radar installation or rejecting President Dwight Walker's invitation."
    ],
    "saveVariables": []
  },
  "Game_BludishRights": {
    "achievementId": "Game_BludishRights",
    "achievementName": "We Are All Citizens Of Sordland",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Turn 9",
      "sceneTitle": "Historic Meeting with Mansoun Leke on Minority Reconciliation",
      "sceneFile": "Sordland_Turn09_MansounBFFTalks.md"
    },
    "prerequisites": [
      "Do not oppress the Bludish population (avoid Religious Harmony Act / Unified Education Act or reconcile).",
      "Agree to meet with independent Bludish MP Mansoun Leke in Turn 9."
    ],
    "dialogueSteps": [
      {
        "speaker": "Mansoun Leke",
        "context": "Negotiations in the presidential office on minority civil rights",
        "recommendedChoice": "Support Mansoun Leke's Minority Rights Act and sign the bill into law.",
        "notes": "Abolishes the Special Zone of Bergia, guarantees Bludish civil and cultural equality, and reconciles Sordland."
      }
    ],
    "pitfalls": [
      "Signing the Religious Harmony Act, Unified Education Act, or creating the Bergia Special Oppression Zone.",
      "Ordering armed police or military forces into the Aschraf Anniversary commemoration to disperse mourners."
    ],
    "saveVariables": [
      "BaseGame.Bill_Turn09_BludishCommission_Signed"
    ]
  },
  "Game_MonicaLove": {
    "achievementId": "Game_MonicaLove",
    "achievementName": "I Still Love You",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Turn 9",
      "sceneTitle": "Intimate Bedroom Discussion with Monica Rayne",
      "sceneFile": "Sordland_Turn09_Personal_MonicaFinalTalk.md"
    },
    "prerequisites": [
      "Support Monica's women's rights initiatives (Benfi Festival address or polite compromise).",
      "Fund the Commission on the Status of Women and pass the Women's Liberation Act with her input.",
      "Treat her with affection, respect, and emotional warmth throughout your presidency."
    ],
    "dialogueSteps": [
      {
        "speaker": "Monica Rayne",
        "context": "Late-night bedroom conversation in Turn 9",
        "recommendedChoice": "Hold her hand, tell her how much you love and admire her, and promise a bright future together.",
        "notes": "Maintains a deeply loving, unbreakable marriage with Monica through the pressures of high office."
      }
    ],
    "pitfalls": [
      "Silencing Monica at the Benfi Festival without private apology or polite compromise.",
      "Vetoing the Women's Liberation Act or treating her with domestic condescension."
    ],
    "saveVariables": []
  },
  "Game_Centrist": {
    "achievementId": "Game_Centrist",
    "achievementName": "Centrist",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Turn 10",
      "sceneTitle": "Final Foreign Policy and Ideological Farewell with Deivid Wisci",
      "sceneFile": "Sordland_Turn10_A_DeividFinalTalk.md"
    },
    "prerequisites": [
      "Balance reformist and conservative decisions without straying into political extremes.",
      "Keep compass coordinates near the center (pragmatic mixed economy, balanced foreign relations)."
    ],
    "dialogueSteps": [
      {
        "speaker": "Deivid Wisci",
        "context": "Retirement meeting with Deivid Wisci in Turn 10",
        "recommendedChoice": "Reflect on your presidency as a sensible, pragmatic centrist who united Sordland through moderation.",
        "notes": "Deivid praises your measured, balanced leadership. Compass lands squarely in the Centrist quadrant."
      }
    ],
    "pitfalls": [
      "Committing heavily to ideological extremes (radical communist or radical free-market capitalist, dictator or pure liberal)."
    ],
    "saveVariables": []
  },
  "Game_Highway": {
    "achievementId": "Game_Highway",
    "achievementName": "Grand H-3 Opening",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Turn 6",
      "sceneTitle": "Turn 6 Inauguration of the H-3 Highway in Agnland",
      "sceneFile": "Sordland_Turn06_InT_HighwayOpening.md"
    },
    "prerequisites": [
      "Select the H-3 Highway project in Turn 1/2.",
      "Contract Underhall, Taurus, or SSC and ensure completion by Turn 6."
    ],
    "dialogueSteps": [
      {
        "speaker": "Anton Rayne",
        "context": "Ceremony in Agnland with Governor Ewald Alphonso",
        "recommendedChoice": "Cut the ribbon, drive the ceremonial vehicle onto the highway, and celebrate regional development.",
        "notes": "Unlocks upon opening the H-3 Highway connecting Deyr and Agnland."
      }
    ],
    "pitfalls": [
      "Awarding the contract to an unreliable company without paying extra budget when delays occur, pushing opening past Turn 6."
    ],
    "saveVariables": []
  },
  "Game_CollectionItem_PoemBook": {
    "achievementId": "Game_CollectionItem_PoemBook",
    "achievementName": "Collectible: Circas's Poem Book",
    "game": "Sordland",
    "category": "Collectible Item",
    "timeline": {
      "turn": "Turn 2",
      "sceneTitle": "State Memorial Funeral for Bernard Circas",
      "sceneFile": "Sordland_Turn02_Personal_Funeral.md"
    },
    "prerequisites": [
      "Attend the funeral of assassinated poet Bernard Circas in Turn 2.",
      "Prevent armed police violence at the ceremony and deliver a respectful eulogy."
    ],
    "dialogueSteps": [
      {
        "speaker": "Anton Rayne",
        "context": "Turn 2: Paying respects at the casket of Bernard Circas",
        "recommendedChoice": "Deliver a solemn speech honoring the fallen poet and accept the memorial edition of his poetry book from mourners.",
        "notes": "Places Circas's Poem Book onto your presidential bookshelf."
      }
    ],
    "pitfalls": [
      "Refusing to attend the funeral or sending riot police to suppress mourners."
    ],
    "saveVariables": [
      "BaseGameSupport.CollectionItem_PoemBook"
    ]
  },
  "Epilogue_ElectionWon": {
    "achievementId": "Epilogue_ElectionWon",
    "achievementName": "A Morgna her coren!",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Epilogue",
      "sceneTitle": "Election Night Victory Address at the Maroon Palace",
      "sceneFile": "Sordland_Epilogue_ElectionWin.md"
    },
    "prerequisites": [
      "Maintain solid public opinion, deliver economic recovery or win the war with Rumburg.",
      "Win the USP party leadership against Lileas Graf (or form a popular new party)."
    ],
    "dialogueSteps": [
      {
        "speaker": "Anton Rayne",
        "context": "Addressing the nation and celebrating supporters on election night 1957",
        "recommendedChoice": "Step onto the balcony, deliver an inspiring victory address, and thank the people of Sordland.",
        "notes": "Re-elected for a second four-year term as President of Sordland."
      }
    ],
    "pitfalls": [
      "Losing the USP party leadership to Lileas Graf without forming a viable new party.",
      "Suffering an economic collapse, military coup, or impeachment trial before election day."
    ],
    "saveVariables": []
  },
  "Game_PFJPAlliance": {
    "achievementId": "Game_PFJPAlliance",
    "achievementName": "Freedom and Justice",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Turn 7",
      "sceneTitle": "Joint Press Conference Announcing USP-PFJP Coalition",
      "sceneFile": "Sordland_Turn07_AnnounceAlliance.md"
    },
    "prerequisites": [
      "Pass a democratic reformist constitution.",
      "Cooperate with Frens Ricter and propose a formal coalition in Turn 7."
    ],
    "dialogueSteps": [
      {
        "speaker": "Frens Ricter",
        "context": "Turn 7 alliance negotiation meeting",
        "recommendedChoice": "Formally announce an electoral pact with Frens Ricter and the People's Freedom and Justice Party (PFJP).",
        "notes": "Forges a united democratic coalition for the upcoming general election."
      }
    ],
    "pitfalls": [
      "Accusing Frens Ricter of Arcasian espionage with the ACP or passing an authoritarian dictator constitution."
    ],
    "saveVariables": []
  },
  "Game_GiraltRibery": {
    "achievementId": "Game_GiraltRibery",
    "achievementName": "Giralt of Ribery",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Turn 5",
      "sceneTitle": "Petr Vectern's Lavish Residence Party",
      "sceneFile": "Sordland_Turn05_Personal_PetrParty.md"
    },
    "prerequisites": [
      "Attend Petr Vectern's victory celebration in Turn 5.",
      "Possess at least 1 Personal Wealth."
    ],
    "dialogueSteps": [
      {
        "speaker": "Gus Manger",
        "context": "Talking with Agriculture Minister Gus Manger about luxury vineyard investments",
        "recommendedChoice": "Invest 1 Personal Wealth into Gus Manger's vineyard venture in Anrica.",
        "notes": "Purchases a stake in high-yield Sordish luxury wine production."
      }
    ],
    "pitfalls": [
      "Having 0 Personal Wealth during Petr's party in Turn 5, preventing investment in Gus Manger's vineyard."
    ],
    "saveVariables": []
  },
  "RiziaPrologue_Finish": {
    "achievementId": "RiziaPrologue_Finish",
    "achievementName": "Rizia Prologue: Ascension to the Throne",
    "game": "Rizia",
    "category": "Story Progression",
    "timeline": {
      "turn": "Prologue (1926 - 1950)",
      "sceneTitle": "Prince Romus's Youth, Marriage to Queen Lena & Royal Coronation",
      "sceneFile": "Prologue_Archive.md"
    },
    "prerequisites": [
      "Navigate the early backstory of King Romus Toras: royal education, military duties in South Merkopa, romance and tragic loss of Queen Lena, birth of Princess Vina, and the passing of King Valero.",
      "Ascend to the royal throne at Palas Rezna as King of Rizia."
    ],
    "dialogueSteps": [
      {
        "speaker": "King Romus Toras",
        "context": "Coronation ceremony in the Grand Basilica of Porte Drazon",
        "recommendedChoice": "Accept the Golden Crown of Rizia upon your head, take the royal oath, and address the assembled noble houses.",
        "notes": "Unlocks upon finishing the Rizian prologue as Chapter I begins."
      }
    ],
    "pitfalls": [
      "Restarting or exiting before completing King Romus coronation and the Turn 1 Royal Council will prevent this achievement from triggering."
    ],
    "saveVariables": [
      "RiziaDLC.Prologue_Finished"
    ]
  },
  "Game_MilitaristState": {
    "achievementId": "Game_MilitaristState",
    "achievementName": "Militarist State",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Turn 8",
      "sceneTitle": "National Defense Council and Armed Forces Expansion",
      "sceneFile": "Sordland_Turn08_A_UnrestMeeting.md"
    },
    "prerequisites": [
      "Increase the Ministry of Defense budget in Turn 3.",
      "Support General Valken Krueger or Iosef Lancea's military buildup.",
      "Prioritize armed forces procurement, conscription, and border defense."
    ],
    "dialogueSteps": [
      {
        "speaker": "Valken Krueger",
        "context": "Turn 8/9 national security council meeting",
        "recommendedChoice": "Endorse full military readiness, expand youth defense drills, and establish a militarist state posture.",
        "notes": "Transforms Sordland into an uncompromising militarist fortress state."
      }
    ],
    "pitfalls": [
      "Defunding the Ministry of Defense in Turn 3 or pursuing demilitarization / reconciliation with Rumburg."
    ],
    "saveVariables": []
  },
  "Game_FCAnrica": {
    "achievementId": "Game_FCAnrica",
    "achievementName": "FC Anrica",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Turn 5",
      "sceneTitle": "Investment in Football Club Anrica at Petr's Party",
      "sceneFile": "Sordland_Turn05_Personal_PetrParty.md"
    },
    "prerequisites": [
      "Attend Petr's party in Turn 5.",
      "Possess at least 1 Personal Wealth."
    ],
    "dialogueSteps": [
      {
        "speaker": "Gus Manger",
        "context": "Conversation regarding Sordish sports teams and private ownership",
        "recommendedChoice": "Invest 1 Personal Wealth to acquire shares in Football Club Anrica.",
        "notes": "Become an official club shareholder in Sordland's premier football team."
      }
    ],
    "pitfalls": [
      "Having 0 Personal Wealth when Gus Manger discusses sports franchise shares at Petr's party in Turn 5."
    ],
    "saveVariables": []
  },
  "Game_CollectionItem_CeremonialScissors": {
    "achievementId": "Game_CollectionItem_CeremonialScissors",
    "achievementName": "Collectible: Ceremonial Scissors",
    "game": "Sordland",
    "category": "Collectible Item",
    "timeline": {
      "turn": "Turn 6",
      "sceneTitle": "Inauguration Ceremony of the Mega-Infrastructure Project",
      "sceneFile": "Sordland_Turn06_InT_RailwayOpening.md"
    },
    "prerequisites": [
      "Commission either the L-1 High Speed Railway or the H-3 Highway in Turn 1.",
      "Ensure the construction finishes on schedule by Turn 6 without catastrophic worker strikes or delays."
    ],
    "dialogueSteps": [
      {
        "speaker": "Anton Rayne",
        "context": "Turn 6: Standing before the inaugural ribbon at Conriat station or Agnland highway",
        "recommendedChoice": "Take the ceremonial gold scissors, cut the ribbon, and declare the transit corridor open.",
        "notes": "Adds the gold Ceremonial Scissors to your permanent collection."
      }
    ],
    "pitfalls": [
      "Underfunding the project or choosing Taurus without passing the Worker's Rights Act, delaying completion past Turn 6."
    ],
    "saveVariables": [
      "BaseGameSupport.CollectionItem_CeremonialScissors"
    ]
  },
  "Game_LespiaAlliance": {
    "achievementId": "Game_LespiaAlliance",
    "achievementName": "\"Fortune, Strength, Liberty\"",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Turn 8",
      "sceneTitle": "Emergency Crisis Summit at the Presidential Palace",
      "sceneFile": "Sordland_Turn08_FPnT_LespiaVisit.md"
    },
    "prerequisites": [
      "Travel to Lespia in Turn 8.",
      "Do not ally with Wehlen (Operation Bear Trap) or be willing to sell Sordish Petroleum shares to Alvarez."
    ],
    "dialogueSteps": [
      {
        "speaker": "Patricio Alvarez",
        "context": "Bilateral summit at the presidential palace in Lespia",
        "recommendedChoice": "Finalize the trade agreement and sign a formal military alliance with Lespia.",
        "notes": "Unlocks Lespia's modern air force and heavy mechanized support for the Rumburg war."
      }
    ],
    "pitfalls": [
      "Participating in Operation Bear Trap with Wehlen, which causes PM Patricio Alvarez to demand your petroleum shares or refuse alliance.",
      "Pursuing planned socialist policies that alienate capitalist Lespia."
    ],
    "saveVariables": []
  },
  "Game_CollectionItem_ArmadineRadio": {
    "achievementId": "Game_CollectionItem_ArmadineRadio",
    "achievementName": "Collectible: Armadine Radio",
    "game": "Sordland",
    "category": "Collectible Item",
    "timeline": {
      "turn": "Turn 4",
      "sceneTitle": "Private Stock Investment Opportunity with Gus Manger",
      "sceneFile": "Sordland_Turn05_Personal_ReturnOfInvestment.md"
    },
    "prerequisites": [
      "Have at least 1 or 2 Personal Wealth available in Turn 4.",
      "Review the corporate investment proposal from Agriculture Minister Gus Manger."
    ],
    "dialogueSteps": [
      {
        "speaker": "Gus Manger",
        "context": "Turn 4: Gus Manger offers insider allocation in Arcasian-partnered Armadine Industries stock",
        "recommendedChoice": "Invest 1 or 2 Personal Wealth into Armadine Industries shares.",
        "notes": "Purchases Armadine equity. Generates substantial financial return in Turn 8-9 and delivers the sleek radio."
      }
    ],
    "pitfalls": [
      "Investing in alternative options (e.g. Underhall or Vineyard) if you only have 1 wealth.",
      "Having 0 Personal Wealth when the investment window opens."
    ],
    "saveVariables": [
      "BaseGameSupport.CollectionItem_ArmadineRadio",
      "BaseGame.Investment_Armadine"
    ]
  },
  "Epilogue_LostRumburgWar": {
    "achievementId": "Epilogue_LostRumburgWar",
    "achievementName": "Hail the Queen",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Epilogue",
      "sceneTitle": "The Fall of Holsord and Sordish Military Defeat",
      "sceneFile": "Sordland_Epilogue_RumburgWarLost.md"
    },
    "prerequisites": [
      "Go to war with Rumburg without sufficient allies or with flawed tactical coordination.",
      "Rumburgian forces breach the defensive lines and occupy the capital."
    ],
    "dialogueSteps": [
      {
        "speaker": "Beatrice Livingstone",
        "context": "Underground bunker surrender in Holsord",
        "recommendedChoice": "Face Queen Beatrice and the Rumburgian conquerors as Sordland is occupied.",
        "notes": "Results in catastrophic military defeat, territorial dismemberment, and Rayne's capture."
      }
    ],
    "pitfalls": [
      "Winning the war against Rumburg through strong allies and sound military strategy.",
      "Reconciling with Queen Beatrice Livingstone diplomatically."
    ],
    "saveVariables": []
  },
  "Game_ViolentUnrest": {
    "achievementId": "Game_ViolentUnrest",
    "achievementName": "Down with Rayne!",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Turn 8",
      "sceneTitle": "Emergency Cabinet Meeting on Nationwide Riots",
      "sceneFile": "Sordland_Turn08_A_UnrestMeeting.md"
    },
    "prerequisites": [
      "Allow public opinion to collapse through unpopular decrees, corruption scandals, or severe austerity.",
      "Ignore growing protests until mass violence and riots erupt across Sordish cities in Turn 8."
    ],
    "dialogueSteps": [
      {
        "speaker": "Lileas Graf",
        "context": "Turn 8 national crisis debrief",
        "recommendedChoice": "Acknowledge the uncontrollable outbreak of violent rioting and nationwide urban chaos.",
        "notes": "Unlocks when public unrest reaches maximum boiling point."
      }
    ],
    "pitfalls": [
      "Maintaining high public approval, signing popular bills, and preventing hyperinflation."
    ],
    "saveVariables": []
  },
  "Game_MasterOfCrisis": {
    "achievementId": "Game_MasterOfCrisis",
    "achievementName": "Master of Crisis",
    "game": "Sordland",
    "category": "Policy Decision",
    "timeline": {
      "turn": "Prologue",
      "sceneTitle": "Prologue Archive",
      "sceneFile": "Prologue_Archive.md"
    },
    "prerequisites": [
      "Successfully manage and overcome severe late-game national unrest/crises."
    ],
    "dialogueSteps": [
      {
        "context": "Policy decision during Prologue",
        "recommendedChoice": "Approve decree / bill supporting Master of Crisis",
        "notes": "Ensures the required prerequisite game state flag is established."
      }
    ],
    "pitfalls": [
      "Resolving all issues too peacefully early on prevents triggering crises, while being couped or impeached before surviving 4 late-game crises will end the run prematurely."
    ],
    "saveVariables": [
      "BaseGame.LateGameCrisis"
    ]
  },
  "Game_ManOfPeople": {
    "achievementId": "Game_ManOfPeople",
    "achievementName": "Man of the People",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Turn 4",
      "sceneTitle": "Taurus Workers Strike or Morning Jog in Holsord",
      "sceneFile": "Sordland_Turn04_InT_TaurusRailwayIssue.md"
    },
    "prerequisites": [
      "Encounter the Taurus labor strike in Turn 4 or go for a morning jog.",
      "Show genuine solidarity with working-class citizens."
    ],
    "dialogueSteps": [
      {
        "speaker": "Anton Rayne",
        "context": "When confronted with striking construction laborers",
        "recommendedChoice": "Sign the Worker's Rights Act and listen respectfully to their grievances.",
        "notes": "Earns the enduring admiration of ordinary working-class Sordish citizens."
      }
    ],
    "pitfalls": [
      "Acting cold, haughty, or dismissive towards striking laborers and ordinary Sordish citizens."
    ],
    "saveVariables": []
  },
  "Game_DeclaredEmergency": {
    "achievementId": "Game_DeclaredEmergency",
    "achievementName": "Article 100",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Turn 3",
      "sceneTitle": "National Address Declaring a State of Emergency",
      "sceneFile": "Sordland_Turn03_A_AutocratSpeech.md"
    },
    "prerequisites": [
      "Meet with Chief Justice Orso Hawker in Turn 3.",
      "Agree to the Old Guard's plan to bypass constitutional reform via emergency decree."
    ],
    "dialogueSteps": [
      {
        "speaker": "Anton Rayne",
        "context": "National radio address to the nation in Turn 3",
        "recommendedChoice": "Formally proclaim a State of Emergency across Sordland in cooperation with the Supreme Court.",
        "notes": "Suspends normal democratic procedures, grants executive emergency powers, and allies with the Old Guard."
      }
    ],
    "pitfalls": [
      "Pursuing democratic constitutional reform or arresting Chief Justice Orso Hawker."
    ],
    "saveVariables": []
  },
  "Game_BearTrap": {
    "achievementId": "Game_BearTrap",
    "achievementName": "Operation Bear Trap",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Turn 5",
      "sceneTitle": "Emergency Crisis Summit at the Presidential Palace",
      "sceneFile": "Sordland_Turn05_FPnT_WehlenTradeVisit.md"
    },
    "prerequisites": [
      "Travel to Wehlen in Turn 5 with Deivid Wisci.",
      "Meet with President Wiktor Smolak at his presidential compound."
    ],
    "dialogueSteps": [
      {
        "speaker": "Wiktor Smolak",
        "context": "When Smolak demands military cooperation in Operation Bear Trap",
        "recommendedChoice": "Agree to assist Operation Bear Trap by sealing Sordish borders against Wehzek rebels.",
        "notes": "Grants +2 Government Budget and cheap oil, but triggers severe Bludish anger and international condemnation."
      }
    ],
    "pitfalls": [
      "Refusing President Wiktor Smolak's proposal to seal borders or actively granting asylum to Wehzek refugees."
    ],
    "saveVariables": []
  },
  "Game_CollectionItem_WhiskeyBottle": {
    "achievementId": "Game_CollectionItem_WhiskeyBottle",
    "achievementName": "Collectible: Whiskey Bottle",
    "game": "Sordland",
    "category": "Collectible Item",
    "timeline": {
      "turn": "Turn 1 & Turn 5",
      "sceneTitle": "Late Evening Drinks with Petr Vectern",
      "sceneFile": "Sordland_Turn05_Personal_PetrParty.md"
    },
    "prerequisites": [
      "Enjoy private drinks with Vice President Petr Vectern in Turn 1 or at his Turn 5 party."
    ],
    "dialogueSteps": [
      {
        "speaker": "Petr Vectern",
        "context": "Turn 1/5: Petr uncorks a bottle of 30-year-old aged Erlory maroon whiskey",
        "recommendedChoice": "Accept a glass of the vintage whiskey and keep the decorative bottle in your private cabinet.",
        "notes": "Adds the 30-year-old Erlory Whiskey Bottle to your collection."
      }
    ],
    "pitfalls": [
      "Refusing all drinks or staying strictly teetotal."
    ],
    "saveVariables": [
      "BaseGameSupport.CollectionItem_WhiskeyBottle"
    ]
  },
  "Game_SSP": {
    "achievementId": "Game_SSP",
    "achievementName": "Sssh!",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Turn 5",
      "sceneTitle": "Cabinet Deliberation on Founding the Secret State Police",
      "sceneFile": "Sordland_Turn05_SnO_FoundedPolice.md"
    },
    "prerequisites": [
      "Increase the Ministry of Justice and Interior budget in Turn 3.",
      "Allocate the funds to Interior Minister Lileas Graf instead of Justice."
    ],
    "dialogueSteps": [
      {
        "speaker": "Lileas Graf",
        "context": "Turn 5 police reform summit",
        "recommendedChoice": "Found the Secret State Police (SSP) under Karl Greiser.",
        "notes": "Grants covert black-ops capabilities to eliminate political rivals, investigate oligarchs, or crush dissent."
      }
    ],
    "pitfalls": [
      "Allocating the Turn 3 justice budget to Nia Morgna instead of Lileas Graf."
    ],
    "saveVariables": []
  },
  "Game_BFFUnrest": {
    "achievementId": "Game_BFFUnrest",
    "achievementName": "Yollak Bluderat!",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Turn 8",
      "sceneTitle": "Cabinet Emergency Briefing on Bludish Uprising",
      "sceneFile": "Sordland_Turn08_A_UnrestMeeting.md"
    },
    "prerequisites": [
      "Enact discriminatory policies against the Bludish population (e.g., Religious Harmony Act, Unified Education Act).",
      "Do not reconcile with Bludish leaders, provoking the BFF into open insurgency."
    ],
    "dialogueSteps": [
      {
        "speaker": "Lileas Graf",
        "context": "Turn 8 security assessment",
        "recommendedChoice": "Review reports of armed Bludish Freedom Front mobilizations and militant uprising across Bergia.",
        "notes": "Triggers armed BFF insurrection across the southeastern provinces."
      }
    ],
    "pitfalls": [
      "Reconciling with the Bludish minority, attending Aschraf peacefully, and vetoing discriminatory legislation."
    ],
    "saveVariables": []
  },
  "RiziaChapter1_Finish": {
    "achievementId": "RiziaChapter1_Finish",
    "achievementName": "Chapter I: King Romus",
    "game": "Rizia",
    "category": "Story Progression",
    "timeline": {
      "turn": "Turn 1 to Turn 3",
      "sceneTitle": "Royal Council Organization, Zille Bombing Crisis & Beatrice Visit",
      "sceneFile": "Rizia_Turn 3_FPnT_QueenBeatriceVisit.md"
    },
    "prerequisites": [
      "Navigate the opening three turns of Rizia: reorganize ministerial portfolios among House Toras, Azaro, and Sazon, address the Zille Friendship Day bombing, and host Queen Beatrice of Rumburg."
    ],
    "dialogueSteps": [
      {
        "speaker": "King Romus Toras",
        "context": "Turn 3: Concluding the imperial summit with Queen Beatrice",
        "recommendedChoice": "Establish your foreign policy stance within GRACE and instruct the Royal Council to proceed with development.",
        "notes": "Unlocks at the end of Turn 3 as Chapter II opens."
      }
    ],
    "pitfalls": [
      "Severe early budget bankruptcy or alienating all three noble houses simultaneously."
    ],
    "saveVariables": [
      "RiziaDLC.Chapter1_Finished"
    ]
  },
  "Game_FamilyMan": {
    "achievementId": "Game_FamilyMan",
    "achievementName": "Family Man",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Turn 10",
      "sceneTitle": "Warm Family Dinner with Monica, Franc, and Deana",
      "sceneFile": "Sordland_Turn10_DINNER WHOLE FAMILY (GOOD).md"
    },
    "prerequisites": [
      "Support Monica's career aspirations and maintain loving domestic ties.",
      "Send Franc to university (Holsord State or Arcasia/Contana) and treat him with paternal care.",
      "Spend quality time with young daughter Deana."
    ],
    "dialogueSteps": [
      {
        "speaker": "Anton Rayne",
        "context": "Turn 10 quiet family dinner at the presidential residence",
        "recommendedChoice": "Share laughter, toast to your loved ones, and celebrate your close-knit family.",
        "notes": "Requires all family members to remain affectionate, united, and proud of Anton."
      }
    ],
    "pitfalls": [
      "Divorcing Monica, mistreating Deana, or sending Franc to the frontlines out of spite."
    ],
    "saveVariables": []
  },
  "Game_CollectionItem_GoatStatue": {
    "achievementId": "Game_CollectionItem_GoatStatue",
    "achievementName": "Collectible: Sordish Goat Statue",
    "game": "Sordland",
    "category": "Collectible Item",
    "timeline": {
      "turn": "Turn 4",
      "sceneTitle": "Agnland Regional Economic Tour",
      "sceneFile": "Sordland_Turn04_InT_TaurusRailwayIssue.md"
    },
    "prerequisites": [
      "Tour the rural provinces of Agnland in Turn 4.",
      "Support local development and meet with traditional highland craftsmen."
    ],
    "dialogueSteps": [
      {
        "speaker": "Anton Rayne",
        "context": "Turn 4: Meeting with local Agnland artisans",
        "recommendedChoice": "Praise the craftsmanship of the local highland herders and accept the hand-carved Sordish mountain goat figurine.",
        "notes": "Places the traditional wooden goat statue in your cabinet."
      }
    ],
    "pitfalls": [
      "Ignoring rural tours in favor of purely urban focus."
    ],
    "saveVariables": [
      "BaseGameSupport.CollectionItem_GoatStatue"
    ]
  },
  "Game_JoinedCSP": {
    "achievementId": "Game_JoinedCSP",
    "achievementName": "United Against Capitalism",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Turn 9",
      "sceneTitle": "State Visit to United Contana and Summit with Leon Malenyev",
      "sceneFile": "Sordland_Turn09_FPnT_UnitedContanaVisit.md"
    },
    "prerequisites": [
      "Pursue planned socialist economic policies and accept United Contana economic aid.",
      "Do not align with Arcasia or join ATO."
    ],
    "dialogueSteps": [
      {
        "speaker": "Leon Malenyev",
        "context": "State dinner with Premier Malenyev in Turn 9",
        "recommendedChoice": "Sign the Comrade Contanan Security Pact (CSP) treaty alongside Premier Malenyev.",
        "notes": "Formally aligns Sordland with the global socialist superpower bloc under Contana's nuclear umbrella."
      }
    ],
    "pitfalls": [
      "Accepting Arcasian aid, joining ATO, or privatizing state corporations."
    ],
    "saveVariables": []
  },
  "Game_ValgslandAlliance": {
    "achievementId": "Game_ValgslandAlliance",
    "achievementName": "\"Through Broken Shackles\"",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Turn 8",
      "sceneTitle": "State Visit to Valgsland and Summit with Emmerich Hegel",
      "sceneFile": "Sordland_Turn08_FPnT_ValgslandVisit.md"
    },
    "prerequisites": [
      "Adopt planned economy or nationalize corporations, and avoid allying with Agnolia against Valgsland.",
      "Travel to Valgsland in Turn 8."
    ],
    "dialogueSteps": [
      {
        "speaker": "Emmerich Hegel",
        "context": "Summit with Chancellor Hegel on his flagship",
        "recommendedChoice": "Recognize Valgsland's claim over Heljiland, sign the trade pact, and formalize a military alliance.",
        "notes": "Secures Valgsland's heavy naval fleet and elite amphibious divisions for defense against Rumburg."
      }
    ],
    "pitfalls": [
      "Allying with Agnolia against Valgsland in the Heljiland dispute or pursuing free-market privatization."
    ],
    "saveVariables": []
  },
  "RiziaChapter2_Finish": {
    "achievementId": "RiziaChapter2_Finish",
    "achievementName": "Chapter II: Between-Seas",
    "game": "Rizia",
    "category": "Story Progression",
    "timeline": {
      "turn": "Turn 4 to Turn 6",
      "sceneTitle": "Aureus Gas Field Crisis, MITZ Negotiations & Derdia Outreach",
      "sceneFile": "Rizia_Turn 5_FPnT_MorellaNegotiations.md"
    },
    "prerequisites": [
      "Navigate Turns 4 through 6: negotiate maritime border rights over the Aureus field with Duke Axel, conduct MITZ negotiations in Morella with President Salva, and handle domestic religious unrest."
    ],
    "dialogueSteps": [
      {
        "speaker": "King Romus Toras",
        "context": "Turn 6: Concluding regional trade accords and naval reviews",
        "recommendedChoice": "Adjourn the diplomatic council and instruct the navy and industry to maintain high readiness.",
        "notes": "Unlocks at the conclusion of Turn 6 as Chapter III begins."
      }
    ],
    "pitfalls": [
      "Allowing energy reserves to collapse or provoking premature military clashes."
    ],
    "saveVariables": [
      "RiziaDLC.Chapter2_Finished"
    ]
  },
  "Epilogue_Couped": {
    "achievementId": "Epilogue_Couped",
    "achievementName": "Coup d'état",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Epilogue",
      "sceneTitle": "Sordland Epilogue Couptrial",
      "sceneFile": "Sordland_Epilogue_CoupTrial.md"
    },
    "prerequisites": [
      "Provoke the military (Iosef Lancea / Valken) through extreme instability, unrest, de-sollinization, or joining CSP without controlling military loyalty",
      "Get overthrown in a military coup"
    ],
    "dialogueSteps": [
      {
        "context": "Meeting in scene: Sordland Epilogue Couptrial",
        "recommendedChoice": "Face the military tribunal during the coup trial",
        "notes": "Triggered within Sordland_Epilogue_CoupTrial.md"
      }
    ],
    "pitfalls": [
      "Keeping military unrest low and not transferring the Gendarmerie to Interior."
    ],
    "saveVariables": []
  },
  "RiziaChapter3_Finish": {
    "achievementId": "RiziaChapter3_Finish",
    "achievementName": "Chapter III: Leviathan",
    "game": "Rizia",
    "category": "Story Progression",
    "timeline": {
      "turn": "Turn 7 to Turn 8",
      "sceneTitle": "Zille Handover Ultimatum, Wehlen Summit & Derdian Duel",
      "sceneFile": "Rizia_Turn 8_Garden_Vina Non Marriage.md"
    },
    "prerequisites": [
      "Reach the critical diplomatic milestones in Turns 7 and 8: pressure President Smolak for the return of Zille, participate in Derdia's Duel of Generosity, and navigate Princess Vina's royal succession."
    ],
    "dialogueSteps": [
      {
        "speaker": "King Romus Toras",
        "context": "Turn 8: Palace garden consultations on dynastic alliances and military preparations",
        "recommendedChoice": "Finalize your strategy regarding Pales and Zille as the regional crisis approaches boiling point.",
        "notes": "Unlocks at the end of Turn 8 as Chapter IV commences."
      }
    ],
    "pitfalls": [
      "Failing to prepare adequate military or diplomatic leverage for the Zille deadline."
    ],
    "saveVariables": [
      "RiziaDLC.Chapter3_Finished"
    ]
  },
  "RiziaChapter4_Finish": {
    "achievementId": "RiziaChapter4_Finish",
    "achievementName": "Chapter IV: Sila Orica",
    "game": "Rizia",
    "category": "Story Progression",
    "timeline": {
      "turn": "Turn 9 to Turn 10",
      "sceneTitle": "The Fate of Pales, Intermerkopum Signing & Sovereign Succession",
      "sceneFile": "Rizia_Turn 10_SuccessionAnnouncement.md"
    },
    "prerequisites": [
      "Conclude King Romus's first decade of rule: resolve the Pales situation (via victory in war or peaceful royal marriage), sign the Intermerkopum treaty, and formally proclaim royal succession."
    ],
    "dialogueSteps": [
      {
        "speaker": "King Romus Toras",
        "context": "Turn 10: Addressing the Royal Council, nobility, and realm in the throne room",
        "recommendedChoice": "Deliver your historic decennial address celebrating Rizia's sovereign triumphs.",
        "notes": "Unlocks at the climax of Turn 10 as epilogues trigger."
      }
    ],
    "pitfalls": [
      "Suffering a military coup by House Azaro or violent revolution in Sotelato."
    ],
    "saveVariables": [
      "RiziaDLC.Chapter4_Finished"
    ]
  },
  "Game_Isolated": {
    "achievementId": "Game_Isolated",
    "achievementName": "No Friends But Sords",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Turn 9",
      "sceneTitle": "Diplomatic Review of Sordish Neutrality and Isolation",
      "sceneFile": "Sordland_Turn09_A_Talks.md"
    },
    "prerequisites": [
      "Refuse all trade treaties with Agnolia, Wehlen, Lespia, and Valgsland.",
      "Reject superpower aid packages from both Arcasia and United Contana.",
      "Reject all foreign military alliances throughout the presidency."
    ],
    "dialogueSteps": [
      {
        "speaker": "Deivid Wisci",
        "context": "Turn 9 foreign policy review",
        "recommendedChoice": "Reiterate Sordland's strict non-aligned isolationism: standing entirely alone on the world stage.",
        "notes": "Leaves Sordland completely unaligned without a single foreign partner."
      }
    ],
    "pitfalls": [
      "Signing any trade treaty with Agnolia, Wehlen, Lespia, or Valgsland, or accepting superpower aid."
    ],
    "saveVariables": []
  },
  "Game_Murder": {
    "achievementId": "Game_Murder",
    "achievementName": "By Any Means Necessary",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Turn 7",
      "sceneTitle": "Covert SSP Black-Ops Elimination of Political Opponents",
      "sceneFile": "Sordland_Turn07_A_Autocrat_CourtDecision.md"
    },
    "prerequisites": [
      "Found the Secret State Police (SSP) under Karl Greiser in Turn 5.",
      "Direct the SSP to eliminate a targeted political opponent (e.g., Frens Ricter, Keshar Kibener, or Petr Vectern)."
    ],
    "dialogueSteps": [
      {
        "speaker": "Karl Greiser",
        "context": "Turn 7/8 clandestine briefing with Police Chief Karl Greiser",
        "recommendedChoice": "Give the order to make the target quietly disappear.",
        "notes": "Authorizes state-sanctioned political assassination through the SSP."
      }
    ],
    "pitfalls": [
      "Founding the ACP instead of the SSP, or refusing to authorize illegal assassinations."
    ],
    "saveVariables": []
  },
  "Game_CollectionItem_CigarBox": {
    "achievementId": "Game_CollectionItem_CigarBox",
    "achievementName": "Collectible: Cigar Box",
    "game": "Sordland",
    "category": "Collectible Item",
    "timeline": {
      "turn": "Turn 2 & Turn 3",
      "sceneTitle": "Meeting with Walter Tusk & Sordish Business Council Banquet",
      "sceneFile": "Sordland_Turn02_A_ContractBribe.md & Sordland_Turn03_EnT_BusinessCouncil.md"
    },
    "prerequisites": [
      "Accept Walter Tusk's overtures during the initial infrastructure tender meeting or Business Council dinner.",
      "Accept a luxury cigar from Tusk."
    ],
    "dialogueSteps": [
      {
        "speaker": "Walter Tusk",
        "context": "Turn 2/3: Walter Tusk offers a handcrafted wooden box of premium imported cigars",
        "recommendedChoice": "Accept a cigar from Walter Tusk and take the antique cigar box as a personal gift.",
        "notes": "Places the luxury Cigar Box on your presidential office desk."
      }
    ],
    "pitfalls": [
      "Aggressively rebuffing Walter Tusk or strictly refusing all gifts."
    ],
    "saveVariables": [
      "BaseGameSupport.CollectionItem_CigarBox"
    ]
  },
  "Game_Obstructionist": {
    "achievementId": "Game_Obstructionist",
    "achievementName": "Obstructionist",
    "game": "Sordland",
    "category": "Policy Decision",
    "timeline": {
      "turn": "Prologue",
      "sceneTitle": "Prologue Archive",
      "sceneFile": "Prologue_Archive.md"
    },
    "prerequisites": [
      "Veto at least 8 legislative bills sent to your desk by the Assembly."
    ],
    "dialogueSteps": [
      {
        "context": "Policy decision during Prologue",
        "recommendedChoice": "Approve decree / bill supporting Obstructionist",
        "notes": "Ensures the required prerequisite game state flag is established."
      }
    ],
    "pitfalls": [
      "Signing bills reduces your pool of available vetoes."
    ],
    "saveVariables": [
      "BaseGame.VetoedBillCount"
    ]
  },
  "Game_Underhall": {
    "achievementId": "Game_Underhall",
    "achievementName": "Underhall Once Again #1",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Turn 5",
      "sceneTitle": "Investment in Underhall Construction at Petr's Party",
      "sceneFile": "Sordland_Turn05_Personal_PetrParty.md"
    },
    "prerequisites": [
      "Attend Petr's victory party in Turn 5.",
      "Possess at least 1 Personal Wealth."
    ],
    "dialogueSteps": [
      {
        "speaker": "Gus Manger",
        "context": "Conversation regarding private infrastructure securities",
        "recommendedChoice": "Invest 1 Personal Wealth into Underhall Construction stock.",
        "notes": "Yields substantial personal dividend return in Turn 8-9."
      }
    ],
    "pitfalls": [
      "Having 0 Personal Wealth at Petr's party in Turn 5 to invest in Underhall Construction."
    ],
    "saveVariables": []
  },
  "Game_CollectionItem_Dagger": {
    "achievementId": "Game_CollectionItem_Dagger",
    "achievementName": "Collectible: King Egmund's Dagger",
    "game": "Sordland",
    "category": "Collectible Item",
    "timeline": {
      "turn": "Turn 6",
      "sceneTitle": "Sword of Sordland Military Exhibition on Victory Day",
      "sceneFile": "Sordland_Turn06_VictoryDay_AutocratPath_VictoryDay_AutocratPath Conversation.md"
    },
    "prerequisites": [
      "Maintain a strong nationalist or Sollist political standing.",
      "Attend the Victory Day military commemoration in Turn 6."
    ],
    "dialogueSteps": [
      {
        "speaker": "Anton Rayne",
        "context": "Turn 6: Viewing the historical royal armory artifacts",
        "recommendedChoice": "Praise the martial prowess of the ancient Kingdom of Sordland and receive King Egmund's ceremonial dagger.",
        "notes": "Presents King Egmund's Dagger as a centerpiece on Anton's desk."
      }
    ],
    "pitfalls": [
      "Attending on a radical communist anti-military path where you boycott martial commemorations."
    ],
    "saveVariables": [
      "BaseGameSupport.CollectionItem_Dagger"
    ]
  },
  "Rizia_CollectionItem_WeddingRing": {
    "achievementId": "Rizia_CollectionItem_WeddingRing",
    "achievementName": "Collectible: Lena's Wedding Ring",
    "game": "Rizia",
    "category": "Collectible Item",
    "timeline": {
      "turn": "Turn 1",
      "sceneTitle": "Royal Bedchamber Solitude & Memories of Queen Lena",
      "sceneFile": "Rizia_Turn 1_Houses Briefing Section.md"
    },
    "prerequisites": [
      "Reflect upon your deceased wife Queen Lena during early introspective moments in Turn 1."
    ],
    "dialogueSteps": [
      {
        "speaker": "King Romus Toras",
        "context": "Turn 1: Looking through personal jewelry in the royal bedchamber",
        "recommendedChoice": "Pick up Queen Lena's amethyst wedding band, remember her eyes, and safeguard it in your drawer.",
        "notes": "Keeps Queen Lena's Wedding Ring in your permanent inventory."
      }
    ],
    "pitfalls": [
      "Discarding past memories."
    ],
    "saveVariables": [
      "RiziaDLCSupport.CollectionItem_WeddingRing"
    ]
  },
  "Game_Malenyevist": {
    "achievementId": "Game_Malenyevist",
    "achievementName": "Malenyevist",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Turn 10",
      "sceneTitle": "Final Ideological Review with Deivid Wisci: Malenyevist Legacy",
      "sceneFile": "Sordland_Turn10_A_DeividFinalTalk.md"
    },
    "prerequisites": [
      "Nationalize private enterprises, pass Worker's Rights, accept CSP aid, and enact socialist decrees.",
      "Finish the game with compass coordinates located deep in the socialist Malenyevist quadrant."
    ],
    "dialogueSteps": [
      {
        "speaker": "Deivid Wisci",
        "context": "Turn 10 farewell meeting with Foreign Minister Deivid Wisci",
        "recommendedChoice": "Declare your unwavering commitment to socialist revolution and the working class.",
        "notes": "Earns the Malenyevist ideological mantle for Anton Rayne."
      }
    ],
    "pitfalls": [
      "Pursuing privatization, cutting worker rights, or aligning with Arcasia/Lespia."
    ],
    "saveVariables": []
  },
  "Rizia_Authority": {
    "achievementId": "Rizia_Authority",
    "achievementName": "Domineering",
    "game": "Rizia",
    "category": "Policy Decision",
    "timeline": {
      "turn": "Turn 10",
      "sceneTitle": "Rizia Decriminalize Homosexuality Decriminalize Homosexuality Conversation",
      "sceneFile": "Rizia_Decriminalize Homosexuality_Decriminalize Homosexuality Conversation.md"
    },
    "prerequisites": [
      "State requirement: RiziaDLC.Resources_Authority >= 15"
    ],
    "dialogueSteps": [
      {
        "context": "Policy decision during Turn 10",
        "recommendedChoice": "Approve decree / bill supporting Domineering",
        "notes": "Ensures the required prerequisite game state flag is established."
      }
    ],
    "pitfalls": [
      "Over-expending Authority on low-priority royal decrees without building authority-generating infrastructure (such as the Grand Sanctuary or Royal Guard expansion) will keep you below the 15 Authority threshold."
    ],
    "saveVariables": [
      "RiziaDLC.Resources_Authority"
    ]
  },
  "Epilogue_WonRumburgWar": {
    "achievementId": "Epilogue_WonRumburgWar",
    "achievementName": "Vectern sis da!",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Turn 11",
      "sceneTitle": "The Peace of Thornbourgh: Total Military Victory Over Rumburg",
      "sceneFile": "Sordland_Turn11_SnO_RumburgWarWin.md"
    },
    "prerequisites": [
      "Fight Rumburg with a coherent military strategy (Iosef's modernized pincer or Valken's fortified attrition).",
      "Have strong allies (Lespia/Agnolia or Valgsland/Wehlen) or fully expanded independent armed forces."
    ],
    "dialogueSteps": [
      {
        "speaker": "Anton Rayne",
        "context": "Peace treaty ceremony in the captured Rumburgian capital of Thornbourgh",
        "recommendedChoice": "Sign the historic peace treaty, annexing Dome and Tzarsborough and dictating terms to Queen Beatrice.",
        "notes": "Total triumph over the Kingdom of Rumburg, cementing Sordland as a superpower."
      }
    ],
    "pitfalls": [
      "Going to war unprepared without allies or using conflicting military doctrines (e.g. mixing Iosef's pincer with Valken's conscripts)."
    ],
    "saveVariables": []
  },
  "Game_WealthSurplus": {
    "achievementId": "Game_WealthSurplus",
    "achievementName": "Rags to Riches",
    "game": "Sordland",
    "category": "Policy Decision",
    "timeline": {
      "turn": "Prologue",
      "sceneTitle": "Prologue Archive",
      "sceneFile": "Prologue_Archive.md"
    },
    "prerequisites": [
      "Accumulate at least 5 Personal Wealth without starting as an impoverished background."
    ],
    "dialogueSteps": [
      {
        "context": "Policy decision during Prologue",
        "recommendedChoice": "Approve decree / bill supporting Rags to Riches",
        "notes": "Ensures the required prerequisite game state flag is established."
      }
    ],
    "pitfalls": [
      "Choosing a wealthy family background in the prologue (Lachaven rich family) strictly locks you out of this achievement. You must start poor or middle class and reach 5 Personal Wealth."
    ],
    "saveVariables": [
      "BaseGame.Prologue_Birthplace_Lachaven_Rich",
      "BaseGame.PersonalWealth"
    ]
  },
  "Game_Democrat": {
    "achievementId": "Game_Democrat",
    "achievementName": "Democrat",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Turn 10",
      "sceneTitle": "Final Ideological Review with Deivid Wisci: Democratic Legacy",
      "sceneFile": "Sordland_Turn10_A_DeividFinalTalk.md"
    },
    "prerequisites": [
      "Pass a democratic reformist constitution limiting executive decrees and establishing checks and balances.",
      "Protect civil liberties, judicial independence, and democratic elections.",
      "Finish the game with compass coordinates located deep in the Democratic Reformist quadrant."
    ],
    "dialogueSteps": [
      {
        "speaker": "Deivid Wisci",
        "context": "Turn 10 farewell meeting with Deivid Wisci",
        "recommendedChoice": "Reflect on your presidency as a dedicated democrat who safeguarded civil liberties and freedom.",
        "notes": "Designated as a true Democratic Reformist president."
      }
    ],
    "pitfalls": [
      "Declaring a state of emergency, expanding executive decrees, or bribing Supreme Court justices."
    ],
    "saveVariables": []
  },
  "Game_Vodka": {
    "achievementId": "Game_Vodka",
    "achievementName": "Valgslandian Vodka",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Turn 8",
      "sceneTitle": "Comrade Solidarity Toast Aboard Hegel's Flagship",
      "sceneFile": "Sordland_Turn08_ValgslandVisit_ComradeRayne.md"
    },
    "prerequisites": [
      "Travel to Valgsland in Turn 8.",
      "Maintain respectful socialist comrade rapport with Chancellor Emmerich Hegel."
    ],
    "dialogueSteps": [
      {
        "speaker": "Emmerich Hegel",
        "context": "Private stateroom discussion regarding Malenyev and naval operations",
        "recommendedChoice": "Down the Valgslandian vodka shots with Chancellor Hegel and toast to workers' solidarity.",
        "notes": "Sharing traditional Valgslandian vodka seals deep fraternal bonds between Rayne and Hegel."
      }
    ],
    "pitfalls": [
      "Insulting Comrade Malenyev or acting arrogantly towards Chancellor Hegel during the flagship summit."
    ],
    "saveVariables": []
  },
  "Game_DeclareWarRumburg": {
    "achievementId": "Game_DeclareWarRumburg",
    "achievementName": "Sordish War Machine",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Turn 9",
      "sceneTitle": "Emergency Security Council Following the Rumburg Plane Incident",
      "sceneFile": "Sordland_Turn09_SnO_RumburgIncident.md"
    },
    "prerequisites": [
      "Reach Turn 9 where a Rumburgian fighter jet shoots down a Sordish patrol aircraft.",
      "Convene the National Security Council with Iosef Lancea and Valken Krueger."
    ],
    "dialogueSteps": [
      {
        "speaker": "Anton Rayne",
        "context": "Turn 9 high command meeting",
        "recommendedChoice": "Start the war machine: mobilize the armed forces and declare war on Rumburg.",
        "notes": "Formally declares war against Queen Beatrice Livingstone's kingdom."
      }
    ],
    "pitfalls": [
      "Backing down from the plane incident, accepting diplomatic de-escalation, or calling Beatrice for peace."
    ],
    "saveVariables": []
  },
  "Game_FCAnricaRises": {
    "achievementId": "Game_FCAnricaRises",
    "achievementName": "Goated",
    "game": "Sordland",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Turn 5 & Turn 10",
      "sceneTitle": "Sports Club Investment & League Championship Match",
      "sceneFile": "Sordland_Turn05_Personal_PetrParty.md & Sordland_Turn10_Personal_FCAnricaDerby.md"
    },
    "prerequisites": [
      "Invest 1 Personal Wealth into FC Anrica at Petr's party in Turn 5.",
      "Fund club training facilities and maintain high sports morale.",
      "Attend the football derby in Turn 10 and cheer the team to league championship victory."
    ],
    "dialogueSteps": [
      {
        "speaker": "Anton Rayne",
        "context": "Turn 10: Watching from the presidential box at Anrica stadium",
        "recommendedChoice": "Cheer wildly as FC Anrica scores the winning goal and lift the championship trophy with the squad.",
        "notes": "Secures FC Anrica's national championship and unlocks FC Anrica Rises."
      }
    ],
    "pitfalls": [
      "Failing to invest in the club in Turn 5 or skipping the derby."
    ],
    "saveVariables": [
      "BaseGame.FCAnrica_LeagueChampion"
    ]
  },
  "Game_CollectionItem_Headphones": {
    "achievementId": "Game_CollectionItem_Headphones",
    "achievementName": "Collectible: Headphones",
    "game": "Sordland",
    "category": "Collectible Item",
    "timeline": {
      "turn": "Turn 11 (War)",
      "sceneTitle": "Underground War Command Bunker in Holsord",
      "sceneFile": "Sordland_Turn11_SnO_RumburgWarWin.md"
    },
    "prerequisites": [
      "Go to war against the Kingdom of Rumburg in Turn 9.",
      "Enter the underground military command bunker with General Iosef Lancea and Valken Krueger."
    ],
    "dialogueSteps": [
      {
        "speaker": "Iosef Lancea",
        "context": "Turn 11: At the tactical map table coordinating frontline divisions",
        "recommendedChoice": "Put on the heavy military communication headset to receive live frontline telemetry from your generals.",
        "notes": "Adds the wartime headphones to your presidential collection upon concluding operations."
      }
    ],
    "pitfalls": [
      "Avoiding war entirely (this item requires entering the military war phase)."
    ],
    "saveVariables": [
      "BaseGameSupport.CollectionItem_Headphones"
    ]
  },
  "Game_NewRedYouth": {
    "achievementId": "Game_NewRedYouth",
    "achievementName": "Revolutionary Generation",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Turn 9",
      "sceneTitle": "Public Endorsement of the Red Youth Socialist Cadres",
      "sceneFile": "Sordland_Turn09_SnO_RumburgIncident.md"
    },
    "prerequisites": [
      "Pursue socialist domestic policy and maintain positive standing with left-wing student movements.",
      "Address youth unrest in Turn 9."
    ],
    "dialogueSteps": [
      {
        "speaker": "Anton Rayne",
        "context": "Cabinet security meeting on youth paramilitary mobilization",
        "recommendedChoice": "Publicly endorse and align your administration with the Red Youth.",
        "notes": "Mobilizes socialist student cadres to support the government."
      }
    ],
    "pitfalls": [
      "Banning the Red Youth or allying with the Young Sords / NFP."
    ],
    "saveVariables": []
  },
  "Game_CollectionItem_CarKey": {
    "achievementId": "Game_CollectionItem_CarKey",
    "achievementName": "Collectible: Car Key",
    "game": "Sordland",
    "category": "Collectible Item",
    "timeline": {
      "turn": "Turn 7",
      "sceneTitle": "State Corporation Privatization and Executive Purchasing",
      "sceneFile": "Sordland_Turn07_NEDAM OR SSC PRIVATISED.md"
    },
    "prerequisites": [
      "Privatize state corporations (SSC or Nedam Mining) in Turn 7 or maintain high Personal Wealth (3+).",
      "Accept an oligarch luxury gift or purchase a high-end luxury vehicle."
    ],
    "dialogueSteps": [
      {
        "speaker": "Anton Rayne",
        "context": "Turn 7: Deciding personal luxury allocations during market privatization",
        "recommendedChoice": "Acquire the imported luxury executive sedan or accept the vehicle gift from Walter Tusk.",
        "notes": "Places the car key into your collection inventory."
      }
    ],
    "pitfalls": [
      "Pursuing a strict planned economy without privatizing and without surplus Personal Wealth."
    ],
    "saveVariables": [
      "BaseGameSupport.CollectionItem_CarKey"
    ]
  },
  "Game_CollectionItem_AnricaTrophy": {
    "achievementId": "Game_CollectionItem_AnricaTrophy",
    "achievementName": "Collectible: FC Anrica Trophy",
    "game": "Sordland",
    "category": "Collectible Item",
    "timeline": {
      "turn": "Turn 5 & Turn 10",
      "sceneTitle": "Petr Vectern's Victory Party & FC Anrica Championship Match",
      "sceneFile": "Sordland_Turn05_Personal_PetrParty.md & Sordland_Turn10_Personal_FCAnricaDerby.md"
    },
    "prerequisites": [
      "Have at least 1 Personal Wealth in Turn 5.",
      "Talk to Gus Manger at Petr Vectern's residence celebration in Turn 5.",
      "Invest 1 Personal Wealth to become a shareholder in Football Club Anrica.",
      "Attend the football derby match in Turn 10 with Petr/Lucian."
    ],
    "dialogueSteps": [
      {
        "speaker": "Gus Manger",
        "context": "Turn 5: Gus Manger discusses sports franchise investment opportunities",
        "recommendedChoice": "Invest 1 Personal Wealth to acquire shares in Football Club Anrica.",
        "notes": "Unlocks Game_FCAnrica and makes Anton a co-owner of the club."
      },
      {
        "speaker": "Anton Rayne",
        "context": "Turn 10: Attending the high-stakes football derby in Anrica stadium",
        "recommendedChoice": "Join the celebrations in the presidential box as FC Anrica clinches the championship cup.",
        "notes": "Awards the official FC Anrica Trophy to your presidential display cabinet."
      }
    ],
    "pitfalls": [
      "Missing the dialogue with Gus Manger in Turn 5 or refusing to invest."
    ],
    "saveVariables": [
      "BaseGameSupport.CollectionItem_AnricaTrophy",
      "BaseGame.Investment_FCAnrica"
    ]
  },
  "Rizia_Epilogue_ContinuedReign": {
    "achievementId": "Rizia_Epilogue_ContinuedReign",
    "achievementName": "My Rule Continues",
    "game": "Rizia",
    "category": "Story Progression",
    "timeline": {
      "turn": "Turn 10 / Epilogue",
      "sceneTitle": "Conclusion of the First Decennial Reign with Undiminished Sovereignty",
      "sceneFile": "Rizia_Turn 10_DECLARATION_DECLARATION Conversation.md"
    },
    "prerequisites": [
      "Successfully complete the 10-turn campaign as King Romus Toras without being couped, exiled, imprisoned, or assassinated.",
      "Retain the Crown of Rizia and enter the second decade of your reign."
    ],
    "dialogueSteps": [
      {
        "speaker": "King Romus Toras",
        "context": "Turn 10: Decennial celebratory banquet",
        "recommendedChoice": "Raise your goblet to the people and noble houses of Rizia, declaring that your sovereign rule continues into the future.",
        "notes": "Unlocks My Rule Continues for safely finishing the campaign on the throne."
      }
    ],
    "pitfalls": [
      "Dying, getting overthrown, or losing the crown before Turn 10 ends."
    ],
    "saveVariables": [
      "RiziaDLC.Reign_Continued"
    ]
  },
  "Rizia_CaseClosed": {
    "achievementId": "Rizia_CaseClosed",
    "achievementName": "Case Closed",
    "game": "Rizia",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Turn 8 & Turn 9",
      "sceneTitle": "Royal Security Council Investigation of the Zille Bombing",
      "sceneFile": "Rizia_Turn 10_Security_LucitaOrTitus.md"
    },
    "prerequisites": [
      "Direct Golden Guard Commander Titus to conduct a meticulous, evidence-based investigation into the Zille bombing.",
      "Do not falsely scapegoat Derdia or innocent Bluds.",
      "Uncover the covert conspiracy linking Su Omina / foreign agents and resolve the case conclusively."
    ],
    "dialogueSteps": [
      {
        "speaker": "Titus Gari",
        "context": "Turn 9: Presenting the final intelligence dossier on the Zille bombing",
        "recommendedChoice": "Review the conclusive forensic evidence, sign the official findings, and formally close the Zille investigation.",
        "notes": "Solves the mystery of the bombing without diplomatic fallout."
      }
    ],
    "pitfalls": [
      "Blaming innocent third parties to appease noble houses, which leaves the real culprits hidden."
    ],
    "saveVariables": [
      "RiziaDLC.Zille_Bombing_Solved"
    ]
  },
  "Game_CollectionItem_USPBrooch": {
    "achievementId": "Game_CollectionItem_USPBrooch",
    "achievementName": "Collectible: USP Brooch",
    "game": "Sordland",
    "category": "Collectible Item",
    "timeline": {
      "turn": "Turn 10",
      "sceneTitle": "United Sordland Party (USP) Congress Leadership Primary",
      "sceneFile": "Sordland_Turn10_A_DeividFinalTalk.md"
    },
    "prerequisites": [
      "Remain within the USP and face interior minister Lileas Graf's leadership challenge in Turn 10.",
      "Defeat Lileas Graf in the delegate voting to retain your position as USP Party Chairman."
    ],
    "dialogueSteps": [
      {
        "speaker": "Anton Rayne",
        "context": "Turn 10: Addressing party delegates at the USP Congress in Holsord",
        "recommendedChoice": "Rally the delegates around your achievements and win the vote against Lileas Graf.",
        "notes": "Retains the party leadership and receives the ceremonial USP Chairman Brooch."
      }
    ],
    "pitfalls": [
      "Losing the party primary to Lileas Graf or abandoning the USP early to form a new party."
    ],
    "saveVariables": [
      "BaseGameSupport.CollectionItem_USPBrooch",
      "BaseGame.WonUSPLeadership"
    ]
  },
  "Game_Capitalist": {
    "achievementId": "Game_Capitalist",
    "achievementName": "Capitalist",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Turn 10",
      "sceneTitle": "Final Ideological Review with Deivid Wisci: Free Market Capitalist",
      "sceneFile": "Sordland_Turn10_A_DeividFinalTalk.md"
    },
    "prerequisites": [
      "Privatize state companies (SSC, Nedam), align with the Oligarchs, join ATO, and enact free-market policies.",
      "Finish the game with compass coordinates deep in the Capitalist quadrant."
    ],
    "dialogueSteps": [
      {
        "speaker": "Deivid Wisci",
        "context": "Turn 10 farewell meeting with Deivid Wisci",
        "recommendedChoice": "Celebrate your legacy as an architect of Sordish free enterprise and private capitalism.",
        "notes": "Designated as a champion of free-market capitalism."
      }
    ],
    "pitfalls": [
      "Nationalizing corporations, funding state monopolies, or siding with socialist trade unions."
    ],
    "saveVariables": []
  },
  "Game_NewYoungSords": {
    "achievementId": "Game_NewYoungSords",
    "achievementName": "New Generation of Sords",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Turn 9",
      "sceneTitle": "Public Alliance with Remus Holstron and the Young Sords",
      "sceneFile": "Sordland_Turn09_SnO_RumburgIncident.md"
    },
    "prerequisites": [
      "Pursue ultranationalist Sollist policy and maintain friendly ties with Keshar Kibener and the NFP.",
      "Address youth unrest in Turn 9."
    ],
    "dialogueSteps": [
      {
        "speaker": "Anton Rayne",
        "context": "Security meeting regarding nationalist youth groups",
        "recommendedChoice": "Formally endorse and legitimize the Young Sords paramilitary movement.",
        "notes": "Employs nationalist youth brigades for internal security."
      }
    ],
    "pitfalls": [
      "Banning the Young Sords, joining the Red Youth, or suppressing nationalist organizations."
    ],
    "saveVariables": []
  },
  "Game_BudgetSurplus": {
    "achievementId": "Game_BudgetSurplus",
    "achievementName": "Frugal",
    "game": "Sordland",
    "category": "Policy Decision",
    "timeline": {
      "turn": "Prologue",
      "sceneTitle": "Prologue Archive",
      "sceneFile": "Prologue_Archive.md"
    },
    "prerequisites": [
      "Maintain strict fiscal surplus and reach at least +10 Government Budget."
    ],
    "dialogueSteps": [
      {
        "context": "Policy decision during Prologue",
        "recommendedChoice": "Approve decree / bill supporting Frugal",
        "notes": "Ensures the required prerequisite game state flag is established."
      }
    ],
    "pitfalls": [
      "Over-funding ministries or large welfare expansions drains budget."
    ],
    "saveVariables": [
      "BaseGame.GovernmentBudget"
    ]
  },
  "Game_CollectionItem_AschrafCandle": {
    "achievementId": "Game_CollectionItem_AschrafCandle",
    "achievementName": "Collectible: Aschraf Candle",
    "game": "Sordland",
    "category": "Collectible Item",
    "timeline": {
      "turn": "Turn 8",
      "sceneTitle": "Aschraf Anniversary Commemoration in Bergia",
      "sceneFile": "Sordland_Turn08_A_AschrafAnniversary.md"
    },
    "prerequisites": [
      "Do not send armed military crackdowns or tear gas to disperse Bludish mourners.",
      "Attend the Aschraf Anniversary commemoration in person in Turn 8.",
      "Cooperate with independent Bludish MP Mansoun Leke."
    ],
    "dialogueSteps": [
      {
        "speaker": "Anton Rayne",
        "context": "Turn 8: Arriving at the memorial gathering in Bergia",
        "recommendedChoice": "Walk into the crowd without excessive armed escort, approach Mansoun Leke respectfully, take the memorial candle, and hold it up in silence.",
        "notes": "Unlocks the Aschraf Candle collectible and secures Bludish reconciliation."
      }
    ],
    "pitfalls": [
      "Ordering police to attack the memorial or refusing to attend in person.",
      "Making an aggressive Sollist nationalist speech on stage."
    ],
    "saveVariables": [
      "BaseGameSupport.CollectionItem_AschrafCandle",
      "BaseGame.Aschraf_CandleLit"
    ]
  },
  "Epilogue_Retirement": {
    "achievementId": "Epilogue_Retirement",
    "achievementName": "Early Retirement",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Turn 11 (Epilogue)",
      "sceneTitle": "Peaceful Retirement in Anrica Away from Politics",
      "sceneFile": "Sordland_ANRICA ENDING.md"
    },
    "prerequisites": [
      "Choose not to run for re-election or retire gracefully from the presidency at the end of your term.",
      "Avoid being assassinated, impeached, or couped by the military."
    ],
    "dialogueSteps": [
      {
        "speaker": "Anton Rayne",
        "context": "Final epilogue scene in Anrica",
        "recommendedChoice": "Enjoy a tranquil life at your family home in Anrica, reminiscing on your time in power.",
        "notes": "Concludes Anton Rayne's presidency with peaceful domestic retirement."
      }
    ],
    "pitfalls": [
      "Running for re-election or getting couped/impeached before your term finishes."
    ],
    "saveVariables": []
  },
  "Game_PoliceState": {
    "achievementId": "Game_PoliceState",
    "achievementName": "Police State",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Turn 8",
      "sceneTitle": "Authoritarian Security Decrees Establishing a Police State",
      "sceneFile": "Sordland_Turn08_A_UnrestMeeting.md"
    },
    "prerequisites": [
      "Form the Secret State Police (SSP) or declare a State of Emergency.",
      "Authorize lethal force, expanded surveillance, and warrantless arrests against political opponents in Turn 8."
    ],
    "dialogueSteps": [
      {
        "speaker": "Lileas Graf",
        "context": "Turn 8 security council summit",
        "recommendedChoice": "Impose total police crackdowns, curfews, and mass arrests across all major cities.",
        "notes": "Transforms Sordland into an iron-fisted police state."
      }
    ],
    "pitfalls": [
      "Vetoing emergency police powers or refusing to deploy lethal force against protesters."
    ],
    "saveVariables": []
  },
  "Game_1Vote": {
    "achievementId": "Game_1Vote",
    "achievementName": "Every Vote Matters",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Turn 7",
      "sceneTitle": "Nail-Biting Assembly Vote Passed by Exactly One Vote",
      "sceneFile": "Sordland_Turn07_A_AssemblyVote.md"
    },
    "prerequisites": [
      "Draft a controversial constitution that barely secures enough votes.",
      "Do minimal lobbying to land precisely on 167 Ayes (the minimum needed threshold is 166)."
    ],
    "dialogueSteps": [
      {
        "speaker": "Gloria Tory",
        "context": "Assembly tally announcement in Turn 7",
        "recommendedChoice": "Watch the vote tally closely as the Speaker announces passage with exactly 167 votes.",
        "notes": "Passes the historic reform bill with the slimmest possible margin of a single vote."
      }
    ],
    "pitfalls": [
      "Securing a massive supermajority (e.g. 225 votes) or failing to reach the 167 threshold."
    ],
    "saveVariables": []
  },
  "Rizia_CollectionItem_DastScepter": {
    "achievementId": "Rizia_CollectionItem_DastScepter",
    "achievementName": "Collectible: St. Dast's Scepter",
    "game": "Rizia",
    "category": "Collectible Item",
    "timeline": {
      "turn": "Turn 11",
      "sceneTitle": "Holy Basilica of Iza Theocratic Concord",
      "sceneFile": "Rizia_Turn 11_A_TheocracyDeclaration.md"
    },
    "prerequisites": [
      "Maintain a deeply pious Dastnurist religious path throughout King Romus's reign.",
      "Receive the high blessing of Supreme Priest Sal in Turn 11."
    ],
    "dialogueSteps": [
      {
        "speaker": "High Priest Sal",
        "context": "Turn 11: Solemn blessing at the Holy Basilica of Iza",
        "recommendedChoice": "Kneel before the altar, affirm your devotion to Saint Dast, and receive St. Dast's gold scepter.",
        "notes": "Adds the sacred St. Dast's Scepter to your royal inventory."
      }
    ],
    "pitfalls": [
      "Adopting a purely secular, anti-clerical path."
    ],
    "saveVariables": [
      "RiziaDLCSupport.CollectionItem_DastScepter"
    ]
  },
  "Game_NFPAlliance": {
    "achievementId": "Game_NFPAlliance",
    "achievementName": "Purple Blood",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Turn 7",
      "sceneTitle": "Joint Press Conference Announcing USP-NFP Coalition",
      "sceneFile": "Sordland_Turn07_AnnounceAlliance.md"
    },
    "prerequisites": [
      "Pursue nationalist or authoritarian constitutional amendments.",
      "Cooperate with Keshar Kibener and agree to a formal electoral pact in Turn 7."
    ],
    "dialogueSteps": [
      {
        "speaker": "Keshar Kibener",
        "context": "Turn 7 alliance negotiation meeting",
        "recommendedChoice": "Formally announce an electoral coalition between the USP and the National Front Party (NFP).",
        "notes": "Binds the ruling party to the nationalist right-wing bloc."
      }
    ],
    "pitfalls": [
      "Vetoing nationalist language bills or forming a coalition with Frens Ricter's PFJP."
    ],
    "saveVariables": []
  },
  "Rizia_CollectionItem_KorontiReportPostcard": {
    "achievementId": "Rizia_CollectionItem_KorontiReportPostcard",
    "achievementName": "Collectible: Valenqiris Postcard",
    "game": "Rizia",
    "category": "Collectible Item",
    "timeline": {
      "turn": "Turn 2",
      "sceneTitle": "State Visit from Marcel Koronti on Tourism & Seaside Resorts",
      "sceneFile": "Rizia_Turn 2_FPnT_SordlandTradeVisit.md"
    },
    "prerequisites": [
      "Meet with Heart of Sordland tycoon Marcel Koronti in Turn 2.",
      "Agree to co-invest in the luxury coastal resort in Valenqiris."
    ],
    "dialogueSteps": [
      {
        "speaker": "Marcel Koronti",
        "context": "Turn 2: Marcel Koronti presents the seaside resort partnership proposal",
        "recommendedChoice": "Approve the Valenqiris resort contract with HOS and receive the promotional postcard.",
        "notes": "Places the sun-kissed Valenqiris Postcard on your royal desk."
      }
    ],
    "pitfalls": [
      "Rejecting Koronti's tourism venture."
    ],
    "saveVariables": [
      "RiziaDLCSupport.CollectionItem_KorontiResortPostcard"
    ]
  },
  "Game_CollectionItem_Gun": {
    "achievementId": "Game_CollectionItem_Gun",
    "achievementName": "Collectible: Gun",
    "game": "Sordland",
    "category": "Collectible Item",
    "timeline": {
      "turn": "Turn 9",
      "sceneTitle": "Personal Defense Measures & War Preparation Briefing",
      "sceneFile": "Sordland_Turn09_SnO_MilitaryParade.md"
    },
    "prerequisites": [
      "Prepare for escalating military tensions or civil unrest in Turn 9.",
      "Authorize personal sidearm acquisition for presidential security."
    ],
    "dialogueSteps": [
      {
        "speaker": "Anton Rayne",
        "context": "Turn 9: Reviewing personal security protocols amidst threats from Rumburg or assassins",
        "recommendedChoice": "Acquire the custom revolver and place it in the top drawer of the presidential desk.",
        "notes": "Adds the personal firearm to your desk inventory."
      }
    ],
    "pitfalls": [
      "Refusing all personal security measures."
    ],
    "saveVariables": [
      "BaseGameSupport.CollectionItem_Gun"
    ]
  },
  "Game_HawkerPlan": {
    "achievementId": "Game_HawkerPlan",
    "achievementName": "Hawker's Plan",
    "game": "Sordland",
    "category": "Policy Decision",
    "timeline": {
      "turn": "Prologue",
      "sceneTitle": "Prologue Archive",
      "sceneFile": "Prologue_Archive.md"
    },
    "prerequisites": [
      "Maintain the Emergency throughout the game by following Hawker's demands perfectly.",
      "State requirement: BaseGame.Decision_Turn05_AutocratEmergency_Extend is true and BaseGame.Decision_Turn08_ExtendEmergency_Extend is true"
    ],
    "dialogueSteps": [
      {
        "context": "Policy decision during Prologue",
        "recommendedChoice": "Approve decree / bill supporting Hawker's Plan",
        "notes": "Ensures the required prerequisite game state flag is established."
      }
    ],
    "pitfalls": [
      "Refusing Orso Hawkers emergency proposal in Turn 1, attempting constitutional reform instead, or revoking the state of emergency in Turn 5 or Turn 8 will forfeit this achievement."
    ],
    "saveVariables": [
      "BaseGame.Decision_Turn05_AutocratEmergency_Extend",
      "BaseGame.Decision_Turn08_ExtendEmergency_Extend"
    ]
  },
  "Rizia_HighTea": {
    "achievementId": "Rizia_HighTea",
    "achievementName": "Game of Spoons",
    "game": "Rizia",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Turn 3 & Turn 8",
      "sceneTitle": "Aristocratic Royal High Tea at Palas Rezna",
      "sceneFile": "Rizia_Turn 3_FPnT_QueenBeatriceVisit.md"
    },
    "prerequisites": [
      "Host high tea with Queen Beatrice of Rumburg or Duchess Angelica Sazon.",
      "Observe flawless aristocratic etiquette, polite conversational decorum, and high-society hospitality."
    ],
    "dialogueSteps": [
      {
        "speaker": "King Romus Toras",
        "context": "Turn 3/8: Serving rare teas and pastries in the palace garden conservatory",
        "recommendedChoice": "Pour the imperial tea with refined court grace, engage in witty diplomatic discussion, and compliment your guests.",
        "notes": "Unlocks High Tea for masterclass royal hosting."
      }
    ],
    "pitfalls": [
      "Displaying rude table manners, spilling tea, or throwing diplomatic tantrums."
    ],
    "saveVariables": [
      "RiziaDLC.HighTea_Hosted"
    ]
  },
  "Rizia_CollectionItem_WruhecistMedallion": {
    "achievementId": "Rizia_CollectionItem_WruhecistMedallion",
    "achievementName": "Collectible: Wruhecist Medallion",
    "game": "Rizia",
    "category": "Collectible Item",
    "timeline": {
      "turn": "Turn 4",
      "sceneTitle": "Meftiem Archaeological Exploration of Ancient Rezenid Ruins",
      "sceneFile": "Rizia_Turn 4_A_CouncilTalkAboutPales.md"
    },
    "prerequisites": [
      "Fund or authorize archaeological excavations in the Meftiem International Trade Zone in Turn 4."
    ],
    "dialogueSteps": [
      {
        "speaker": "King Romus Toras",
        "context": "Turn 4: Royal expedition unearths pre-modern artifacts",
        "recommendedChoice": "Inspect the ancient religious relics and keep the solid gold Wruhecist Medallion.",
        "notes": "Adds the historic Wruhecist Medallion to your royal desk."
      }
    ],
    "pitfalls": [
      "Canceling the archaeological survey."
    ],
    "saveVariables": [
      "RiziaDLCSupport.CollectionItem_WruhecistMedallion"
    ]
  },
  "Game_CollectionItem_WineBottle": {
    "achievementId": "Game_CollectionItem_WineBottle",
    "achievementName": "Collectible: Wine Bottle",
    "game": "Sordland",
    "category": "Collectible Item",
    "timeline": {
      "turn": "Turn 5 & Turn 9",
      "sceneTitle": "Petr's Party Vineyard Investment & First Harvest Vintage Delivery",
      "sceneFile": "Sordland_Turn05_Personal_PetrParty.md"
    },
    "prerequisites": [
      "Have at least 1 Personal Wealth in Turn 5.",
      "Invest 1 Personal Wealth into Agriculture Minister Gus Manger's vineyard venture in Anrica (`Game_GiraltRibery`).",
      "Receive the matured first-edition vintage bottle in Turn 9."
    ],
    "dialogueSteps": [
      {
        "speaker": "Gus Manger",
        "context": "Turn 5: Gus Manger discusses investing in private Sordish wine production",
        "recommendedChoice": "Invest 1 Personal Wealth into Gus Manger's vineyard venture.",
        "notes": "Unlocks Game_GiraltRibery and sends the first-edition vintage Wine Bottle to your desk in Turn 9."
      }
    ],
    "pitfalls": [
      "Refusing to invest in the vineyard in Turn 5."
    ],
    "saveVariables": [
      "BaseGameSupport.CollectionItem_WineBottle",
      "BaseGame.Investment_Vineyard"
    ]
  },
  "Epilogue_Impeached": {
    "achievementId": "Epilogue_Impeached",
    "achievementName": "Impeached",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Epilogue",
      "sceneTitle": "Supreme Court Impeachment Trial of President Anton Rayne",
      "sceneFile": "Sordland_Epilogue_ImpeachmentTrial.md"
    },
    "prerequisites": [
      "Commit blatant corruption (taking bribes from Tusk/Koronti, insider trading) or order illegal wiretaps.",
      "Allow the Anti-Corruption Police or Lucian Galade to expose your scandals to the Supreme Court."
    ],
    "dialogueSteps": [
      {
        "speaker": "Orso Hawker",
        "context": "Supreme Court courtroom trial in the epilogue",
        "recommendedChoice": "Stand trial before the Supreme Court as Chief Justice Hawker hands down your conviction.",
        "notes": "Removed from the presidency and sentenced to imprisonment."
      }
    ],
    "pitfalls": [
      "Keeping your record clean of corruption, or forming the ACP to investigate the Old Guard."
    ],
    "saveVariables": []
  },
  "Epilogue_ElectionForcedOut": {
    "achievementId": "Epilogue_ElectionForcedOut",
    "achievementName": "Forced Out",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Epilogue",
      "sceneTitle": "Defeated in USP Party Congress and Forced Out of Office",
      "sceneFile": "Sordland_ANRICA ELECTION ENDING.md"
    },
    "prerequisites": [
      "Lose the USP party primary against challenger Lileas Graf in Turn 10.",
      "Choose not to form your own breakaway political party."
    ],
    "dialogueSteps": [
      {
        "speaker": "Lileas Graf",
        "context": "USP Party Congress announcement",
        "recommendedChoice": "Concede defeat to Lileas Graf and step aside from the presidential ticket.",
        "notes": "Ousted by your own party establishment before the general election."
      }
    ],
    "pitfalls": [
      "Winning the USP party primary against Lileas Graf or forming your own successful breakaway party."
    ],
    "saveVariables": []
  },
  "Game_IslandInvasion": {
    "achievementId": "Game_IslandInvasion",
    "achievementName": "Rightful Claim",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Turn 9",
      "sceneTitle": "Live Kyrute Television Broadcast on the Heljiland Crisis",
      "sceneFile": "Sordland_Turn09_A_TelevisionInterview.md"
    },
    "prerequisites": [
      "Reach Turn 9 where Valgsland launches an amphibious invasion of Heljiland island.",
      "Appear on international television interview with a renowned Kyrute journalist."
    ],
    "dialogueSteps": [
      {
        "speaker": "Anton Rayne",
        "context": "Live broadcast interview",
        "recommendedChoice": "Take an assertive stance on the Heljiland conflict, addressing the international community.",
        "notes": "States Sordland's diplomatic stance on the territorial conflict."
      }
    ],
    "pitfalls": [
      "Avoiding the international media broadcast or dodging questions about the Heljiland conflict."
    ],
    "saveVariables": []
  },
  "Game_EndOfAnEra": {
    "achievementId": "Game_EndOfAnEra",
    "achievementName": "End of an Era",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Turn 9",
      "sceneTitle": "High Court Conviction and Life Imprisonment of Tarquin Soll",
      "sceneFile": "Sordland_Turn09_A_SollTrial.md"
    },
    "prerequisites": [
      "Abolish Member of Honor immunity in the new constitution or via dictatorial decrees.",
      "Put Tarquin Soll on trial for crimes against the Republic and avoid execution."
    ],
    "dialogueSteps": [
      {
        "speaker": "Supreme Court",
        "context": "Turn 9 Soll trial verdict announcement",
        "recommendedChoice": "Convict Tarquin Soll of high treason and sentence him to life imprisonment on Antel Rock.",
        "notes": "Dethrones the founding father of modern Sordland without executing him."
      }
    ],
    "pitfalls": [
      "Restoring the death penalty (which sentences Soll to execution instead of life imprisonment) or leaving Soll's immunity intact."
    ],
    "saveVariables": []
  },
  "Rizia_LeaveGrace": {
    "achievementId": "Rizia_LeaveGrace",
    "achievementName": "Fall from GRACE",
    "game": "Rizia",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Turn 6 & Turn 8",
      "sceneTitle": "Withdrawal from the Grand Regional Alliance of Commerce and Energy",
      "sceneFile": "Rizia_Turn 9_FPnT_GRACERumburgMeeting.md"
    },
    "prerequisites": [
      "Reject Queen Beatrice's overbearing imperial demands.",
      "Formally announce Rizia's withdrawal from the GRACE monarchist pact to pursue sovereign independence or Intermerkopum."
    ],
    "dialogueSteps": [
      {
        "speaker": "King Romus Toras",
        "context": "Turn 8: Royal decree session regarding international alliances",
        "recommendedChoice": "Sign the proclamation withdrawing Rizia from GRACE and severing economic subservience to Rumburg.",
        "notes": "Leaves GRACE to chart an independent South Merkopa trajectory."
      }
    ],
    "pitfalls": [
      "Remaining fully compliant with Queen Beatrice's dictates."
    ],
    "saveVariables": [
      "RiziaDLC.Left_GRACE"
    ]
  },
  "Game_AnotherAlphonso": {
    "achievementId": "Game_AnotherAlphonso",
    "achievementName": "Another Alphonso",
    "game": "Sordland",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Turn 3 & Turn 7",
      "sceneTitle": "Radical Deregulation, Full Privatization & Economic Turmoil",
      "sceneFile": "Sordland_Turn07_NEDAM OR SSC PRIVATISED.md"
    },
    "prerequisites": [
      "Mimic the hyper-capitalist deregulatory policies of former President Ewald Alphonso.",
      "Repeal the Energy Protection Act (set EPA to 100%), privatize both SSC and Nedam Mining completely, and align totally with Oligarchs.",
      "Allow inflation and market volatility to destabilize the economy."
    ],
    "dialogueSteps": [
      {
        "speaker": "Anton Rayne",
        "context": "Turn 7: Cabinet privatization debrief",
        "recommendedChoice": "Sell maximum state shares of both SSC and Nedam to the open market and Walter Tusk.",
        "notes": "Earns Anton the infamous title of 'Another Alphonso' for reckless privatization."
      }
    ],
    "pitfalls": [
      "Maintaining majority state ownership or pursuing a planned economy."
    ],
    "saveVariables": [
      "BaseGame.Alphonso_Legacy_Replicated"
    ]
  },
  "Game_CollectionItem_KesaroLighter": {
    "achievementId": "Game_CollectionItem_KesaroLighter",
    "achievementName": "Collectible: Kesaro's Lighter",
    "game": "Sordland",
    "category": "Collectible Item",
    "timeline": {
      "turn": "Turn 6 & Turn 7",
      "sceneTitle": "Nationalist Alliance Negotiations with Keshar Kibener",
      "sceneFile": "Sordland_Turn07_AnnounceAlliance.md"
    },
    "prerequisites": [
      "Meet with National Front Party (NFP) leader Keshar Kibener in Turn 6 or 7.",
      "Find common ground on conservative/nationalist legislation (e.g. Unified Education Act or electoral pact)."
    ],
    "dialogueSteps": [
      {
        "speaker": "Keshar Kibener",
        "context": "Turn 6/7: Keshar Kibener offers his customized lucky lighter that once stopped a bullet",
        "recommendedChoice": "Accept Keshar Kibener's lucky engraved lighter as a token of mutual understanding.",
        "notes": "Places Kesaro's Lighter in your personal collection."
      }
    ],
    "pitfalls": [
      "Hostile refusal to speak with Kibener or insulting the NFP."
    ],
    "saveVariables": [
      "BaseGameSupport.CollectionItem_KesaroLighter"
    ]
  },
  "Game_CollectionItem_Pocketwatch": {
    "achievementId": "Game_CollectionItem_Pocketwatch",
    "achievementName": "Collectible: Serge's Pocket Watch",
    "game": "Sordland",
    "category": "Collectible Item",
    "timeline": {
      "turn": "Turn 3 & Turn 7",
      "sceneTitle": "Morning Commute with Serge Wolkner & Outside the National Assembly",
      "sceneFile": "Sordland_Turn03_Personal_DriverTalk.md & Sordland_Turn07_A_AssemblyVote.md"
    },
    "prerequisites": [
      "Have at least 2 Personal Wealth in Turn 3.",
      "Listen attentively to driver Serge Wolkner during the Turn 3 morning commute.",
      "Pay 2 Personal Wealth to fund his children's university tuition.",
      "Meet Serge outside the car prior to the Grand National Assembly vote in Turn 7."
    ],
    "dialogueSteps": [
      {
        "speaker": "Anton Rayne",
        "context": "Turn 3: When Serge opens up about being unable to afford his children's schooling",
        "recommendedChoice": "My driver's family shouldn't want for anything in this world. I'll cover your children's education and any other extra expenses you need. [-2 Personal Wealth]",
        "notes": "Sets BaseGameSupport.Journal_Turn03_DriverTalk_PaidForEducation = true and BaseGame.Relations_Serge_Friend = true."
      },
      {
        "speaker": "Serge Wolkner",
        "context": "Turn 7: Before entering the Assembly, Serge hands you his grandfather's heirloom watch",
        "recommendedChoice": "I looked at the back of the watch. The year 1920 was engraved on it. I put it in my front pocket, gave my thanks to Serge and opened the car door.",
        "notes": "Adds Serge's Pocket Watch to your collection inventory. DO NOT reject it or say 'Superstitions don't help anyone, Serge'."
      }
    ],
    "pitfalls": [
      "Do not spend all Personal Wealth in Turn 1/2 so you lack 2 Wealth in Turn 3.",
      "Do not decline the watch in Turn 7 (saying 'I can't take this' or 'Superstitions don't help anyone')."
    ],
    "saveVariables": [
      "BaseGameSupport.CollectionItem_Pocketwatch",
      "BaseGameSupport.Journal_Turn03_DriverTalk_PaidForEducation",
      "BaseGame.Relations_Serge_Friend"
    ]
  },
  "Rizia_Intermerkopum": {
    "achievementId": "Rizia_Intermerkopum",
    "achievementName": "Intermerkopum Alliance",
    "game": "Rizia",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Turn 9",
      "sceneTitle": "Founding Summit of the Intermerkopum Alliance in Porte Drazon",
      "sceneFile": "Rizia_Turn 9_Morella Derdia Mediation.md"
    },
    "prerequisites": [
      "Successfully mediate disputes between Wehlen, Morella, and Derdia.",
      "Found the independent South Merkopa regional economic and security pact: Intermerkopum."
    ],
    "dialogueSteps": [
      {
        "speaker": "King Romus Toras",
        "context": "Turn 9: Standing alongside President Smolak, President Salva, and Patriarch Azmal",
        "recommendedChoice": "Sign the historic Treaty of Porte Drazon, establishing the Intermerkopum alliance as a non-aligned regional bloc.",
        "notes": "Unlocks Intermerkopum and establishes South Merkopa's third superpower coalition."
      }
    ],
    "pitfalls": [
      "Alienating any member nation, causing the coalition to collapse before signing."
    ],
    "saveVariables": [
      "RiziaDLC.Intermerkopum_Founded"
    ]
  },
  "Game_Pluralist": {
    "achievementId": "Game_Pluralist",
    "achievementName": "Pluralist",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Turn 7",
      "sceneTitle": "Lowering Election Threshold to Promote Multiparty Democracy",
      "sceneFile": "Sordland_Turn07_A_ResultsMeeting.md"
    },
    "prerequisites": [
      "Include lowering the parliamentary election threshold (to 3% or 8%) in your constitutional reform package.",
      "Pass the reform through both the Assembly and the Supreme Court."
    ],
    "dialogueSteps": [
      {
        "speaker": "Anton Rayne",
        "context": "Turn 7 constitutional results meeting",
        "recommendedChoice": "Celebrate the enactment of a low election threshold that enables minor and minority parties to enter parliament.",
        "notes": "Enables genuine democratic pluralism in Sordland."
      }
    ],
    "pitfalls": [
      "Leaving the 10% election threshold untouched or raising it to 15%."
    ],
    "saveVariables": []
  },
  "Game_Chessmaster": {
    "achievementId": "Game_Chessmaster",
    "achievementName": "Chessmaster",
    "game": "Sordland",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Turn 5 & Turn 10",
      "sceneTitle": "Chess Match with Lucian Galade & Vice Presidential Betrayal",
      "sceneFile": "Sordland_Turn05_Personal_PetrParty.md & Sordland_Turn10_A_DeividFinalTalk.md"
    },
    "prerequisites": [
      "Play chess with Chief of Staff Lucian Galade in Turn 5.",
      "Intentionally lose the chess match against Lucian (or play suboptimal defense).",
      "Do NOT pick Lucian as Vice President after Petr resigns (pick Gloria Tory or maintain Petr).",
      "Get betrayed by Lucian in Turn 10 when he leaks your backroom deals to the Assembly or Supreme Court."
    ],
    "dialogueSteps": [
      {
        "speaker": "Lucian Galade",
        "context": "Turn 5: Chess match in the presidential study",
        "recommendedChoice": "Play a flawed opening (or yield the board) so Lucian checkmates your king.",
        "notes": "Lucian wins the game and notes your vulnerabilities."
      },
      {
        "speaker": "Anton Rayne",
        "context": "Turn 8: Selecting a new Vice President following the spy scandal",
        "recommendedChoice": "Appoint Gloria Tory or Albin Clavin instead of Lucian Galade.",
        "notes": "Deeply insults Lucian's political ambitions, prompting him to compile his dossier of your corruption."
      }
    ],
    "pitfalls": [
      "Winning the chess match against Lucian.",
      "Appointing Lucian as your Vice President (if appointed, he remains loyal and does not betray you)."
    ],
    "saveVariables": [
      "BaseGameSupport.ChessMatch_Lost",
      "BaseGame.Lucian_Betrayal"
    ]
  },
  "Game_Divorced": {
    "achievementId": "Game_Divorced",
    "achievementName": "This Can't Go On Like This, Anton",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Turn 9",
      "sceneTitle": "Painful Domestic Collapse and Divorce from Monica Rayne",
      "sceneFile": "Sordland_Turn09_Personal_MonicaFinalTalk.md"
    },
    "prerequisites": [
      "Oppose Monica's women's rights initiatives, disrespect her at public functions, and neglect family life.",
      "Force a bitter confrontation in Turn 9."
    ],
    "dialogueSteps": [
      {
        "speaker": "Monica Rayne",
        "context": "Turn 9 bedroom argument",
        "recommendedChoice": "Refuse to apologize, dismiss her demands, and allow the marriage to end in legal divorce.",
        "notes": "Monica packs her belongings and leaves the presidential residence permanently."
      }
    ],
    "pitfalls": [
      "Supporting Monica's women's rights initiatives and treating her with love and respect."
    ],
    "saveVariables": []
  },
  "Rizia_CollectionItem_MechanicalBird": {
    "achievementId": "Rizia_CollectionItem_MechanicalBird",
    "achievementName": "Collectible: Morellan Tin Bird",
    "game": "Rizia",
    "category": "Collectible Item",
    "timeline": {
      "turn": "Turn 6",
      "sceneTitle": "Morella Bilateral Summit & MITZ Negotiations",
      "sceneFile": "Rizia_Turn 5_FPnT_MorellaNegotiations.md"
    },
    "prerequisites": [
      "Travel to Morella in Turn 6 to negotiate maritime transit and MITZ energy shares.",
      "Reach a mutually agreeable accord with President Salva."
    ],
    "dialogueSteps": [
      {
        "speaker": "President Salva",
        "context": "Turn 6: Concluding trade and maritime discussions",
        "recommendedChoice": "Accept the wind-up mechanical tin bird crafted by Morellan artisans as a diplomatic gift.",
        "notes": "Adds the Morellan Tin Bird to your desk collection."
      }
    ],
    "pitfalls": [
      "Demanding unilateral concessions that break off trade talks."
    ],
    "saveVariables": [
      "RiziaDLCSupport.CollectionItem_MechanicalBird"
    ]
  },
  "Rizia_GreatUnification": {
    "achievementId": "Rizia_GreatUnification",
    "achievementName": "Great Unification",
    "game": "Rizia",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Turn 10",
      "sceneTitle": "Imperial Throne Room Proclamation of Greater Rizia",
      "sceneFile": "Rizia_Turn 10_SuccessionAnnouncement.md"
    },
    "prerequisites": [
      "Successfully recover Zille from Wehlen (through diplomatic treaty, arbitration, or referendum).",
      "Successfully reintegrate the Grand Duchy of Pales (through royal marriage or military conquest).",
      "Reach Turn 10 with both historical lost territories firmly restored to the Rizian Crown."
    ],
    "dialogueSteps": [
      {
        "speaker": "King Romus Toras",
        "context": "Turn 10: Addressing the Royal Council and assembled noble houses",
        "recommendedChoice": "Proclaim the Great Unification of Rizia, uniting Zille, Pales, and the realm under one eternal crown.",
        "notes": "Fulfills the supreme geopolitical destiny of House Toras."
      }
    ],
    "pitfalls": [
      "Losing either Zille to Smolak or failing to integrate Pales."
    ],
    "saveVariables": [
      "RiziaDLC.Territory_Zille_Reunited",
      "RiziaDLC.Territory_Pales_Reunited"
    ]
  },
  "Rizia_NoCrisis": {
    "achievementId": "Rizia_NoCrisis",
    "achievementName": "True Master of Crisis",
    "game": "Rizia",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Turn 10 (Full Campaign)",
      "sceneTitle": "Decade of Sovereign Stability Evaluation",
      "sceneFile": "Rizia_Turn 10_DECLARATION_DECLARATION Conversation.md"
    },
    "prerequisites": [
      "Navigate all 10 turns of King Romus's reign without triggering a single national crisis.",
      "Maintain positive Budget, high Authority, noble house contentment, and avoid widespread worker riots or rebellions."
    ],
    "dialogueSteps": [
      {
        "speaker": "King Romus Toras",
        "context": "Turn 10: Final state of the realm debrief with Uncle Hugo and the Royal Council",
        "recommendedChoice": "Review a decade of uninterrupted peace, sovereign solvency, and order across the kingdom.",
        "notes": "Recognized as a true master of crisis governance."
      }
    ],
    "pitfalls": [
      "Allowing Budget or Authority to drop to deep negatives, triggering noble coups or peasant revolts."
    ],
    "saveVariables": [
      "RiziaDLC.NoCrisis_Achieved"
    ]
  },
  "Game_CarbDiet": {
    "achievementId": "Game_CarbDiet",
    "achievementName": "Carb Diet",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Turn 3",
      "sceneTitle": "Business Council Banquet with Walter Tusk and Marcel Koronti",
      "sceneFile": "Sordland_Turn03_EnT_BusinessCouncil.md"
    },
    "prerequisites": [
      "Attend the Sordish Business Council dinner in Turn 3.",
      "Enjoy the luxury meal presented by the oligarchs."
    ],
    "dialogueSteps": [
      {
        "speaker": "Anton Rayne",
        "context": "When served rich pastas and gourmet breads at the banquet table",
        "recommendedChoice": "Help yourself to generous servings of pasta and carb-heavy delicacies.",
        "notes": "Indulging in high-carb gourmet food while negotiating with the Oligarchs."
      }
    ],
    "pitfalls": [
      "Refusing food at the Business Council banquet or sticking to a light salad."
    ],
    "saveVariables": []
  },
  "Rizia_Manpower": {
    "achievementId": "Rizia_Manpower",
    "achievementName": "People's Army",
    "game": "Rizia",
    "category": "Policy Decision",
    "timeline": {
      "turn": "Turn 10",
      "sceneTitle": "Pales Victoryparade",
      "sceneFile": "Rizia_Turn 10_War_Pales_VictoryParade.md"
    },
    "prerequisites": [
      "State requirement: RiziaDLC.Situation_Military_Manpower_Massive is true"
    ],
    "dialogueSteps": [
      {
        "context": "Policy decision during Turn 10",
        "recommendedChoice": "Approve decree / bill supporting People's Army",
        "notes": "Ensures the required prerequisite game state flag is established."
      }
    ],
    "pitfalls": [
      "Suffering catastrophic military attrition in the Pales War or neglecting military recruitment decrees and logistics hubs will prevent achieving massive manpower status."
    ],
    "saveVariables": [
      "RiziaDLC.Situation_Military_Manpower_Massive"
    ]
  },
  "Rizia_CollectionItem_ChessPiece": {
    "achievementId": "Rizia_CollectionItem_ChessPiece",
    "achievementName": "Collectible: Azaro Chess Piece",
    "game": "Rizia",
    "category": "Collectible Item",
    "timeline": {
      "turn": "Turn 4",
      "sceneTitle": "Evening Chess Match with Lucita Azaro",
      "sceneFile": "Rizia_Turn 4_A_CouncilTalkAboutPales.md"
    },
    "prerequisites": [
      "Spend an evening playing traditional Rizian chess with War Councilor Lucita Azaro."
    ],
    "dialogueSteps": [
      {
        "speaker": "Lucita Azaro",
        "context": "Turn 4: Over drinks and strategy in the royal chambers",
        "recommendedChoice": "Play out the tactical chess game with Lucita and accept the carved Azaro marble chess piece as a memento.",
        "notes": "Adds the Azaro Chess Piece to your royal collection."
      }
    ],
    "pitfalls": [
      "Dismissing Lucita or avoiding private meetings with her."
    ],
    "saveVariables": [
      "RiziaDLCSupport.CollectionItem_ChessPiece"
    ]
  },
  "Epilogue_ElectionRetirement": {
    "achievementId": "Epilogue_ElectionRetirement",
    "achievementName": "Just Another Sordish President",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Epilogue",
      "sceneTitle": "Graceful Departure from Office Following Election",
      "sceneFile": "Sordland_ANRICA ELECTION ENDING.md"
    },
    "prerequisites": [
      "Complete your full four-year term without violent overthrow or coup.",
      "Choose retirement following the general election."
    ],
    "dialogueSteps": [
      {
        "speaker": "Anton Rayne",
        "context": "Final post-election departure from the capital",
        "recommendedChoice": "Pack up your office in the Maroon Palace and depart Holsord with dignity.",
        "notes": "Marks the peaceful transition of power after your presidential term."
      }
    ],
    "pitfalls": [
      "Winning re-election or getting violently ousted before election day."
    ],
    "saveVariables": []
  },
  "Rizia_CollectionItem_GasCorpPlaque": {
    "achievementId": "Rizia_CollectionItem_GasCorpPlaque",
    "achievementName": "Collectible: ROG Plaque",
    "game": "Rizia",
    "category": "Collectible Item",
    "timeline": {
      "turn": "Turn 6",
      "sceneTitle": "Rizian Oil & Gas (ROG/RRG) Restructuring Session",
      "sceneFile": null
    },
    "prerequisites": [
      "Resolve the crisis surrounding Rizian Oil and Gold / RRG in Turn 6.",
      "Either nationalize or successfully restructure the energy conglomerate."
    ],
    "dialogueSteps": [
      {
        "speaker": "King Romus Toras",
        "context": "Turn 6: Concluding the energy restructuring decree",
        "recommendedChoice": "Formalize state oversight over the corporation and accept the commemorative bronze ROG Plaque.",
        "notes": "Places the corporate energy plaque on your royal study wall."
      }
    ],
    "pitfalls": [
      "Allowing foreign corporations to bankrupt RRG without intervention."
    ],
    "saveVariables": [
      "RiziaDLCSupport.CollectionItem_GasCorpPlaque"
    ]
  },
  "Game_3Funerals": {
    "achievementId": "Game_3Funerals",
    "achievementName": "Just Another Funeral",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Turn 10",
      "sceneTitle": "Solemn Memorial Service for Devoted Driver Serge Wolkner",
      "sceneFile": "Sordland_Turn10_Personal_SergeFuneral.md"
    },
    "prerequisites": [
      "Do not give Serge money for children's education or do not possess Serge's protective watch.",
      "Face an assassination attempt where Serge heroically steps into the line of fire to shield you."
    ],
    "dialogueSteps": [
      {
        "speaker": "Anton Rayne",
        "context": "Turn 10 memorial funeral service",
        "recommendedChoice": "Deliver an emotional tribute at Serge's casket, honoring his supreme personal sacrifice.",
        "notes": "Tragic consequence of Serge sacrificing his life for President Rayne."
      }
    ],
    "pitfalls": [
      "Giving Serge 2 Personal Wealth for his children's education in Turn 3 (which gives you the protective watch so he doesn't die)."
    ],
    "saveVariables": []
  },
  "Game_SordlandForAll": {
    "achievementId": "Game_SordlandForAll",
    "achievementName": "A Sordland For All",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Turn 7",
      "sceneTitle": "Enacting Comprehensive Equal Rights for All Sordish Peoples",
      "sceneFile": "Sordland_Turn07_A_CourtVote.md"
    },
    "prerequisites": [
      "Pass democratic constitutional reforms protecting minority equality.",
      "Sign the Minority Rights Act and rescind discriminatory decrees."
    ],
    "dialogueSteps": [
      {
        "speaker": "Anton Rayne",
        "context": "Turn 7/9 civil rights decree session",
        "recommendedChoice": "Affirm full legal equality, cultural dignity, and civil rights for all citizens of Sordland regardless of ethnicity.",
        "notes": "Establishes a truly inclusive Republic of Sordland for all."
      }
    ],
    "pitfalls": [
      "Passing discriminatory racial legislation or crushing minority rights."
    ],
    "saveVariables": []
  },
  "Rizia_ZilleReturn": {
    "achievementId": "Rizia_ZilleReturn",
    "achievementName": "Trustworthy Friends",
    "game": "Rizia",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Turn 8 & Turn 9",
      "sceneTitle": "Peaceful Reintegration and Handover of Zille from Wehlen",
      "sceneFile": "Rizia_Turn 5_FPnT_WehlenNegotiations.md & Rizia_Turn 7_Zille Treaty Discussion.md"
    },
    "prerequisites": [
      "Adhere to the diplomatic conditions of the Zille agreement with President Wiktor Smolak.",
      "Secure the peaceful, full return of Zille to Rizia at the end of the lease period without military conflict."
    ],
    "dialogueSteps": [
      {
        "speaker": "Wiktor Smolak",
        "context": "Turn 8/9: Formal ceremony of territorial retrocession",
        "recommendedChoice": "Receive the instruments of transfer from President Smolak and hoist the Rizian flag over Zille.",
        "notes": "Restores Zille peacefully through trust and diplomacy."
      }
    ],
    "pitfalls": [
      "Attacking Wehzek forces or breaking bilateral treaties."
    ],
    "saveVariables": [
      "RiziaDLC.Zille_Peaceful_Handover"
    ]
  },
  "Game_Sollist": {
    "achievementId": "Game_Sollist",
    "achievementName": "Sollist",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Turn 10",
      "sceneTitle": "Final Ideological Review with Deivid Wisci: Orthodox Sollist",
      "sceneFile": "Sordland_Turn10_A_DeividFinalTalk.md"
    },
    "prerequisites": [
      "Preserve state enterprises, declare emergency or protect 1929 constitution, venerate Tarquin Soll, and crush separatism.",
      "Finish the game with compass coordinates deep in the Sollist nationalist quadrant."
    ],
    "dialogueSteps": [
      {
        "speaker": "Deivid Wisci",
        "context": "Turn 10 farewell meeting with Deivid Wisci",
        "recommendedChoice": "Reiterate your unshakeable devotion to Sollism, the USP traditions, and state sovereignty.",
        "notes": "Designated as a true disciple and successor of Tarquin Soll."
      }
    ],
    "pitfalls": [
      "Abolishing Soll's constitution, prosecuting Old Guard members, or pursuing liberal free markets."
    ],
    "saveVariables": []
  },
  "Game_RumburgPeace": {
    "achievementId": "Game_RumburgPeace",
    "achievementName": "Reconciliation",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Turn 10",
      "sceneTitle": "High-Stakes Diplomatic Hotline Call with Queen Beatrice Livingstone",
      "sceneFile": "Sordland_Turn10_FPnT_QueenPhoneCall.md"
    },
    "prerequisites": [
      "Maintain a diplomatic, peaceful international posture despite Rumburgian border provocations.",
      "Have foreign backing or international sanctions pressure on Rumburg."
    ],
    "dialogueSteps": [
      {
        "speaker": "Beatrice Livingstone",
        "context": "Turn 10 phone call from the Royal Palace in Thornbourgh",
        "recommendedChoice": "Negotiate calmly, reject unreasonable ultimatums with firm diplomacy, and secure lasting peace without bloodshed.",
        "notes": "Prevents war through deft statesmanship and peaceful diplomatic resolution."
      }
    ],
    "pitfalls": [
      "Mobilizing the armed forces, shooting down Rumburg planes, or joining a superpower bloc that initiates war."
    ],
    "saveVariables": []
  },
  "Rizia_NationalizedRRG": {
    "achievementId": "Rizia_NationalizedRRG",
    "achievementName": "Mine All Mine",
    "game": "Rizia",
    "category": "Policy Decision",
    "timeline": {
      "turn": "Turn 11",
      "sceneTitle": "Coup Housefallouts",
      "sceneFile": "Rizia_Turn 11_Ending_Coup_HouseFallouts.md"
    },
    "prerequisites": [
      "State requirement: RiziaDLC.Situation_Economy_RRG_StateOwns100 is true"
    ],
    "dialogueSteps": [
      {
        "context": "Policy decision during Turn 11",
        "recommendedChoice": "Approve decree / bill supporting Mine All Mine",
        "notes": "Ensures the required prerequisite game state flag is established."
      }
    ],
    "pitfalls": [
      "Allowing foreign oligarchs or Lespia to acquire Royal Rizia Gas shares, or privatizing any portion of RRG during energy council decisions will fail this requirement."
    ],
    "saveVariables": [
      "RiziaDLC.Situation_Economy_RRG_StateOwns100"
    ]
  },
  "Rizia_CollectionItem_IntermerkopumPlaque": {
    "achievementId": "Rizia_CollectionItem_IntermerkopumPlaque",
    "achievementName": "Collectible: Intermerkopum Rings",
    "game": "Rizia",
    "category": "Collectible Item",
    "timeline": {
      "turn": "Turn 9",
      "sceneTitle": "Porte Drazon Intermerkopum Treaty Signing",
      "sceneFile": "Rizia_Turn 9_Morella Derdia Mediation.md"
    },
    "prerequisites": [
      "Mediate diplomatic disputes between Wehlen, Morella, and Derdia.",
      "Form the independent South Merkopa regional alliance: Intermerkopum."
    ],
    "dialogueSteps": [
      {
        "speaker": "King Romus Toras",
        "context": "Turn 9: Standing before the heads of state of Wehlen, Morella, and Derdia",
        "recommendedChoice": "Sign the Intermerkopum charter and unveil the interlocking gold rings emblem representing Merkopa's unity.",
        "notes": "Awards the Intermerkopum Rings plaque to your collection."
      }
    ],
    "pitfalls": [
      "Alienating Morella or Derdia, causing treaty negotiations to collapse."
    ],
    "saveVariables": [
      "RiziaDLCSupport.CollectionItem_IntermerkopumPlaque"
    ]
  },
  "Epilogue_WorldWar": {
    "achievementId": "Epilogue_WorldWar",
    "achievementName": "World At War",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Epilogue",
      "sceneTitle": "Superpower Escalation and Outbreak of World War",
      "sceneFile": "Sordland_Epilogue_WorldWar.md"
    },
    "prerequisites": [
      "Join either the Arcasian ATO or the Contanan CSP military alliance.",
      "Enter into war against the Kingdom of Rumburg."
    ],
    "dialogueSteps": [
      {
        "speaker": "Narrator",
        "context": "Global escalation epilogue",
        "recommendedChoice": "Witness the clash of nuclear superpowers as regional war triggers catastrophic World War III.",
        "notes": "Triggers global nuclear apocalypse."
      }
    ],
    "pitfalls": [
      "Fighting Rumburg as a non-aligned state or resolving border tensions peacefully without drawing superpowers."
    ],
    "saveVariables": []
  },
  "Epilogue_Exiled": {
    "achievementId": "Epilogue_Exiled",
    "achievementName": "Path To Exile",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Epilogue",
      "sceneTitle": "Midnight Flight from Sordland into Foreign Exile",
      "sceneFile": "Sordland_Epilogue_Exile.md"
    },
    "prerequisites": [
      "Face an imminent military coup, impeachment arrest, or deadly uprising.",
      "Have enough Personal Wealth or foreign connections to arrange private air transit."
    ],
    "dialogueSteps": [
      {
        "speaker": "Anton Rayne",
        "context": "Holsord international airfield escape in the dead of night",
        "recommendedChoice": "Board the private aircraft and flee Sordland forever as sirens wail across the capital.",
        "notes": "Escapes arrest to live out the remainder of life as a political exile in Arcasia, Contana, or Kyrute."
      }
    ],
    "pitfalls": [
      "Winning the war, winning re-election, or having 0 Personal Wealth / no foreign connections when the coup strikes."
    ],
    "saveVariables": []
  },
  "Riza_PeacefulUnification": {
    "achievementId": "Riza_PeacefulUnification",
    "achievementName": "Glovurius axa Rizia axa Pales",
    "game": "Rizia",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Turn 8 & Turn 10",
      "sceneTitle": "Royal Wedding Negotiations with Duke Axel Reinhart",
      "sceneFile": "Rizia_Turn 8_Garden_Vina Non Marriage.md"
    },
    "prerequisites": [
      "Do not invade Pales militarily.",
      "Sign the Aureus gas compromise with Duke Axel Reinhart.",
      "Propose a royal dynastic marriage between Crown Princess Vina Toras and Duke Axel Reinhart.",
      "Finalize the marriage treaty uniting both realms upon the next succession."
    ],
    "dialogueSteps": [
      {
        "speaker": "Duke Axel Reinhart",
        "context": "Turn 8/9: Bilateral royal summit regarding reunification",
        "recommendedChoice": "Propose the royal betrothal of Princess Vina and Duke Axel to reunite Pales peacefully through love and dynastic bond.",
        "notes": "Peacefully reclaims Pales without firing a single bullet."
      }
    ],
    "pitfalls": [
      "Declaring war on Pales or forcing Vina to marry Manus Sazon."
    ],
    "saveVariables": [
      "RiziaDLC.Pales_PeacefulUnification_Agreed"
    ]
  },
  "Rizia_CollectionItem_WehzekDoorstop": {
    "achievementId": "Rizia_CollectionItem_WehzekDoorstop",
    "achievementName": "Collectible: Wehzek Doorstop",
    "game": "Rizia",
    "category": "Collectible Item",
    "timeline": {
      "turn": "Turn 5",
      "sceneTitle": "Bilateral Trade Negotiations in Wehlen with Wiktor Smolak",
      "sceneFile": "Rizia_Turn 5_FPnT_WehlenNegotiations.md"
    },
    "prerequisites": [
      "Travel to Wehlen in Turn 5 and meet with President Wiktor Smolak.",
      "Accept Smolak's eccentric diplomatic hospitality."
    ],
    "dialogueSteps": [
      {
        "speaker": "Wiktor Smolak",
        "context": "Turn 5: Smolak presents an ornate piece of Wehzek spruce plated with gold",
        "recommendedChoice": "Accept the gold-plated Wehzek doorstop with good humor and thank the President.",
        "notes": "Places the eccentric Wehzek Doorstop in your royal office."
      }
    ],
    "pitfalls": [
      "Storming out of negotiations in anger."
    ],
    "saveVariables": [
      "RiziaDLCSupport.CollectionItem_WehzekDoorstop"
    ]
  },
  "Game_Crocodile": {
    "achievementId": "Game_Crocodile",
    "achievementName": "Crocodile Tears",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Turn 9",
      "sceneTitle": "State Funeral Service for Vice President Petr Vectern",
      "sceneFile": "Sordland_Turn09_Personal_PetrFuneral.md"
    },
    "prerequisites": [
      "Scapegoat Petr Vectern during the Ilana Vance spy scandal, driving him to suicide.",
      "Attend his state funeral in Turn 9."
    ],
    "dialogueSteps": [
      {
        "speaker": "Anton Rayne",
        "context": "Delivering the official presidential eulogy beside Petr's coffin",
        "recommendedChoice": "Express dramatic sorrow and weep openly for your closest friend, concealing your own responsibility.",
        "notes": "Shedding cynical crocodile tears at the grave of the man you betrayed."
      }
    ],
    "pitfalls": [
      "Taking full responsibility for the spy scandal yourself, or having Petr go to rehabilitation instead of suicide."
    ],
    "saveVariables": []
  },
  "Game_LoudRayne": {
    "achievementId": "Game_LoudRayne",
    "achievementName": "Speaking Louder Makes You Right",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Turn 7",
      "sceneTitle": "Slamming the Assembly Podium to Silence Disruptors",
      "sceneFile": "Sordland_Turn07_A_AssemblyVote.md"
    },
    "prerequisites": [
      "Attend the Grand National Assembly voting session in Turn 7.",
      "Face heckling and loud interruptions from opposition MPs."
    ],
    "dialogueSteps": [
      {
        "speaker": "Anton Rayne",
        "context": "When MPs scream insults and disrupt proceedings",
        "recommendedChoice": "Slam your hands violently against the podium, shout back, and fiercely demand order in the chamber.",
        "notes": "A dramatic show of presidential aggression that intimidates the chamber into silence."
      }
    ],
    "pitfalls": [
      "Staying timid and quiet while opposition MPs heckle you from the floor."
    ],
    "saveVariables": []
  },
  "Rizia_PowerProjection": {
    "achievementId": "Rizia_PowerProjection",
    "achievementName": "The Force in South Merkopa",
    "game": "Rizia",
    "category": "Policy Decision",
    "timeline": {
      "turn": "Turn 10",
      "sceneTitle": "Rizia Turn 10 Default Gathering Scene Default House Azaro Convo",
      "sceneFile": "Rizia_Turn 10_DEFAULT GATHERING SCENE_DEFAULT HOUSE AZARO CONVO.md"
    },
    "prerequisites": [
      "State requirement: RiziaDLC.Situation_Diplomacy_PowerProjection_Overwhelming is true"
    ],
    "dialogueSteps": [
      {
        "context": "Policy decision during Turn 10",
        "recommendedChoice": "Approve decree / bill supporting The Force in South Merkopa",
        "notes": "Ensures the required prerequisite game state flag is established."
      }
    ],
    "pitfalls": [
      "Failing to expand the Royal Navy and mechanized forces, losing territorial skirmishes to Pales, or appeasing foreign powers will leave power projection below Overwhelming."
    ],
    "saveVariables": [
      "RiziaDLC.Situation_Diplomacy_PowerProjection_Overwhelming"
    ]
  },
  "Rizia_Reform": {
    "achievementId": "Rizia_Reform",
    "achievementName": "Rizian Charter of Fundamental Law",
    "game": "Rizia",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Turn 10",
      "sceneTitle": "Turn 10 Signing of the Rizian Constitutional Reform Accord",
      "sceneFile": "Rizia_Turn 10_Reform_ConstitutionSigning.md"
    },
    "prerequisites": [
      "Negotiate constitutional devolution with House Sazon and the Reformist faction.",
      "Draft a balanced constitution that curtails monarchical absolutism."
    ],
    "dialogueSteps": [
      {
        "speaker": "King Romus Toras",
        "context": "Turn 10 royal council chamber",
        "recommendedChoice": "Sign the constitutional reform proclamation, establishing a modern constitutional monarchy.",
        "notes": "Transforms Rizia into a progressive constitutional kingdom."
      }
    ],
    "pitfalls": [
      "Refusing constitutional devolution or ruling as an absolute monarch."
    ],
    "saveVariables": []
  },
  "Game_Authoritarian": {
    "achievementId": "Game_Authoritarian",
    "achievementName": "Authoritarian",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Turn 10",
      "sceneTitle": "Final Ideological Review with Deivid Wisci: Authoritarian Dictator",
      "sceneFile": "Sordland_Turn10_A_DeividFinalTalk.md"
    },
    "prerequisites": [
      "Pass a dictatorial constitution expanding presidential decrees, purge the judiciary, and crush opposition.",
      "Finish the game with compass coordinates located deep in the Authoritarian Dictator quadrant."
    ],
    "dialogueSteps": [
      {
        "speaker": "Deivid Wisci",
        "context": "Turn 10 farewell meeting with Deivid Wisci",
        "recommendedChoice": "Review your term as an iron-willed sovereign who ruled without compromise or parliamentary constraint.",
        "notes": "Recognized as a supreme authoritarian ruler."
      }
    ],
    "pitfalls": [
      "Passing democratic checks and balances that curtail presidential executive decree powers."
    ],
    "saveVariables": []
  },
  "Game_UnfairElection15": {
    "achievementId": "Game_UnfairElection15",
    "achievementName": "Merkopa's Most Unfair Election System",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Turn 7",
      "sceneTitle": "Enacting the 15% Election Threshold to Suppress Rivals",
      "sceneFile": "Sordland_Turn07_A_ResultsMeeting.md"
    },
    "prerequisites": [
      "Include raising the election threshold to 15% in your authoritarian constitutional draft.",
      "Pass the package through the Assembly and Supreme Court."
    ],
    "dialogueSteps": [
      {
        "speaker": "Anton Rayne",
        "context": "Turn 7 constitutional results meeting",
        "recommendedChoice": "Enforce the 15% threshold to permanently exclude minority and opposition parties from parliament.",
        "notes": "Consolidates single-party dominance under the USP."
      }
    ],
    "pitfalls": [
      "Lowering the election threshold to 3% or 8% in the constitutional package."
    ],
    "saveVariables": []
  },
  "Game_MakeSordlandGreatAgain": {
    "achievementId": "Game_MakeSordlandGreatAgain",
    "achievementName": "Make Sordland Great Again",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Turn 8",
      "sceneTitle": "Centralization of the Special Zone of Bergia",
      "sceneFile": "Sordland_Turn08_Internal Affairs Section with Lileas and Nia_Internal Affairs Section with.md"
    },
    "prerequisites": [
      "Convene the internal security meeting with Lileas Graf and Nia Morgna in Turn 8.",
      "Choose to abolish the autonomous governor-generalship."
    ],
    "dialogueSteps": [
      {
        "speaker": "Anton Rayne",
        "context": "Cabinet debate on Bergia administrative reform",
        "recommendedChoice": "Centralize the administration of Bergia directly under the Ministry of the Interior.",
        "notes": "Eliminates regional autonomy and standardizes Bergia as an integrated Sordish province."
      }
    ],
    "pitfalls": [
      "Granting semi-autonomous status to Bergia or signing the Minority Rights Act."
    ],
    "saveVariables": []
  },
  "Rizia_CollectionItem_MandragoraExtract": {
    "achievementId": "Rizia_CollectionItem_MandragoraExtract",
    "achievementName": "Collectible: Mandragora Extract",
    "game": "Rizia",
    "category": "Collectible Item",
    "timeline": {
      "turn": "Turn 7",
      "sceneTitle": "Derdia Mystic Religious Pilgrimage",
      "sceneFile": "Rizia_Turn 7_Fighting Assistance Friendly.md"
    },
    "prerequisites": [
      "Travel to the holy sanctuary in Derdia in Turn 7.",
      "Converse with Supreme Patriarch Azmal on mysticism and faith."
    ],
    "dialogueSteps": [
      {
        "speaker": "Supreme Patriarch Azmal",
        "context": "Turn 7: Azmal presents a ceremonial vial of distilled sacred herbs",
        "recommendedChoice": "Accept the flask of concentrated mandragora extract with reverent respect.",
        "notes": "Places the mystic Mandragora Extract vial in your royal cabinet."
      }
    ],
    "pitfalls": [
      "Insulting Derdian religious rituals."
    ],
    "saveVariables": [
      "RiziaDLCSupport.CollectionItem_MandragoraExtract"
    ]
  },
  "Game_CollectionItem_UnderhallTrophy": {
    "achievementId": "Game_CollectionItem_UnderhallTrophy",
    "achievementName": "Collectible: Underhall Trophy",
    "game": "Sordland",
    "category": "Collectible Item",
    "timeline": {
      "turn": "Turn 2 & Turn 5",
      "sceneTitle": "First Mega-Infrastructure Tender Decision & Petr's Party",
      "sceneFile": "Sordland_Turn02_A_ContractBribe.md & Sordland_Turn05_Personal_PetrParty.md"
    },
    "prerequisites": [
      "Award the mega-infrastructure contract to Underhall Construction in Turn 2, or buy Underhall shares in Turn 5."
    ],
    "dialogueSteps": [
      {
        "speaker": "Anton Rayne",
        "context": "Turn 2: Selecting the general contractor for the mega-infrastructure project",
        "recommendedChoice": "Award the contract to Underhall Construction Company [-2 Budget].",
        "notes": "Underhall executives present you with the gold corporate trophy celebrating infrastructure partnership."
      }
    ],
    "pitfalls": [
      "Selecting SSC or Taurus instead of Underhall."
    ],
    "saveVariables": [
      "BaseGameSupport.CollectionItem_UnderhallTrophy"
    ]
  },
  "Rizia_SayMyName": {
    "achievementId": "Rizia_SayMyName",
    "achievementName": "Say My Name",
    "game": "Rizia",
    "category": "Policy Decision",
    "timeline": {
      "turn": "Turn 10",
      "sceneTitle": "Lucitaortitus",
      "sceneFile": "Rizia_Turn 10_Security_LucitaOrTitus.md"
    },
    "prerequisites": [
      "State requirement: RiziaDLC.Policy_RD_Welfare_RomusTorasHospital_Completed is true and RiziaDLC.Policy_RD_Order_RomusTorasAcademy_Completed is true and RiziaDLC.Policy_RD_Welfare_RomusTorasUniversity_Completed is true"
    ],
    "dialogueSteps": [
      {
        "context": "Policy decision during Turn 10",
        "recommendedChoice": "Approve decree / bill supporting Say My Name",
        "notes": "Ensures the required prerequisite game state flag is established."
      }
    ],
    "pitfalls": [
      "Missing the budget or energy requirements to enact all three namesake decrees (Romus Toras Hospital, Romus Toras Academy, and Romus Toras University) before Turn 10."
    ],
    "saveVariables": [
      "RiziaDLC.Policy_RD_Order_RomusTorasAcademy_Completed",
      "RiziaDLC.Policy_RD_Welfare_RomusTorasHospital_Completed",
      "RiziaDLC.Policy_RD_Welfare_RomusTorasUniversity_Completed"
    ]
  },
  "Rizia_ValeroSaved": {
    "achievementId": "Rizia_ValeroSaved",
    "achievementName": "Not Losing You Again",
    "game": "Rizia",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Turn 1 & Turn 10",
      "sceneTitle": "Historical Review of King Valero the Frail's Legacy",
      "sceneFile": "Rizia_Turn 1_Houses Briefing Section.md & Rizia_Turn 10_DECLARATION_DECLARATION Conversation.md"
    },
    "prerequisites": [
      "Defend the memory and posthumous dignity of your late father, King Valero.",
      "Uncover the truth behind his death and ensure history honors his struggles rather than condemning him as weak."
    ],
    "dialogueSteps": [
      {
        "speaker": "King Romus Toras",
        "context": "Turn 10: Erecting the royal memorial and commissioning his official biography",
        "recommendedChoice": "Honor King Valero's sacrifices for the realm and preserve his legacy as a devoted father of Rizia.",
        "notes": "Restores King Valero's honor in the annals of Rizian history."
      }
    ],
    "pitfalls": [
      "Publicly denouncing your father as an incompetent coward."
    ],
    "saveVariables": [
      "RiziaDLC.Valero_Legacy_Vindicated"
    ]
  },
  "Rizia_Duel": {
    "achievementId": "Rizia_Duel",
    "achievementName": "Romus the Generous",
    "game": "Rizia",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Turn 7",
      "sceneTitle": "Derdian Temple Duel of Generosity",
      "sceneFile": "Rizia_Turn 7_FPnT_DerdiaNegotiations.md"
    },
    "prerequisites": [
      "Travel to Derdia in Turn 7 to meet Supreme Patriarch Azmal.",
      "Agree to participate in the ancient Derdian religious contest: the 'Duel of Generosity'.",
      "Generously bestow gifts and yield to Patriarch Azmal."
    ],
    "dialogueSteps": [
      {
        "speaker": "Supreme Patriarch Azmal",
        "context": "Turn 7: Facing Azmal in the ceremonial court of generosity",
        "recommendedChoice": "Shower the Derdian temple with charitable endowments and humbly yield the match, earning his deep respect.",
        "notes": "Unlocks Romus the Generous and secures Derdia's alliance."
      }
    ],
    "pitfalls": [
      "Refusing to participate or engaging with arrogance."
    ],
    "saveVariables": [
      "RiziaDLC.Derdia_Duel_Completed"
    ]
  },
  "Rizia_Sordland": {
    "achievementId": "Rizia_Sordland",
    "achievementName": "Sords, Our Friends",
    "game": "Rizia",
    "category": "Policy Decision",
    "timeline": {
      "turn": "Prologue",
      "sceneTitle": "Prologue Archive",
      "sceneFile": "Prologue_Archive.md"
    },
    "prerequisites": [
      "State requirement: RiziaDLC.Situation_Diplomacy_Sordland_WineWhiskeyDeal is true and RiziaDLC.Situation_Economy_Sordland_ResortDeal is true and (RiziaDLC.Situation_Diplomacy_Sordland_GasomAverageOutput is true or RiziaDLC.Situation_Diplomacy_Sordland_GasomHighOutput is true or RiziaDLC.Situation_Diplomacy_Sordland_GasomLowOutput is true)"
    ],
    "dialogueSteps": [
      {
        "context": "Policy decision during Prologue",
        "recommendedChoice": "Approve decree / bill supporting Sords, Our Friends",
        "notes": "Ensures the required prerequisite game state flag is established."
      }
    ],
    "pitfalls": [
      "Failing to conclude the wine/whiskey trade agreement with Sordland, canceling the Valenqiris resort deal, or rejecting the Gasom joint investment initiative."
    ],
    "saveVariables": [
      "RiziaDLC.Situation_Diplomacy_Sordland_GasomAverageOutput",
      "RiziaDLC.Situation_Diplomacy_Sordland_GasomLowOutput",
      "RiziaDLC.Situation_Diplomacy_Sordland_GasomHighOutput",
      "RiziaDLC.Situation_Economy_Sordland_ResortDeal",
      "RiziaDLC.Situation_Diplomacy_Sordland_WineWhiskeyDeal"
    ]
  },
  "Rizia_NewHeir": {
    "achievementId": "Rizia_NewHeir",
    "achievementName": "The Prince",
    "game": "Rizia",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Turn 6 & Turn 10",
      "sceneTitle": "Royal Marriage with Lucita Azaro & Birth of a Prince",
      "sceneFile": "Rizia_Turn 10_RelationshipAnnouncement.md"
    },
    "prerequisites": [
      "Romance and marry War Councilor Lucita Azaro.",
      "Conceive a child with her and celebrate the birth of a royal son and prince in Turn 10."
    ],
    "dialogueSteps": [
      {
        "speaker": "King Romus Toras",
        "context": "Turn 10: In the royal nursery holding the newborn infant",
        "recommendedChoice": "Present the newborn prince to the kingdom alongside Queen Lucita as the continuation of House Toras.",
        "notes": "Secures a direct male heir and binds House Azaro to the Crown."
      }
    ],
    "pitfalls": [
      "Refusing marriage with Lucita or ending up childless."
    ],
    "saveVariables": [
      "RiziaDLC.New_Prince_Born"
    ]
  },
  "Rizia_Great": {
    "achievementId": "Rizia_Great",
    "achievementName": "Make Yourself Great Again",
    "game": "Rizia",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Turn 10",
      "sceneTitle": "Peak Sovereign Glory and National Power Rating",
      "sceneFile": "Rizia_Turn 10_SuccessionAnnouncement.md"
    },
    "prerequisites": [
      "Achieve overwhelming national power projection, economic surplus, high Authority (10+), and complete territorial unity."
    ],
    "dialogueSteps": [
      {
        "speaker": "King Romus Toras",
        "context": "Turn 10: Decennial state of the realm address",
        "recommendedChoice": "Proclaim the supreme military, economic, and diplomatic renaissance of the Kingdom of Rizia.",
        "notes": "Unlocks Make Yourself Great Again for maximum composite superpower status."
      }
    ],
    "pitfalls": [
      "Suffering economic recession or military weakness."
    ],
    "saveVariables": [
      "RiziaDLC.PowerProjection_Overwhelming"
    ]
  },
  "Rizia_DerdianMissiles": {
    "achievementId": "Rizia_DerdianMissiles",
    "achievementName": "Power of the Heavens",
    "game": "Rizia",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Turn 7",
      "sceneTitle": "Derdian Arms Procurement and Missile Accord",
      "sceneFile": "Rizia_Turn 7_Fighting Assistance Friendly.md"
    },
    "prerequisites": [
      "Conclude the trade and military agreement with Supreme Patriarch Azmal of Derdia.",
      "Acquire advanced Derdian ballistic missile systems for the Royal Armed Forces."
    ],
    "dialogueSteps": [
      {
        "speaker": "Supreme Patriarch Azmal",
        "context": "Turn 7: Military procurement negotiations in Derdia",
        "recommendedChoice": "Purchase the Derdian ballistic missile batteries to arm Rizia's coastal and strategic defenses.",
        "notes": "Equips the Rizian military with powerful long-range missile batteries."
      }
    ],
    "pitfalls": [
      "Failing to satisfy Derdia's religious and trade conditions."
    ],
    "saveVariables": [
      "RiziaDLC.Missiles_Acquired"
    ]
  },
  "Game_ThanksSerge": {
    "achievementId": "Game_ThanksSerge",
    "achievementName": "Thank You Serge",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Turn 3 (Funding), Turn 7 (Watch Gift) & Turn 10 (Hospital Survival)",
      "sceneTitle": "Morning Commute with Driver Serge & Hospital Awakening After Attack",
      "sceneFile": "Sordland_Turn03_Personal_DriverTalk.md, Sordland_Turn07_A_AssemblyVote.md & Sordland_Epilogue_ElectionWin.md"
    },
    "prerequisites": [
      "Have at least 2 Personal Wealth in Turn 3.",
      "Pay 2 Personal Wealth to fund Serge Wolkner's children's schooling during the morning commute.",
      "Accept Serge's heirloom pocket watch outside the Grand National Assembly in Turn 7.",
      "Face an assassination attempt in Turn 9/10, where the watch stops the bullet and saves your life."
    ],
    "dialogueSteps": [
      {
        "speaker": "Anton Rayne",
        "context": "Turn 3: When Serge confides his financial struggles regarding his children's tuition",
        "recommendedChoice": "My driver's family shouldn't want for anything in this world. I'll cover your children's education and any other extra expenses you need. [-2 Personal Wealth]",
        "notes": "Sets BaseGameSupport.Journal_Turn03_DriverTalk_PaidForEducation = true."
      },
      {
        "speaker": "Serge Wolkner",
        "context": "Turn 7: Before entering the Assembly, Serge hands you his grandfather's lucky pocket watch",
        "recommendedChoice": "I looked at the back of the watch. The year 1920 was engraved on it. I put it in my front pocket, gave my thanks to Serge and opened the car door.",
        "notes": "Receives the watch into inventory. In Turn 10 hospital recovery, doctors confirm the watch stopped the bullet."
      }
    ],
    "pitfalls": [
      "Failing to fund Serge in Turn 3: Serge never offers the watch, causing him to take a bullet for you in Turn 9 (Game_3Funerals) or leaving you unprotected (Epilogue_Assassinated).",
      "Rejecting the watch in Turn 7 by choosing 'Superstitions don't help anyone, Serge' or 'I can't take this'."
    ],
    "saveVariables": []
  },
  "Rizia_Conqueror": {
    "achievementId": "Rizia_Conqueror",
    "achievementName": "Romus The Conqueror",
    "game": "Rizia",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Turn 9 & Turn 10",
      "sceneTitle": "Full Military Invasion and Annexation of Pales",
      "sceneFile": "Rizia_Turn 10_War_Pales_VictoryParade.md"
    },
    "prerequisites": [
      "Invade the Grand Duchy of Pales with the Royal Armed Forces.",
      "Achieve decisive military victory on the battlefield and march into Pales City.",
      "Abolish the Grand Duchy and integrate the province under direct military rule."
    ],
    "dialogueSteps": [
      {
        "speaker": "King Romus Toras",
        "context": "Turn 10: Standing victorious in conquered Pales City",
        "recommendedChoice": "Accept Duke Axel's unconditional surrender, annex Pales by right of conquest, and proclaim yourself Romus the Conqueror.",
        "notes": "Unlocks Romus The Conqueror for total martial subjugation of Pales."
      }
    ],
    "pitfalls": [
      "Losing the war or choosing peaceful marriage unification."
    ],
    "saveVariables": [
      "RiziaDLC.War_Pales_MilitaryVictory"
    ]
  },
  "Epilogue_Assassinated": {
    "achievementId": "Epilogue_Assassinated",
    "achievementName": "Assassinated",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Epilogue",
      "sceneTitle": "Fatal Assassination of President Anton Rayne",
      "sceneFile": "Sordland_Epilogue_ElectionDeath.md"
    },
    "prerequisites": [
      "Provoke dangerous enemies (Oligarchs via nationalization, BFF via oppression, or Old Guard).",
      "Do not possess Serge's protective watch and do not have an armored motorcade or elite bodyguard detail."
    ],
    "dialogueSteps": [
      {
        "speaker": "Narrator",
        "context": "Public event or election rally in Holsord",
        "recommendedChoice": "Face the fatal gunshot as an assassin penetrates security and strikes down the President.",
        "notes": "President Rayne is assassinated in the line of duty."
      }
    ],
    "pitfalls": [
      "Carrying Serge's lucky pocket watch or having Karl Greiser / SSP take the bullet for you."
    ],
    "saveVariables": []
  },
  "Game_FeelMyEnergy": {
    "achievementId": "Game_FeelMyEnergy",
    "achievementName": "Feel My Energy",
    "game": "Sordland",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Turn 3",
      "sceneTitle": "Gasom Investment and Energy Protection Act Summit",
      "sceneFile": "Sordland_Turn03_EnT_BusinessCouncil.md"
    },
    "prerequisites": [
      "Co-invest 2 Government Budget in Gasom with Ewald Alphonso in Turn 3.",
      "Provide housing, healthcare, and fair wages for Gasom energy workers."
    ],
    "dialogueSteps": [
      {
        "speaker": "Ewald Alphonso",
        "context": "Turn 3: Energy summit in Lachaven",
        "recommendedChoice": "Sign the co-investment pact with Gasom and mandate improved working conditions for energy laborers.",
        "notes": "Secures green energy stability and employee satisfaction."
      }
    ],
    "pitfalls": [
      "Refusing investment in Gasom."
    ],
    "saveVariables": [
      "BaseGame.Gasom_HighEnergySynergy"
    ]
  },
  "Rizia_Bruno": {
    "achievementId": "Rizia_Bruno",
    "achievementName": "A King's Best Friend",
    "game": "Rizia",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Turn 2",
      "sceneTitle": "Royal Kennels Adoption Session",
      "sceneFile": "Rizia_Turn 2_FPnT_SordlandTradeVisit.md"
    },
    "prerequisites": [
      "Visit the royal hunting kennels during domestic affairs in Turn 2.",
      "Bond with the lively hunting puppy Bruno."
    ],
    "dialogueSteps": [
      {
        "speaker": "King Romus Toras",
        "context": "Turn 2: When kennel masters present the new litter of royal dogs",
        "recommendedChoice": "Choose the spirited pup, name him Bruno, and welcome him as the royal companion.",
        "notes": "Unlocks A King's Best Friend and adds Bruno's Dog Toy to collection."
      }
    ],
    "pitfalls": [
      "Declining to adopt a dog."
    ],
    "saveVariables": [
      "RiziaDLC.Adopted_Bruno"
    ]
  },
  "Rizia_LetItRayne": {
    "achievementId": "Rizia_LetItRayne",
    "achievementName": "Let it Rayne",
    "game": "Rizia",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Turn 2 & Turn 8",
      "sceneTitle": "Bilateral Diplomatic and Economic Accords with Sordland",
      "sceneFile": "Rizia_Turn 2_FPnT_SordlandTradeVisit.md"
    },
    "prerequisites": [
      "Establish deep economic ties with President Anton Rayne of Sordland: co-invest in Gasom/ROG, conclude wine/whiskey trade pacts, and partner on seaside tourism."
    ],
    "dialogueSteps": [
      {
        "speaker": "King Romus Toras",
        "context": "Turn 2/8: Bilateral treaty signing with Sordish envoys",
        "recommendedChoice": "Sign the comprehensive Sordish-Rizian trade and energy pact with President Anton Rayne's administration.",
        "notes": "Forges deep fraternal cooperation between Sordland and Rizia."
      }
    ],
    "pitfalls": [
      "Rejecting all trade with Sordland or imposing punitive tariffs."
    ],
    "saveVariables": [
      "RiziaDLC.Sordland_ComprehensiveDeal"
    ]
  },
  "Rizia_CollectionItem_FabergeEgg": {
    "achievementId": "Rizia_CollectionItem_FabergeEgg",
    "achievementName": "Collectible: Hattersley Egg",
    "game": "Rizia",
    "category": "Collectible Item",
    "timeline": {
      "turn": "Turn 9",
      "sceneTitle": "GRACE Imperial Summit with Queen Beatrice of Rumburg",
      "sceneFile": "Rizia_Turn 9_FPnT_GRACERumburgMeeting.md"
    },
    "prerequisites": [
      "Maintain membership in the Grand Regional Alliance of Commerce and Energy (GRACE).",
      "Attend the bilateral imperial summit with Queen Beatrice Livingstone in Turn 9."
    ],
    "dialogueSteps": [
      {
        "speaker": "Beatrice Livingstone",
        "context": "Turn 9: Queen Beatrice presents a royal gift of imperial prestige from Thornbourgh",
        "recommendedChoice": "Accept Queen Beatrice's royal gift of the gem-encrusted imperial Hattersley Egg with polite court etiquette.",
        "notes": "Adds the priceless Hattersley Egg to your royal collection."
      }
    ],
    "pitfalls": [
      "Breaking relations with GRACE or insulting Queen Beatrice."
    ],
    "saveVariables": [
      "RiziaDLCSupport.CollectionItem_FabergeEgg"
    ]
  },
  "Rizia_Revolt": {
    "achievementId": "Rizia_Revolt",
    "achievementName": "The Second Revolt",
    "game": "Rizia",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Turn 10",
      "sceneTitle": "Mass Uprising and General Strike Across Sotelato",
      "sceneFile": "Rizia_Turn 10_STRIKE SCENE_ABSOLUTIST STRIKE SCENE_ABSOLUTIST STRIKE SCENE Conversation.md"
    },
    "prerequisites": [
      "Oppress workers, maintain unsafe mining conditions, slash public welfare, and ignore popular grievances until a nationwide revolutionary uprising explodes in Turn 10."
    ],
    "dialogueSteps": [
      {
        "speaker": "King Romus Toras",
        "context": "Turn 10: Emergency council as revolutionary crowds storm the streets",
        "recommendedChoice": "Watch from palace ramparts as hundreds of thousands of workers demand the abolition of the monarchy.",
        "notes": "Triggers the second revolutionary crisis in Rizian history."
      }
    ],
    "pitfalls": [
      "Passing worker rights or keeping public opinion high."
    ],
    "saveVariables": [
      "RiziaDLC.Second_Revolt_Triggered"
    ]
  },
  "Game_Alone": {
    "achievementId": "Game_Alone",
    "achievementName": "Yes I'm Alone But Then Again I Always Was",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Turn 10",
      "sceneTitle": "Solitary Evening Dinner at the Presidential Palace",
      "sceneFile": "Sordland_Turn10_DINNER ALONE.md"
    },
    "prerequisites": [
      "Alienate Monica (leading to divorce), drive Franc away, and betray or purge your closest political allies.",
      "Reach Turn 10 with zero remaining personal or familial support."
    ],
    "dialogueSteps": [
      {
        "speaker": "Anton Rayne",
        "context": "Turn 10 quiet dining room at the Maroon Palace",
        "recommendedChoice": "Eat your dinner in absolute silence, surrounded only by empty chairs.",
        "notes": "The poignant, lonely conclusion of ruthless power."
      }
    ],
    "pitfalls": [
      "Maintaining a supportive marriage with Monica, keeping Franc close, or preserving political alliances."
    ],
    "saveVariables": []
  },
  "Rizia_ArmsExporter": {
    "achievementId": "Rizia_ArmsExporter",
    "achievementName": "Arms Exporter",
    "game": "Rizia",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Campaign Dashboard",
      "sceneTitle": "Royal Military Procurement & Arms Trade",
      "sceneFile": null
    },
    "prerequisites": [
      "Export weapons, military equipment, or munitions at least 7 times via the Rizian procurement dashboard."
    ],
    "dialogueSteps": [
      {
        "speaker": "King Romus Toras",
        "context": "Military procurement council",
        "recommendedChoice": "Authorize 7 foreign arms sales to international buyers, boosting royal revenue.",
        "notes": "Unlocks Arms Exporter upon reaching the 7th arms export transaction."
      }
    ],
    "pitfalls": [
      "Failing to build military factories or keeping all equipment domestically."
    ],
    "saveVariables": [
      "RiziaDLC.ExportArmsCount >= 7"
    ]
  },
  "Rizia_CollectionItem_MiniYacht": {
    "achievementId": "Rizia_CollectionItem_MiniYacht",
    "achievementName": "Collectible: RRN Rizania Model",
    "game": "Rizia",
    "category": "Collectible Item",
    "timeline": {
      "turn": "Turn 5",
      "sceneTitle": "Royal Shipyard Modernization & Flagship Commissioning",
      "sceneFile": null
    },
    "prerequisites": [
      "Fund royal naval construction in Turn 5.",
      "Commission the royal yacht RRN Rizania for state voyages."
    ],
    "dialogueSteps": [
      {
        "speaker": "King Romus Toras",
        "context": "Turn 5: Reviewing naval dockyard modernization",
        "recommendedChoice": "Approve the commissioning of the RRN Rizania and accept the scale model of the flagship.",
        "notes": "Places the scale model yacht in the royal study."
      }
    ],
    "pitfalls": [
      "Canceling all naval expenditures."
    ],
    "saveVariables": [
      "RiziaDLCSupport.CollectionItem_MiniYacht"
    ]
  },
  "Rizia_HighProduction": {
    "achievementId": "Rizia_HighProduction",
    "achievementName": "Through Machinery and Industry",
    "game": "Rizia",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Turn 8 to Turn 10",
      "sceneTitle": "Industrial Modernization and High Production Targets",
      "sceneFile": "Rizia_Turn 10_DECLARATION_DECLARATION Conversation.md"
    },
    "prerequisites": [
      "Expand manufacturing facilities, modernize extraction mines, and maximize both energy and industrial output across the realm."
    ],
    "dialogueSteps": [
      {
        "speaker": "King Romus Toras",
        "context": "Turn 10: Economic debrief on national production capacity",
        "recommendedChoice": "Review peak output figures from all royal manufacturing and energy hubs.",
        "notes": "Unlocks Through Machinery and Industry for maximum industrial expansion."
      }
    ],
    "pitfalls": [
      "Suffering energy deficits or resource shortages."
    ],
    "saveVariables": [
      "RiziaDLC.High_Production_Achieved"
    ]
  },
  "Rizia_CollectionItem_DogToy": {
    "achievementId": "Rizia_CollectionItem_DogToy",
    "achievementName": "Collectible: Bruno's Dog Toy",
    "game": "Rizia",
    "category": "Collectible Item",
    "timeline": {
      "turn": "Turn 2",
      "sceneTitle": "Royal Kennels & Adopting Bruno",
      "sceneFile": "Rizia_Turn 2_FPnT_SordlandTradeVisit.md"
    },
    "prerequisites": [
      "Visit the royal kennels in Turn 2 and adopt the loyal hunting hound Bruno (`Rizia_Bruno`)."
    ],
    "dialogueSteps": [
      {
        "speaker": "King Romus Toras",
        "context": "Turn 2: Meeting the royal dogs at the kennel",
        "recommendedChoice": "Adopt Bruno and purchase his favorite braided leather chew toy.",
        "notes": "Unlocks Rizia_Bruno and places Bruno's Dog Toy in your royal study."
      }
    ],
    "pitfalls": [
      "Refusing to adopt a dog when visiting the kennels."
    ],
    "saveVariables": [
      "RiziaDLCSupport.CollectionItem_DogToy"
    ]
  },
  "Rizia_Sanctuary": {
    "achievementId": "Rizia_Sanctuary",
    "achievementName": "Sanctuary! Sanctuary!",
    "game": "Rizia",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Turn 4 & Turn 7",
      "sceneTitle": "Granting Asylum to Persecuted Religious Dissidents",
      "sceneFile": "Rizia_Turn 7_Fighting Assistance Friendly.md"
    },
    "prerequisites": [
      "Provide safe haven and royal sanctuary to persecuted religious refugees (such as Golcondists or Derdian dissidents)."
    ],
    "dialogueSteps": [
      {
        "speaker": "King Romus Toras",
        "context": "Turn 4/7: Hearing petitions from persecuted religious pilgrims",
        "recommendedChoice": "Grant them full royal sanctuary within Rizia's borders, defying foreign extradition requests.",
        "notes": "Upholds Rizia as a haven of refuge and religious mercy."
      }
    ],
    "pitfalls": [
      "Deporting refugees to face execution abroad."
    ],
    "saveVariables": [
      "RiziaDLC.Sanctuary_Granted"
    ]
  },
  "Rizia_Growth": {
    "achievementId": "Rizia_Growth",
    "achievementName": "Economic Wonder of South Merkopa",
    "game": "Rizia",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Turn 9 & Turn 10",
      "sceneTitle": "South Merkopa Economic Expansion and Sovereign Surplus",
      "sceneFile": "Rizia_Turn 10_DECLARATION_DECLARATION Conversation.md"
    },
    "prerequisites": [
      "Build high GDP growth, diversify beyond raw oil into manufacturing and tourism, and maintain a massive treasury surplus by Turn 10."
    ],
    "dialogueSteps": [
      {
        "speaker": "King Romus Toras",
        "context": "Turn 10: Reviewing economic performance indices",
        "recommendedChoice": "Celebrate Rizia's emergence as the undisputed economic tiger and financial powerhouse of South Merkopa.",
        "notes": "Unlocks Economic Wonder of South Merkopa."
      }
    ],
    "pitfalls": [
      "Excessive debt or economic stagnation."
    ],
    "saveVariables": [
      "RiziaDLC.Economic_Wonder_Achieved"
    ]
  },
  "Game_AMorgna": {
    "achievementId": "Game_AMorgna",
    "achievementName": "Catchphrase",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Turns 2 through 11",
      "sceneTitle": "State Speeches & Public Addresses",
      "sceneFile": "Sordland_Turn07_A_AddressToTheNation.md"
    },
    "prerequisites": [
      "Select the iconic patriotic response 'A morgna wes core' ('Victory is ours') at least 7 times across Anton Rayne's presidency.",
      "The choice appears in 12 major public addresses and private confrontations throughout the story."
    ],
    "dialogueSteps": [
      {
        "speaker": "Anton Rayne",
        "context": "Turn 2: Bernard Circas Funeral Oration",
        "recommendedChoice": "End your eulogy with: 'A morgna wes core!'",
        "notes": "Increment 1/7 (Scene: Sordland_Turn02_Personal_Funeral.md)"
      },
      {
        "speaker": "Anton Rayne",
        "context": "Turn 3: National Business Council Banquet",
        "recommendedChoice": "Address the business oligarchs and close your address with: 'A morgna wes core!'",
        "notes": "Increment 2/7 (Scene: Sordland_Turn03_EnT_BusinessCouncil.md)"
      },
      {
        "speaker": "Anton Rayne",
        "context": "Turn 7: Address to the Nation after Constitutional Vote",
        "recommendedChoice": "Conclude your radio and television address to Sordland with: 'A morgna wes core!'",
        "notes": "Increment 3/7 (Scene: Sordland_Turn07_A_AddressToTheNation.md)"
      },
      {
        "speaker": "Anton Rayne",
        "context": "Turn 9: Campaign Rally & Investigation Briefing",
        "recommendedChoice": "Rally the party supporters shouting: 'A morgna wes core!'",
        "notes": "Increment 4/7 (Scene: Sordland_Turn09_A_CampaignAndInvestigations.md)"
      },
      {
        "speaker": "Anton Rayne",
        "context": "Turn 10: USP Party Congress Keynote",
        "recommendedChoice": "Exclaim to the congress delegates: 'A morgna wes core!'",
        "notes": "Increment 5/7 (Scene: Sordland_Turn10_A_Congress.md)"
      },
      {
        "speaker": "Anton Rayne",
        "context": "Turn 10: Televised Presidential Debate",
        "recommendedChoice": "Deliver your final debate closing statement ending with: 'A morgna wes core!'",
        "notes": "Increment 6/7 (Scene: Sordland_Turn10_A_Debate.md)"
      },
      {
        "speaker": "Anton Rayne",
        "context": "Turn 10: FC Anrica Dressing Room Pep Talk",
        "recommendedChoice": "Motivate the football squad before the cup final shouting: 'A morgna wes core!'",
        "notes": "Increment 7/7 — Achievement Unlocks! (Scene: Sordland_Turn10_FCAnricaDressingRoom.md)"
      },
      {
        "speaker": "Anton Rayne",
        "context": "Alternative Opportunities (Turns 10-11)",
        "recommendedChoice": "Alliance of Nations summit, Tarquin Soll cinema confrontation, Wartime address, or Turn 11 Election speech.",
        "notes": "Any 7 of these 12 distinct moments satisfy the engine check."
      }
    ],
    "pitfalls": [
      "Choosing humble, foreign, or neutral closing lines instead of the national motto in fewer than 7 speeches locks you out of this achievement."
    ],
    "saveVariables": [
      "BaseGame.AMorgnaWesCore"
    ]
  },
  "Rizia_PalesAlliance": {
    "achievementId": "Rizia_PalesAlliance",
    "achievementName": "Peace to the Duke",
    "game": "Rizia",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Turn 7 & Turn 8",
      "sceneTitle": "Peace Accord and Bilateral Alliance with Pales",
      "sceneFile": "Rizia_Turn 4_A_CouncilTalkAboutPales.md"
    },
    "prerequisites": [
      "Avoid armed hostilities over the Aureus field and sign a formal security and trade alliance with Duke Axel Reinhart."
    ],
    "dialogueSteps": [
      {
        "speaker": "Duke Axel Reinhart",
        "context": "Turn 8: Bilateral treaty signing in Pales",
        "recommendedChoice": "Sign the mutual non-aggression and bilateral defense treaty with the Grand Duchy of Pales.",
        "notes": "Solidifies permanent peace with Pales without war."
      }
    ],
    "pitfalls": [
      "Invading Pales or launching covert pipeline sabotage."
    ],
    "saveVariables": [
      "RiziaDLC.Pales_Alliance_Signed"
    ]
  },
  "Rizia_Lawgiver": {
    "achievementId": "Rizia_Lawgiver",
    "achievementName": "I hereby declare...",
    "game": "Rizia",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Campaign Dashboard",
      "sceneTitle": "Promulgation of Royal Decrees",
      "sceneFile": "Rizia_Turn 1_Houses Briefing Section.md"
    },
    "prerequisites": [
      "Promulgate at least 10 major royal decrees from the decree management panel during King Romus's reign."
    ],
    "dialogueSteps": [
      {
        "speaker": "King Romus Toras",
        "context": "Royal decree council",
        "recommendedChoice": "Sign your 10th executive royal decree into law, shaping the legal landscape of the kingdom.",
        "notes": "Unlocks upon passing your 10th distinct royal decree."
      }
    ],
    "pitfalls": [
      "Hoarding all Authority without issuing decrees."
    ],
    "saveVariables": [
      "RiziaDLC.Decrees_Count >= 10"
    ]
  },
  "Rizia_CollectionItem_LucitaDagger": {
    "achievementId": "Rizia_CollectionItem_LucitaDagger",
    "achievementName": "Collectible: Lucita's Dagger",
    "game": "Rizia",
    "category": "Collectible Item",
    "timeline": {
      "turn": "Turn 6",
      "sceneTitle": "Private Evening & Romantic Tryst with Lucita Azaro",
      "sceneFile": null
    },
    "prerequisites": [
      "Pursue romantic relations with War Councilor Lucita Azaro.",
      "Spend an intimate evening together in the palace or Montaklar."
    ],
    "dialogueSteps": [
      {
        "speaker": "Lucita Azaro",
        "context": "Turn 6: Lucita gifts you her personal concealed fighting dagger",
        "recommendedChoice": "Accept Lucita's slim throwing dagger as a pledge of personal loyalty and affection.",
        "notes": "Adds Lucita's Dagger to your royal collection."
      }
    ],
    "pitfalls": [
      "Rejecting Lucita's advances or pursuing a strictly teetotal/no-romance path."
    ],
    "saveVariables": [
      "RiziaDLCSupport.CollectionItem_LucitaDagger"
    ]
  },
  "Rizia_CollectionItem_PalesCrown": {
    "achievementId": "Rizia_CollectionItem_PalesCrown",
    "achievementName": "Collectible: Crown of Pales",
    "game": "Rizia",
    "category": "Collectible Item",
    "timeline": {
      "turn": "Turn 10",
      "sceneTitle": "Victory Parade in the Conquered Grand Duchy of Pales",
      "sceneFile": "Rizia_Turn 10_War_Pales_VictoryParade.md"
    },
    "prerequisites": [
      "Wage war against the Grand Duchy of Pales and achieve total military victory.",
      "Dethrone Duke Axel Reinhart and annex Pales into Rizia."
    ],
    "dialogueSteps": [
      {
        "speaker": "King Romus Toras",
        "context": "Turn 10: Addressing the royal troops in conquered Pales",
        "recommendedChoice": "Claim the captured gold Crown of Pales as proof of Rizia's righteous reunification.",
        "notes": "Places the Crown of Pales on your royal desk."
      }
    ],
    "pitfalls": [
      "Resolving Pales dispute peacefully via marriage (peaceful unification gives royal wedding ring, not conquered crown)."
    ],
    "saveVariables": [
      "RiziaDLCSupport.CollectionItem_PalesCrown"
    ]
  },
  "Rizia_PipelineSabotage": {
    "achievementId": "Rizia_PipelineSabotage",
    "achievementName": "Pipe Nightmares",
    "game": "Rizia",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Turn 7",
      "sceneTitle": "Covert Sabotage of the Regional Oil Pipeline",
      "sceneFile": "Rizia_Turn 7_Fighting Assistance Unfriendly.md"
    },
    "prerequisites": [
      "Authorize a covert black-ops sabotage mission against foreign pipeline infrastructure (Wehzek or Palesian)."
    ],
    "dialogueSteps": [
      {
        "speaker": "King Romus Toras",
        "context": "Turn 7: Secret intelligence briefing with your spy chief",
        "recommendedChoice": "Authorize covert agents to detonate explosives and sever the pipeline under cover of darkness.",
        "notes": "Disrupts rival oil transit, plunging their export terminals into chaos."
      }
    ],
    "pitfalls": [
      "Refusing all covert sabotage operations."
    ],
    "saveVariables": [
      "RiziaDLC.Pipeline_Sabotaged"
    ]
  },
  "Game_NeoSollist": {
    "achievementId": "Game_NeoSollist",
    "achievementName": "Soll's Legacy",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Turn 7",
      "sceneTitle": "Enacting a Neo-Sollist Authoritarian Constitution",
      "sceneFile": "Sordland_Turn07_A_CourtVote.md"
    },
    "prerequisites": [
      "Draft an authoritarian constitution that retains Sollist principles while expanding presidential executive authority.",
      "Pass the proposal through both the Assembly and the Supreme Court."
    ],
    "dialogueSteps": [
      {
        "speaker": "Anton Rayne",
        "context": "Turn 7 Supreme Court celebration",
        "recommendedChoice": "Proclaim the dawn of a Neo-Sollist era of state nationalism with absolute executive dominance.",
        "notes": "Marries orthodox Sollism with expanded presidential dictatorship."
      }
    ],
    "pitfalls": [
      "Passing a democratic constitution that limits presidential executive decrees."
    ],
    "saveVariables": []
  },
  "Game_BFFDam": {
    "achievementId": "Game_BFFDam",
    "achievementName": "Revenge of Izzam",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Turn 9",
      "sceneTitle": "Resolution of the Bludish Freedom Front Soll Dam Crisis",
      "sceneFile": "Sordland_Turn09_A_Talks.md"
    },
    "prerequisites": [
      "Face the armed BFF occupation of the Soll Dam hydroelectric facility in Turn 9.",
      "Convene the crisis management team with Lucian Galade and your security chiefs."
    ],
    "dialogueSteps": [
      {
        "speaker": "Anton Rayne",
        "context": "Crisis briefing during the dam siege",
        "recommendedChoice": "Authorize special forces tactical breach or negotiate hostage release to retake the dam without breach.",
        "notes": "Saves the Soll Dam from destruction and prevents catastrophic flooding of Bergia."
      }
    ],
    "pitfalls": [
      "Bungling the tactical assault, allowing the militants to blow up the dam and flood the valley."
    ],
    "saveVariables": []
  },
  "Rizia_ANSanctions": {
    "achievementId": "Rizia_ANSanctions",
    "achievementName": "The World Against Us",
    "game": "Rizia",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Turn 8 & Turn 9",
      "sceneTitle": "Alliance of Nations Sanctions Plenary",
      "sceneFile": "Rizia_Turn 4_A_CouncilTalkAboutPales.md"
    },
    "prerequisites": [
      "Act with blatant international aggression: invade Pales illegally, violate maritime treaties, or use chemical experimental weapons, prompting the AN to pass sweeping sanctions."
    ],
    "dialogueSteps": [
      {
        "speaker": "Alliance of Nations",
        "context": "Turn 8/9: AN General Assembly vote in Kyrene",
        "recommendedChoice": "Defy the international resolution as the AN overwhelmingly votes to impose total economic sanctions on Rizia.",
        "notes": "Places Rizia under crushing global isolation."
      }
    ],
    "pitfalls": [
      "Maintaining diplomatic consensus and international legal compliance."
    ],
    "saveVariables": [
      "RiziaDLC.AN_Sanctioned"
    ]
  },
  "Rizia_CollectionItem_IzaKey": {
    "achievementId": "Rizia_CollectionItem_IzaKey",
    "achievementName": "Collectible: Iza Gate Key",
    "game": "Rizia",
    "category": "Collectible Item",
    "timeline": {
      "turn": "Turn 8",
      "sceneTitle": "Iza Provincial Integration Negotiations with Duchess Angelica Sazon",
      "sceneFile": "Rizia_Turn 8_Garden_Vina Non Marriage.md"
    },
    "prerequisites": [
      "Negotiate the status of the historical city of Iza with Duchess Angelica Sazon in Turn 8.",
      "Achieve peaceful administrative integration or power transfer."
    ],
    "dialogueSteps": [
      {
        "speaker": "Angelica Sazon",
        "context": "Turn 8: Reaching agreement over provincial governance",
        "recommendedChoice": "Accept the ornamental gold key to Iza's historical Mousser Gate as a symbol of royal harmony.",
        "notes": "Adds the Iza Gate Key to King Romus's desk."
      }
    ],
    "pitfalls": [
      "Violently storming Iza or ordering the execution of House Sazon."
    ],
    "saveVariables": [
      "RiziaDLCSupport.CollectionItem_IzaKey"
    ]
  },
  "Game_NoSordlandForOldMen": {
    "achievementId": "Game_NoSordlandForOldMen",
    "achievementName": "No Sordland For Old Men",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Turn 9",
      "sceneTitle": "Trial and Capital Punishment Execution of Tarquin Soll",
      "sceneFile": "Sordland_Turn09_A_SollTrial.md"
    },
    "prerequisites": [
      "Restore the death penalty via presidential executive decree or constitutional amendment in Turn 7/8.",
      "Abolish Member of Honor immunity and put Tarquin Soll on trial in Turn 9."
    ],
    "dialogueSteps": [
      {
        "speaker": "Supreme Court",
        "context": "Turn 9 Soll trial sentencing verdict",
        "recommendedChoice": "Sentence Tarquin Soll to death by hanging for high treason against the Republic of Sordland.",
        "notes": "Executes Tarquin Soll, permanently extinguishing the founding father."
      }
    ],
    "pitfalls": [
      "Sentencing Soll to life imprisonment instead of execution (requires restoring the death penalty via decree or amendment)."
    ],
    "saveVariables": []
  },
  "Game_Doggo": {
    "achievementId": "Game_Doggo",
    "achievementName": "Alexius Maximus Reginald the Third",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Turn 8",
      "sceneTitle": "Adopting a Presidential Canine Companion",
      "sceneFile": "Sordland_Turn08_A_PresidentialPowers.md"
    },
    "prerequisites": [
      "Review presidential household affairs and executive decrees in Turn 8.",
      "Welcome a pet into the Rayne residence."
    ],
    "dialogueSteps": [
      {
        "speaker": "Anton Rayne",
        "context": "Turn 8 presidential household discussion",
        "recommendedChoice": "Adopt a loyal dog to join the first family at the residence.",
        "notes": "Brings an affectionate dog into the Rayne family home."
      }
    ],
    "pitfalls": [
      "Rejecting pets during the Turn 8 household decree session."
    ],
    "saveVariables": []
  },
  "Rizia_WeddingRing": {
    "achievementId": "Rizia_WeddingRing",
    "achievementName": "Ready To Love Again",
    "game": "Rizia",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Turn 7 & Turn 9",
      "sceneTitle": "Royal Remarriage Ceremony at Palas Rezna",
      "sceneFile": "Rizia_Turn 10_RelationshipAnnouncement.md"
    },
    "prerequisites": [
      "Overcome the grief of Queen Lena's passing and remarry (e.g., General Lucita Azaro) in a grand royal ceremony."
    ],
    "dialogueSteps": [
      {
        "speaker": "King Romus Toras",
        "context": "Turn 9: Walking down the cathedral aisle for the royal wedding",
        "recommendedChoice": "Exchange vows with your new bride before the assembled kingdom and proclaim a new chapter of love.",
        "notes": "Unlocks Ready To Love Again upon entering holy matrimony once more."
      }
    ],
    "pitfalls": [
      "Staying unmarried or rejecting all marriage proposals."
    ],
    "saveVariables": [
      "RiziaDLC.Remarried"
    ]
  },
  "Rizia_Epilogue_Death": {
    "achievementId": "Rizia_Epilogue_Death",
    "achievementName": "The King Is Dead",
    "game": "Rizia",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Turn 10 / Epilogue",
      "sceneTitle": "The Passing of King Romus Toras",
      "sceneFile": "Rizia_Turn 10_DECLARATION_DECLARATION Conversation.md"
    },
    "prerequisites": [
      "Succumb to terminal illness, fatal poisoning, or assassination during the climax of King Romus's reign."
    ],
    "dialogueSteps": [
      {
        "speaker": "Narrator",
        "context": "Epilogue: Death of King Romus",
        "recommendedChoice": "Breathe your last breath as court physicians surround your bed, passing the crown to your successor.",
        "notes": "Concludes the chronicle with the King's mortality."
      }
    ],
    "pitfalls": [
      "Surviving in good health and living through your reign."
    ],
    "saveVariables": [
      "RiziaDLC.Ending_Death"
    ]
  },
  "Game_SaveTheWorld": {
    "achievementId": "Game_SaveTheWorld",
    "achievementName": "Save the World",
    "game": "Sordland",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Turn 10 & Turn 11",
      "sceneTitle": "Alliance of Nations Emergency General Assembly",
      "sceneFile": "Sordland_Turn09_A_TelevisionInterview.md"
    },
    "prerequisites": [
      "Expose Rumburg's illegal nuclear weapons program through whistleblower Hailstone at the Alliance of Nations.",
      "Prevent superpower military escalation: avoid dragging ATO and CSP into thermonuclear World War III."
    ],
    "dialogueSteps": [
      {
        "speaker": "Anton Rayne",
        "context": "Turn 10: Alliance of Nations podium address in Kyrene",
        "recommendedChoice": "Present the classified documents proving Queen Beatrice's covert nuclear facilities and rally the international community for multilateral sanctions.",
        "notes": "Stops the nuclear arms race and defuses global war, saving humanity."
      }
    ],
    "pitfalls": [
      "Joining ATO/CSP and recklessly triggering a superpower invasion that causes global nuclear holocaust."
    ],
    "saveVariables": [
      "BaseGame.AN_Rumburg_Sanctioned",
      "BaseGame.NuclearWar_Averted"
    ]
  },
  "Rizia_Epilogue_CivilWar": {
    "achievementId": "Rizia_Epilogue_CivilWar",
    "achievementName": "Fragmentation",
    "game": "Rizia",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Turn 10 / Epilogue",
      "sceneTitle": "Descent into Feudal Civil War Among the Noble Houses",
      "sceneFile": "Rizia_Turn 10_COUNCILOR RESIGNATION CHECKS.md"
    },
    "prerequisites": [
      "Alienate both House Azaro and House Sazon while gutting central royal authority, causing the noble houses to take up arms against one another in an all-out civil war."
    ],
    "dialogueSteps": [
      {
        "speaker": "Narrator",
        "context": "Epilogue: Provincial civil war outbreak",
        "recommendedChoice": "Witness the fragmentation of Rizia into bloody civil strife as rival banners clash across the countryside.",
        "notes": "Results in the tragic fracture of the realm."
      }
    ],
    "pitfalls": [
      "Keeping the noble houses unified and maintaining high central authority."
    ],
    "saveVariables": [
      "RiziaDLC.Ending_CivilWar"
    ]
  },
  "Rizia_Arbitration": {
    "achievementId": "Rizia_Arbitration",
    "achievementName": "A Little Help From My Friends",
    "game": "Rizia",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Turn 7 & Turn 8",
      "sceneTitle": "Alliance of Nations Maritime Arbitration Tribunal",
      "sceneFile": "Rizia_Turn 4_A_CouncilTalkAboutPales.md"
    },
    "prerequisites": [
      "Submit the Aureus offshore gas dispute to international AN arbitration.",
      "Secure diplomatic endorsements from Morella, Derdia, and Sordland.",
      "Present flawless legal title documentation to the AN tribunal."
    ],
    "dialogueSteps": [
      {
        "speaker": "Alliance of Nations Tribunal",
        "context": "Turn 8: Reading of the international arbitration verdict",
        "recommendedChoice": "Present your legal arguments, call on allied nations to back Rizia, and celebrate the unanimous ruling in Rizia's favor.",
        "notes": "Wins legal ownership over the disputed Aureus gas field."
      }
    ],
    "pitfalls": [
      "Attacking Palesian ships before arbitration or angering AN members."
    ],
    "saveVariables": [
      "RiziaDLC.AN_Arbitration_Won"
    ]
  },
  "Game_KissMyGas": {
    "achievementId": "Game_KissMyGas",
    "achievementName": "Kiss My Gas",
    "game": "Sordland",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Turn 3 & Turn 6",
      "sceneTitle": "Energy Protection Act (EPA) Negotiations with Alphonso & Price Shock Reversion",
      "sceneFile": "Sordland_Turn03_EnT_BusinessCouncil.md"
    },
    "prerequisites": [
      "Invest 2 Government Budget with Gasom alongside Ewald Alphonso in Turn 3.",
      "Repeal the Energy Protection Act (EPA) threshold to 49% or 100% to maximize immediate returns.",
      "Sell 1/3 of your Gasom shares during the price peak for +4 or +6 Budget.",
      "In Turn 6, when the energy crisis and fuel fluctuations hit, pass the amendment reverting EPA strictly back to 10%."
    ],
    "dialogueSteps": [
      {
        "speaker": "Ewald Alphonso",
        "context": "Turn 3: Gasom headquarters negotiation in Lachaven",
        "recommendedChoice": "Invest 2 Government Budget with Gasom and agree to raise or repeal the EPA threshold.",
        "notes": "Secures high corporate dividends."
      },
      {
        "speaker": "Anton Rayne",
        "context": "Turn 6: Responding to assembly pressure and energy volatility",
        "recommendedChoice": "Sign the executive decree or legislative compromise reverting the EPA back down to 10%.",
        "notes": "Unlocks Kiss My Gas for maximizing profit and slamming the protectionist door shut."
      }
    ],
    "pitfalls": [
      "Refusing to invest with Gasom in Turn 3.",
      "Leaving the EPA untouched at 20% throughout the entire game."
    ],
    "saveVariables": [
      "BaseGame.Gasom_Investment",
      "BaseGame.EPA_Reverted10"
    ]
  },
  "Game_ExecutiveHoarder": {
    "achievementId": "Game_ExecutiveHoarder",
    "achievementName": "Executive Hoarder",
    "game": "Sordland",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Full Campaign (Turns 1 - 10)",
      "sceneTitle": "Presidential Study Collection Desk",
      "sceneFile": "Sordland_Turn10_A_DeividFinalTalk.md"
    },
    "prerequisites": [
      "Amass at least 15 collectible items across your single presidential term in Sordland.",
      "Invest in stocks, attend cultural events, maintain friendships (Serge, Petr, Gus), and accept historical gifts."
    ],
    "dialogueSteps": [
      {
        "speaker": "Anton Rayne",
        "context": "Turn 10: Reviewing your presidential desk and study",
        "recommendedChoice": "Inspect your sprawling collection of mementos, historical relics, and personal keepsakes.",
        "notes": "Unlocks once 15 unique collection items have been placed in your inventory."
      }
    ],
    "pitfalls": [
      "Missing opportunities to invest, attend memorial events, or bond with confidants."
    ],
    "saveVariables": [
      "BaseGame.CollectionItems_Count >= 15"
    ]
  },
  "Rizia_GoldenAge": {
    "achievementId": "Rizia_GoldenAge",
    "achievementName": "Golden Age of Rizia",
    "game": "Rizia",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Turn 10",
      "sceneTitle": "Proclamation of the Golden Age of Rizia",
      "sceneFile": "Rizia_Turn 10_SuccessionAnnouncement.md"
    },
    "prerequisites": [
      "Reunite all lost territories (Zille and Pales), achieve maximum economic prosperity, maintain high living standards, and preserve stability.",
      "Conclude your first decade with Rizia standing as the shining jewel of Merkopa."
    ],
    "dialogueSteps": [
      {
        "speaker": "King Romus Toras",
        "context": "Turn 10: Addressing the realm from the Grand Balcony of Palas Rezna",
        "recommendedChoice": "Proclaim the dawn of the Golden Age of Rizia, an era of unprecedented wealth, unity, and enlightenment.",
        "notes": "The crowning achievement of King Romus's reign."
      }
    ],
    "pitfalls": [
      "Unresolved territorial disputes, high poverty, or low stability."
    ],
    "saveVariables": [
      "RiziaDLC.GoldenAge_Proclaimed"
    ]
  },
  "Rizia_NuristsUnited": {
    "achievementId": "Rizia_NuristsUnited",
    "achievementName": "Nurists United",
    "game": "Rizia",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Turn 7 & Turn 9",
      "sceneTitle": "Ecumenical Council Reconciling Dastnurists and Wruhecists",
      "sceneFile": "Rizia_Turn 7_Fighting Assistance Friendly.md"
    },
    "prerequisites": [
      "Repeal discriminatory religious laws, build interfaith dialogue, and host the historic ecumenical council reconciling Dastnurists and Wruhecists."
    ],
    "dialogueSteps": [
      {
        "speaker": "King Romus Toras",
        "context": "Turn 9: Standing between the high leaders of both religious traditions",
        "recommendedChoice": "Unite the sacred scripture interpretations, affirm brotherhood under Saint Nur, and sign the concord of unity.",
        "notes": "Brings lasting religious peace to the realm."
      }
    ],
    "pitfalls": [
      "Promoting violent sectarian persecution against one sect."
    ],
    "saveVariables": [
      "RiziaDLC.Nurists_United"
    ]
  },
  "Rizia_NoPowder": {
    "achievementId": "Rizia_NoPowder",
    "achievementName": "The End of Powder and Blood",
    "game": "Rizia",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Turn 5 & Turn 8",
      "sceneTitle": "Abolition of Feudal Peasant Levies and Armed Retinues",
      "sceneFile": "Rizia_ABOLISHLEVIES_ABOLISHLEVIES Conversation.md"
    },
    "prerequisites": [
      "Issue the royal decree abolishing peasant levies and private noble armies, centralizing all military force under the professional Royal Armed Forces."
    ],
    "dialogueSteps": [
      {
        "speaker": "King Romus Toras",
        "context": "Turn 5: Royal military reform decree session",
        "recommendedChoice": "Sign the decree abolishing provincial feudal levies and demilitarizing private noble retinues.",
        "notes": "Ends the bloody era of feudal peasant conscription."
      }
    ],
    "pitfalls": [
      "Increasing or retaining feudal levies to please House Azaro."
    ],
    "saveVariables": [
      "RiziaDLC.Levies_Abolished"
    ]
  },
  "Rizia_Epilogue_Exiled": {
    "achievementId": "Rizia_Epilogue_Exiled",
    "achievementName": "Away from My Land",
    "game": "Rizia",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Turn 10 / Epilogue",
      "sceneTitle": "Flight from Rizia into Foreign Exile",
      "sceneFile": "Rizia_Turn 10_STRIKE SCENE_RustyReformSuccess_RustyReformSuccess Conversation.md"
    },
    "prerequisites": [
      "Get overthrown by a noble coup or popular revolution, fleeing Rizia into foreign exile abroad."
    ],
    "dialogueSteps": [
      {
        "speaker": "King Romus Toras",
        "context": "Epilogue: Boarding a private ship as the capital falls",
        "recommendedChoice": "Depart the shores of Rizia in sorrow, watching your homeland fade into the horizon as an exiled former monarch.",
        "notes": "Concludes King Romus's reign in tragic foreign exile."
      }
    ],
    "pitfalls": [
      "Maintaining strong royal control or dying in the capital."
    ],
    "saveVariables": [
      "RiziaDLC.Ending_Exile"
    ]
  },
  "Game_CollectionItem_PhotoFrameTorn": {
    "achievementId": "Game_CollectionItem_PhotoFrameTorn",
    "achievementName": "Collectible: Torn Family Photo",
    "game": "Sordland",
    "category": "Collectible Item",
    "timeline": {
      "turn": "Turn 9 & Turn 10",
      "sceneTitle": "Confrontation with Monica Rayne & Solitary Residence Evening",
      "sceneFile": "Sordland_Turn09_Personal_MonicaFinalTalk.md & Sordland_Turn10_DINNER ALONE.md"
    },
    "prerequisites": [
      "Completely alienate your family: silence Monica, send Franc away without care, and mistreat your household.",
      "Trigger the divorce confrontation in Turn 9 and end in total solitude in Turn 10."
    ],
    "dialogueSteps": [
      {
        "speaker": "Monica Rayne",
        "context": "Turn 9: Bitter domestic argument in the presidential bedroom",
        "recommendedChoice": "Tell Monica that her ambitions are unimportant and allow the marriage to dissolve into divorce.",
        "notes": "Monica packs her bags and tears the family photo before leaving. Anton keeps the torn picture on his desk."
      }
    ],
    "pitfalls": [
      "Being supportive of Monica or reconciling your marriage."
    ],
    "saveVariables": [
      "BaseGameSupport.CollectionItem_PhotoFrameTorn",
      "BaseGame.Divorced"
    ]
  },
  "Game_TheBludishDream": {
    "achievementId": "Game_TheBludishDream",
    "achievementName": "The Bludish Dream",
    "game": "Sordland",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Turn 8 & Turn 9",
      "sceneTitle": "Aschraf Commemoration & Sponsoring the Minority Rights Act",
      "sceneFile": "Sordland_Turn08_A_AschrafAnniversary.md & Sordland_Turn09_MansounDemands.md"
    },
    "prerequisites": [
      "Veto all discriminatory anti-Bludish bills (Religious Harmony Act, Unified Education Act).",
      "Attend the Aschraf Anniversary commemoration in Turn 8 peacefully.",
      "Meet with Mansoun Leke in Turn 9 and sign the Minority Rights Act.",
      "Abolish the Special Zone of Bergia and grant equal civic rights."
    ],
    "dialogueSteps": [
      {
        "speaker": "Mansoun Leke",
        "context": "Turn 9: Oval office meeting with independent MP Mansoun Leke",
        "recommendedChoice": "Co-sponsor the Minority Rights Act, shepherd it through the Assembly, and sign it into law.",
        "notes": "Fulfills the dream of peace, legal equality, and reconciliation for the Bludish people."
      }
    ],
    "pitfalls": [
      "Signing the Bergia special oppression decrees or allying with the NFP to ban Bludish organizations."
    ],
    "saveVariables": [
      "BaseGame.Bill_Turn09_BludishCommission_Signed",
      "BaseGame.Bludish_Reconciliation"
    ]
  },
  "Rizia_ArmsImporter": {
    "achievementId": "Rizia_ArmsImporter",
    "achievementName": "Arms Importer",
    "game": "Rizia",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Campaign Dashboard",
      "sceneTitle": "Foreign Military Hardware Procurement",
      "sceneFile": null
    },
    "prerequisites": [
      "Import weapons, tanks, or military equipment at least 7 times from foreign suppliers through the procurement dashboard."
    ],
    "dialogueSteps": [
      {
        "speaker": "King Romus Toras",
        "context": "Military procurement dashboard",
        "recommendedChoice": "Authorize your 7th foreign arms shipment to bolster the Royal Armed Forces.",
        "notes": "Unlocks Arms Importer upon completing 7 arms purchases."
      }
    ],
    "pitfalls": [
      "Relying exclusively on domestic weapons production."
    ],
    "saveVariables": [
      "RiziaDLC.ImportArmsCount >= 7"
    ]
  },
  "Rizia_Nerve": {
    "achievementId": "Rizia_Nerve",
    "achievementName": "You've Got Nerve",
    "game": "Rizia",
    "category": "Policy Decision",
    "timeline": {
      "turn": "Turn 10",
      "sceneTitle": "Pales Victoryparade",
      "sceneFile": "Rizia_Turn 10_War_Pales_VictoryParade.md"
    },
    "prerequisites": [
      "State requirement: RiziaDLC.War_Used_ExperimentalWeapons > 0"
    ],
    "dialogueSteps": [
      {
        "context": "Policy decision during Turn 10",
        "recommendedChoice": "Approve decree / bill supporting You've Got Nerve",
        "notes": "Ensures the required prerequisite game state flag is established."
      }
    ],
    "pitfalls": [
      "Failing to sanction experimental weapon development in the Royal Arsenal, or choosing conventional siege tactics without deploying experimental ordinances during the Pales campaign."
    ],
    "saveVariables": [
      "RiziaDLC.War_Used_ExperimentalWeapons"
    ]
  },
  "Rizia_PayDebts": {
    "achievementId": "Rizia_PayDebts",
    "achievementName": "A Toras Pays His Debts",
    "game": "Rizia",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Turn 8 to Turn 10",
      "sceneTitle": "Complete Repayment of Sovereign National Debt",
      "sceneFile": "Rizia_Turn 10_DECLARATION_DECLARATION Conversation.md"
    },
    "prerequisites": [
      "Pay off all outstanding national debt bonds and foreign obligations before the end of Turn 10."
    ],
    "dialogueSteps": [
      {
        "speaker": "King Romus Toras",
        "context": "Turn 10: Treasury audit debrief with the Royal Treasurer",
        "recommendedChoice": "Authorize the final bond redemption, extinguishing every penny of foreign sovereign debt.",
        "notes": "Upholds the proud motto: A Toras always pays his debts."
      }
    ],
    "pitfalls": [
      "Defaulting on debt or carrying high liabilities into the epilogue."
    ],
    "saveVariables": [
      "RiziaDLC.All_Debts_Paid"
    ]
  },
  "Epilogue_ElectionWonVP": {
    "achievementId": "Epilogue_ElectionWonVP",
    "achievementName": "Demoted",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Epilogue",
      "sceneTitle": "Election Victory as Vice President Under a New Party Leader",
      "sceneFile": "Sordland_Epilogue_ElectionWin.md"
    },
    "prerequisites": [
      "Lose the USP party chairmanship to Lileas Graf in Turn 10.",
      "Accept Lileas' offer to serve as her Vice Presidential running mate on the ticket."
    ],
    "dialogueSteps": [
      {
        "speaker": "Anton Rayne",
        "context": "Election night 1957 celebration",
        "recommendedChoice": "Celebrate victory on the campaign stage alongside Lileas Graf as the newly elected Vice President.",
        "notes": "Preserves high executive office as Vice President of Sordland."
      }
    ],
    "pitfalls": [
      "Winning the USP presidency yourself, or running on an independent third-party ticket."
    ],
    "saveVariables": []
  },
  "Rizia_Blitzkrieg": {
    "achievementId": "Rizia_Blitzkrieg",
    "achievementName": "Blitzkrieg",
    "game": "Rizia",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Turn 9 & Turn 10",
      "sceneTitle": "War of Pales Tactical Command Center",
      "sceneFile": "Rizia_Turn 10_War_Pales_VictoryParade.md"
    },
    "prerequisites": [
      "Declare war on the Grand Duchy of Pales in Turn 8/9.",
      "Equip the Royal Armed Forces with modernized armored vehicles and air support.",
      "Execute Lucita Azaro's rapid breakthrough doctrine, capturing Pales City within the first 2 combat phases."
    ],
    "dialogueSteps": [
      {
        "speaker": "Lucita Azaro",
        "context": "Turn 9: War room tactical battle map",
        "recommendedChoice": "Deploy the mechanized strike divisions straight through the central plains and encircle the Duke's capital in a lightning offensive.",
        "notes": "Captures Pales without getting bogged down in protracted trench warfare."
      }
    ],
    "pitfalls": [
      "Relying on weak levies or taking defensive attrition options that prolong the war."
    ],
    "saveVariables": [
      "RiziaDLC.War_Pales_Blitzkrieg_Won"
    ]
  },
  "Rizia_Bells": {
    "achievementId": "Rizia_Bells",
    "achievementName": "The Golden Bells Ring",
    "game": "Rizia",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Turn 9 & Turn 10",
      "sceneTitle": "Ringing the Golden Bells of Universal Concord in Iza",
      "sceneFile": "Rizia_Turn 10_DECLARATION_DECLARATION Conversation.md"
    },
    "prerequisites": [
      "Achieve full religious harmony between Derdia and Rizia, and reconcile all internal faiths.",
      "Ring the historic Golden Bells in the cathedral towers of Iza."
    ],
    "dialogueSteps": [
      {
        "speaker": "King Romus Toras",
        "context": "Turn 10: Bell-ringing ceremony at the grand cathedral",
        "recommendedChoice": "Pull the ceremonial ropes as the Golden Bells ring out across South Merkopa, celebrating eternal peace.",
        "notes": "Unlocks The Golden Bells Ring."
      }
    ],
    "pitfalls": [
      "Religious strife or armed conflict with Derdia."
    ],
    "saveVariables": [
      "RiziaDLC.GoldenBells_Rung"
    ]
  },
  "Rizia_MomDad": {
    "achievementId": "Rizia_MomDad",
    "achievementName": "Mom and Dad",
    "game": "Rizia",
    "category": "Policy Decision",
    "timeline": {
      "turn": "Turn 10",
      "sceneTitle": "Rizia Turn 10 Councilor Resignation Checks",
      "sceneFile": "Rizia_Turn 10_COUNCILOR RESIGNATION CHECKS.md"
    },
    "prerequisites": [
      "State requirement: RiziaDLC.Council_Security_Taddeus is true and RiziaDLC.Iza_PowerTransfer_Angelica is true"
    ],
    "dialogueSteps": [
      {
        "context": "Policy decision during Turn 10",
        "recommendedChoice": "Approve decree / bill supporting Mom and Dad",
        "notes": "Ensures the required prerequisite game state flag is established."
      }
    ],
    "pitfalls": [
      "Appointing Titus instead of Taddeus Azaro to the Security Council, or failing to grant administrative control of Iza to Duchess Angelica."
    ],
    "saveVariables": [
      "RiziaDLC.Iza_PowerTransfer_Angelica",
      "RiziaDLC.Council_Security_Taddeus"
    ]
  },
  "Rizia_CollectionItem_PoemScroll": {
    "achievementId": "Rizia_CollectionItem_PoemScroll",
    "achievementName": "Collectible: Pabel's Poem",
    "game": "Rizia",
    "category": "Collectible Item",
    "timeline": {
      "turn": "Turn 8",
      "sceneTitle": "Private Chambers Conversation with Butler Pabel",
      "sceneFile": null
    },
    "prerequisites": [
      "Maintain a supportive, close friendship or romantic relationship with your personal butler Pabel.",
      "Comfort him during late-night discussions in the royal quarters."
    ],
    "dialogueSteps": [
      {
        "speaker": "Pabel",
        "context": "Turn 8: Pabel shyly hands you a handwritten poem he composed for you",
        "recommendedChoice": "Take the handwritten poem scroll, read it with warm affection, and thank Pabel sincerely.",
        "notes": "Adds Pabel's Poem Scroll to King Romus's personal mementos."
      }
    ],
    "pitfalls": [
      "Treating Pabel coldly, firing him, or mocking his writing."
    ],
    "saveVariables": [
      "RiziaDLCSupport.CollectionItem_PoemScroll"
    ]
  },
  "Rizia_KillAdarfo": {
    "achievementId": "Rizia_KillAdarfo",
    "achievementName": "Arcasia Did It",
    "game": "Rizia",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Turn 7 & Turn 8",
      "sceneTitle": "Framing Foreign Agitators for the Zille Bombing",
      "sceneFile": "Rizia_Turn 10_Security_LucitaOrTitus.md"
    },
    "prerequisites": [
      "Conduct covert operations to eliminate foreign agitator Adarfo or fabricate intelligence framing Arcasia for the Zille bombing."
    ],
    "dialogueSteps": [
      {
        "speaker": "King Romus Toras",
        "context": "Turn 8: Secret intelligence dispatch",
        "recommendedChoice": "Authorize the covert operation to neutralize Adarfo and leak documents linking Arcasia to the attack.",
        "notes": "Diverts international blame onto Arcasia."
      }
    ],
    "pitfalls": [
      "Refusing all covert intelligence operations."
    ],
    "saveVariables": [
      "RiziaDLC.Arcasia_Framed"
    ]
  },
  "Rizia_Khisha": {
    "achievementId": "Rizia_Khisha",
    "achievementName": "Smolak's Smokes",
    "game": "Rizia",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Turn 5",
      "sceneTitle": "Bilateral Negotiations with President Wiktor Smolak in Wehlen",
      "sceneFile": "Rizia_Turn 5_FPnT_WehlenNegotiations.md"
    },
    "prerequisites": [
      "Travel to Wehlen in Turn 5.",
      "Agree to import Wehzek tobacco and distribute cigarettes to Rizian citizens.",
      "Share a smoke with Wiktor Smolak during the banquet."
    ],
    "dialogueSteps": [
      {
        "speaker": "Wiktor Smolak",
        "context": "Turn 5: Smolak offers his personal stash of pungent Wehzek cigars",
        "recommendedChoice": "Take the cigar from Smolak, light it up, and sign the tobacco importation protocol.",
        "notes": "Unlocks Smolak's Smokes and strengthens ties with Wehlen."
      }
    ],
    "pitfalls": [
      "Refusing all tobacco trade or insulting Smolak's smoking habits."
    ],
    "saveVariables": [
      "RiziaDLC.Smolak_Tobacco_Imported"
    ]
  },
  "Rizia_Rusty": {
    "achievementId": "Rizia_Rusty",
    "achievementName": "The Kingdom Incorporated",
    "game": "Rizia",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Turn 8 & Turn 9",
      "sceneTitle": "Royal Economic Intelligence Briefing & Arrest of Rusty",
      "sceneFile": "Rizia_Turn 10_COUNCILOR RESIGNATION CHECKS.md"
    },
    "prerequisites": [
      "Investigate corporate magnate Rusty and his offshore ties to foreign powers.",
      "Uncover his treason and insider manipulation of Rizian Royal Gold (RRG).",
      "Order Titus or the Golden Guard to arrest Rusty and nationalize his corporate shares."
    ],
    "dialogueSteps": [
      {
        "speaker": "King Romus Toras",
        "context": "Turn 9: Executive decree session regarding corporate malfeasance",
        "recommendedChoice": "Sign the warrant to arrest Rusty for high treason and seize 100% of RRG for the Rizian Crown.",
        "notes": "Puts the kingdom's natural wealth under sovereign control."
      }
    ],
    "pitfalls": [
      "Taking bribes from Rusty to sweep his crimes under the rug."
    ],
    "saveVariables": [
      "RiziaDLC.Rusty_Arrested",
      "RiziaDLC.Situation_Economy_RRG_StateOwns100"
    ]
  },
  "Rizia_Theocracy": {
    "achievementId": "Rizia_Theocracy",
    "achievementName": "Wruhec's Second Coming",
    "game": "Rizia",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Turn 10 & Turn 11",
      "sceneTitle": "Proclamation of the Holy Theocratic Kingdom of Rizia",
      "sceneFile": "Rizia_Turn 11_A_TheocracyDeclaration.md"
    },
    "prerequisites": [
      "Surrender royal secular supremacy to High Priest Sal and the Dastnurist clergy, transforming Rizia into a devout theocratic realm."
    ],
    "dialogueSteps": [
      {
        "speaker": "High Priest Sal",
        "context": "Turn 11: Solemn theocratic declaration before the High Altar",
        "recommendedChoice": "Kneel, place Saint Dast's scepter in Priest Sal's hands, and declare Rizia a divine theocracy governed by holy law.",
        "notes": "Unlocks Wruhec's Second Coming as divine rule replaces secular monarchy."
      }
    ],
    "pitfalls": [
      "Passing secular democratic reforms or suppressing the priesthood."
    ],
    "saveVariables": [
      "RiziaDLC.Theocracy_Declared"
    ]
  },
  "Rizia_FlipOff": {
    "achievementId": "Rizia_FlipOff",
    "achievementName": "Two Birds For Beatrice",
    "game": "Rizia",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Turn 9",
      "sceneTitle": "GRACE Imperial Summit Defiance Against Queen Beatrice",
      "sceneFile": "Rizia_Turn 9_FPnT_GRACERumburgMeeting.md"
    },
    "prerequisites": [
      "Attend the GRACE summit in Turn 9 and aggressively defy Queen Beatrice's condescending imperial demands."
    ],
    "dialogueSteps": [
      {
        "speaker": "King Romus Toras",
        "context": "Turn 9: When Queen Beatrice scolds you and demands full obedience",
        "recommendedChoice": "Stand up, deliver a scathing insult to Queen Beatrice, and storm out of the imperial chamber.",
        "notes": "Delivers two rhetorical birds to the arrogant Queen of Rumburg."
      }
    ],
    "pitfalls": [
      "Politely apologizing and bowing to Beatrice's wishes."
    ],
    "saveVariables": [
      "RiziaDLC.Beatrice_Insulted"
    ]
  },
  "Rizia_PorteDrazon": {
    "achievementId": "Rizia_PorteDrazon",
    "achievementName": "Pearl of the Between-Seas",
    "game": "Rizia",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Turn 6 & Turn 10",
      "sceneTitle": "Porte Drazon Metropolitan Infrastructure Development",
      "sceneFile": "Rizia_Turn 10_DECLARATION_DECLARATION Conversation.md"
    },
    "prerequisites": [
      "Invest in Porte Drazon's port expansion, high-speed rail, cultural academies, and seaside boulevards.",
      "Transform the capital into the undisputed Pearl of the Between-Seas."
    ],
    "dialogueSteps": [
      {
        "speaker": "King Romus Toras",
        "context": "Turn 10: Urban development debrief",
        "recommendedChoice": "Inaugurate the new seaside promenade and celebrate Porte Drazon as the modern jewel of Merkopa.",
        "notes": "Unlocks Pearl of the Between-Seas."
      }
    ],
    "pitfalls": [
      "Neglecting the capital's infrastructure."
    ],
    "saveVariables": [
      "RiziaDLC.PorteDrazon_Pearl_Achieved"
    ]
  },
  "Epilogue_ElectionLoseContinue": {
    "achievementId": "Epilogue_ElectionLoseContinue",
    "achievementName": "A New Hope",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Epilogue",
      "sceneTitle": "Graceful Concession and Political Opposition Leadership",
      "sceneFile": "Sordland_Epilogue_ElectionLose.md"
    },
    "prerequisites": [
      "Lose the 1957 general election to Frens Ricter (PFJP) or Keshar Kibener (NFP).",
      "Choose to remain active in Sordish politics as leader of the opposition."
    ],
    "dialogueSteps": [
      {
        "speaker": "Anton Rayne",
        "context": "Election night concession broadcast",
        "recommendedChoice": "Deliver a gracious concession speech, congratulate the winning candidate, and vow to lead the loyal opposition.",
        "notes": "Transitions smoothly into the respected leader of the parliamentary opposition."
      }
    ],
    "pitfalls": [
      "Winning the general election or retiring permanently from politics after defeat."
    ],
    "saveVariables": []
  },
  "Rizia_OfficerSazon": {
    "achievementId": "Rizia_OfficerSazon",
    "achievementName": "Lieutenant Commander Sazon",
    "game": "Rizia",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Turn 4 & Turn 6",
      "sceneTitle": "Appointing Manus Sazon to the Royal Armed Forces",
      "sceneFile": "Rizia_Turn 4_A_CouncilTalkAboutPales.md"
    },
    "prerequisites": [
      "Confer a formal officer commission in the Royal Armed Forces upon reformist leader Manus Sazon, integrating him into the military command."
    ],
    "dialogueSteps": [
      {
        "speaker": "King Romus Toras",
        "context": "Turn 4/6: Reviewing royal military commissions with Manus Sazon",
        "recommendedChoice": "Approve the military commission and appoint Manus Sazon as Lieutenant Commander in the armed forces.",
        "notes": "Binds the young reformist to royal military service."
      }
    ],
    "pitfalls": [
      "Arresting Manus or banning him from the military."
    ],
    "saveVariables": [
      "RiziaDLC.Manus_Commissioned"
    ]
  },
  "Game_638Ways": {
    "achievementId": "Game_638Ways",
    "achievementName": "638 Ways to Kill Rayne",
    "game": "Sordland",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Turn 9 (Parade Ambush) & Turn 10 (Campaign Rally Shooting)",
      "sceneTitle": "Surviving the Motorcade Ambush & Election Eve Rally Gunfire",
      "sceneFile": "Sordland_Turn09_SnO_MilitaryParade.md & Sordland_Epilogue_ElectionWin.md"
    },
    "prerequisites": [
      "Trigger severe hostility from the Bludish Freedom Front (BFF) by passing oppressive anti-Bludish acts without reconciliation OR from the Oligarchs by nationalizing both corporations without arresting Walter Tusk and Marcel Koronti.",
      "Secure at least ONE life-saving protective safeguard before the assassination strikes:",
      "Safeguard Option 1 (Serge's Pocket Watch): Pay 2 Personal Wealth for Serge's children's education in Turn 3 and accept his grandfather's watch in Turn 7 outside the Assembly.",
      "Safeguard Option 2 (Karl Greiser / SSP): Form the Secret State Police under Karl Greiser in Turn 5."
    ],
    "dialogueSteps": [
      {
        "speaker": "Gunman",
        "context": "Turn 10 Campaign Rally: An assassin shouts 'Yollak Bluderat!' or an Oligarch hitman fires at your chest",
        "recommendedChoice": "The fatal bullet strikes your front coat pocket, where Serge's metal pocket watch deflects the lethal blow (or Karl Greiser leaps in front to shield you).",
        "notes": "You wake up in the hospital having survived the deadly assassination attempt against all odds."
      }
    ],
    "pitfalls": [
      "Facing an assassination attempt WITHOUT Serge's pocket watch and WITHOUT Karl/SSP active: Anton Rayne dies instantly, unlocking Epilogue_Assassinated.",
      "Maintaining high public approval and zero unrest: if no assassination attempt is triggered, this survival milestone cannot unlock."
    ],
    "saveVariables": []
  },
  "Rizia_NoRomance": {
    "achievementId": "Rizia_NoRomance",
    "achievementName": "It's Not You, It's Me",
    "game": "Rizia",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Turn 6 to Turn 9",
      "sceneTitle": "Rejecting All Romantic Advances from Lucita and Pabel",
      "sceneFile": "Rizia_Turn 10_RelationshipAnnouncement.md"
    },
    "prerequisites": [
      "Maintain strict personal celibacy throughout King Romus's reign: politely decline romantic advances from Lucita Azaro and butler Pabel."
    ],
    "dialogueSteps": [
      {
        "speaker": "King Romus Toras",
        "context": "Turn 6/8: When intimate romantic moments arise",
        "recommendedChoice": "Keep a respectful, professional distance, stating: 'It's not you, it's me' and remaining focused on the Crown.",
        "notes": "Unlocks It's Not You, It's Me for completing the campaign without romance."
      }
    ],
    "pitfalls": [
      "Flirting with or marrying Lucita, or reciprocating Pabel's affection."
    ],
    "saveVariables": [
      "RiziaDLC.Romance_Declined"
    ]
  },
  "Rizia_OutOfCloset": {
    "achievementId": "Rizia_OutOfCloset",
    "achievementName": "Out And Proud",
    "game": "Rizia",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Turn 8 & Turn 10",
      "sceneTitle": "Public Declaration of Love for Butler Pabel",
      "sceneFile": "Rizia_Turn 10_RelationshipAnnouncement.md"
    },
    "prerequisites": [
      "Pursue a devoted romantic relationship with your personal butler Pabel.",
      "Decriminalize homosexuality in Rizia via royal decree.",
      "Openly acknowledge your relationship with Pabel before the Royal Court."
    ],
    "dialogueSteps": [
      {
        "speaker": "King Romus Toras",
        "context": "Turn 10: Addressing the Royal Council regarding your personal companion",
        "recommendedChoice": "Declare your unshakeable love for Pabel openly and proudly, refusing to hide behind court deception.",
        "notes": "Unlocks Out And Proud as a landmark royal personal milestone."
      }
    ],
    "pitfalls": [
      "Keeping the relationship a shameful secret or rejecting Pabel."
    ],
    "saveVariables": [
      "RiziaDLC.Pabel_Public_Romance"
    ]
  },
  "Rizia_Halaita": {
    "achievementId": "Rizia_Halaita",
    "achievementName": "So It Is",
    "game": "Rizia",
    "category": "Policy Decision",
    "timeline": {
      "turn": "Turn 10",
      "sceneTitle": "Rizia Increaselevies Increaselevies Conversation",
      "sceneFile": "Rizia_INCREASELEVIES_INCREASELEVIES Conversation.md"
    },
    "prerequisites": [
      "State requirement: RiziaDLC.Said_Halaita >= 10"
    ],
    "dialogueSteps": [
      {
        "context": "Policy decision during Turn 10",
        "recommendedChoice": "Approve decree / bill supporting So It Is",
        "notes": "Ensures the required prerequisite game state flag is established."
      }
    ],
    "pitfalls": [
      "Selecting secular or confrontational dialogue choices during religious events instead of using the traditional Dastnuist blessing \"Halaita\" at least 10 times."
    ],
    "saveVariables": [
      "RiziaDLC.Said_Halaita"
    ]
  },
  "Rizia_CollectionItem_BullFigurine": {
    "achievementId": "Rizia_CollectionItem_BullFigurine",
    "achievementName": "Collectible: Bull Figurine",
    "game": "Rizia",
    "category": "Collectible Item",
    "timeline": {
      "turn": "Turn 3",
      "sceneTitle": "Royal Armory & House Azaro Military Council",
      "sceneFile": "Rizia_Turn 3_FPnT_QueenBeatriceVisit.md"
    },
    "prerequisites": [
      "Meet with General Lucita Azaro in the royal armory or during war council planning in Turn 3.",
      "Show respect for Montaklar martial tradition."
    ],
    "dialogueSteps": [
      {
        "speaker": "Lucita Azaro",
        "context": "Turn 3: Discussing House Azaro's ancient military heritage",
        "recommendedChoice": "Admire the bronze craftsmanship of Montaklar and accept the carved Bull Figurine.",
        "notes": "Places the Azaro Bull Figurine onto King Romus's royal council desk."
      }
    ],
    "pitfalls": [
      "Insulting House Azaro or strictly cutting their military role."
    ],
    "saveVariables": [
      "RiziaDLCSupport.CollectionItem_BullFigurine"
    ]
  },
  "Rizia_UFO": {
    "achievementId": "Rizia_UFO",
    "achievementName": "I Want to Believe",
    "game": "Rizia",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Turn 5",
      "sceneTitle": "Investigation of Aerial Lights Over Mount Rizia",
      "sceneFile": null
    },
    "prerequisites": [
      "Receive reports from royal observers of bizarre illuminated craft hovering silently above the mountains of Rizia.",
      "Authorize funding for an official aerial investigation."
    ],
    "dialogueSteps": [
      {
        "speaker": "King Romus Toras",
        "context": "Turn 5: Reviewing anomalous sightings with your military aides",
        "recommendedChoice": "Order a confidential investigation into the unidentified flying craft and declare: 'I want to believe'.",
        "notes": "Adds the royal UFO investigation report to the crown archives."
      }
    ],
    "pitfalls": [
      "Dismissing the reports as hallucinations of drunken shepherds."
    ],
    "saveVariables": [
      "RiziaDLC.UFO_Investigated"
    ]
  },
  "Rizia_Epilogue_Prison": {
    "achievementId": "Rizia_Epilogue_Prison",
    "achievementName": "The King Behind Bars",
    "game": "Rizia",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Turn 10 / Epilogue",
      "sceneTitle": "Imprisonment in the Dungeons of Palas Rezna",
      "sceneFile": "Rizia_Turn 10_Security_LucitaOrTitus.md"
    },
    "prerequisites": [
      "Get overthrown by a military coup (General Lucita Azaro or Titus) or captured by rebels, spending the rest of your days imprisoned behind bars."
    ],
    "dialogueSteps": [
      {
        "speaker": "Narrator",
        "context": "Epilogue: In the cold stone prison cell",
        "recommendedChoice": "Hear the heavy iron doors slam shut as you are stripped of your crown and imprisoned for life.",
        "notes": "Concludes King Romus's reign behind bars."
      }
    ],
    "pitfalls": [
      "Maintaining sovereign power or fleeing abroad."
    ],
    "saveVariables": [
      "RiziaDLC.Ending_Prison"
    ]
  },
  "Rizia_Sotelato": {
    "achievementId": "Rizia_Sotelato",
    "achievementName": "Long Live the Revolution",
    "game": "Rizia",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Turn 9 & Turn 10",
      "sceneTitle": "The Sotelato Revolutionary Commune Proclamation",
      "sceneFile": "Rizia_Turn 10_STRIKE SCENE_REVOLUTIONARIES SUCCESS BRANCH_REVOLUTIONARIES SUCCESS BRANCH C.md"
    },
    "prerequisites": [
      "Allow the socialist and republican workers movement in Sotelato to overcome royal garrisons, establishing the revolutionary commune."
    ],
    "dialogueSteps": [
      {
        "speaker": "Revolutionary Leaders",
        "context": "Turn 10: The red banners raised over Sotelato town hall",
        "recommendedChoice": "Witness the workers raise their clenched fists and shout: 'Long live the revolution!' as royal rule collapses.",
        "notes": "Triggers the revolutionary commune victory."
      }
    ],
    "pitfalls": [
      "Crushing the strikes with military force or passing generous reforms."
    ],
    "saveVariables": [
      "RiziaDLC.Sotelato_Revolution_Victorious"
    ]
  },
  "Rizia_EtTuTitus": {
    "achievementId": "Rizia_EtTuTitus",
    "achievementName": "Et Tu Titus?",
    "game": "Rizia",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Turn 10",
      "sceneTitle": "Golden Guard Coup and Betrayal by Commander Titus",
      "sceneFile": "Rizia_Turn 10_Security_LucitaOrTitus.md"
    },
    "prerequisites": [
      "Commit extreme dishonor or treason against the Crown, causing your loyal bodyguard Commander Titus Gari to turn his sword against you."
    ],
    "dialogueSteps": [
      {
        "speaker": "Titus Gari",
        "context": "Turn 10: In the royal throne room as Golden Guard troops draw their weapons",
        "recommendedChoice": "Look into the eyes of your personal protector and utter: 'Et tu, Titus?' as he places you under arrest.",
        "notes": "Unlocks Et Tu Titus? as your closest bodyguard deposes you."
      }
    ],
    "pitfalls": [
      "Maintaining Titus's loyalty and honorable governance."
    ],
    "saveVariables": [
      "RiziaDLC.Titus_Betrayal"
    ]
  },
  "Rizia_Collectibles": {
    "achievementId": "Rizia_Collectibles",
    "achievementName": "Royal Hoarder",
    "game": "Rizia",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Full Campaign (Turns 1 - 10)",
      "sceneTitle": "Royal Study Keepsake Exhibition at Palas Rezna",
      "sceneFile": "Rizia_Turn 10_SuccessionAnnouncement.md"
    },
    "prerequisites": [
      "Amass at least 18 collectible items across the Rizia campaign during King Romus's reign."
    ],
    "dialogueSteps": [
      {
        "speaker": "King Romus Toras",
        "context": "Turn 10: Walking through your royal study lined with keepsakes and relics",
        "recommendedChoice": "Admire your sprawling museum-grade royal collection gathered across South Merkopa.",
        "notes": "Unlocks once 18 unique Rizian collection items have been obtained."
      }
    ],
    "pitfalls": [
      "Ignoring side encounters, diplomatic gifts, and personal keepsakes."
    ],
    "saveVariables": [
      "RiziaDLC.CollectionItems_Count >= 18"
    ]
  },
  "Rizia_Glovurius": {
    "achievementId": "Rizia_Glovurius",
    "achievementName": "Blaze of Glory",
    "game": "Rizia",
    "category": "Policy Decision",
    "timeline": {
      "turn": "Turn 10",
      "sceneTitle": "Declaration Conversation",
      "sceneFile": "Rizia_Turn 10_DECLARATION_DECLARATION Conversation.md"
    },
    "prerequisites": [
      "State requirement: RiziaDLC.Said_GlovuriusAxaRizia >= 10"
    ],
    "dialogueSteps": [
      {
        "context": "Policy decision during Turn 10",
        "recommendedChoice": "Approve decree / bill supporting Blaze of Glory",
        "notes": "Ensures the required prerequisite game state flag is established."
      }
    ],
    "pitfalls": [
      "Choosing cynical, humble, or foreign-pleasing dialogue options instead of leading the patriotic toast \"Glovurius Axa Rizia\" at least 10 times during royal banquets."
    ],
    "saveVariables": [
      "RiziaDLC.Said_GlovuriusAxaRizia"
    ]
  },
  "Rizia_Nur": {
    "achievementId": "Rizia_Nur",
    "achievementName": "Wruhecs Chosen",
    "game": "Rizia",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Turn 9 & Turn 10",
      "sceneTitle": "Acclamation as Wruhec's Divine Instrument on Earth",
      "sceneFile": "Rizia_Turn 11_A_TheocracyDeclaration.md"
    },
    "prerequisites": [
      "Demonstrate extreme religious piety, follow all orthodox traditions, fund holy sanctuaries, and receive divine acclamation from the Archpriests."
    ],
    "dialogueSteps": [
      {
        "speaker": "Archpriests of Rizia",
        "context": "Turn 10: Solemn liturgical ceremony in the Grand Basilica",
        "recommendedChoice": "Bow before the sacred altar as the clergy proclaims King Romus to be Wruhec's Chosen monarch.",
        "notes": "Unlocks Wruhecs Chosen for maximum religious devotion."
      }
    ],
    "pitfalls": [
      "Secular governance or promoting blasphemous modernism."
    ],
    "saveVariables": [
      "RiziaDLC.Wruhecs_Chosen"
    ]
  },
  "Rizia_Funny": {
    "achievementId": "Rizia_Funny",
    "achievementName": "Funny Man",
    "game": "Rizia",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Turn 5",
      "sceneTitle": "Witty Banter and Jokes with Wiktor Smolak in Wehlen",
      "sceneFile": "Rizia_Turn 5_FPnT_WehlenNegotiations.md"
    },
    "prerequisites": [
      "Travel to Wehlen in Turn 5 and engage in lighthearted comedic banter with President Wiktor Smolak throughout the banquet."
    ],
    "dialogueSteps": [
      {
        "speaker": "Wiktor Smolak",
        "context": "Turn 5: Sharing drinks and laughter at Smolak's residence",
        "recommendedChoice": "Match Smolak's dark jokes with your own witty quips, bursting into shared laughter at the absurdities of politics.",
        "notes": "Smolak proclaims you a true 'Funny Man'."
      }
    ],
    "pitfalls": [
      "Acting stiff, haughty, or offended by Smolak's crude jokes."
    ],
    "saveVariables": [
      "RiziaDLC.Smolak_Humor_Engaged"
    ]
  },
  "Rizia_FreeZille": {
    "achievementId": "Rizia_FreeZille",
    "achievementName": "South Merkopa's Newest Member",
    "game": "Rizia",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Turn 8 & Turn 9",
      "sceneTitle": "Reintegration of Zille into the Kingdom of Rizia",
      "sceneFile": "Rizia_Turn 7_Zille Treaty Discussion.md"
    },
    "prerequisites": [
      "Reclaim full sovereignty over the province of Zille from Wehlen without compromising territorial integrity."
    ],
    "dialogueSteps": [
      {
        "speaker": "King Romus Toras",
        "context": "Turn 9: Entering the liberated province of Zille",
        "recommendedChoice": "Celebrate the reintegration of Zille alongside cheering crowds and welcome the province home.",
        "notes": "Restores Zille to the crown."
      }
    ],
    "pitfalls": [
      "Allowing Smolak to permanently keep Zille."
    ],
    "saveVariables": [
      "RiziaDLC.Zille_Reintegrated"
    ]
  },
  "Rizia_Workers": {
    "achievementId": "Rizia_Workers",
    "achievementName": "What's Mined Is Yours",
    "game": "Rizia",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Turn 4 & Turn 7",
      "sceneTitle": "Comprehensive Mining Safety & Worker Rights Legislation",
      "sceneFile": "Rizia_Turn 4_A_CouncilTalkAboutPales.md"
    },
    "prerequisites": [
      "Pass progressive worker safety decrees, living wages, and health protections for gold and energy miners across Rizia."
    ],
    "dialogueSteps": [
      {
        "speaker": "King Romus Toras",
        "context": "Turn 7: Promulgating royal labor reforms",
        "recommendedChoice": "Sign the Royal Miner and Laborer Protection Act, guaranteeing that the fruits of the mines belong to the workers.",
        "notes": "Wins overwhelming working-class support."
      }
    ],
    "pitfalls": [
      "Ignoring mine safety or violently crushing striking miners."
    ],
    "saveVariables": [
      "RiziaDLC.Worker_Rights_Passed"
    ]
  },
  "Rizia_AzarosDead": {
    "achievementId": "Rizia_AzarosDead",
    "achievementName": "Like Father, Like Daughter",
    "game": "Rizia",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Turn 10",
      "sceneTitle": "Execution of the House Azaro Traitors Following Coup Attempt",
      "sceneFile": "Rizia_Turn 10_COUNCILOR RESIGNATION CHECKS.md"
    },
    "prerequisites": [
      "Uncover House Azaro's treasonous conspiracy or survive their coup attempt in Turn 10, then order their execution."
    ],
    "dialogueSteps": [
      {
        "speaker": "King Romus Toras",
        "context": "Turn 10: Sentencing the defeated conspirators of House Azaro",
        "recommendedChoice": "Order the execution of the rebellious Azaro commanders, extinguishing their treacherous lineage.",
        "notes": "Eliminates the military house of Azaro permanently."
      }
    ],
    "pitfalls": [
      "Pardoning House Azaro or letting them successfully seize the throne."
    ],
    "saveVariables": [
      "RiziaDLC.Azaros_Executed"
    ]
  },
  "Rizia_RescuedVina": {
    "achievementId": "Rizia_RescuedVina",
    "achievementName": "Save the Princess",
    "game": "Rizia",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Turn 9 & Turn 10",
      "sceneTitle": "Daring Rescue of Princess Vina Toras",
      "sceneFile": "Rizia_Turn 10_Security_LucitaOrTitus.md"
    },
    "prerequisites": [
      "When Princess Vina is imperiled or held hostage during political turmoil in Turn 9/10, deploy your loyal forces to rescue her safely."
    ],
    "dialogueSteps": [
      {
        "speaker": "Titus Gari",
        "context": "Turn 10: Special forces extraction operation",
        "recommendedChoice": "Breach the compound, neutralize the captors, and escort Crown Princess Vina safely back to the palace.",
        "notes": "Saves Princess Vina from harm."
      }
    ],
    "pitfalls": [
      "Allowing Vina to be harmed or captured permanently."
    ],
    "saveVariables": [
      "RiziaDLC.Vina_Rescued"
    ]
  },
  "Rizia_Sober": {
    "achievementId": "Rizia_Sober",
    "achievementName": "No Alcohol for me Please",
    "game": "Rizia",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Full Campaign (Turns 1 - 10)",
      "sceneTitle": "Strictly Teetotal Sovereign Governance",
      "sceneFile": "Rizia_Turn 1_Houses Briefing Section.md"
    },
    "prerequisites": [
      "Refuse every single alcoholic beverage, wine toast, and drink offered to King Romus across the entire 10-turn campaign."
    ],
    "dialogueSteps": [
      {
        "speaker": "King Romus Toras",
        "context": "During state banquets and toasts",
        "recommendedChoice": "Politely decline wine or whiskey, requesting water or herbal tea instead: 'No alcohol for me, please'.",
        "notes": "Unlocks for completing the entire Rizian reign completely sober."
      }
    ],
    "pitfalls": [
      "Accepting even a single sip of wine, champagne, or whiskey."
    ],
    "saveVariables": [
      "RiziaDLC.Sober_Campaign_Completed"
    ]
  },
  "Rizia_HouseCleaning": {
    "achievementId": "Rizia_HouseCleaning",
    "achievementName": "House Cleaning",
    "game": "Rizia",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Turn 8 & Turn 9",
      "sceneTitle": "Purge of Corrupt Nobles from the Royal Administration",
      "sceneFile": "Rizia_Turn 10_COUNCILOR RESIGNATION CHECKS.md"
    },
    "prerequisites": [
      "Conduct a comprehensive investigation into court corruption and dismiss or prosecute all corrupt noble councilors."
    ],
    "dialogueSteps": [
      {
        "speaker": "King Romus Toras",
        "context": "Turn 9: Executive decree session regarding court integrity",
        "recommendedChoice": "Sign royal dismissal orders and purge the corrupt aristocrats from government service.",
        "notes": "Cleanses the royal administration of graft and corruption."
      }
    ],
    "pitfalls": [
      "Tolerating rampant embezzlement and bribery among ministers."
    ],
    "saveVariables": [
      "RiziaDLC.Court_Purged"
    ]
  },
  "Rizia_NurDecrees": {
    "achievementId": "Rizia_NurDecrees",
    "achievementName": "By Nur's Will, I Decree!",
    "game": "Rizia",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Campaign Dashboard",
      "sceneTitle": "Enactment of Traditional Religious Decrees",
      "sceneFile": "Rizia_Turn 1_Houses Briefing Section.md"
    },
    "prerequisites": [
      "Enact all major religious, traditional, and Nurist cultural decrees authorized by the Archsanctuary."
    ],
    "dialogueSteps": [
      {
        "speaker": "King Romus Toras",
        "context": "Royal decree management",
        "recommendedChoice": "Promulgate the full codex of religious harmony and holy observances: 'By Nur's Will, I Decree!'.",
        "notes": "Unlocks upon passing all primary Nurist decrees."
      }
    ],
    "pitfalls": [
      "Ignoring religious decrees in favor of pure industrialism."
    ],
    "saveVariables": [
      "RiziaDLC.Nur_Decrees_Passed"
    ]
  },
  "Rizia_Tradition": {
    "achievementId": "Rizia_Tradition",
    "achievementName": "Tradition is Our Compass, the Past Our Strength.",
    "game": "Rizia",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Turn 10",
      "sceneTitle": "Defense of Sovereign Absolutism and Ancient Feudal Traditions",
      "sceneFile": "Rizia_Turn 10_DECLARATION_DECLARATION Conversation.md"
    },
    "prerequisites": [
      "Reject all democratic constitutional reforms, preserve the ancient feudal privileges of House Toras, and rule as an absolute monarch."
    ],
    "dialogueSteps": [
      {
        "speaker": "King Romus Toras",
        "context": "Turn 10: Addressing the Royal Council on the future of Rizia",
        "recommendedChoice": "Reaffirm: 'Tradition is our compass, the past our strength', rejecting foreign democracy.",
        "notes": "Consolidates absolute royal autocracy."
      }
    ],
    "pitfalls": [
      "Conceding powers to parliament or signing reformist constitutions."
    ],
    "saveVariables": [
      "RiziaDLC.Tradition_Preserved"
    ]
  },
  "Rizia_HugoIgo": {
    "achievementId": "Rizia_HugoIgo",
    "achievementName": "Hugo, I Go",
    "game": "Rizia",
    "category": "Dialogue Choice",
    "timeline": {
      "turn": "Turn 8",
      "sceneTitle": "Turn 8 Royal Gardens Discussion on Princess Vina Independence",
      "sceneFile": "Rizia_Turn 8_Garden_Vina Non Marriage.md"
    },
    "prerequisites": [
      "Convene in the palace gardens with Princess Vina and Uncle Hugo in Turn 8.",
      "Discuss the royal succession and diplomatic marriage proposals."
    ],
    "dialogueSteps": [
      {
        "speaker": "King Romus Toras",
        "context": "When debating forced political betrothals for Princess Vina",
        "recommendedChoice": "Support Princess Vina's autonomy and decline the dynastic marriage arrangement.",
        "notes": "Values your daughter's personal freedom over dynastic geopolitical expedience."
      }
    ],
    "pitfalls": [
      "Forcing Princess Vina into a dynastic political marriage against her will."
    ],
    "saveVariables": []
  },
  "Rizia_PalesWarLost": {
    "achievementId": "Rizia_PalesWarLost",
    "achievementName": "Father's Son",
    "game": "Rizia",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Turn 10",
      "sceneTitle": "Catastrophic Military Defeat in the War Against Pales",
      "sceneFile": "Rizia_Turn 10_COUNCILOR RESIGNATION CHECKS.md"
    },
    "prerequisites": [
      "Invade the Grand Duchy of Pales and suffer total military defeat, mirroring King Valero's historical humiliation."
    ],
    "dialogueSteps": [
      {
        "speaker": "King Romus Toras",
        "context": "Turn 10: Reviewing the routed royal army fleeing from Pales",
        "recommendedChoice": "Order a humiliating general retreat, realizing you have suffered the exact same failure as your father.",
        "notes": "Earns the bitter title of 'Father's Son'."
      }
    ],
    "pitfalls": [
      "Winning the war or resolving the conflict peacefully."
    ],
    "saveVariables": [
      "RiziaDLC.War_Pales_Defeat"
    ]
  },
  "Rizia_Executions": {
    "achievementId": "Rizia_Executions",
    "achievementName": "Completely Justified",
    "game": "Rizia",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Turn 8 & Turn 10",
      "sceneTitle": "Authorizing Capital Punishment for Traitors",
      "sceneFile": "Rizia_Turn 10_COUNCILOR RESIGNATION CHECKS.md"
    },
    "prerequisites": [
      "Sign death warrants and authorize public or private executions of high-ranking traitors convicted of high crimes against the Crown."
    ],
    "dialogueSteps": [
      {
        "speaker": "King Romus Toras",
        "context": "Turn 10: Signing the judicial sentencing decrees",
        "recommendedChoice": "Confirm the death penalty sentences, declaring the executions completely justified for the security of Rizia.",
        "notes": "Executes convicted conspirators."
      }
    ],
    "pitfalls": [
      "Issuing universal royal pardons."
    ],
    "saveVariables": [
      "RiziaDLC.Executions_Authorized"
    ]
  },
  "Rizia_SordVictory": {
    "achievementId": "Rizia_SordVictory",
    "achievementName": "Not So Fun Anymore",
    "game": "Rizia",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Turn 9 & Turn 10",
      "sceneTitle": "Supporting President Anton Rayne in the War Against Rumburg",
      "sceneFile": "Rizia_Turn 2_FPnT_SordlandTradeVisit.md"
    },
    "prerequisites": [
      "Import Sordish save data where President Anton Rayne defeats the Kingdom of Rumburg in the Sordish-Rumburgian War."
    ],
    "dialogueSteps": [
      {
        "speaker": "King Romus Toras",
        "context": "Turn 10: Receiving international dispatches from Thornbourgh",
        "recommendedChoice": "Read the news of Sordland's triumphant victory over Queen Beatrice, chuckling that Rumburg's bullying is 'Not so fun anymore'.",
        "notes": "Celebrates Sordland's victory over your mutual rival."
      }
    ],
    "pitfalls": [
      "Sordland losing the war against Rumburg."
    ],
    "saveVariables": [
      "RiziaDLC.Sordland_Won_War"
    ]
  },
  "Rizia_ReformOrDie": {
    "achievementId": "Rizia_ReformOrDie",
    "achievementName": "Reform Or Die",
    "game": "Rizia",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Turn 9 & Turn 10",
      "sceneTitle": "Conceding Democratic Reforms Under Revolutionary Pressure",
      "sceneFile": "Rizia_Turn 10_Reform_ConstitutionSigning.md"
    },
    "prerequisites": [
      "Face imminent popular revolution, riots, and strikes across the cities, and sign sweeping constitutional reforms to save the throne."
    ],
    "dialogueSteps": [
      {
        "speaker": "King Romus Toras",
        "context": "Turn 10: Signing the emergency reform compromise with Manus Sazon",
        "recommendedChoice": "Sign the democratic constitution, recognizing that the monarchy must reform or die.",
        "notes": "Preserves the monarchy as a constitutional crown."
      }
    ],
    "pitfalls": [
      "Stubbornly resisting all reforms until overthrown."
    ],
    "saveVariables": [
      "RiziaDLC.Reform_Or_Die_Signed"
    ]
  },
  "Rizia_DividedRizia": {
    "achievementId": "Rizia_DividedRizia",
    "achievementName": "Tattered Kingdom",
    "game": "Rizia",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Turn 10",
      "sceneTitle": "Provincial Fragmentation and Noble Factionalism",
      "sceneFile": "Rizia_Turn 10_COUNCILOR RESIGNATION CHECKS.md"
    },
    "prerequisites": [
      "Allow regional resentment, noble rivalries, and factional tension to tear the realm into deep division."
    ],
    "dialogueSteps": [
      {
        "speaker": "King Romus Toras",
        "context": "Turn 10: Looking upon a fractured realm",
        "recommendedChoice": "Acknowledge the tattered, divided state of the kingdom as regional lords defy central decree.",
        "notes": "Concludes your reign over a fractured nation."
      }
    ],
    "pitfalls": [
      "Achieving high national unity and central control."
    ],
    "saveVariables": [
      "RiziaDLC.Divided_Kingdom"
    ]
  },
  "Rizia_RumVassal": {
    "achievementId": "Rizia_RumVassal",
    "achievementName": "Long Arm of Tzarborough",
    "game": "Rizia",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Turn 8 & Turn 10",
      "sceneTitle": "Total Economic and Military Subservience to Queen Beatrice",
      "sceneFile": "Rizia_Turn 9_FPnT_GRACERumburgMeeting.md"
    },
    "prerequisites": [
      "Surrender foreign policy and mineral rights to Queen Beatrice, transforming Rizia into a compliant client state of Rumburg."
    ],
    "dialogueSteps": [
      {
        "speaker": "Beatrice Livingstone",
        "context": "Turn 9: Imperial summit in Thornbourgh",
        "recommendedChoice": "Bending the knee, accept all unequal economic conditions and place Rizia under the long arm of Thornbourgh.",
        "notes": "Makes Rizia a de facto vassal of Rumburg."
      }
    ],
    "pitfalls": [
      "Maintaining sovereign independence or defying Queen Beatrice."
    ],
    "saveVariables": [
      "RiziaDLC.Rumburg_Vassal"
    ]
  },
  "Rizia_GreenKingdom": {
    "achievementId": "Rizia_GreenKingdom",
    "achievementName": "The Green Kingdom",
    "game": "Rizia",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Turn 6 & Turn 10",
      "sceneTitle": "Environmental Conservation and Renewable Energy Expansion",
      "sceneFile": "Rizia_Turn 10_DECLARATION_DECLARATION Conversation.md"
    },
    "prerequisites": [
      "Pass environmental conservation decrees, protect pristine coastal waters, fund renewable solar and hydroelectric projects, and eliminate toxic pollution."
    ],
    "dialogueSteps": [
      {
        "speaker": "King Romus Toras",
        "context": "Turn 10: Environmental and sustainability debrief",
        "recommendedChoice": "Inaugurate the nationwide clean energy grid and celebrate Rizia as the Green Kingdom of Merkopa.",
        "notes": "Unlocks The Green Kingdom for peak environmental stewardship."
      }
    ],
    "pitfalls": [
      "Heavily polluting rivers and marine reserves with reckless extraction."
    ],
    "saveVariables": [
      "RiziaDLC.Green_Kingdom_Achieved"
    ]
  },
  "Rizia_ReturnOfTheKing": {
    "achievementId": "Rizia_ReturnOfTheKing",
    "achievementName": "Return of the King",
    "game": "Rizia",
    "category": "Tactical / Endgame",
    "timeline": {
      "turn": "Turn 10",
      "sceneTitle": "Reclaiming the Royal Throne After Overcoming Treason",
      "sceneFile": "Rizia_Turn 10_DECLARATION_DECLARATION Conversation.md"
    },
    "prerequisites": [
      "Survive an attempted coup or temporary displacement by mobilizing loyalist troops, storming the capital, and reclaiming the throne."
    ],
    "dialogueSteps": [
      {
        "speaker": "King Romus Toras",
        "context": "Turn 10: Retaking Palas Rezna at the head of loyalist forces",
        "recommendedChoice": "Mount the throne room dais, take back the golden crown, and proclaim the glorious return of the King.",
        "notes": "Triumphantly reclaims royal power."
      }
    ],
    "pitfalls": [
      "Giving up power or fleeing into permanent exile."
    ],
    "saveVariables": [
      "RiziaDLC.Return_Of_The_King"
    ]
  }
};
