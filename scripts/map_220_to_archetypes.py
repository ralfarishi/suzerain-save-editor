import json

with open("scripts/all_achievement_names.json", "r", encoding="utf-8") as f:
    ach_data = json.load(f)

all_achs = ach_data["all"]
all_official_ids = set(a["id"] for a in all_achs)
id_to_name = {a["id"]: a["name"] for a in all_achs}

archetype_ids = {
    "sordland-reformer": [
        # Story progression
        "Prologue_Finish", "Chapter1_Finish", "Chapter2_Finish", "Chapter3_Finish", "Chapter4_Finish",
        # Democratic & Reform constitutional amendments
        "Game_PassedAssembly", "Game_NewConstitution", "Game_Lawmaker",
        # Anti-corruption & Governance
        "Game_ACP", "Game_Democrat", "Game_Pluralist", "Game_ManOfPeople", "Epilogue_ElectionWon",
        # Economy & Infrastructure
        "Game_Railway", "Game_EconomicRecovery", "Game_AnotherAlphonso", "Game_WealthSurplus", "Game_BudgetSurplus",
        # Civil rights & Bluds & Women
        "Game_BludishRights", "Game_TheBludishDream", "Game_SordlandForAll", "Game_MonicaLove",
        "Game_FamilyMan", "Game_WelfareState", "Game_PFJPAlliance",
        # Foreign & Diplomacy
        "Game_AgnoliaAlliance", "Game_LespiaAlliance", "Game_RumburgPeace", "Game_NoSordlandForOldMen",
        # Flexible & Political
        "Game_MediaDeal", "Game_Centrist", "Game_Capitalist", "Game_SuccessfulRitual",
        "Game_1Vote", "Game_FeelMyEnergy", "Game_KissMyGas", "Game_AMorgna",
        "Game_Underhall", "Game_MasterOfCrisis"
    ],
    "sordland-malenyevist": [
        # Story progression
        "Prologue_Finish", "Chapter1_Finish", "Chapter2_Finish", "Chapter3_Finish", "Chapter4_Finish",
        # Socialist ideology & Alignment
        "Game_Malenyevist", "Game_ValgslandAlliance", "Game_JoinedCSP", "Game_Vodka", "Game_IslandInvasion",
        "Game_NewRedYouth", "Game_WelfareState", "Epilogue_ElectionWon",
        # Economy: Nationalization & Planned Economy
        "Game_EconomicRecovery", "Game_BudgetSurplus",
        # Governance & Assembly
        "Game_PassedAssembly", "Game_NewConstitution", "Game_Lawmaker", "Game_ACP",
        # Personal & Culture
        "Game_SuccessfulRitual", "Game_FamilyMan", "Game_1Vote", "Game_AMorgna",
        "Game_FeelMyEnergy", "Game_KissMyGas"
    ],
    "sordland-autocrat-sollist": [
        # Story progression
        "Prologue_Finish", "Chapter1_Finish", "Chapter2_Finish", "Chapter3_Finish", "Chapter4_Finish",
        # Emergency & Autocrat
        "Game_DeclaredEmergency", "Game_HawkerPlan", "Game_SSP", "Game_Murder", "Game_Obstructionist",
        # Soll & Old Guard & Nationalism
        "Game_Sollist", "Game_NeoSollist", "Game_Authoritarian", "Game_PoliceState",
        "Game_NewYoungSords", "Game_NFPAlliance", "Game_JoinedATO", "Game_UnfairElection15",
        "Game_Bribe", "Game_3Funerals", "Game_MediaDeal",
        # Secret Police Actions & Quirks
        "Game_Doggo", "Game_Crocodile", "Game_Chessmaster", "Game_EndOfAnEra",
        "Game_PassedAssembly", "Game_NewConstitution", "Game_Lawmaker", "Game_AMorgna",
        "Epilogue_ElectionWon"
    ],
    "sordland-war-machine": [
        # Story progression
        "Prologue_Finish", "Chapter1_Finish", "Chapter2_Finish", "Chapter3_Finish", "Chapter4_Finish",
        # Military Expansion & War
        "Game_DeclareWarRumburg", "Epilogue_WonRumburgWar", "Epilogue_LostRumburgWar",
        "Game_MilitaristState", "Game_MakeSordlandGreatAgain", "Game_Isolated",
        # War alliances & operations
        "Game_BearTrap",
        # Economic and national defense readiness
        "Game_EconomicRecovery", "Game_Highway", "Game_SuccessfulRitual", "Game_FamilyMan", "Game_AMorgna",
        "Epilogue_ElectionWon"
    ],
    "sordland-calamity": [
        # Story progression
        "Prologue_Finish", "Chapter1_Finish", "Chapter2_Finish", "Chapter3_Finish", "Chapter4_Finish",
        # Downfall, Deposed, Coup & Ruin
        "Epilogue_Couped", "Epilogue_Impeached", "Epilogue_ElectionForcedOut", "Epilogue_ElectionLoseContinue",
        "Epilogue_ElectionWonVP", "Epilogue_ElectionRetirement", "Epilogue_Retirement", "Epilogue_Exiled",
        "Epilogue_Assassinated", "Epilogue_WorldWar",
        # Crises & Chaos
        "Game_EconomicDepression", "Game_Alone", "Game_Divorced", "Game_LoudRayne",
        "Game_BFFDam", "Game_BFFUnrest", "Game_CarbDiet", "Game_ViolentUnrest"
    ],
    "rizia-constitutional-reformer": [
        # Rizia Progression
        "RiziaPrologue_Finish", "RiziaChapter1_Finish", "RiziaChapter2_Finish", "RiziaChapter3_Finish", "RiziaChapter4_Finish",
        # Constitution & Democracy
        "Rizia_Reform", "Rizia_ReformOrDie", "Rizia_Epilogue_ContinuedReign", "Rizia_SordVictory",
        # Modernization & Rights
        "Rizia_OutOfCloset", "Rizia_WeddingRing", "Rizia_PorteDrazon", "Rizia_Workers", "Rizia_GreenKingdom",
        # Economic growth & Industry
        "Rizia_Growth", "Rizia_GoldenAge", "Rizia_HighProduction", "Rizia_ArmsExporter", "Rizia_ArmsImporter",
        # Alliances & Family
        "Rizia_Manpower", "Rizia_NewHeir", "Rizia_PayDebts", "Rizia_Arbitration",
        "Rizia_MomDad", "Rizia_OfficerSazon", "Rizia_NoCrisis", "Rizia_CaseClosed"
    ],
    "rizia-absolutist-theocrat": [
        # Rizia Progression
        "RiziaPrologue_Finish", "RiziaChapter1_Finish", "RiziaChapter2_Finish", "RiziaChapter3_Finish", "RiziaChapter4_Finish",
        # Total monarchy & Authority
        "Rizia_Authority", "Rizia_Epilogue_Death", "Rizia_Conqueror", "Rizia_Theocracy", "Rizia_Nur",
        "Rizia_DerdianMissiles", "Rizia_Blitzkrieg", "Rizia_PowerProjection", "Rizia_NationalizedRRG",
        "Rizia_Executions", "Rizia_Great", "Rizia_Tradition", "Rizia_NurDecrees", "Rizia_NuristsUnited",
        "Rizia_Lawgiver", "Rizia_FlipOff", "Rizia_AzarosDead", "Rizia_ValeroSaved", "Rizia_Bells",
        "Rizia_SayMyName", "Rizia_Khisha", "Rizia_Rusty", "Rizia_Epilogue_ContinuedReign", "Rizia_NoCrisis"
    ],
    "rizia-grand-diplomat": [
        # Rizia Progression
        "RiziaPrologue_Finish", "RiziaChapter1_Finish", "RiziaChapter2_Finish", "RiziaChapter3_Finish", "RiziaChapter4_Finish",
        # Intermerkopum & Unification
        "Rizia_Intermerkopum", "Rizia_GreatUnification", "Riza_PeacefulUnification", "Rizia_ZilleReturn",
        "Rizia_PalesAlliance", "Rizia_Arbitration", "Rizia_Sordland", "Rizia_LeaveGrace",
        "Rizia_NoPowder", "Rizia_Glovurius", "Rizia_HighTea", "Rizia_Duel", "Rizia_Halaita",
        "Rizia_Funny", "Rizia_Sober", "Rizia_Bruno", "Rizia_RescuedVina", "Rizia_HouseCleaning",
        "Rizia_Epilogue_ContinuedReign", "Rizia_NoCrisis", "Rizia_CaseClosed", "Rizia_LetItRayne"
    ],
    "rizia-fallen-monarch": [
        # Rizia Progression
        "RiziaPrologue_Finish", "RiziaChapter1_Finish", "RiziaChapter2_Finish", "RiziaChapter3_Finish", "RiziaChapter4_Finish",
        # Fall & Exile & Ruin
        "Rizia_Revolt", "Rizia_Sotelato", "Rizia_EtTuTitus", "Rizia_Epilogue_Prison", "Rizia_Epilogue_Exiled",
        "Rizia_Epilogue_CivilWar", "Rizia_PalesWarLost", "Rizia_DividedRizia", "Rizia_RumVassal",
        "Rizia_ANSanctions", "Rizia_PipelineSabotage", "Rizia_HugoIgo", "Rizia_FreeZille",
        "Rizia_KillAdarfo", "Rizia_ReturnOfTheKing", "Rizia_NoRomance"
    ],
    "master-archivist-quirks": [
        # Sordland 18 Collectibles
        "Game_CollectionItem_PoemBook", "Game_CollectionItem_CeremonialScissors", "Game_CollectionItem_ArmadineRadio",
        "Game_CollectionItem_WhiskeyBottle", "Game_CollectionItem_GoatStatue", "Game_CollectionItem_AschrafCandle",
        "Game_CollectionItem_USPBrooch", "Game_CollectionItem_Pocketwatch", "Game_CollectionItem_UnderhallTrophy",
        "Game_CollectionItem_CarKey", "Game_CollectionItem_Headphones", "Game_CollectionItem_Gun",
        "Game_CollectionItem_CigarBox", "Game_CollectionItem_Dagger", "Game_CollectionItem_KesaroLighter",
        "Game_CollectionItem_WineBottle", "Game_CollectionItem_PhotoFrameTorn", "Game_CollectionItem_AnricaTrophy",
        "Game_ExecutiveHoarder",
        # Sordland Quirks
        "Game_ThanksSerge", "Game_SaveTheWorld", "Game_638Ways", "Game_FCAnricaRises", "Game_FCAnrica", "Game_GiraltRibery",
        # Rizia 18 Collectibles
        "Rizia_CollectionItem_WeddingRing", "Rizia_CollectionItem_DastScepter", "Rizia_CollectionItem_KorontiReportPostcard",
        "Rizia_CollectionItem_WruhecistMedallion", "Rizia_CollectionItem_MechanicalBird", "Rizia_CollectionItem_ChessPiece",
        "Rizia_CollectionItem_GasCorpPlaque", "Rizia_CollectionItem_IntermerkopumPlaque", "Rizia_CollectionItem_WehzekDoorstop",
        "Rizia_CollectionItem_MandragoraExtract", "Rizia_CollectionItem_FabergeEgg", "Rizia_CollectionItem_MiniYacht",
        "Rizia_CollectionItem_DogToy", "Rizia_CollectionItem_LucitaDagger", "Rizia_CollectionItem_PalesCrown",
        "Rizia_CollectionItem_IzaKey", "Rizia_CollectionItem_PoemScroll", "Rizia_CollectionItem_BullFigurine",
        "Rizia_Collectibles",
        # Rizia Quirks
        "Rizia_Sanctuary", "Rizia_UFO", "Rizia_Nerve"
    ]
}

mapped_ids = set()
for arch, ids in archetype_ids.items():
    for id_ in ids:
        assert id_ in all_official_ids, f"Unknown ID {id_}"
        mapped_ids.add(id_)

missing_ids = all_official_ids - mapped_ids
print(f"Total official IDs: {len(all_official_ids)}")
print(f"Total mapped IDs: {len(mapped_ids)}")
print(f"Missing count: {len(missing_ids)}")
if missing_ids:
    print("Missing IDs:")
    for m in missing_ids:
        print(f"  {m} ({id_to_name[m]})")
else:
    print("SUCCESS: 100% OF ALL 220 ACHIEVEMENTS ARE COVERED WITH ZERO GAPS!")

with open("scripts/archetype_ids.json", "w", encoding="utf-8") as f:
    json.dump(archetype_ids, f, indent=2)
print("Saved mapping to scripts/archetype_ids.json")
