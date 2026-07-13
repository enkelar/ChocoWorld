import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';

const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

const BUCKET = process.env.R2_BUCKET_NAME;
const PUBLIC_URL = (process.env.R2_PUBLIC_URL || '').replace(/\/+$/, '');

export function extractR2Key(url) {
  if (!url || !PUBLIC_URL) return null;
  if (!url.startsWith(`${PUBLIC_URL}/`)) return null;
  return url.slice(PUBLIC_URL.length + 1);
}

export async function deleteR2ObjectByUrl(url) {
  const key = extractR2Key(url);
  if (!key || !BUCKET) return;

  try {
    await r2Client.send(new DeleteObjectCommand({ Bucket: BUCKET, Key: key }));
  } catch (err) {
    console.error(`Failed to delete R2 object "${key}":`, err.message);
  }
}

export default r2Client;