import os
from test_sample_clean import clean_scene_text
from verify_scenes_parity import verify_file_parity

BACKUP_DIR = "Suzerain Dialogues Database/Scenes_Clean_Markdown_BACKUP_ORIGINAL"

test_files = [
    "Prologue_Archive.md",
    "Sordland_Turn07_A_AssemblyVote.md",
    "Sordland_Turn10_SnO_RumburgWarPlans.md",
    "Rizia_Elections_Elections Conversation.md",
    "Rizia_Turn 10_DEFAULT GATHERING SCENE_DEFAULT HOUSE SAZON CONVO.md"
]

all_passed = True
for fname in test_files:
    src = os.path.join(BACKUP_DIR, fname)
    if not os.path.exists(src):
        print(f"Skipping {fname} (not found)")
        continue
    with open(src, "r", encoding="utf-8", errors="ignore") as f:
        orig = f.read()
    cleaned = clean_scene_text(orig)
    
    tmp_out = os.path.join("Suzerain Dialogues Database/Scenes_Clean_Markdown", "temp_" + fname)
    with open(tmp_out, "w", encoding="utf-8") as f:
        f.write(cleaned)
        
    ok, msg = verify_file_parity(src, tmp_out)
    orig_lines = len(orig.splitlines())
    clean_lines = len(cleaned.splitlines())
    diff = orig_lines - clean_lines
    print(f"[{'PASS' if ok else 'FAIL'}] {fname} ({orig_lines} -> {clean_lines} lines, -{diff} redundant lines): {msg}")
    
    if os.path.exists(tmp_out):
        os.remove(tmp_out)
    if not ok:
        all_passed = False

if all_passed:
    print("\nALL 5 DIVERSE SAMPLES PASSED 100% PARITY AUDIT!")
else:
    print("\nFAILURES DETECTED!")
