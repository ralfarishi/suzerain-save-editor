import json
import re
import os

with open("scripts/all_achievement_names.json", "r", encoding="utf-8") as f:
    ach_data = json.load(f)

all_achs = ach_data["all"]
sordland_achs = ach_data["sordland"]
rizia_achs = ach_data["rizia"]

# Load achievement walkthroughs to get exact turn, scene, and steps
with open("src/data/achievement_walkthroughs.ts", "r", encoding="utf-8") as f:
    walkthrough_text = f.read()

print(f"Loaded {len(all_achs)} total achievements.")
