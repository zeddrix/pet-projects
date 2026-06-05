# E2E Testing Rules

**Scope:** SvelteKit playground shell only (`tests/e2e/**`). Pet demos inside iframes are **out of scope**.

This project follows ATDD — E2E acceptance tests define expected shell behavior before production changes.

## Core Philosophy

**Test REAL user journeys, not element existence.** Every E2E test must simulate what a user does — clicking, navigating, toggling — and verify meaningful outcomes. If a test only checks visibility without user action, it belongs in a unit test or should not exist.

## Mandatory Rules

### 1. Every test must have multiple user actions AND verify an outcome

At least 2 user actions (click, navigate, toggle) and a meaningful outcome (URL change, iframe `src` update, sidebar state, in-shell 404).

### 2. Shell-only assertions

- Assert sidebar, routing, titles, toggle `aria-expanded`, iframe `src`
- **Never** assert DOM inside the iframe (pet app internals)
- **Never** import or execute code from `projects/**`

### 3. Sidebar persistence via UI

- Assert sidebar visibility after reload, not `sessionStorage` values directly
- Unit tests cover storage helpers

### 4. Complete shell state verification

When checking navigation, verify URL, `playground-title`, iframe `src`, and active list item where relevant.

### 5. Consolidated test files by feature domain

| File                                    | Domain                  |
| --------------------------------------- | ----------------------- |
| `playground-default-load.e2e.test.ts`   | Initial load / redirect |
| `playground-sidebar-toggle.e2e.test.ts` | Toggle + persistence    |
| `playground-navigation.e2e.test.ts`     | Catalog navigation      |
| `playground-unknown-slug.e2e.test.ts`   | In-shell 404            |
| `playground-mobile-drawer.e2e.test.ts`  | Mobile overlay          |
| `playground-base-path.e2e.test.ts`      | GitHub Pages base path  |
| `playground-deep-link.e2e.test.ts`      | Direct project URL      |

Do not create one file per trivial scenario.

### 6. No duplicate coverage across files

Each behavior has one canonical home (see `e2e-canonical-ownership.md`).

### 7. State isolation with beforeEach

Clear `sessionStorage` in toggle persistence specs. Each scenario independent.

### 8. Use data-testid selectors

```typescript
page.getByTestId("sidebar-toggle");
page.locator('[data-testid="project-list-item"][data-slug="loan-calculator"]');
```

Do not select by Tailwind classes.

### 9. Deterministic waits

- Use `expect(locator).toBeVisible()`, `toHaveURL`, `toHaveAttribute`
- **Banned:** `page.waitForTimeout()`

## Banned Patterns

- Page title-only checks with no user action
- Button visible with no click
- Asserting pet iframe document content
- `page.evaluate(() => sessionStorage.getItem(...))` in E2E
- CSS class selectors for shell layout

## Required Patterns

### Multi-step journey

```typescript
await page
  .locator('[data-testid="project-list-item"][data-slug="loan-calculator"]')
  .click();
await expect(page).toHaveURL(/\/project\/loan-calculator$/);
await expect(page.getByTestId("playground-frame")).toHaveAttribute(
  "src",
  /loan-calculator/,
);
```

### Toggle cycle

```typescript
await page.getByTestId("sidebar-toggle").click();
await expect(page.getByTestId("sidebar")).toBeHidden();
await page.getByTestId("sidebar-toggle").click();
await expect(page.getByTestId("sidebar")).toBeVisible();
```

## Test organization

- E2E tests: `*.e2e.test.ts`
- `testDir`: `tests/e2e` only — never under `projects/`
- Playwright `workers: 1` for stability
- `BASE_PATH=/pet-projects` in webServer env for parity

## Pre-commit checklist

- ≥2 user actions per `test()` block?
- Meaningful outcome asserted?
- Could this be a unit test instead?
- Duplicate navigation to same URL elsewhere?
- Only shell `data-testid` selectors used?
