import re

with open("src/data/pathways.ts", "r", encoding="utf-8") as f:
    text = f.read()

matches = re.findall(r'(\[(?:Lawmaker|Rags to Riches|Frugal)\][^"\n]+)', text)
for m in set(matches):
    print("-", m)
