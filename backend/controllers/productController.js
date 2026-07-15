import Product from '../models/productModel.js';
import asyncHandler from '../utils/asyncHandler.js';
import slugify from '../utils/slugify.js';
import { deleteR2ObjectByUrl } from '../services/r2Client.js';
import { invalidateMenuCache } from './menuController.js';

// GET /api/products?category=waffles
export const getProducts = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.category) filter.category = req.query.category;
  // Sort by displayOrder first, then fall back to newest-first for items sharing the same order value.
  const query = Product.find(filter).sort({ displayOrder: 1, createdAt: -1 });
  
  const { page, limit } = req.query;
  if (page || limit){
    const pageNum = Math.max(parseInt(page,10) || 1, 1);
    const limitNum = Math.min(Math.max(parseInt(limit, 10) || 20,1), 100);
    cont [products, total] = await Promise.all([
      query,skip((pageNum - 1)* limitNum).limit(limitNum),
      Product.countDocuments(filter),
    ]);
    return res.json({products, total, page: pageNum, totalPages: Math.ceil(total / limitNum)});
  }

  const products = await query;
  res.json(products);
});

// GET /api/products/featured
export const getFeatured = asyncHandler(async (req, res) => {
  const products = await Product.find({ featured: true, available: true })
    .sort({ displayOrder: 1, createdAt: -1 })
    .limit(6);
  res.json(products);
});

// GET /api/products/:slug
export const getBySlug = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

// POST /api/products  (admin)
export const createProduct = asyncHandler(async (req, res) => {
  const body = { ...req.body };
  if (!body.slug) body.slug = slugify(body.name || '');
  const product = await Product.create(body);
  invalidateMenuCache();
  res.status(201).json(product);
});

// PUT /api/products/:id  (admin)
export const updateProduct = asyncHandler(async (req, res) => {
  const body = { ...req.body };
  if (body.name && !body.slug) body.slug = slugify(body.name);

  const existing = await Product.findById(req.params.id);
  if (!existing) return res.status(404).json({ message: 'Product not found' });

  const product = await Product.findByIdAndUpdate(req.params.id, body, {
    new: true,
    runValidators: true,
  });

  // If the image was swapped out for a new one, clean up the old R2 file
  if (body.image !== undefined && body.image !== existing.image) {
    await deleteR2ObjectByUrl(existing.image);
  }

  invalidateMenuCache();
  res.json(product);
});

// DELETE /api/products/:id  (admin)
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  await deleteR2ObjectByUrl(product.image);

  invalidateMenuCache();
  res.json({ message: 'Product deleted' });
});