import json
import re

with open("scripts/all_achievement_names.json", "r", encoding="utf-8") as f:
    ach_data = json.load(f)

all_achs = ach_data["all"]
all_names = set(a["name"] for a in all_achs)

print(f"Total target achievements: {len(all_names)}")
