import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: ['./vitest.setup.js'],
    testTimeout: 15000, // MongoMemoryServer's first boot can be slow
  },
});