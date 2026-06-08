import { getProjectSlugs } from "$lib/data/projects";
import { buildCanonicalUrl } from "$lib/seo/build-page-meta";
import { resolvePublicSiteUrl } from "$lib/seo/resolve-public-site-url";
import { PUBLIC_SITE_URL } from "$env/static/public";
import type { RequestHandler } from "./$types";

export const prerender = true;

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function urlEntry(siteUrl: string, path: string, priority: string): string {
  const loc = escapeXml(buildCanonicalUrl(siteUrl, path));
  const lastmod = new Date().toISOString().slice(0, 10);
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>${priority}</priority>
  </url>`;
}

export const GET: RequestHandler = () => {
  const siteUrl = resolvePublicSiteUrl(
    PUBLIC_SITE_URL,
    "https://zeddrix.github.io/pet-projects",
  );

  const urls = [
    urlEntry(siteUrl, "/", "1.0"),
    ...getProjectSlugs().map((slug) =>
      urlEntry(siteUrl, `/project/${slug}`, "0.8"),
    ),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "max-age=0, s-maxage=3600",
    },
  });
};
