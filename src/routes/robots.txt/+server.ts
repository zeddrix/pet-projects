import { resolvePublicSiteUrl } from "$lib/seo/resolve-public-site-url";
import { PUBLIC_SITE_URL } from "$env/static/public";
import type { RequestHandler } from "./$types";

export const prerender = true;

export const GET: RequestHandler = () => {
  const siteUrl = resolvePublicSiteUrl(
    PUBLIC_SITE_URL,
    "https://zeddrix.github.io/pet-projects",
  );

  const body = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "max-age=0, s-maxage=3600",
    },
  });
};
