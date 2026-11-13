with open("src/data/achievement_walkthroughs.ts", "r", encoding="utf-8") as f:
    text = f.read()

for target in ["Game_Lawmaker", "Game_WealthSurplus", "Game_BudgetSurplus"]:
    pos = text.find(f'"{target}": {{')
    print(f"=== {target} ===")
    print(text[pos:pos+1000])
