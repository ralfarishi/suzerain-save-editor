import re

with open("src/data/steam_achievements.ts", "r", encoding="utf-8") as f:
    text = f.read()

# Extract names: name: "..."
names = re.findall(r'name:\s*"([^"]+)"', text)
print(f"Total achievements in steam_achievements.ts: {len(names)}")

with open("src/data/runs.ts", "r", encoding="utf-8") as f:
    r_text = f.read()

run_names = set(re.findall(r'"([^"]+)"', r_text))
matched = [n for n in names if n in run_names]
unmatched = [n for n in names if n not in run_names]

print(f"Covered in runs.ts: {len(matched)}")
print(f"Uncovered in runs.ts: {len(unmatched)}")
print("\nFirst 20 Uncovered Achievements:")
for u in unmatched[:20]:
    print(" -", u)
