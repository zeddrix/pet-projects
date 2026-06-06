# Project artifact import log

Generated: 2026-06-05T04:53:15.181Z

| Slug | Source | Branch | Mode |
|------|--------|--------|------|
| loan-calculator | zeddrix/loan-calculator | main | static |
| weather-widget | zeddrix/weather-widget | main | static |
| tracalorie | zeddrix/tracalorie | main | static |
| word-counter | zeddrix/word-counter | master | static |
| tasklist | zeddrix/tasklist | main | static |
| github-finder | zeddrix/github-finder | main | static |
| booklist | zeddrix/booklist | main | static |
| jw-guitar-templates | zeddrix/jw-guitar-templates | master | static |
| animate | zeddrix/animate | master | static |
| robot-friend | zeddrix/robot-friend | master | static |
| bible-query | zeddrix/bible-query | master | static |
| diamond-in-black-pearl | zeddrix/diamond-in-black-pearl | master | static (Pyodide terminal + visual) |
| github-finder-jsx | zeddrix/github-finder-jsx | main | docker-build (HashRouter) |

## bible-query history verification

```bash
git log --oneline -- projects/bible-query | tail -5
git rev-list --count HEAD -- projects/bible-query
```

## github-finder-jsx rebuild

CRA build uses `HashRouter` instead of `BrowserRouter` so routes work when the demo is hosted under `/projects/github-finder-jsx/` inside the playground iframe. Rebuild with Docker Node 16 and `PUBLIC_URL=.` if needed.

