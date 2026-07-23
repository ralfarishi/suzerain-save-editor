// Achievement-first run data for the Planner recommendation engine.
// Each run represents a single playthrough cluster. Achievements are listed
// exactly as they appear in steam_achievements.ts for exact name matching.
// Source: Steam Community Guide "All Suzerain Achievements and How to Get Them"
// (Crummy Wizard, Build 153) cross-verified against suzerain-achievement-report.md

export type RunTag =
  | "Sordland"
  | "Rizia"
  | "Authoritarian"
  | "Reformist"
  | "Diplomatic"
  | "Economy"
  | "Military"
  | "Special";

export interface Run {
  id: string;
  title: string;
  subtitle: string;
  game: "Sordland" | "Rizia" | "Both";
  tags: RunTag[];
  description: string;
  /** Links to a Pathway ID for "View Walkthrough" CTA */
  pathwayId?: string;
  /** All achievement names obtainable in one playthrough of this run */
  achievements: string[];
  /**
   * Binary exclusive pairs WITHIN this run.
   * User can obtain one OR the other per playthrough, not both.
   */
  exclusivePairs: [string, string][];
  /**
   * Groups of achievements where only ONE can be obtained per playthrough.
   * e.g., all Sordland endings, all ideology archetypes, all Rizia legacy titles.
   */
  exclusiveGroups: string[][];
  /**
   * Pairs of achievements exclusive with achievements in ANOTHER run.
   * Format: [achievementInThisRun, achievementInAnotherRun]
   * Surfaced as a cross-run conflict warning in the planner when the user
   * selects both. Both achievements ARE obtainable — just not in the same playthrough.
   */
  crossRunExclusivePairs?: [string, string][];
  sourceVersion: string;
  isVerifiedLatest: boolean;
}

// ─── Shared achievement sets to reduce repetition ─────────────────────────────

const SORDLAND_PROGRESSION = [
  "Prologue: Rise to Power",
  "Chapter I: President Rayne",
  "Chapter II: A New Sordland",
  "Chapter III: Victim of Changes",
  "Chapter IV: Checkmate",
  "First Step To Golconda",
];

const SORDLAND_FLEXIBLE = [
  "An Offer You Cannot Refuse",
  "\u201cDonations\u201d",
  "Grand National Assembly",
  "The Constitution of '56",
  "Underhall Once Again #1",
  "FC Anrica",
  "Giralt of Ribery",
  "Goated",
  "Just Another Funeral",
  "Rags to Riches",
  "Frugal",
  "Sordish Economic Recovery",
  "Sordish Depression",
  "Another Alphonso",
  "Feel My Energy",
  "Kiss My Gas",
  "New Generation of Sords",
  "Revolutionary Generation",
  "This Can't Go On Like This, Anton",
  "Family Man",
  "Valgslandian Vodka",
  "Operation Bear Trap",
  "True Master of Crisis",
  "Master of Crisis",
  "Yes I'm Alone But Then Again I Always Was",
  "Down with Rayne!",
  "Revenge of Izzam",
  "Save the World",
  "Thank You Serge",
  "638 Ways to Kill Rayne",
  "Every Vote Matters",
  "Sordish War Machine",
  "Welfare State",
];

const SORDLAND_ENDINGS = [
  "A Morgna her coren!",
  "Just Another Sordish President",
  "A New Hope",
  "Forced Out",
  "Demoted",
  "Impeached",
  "Coup d\u2019\u00c9tat",
  "World At War",
  "Path To Exile",
  "Assassinated",
  "Early Retirement",
  "Hail the Queen",
  "Vectern sis da!",
];

const SORDLAND_IDEOLOGY = [
  "Authoritarian",
  "Sollist",
  "Democrat",
  "Centrist",
  "Malenyevist",
  "Capitalist",
];

