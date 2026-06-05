import { getProjectBySlug, getProjectSlugs } from "$lib/data/projects";
import type { PageLoad } from "./$types";

export const prerender = true;

export function entries() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export const load: PageLoad = ({ params }) => {
  const project = getProjectBySlug(params.slug) ?? null;
  return { project };
};
