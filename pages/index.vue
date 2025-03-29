<script setup lang="ts">
  definePageMeta({ layout: false });

  const { locale, t } = useI18n();
  const config = useRuntimeConfig();
  const host = config.public.host;

  useHead({
    htmlAttrs: { lang: locale.value },
    link: [
      { rel: 'canonical', href: `${host}/${locale.value}` },
      { rel: 'alternate', hreflang: 'en', href: `${host}/en` },
      { rel: 'alternate', hreflang: 'es', href: `${host}/es` },
      { rel: 'alternate', hreflang: 'pt', href: `${host}/pt` },
      { rel: 'manifest', href: '/manifest.json' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  });

  useSeoMeta({
    title: t(`head.index.title`),
    description: t(`head.index.description`),
    ogTitle: t(`head.index.title`),
    ogDescription: t(`head.index.description`),
    ogImage: `${host}/static/icons/og.png`,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogUrl: `${host}/${locale.value}`,
    twitterTitle: t(`head.index.title`),
    twitterDescription: t(`head.index.description`),
    twitterImage: `${host}/static/icons/og.png`,
    twitterCard: 'summary',
  });
</script>

<template>
  <main>
    <NavbarDropdown />
    <Header />
    <div class="bio">
      <p>{{ $t('index.bio') }}</p>
    </div>
    <HomeFooter />
  </main>
</template>

<style scoped>
  main {
    min-height: 90vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 2rem;
  }

  .bio {
    margin: 2rem auto;
    max-width: 700px;
    text-align: center;
    font-weight: 200;
    font-size: 110%;
  }

  @media only screen and (min-width: 1200px) {
    main {
      font-size: 120%;
    }

    .bio {
      max-width: 910px;
      font-size: 120%;
      line-height: 1.6;
    }
  }

  @media only screen and (max-width: 600px) {
    main {
      padding: 1rem;
    }
  }
</style>
