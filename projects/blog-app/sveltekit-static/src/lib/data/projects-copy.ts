export type ProjectsParagraphPart =
  | { kind: "text"; value: string }
  | { kind: "strong"; value: string }
  | { kind: "link"; href: string; label: string; external?: boolean };

export interface ProjectsSection {
  id: "what-is" | "inside" | "shipped" | "reflection";
  heading: string;
  callout?: boolean;
  paragraphs: ProjectsParagraphPart[][];
}

export const projectsSections: ProjectsSection[] = [
  {
    id: "what-is",
    heading: "What is pet-projects?",
    paragraphs: [
      [
        { kind: "text", value: "This monorepo—" },
        { kind: "strong", value: "pet-projects" },
        {
          kind: "text",
          value: "—collects several of my smaller experiments and learning demos from over the years. You can browse the source on GitHub at ",
        },
        {
          kind: "link",
          href: "https://github.com/zeddrix/pet-projects",
          label: "github.com/zeddrix/pet-projects",
          external: true,
        },
        { kind: "text", value: ", or open the live playground at " },
        {
          kind: "link",
          href: "https://zeddrix.github.io/pet-projects/",
          label: "zeddrix.github.io/pet-projects",
          external: true,
        },
        {
          kind: "text",
          value: " to click through each project in the sidebar.",
        },
      ],
    ],
  },
  {
    id: "inside",
    heading: "What you will find",
    paragraphs: [
      [
        {
          kind: "text",
          value: "Inside the playground you will find static front-end toys, archived full-stack apps, and README-only references. They are not all production systems; many exist because I wanted to try an idea, finish a tutorial, or preserve code I once shipped elsewhere. Think of this folder as a workshop shelf rather than a product catalog.",
        },
      ],
    ],
  },
  {
    id: "shipped",
    heading: "Shipped work elsewhere",
    callout: true,
    paragraphs: [
      [
        {
          kind: "text",
          value: "For more shipped, high-grade products—the kind I have refined with teams and real users—please visit my GitHub profile at ",
        },
        {
          kind: "link",
          href: "https://github.com/zeddrix",
          label: "github.com/zeddrix",
          external: true,
        },
        { kind: "text", value: " and my portfolio at " },
        {
          kind: "link",
          href: "https://zeddrix.github.io/portfolio/",
          label: "zeddrix.github.io/portfolio",
          external: true,
        },
        {
          kind: "text",
          value: ". Those sites highlight the work I have been doing more recently, with cleaner architecture and longer maintenance stories.",
        },
      ],
    ],
  },
  {
    id: "reflection",
    heading: "Looking back",
    paragraphs: [
      [{ kind: "text", value: "Looking back, I've really grown up." }],
    ],
  },
];
