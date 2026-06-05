# pet-projects

A static-first playground hub for pre-2024 pet demos. The SvelteKit **wrapper** provides a sidebar catalog and fullscreen iframe preview. Legacy demos live as static bundles under `projects/<slug>/` and are **not** rewritten as Svelte components.

**Live URL:** `https://zeddrix.github.io/pet-projects/`

## Isolation boundary

| Layer     | Path               | Tooling                                          |
| --------- | ------------------ | ------------------------------------------------ |
| Wrapper   | `src/`, `tests/`   | ESLint, Prettier, TypeScript, Vitest, Playwright |
| Pet demos | `projects/<slug>/` | None from this repo — copy-only sync             |

See [`projects/README.md`](projects/README.md) and [`CLAUDE.md`](CLAUDE.md).

## Local development

```bash
pnpm install
pnpm dev
```

Open `http://localhost:7213/` (or `http://localhost:7213/pet-projects/` when `BASE_PATH=/pet-projects`).

`pnpm dev` runs `sync-projects` first, copying `projects/` → `static/projects/` without transforms.

## Scripts

| Script               | Purpose                                        |
| -------------------- | ---------------------------------------------- |
| `pnpm sync-projects` | Copy pet bundles to `static/projects/`         |
| `pnpm quality`       | format:check + lint + svelte-check             |
| `pnpm test:unit`     | Vitest (wrapper only)                          |
| `pnpm test:e2e`      | Playwright shell acceptance tests              |
| `pnpm build:pages`   | Production build + `404.html` for GitHub Pages |

## GitHub Pages parity build

```bash
BASE_PATH=/pet-projects pnpm build:pages
pnpm preview
```

Open `http://localhost:4173/pet-projects/`.

## Adding a pet demo

1. Place static build artifacts in `projects/<slug>/` with `index.html` as entry.
2. Add an entry to [`src/lib/data/projects.json`](src/lib/data/projects.json).
3. Run `pnpm sync-projects`.
4. Verify in dev: sidebar entry appears and iframe loads.

Do **not** add `package.json`, ESLint, or tests inside `projects/<slug>/`.

## Deploy to GitHub Pages

Automatic on push to `main` via [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml).

### One-time setup

1. Push to GitHub (public repo, branch `main`).
2. **Settings → Pages → Source:** GitHub Actions.
3. **Settings → Actions → Workflow permissions:** read and write.
4. Push to `main` or run **Deploy to GitHub Pages** manually.

CI runs: `sync-projects` → `quality` → `test:unit` → `test:e2e` → `build:pages`.

## Per-slug verification checklist (manual, post-import)

For each slug on the live Pages URL:

- [ ] iframe loads (no blank frame)
- [ ] Primary interaction works
- [ ] No 404s for assets in Network tab
- [ ] If broken: legacy app may use absolute `/` paths — rebuild with relative base or document as known issue

## Isolation probe

Invalid JS in `projects/` must not fail wrapper quality:

```bash
mkdir -p projects/isolation-probe
echo 'const x=' > projects/isolation-probe/bad.js
pnpm quality   # should pass
rm -rf projects/isolation-probe
```

## Testing docs

- [docs/unit-testing-rules.md](docs/unit-testing-rules.md)
- [docs/integration-testing-rules.md](docs/integration-testing-rules.md)
- [docs/e2e-testing-rules.md](docs/e2e-testing-rules.md)
- [docs/e2e-journey-coverage-matrix.md](docs/e2e-journey-coverage-matrix.md)
- [docs/e2e-canonical-ownership.md](docs/e2e-canonical-ownership.md)
