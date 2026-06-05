export type ProjectDisplayMode = "iframe" | "readme";

export interface ProjectVersion {
  id: "original" | "preview" | "source";
  label: string;
  techStack: string[];
  folderPath: string;
  note?: string;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  sourceUrl: string;
  developedAt: string;
  techStack?: string[];
  versions?: ProjectVersion[];
  dualVersionReason?: string;
  deprecated?: boolean;
  displayMode?: ProjectDisplayMode;
  sortOrder: number;
}
