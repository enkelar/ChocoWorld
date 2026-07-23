import { describe, it, expect } from 'vitest';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../../app.js';
import User from '../../models/userModel.js';

process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-secret';
process.env.R2_BUCKET_NAME = process.env.R2_BUCKET_NAME || 'test-bucket';
process.env.R2_PUBLIC_URL = process.env.R2_PUBLIC_URL || 'https://pub-test.r2.dev';

async function makeAdminCookie() {
  const user = await User.create({
    name: 'Admin',
    email: 'admin-upload@test.com',
    password: 'password123',
    isAdmin: true,
  });
  const token = jwt.sign({ id: user._id, isAdmin: true }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return `token=${token}`;
}

describe('uploadController', () => {
  describe('POST /api/uploads/image-url', () => {
    it('rejects unauthenticated requests', async () => {
      const res = await request(app).post('/api/uploads/image-url').send({ contentType: 'image/png' });
      expect(res.status).toBe(401);
    });

    it('rejects an unsupported content type', async () => {
      const cookie = await makeAdminCookie();
      const res = await request(app)
        .post('/api/uploads/image-url')
        .set('Cookie', cookie)
        .send({ contentType: 'application/pdf' });
      expect(res.status).toBe(400);
      expect(res.body.message).toMatch(/Unsupported image type/i);
    });
  });

  describe('DELETE /api/uploads', () => {
    it('rejects a key with a path traversal attempt', async () => {
      const cookie = await makeAdminCookie();
      const res = await request(app)
        .delete('/api/uploads')
        .set('Cookie', cookie)
        .send({ key: 'products/../../etc/passwd' });
      expect(res.status).toBe(400);
    });

    it('rejects a key outside the products/ prefix', async () => {
      const cookie = await makeAdminCookie();
      const res = await request(app)
        .delete('/api/uploads')
        .set('Cookie', cookie)
        .send({ key: 'secrets/config.json' });
      expect(res.status).toBe(400);
    });
  });
});