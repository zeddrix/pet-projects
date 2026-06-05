<script lang="ts">
  import "../app.css";
  import SiteNavbar from "$lib/components/SiteNavbar.svelte";

  let { children } = $props();
</script>

<svelte:head>
  <title>Zedd Fabian</title>
</svelte:head>

<SiteNavbar />

{@render children()}
