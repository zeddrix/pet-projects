import { describe, expect, it } from "vitest";
import {
  getProjectBySlug,
  getProjectSlugs,
  getSortedProjects,
} from "./projects";

describe("project route contract", () => {
  it("matches manifest slugs to sorted project list", () => {
    const slugs = getProjectSlugs();
    const sorted = getSortedProjects().map((project) => project.slug);

    expect(slugs).toEqual(sorted);
  });

  it("returns null-equivalent undefined for unknown slug lookup", () => {
    const project = getProjectBySlug("nonexistent-slug-xyz");

    expect(project).toBeUndefined();
  });

  it("resolves every manifest slug", () => {
    for (const slug of getProjectSlugs()) {
      expect(getProjectBySlug(slug)?.slug).toBe(slug);
    }
  });
});
