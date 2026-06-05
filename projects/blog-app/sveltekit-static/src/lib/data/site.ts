export const siteName = "Zedd Fabian";

export const email = "zeddrix.fabian@gmail.com";

export const externalLinks = {
  github: "https://github.com/zeddrix",
  portfolio: "https://zeddrix.github.io/portfolio/",
  djangoOriginal:
    "https://github.com/zeddrix/pet-projects/tree/main/projects/blog-app/django-original",
  petProjectsRepo: "https://github.com/zeddrix/pet-projects",
  petProjectsPlayground: "https://zeddrix.github.io/pet-projects/",
} as const;

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
  matchPrefix?: string;
}

export const navItems: NavItem[] = [
  { label: "About", href: "/about", matchPrefix: "/about" },
  { label: "Github", href: externalLinks.github, external: true },
  { label: "Projects", href: "/projects", matchPrefix: "/projects" },
  { label: "Portfolio", href: externalLinks.portfolio, external: true },
  { label: "Blog", href: "/blog", matchPrefix: "/blog" },
];

export const footerText = "Copyright © 2020 Zedd Fabian";
