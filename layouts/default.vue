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
    <UContainer class="p-10" style="max-width: 900px; min-height: 85vh">
      <slot />
    </UContainer>
    <USeparator />
    <div class="m-5 text-center text-sm text-neutral-500">Afonso de Mori - afonso.dev</div>
  </div>
</template>

<style scoped></style>
