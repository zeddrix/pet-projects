# pet-projects

A personal archive and live playground for fourteen web demos — eleven small static frontends from 2020 plus three archived full-stack projects (blog-app, microposts, devcamper-api). A SvelteKit **wrapper** catalogs them in a sidebar; static demos preview in iframes and devcamper-api shows its README in the main pane.

**Live playground:** https://zeddrix.github.io/pet-projects/

### Tech stack

**Playground wrapper**

![SvelteKit](https://img.shields.io/badge/SvelteKit-FF3E00?logo=svelte&logoColor=white)
![Svelte](https://img.shields.io/badge/Svelte_5-FF3E00?logo=svelte&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?logo=vitest&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-2EAD33?logo=playwright&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?logo=prettier&logoColor=black)
![pnpm](https://img.shields.io/badge/pnpm-F69220?logo=pnpm&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?logo=githubactions&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-222222?logo=githubpages&logoColor=white)

**Pet demos (shared across projects)**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React_17-61DAFB?logo=react&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap_4-7952B3?logo=bootstrap&logoColor=white)
![Materialize CSS](https://img.shields.io/badge/Materialize_CSS-EE6E73?logo=materialdesign&logoColor=white)
![Fetch API](https://img.shields.io/badge/Fetch_API-Browser-4CAF50)
![localStorage](https://img.shields.io/badge/localStorage-Browser_API-4CAF50)
![GitHub API](https://img.shields.io/badge/GitHub_REST_API-181717?logo=github&logoColor=white)
![OpenWeatherMap](https://img.shields.io/badge/OpenWeatherMap_API-FF6B35)
![Animate.css](https://img.shields.io/badge/Animate.css-3.7.2-8A2BE2)

### Projects in this archive

| Project                                              | Developed     | Stack highlight                            | Preview                                                                    |
| ---------------------------------------------------- | ------------- | ------------------------------------------ | -------------------------------------------------------------------------- |
| [GitHub Finder (JSX)](projects/github-finder-jsx/)   | November 2020 | React, CRA, Context API, Axios             | [Open](https://zeddrix.github.io/pet-projects/project/github-finder-jsx)   |
| [Loan Calculator](projects/loan-calculator/)         | November 2020 | Vanilla JS, Bootstrap                      | [Open](https://zeddrix.github.io/pet-projects/project/loan-calculator)     |
| [Weather Widget](projects/weather-widget/)           | November 2020 | ES6 classes, Fetch, OpenWeatherMap         | [Open](https://zeddrix.github.io/pet-projects/project/weather-widget)      |
| [Tracalorie](projects/tracalorie/)                   | November 2020 | Vanilla JS, Materialize, localStorage      | [Open](https://zeddrix.github.io/pet-projects/project/tracalorie)          |
| [Word Counter](projects/word-counter/)               | June 2020     | Vanilla JS, BEM CSS                        | [Open](https://zeddrix.github.io/pet-projects/project/word-counter)        |
| [Task List](projects/tasklist/)                      | November 2020 | Vanilla JS, Materialize, localStorage      | [Open](https://zeddrix.github.io/pet-projects/project/tasklist)            |
| [GitHub Finder](projects/github-finder/)             | November 2020 | Vanilla JS, Fetch, GitHub API (deprecated) | [Open](https://zeddrix.github.io/pet-projects/project/github-finder)       |
| [Book List](projects/booklist/)                      | November 2020 | ES6 classes, Skeleton CSS                  | [Open](https://zeddrix.github.io/pet-projects/project/booklist)            |
| [JW Guitar Templates](projects/jw-guitar-templates/) | March 2020    | Vanilla JS, custom fonts                   | [Open](https://zeddrix.github.io/pet-projects/project/jw-guitar-templates) |
| [Animate](projects/animate/)                         | January 2020  | Animate.css, Bootstrap                     | [Open](https://zeddrix.github.io/pet-projects/project/animate)             |
| [Robot Friend](projects/robot-friend/)               | February 2020 | HTML + CSS only                            | [Open](https://zeddrix.github.io/pet-projects/project/robot-friend)        |
| [Blog App](projects/blog-app/)                       | February 2024 | Django archive + SvelteKit static preview  | [Open](https://zeddrix.github.io/pet-projects/project/blog-app)            |
| [Microposts](projects/microposts/)                   | November 2020 | Webpack + mock API static CRUD             | [Open](https://zeddrix.github.io/pet-projects/project/microposts)          |
| [DevCamper API](projects/devcamper-api/)             | 2019–2020     | Express + MongoDB (README preview)         | [Open](https://zeddrix.github.io/pet-projects/project/devcamper-api)       |

Each project folder includes a portfolio-style README with purpose, tech badges, and the month/year of its first commit.

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
