# Pet project static bundles

This directory holds **legacy static demo artifacts only** (`index.html`, JS, CSS, assets).

## Boundary rules

- **Do not** add wrapper `devDependencies`, ESLint, Prettier, TypeScript, or test configs here.
- **Do not** run `pnpm quality`, `eslint`, `prettier`, or `tsc` against this tree.
- **Do not** rewrite demos as Svelte components — the wrapper loads them via iframe.

## Adding a demo

1. Copy or build static artifacts into `projects/<slug>/` with `index.html` as the entry.
2. Register the slug in `src/lib/data/projects.json`.
3. Run `pnpm sync-projects` from the repo root (copy-only; no transforms).

The SvelteKit shell serves synced files from `static/projects/<slug>/` at `{base}/projects/<slug>/index.html`.

## Archived READMEs

Per-slug `README.md` files are **one-time snapshots** from the original GitHub repos (disconnected; no git submodules). Demo artifacts (`index.html`, JS, CSS, assets) were imported the same way — see [`README-IMPORT-LOG.md`](README-IMPORT-LOG.md). After changing files here, run `pnpm sync-projects` from the repo root.

Fetch results are logged in [`README-FETCH-LOG.md`](README-FETCH-LOG.md). The playground iframe does not display these files; they are documentation inside the monorepo only.
