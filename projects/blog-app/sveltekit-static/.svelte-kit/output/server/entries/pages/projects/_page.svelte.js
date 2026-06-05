import { h as head, b as ensure_array_like, c as attr_class, e as escape_html, a as attr } from "../../../chunks/index.js";
import { S as SiteFooter } from "../../../chunks/SiteFooter.js";
const projectsSections = [
  {
    id: "what-is",
    heading: "What is pet-projects?",
    paragraphs: [
      [
        { kind: "text", value: "This monorepo—" },
        { kind: "strong", value: "pet-projects" },
        {
          kind: "text",
          value: "—collects several of my smaller experiments and learning demos from over the years. You can browse the source on GitHub at "
        },
        {
          kind: "link",
          href: "https://github.com/zeddrix/pet-projects",
          label: "github.com/zeddrix/pet-projects",
          external: true
        },
        { kind: "text", value: ", or open the live playground at " },
        {
          kind: "link",
          href: "https://zeddrix.github.io/pet-projects/",
          label: "zeddrix.github.io/pet-projects",
          external: true
        },
        {
          kind: "text",
          value: " to click through each project in the sidebar."
        }
      ]
    ]
  },
  {
    id: "inside",
    heading: "What you will find",
    paragraphs: [
      [
        {
          kind: "text",
          value: "Inside the playground you will find static front-end toys, archived full-stack apps, and README-only references. They are not all production systems; many exist because I wanted to try an idea, finish a tutorial, or preserve code I once shipped elsewhere. Think of this folder as a workshop shelf rather than a product catalog."
        }
      ]
    ]
  },
  {
    id: "shipped",
    heading: "Shipped work elsewhere",
    callout: true,
    paragraphs: [
      [
        {
          kind: "text",
          value: "For more shipped, high-grade products—the kind I have refined with teams and real users—please visit my GitHub profile at "
        },
        {
          kind: "link",
          href: "https://github.com/zeddrix",
          label: "github.com/zeddrix",
          external: true
        },
        { kind: "text", value: " and my portfolio at " },
        {
          kind: "link",
          href: "https://zeddrix.github.io/portfolio/",
          label: "zeddrix.github.io/portfolio",
          external: true
        },
        {
          kind: "text",
          value: ". Those sites highlight the work I have been doing more recently, with cleaner architecture and longer maintenance stories."
        }
      ]
    ]
  },
  {
    id: "reflection",
    heading: "Looking back",
    paragraphs: [
      [{ kind: "text", value: "Looking back, I've really grown up." }]
    ]
  }
];
function _page($$renderer) {
  head("rqn88j", $$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>Projects — Zedd Fabian</title>`);
    });
  });
  $$renderer.push(`<div class="container py-5 prose-page"><h1 class="mb-4">Projects</h1> <!--[-->`);
  const each_array = ensure_array_like(projectsSections);
  for (let $$index_2 = 0, $$length = each_array.length; $$index_2 < $$length; $$index_2++) {
    let section = each_array[$$index_2];
    $$renderer.push(`<section${attr_class(`mb-4 ${section.callout ? "projects-callout" : ""}`)}><h2 class="h5 mb-3">${escape_html(section.heading)}</h2> <!--[-->`);
    const each_array_1 = ensure_array_like(section.paragraphs);
    for (let $$index_1 = 0, $$length2 = each_array_1.length; $$index_1 < $$length2; $$index_1++) {
      let paragraph = each_array_1[$$index_1];
      $$renderer.push(`<p class="mb-0"><!--[-->`);
      const each_array_2 = ensure_array_like(paragraph);
      for (let index = 0, $$length3 = each_array_2.length; index < $$length3; index++) {
        let part = each_array_2[index];
        if (part.kind === "text") {
          $$renderer.push("<!--[0-->");
          $$renderer.push(`${escape_html(part.value)}`);
        } else if (part.kind === "strong") {
          $$renderer.push("<!--[1-->");
          $$renderer.push(`<strong>${escape_html(part.value)}</strong>`);
        } else if (part.kind === "link") {
          $$renderer.push("<!--[2-->");
          $$renderer.push(`<a${attr("href", part.href)}${attr("target", part.external ? "_blank" : void 0)}${attr("rel", part.external ? "noopener noreferrer" : void 0)}>${escape_html(part.label)}</a>`);
        } else {
          $$renderer.push("<!--[-1-->");
        }
        $$renderer.push(`<!--]-->`);
      }
      $$renderer.push(`<!--]--></p>`);
    }
    $$renderer.push(`<!--]--></section>`);
  }
  $$renderer.push(`<!--]--></div> `);
  SiteFooter($$renderer);
  $$renderer.push(`<!---->`);
}
export {
  _page as default
};
