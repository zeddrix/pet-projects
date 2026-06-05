const STORAGE_KEY = "microposts-static-posts";

const seedPosts = [
  { id: 1, title: "Post One", body: "This is Post One." },
  { id: 2, title: "Post Two", body: "This is Post Two." },
  { id: 3, title: "Post Three", body: "This is Post Three." },
];

function readPosts() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedPosts));
    return [...seedPosts];
  }

  return JSON.parse(stored);
}

function writePosts(posts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

function nextId(posts) {
  return posts.reduce((maxId, post) => Math.max(maxId, post.id), 0) + 1;
}

export const mockStore = {
  getPosts() {
    return Promise.resolve(readPosts());
  },

  createPost(data) {
    const posts = readPosts();
    const post = { id: nextId(posts), title: data.title, body: data.body };
    posts.unshift(post);
    writePosts(posts);
    return Promise.resolve(post);
  },

  updatePost(id, data) {
    const posts = readPosts();
    const index = posts.findIndex((post) => post.id === id);
    if (index === -1) {
      return Promise.reject(new Error("Post not found"));
    }

    posts[index] = { id, title: data.title, body: data.body };
    writePosts(posts);
    return Promise.resolve(posts[index]);
  },

  deletePost(id) {
    const posts = readPosts().filter((post) => post.id !== id);
    writePosts(posts);
    return Promise.resolve("Resource Deleted...");
  },
};
