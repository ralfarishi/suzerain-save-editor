# Suzerain Save Editor & Achievements Hub

[![React Doctor](https://www.react.doctor/share/badge?p=suzerain-v2&s=100&w=0&f=0)](https://www.react.doctor/share?p=suzerain-v2&s=100&w=0&f=0)

The ultimate Suzerain save editor. Modify budget, public opinion, collectibles, and political decisions with ease. Secure, fast, and feature-rich for Sordland and Rizia campaigns.

## Features

### 1. Modern Save Editor

- **Uncontrolled & Debounced Inputs**: Local buffering of number inputs propagates changes to state after 300ms of inactivity, resolving typing lag completely.
- **Inline Single-Field Undo Controls**: Revert modified inputs to their original values instantly with a single click.
- **Visual Modification Indicators**: Modified fields are highlighted with a warm brass border (`#b8860b` / `#daa520`) to display unsaved changes comfortably.
- **Strict File Structure Verification**: Verifies save file validity on upload by strictly checking the file's internal properties (like `saveFileType` and `variables`) to prevent loading non-save JSON files.
- **Date Fallbacks**: Collected items with empty date strings in the save file are automatically initialized to the save file's `lastModified` time or local system time.

### 2. Achievements Hub & Causal Walkthrough Explorer

- **Pathways & Guides Tab**: Follow step-by-step walkthroughs to stack achievements on your next run, with live save-alignment matching.
- **Interactive Gallery Tab**: Search and filter all 220 Steam achievements by name, trigger type, or live save-audit status (`Completed`, `In Progress`, `Missed`, `Other Campaign`).
- **Causal Walkthrough Explorer Tab**: Inspect turn-by-turn dialogue trees, decisions, bills, and decrees with cross-turn variable impact tracing (`Turn A -> Turn D`) and one-click **"Fix in Save"** actions.
- **Run Planner (`/planner`)**: Plan optimal multi-achievement runs for Sordland and Rizia with automatic exclusive-conflict detection.

---

## Data Sources & Pipeline

All game data, causal links, and achievement rules are compiled from extracted Suzerain base game assets (gitignored under `Suzerain Dialogues Database/BASE/`):

1. **Raw Game Assets (`Suzerain Dialogues Database/BASE/`, gitignored)**:
   - `MonoBehaviour/Suzerain.dat`: Pixel Crushers `DialogueDatabase` binary dump (`articy:draft 4.1.2`) containing 521 conversations, 201,686 dialogue entries, `outgoingLinks`, `conditionsString`, `userScript`, 103 actors, and 12,828 variables.
   - `TextAsset/*.json`: Base64-wrapped Unity JSON assets including `_GameFlow.json`, `ConversationData.json`, `StoryPackData.json`, `turnsConfig.json`, `ConditionalAchievementData.json`, `achievementsConfig.json`, `DecisionData.json`, `DecreeApprovalData.json`, `BillData.json`, `JournalEntryData.json`, and `CodexEntryData.json`.
   - `MonoBehaviour/*AchievementData*.dat`: Binary asset metadata for all 220 Steam achievements.
2. **Offline Extraction & Graph Compilation (`scripts/pipeline/`)**:
   - `extract_base.py` parses `Suzerain.dat` and decodes `BASE/TextAsset/*.json`.
   - `build_causal_graph.py` collapses empty logic/connector nodes, indexes dialogue + non-dialogue (`ConversationData`, `DecisionData`, `DecreeApprovalData`, `BillData`) variable producers/consumers, builds a 3-tier human-readable `semanticDictionary`, and emits:
     - `public/data/causal-graph.json` (~1.53 MB lightweight master index for fast client-side queries)
     - `public/data/scenes/*.json` (521 lazy-loaded per-scene dialogue tree chunks)
     - `Suzerain Dialogues Database/Scenes_Structured/*.md` (521 structured Markdown scene files, gitignored)
3. **Frontend TypeScript Datasets (`src/data/`)**:
   - `sordland.ts` & `rizia.ts`: Curated Save Editor fields, sections, and presets (`presets.ts`).
   - `steam_achievements.ts`, `achievement_walkthroughs.ts`, `pathways.ts`, & `runs.ts`: Achievement definitions, lazy-loaded walkthroughs, and multi-achievement run pathways.
4. **Client-Side Save Integration (`save-example.json` / `public/sample-save.json`)**:
   - Save files are parsed 100% locally in the browser (`src/utils/lua-variables.ts`, `src/utils/save-manager.ts`, `src/utils/save-audit.ts`), reading `turnNo`, `currentStoryPack`, the Lua `variables` table, and `entityUpdates`.

---

## Tech Stack

- **Package Manager**: pnpm
- **Bundler & Dev Server**: Vite 7
- **Frontend Library**: React 19
- **Design System & Styling**: Tailwind CSS v4

---

## Getting Started

### Installation

Install the project dependencies:

```bash
pnpm install
```

### Run Locally

Start the development server:

```bash
pnpm run dev
```

### Build for Production

Compile and bundle the production assets:

```bash
pnpm run build
```

### Run Tests

Execute the unit tests:

```bash
pnpm run test
```

---

## Shoutouts

- [Steam Community Achievement Pathway Guide](https://steamcommunity.com/sharedfiles/filedetails/?id=3341333208)
- [Magic-Symon Save Parser Reference](https://github.com/stevenhoekerd/Magic-Symon)
- [Trolledd Suzerain Save Database](https://trolledd.github.io/suzerain/)

