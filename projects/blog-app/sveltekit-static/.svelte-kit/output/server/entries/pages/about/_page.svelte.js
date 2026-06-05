import { h as head, b as ensure_array_like, a as attr, e as escape_html, s as stringify } from "../../../chunks/index.js";
import { a as externalLinks } from "../../../chunks/site.js";
import { S as SiteFooter } from "../../../chunks/SiteFooter.js";
import { b as base } from "../../../chunks/server.js";
import "../../../chunks/url.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/root.js";
const aboutSections = [
  {
    paragraphs: [
      "Back in 2020, this was the first django project that I've worked on. I learned so much about django, python, and bootstrap from this project. I even created a course about this on my website before at zeddrix.com to help other new devs learn about this too.",
      "I still remember how exciting it was to wire up models, views, and templates for the first time. Every small win felt huge—getting a post to show up on the home page, styling cards with Bootstrap, and finally seeing the blog come together in the browser. That hands-on loop of breaking things, reading docs, and fixing them again is what made Django click for me.",
      "The portfolio you are browsing now started as a simple idea on paper. I wanted a personal site with an about section, a projects area, and a blog where I could write about what I was learning. It was my way of documenting the journey while inviting others to follow along."
    ]
  },
  {
    wireframe: {
      src: "/images/about/original-wireframe.png",
      alt: "Hand-drawn 2020 wireframe sketch of Zedd Fabian's portfolio About page and blog layout",
      caption: "This is where the idea originated from hehe. I worked hard on drawing this you know :)."
    },
    paragraphs: []
  },
  {
    paragraphs: [
      "Years later, I archived the original Django codebase inside this monorepo under django-original. That folder is preserved on purpose—you can still browse the real project history on GitHub. I did not want to lose where this all started.",
      "GitHub Pages cannot run a Django server, so a plain static copy of the Python app was never going to behave the same way online. To keep the demo alive inside my pet-projects playground, I rebuilt the look and feel with SvelteKit in sveltekit-static. It is static HTML and assets only, but it lets me showcase the site to you without needing a backend.",
      "If you are learning Django today, I hope this little time capsule encourages you. I was a beginner when I drew that sketch, and I am still learning—just on bigger projects now. Thanks for stopping by and reading a bit of the story behind this demo."
    ]
  }
];
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    head("cwls5q", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>About — Zedd Fabian</title>`);
      });
    });
    $$renderer2.push(`<div class="container py-5 prose-page"><h1 class="mb-4">About</h1> <!--[-->`);
    const each_array = ensure_array_like(aboutSections);
    for (let index = 0, $$length = each_array.length; index < $$length; index++) {
      let section = each_array[index];
      $$renderer2.push(`<!--[-->`);
      const each_array_1 = ensure_array_like(section.paragraphs);
      for (let paragraphIndex = 0, $$length2 = each_array_1.length; paragraphIndex < $$length2; paragraphIndex++) {
        let paragraph = each_array_1[paragraphIndex];
        if (index === 2 && paragraphIndex === 0) {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<p class="mb-4">Years later, I archived the original Django codebase inside this monorepo under <code>django-original</code>. That folder is preserved on purpose—you can still browse
          the real project history at <a${attr("href", externalLinks.djangoOriginal)} target="_blank" rel="noopener noreferrer">django-original on GitHub</a>. I did not want to lose where this all started.</p>`);
        } else {
          $$renderer2.push("<!--[-1-->");
          $$renderer2.push(`<p class="mb-4">${escape_html(paragraph)}</p>`);
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]--> `);
      if (section.wireframe) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<figure class="about-wireframe mx-auto mb-5 text-center"><img${attr("src", `${stringify(base)}${stringify(section.wireframe.src)}`)} class="img-fluid border rounded shadow-sm"${attr("alt", section.wireframe.alt)}/> <figcaption class="figure-caption mt-3">${escape_html(section.wireframe.caption)}</figcaption></figure>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div> `);
    SiteFooter($$renderer2);
    $$renderer2.push(`<!---->`);
  });
}
export {
  _page as default
};
