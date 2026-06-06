# pet-projects — agent guidelines

## Scope

This repo is a **SvelteKit wrapper** around legacy static pet demos. All tooling applies to the wrapper only.

- **Wrapper:** `src/`, `tests/`, root configs
- **Pet demos:** `projects/<slug>/` — static artifacts only; never lint, format, type-check, or test

## Quality rules

- No `any` type; no `eslint-disable` comments
- ATDD order: E2E acceptance specs first → production → green validation → unit/integration backfill
- Run `pnpm sync-projects` before dev, build, or E2E

## Testing docs

Follow these (shell/wrapper scope only):

- [docs/unit-testing-rules.md](docs/unit-testing-rules.md)
- [docs/integration-testing-rules.md](docs/integration-testing-rules.md)
- [docs/e2e-testing-rules.md](docs/e2e-testing-rules.md)
- [docs/e2e-journey-coverage-matrix.md](docs/e2e-journey-coverage-matrix.md)
- [docs/e2e-canonical-ownership.md](docs/e2e-canonical-ownership.md)

## Commands

```bash
pnpm sync-projects && pnpm quality && pnpm test:unit && pnpm test:e2e
BASE_PATH=/pet-projects pnpm build:pages
```

## Isolation

- `projects/**` and `static/projects/**` are excluded from eslint, prettier, tsc, vitest, and playwright scan paths
- `scripts/sync-projects.mjs` is copy-only — no parsing or transformation of pet code

## Adding a catalog entry (required for every new slug)

Registering a slug in [`src/lib/data/projects.json`](src/lib/data/projects.json) is not enough for the sidebar alone — you **must** curate metadata for the playground **project info modal** (`ProjectInfoFab` → `ProjectInfoModal` → [`ProjectInfoContent.svelte`](src/lib/components/ProjectInfoContent.svelte)). The modal reads **only** from `projects.json`; it never loads `projects/<slug>/README.md`.

### Manifest fields (always)

Every new entry needs:

- `developedAt` — month/year from the project's first commit in this monorepo
- `techStack` **or** `versions[]` — at least one; used for modal badges / version sections
- `sourceUrl` — `https://github.com/zeddrix/pet-projects/tree/main/projects/<slug>`

### Modal metadata by project type

| Type                                          | Extra `projects.json` fields                                  | Example slug                   |
| --------------------------------------------- | ------------------------------------------------------------- | ------------------------------ |
| Simple static iframe demo                     | `techStack` only                                              | `loan-calculator`              |
| Archived standalone repo (merged git history) | `techStack` + `dualVersionReason` (archive / playground note) | `bible-query`, `devcamper-api` |
| Composite original + static preview           | `versions[]` + `dualVersionReason`                            | `blog-app`, `microposts`       |
| Source + production build in same tree        | `versions[]` + `dualVersionReason`                            | `github-finder-jsx`            |
| Backend-only / non-iframe                     | `displayMode: "readme"` + `techStack` + `dualVersionReason`   | `devcamper-api`                |

Use `dualVersionReason` for any extra paragraph the modal should show under **Why two versions** (even when there is only one playable version — see `devcamper-api` and `bible-query`).

### Wrapper tests (always update with the new slug)

1. [`src/lib/data/projects.unit.test.ts`](src/lib/data/projects.unit.test.ts) — bump project count; add slug-specific metadata assertions (follow `loan-calculator` / `bible-query` examples).
2. [`tests/e2e/playground-project-info.e2e.test.ts`](tests/e2e/playground-project-info.e2e.test.ts) — add a scenario: select slug → open info FAB → assert `developedAt`, tech stack (or version labels), and any `dualVersionReason` text + monorepo link.
3. Optionally [`tests/e2e/playground-deep-link.e2e.test.ts`](tests/e2e/playground-deep-link.e2e.test.ts) — direct `/project/<slug>` iframe smoke (canonical owner for deep links).

See also [projects/README.md](projects/README.md) and root [README.md](README.md) **Adding a demo** checklists.
