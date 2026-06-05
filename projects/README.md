# Pet project static bundles

This directory holds **legacy static demo artifacts** (`index.html`, JS, CSS, assets) and **portfolio READMEs** for each demo.

## Boundary rules

- **Do not** add wrapper `devDependencies`, ESLint, Prettier, TypeScript, or test configs here.
- **Do not** run `pnpm quality`, `eslint`, `prettier`, or `tsc` against this tree.
- **Do not** rewrite demos as Svelte components — the wrapper loads them via iframe.

## Per-project documentation

Each `projects/<slug>/README.md` includes:

- A short plain-English description of what the demo does
- Tech stack badges (shields.io)
- **Developed** date from the project's first git commit in this monorepo
- Link to the live playground preview
- Screenshots or legacy notes where applicable

## Adding a demo

1. Copy or build static artifacts into `projects/<slug>/` with `index.html` as the entry, **or** use a composite folder with `preview.json` pointing at a build subpath (see `blog-app/` and `microposts/`).
2. Add a portfolio README at `projects/<slug>/README.md`.
3. Register the slug in `src/lib/data/projects.json`.
4. Run `pnpm sync-projects` from the repo root (copy-only; no transforms).

Composite archives may include `original/` or `django-original/` subfolders with merged git history; only the preview subpath is synced to `static/projects/<slug>/`.

The SvelteKit shell serves synced files from `static/projects/<slug>/` at `{base}/projects/<slug>/`. Projects with `displayMode: "readme"` render markdown in the main pane instead of an iframe.

## Import history

Demo artifacts were imported from standalone repos; fetch and import logs live in [`README-FETCH-LOG.md`](README-FETCH-LOG.md) and [`README-IMPORT-LOG.md`](README-IMPORT-LOG.md). The playground iframe does not display README files; they are documentation inside the monorepo only.
