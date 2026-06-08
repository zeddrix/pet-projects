# E2E Canonical Ownership

**Scope:** Playground shell wrapper only. Pet iframe internals are never tested here.

## Golden-path ownership

| Behavior                                                                | Canonical file                                                             |
| ----------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `/` playground-first shell with SEO content and default demo iframe     | `playground-default-load.e2e.test.ts`                                      |
| Document title, meta description, canonical, sitemap, robots            | `playground-seo.e2e.test.ts`                                               |
| Sidebar toggle hide/show                                                | `playground-sidebar-toggle.e2e.test.ts`                                    |
| Sidebar persistence after reload                                        | `playground-sidebar-toggle.e2e.test.ts`                                    |
| Navigate between catalog entries                                        | `playground-navigation.e2e.test.ts`                                        |
| blog-app / microposts iframe src                                        | `playground-navigation.e2e.test.ts`                                        |
| devcamper-api README pane                                               | `playground-navigation.e2e.test.ts`                                        |
| Deprecated badge removed from github-finder                             | `playground-navigation.e2e.test.ts`                                        |
| Active list item state                                                  | `playground-navigation.e2e.test.ts`                                        |
| Per-project sidebar theme tokens + unified colors + sticky active arrow | `playground-navigation.e2e.test.ts`                                        |
| Unknown slug in-shell 404                                               | `playground-unknown-slug.e2e.test.ts`                                      |
| Mobile drawer open/select/close                                         | `playground-mobile-drawer.e2e.test.ts`                                     |
| Mobile backdrop close                                                   | `playground-mobile-drawer.e2e.test.ts`                                     |
| BASE_PATH iframe src segment                                            | `playground-base-path.e2e.test.ts`                                         |
| Direct deep link to project route                                       | `playground-deep-link.e2e.test.ts`                                         |
| bible-query deep link iframe src                                        | `playground-deep-link.e2e.test.ts`                                         |
| jw-guitar-templates deep link iframe src                                | `playground-deep-link.e2e.test.ts`                                         |
| diamond-in-black-pearl visual deep link                                 | `playground-deep-link.e2e.test.ts`                                         |
| Project info FAB modal                                                  | `playground-project-info.e2e.test.ts`                                      |
| diamond-in-black-pearl navigation + info modal                          | `playground-navigation.e2e.test.ts`, `playground-project-info.e2e.test.ts` |
| Shell modernization smoke                                               | `playground-shell-modernization.e2e.test.ts`                               |
| Sidebar about → wrapper about pane at `/?view=about`                    | `playground-sidebar-about.e2e.test.ts`                                     |

When adding a new catalog slug, extend `playground-project-info.e2e.test.ts` with an info-modal scenario (select slug → open FAB → assert `developedAt`, tech stack or version labels, and `dualVersionReason` when present). See [CLAUDE.md](../CLAUDE.md) **Adding a catalog entry**.

- Golden-path shell assertions belong in the files above.
- Do not duplicate the same URL navigation + same outcome in multiple files.
- Edge cases (invalid storage in unit tests, manifest contract in integration tests) stay out of E2E.
- When adding a new shell feature, extend the existing domain file before creating a new spec.

## Explicitly excluded

- `projects/**` — no Playwright specs, no shell assertions on pet DOM
- iframe `contentDocument` queries
- Pet repo README, build scripts, or lint configs
