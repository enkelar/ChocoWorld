import express from 'express';
import Category from '../models/categoryModel.js';
import Product from '../models/productModel.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();
// GET all categories (public - used by customer-facing menu)
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().sort({ displayOrder: 1, label: 1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch categories', error: err.message });
  }
});

// POST create category (admin only)
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const { label, slug, tagline, displayOrder } = req.body;

    const existing = slug ? await Category.findOne({ slug }) : null;
    if (existing) {
      return res.status(400).json({ message: 'A category with this slug already exists' });
    }

    const category = new Category({ label, slug, tagline, displayOrder });
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create category', error: err.message });
  }
});

// PUT update category (admin only)
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const { label, slug, tagline, displayOrder } = req.body;
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    const oldSlug = category.slug;

    if (label !== undefined) category.label = label;
    if (slug !== undefined) category.slug = slug;
    if (tagline !== undefined) category.tagline = tagline;
    if (displayOrder !== undefined) category.displayOrder = displayOrder;

    await category.save();

    // Keep existing products pointing at the right category if slug changed
    if (slug && slug !== oldSlug) {
      await Product.updateMany({ category: oldSlug }, { $set: { category: slug } });
    }

    res.json(category);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update category', error: err.message });
  }
});

// DELETE category (admin only)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    const productsUsingCategory = await Product.countDocuments({ category: category.slug });
    if (productsUsingCategory > 0) {
      return res.status(400).json({
        message: `Cannot delete: ${productsUsingCategory} product(s) still use this category. Reassign them first.`,
      });
    }

    await category.deleteOne();
    res.json({ message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete category', error: err.message });
  }
});

export default router;