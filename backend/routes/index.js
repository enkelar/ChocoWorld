import express from 'express';
import authRoutes from './authRoutes.js';
import productRoutes from './productRoutes.js';
import categoryRoutes from './categoryRoutes.js';
import uploadRoutes from './uploadRoutes.js';
import menuRoutes from './menuRoutes.js';

const router = express.Router();

router.get('/health', (req, res) => res.json({ status: 'ok' }));

router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);
router.use('/uploads', uploadRoutes);
router.use('/menu', menuRoutes);

export default router;