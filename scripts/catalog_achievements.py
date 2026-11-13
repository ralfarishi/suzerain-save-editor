import json
import re

with open("src/data/steam_achievements.ts", "r", encoding="utf-8") as f:
    text = f.read()

entries = re.findall(r'id:\s*"([^"]+)",[\s\S]*?name:\s*"([^"]+)"', text)
print(f"Total entries: {len(entries)}")

sordland_achs = [name for id_, name in entries if not id_.startswith("Rizia")]
rizia_achs = [name for id_, name in entries if id_.startswith("Rizia")]

print(f"Sordland: {len(sordland_achs)}")
print(f"Rizia: {len(rizia_achs)}")

with open("scripts/all_achievement_names.json", "w", encoding="utf-8") as f:
    json.dump({
        "all": [{"id": id_, "name": name} for id_, name in entries],
        "sordland": [{"id": id_, "name": name} for id_, name in entries if not id_.startswith("Rizia")],
        "rizia": [{"id": id_, "name": name} for id_, name in entries if id_.startswith("Rizia")]
    }, f, indent=2)

print("Saved to scripts/all_achievement_names.json")
