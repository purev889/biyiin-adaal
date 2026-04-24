// lib/mongodb.js
// Singleton MongoDB connection — caches the client across serverless invocations
// so Vercel cold-starts don't create a new connection on every request.

import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error(
    'Please define MONGODB_URI in your .env.local file.\n' +
    'Example: MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/interstellar'
  );
}

// ── Module-level cache (persists across hot reloads in dev & across
//    invocations in the same serverless container in prod) ──────────────────
let cachedClient = null;
let cachedDb     = null;

const DB_NAME = process.env.MONGODB_DB || 'interstellar';

/**
 * Returns a { client, db } pair, reusing the cached connection when possible.
 * @returns {Promise<{ client: MongoClient, db: import('mongodb').Db }>}
 */
export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(uri, {
    // Recommended options for serverless
    maxPoolSize:        10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS:    45000,
  });

  await client.connect();
  const db = client.db(DB_NAME);

  cachedClient = client;
  cachedDb     = db;

  return { client, db };
}

/**
 * Quick helper — returns the DB object directly.
 * @returns {Promise<import('mongodb').Db>}
 */
export async function getDb() {
  const { db } = await connectToDatabase();
  return db;
}
