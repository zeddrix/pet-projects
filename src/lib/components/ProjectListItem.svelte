<script lang="ts">
  import { page } from "$app/stores";
  import { getProjectSidebarTheme } from "$lib/data/project-sidebar-themes";
  import { appPath } from "$lib/utils/app-path";
  import type { Project } from "$lib/types/project";

  interface Props {
    project: Project;
    activeSlug?: string | null;
    onselect?: () => void;
  }

  let { project, activeSlug, onselect }: Props = $props();

  const href = $derived(appPath(`/project/${project.slug}`));
  const isActive = $derived(
    activeSlug !== undefined
      ? activeSlug === project.slug
      : $page.url.pathname.endsWith(`/project/${project.slug}`),
  );
  const theme = $derived(getProjectSidebarTheme(project.slug));
  const itemStyle = $derived(
    `--sidebar-primary: ${theme.primary}; --sidebar-accent: ${theme.accent};`,
  );
</script>

<a
  {href}
  data-testid="project-list-item"
  data-slug={project.slug}
  data-active={isActive ? "true" : "false"}
  data-sidebar-primary={theme.primary}
  data-sidebar-accent={theme.accent}
  aria-current={isActive ? "page" : undefined}
  style={itemStyle}
  class="project-list-item block rounded-lg px-3 py-2"
  onclick={onselect}
>
  <div class="flex items-start justify-between gap-2">
    <span class="font-medium">{project.title}</span>
    {#if project.deprecated}
      <span
        data-testid="deprecated-badge"
        class="deprecated-badge shrink-0 rounded px-1.5 py-0.5 text-xs font-medium"
      >
        deprecated
      </span>
    {/if}
  </div>
  <p class="project-list-item__description mt-0.5 text-sm">
    {project.description}
  </p>
</a>

<style>
  .project-list-item {
    background: var(--sidebar-primary);
    border-left: 3px solid var(--sidebar-accent);
    color: white;
    box-shadow: 0 1px 2px rgb(0 0 0 / 0.08);
  }

  .project-list-item:focus-visible {
    outline: 2px solid var(--sidebar-accent);
    outline-offset: 2px;
  }

  .project-list-item__description {
    color: rgb(255 255 255 / 0.82);
  }

  .deprecated-badge {
    background: rgb(255 255 255 / 0.2);
    color: white;
  }
</style>
