<script lang="ts">
  import { appPath } from "$lib/utils/app-path";
  import {
    monorepoAboutAuthorName,
    monorepoAboutSections,
    type MonorepoAboutPart,
  } from "$lib/data/monorepo-about-copy";
  import {
    GITHUB_PROFILE,
    GITHUB_REPO,
    PORTFOLIO_URL,
    SITE_TAGLINE,
  } from "$lib/seo/site-config";
  import type { Project } from "$lib/types/project";

  interface Props {
    projects: Project[];
    class?: string;
  }

  let { projects, class: className = "" }: Props = $props();

  function partKey(part: MonorepoAboutPart, index: number): string {
    if (part.kind === "link") {
      return `link-${part.href}`;
    }
    return `${part.kind}-${index}`;
  }
</script>

<div
  data-testid="home-landing"
  class="playground-about-pane flex-1 overflow-y-auto px-6 py-5 text-zinc-800 {className}"
>
  <article data-testid="about-pane-content" class="mx-auto w-full max-w-3xl">
    <header>
      <p class="text-sm font-medium uppercase tracking-wide text-indigo-600">
        {SITE_TAGLINE}
      </p>
      <h1 class="mt-2 text-3xl font-semibold tracking-tight text-zinc-900">
        {monorepoAboutAuthorName}
      </h1>
    </header>

    {#each monorepoAboutSections as section (section.id)}
      <section
        class="mt-8 {section.callout
          ? 'rounded-lg border border-zinc-200 bg-zinc-50 p-4'
          : ''}"
      >
        <h2 class="text-lg font-semibold text-zinc-900">{section.heading}</h2>
        {#each section.paragraphs as paragraph, paragraphIndex (paragraphIndex)}
          <p class="mt-3 leading-relaxed text-zinc-700">
            {#each paragraph as part, partIndex (partKey(part, partIndex))}
              {#if part.kind === "text"}
                {part.value}
              {:else if part.kind === "strong"}
                <strong class="font-semibold text-zinc-900">{part.value}</strong
                >
              {:else if part.kind === "link"}
                <a
                  href={part.href}
                  target={part.external ? "_blank" : undefined}
                  rel={part.external ? "noopener noreferrer" : undefined}
                  class="font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-500"
                >
                  {part.label}
                </a>
              {/if}
            {/each}
          </p>
        {/each}
      </section>
    {/each}

    <section class="mt-10" aria-labelledby="project-index-heading">
      <h2
        id="project-index-heading"
        class="text-lg font-semibold tracking-tight text-zinc-900"
      >
        Project index
      </h2>
      <p class="mt-2 text-zinc-600">
        Browse every demo in the live playground.
      </p>

      <ul
        data-testid="home-project-index"
        class="mt-4 grid gap-3 sm:grid-cols-2"
      >
        {#each projects as project (project.slug)}
          <li>
            <a
              data-testid="home-project-link"
              data-slug={project.slug}
              href={appPath(`/project/${project.slug}`)}
              class="group block h-full rounded-lg border border-zinc-200 bg-white p-4 shadow-sm transition hover:border-zinc-300 hover:shadow-md"
            >
              <h3
                class="text-base font-semibold text-zinc-900 group-hover:text-indigo-700"
              >
                {project.title}
              </h3>
              <p class="mt-1 text-sm leading-relaxed text-zinc-600">
                {project.description}
              </p>
              <p
                class="mt-2 text-xs font-medium uppercase tracking-wide text-zinc-400"
              >
                {project.developedAt}
              </p>
            </a>
          </li>
        {/each}
      </ul>
    </section>

    <footer class="mt-10 border-t border-zinc-200 pt-6 text-sm text-zinc-600">
      <p>
        <span class="font-medium text-zinc-900">{monorepoAboutAuthorName}</span>
        —
        <a href={GITHUB_PROFILE} class="underline hover:text-zinc-900">GitHub</a
        >
        ·
        <a href={GITHUB_REPO} class="underline hover:text-zinc-900"
          >Source repo</a
        >
        ·
        <a href={PORTFOLIO_URL} class="underline hover:text-zinc-900"
          >Portfolio</a
        >
      </p>
    </footer>
  </article>
</div>