const SORDLAND_ALLIANCES = [
  '"Freedom or Peril"',
  '"Fortune, Strength, Liberty"',
  '"Through Broken Shackles"',
  "United Against Communism",
  "United Against Capitalism",
  "Purple Blood",
  "Freedom and Justice",
  "Rightful Claim",
  "Reconciliation",
  "No Friends But Sords",
];

const SORDLAND_COLLECTIBLES = [
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
];

const RIZIA_PROGRESSION = [
  "Rizia Prologue: Ascension to the Throne",
  "Chapter I: King Romus",
  "Chapter II: Between-Seas",
  "Chapter III: Leviathan",
  "Chapter IV: Sila Orica",
];

// Achievements available in most Rizia runs regardless of path
const RIZIA_FLEXIBLE = [
  "So It Is",
  "Blaze of Glory",
  "Game of Spoons",
  "Carb Diet",
  "Romus the Generous",
  "Smolak's Smokes",
  "Domineering",
  "Through Machinery and Industry",
  "Arms Exporter",
  "Arms Importer",
  "Say My Name",
  "People's Army",
  "A Little Help From My Friends",
  "Pipe Nightmares",
  "Case Closed",
  "I Want to Believe",
  "The Second Revolt",
  "Arcasia Did It",
  "Long Live the Revolution",
  "Mine All Mine",
  "What's Mined Is Yours",
  "The End of Powder and Blood",
];

const RIZIA_ENDINGS = [
  "My Rule Continues",
  "Fragmentation",
  "Return of the King",
  "Long Arm of Tzarborough",
  "The King Is Dead",
  "The King Behind Bars",
  "Away from My Land",
  "Hugo, I Go",
  "Et Tu Titus?",
  "South Merkopa's Newest Member",
  "Father's Son",
  "Tattered Kingdom",
];

const RIZIA_TITLES = [
  "Make Yourself Great Again",
  "Wruhecs Chosen",
  "I hereby declare...",
  "Funny Man",
  "No Alcohol for me Please",
  "Tradition is Our Compass, the Past Our Strength.",
];

const RIZIA_COLLECTIBLES_SHARED = [
  "Collectible: St. Dast's Scepter",
  "Collectible: Wruhecist Medallion",
  "Collectible: Morellan Tin Bird",
  "Collectible: ROG Plaque",
  "Collectible: Valenqiris Postcard",
  "Collectible: Wehzek Doorstop",
  "Collectible: RRN Rizania Model",
  "Collectible: Lena's Wedding Ring",
  "Royal Hoarder",
];

// ─── Shared exclusive pair rules ──────────────────────────────────────────────

const SORDLAND_COMMON_PAIRS: [string, string][] = [
  ["Grand L-1 Opening", "Grand H-3 Opening"],
  ["Family Man", "This Can't Go On Like This, Anton"],
  ["True Master of Crisis", "Master of Crisis"],
  ["Sordish Economic Recovery", "Sordish Depression"],
  // No alliances vs any alliance
  ["No Friends But Sords", '"Freedom or Peril"'],
  ["No Friends But Sords", '"Fortune, Strength, Liberty"'],
  ["No Friends But Sords", '"Through Broken Shackles"'],
  ["No Friends But Sords", "United Against Communism"],
  ["No Friends But Sords", "United Against Capitalism"],
  ["No Friends But Sords", "Purple Blood"],
  ["No Friends But Sords", "Reconciliation"],
  ["No Friends But Sords", "Rightful Claim"],
  ["No Friends But Sords", "Freedom and Justice"],
  // Opposing alliances
  ["United Against Communism", "United Against Capitalism"],
  // War outcomes
  ["Vectern sis da!", "Hail the Queen"],
];

// ─── Run Definitions ──────────────────────────────────────────────────────────

