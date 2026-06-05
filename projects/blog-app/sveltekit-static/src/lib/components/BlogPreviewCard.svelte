<script lang="ts">
  import { base } from "$app/paths";
  import type { BlogPost } from "$lib/types/blog";

  interface Props {
    post: BlogPost;
    reverse?: boolean;
  }

  let { post, reverse = false }: Props = $props();
</script>

<div class="col-lg-6 mb-4">
  <div class="card h-100 overflow-hidden">
    <div class="row g-0 h-100{reverse ? ' flex-lg-row-reverse' : ''}">
      <div class="col-md-5">
        <img
          src="{base}{post.image}"
          class="img-fluid h-100 w-100 blog-card-image"
          alt=""
        />
      </div>
      <div class="col-md-7">
        <div class="card-body d-flex flex-column h-100 p-4">
          <h2 class="card-title h5 fw-bold">{post.title}</h2>
          <p class="text-info mb-2">{post.datePosted}</p>
          <p class="card-text text-muted flex-grow-1">{post.excerpt}</p>
          <a href="{base}/blog/{post.id}" class="text-decoration-none">Continue reading</a>
        </div>
      </div>
    </div>
  </div>
</div>
