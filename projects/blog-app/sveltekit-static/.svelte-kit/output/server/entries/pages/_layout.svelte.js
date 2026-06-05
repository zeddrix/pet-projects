import { h as head, a as attr, b as stringify } from "../../chunks/root.js";
import { b as base } from "../../chunks/server.js";
import "../../chunks/url.js";
import "@sveltejs/kit/internal/server";
function _layout($$renderer, $$props) {
  let { children } = $$props;
  head("12qhfyh", $$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>Django blog</title>`);
    });
  });
  $$renderer.push(`<header class="border-bottom bg-light py-3 mb-4"><div class="container"><h1 class="h3 mb-0"><a${attr("href", `${stringify(base)}/`)} class="text-decoration-none text-dark">Django blog</a></h1></div></header> <div class="container pb-5">`);
  children($$renderer);
  $$renderer.push(`<!----></div>`);
}
export {
  _layout as default
};
