import json
import re
import os

with open("scripts/all_achievement_names.json", "r", encoding="utf-8") as f:
    ach_data = json.load(f)

with open("scripts/archetype_ids.json", "r", encoding="utf-8") as f:
    archetype_ids = json.load(f)

# Load achievement_walkthroughs.ts
with open("src/data/achievement_walkthroughs.ts", "r", encoding="utf-8") as f:
    walkthrough_raw = f.read()

# Extract walkthrough objects: "id": { ... }
id_to_name = {a["id"]: a["name"] for a in ach_data["all"]}
name_to_id = {a["name"]: a["id"] for a in ach_data["all"]}

# Extract data using regex from achievement_walkthroughs.ts
def extract_walkthrough_data(ach_id):
    pattern = rf'"{ach_id}":\s*\{{(?:[^{{}}]|(?R))*\}}'
    # Simplified regex: find start of block and grab fields
    pos = walkthrough_raw.find(f'"{ach_id}": {{')
    if pos == -1:
        return None
    # find next matching closing brace for this block
    # or just find fields inside
    sub = walkthrough_raw[pos:pos+4000]
    turn_m = re.search(r'"turn":\s*"([^"]+)"', sub)
    scene_m = re.search(r'"sceneTitle":\s*"([^"]+)"', sub)
    file_m = re.search(r'"sceneFile":\s*(?:"([^"]+)"|null)', sub)
    choice_m = re.search(r'"recommendedChoice":\s*"([^"]+)"', sub)
    context_m = re.search(r'"context":\s*"([^"]+)"', sub)
    vars_m = re.findall(r'"(BaseGame[a-zA-Z0-9_.]+|RiziaDLC[a-zA-Z0-9_.]+)"', sub)
    
    return {
        "turn": turn_m.group(1) if turn_m else "Variable",
        "sceneTitle": scene_m.group(1) if scene_m else "Scene Event",
        "sceneFile": file_m.group(1) if file_m and file_m.group(1) else None,
        "recommendedChoice": choice_m.group(1) if choice_m else "",
        "context": context_m.group(1) if context_m else "",
        "saveVariables": list(set(vars_m))
    }

print("Testing walkthrough extraction:")
print("Game_MediaDeal:", extract_walkthrough_data("Game_MediaDeal"))
print("Rizia_Reform:", extract_walkthrough_data("Rizia_Reform"))
