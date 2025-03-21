<script setup lang="ts">
  const { t } = useI18n();
  const config = useRuntimeConfig();

  const isDevelopment = config.public.nodeEnv === 'development';

  const siteKey = config.public.recaptchaSiteKey;
  const form = ref({
    name: '',
    email: '',
    subject: t('contact.form.sample.subject'),
    message: '',
  });
  const loading = ref(false);
  const success = ref();
  const responseMessage = ref('');

  useHead({
    script: [
      {
        src: `https://www.google.com/recaptcha/api.js?render=${siteKey}`,
        async: true,
        defer: true,
      },
    ],
  });

  if (isDevelopment) {
    form.value.name = t('contact.form.sample.name');
    form.value.email = t('contact.form.sample.email');
    form.value.message = t('contact.form.sample.message');
  }

  useHead({
    title: t('head.contact.title'),
  });

  async function onSubmit(event: Event) {
    event.preventDefault();
    loading.value = true;
    responseMessage.value = '';

    try {
      const token = await grecaptcha.execute(siteKey, { action: 'submit' });

      const res = await fetch('/contact/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form.value, token }),
      });

      const data = await res.json();
      success.value = data.success;
      if (data.success) {
        form.value = { name: '', email: '', subject: '', message: '' };
      }
      responseMessage.value = t(data.message || data.error);
    } catch (error) {
      console.error(error);
      responseMessage.value = t('contact.form.unexpected');
    } finally {
      loading.value = false;
    }
  }
</script>

<template>
  <div>
    <form @submit="onSubmit">
      <div>
        <label>
          {{ t('contact.form.name') }}:
          <input v-model="form.name" type="text" name="name" required />
        </label>
      </div>
      <div>
        <label>
          {{ t('contact.form.email') }}:
          <input v-model="form.email" type="email" name="email" required />
        </label>
      </div>
      <div>
        <label>
          {{ t('contact.form.subject') }}:
          <input v-model="form.subject" type="text" name="subject" required />
        </label>
      </div>
      <div>
        <label>
          {{ t('contact.form.message') }}:
          <textarea v-model="form.message" name="message" required />
        </label>
      </div>

      <button type="submit" :disabled="loading">
        {{ loading ? t('contact.form.submitting') : t('contact.form.submit') }}
      </button>
    </form>

    <span v-if="responseMessage" :class="success ? 'result success' : 'result error'">
      {{ responseMessage }}
    </span>
  </div>
</template>

<style scoped></style>
