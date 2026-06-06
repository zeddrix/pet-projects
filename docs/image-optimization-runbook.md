# Image optimization runbook

Operational guide for optimizing pet-project assets in this monorepo.

## Before you start

```bash
git tag backup/pre-image-opt-$(date +%Y-%m-%d)
pnpm backup:images
pnpm backup:dibp-pyodide   # before Pyodide vendor changes
```

Backups land in `scripts/image-backups/` (gitignored).

## Optimize a project profile

```bash
pnpm optimize:images -- --profile <slug> --dry-run
pnpm optimize:images -- --profile <slug>              # keeps JPEG/PNG/GIF sources
pnpm optimize:images -- --profile <slug> --no-keep-sources
pnpm sync-projects
```

List profiles:

```bash
pnpm optimize:images -- --list
```

After optimizing **blog-app**, rebuild the inner static preview:

```bash
node scripts/build-blog-app-static.mjs
pnpm sync-projects
```

## Verify locally

```bash
pnpm quality
pnpm test:unit
pnpm test:e2e
pnpm test:dibp-engine
pnpm test:dibp-e2e
BASE_PATH=/pet-projects pnpm build:pages
```

## Rollback

| Failure            | Action                                                                                                                                                 |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Bad asset swap     | `git revert <commit>` or restore tarball from `scripts/image-backups/`                                                                                 |
| Lost originals     | `tar -xzf scripts/image-backups/project-images-*.tar.gz -C projects/`                                                                                  |
| Bad Pyodide vendor | `tar -xzf scripts/image-backups/dibp-pyodide-*.tar.gz -C projects/diamond-in-black-pearl/vendor/pyodide/` or revert sync script + `pnpm sync-projects` |
| Bad Pages deploy   | GitHub **Deployments → Pages → Rollback**                                                                                                              |

## GitHub Pages cache

GitHub Pages does **not** support custom `_headers` or `Cache-Control` for user sites. WebP migration busts caches via new filenames (`.webp` vs `.jpg`).

## Post-deploy manual checklist

1. [jw-guitar-templates](https://zeddrix.github.io/pet-projects/project/jw-guitar-templates) — background image loads
2. [diamond-in-black-pearl visual](https://zeddrix.github.io/pet-projects/project/diamond-in-black-pearl?demo=visual/) — scene art + one choice
3. [blog-app](https://zeddrix.github.io/pet-projects/project/blog-app) — hobby cards on home
4. Default GitHub Finder spinner
5. [loan-calculator](https://zeddrix.github.io/pet-projects/project/loan-calculator) — loading indicator

## Byte totals (2026-06-06 verification)

| Metric                                                                    | Before (baseline) | After     | Change                                                                                |
| ------------------------------------------------------------------------- | ----------------- | --------- | ------------------------------------------------------------------------------------- |
| Raster under `projects/` (excl. node_modules, vendor, `.svelte-kit`)      | ~11.5 MB          | ~4.3 MB   | **~62% smaller**                                                                      |
| DIBP deploy folder (`static/projects/diamond-in-black-pearl/` after sync) | ~17 MB            | ~16.2 MB  | **~5% smaller** (WebP scenes + sync exclude; Pyodide WASM floor limits further gains) |
| DIBP Pyodide vendor (`projects/diamond-in-black-pearl/vendor/pyodide/`)   | ~13 MB            | ~13.14 MB | Checksum-pinned manifest; lock file retained                                          |

Recompute after future asset changes:

```bash
find projects -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' -o -iname '*.gif' -o -iname '*.webp' \) ! -path '*/node_modules/*' ! -path '*/vendor/*' ! -path '*/.svelte-kit/*' -print0 | xargs -0 stat -f%z | awk '{s+=$1} END {print s/1024/1024 " MB"}'
du -sh static/projects/diamond-in-black-pearl
```

## Design decisions and deferred work

| Item                                                           | Status                                                                                 |
| -------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| WebP path updates                                              | Implemented across all raster-heavy slugs                                              |
| Sync exclude for dev art (`00-style-reference.jpg`)            | Implemented via `scripts/sync-excludes.json`                                           |
| Generalized Sharp pipeline (`scripts/lib/optimize-images.mjs`) | Implemented; `--keep-sources` default **true**                                         |
| Git tag + phased commits                                       | Tag `backup/pre-image-opt-*` before merge; one commit per slug/phase for easy revert   |
| SVG svgo (`pnpm optimize:svg`)                                 | Implemented for DIBP `adventure-map.svg`                                               |
| iframe `loading="lazy"`                                        | Implemented on `PlaygroundFrame.svelte`                                                |
| DIBP checksum sync                                             | Implemented via `scripts/dibp-pyodide-checksums.json` + `sync-dibp-pyodide-lib.mjs`    |
| DIBP logic refactors                                           | Shared `dibp-boot.js`, engine `_matches()`, scenes.json drift fixes                    |
| DIBP iframe E2E                                                | Extended `tests/dibp-e2e/` with `frameLocator` scenarios                               |
| GitHub Pages `_headers`                                        | **Not implemented** — platform does not support custom cache headers; documented above |
| Custom Pyodide WASM rebuild                                    | **Deferred** — ~12–13 MB WASM floor; lock file required for boot                       |
| CSS-only spinner replacement                                   | **Deferred** — GIFs converted to WebP instead                                          |

### github-finder-jsx workaround

The inner Create React App build is broken in this environment. After optimizing `spinner.gif` → `spinner.webp`, the committed production bundle under `projects/github-finder-jsx/static/js/main.*.chunk.js` was **patched** to reference `./static/spinner.webp`. Re-run CRA build and drop the patch when the inner toolchain is repaired.

## Pyodide WASM floor

DIBP vendor is ~13–14 MB (WASM + stdlib + lock file). **`pyodide-lock.json` is required** for Pyodide v0.26.4 boot; keep it in the vendor manifest. Custom WASM builds are deferred.
