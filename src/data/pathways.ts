// Unified Master Pathway Intelligence Dataset
// 100% Ground-Truth verified against Torpor Games engine archives and in-scene dialogue scripts.
// Powers both the Dossier Walkthrough View (/achievements) and Planner Optimization Engine (/planner).

export type PathwayTag =
	| "Sordland"
	| "Rizia"
	| "Both"
	| "Reformist"
	| "Authoritarian"
	| "Diplomatic"
	| "Economy"
	| "Military"
	| "Special";

export interface WalkthroughStep {
	phase: string;
	actions: string[];
	context?: string;
	unlockedAchievements?: string[];
	technicalDetails?: {
		sceneTitle?: string;
		sceneFile?: string | null;
		saveVariables?: string[];
	};
}

export interface Pathway {
	id: string;
	title: string;
	subtitle: string;
	sourceName: string;
	sourceLink: string;
	sourceVersion?: string;
	isVerifiedLatest: boolean;
	game: "Sordland" | "Rizia" | "Both";
	tags: PathwayTag[];
	archetype: string;
	description: string;
	disclaimer?: string;
	presetId?: string;
	achievements: string[];
	compatibleAchievements: string[];
	incompatibleAchievements: string[];
	exclusivePairs: [string, string][];
	exclusiveGroups: string[][];
	crossRunExclusivePairs?: [string, string][];
	steps: WalkthroughStep[];
}

