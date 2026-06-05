# Blog App

![Django](https://img.shields.io/badge/Django-4.0-092E20?logo=django&logoColor=white)
![Python](https://img.shields.io/badge/Python-3-3776AB?logo=python&logoColor=white)
![SvelteKit](https://img.shields.io/badge/SvelteKit_Static-FF3E00?logo=svelte&logoColor=white)

**Developed:** February 2024 (Django original)

Archive of the former standalone repo [zeddrix/blog-app_django](https://github.com/zeddrix/blog-app_django), now preserved inside this monorepo.

## Folder layout

| Path | Purpose |
|------|---------|
| [`django-original/`](django-original/) | Untouched Django project with full git history |
| [`sveltekit-static/`](sveltekit-static/) | Static SvelteKit preview built for GitHub Pages |

## Run the original Django app locally

```bash
cd projects/blog-app/django-original
python3 -m venv .venv
source .venv/bin/activate
pip install django~=4.0.0
python3 manage.py migrate
python3 manage.py runserver
```

## Static preview (playground iframe)

The playground loads the built output from `sveltekit-static/build/`. Rebuild with:

```bash
node scripts/build-blog-app-static.mjs
pnpm sync-projects
```

**Live preview:** [Open in playground](https://zeddrix.github.io/pet-projects/project/blog-app)

## What changed in the monorepo

- Original Django code lives under `django-original/` with preserved commit history.
- A separate SvelteKit static app mimics the Bootstrap-style blog layout with sample posts for static hosting.
- The standalone `blog-app_django` repo can be deleted after verifying history here.
