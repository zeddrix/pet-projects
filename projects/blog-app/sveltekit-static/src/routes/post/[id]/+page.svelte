<script lang="ts">
  import { base } from "$app/paths";

  let { data } = $props();
</script>

<article class="post-entry">
  <p class="mb-3">
    <a href="{base}/" class="text-decoration-none">&larr; Back to posts</a>
  </p>
  <h2 class="h3">{data.post.title}</h2>
  <p class="text-muted small">
    By {data.post.author} on {data.post.datePosted}
  </p>
  <p>{data.post.body}</p>
</article>
