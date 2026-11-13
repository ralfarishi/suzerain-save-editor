import re

with open("src/data/steam_achievements.ts", "r", encoding="utf-8") as f:
    text = f.read()

names = re.findall(r'name:\s*"([^"]+)"', text)

with open("src/data/pathways.ts", "r", encoding="utf-8") as f:
    p_text = f.read()

pathway_names = set(re.findall(r'"([^"]+)"', p_text))
matched = [n for n in names if n in pathway_names]
unmatched = [n for n in names if n not in pathway_names]

print(f"Total steam achievements: {len(names)}")
print(f"Covered in pathways.ts: {len(matched)}")
print(f"Uncovered in pathways.ts: {len(unmatched)}")
