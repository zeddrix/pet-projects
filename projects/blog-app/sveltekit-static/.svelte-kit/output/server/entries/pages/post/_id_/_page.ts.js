import { error } from "@sveltejs/kit";
import { p as posts, g as getPostById } from "../../../../chunks/posts.js";
function load({ params }) {
  const id = Number(params.id);
  const post = getPostById(id);
  if (!post) {
    error(404, "Post not found");
  }
  return { post };
}
function entries() {
  return posts.map((post) => ({ id: String(post.id) }));
}
export {
  entries,
  load
};
