<script setup lang="ts">
  import * as z from 'zod';
  import type { FormSubmitEvent } from '@nuxt/ui';

  const { locale, t } = useI18n();
  const config = useRuntimeConfig();
  const host = config.public.host;

  const isDevelopment = config.public.nodeEnv === 'development';
  const siteKey = config.public.recaptchaSiteKey;

  useHead({
    htmlAttrs: { lang: locale.value },
    script: [
      {
        id: 'recaptcha-script',
        src: `https://www.google.com/recaptcha/api.js?render=${siteKey}`,
        async: true,
        defer: true,
      },
    ],
    link: [
      { rel: 'canonical', href: `${host}/${locale.value}/contact` },
      { rel: 'alternate', hreflang: 'en', href: `${host}/en/contact` },
      { rel: 'alternate', hreflang: 'es', href: `${host}/es/contact` },
      { rel: 'alternate', hreflang: 'pt', href: `${host}/pt/contact` },
      { rel: 'manifest', href: '/manifest.json' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  });

  useSeoMeta({
    title: t(`head.contact.title`),
    description: t(`head.contact.description`),
    ogTitle: t(`head.contact.title`),
    ogDescription: t(`head.contact.description`),
    ogImage: `${host}/static/icons/og.png`,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogUrl: `${host}/${locale.value}/contact`,
    twitterTitle: t(`head.contact.title`),
    twitterDescription: t(`head.contact.description`),
    twitterImage: `${host}/static/icons/og.png`,
    twitterCard: 'summary',
  });

  onBeforeUnmount(() => {
    document.querySelector('.grecaptcha-badge')?.remove();
  });

  const schema = z.object({
    name: z.string().nonempty(t('contact.form.required')),
    email: z.string().email(t('contact.form.invalid_email')),
    subject: z.string().nonempty(t('contact.form.required')),
    message: z.string().nonempty(t('contact.form.required')),
  });

  type Schema = z.output<typeof schema>;
  const state = reactive<Partial<Schema>>({
    name: isDevelopment ? t('contact.form.sample.name') : undefined,
    email: isDevelopment ? t('contact.form.sample.email') : undefined,
    subject: t('contact.form.sample.subject'),
    message: isDevelopment ? t('contact.form.sample.message') : undefined,
  });
  const loading = ref(false);

  const toast = useToast();
  async function onSubmit(_event: FormSubmitEvent<Schema>) {
    loading.value = true;
    try {
      const token = await grecaptcha.execute(siteKey, { action: 'submit' });
      const res = await fetch('/contact/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: state.name,
          email: state.email,
          subject: state.subject,
          message: state.message,
          token,
        }),
      });

      const data = await res.json();
      if (data.success) {
        state.name = undefined;
        state.email = undefined;
        state.subject = undefined;
        state.message = undefined;
      }

      toast.add({
        title: t(data.message || data.error),
        color: data.success ? 'success' : 'error',
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.add({ title: t(error.message), color: 'error' });
      }
    } finally {
      loading.value = false;
    }
  }
</script>

<template>
  <UContainer class="pb-10" style="min-height: 60vh">
    <UForm :schema="schema" :state="state" class="space-y-4 max-w-180 m-auto" @submit="onSubmit">
      <UFormField :label="$t('contact.form.name')" name="name">
        <UInput v-model="state.name" :disabled="loading" size="xl" class="w-full" />
      </UFormField>

      <UFormField :label="$t('contact.form.email')" name="email">
        <UInput v-model="state.email" :disabled="loading" size="xl" class="w-full" />
      </UFormField>

      <UFormField :label="$t('contact.form.subject')" name="subject">
        <UInput v-model="state.subject" :disabled="loading" size="xl" class="w-full" />
      </UFormField>

      <UFormField :label="$t('contact.form.message')" name="message">
        <UTextarea
          v-model="state.message"
          :disabled="loading"
          size="xl"
          :rows="10"
          :maxrows="15"
          autoresize
          class="w-full"
        />
      </UFormField>

      <UButton :disabled="loading" type="submit" class="py-2">
        {{ loading ? $t('contact.form.submitting') : $t('contact.form.submit') }}
      </UButton>
    </UForm>
  </UContainer>
</template>
