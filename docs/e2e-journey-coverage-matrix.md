# E2E Journey Coverage Matrix

**Scope:** Playground shell wrapper only.

## Shell Lifecycle Coverage

| ID    | Scenario                        | Canonical file                                    | Status  |
| ----- | ------------------------------- | ------------------------------------------------- | ------- |
| PG-01 | shell-loads-default-project     | `tests/e2e/playground-default-load.e2e.test.ts`   | covered |
| PG-02 | sidebar-toggle-hides-and-shows  | `tests/e2e/playground-sidebar-toggle.e2e.test.ts` | covered |
| PG-03 | sidebar-toggle-persists-session | `tests/e2e/playground-sidebar-toggle.e2e.test.ts` | covered |
| PG-04 | navigate-between-projects       | `tests/e2e/playground-navigation.e2e.test.ts`     | covered |
| PG-05 | unknown-slug-404                | `tests/e2e/playground-unknown-slug.e2e.test.ts`   | covered |
| PG-06 | mobile-drawer                   | `tests/e2e/playground-mobile-drawer.e2e.test.ts`  | covered |
| PG-07 | base-path-iframe-src            | `tests/e2e/playground-base-path.e2e.test.ts`      | covered |
| PG-08 | deep-link-prerendered-slug      | `tests/e2e/playground-deep-link.e2e.test.ts`      | covered |

## Out of scope

- Pet demo interactions inside iframe
- Legacy JS/CSS behavior under `projects/**`

## Verification commands

```bash
pnpm sync-projects
pnpm test:e2e
pnpm test:unit
pnpm quality
BASE_PATH=/pet-projects pnpm build:pages
```

## Open gaps

- None required for shell MVP. Per-slug iframe smoke on live GitHub Pages is a manual post-deploy checklist (see README).
