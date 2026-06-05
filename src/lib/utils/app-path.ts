import { base } from "$app/paths";
import { buildAppPath } from "./build-app-path";

/** Builds an in-app route path respecting `kit.paths.base` (e.g. GitHub Pages repo segment). */
export function appPath(path: string): string {
  return buildAppPath(base, path);
}
