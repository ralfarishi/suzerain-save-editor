import re
from collections import Counter

with open("src/data/steam_achievements.ts", "r", encoding="utf-8") as f:
    text = f.read()

types = re.findall(r'triggerType:\s*"([^"]+)"', text)
print("triggerType counts in steam_achievements.ts:")
print(Counter(types))

# Check items with "Collectible" in name vs triggerType
name_types = re.findall(r'name:\s*"([^"]+)"[\s\S]*?triggerType:\s*"([^"]+)"', text)
collectible_names = [n for n, t in name_types if "Collectible" in n or "CollectionItem" in n]
print(f"\nTotal achievements with 'Collectible' in name: {len(collectible_names)}")
for n in collectible_names[:5]:
    print(" -", n)
