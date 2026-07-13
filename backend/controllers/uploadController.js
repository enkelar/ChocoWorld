import crypto from 'crypto';
import path from 'path';
import { PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import r2Client from '../services/r2Client.js';
import asyncHandler from '../utils/asyncHandler.js';

const BUCKET = process.env.R2_BUCKET_NAME;
const PUBLIC_URL = (process.env.R2_PUBLIC_URL || '').replace(/\/+$/, '');

// Allowed image types & extensions
const ALLOWED_TYPES = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif',
  'image/webp': 'webp',
};

// POST /api/uploads/image-url (admin, JSON: { contentType })
export const getImageUploadUrl = asyncHandler(async (req, res) => {
  if (!BUCKET || !PUBLIC_URL) {
    return res
      .status(500)
      .json({ error: 'R2 is not configured on the server.' });
  }

  const { contentType } = req.body;
  const extension = ALLOWED_TYPES[contentType];

  if (!extension) {
    return res.status(400).json({
      message:
        'Unsupported image type. Use JPEG, PNG, WEBP, or GIF.',
    });
  }

  const key = `products/${crypto.randomUUID()}.${extension}`;

  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    ContentType: contentType,
  });

  const uploadURL = await getSignedUrl(r2Client, command, {
    expiresIn: 300, // 5 minutes
  });

  res.status(200).json({
    uploadURL,
    publicUrl: `${PUBLIC_URL}/${key}`,
  });
});

// DELETE /api/uploads (admin, body: { key })
// Optional cleanup hook for orphaned files
export const deleteImage = asyncHandler(async (req, res) => {
  const { key } = req.body;
  if (!key) {
    return res.status(400).json({ message: 'key is required' });
  }

  await r2Client.send(
    new DeleteObjectCommand({ Bucket: BUCKET, Key: key })
  );

  res.json({ message: 'Image deleted' });
});