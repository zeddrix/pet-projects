<script lang="ts">
  import { base } from "$app/paths";
  import { page } from "$app/state";
  import { navItems, siteName } from "$lib/data/site";

  function navHref(href: string): string {
    return `${base}${href}`;
  }

  function isActive(matchPrefix: string | undefined): boolean {
    if (!matchPrefix) {
      return false;
    }

    const currentPath = page.url.pathname;
    const normalizedBase = base === "" ? "" : base;
    const fullPrefix = `${normalizedBase}${matchPrefix}`;

    return (
      currentPath === fullPrefix ||
      currentPath === `${fullPrefix}/` ||
      currentPath.startsWith(`${fullPrefix}/`)
    );
  }
</script>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container">
    <a class="navbar-brand site-brand text-white text-decoration-none" href="{base}/">
      {siteName}
    </a>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#siteNavbar"
      aria-controls="siteNavbar"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="siteNavbar">
      <ul class="navbar-nav ms-auto">
        {#each navItems as item (item.label)}
          <li class="nav-item">
            {#if item.external}
              <a
                class="nav-link"
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.label}
              </a>
            {:else}
              <a
                class="nav-link{isActive(item.matchPrefix) ? ' active' : ''}"
                href={navHref(item.href)}
              >
                {item.label}
              </a>
            {/if}
          </li>
        {/each}
      </ul>
    </div>
  </div>
</nav>
