import request from 'supertest';
import { describe, it, expect } from 'vitest';

const BASE_URL = 'http://localhost:3000';

describe('Legacy Redirection Tests', () => {
  [
    { path: '/cv', expectedLocation: '/resume' },
    { path: '/cv/en', expectedLocation: '/en/resume' },
    { path: '/cv/es', expectedLocation: '/es/resume' },
    { path: '/cv/pt', expectedLocation: '/pt/resume' },
    { path: '/contact/en', expectedLocation: '/en/contact' },
    { path: '/contact/es', expectedLocation: '/es/contact' },
    { path: '/contact/pt', expectedLocation: '/pt/contact' },
    { path: '/curriculum', expectedLocation: '/resume' },
    { path: '/en/curriculum', expectedLocation: '/en/resume' },
    { path: '/es/curriculum', expectedLocation: '/es/resume' },
    { path: '/pt/curriculum', expectedLocation: '/pt/resume' },
  ].forEach(({ path, expectedLocation }) => {
    it(`Should redirect: ${path}`, async () => {
      const response = await request(BASE_URL).get(path);

      expect(response.status).toBe(308);
      expect(response.headers.location).toBe(expectedLocation);
    });
  });
});
