<script lang="ts">
  import { aboutSections } from "$lib/data/about-copy";
  import { externalLinks } from "$lib/data/site";
  import SiteFooter from "$lib/components/SiteFooter.svelte";
  import { base } from "$app/paths";
</script>

<svelte:head>
  <title>About — Zedd Fabian</title>
</svelte:head>

<div class="container py-5 prose-page">
  <h1 class="mb-4">About</h1>

  {#each aboutSections as section, index (index)}
    {#each section.paragraphs as paragraph, paragraphIndex (`${index}-${paragraphIndex}`)}
      {#if index === 2 && paragraphIndex === 0}
        <p class="mb-4">
          Years later, I archived the original Django codebase inside this monorepo under
          <code>django-original</code>. That folder is preserved on purpose—you can still browse
          the real project history at
          <a href={externalLinks.djangoOriginal} target="_blank" rel="noopener noreferrer"
            >django-original on GitHub</a
          >. I did not want to lose where this all started.
        </p>
      {:else}
        <p class="mb-4">{paragraph}</p>
      {/if}
    {/each}

    {#if section.wireframe}
      <figure class="about-wireframe mx-auto mb-5 text-center">
        <img
          src="{base}{section.wireframe.src}"
          class="img-fluid border rounded shadow-sm"
          alt={section.wireframe.alt}
        />
        <figcaption class="figure-caption mt-3">
          {section.wireframe.caption}
        </figcaption>
      </figure>
    {/if}
  {/each}
</div>

<SiteFooter />
