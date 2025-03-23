<script setup lang="ts">
  const { t } = useI18n();

  useHead({
    title: t('head.home.title'),
  });
</script>

<template>
  <UContainer style="min-height: 60vh">
    <p class="text-center text-2xl font-light">{{ $t('home.bio') }}</p>
  </UContainer>
</template>

<style scoped></style>
