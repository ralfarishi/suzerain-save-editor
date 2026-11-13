import re
import os

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
wt_path = os.path.join(root, "src", "data", "achievement_walkthroughs.ts")

with open(wt_path, "r", encoding="utf-8") as f:
    text = f.read()

matches = re.findall(r'"achievementId":\s*"([^"]+)",[\s\S]*?"achievementName":\s*"([^"]+)",[\s\S]*?"prerequisites":\s*\[\s*"([^"]+)"[\s\S]*?"recommendedChoice":\s*"([^"]+)"', text)

generic = []
for aid, aname, prereq, choice in matches:
    if "Approve decree / bill supporting" in choice or "Follow path guidance" in choice:
        generic.append((aid, aname, prereq, choice))

print(f"Total generic choices: {len(generic)}")
for aid, aname, prereq, c in generic:
    print(f"\n[{aid}] {aname}")
    print(f"  Prereq: {prereq}")
    print(f"  Old choice: {c}")
