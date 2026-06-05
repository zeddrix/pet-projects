import { a as attr, e as escape_html, b as ensure_array_like, c as attributes, s as stringify, h as head } from "../../chunks/index.js";
import { b as base } from "../../chunks/server.js";
import "../../chunks/url.js";
import "@sveltejs/kit/internal/server";
import "../../chunks/root.js";
import { p as page } from "../../chunks/index2.js";
import { n as navItems, s as siteName } from "../../chunks/site.js";
function SiteNavbar($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    function navHref(href) {
      return href.startsWith("http") ? href : `${base}${href}`;
    }
    function isActive(matchPrefix) {
      if (!matchPrefix) {
        return false;
      }
      const currentPath = page.url.pathname;
      const normalizedBase = base === "" ? "" : base;
      const fullPrefix = `${normalizedBase}${matchPrefix}`;
      return currentPath === fullPrefix || currentPath === `${fullPrefix}/` || currentPath.startsWith(`${fullPrefix}/`);
    }
    $$renderer2.push(`<nav class="navbar navbar-expand-lg navbar-dark bg-dark"><div class="container"><a class="navbar-brand site-brand text-white text-decoration-none"${attr("href", `${stringify(base)}/`)}>${escape_html(siteName)}</a> <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#siteNavbar" aria-controls="siteNavbar" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button> <div class="collapse navbar-collapse" id="siteNavbar"><ul class="navbar-nav ms-auto"><!--[-->`);
    const each_array = ensure_array_like(navItems);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let item = each_array[$$index];
      $$renderer2.push(`<li class="nav-item"><a${attributes({
        class: `nav-link${isActive(item.matchPrefix) ? " active" : ""}`,
        href: navHref(item.href),
        ...item.external ? { target: "_blank", rel: "noopener noreferrer" } : {}
      })}>${escape_html(item.label)}</a></li>`);
    }
    $$renderer2.push(`<!--]--></ul></div></div></nav>`);
  });
}
function _layout($$renderer, $$props) {
  let { children } = $$props;
  head("12qhfyh", $$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>Zedd Fabian</title>`);
    });
  });
  SiteNavbar($$renderer);
  $$renderer.push(`<!----> `);
  children($$renderer);
  $$renderer.push(`<!---->`);
}
export {
  _layout as default
};
