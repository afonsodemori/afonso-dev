import request from 'supertest';
import { describe, it, expect } from 'vitest';

const BASE_URL = 'http://localhost:3000';

describe('Profile Redirection Tests', () => {
  [
    { path: 'in', expectedLocation: 'https://www.linkedin.com/in/afonsodemori/' },
    { path: 'linkedin', expectedLocation: 'https://www.linkedin.com/in/afonsodemori/' },
    { path: 'gh', expectedLocation: 'https://github.com/afonsodemori' },
    { path: 'github', expectedLocation: 'https://github.com/afonsodemori' },
  ].forEach(({ path, expectedLocation }) => {
    it(`Should redirect: /${path}`, async () => {
      const response = await request(BASE_URL).get(`/${path}`);

      expect(response.status).toBe(308);
      expect(response.headers.location).toBe(expectedLocation);
    });
  });
});
