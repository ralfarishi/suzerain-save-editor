import re

with open("src/data/pathways.ts", "r", encoding="utf-8") as f:
    text = f.read()

# Find all action lines inside steps: actions: [ ... ]
actions = re.findall(r'"(\[[^\]]+\][^"]+)"', text)
print(f"Total actions across all pathways: {len(actions)}")

vague_patterns = [
    "Approve decree",
    "Follow path guidance",
    "Advance ",
    "Ensure prerequisite",
    "Execute decision in alignment",
    "Key milestone",
    "Strategic event",
    "Diplomatic and political juncture"
]

flagged = []
for act in actions:
    for v in vague_patterns:
        if v.lower() in act.lower():
            flagged.append((v, act))
            break

print(f"Flagged vague actions: {len(flagged)}")
for v, act in flagged:
    print(f" [{v}] -> {act}")
