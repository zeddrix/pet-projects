import { error } from "@sveltejs/kit";
import { getPostById, posts } from "$lib/data/posts";

export function load({ params }) {
  const id = Number(params.id);
  const post = getPostById(id);

  if (!post) {
    error(404, "Post not found");
  }

  return { post };
}

export function entries() {
  return posts.map((post) => ({ id: String(post.id) }));
}
