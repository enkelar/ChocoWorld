import Product from '../models/productModel.js';
import Category from '../models/categoryModel.js';
import asyncHandler from '../utils/asyncHandler.js';
import cache from '../utils/cache.js';

const MENU_CACHE_KEY = 'menu:full';
// 30s — short enough that admin edits show up quickly, long enough to absorb bursts of menu-page traffic without hitting Mongo on every single request.
const MENU_CACHE_TTL_MS = 30_000; 

// GET /api/menu
export const getMenu = asyncHandler(async (req, res) => {
  const cached = cache.get(MENU_CACHE_KEY);
  if (cached) {
    return res.json(cached);
  }

  const [categories, products] = await Promise.all([
    Category.find().sort({ displayOrder: 1, label: 1 }),
    Product.find({}).sort({ displayOrder: 1, createdAt: -1 }),
  ]);

  const payload = { categories, products };
  cache.set(MENU_CACHE_KEY, payload, MENU_CACHE_TTL_MS);
  res.json(payload);
});

export function invalidateMenuCache() {
  cache.invalidate('menu:');
}