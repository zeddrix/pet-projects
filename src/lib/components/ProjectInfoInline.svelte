<script lang="ts">
  import ProjectInfoContent from "./ProjectInfoContent.svelte";
  import type { Project } from "$lib/types/project";

  interface Props {
    project: Project;
    expanded: boolean;
  }

  let { project, expanded }: Props = $props();
</script>

<div
  id="project-info-surface"
  data-testid="project-info-surface"
  class="shrink-0 border-b border-zinc-200 bg-zinc-50/90"
>
  <div
    data-testid="project-info-inline"
    data-expanded={expanded ? "true" : "false"}
    class="overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out motion-reduce:transition-none"
    class:project-info-inline--expanded={expanded}
    class:project-info-inline--collapsed={!expanded}
    aria-hidden={!expanded}
  >
    <div class="px-4 py-4 md:px-6">
      <ProjectInfoContent {project} />
    </div>
  </div>
</div>

<style>
  .project-info-inline--expanded {
    max-height: 40rem;
    opacity: 1;
  }

  .project-info-inline--collapsed {
    max-height: 0;
    opacity: 0;
  }
</style>
