import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../../app.js';
import Category from '../../models/categoryModel.js';
import Product from '../../models/productModel.js';
import User from '../../models/userModel.js';

process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-secret';

async function makeAdminCookie() {
  const user = await User.create({
    name: 'Admin',
    email: 'admin@test.com',
    password: 'password123',
    isAdmin: true,
  });
  const token = jwt.sign({ id: user._id, isAdmin: true }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
  return `token=${token}`;
}

describe('categoryController', () => {
  describe('GET /api/categories', () => {
    it('returns categories sorted by displayOrder', async () => {
      await Category.insertMany([
        { label: 'Pancakes', slug: 'pancakes', displayOrder: 2 },
        { label: 'Waffles', slug: 'waffles', displayOrder: 1 },
      ]);

      const res = await request(app).get('/api/categories');

      expect(res.status).toBe(200);
      expect(res.body.map((c) => c.slug)).toEqual(['waffles', 'pancakes']);
    });
  });

  describe('POST /api/categories', () => {
    it('rejects unauthenticated requests', async () => {
      const res = await request(app).post('/api/categories').send({ label: 'Crepes' });
      expect(res.status).toBe(401);
    });

    it('creates a category when authenticated as admin', async () => {
      const cookie = await makeAdminCookie();

      const res = await request(app)
        .post('/api/categories')
        .set('Cookie', cookie)
        .send({ label: 'Crepes', tagline: 'Thin and delicious' });

      expect(res.status).toBe(201);
      expect(res.body.slug).toBe('crepes'); // auto-slugified
    });

    it('rejects a duplicate slug', async () => {
      const cookie = await makeAdminCookie();
      await Category.create({ label: 'Waffles', slug: 'waffles' });

      const res = await request(app)
        .post('/api/categories')
        .set('Cookie', cookie)
        .send({ label: 'Waffles Again', slug: 'waffles' });

      expect(res.status).toBe(400);
      expect(res.body.message).toMatch(/already exists/i);
    });
  });

  describe('DELETE /api/categories/:id', () => {
    it('refuses to delete a category with products attached', async () => {
      const cookie = await makeAdminCookie();
      const category = await Category.create({ label: 'Waffles', slug: 'waffles' });
      await Product.create({
        name: 'Belgian Waffle',
        slug: 'belgian-waffle',
        category: 'waffles',
        price: 4.5,
      });

      const res = await request(app)
        .delete(`/api/categories/${category._id}`)
        .set('Cookie', cookie);

      expect(res.status).toBe(400);
      expect(res.body.message).toMatch(/still use this category/i);
    });

    it('deletes a category with no products attached', async () => {
      const cookie = await makeAdminCookie();
      const category = await Category.create({ label: 'Waffles', slug: 'waffles' });

      const res = await request(app)
        .delete(`/api/categories/${category._id}`)
        .set('Cookie', cookie);

      expect(res.status).toBe(200);
      expect(await Category.findById(category._id)).toBeNull();
    });

    it('returns 400 (via CastError → errorHandler) for a malformed id', async () => {
      const cookie = await makeAdminCookie();

      const res = await request(app)
        .delete('/api/categories/not-a-valid-id')
        .set('Cookie', cookie);

      expect(res.status).toBe(400);
    });
  });
});