<script lang="ts">
  import { page } from "$app/stores";
  import { getProjectSidebarTheme } from "$lib/data/project-sidebar-themes";
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
  const theme = $derived(getProjectSidebarTheme(project.slug));
  const itemStyle = $derived(
    `--sidebar-primary: ${theme.primary}; --sidebar-accent: ${theme.accent}; --sidebar-primary-dark: ${theme.primaryDark};`,
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
  class="project-list-item block rounded-lg px-3 py-2 transition-all duration-200 ease-out motion-reduce:transition-none"
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
    background: color-mix(in srgb, var(--sidebar-primary) 12%, white);
    border-left: 2px solid transparent;
    color: var(--sidebar-primary-dark);
  }

  .project-list-item:hover:not([data-active="true"]) {
    background: color-mix(in srgb, var(--sidebar-primary) 20%, white);
    border-left-color: color-mix(
      in srgb,
      var(--sidebar-accent) 55%,
      transparent
    );
    box-shadow: 0 1px 2px rgb(0 0 0 / 0.05);
  }

  .project-list-item[data-active="true"] {
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
    color: color-mix(in srgb, var(--sidebar-primary-dark) 72%, white);
  }

  .project-list-item[data-active="true"] .project-list-item__description {
    color: rgb(255 255 255 / 0.82);
  }

  .deprecated-badge {
    background: rgb(254 243 199);
    color: rgb(146 64 14);
  }

  .project-list-item[data-active="true"] .deprecated-badge {
    background: rgb(255 255 255 / 0.2);
    color: white;
  }
</style>
