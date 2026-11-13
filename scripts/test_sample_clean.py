import os
import re

def clean_scene_text(text: str) -> str:
    lines = text.splitlines()
    
    # Pass 1: Normalize line endings and trim trailing whitespace
    lines = [l.rstrip() for l in lines]
    
    output = []
    i = 0
    n = len(lines)
    
    while i < n:
        line = lines[i]
        
        # If blank line, collapse consecutive blank lines
        if not line.strip():
            if output and output[-1].strip() != "":
                output.append("")
            i += 1
            continue
            
        # Always preserve Logic/Variable verbatim
        if "⚙️ **Logic/Variable:**" in line:
            output.append(line)
            i += 1
            continue
            
        # Check duplicate identical speaker header: e.g. **Petr Vectern**:\n**Petr Vectern**:
        if line.startswith("**") and line.endswith("**:"):
            # Look ahead across empty lines
            j = i + 1
            while j < n and not lines[j].strip():
                j += 1
            if j < n and lines[j].strip() == line.strip():
                # Skip duplicate speaker header
                i = j
                continue
                
        # Check if line is consecutive exact duplicate of previous non-empty line
        prev_non_empty = None
        for p in reversed(output):
            if p.strip():
                prev_non_empty = p.strip()
                break
                
        if prev_non_empty:
            # 1. Exact identical line duplicate
            if line.strip() == prev_non_empty:
                i += 1
                continue
                
            # 2. Blockquote vs unquoted exact duplicate:
            # e.g. prev is "> Hello" and current is "Hello", or prev is "Hello" and current is "> Hello"
            p_strip = prev_non_empty.lstrip("> ").strip()
            c_strip = line.strip().lstrip("> ").strip()
            if p_strip == c_strip and len(p_strip) > 0:
                i += 1
                continue
                
            # 3. Truncated ellipsis prefix preview:
            # If previous non-empty was a preview ending in "..." or "…"
            # and current line starts with that preview prefix and is longer:
            # Then the previous line was just an incomplete menu preview!
            # BUT wait: here we are looking forward or backward?
            # It's better to look forward: if current line is preview of next line!
            
        # Look forward to see if CURRENT line is an ellipsis preview of NEXT line
        # e.g., current: "We will celebrate at the inaugural..."
        #       next:    "We will celebrate at the inaugural ball. Just hang in there until the evening."
        c_clean = line.strip().lstrip("> ").strip()
        if (c_clean.endswith("...") or c_clean.endswith("…")) and len(c_clean) > 5:
            # Find next non-empty line
            nxt_idx = i + 1
            while nxt_idx < n and not lines[nxt_idx].strip():
                nxt_idx += 1
            if nxt_idx < n:
                nxt_line = lines[nxt_idx].strip()
                nxt_clean = nxt_line.lstrip("> ").strip()
                prefix = c_clean.rstrip(".").rstrip("…").strip()
                # If next line starts with the exact prefix and is longer or equal
                if len(prefix) >= 5 and nxt_clean.startswith(prefix) and len(nxt_clean) >= len(prefix):
                    # Current line is merely a truncated menu preview! Skip it.
                    i += 1
                    continue

        output.append(line)
        i += 1
        
    # Strip any trailing blank lines
    while output and not output[-1].strip():
        output.pop()
        
    return "\n".join(output) + "\n"

if __name__ == "__main__":
    src_path = "Suzerain Dialogues Database/Scenes_Clean_Markdown_BACKUP_ORIGINAL/Sordland_Turn01_A_PoliticalOverview.md"
    with open(src_path, "r", encoding="utf-8") as f:
        original = f.read()
    
    cleaned = clean_scene_text(original)
    
    orig_lines = original.splitlines()
    clean_lines = cleaned.splitlines()
    
    print(f"Original lines: {len(orig_lines)}")
    print(f"Cleaned lines: {len(clean_lines)}")
    print(f"Saved lines: {len(orig_lines) - len(clean_lines)}")
    
    # Preview lines 15-40 of cleaned
    print("\nCleaned preview (lines 15-45):")
    for l in clean_lines[14:45]:
        print(l)
