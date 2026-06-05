# Microposts

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Webpack](https://img.shields.io/badge/Webpack_4-8DD6F9?logo=webpack&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap_4-7952B3?logo=bootstrap&logoColor=white)

**Developed:** November 2020 (original)

Archive of the former standalone repo [zeddrix/microposts](https://github.com/zeddrix/microposts), now preserved inside this monorepo.

## Folder layout

| Path | Purpose |
|------|---------|
| [`original/`](original/) | Untouched webpack + Babel source with full git history |
| [`updated-static/`](updated-static/) | Static build with in-browser mock API (`localStorage`) |

## Run the original locally (with json-server)

```bash
cd projects/microposts/original
npm install
npm run json:server   # terminal 1 — serves api/db.json on :3000
npm start             # terminal 2 — webpack dev server
```

## Static preview (playground iframe)

The playground loads `updated-static/dist/`. Rebuild with:

```bash
node scripts/build-microposts-static.mjs
pnpm sync-projects
```

CRUD works in the static demo via a mock store backed by `localStorage` — no backend required.

**Live preview:** [Open in playground](https://zeddrix.github.io/pet-projects/project/microposts)

## What changed in the monorepo

- Original Traversy microposts code lives under `original/` with preserved commit history.
- `updated-static/` patches `http.js` to use a mock API so the demo works on GitHub Pages.
- The standalone `microposts` repo can be deleted after verifying history here.
