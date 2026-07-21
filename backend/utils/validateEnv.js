const REQUIRED = ['MONGO_URL', 'JWT_SECRET', 'CLIENT_ORIGIN'];

const REQUIRED_FOR_UPLOADS = [
  'R2_ACCOUNT_ID',
  'R2_ACCESS_KEY_ID',
  'R2_SECRET_ACCESS_KEY',
  'R2_BUCKET_NAME',
  'R2_PUBLIC_URL',
];

export default function validateEnv() {
  const missing = REQUIRED.filter((key) => !process.env[key]);
  if (missing.length) {
    console.error(`Missing required environment variables: ${missing.join(', ')}`);
    process.exit(1);
  }

  const missingUploads = REQUIRED_FOR_UPLOADS.filter((key) => !process.env[key]);
  if (missingUploads.length) {
    console.warn(
      `Image uploads disabled — missing R2 environment variables: ${missingUploads.join(', ')}`
    );
  }
}