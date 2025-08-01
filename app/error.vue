<script setup lang="ts">
  import type { NuxtError } from '#app';

  const { locale, t } = useI18n();
  const { error } = defineProps<{
    error: NuxtError;
  }>();

  useHead({
    htmlAttrs: {
      lang: locale.value,
    },
    title: `${t('error.error')} ${error.statusCode} - afonso.dev`,
  });
</script>

<template>
  <main>
    <h1 class="text-secondary-500">{{ error.statusCode }}</h1>
    <p class="details">{{ t('error.title') }}</p>
    <UButton style="margin-top: 2rem" to="/" icon="i-lucide-home">{{ t('nav.index') }}</UButton>
    <USeparator style="margin: 3rem 0" />
    <p class="message">{{ error.statusMessage }}</p>
    <p class="details">{{ t('error.details') }}</p>
  </main>
</template>

<style scoped>
  main {
    padding-top: 3rem;
    text-align: center;
  }

  h1 {
    font-size: 4em;
    font-weight: 700;
  }

  .message {
    font-weight: 600;
  }

  .details {
    opacity: 0.5;
    font-style: italic;
  }
</style>
