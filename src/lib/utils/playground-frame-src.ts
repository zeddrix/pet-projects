import { base } from "$app/paths";
import { buildPlaygroundFrameSrc } from "./build-app-path";

/** Builds the iframe src for a pet project demo. */
export function playgroundFrameSrc(
  slug: string,
  demoEntry?: string | null,
): string {
  return buildPlaygroundFrameSrc(base, slug, demoEntry);
}
