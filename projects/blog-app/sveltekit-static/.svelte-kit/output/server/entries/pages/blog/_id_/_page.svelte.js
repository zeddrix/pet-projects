import { h as head, e as escape_html, a as attr, s as stringify } from "../../../../chunks/index.js";
import { b as base } from "../../../../chunks/server.js";
import "../../../../chunks/url.js";
import "@sveltejs/kit/internal/server";
import "../../../../chunks/root.js";
import { S as SiteFooter } from "../../../../chunks/SiteFooter.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    head("95ygql", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html(data.post.title)}</title>`);
      });
    });
    $$renderer2.push(`<article class="container py-5" style="max-width: 900px;"><header class="text-center mb-4"><h1 class="display-5 fw-bold mb-2">${escape_html(data.post.title)}</h1> <p class="text-muted">${escape_html(data.post.datePosted)}</p></header> <img${attr("src", `${stringify(base)}${stringify(data.post.image)}`)} class="img-fluid post-feature-image mb-4" alt=""/> <div class="text-start"><p>${escape_html(data.post.body)}</p></div></article> `);
    SiteFooter($$renderer2);
    $$renderer2.push(`<!---->`);
  });
}
export {
  _page as default
};
