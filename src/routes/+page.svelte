<script lang="ts">
  import HomeLanding from "$lib/components/HomeLanding.svelte";
  import SeoHead from "$lib/components/SeoHead.svelte";
  import { SITE_DESCRIPTION, SITE_NAME } from "$lib/seo/site-config";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
</script>

<SeoHead title={SITE_NAME} description={SITE_DESCRIPTION} path="/" isHome />

<HomeLanding projects={data.projects} />
