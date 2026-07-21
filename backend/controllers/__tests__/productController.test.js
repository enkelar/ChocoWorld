import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../../app.js';
import Product from '../../models/productModel.js';
import Category from '../../models/categoryModel.js';
import User from '../../models/userModel.js';

process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-secret';

async function makeAdminCookie() {
  const user = await User.create({
    name: 'Admin',
    email: 'admin2@test.com',
    password: 'password123',
    isAdmin: true,
  });
  const token = jwt.sign({ id: user._id, isAdmin: true }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
  return `token=${token}`;
}

describe('productController', () => {
  beforeEach(async () => {
    await Category.create({ label: 'Waffles', slug: 'waffles' });
  });

  describe('GET /api/products', () => {
    it('paginates when page/limit are provided', async () => {
      await Product.insertMany(
        Array.from({ length: 5 }, (_, i) => ({
          name: `Waffle ${i}`,
          slug: `waffle-${i}`,
          category: 'waffles',
          price: 4,
        }))
      );

      const res = await request(app).get('/api/products?page=1&limit=2');

      expect(res.status).toBe(200);
      expect(res.body.products).toHaveLength(2);
      expect(res.body.total).toBe(5);
      expect(res.body.totalPages).toBe(3);
    });

    it('returns a plain array when no pagination params are given', async () => {
      await Product.create({
        name: 'Waffle',
        slug: 'waffle',
        category: 'waffles',
        price: 4,
      });

      const res = await request(app).get('/api/products');

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('POST /api/products', () => {
    it('rejects a product referencing a non-existent category', async () => {
      const cookie = await makeAdminCookie();

      const res = await request(app)
        .post('/api/products')
        .set('Cookie', cookie)
        .send({ name: 'Mystery Item', category: 'does-not-exist', price: 3 });

      expect(res.status).toBe(400);
      expect(res.body.message).toMatch(/does not exist/i);
    });

    it('auto-slugifies the name when no slug is given', async () => {
      const cookie = await makeAdminCookie();

      const res = await request(app)
        .post('/api/products')
        .set('Cookie', cookie)
        .send({ name: 'Velvet Belgian Waffle', category: 'waffles', price: 4.5 });

      expect(res.status).toBe(201);
      expect(res.body.slug).toBe('velvet-belgian-waffle');
    });
  });

  describe('GET /api/products/featured and /best-sellers', () => {
    it('only returns items flagged accordingly', async () => {
      await Product.insertMany([
        { name: 'A', slug: 'a', category: 'waffles', price: 1, featured: true },
        { name: 'B', slug: 'b', category: 'waffles', price: 1, featured: false },
        { name: 'C', slug: 'c', category: 'waffles', price: 1, bestSeller: true },
      ]);

      const featured = await request(app).get('/api/products/featured');
      const bestSellers = await request(app).get('/api/products/best-sellers');

      expect(featured.body.map((p) => p.slug)).toEqual(['a']);
      expect(bestSellers.body.map((p) => p.slug)).toEqual(['c']);
    });
  });
});