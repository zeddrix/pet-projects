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
3. Register the slug in `src/lib/data/projects.json` with **project info modal metadata** (not just sidebar title/description):
   - **Always:** `developedAt`, `techStack` or `versions[]`, `sourceUrl`, `sortOrder`
   - **Archived standalone import** (merged git history): add `dualVersionReason` noting the former repo and how the playground previews it (see `bible-query`, `devcamper-api`)
   - **Composite original + preview:** add `versions[]` + `dualVersionReason` (see `blog-app`, `microposts`)
   - **Readme-only backend:** add `displayMode: "readme"` + `dualVersionReason`
4. Update wrapper tests for the new slug:
   - `src/lib/data/projects.unit.test.ts` (count + metadata assertions)
   - `tests/e2e/playground-project-info.e2e.test.ts` (info FAB modal content)
5. Run `pnpm sync-projects` from the repo root (copy-only; no transforms).

The playground **info modal does not read this README** — it renders fields from `projects.json` only. See [CLAUDE.md](../CLAUDE.md) **Adding a catalog entry** for the full rule.

Composite archives may include `original/` or `django-original/` subfolders with merged git history; only the preview subpath is synced to `static/projects/<slug>/`.

The SvelteKit shell serves synced files from `static/projects/<slug>/` at `{base}/projects/<slug>/`. Projects with `displayMode: "readme"` render markdown in the main pane instead of an iframe.

## Import history

Demo artifacts were imported from standalone repos; fetch and import logs live in [`README-FETCH-LOG.md`](README-FETCH-LOG.md) and [`README-IMPORT-LOG.md`](README-IMPORT-LOG.md). The playground iframe does not display README files; they are documentation inside the monorepo only.
