import express from 'express';
import { getProducts, getFeatured,getBestSellers, getBySlug, createProduct, updateProduct, deleteProduct,}  from '../controllers/productController.js';
import { protect, adminOnly } from '../middleware/auth.js';
import { adminMutationLimiter, apiLimiter } from '../middleware/rateLimiters.js';
import { validate } from '../middleware/validate.js';
import { productCreateSchema, productUpdateSchema } from '../validation/productValidation.js';
import { publicCache } from '../middleware/publicCache.js';

const router = express.Router();

// /featured must be declared before the /:slug catch-all route, otherwise Express would treat "featured" as a slug.
router.get('/featured', apiLimiter, publicCache(30), getFeatured);
router.get('/best-sellers', apiLimiter, publicCache(30), getBestSellers);
router.get('/', apiLimiter, publicCache(30), getProducts);
router.get('/:slug', apiLimiter, publicCache(30), getBySlug);

router.post('/', protect, adminOnly,adminMutationLimiter, validate(productCreateSchema), createProduct);
router.put('/:id', protect, adminOnly,adminMutationLimiter, validate(productUpdateSchema), updateProduct);
router.delete('/:id', protect, adminOnly,adminMutationLimiter, deleteProduct);

export default router;
