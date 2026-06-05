<script lang="ts">
  import type { Project } from "$lib/types/project";
  import { buildVariantSourceUrl } from "$lib/utils/project-source-url";

  interface Props {
    project: Project;
  }

  let { project }: Props = $props();

  const hasVersions = $derived(
    project.versions !== undefined && project.versions.length > 0,
  );
  const showDualReason = $derived(Boolean(project.dualVersionReason));
</script>

<div class="project-info-content space-y-5">
  <header>
    <h3 class="text-lg font-semibold text-zinc-900">{project.title}</h3>
    <p class="mt-1 text-sm text-zinc-600">{project.description}</p>
  </header>

  <section>
    <h4 class="text-sm font-semibold uppercase tracking-wide text-zinc-500">
      Created
    </h4>
    <p class="mt-1 text-sm text-zinc-800">{project.developedAt}</p>
  </section>

  {#if hasVersions && project.versions}
    {#each project.versions as version (version.id)}
      <section>
        <h4 class="text-sm font-semibold uppercase tracking-wide text-zinc-500">
          {version.label}
        </h4>
        <ul class="mt-2 flex flex-wrap gap-2">
          {#each version.techStack as item (item)}
            <li
              class="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-700"
            >
              {item}
            </li>
          {/each}
        </ul>
        {#if version.note}
          <p class="mt-2 text-sm text-zinc-600">{version.note}</p>
        {/if}
        <a
          href={buildVariantSourceUrl(project.slug, version.folderPath)}
          target="_blank"
          rel="noopener noreferrer"
          class="mt-2 inline-block text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-800 hover:underline"
        >
          Open {version.label} folder
        </a>
      </section>
    {/each}
  {:else if project.techStack}
    <section>
      <h4 class="text-sm font-semibold uppercase tracking-wide text-zinc-500">
        Tech stack
      </h4>
      <ul class="mt-2 flex flex-wrap gap-2">
        {#each project.techStack as item (item)}
          <li
            class="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-700"
          >
            {item}
          </li>
        {/each}
      </ul>
    </section>
  {/if}

  {#if showDualReason && project.dualVersionReason}
    <section>
      <h4 class="text-sm font-semibold uppercase tracking-wide text-zinc-500">
        Why two versions
      </h4>
      <p class="mt-1 text-sm leading-relaxed text-zinc-700">
        {project.dualVersionReason}
      </p>
    </section>
  {/if}

  <section>
    <h4 class="text-sm font-semibold uppercase tracking-wide text-zinc-500">
      Repository
    </h4>
    <a
      href={project.sourceUrl}
      target="_blank"
      rel="noopener noreferrer"
      class="mt-1 inline-block text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-800 hover:underline"
    >
      View in monorepo
    </a>
  </section>
</div>
