<script lang="ts">
  import { afterNavigate } from "$app/navigation";
  import { onMount } from "svelte";
  import PlaygroundShell from "$lib/components/PlaygroundShell.svelte";
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
</script>

<PlaygroundShell project={data.project} {demoEntry} />
