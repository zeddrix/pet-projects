import { a as attr, s as stringify, e as escape_html, b as ensure_array_like } from "../../chunks/index.js";
import { e as email } from "../../chunks/site.js";
import { b as base } from "../../chunks/server.js";
import "../../chunks/url.js";
import "@sveltejs/kit/internal/server";
import "../../chunks/root.js";
const hobbies = [
  {
    image: "/images/hobby-chinese.jpg",
    alt: "Chinese characters calligraphy",
    description: "I am currently learning Mandarin Chinese. I love this language!"
  },
  {
    image: "/images/hobby-guitar.jpg",
    alt: "Hands playing acoustic guitar",
    description: "I love playing guitar! I play a lot of songs: Original Songs from jw.org and also Kingdom Songs. I even groped some guitar tabs for these Kingdom Songs."
  },
  {
    image: "/images/hobby-coding.jpg",
    alt: "Hands typing on a laptop keyboard",
    description: "Coding is one of my many hobbies. In fact, it is my profession."
  }
];
function HobbyCard($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { hobby } = $$props;
    $$renderer2.push(`<div class="col-md-4 mb-4"><div class="card h-100 hobby-card"><img${attr("src", `${stringify(base)}${stringify(hobby.image)}`)} class="card-img-top"${attr("alt", hobby.alt)}/> <div class="card-body"><p class="card-text">${escape_html(hobby.description)}</p></div></div></div>`);
  });
}
function _page($$renderer) {
  $$renderer.push(`<section class="bg-light py-5 text-center"><div class="container py-4"><h1 class="display-4 fw-bold mb-3">Hi! I'm Zedd!</h1> <p class="lead text-muted mx-auto mb-4" style="max-width: 720px;">How are you? My full name's Zeddrix Fabian. I am currently learning Django as I make
      this tutorial--that's the truth. Here are my hobbies and my projects.</p> <a class="btn btn-primary btn-lg"${attr("href", `mailto:${stringify(email)}`)}>Email me</a></div></section> <section class="py-5"><div class="container"><div class="row"><!--[-->`);
  const each_array = ensure_array_like(hobbies);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let hobby = each_array[$$index];
    HobbyCard($$renderer, { hobby });
  }
  $$renderer.push(`<!--]--></div></div></section>`);
}
export {
  _page as default
};
