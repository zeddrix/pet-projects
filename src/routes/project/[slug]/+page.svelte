<script lang="ts">
  import { browser } from "$app/environment";
  import { page } from "$app/stores";
  import PlaygroundShell from "$lib/components/PlaygroundShell.svelte";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();

  const demoEntry = $derived(
    browser ? $page.url.searchParams.get("demo") : null,
  );
</script>

<PlaygroundShell project={data.project} {demoEntry} />
