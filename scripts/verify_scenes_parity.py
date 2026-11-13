import os
import sys

def verify_file_parity(orig_path: str, clean_path: str) -> tuple[bool, str]:
    with open(orig_path, "r", encoding="utf-8", errors="ignore") as f:
        orig_text = f.read()
    with open(clean_path, "r", encoding="utf-8", errors="ignore") as f:
        clean_text = f.read()

    orig_lines = [l.strip() for l in orig_text.splitlines() if l.strip()]
    clean_lines = [l.strip() for l in clean_text.splitlines() if l.strip()]
    clean_lines_set = set(clean_lines)

    # 1. Verify 100% Logic/Variable parity
    orig_logic = [l for l in orig_lines if "⚙️ **Logic/Variable:**" in l]
    clean_logic = [l for l in clean_lines if "⚙️ **Logic/Variable:**" in l]

    if orig_logic != clean_logic:
        return False, f"Logic/Variable mismatch! Orig count: {len(orig_logic)}, Clean count: {len(clean_logic)}"

    # 2. Verify all unique full text lines from orig are present in clean
    # Lines in orig that are NOT preview ellipsis
    for i, line in enumerate(orig_lines):
        clean_norm = line.lstrip("> ").strip()
        
        # Check if line was a truncated preview
        is_preview = False
        if (clean_norm.endswith("...") or clean_norm.endswith("…")) and len(clean_norm) > 5:
            prefix = clean_norm.rstrip(".").rstrip("…").strip()
            # If any subsequent line in orig starts with this prefix
            for j in range(i + 1, min(i + 4, len(orig_lines))):
                nxt_norm = orig_lines[j].lstrip("> ").strip()
                if nxt_norm.startswith(prefix) and len(nxt_norm) >= len(prefix):
                    is_preview = True
                    break
        
        if is_preview:
            # It's an incomplete preview, so it's allowed to be omitted
            continue

        # If it's a full line, it MUST be present in clean_lines (either exact or as blockquote/unquoted)
        found = False
        if line in clean_lines_set:
            found = True
        else:
            # Check without blockquote marker
            for cl in clean_lines:
                if cl.lstrip("> ").strip() == clean_norm:
                    found = True
                    break
                    
        if not found:
            return False, f"Line missing from cleaned file: '{line}'"

    return True, "Parity 100% verified (0 lost sentences, 0 logic alterations)"

if __name__ == "__main__":
    import test_sample_clean
    
    src = "Suzerain Dialogues Database/Scenes_Clean_Markdown_BACKUP_ORIGINAL/Sordland_Turn01_A_PoliticalOverview.md"
    tmp_out = "Suzerain Dialogues Database/Scenes_Clean_Markdown/temp_test.md"
    
    with open(src, "r", encoding="utf-8") as f:
        cleaned = test_sample_clean.clean_scene_text(f.read())
    with open(tmp_out, "w", encoding="utf-8") as f:
        f.write(cleaned)
        
    ok, msg = verify_file_parity(src, tmp_out)
    print(f"Sample test parity result: {ok} -> {msg}")
    
    if os.path.exists(tmp_out):
        os.remove(tmp_out)
