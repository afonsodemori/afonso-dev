<script setup lang="ts">
  const { locale, setLocale } = useI18n();
  const localePath = useLocalePath();
</script>

<template>
  <div>
    <button v-if="locale !== 'en'" title="See in English" @click="setLocale('en')">English</button>
    <button v-if="locale !== 'es'" title="Ver en español" @click="setLocale('es')">Español</button>
    <button v-if="locale !== 'pt'" title="Ver em Português" @click="setLocale('pt')">
      Português
    </button>
  </div>
  <ul>
    <li>
      <NuxtLink :to="localePath('index')">{{ $t('nav.home') }}</NuxtLink>
    </li>
    <li>
      <NuxtLink :to="localePath('curriculum')">{{ $t('nav.curriculum') }}</NuxtLink>
    </li>
    <li>
      <NuxtLink :to="localePath('contact')">{{ $t('nav.contact') }}</NuxtLink>
    </li>
  </ul>
</template>

<style scoped></style>
