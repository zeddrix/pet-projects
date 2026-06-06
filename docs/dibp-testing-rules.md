# Diamond in Black Pearl — Game Testing Rules

**Scope:** `projects/diamond-in-black-pearl/**` game logic and browser demo UI. **Not** the SvelteKit playground shell.

Wrapper E2E (`tests/e2e/**`) remains shell-only per [e2e-testing-rules.md](e2e-testing-rules.md). Do **not** assert iframe pet DOM in wrapper tests.

## Test layers

| Layer            | Command                 | Location                                 | Proves                                        |
| ---------------- | ----------------------- | ---------------------------------------- | --------------------------------------------- |
| Engine paths     | `pnpm test:dibp-engine` | `projects/diamond-in-black-pearl/tests/` | Every branch in `engine.py` via mock `GameIO` |
| Game browser E2E | `pnpm test:dibp-e2e`    | `tests/dibp-e2e/`                        | Pyodide boot, UI journeys, sound toggle       |

## DIBP Playwright rules

- Navigate directly to synced demo URLs under `/pet-projects/projects/diamond-in-black-pearl/`
- Use `data-testid` selectors inside the demo page only
- `expect(locator).toBeVisible()`, `toContainText`, `toHaveAttribute` — no `waitForTimeout`
- Clear `localStorage` via init script in `beforeEach`
- Each journey test: ≥2 user actions + meaningful outcome
- Boot timeout: 120s (Pyodide WASM in Web Worker)

## Canonical ownership

| Behavior                                | File                                                         |
| --------------------------------------- | ------------------------------------------------------------ |
| Boot terminal / visual / iframe pet DOM | `tests/dibp-e2e/boot.e2e.test.ts`                            |
| Playground launcher → visual iframe     | `tests/dibp-e2e/launcher.e2e.test.ts`                        |
| Launcher GitHub link                    | `tests/dibp-e2e/launcher.e2e.test.ts`                        |
| Engine branches                         | `projects/diamond-in-black-pearl/tests/test_engine_paths.py` |
| Visual + terminal journeys              | `tests/dibp-e2e/game-journeys.e2e.test.ts`                   |
