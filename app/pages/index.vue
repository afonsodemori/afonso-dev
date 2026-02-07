<script setup lang="ts">
  definePageMeta({ layout: 'base' });

  const { t, locale, locales } = useI18n();
  const config = useRuntimeConfig();
  const route = useRoute();
  const host = config.public.websiteHost;

  const alternates = locales.value.map((lang) => ({
    rel: 'alternate',
    hreflang: lang.code,
    href: `${host}/${lang.code}${route.path.replace(`/${locale.value}`, '')}`,
  }));

  useHead({
    htmlAttrs: {
      lang: locale.value,
    },
    link: [{ rel: 'canonical', href: `${host}${route.path}` }, ...alternates],
  });

  useSeoMeta({
    title: t(`head.index.title`),
    description: t(`head.index.description`),
    ogTitle: t(`head.index.title`),
    ogDescription: t(`head.index.description`),
    ogImage: `${host}/static/icons/og.png`,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogUrl: `${host}${route.path}`,
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
