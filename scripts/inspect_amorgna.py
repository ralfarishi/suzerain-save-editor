with open("src/data/achievement_walkthroughs.ts", "r", encoding="utf-8") as f:
    text = f.read()

pos = text.find('"Game_AMorgna": {')
print(text[pos:pos+1500])
