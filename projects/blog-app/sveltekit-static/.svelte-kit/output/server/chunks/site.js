const siteName = "Zedd Fabian";
const email = "zeddrix.fabian@gmail.com";
const externalLinks = {
  github: "https://github.com/zeddrix",
  portfolio: "https://zeddrix.github.io/portfolio/",
  djangoOriginal: "https://github.com/zeddrix/pet-projects/tree/main/projects/blog-app/django-original"
};
const navItems = [
  { label: "About", href: "/about", matchPrefix: "/about" },
  { label: "Github", href: externalLinks.github, external: true },
  { label: "Projects", href: "/projects", matchPrefix: "/projects" },
  { label: "Portfolio", href: externalLinks.portfolio, external: true },
  { label: "Blog", href: "/blog", matchPrefix: "/blog" }
];
const footerText = "Copyright © 2020 Zedd Fabian";
export {
  externalLinks as a,
  email as e,
  footerText as f,
  navItems as n,
  siteName as s
};
