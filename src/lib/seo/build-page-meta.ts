import {
  AUTHOR_NAME,
  OG_IMAGE_PATH,
  SITE_DESCRIPTION,
  SITE_NAME,
} from "./site-config";

export interface PageMetaInput {
  title: string;
  description?: string;
  /** Route path relative to the deployed site root (e.g. `/`, `/project/slug`). */
  path: string;
  siteUrl: string;
  isHome?: boolean;
}

export interface PageMeta {
  title: string;
  description: string;
  canonical: string;
  author: string;
  ogTitle: string;
  ogDescription: string;
  ogUrl: string;
  ogType: string;
  ogSiteName: string;
  ogImage: string;
  twitterCard: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
}

export function buildDocumentTitle(title: string, isHome = false): string {
  if (isHome) {
    return `${AUTHOR_NAME} | ${SITE_NAME}`;
  }
  return `${title} — ${AUTHOR_NAME}`;
}

export function buildCanonicalUrl(siteUrl: string, path: string): string {
  const origin = siteUrl.replace(/\/$/, "");
  if (path === "/" || path === "") {
    return origin;
  }
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${origin}${normalizedPath}`;
}

export function buildOgImageUrl(siteUrl: string): string {
  return buildCanonicalUrl(siteUrl, OG_IMAGE_PATH);
}

export function buildPageMeta(input: PageMetaInput): PageMeta {
  const description = input.description?.trim() || SITE_DESCRIPTION;
  const title = buildDocumentTitle(input.title, input.isHome);
  const canonical = buildCanonicalUrl(input.siteUrl, input.path);
  const ogImage = buildOgImageUrl(input.siteUrl);

  return {
    title,
    description,
    canonical,
    author: AUTHOR_NAME,
    ogTitle: title,
    ogDescription: description,
    ogUrl: canonical,
    ogType: input.isHome ? "website" : "article",
    ogSiteName: SITE_NAME,
    ogImage,
    twitterCard: "summary_large_image",
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: ogImage,
  };
}
