import { c as attr_class, a as attr, s as stringify, e as escape_html, h as head, b as ensure_array_like } from "../../../chunks/index.js";
import { p as posts } from "../../../chunks/posts.js";
import { b as base } from "../../../chunks/server.js";
import "../../../chunks/url.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/root.js";
import { S as SiteFooter } from "../../../chunks/SiteFooter.js";
function BlogPreviewCard($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { post, reverse = false } = $$props;
    $$renderer2.push(`<div class="col-lg-6 mb-4"><div class="card h-100 overflow-hidden"><div${attr_class(`row g-0 h-100${reverse ? " flex-lg-row-reverse" : ""}`)}><div class="col-md-5"><img${attr("src", `${stringify(base)}${stringify(post.image)}`)} class="img-fluid h-100 w-100 blog-card-image" alt=""/></div> <div class="col-md-7"><div class="card-body d-flex flex-column h-100 p-4"><h2 class="card-title h5 fw-bold">${escape_html(post.title)}</h2> <p class="text-info mb-2">${escape_html(post.datePosted)}</p> <p class="card-text text-muted flex-grow-1">${escape_html(post.excerpt)}</p> <a${attr("href", `${stringify(base)}/blog/${stringify(post.id)}`)} class="text-decoration-none">Continue reading</a></div></div></div></div></div>`);
  });
}
function _page($$renderer) {
  head("u4k2t", $$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>Blog — Zedd Fabian</title>`);
    });
  });
  $$renderer.push(`<section class="bg-secondary text-white py-5 text-center"><div class="container py-3"><h1 class="display-5 blog-hero-title mb-0">This is Zedd's Blog</h1></div></section> <section class="py-5"><div class="container"><div class="row"><!--[-->`);
  const each_array = ensure_array_like(posts);
  for (let index = 0, $$length = each_array.length; index < $$length; index++) {
    let post = each_array[index];
    BlogPreviewCard($$renderer, { post, reverse: index % 2 === 1 });
  }
  $$renderer.push(`<!--]--></div></div></section> `);
  SiteFooter($$renderer);
  $$renderer.push(`<!---->`);
}
export {
  _page as default
};
