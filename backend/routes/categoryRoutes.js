import express from 'express';
import {getAllCategories, createCategory, updateCategory, deleteCategory,} from '../controllers/categoryController.js';
import { protect, adminOnly } from '../middleware/auth.js';
import { adminMutationLimiter, apiLimiter } from '../middleware/rateLimiters.js';
import { validate } from '../middleware/validate.js';
import { categoryCreateSchema, categoryUpdateSchema } from '../validation/categoryValidation.js';
import { publicCache } from '../middleware/publicCache.js';


const router = express.Router();

// GET all categories (public - used by customer-facing menu)
router.get('/', apiLimiter, publicCache(30), getAllCategories);

// POST create category (admin only)
router.post('/', protect, adminOnly,adminMutationLimiter, validate(categoryCreateSchema), createCategory);

// PUT update category (admin only)
router.put('/:id', protect, adminOnly,adminMutationLimiter, validate(categoryUpdateSchema), updateCategory);

// DELETE category (admin only)
router.delete('/:id', protect, adminOnly,adminMutationLimiter, deleteCategory);

export default router;