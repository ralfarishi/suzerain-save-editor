import re

with open("src/data/steam_achievements.ts", "r", encoding="utf-8") as f:
    content = f.read()

# Replace triggerType for CollectionItem achievements
def replacer(match):
    block = match.group(0)
    # Replace triggerType: "..." with triggerType: "collectible"
    updated_block = re.sub(r'triggerType:\s*"[^"]+"', 'triggerType: "collectible"', block)
    return updated_block

pattern = re.compile(r'\{\s*id:\s*"(?:Game|Rizia)_CollectionItem_[^"]+"[\s\S]*?\}', re.MULTILINE)

new_content, count = pattern.subn(replacer, content)

print(f"Updated {count} collection items to triggerType: 'collectible'")

with open("src/data/steam_achievements.ts", "w", encoding="utf-8") as f:
    f.write(new_content)

print("Saved to src/data/steam_achievements.ts")
