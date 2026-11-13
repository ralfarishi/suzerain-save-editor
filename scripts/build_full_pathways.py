import json
import re

with open("scripts/all_achievement_names.json", "r", encoding="utf-8") as f:
    ach_data = json.load(f)

with open("scripts/archetype_ids.json", "r", encoding="utf-8") as f:
    archetype_ids = json.load(f)

with open("src/data/achievement_walkthroughs.ts", "r", encoding="utf-8") as f:
    wt_text = f.read()

id_to_name = {a["id"]: a["name"] for a in ach_data["all"]}

def get_wt_info(ach_id):
    pos = wt_text.find(f'"{ach_id}": {{')
    if pos == -1:
        return {}
    sub = wt_text[pos:pos+4000]
    turn_m = re.search(r'"turn":\s*"([^"]+)"', sub)
    scene_m = re.search(r'"sceneTitle":\s*"([^"]+)"', sub)
    file_m = re.search(r'"sceneFile":\s*(?:"([^"]+)"|null)', sub)
    choice_m = re.search(r'"recommendedChoice":\s*"([^"]+)"', sub)
    context_m = re.search(r'"context":\s*"([^"]+)"', sub)
    vars_m = re.findall(r'"(BaseGame[a-zA-Z0-9_.]+|RiziaDLC[a-zA-Z0-9_.]+)"', sub)
    return {
        "turn": turn_m.group(1) if turn_m else "Various",
        "sceneTitle": scene_m.group(1) if scene_m else "Key Milestone",
        "sceneFile": file_m.group(1) if file_m and file_m.group(1) else None,
        "recommendedChoice": choice_m.group(1) if choice_m else "Follow path guidance.",
        "context": context_m.group(1) if context_m else "Narrative milestone.",
        "saveVariables": list(set(vars_m))
    }

