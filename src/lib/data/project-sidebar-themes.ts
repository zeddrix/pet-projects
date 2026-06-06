import type { ProjectSidebarTheme } from "$lib/types/project-sidebar-theme";

export const FALLBACK_SIDEBAR_THEME: ProjectSidebarTheme = {
  primary: "#52525b",
  accent: "#71717a",
  primaryDark: "#27272a",
};

const projectSidebarThemes: Record<string, ProjectSidebarTheme> = {
  "github-finder-jsx": {
    primary: "#333333",
    accent: "#dc3545",
    primaryDark: "#1a1a1a",
  },
  "loan-calculator": {
    primary: "#343a40",
    accent: "#007bff",
    primaryDark: "#212529",
  },
  "weather-widget": {
    primary: "#007bff",
    accent: "#ffc107",
    primaryDark: "#0056b3",
  },
  tracalorie: {
    primary: "#1565c0",
    accent: "#ff9800",
    primaryDark: "#0d47a1",
  },
  "word-counter": {
    primary: "#3497be",
    accent: "#f3e410",
    primaryDark: "#1e5b74",
  },
  tasklist: {
    primary: "#26a69a",
    accent: "#212121",
    primaryDark: "#00695c",
  },
  "github-finder": {
    primary: "#007bff",
    accent: "#6c757d",
    primaryDark: "#0056b3",
  },
  booklist: {
    primary: "#2c3e50",
    accent: "#27ae60",
    primaryDark: "#1a252f",
  },
  animate: {
    primary: "#17a2b8",
    accent: "#dc3545",
    primaryDark: "#117a8b",
  },
  "robot-friend": {
    primary: "#5f93e8",
    accent: "#ffd54f",
    primaryDark: "#3d6fbf",
  },
  "jw-guitar-templates": {
    primary: "#6d5402",
    accent: "#383838",
    primaryDark: "#4d3b03",
  },
  "bible-query": {
    primary: "#126965",
    accent: "#51dcf5",
    primaryDark: "#0a4a47",
  },
  "blog-app": {
    primary: "#212529",
    accent: "#0d6efd",
    primaryDark: "#121416",
  },
  microposts: {
    primary: "#2780e3",
    accent: "#ff7518",
    primaryDark: "#1a5aa8",
  },
  "devcamper-api": {
    primary: "#339933",
    accent: "#4c566a",
    primaryDark: "#267326",
  },
  "diamond-in-black-pearl": {
    primary: "#2d4a3e",
    accent: "#d4a853",
    primaryDark: "#1a2f1a",
  },
};

export function getProjectSidebarTheme(slug: string): ProjectSidebarTheme {
  return projectSidebarThemes[slug] ?? FALLBACK_SIDEBAR_THEME;
}

export function isFallbackSidebarTheme(theme: ProjectSidebarTheme): boolean {
  return theme.primary === FALLBACK_SIDEBAR_THEME.primary;
}

export { projectSidebarThemes };
