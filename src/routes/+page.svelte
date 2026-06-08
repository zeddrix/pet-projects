<script lang="ts">
  import { afterNavigate } from "$app/navigation";
  import { onMount } from "svelte";
  import PlaygroundShell from "$lib/components/PlaygroundShell.svelte";
  import SeoHead from "$lib/components/SeoHead.svelte";
  import { readPlaygroundAboutView } from "$lib/constants/playground-about";
  import { SITE_DESCRIPTION, SITE_NAME } from "$lib/seo/site-config";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();

  let showAboutPane = $state(false);

  function syncAboutView(): void {
    showAboutPane = readPlaygroundAboutView(window.location.href);
  }

  onMount(() => {
    syncAboutView();
  });

  afterNavigate(() => {
    syncAboutView();
  });
</script>

<SeoHead title={SITE_NAME} description={SITE_DESCRIPTION} path="/" isHome />

<PlaygroundShell
  project={data.defaultProject}
  aboutProjects={data.projects}
  homeRoute
  {showAboutPane}
/>
