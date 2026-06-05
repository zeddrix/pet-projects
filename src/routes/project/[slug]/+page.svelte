<script lang="ts">
  import PlaygroundShell from "$lib/components/PlaygroundShell.svelte";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
</script>

<PlaygroundShell project={data.project} />
