import re
import json

with open("src/data/achievement_walkthroughs.ts", "r", encoding="utf-8") as f:
    content = f.read()

# Parse individual achievement walkthrough blocks: "AchievementId": { ... }
# We can regex or use a simplified extractor
print(f"Read walkthrough file ({len(content)} bytes)")

# Let's verify we can find ids
ids = re.findall(r'"([a-zA-Z0-9_]+)":\s*\{\s*"achievementId":', content)
print(f"Found {len(ids)} walkthrough objects in achievement_walkthroughs.ts")
