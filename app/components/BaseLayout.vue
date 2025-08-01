<script setup lang="ts">
  import { watch } from 'vue';

  const { locale, locales, t } = useI18n();
  const config = useRuntimeConfig();
  const host = config.public.host;
  const route = useRoute();

  const updateMetaTags = () => {
    const routeName = route.name?.toString().split('___')[0];
    const alternates = locales.value.map((lang) => ({
      rel: 'alternate',
      hreflang: lang.code,
      href: `${host}/${lang.code}${route.path.replace(`/${locale.value}`, '')}`,
    }));

    useHead({
      htmlAttrs: {
        lang: locale.value,
      },
      link: [
        { rel: 'canonical', href: `${host}${route.path}` },
        ...alternates,
        { rel: 'manifest', href: '/manifest.json' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'icon', href: '/favicon.ico' },
      ],
    });

    useSeoMeta({
      title: t(`head.${routeName}.title`),
      description: t(`head.${routeName}.description`),
      ogTitle: t(`head.${routeName}.title`),
      ogDescription: t(`head.${routeName}.description`),
      ogImage: `${host}/static/icons/og.png`,
      ogImageWidth: 1200,
      ogImageHeight: 630,
      ogUrl: `${host}${route.path}`,
      twitterTitle: t(`head.${routeName}.title`),
      twitterDescription: t(`head.${routeName}.description`),
      twitterImage: `${host}/static/icons/og.png`,
      twitterCard: 'summary',
    });
  };

  updateMetaTags();

  watch(() => route.path, updateMetaTags);
</script>

<template>
  <slot />
</template>
