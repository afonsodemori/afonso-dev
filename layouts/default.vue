<script setup lang="ts">
  const { locale, t } = useI18n();
  const localePath = useLocalePath();

  useHead({
    htmlAttrs: {
      lang: locale,
    },
    title: 'afonso.dev',
    meta: [
      { name: 'description', content: '' },
      { name: 'keywords', content: '' },
    ],
  });
</script>

<template>
  <div>
    <Navbar />
    <Header />
    <div class="my-10">
      <slot />
    </div>
    <USeparator />
    <div class="m-5 text-center text-sm text-neutral-500">
      <p>Afonso de Mori - {{ $t('home.title') }}</p>
      <p>
        <ULink :to="localePath('index')">Home</ULink>
        |
        <ULink to="/linkedin" target="_blank">LinkedIn</ULink>
        |
        <ULink to="/github" target="_blank">GitHub</ULink>
        |
        <ULink :to="localePath('contact')">{{ t('nav.contact') }}</ULink>
      </p>
    </div>
  </div>
</template>

<style scoped></style>
