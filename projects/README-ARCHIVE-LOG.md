# Archive import log

Generated: 2026-06-05

Merged full git history from standalone repos into folders under `projects/`.

| Upstream repo | Branch | Target path | Merge date |
|---------------|--------|-------------|------------|
| zeddrix/blog-app_django | main | projects/blog-app/django-original/ | 2026-06-05 |
| zeddrix/microposts | main | projects/microposts/original/ | 2026-06-05 |
| zeddrix/devcamper-api | main | projects/devcamper-api/ | 2026-06-05 |
| zeddrix/bible-query | master | projects/bible-query/ | 2026-06-06 |
| zeddrix/diamond-in-black-pearl | master | projects/diamond-in-black-pearl/original/ | 2026-06-06 |
| zeddrix/justcolor | master | projects/justcolor/ | 2026-06-23 |

## Verification commands

```bash
git log --oneline -- projects/blog-app/django-original | tail -5
git log --oneline -- projects/microposts/original | tail -5
git log --oneline -- projects/devcamper-api | tail -5
git log --oneline -- projects/bible-query | tail -5
git log --oneline -- projects/diamond-in-black-pearl/original | tail -5
git log --oneline -- projects/justcolor | tail -5
git rev-list --count HEAD -- projects/justcolor
```

## Static previews

| Slug | Preview source | Build script |
|------|----------------|--------------|
| justcolor | projects/justcolor/build | scripts/build-justcolor-static.mjs |
| blog-app | projects/blog-app/sveltekit-static/build | scripts/build-blog-app-static.mjs |
| microposts | projects/microposts/updated-static/dist | scripts/build-microposts-static.mjs |
| devcamper-api | README only (displayMode: readme) | n/a |
| bible-query | projects/bible-query/ (flat static) | n/a |
| diamond-in-black-pearl | projects/diamond-in-black-pearl/ (launcher + terminal + visual) | n/a |

## Safe deletion checklist (standalone repos)

Before deleting `zeddrix/blog-app_django`, `zeddrix/microposts`, `zeddrix/devcamper-api`, `zeddrix/bible-query`, and `zeddrix/justcolor`:

1. All `git log` checks above show original commits
2. Playground live deploy shows blog-app, microposts, devcamper-api, bible-query, and justcolor entries
3. Disable GH Pages on standalone devcamper-api, bible-query, and justcolor repos
4. Archive or delete the standalone GitHub repo after live deploy is verified
5. Optional: add a README redirect on the archived repo pointing to `zeddrix/pet-projects/tree/main/projects/justcolor`
