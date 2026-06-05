<script lang="ts">
  import { base } from "$app/paths";
  import { fetchProjectReadme } from "$lib/utils/fetch-project-readme";
  import { renderMarkdown } from "$lib/utils/render-markdown";
  import type { Project } from "$lib/types/project";

  interface Props {
    project: Project;
  }

  let { project }: Props = $props();

  let markdown = $state("");
  let errorMessage = $state("");
  let html = $derived(markdown ? renderMarkdown(markdown) : "");

  $effect(() => {
    const slug = project.slug;
    let cancelled = false;

    markdown = "";
    errorMessage = "";

    fetchProjectReadme(base, slug)
      .then((content) => {
        if (!cancelled) {
          markdown = content;
        }
      })
      .catch(() => {
        if (!cancelled) {
          errorMessage = `Could not load README for ${project.title}.`;
        }
      });

    return () => {
      cancelled = true;
    };
  });
</script>

{#key project.slug}
  <div
    data-testid="playground-readme"
    class="playground-readme flex-1 overflow-y-auto px-6 py-5 text-slate-800"
  >
    {#if errorMessage}
      <p class="text-sm text-red-700">{errorMessage}</p>
    {:else if html}
      <article class="readme-content max-w-3xl">{@html html}</article>
    {:else}
      <p class="text-sm text-slate-500">Loading README…</p>
    {/if}
  </div>
{/key}

<style>
  .readme-content :global(h1) {
    margin-bottom: 0.75rem;
    font-size: 1.5rem;
    font-weight: 700;
    color: rgb(15 23 42);
  }

  .readme-content :global(h2) {
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
    font-size: 1.125rem;
    font-weight: 600;
    color: rgb(15 23 42);
  }

  .readme-content :global(p),
  .readme-content :global(li) {
    margin-bottom: 0.75rem;
    line-height: 1.6;
  }

  .readme-content :global(ul),
  .readme-content :global(ol) {
    margin-bottom: 0.75rem;
    padding-left: 1.25rem;
  }

  .readme-content :global(code) {
    border-radius: 0.25rem;
    background: rgb(241 245 249);
    padding: 0.125rem 0.375rem;
    font-size: 0.875rem;
  }

  .readme-content :global(pre) {
    margin-bottom: 0.75rem;
    overflow-x: auto;
    border-radius: 0.375rem;
    background: rgb(15 23 42);
    padding: 0.75rem 1rem;
    color: rgb(248 250 252);
  }

  .readme-content :global(pre code) {
    background: transparent;
    padding: 0;
    color: inherit;
  }

  .readme-content :global(a) {
    color: rgb(37 99 235);
    text-decoration: underline;
  }

  .readme-content :global(table) {
    margin-bottom: 0.75rem;
    width: 100%;
    border-collapse: collapse;
  }

  .readme-content :global(th),
  .readme-content :global(td) {
    border: 1px solid rgb(203 213 225);
    padding: 0.5rem 0.75rem;
    text-align: left;
  }
</style>
