import express from 'express';
import { getProducts, getFeatured, getBySlug, createProduct, updateProduct, deleteProduct,}  from '../controllers/productController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// /featured must be declared before the /:slug catch-all route, otherwise Express would treat "featured" as a slug.
router.get('/featured', getFeatured);
router.get('/', getProducts);
router.get('/:slug', getBySlug);

router.post('/', protect, adminOnly, createProduct);
router.put('/:id', protect, adminOnly, updateProduct);
router.delete('/:id', protect, adminOnly, deleteProduct);

export default router;
