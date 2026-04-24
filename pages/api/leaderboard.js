// pages/api/leaderboard.js
// GET /api/leaderboard
//
// Returns top 20 attempts sorted by:
//   1. score DESC
//   2. timeSpent ASC (fastest wins ties)
//
// Response shape:
// {
//   entries: [
//     { rank, username, score, total, timeSpent, completedAt }
//   ],
//   updatedAt: ISO string
// }

import { getDb } from '../../lib/mongodb';

// Cache for 4 seconds — reduces DB reads during rapid polling without
// sacrificing near-real-time feel.
const CACHE_TTL_MS = 4_000;
let cache = { data: null, fetchedAt: 0 };

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const now = Date.now();

  // Return cached result if still fresh
  if (cache.data && now - cache.fetchedAt < CACHE_TTL_MS) {
    res.setHeader('X-Cache', 'HIT');
    return res.status(200).json(cache.data);
  }

  try {
    const db = await getDb();

    const entries = await db
      .collection('attempts')
      .aggregate([
        { $sort: { score: -1, timeSpent: 1, completedAt: 1 } },
        { $limit: 20 },
        {
          $project: {
            _id:         0,
            username:    1,
            score:       1,
            total:       1,
            timeSpent:   1,
            completedAt: 1,
          },
        },
      ])
      .toArray();

    // Add 1-based rank numbers
    const ranked = entries.map((e, i) => ({ rank: i + 1, ...e }));

    const payload = { entries: ranked, updatedAt: new Date().toISOString() };

    // Update in-process cache
    cache = { data: payload, fetchedAt: now };

    res.setHeader('X-Cache', 'MISS');
    return res.status(200).json(payload);
  } catch (err) {
    console.error('[GET /api/leaderboard]', err);
    return res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
}
