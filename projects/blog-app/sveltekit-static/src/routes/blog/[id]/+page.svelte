<script lang="ts">
  import { base } from "$app/paths";
  import SiteFooter from "$lib/components/SiteFooter.svelte";

  let { data } = $props();
</script>

<svelte:head>
  <title>{data.post.title}</title>
</svelte:head>

<article class="container py-5" style="max-width: 900px;">
  <header class="text-center mb-4">
    <h1 class="display-5 fw-bold mb-2">{data.post.title}</h1>
    <p class="text-muted">{data.post.datePosted}</p>
  </header>

  <img
    src="{base}{data.post.image}"
    class="img-fluid post-feature-image mb-4"
    alt=""
  />

  <div class="text-start">
    <p>{data.post.body}</p>
  </div>
</article>

<SiteFooter />
