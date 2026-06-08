import { getSortedProjects } from "$lib/data/projects";
import type { PageLoad } from "./$types";

export const prerender = true;

export const load: PageLoad = () => {
  return {
    projects: getSortedProjects(),
  };
};
