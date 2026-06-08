<script lang="ts">
  import { appPath } from "$lib/utils/app-path";
  import {
    AUTHOR_NAME,
    GITHUB_PROFILE,
    GITHUB_REPO,
    PORTFOLIO_URL,
    SITE_TAGLINE,
  } from "$lib/seo/site-config";
  import type { Project } from "$lib/types/project";

  interface Props {
    projects: Project[];
  }

  let { projects }: Props = $props();

  const defaultPlaygroundPath = appPath("/project/github-finder-jsx");
</script>

<div
  data-testid="home-landing"
  class="h-[100dvh] overflow-y-auto bg-gradient-to-b from-zinc-50 to-white text-zinc-900"
>
  <main class="mx-auto max-w-5xl px-6 py-12 md:py-16">
    <header class="max-w-3xl">
      <p class="text-sm font-medium uppercase tracking-wide text-indigo-600">
        {SITE_TAGLINE}
      </p>
      <h1
        class="mt-3 text-4xl font-semibold tracking-tight text-zinc-900 md:text-5xl"
      >
        {AUTHOR_NAME}
      </h1>
      <p class="mt-4 text-lg leading-relaxed text-zinc-600">
        Developer and curator of a personal archive of pre-AI web demos. This
        playground hosts interactive previews of sixteen projects from
        2018-2021, with source code on
        <a
          href={GITHUB_REPO}
          class="font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-500"
          >GitHub</a
        >.
      </p>
      <div class="mt-8 flex flex-wrap gap-3">
        <a
          data-testid="home-open-playground"
          href={defaultPlaygroundPath}
          class="inline-flex items-center rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
        >
          Open playground
        </a>
        <a
          href={PORTFOLIO_URL}
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center rounded-lg border border-zinc-300 bg-white px-5 py-2.5 text-sm font-medium text-zinc-800 transition-colors hover:border-zinc-400"
        >
          Portfolio
        </a>
      </div>
    </header>

    <section class="mt-14" aria-labelledby="project-index-heading">
      <h2
        id="project-index-heading"
        class="text-2xl font-semibold tracking-tight text-zinc-900"
      >
        Project index
      </h2>
      <p class="mt-2 text-zinc-600">
        Browse every demo in the live playground.
      </p>

      <ul
        data-testid="home-project-index"
        class="mt-6 grid gap-4 sm:grid-cols-2"
      >
        {#each projects as project (project.slug)}
          <li>
            <a
              data-testid="home-project-link"
              data-slug={project.slug}
              href={appPath(`/project/${project.slug}`)}
              class="group block h-full rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-zinc-300 hover:shadow-md"
            >
              <h3
                class="text-lg font-semibold text-zinc-900 group-hover:text-indigo-700"
              >
                {project.title}
              </h3>
              <p class="mt-2 text-sm leading-relaxed text-zinc-600">
                {project.description}
              </p>
              <p
                class="mt-3 text-xs font-medium uppercase tracking-wide text-zinc-400"
              >
                {project.developedAt}
              </p>
            </a>
          </li>
        {/each}
      </ul>
    </section>

    <footer class="mt-16 border-t border-zinc-200 pt-8 text-sm text-zinc-600">
      <p>
        <span class="font-medium text-zinc-900">{AUTHOR_NAME}</span>
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
  </main>
</div>
