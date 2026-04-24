// pages/api/questions.js
// GET /api/questions
//
// Returns a randomised set of questions from MongoDB.
// ⚠️  correctIndex is NEVER sent to the client — validation happens
//     server-side in /api/submit.
//
// Query params:
//   ?count=10   (default 10, max 20)

import { getDb } from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const count = Math.min(parseInt(req.query.count ?? '10', 10), 20);
    if (isNaN(count) || count < 1) {
      return res.status(400).json({ error: 'Invalid count parameter' });
    }

    const db = await getDb();

    // $sample gives a random subset — perfect for quiz randomisation
    const questions = await db
      .collection('questions')
      .aggregate([
        { $sample: { size: count } },
        {
          // Strip correctIndex — never expose to client
          $project: {
            _id:        1,
            question:   1,
            options:    1,
            difficulty: 1,
            category:   1,
          },
        },
      ])
      .toArray();

    if (questions.length === 0) {
      return res.status(404).json({ error: 'No questions found in database' });
    }

    // Serialise ObjectId → string so JSON.stringify works cleanly on the client
    const serialised = questions.map(q => ({
      ...q,
      _id: q._id.toString(),
    }));

    return res.status(200).json({ questions: serialised });
  } catch (err) {
    console.error('[GET /api/questions]', err);
    return res.status(500).json({ error: 'Failed to fetch questions' });
  }
}
