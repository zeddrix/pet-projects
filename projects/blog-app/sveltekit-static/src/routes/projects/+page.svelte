<script lang="ts">
  import { projectsSections } from "$lib/data/projects-copy";
  import SiteFooter from "$lib/components/SiteFooter.svelte";
</script>

<svelte:head>
  <title>Projects — Zedd Fabian</title>
</svelte:head>

<div class="container py-5 prose-page">
  <h1 class="mb-4">Projects</h1>

  {#each projectsSections as section (section.id)}
    <section class="mb-4 {section.callout ? 'projects-callout' : ''}">
      <h2 class="h5 mb-3">{section.heading}</h2>
      {#each section.paragraphs as paragraph}
        <p class="mb-0">
          {#each paragraph as part, index (index)}
            {#if part.kind === "text"}
              {part.value}
            {:else if part.kind === "strong"}
              <strong>{part.value}</strong>
            {:else if part.kind === "link"}
              <a
                href={part.href}
                target={part.external ? "_blank" : undefined}
                rel={part.external ? "noopener noreferrer" : undefined}
                >{part.label}</a
              >
            {/if}
          {/each}
        </p>
      {/each}
    </section>
  {/each}
</div>

<SiteFooter />
