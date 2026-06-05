<script lang="ts">
  import { base } from "$app/paths";
  import { posts } from "$lib/data/posts";

  let { children } = $props();
</script>

<svelte:head>
  <title>Django blog</title>
</svelte:head>

<header class="border-bottom bg-light py-3 mb-4">
  <div class="container">
    <h1 class="h3 mb-0">
      <a href="{base}/" class="text-decoration-none text-dark">Django blog</a>
    </h1>
  </div>
</header>

<div class="container pb-5">
  {@render children()}
</div>
