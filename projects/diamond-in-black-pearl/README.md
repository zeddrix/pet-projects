# Diamond in Black Pearl

![Python](https://img.shields.io/badge/Python_3-3776AB?logo=python&logoColor=white)
![Pyodide](https://img.shields.io/badge/Pyodide-Browser_Python-FFD43B)
![Vanilla JS](https://img.shields.io/badge/Vanilla_JS-F7DF1E?logo=javascript&logoColor=black)

**Developed:** June 2020 (original CLI)

A Pink Panther meets Pirates text adventure — originally a terminal Python game, now playable in the browser with **terminal** and **illustrated visual** modes.

**Live preview:** [pet-projects playground](https://zeddrix.github.io/pet-projects/project/diamond-in-black-pearl)

## Folder layout

| Path | Purpose |
|------|---------|
| [`original/`](original/) | **Untouched** CLI game from standalone repo with full git history |
| [`engine.py`](engine.py) | Browser-derived copy with scene hooks (do not edit `original/game.py`) |
| [`terminal/`](terminal/) | Faux terminal UI + Pyodide Web Worker |
| [`visual/`](visual/) | Storybook illustrated adventure + adventure map |
| [`assets/scenes/`](assets/scenes/) | AI-generated scene art as JPEG (see [ART-PROMPTS.md](assets/ART-PROMPTS.md)) |
| [`vendor/pyodide/`](vendor/pyodide/) | Self-hosted Pyodide runtime (synced by `pnpm sync-projects`) |

## Run the original CLI

```bash
cd projects/diamond-in-black-pearl/original
python3 game.py
```

Or view the preserved source on GitHub: [`original/game.py`](https://github.com/zeddrix/pet-projects/blob/main/projects/diamond-in-black-pearl/original/game.py)

## Play in the browser

Open the playground preview and choose **Terminal Mode** or **Visual Adventure**. Both modes run `engine.py` via Pyodide in a **Web Worker** — tap **Start** first so the main thread stays responsive.

Direct links (local dev after `pnpm sync-projects`):

- Launcher: `/projects/diamond-in-black-pearl/`
- Terminal: `/projects/diamond-in-black-pearl/terminal/`
- Visual: `/projects/diamond-in-black-pearl/visual/`

## Ambient sound

Visual mode includes an optional ambient sound toggle (off by default). Scene changes crossfade jungle, ship, or sea loops. Respects `prefers-reduced-motion: reduce`.

## Testing

From the monorepo root (see [docs/dibp-testing-rules.md](../../docs/dibp-testing-rules.md)):

```bash
pnpm sync-projects
pnpm test:dibp-engine   # pytest — all engine.py branches
pnpm test:dibp-e2e      # Playwright — boot, launcher, game journeys
```

## Art credits

Scene illustrations were **AI-generated** during monorepo import in a locked **storybook adventure** style, delivered as **JPEG** for GitHub Pages size limits. Prompts and style bible are archived in [`assets/STYLE-BIBLE.md`](assets/STYLE-BIBLE.md) and [`assets/ART-PROMPTS.md`](assets/ART-PROMPTS.md). The adventure map is hand-authored SVG.

Generic pirate and pink-jewel motifs are used — not official Pink Panther or Pirates of the Caribbean character likenesses.

## Drift policy

- `original/game.py` is a frozen time capsule from [zeddrix/diamond-in-black-pearl](https://github.com/zeddrix/diamond-in-black-pearl).
- Game logic changes for browser modes go in `engine.py` only.

---

Part of the [pet-projects](https://github.com/zeddrix/pet-projects) monorepo.
