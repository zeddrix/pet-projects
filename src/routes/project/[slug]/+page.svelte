<script lang="ts">
  import { afterNavigate } from "$app/navigation";
  import { onMount } from "svelte";
  import PlaygroundShell from "$lib/components/PlaygroundShell.svelte";
  import SeoHead from "$lib/components/SeoHead.svelte";
  import { AUTHOR_NAME } from "$lib/seo/site-config";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();

  let demoEntry = $state<string | null>(null);

  function readDemoFromUrl() {
    demoEntry = new URL(window.location.href).searchParams.get("demo");
  }

  onMount(() => {
    readDemoFromUrl();
  });

  afterNavigate(() => {
    readDemoFromUrl();
  });

  const project = $derived(data.project);
</script>

{#if project}
  <SeoHead
    title={project.title}
    description={project.description}
    path={`/project/${project.slug}`}
    projectSlug={project.slug}
    projectSourceUrl={project.sourceUrl}
  />
  <h1 class="sr-only">{project.title} by {AUTHOR_NAME}</h1>
{/if}

<PlaygroundShell project={data.project} {demoEntry} />
