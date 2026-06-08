import { describe, expect, it, vi } from "vitest";
import {
  isTextContentType,
  joinSitePath,
  normalizeManifestAssetPath,
  parsePositiveInt,
  sleep,
  withRetries,
} from "./live-verify.mjs";

describe("isTextContentType", () => {
  it("treats application/xml as text for sitemap checks", () => {
    expect(isTextContentType("application/xml; charset=utf-8")).toBe(true);
  });

  it("treats text/plain as text for robots checks", () => {
    expect(isTextContentType("text/plain; charset=utf-8")).toBe(true);
  });
});

describe("normalizeManifestAssetPath", () => {
  it("strips leading ./ from CRA manifest paths", () => {
    expect(normalizeManifestAssetPath("./static/media/spinner.webp")).toBe(
      "static/media/spinner.webp",
    );
  });

  it("strips leading / from absolute manifest paths", () => {
    expect(normalizeManifestAssetPath("/static/media/spinner.webp")).toBe(
      "static/media/spinner.webp",
    );
  });

  it("leaves relative paths without prefix unchanged", () => {
    expect(normalizeManifestAssetPath("static/media/spinner.webp")).toBe(
      "static/media/spinner.webp",
    );
  });
});

describe("joinSitePath", () => {
  it("joins site base and project path without double slashes", () => {
    const siteBase = "https://zeddrix.github.io/pet-projects";
    const manifestPath = normalizeManifestAssetPath(
      "/static/media/spinner.webp",
    );
    expect(
      joinSitePath(siteBase, `/projects/github-finder-jsx/${manifestPath}`),
    ).toBe(
      "https://zeddrix.github.io/pet-projects/projects/github-finder-jsx/static/media/spinner.webp",
    );
  });
});

describe("parsePositiveInt", () => {
  it("returns fallback for empty or invalid values", () => {
    expect(parsePositiveInt(undefined, 5)).toBe(5);
    expect(parsePositiveInt("", 5)).toBe(5);
    expect(parsePositiveInt("0", 5)).toBe(5);
    expect(parsePositiveInt("nope", 5)).toBe(5);
  });

  it("parses positive integers", () => {
    expect(parsePositiveInt("6", 1)).toBe(6);
  });
});

describe("withRetries", () => {
  it("retries until success", async () => {
    vi.useFakeTimers();
    let attempts = 0;

    const promise = withRetries(
      async () => {
        attempts += 1;
        return attempts;
      },
      (value) => value >= 3,
      { retries: 5, delayMs: 1000 },
    );

    await vi.runAllTimersAsync();
    const result = await promise;

    expect(result).toBe(3);
    expect(attempts).toBe(3);
    vi.useRealTimers();
  });

  it("returns last result when retries exhausted", async () => {
    vi.useFakeTimers();

    const promise = withRetries(
      async () => false,
      (value) => value === true,
      { retries: 3, delayMs: 500 },
    );

    await vi.runAllTimersAsync();
    const result = await promise;

    expect(result).toBe(false);
    vi.useRealTimers();
  });
});

describe("sleep", () => {
  it("resolves after delay", async () => {
    vi.useFakeTimers();
    const promise = sleep(250);
    vi.advanceTimersByTime(250);
    await expect(promise).resolves.toBeUndefined();
    vi.useRealTimers();
  });
});
