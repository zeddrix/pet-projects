export interface Project {
  slug: string;
  title: string;
  description: string;
  sourceUrl: string;
  deprecated?: boolean;
  sortOrder: number;
}
