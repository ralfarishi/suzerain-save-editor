import json

with open("scripts/all_achievement_names.json", "r", encoding="utf-8") as f:
    data = json.load(f)

all_achs = {a["name"]: a["id"] for a in data["all"]}
print(f"Total target achievements: {len(all_achs)}")

# Let's map every single one of the 220 achievements to one or more of the 10 pathways:
# 1. sordland-reformer
# 2. sordland-malenyevist
# 3. sordland-autocrat-sollist
# 4. sordland-war-machine
# 5. sordland-calamity
# 6. rizia-constitutional-reformer
# 7. rizia-absolutist-theocrat
# 8. rizia-grand-diplomat
# 9. rizia-fallen-monarch
# 10. master-archivist-quirks

# Let's write the complete dictionary of pathways and check that union == all_achs.
