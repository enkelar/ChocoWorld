import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../app.js';
import User from '../../models/userModel.js';

process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-secret';
process.env.R2_BUCKET_NAME = process.env.R2_BUCKET_NAME || 'test-bucket';
process.env.R2_PUBLIC_URL = process.env.R2_PUBLIC_URL || 'https://pub-test.r2.dev';

describe('authController', () => {
  describe('POST /api/auth/login', () => {
    it('rejects missing credentials', async () => {
      const res = await request(app).post('/api/auth/login').send({});
      expect(res.status).toBe(400);
    });

    it('rejects an unknown email', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'nobody@test.com', password: 'whatever' });
      expect(res.status).toBe(401);
    });

    it('rejects a wrong password', async () => {
      await User.create({ name: 'A', email: 'a@test.com', password: 'correct123' });
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'a@test.com', password: 'wrong123' });
      expect(res.status).toBe(401);
    });

    it('logs in successfully and sets a cookie', async () => {
      await User.create({ name: 'A', email: 'b@test.com', password: 'correct123', isAdmin: true });
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'b@test.com', password: 'correct123' });

      expect(res.status).toBe(200);
      expect(res.body.user.email).toBe('b@test.com');
      expect(res.headers['set-cookie']?.[0]).toMatch(/^token=/);
    });
  });

  describe('POST /api/auth/logout', () => {
    it('clears the cookie', async () => {
      const res = await request(app).post('/api/auth/logout');
      expect(res.status).toBe(200);
      expect(res.headers['set-cookie']?.[0]).toMatch(/token=;/);
    });
  });
});