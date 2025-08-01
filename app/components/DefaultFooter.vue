<script setup lang="ts">
  const { t } = useI18n();
  const localePath = useLocalePath();
</script>

<template>
  <div>
    <USeparator />
    <div class="m-5 text-center text-sm text-neutral-500">
      <p>Afonso de Mori - {{ $t('index.title') }}</p>
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
