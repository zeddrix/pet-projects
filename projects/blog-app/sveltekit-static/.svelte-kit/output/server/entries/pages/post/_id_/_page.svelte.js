import { a as attr, e as escape_html, b as stringify } from "../../../../chunks/root.js";
import { b as base } from "../../../../chunks/server.js";
import "../../../../chunks/url.js";
import "@sveltejs/kit/internal/server";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    $$renderer2.push(`<article class="post-entry"><p class="mb-3"><a${attr("href", `${stringify(base)}/`)} class="text-decoration-none">← Back to posts</a></p> <h2 class="h3">${escape_html(data.post.title)}</h2> <p class="text-muted small">By ${escape_html(data.post.author)} on ${escape_html(data.post.datePosted)}</p> <p>${escape_html(data.post.body)}</p></article>`);
  });
}
export {
  _page as default
};
