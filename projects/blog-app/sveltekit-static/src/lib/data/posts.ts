export interface BlogPost {
  id: number;
  title: string;
  body: string;
  author: string;
  datePosted: string;
}

export const posts: BlogPost[] = [
  {
    id: 1,
    title: "Welcome to the Django Blog",
    body: "This static preview mirrors the original Django blog home page with sample posts stored in JSON.",
    author: "zeddrix",
    datePosted: "2024-02-10",
  },
  {
    id: 2,
    title: "Learning Django Models",
    body: "Posts in the original app come from a Post model with title, author, body, and date_posted fields.",
    author: "zeddrix",
    datePosted: "2024-02-08",
  },
  {
    id: 3,
    title: "Static Archive Preview",
    body: "The full Django project lives in django-original/. This SvelteKit build is for GitHub Pages only.",
    author: "zeddrix",
    datePosted: "2024-02-05",
  },
];

export function getPostById(id: number): BlogPost | undefined {
  return posts.find((post) => post.id === id);
}
