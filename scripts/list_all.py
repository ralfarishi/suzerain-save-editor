import json

with open('scripts/all_achievement_names.json', 'r', encoding='utf-8') as f:
    d = json.load(f)

print("=== SORDLAND ACHIEVEMENTS ===")
for i, a in enumerate(d['sordland']):
    print(f"{i+1:3d}. [{a['id']}] {a['name']}")

print("\n=== RIZIA ACHIEVEMENTS ===")
for i, a in enumerate(d['rizia']):
    print(f"{i+1:3d}. [{a['id']}] {a['name']}")
