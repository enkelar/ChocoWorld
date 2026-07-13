import express from 'express';
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// GET all categories (public - used by customer-facing menu)
router.get('/', getAllCategories);

// POST create category (admin only)
router.post('/', protect, adminOnly, createCategory);

// PUT update category (admin only)
router.put('/:id', protect, adminOnly, updateCategory);

// DELETE category (admin only)
router.delete('/:id', protect, adminOnly, deleteCategory);

export default router;