export const runs: Run[] = [
  // ─── SORDLAND RUN A ─────────────────────────────────────────────────────────
  {
    id: "sordland-a",
    title: "Run A — Dictator / Emergency Path",
    subtitle: "Article 100 → SSP → Authoritarian Constitution",
    game: "Sordland",
    tags: ["Sordland", "Authoritarian"],
    description:
      "Collaborate with Chief Justice Hawker to declare the state of emergency. Form the Secret State Police, pursue authoritarian constitutional reform, and consolidate power. The definitive path for all SSP, Emergency, and Sollist/Authoritarian achievements.",
    pathwayId: "sordland-run-a-dictator",
    achievements: [
      // Sordland progression
      ...SORDLAND_PROGRESSION,
      // Run A exclusive achievements
      "Article 100",
      "Hawker's Plan",
      "Sssh!",
      "By Any Means Necessary",
      "Alexius Maximus Reginald the Third",
      "Crocodile Tears",
      "Chessmaster",
      "Soll's Legacy",
      "End of an Era",
      "No Sordland For Old Men",
      "Authoritarian",
      "Sollist",
      "Merkopa's Most Unfair Election System",
      "Yollak Bluderat!",
      "Militarist State",
      "Police State",
      "Obstructionist",
      "Make Sordland Great Again",
      // Flexible achievements available in both runs
      ...SORDLAND_FLEXIBLE,
      // Endings
      ...SORDLAND_ENDINGS,
      // Alliances (run A can pursue various)
      '"Freedom or Peril"',
      '"Fortune, Strength, Liberty"',
      '"Through Broken Shackles"',
      "United Against Communism",
      "United Against Capitalism",
      "Purple Blood",
      "Rightful Claim",
      "Reconciliation",
      "No Friends But Sords",
      // Ideology (only Authoritarian/Sollist/Centrist/Malenyevist/Capitalist — not Democrat)
      "Authoritarian",
      "Sollist",
      "Centrist",
      "Malenyevist",
      "Capitalist",
      // Collectibles
      ...SORDLAND_COLLECTIBLES,
      // Cross-save
      "Two Birds For Beatrice",
    ],
    exclusivePairs: [
      ["End of an Era", "No Sordland For Old Men"],
      ["Militarist State", "Police State"],
      ["Obstructionist", "Lawmaker"],
      ...SORDLAND_COMMON_PAIRS,
    ],
    exclusiveGroups: [
      SORDLAND_ENDINGS,
      ["Authoritarian", "Sollist", "Centrist", "Malenyevist", "Capitalist"],
    ],
    crossRunExclusivePairs: [
      // SSP vs ACP — binary agency choice, one per playthrough
      ["Sssh!", "Drain the Swamp"],
    ],
    sourceVersion: "3.1.0.1.153",
    isVerifiedLatest: true,
  },

  // ─── SORDLAND RUN B ─────────────────────────────────────────────────────────
  {
    id: "sordland-b",
    title: "Run B — Democratic Reformer",
    subtitle: "Veto Campaign Finance → ACP → Democratic Constitution",
    game: "Sordland",
    tags: ["Sordland", "Reformist"],
    description:
      "Veto the Campaign Finance Bill, form the Anti-Corruption Police, pursue democratic constitutional reform with 3% threshold or Articles 6 & 7. The definitive path for Democrat, Man of the People, The Bludish Dream, and Freedom & Justice achievements.",
    pathwayId: "sordland-run-b-democratic",
    achievements: [
      // Sordland progression
      ...SORDLAND_PROGRESSION,
      // Run B exclusive
      "Man of the People",
      "Freedom and Justice",
      "A Sordland For All",
      "The Bludish Dream",
      "We Are All Citizens Of Sordland",
      "Lawmaker",
      "Catchphrase",
      "Democrat",
      "I Still Love You",
      "Speaking Louder Makes You Right",
      "Drain the Swamp",
      "Pluralist",
      "Chessmaster",
      // Flexible achievements
      ...SORDLAND_FLEXIBLE,
      // Endings
      ...SORDLAND_ENDINGS,
      // Alliances
      '"Freedom or Peril"',
      '"Fortune, Strength, Liberty"',
      '"Through Broken Shackles"',
      "United Against Communism",
      "United Against Capitalism",
      "Purple Blood",
      "Freedom and Justice",
      "Rightful Claim",
      "Reconciliation",
      "No Friends But Sords",
      // Ideology (only Democrat/Centrist/Malenyevist/Capitalist — not Authoritarian/Sollist)
      "Democrat",
      "Centrist",
      "Malenyevist",
      "Capitalist",
      // Additional B-compatible achievements
      "Make Sordland Great Again",
      "Obstructionist",
      // Collectibles
      ...SORDLAND_COLLECTIBLES,
      // Cross-save
      "Two Birds For Beatrice",
    ],
    exclusivePairs: [
      // A Sordland For All vs Pluralist: Gloria Tory can't concede both
      ["A Sordland For All", "Pluralist"],
      // The Bludish Dream requires A Sordland For All so conflicts with Pluralist too
      ["The Bludish Dream", "Pluralist"],
      ["Obstructionist", "Lawmaker"],
      ["Grand L-1 Opening", "Grand H-3 Opening"],
      ["Family Man", "This Can't Go On Like This, Anton"],
      ["True Master of Crisis", "Master of Crisis"],
      ["Sordish Economic Recovery", "Sordish Depression"],
      ["No Friends But Sords", '"Freedom or Peril"'],
      ["No Friends But Sords", '"Fortune, Strength, Liberty"'],
      ["No Friends But Sords", '"Through Broken Shackles"'],
      ["No Friends But Sords", "United Against Communism"],
      ["No Friends But Sords", "United Against Capitalism"],
      ["No Friends But Sords", "Purple Blood"],
      ["No Friends But Sords", "Reconciliation"],
      ["No Friends But Sords", "Rightful Claim"],
      ["No Friends But Sords", "Freedom and Justice"],
      ["United Against Communism", "United Against Capitalism"],
      ["Vectern sis da!", "Hail the Queen"],
      // Drain the Swamp vs Sssh! is cross-run (this is Run B which only has Drain)
    ],
    exclusiveGroups: [
      SORDLAND_ENDINGS,
      ["Democrat", "Centrist", "Malenyevist", "Capitalist"],
    ],
    crossRunExclusivePairs: [
      // ACP vs SSP — binary agency choice, one per playthrough
      ["Drain the Swamp", "Sssh!"],
    ],
    sourceVersion: "3.1.0.1.153",
    isVerifiedLatest: true,
  },

  // ─── RIZIA RUN C1 ───────────────────────────────────────────────────────────
  {
    id: "rizia-c1",
    title: "Run C1 — Faith & Theocracy",
    subtitle: "Support Wruhecism → Theocratic Declaration → All Religious Decrees",
    game: "Rizia",
    tags: ["Rizia", "Authoritarian", "Special"],
    description:
      "Follow Sal Ignacius's instructions exactly, support Wruhecism staying in government, and declare a theocracy. Enact all late-game religious decrees. The definitive path for Wruhec's Second Coming and By Nur's Will, I Decree!",
    pathwayId: "rizia-run-c1-faith",
    achievements: [
      ...RIZIA_PROGRESSION,
      // C1 exclusive — theocracy
      "Wruhec's Second Coming",
      "By Nur's Will, I Decree!",
      "Wruhecs Chosen",
      "Sanctuary! Sanctuary!",
      "House Cleaning",
      "Completely Justified",
      "The Prince",
      "Ready To Love Again",
      "Mom and Dad",
      "It's Not You, It's Me",
      "Like Father, Like Daughter",
      // Flexible Rizia
      ...RIZIA_FLEXIBLE,
      ...RIZIA_ENDINGS,
      ...RIZIA_TITLES,
      // Diplomacy/Economy compatible with C1
      "Trustworthy Friends",
      "Intermerkopum Alliance",
      "Fall from GRACE",
      "Sords, Our Friends",
      "Golden Age of Rizia",
      "The Kingdom Incorporated",
      "Economic Wonder of South Merkopa",
      "A Toras Pays His Debts",
      "The Green Kingdom",
      "Pearl of the Between-Seas",
      "The Golden Bells Ring",
      "Power of the Heavens",
      "Save the Princess",
      "Romus The Conqueror",
      "Blitzkrieg",
      "Not Losing You Again",
      "You've Got Nerve",
      "Lieutenant Commander Sazon",
      "Rizian Charter of Fundamental Law",
      "Reform Or Die",
      "Great Unification",
      "Glovurius axa Rizia axa Pales",
      "Peace to the Duke",
      "The Force in South Merkopa",
      "The World Against Us",
      // Cross-save
      "Not So Fun Anymore",
      "Let it Rayne",
      // Collectibles
      ...RIZIA_COLLECTIBLES_SHARED,
      "Collectible: Azaro Chess Piece",
      "Collectible: Lucita's Dagger",
      "Collectible: Lena's Wedding Ring",
      "Collectible: Iza Gate Key",
      "Collectible: Mandragora Extract",
      "Collectible: Intermerkopum Rings",
      "Collectible: Crown of Pales",
      "Collectible: Bruno's Dog Toy",
      "Collectible: Bull Figurine",
      "Collectible: Hattersley Egg",
    ],
    exclusivePairs: [
      // Theocracy blocks all-religions-happy and LGBT achievement
      ["Wruhec's Second Coming", "Nurists United"],
      ["Wruhec's Second Coming", "Out And Proud"],
      ["By Nur's Will, I Decree!", "Nurists United"],
      ["By Nur's Will, I Decree!", "Out And Proud"],
      // War vs diplomacy for Pales
      ["Romus The Conqueror", "Peace to the Duke"],
      ["Father's Son", "Romus The Conqueror"],
      ["Father's Son", "Peace to the Duke"],
      // Great Unification (diplomatic Pales) vs war Pales
      ["Great Unification", "Father's Son"],
      // Hunting trip outcome
      ["A King's Best Friend", "Collectible: Bruno's Dog Toy"],
      ["A King's Best Friend", "Collectible: Bull Figurine"],
      // Lucita: execute vs romance
      ["Like Father, Like Daughter", "The Prince"],
      ["Like Father, Like Daughter", "Ready To Love Again"],
      ["Like Father, Like Daughter", "Collectible: Lucita's Dagger"],
      // Civil war endings
      ["Return of the King", "Long Arm of Tzarborough"],
    ],
    exclusiveGroups: [
      RIZIA_ENDINGS,
      RIZIA_TITLES,
    ],
    crossRunExclusivePairs: [
      // Theocracy requires no decriminalization of homosexuality — blocks Out And Proud (C2)
      // Verified: Sal Ignacius refuses cooperation if you decriminalize homosexuality
      ["Wruhec's Second Coming", "Out And Proud"],
      ["By Nur's Will, I Decree!", "Out And Proud"],
    ],
    sourceVersion: "3.1.0.1.153",
    isVerifiedLatest: true,
  },

  // ─── RIZIA RUN C2 ───────────────────────────────────────────────────────────
  {
    id: "rizia-c2",
    title: "Run C2 — Family & Romance",
    subtitle: "Romance Pabel → Decriminalize Homosexuality → Out And Proud",
    game: "Rizia",
    tags: ["Rizia", "Special"],
    description:
      "Befriend Pabel in the prologue, join the drinking game, escort Pabel, and pursue the romance. Decriminalize homosexuality by Turn 7-8, make Pabel a lord, and publicize the relationship. The only path for Out And Proud.",
    pathwayId: "rizia-run-c2-romance",
    achievements: [
      ...RIZIA_PROGRESSION,
      // C2 exclusive
      "Out And Proud",
      "Nurists United",
      "It's Not You, It's Me",
      "Sanctuary! Sanctuary!",
      // Family/character achievements compatible with C2
      "The Prince",
      "Ready To Love Again",
      "Mom and Dad",
      "A King's Best Friend",
      "Like Father, Like Daughter",
      "House Cleaning",
      "Completely Justified",
      // Flexible Rizia
      ...RIZIA_FLEXIBLE,
      ...RIZIA_ENDINGS,
      ...RIZIA_TITLES,
      // Diplomacy/Economy compatible with C2
      "Trustworthy Friends",
      "Intermerkopum Alliance",
      "Fall from GRACE",
      "Sords, Our Friends",
      "Golden Age of Rizia",
      "The Kingdom Incorporated",
      "Economic Wonder of South Merkopa",
      "A Toras Pays His Debts",
      "The Green Kingdom",
      "Pearl of the Between-Seas",
      "The Golden Bells Ring",
      "Power of the Heavens",
      "Save the Princess",
      "Romus The Conqueror",
      "Blitzkrieg",
      "Not Losing You Again",
      "You've Got Nerve",
      "Lieutenant Commander Sazon",
      "Rizian Charter of Fundamental Law",
      "Reform Or Die",
      "Great Unification",
      "Glovurius axa Rizia axa Pales",
      "Peace to the Duke",
      "The Force in South Merkopa",
      "The World Against Us",
      // Cross-save
      "Not So Fun Anymore",
      "Let it Rayne",
      // Collectibles
      ...RIZIA_COLLECTIBLES_SHARED,
      "Collectible: Azaro Chess Piece",
      "Collectible: Lucita's Dagger",
      "Collectible: Lena's Wedding Ring",
      "Collectible: Iza Gate Key",
      "Collectible: Mandragora Extract",
      "Collectible: Intermerkopum Rings",
      "Collectible: Crown of Pales",
      "Collectible: Pabel's Poem",
      "Collectible: Hattersley Egg",
    ],
    exclusivePairs: [
      // Out And Proud blocks theocracy
      ["Out And Proud", "Wruhec's Second Coming"],
      ["Out And Proud", "By Nur's Will, I Decree!"],
      // Nurists United requires all 3 faiths happy — incompatible with theocracy
      ["Nurists United", "Wruhec's Second Coming"],
      // War vs diplomacy for Pales
      ["Romus The Conqueror", "Peace to the Duke"],
      ["Father's Son", "Romus The Conqueror"],
      ["Father's Son", "Peace to the Duke"],
      ["Great Unification", "Father's Son"],
      // Hunting trip: spare Bruno (A King's Best Friend) vs shoot Bruno (Bruno's Dog Toy / Bull Figurine)
      ["A King's Best Friend", "Collectible: Bruno's Dog Toy"],
      ["A King's Best Friend", "Collectible: Bull Figurine"],
      // Lucita: execute vs romance
      ["Like Father, Like Daughter", "The Prince"],
      ["Like Father, Like Daughter", "Ready To Love Again"],
      ["Like Father, Like Daughter", "Collectible: Lucita's Dagger"],
      // Civil war endings
      ["Return of the King", "Long Arm of Tzarborough"],
    ],
    exclusiveGroups: [
      RIZIA_ENDINGS,
      RIZIA_TITLES,
    ],
    crossRunExclusivePairs: [
      // Out And Proud requires decriminalizing homosexuality — blocks theocracy (C1)
      // Verified: decriminalization is mandatory before Turn 8 to unlock the romance achievement
      ["Out And Proud", "Wruhec's Second Coming"],
      ["Out And Proud", "By Nur's Will, I Decree!"],
    ],
    sourceVersion: "3.1.0.1.153",
    isVerifiedLatest: true,
  },

  // ─── RIZIA RUN D ────────────────────────────────────────────────────────────
  {
    id: "rizia-d",
    title: "Run D — Diplomacy & Economy",
    subtitle: "Intermerkopum Alliance → Great Unification → Golden Age",
    game: "Rizia",
    tags: ["Rizia", "Diplomatic", "Economy"],
    description:
      "Build regional alliances, complete all Sordland trade deals, secure Zille peacefully, unify both Pales and Zille with Rizia, and achieve peak economic growth. The definitive path for Great Unification, Golden Age of Rizia, and Intermerkopum Alliance.",
    pathwayId: "rizia-run-d-diplomacy",
    achievements: [
      ...RIZIA_PROGRESSION,
      // D exclusive
      "Great Unification",
      "Glovurius axa Rizia axa Pales",
      "Peace to the Duke",
      "Intermerkopum Alliance",
      "Fall from GRACE",
      "Sords, Our Friends",
      "Trustworthy Friends",
      "Golden Age of Rizia",
      "The Kingdom Incorporated",
      "Economic Wonder of South Merkopa",
      "A Toras Pays His Debts",
      "The Green Kingdom",
      "Pearl of the Between-Seas",
      "The Golden Bells Ring",
      "Rizian Charter of Fundamental Law",
      "Power of the Heavens",
      // Compatible with D
      "Nurists United",
      "Sanctuary! Sanctuary!",
      "House Cleaning",
      "Completely Justified",
      "The Prince",
      "Ready To Love Again",
      "Mom and Dad",
      "It's Not You, It's Me",
      "Out And Proud",
      "A King's Best Friend",
      "Like Father, Like Daughter",
      "Reform Or Die",
      "The Force in South Merkopa",
      "The World Against Us",
      "Make Yourself Great Again",
      // Flexible Rizia
      ...RIZIA_FLEXIBLE,
      ...RIZIA_ENDINGS,
      ...RIZIA_TITLES,
      // Cross-save
      "Not So Fun Anymore",
      "Let it Rayne",
      // Collectibles
      ...RIZIA_COLLECTIBLES_SHARED,
      "Collectible: Azaro Chess Piece",
      "Collectible: Lucita's Dagger",
      "Collectible: Lena's Wedding Ring",
      "Collectible: Iza Gate Key",
      "Collectible: Mandragora Extract",
      "Collectible: Intermerkopum Rings",
      "Collectible: Hattersley Egg",
      "Collectible: Pabel's Poem",
    ],
    exclusivePairs: [
      // Diplomatic Pales vs war Pales
      ["Peace to the Duke", "Romus The Conqueror"],
      ["Peace to the Duke", "Father's Son"],
      ["Great Unification", "Father's Son"],
      // Nurists United vs theocracy
      ["Nurists United", "Wruhec's Second Coming"],
      ["Nurists United", "By Nur's Will, I Decree!"],
      ["Out And Proud", "Wruhec's Second Coming"],
      ["Out And Proud", "By Nur's Will, I Decree!"],
      // Hunting trip
      ["A King's Best Friend", "Collectible: Bruno's Dog Toy"],
      ["A King's Best Friend", "Collectible: Bull Figurine"],
      // Lucita: execute vs romance
      ["Like Father, Like Daughter", "The Prince"],
      ["Like Father, Like Daughter", "Ready To Love Again"],
      ["Like Father, Like Daughter", "Collectible: Lucita's Dagger"],
      // Civil war endings
      ["Return of the King", "Long Arm of Tzarborough"],
    ],
    exclusiveGroups: [
      RIZIA_ENDINGS,
      RIZIA_TITLES,
    ],
    sourceVersion: "3.1.0.1.153",
    isVerifiedLatest: true,
  },

  // ─── RIZIA RUN WAR ──────────────────────────────────────────────────────────
  {
    id: "rizia-war",
    title: "Run War — Romus The Conqueror",
    subtitle: "Feign West → Sabotage Air Defenses → Blitzkrieg",
    game: "Rizia",
    tags: ["Rizia", "Military"],
    description:
      "Aggressively expand military, declare war on Pales, and win the tactical minigame. Use Blitzkrieg tactics (feign west, sabotage air defenses, combined assault). The definitive path for Romus The Conqueror, Blitzkrieg, Save the Princess, and war-exclusive achievements.",
    pathwayId: "rizia-run-c1-faith",
    achievements: [
      ...RIZIA_PROGRESSION,
      // War exclusive
      "Romus The Conqueror",
      "Blitzkrieg",
      "Save the Princess",
      "Not Losing You Again",
      "You've Got Nerve",
      "Lieutenant Commander Sazon",
      "The Force in South Merkopa",
      "People's Army",
      "Completely Justified",
      "The World Against Us",
      // Compatible with war
      "House Cleaning",
      "The Prince",
      "Ready To Love Again",
      "Mom and Dad",
      "A King's Best Friend",
      "Like Father, Like Daughter",
      "Father's Son",
      "Intermerkopum Alliance",
      "Fall from GRACE",
      "Sords, Our Friends",
      "Trustworthy Friends",
      "Through Machinery and Industry",
      "Economic Wonder of South Merkopa",
      "The Kingdom Incorporated",
      "A Toras Pays His Debts",
      "Sanctuary! Sanctuary!",
      "Power of the Heavens",
      "Reform Or Die",
      "Rizian Charter of Fundamental Law",
      "Great Unification",
      "Glovurius axa Rizia axa Pales",
      // Flexible Rizia
      ...RIZIA_FLEXIBLE,
      ...RIZIA_ENDINGS,
      ...RIZIA_TITLES,
      // Cross-save
      "Not So Fun Anymore",
      "Let it Rayne",
      // Collectibles
      ...RIZIA_COLLECTIBLES_SHARED,
      "Collectible: Crown of Pales",
      "Collectible: Azaro Chess Piece",
      "Collectible: Lucita's Dagger",
      "Collectible: Lena's Wedding Ring",
      "Collectible: Iza Gate Key",
      "Collectible: Mandragora Extract",
      "Collectible: Intermerkopum Rings",
      "Collectible: Bruno's Dog Toy",
      "Collectible: Bull Figurine",
      "Collectible: Hattersley Egg",
    ],
    exclusivePairs: [
      // War vs diplomatic Pales
      ["Romus The Conqueror", "Peace to the Duke"],
      ["Father's Son", "Romus The Conqueror"],
      ["Father's Son", "Peace to the Duke"],
      // Great Unification requires peaceful Pales
      ["Great Unification", "Father's Son"],
      // Hunting trip
      ["A King's Best Friend", "Collectible: Bruno's Dog Toy"],
      ["A King's Best Friend", "Collectible: Bull Figurine"],
      // Lucita
      ["Like Father, Like Daughter", "The Prince"],
      ["Like Father, Like Daughter", "Ready To Love Again"],
      ["Like Father, Like Daughter", "Collectible: Lucita's Dagger"],
      // Civil war endings
      ["Return of the King", "Long Arm of Tzarborough"],
    ],
    exclusiveGroups: [
      RIZIA_ENDINGS,
      RIZIA_TITLES,
    ],
    sourceVersion: "3.1.0.1.153",
    isVerifiedLatest: true,
  },
];

// ─── Achievement → Run index (built at module load) ──────────────────────────

export const achievementRunIndex = new Map<string, Run[]>();
for (const run of runs) {
  for (const ach of run.achievements) {
    const existing = achievementRunIndex.get(ach) ?? [];
    if (!existing.includes(run)) {
      existing.push(run);
      achievementRunIndex.set(ach, existing);
    }
  }
}

// ─── Achievements with no run assignment (RNG / unclear conditions) ───────────
// These are intentionally NOT assigned to any run and will surface as
// "No matching run found" in the planner. This is honest, not a bug.
export const UNASSIGNABLE_ACHIEVEMENTS = new Set<string>([
  "Every Vote Matters", // Pure RNG — lose constitutional vote by exactly 1
]);
