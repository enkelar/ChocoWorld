import express from 'express';
import { getImageUploadUrl, deleteImage } from '../controllers/uploadController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// Generate presigned URL for direct-to-R2 upload
router.post('/image-url', protect, adminOnly, getImageUploadUrl);

// Optional: keep delete route for cleanup (still goes through server)
router.delete('/', protect, adminOnly, deleteImage);

export default router;