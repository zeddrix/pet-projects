<script lang="ts">
  import { page } from "$app/stores";
  import { appPath } from "$lib/utils/app-path";
  import type { Project } from "$lib/types/project";

  interface Props {
    project: Project;
    onselect?: () => void;
  }

  let { project, onselect }: Props = $props();

  const href = $derived(appPath(`/project/${project.slug}`));
  const isActive = $derived(
    $page.url.pathname.endsWith(`/project/${project.slug}`),
  );
</script>

<a
  {href}
  data-testid="project-list-item"
  data-slug={project.slug}
  data-active={isActive ? "true" : "false"}
  aria-current={isActive ? "page" : undefined}
  class="block rounded-lg border-l-2 px-3 py-2 transition-all duration-200 ease-out motion-reduce:transition-none {isActive
    ? 'border-indigo-600 bg-zinc-900 text-white shadow-sm'
    : 'border-transparent text-zinc-700 hover:border-zinc-300 hover:bg-zinc-100 hover:shadow-sm'}"
  onclick={onselect}
>
  <div class="flex items-start justify-between gap-2">
    <span class="font-medium">{project.title}</span>
    {#if project.deprecated}
      <span
        data-testid="deprecated-badge"
        class="shrink-0 rounded bg-amber-100 px-1.5 py-0.5 text-xs font-medium text-amber-800"
      >
        deprecated
      </span>
    {/if}
  </div>
  <p class="mt-0.5 text-sm {isActive ? 'text-zinc-300' : 'text-zinc-500'}">
    {project.description}
  </p>
</a>
