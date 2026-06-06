import { describe, expect, it } from "vitest";
import {
  getDefaultProject,
  getProjectBySlug,
  getProjectSlugs,
  getSortedProjects,
} from "./projects";

describe("projects manifest", () => {
  it("returns project for known slug", () => {
    const project = getProjectBySlug("github-finder-jsx");

    expect(project?.title).toBe("GitHub Finder (JSX)");
    expect(project?.slug).toBe("github-finder-jsx");
  });

  it("returns undefined for unknown slug", () => {
    expect(getProjectBySlug("missing-project")).toBeUndefined();
  });

  it("returns first non-deprecated project as default", () => {
    const project = getDefaultProject();

    expect(project.slug).toBe("github-finder-jsx");
    expect(project.deprecated).toBeUndefined();
  });

  it("returns 16 sorted projects", () => {
    expect(getSortedProjects()).toHaveLength(16);
  });

  it("marks github-finder as deprecated", () => {
    const project = getProjectBySlug("github-finder");

    expect(project?.deprecated).toBe(true);
  });

  it("exposes slugs for prerender entries", () => {
    const slugs = getProjectSlugs();
    expect(slugs).toHaveLength(16);
    expect(slugs).toContain("diamond-in-black-pearl");
    expect(slugs).toContain("loan-calculator");
    expect(slugs).toContain("bible-query");
  });

  it("points sourceUrl at monorepo project folders", () => {
    for (const project of getSortedProjects()) {
      expect(project.sourceUrl).toBe(
        `https://github.com/zeddrix/pet-projects/tree/main/projects/${project.slug}`,
      );
    }
  });

  it("marks devcamper-api as readme display mode", () => {
    const project = getProjectBySlug("devcamper-api");

    expect(project?.displayMode).toBe("readme");
  });

  it("includes developedAt for every project", () => {
    for (const project of getSortedProjects()) {
      expect(project.developedAt.length).toBeGreaterThan(0);
    }
  });

  it("includes tech stack for loan-calculator", () => {
    const project = getProjectBySlug("loan-calculator");

    expect(project?.techStack).toContain("Vanilla JS");
  });

  it("includes archive metadata for bible-query", () => {
    const project = getProjectBySlug("bible-query");

    expect(project?.developedAt).toBe("May 2020");
    expect(project?.techStack).toContain("Vanilla JS");
    expect(project?.techStack).toContain("Custom fonts");
    expect(project?.dualVersionReason).toContain("git history");
    expect(project?.dualVersionReason).toContain("zeddrix/bible-query");
  });

  it("includes archive metadata for diamond-in-black-pearl", () => {
    const project = getProjectBySlug("diamond-in-black-pearl");

    expect(project?.developedAt).toBe("June 2020");
    expect(project?.versions?.length).toBeGreaterThanOrEqual(3);
    expect(project?.dualVersionReason).toContain("git history");
    expect(project?.dualVersionReason).toContain(
      "zeddrix/diamond-in-black-pearl",
    );
    expect(project?.dualVersionReason).toContain(
      "original/game.py is untouched",
    );
  });
});
