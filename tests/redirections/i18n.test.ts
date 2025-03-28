import request from 'supertest';
import { describe, it, expect } from 'vitest';

const BASE_URL = 'http://localhost:3000';

describe('i18n Redirection Tests', () => {
  it('Should redirect naked domain to default locale', async () => {
    const response = await request(BASE_URL).get('/');

    expect(response.status).toBe(302);
    expect(response.headers.location).toBe('/en');
    expect(response.headers['set-cookie'][0]).toMatch(/^i18n_redirected=en; Path=\//);
  });

  [
    {
      acceptLanguage: 'fr-FR',
      expectedLocation: '/en',
      expectedCookie: /^i18n_redirected=en; Path=\//,
    },
    {
      acceptLanguage: 'pt-BR',
      expectedLocation: '/pt',
      expectedCookie: /^i18n_redirected=pt; Path=\//,
    },
    {
      acceptLanguage: 'es-ES',
      expectedLocation: '/es',
      expectedCookie: /^i18n_redirected=es; Path=\//,
    },
  ].forEach(({ acceptLanguage, expectedLocation, expectedCookie }) => {
    it(`Should respect Accept-Language header: ${acceptLanguage} for /`, async () => {
      const response = await request(BASE_URL).get('/').set('Accept-Language', acceptLanguage);

      expect(response.status).toBe(302);
      expect(response.headers.location).toBe(expectedLocation);
      expect(response.headers['set-cookie'][0]).toMatch(expectedCookie);
    });
  });

  [
    {
      acceptLanguage: 'fr-FR',
      expectedLocation: '/en/resume',
      expectedCookie: /^i18n_redirected=en; Path=\//,
    },
    {
      acceptLanguage: 'pt-BR',
      expectedLocation: '/pt/resume',
      expectedCookie: /^i18n_redirected=pt; Path=\//,
    },
    {
      acceptLanguage: 'es-ES',
      expectedLocation: '/es/resume',
      expectedCookie: /^i18n_redirected=es; Path=\//,
    },
  ].forEach(({ acceptLanguage, expectedLocation, expectedCookie }) => {
    it(`Should respect Accept-Language header: ${acceptLanguage} for /resume`, async () => {
      const response = await request(BASE_URL)
        .get('/resume')
        .set('Accept-Language', acceptLanguage);

      expect(response.status).toBe(302);
      expect(response.headers.location).toBe(expectedLocation);
      expect(response.headers['set-cookie'][0]).toMatch(expectedCookie);
    });
  });

  [
    {
      acceptLanguage: 'fr-FR',
      expectedLocation: '/en/contact',
      expectedCookie: /^i18n_redirected=en; Path=\//,
    },
    {
      acceptLanguage: 'pt-BR',
      expectedLocation: '/pt/contact',
      expectedCookie: /^i18n_redirected=pt; Path=\//,
    },
    {
      acceptLanguage: 'es-ES',
      expectedLocation: '/es/contact',
      expectedCookie: /^i18n_redirected=es; Path=\//,
    },
  ].forEach(({ acceptLanguage, expectedLocation, expectedCookie }) => {
    it(`Should respect Accept-Language header: ${acceptLanguage} for /contact`, async () => {
      const response = await request(BASE_URL)
        .get('/contact')
        .set('Accept-Language', acceptLanguage);

      expect(response.status).toBe(302);
      expect(response.headers.location).toBe(expectedLocation);
      expect(response.headers['set-cookie'][0]).toMatch(expectedCookie);
    });
  });

  it('Should respect cookie over Accept-Language header', async () => {
    const response = await request(BASE_URL)
      .get('/resume')
      .set('Accept-Language', 'es-ES')
      .set('Cookie', 'i18n_redirected=pt; Path=/');

    expect(response.status).toBe(302);
    expect(response.headers.location).toBe('/pt/resume');
    expect(response.headers['set-cookie']).toBeUndefined();
  });

  it('Should not redirect if URL and cookie mismatch', async () => {
    const response = await request(BASE_URL)
      .get('/pt/resume')
      .set('Accept-Language', 'en-US')
      .set('Cookie', 'i18n_redirected=es; Path=/');

    expect(response.status).toBe(200);
    expect(response.headers.location).toBeUndefined();
    expect(response.headers['set-cookie'][0]).toMatch(/^i18n_redirected=pt; Path=\//);
  });
});
