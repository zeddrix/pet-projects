import { describe, expect, it } from "vitest";
import { getProjectBySlug, getSortedProjects } from "./projects";

const DUAL_VERSION_SLUGS = ["blog-app", "microposts", "github-finder-jsx"];

describe("project metadata integration", () => {
  it("requires developedAt for every catalog entry", () => {
    for (const project of getSortedProjects()) {
      expect(project.developedAt.length).toBeGreaterThan(0);
    }
  });

  it("requires tech stack or versions for every catalog entry", () => {
    for (const project of getSortedProjects()) {
      const hasTechStack =
        project.techStack !== undefined && project.techStack.length > 0;
      const hasVersions =
        project.versions !== undefined && project.versions.length > 0;
      expect(hasTechStack || hasVersions).toBe(true);
    }
  });

  it("requires dualVersionReason for multi-version projects", () => {
    for (const slug of DUAL_VERSION_SLUGS) {
      const project = getProjectBySlug(slug);
      expect(project?.versions?.length).toBeGreaterThanOrEqual(2);
      expect(project?.dualVersionReason?.length).toBeGreaterThan(0);
    }
  });

  it("maps blog-app versions to distinct folder paths", () => {
    const project = getProjectBySlug("blog-app");
    const paths = project?.versions?.map((version) => version.folderPath) ?? [];
    expect(paths).toContain("django-original");
    expect(paths).toContain("sveltekit-static");
  });
});
