import { describe, it, expect } from 'vitest';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../../app.js';
import User from '../../models/userModel.js';

process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-secret';

describe('auth middleware', () => {
  it('rejects requests with no token', async () => {
    const res = await request(app).post('/api/categories').send({ label: 'X' });
    expect(res.status).toBe(401);
    expect(res.body.message).toMatch(/no token/i);
  });

  it('rejects a token signed with the wrong secret', async () => {
    const badToken = jwt.sign({ id: 'fake-id' }, 'wrong-secret');
    const res = await request(app)
      .post('/api/categories')
      .set('Cookie', `token=${badToken}`)
      .send({ label: 'X' });
    expect(res.status).toBe(401);
  });

  it('rejects a valid token for a user that no longer exists', async () => {
    const token = jwt.sign({ id: '507f1f77bcf86cd799439011' }, process.env.JWT_SECRET);
    const res = await request(app)
      .post('/api/categories')
      .set('Cookie', `token=${token}`)
      .send({ label: 'X' });
    expect(res.status).toBe(401);
  });

  it('rejects a valid non-admin user', async () => {
    const user = await User.create({
      name: 'Regular',
      email: 'regular@test.com',
      password: 'password123',
      isAdmin: false,
    });
    const token = jwt.sign({ id: user._id, isAdmin: false }, process.env.JWT_SECRET);

    const res = await request(app)
      .post('/api/categories')
      .set('Cookie', `token=${token}`)
      .send({ label: 'X' });

    expect(res.status).toBe(403);
    expect(res.body.message).toMatch(/admin access required/i);
  });
});