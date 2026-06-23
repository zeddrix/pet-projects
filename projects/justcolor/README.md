# JustColor!

> Tap color buttons to learn color names and build a custom palette.

|                  |                                                                                                          |
| ---------------- | -------------------------------------------------------------------------------------------------------- |
| **Developed**    | April 2020                                                                                               |
| **Type**         | SvelteKit static preview                                                                                 |
| **Live preview** | [pet-projects playground](https://zeddrix.github.io/pet-projects/project/justcolor)                    |

A color-learning web app for teaching color names. Tap preset color buttons to change the page background, add custom colors, and manage your palette with SMUI dialogs.

This folder preserves the full git history from the former standalone repo [zeddrix/justcolor](https://github.com/zeddrix/justcolor).

### Tech stack

![SvelteKit](https://img.shields.io/badge/SvelteKit-FF3E00?logo=svelte&logoColor=white)
![Svelte](https://img.shields.io/badge/Svelte-4-FF3E00?logo=svelte&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![SMUI](https://img.shields.io/badge/SMUI-Material-6200EE)

### Rebuild static preview

From the monorepo root:

```bash
node scripts/build-justcolor-static.mjs
pnpm sync-projects
```

The playground iframe serves `build/` (see `preview.json`).

---

Part of the [pet-projects](https://github.com/zeddrix/pet-projects) monorepo.
