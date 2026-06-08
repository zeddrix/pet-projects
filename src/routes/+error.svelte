<script lang="ts">
  import { page } from "$app/stores";
  import SeoHead from "$lib/components/SeoHead.svelte";
  import { appPath } from "$lib/utils/app-path";
</script>

<SeoHead title="Page not found" path={$page.url.pathname} noindex />

<div class="flex h-[100dvh] items-center justify-center p-8 text-center">
  <div>
    <h1 class="text-2xl font-semibold text-slate-900">
      {$page.status} — {$page.error?.message ?? "Something went wrong"}
    </h1>
    <a
      href={appPath("/")}
      class="mt-4 inline-block text-slate-600 hover:underline"
    >
      Go home
    </a>
  </div>
</div>