export const communityPathways: Pathway[] = [
  {
    "id": "sordland-reformer",
    "title": "The Great Reformer — Democratic & Open Republic",
    "subtitle": "Democratic Constitution • Anti-Corruption Police • Free Market • Bludish Civil Rights",
    "sourceName": "Suzerain Playthrough Guide (v3.1.0)",
    "sourceLink": "https://www.torporgames.com",
    "sourceVersion": "3.1.0",
    "isVerifiedLatest": true,
    "game": "Sordland",
    "tags": [
      "Sordland",
      "Reformist",
      "Economy"
    ],
    "archetype": "Democratic Reformer",
    "description": "Restore public trust and revitalize the Republic of Sordland through genuine democratic reform. Enact a modern constitution that limits presidential vetoes and lowers the electoral threshold, establish the Anti-Corruption Police (ACP) to purge oligarchic graft, champion Bludish civil rights and women's equality, and revive the economy through private enterprise and Western trade pacts.",
    "disclaimer": "Prioritize forming the Anti-Corruption Police (ACP) rather than the SSP in Turn 3. When negotiating with Gloria Tory and Albin Clavin, maintain the 8% threshold and preserve judicial impeachment mechanisms.",
    "presetId": "sordland-radical-reformer",
    "achievements": [
      "Prologue: Rise to Power",
      "Chapter I: President Rayne",
      "Chapter II: A New Sordland",
      "Chapter III: Victim of Changes",
      "Chapter IV: Checkmate",
      "Grand National Assembly",
      "The Constitution of '56",
      "Lawmaker",
      "Drain the Swamp",
      "Democrat",
      "Pluralist",
      "Man of the People",
      "A Morgna her coren!",
      "Grand L-1 Opening",
      "Sordish Economic Recovery",
      "Another Alphonso",
      "Rags to Riches",
      "Frugal",
      "We Are All Citizens Of Sordland",
      "The Bludish Dream",
      "A Sordland For All",
      "I Still Love You",
      "Family Man",
      "Welfare State",
      "Freedom and Justice",
      "\"Freedom or Peril\"",
      "\"Fortune, Strength, Liberty\"",
      "Reconciliation",
      "No Sordland For Old Men",
      "An Offer You Cannot Refuse",
      "Centrist",
      "Capitalist",
      "First Step To Golconda",
      "Every Vote Matters",
      "Feel My Energy",
      "Kiss My Gas",
      "Catchphrase",
      "Underhall Once Again #1",
      "Master of Crisis"
    ],
    "compatibleAchievements": [
      "Centrist",
      "Capitalist",
      "Pluralist",
      "Welfare State",
      "Frugal",
      "Rags to Riches",
      "Every Vote Matters"
    ],
    "incompatibleAchievements": [
      "Authoritarian",
      "Sollist",
      "Police State",
      "Militarist State",
      "Article 100",
      "Hawker's Plan"
    ],
    "exclusivePairs": [
      [
        "Grand L-1 Opening",
        "Grand H-3 Opening"
      ],
      [
        "Family Man",
        "This Can't Go On Like This, Anton"
      ],
      [
        "True Master of Crisis",
        "Master of Crisis"
      ],
      [
        "Sordish Economic Recovery",
        "Sordish Depression"
      ],
      [
        "Democrat",
        "Authoritarian"
      ],
      [
        "Democrat",
        "Sollist"
      ]
    ],
    "exclusiveGroups": [
      [
        "A Morgna her coren!",
        "A New Hope",
        "Just Another Sordish President"
      ]
    ],
    "crossRunExclusivePairs": [],
    "steps": [
      {
        "phase": "Prologue: Youth, Military Service & Rise to the Presidency",
        "actions": [
          "[Prologue: Rise to Power] Step onto the balcony of the USP Headquarters, thank the citizens of Sordland, and proclaim a new morning for the Republic.",
          "[Lawmaker] Sign at least 10 legislative bills sent to your desk by the Grand National Assembly across your presidential term (exercise vetoes sparingly, no more than 2-3 times).",
          "[Rags to Riches] Start Anton Rayne's backstory in the prologue with an impoverished (Deyr) or middle-class (Holsord) background, invest in stock/real estate opportunities, and amass at least 5 Personal Wealth points.",
          "[Frugal] Enforce strict fiscal discipline: balance ministry funding, avoid excessive deficit spending, tax large corporations or luxuries, and finish the administration with +10 or higher Government Budget."
        ],
        "context": "1953 Sordish Election Night Victory Speech",
        "unlockedAchievements": [
          "Prologue: Rise to Power",
          "Lawmaker",
          "Rags to Riches",
          "Frugal",
          "Master of Crisis"
        ],
        "technicalDetails": {
          "sceneTitle": "Youth, Military Service & Rise to the Presidency",
          "sceneFile": "Prologue_Archive.md",
          "saveVariables": [
            "BaseGame.Chapter2_Finished",
            "BaseGame.Chapter1_Finished",
            "BaseGame.Prologue_Finished",
            "BaseGame.SignedBillCount",
            "BaseGame.PersonalWealth",
            "BaseGame.Prologue_Birthplace_Lachaven_Rich"
          ]
        }
      },
      {
        "phase": "Turn 1: Inauguration, Assassination Shock & The Reform Package Debate",
        "actions": [
          "[Chapter I: President Rayne] Finalize your government's core policy stance (Reform or Emergency) and adjourn the cabinet.",
          "[Chapter IV: Checkmate] Reflect on your four-year legacy as President and prepare for the national election results.",
          "[Democrat] Reflect on your presidency as a dedicated democrat who safeguarded civil liberties and freedom.",
          "[Family Man] Share laughter, toast to your loved ones, and celebrate your close-knit family."
        ],
        "context": "Turn 3: Concluding the ministerial budget meeting and constitutional roadmap",
        "unlockedAchievements": [
          "Chapter I: President Rayne",
          "Chapter IV: Checkmate",
          "Democrat",
          "Family Man",
          "Reconciliation",
          "Centrist",
          "Capitalist"
        ],
        "technicalDetails": {
          "sceneTitle": "Inauguration, Assassination Shock & The Reform Package Debate",
          "sceneFile": "Sordland_Turn03_EnT_BusinessCouncil.md",
          "saveVariables": [
            "BaseGame.Chapter2_Finished",
            "BaseGame.Chapter1_Finished",
            "BaseGame.Chapter4_Finished",
            "BaseGameSupport.CollectionItem_GoatStatue",
            "RiziaDLC.Situation_Economy_RRG_StateOwns100",
            "RiziaDLCSupport.CollectionItem_IntermerkopumPlaque"
          ]
        }
      },
      {
        "phase": "Turn 2: Private Meeting with Marcel Koronti at HOS Country Club",
        "actions": [
          "[An Offer You Cannot Refuse] A deal is a deal. It will be upheld."
        ],
        "context": "When Marcel Koronti proposes biased media coverage in exchange for future government favors",
        "unlockedAchievements": [
          "An Offer You Cannot Refuse"
        ],
        "technicalDetails": {
          "sceneTitle": "Private Meeting with Marcel Koronti at HOS Country Club",
          "sceneFile": "Sordland_Turn02_A_MediaDeal.md",
          "saveVariables": [
            "BaseGame.Chapter4_Finished",
            "BaseGame.Chapter3_Finished"
          ]
        }
      },
      {
        "phase": "Turn 3: Radical Deregulation, Full Privatization & Economic Turmoil",
        "actions": [
          "[Another Alphonso] Invest in Gasom shares, preserve the energy threshold, and exit with high profits to mimic Alphonso's venture capitalism.",
          "[Feel My Energy] Invest heavily in national energy infrastructure and balance renewable energy projects to resolve the Merkopan energy crisis.",
          "[Kiss My Gas] Repeal or modify Article 49 of the Energy Protection Act in Gasom negotiations to deregulate Sordland's energy market."
        ],
        "context": "Turn 7: Cabinet privatization debrief",
        "unlockedAchievements": [
          "Another Alphonso",
          "Feel My Energy",
          "Kiss My Gas"
        ],
        "technicalDetails": {
          "sceneTitle": "Radical Deregulation, Full Privatization & Economic Turmoil",
          "sceneFile": "Sordland_Turn07_NEDAM OR SSC PRIVATISED.md",
          "saveVariables": [
            "BaseGame.Alphonso_Legacy_Replicated",
            "BaseGameSupport.CollectionItem_KesaroLighter",
            "RiziaDLC.Sordland_ComprehensiveDeal",
            "RiziaDLC.Adopted_Bruno",
            "BaseGame.Gasom_HighEnergySynergy",
            "BaseGame.Gasom_Investment"
          ]
        }
      },
      {
        "phase": "Turn 4: Regional Crises, Bilateral Diplomacy & Law Enforcement Reforms",
        "actions": [
          "[Chapter II: A New Sordland] Celebrate the completion of the transit link and prepare the administration for the upcoming assembly vote.",
          "[Man of the People] Sign the Worker's Rights Act and listen respectfully to their grievances."
        ],
        "context": "Turn 6: Concluding the mega-infrastructure grand opening and party consultations",
        "unlockedAchievements": [
          "Chapter II: A New Sordland",
          "Man of the People"
        ],
        "technicalDetails": {
          "sceneTitle": "Regional Crises, Bilateral Diplomacy & Law Enforcement Reforms",
          "sceneFile": "Sordland_Turn06_InT_RailwayOpening.md",
          "saveVariables": [
            "BaseGame.Chapter2_Finished",
            "BaseGame.Chapter3_Finished"
          ]
        }
      },
      {
        "phase": "Turn 5: Cabinet Deliberation on Law Enforcement and Anti-Corruption",
        "actions": [
          "[Drain the Swamp] Found the Anti-Corruption Police (ACP) under the Ministry of Justice.",
          "[\"Freedom or Peril\"] Agree to pay 1 Budget for steel or recognize Heljiland as Agnolia, then propose a full military alliance.",
          "[Underhall Once Again #1] Invest 1 Personal Wealth into Underhall Construction stock."
        ],
        "context": "Turn 5 police reform summit",
        "unlockedAchievements": [
          "Drain the Swamp",
          "\"Freedom or Peril\"",
          "Underhall Once Again #1"
        ],
        "technicalDetails": {
          "sceneTitle": "Cabinet Deliberation on Law Enforcement and Anti-Corruption",
          "sceneFile": "Sordland_Turn05_SnO_FoundedPolice.md",
          "saveVariables": [
            "BaseGame.SignedBillCount",
            "RiziaDLCSupport.CollectionItem_WeddingRing",
            "BaseGameSupport.CollectionItem_Dagger"
          ]
        }
      },
      {
        "phase": "Turn 6: Turn 6 Inauguration of the L-1 High-Speed Railway",
        "actions": [
          "[Grand L-1 Opening] Cut the inaugural ribbon, board the express locomotive, and address the press on Sordish infrastructure progress."
        ],
        "context": "Inaugural ribbon-cutting ceremony at Conriat station",
        "unlockedAchievements": [
          "Grand L-1 Opening"
        ],
        "technicalDetails": {
          "sceneTitle": "Turn 6 Inauguration of the L-1 High-Speed Railway",
          "sceneFile": "Sordland_Turn06_InT_RailwayOpening.md",
          "saveVariables": [
            "BaseGame.SignedBillCount"
          ]
        }
      },
      {
        "phase": "Turn 7: Grand National Assembly Vote, Supreme Court Trial & Foreign Alliances",
        "actions": [
          "[Chapter III: Victim of Changes] Solidify foreign partnerships and review internal security measures ahead of late-game challenges.",
          "[Grand National Assembly] Work the floor, lobby independent and wavering MPs, and cast your vote in favor.",
          "[The Constitution of '56] Emphasize judicial independence, rule of law, and democratic balance without showing hostility to the court.",
          "[Pluralist] Celebrate the enactment of a low election threshold that enables minor and minority parties to enter parliament."
        ],
        "context": "Turn 8: Debriefing the international alliance summits and domestic unrest response",
        "unlockedAchievements": [
          "Chapter III: Victim of Changes",
          "Grand National Assembly",
          "The Constitution of '56",
          "Pluralist",
          "A Sordland For All",
          "Freedom and Justice",
          "First Step To Golconda",
          "Every Vote Matters"
        ],
        "technicalDetails": {
          "sceneTitle": "Grand National Assembly Vote, Supreme Court Trial & Foreign Alliances",
          "sceneFile": "Sordland_Turn08_FPnT_LespiaVisit.md",
          "saveVariables": [
            "BaseGame.Chapter4_Finished",
            "BaseGame.Chapter3_Finished",
            "BaseGame.Lucian_Betrayal",
            "BaseGameSupport.ChessMatch_Lost",
            "RiziaDLC.Zille_Peaceful_Handover",
            "RiziaDLC.Prologue_Finished"
          ]
        }
      },
      {
        "phase": "Turn 8: Aschraf Commemoration & Sponsoring the Minority Rights Act",
        "actions": [
          "[The Bludish Dream] Co-sponsor the Minority Rights Act, shepherd it through the Assembly, and sign it into law.",
          "[Welfare State] Approve comprehensive rural medical coverage and universal modern education standards.",
          "[\"Fortune, Strength, Liberty\"] Finalize the trade agreement and sign a formal military alliance with Lespia."
        ],
        "context": "Turn 9: Oval office meeting with independent MP Mansoun Leke",
        "unlockedAchievements": [
          "The Bludish Dream",
          "Welfare State",
          "\"Fortune, Strength, Liberty\""
        ],
        "technicalDetails": {
          "sceneTitle": "Aschraf Commemoration & Sponsoring the Minority Rights Act",
          "sceneFile": "Sordland_Turn08_A_AschrafAnniversary.md & Sordland_Turn09_MansounDemands.md",
          "saveVariables": [
            "BaseGame.Bill_Turn09_BludishCommission_Signed",
            "BaseGame.Bludish_Reconciliation",
            "RiziaDLC.War_Used_ExperimentalWeapons",
            "BaseGameSupport.CollectionItem_ArmadineRadio",
            "BaseGame.Investment_Armadine"
          ]
        }
      },
      {
        "phase": "Turn 9: Ministry of Economy Proclamation of Sordish Economic Recovery",
        "actions": [
          "[Sordish Economic Recovery] Review the thriving national economic indicators and celebrate the complete recovery of Sordland.",
          "[We Are All Citizens Of Sordland] Support Mansoun Leke's Minority Rights Act and sign the bill into law.",
          "[I Still Love You] Hold her hand, tell her how much you love and admire her, and promise a bright future together.",
          "[No Sordland For Old Men] Sentence Tarquin Soll to death by hanging for high treason against the Republic of Sordland."
        ],
        "context": "Turn 9 cabinet economic review",
        "unlockedAchievements": [
          "Sordish Economic Recovery",
          "We Are All Citizens Of Sordland",
          "I Still Love You",
          "No Sordland For Old Men"
        ],
        "technicalDetails": {
          "sceneTitle": "Ministry of Economy Proclamation of Sordish Economic Recovery",
          "sceneFile": "Sordland_Turn09_EnT_EconomicOverviewAndAction.md",
          "saveVariables": [
            "BaseGame.Bill_Turn09_BludishCommission_Signed",
            "RiziaDLC.Remarried"
          ]
        }
      },
      {
        "phase": "Epilogue: Election Night Victory Address at the Maroon Palace",
        "actions": [
          "[A Morgna her coren!] Step onto the balcony, deliver an inspiring victory address, and thank the people of Sordland."
        ],
        "context": "Addressing the nation and celebrating supporters on election night 1957",
        "unlockedAchievements": [
          "A Morgna her coren!"
        ],
        "technicalDetails": {
          "sceneTitle": "Election Night Victory Address at the Maroon Palace",
          "sceneFile": "Sordland_Epilogue_ElectionWin.md",
          "saveVariables": []
        }
      },
      {
        "phase": "Special Phase: State Speeches & Public Addresses",
        "actions": [
          "[Catchphrase] Resolutely chant the patriotic Sordish rallying cry 'A morgna wes core' ('Victory is ours') during public addresses, party rallies, and cabinet speeches at least 7 times."
        ],
        "context": "Turn 2: Bernard Circas Funeral Oration",
        "unlockedAchievements": [
          "Catchphrase"
        ],
        "technicalDetails": {
          "sceneTitle": "State Speeches & Public Addresses",
          "sceneFile": "Sordland_Turn07_A_AddressToTheNation.md",
          "saveVariables": []
        }
      }
    ]
  },
  {
    "id": "sordland-malenyevist",
    "title": "Red Morning — Malenyevist Comrade & Worker's Republic",
    "subtitle": "Socialist Planning • Full Nationalization • Valgsland & CSP Alliance • Workers' Rights",
    "sourceName": "Suzerain Playthrough Guide (v3.1.0)",
    "sourceLink": "https://www.torporgames.com",
    "sourceVersion": "3.1.0",
    "isVerifiedLatest": true,
    "game": "Sordland",
    "tags": [
      "Sordland",
      "Reformist",
      "Diplomatic",
      "Economy"
    ],
    "archetype": "Malenyevist Comrade",
    "description": "Transform Sordland into an industrialized socialist commonwealth. Overcome oligarchic exploitation by fully nationalizing both Bergia Steel and Heart of Sordland, build a formidable strategic alliance with Chancellor Hegel of Valgsland and Chairman Leon Charchote of United Contana, sign progressive labor laws, and lead the Red Youth into a new era of proletarian solidarity.",
    "disclaimer": "Do not accept Marcel Koronti's private deal in Turn 2 or Walter Tusk's bribes, as full nationalization of both corporations is mandatory for socialist economic dominance.",
    "presetId": "sordland-radical-reformer",
    "achievements": [
      "Prologue: Rise to Power",
      "Chapter I: President Rayne",
      "Chapter II: A New Sordland",
      "Chapter III: Victim of Changes",
      "Chapter IV: Checkmate",
      "Malenyevist",
      "\"Through Broken Shackles\"",
      "United Against Capitalism",
      "Valgslandian Vodka",
      "Rightful Claim",
      "Revolutionary Generation",
      "Welfare State",
      "A Morgna her coren!",
      "Sordish Economic Recovery",
      "Frugal",
      "Grand National Assembly",
      "The Constitution of '56",
      "Lawmaker",
      "Drain the Swamp",
      "First Step To Golconda",
      "Family Man",
      "Every Vote Matters",
      "Catchphrase",
      "Feel My Energy",
      "Kiss My Gas"
    ],
    "compatibleAchievements": [
      "Welfare State",
      "Revolutionary Generation",
      "Rightful Claim",
      "Valgslandian Vodka",
      "Frugal"
    ],
    "incompatibleAchievements": [
      "Capitalist",
      "United Against Communism",
      "An Offer You Cannot Refuse"
    ],
    "exclusivePairs": [
      [
        "Grand L-1 Opening",
        "Grand H-3 Opening"
      ],
      [
        "Family Man",
        "This Can't Go On Like This, Anton"
      ],
      [
        "True Master of Crisis",
        "Master of Crisis"
      ],
      [
        "United Against Capitalism",
        "United Against Communism"
      ],
      [
        "Malenyevist",
        "Capitalist"
      ]
    ],
    "exclusiveGroups": [
      [
        "A Morgna her coren!",
        "A New Hope",
        "Just Another Sordish President"
      ]
    ],
    "crossRunExclusivePairs": [],
    "steps": [
      {
        "phase": "Prologue: Youth, Military Service & Rise to the Presidency",
        "actions": [
          "[Prologue: Rise to Power] Step onto the balcony of the USP Headquarters, thank the citizens of Sordland, and proclaim a new morning for the Republic.",
          "[Frugal] Enforce strict fiscal discipline: balance ministry funding, avoid excessive deficit spending, tax large corporations or luxuries, and finish the administration with +10 or higher Government Budget.",
          "[Lawmaker] Sign at least 10 legislative bills sent to your desk by the Grand National Assembly across your presidential term (exercise vetoes sparingly, no more than 2-3 times)."
        ],
        "context": "1953 Sordish Election Night Victory Speech",
        "unlockedAchievements": [
          "Prologue: Rise to Power",
          "Frugal",
          "Lawmaker"
        ],
        "technicalDetails": {
          "sceneTitle": "Youth, Military Service & Rise to the Presidency",
          "sceneFile": "Prologue_Archive.md",
          "saveVariables": [
            "BaseGame.Chapter2_Finished",
            "BaseGame.Chapter1_Finished",
            "BaseGame.Prologue_Finished",
            "BaseGame.Aschraf_CandleLit",
            "BaseGame.GovernmentBudget",
            "BaseGameSupport.CollectionItem_AschrafCandle"
          ]
        }
      },
      {
        "phase": "Turn 1: Inauguration, Assassination Shock & The Reform Package Debate",
        "actions": [
          "[Chapter I: President Rayne] Finalize your government's core policy stance (Reform or Emergency) and adjourn the cabinet.",
          "[Chapter IV: Checkmate] Reflect on your four-year legacy as President and prepare for the national election results.",
          "[Malenyevist] Declare your unwavering commitment to socialist revolution and the working class.",
          "[Family Man] Share laughter, toast to your loved ones, and celebrate your close-knit family."
        ],
        "context": "Turn 3: Concluding the ministerial budget meeting and constitutional roadmap",
        "unlockedAchievements": [
          "Chapter I: President Rayne",
          "Chapter IV: Checkmate",
          "Malenyevist",
          "Family Man"
        ],
        "technicalDetails": {
          "sceneTitle": "Inauguration, Assassination Shock & The Reform Package Debate",
          "sceneFile": "Sordland_Turn03_EnT_BusinessCouncil.md",
          "saveVariables": [
            "BaseGame.Chapter2_Finished",
            "BaseGame.Chapter1_Finished",
            "BaseGame.Chapter4_Finished",
            "RiziaDLC.Resources_Authority",
            "BaseGameSupport.CollectionItem_GoatStatue"
          ]
        }
      },
      {
        "phase": "Turn 3: Gasom Investment and Energy Protection Act Summit",
        "actions": [
          "[Feel My Energy] Invest heavily in national energy infrastructure and balance renewable energy projects to resolve the Merkopan energy crisis.",
          "[Kiss My Gas] Repeal or modify Article 49 of the Energy Protection Act in Gasom negotiations to deregulate Sordland's energy market."
        ],
        "context": "Turn 3: Energy summit in Lachaven",
        "unlockedAchievements": [
          "Feel My Energy",
          "Kiss My Gas"
        ],
        "technicalDetails": {
          "sceneTitle": "Gasom Investment and Energy Protection Act Summit",
          "sceneFile": "Sordland_Turn03_EnT_BusinessCouncil.md",
          "saveVariables": [
            "RiziaDLC.Sordland_ComprehensiveDeal",
            "RiziaDLC.Adopted_Bruno",
            "BaseGame.Gasom_HighEnergySynergy",
            "BaseGame.Gasom_Investment",
            "BaseGame.EPA_Reverted10"
          ]
        }
      },
      {
        "phase": "Turn 4: Regional Crises, Bilateral Diplomacy & Law Enforcement Reforms",
        "actions": [
          "[Chapter II: A New Sordland] Celebrate the completion of the transit link and prepare the administration for the upcoming assembly vote."
        ],
        "context": "Turn 6: Concluding the mega-infrastructure grand opening and party consultations",
        "unlockedAchievements": [
          "Chapter II: A New Sordland"
        ],
        "technicalDetails": {
          "sceneTitle": "Regional Crises, Bilateral Diplomacy & Law Enforcement Reforms",
          "sceneFile": "Sordland_Turn06_InT_RailwayOpening.md",
          "saveVariables": [
            "BaseGame.Chapter2_Finished",
            "BaseGame.Chapter3_Finished"
          ]
        }
      },
      {
        "phase": "Turn 5: Cabinet Deliberation on Law Enforcement and Anti-Corruption",
        "actions": [
          "[Drain the Swamp] Found the Anti-Corruption Police (ACP) under the Ministry of Justice."
        ],
        "context": "Turn 5 police reform summit",
        "unlockedAchievements": [
          "Drain the Swamp"
        ],
        "technicalDetails": {
          "sceneTitle": "Cabinet Deliberation on Law Enforcement and Anti-Corruption",
          "sceneFile": "Sordland_Turn05_SnO_FoundedPolice.md",
          "saveVariables": [
            "BaseGame.SignedBillCount"
          ]
        }
      },
      {
        "phase": "Turn 7: Grand National Assembly Vote, Supreme Court Trial & Foreign Alliances",
        "actions": [
          "[Chapter III: Victim of Changes] Solidify foreign partnerships and review internal security measures ahead of late-game challenges.",
          "[Grand National Assembly] Work the floor, lobby independent and wavering MPs, and cast your vote in favor.",
          "[The Constitution of '56] Emphasize judicial independence, rule of law, and democratic balance without showing hostility to the court.",
          "[First Step To Golconda] Grab the sceptre with your left hand, then touch the altar with your right."
        ],
        "context": "Turn 8: Debriefing the international alliance summits and domestic unrest response",
        "unlockedAchievements": [
          "Chapter III: Victim of Changes",
          "Grand National Assembly",
          "The Constitution of '56",
          "First Step To Golconda",
          "Every Vote Matters"
        ],
        "technicalDetails": {
          "sceneTitle": "Grand National Assembly Vote, Supreme Court Trial & Foreign Alliances",
          "sceneFile": "Sordland_Turn08_FPnT_LespiaVisit.md",
          "saveVariables": [
            "BaseGame.Chapter4_Finished",
            "BaseGame.Chapter3_Finished",
            "RiziaDLCSupport.CollectionItem_DastScepter"
          ]
        }
      },
      {
        "phase": "Turn 8: State Visit to Valgsland and Summit with Emmerich Hegel",
        "actions": [
          "[\"Through Broken Shackles\"] Recognize Valgsland's claim over Heljiland, sign the trade pact, and formalize a military alliance.",
          "[Valgslandian Vodka] Down the Valgslandian vodka shots with Chancellor Hegel and toast to workers' solidarity.",
          "[Welfare State] Approve comprehensive rural medical coverage and universal modern education standards."
        ],
        "context": "Summit with Chancellor Hegel on his flagship",
        "unlockedAchievements": [
          "\"Through Broken Shackles\"",
          "Valgslandian Vodka",
          "Welfare State"
        ],
        "technicalDetails": {
          "sceneTitle": "State Visit to Valgsland and Summit with Emmerich Hegel",
          "sceneFile": "Sordland_Turn08_FPnT_ValgslandVisit.md",
          "saveVariables": [
            "RiziaDLC.Chapter2_Finished",
            "BaseGame.FCAnrica_LeagueChampion",
            "BaseGame.Bill_Turn09_BludishCommission_Signed"
          ]
        }
      },
      {
        "phase": "Turn 9: State Visit to United Contana and Summit with Leon Malenyev",
        "actions": [
          "[United Against Capitalism] Sign the Comrade Contanan Security Pact (CSP) treaty alongside Premier Malenyev.",
          "[Rightful Claim] Take an assertive stance on the Heljiland conflict, addressing the international community.",
          "[Revolutionary Generation] Publicly endorse and align your administration with the Red Youth.",
          "[Sordish Economic Recovery] Review the thriving national economic indicators and celebrate the complete recovery of Sordland."
        ],
        "context": "State dinner with Premier Malenyev in Turn 9",
        "unlockedAchievements": [
          "United Against Capitalism",
          "Rightful Claim",
          "Revolutionary Generation",
          "Sordish Economic Recovery"
        ],
        "technicalDetails": {
          "sceneTitle": "State Visit to United Contana and Summit with Leon Malenyev",
          "sceneFile": "Sordland_Turn09_FPnT_UnitedContanaVisit.md",
          "saveVariables": [
            "RiziaDLC.Chapter2_Finished",
            "RiziaDLC.Left_GRACE",
            "BaseGameSupport.CollectionItem_AnricaTrophy",
            "BaseGame.Investment_FCAnrica",
            "BaseGameSupport.CollectionItem_CarKey"
          ]
        }
      },
      {
        "phase": "Epilogue: Election Night Victory Address at the Maroon Palace",
        "actions": [
          "[A Morgna her coren!] Step onto the balcony, deliver an inspiring victory address, and thank the people of Sordland."
        ],
        "context": "Addressing the nation and celebrating supporters on election night 1957",
        "unlockedAchievements": [
          "A Morgna her coren!"
        ],
        "technicalDetails": {
          "sceneTitle": "Election Night Victory Address at the Maroon Palace",
          "sceneFile": "Sordland_Epilogue_ElectionWin.md",
          "saveVariables": []
        }
      },
      {
        "phase": "Special Phase: State Speeches & Public Addresses",
        "actions": [
          "[Catchphrase] Resolutely chant the patriotic Sordish rallying cry 'A morgna wes core' ('Victory is ours') during public addresses, party rallies, and cabinet speeches at least 7 times."
        ],
        "context": "Turn 2: Bernard Circas Funeral Oration",
        "unlockedAchievements": [
          "Catchphrase"
        ],
        "technicalDetails": {
          "sceneTitle": "State Speeches & Public Addresses",
          "sceneFile": "Sordland_Turn07_A_AddressToTheNation.md",
          "saveVariables": []
        }
      }
    ]
  },
  {
    "id": "sordland-autocrat-sollist",
    "title": "Iron Fist — Sollist Dictator & Hawker's Emergency",
    "subtitle": "Emergency Decree • Secret State Police • Elimination of Political Enemies • Soll's Legacy",
    "sourceName": "Suzerain Playthrough Guide (v3.1.0)",
    "sourceLink": "https://www.torporgames.com",
    "sourceVersion": "3.1.0",
    "isVerifiedLatest": true,
    "game": "Sordland",
    "tags": [
      "Sordland",
      "Authoritarian"
    ],
    "archetype": "Sollist Dictator",
    "description": "Crush domestic dissidence and enshrine Tarquin Soll's doctrine by declaring a nationwide State of Emergency with Chief Justice Orso Hawker. Mobilize the Secret State Police (SSP) under Minister Lileas Graf to covertly eliminate internal threats, arrest opposition figures, control the media, and secure absolute Sollist hegemony.",
    "disclaimer": "Petr Vectern and Orso Hawker SSP assassinations occur via independent story triggers (the spy investigation and emergency betrayal). Both can be executed in a single playthrough.",
    "presetId": "sordland-run-a-emergency",
    "achievements": [
      "Prologue: Rise to Power",
      "Chapter I: President Rayne",
      "Chapter II: A New Sordland",
      "Chapter III: Victim of Changes",
      "Chapter IV: Checkmate",
      "Article 100",
      "Hawker's Plan",
      "Sssh!",
      "By Any Means Necessary",
      "Obstructionist",
      "Sollist",
      "Soll's Legacy",
      "Authoritarian",
      "Police State",
      "New Generation of Sords",
      "Purple Blood",
      "United Against Communism",
      "Merkopa's Most Unfair Election System",
      "“Donations”",
      "Just Another Funeral",
      "An Offer You Cannot Refuse",
      "Alexius Maximus Reginald the Third",
      "Crocodile Tears",
      "Chessmaster",
      "End of an Era",
      "Grand National Assembly",
      "The Constitution of '56",
      "Lawmaker",
      "Catchphrase",
      "A Morgna her coren!"
    ],
    "compatibleAchievements": [
      "Sollist",
      "Police State",
      "Militarist State",
      "An Offer You Cannot Refuse",
      "Merkopa's Most Unfair Election System"
    ],
    "incompatibleAchievements": [
      "Democrat",
      "Man of the People",
      "The Bludish Dream",
      "A Sordland For All"
    ],
    "exclusivePairs": [
      [
        "Grand L-1 Opening",
        "Grand H-3 Opening"
      ],
      [
        "Family Man",
        "This Can't Go On Like This, Anton"
      ],
      [
        "True Master of Crisis",
        "Master of Crisis"
      ],
      [
        "Authoritarian",
        "Democrat"
      ],
      [
        "Police State",
        "Freedom and Justice"
      ]
    ],
    "exclusiveGroups": [
      [
        "A Morgna her coren!",
        "A New Hope",
        "Just Another Sordish President"
      ]
    ],
    "crossRunExclusivePairs": [],
    "steps": [
      {
        "phase": "Prologue: Youth, Military Service & Rise to the Presidency",
        "actions": [
          "[Prologue: Rise to Power] Step onto the balcony of the USP Headquarters, thank the citizens of Sordland, and proclaim a new morning for the Republic.",
          "[Hawker's Plan] Comply fully with Chief Justice Orso Hawker's demands throughout the State of Emergency, maintaining emergency powers until the term's conclusion.",
          "[Obstructionist] Exercise presidential veto power on at least 8 legislative bills passed by the Grand National Assembly to assert executive dominance over the legislature.",
          "[Lawmaker] Sign at least 10 legislative bills sent to your desk by the Grand National Assembly across your presidential term (exercise vetoes sparingly, no more than 2-3 times)."
        ],
        "context": "1953 Sordish Election Night Victory Speech",
        "unlockedAchievements": [
          "Prologue: Rise to Power",
          "Hawker's Plan",
          "Obstructionist",
          "Lawmaker"
        ],
        "technicalDetails": {
          "sceneTitle": "Youth, Military Service & Rise to the Presidency",
          "sceneFile": "Prologue_Archive.md",
          "saveVariables": [
            "BaseGame.Chapter2_Finished",
            "BaseGame.Chapter1_Finished",
            "BaseGame.Prologue_Finished",
            "BaseGame.Decision_Turn05_AutocratEmergency_Extend",
            "BaseGame.Decision_Turn08_ExtendEmergency_Extend",
            "RiziaDLC.HighTea_Hosted"
          ]
        }
      },
      {
        "phase": "Turn 1: Inauguration, Assassination Shock & The Reform Package Debate",
        "actions": [
          "[Chapter I: President Rayne] Finalize your government's core policy stance (Reform or Emergency) and adjourn the cabinet.",
          "[Chapter IV: Checkmate] Reflect on your four-year legacy as President and prepare for the national election results.",
          "[Sollist] Reiterate your unshakeable devotion to Sollism, the USP traditions, and state sovereignty.",
          "[Authoritarian] Review your term as an iron-willed sovereign who ruled without compromise or parliamentary constraint."
        ],
        "context": "Turn 3: Concluding the ministerial budget meeting and constitutional roadmap",
        "unlockedAchievements": [
          "Chapter I: President Rayne",
          "Chapter IV: Checkmate",
          "Sollist",
          "Authoritarian",
          "Just Another Funeral",
          "Chessmaster"
        ],
        "technicalDetails": {
          "sceneTitle": "Inauguration, Assassination Shock & The Reform Package Debate",
          "sceneFile": "Sordland_Turn03_EnT_BusinessCouncil.md",
          "saveVariables": [
            "BaseGame.Chapter2_Finished",
            "BaseGame.Chapter1_Finished",
            "BaseGame.Chapter4_Finished",
            "RiziaDLC.Situation_Economy_RRG_StateOwns100",
            "RiziaDLC.Zille_Peaceful_Handover",
            "BaseGame.Lucian_Betrayal"
          ]
        }
      },
      {
        "phase": "Turn 2: Private Tender Meeting with Walter Tusk or Corporate Privatization",
        "actions": [
          "[“Donations”] Take the envelope and accept the donation.",
          "[An Offer You Cannot Refuse] A deal is a deal. It will be upheld."
        ],
        "context": "When Walter Tusk offers a thick envelope of cash to guarantee the infrastructure contract to Underhall Construction",
        "unlockedAchievements": [
          "“Donations”",
          "An Offer You Cannot Refuse"
        ],
        "technicalDetails": {
          "sceneTitle": "Private Tender Meeting with Walter Tusk or Corporate Privatization",
          "sceneFile": "Sordland_Turn02_A_ContractBribe.md",
          "saveVariables": [
            "BaseGame.Chapter4_Finished",
            "BaseGame.Chapter3_Finished"
          ]
        }
      },
      {
        "phase": "Turn 3: National Address Declaring a State of Emergency",
        "actions": [
          "[Article 100] Formally proclaim a State of Emergency across Sordland in cooperation with the Supreme Court."
        ],
        "context": "National radio address to the nation in Turn 3",
        "unlockedAchievements": [
          "Article 100"
        ],
        "technicalDetails": {
          "sceneTitle": "National Address Declaring a State of Emergency",
          "sceneFile": "Sordland_Turn03_A_AutocratSpeech.md",
          "saveVariables": [
            "BaseGameSupport.CollectionItem_WhiskeyBottle"
          ]
        }
      },
      {
        "phase": "Turn 4: Regional Crises, Bilateral Diplomacy & Law Enforcement Reforms",
        "actions": [
          "[Chapter II: A New Sordland] Celebrate the completion of the transit link and prepare the administration for the upcoming assembly vote."
        ],
        "context": "Turn 6: Concluding the mega-infrastructure grand opening and party consultations",
        "unlockedAchievements": [
          "Chapter II: A New Sordland"
        ],
        "technicalDetails": {
          "sceneTitle": "Regional Crises, Bilateral Diplomacy & Law Enforcement Reforms",
          "sceneFile": "Sordland_Turn06_InT_RailwayOpening.md",
          "saveVariables": [
            "BaseGame.Chapter2_Finished",
            "BaseGame.Chapter3_Finished"
          ]
        }
      },
      {
        "phase": "Turn 5: Cabinet Deliberation on Founding the Secret State Police",
        "actions": [
          "[Sssh!] Found the Secret State Police (SSP) under Karl Greiser."
        ],
        "context": "Turn 5 police reform summit",
        "unlockedAchievements": [
          "Sssh!"
        ],
        "technicalDetails": {
          "sceneTitle": "Cabinet Deliberation on Founding the Secret State Police",
          "sceneFile": "Sordland_Turn05_SnO_FoundedPolice.md",
          "saveVariables": [
            "RiziaDLC.Chapter1_Finished"
          ]
        }
      },
      {
        "phase": "Turn 7: Grand National Assembly Vote, Supreme Court Trial & Foreign Alliances",
        "actions": [
          "[Chapter III: Victim of Changes] Solidify foreign partnerships and review internal security measures ahead of late-game challenges.",
          "[By Any Means Necessary] Give the order to make the target quietly disappear.",
          "[Soll's Legacy] Proclaim the dawn of a Neo-Sollist era of state nationalism with absolute executive dominance.",
          "[Purple Blood] Formally announce an electoral coalition between the USP and the National Front Party (NFP)."
        ],
        "context": "Turn 8: Debriefing the international alliance summits and domestic unrest response",
        "unlockedAchievements": [
          "Chapter III: Victim of Changes",
          "By Any Means Necessary",
          "Soll's Legacy",
          "Purple Blood",
          "Merkopa's Most Unfair Election System",
          "Grand National Assembly",
          "The Constitution of '56"
        ],
        "technicalDetails": {
          "sceneTitle": "Grand National Assembly Vote, Supreme Court Trial & Foreign Alliances",
          "sceneFile": "Sordland_Turn08_FPnT_LespiaVisit.md",
          "saveVariables": [
            "BaseGame.Chapter4_Finished",
            "BaseGame.Chapter3_Finished",
            "BaseGame.VetoedBillCount",
            "BaseGameSupport.CollectionItem_CigarBox",
            "RiziaDLC.AN_Sanctioned",
            "BaseGameSupport.CollectionItem_Gun"
          ]
        }
      },
      {
        "phase": "Turn 8: Authoritarian Security Decrees Establishing a Police State",
        "actions": [
          "[Police State] Impose total police crackdowns, curfews, and mass arrests across all major cities.",
          "[Alexius Maximus Reginald the Third] Adopt a loyal dog to join the first family at the residence."
        ],
        "context": "Turn 8 security council summit",
        "unlockedAchievements": [
          "Police State",
          "Alexius Maximus Reginald the Third"
        ],
        "technicalDetails": {
          "sceneTitle": "Authoritarian Security Decrees Establishing a Police State",
          "sceneFile": "Sordland_Turn08_A_UnrestMeeting.md",
          "saveVariables": [
            "RiziaDLCSupport.CollectionItem_DastScepter",
            "RiziaDLC.Ending_Death",
            "RiziaDLC.Remarried"
          ]
        }
      },
      {
        "phase": "Turn 9: Public Alliance with Remus Holstron and the Young Sords",
        "actions": [
          "[New Generation of Sords] Formally endorse and legitimize the Young Sords paramilitary movement.",
          "[United Against Communism] Formally accept President Walker's offer and sign the Arcasia Treaty Organization (ATO) charter.",
          "[Crocodile Tears] Express dramatic sorrow and weep openly for your closest friend, concealing your own responsibility.",
          "[End of an Era] Convict Tarquin Soll of high treason and sentence him to life imprisonment on Antel Rock."
        ],
        "context": "Security meeting regarding nationalist youth groups",
        "unlockedAchievements": [
          "New Generation of Sords",
          "United Against Communism",
          "Crocodile Tears",
          "End of an Era"
        ],
        "technicalDetails": {
          "sceneTitle": "Public Alliance with Remus Holstron and the Young Sords",
          "sceneFile": "Sordland_Turn09_SnO_RumburgIncident.md",
          "saveVariables": [
            "BaseGame.Aschraf_CandleLit",
            "BaseGame.GovernmentBudget",
            "BaseGameSupport.CollectionItem_AschrafCandle",
            "BaseGame.Bill_Turn09_BludishCommission_Signed",
            "RiziaDLC.Situation_Diplomacy_PowerProjection_Overwhelming",
            "BaseGame.Alphonso_Legacy_Replicated"
          ]
        }
      },
      {
        "phase": "Epilogue: Election Night Victory Address at the Maroon Palace",
        "actions": [
          "[A Morgna her coren!] Step onto the balcony, deliver an inspiring victory address, and thank the people of Sordland."
        ],
        "context": "Addressing the nation and celebrating supporters on election night 1957",
        "unlockedAchievements": [
          "A Morgna her coren!"
        ],
        "technicalDetails": {
          "sceneTitle": "Election Night Victory Address at the Maroon Palace",
          "sceneFile": "Sordland_Epilogue_ElectionWin.md",
          "saveVariables": []
        }
      },
      {
        "phase": "Special Phase: State Speeches & Public Addresses",
        "actions": [
          "[Catchphrase] Resolutely chant the patriotic Sordish rallying cry 'A morgna wes core' ('Victory is ours') during public addresses, party rallies, and cabinet speeches at least 7 times."
        ],
        "context": "Turn 2: Bernard Circas Funeral Oration",
        "unlockedAchievements": [
          "Catchphrase"
        ],
        "technicalDetails": {
          "sceneTitle": "State Speeches & Public Addresses",
          "sceneFile": "Sordland_Turn07_A_AddressToTheNation.md",
          "saveVariables": []
        }
      }
    ]
  },
  {
    "id": "sordland-war-machine",
    "title": "Sordish War Machine — Total Victory Over Rumburg",
    "subtitle": "Military Modernization • Operation Fall Valkyrie • Capture of Queen Beatrice • Sordish Hegemony",
    "sourceName": "Suzerain Playthrough Guide (v3.1.0)",
    "sourceLink": "https://www.torporgames.com",
    "sourceVersion": "3.1.0",
    "isVerifiedLatest": true,
    "game": "Sordland",
    "tags": [
      "Sordland",
      "Military"
    ],
    "archetype": "War Hero Commander",
    "description": "Mobilize the military might of Sordland to decisively crush Queen Beatrice Livingston's aggressive kingdom of Rumburg. Fund the armed forces, modernize infantry and air capabilities under General Iosef Lancea or expand raw conscription under General Valken Kruger, expose Rumburgian espionage and nuclear secrets to the Alliance of Nations, and march victorious into Thornbourn.",
    "disclaimer": "Maintain green military status by fully funding the Ministry of Defense in Turn 3. Ensure domestic economy does not collapse during the war effort.",
    "presetId": "sordland-run-a-emergency",
    "achievements": [
      "Prologue: Rise to Power",
      "Chapter I: President Rayne",
      "Chapter II: A New Sordland",
      "Chapter III: Victim of Changes",
      "Chapter IV: Checkmate",
      "Sordish War Machine",
      "Vectern sis da!",
      "Hail the Queen",
      "Militarist State",
      "Make Sordland Great Again",
      "No Friends But Sords",
      "Operation Bear Trap",
      "Sordish Economic Recovery",
      "Grand H-3 Opening",
      "First Step To Golconda",
      "Family Man",
      "Catchphrase",
      "A Morgna her coren!"
    ],
    "compatibleAchievements": [
      "Militarist State",
      "Make Sordland Great Again",
      "Sordish Economic Recovery",
      "Family Man"
    ],
    "incompatibleAchievements": [
      "Reconciliation",
      "Hail the Queen"
    ],
    "exclusivePairs": [
      [
        "Grand L-1 Opening",
        "Grand H-3 Opening"
      ],
      [
        "Vectern sis da!",
        "Hail the Queen"
      ],
      [
        "True Master of Crisis",
        "Master of Crisis"
      ],
      [
        "No Friends But Sords",
        "Operation Bear Trap"
      ]
    ],
    "exclusiveGroups": [
      [
        "Vectern sis da!",
        "Hail the Queen",
        "A Morgna her coren!"
      ]
    ],
    "crossRunExclusivePairs": [],
    "steps": [
      {
        "phase": "Prologue: Youth, Military Service & Rise to the Presidency",
        "actions": [
          "[Prologue: Rise to Power] Step onto the balcony of the USP Headquarters, thank the citizens of Sordland, and proclaim a new morning for the Republic."
        ],
        "context": "1953 Sordish Election Night Victory Speech",
        "unlockedAchievements": [
          "Prologue: Rise to Power"
        ],
        "technicalDetails": {
          "sceneTitle": "Youth, Military Service & Rise to the Presidency",
          "sceneFile": "Prologue_Archive.md",
          "saveVariables": [
            "BaseGame.Chapter2_Finished",
            "BaseGame.Chapter1_Finished",
            "BaseGame.Prologue_Finished"
          ]
        }
      },
      {
        "phase": "Turn 1: Inauguration, Assassination Shock & The Reform Package Debate",
        "actions": [
          "[Chapter I: President Rayne] Finalize your government's core policy stance (Reform or Emergency) and adjourn the cabinet.",
          "[Chapter IV: Checkmate] Reflect on your four-year legacy as President and prepare for the national election results.",
          "[Vectern sis da!] Sign the historic peace treaty, annexing Dome and Tzarsborough and dictating terms to Queen Beatrice.",
          "[Family Man] Share laughter, toast to your loved ones, and celebrate your close-knit family."
        ],
        "context": "Turn 3: Concluding the ministerial budget meeting and constitutional roadmap",
        "unlockedAchievements": [
          "Chapter I: President Rayne",
          "Chapter IV: Checkmate",
          "Vectern sis da!",
          "Family Man"
        ],
        "technicalDetails": {
          "sceneTitle": "Inauguration, Assassination Shock & The Reform Package Debate",
          "sceneFile": "Sordland_Turn03_EnT_BusinessCouncil.md",
          "saveVariables": [
            "BaseGame.Chapter2_Finished",
            "BaseGame.Chapter1_Finished",
            "BaseGame.Chapter4_Finished",
            "BaseGame.PersonalWealth",
            "BaseGame.Prologue_Birthplace_Lachaven_Rich",
            "BaseGameSupport.CollectionItem_GoatStatue"
          ]
        }
      },
      {
        "phase": "Turn 4: Regional Crises, Bilateral Diplomacy & Law Enforcement Reforms",
        "actions": [
          "[Chapter II: A New Sordland] Celebrate the completion of the transit link and prepare the administration for the upcoming assembly vote."
        ],
        "context": "Turn 6: Concluding the mega-infrastructure grand opening and party consultations",
        "unlockedAchievements": [
          "Chapter II: A New Sordland"
        ],
        "technicalDetails": {
          "sceneTitle": "Regional Crises, Bilateral Diplomacy & Law Enforcement Reforms",
          "sceneFile": "Sordland_Turn06_InT_RailwayOpening.md",
          "saveVariables": [
            "BaseGame.Chapter2_Finished",
            "BaseGame.Chapter3_Finished"
          ]
        }
      },
      {
        "phase": "Turn 5: Emergency Crisis Summit at the Presidential Palace",
        "actions": [
          "[Operation Bear Trap] Agree to assist Operation Bear Trap by sealing Sordish borders against Wehzek rebels."
        ],
        "context": "When Smolak demands military cooperation in Operation Bear Trap",
        "unlockedAchievements": [
          "Operation Bear Trap"
        ],
        "technicalDetails": {
          "sceneTitle": "Emergency Crisis Summit at the Presidential Palace",
          "sceneFile": "Sordland_Turn05_FPnT_WehlenTradeVisit.md",
          "saveVariables": [
            "BaseGameSupport.CollectionItem_WhiskeyBottle"
          ]
        }
      },
      {
        "phase": "Turn 6: Turn 6 Inauguration of the H-3 Highway in Agnland",
        "actions": [
          "[Grand H-3 Opening] Cut the ribbon, drive the ceremonial vehicle onto the highway, and celebrate regional development."
        ],
        "context": "Ceremony in Agnland with Governor Ewald Alphonso",
        "unlockedAchievements": [
          "Grand H-3 Opening"
        ],
        "technicalDetails": {
          "sceneTitle": "Turn 6 Inauguration of the H-3 Highway in Agnland",
          "sceneFile": "Sordland_Turn06_InT_HighwayOpening.md",
          "saveVariables": [
            "BaseGameSupport.CollectionItem_PoemBook"
          ]
        }
      },
      {
        "phase": "Turn 7: Grand National Assembly Vote, Supreme Court Trial & Foreign Alliances",
        "actions": [
          "[Chapter III: Victim of Changes] Solidify foreign partnerships and review internal security measures ahead of late-game challenges.",
          "[First Step To Golconda] Grab the sceptre with your left hand, then touch the altar with your right."
        ],
        "context": "Turn 8: Debriefing the international alliance summits and domestic unrest response",
        "unlockedAchievements": [
          "Chapter III: Victim of Changes",
          "First Step To Golconda"
        ],
        "technicalDetails": {
          "sceneTitle": "Grand National Assembly Vote, Supreme Court Trial & Foreign Alliances",
          "sceneFile": "Sordland_Turn08_FPnT_LespiaVisit.md",
          "saveVariables": [
            "BaseGame.Chapter4_Finished",
            "BaseGame.Chapter3_Finished"
          ]
        }
      },
      {
        "phase": "Turn 8: National Defense Council and Armed Forces Expansion",
        "actions": [
          "[Militarist State] Endorse full military readiness, expand youth defense drills, and establish a militarist state posture.",
          "[Make Sordland Great Again] Centralize the administration of Bergia directly under the Ministry of the Interior."
        ],
        "context": "Turn 8/9 national security council meeting",
        "unlockedAchievements": [
          "Militarist State",
          "Make Sordland Great Again"
        ],
        "technicalDetails": {
          "sceneTitle": "National Defense Council and Armed Forces Expansion",
          "sceneFile": "Sordland_Turn08_A_UnrestMeeting.md",
          "saveVariables": [
            "BaseGameSupport.CollectionItem_CeremonialScissors",
            "BaseGameSupport.CollectionItem_UnderhallTrophy",
            "RiziaDLCSupport.CollectionItem_MandragoraExtract"
          ]
        }
      },
      {
        "phase": "Turn 9: Emergency Security Council Following the Rumburg Plane Incident",
        "actions": [
          "[Sordish War Machine] Start the war machine: mobilize the armed forces and declare war on Rumburg.",
          "[No Friends But Sords] Reiterate Sordland's strict non-aligned isolationism: standing entirely alone on the world stage.",
          "[Sordish Economic Recovery] Review the thriving national economic indicators and celebrate the complete recovery of Sordland."
        ],
        "context": "Turn 9 high command meeting",
        "unlockedAchievements": [
          "Sordish War Machine",
          "No Friends But Sords",
          "Sordish Economic Recovery"
        ],
        "technicalDetails": {
          "sceneTitle": "Emergency Security Council Following the Rumburg Plane Incident",
          "sceneFile": "Sordland_Turn09_SnO_RumburgIncident.md",
          "saveVariables": [
            "BaseGame.FCAnrica_LeagueChampion",
            "BaseGameSupport.CollectionItem_Headphones",
            "BaseGameSupport.CollectionItem_CigarBox"
          ]
        }
      },
      {
        "phase": "Epilogue: The Fall of Holsord and Sordish Military Defeat",
        "actions": [
          "[Hail the Queen] Face Queen Beatrice and the Rumburgian conquerors as Sordland is occupied.",
          "[A Morgna her coren!] Step onto the balcony, deliver an inspiring victory address, and thank the people of Sordland."
        ],
        "context": "Underground bunker surrender in Holsord",
        "unlockedAchievements": [
          "Hail the Queen",
          "A Morgna her coren!"
        ],
        "technicalDetails": {
          "sceneTitle": "The Fall of Holsord and Sordish Military Defeat",
          "sceneFile": "Sordland_Epilogue_RumburgWarLost.md",
          "saveVariables": [
            "BaseGame.LateGameCrisis"
          ]
        }
      },
      {
        "phase": "Special Phase: State Speeches & Public Addresses",
        "actions": [
          "[Catchphrase] Resolutely chant the patriotic Sordish rallying cry 'A morgna wes core' ('Victory is ours') during public addresses, party rallies, and cabinet speeches at least 7 times."
        ],
        "context": "Turn 2: Bernard Circas Funeral Oration",
        "unlockedAchievements": [
          "Catchphrase"
        ],
        "technicalDetails": {
          "sceneTitle": "State Speeches & Public Addresses",
          "sceneFile": "Sordland_Turn07_A_AddressToTheNation.md",
          "saveVariables": []
        }
      }
    ]
  },
  {
    "id": "sordland-calamity",
    "title": "The Great Calamity — Downfall, Deposed, Coup & Exile",
    "subtitle": "Economic Collapse • Military Coup • Impeachment Trial • Tragic Deposition & Exile",
    "sourceName": "Suzerain Playthrough Guide (v3.1.0)",
    "sourceLink": "https://www.torporgames.com",
    "sourceVersion": "3.1.0",
    "isVerifiedLatest": true,
    "game": "Sordland",
    "tags": [
      "Sordland",
      "Special"
    ],
    "archetype": "Tragic Downfall",
    "description": "Experience the harrowing decline and collapse of presidential authority in Sordland. Push the national debt past the breaking point to ignite the Great Sordish Depression, incite widespread civilian riots, trigger military intervention by General Iosef Lancea or General Valken Kruger, stand trial before the Supreme Court, and face exile or assassination.",
    "disclaimer": "This pathway explores the failure states and dramatic political downfalls. High government debt (-8 or lower) and intense domestic unrest are key triggers.",
    "achievements": [
      "Prologue: Rise to Power",
      "Chapter I: President Rayne",
      "Chapter II: A New Sordland",
      "Chapter III: Victim of Changes",
      "Chapter IV: Checkmate",
      "Coup d'état",
      "Impeached",
      "Forced Out",
      "A New Hope",
      "Demoted",
      "Just Another Sordish President",
      "Early Retirement",
      "Path To Exile",
      "Assassinated",
      "World At War",
      "Sordish Depression",
      "Yes I'm Alone But Then Again I Always Was",
      "This Can't Go On Like This, Anton",
      "Speaking Louder Makes You Right",
      "Revenge of Izzam",
      "Yollak Bluderat!",
      "Carb Diet",
      "Down with Rayne!"
    ],
    "compatibleAchievements": [
      "Sordish Depression",
      "Down with Rayne!",
      "Yes I'm Alone But Then Again I Always Was",
      "This Can't Go On Like This, Anton"
    ],
    "incompatibleAchievements": [
      "A Morgna her coren!",
      "Sordish Economic Recovery",
      "Democrat"
    ],
    "exclusivePairs": [
      [
        "Sordish Economic Recovery",
        "Sordish Depression"
      ]
    ],
    "exclusiveGroups": [
      [
        "Coup d'état",
        "Impeached",
        "Forced Out",
        "Demoted",
        "Path To Exile",
        "Early Retirement",
        "Assassinated",
        "World At War"
      ]
    ],
    "crossRunExclusivePairs": [],
    "steps": [
      {
        "phase": "Prologue: Youth, Military Service & Rise to the Presidency",
        "actions": [
          "[Prologue: Rise to Power] Step onto the balcony of the USP Headquarters, thank the citizens of Sordland, and proclaim a new morning for the Republic."
        ],
        "context": "1953 Sordish Election Night Victory Speech",
        "unlockedAchievements": [
          "Prologue: Rise to Power"
        ],
        "technicalDetails": {
          "sceneTitle": "Youth, Military Service & Rise to the Presidency",
          "sceneFile": "Prologue_Archive.md",
          "saveVariables": [
            "BaseGame.Chapter2_Finished",
            "BaseGame.Chapter1_Finished",
            "BaseGame.Prologue_Finished"
          ]
        }
      },
      {
        "phase": "Turn 1: Inauguration, Assassination Shock & The Reform Package Debate",
        "actions": [
          "[Chapter I: President Rayne] Finalize your government's core policy stance (Reform or Emergency) and adjourn the cabinet.",
          "[Chapter IV: Checkmate] Reflect on your four-year legacy as President and prepare for the national election results.",
          "[Early Retirement] Enjoy a tranquil life at your family home in Anrica, reminiscing on your time in power.",
          "[Yes I'm Alone But Then Again I Always Was] Eat your dinner in absolute silence, surrounded only by empty chairs."
        ],
        "context": "Turn 3: Concluding the ministerial budget meeting and constitutional roadmap",
        "unlockedAchievements": [
          "Chapter I: President Rayne",
          "Chapter IV: Checkmate",
          "Early Retirement",
          "Yes I'm Alone But Then Again I Always Was"
        ],
        "technicalDetails": {
          "sceneTitle": "Inauguration, Assassination Shock & The Reform Package Debate",
          "sceneFile": "Sordland_Turn03_EnT_BusinessCouncil.md",
          "saveVariables": [
            "BaseGame.Chapter2_Finished",
            "BaseGame.Chapter1_Finished",
            "BaseGame.Chapter4_Finished",
            "RiziaDLCSupport.CollectionItem_MiniYacht"
          ]
        }
      },
      {
        "phase": "Turn 3: Business Council Banquet with Walter Tusk and Marcel Koronti",
        "actions": [
          "[Carb Diet] Help yourself to generous servings of pasta and carb-heavy delicacies."
        ],
        "context": "When served rich pastas and gourmet breads at the banquet table",
        "unlockedAchievements": [
          "Carb Diet"
        ],
        "technicalDetails": {
          "sceneTitle": "Business Council Banquet with Walter Tusk and Marcel Koronti",
          "sceneFile": "Sordland_Turn03_EnT_BusinessCouncil.md",
          "saveVariables": [
            "RiziaDLCSupport.CollectionItem_ChessPiece",
            "RiziaDLC.Situation_Military_Manpower_Massive"
          ]
        }
      },
      {
        "phase": "Turn 4: Regional Crises, Bilateral Diplomacy & Law Enforcement Reforms",
        "actions": [
          "[Chapter II: A New Sordland] Celebrate the completion of the transit link and prepare the administration for the upcoming assembly vote."
        ],
        "context": "Turn 6: Concluding the mega-infrastructure grand opening and party consultations",
        "unlockedAchievements": [
          "Chapter II: A New Sordland"
        ],
        "technicalDetails": {
          "sceneTitle": "Regional Crises, Bilateral Diplomacy & Law Enforcement Reforms",
          "sceneFile": "Sordland_Turn06_InT_RailwayOpening.md",
          "saveVariables": [
            "BaseGame.Chapter2_Finished",
            "BaseGame.Chapter3_Finished"
          ]
        }
      },
      {
        "phase": "Turn 7: Grand National Assembly Vote, Supreme Court Trial & Foreign Alliances",
        "actions": [
          "[Chapter III: Victim of Changes] Solidify foreign partnerships and review internal security measures ahead of late-game challenges.",
          "[Speaking Louder Makes You Right] Slam your hands violently against the podium, shout back, and fiercely demand order in the chamber."
        ],
        "context": "Turn 8: Debriefing the international alliance summits and domestic unrest response",
        "unlockedAchievements": [
          "Chapter III: Victim of Changes",
          "Speaking Louder Makes You Right"
        ],
        "technicalDetails": {
          "sceneTitle": "Grand National Assembly Vote, Supreme Court Trial & Foreign Alliances",
          "sceneFile": "Sordland_Turn08_FPnT_LespiaVisit.md",
          "saveVariables": [
            "BaseGame.Chapter4_Finished",
            "BaseGame.Chapter3_Finished",
            "RiziaDLC.Situation_Diplomacy_PowerProjection_Overwhelming"
          ]
        }
      },
      {
        "phase": "Turn 8: Cabinet Emergency Briefing on Bludish Uprising",
        "actions": [
          "[Yollak Bluderat!] Review reports of armed Bludish Freedom Front mobilizations and militant uprising across Bergia.",
          "[Down with Rayne!] Acknowledge the uncontrollable outbreak of violent rioting and nationwide urban chaos."
        ],
        "context": "Turn 8 security assessment",
        "unlockedAchievements": [
          "Yollak Bluderat!",
          "Down with Rayne!"
        ],
        "technicalDetails": {
          "sceneTitle": "Cabinet Emergency Briefing on Bludish Uprising",
          "sceneFile": "Sordland_Turn08_A_UnrestMeeting.md",
          "saveVariables": [
            "RiziaDLC.Chapter1_Finished",
            "BaseGame.LateGameCrisis"
          ]
        }
      },
      {
        "phase": "Turn 9: Ministry of Economy Briefing on Sordish Economic Collapse",
        "actions": [
          "[Sordish Depression] Acknowledge the catastrophic collapse of the Sordish economy and bankruptcy of the treasury.",
          "[This Can't Go On Like This, Anton] Refuse to apologize, dismiss her demands, and allow the marriage to end in legal divorce.",
          "[Revenge of Izzam] Authorize special forces tactical breach or negotiate hostage release to retake the dam without breach."
        ],
        "context": "Cabinet economic debrief in Turn 9",
        "unlockedAchievements": [
          "Sordish Depression",
          "This Can't Go On Like This, Anton",
          "Revenge of Izzam"
        ],
        "technicalDetails": {
          "sceneTitle": "Ministry of Economy Briefing on Sordish Economic Collapse",
          "sceneFile": "Sordland_Turn09_EnT_EconomicOverviewAndAction.md",
          "saveVariables": [
            "RiziaDLC.Territory_Zille_Reunited",
            "RiziaDLCSupport.CollectionItem_MechanicalBird",
            "RiziaDLC.Territory_Pales_Reunited",
            "RiziaDLC.AN_Sanctioned",
            "RiziaDLCSupport.CollectionItem_IzaKey"
          ]
        }
      },
      {
        "phase": "Epilogue: Sordland Epilogue Couptrial",
        "actions": [
          "[Coup d'état] Face the military tribunal during the coup trial.",
          "[Impeached] Stand trial before the Supreme Court as Chief Justice Hawker hands down your conviction.",
          "[Forced Out] Concede defeat to Lileas Graf and step aside from the presidential ticket.",
          "[A New Hope] Deliver a gracious concession speech, congratulate the winning candidate, and vow to lead the loyal opposition."
        ],
        "context": "Meeting in scene: Sordland Epilogue Couptrial",
        "unlockedAchievements": [
          "Coup d'état",
          "Impeached",
          "Forced Out",
          "A New Hope",
          "Demoted",
          "Just Another Sordish President",
          "Path To Exile",
          "Assassinated",
          "World At War"
        ],
        "technicalDetails": {
          "sceneTitle": "Sordland Epilogue Couptrial",
          "sceneFile": "Sordland_Epilogue_CoupTrial.md",
          "saveVariables": [
            "RiziaDLC.Chapter3_Finished",
            "RiziaDLC.Chapter4_Finished",
            "RiziaDLC.Manus_Commissioned",
            "RiziaDLC.War_Pales_Blitzkrieg_Won",
            "RiziaDLC.GoldenBells_Rung",
            "RiziaDLCSupport.CollectionItem_GasCorpPlaque"
          ]
        }
      }
    ]
  },
  {
    "id": "rizia-constitutional-reformer",
    "title": "The Golden Reformer — Constitutional Monarchy & Modernization",
    "subtitle": "Royal Constitution • House Manus Alliance • Civil Liberties • Industrial Prosperity",
    "sourceName": "Suzerain Playthrough Guide (v3.1.0)",
    "sourceLink": "https://www.torporgames.com",
    "sourceVersion": "3.1.0",
    "isVerifiedLatest": true,
    "game": "Rizia",
    "tags": [
      "Rizia",
      "Reformist",
      "Economy"
    ],
    "archetype": "Constitutional Monarch",
    "description": "Transform the Kingdom of Rizia from an aristocratic feudal state into an enlightened modern constitutional monarchy. Collaborate with Duke Laurento Manus, abolish provincial levies, dismantle privatized police forces, expand worker and social rights, decriminalize personal liberties, and spearhead a golden age of manufacturing and high production.",
    "disclaimer": "Maintain delicate diplomatic equilibrium with the conservative nobility while progressively passing decrees that empower the national legislature.",
    "presetId": "rizia-golden-kingdom",
    "achievements": [
      "Rizia Prologue: Ascension to the Throne",
      "Chapter I: King Romus",
      "Chapter II: Between-Seas",
      "Chapter III: Leviathan",
      "Chapter IV: Sila Orica",
      "Rizian Charter of Fundamental Law",
      "Reform Or Die",
      "My Rule Continues",
      "Not So Fun Anymore",
      "Out And Proud",
      "Ready To Love Again",
      "Pearl of the Between-Seas",
      "What's Mined Is Yours",
      "The Green Kingdom",
      "Economic Wonder of South Merkopa",
      "Golden Age of Rizia",
      "Through Machinery and Industry",
      "Arms Exporter",
      "Arms Importer",
      "People's Army",
      "The Prince",
      "A Toras Pays His Debts",
      "A Little Help From My Friends",
      "Mom and Dad",
      "Lieutenant Commander Sazon",
      "True Master of Crisis",
      "Case Closed"
    ],
    "compatibleAchievements": [
      "Rizian Charter of Fundamental Law",
      "Reform Or Die",
      "Golden Age of Rizia",
      "Economic Wonder of South Merkopa",
      "Out And Proud"
    ],
    "incompatibleAchievements": [
      "Domineering",
      "Wruhec's Second Coming",
      "Completely Justified"
    ],
    "exclusivePairs": [
      [
        "True Master of Crisis",
        "Father's Son"
      ],
      [
        "My Rule Continues",
        "Away from My Land"
      ]
    ],
    "exclusiveGroups": [
      [
        "My Rule Continues",
        "Fragmentation",
        "Return of the King",
        "Away from My Land"
      ]
    ],
    "crossRunExclusivePairs": [],
    "steps": [
      {
        "phase": "Prologue: Prince Romus's Youth, Marriage to Queen Lena & Royal Coronation",
        "actions": [
          "[Rizia Prologue: Ascension to the Throne] Accept the Golden Crown of Rizia upon your head, take the royal oath, and address the assembled noble houses."
        ],
        "context": "Coronation ceremony in the Grand Basilica of Porte Drazon",
        "unlockedAchievements": [
          "Rizia Prologue: Ascension to the Throne"
        ],
        "technicalDetails": {
          "sceneTitle": "Prince Romus's Youth, Marriage to Queen Lena & Royal Coronation",
          "sceneFile": "Prologue_Archive.md",
          "saveVariables": [
            "RiziaDLC.Prologue_Finished"
          ]
        }
      },
      {
        "phase": "Turn 1: Royal Council Organization, Zille Bombing Crisis & Beatrice Visit",
        "actions": [
          "[Chapter I: King Romus] Establish your foreign policy stance within GRACE and instruct the Royal Council to proceed with development.",
          "[Chapter IV: Sila Orica] Deliver your historic decennial address celebrating Rizia's sovereign triumphs.",
          "[Rizian Charter of Fundamental Law] Sign the constitutional reform proclamation, establishing a modern constitutional monarchy.",
          "[Reform Or Die] Sign the democratic constitution, recognizing that the monarchy must reform or die."
        ],
        "context": "Turn 3: Concluding the imperial summit with Queen Beatrice",
        "unlockedAchievements": [
          "Chapter I: King Romus",
          "Chapter IV: Sila Orica",
          "Rizian Charter of Fundamental Law",
          "Reform Or Die",
          "My Rule Continues",
          "Not So Fun Anymore",
          "Out And Proud",
          "Pearl of the Between-Seas",
          "The Green Kingdom",
          "Economic Wonder of South Merkopa",
          "Golden Age of Rizia",
          "Through Machinery and Industry",
          "People's Army",
          "The Prince",
          "A Toras Pays His Debts",
          "Mom and Dad",
          "True Master of Crisis"
        ],
        "technicalDetails": {
          "sceneTitle": "Royal Council Organization, Zille Bombing Crisis & Beatrice Visit",
          "sceneFile": "Rizia_Turn 3_FPnT_QueenBeatriceVisit.md",
          "saveVariables": [
            "RiziaDLC.Chapter1_Finished",
            "BaseGameSupport.CollectionItem_GoatStatue",
            "RiziaDLC.Chapter4_Finished",
            "RiziaDLC.Rumburg_Vassal",
            "RiziaDLC.Divided_Kingdom",
            "RiziaDLC.Reform_Or_Die_Signed"
          ]
        }
      },
      {
        "phase": "Turn 4: Aureus Gas Field Crisis, MITZ Negotiations & Derdia Outreach",
        "actions": [
          "[Chapter II: Between-Seas] Adjourn the diplomatic council and instruct the navy and industry to maintain high readiness.",
          "[What's Mined Is Yours] Sign the Royal Miner and Laborer Protection Act, guaranteeing that the fruits of the mines belong to the workers.",
          "[Lieutenant Commander Sazon] Approve the military commission and appoint Manus Sazon as Lieutenant Commander in the armed forces."
        ],
        "context": "Turn 6: Concluding regional trade accords and naval reviews",
        "unlockedAchievements": [
          "Chapter II: Between-Seas",
          "What's Mined Is Yours",
          "Lieutenant Commander Sazon"
        ],
        "technicalDetails": {
          "sceneTitle": "Aureus Gas Field Crisis, MITZ Negotiations & Derdia Outreach",
          "sceneFile": "Rizia_Turn 5_FPnT_MorellaNegotiations.md",
          "saveVariables": [
            "RiziaDLC.Chapter2_Finished",
            "RiziaDLC.Chapter3_Finished",
            "RiziaDLC.Worker_Rights_Passed",
            "RiziaDLC.Vina_Rescued",
            "RiziaDLC.Azaros_Executed",
            "RiziaDLC.Manus_Commissioned"
          ]
        }
      },
      {
        "phase": "Turn 7: Zille Handover Ultimatum, Wehlen Summit & Derdian Duel",
        "actions": [
          "[Chapter III: Leviathan] Finalize your strategy regarding Pales and Zille as the regional crisis approaches boiling point.",
          "[Ready To Love Again] Exchange vows with your new bride before the assembled kingdom and proclaim a new chapter of love.",
          "[A Little Help From My Friends] Present your legal arguments, call on allied nations to back Rizia, and celebrate the unanimous ruling in Rizia's favor."
        ],
        "context": "Turn 8: Palace garden consultations on dynastic alliances and military preparations",
        "unlockedAchievements": [
          "Chapter III: Leviathan",
          "Ready To Love Again",
          "A Little Help From My Friends"
        ],
        "technicalDetails": {
          "sceneTitle": "Zille Handover Ultimatum, Wehlen Summit & Derdian Duel",
          "sceneFile": "Rizia_Turn 8_Garden_Vina Non Marriage.md",
          "saveVariables": [
            "RiziaDLC.Chapter3_Finished",
            "RiziaDLC.Chapter4_Finished",
            "RiziaDLC.Ending_Death",
            "BaseGame.AN_Rumburg_Sanctioned",
            "BaseGame.NuclearWar_Averted",
            "RiziaDLC.Remarried"
          ]
        }
      },
      {
        "phase": "Turn 8: Royal Security Council Investigation of the Zille Bombing",
        "actions": [
          "[Case Closed] Review the conclusive forensic evidence, sign the official findings, and formally close the Zille investigation."
        ],
        "context": "Turn 9: Presenting the final intelligence dossier on the Zille bombing",
        "unlockedAchievements": [
          "Case Closed"
        ],
        "technicalDetails": {
          "sceneTitle": "Royal Security Council Investigation of the Zille Bombing",
          "sceneFile": "Rizia_Turn 10_Security_LucitaOrTitus.md",
          "saveVariables": [
            "BaseGameSupport.CollectionItem_USPBrooch",
            "BaseGame.WonUSPLeadership",
            "RiziaDLC.Zille_Bombing_Solved"
          ]
        }
      },
      {
        "phase": "Special Phase: Royal Military Procurement & Arms Trade",
        "actions": [
          "[Arms Exporter] Authorize 7 foreign arms sales to international buyers, boosting royal revenue.",
          "[Arms Importer] Authorize your 7th foreign arms shipment to bolster the Royal Armed Forces."
        ],
        "context": "Military procurement council",
        "unlockedAchievements": [
          "Arms Exporter",
          "Arms Importer"
        ],
        "technicalDetails": {
          "sceneTitle": "Royal Military Procurement & Arms Trade",
          "sceneFile": null,
          "saveVariables": []
        }
      }
    ]
  },
  {
    "id": "rizia-absolutist-theocrat",
    "title": "Iron Crown of Toras — Absolutist Hegemony & Holy Reconquest",
    "subtitle": "House Toras Hegemony • Golden Guard • Derdian Golcondist Alliance • Pales Conquest by Force",
    "sourceName": "Suzerain Playthrough Guide (v3.1.0)",
    "sourceLink": "https://www.torporgames.com",
    "sourceVersion": "3.1.0",
    "isVerifiedLatest": true,
    "game": "Rizia",
    "tags": [
      "Rizia",
      "Authoritarian",
      "Military"
    ],
    "archetype": "Absolutist Conqueror",
    "description": "Reassert total autocratic sovereignty under House Toras. Expand the elite Golden Guard under Lord Commander Titus, fortify royal monopolies, forge an unbreakable theocratic covenant with the Holy Kingdom of Derdia, and enforce historical territorial claims by conquering the Grand Duchy of Pales in a swift military campaign.",
    "disclaimer": "Reject diplomatic mediation by the Alliance of Nations regarding the gas field. Build tank units and support vessels early to execute Blitzkrieg.",
    "presetId": "rizia-golden-kingdom",
    "achievements": [
      "Rizia Prologue: Ascension to the Throne",
      "Chapter I: King Romus",
      "Chapter II: Between-Seas",
      "Chapter III: Leviathan",
      "Chapter IV: Sila Orica",
      "Domineering",
      "The King Is Dead",
      "Romus The Conqueror",
      "Wruhec's Second Coming",
      "Wruhecs Chosen",
      "Power of the Heavens",
      "Blitzkrieg",
      "The Force in South Merkopa",
      "Mine All Mine",
      "Completely Justified",
      "Make Yourself Great Again",
      "Tradition is Our Compass, the Past Our Strength.",
      "By Nur's Will, I Decree!",
      "Nurists United",
      "I hereby declare...",
      "Two Birds For Beatrice",
      "Like Father, Like Daughter",
      "Not Losing You Again",
      "The Golden Bells Ring",
      "Say My Name",
      "Smolak's Smokes",
      "The Kingdom Incorporated",
      "My Rule Continues",
      "True Master of Crisis"
    ],
    "compatibleAchievements": [
      "Domineering",
      "Romus The Conqueror",
      "Wruhec's Second Coming",
      "Power of the Heavens",
      "Mine All Mine"
    ],
    "incompatibleAchievements": [
      "Rizian Charter of Fundamental Law",
      "Reform Or Die",
      "Peace to the Duke"
    ],
    "exclusivePairs": [
      [
        "Romus The Conqueror",
        "Peace to the Duke"
      ],
      [
        "Blitzkrieg",
        "A Little Help From My Friends"
      ]
    ],
    "exclusiveGroups": [
      [
        "My Rule Continues",
        "The King Is Dead",
        "The King Behind Bars"
      ]
    ],
    "crossRunExclusivePairs": [],
    "steps": [
      {
        "phase": "Prologue: Prince Romus's Youth, Marriage to Queen Lena & Royal Coronation",
        "actions": [
          "[Rizia Prologue: Ascension to the Throne] Accept the Golden Crown of Rizia upon your head, take the royal oath, and address the assembled noble houses."
        ],
        "context": "Coronation ceremony in the Grand Basilica of Porte Drazon",
        "unlockedAchievements": [
          "Rizia Prologue: Ascension to the Throne"
        ],
        "technicalDetails": {
          "sceneTitle": "Prince Romus's Youth, Marriage to Queen Lena & Royal Coronation",
          "sceneFile": "Prologue_Archive.md",
          "saveVariables": [
            "RiziaDLC.Prologue_Finished"
          ]
        }
      },
      {
        "phase": "Turn 1: Royal Council Organization, Zille Bombing Crisis & Beatrice Visit",
        "actions": [
          "[Chapter I: King Romus] Establish your foreign policy stance within GRACE and instruct the Royal Council to proceed with development.",
          "[Chapter IV: Sila Orica] Deliver your historic decennial address celebrating Rizia's sovereign triumphs.",
          "[Domineering] Preserve royal prerogative by accumulating and maintaining an overwhelming pool of at least 15 royal Authority points through decrees and tradition.",
          "[The King Is Dead] Breathe your last breath as court physicians surround your bed, passing the crown to your successor."
        ],
        "context": "Turn 3: Concluding the imperial summit with Queen Beatrice",
        "unlockedAchievements": [
          "Chapter I: King Romus",
          "Chapter IV: Sila Orica",
          "Domineering",
          "The King Is Dead",
          "Romus The Conqueror",
          "Wruhec's Second Coming",
          "Wruhecs Chosen",
          "Blitzkrieg",
          "The Force in South Merkopa",
          "Mine All Mine",
          "Completely Justified",
          "Make Yourself Great Again",
          "Tradition is Our Compass, the Past Our Strength.",
          "Like Father, Like Daughter",
          "Not Losing You Again",
          "The Golden Bells Ring",
          "Say My Name",
          "My Rule Continues",
          "True Master of Crisis"
        ],
        "technicalDetails": {
          "sceneTitle": "Royal Council Organization, Zille Bombing Crisis & Beatrice Visit",
          "sceneFile": "Rizia_Turn 3_FPnT_QueenBeatriceVisit.md",
          "saveVariables": [
            "RiziaDLC.Chapter1_Finished",
            "BaseGameSupport.CollectionItem_GoatStatue",
            "RiziaDLC.Chapter4_Finished",
            "RiziaDLC.Resources_Authority",
            "BaseGame.PersonalWealth",
            "BaseGame.Prologue_Birthplace_Lachaven_Rich"
          ]
        }
      },
      {
        "phase": "Turn 4: Aureus Gas Field Crisis, MITZ Negotiations & Derdia Outreach",
        "actions": [
          "[Chapter II: Between-Seas] Adjourn the diplomatic council and instruct the navy and industry to maintain high readiness."
        ],
        "context": "Turn 6: Concluding regional trade accords and naval reviews",
        "unlockedAchievements": [
          "Chapter II: Between-Seas"
        ],
        "technicalDetails": {
          "sceneTitle": "Aureus Gas Field Crisis, MITZ Negotiations & Derdia Outreach",
          "sceneFile": "Rizia_Turn 5_FPnT_MorellaNegotiations.md",
          "saveVariables": [
            "RiziaDLC.Chapter2_Finished",
            "RiziaDLC.Chapter3_Finished"
          ]
        }
      },
      {
        "phase": "Turn 5: Bilateral Negotiations with President Wiktor Smolak in Wehlen",
        "actions": [
          "[Smolak's Smokes] Take the cigar from Smolak, light it up, and sign the tobacco importation protocol."
        ],
        "context": "Turn 5: Smolak offers his personal stash of pungent Wehzek cigars",
        "unlockedAchievements": [
          "Smolak's Smokes"
        ],
        "technicalDetails": {
          "sceneTitle": "Bilateral Negotiations with President Wiktor Smolak in Wehlen",
          "sceneFile": "Rizia_Turn 5_FPnT_WehlenNegotiations.md",
          "saveVariables": [
            "RiziaDLC.Smolak_Tobacco_Imported",
            "RiziaDLC.Rusty_Arrested",
            "RiziaDLC.Situation_Economy_RRG_StateOwns100",
            "RiziaDLC.Theocracy_Declared"
          ]
        }
      },
      {
        "phase": "Turn 7: Zille Handover Ultimatum, Wehlen Summit & Derdian Duel",
        "actions": [
          "[Chapter III: Leviathan] Finalize your strategy regarding Pales and Zille as the regional crisis approaches boiling point.",
          "[Power of the Heavens] Purchase the Derdian ballistic missile batteries to arm Rizia's coastal and strategic defenses.",
          "[Nurists United] Unite the sacred scripture interpretations, affirm brotherhood under Saint Nur, and sign the concord of unity."
        ],
        "context": "Turn 8: Palace garden consultations on dynastic alliances and military preparations",
        "unlockedAchievements": [
          "Chapter III: Leviathan",
          "Power of the Heavens",
          "Nurists United"
        ],
        "technicalDetails": {
          "sceneTitle": "Zille Handover Ultimatum, Wehlen Summit & Derdian Duel",
          "sceneFile": "Rizia_Turn 8_Garden_Vina Non Marriage.md",
          "saveVariables": [
            "RiziaDLC.Chapter3_Finished",
            "RiziaDLC.Chapter4_Finished",
            "RiziaDLC.Missiles_Acquired",
            "RiziaDLC.Nurists_United",
            "RiziaDLC.Ending_Exile",
            "RiziaDLC.Levies_Abolished"
          ]
        }
      },
      {
        "phase": "Turn 8: Royal Economic Intelligence Briefing & Arrest of Rusty",
        "actions": [
          "[The Kingdom Incorporated] Sign the warrant to arrest Rusty for high treason and seize 100% of RRG for the Rizian Crown."
        ],
        "context": "Turn 9: Executive decree session regarding corporate malfeasance",
        "unlockedAchievements": [
          "The Kingdom Incorporated"
        ],
        "technicalDetails": {
          "sceneTitle": "Royal Economic Intelligence Briefing & Arrest of Rusty",
          "sceneFile": "Rizia_Turn 10_COUNCILOR RESIGNATION CHECKS.md",
          "saveVariables": [
            "RiziaDLC.Situation_Economy_RRG_StateOwns100",
            "RiziaDLC.Rusty_Arrested",
            "RiziaDLC.Beatrice_Insulted",
            "RiziaDLC.Theocracy_Declared"
          ]
        }
      },
      {
        "phase": "Turn 9: GRACE Imperial Summit Defiance Against Queen Beatrice",
        "actions": [
          "[Two Birds For Beatrice] Stand up, deliver a scathing insult to Queen Beatrice, and storm out of the imperial chamber."
        ],
        "context": "Turn 9: When Queen Beatrice scolds you and demands full obedience",
        "unlockedAchievements": [
          "Two Birds For Beatrice"
        ],
        "technicalDetails": {
          "sceneTitle": "GRACE Imperial Summit Defiance Against Queen Beatrice",
          "sceneFile": "Rizia_Turn 9_FPnT_GRACERumburgMeeting.md",
          "saveVariables": [
            "RiziaDLC.PorteDrazon_Pearl_Achieved",
            "RiziaDLC.Beatrice_Insulted"
          ]
        }
      },
      {
        "phase": "Special Phase: Enactment of Traditional Religious Decrees",
        "actions": [
          "[By Nur's Will, I Decree!] Promulgate the full codex of religious harmony and holy observances: 'By Nur's Will, I Decree!'.",
          "[I hereby declare...] Sign your 10th executive royal decree into law, shaping the legal landscape of the kingdom."
        ],
        "context": "Royal decree management",
        "unlockedAchievements": [
          "By Nur's Will, I Decree!",
          "I hereby declare..."
        ],
        "technicalDetails": {
          "sceneTitle": "Enactment of Traditional Religious Decrees",
          "sceneFile": "Rizia_Turn 1_Houses Briefing Section.md",
          "saveVariables": []
        }
      }
    ]
  },
  {
    "id": "rizia-grand-diplomat",
    "title": "The Grand Diplomat — Intermerkopum & Dynasty Reunification",
    "subtitle": "Intermerkopum Regional Pact • Dynastic Marriage • Peaceful Pales & Zille Integration",
    "sourceName": "Suzerain Playthrough Guide (v3.1.0)",
    "sourceLink": "https://www.torporgames.com",
    "sourceVersion": "3.1.0",
    "isVerifiedLatest": true,
    "game": "Rizia",
    "tags": [
      "Rizia",
      "Diplomatic"
    ],
    "archetype": "Grand Diplomat",
    "description": "Establish a sovereign regional bloc that breaks free from GRACE and superpower dominance. Found the Intermerkopum alliance uniting Rizia, Wehlen, Derdia, and Morella; peacefully reintegrate the Duchy of Pales through a historic royal marriage between Princess Vina and Duke Axel; and secure the unconditional return of Zille through diplomatic negotiation.",
    "disclaimer": "Do not declare war on Pales or antagonize Prime Minister Salane of Morella. Handle the AN arbitration impartially and maintain cooperative terms with Wiktor Smolak.",
    "presetId": "rizia-golden-kingdom",
    "achievements": [
      "Rizia Prologue: Ascension to the Throne",
      "Chapter I: King Romus",
      "Chapter II: Between-Seas",
      "Chapter III: Leviathan",
      "Chapter IV: Sila Orica",
      "Intermerkopum Alliance",
      "Great Unification",
      "Glovurius axa Rizia axa Pales",
      "Trustworthy Friends",
      "Peace to the Duke",
      "A Little Help From My Friends",
      "Sords, Our Friends",
      "Fall from GRACE",
      "The End of Powder and Blood",
      "Blaze of Glory",
      "Game of Spoons",
      "Romus the Generous",
      "So It Is",
      "Funny Man",
      "No Alcohol for me Please",
      "A King's Best Friend",
      "Save the Princess",
      "House Cleaning",
      "My Rule Continues",
      "True Master of Crisis",
      "Case Closed",
      "Let it Rayne"
    ],
    "compatibleAchievements": [
      "Intermerkopum Alliance",
      "Great Unification",
      "Glovurius axa Rizia axa Pales",
      "Trustworthy Friends",
      "Peace to the Duke"
    ],
    "incompatibleAchievements": [
      "Romus The Conqueror",
      "The World Against Us",
      "The Second Revolt"
    ],
    "exclusivePairs": [
      [
        "Glovurius axa Rizia axa Pales",
        "Romus The Conqueror"
      ],
      [
        "Peace to the Duke",
        "Blitzkrieg"
      ]
    ],
    "exclusiveGroups": [
      [
        "My Rule Continues",
        "Fragmentation",
        "Away from My Land"
      ]
    ],
    "crossRunExclusivePairs": [],
    "steps": [
      {
        "phase": "Prologue: Prince Romus's Youth, Marriage to Queen Lena & Royal Coronation",
        "actions": [
          "[Rizia Prologue: Ascension to the Throne] Accept the Golden Crown of Rizia upon your head, take the royal oath, and address the assembled noble houses.",
          "[Sords, Our Friends] Forge deep bilateral trade pacts with Sordland by completing the Wine/Whiskey agreement, tourism resort contract, and the Gasom co-investment deal."
        ],
        "context": "Coronation ceremony in the Grand Basilica of Porte Drazon",
        "unlockedAchievements": [
          "Rizia Prologue: Ascension to the Throne",
          "Sords, Our Friends"
        ],
        "technicalDetails": {
          "sceneTitle": "Prince Romus's Youth, Marriage to Queen Lena & Royal Coronation",
          "sceneFile": "Prologue_Archive.md",
          "saveVariables": [
            "RiziaDLC.Prologue_Finished",
            "RiziaDLC.Situation_Diplomacy_Sordland_GasomLowOutput",
            "RiziaDLC.PowerProjection_Overwhelming",
            "RiziaDLC.Situation_Economy_Sordland_ResortDeal",
            "RiziaDLC.Situation_Diplomacy_Sordland_WineWhiskeyDeal",
            "RiziaDLC.Situation_Diplomacy_Sordland_GasomHighOutput"
          ]
        }
      },
      {
        "phase": "Turn 1: Royal Council Organization, Zille Bombing Crisis & Beatrice Visit",
        "actions": [
          "[Chapter I: King Romus] Establish your foreign policy stance within GRACE and instruct the Royal Council to proceed with development.",
          "[Chapter IV: Sila Orica] Deliver your historic decennial address celebrating Rizia's sovereign triumphs.",
          "[Great Unification] Proclaim the Great Unification of Rizia, uniting Zille, Pales, and the realm under one eternal crown.",
          "[Glovurius axa Rizia axa Pales] Propose the royal betrothal of Princess Vina and Duke Axel to reunite Pales peacefully through love and dynastic bond."
        ],
        "context": "Turn 3: Concluding the imperial summit with Queen Beatrice",
        "unlockedAchievements": [
          "Chapter I: King Romus",
          "Chapter IV: Sila Orica",
          "Great Unification",
          "Glovurius axa Rizia axa Pales",
          "Blaze of Glory",
          "So It Is",
          "Save the Princess",
          "My Rule Continues",
          "True Master of Crisis"
        ],
        "technicalDetails": {
          "sceneTitle": "Royal Council Organization, Zille Bombing Crisis & Beatrice Visit",
          "sceneFile": "Rizia_Turn 3_FPnT_QueenBeatriceVisit.md",
          "saveVariables": [
            "RiziaDLC.Chapter1_Finished",
            "BaseGameSupport.CollectionItem_GoatStatue",
            "RiziaDLC.Chapter4_Finished",
            "RiziaDLC.Territory_Zille_Reunited",
            "RiziaDLC.NoCrisis_Achieved",
            "RiziaDLC.Territory_Pales_Reunited"
          ]
        }
      },
      {
        "phase": "Turn 2: Royal Kennels Adoption Session",
        "actions": [
          "[A King's Best Friend] Choose the spirited pup, name him Bruno, and welcome him as the royal companion.",
          "[Let it Rayne] Sign the comprehensive Sordish-Rizian trade and energy pact with President Anton Rayne's administration."
        ],
        "context": "Turn 2: When kennel masters present the new litter of royal dogs",
        "unlockedAchievements": [
          "A King's Best Friend",
          "Let it Rayne"
        ],
        "technicalDetails": {
          "sceneTitle": "Royal Kennels Adoption Session",
          "sceneFile": "Rizia_Turn 2_FPnT_SordlandTradeVisit.md",
          "saveVariables": [
            "RiziaDLC.Sordland_ComprehensiveDeal",
            "RiziaDLC.Adopted_Bruno",
            "RiziaDLCSupport.CollectionItem_FabergeEgg",
            "RiziaDLC.Second_Revolt_Triggered"
          ]
        }
      },
      {
        "phase": "Turn 3: Aristocratic Royal High Tea at Palas Rezna",
        "actions": [
          "[Game of Spoons] Pour the imperial tea with refined court grace, engage in witty diplomatic discussion, and compliment your guests."
        ],
        "context": "Turn 3/8: Serving rare teas and pastries in the palace garden conservatory",
        "unlockedAchievements": [
          "Game of Spoons"
        ],
        "technicalDetails": {
          "sceneTitle": "Aristocratic Royal High Tea at Palas Rezna",
          "sceneFile": "Rizia_Turn 3_FPnT_QueenBeatriceVisit.md",
          "saveVariables": [
            "BaseGame.Investment_Vineyard",
            "BaseGameSupport.CollectionItem_WineBottle",
            "RiziaDLC.HighTea_Hosted",
            "RiziaDLCSupport.CollectionItem_WruhecistMedallion"
          ]
        }
      },
      {
        "phase": "Turn 4: Aureus Gas Field Crisis, MITZ Negotiations & Derdia Outreach",
        "actions": [
          "[Chapter II: Between-Seas] Adjourn the diplomatic council and instruct the navy and industry to maintain high readiness."
        ],
        "context": "Turn 6: Concluding regional trade accords and naval reviews",
        "unlockedAchievements": [
          "Chapter II: Between-Seas"
        ],
        "technicalDetails": {
          "sceneTitle": "Aureus Gas Field Crisis, MITZ Negotiations & Derdia Outreach",
          "sceneFile": "Rizia_Turn 5_FPnT_MorellaNegotiations.md",
          "saveVariables": [
            "RiziaDLC.Chapter2_Finished",
            "RiziaDLC.Chapter3_Finished"
          ]
        }
      },
      {
        "phase": "Turn 5: Abolition of Feudal Peasant Levies and Armed Retinues",
        "actions": [
          "[The End of Powder and Blood] Sign the decree abolishing provincial feudal levies and demilitarizing private noble retinues.",
          "[Funny Man] Match Smolak's dark jokes with your own witty quips, bursting into shared laughter at the absurdities of politics."
        ],
        "context": "Turn 5: Royal military reform decree session",
        "unlockedAchievements": [
          "The End of Powder and Blood",
          "Funny Man"
        ],
        "technicalDetails": {
          "sceneTitle": "Abolition of Feudal Peasant Levies and Armed Retinues",
          "sceneFile": "Rizia_ABOLISHLEVIES_ABOLISHLEVIES Conversation.md",
          "saveVariables": [
            "BaseGameSupport.CollectionItem_PhotoFrameTorn",
            "RiziaDLC.Ending_Exile",
            "BaseGame.Divorced",
            "RiziaDLC.Levies_Abolished",
            "RiziaDLC.Worker_Rights_Passed",
            "RiziaDLC.Smolak_Humor_Engaged"
          ]
        }
      },
      {
        "phase": "Turn 6: Withdrawal from the Grand Regional Alliance of Commerce and Energy",
        "actions": [
          "[Fall from GRACE] Sign the proclamation withdrawing Rizia from GRACE and severing economic subservience to Rumburg."
        ],
        "context": "Turn 8: Royal decree session regarding international alliances",
        "unlockedAchievements": [
          "Fall from GRACE"
        ],
        "technicalDetails": {
          "sceneTitle": "Withdrawal from the Grand Regional Alliance of Commerce and Energy",
          "sceneFile": "Rizia_Turn 9_FPnT_GRACERumburgMeeting.md",
          "saveVariables": [
            "BaseGame.Alphonso_Legacy_Replicated",
            "RiziaDLC.Left_GRACE",
            "BaseGameSupport.CollectionItem_KesaroLighter"
          ]
        }
      },
      {
        "phase": "Turn 7: Zille Handover Ultimatum, Wehlen Summit & Derdian Duel",
        "actions": [
          "[Chapter III: Leviathan] Finalize your strategy regarding Pales and Zille as the regional crisis approaches boiling point.",
          "[Peace to the Duke] Sign the mutual non-aggression and bilateral defense treaty with the Grand Duchy of Pales.",
          "[A Little Help From My Friends] Present your legal arguments, call on allied nations to back Rizia, and celebrate the unanimous ruling in Rizia's favor.",
          "[Romus the Generous] Shower the Derdian temple with charitable endowments and humbly yield the match, earning his deep respect."
        ],
        "context": "Turn 8: Palace garden consultations on dynastic alliances and military preparations",
        "unlockedAchievements": [
          "Chapter III: Leviathan",
          "Peace to the Duke",
          "A Little Help From My Friends",
          "Romus the Generous"
        ],
        "technicalDetails": {
          "sceneTitle": "Zille Handover Ultimatum, Wehlen Summit & Derdian Duel",
          "sceneFile": "Rizia_Turn 8_Garden_Vina Non Marriage.md",
          "saveVariables": [
            "RiziaDLC.Chapter3_Finished",
            "RiziaDLC.Chapter4_Finished",
            "RiziaDLC.Pales_Alliance_Signed",
            "RiziaDLCSupport.CollectionItem_LucitaDagger",
            "BaseGame.Gasom_Investment",
            "RiziaDLC.AN_Arbitration_Won"
          ]
        }
      },
      {
        "phase": "Turn 8: Peaceful Reintegration and Handover of Zille from Wehlen",
        "actions": [
          "[Trustworthy Friends] Receive the instruments of transfer from President Smolak and hoist the Rizian flag over Zille.",
          "[House Cleaning] Sign royal dismissal orders and purge the corrupt aristocrats from government service.",
          "[Case Closed] Review the conclusive forensic evidence, sign the official findings, and formally close the Zille investigation."
        ],
        "context": "Turn 8/9: Formal ceremony of territorial retrocession",
        "unlockedAchievements": [
          "Trustworthy Friends",
          "House Cleaning",
          "Case Closed"
        ],
        "technicalDetails": {
          "sceneTitle": "Peaceful Reintegration and Handover of Zille from Wehlen",
          "sceneFile": "Rizia_Turn 5_FPnT_WehlenNegotiations.md & Rizia_Turn 7_Zille Treaty Discussion.md",
          "saveVariables": [
            "RiziaDLC.Zille_Peaceful_Handover",
            "RiziaDLC.Tradition_Preserved",
            "RiziaDLC.Nur_Decrees_Passed",
            "RiziaDLC.Court_Purged",
            "BaseGameSupport.CollectionItem_USPBrooch",
            "BaseGame.WonUSPLeadership"
          ]
        }
      },
      {
        "phase": "Turn 9: Founding Summit of the Intermerkopum Alliance in Porte Drazon",
        "actions": [
          "[Intermerkopum Alliance] Sign the historic Treaty of Porte Drazon, establishing the Intermerkopum alliance as a non-aligned regional bloc."
        ],
        "context": "Turn 9: Standing alongside President Smolak, President Salva, and Patriarch Azmal",
        "unlockedAchievements": [
          "Intermerkopum Alliance"
        ],
        "technicalDetails": {
          "sceneTitle": "Founding Summit of the Intermerkopum Alliance in Porte Drazon",
          "sceneFile": "Rizia_Turn 9_Morella Derdia Mediation.md",
          "saveVariables": [
            "RiziaDLC.Intermerkopum_Founded",
            "BaseGameSupport.ChessMatch_Lost"
          ]
        }
      },
      {
        "phase": "Special Phase: Strictly Teetotal Sovereign Governance",
        "actions": [
          "[No Alcohol for me Please] Politely decline wine or whiskey, requesting water or herbal tea instead: 'No alcohol for me, please'."
        ],
        "context": "During state banquets and toasts",
        "unlockedAchievements": [
          "No Alcohol for me Please"
        ],
        "technicalDetails": {
          "sceneTitle": "Strictly Teetotal Sovereign Governance",
          "sceneFile": "Rizia_Turn 1_Houses Briefing Section.md",
          "saveVariables": []
        }
      }
    ]
  },
  {
    "id": "rizia-fallen-monarch",
    "title": "The Fallen Monarch — Royal Bankruptcy & Revolution",
    "subtitle": "Treasury Depletion • Noble Rebellions • The Second Revolt • Royal Imprisonment & Exile",
    "sourceName": "Suzerain Playthrough Guide (v3.1.0)",
    "sourceLink": "https://www.torporgames.com",
    "sourceVersion": "3.1.0",
    "isVerifiedLatest": true,
    "game": "Rizia",
    "tags": [
      "Rizia",
      "Special"
    ],
    "archetype": "Fallen Monarch",
    "description": "Experience the downfall of the Rizian crown through aristocratic sedition or popular uprising. Deplete royal foreign reserves, incite noble rebellions from House Azaro or House Sazon, succumb to the flames of the Second Revolt, and face betrayal by royal companions, imprisonment, or exile into obscurity.",
    "disclaimer": "Triggered by severe resource depletion (negative budget/energy for multiple turns) and antagonizing all three Great Houses simultaneously.",
    "achievements": [
      "Rizia Prologue: Ascension to the Throne",
      "Chapter I: King Romus",
      "Chapter II: Between-Seas",
      "Chapter III: Leviathan",
      "Chapter IV: Sila Orica",
      "The Second Revolt",
      "Long Live the Revolution",
      "Et Tu Titus?",
      "The King Behind Bars",
      "Away from My Land",
      "Fragmentation",
      "Father's Son",
      "Tattered Kingdom",
      "Long Arm of Tzarborough",
      "The World Against Us",
      "Pipe Nightmares",
      "Hugo, I Go",
      "South Merkopa's Newest Member",
      "Arcasia Did It",
      "Return of the King",
      "It's Not You, It's Me"
    ],
    "compatibleAchievements": [
      "The Second Revolt",
      "Long Live the Revolution",
      "Et Tu Titus?",
      "Away from My Land",
      "The King Behind Bars"
    ],
    "incompatibleAchievements": [
      "Golden Age of Rizia",
      "Great Unification",
      "My Rule Continues"
    ],
    "exclusivePairs": [],
    "exclusiveGroups": [
      [
        "The Second Revolt",
        "Long Live the Revolution",
        "Et Tu Titus?",
        "The King Behind Bars",
        "Away from My Land",
        "Fragmentation"
      ]
    ],
    "crossRunExclusivePairs": [],
    "steps": [
      {
        "phase": "Prologue: Prince Romus's Youth, Marriage to Queen Lena & Royal Coronation",
        "actions": [
          "[Rizia Prologue: Ascension to the Throne] Accept the Golden Crown of Rizia upon your head, take the royal oath, and address the assembled noble houses."
        ],
        "context": "Coronation ceremony in the Grand Basilica of Porte Drazon",
        "unlockedAchievements": [
          "Rizia Prologue: Ascension to the Throne"
        ],
        "technicalDetails": {
          "sceneTitle": "Prince Romus's Youth, Marriage to Queen Lena & Royal Coronation",
          "sceneFile": "Prologue_Archive.md",
          "saveVariables": [
            "RiziaDLC.Prologue_Finished"
          ]
        }
      },
      {
        "phase": "Turn 1: Royal Council Organization, Zille Bombing Crisis & Beatrice Visit",
        "actions": [
          "[Chapter I: King Romus] Establish your foreign policy stance within GRACE and instruct the Royal Council to proceed with development.",
          "[Chapter IV: Sila Orica] Deliver your historic decennial address celebrating Rizia's sovereign triumphs.",
          "[The Second Revolt] Watch from palace ramparts as hundreds of thousands of workers demand the abolition of the monarchy.",
          "[Long Live the Revolution] Witness the workers raise their clenched fists and shout: 'Long live the revolution!' as royal rule collapses."
        ],
        "context": "Turn 3: Concluding the imperial summit with Queen Beatrice",
        "unlockedAchievements": [
          "Chapter I: King Romus",
          "Chapter IV: Sila Orica",
          "The Second Revolt",
          "Long Live the Revolution",
          "Et Tu Titus?",
          "The King Behind Bars",
          "Away from My Land",
          "Fragmentation",
          "Father's Son",
          "Tattered Kingdom",
          "Long Arm of Tzarborough",
          "Return of the King"
        ],
        "technicalDetails": {
          "sceneTitle": "Royal Council Organization, Zille Bombing Crisis & Beatrice Visit",
          "sceneFile": "Rizia_Turn 3_FPnT_QueenBeatriceVisit.md",
          "saveVariables": [
            "RiziaDLC.Chapter1_Finished",
            "BaseGameSupport.CollectionItem_GoatStatue",
            "RiziaDLC.Chapter4_Finished",
            "RiziaDLC.Second_Revolt_Triggered",
            "RiziaDLC.Sotelato_Revolution_Victorious",
            "RiziaDLC.Titus_Betrayal"
          ]
        }
      },
      {
        "phase": "Turn 4: Aureus Gas Field Crisis, MITZ Negotiations & Derdia Outreach",
        "actions": [
          "[Chapter II: Between-Seas] Adjourn the diplomatic council and instruct the navy and industry to maintain high readiness."
        ],
        "context": "Turn 6: Concluding regional trade accords and naval reviews",
        "unlockedAchievements": [
          "Chapter II: Between-Seas"
        ],
        "technicalDetails": {
          "sceneTitle": "Aureus Gas Field Crisis, MITZ Negotiations & Derdia Outreach",
          "sceneFile": "Rizia_Turn 5_FPnT_MorellaNegotiations.md",
          "saveVariables": [
            "RiziaDLC.Chapter2_Finished",
            "RiziaDLC.Chapter3_Finished"
          ]
        }
      },
      {
        "phase": "Turn 6: Rejecting All Romantic Advances from Lucita and Pabel",
        "actions": [
          "[It's Not You, It's Me] Keep a respectful, professional distance, stating: 'It's not you, it's me' and remaining focused on the Crown."
        ],
        "context": "Turn 6/8: When intimate romantic moments arise",
        "unlockedAchievements": [
          "It's Not You, It's Me"
        ],
        "technicalDetails": {
          "sceneTitle": "Rejecting All Romantic Advances from Lucita and Pabel",
          "sceneFile": "Rizia_Turn 10_RelationshipAnnouncement.md",
          "saveVariables": [
            "RiziaDLC.Said_Halaita",
            "RiziaDLC.Pabel_Public_Romance",
            "RiziaDLC.Romance_Declined"
          ]
        }
      },
      {
        "phase": "Turn 7: Zille Handover Ultimatum, Wehlen Summit & Derdian Duel",
        "actions": [
          "[Chapter III: Leviathan] Finalize your strategy regarding Pales and Zille as the regional crisis approaches boiling point.",
          "[Pipe Nightmares] Authorize covert agents to detonate explosives and sever the pipeline under cover of darkness.",
          "[Arcasia Did It] Authorize the covert operation to neutralize Adarfo and leak documents linking Arcasia to the attack."
        ],
        "context": "Turn 8: Palace garden consultations on dynastic alliances and military preparations",
        "unlockedAchievements": [
          "Chapter III: Leviathan",
          "Pipe Nightmares",
          "Arcasia Did It"
        ],
        "technicalDetails": {
          "sceneTitle": "Zille Handover Ultimatum, Wehlen Summit & Derdian Duel",
          "sceneFile": "Rizia_Turn 8_Garden_Vina Non Marriage.md",
          "saveVariables": [
            "RiziaDLC.Chapter3_Finished",
            "RiziaDLC.Chapter4_Finished",
            "RiziaDLC.Pipeline_Sabotaged",
            "RiziaDLC.Smolak_Tobacco_Imported",
            "RiziaDLC.Rusty_Arrested",
            "RiziaDLC.Situation_Economy_RRG_StateOwns100"
          ]
        }
      },
      {
        "phase": "Turn 8: Alliance of Nations Sanctions Plenary",
        "actions": [
          "[The World Against Us] Defy the international resolution as the AN overwhelmingly votes to impose total economic sanctions on Rizia.",
          "[Hugo, I Go] Support Princess Vina's autonomy and decline the dynastic marriage arrangement.",
          "[South Merkopa's Newest Member] Celebrate the reintegration of Zille alongside cheering crowds and welcome the province home."
        ],
        "context": "Turn 8/9: AN General Assembly vote in Kyrene",
        "unlockedAchievements": [
          "The World Against Us",
          "Hugo, I Go",
          "South Merkopa's Newest Member"
        ],
        "technicalDetails": {
          "sceneTitle": "Alliance of Nations Sanctions Plenary",
          "sceneFile": "Rizia_Turn 4_A_CouncilTalkAboutPales.md",
          "saveVariables": [
            "RiziaDLC.AN_Sanctioned",
            "RiziaDLCSupport.CollectionItem_IzaKey",
            "RiziaDLC.Executions_Authorized",
            "RiziaDLC.War_Pales_Defeat",
            "RiziaDLC.Worker_Rights_Passed",
            "RiziaDLC.Zille_Reintegrated"
          ]
        }
      }
    ]
  },
  {
    "id": "master-archivist-quirks",
    "title": "The Master Archivist — 36 Collectibles & Hidden Easter Eggs",
    "subtitle": "All 36 Relics & Curios • Serge's Lucky Charm • Lucian's Chess Match • Royal Hoarder",
    "sourceName": "Suzerain Playthrough Guide (v3.1.0)",
    "sourceLink": "https://www.torporgames.com",
    "sourceVersion": "3.1.0",
    "isVerifiedLatest": true,
    "game": "Both",
    "tags": [
      "Both",
      "Special"
    ],
    "archetype": "Master Archivist",
    "description": "A comprehensive operational briefing dedicated to completing the presidential cabinet and royal curio collection. Acquire all 36 ground-truth historical collectibles verified against official Torpor engine archives, discover driver Serge Wolkner's good-luck charms, best chief strategist Lucian Galade at chess, and unlock the game's most memorable narrative secrets.",
    "disclaimer": "Collectibles can be acquired across both Sordland and Rizia playthroughs. Many items require specific dialogue choices during personal or informal meetings.",
    "achievements": [
      "Collectible: Circas's Poem Book",
      "Collectible: Ceremonial Scissors",
      "Collectible: Armadine Radio",
      "Collectible: Whiskey Bottle",
      "Collectible: Sordish Goat Statue",
      "Collectible: Aschraf Candle",
      "Collectible: USP Brooch",
      "Collectible: Serge's Pocket Watch",
      "Collectible: Underhall Trophy",
      "Collectible: Car Key",
      "Collectible: Headphones",
      "Collectible: Gun",
      "Collectible: Cigar Box",
      "Collectible: King Egmund's Dagger",
      "Collectible: Kesaro's Lighter",
      "Collectible: Wine Bottle",
      "Collectible: Torn Family Photo",
      "Collectible: FC Anrica Trophy",
      "Executive Hoarder",
      "Thank You Serge",
      "Save the World",
      "638 Ways to Kill Rayne",
      "Goated",
      "FC Anrica",
      "Giralt of Ribery",
      "Collectible: Lena's Wedding Ring",
      "Collectible: St. Dast's Scepter",
      "Collectible: Valenqiris Postcard",
      "Collectible: Wruhecist Medallion",
      "Collectible: Morellan Tin Bird",
      "Collectible: Azaro Chess Piece",
      "Collectible: ROG Plaque",
      "Collectible: Intermerkopum Rings",
      "Collectible: Wehzek Doorstop",
      "Collectible: Mandragora Extract",
      "Collectible: Hattersley Egg",
      "Collectible: RRN Rizania Model",
      "Collectible: Bruno's Dog Toy",
      "Collectible: Lucita's Dagger",
      "Collectible: Crown of Pales",
      "Collectible: Iza Gate Key",
      "Collectible: Pabel's Poem",
      "Collectible: Bull Figurine",
      "Royal Hoarder",
      "Sanctuary! Sanctuary!",
      "I Want to Believe",
      "You've Got Nerve"
    ],
    "compatibleAchievements": [
      "Executive Hoarder",
      "Royal Hoarder",
      "Thank You Serge",
      "Save the World",
      "638 Ways to Kill Rayne"
    ],
    "incompatibleAchievements": [],
    "exclusivePairs": [],
    "exclusiveGroups": [],
    "crossRunExclusivePairs": [],
    "steps": [
      {
        "phase": "Turn 1: Late Evening Drinks with Petr Vectern",
        "actions": [
          "[Collectible: Whiskey Bottle] Accept a glass of the vintage whiskey and keep the decorative bottle in your private cabinet.",
          "[Collectible: USP Brooch] Rally the delegates around your achievements and win the vote against Lileas Graf.",
          "[Collectible: Headphones] Put on the heavy military communication headset to receive live frontline telemetry from your generals.",
          "[Collectible: Torn Family Photo] Tell Monica that her ambitions are unimportant and allow the marriage to dissolve into divorce."
        ],
        "context": "Turn 1/5: Petr uncorks a bottle of 30-year-old aged Erlory maroon whiskey",
        "unlockedAchievements": [
          "Collectible: Whiskey Bottle",
          "Collectible: USP Brooch",
          "Collectible: Headphones",
          "Collectible: Torn Family Photo",
          "Collectible: FC Anrica Trophy",
          "Thank You Serge",
          "Save the World",
          "638 Ways to Kill Rayne",
          "Goated",
          "Collectible: Lena's Wedding Ring",
          "Collectible: St. Dast's Scepter",
          "Collectible: Crown of Pales",
          "You've Got Nerve"
        ],
        "technicalDetails": {
          "sceneTitle": "Late Evening Drinks with Petr Vectern",
          "sceneFile": "Sordland_Turn05_Personal_PetrParty.md",
          "saveVariables": [
            "BaseGameSupport.CollectionItem_WhiskeyBottle",
            "BaseGameSupport.CollectionItem_USPBrooch",
            "BaseGame.WonUSPLeadership",
            "BaseGameSupport.CollectionItem_Headphones",
            "BaseGameSupport.CollectionItem_CarKey",
            "BaseGameSupport.CollectionItem_PhotoFrameTorn"
          ]
        }
      },
      {
        "phase": "Turn 2: State Memorial Funeral for Bernard Circas",
        "actions": [
          "[Collectible: Circas's Poem Book] Deliver a solemn speech honoring the fallen poet and accept the memorial edition of his poetry book from mourners.",
          "[Collectible: Underhall Trophy] Award the contract to Underhall Construction Company [-2 Budget].",
          "[Collectible: Cigar Box] Accept a cigar from Walter Tusk and take the antique cigar box as a personal gift.",
          "[Collectible: Valenqiris Postcard] Approve the Valenqiris resort contract with HOS and receive the promotional postcard."
        ],
        "context": "Turn 2: Paying respects at the casket of Bernard Circas",
        "unlockedAchievements": [
          "Collectible: Circas's Poem Book",
          "Collectible: Underhall Trophy",
          "Collectible: Cigar Box",
          "Collectible: Valenqiris Postcard",
          "Collectible: Bruno's Dog Toy"
        ],
        "technicalDetails": {
          "sceneTitle": "State Memorial Funeral for Bernard Circas",
          "sceneFile": "Sordland_Turn02_Personal_Funeral.md",
          "saveVariables": [
            "BaseGameSupport.CollectionItem_PoemBook",
            "RiziaDLC.Policy_RD_Welfare_RomusTorasHospital_Completed",
            "BaseGameSupport.CollectionItem_UnderhallTrophy",
            "RiziaDLC.Policy_RD_Order_RomusTorasAcademy_Completed",
            "RiziaDLC.Policy_RD_Welfare_RomusTorasUniversity_Completed",
            "RiziaDLC.Valero_Legacy_Vindicated"
          ]
        }
      },
      {
        "phase": "Turn 3: Morning Commute with Serge Wolkner & Outside the National Assembly",
        "actions": [
          "[Collectible: Serge's Pocket Watch] My driver's family shouldn't want for anything in this world. I'll cover your children's education and any other extra expenses you need. [-2 Personal Wealth].",
          "[Collectible: Bull Figurine] Admire the bronze craftsmanship of Montaklar and accept the carved Bull Figurine."
        ],
        "context": "Turn 3: When Serge opens up about being unable to afford his children's schooling",
        "unlockedAchievements": [
          "Collectible: Serge's Pocket Watch",
          "Collectible: Bull Figurine"
        ],
        "technicalDetails": {
          "sceneTitle": "Morning Commute with Serge Wolkner & Outside the National Assembly",
          "sceneFile": "Sordland_Turn03_Personal_DriverTalk.md & Sordland_Turn07_A_AssemblyVote.md",
          "saveVariables": [
            "RiziaDLC.Intermerkopum_Founded",
            "BaseGameSupport.CollectionItem_Pocketwatch",
            "BaseGameSupport.Journal_Turn03_DriverTalk_PaidForEducation",
            "BaseGame.Relations_Serge_Friend",
            "RiziaDLCSupport.CollectionItem_BullFigurine",
            "RiziaDLC.UFO_Investigated"
          ]
        }
      },
      {
        "phase": "Turn 4: Private Stock Investment Opportunity with Gus Manger",
        "actions": [
          "[Collectible: Armadine Radio] Invest 1 or 2 Personal Wealth into Armadine Industries shares.",
          "[Collectible: Sordish Goat Statue] Praise the craftsmanship of the local highland herders and accept the hand-carved Sordish mountain goat figurine.",
          "[Collectible: Wruhecist Medallion] Inspect the ancient religious relics and keep the solid gold Wruhecist Medallion.",
          "[Collectible: Azaro Chess Piece] Play out the tactical chess game with Lucita and accept the carved Azaro marble chess piece as a memento."
        ],
        "context": "Turn 4: Gus Manger offers insider allocation in Arcasian-partnered Armadine Industries stock",
        "unlockedAchievements": [
          "Collectible: Armadine Radio",
          "Collectible: Sordish Goat Statue",
          "Collectible: Wruhecist Medallion",
          "Collectible: Azaro Chess Piece",
          "Sanctuary! Sanctuary!"
        ],
        "technicalDetails": {
          "sceneTitle": "Private Stock Investment Opportunity with Gus Manger",
          "sceneFile": "Sordland_Turn05_Personal_ReturnOfInvestment.md",
          "saveVariables": [
            "BaseGameSupport.CollectionItem_ArmadineRadio",
            "BaseGame.Investment_Armadine",
            "BaseGameSupport.CollectionItem_GoatStatue",
            "BaseGame.Investment_Vineyard",
            "BaseGameSupport.CollectionItem_WineBottle",
            "RiziaDLCSupport.CollectionItem_WruhecistMedallion"
          ]
        }
      },
      {
        "phase": "Turn 5: Petr's Party Vineyard Investment & First Harvest Vintage Delivery",
        "actions": [
          "[Collectible: Wine Bottle] Invest 1 Personal Wealth into Gus Manger's vineyard venture.",
          "[FC Anrica] Invest 1 Personal Wealth to acquire shares in Football Club Anrica.",
          "[Giralt of Ribery] Invest 1 Personal Wealth into Gus Manger's vineyard venture in Anrica.",
          "[Collectible: Wehzek Doorstop] Accept the gold-plated Wehzek doorstop with good humor and thank the President."
        ],
        "context": "Turn 5: Gus Manger discusses investing in private Sordish wine production",
        "unlockedAchievements": [
          "Collectible: Wine Bottle",
          "FC Anrica",
          "Giralt of Ribery",
          "Collectible: Wehzek Doorstop",
          "Collectible: RRN Rizania Model",
          "I Want to Believe"
        ],
        "technicalDetails": {
          "sceneTitle": "Petr's Party Vineyard Investment & First Harvest Vintage Delivery",
          "sceneFile": "Sordland_Turn05_Personal_PetrParty.md",
          "saveVariables": [
            "BaseGame.Investment_Vineyard",
            "BaseGameSupport.CollectionItem_WineBottle",
            "BaseGameSupport.CollectionItem_CeremonialScissors",
            "RiziaDLC.Prologue_Finished",
            "RiziaDLCSupport.CollectionItem_WehzekDoorstop",
            "RiziaDLCSupport.CollectionItem_DogToy"
          ]
        }
      },
      {
        "phase": "Turn 6: Inauguration Ceremony of the Mega-Infrastructure Project",
        "actions": [
          "[Collectible: Ceremonial Scissors] Take the ceremonial gold scissors, cut the ribbon, and declare the transit corridor open.",
          "[Collectible: King Egmund's Dagger] Praise the martial prowess of the ancient Kingdom of Sordland and receive King Egmund's ceremonial dagger.",
          "[Collectible: Kesaro's Lighter] Accept Keshar Kibener's lucky engraved lighter as a token of mutual understanding.",
          "[Collectible: Morellan Tin Bird] Accept the wind-up mechanical tin bird crafted by Morellan artisans as a diplomatic gift."
        ],
        "context": "Turn 6: Standing before the inaugural ribbon at Conriat station or Agnland highway",
        "unlockedAchievements": [
          "Collectible: Ceremonial Scissors",
          "Collectible: King Egmund's Dagger",
          "Collectible: Kesaro's Lighter",
          "Collectible: Morellan Tin Bird",
          "Collectible: ROG Plaque",
          "Collectible: Lucita's Dagger"
        ],
        "technicalDetails": {
          "sceneTitle": "Inauguration Ceremony of the Mega-Infrastructure Project",
          "sceneFile": "Sordland_Turn06_InT_RailwayOpening.md",
          "saveVariables": [
            "BaseGameSupport.CollectionItem_CeremonialScissors",
            "BaseGameSupport.CollectionItem_ArmadineRadio",
            "BaseGame.Investment_Armadine",
            "RiziaDLCSupport.CollectionItem_WeddingRing",
            "BaseGameSupport.CollectionItem_Dagger",
            "BaseGameSupport.CollectionItem_Pocketwatch"
          ]
        }
      },
      {
        "phase": "Turn 7: State Corporation Privatization and Executive Purchasing",
        "actions": [
          "[Collectible: Car Key] Acquire the imported luxury executive sedan or accept the vehicle gift from Walter Tusk.",
          "[Collectible: Mandragora Extract] Accept the flask of concentrated mandragora extract with reverent respect."
        ],
        "context": "Turn 7: Deciding personal luxury allocations during market privatization",
        "unlockedAchievements": [
          "Collectible: Car Key",
          "Collectible: Mandragora Extract"
        ],
        "technicalDetails": {
          "sceneTitle": "State Corporation Privatization and Executive Purchasing",
          "sceneFile": "Sordland_Turn07_NEDAM OR SSC PRIVATISED.md",
          "saveVariables": [
            "BaseGameSupport.CollectionItem_AnricaTrophy",
            "BaseGame.Investment_FCAnrica",
            "BaseGameSupport.CollectionItem_CarKey",
            "RiziaDLCSupport.CollectionItem_MandragoraExtract",
            "RiziaDLC.Policy_RD_Welfare_RomusTorasHospital_Completed",
            "BaseGameSupport.CollectionItem_UnderhallTrophy"
          ]
        }
      },
      {
        "phase": "Turn 8: Aschraf Anniversary Commemoration in Bergia",
        "actions": [
          "[Collectible: Aschraf Candle] Walk into the crowd without excessive armed escort, approach Mansoun Leke respectfully, take the memorial candle, and hold it up in silence.",
          "[Collectible: Iza Gate Key] Accept the ornamental gold key to Iza's historical Mousser Gate as a symbol of royal harmony.",
          "[Collectible: Pabel's Poem] Take the handwritten poem scroll, read it with warm affection, and thank Pabel sincerely."
        ],
        "context": "Turn 8: Arriving at the memorial gathering in Bergia",
        "unlockedAchievements": [
          "Collectible: Aschraf Candle",
          "Collectible: Iza Gate Key",
          "Collectible: Pabel's Poem"
        ],
        "technicalDetails": {
          "sceneTitle": "Aschraf Anniversary Commemoration in Bergia",
          "sceneFile": "Sordland_Turn08_A_AschrafAnniversary.md",
          "saveVariables": [
            "BaseGame.Aschraf_CandleLit",
            "BaseGameSupport.CollectionItem_AschrafCandle",
            "RiziaDLCSupport.CollectionItem_IzaKey",
            "RiziaDLC.Smolak_Tobacco_Imported",
            "RiziaDLC.Arcasia_Framed",
            "RiziaDLCSupport.CollectionItem_PoemScroll"
          ]
        }
      },
      {
        "phase": "Turn 9: Personal Defense Measures & War Preparation Briefing",
        "actions": [
          "[Collectible: Gun] Acquire the custom revolver and place it in the top drawer of the presidential desk.",
          "[Collectible: Intermerkopum Rings] Sign the Intermerkopum charter and unveil the interlocking gold rings emblem representing Merkopa's unity.",
          "[Collectible: Hattersley Egg] Accept Queen Beatrice's royal gift of the gem-encrusted imperial Hattersley Egg with polite court etiquette."
        ],
        "context": "Turn 9: Reviewing personal security protocols amidst threats from Rumburg or assassins",
        "unlockedAchievements": [
          "Collectible: Gun",
          "Collectible: Intermerkopum Rings",
          "Collectible: Hattersley Egg"
        ],
        "technicalDetails": {
          "sceneTitle": "Personal Defense Measures & War Preparation Briefing",
          "sceneFile": "Sordland_Turn09_SnO_MilitaryParade.md",
          "saveVariables": [
            "RiziaDLC.HighTea_Hosted",
            "BaseGameSupport.CollectionItem_Gun",
            "BaseGame.Decision_Turn08_ExtendEmergency_Extend",
            "BaseGame.Decision_Turn05_AutocratEmergency_Extend",
            "RiziaDLCSupport.CollectionItem_IntermerkopumPlaque",
            "RiziaDLCSupport.CollectionItem_FabergeEgg"
          ]
        }
      },
      {
        "phase": "Special Phase: Presidential Study Collection Desk",
        "actions": [
          "[Executive Hoarder] Inspect your sprawling collection of mementos, historical relics, and personal keepsakes.",
          "[Royal Hoarder] Admire your sprawling museum-grade royal collection gathered across South Merkopa."
        ],
        "context": "Turn 10: Reviewing your presidential desk and study",
        "unlockedAchievements": [
          "Executive Hoarder",
          "Royal Hoarder"
        ],
        "technicalDetails": {
          "sceneTitle": "Presidential Study Collection Desk",
          "sceneFile": "Sordland_Turn10_A_DeividFinalTalk.md",
          "saveVariables": []
        }
      }
    ]
  }
];

export const achievementPathwaysMap = new Map<string, Pathway[]>();

for (const pathway of communityPathways) {
	for (const achievement of pathway.achievements) {
		const existing = achievementPathwaysMap.get(achievement) ?? [];
		if (!existing.some((p) => p.id === pathway.id)) {
			achievementPathwaysMap.set(achievement, [...existing, pathway]);
		}
	}
	for (const achievement of pathway.compatibleAchievements ?? []) {
		const existing = achievementPathwaysMap.get(achievement) ?? [];
		if (!existing.some((p) => p.id === pathway.id)) {
			achievementPathwaysMap.set(achievement, [...existing, pathway]);
		}
	}
}
