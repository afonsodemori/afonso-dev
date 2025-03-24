<script setup lang="ts">
  const { t, locale } = useI18n();

  useHead({
    title: t('head.curriculum.title'),
  });

  onMounted(() => {
    document.querySelectorAll<HTMLAnchorElement>('#page a').forEach((a, index) => {
      if (index === 0) {
        const contact = `/${locale.value}/contact`;
        a.href = contact;
        a.addEventListener('click', (e) => {
          e.preventDefault();
          navigateTo(contact);
        });
      } else if (index !== 0 && index !== 3) a.setAttribute('target', '_blank');
    });

    const paragraph = document.querySelector<HTMLParagraphElement>('#page')!.lastElementChild!;
    const em = paragraph.firstElementChild!;
    em.textContent = em.textContent!.split(' — ')[0];
  });
</script>

<template>
  <div class="containers">
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div id="page" v-html="$t('curriculum.html')" />
  </div>
</template>

<style scoped>
  /* Page */
  #page {
    transition-duration: 200ms;
    border-radius: 1rem;
    max-width: 980px;
    margin: auto;
    padding: 3rem;
    font:
      inherit 1rem/1.6 Inter,
      sans-serif;
    color: #000;
    text-align: justify;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
    background-color: rgba(255, 255, 255, 0.5);
  }

  .containers {
    transition-duration: 200ms;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  /* Layout changers */
  :deep(.contact-separator:first-of-type) {
    display: block;
    height: 2rem;
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

  /* Content formatting */
  :deep(a) {
    color: #155dfc;
    text-decoration: underline;
  }

  :deep(a:hover) {
    text-decoration: none;
  }

  :deep(h1) {
    font-size: 2rem;
    line-height: 1.2;
    /* font-weight: 700; */
  }

  :deep(h2) {
    margin: 2rem 0 0.75rem 0;
    font-size: 1.6rem;
  }

  :deep(strong),
  :deep(h2 strong),
  :deep(h3 strong) {
    /* font-weight: 600; */
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
    margin-top: 5rem;
    text-align: right;
  }

  @media screen and (prefers-color-scheme: dark) {
    #page {
      color: rgba(255, 255, 255, 0.8);
      background-color: rgba(0, 0, 0, 0.25);
      box-shadow: 0 0 1px 0 rgba(255, 255, 255, 0.75);
    }

    :deep(a) {
      color: #51a2ff;
    }

    :deep(img) {
      opacity: 0.75;
      filter: invert(1);
    }
  }

  @media screen and (max-width: 850px) {
    :deep(img) {
      margin-left: 0.75rem;
    }
  }

  @media screen and (max-width: 800px) {
    #page {
      padding: 2rem 1rem;
    }

    .containers {
      padding: 0.25rem;
    }
  }

  @media screen and (max-width: 750px) {
    #page {
      margin: inherit 0;
      text-align: left;
    }

    .containers {
      padding: 0;
    }

    :deep(.contact-separator) {
      display: block;
      height: 0.75rem;
    }

    :deep(img) {
      margin-left: 0;
    }

    :deep(ul) {
      margin-left: 1.5rem;
      text-align: left;
    }
  }
</style>
