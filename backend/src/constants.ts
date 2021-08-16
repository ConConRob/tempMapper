import { join } from 'path';

// checks if env variables are loaded. used for scripts that don't load env vars with serverless.
// example script that does this is ./data/seed.ts
if (!process.env.MONGODB_URI) {
  require('dotenv').config({ path: join(__dirname, '../.env') });
}

export const DB_URI = process.env.MONGODB_URI;

export const DB_NAME = process.env.DB_NAME;

export const LISTING_COLLECTION_NAME = 'listings';
