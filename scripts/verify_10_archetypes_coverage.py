import json
import re

with open("scripts/all_achievement_names.json", "r", encoding="utf-8") as f:
    ach_data = json.load(f)

all_achs = ach_data["all"]
all_names = set(a["name"] for a in all_achs)
id_to_name = {a["id"]: a["name"] for a in all_achs}
name_to_id = {a["name"]: a["id"] for a in all_achs}

# 10 Archetypes:
# 1. sordland-reformer: The Great Reformer — Democratic & Open Republic
# 2. sordland-malenyevist: Red Morning — Malenyevist Comrade & Worker's Republic
# 3. sordland-autocrat-sollist: Iron Fist — Sollist Dictator & Hawker's Emergency
# 4. sordland-war-machine: Sordish War Machine — Total Victory Over Rumburg
# 5. sordland-calamity: The Great Calamity — Downfall, Coup & Deposed
# 6. rizia-constitutional-reformer: The Golden Reformer — Constitutional Monarchy & Modernization
# 7. rizia-absolutist-theocrat: Iron Crown of Toras — Absolutist Hegemony & Holy Reconquest
# 8. rizia-grand-diplomat: The Grand Diplomat — Intermerkopum & Dynasty Reunification
# 9. rizia-fallen-monarch: The Fallen Monarch — Royal Bankruptcy & Revolution
# 10. master-archivist-quirks: The Master Archivist — 36 Collectibles & Hidden Easter Eggs

