# E2E Canonical Ownership

**Scope:** Playground shell wrapper only. Pet iframe internals are never tested here.

## Golden-path ownership

| Behavior                          | Canonical file                          |
| --------------------------------- | --------------------------------------- |
| `/` redirect to default project   | `playground-default-load.e2e.test.ts`   |
| Sidebar toggle hide/show          | `playground-sidebar-toggle.e2e.test.ts` |
| Sidebar persistence after reload  | `playground-sidebar-toggle.e2e.test.ts` |
| Navigate between catalog entries  | `playground-navigation.e2e.test.ts`     |
| blog-app / microposts iframe src  | `playground-navigation.e2e.test.ts`     |
| devcamper-api README pane         | `playground-navigation.e2e.test.ts`     |
| Deprecated badge on github-finder | `playground-navigation.e2e.test.ts`     |
| Active list item state            | `playground-navigation.e2e.test.ts`     |
| Unknown slug in-shell 404         | `playground-unknown-slug.e2e.test.ts`   |
| Mobile drawer open/select/close   | `playground-mobile-drawer.e2e.test.ts`  |
| Mobile backdrop close             | `playground-mobile-drawer.e2e.test.ts`  |
| BASE_PATH iframe src segment      | `playground-base-path.e2e.test.ts`      |
| Direct deep link to project route | `playground-deep-link.e2e.test.ts`      |

## Ownership rules

- Golden-path shell assertions belong in the files above.
- Do not duplicate the same URL navigation + same outcome in multiple files.
- Edge cases (invalid storage in unit tests, manifest contract in integration tests) stay out of E2E.
- When adding a new shell feature, extend the existing domain file before creating a new spec.

## Explicitly excluded

- `projects/**` — no Playwright specs, no shell assertions on pet DOM
- iframe `contentDocument` queries
- Pet repo README, build scripts, or lint configs
