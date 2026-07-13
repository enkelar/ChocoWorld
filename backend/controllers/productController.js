import Product from '../models/productModel.js';
import asyncHandler from '../utils/asyncHandler.js';
import slugify from '../utils/slugify.js';
import { deleteR2ObjectByUrl } from '../services/r2Client.js';

// GET /api/products?category=waffles
export const getProducts = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.category) filter.category = req.query.category;
  const products = await Product.find(filter).sort({ createdAt: -1 });
  res.json(products);
});

// GET /api/products/featured
export const getFeatured = asyncHandler(async (req, res) => {
  const products = await Product.find({ featured: true, available: true })
    .sort({ createdAt: -1 })
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

  // If the image was swapped out for a new one, clean up the old R2 file.
  if (body.image !== undefined && body.image !== existing.image) {
    await deleteR2ObjectByUrl(existing.image);
  }

  res.json(product);
});

// DELETE /api/products/:id  (admin)
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  await deleteR2ObjectByUrl(product.image);

  res.json({ message: 'Product deleted' });
});