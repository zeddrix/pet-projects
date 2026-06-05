import { redirect } from "@sveltejs/kit";
import { getDefaultProject } from "$lib/data/projects";
import { appPath } from "$lib/utils/app-path";
import type { PageLoad } from "./$types";

export const load: PageLoad = () => {
  const project = getDefaultProject();
  throw redirect(307, appPath(`/project/${project.slug}`));
};
