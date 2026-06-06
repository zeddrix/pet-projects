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
| [`terminal/`](terminal/) | Faux terminal UI + Pyodide |
| [`visual/`](visual/) | Storybook illustrated adventure + adventure map |
| [`assets/scenes/`](assets/scenes/) | AI-generated scene art (see [ART-PROMPTS.md](assets/ART-PROMPTS.md)) |

## Run the original CLI

```bash
cd projects/diamond-in-black-pearl/original
python3 game.py
```

## Play in the browser

Open the playground preview and choose **Terminal Mode** or **Visual Adventure**. Both modes run `engine.py` via Pyodide — no server required.

Direct links (local dev after `pnpm sync-projects`):

- Launcher: `/projects/diamond-in-black-pearl/`
- Terminal: `/projects/diamond-in-black-pearl/terminal/`
- Visual: `/projects/diamond-in-black-pearl/visual/`

## Art credits

Scene illustrations were **AI-generated** during monorepo import in a locked **storybook adventure** style. Prompts and style bible are archived in [`assets/STYLE-BIBLE.md`](assets/STYLE-BIBLE.md) and [`assets/ART-PROMPTS.md`](assets/ART-PROMPTS.md). The adventure map is hand-authored SVG.

Generic pirate and pink-jewel motifs are used — not official Pink Panther or Pirates of the Caribbean character likenesses.

## Drift policy

- `original/game.py` is a frozen time capsule from [zeddrix/diamond-in-black-pearl](https://github.com/zeddrix/diamond-in-black-pearl).
- Game logic changes for browser modes go in `engine.py` only.

## Ambient sound

Deferred for v1 (R7 off by default).

---

Part of the [pet-projects](https://github.com/zeddrix/pet-projects) monorepo.
