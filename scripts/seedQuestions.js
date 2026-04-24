// scripts/seedQuestions.js
// Run once to populate your MongoDB `questions` collection.
//
// Usage (from your project root):
//   node scripts/seedQuestions.js
//
// Requires MONGODB_URI to be set in your environment or .env.local.
// (dotenv is loaded automatically if present.)

require('dotenv').config({ path: '.env.local' });
const { MongoClient } = require('mongodb');

const URI     = process.env.MONGODB_URI;
const DB_NAME = process.env.MONGODB_DB || 'interstellar';

if (!URI) {
  console.error('❌  MONGODB_URI is not set. Add it to .env.local');
  process.exit(1);
}

const QUESTIONS = [
  {
    question:     'What is the name of the wormhole-adjacent black hole in the film Interstellar?',
    options:      ['Sagittarius A*', 'Gargantua', 'Cygnus X-1', 'M87*'],
    correctIndex: 1,
    difficulty:   'easy',
    category:     'Interstellar Lore',
    createdAt:    new Date(),
  },
  {
    question:     'On Miller\'s Planet, how much time passes on Earth for every 1 hour spent near Gargantua?',
    options:      ['1 year', '7 years', '23 years', '100 years'],
    correctIndex: 1,
    difficulty:   'medium',
    category:     'Relativity',
    createdAt:    new Date(),
  },
  {
    question:     'What force does the film suggest can transcend dimensions and communicate across time?',
    options:      ['Electromagnetism', 'The Strong Nuclear Force', 'Gravity', 'Dark Energy'],
    correctIndex: 2,
    difficulty:   'easy',
    category:     'Physics Concepts',
    createdAt:    new Date(),
  },
  {
    question:     'What is the term for the boundary surrounding a black hole beyond which nothing can escape?',
    options:      ['Schwarzschild Radius', 'Event Horizon', 'Photon Sphere', 'Singularity'],
    correctIndex: 1,
    difficulty:   'easy',
    category:     'Astrophysics',
    createdAt:    new Date(),
  },
  {
    question:     'Which physicist\'s work was heavily drawn upon to depict the visual of Gargantua accurately?',
    options:      ['Stephen Hawking', 'Neil deGrasse Tyson', 'Kip Thorne', 'Roger Penrose'],
    correctIndex: 2,
    difficulty:   'medium',
    category:     'Interstellar Lore',
    createdAt:    new Date(),
  },
  {
    question:     'What is the name of the space station that humanity lives on at the end of Interstellar?',
    options:      ['Endurance', 'Cooper Station', 'Lazarus Base', 'Brand Colony'],
    correctIndex: 1,
    difficulty:   'medium',
    category:     'Interstellar Lore',
    createdAt:    new Date(),
  },
  {
    question:     'Time dilation near a black hole is primarily caused by which effect?',
    options:      ['Doppler Shift', 'Gravitational Time Dilation', 'Length Contraction', 'Quantum Tunneling'],
    correctIndex: 1,
    difficulty:   'medium',
    category:     'Physics Concepts',
    createdAt:    new Date(),
  },
  {
    question:     'What is a wormhole theoretically a shortcut through?',
    options:      ['A star\'s corona', 'The asteroid belt', 'Spacetime', 'The magnetosphere'],
    correctIndex: 2,
    difficulty:   'easy',
    category:     'Astrophysics',
    createdAt:    new Date(),
  },
  {
    question:     'Which planet in Interstellar has massive tidal waves caused by Gargantua\'s gravity?',
    options:      ['Mann\'s Planet', 'Edmunds\' Planet', 'Miller\'s Planet', 'Cooper\'s Planet'],
    correctIndex: 2,
    difficulty:   'easy',
    category:     'Interstellar Lore',
    createdAt:    new Date(),
  },
  {
    question:     'What is the name of the AI robot that accompanies the Endurance crew?',
    options:      ['HAL', 'TARS', 'JARVIS', 'CASE'],
    correctIndex: 1,
    difficulty:   'easy',
    category:     'Interstellar Lore',
    createdAt:    new Date(),
  },
  {
    question:     'What does the acronym NASA stand for?',
    options:      [
      'National Aeronautics and Space Administration',
      'National Aerospace and Science Agency',
      'North American Space Authority',
      'National Aviation and Space Agency',
    ],
    correctIndex: 0,
    difficulty:   'easy',
    category:     'Space Exploration',
    createdAt:    new Date(),
  },
  {
    question:     'What is the Chandrasekhar limit related to?',
    options:      ['The maximum mass of a white dwarf star', 'The escape velocity of a black hole', 'The minimum mass for nuclear fusion', 'The speed of a neutron star spin'],
    correctIndex: 0,
    difficulty:   'hard',
    category:     'Astrophysics',
    createdAt:    new Date(),
  },
  {
    question:     'In which year did humans first land on the Moon?',
    options:      ['1965', '1967', '1969', '1972'],
    correctIndex: 2,
    difficulty:   'easy',
    category:     'Space Exploration',
    createdAt:    new Date(),
  },
  {
    question:     'What is a neutron star primarily composed of?',
    options:      ['Protons and electrons', 'Neutrons', 'Dark matter', 'Plasma'],
    correctIndex: 1,
    difficulty:   'medium',
    category:     'Astrophysics',
    createdAt:    new Date(),
  },
  {
    question:     'What phenomenon causes light to bend around a massive object like a black hole?',
    options:      ['Refraction', 'Diffraction', 'Gravitational Lensing', 'Chromatic Aberration'],
    correctIndex: 2,
    difficulty:   'medium',
    category:     'Physics Concepts',
    createdAt:    new Date(),
  },
];

async function seed() {
  const client = new MongoClient(URI);
  try {
    await client.connect();
    const db  = client.db(DB_NAME);
    const col = db.collection('questions');

    // Drop existing to avoid duplicates on re-run
    const existing = await col.countDocuments();
    if (existing > 0) {
      console.log(`ℹ  Found ${existing} existing questions — dropping collection before re-seed.`);
      await col.drop();
    }

    const result = await col.insertMany(QUESTIONS);
    console.log(`✅  Inserted ${result.insertedCount} questions into \`${DB_NAME}.questions\``);

    // Create an index on completedAt for leaderboard performance
    await db.collection('attempts').createIndex(
      { score: -1, timeSpent: 1, completedAt: 1 },
      { name: 'leaderboard_sort' }
    );
    console.log('✅  Created leaderboard index on `attempts` collection');

  } catch (err) {
    console.error('❌  Seed failed:', err);
    process.exit(1);
  } finally {
    await client.close();
    console.log('🔌  MongoDB connection closed');
  }
}

seed();
