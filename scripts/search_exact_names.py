import json

with open('scripts/all_achievement_names.json', 'r', encoding='utf-8') as f:
    d = json.load(f)

keywords = ['woman', 'freedom', 'fortune', 'comrade', 'red', 'iron', 'state', 'victor', 'queen', 'war', 'coup', 'deposed', 'rags', 'house', 'dawn', 'crown', 'modern', 'ring', 'love', 'blud', 'lawmaker', 'donations', 'opening']

for a in d['all']:
    name_low = a['name'].lower()
    if any(k in name_low for k in keywords):
        print(f"{a['id']:35s} -> {repr(a['name'])}")
