import { c as ensure_array_like, a as attr, b as stringify, e as escape_html } from "../../chunks/root.js";
import { b as base } from "../../chunks/server.js";
import "../../chunks/url.js";
import "@sveltejs/kit/internal/server";
import { p as posts } from "../../chunks/posts.js";
function _page($$renderer) {
  $$renderer.push(`<!--[-->`);
  const each_array = ensure_array_like(posts);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let post = each_array[$$index];
    $$renderer.push(`<article class="post-entry mb-4 pb-4 border-bottom"><h2 class="h4"><a${attr("href", `${stringify(base)}/post/${stringify(post.id)}`)} class="text-decoration-none">${escape_html(post.title)}</a></h2> <p class="text-muted small mb-2">By ${escape_html(post.author)} on ${escape_html(post.datePosted)}</p> <p class="mb-0">${escape_html(post.body)}</p></article>`);
  }
  $$renderer.push(`<!--]-->`);
}
export {
  _page as default
};
