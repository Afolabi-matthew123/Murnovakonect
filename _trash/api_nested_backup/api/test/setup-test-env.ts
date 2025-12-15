/**
 * Test setup: set environment variables used by the app during e2e tests.
 * This file is loaded by Vitest via vitest.config.ts (setupFiles).
 * Backups are not needed for generated files.
 */
process.env.NODE_ENV = process.env.NODE_ENV || 'test';
process.env.JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'local_dev_access_secret_please_change';
process.env.JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'local_dev_refresh_secret_please_change';
process.env.DATABASE_URL = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/murnova_konect';
/**
 * Avoid starting a Redis client in tests if not available: set REDIS_URL empty.
 * Your app's Redis module should check this value and skip/init conditionally.
 */
process.env.REDIS_URL = process.env.REDIS_URL || '';
