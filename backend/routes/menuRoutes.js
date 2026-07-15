import express from 'express';
import { getMenu } from '../controllers/menuController.js';
import { apiLimiter } from '../middleware/rateLimiters.js';
import { publicCache } from '../middleware/publicCache.js';

const router = express.Router();

// GET /api/menu -> { categories, products }
router.get('/', apiLimiter, publicCache(30), getMenu);

export default router;