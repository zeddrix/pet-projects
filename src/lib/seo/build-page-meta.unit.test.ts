import { describe, expect, it } from "vitest";
import { SITE_NAME } from "./site-config";
import {
  buildCanonicalUrl,
  buildDocumentTitle,
  buildOgImageUrl,
  buildPageMeta,
} from "./build-page-meta";

const SITE_URL = "https://zeddrix.github.io/pet-projects";

describe("buildDocumentTitle", () => {
  it("formats home title with author and site name", () => {
    expect(buildDocumentTitle("ignored", true)).toBe(
      "Zeddrix Fabian | Pet Projects Playground",
    );
  });

  it("suffixes project titles with author name", () => {
    expect(buildDocumentTitle("Loan Calculator")).toBe(
      "Loan Calculator — Zeddrix Fabian",
    );
  });
});

describe("buildCanonicalUrl", () => {
  it("builds home canonical without trailing slash", () => {
    expect(buildCanonicalUrl(SITE_URL, "/")).toBe(SITE_URL);
  });

  it("builds project canonical under site root", () => {
    expect(buildCanonicalUrl(SITE_URL, "/project/loan-calculator")).toBe(
      `${SITE_URL}/project/loan-calculator`,
    );
  });
});

describe("buildOgImageUrl", () => {
  it("returns absolute Open Graph image URL", () => {
    expect(buildOgImageUrl(SITE_URL)).toBe(`${SITE_URL}/og-image.png`);
  });
});

describe("buildPageMeta", () => {
  it("returns home metadata with site description fallback", () => {
    const meta = buildPageMeta({
      title: SITE_NAME,
      path: "/",
      siteUrl: SITE_URL,
      isHome: true,
    });

    expect(meta.title).toBe("Zeddrix Fabian | Pet Projects Playground");
    expect(meta.canonical).toBe(SITE_URL);
    expect(meta.ogImage).toBe(`${SITE_URL}/og-image.png`);
    expect(meta.author).toBe("Zeddrix Fabian");
  });

  it("uses project description when provided", () => {
    const meta = buildPageMeta({
      title: "Loan Calculator",
      description: "Calculate loan payments and amortization schedules.",
      path: "/project/loan-calculator",
      siteUrl: SITE_URL,
    });

    expect(meta.title).toBe("Loan Calculator — Zeddrix Fabian");
    expect(meta.description).toBe(
      "Calculate loan payments and amortization schedules.",
    );
    expect(meta.canonical).toBe(`${SITE_URL}/project/loan-calculator`);
  });
});
