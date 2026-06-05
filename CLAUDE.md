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
