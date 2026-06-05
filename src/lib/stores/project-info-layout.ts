import {
  DEFAULT_PROJECT_INFO_LAYOUT,
  isProjectInfoLayout,
  PROJECT_INFO_LAYOUT_STORAGE_KEY,
} from "$lib/constants/project-info-layout";
import type { ProjectInfoLayout } from "$lib/types/project";

export function resolveProjectInfoLayout(): ProjectInfoLayout {
  if (typeof localStorage === "undefined") {
    return DEFAULT_PROJECT_INFO_LAYOUT;
  }

  try {
    const stored = localStorage.getItem(PROJECT_INFO_LAYOUT_STORAGE_KEY);
    if (stored && isProjectInfoLayout(stored)) {
      return stored;
    }
  } catch {
    return DEFAULT_PROJECT_INFO_LAYOUT;
  }

  return DEFAULT_PROJECT_INFO_LAYOUT;
}

export function writeProjectInfoLayout(layout: ProjectInfoLayout): void {
  if (typeof localStorage === "undefined") {
    return;
  }

  try {
    localStorage.setItem(PROJECT_INFO_LAYOUT_STORAGE_KEY, layout);
  } catch {
    // Ignore quota or private-mode failures; in-memory state still updates.
  }
}
