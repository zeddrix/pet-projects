<script lang="ts">
  import { posts } from "$lib/data/posts";
  import BlogPreviewCard from "$lib/components/BlogPreviewCard.svelte";
  import SiteFooter from "$lib/components/SiteFooter.svelte";
</script>

<svelte:head>
  <title>Blog — Zedd Fabian</title>
</svelte:head>

<section class="bg-secondary text-white py-5 text-center">
  <div class="container py-3">
    <h1 class="display-5 blog-hero-title mb-0">This is Zedd's Blog</h1>
  </div>
</section>

<section class="py-5">
  <div class="container">
    <div class="row">
      {#each posts as post, index (post.id)}
        <BlogPreviewCard {post} reverse={index % 2 === 1} />
      {/each}
    </div>
  </div>
</section>

<SiteFooter />