metadata = {
    "sordland-reformer": {
        "id": "sordland-reformer",
        "title": "The Great Reformer — Democratic & Open Republic",
        "subtitle": "Democratic Constitution • Anti-Corruption Police • Free Market • Bludish Civil Rights",
        "game": "Sordland",
        "tags": ["Sordland", "Reformist", "Economy"],
        "archetype": "Democratic Reformer",
        "description": "Restore faith in democracy by drafting a progressive reformist constitution, establishing the Anti-Corruption Police (ACP), resolving long-standing ethnic tensions with the Bludish population, and securing Sordland's economic recovery through trade with Agnolia and Lespia.",
        "presetId": "sordland-radical-reformer",
        "exclusivePairs": [
            ["Grand L-1 Opening", "Grand H-3 Opening"],
            ["Family Man", "This Can't Go On Like This, Anton"],
            ["True Master of Crisis", "Master of Crisis"],
            ["Sordish Economic Recovery", "Sordish Depression"],
            ["Democrat", "Authoritarian"],
            ["Democrat", "Sollist"],
            ["Democrat", "Malenyevist"]
        ],
        "exclusiveGroups": [
            ["A Morgna her coren!", "A New Hope", "Just Another Sordish President"]
        ]
    },
    "sordland-malenyevist": {
        "id": "sordland-malenyevist",
        "title": "Red Morning — Malenyevist Comrade & Worker's Republic",
        "subtitle": "Socialist Planning • Full Nationalization • Valgsland & CSP Alliance • Workers' Rights",
        "game": "Sordland",
        "tags": ["Sordland", "Reformist", "Diplomatic", "Economy"],
        "archetype": "Malenyevist Comrade",
        "description": "Transform Sordland into a socialist worker state. Nationalize the oligarchic conglomerates (Bergia Steel & Heart of Sordland), align with Chancellor Hegel of Valgsland and Chairman Charchote of United Contana, pass the Workers' Rights Act, and defend the proletariat.",
        "presetId": "sordland-radical-reformer",
        "exclusivePairs": [
            ["Grand L-1 Opening", "Grand H-3 Opening"],
            ["Family Man", "This Can't Go On Like This, Anton"],
            ["True Master of Crisis", "Master of Crisis"],
            ["United Against Capitalism", "United Against Communism"],
            ["Malenyevist", "Capitalist"]
        ],
        "exclusiveGroups": [
            ["A Morgna her coren!", "A New Hope", "Just Another Sordish President"]
        ]
    },
    "sordland-autocrat-sollist": {
        "id": "sordland-autocrat-sollist",
        "title": "Iron Fist — Sollist Dictator & Hawker's Emergency",
        "subtitle": "Emergency Decree • Secret State Police • Elimination of Political Enemies • Soll's Legacy",
        "game": "Sordland",
        "tags": ["Sordland", "Authoritarian"],
        "archetype": "Sollist Dictator",
        "description": "Rule with an iron fist by declaring a national State of Emergency alongside Chief Justice Orso Hawker. Form the Secret State Police (SSP) under Lileas Graf, neutralize opposition leaders, eliminate corrupt oligarchs, and enshrine Tarquin Soll's legacy forever.",
        "presetId": "sordland-run-a-emergency",
        "exclusivePairs": [
            ["Grand L-1 Opening", "Grand H-3 Opening"],
            ["Family Man", "This Can't Go On Like This, Anton"],
            ["True Master of Crisis", "Master of Crisis"],
            ["Authoritarian", "Democrat"],
            ["Police State", "Freedom and Justice"]
        ],
        "exclusiveGroups": [
            ["A Morgna her coren!", "A New Hope", "Just Another Sordish President"]
        ]
    },
    "sordland-war-machine": {
        "id": "sordland-war-machine",
        "title": "Sordish War Machine — Total Victory Over Rumburg",
        "subtitle": "Military Modernization • Operation Fall Valkyrie • Capture of Queen Beatrice • Sordish Hegemony",
        "game": "Sordland",
        "tags": ["Sordland", "Military"],
        "archetype": "War Hero Commander",
        "description": "Prepare Sordland for the inevitable clash of civilizations against Queen Beatrice Livingston of Rumburg. Modernize the armed forces, expose Rumburgian spies and nuclear ambitions, execute a decisive strategic offensive, and capture the royal capital of Thornbourn.",
        "presetId": "sordland-run-a-emergency",
        "exclusivePairs": [
            ["Grand L-1 Opening", "Grand H-3 Opening"],
            ["Vectern sis da!", "Hail the Queen"],
            ["True Master of Crisis", "Master of Crisis"],
            ["No Friends But Sords", "Operation Bear Trap"]
        ],
        "exclusiveGroups": [
            ["Vectern sis da!", "Hail the Queen", "A Morgna her coren!"]
        ]
    },
    "sordland-calamity": {
        "id": "sordland-calamity",
        "title": "The Great Calamity — Downfall, Deposed, Coup & Exile",
        "subtitle": "Economic Collapse • Military Coup • Impeachment Trial • Tragic Deposition & Exile",
        "game": "Sordland",
        "tags": ["Sordland", "Special"],
        "archetype": "Tragic Downfall",
        "description": "Experience the dark and tragic collapses of presidential power. Navigate severe debt crises, widespread unrest, military intervention by Generals Lancea or Kruger, Supreme Court impeachment trials, assassination attempts, and bittersweet retirement or foreign exile.",
        "exclusivePairs": [
            ["Sordish Economic Recovery", "Sordish Depression"]
        ],
        "exclusiveGroups": [
            ["Coup d'état", "Impeached", "Forced Out", "Demoted", "Path To Exile", "Early Retirement", "Assassinated", "World At War"]
        ]
    },
    "rizia-constitutional-reformer": {
        "id": "rizia-constitutional-reformer",
        "title": "The Golden Reformer — Constitutional Monarchy & Modernization",
        "subtitle": "Royal Constitution • House Manus Alliance • Civil Liberties • Industrial Prosperity",
        "game": "Rizia",
        "tags": ["Rizia", "Reformist", "Economy"],
        "archetype": "Constitutional Monarch",
        "description": "Guide the Kingdom of Rizia out of feudal stagnation into modern constitutional monarchy. Collaborate with House Manus, abolish provincial levies, expand civil liberties, decriminalize social freedoms, and drive an era of unprecedented industrial growth.",
        "presetId": "rizia-golden-kingdom",
        "exclusivePairs": [
            ["True Master of Crisis", "Father's Son"],
            ["My Rule Continues", "Away from My Land"]
        ],
        "exclusiveGroups": [
            ["My Rule Continues", "Fragmentation", "Return of the King", "Away from My Land"]
        ]
    },
    "rizia-absolutist-theocrat": {
        "id": "rizia-absolutist-theocrat",
        "title": "Iron Crown of Toras — Absolutist Hegemony & Holy Reconquest",
        "subtitle": "House Toras Hegemony • Golden Guard • Derdian Golcondist Alliance • Pales Conquest by Force",
        "game": "Rizia",
        "tags": ["Rizia", "Authoritarian", "Military"],
        "archetype": "Absolutist Conqueror",
        "description": "Reassert absolute royal supremacy under House Toras. Expand the elite Golden Guard under Titus, embrace the mystical Golcondist faith through alliance with Derdia, crush foreign insolence, and reclaim the Duchy of Pales through overwhelming military force.",
        "presetId": "rizia-golden-kingdom",
        "exclusivePairs": [
            ["Romus The Conqueror", "Peace to the Duke"],
            ["Blitzkrieg", "A Little Help From My Friends"]
        ],
        "exclusiveGroups": [
            ["My Rule Continues", "The King Is Dead", "The King Behind Bars"]
        ]
    },
    "rizia-grand-diplomat": {
        "id": "rizia-grand-diplomat",
        "title": "The Grand Diplomat — Intermerkopum & Dynasty Reunification",
        "subtitle": "Intermerkopum Regional Pact • Dynastic Marriage • Peaceful Pales & Zille Integration",
        "game": "Rizia",
        "tags": ["Rizia", "Diplomatic"],
        "archetype": "Grand Diplomat",
        "description": "Achieve total national reunification through statesmanship and regional solidarity. Unify the South Merkopan powers into the Intermerkopum alliance, unite Rizia and Pales via royal matrimony between Princess Vina and Duke Axel, and reclaim Zille through negotiation.",
        "presetId": "rizia-golden-kingdom",
        "exclusivePairs": [
            ["Glovurius axa Rizia axa Pales", "Romus The Conqueror"],
            ["Peace to the Duke", "Blitzkrieg"]
        ],
        "exclusiveGroups": [
            ["My Rule Continues", "Fragmentation", "Away from My Land"]
        ]
    },
    "rizia-fallen-monarch": {
        "id": "rizia-fallen-monarch",
        "title": "The Fallen Monarch — Royal Bankruptcy & Revolution",
        "subtitle": "Treasury Depletion • Noble Rebellions • The Second Revolt • Royal Imprisonment & Exile",
        "game": "Rizia",
        "tags": ["Rizia", "Special"],
        "archetype": "Fallen Monarch",
        "description": "Walk the tragic trajectory of a deposed king. Bankrupt the royal exchequer, provoke noble uprisings from House Azaro or Sazon, witness popular revolutions, and face deposition, imprisonment, or exile from the shores of Rizia.",
        "exclusivePairs": [],
        "exclusiveGroups": [
            ["The Second Revolt", "Long Live the Revolution", "Et Tu Titus?", "The King Behind Bars", "Away from My Land", "Fragmentation"]
        ]
    },
    "master-archivist-quirks": {
        "id": "master-archivist-quirks",
        "title": "The Master Archivist — 36 Collectibles & Hidden Easter Eggs",
        "subtitle": "All 36 Relics & Curios • Serge's Lucky Charm • Lucian's Chess Match • Royal Hoarder",
        "game": "Both",
        "tags": ["Both", "Special"],
        "archetype": "Master Archivist",
        "description": "The definitive dossier for completionists seeking all 36 collectible relics across Sordland and Rizia, unique dialogue quirks, loyal driver Serge Wolkner's secrets, royal hoarder milestones, and hidden historical trivia.",
        "exclusivePairs": [],
        "exclusiveGroups": []
    }
}

