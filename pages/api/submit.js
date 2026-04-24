// pages/api/submit.js
// POST /api/submit
//
// Body: { username, answers: [{ questionId, selectedIndex }], timeSpent }
//
// 1. Validates all inputs
// 2. Fetches correct answers from DB (never trust the client)
// 3. Calculates score
// 4. Persists attempt to `attempts` collection
// 5. Returns { score, total, correctAnswers: [{ questionId, correctIndex, isCorrect }] }

import { getDb } from '../../lib/mongodb';
import { ObjectId } from 'mongodb';

// ── Input validators ──────────────────────────────────────────────────────────
function isValidUsername(name) {
  return (
    typeof name === 'string' &&
    name.trim().length >= 1 &&
    name.trim().length <= 30 &&
    /^[A-Za-z0-9 _\-\.]+$/.test(name.trim())
  );
}

function isValidAnswers(answers) {
  if (!Array.isArray(answers) || answers.length === 0 || answers.length > 20) {
    return false;
  }
  return answers.every(
    a =>
      a &&
      typeof a.questionId === 'string' &&
      a.questionId.length === 24 &&       // ObjectId hex length
      Number.isInteger(a.selectedIndex) &&
      a.selectedIndex >= 0 &&
      a.selectedIndex <= 3               // max 4 options (0-indexed)
  );
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, answers, timeSpent } = req.body ?? {};

  // ── Validate username ───────────────────────────────────────────────────────
  if (!isValidUsername(username)) {
    return res.status(400).json({
      error: 'Invalid username. Use 1–30 alphanumeric characters.',
    });
  }

  // ── Validate answers array ──────────────────────────────────────────────────
  if (!isValidAnswers(answers)) {
    return res.status(400).json({
      error: 'Invalid answers payload.',
    });
  }

  // ── Validate timeSpent ──────────────────────────────────────────────────────
  const time = Number.isFinite(timeSpent) && timeSpent >= 0
    ? Math.round(timeSpent)
    : 0;

  try {
    const db = await getDb();

    // ── Fetch the correct answers from DB ────────────────────────────────────
    const questionIds = answers.map(a => {
      try { return new ObjectId(a.questionId); }
      catch { return null; }
    }).filter(Boolean);

    if (questionIds.length !== answers.length) {
      return res.status(400).json({ error: 'One or more invalid question IDs.' });
    }

    const dbQuestions = await db
      .collection('questions')
      .find(
        { _id: { $in: questionIds } },
        { projection: { _id: 1, correctIndex: 1 } }
      )
      .toArray();

    if (dbQuestions.length !== answers.length) {
      return res.status(400).json({
        error: 'Some question IDs were not found in the database.',
      });
    }

    // ── Build lookup map: id → correctIndex ──────────────────────────────────
    const correctMap = {};
    for (const q of dbQuestions) {
      correctMap[q._id.toString()] = q.correctIndex;
    }

    // ── Score + per-answer result ─────────────────────────────────────────────
    let score = 0;
    const answersWithResult = answers.map(a => {
      const correctIndex = correctMap[a.questionId];
      const isCorrect    = a.selectedIndex === correctIndex;
      if (isCorrect) score++;
      return {
        questionId:    a.questionId,
        selectedIndex: a.selectedIndex,
        correctIndex,
        isCorrect,
      };
    });

    const total = answers.length;

    // ── Persist attempt ───────────────────────────────────────────────────────
    await db.collection('attempts').insertOne({
      username:    username.trim().toUpperCase(),
      score,
      total,
      answers:     answersWithResult.map(a => ({
        questionId:    new ObjectId(a.questionId),
        selectedIndex: a.selectedIndex,
        isCorrect:     a.isCorrect,
      })),
      completedAt: new Date(),
      timeSpent:   time,
    });

    return res.status(200).json({
      score,
      total,
      correctAnswers: answersWithResult,
    });
  } catch (err) {
    console.error('[POST /api/submit]', err);
    return res.status(500).json({ error: 'Failed to submit quiz' });
  }
}
