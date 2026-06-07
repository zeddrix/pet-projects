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
pnpm audit:raster
pnpm verify:live-deploy   # after live deploy
```

### Local E2E stability

Playwright reuses an already-running dev server on port 7213/7214 when not in CI. Run file-by-file without port churn:

```bash
pnpm dev --host 127.0.0.1 --port 7213   # terminal 1
PLAYWRIGHT_FORCE_WEBSERVER=0 pnpm exec playwright test tests/e2e/playground-navigation.e2e.test.ts
```

Set `PLAYWRIGHT_FORCE_WEBSERVER=1` to force a fresh server (CI behaviour).

## Rollback

| Failure            | Action                                                                                                                                                 |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Bad asset swap     | `git revert <commit>` or restore tarball from `scripts/image-backups/`                                                                                 |
| Lost originals     | `tar -xzf scripts/image-backups/project-images-*.tar.gz -C projects/`                                                                                  |
| Bad Pyodide vendor | `tar -xzf scripts/image-backups/dibp-pyodide-*.tar.gz -C projects/diamond-in-black-pearl/vendor/pyodide/` or revert sync script + `pnpm sync-projects` |
| Bad Pages deploy   | GitHub **Deployments → Pages → Rollback**                                                                                                              |

## GitHub Pages cache

GitHub Pages does **not** support custom `_headers` or `Cache-Control` for user sites.

**What busts stale images automatically**

- WebP migration changed filenames (`.jpg` → `.webp`), so browsers fetch new assets.
- GitHub Finder JSX CRA rebuilds change hashed chunk names under `static/js/` and `static/media/`.

**If a visitor still sees an old image after deploy**

1. Hard refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows/Linux).
2. Or open the demo in a private/incognito window.
3. Confirm the asset URL in DevTools → Network ends in `.webp`, not `.jpg`.

There is no repo-level cache header workaround on Project Pages; filename changes are the reliable strategy.

## Post-deploy verification

Automated (run after CI deploy finishes):

```bash
pnpm verify:live-deploy
```

Manual spot-check (same five journeys):

1. [jw-guitar-templates](https://zeddrix.github.io/pet-projects/project/jw-guitar-templates) — background image loads
2. [diamond-in-black-pearl visual](https://zeddrix.github.io/pet-projects/project/diamond-in-black-pearl?demo=visual/) — scene art + one choice
3. [blog-app](https://zeddrix.github.io/pet-projects/project/blog-app) — hobby cards on home
4. Default GitHub Finder spinner while searching
5. [loan-calculator](https://zeddrix.github.io/pet-projects/project/loan-calculator) — loading indicator

Raster cleanup audit (no unexpected JPG/GIF left):

```bash
pnpm audit:raster
```

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

### github-finder-jsx CRA rebuild

Rebuild the committed static bundle (Node 16 + CRA 4; root ESLint is ignored via `SKIP_PREFLIGHT_CHECK`):

```bash
pnpm build:github-finder-jsx-static
pnpm sync-projects
```

CI runs this before sync on every Pages deploy. Spinner ships as `static/media/spinner.*.webp` via webpack — no manual chunk patching.

## Sync hygiene

Global segments excluded from **every** slug on sync: `node_modules`, `.git`, `build`, `.svelte-kit`, and `.DS_Store`. Slug-specific excludes live in `scripts/sync-excludes.json` (e.g. DIBP style-reference art).

## Pyodide WASM floor

DIBP vendor is ~13–14 MB (WASM + stdlib + lock file). **`pyodide-lock.json` is required** for Pyodide v0.26.4 boot; keep it in the vendor manifest. Custom WASM builds are deferred.
