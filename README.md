# INTERSTELLAR — Mission Quiz Page

A cinematic quiz page that matches the main Interstellar landing page exactly in visual language, typography, color palette, and motion style.

---

## Setup

### 1. Drop into your existing Next.js project

If you already have a Next.js project:

```bash
# Copy the quiz page
cp quiz.js  your-project/pages/quiz.js

# Copy the data file
cp data/questions.js  your-project/data/questions.js

# Merge CSS variables into your existing globals.css
# (copy the :root block and keyframes from styles/globals.css)
```

### 2. Or start fresh

```bash
npx create-next-app@latest interstellar-site
cd interstellar-site

# Replace pages/_app.js, styles/globals.css, add pages/quiz.js and data/questions.js
# Then:
npm run dev
```

---

## File Structure

```
pages/
  _app.js          ← Global app wrapper (imports globals.css)
  quiz.js          ← Main quiz page (all-in-one component)
data/
  questions.js     ← 10 Interstellar quiz questions + rank tiers
styles/
  globals.css      ← CSS variables + reset matching the main page
```

---

## Design Tokens (matching main page exactly)

| Token         | Value                      |
|---------------|----------------------------|
| `--black`     | `#000000`                  |
| `--deep`      | `#00000D`                  |
| `--amber`     | `#F0A000`                  |
| `--amber-dim` | `#7A5000`                  |
| `--white`     | `#EDE9DF`                  |
| `--gray`      | `#7A7A92`                  |
| `--line`      | `rgba(240,160,0,0.15)`     |

Fonts: **Bebas Neue** (display) · **Cormorant Garamond** (editorial serif) · **Space Mono** (mono labels) · **Lato** (body)

---

## Features

- ✦ Animated starfield canvas background (matching the main page's cosmic aesthetic)
- ✦ 10 Interstellar quiz questions with scientific facts per answer
- ✦ One question at a time with smooth fade transitions
- ✦ Progress bar with per-question color-coded status dots
- ✦ Cinematic option cards with ALPHA / BETA / GAMMA / DELTA labels
- ✦ Correct/incorrect reveal states with amber / red accent
- ✦ Mission Log fact panel after each answer
- ✦ Rank system: Earth-Bound → Rookie Astronaut → Mission Specialist → Commander Cooper → Transcended Time
- ✦ Score submission with callsign input
- ✦ Leaderboard stored in localStorage, sorted by score
- ✦ Fully responsive for mobile and desktop
- ✦ Navbar with link back to home

---

## Extending

**Add questions:** Edit `data/questions.js` — each question needs `id`, `category`, `text`, `options[]`, `correct` (0-indexed), and `fact`.

**Leaderboard backend:** Replace `getLeaderboard()` / `saveScore()` in `quiz.js` with API calls to your backend (Supabase, PlanetScale, etc.) for cross-device persistence.

**Audio:** Add the same `<audio>` element from the main page for ambient sound continuity.
