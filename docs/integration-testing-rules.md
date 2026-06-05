# Integration Testing Rules

**Testing Framework:** Vitest with jsdom  
**Scope:** Wrapper cross-module contracts only. Never touch `projects/**`.

## Core Principle

> **Integration tests verify that multiple wrapper modules work together correctly** — manifest, route entry contracts, and frame URL builders.

## The Rules

### 1. Test realistic shell workflows

- Manifest slug list matches sorted projects
- Known slug resolves; unknown slug returns undefined
- Frame src builder aligns with manifest slugs

### 2. Use real implementations of internal dependencies

- Import real `projects.ts` helpers
- Do not mock the manifest unless testing error injection

### 3. Test state synchronization where modules meet

- Sidebar store hydration vs default desktop/mobile behavior (unit tests for store; integration for manifest + route contract)

### 4. Test service integration patterns

- Route `entries()` slugs must match `getProjectSlugs()`
- `getProjectBySlug` contract for every manifest entry

### 5. Shell-specific integrations

- Base path helpers produce paths compatible with GitHub Project Pages layout
- No backend, database, or Chrome extension integrations in this repo

### 6. Test error boundaries

- Unknown slug returns undefined without throwing
- Default project always non-deprecated when manifest is valid

### 7. Classification

- Mocking only `sessionStorage` → still a unit test
- Cross-module manifest + route contract → `*.integration.test.ts`

## When to Write Integration Tests

### Write integration tests for

- Manifest-to-route slug contract
- Default project selection policy across modules
- Frame src + app path consistency for sample slugs

### Do not write integration tests for

- Pet demo behavior inside iframes
- Simple one-line pure helpers (use unit tests)
- Anything under `projects/**`

## File structure

```
src/lib/data/project-route.integration.test.ts
```

## Naming

- Integration tests: `*.integration.test.ts`
- Co-locate beside the primary module under test

## Summary

Integration tests complement unit and E2E tests for the **wrapper only**. They verify contracts between manifest data and routing/frame helpers without loading legacy pet code.