pathways_list = []

for arch_id, ids in archetype_ids.items():
    meta = metadata[arch_id]
    ach_names = [id_to_name[i] for i in ids]
    
    # Build steps from the achievements in this archetype
    # We sort steps by Turn if possible
    raw_steps = []
    for ach_id in ids:
        info = get_wt_info(ach_id)
        raw_steps.append({
            "ach_id": ach_id,
            "ach_name": id_to_name[ach_id],
            "turn": info.get("turn", "Turn 1"),
            "sceneTitle": info.get("sceneTitle", "Milestone Decision"),
            "sceneFile": info.get("sceneFile"),
            "context": info.get("context", "Diplomatic and political juncture."),
            "action": info.get("recommendedChoice", "Choose in accordance with the grand strategy."),
            "saveVariables": info.get("saveVariables", [])
        })
        
    # Group steps logically by Turn/Scene
    turn_order = [
        "Prologue", "Turn 1", "Turn 2", "Turn 3", "Turn 4", "Turn 5",
        "Turn 6", "Turn 7", "Turn 8", "Turn 9", "Turn 10", "Turn 11", "Epilogue"
    ]
    def sort_key(s):
        t = s["turn"]
        for idx, prefix in enumerate(turn_order):
            if prefix.lower() in t.lower():
                return idx
        return 99
        
    raw_steps.sort(key=sort_key)
    
    # Aggregate into distinct turn steps
    turn_grouped = {}
    for s in raw_steps:
        # Simplify turn label
        t_key = s["turn"]
        for known in turn_order:
            if known.lower() in t_key.lower():
                t_key = known
                break
        if t_key not in turn_grouped:
            turn_grouped[t_key] = []
        turn_grouped[t_key].append(s)
        
    final_steps = []
    for t_key in turn_order:
        if t_key in turn_grouped:
            items = turn_grouped[t_key]
            # Primary item
            primary = items[0]
            unlocked = [it["ach_name"] for it in items]
            
            # Combine actions and contexts cleanly
            actions_summary = "; ".join(it["action"] for it in items[:3] if it["action"])
            if not actions_summary:
                actions_summary = f"Advance the {meta['archetype']} policy during {t_key}."
                
            all_vars = []
            for it in items:
                all_vars.extend(it["saveVariables"])
            all_vars = list(dict.fromkeys(all_vars))[:6] # dedup up to 6
            
            final_steps.append({
                "turn": t_key,
                "title": f"{t_key} Strategic Objectives: {primary['sceneTitle']}",
                "context": primary["context"],
                "action": actions_summary,
                "unlockedAchievements": unlocked,
                "technicalDetails": {
                    "sceneTitle": primary["sceneTitle"],
                    "sceneFile": primary["sceneFile"],
                    "saveVariables": all_vars
                }
            })
            
    # Also add any remaining groups (e.g. Various)
    for t_key, items in turn_grouped.items():
        if t_key not in turn_order:
            primary = items[0]
            unlocked = [it["ach_name"] for it in items]
            final_steps.append({
                "turn": t_key,
                "title": f"Special Milestone: {primary['sceneTitle']}",
                "context": primary["context"],
                "action": "; ".join(it["action"] for it in items[:3] if it["action"]),
                "unlockedAchievements": unlocked,
                "technicalDetails": {
                    "sceneTitle": primary["sceneTitle"],
                    "sceneFile": primary["sceneFile"],
                    "saveVariables": []
                }
            })
            
    pathway_obj = {
        "id": meta["id"],
        "title": meta["title"],
        "subtitle": meta["subtitle"],
        "game": meta["game"],
        "tags": meta["tags"],
        "archetype": meta["archetype"],
        "description": meta["description"],
        "presetId": meta.get("presetId"),
        "achievements": ach_names,
        "exclusivePairs": meta["exclusivePairs"],
        "exclusiveGroups": meta["exclusiveGroups"],
        "crossRunExclusivePairs": [],
        "steps": final_steps
    }
    pathways_list.append(pathway_obj)

print(f"Generated {len(pathways_list)} full pathway objects.")
with open("scripts/generated_pathways.json", "w", encoding="utf-8") as f:
    json.dump(pathways_list, f, indent=2)

print("Saved to scripts/generated_pathways.json")
