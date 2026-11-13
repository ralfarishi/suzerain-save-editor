import json

with open('scripts/all_achievement_names.json', 'r', encoding='utf-8') as f:
    d = json.load(f)

print(f"Total: {len(d['all'])}")
for i, a in enumerate(d['all']):
    print(f"{i+1:3d}: {a['id']:35s} -> {repr(a['name'])}")
