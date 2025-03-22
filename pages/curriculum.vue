<script setup lang="ts">
  const { t, locale } = useI18n();

  useHead({
    title: t('head.curriculum.title'),
  });

  onMounted(() => {
    document.querySelectorAll<HTMLAnchorElement>('#cv-content a').forEach((a, index) => {
      if (index === 0) {
        const contact = `/${locale.value}/contact`;
        a.href = contact;
        a.addEventListener('click', (e) => {
          e.preventDefault();
          navigateTo(contact);
        });
      } else if (index !== 0 && index !== 3) a.setAttribute('target', '_blank');
    });
  });
</script>

<template>
  <div>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div id="cv-content" v-html="$t('curriculum.html')" />
  </div>
</template>

<style scoped>
  /* Layout changers */
  :deep(a) {
    color: blue;
    text-decoration: underline;
  }

  :deep(a:hover) {
    text-decoration: none;
  }

  :deep(.contact-separator:first-of-type) {
    display: block;
  }

  :deep(.contact-separator) {
    display: none;
  }

  :deep(img:first-of-type) {
    /* margin-top: 2rem; */
    margin-left: 0;
  }

  :deep(img) {
    display: inline-block;
    margin-left: 1.25rem;
    width: 12px;
    height: 12px;
  }

  /**
   * 
   */

  :deep(h1) {
    font-size: 2rem;
    line-height: 1.2;
    font-weight: 700;
  }

  :deep(h2) {
    margin: 2rem 0 0.75rem 0;
    font-size: 1.6rem;
  }

  :deep(strong),
  :deep(h2 strong),
  :deep(h3 strong) {
    font-weight: 600;
  }

  :deep(h4) {
    opacity: 0.55;
  }

  :deep(ul) {
    margin: 1rem 0 2rem 2.5rem;
    list-style-type: disc;
  }

  :deep(em:last-of-type) {
    display: block;
    opacity: 0.5;
    margin-top: 3rem;
    text-align: right;
    filter: grayscale(1);
  }

  @media screen and (prefers-color-scheme: dark) {
    :deep(a) {
      color: lightblue;
    }

    :deep(img) {
      opacity: 0.75;
      filter: invert(1);
    }
  }
</style>
