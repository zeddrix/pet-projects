<script lang="ts">
  import { base } from "$app/paths";
  import { posts } from "$lib/data/posts";
</script>

{#each posts as post (post.id)}
  <article class="post-entry mb-4 pb-4 border-bottom">
    <h2 class="h4">
      <a href="{base}/post/{post.id}" class="text-decoration-none">{post.title}</a>
    </h2>
    <p class="text-muted small mb-2">
      By {post.author} on {post.datePosted}
    </p>
    <p class="mb-0">{post.body}</p>
  </article>
{/each}
