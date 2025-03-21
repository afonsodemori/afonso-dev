<script setup lang="ts">
  const { locale } = useI18n();

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
    <slot />
  </div>
</template>

<style scoped></style>
