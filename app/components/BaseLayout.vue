<script setup lang="ts">
  useHead({
    link: [
      { rel: 'manifest', href: '/manifest.json' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
    script: [
      {
        id: 'cf-turnstile',
        src: `https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit`,
        async: false,
        defer: true,
      },
    ],
  });
</script>

<template>
  <slot />
</template>
