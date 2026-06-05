export type ProjectDisplayMode = "iframe" | "readme";

export interface Project {
  slug: string;
  title: string;
  description: string;
  sourceUrl: string;
  deprecated?: boolean;
  displayMode?: ProjectDisplayMode;
  sortOrder: number;
}
