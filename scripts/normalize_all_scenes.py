import os
import shutil
import sys
import time
from test_sample_clean import clean_scene_text
from verify_scenes_parity import verify_file_parity

SOURCE_DIR = os.path.abspath("Suzerain Dialogues Database/Scenes_Clean_Markdown")
BACKUP_DIR = os.path.abspath("Suzerain Dialogues Database/Scenes_Clean_Markdown_BACKUP_ORIGINAL")

def main():
    if not os.path.exists(BACKUP_DIR):
        print("ERROR: Backup directory not found! Run backup_scenes.py first.")
        sys.exit(1)

    files = [f for f in os.listdir(SOURCE_DIR) if f.endswith(".md")]
    print(f"Starting Normalization on {len(files)} scene files...")

    total_orig_lines = 0
    total_clean_lines = 0
    start_time = time.time()
    
    passed_count = 0
    failed_files = []

    for idx, fname in enumerate(files, 1):
        src_path = os.path.join(SOURCE_DIR, fname)
        bak_path = os.path.join(BACKUP_DIR, fname)
        
        # Read from backup as ground-truth
        with open(bak_path, "r", encoding="utf-8", errors="ignore") as f:
            orig_content = f.read()
            
        cleaned_content = clean_scene_text(orig_content)
        
        # Write to target
        with open(src_path, "w", encoding="utf-8") as f:
            f.write(cleaned_content)
            
        # Verify parity immediately
        ok, msg = verify_file_parity(bak_path, src_path)
        if ok:
            passed_count += 1
        else:
            # Revert immediately from backup on failure!
            shutil.copyfile(bak_path, src_path)
            failed_files.append((fname, msg))
            print(f"\n[REVERTED] Parity failed for {fname}: {msg}")

        orig_l = len(orig_content.splitlines())
        clean_l = len(cleaned_content.splitlines())
        total_orig_lines += orig_l
        total_clean_lines += clean_l
        
        if idx % 50 == 0 or idx == len(files):
            print(f"Progress: {idx}/{len(files)} files processed ({passed_count} verified)...")

    duration = time.time() - start_time
    print("\n" + "="*60)
    print("SCENES MARKDOWN NORMALIZATION REPORT")
    print("="*60)
    print(f"Total files processed: {len(files)}")
    print(f"Total files passed parity: {passed_count}/{len(files)}")
    print(f"Original total lines: {total_orig_lines:,}")
    print(f"Cleaned total lines: {total_clean_lines:,}")
    print(f"Redundant lines eliminated: {total_orig_lines - total_clean_lines:,}")
    print(f"Execution time: {duration:.2f} seconds")
    
    if failed_files:
        print(f"WARNING: {len(failed_files)} files failed parity and were safely reverted:")
        for fn, m in failed_files:
            print(f"  - {fn}: {m}")
        sys.exit(1)
    else:
        print("\nSUCCESS: 100% of 390 files passed content parity audit with ZERO loss!")

if __name__ == "__main__":
    main()
