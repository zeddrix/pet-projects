<script lang="ts">
  import { base } from "$app/paths";
  import { PUBLIC_SITE_URL } from "$env/static/public";
  import { buildPageMeta } from "$lib/seo/build-page-meta";
  import {
    buildHomeJsonLd,
    buildProjectPageJsonLd,
    serializeJsonLd,
  } from "$lib/seo/build-json-ld";
  import { resolvePublicSiteUrl } from "$lib/seo/resolve-public-site-url";
  import {
    APPLE_TOUCH_ICON_PATH,
    FAVICON_PATH,
    SITE_DESCRIPTION,
  } from "$lib/seo/site-config";

  interface Props {
    title: string;
    description?: string;
    path: string;
    isHome?: boolean;
    projectSlug?: string;
    projectSourceUrl?: string;
    noindex?: boolean;
  }

  let {
    title,
    description = SITE_DESCRIPTION,
    path,
    isHome = false,
    projectSlug,
    projectSourceUrl,
    noindex = false,
  }: Props = $props();

  const siteUrl = resolvePublicSiteUrl(
    PUBLIC_SITE_URL,
    `http://localhost:7213${base}`,
  );

  const meta = $derived(
    buildPageMeta({
      title,
      description,
      path,
      siteUrl,
      isHome,
    }),
  );

  const jsonLd = $derived.by(() => {
    const context = { siteUrl };
    if (isHome) {
      return serializeJsonLd(buildHomeJsonLd(context));
    }
    if (projectSlug && projectSourceUrl) {
      return serializeJsonLd(
        buildProjectPageJsonLd({
          ...context,
          slug: projectSlug,
          title,
          description: description ?? SITE_DESCRIPTION,
          sourceUrl: projectSourceUrl,
        }),
      );
    }
    return serializeJsonLd(buildHomeJsonLd(context));
  });
</script>

<svelte:head>
  <link rel="icon" href="{base}{FAVICON_PATH}" type="image/svg+xml" />
  <link rel="apple-touch-icon" href="{base}{APPLE_TOUCH_ICON_PATH}" />
  <title>{meta.title}</title>
  <meta name="description" content={meta.description} />
  <meta name="author" content={meta.author} />
  <meta
    name="robots"
    content={noindex ? "noindex, nofollow" : "index, follow"}
  />
  <link rel="canonical" href={meta.canonical} />

  <meta property="og:title" content={meta.ogTitle} />
  <meta property="og:description" content={meta.ogDescription} />
  <meta property="og:url" content={meta.ogUrl} />
  <meta property="og:type" content={meta.ogType} />
  <meta property="og:site_name" content={meta.ogSiteName} />
  <meta property="og:image" content={meta.ogImage} />

  <meta name="twitter:card" content={meta.twitterCard} />
  <meta name="twitter:title" content={meta.twitterTitle} />
  <meta name="twitter:description" content={meta.twitterDescription} />
  <meta name="twitter:image" content={meta.twitterImage} />

  {@html `<script type="application/ld+json">${jsonLd}</script>`}
</svelte:head>
