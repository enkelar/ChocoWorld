// backend/scripts/reprocessImages.js
//
// One-off script: for every product, downloads its current image, produces
// TWO optimized WebP versions (a small thumbnail for grid views, and a
// larger full-size version for the product detail page), uploads both to
// R2, and updates the Product record's `image` (full) and `thumbnail`
// fields. Deletes the old R2 object for the previous `image` value (only if
// it was actually hosted on your bucket).
//
// Usage:
//   node scripts/reprocessImages.js            # dry run — reports what it WOULD do, changes nothing
//   node scripts/reprocessImages.js --apply     # actually re-uploads and updates the DB
//   node scripts/reprocessImages.js --apply --limit=20   # process only the first 20 (useful for testing)
//
// Requires the "sharp" package:
//   npm install sharp --save
//
// Safe to re-run: any product that already has a `thumbnail` ending in
// "-thumb.webp" is treated as already processed and is skipped, so running
// this again later only picks up new/unprocessed products.

import 'dotenv/config';
import crypto from 'crypto';
import mongoose from 'mongoose';
import sharp from 'sharp';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import connectDB from '../db.js';
import Product from '../models/productModel.js';
import r2Client, { extractR2Key, deleteR2ObjectByUrl } from '../services/r2Client.js';

const FULL_MAX_DIMENSION = 1600; // px, longest side — used for the detail page image
const THUMB_MAX_DIMENSION = 480; // px, longest side — used for grid/card thumbnails
const FULL_QUALITY = 82;
const THUMB_QUALITY = 75;

const BUCKET = process.env.R2_BUCKET_NAME;
const PUBLIC_URL = (process.env.R2_PUBLIC_URL || '').replace(/\/+$/, '');

const args = process.argv.slice(2);
const APPLY = args.includes('--apply');
const limitArg = args.find((a) => a.startsWith('--limit='));
const LIMIT = limitArg ? parseInt(limitArg.split('=')[1], 10) : Infinity;

function alreadyProcessed(product) {
  return typeof product.thumbnail === 'string' && product.thumbnail.includes('-thumb.webp');
}

async function downloadImage(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Download failed (${res.status}) for ${url}`);
  }
  const arrayBuffer = await res.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

async function resizeToWebp(buffer, maxDim, quality) {
  return sharp(buffer)
    .rotate() // respect EXIF orientation before stripping metadata
    .resize({
      width: maxDim,
      height: maxDim,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .webp({ quality })
    .toBuffer();
}

async function uploadToR2(buffer, suffix) {
  const key = `products/${crypto.randomUUID()}-${suffix}.webp`;
  await r2Client.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: buffer,
      ContentType: 'image/webp',
    })
  );
  return `${PUBLIC_URL}/${key}`;
}

function kb(buffer) {
  return (buffer.length / 1024).toFixed(0);
}

async function run() {
  if (!BUCKET || !PUBLIC_URL) {
    console.error('Missing R2_BUCKET_NAME / R2_PUBLIC_URL env vars. Aborting.');
    process.exit(1);
  }

  await connectDB();

  const products = await Product.find({ image: { $exists: true, $nin: [null, ''] } });
  console.log(`Found ${products.length} product(s) with an image set.`);
  console.log(APPLY ? 'Mode: APPLY (will modify R2 + DB)' : 'Mode: DRY RUN (no changes will be made)');
  console.log('---');

  let processed = 0;
  let skipped = 0;
  let failed = 0;

  for (const product of products) {
    if (processed + skipped + failed >= LIMIT) break;

    if (alreadyProcessed(product)) {
      console.log(`SKIP  (already has a thumbnail) — ${product.slug}`);
      skipped++;
      continue;
    }

    const originalUrl = product.image;

    try {
      console.log(`Processing "${product.name}" (${product.slug})`);
      console.log(`  source: ${originalUrl}`);

      const original = await downloadImage(originalUrl);
      console.log(`  source size: ${kb(original)}KB`);

      const [fullBuf, thumbBuf] = await Promise.all([
        resizeToWebp(original, FULL_MAX_DIMENSION, FULL_QUALITY),
        resizeToWebp(original, THUMB_MAX_DIMENSION, THUMB_QUALITY),
      ]);

      console.log(`  full:  ${kb(fullBuf)}KB (max ${FULL_MAX_DIMENSION}px)`);
      console.log(`  thumb: ${kb(thumbBuf)}KB (max ${THUMB_MAX_DIMENSION}px)`);

      if (!APPLY) {
        console.log('  (dry run — not uploading or updating DB)');
        processed++;
        console.log('---');
        continue;
      }

      const [fullUrl, thumbUrl] = await Promise.all([
        uploadToR2(fullBuf, 'full'),
        uploadToR2(thumbBuf, 'thumb'),
      ]);

      product.image = fullUrl;
      product.thumbnail = thumbUrl;
      await product.save();

      // Only attempt to delete the previous object if it was actually hosted
      // on our R2 bucket (as opposed to an external URL someone pasted in).
      if (extractR2Key(originalUrl)) {
        await deleteR2ObjectByUrl(originalUrl);
      }

      console.log(`  new full:  ${fullUrl}`);
      console.log(`  new thumb: ${thumbUrl}`);
      console.log('  done.');
      processed++;
    } catch (err) {
      console.error(`  FAILED: ${err.message}`);
      failed++;
    }

    console.log('---');
  }

  console.log('Summary:');
  console.log(`  processed: ${processed}`);
  console.log(`  skipped:   ${skipped}`);
  console.log(`  failed:    ${failed}`);

  if (!APPLY) {
    console.log('\nThis was a dry run. Re-run with --apply to actually upload and update records.');
  }

  await mongoose.disconnect();
  process.exit(failed > 0 ? 1 : 0);
}

run().catch((err) => {
  console.error('Script crashed:', err);
  process.exit(1);
});