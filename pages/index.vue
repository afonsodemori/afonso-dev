import colors from 'tailwindcss/colors';
<script setup lang="ts">
  const { t } = useI18n();

  definePageMeta({
    layout: false,
  });

  useHead({
    title: t('head.home.title'),
  });
</script>

<template>
  <main>
    <div>
      <NavbarDropdown />
      <Header />
      <div class="bio">
        <p>{{ $t('home.bio') }}</p>
      </div>
      <HomeFooter />
    </div>
  </main>
</template>

<style scoped>
  :deep(.ttt) {
    position: absolute;
    top: 0;
    right: 0;
  }

  main {
    min-height: 90vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 2rem;
  }

  .bio {
    margin: auto;
    margin-top: 2rem;
    margin-bottom: 2rem;
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
