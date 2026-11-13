import os
import shutil
import sys

SOURCE_DIR = os.path.abspath("Suzerain Dialogues Database/Scenes_Clean_Markdown")
BACKUP_DIR = os.path.abspath("Suzerain Dialogues Database/Scenes_Clean_Markdown_BACKUP_ORIGINAL")

def main():
    if not os.path.exists(SOURCE_DIR):
        print(f"ERROR: Source directory not found: {SOURCE_DIR}")
        sys.exit(1)
        
    print(f"Creating 1:1 Backup...")
    print(f"Source: {SOURCE_DIR}")
    print(f"Destination: {BACKUP_DIR}")
    
    if os.path.exists(BACKUP_DIR):
        print(f"Backup directory already exists: {BACKUP_DIR}")
    else:
        shutil.copytree(SOURCE_DIR, BACKUP_DIR)
        print("Backup copied successfully.")
        
    src_files = os.listdir(SOURCE_DIR)
    bak_files = os.listdir(BACKUP_DIR)
    
    print(f"Source files: {len(src_files)}")
    print(f"Backup files: {len(bak_files)}")
    
    if len(src_files) != len(bak_files):
        print("ERROR: File count mismatch between source and backup!")
        sys.exit(1)
        
    print("SUCCESS: 1:1 Backup verified.")

if __name__ == "__main__":
    main()
