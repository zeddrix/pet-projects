# Bible Query

> Test your Biblical knowledge in this trivia game.

|                  |                                                                                                          |
| ---------------- | -------------------------------------------------------------------------------------------------------- |
| **Developed**    | May 2020                                                                                                 |
| **Type**         | Static web demo                                                                                          |
| **Live preview** | [pet-projects playground](https://zeddrix.github.io/pet-projects/project/bible-query)                    |

A multi-screen Bible trivia game with levels, multiple-choice questions, clues, optional timers, and star-based scoring. All question data is embedded client-side — no server or API calls at runtime.

This folder preserves the full git history from the former standalone repo [zeddrix/bible-query](https://github.com/zeddrix/bible-query).

### Tech stack

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Custom fonts](https://img.shields.io/badge/Custom_fonts-Typography-555)

### Image assets

UI images live under `img/` as **WebP** files, resized to roughly **2×** their on-screen max width for sharp display in the 420px-wide layout.

To re-encode after replacing source artwork, run from the repo root:

```bash
pnpm optimize:bible-query-images
pnpm sync-projects
```

The script reads JPEG/PNG sources, writes sibling `.webp` files, and removes the originals. Commit the updated `img/*.webp` and reference paths in `index.html`, `styles/style.css`, and `scripts/query.js`.

---

Part of the [pet-projects](https://github.com/zeddrix/pet-projects) monorepo.
