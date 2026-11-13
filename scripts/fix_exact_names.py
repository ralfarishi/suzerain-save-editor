import re

with open("src/data/steam_achievements.ts", "r", encoding="utf-8") as f:
    text = f.read()

# Match each object { id: "...", ... name: "..." }
pattern = re.compile(r'id:\s*"([^"]+)",[\s\S]*?name:\s*"((?:[^"\\]|\\.)*)"')
matches = pattern.findall(text)
print(f"Total matched: {len(matches)}")

exact_map = {}
for id_, raw_name in matches:
    # Decode python string escapes
    decoded = bytes(raw_name, "utf-8").decode("unicode_escape")
    exact_map[id_] = decoded

with open("scripts/exact_steam_names.json", "w", encoding="utf-8") as f:
    import json
    json.dump(exact_map, f, ensure_ascii=False, indent=2)

print("Saved exact names to scripts/exact_steam_names.json")
