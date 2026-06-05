import projectsData from "./projects.json";
import type { Project } from "$lib/types/project";

const projects = projectsData as Project[];

export function getSortedProjects(): Project[] {
  return [...projects].sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getDefaultProject(): Project {
  const sorted = getSortedProjects();
  const firstNonDeprecated = sorted.find((project) => !project.deprecated);
  if (!firstNonDeprecated) {
    throw new Error("No non-deprecated projects in manifest");
  }
  return firstNonDeprecated;
}

export function getProjectSlugs(): string[] {
  return getSortedProjects().map((project) => project.slug);
}

export { projects };
