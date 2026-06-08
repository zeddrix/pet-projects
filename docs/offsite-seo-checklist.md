# Off-site SEO checklist for "Zeddrix Fabian"

The playground wrapper ships technical SEO (meta tags, sitemap, structured data, landing page). Ranking for a personal name also requires authority signals **outside** this repository.

Complete every item below after the site is deployed.

## Google Search Console

1. Open [Google Search Console](https://search.google.com/search-console).
2. Add property: `https://zeddrix.github.io/pet-projects/`.
3. Verify ownership (HTML file upload, DNS, or GitHub Pages meta tag).
4. Submit sitemap: `https://zeddrix.github.io/pet-projects/sitemap.xml`.
5. Request indexing for the home URL and a few project URLs.

## GitHub repository settings

At [github.com/zeddrix/pet-projects](https://github.com/zeddrix/pet-projects):

- **Description:** `Live playground and archive of pre-AI web demos by Zeddrix Fabian`
- **Topics:** `zeddrix-fabian`, `portfolio`, `sveltekit`, `github-pages`, `web-demos`
- **Pin** this repository on your GitHub profile.

## GitHub profile README

Add a prominent link on [github.com/zeddrix](https://github.com/zeddrix):

```markdown
[Zeddrix Fabian — Pet Projects Playground](https://zeddrix.github.io/pet-projects/)
```

Use that exact anchor text where possible.

## Portfolio cross-link

On [zeddrix.github.io/portfolio](https://zeddrix.github.io/portfolio/), add a visible link back to the playground with anchor text that includes **Zeddrix Fabian** and **pet-projects**.

## Other profiles

On LinkedIn and any public bios:

- Spell the name consistently: **Zeddrix Fabian**
- Link to `https://zeddrix.github.io/pet-projects/`

## Optional: custom domain

Pointing a domain (for example `projects.zeddrix.com`) at GitHub Pages can strengthen brand signals. Requires:

1. DNS `CNAME` to `zeddrix.github.io`
2. GitHub Pages custom domain setting
3. Update `PUBLIC_SITE_URL` in CI to the new origin
4. Re-submit sitemap in Search Console for the new property

## Verify indexing

After 1–2 weeks, search:

```text
site:zeddrix.github.io/pet-projects "Zeddrix Fabian"
```

You should see the home page and project routes in results.
