<script lang="ts">
  import { externalLinks } from "$lib/data/site";
  import SiteFooter from "$lib/components/SiteFooter.svelte";
</script>

<svelte:head>
  <title>Projects — Zedd Fabian</title>
</svelte:head>

<div class="container py-5 prose-page">
  <h1 class="mb-4">Projects</h1>

  <p class="mb-4">
    This monorepo—<strong>pet-projects</strong>—collects several of my smaller experiments and
    learning demos from over the years. You can browse the source on GitHub at
    <a href={externalLinks.petProjectsRepo} target="_blank" rel="noopener noreferrer"
      >github.com/zeddrix/pet-projects</a
    >, or open the live playground at
    <a href={externalLinks.petProjectsPlayground} target="_blank" rel="noopener noreferrer"
      >zeddrix.github.io/pet-projects</a
    >
    to click through each project in the sidebar.
  </p>

  <p class="mb-4">
    Inside the playground you will find static front-end toys, archived full-stack apps, and
    README-only references. They are not all production systems; many exist because I wanted to try
    an idea, finish a tutorial, or preserve code I once shipped elsewhere. Think of this folder as
    a workshop shelf rather than a product catalog.
  </p>

  <p class="mb-4">
    For more shipped, high-grade products—the kind I have refined with teams and real users—please
    visit my GitHub profile at
    <a href={externalLinks.github} target="_blank" rel="noopener noreferrer"
      >github.com/zeddrix</a
    >
    and my portfolio at
    <a href={externalLinks.portfolio} target="_blank" rel="noopener noreferrer"
      >zeddrix.github.io/portfolio</a
    >. Those sites highlight the work I have been doing more recently, with cleaner architecture
    and longer maintenance stories.
  </p>

  <p class="mb-4">Looking back, I've really grown up.</p>
</div>

<SiteFooter />