# Let's map each of the 220 achievements to its home(s):
mappings = {
    "sordland-reformer": [
        "Prologue: Rise to Power", "Chapter I: President Rayne", "Chapter II: A New Sordland",
        "Chapter III: Victim of Changes", "Chapter IV: Checkmate", "First Step To Golconda",
        "Grand National Assembly", "The Constitution of '56", "Drain the Swamp",
        "Man of the People", "Freedom and Justice", "Democrat", "Pluralist",
        "A Sordland For All", "The Bludish Dream", "Woman of Sordland", "Underhall Once Again #1",
        "An Offer You Cannot Refuse", "Sordish Economic Recovery", "Another Alphonso",
        "Every Vote Matters", "Family Man", "Frugal", "Rags to Riches", "A Morgna her coren!",
        "A New Hope", "Just Another Sordish President", "Centrist", "Capitalist",
        '"Freedom or Peril"', '"Fortune, Strength, Liberty"', "Reconciliation",
        "No Sordland For Old Men", "True Master of Crisis", "Master of Crisis", "Welfare State",
        "Feel My Energy", "Kiss My Gas", "Catchphrase"
    ],
    "sordland-malenyevist": [
        "Prologue: Rise to Power", "Chapter I: President Rayne", "Chapter II: A New Sordland",
        "Chapter III: Victim of Changes", "Chapter IV: Checkmate", "First Step To Golconda",
        "Comrade", "Comrades in Arms", "Red Morning", "Malenyevist", "Red Youth",
        "Revolutionary Generation", "Iron Lady", "Valgslandian Vodka", "Rightful Claim",
        "United Against Capitalism", '"Through Broken Shackles"', "Welfare State",
        "State Planning", "Grand National Assembly", "The Constitution of '56",
        "Sordish Economic Recovery", "Family Man", "Frugal", "Catchphrase",
        "True Master of Crisis", "Master of Crisis", "A Morgna her coren!", "A New Hope",
        "Every Vote Matters", "Drain the Swamp"
    ],
    "sordland-autocrat-sollist": [
        "Prologue: Rise to Power", "Chapter I: President Rayne", "Chapter II: A New Sordland",
        "Chapter III: Victim of Changes", "Chapter IV: Checkmate", "First Step To Golconda",
        "Article 100", "Hawker's Plan", "Sssh!", "By Any Means Necessary",
        "Alexius Maximus Reginald the Third", "Crocodile Tears", "Chessmaster",
        "Soll's Legacy", "End of an Era", "Obstructionist", "Authoritarian", "Sollist",
        "Militarist State", "Police State", "Merkopa's Most Unfair Election System",
        "New Generation of Sords", "Purple Blood", "United Against Communism",
        "An Offer You Cannot Refuse", "“Donations”", "Just Another Funeral",
        "The Constitution of '56", "Grand National Assembly", "True Master of Crisis",
        "Catchphrase", "A Morgna her coren!"
    ],
    "sordland-war-machine": [
        "Prologue: Rise to Power", "Chapter I: President Rayne", "Chapter II: A New Sordland",
        "Chapter III: Victim of Changes", "Chapter IV: Checkmate", "First Step To Golconda",
        "Sordish War Machine", "Victorious", "Queen's Ransom", "Defiant Sordland",
        "War Hero", "Protector of Merkopa", "Make Sordland Great Again",
        "Operation Bear Trap", "No Friends But Sords", "Hail the Queen", "Vectern sis da!",
        "Militarist State", "Sordish Economic Recovery", "True Master of Crisis",
        "Master of Crisis", "A Morgna her coren!", "Catchphrase", "Family Man"
    ],
    "sordland-calamity": [
        "Prologue: Rise to Power", "Chapter I: President Rayne", "Chapter II: A New Sordland",
        "Chapter III: Victim of Changes", "Chapter IV: Checkmate",
        "Coup d'état", "Deposed", "Impeached", "Sordish Depression", "Down with Rayne!",
        "Yes I'm Alone But Then Again I Always Was", "This Can't Go On Like This, Anton",
        "Path To Exile", "Early Retirement", "Assassinated", "World At War", "Forced Out",
        "Demoted", "Speaking Louder Makes You Right", "Revenge of Izzam", "Rags to Rags",
        "Carb Diet"
    ],
    "rizia-constitutional-reformer": [
        "Rizia Prologue: Ascension to the Throne", "Chapter I: King Romus", "Chapter II: Between-Seas",
        "Chapter III: Leviathan", "Chapter IV: Sila Orica",
        "Rizian Charter of Fundamental Law", "Reform Or Die", "House of the People",
        "New Dawn", "Out And Proud", "Ready To Love Again", "Pearl of the Between-Seas",
        "What's Mined Is Yours", "Economic Wonder of South Merkopa", "Golden Age of Rizia",
        "Crown & Constitution", "A Modern Kingdom", "Through Machinery and Industry",
        "Arms Exporter", "Arms Importer", "People's Army", "The Prince", "A Toras Pays His Debts",
        "The Green Kingdom", "My Rule Continues", "A Little Help From My Friends",
        "Mom and Dad", "Lieutenant Commander Sazon", "True Master of Crisis", "Case Closed"
    ],
    "rizia-absolutist-theocrat": [
        "Rizia Prologue: Ascension to the Throne", "Chapter I: King Romus", "Chapter II: Between-Seas",
        "Chapter III: Leviathan", "Chapter IV: Sila Orica",
        "Domineering", "The King Is Dead", "Romus The Conqueror", "Wruhec's Second Coming",
        "Wruhecs Chosen", "Power of the Heavens", "Blitzkrieg", "The Force in South Merkopa",
        "Mine All Mine", "Completely Justified", "Make Yourself Great Again",
        "Tradition is Our Compass, the Past Our Strength.", "By Nur's Will, I Decree!",
        "Nurists United", "I hereby declare...", "Two Birds For Beatrice", "Like Father, Like Daughter",
        "Not Losing You Again", "The Golden Bells Ring", "Say My Name", "Smolak's Smokes",
        "The Kingdom Incorporated", "My Rule Continues", "True Master of Crisis"
    ],
    "rizia-grand-diplomat": [
        "Rizia Prologue: Ascension to the Throne", "Chapter I: King Romus", "Chapter II: Between-Seas",
        "Chapter III: Leviathan", "Chapter IV: Sila Orica",
        "Intermerkopum Alliance", "Great Unification", "Glovurius axa Rizia axa Pales",
        "Trustworthy Friends", "Peace to the Duke", "Two Rings One Crown", "A Little Help From My Friends",
        "Sords, Our Friends", "Fall from GRACE", "The End of Powder and Blood", "Blaze of Glory",
        "Game of Spoons", "Romus the Generous", "So It Is", "Funny Man", "No Alcohol for me Please",
        "A King's Best Friend", "Save the Princess", "House Cleaning", "My Rule Continues",
        "True Master of Crisis", "Case Closed", "Let it Rayne"
    ],
    "rizia-fallen-monarch": [
        "Rizia Prologue: Ascension to the Throne", "Chapter I: King Romus", "Chapter II: Between-Seas",
        "Chapter III: Leviathan", "Chapter IV: Sila Orica",
        "The Second Revolt", "Long Live the Revolution", "Et Tu Titus?", "The King Behind Bars",
        "Away from My Land", "Father's Son", "Tattered Kingdom", "Long Arm of Tzarborough",
        "The World Against Us", "Pipe Nightmares", "Fragmentation", "Hugo, I Go",
        "South Merkopa's Newest Member", "Arcasia Did It", "Return of the King",
        "It's Not You, It's Me", "Not So Fun Anymore"
    ],
    "master-archivist-quirks": [
        # All 18 Sordland Collectibles & Quirks
        "Collectible: Circas's Poem Book", "Collectible: Ceremonial Scissors", "Collectible: Armadine Radio",
        "Collectible: Whiskey Bottle", "Collectible: Sordish Goat Statue", "Collectible: Aschraf Candle",
        "Collectible: USP Brooch", "Collectible: Serge's Pocket Watch", "Collectible: Underhall Trophy",
        "Collectible: Car Key", "Collectible: Headphones", "Collectible: Gun", "Collectible: Cigar Box",
        "Collectible: King Egmund's Dagger", "Collectible: Kesaro's Lighter", "Collectible: Wine Bottle",
        "Collectible: Torn Family Photo", "Collectible: FC Anrica Trophy", "Executive Hoarder",
        # Sordland Quirks
        "Thank You Serge", "Save the World", "638 Ways to Kill Rayne", "FC Anrica", "Giralt of Ribery", "Goated",
        # All 18 Rizia Collectibles & Quirks
        "Collectible: Lena's Wedding Ring", "Collectible: St. Dast's Scepter", "Collectible: Valenqiris Postcard",
        "Collectible: Wruhecist Medallion", "Collectible: Morellan Tin Bird", "Collectible: Azaro Chess Piece",
        "Collectible: ROG Plaque", "Collectible: Intermerkopum Rings", "Collectible: Wehzek Doorstop",
        "Collectible: Mandragora Extract", "Collectible: Hattersley Egg", "Collectible: RRN Rizania Model",
        "Collectible: Bruno's Dog Toy", "Collectible: Lucita's Dagger", "Collectible: Crown of Pales",
        "Collectible: Iza Gate Key", "Collectible: Pabel's Poem", "Collectible: Bull Figurine",
        "Royal Hoarder", "Sanctuary! Sanctuary!", "I Want to Believe", "You've Got Nerve"
    ]
}

# Audit coverage:
covered = set()
for p_id, ach_list in mappings.items():
    for a in ach_list:
        if a not in all_names:
            print(f"ERROR: '{a}' in {p_id} not found in all_names!")
        covered.add(a)

missing = all_names - covered
print(f"Total target achievements: {len(all_names)}")
print(f"Total covered across 10 pathways: {len(covered)}")
print(f"Missing count: {len(missing)}")
if missing:
    print("Missing achievements:", sorted(list(missing)))
