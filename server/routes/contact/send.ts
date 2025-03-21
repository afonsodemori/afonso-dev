export default defineEventHandler(async (event) => {
  const { name, email, subject, message, token } = await readBody(event);

  if (!name || !email || !subject || !message) {
    setResponseStatus(event, 400);
    return { success: false, error: 'contact.form.missing_fields' };
  }

  if (process.env.NODE_ENV === 'development') {
    if (email.includes('.ok')) return { success: true, message: 'contact.form.success' };
    if (email.includes('.ko')) {
      setResponseStatus(event, 400);
      return { success: false, error: 'contact.form.failure' };
    }
  }

  if (!token) {
    setResponseStatus(event, 400);
    return { success: false, error: 'contact.form.missing_captcha' };
  }

  try {
    // Verify reCAPTCHA with Google
    const verifyData = await $fetch<{ success: boolean }>(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          secret: process.env.RECAPTCHA_SECRET!,
          response: token,
        }).toString(),
      },
    );

    if (!verifyData.success) {
      setResponseStatus(event, 403);
      return { success: false, error: 'contact.form.invalid_captcha' };
    }

    // Send Email using Resend
    const emailData = await $fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: {
        from: `${name} - via afonso.dev <${process.env.CONTACT_FROM}>`,
        to: process.env.CONTACT_TO,
        reply_to: email,
        subject,
        text: message,
      },
    });

    return { success: true, message: 'contact.form.success' };
  } catch (error) {
    setResponseStatus(event, 500);
    return { success: false, error: error.message };
  }
});
