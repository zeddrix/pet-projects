# Archive import log

Generated: 2026-06-05

Merged full git history from standalone repos into folders under `projects/`.

| Upstream repo | Branch | Target path | Merge date |
|---------------|--------|-------------|------------|
| zeddrix/blog-app_django | main | projects/blog-app/django-original/ | 2026-06-05 |
| zeddrix/microposts | main | projects/microposts/original/ | 2026-06-05 |
| zeddrix/devcamper-api | main | projects/devcamper-api/ | 2026-06-05 |
| zeddrix/bible-query | master | projects/bible-query/ | 2026-06-06 |

## Verification commands

```bash
git log --oneline -- projects/blog-app/django-original | tail -5
git log --oneline -- projects/microposts/original | tail -5
git log --oneline -- projects/devcamper-api | tail -5
git log --oneline -- projects/bible-query | tail -5
```

## Static previews

| Slug | Preview source | Build script |
|------|----------------|--------------|
| blog-app | projects/blog-app/sveltekit-static/build | scripts/build-blog-app-static.mjs |
| microposts | projects/microposts/updated-static/dist | scripts/build-microposts-static.mjs |
| devcamper-api | README only (displayMode: readme) | n/a |
| bible-query | projects/bible-query/ (flat static) | n/a |

## Safe deletion checklist (standalone repos)

Before deleting `zeddrix/blog-app_django`, `zeddrix/microposts`, `zeddrix/devcamper-api`, and `zeddrix/bible-query`:

1. All four `git log` checks above show original commits
2. Playground live deploy shows blog-app, microposts, devcamper-api, and bible-query entries
3. Disable GH Pages on standalone devcamper-api and bible-query repos
