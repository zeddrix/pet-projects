import {
  AUTHOR_NAME,
  GITHUB_PROFILE,
  PERSON_SAME_AS,
  PORTFOLIO_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
} from "./site-config";
import { buildCanonicalUrl } from "./build-page-meta";

export interface JsonLdContext {
  siteUrl: string;
}

function personId(siteUrl: string): string {
  return `${buildCanonicalUrl(siteUrl, "/")}#person`;
}

export function buildPersonJsonLd(
  context: JsonLdContext,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId(context.siteUrl),
    name: AUTHOR_NAME,
    url: buildCanonicalUrl(context.siteUrl, "/"),
    sameAs: [...PERSON_SAME_AS],
  };
}

export function buildWebSiteJsonLd(
  context: JsonLdContext,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: buildCanonicalUrl(context.siteUrl, "/"),
    author: {
      "@id": personId(context.siteUrl),
    },
    publisher: {
      "@type": "Person",
      name: AUTHOR_NAME,
      url: GITHUB_PROFILE,
    },
  };
}

export interface ProjectJsonLdInput extends JsonLdContext {
  slug: string;
  title: string;
  description: string;
  sourceUrl: string;
}

export function buildProjectJsonLd(
  input: ProjectJsonLdInput,
): Record<string, unknown> {
  const pageUrl = buildCanonicalUrl(input.siteUrl, `/project/${input.slug}`);

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: input.title,
    description: input.description,
    url: pageUrl,
    applicationCategory: "WebApplication",
    author: {
      "@type": "Person",
      name: AUTHOR_NAME,
      url: GITHUB_PROFILE,
    },
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: buildCanonicalUrl(input.siteUrl, "/"),
    },
    codeRepository: input.sourceUrl,
    maintainer: {
      "@type": "Person",
      name: AUTHOR_NAME,
      url: PORTFOLIO_URL,
    },
  };
}

export function buildHomeJsonLd(
  context: JsonLdContext,
): Record<string, unknown>[] {
  return [buildPersonJsonLd(context), buildWebSiteJsonLd(context)];
}

export function buildProjectPageJsonLd(
  input: ProjectJsonLdInput,
): Record<string, unknown>[] {
  return [
    buildPersonJsonLd(input),
    buildWebSiteJsonLd(input),
    buildProjectJsonLd(input),
  ];
}

export function serializeJsonLd(data: Record<string, unknown>[]): string {
  return JSON.stringify(data.length === 1 ? data[0] : data);
}
