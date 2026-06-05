import { e as escape_html } from "./index.js";
import "clsx";
import { f as footerText } from "./site.js";
function SiteFooter($$renderer) {
  $$renderer.push(`<footer class="py-4 mt-5 text-center text-muted border-top"><div class="container"><small>${escape_html(footerText)}</small></div></footer>`);
}
export {
  SiteFooter as S
};
