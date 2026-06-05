# Rules for Effective Unit Testing

**Scope:** Wrapper only — `src/lib/**` pure helpers, stores, and manifest logic. Never import from `projects/**`.

## Core Testing Philosophy

**Test behavior, not implementation.** Write tests that verify what your code does, not how it does it. Tests should remain valid even when internal implementation changes.

## Testing Rules

### 1. Test behavior, not implementation details

- Focus on observable inputs and outputs of the system under test (SUT)
- Do not test private methods directly; test them through public interfaces
- Tests should remain valid even if internal implementation changes

### 2. Write tests first (Test-Driven Development)

- For new wrapper features, write the failing test before implementation
- Follow Red-Green-Refactor: failing test → minimal implementation → improve code

### 3. Minimize mocking to essential dependencies

- Only mock browser APIs you do not control (`sessionStorage`, `matchMedia`)
- Use real manifest data and pure helpers when possible

### 4. Do not mock what you do not own

- Do not import or mock code from `projects/**`
- Pet demos are iframe-hosted static bundles outside the wrapper test surface

### 5. Create test doubles that accurately reflect real behavior

- Stubs/mocks should follow the same contract as real implementations
- Test happy paths and edge cases (unknown slug, invalid storage values)

### 6. Use test fixtures intelligently

- Use jsdom for store tests
- Use pure functions (`buildAppPath`, `buildPlaygroundFrameSrc`) without `$app/paths` mocks when possible

### 7. Test at the appropriate level

- Unit tests: single module in isolation
- Integration tests: cross-module contracts (see `integration-testing-rules.md`)

### 8. Make tests deterministic and independent

- Tests must not depend on each other
- Clear `sessionStorage` in `beforeEach` for store tests

### 9. Write tests before fixing bugs

- Reproduce the bug with a test, fix, verify green

### 10. Test for failure conditions

- Unknown slug, invalid sessionStorage values, empty manifest edge cases

### 11. Keep tests simple and readable

- AAA pattern: Arrange, Act, Assert
- Descriptive test names

### 12. Tests should be maintainable

- Clarity over DRY in test code
- Avoid brittle assertions on Tailwind classes

### 13. Measure test quality, not just coverage

- Failing tests should clearly indicate what broke

### 14. Test state changes, not just function calls

- Verify resolved sidebar visibility, sorted manifest output, built paths

### 15. Make tests obvious and transparent

- A reader should understand what behavior is guaranteed

### 16. Document test scenarios clearly

- Tests document expected shell helper behavior

### 17. File naming classification

- Unit tests: `*.unit.test.ts` under `src/lib/**`
- Never place tests under `projects/**`

## File conventions

```
src/lib/
  data/projects.unit.test.ts
  data/project-route.integration.test.ts
  utils/build-app-path.unit.test.ts
  stores/sidebar-visible.unit.test.ts
```
