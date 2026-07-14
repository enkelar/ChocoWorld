import express from 'express';
import { getMenu } from '../controllers/menuController.js';
import { apiLimiter } from '../middleware/rateLimiters.js';

const router = express.Router();

// GET /api/menu -> { categories, products }
router.get('/', apiLimiter, getMenu);

export default router;