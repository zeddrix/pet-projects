import type { ProjectInfoLayout } from "$lib/types/project";

export const PROJECT_INFO_LAYOUT_STORAGE_KEY =
  "pet-projects:project-info-layout";

export const DEFAULT_PROJECT_INFO_LAYOUT: ProjectInfoLayout = "panel";

export interface ProjectInfoLayoutOption {
  value: ProjectInfoLayout;
  label: string;
  helper: string;
}

export const PROJECT_INFO_LAYOUT_OPTIONS: ProjectInfoLayoutOption[] = [
  {
    value: "panel",
    label: "Side panel",
    helper: "Slides in from the right",
  },
  {
    value: "modal",
    label: "Modal",
    helper: "Centered overlay",
  },
  {
    value: "inline",
    label: "Inline",
    helper: "Expands below the title bar",
  },
];

export function isProjectInfoLayout(value: string): value is ProjectInfoLayout {
  return value === "panel" || value === "modal" || value === "inline";
}
