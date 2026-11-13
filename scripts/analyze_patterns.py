import os
import re

SCENES_DIR = os.path.abspath("Suzerain Dialogues Database/Scenes_Clean_Markdown_BACKUP_ORIGINAL")

def analyze():
    files = [os.path.join(SCENES_DIR, f) for f in os.listdir(SCENES_DIR) if f.endswith(".md")]
    
    ellipsis_followed_by_full = 0
    consecutive_exact_duplicates = 0
    stacked_speakers = 0
    quote_followed_by_exact_unquote = 0
    
    sample_ellipsis_pairs = []
    
    for fpath in files:
        with open(fpath, "r", encoding="utf-8", errors="ignore") as f:
            lines = [l.strip() for l in f.readlines()]
            
        # filter out empty lines for sequence analysis
        non_empty = [l for l in lines if l]
        
        for i in range(len(non_empty) - 1):
            curr = non_empty[i]
            nxt = non_empty[i + 1]
            
            # Check consecutive identical
            if curr == nxt and not curr.startswith("#") and not curr.startswith("---"):
                consecutive_exact_duplicates += 1
                
            # Check stacked speaker headers
            if curr.startswith("**") and curr.endswith("**:") and nxt.startswith("**") and nxt.endswith("**:"):
                stacked_speakers += 1
                
            # Check quote followed by exact unquote
            if curr.startswith("> ") and curr[2:].strip() == nxt:
                quote_followed_by_exact_unquote += 1
                
            # Check ellipsis prefix: e.g. "Foo bar..." followed by "Foo bar baz."
            # Also handle if curr or nxt is in blockquote "> "
            c_clean = curr.lstrip("> ").strip()
            n_clean = nxt.lstrip("> ").strip()
            
            if (c_clean.endswith("...") or c_clean.endswith("…")) and len(c_clean) > 5:
                prefix = c_clean.rstrip(".").rstrip("…").strip()
                if len(prefix) >= 5 and n_clean.startswith(prefix) and len(n_clean) > len(prefix):
                    ellipsis_followed_by_full += 1
                    if len(sample_ellipsis_pairs) < 5:
                        sample_ellipsis_pairs.append((c_clean, n_clean, os.path.basename(fpath)))

    print("Pattern Analysis Across 390 Files:")
    print(f"- Ellipsis prefix followed by full text: {ellipsis_followed_by_full}")
    print(f"- Consecutive exact duplicate lines: {consecutive_exact_duplicates}")
    print(f"- Stacked speaker headers (**A**:\n**B**:/**A**:\n**A**:): {stacked_speakers}")
    print(f"- Quote followed immediately by unquote duplicate: {quote_followed_by_exact_unquote}")
    print("\nSamples of ellipsis followed by full text:")
    for c, n, fn in sample_ellipsis_pairs:
        print(f"  [{fn}] '{c}' -> '{n}'")

if __name__ == "__main__":
    analyze()
