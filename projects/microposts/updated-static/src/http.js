import { mockStore } from "./mock-store";

class EasyHTTP {
  async get(url) {
    if (url.includes("/posts")) {
      return mockStore.getPosts();
    }

    throw new Error(`Unsupported GET URL: ${url}`);
  }

  async post(url, data) {
    if (url.includes("/posts")) {
      return mockStore.createPost(data);
    }

    throw new Error(`Unsupported POST URL: ${url}`);
  }

  async put(url, data) {
    const match = url.match(/\/posts\/(\d+)/);
    if (match) {
      return mockStore.updatePost(Number(match[1]), data);
    }

    throw new Error(`Unsupported PUT URL: ${url}`);
  }

  async delete(url) {
    const match = url.match(/\/posts\/(\d+)/);
    if (match) {
      return mockStore.deletePost(Number(match[1]));
    }

    throw new Error(`Unsupported DELETE URL: ${url}`);
  }
}

export const http = new EasyHTTP();
