import Category from '../models/categoryModel.js';
import Product from '../models/productModel.js';
import asyncHandler from '../utils/asyncHandler.js';
import { invalidateMenuCache } from './menuController.js';

// GET all categories (public - used by customer-facing menu)
export const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().sort({ displayOrder: 1, label: 1 });
  res.json(categories);
});

// POST create category (admin only)
export const createCategory = asyncHandler(async (req, res) => {
  const { label, labelSq, slug, tagline, taglineSq, displayOrder } = req.body;

  const existing = slug ? await Category.findOne({ slug }) : null;
  if (existing) {
    return res.status(400).json({ message: 'A category with this slug already exists' });
  }

  const category = new Category({ label, labelSq, slug, tagline, taglineSq, displayOrder });
  await category.save();
  invalidateMenuCache();
  res.status(201).json(category);
});

// PUT update category (admin only)
export const updateCategory = asyncHandler(async (req, res) => {
  const { label, labelSq, slug, tagline, taglineSq, displayOrder } = req.body;
  const category = await Category.findById(req.params.id);
  if (!category) return res.status(404).json({ message: 'Category not found' });

  const oldSlug = category.slug;

  if (label !== undefined) category.label = label;
  if (labelSq !== undefined) category.labelSq = labelSq;
  if (slug !== undefined) category.slug = slug;
  if (tagline !== undefined) category.tagline = tagline;
  if (taglineSq !== undefined) category.taglineSq = taglineSq;
  if (displayOrder !== undefined) category.displayOrder = displayOrder;

  await category.save();

  if (slug && slug !== oldSlug) {
    await Product.updateMany({ category: oldSlug }, { $set: { category: slug } });
  }

  invalidateMenuCache();
  res.json(category);
});

// DELETE category (admin only)
export const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) return res.status(404).json({ message: 'Category not found' });

  const productsUsingCategory = await Product.countDocuments({ category: category.slug });
  if (productsUsingCategory > 0) {
    return res.status(400).json({
      message: `Cannot delete: ${productsUsingCategory} product(s) still use this category. Reassign them first.`,
    });
  }

  await category.deleteOne();
  invalidateMenuCache();
  res.json({ message: 'Category deleted' });
});