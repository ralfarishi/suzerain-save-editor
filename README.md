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

### 2. Achievements Hub

- **Pathways & Guides Tab**: Follow step-by-step walkthroughs to stack achievements on your next run. Outdated guides are hidden by default but can be toggled via a smooth collapsible panel.
- **Interactive Gallery Tab**: Search and filter all 220 achievements by name or description.
- **O(1) Pathway Caching**: Precomputes guide relationships once at module load, ensuring search and filtering remain instant.

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

