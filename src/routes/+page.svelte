<script lang="ts">
  import { page } from "$app/stores";
  import PlaygroundShell from "$lib/components/PlaygroundShell.svelte";
  import SeoHead from "$lib/components/SeoHead.svelte";
  import { PLAYGROUND_ABOUT_VIEW_PARAM } from "$lib/constants/playground-about";
  import { SITE_DESCRIPTION, SITE_NAME } from "$lib/seo/site-config";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();

  const showAboutPane = $derived(
    $page.url.searchParams.get("view") === PLAYGROUND_ABOUT_VIEW_PARAM,
  );
</script>

<SeoHead title={SITE_NAME} description={SITE_DESCRIPTION} path="/" isHome />

<PlaygroundShell
  project={data.defaultProject}
  aboutProjects={data.projects}
  homeRoute
  {showAboutPane}
/>
