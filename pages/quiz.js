// pages/quiz.js
// Interstellar — Mission Quiz (full-scroll refactor)
//
// Data flow:
//   Mount → GET /api/questions
//   Submit → POST /api/submit  (server validates answers)
//   Result → show score + leaderboard (auto-polled by <Leaderboard />)
//
// Changes from original:
//   - Full-scroll layout: all questions visible at once
//   - Improved answer card states (default/hover/selected/correct/wrong)
//   - A/B/C/D circular badge labels
//   - Single "Submit Quiz" button at bottom
//   - window.scrollTo(0,0) on mount
//   - "Enter name" instead of "Enter callsign"

import { useState, useEffect, useRef, useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import BlackHoleCanvas from '../components/BlackHoleCanvas';
import Leaderboard from '../components/Leaderboard';

// ── Design tokens ─────────────────────────────────────────────────────────────
const T = {
  amber:    '#F0A000',
  amberDim: '#7A5000',
  white:    '#EDE9DF',
  gray:     '#7A7A92',
  line:     'rgba(240,160,0,0.15)',
  green:    'rgba(60,200,100,0.85)',
  greenBg:  'rgba(40,160,70,0.08)',
  greenBorder: 'rgba(60,200,100,0.45)',
  red:      'rgba(220,70,60,0.85)',
  redBg:    'rgba(200,50,50,0.08)',
  redBorder: 'rgba(200,70,60,0.45)',
};

const OPTION_LABELS = ['A', 'B', 'C', 'D'];

// ── Rank tiers ────────────────────────────────────────────────────────────────
const RANK_TIERS = [
  { min: 0,  max: 2,  title: 'CADET',             desc: 'The cosmos is vast and you are just beginning your journey.' },
  { min: 3,  max: 4,  title: 'ASTRONAUT',          desc: 'You have glimpsed the stars — but there is much more to learn.' },
  { min: 5,  max: 6,  title: 'COMMANDER',          desc: 'A seasoned explorer who understands the pull of the unknown.' },
  { min: 7,  max: 8,  title: 'MISSION SPECIALIST', desc: 'Your knowledge bends spacetime. The crew trusts you.' },
  { min: 9,  max: 10, title: 'INTERSTELLAR',       desc: 'You have transcended ordinary understanding. The stars are yours.' },
];

function getRank(score, total) {
  const ratio = total > 0 ? Math.round((score / total) * 10) : 0;
  return RANK_TIERS.find(t => ratio >= t.min && ratio <= t.max) ?? RANK_TIERS[0];
}

function formatTime(ms) {
  const s = Math.round(ms / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  return `${m}m ${s % 60}s`;
}

// ── Hover helpers ─────────────────────────────────────────────────────────────
function amberIn(e) {
  e.currentTarget.style.borderColor = T.amber;
  e.currentTarget.style.color       = T.amber;
  e.currentTarget.style.boxShadow   = '0 0 24px rgba(240,160,0,0.18)';
}
function amberOut(e) {
  e.currentTarget.style.borderColor = 'rgba(240,160,0,0.55)';
  e.currentTarget.style.color       = T.white;
  e.currentTarget.style.boxShadow   = 'none';
}
function ghostIn(e) {
  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
  e.currentTarget.style.color       = T.white;
}
function ghostOut(e) {
  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
  e.currentTarget.style.color       = T.gray;
}

// ── Phase machine: 'loading' | 'error' | 'intro' | 'quiz' | 'submitting' | 'result' | 'leaderboard'
export default function QuizPage() {
  const [phase,       setPhase]       = useState('loading');
  const [questions,   setQuestions]   = useState([]);
  const [fetchError,  setFetchError]  = useState(null);

  // Quiz state — { [questionId]: selectedIndex }
  const [answers,     setAnswers]     = useState({});
  // Result state
  const [result,      setResult]      = useState(null);
  const [submitError, setSubmitError] = useState(null);

  // Leaderboard / name
  const [username,    setUsername]    = useState('');
  const [usernameErr, setUsernameErr] = useState('');
  const [submitted,   setSubmitted]   = useState(false);

  // Timer
  const startTimeRef = useRef(null);

  // Visibility
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  // ── Fetch questions ────────────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch('/api/questions?count=10');
        if (!res.ok) throw new Error(`Server error ${res.status}`);
        const data = await res.json();
        if (cancelled) return;
        if (!data.questions?.length) throw new Error('No questions returned');
        setQuestions(data.questions);
        setPhase('intro');
      } catch (err) {
        if (!cancelled) { setFetchError(err.message); setPhase('error'); }
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const total = questions.length;

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleStart = useCallback(() => {
    setAnswers({});
    setResult(null);
    setSubmitError(null);
    setSubmitted(false);
    setUsername('');
    setUsernameErr('');
    startTimeRef.current = Date.now();
    setPhase('quiz');
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50);
  }, []);

  const handleSelect = useCallback((questionId, optIdx) => {
    setAnswers(prev => ({ ...prev, [questionId]: optIdx }));
  }, []);

  const handleSubmitQuiz = useCallback(async () => {
    setPhase('submitting');
    setSubmitError(null);
    const timeSpent = startTimeRef.current ? Date.now() - startTimeRef.current : 0;
    const payload = {
      username: username.trim() || 'ANONYMOUS',
      answers: Object.entries(answers).map(([questionId, selectedIndex]) => ({
        questionId,
        selectedIndex,
      })),
      timeSpent,
    };
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? `HTTP ${res.status}`);
      setResult(data);
      setPhase('result');
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50);
    } catch (err) {
      setSubmitError(err.message);
      setPhase('quiz');
    }
  }, [username, answers]);

  const handleRegisterAndSubmit = useCallback(async () => {
    if (!username.trim()) {
      setUsernameErr('Please enter your name before submitting.');
      return;
    }
    if (!/^[A-Za-z0-9 _\-\.]+$/.test(username.trim())) {
      setUsernameErr('Name may only contain letters, numbers, spaces, and - _ .');
      return;
    }
    setUsernameErr('');
    if (submitted) { setPhase('leaderboard'); return; }

    const timeSpent = startTimeRef.current ? Date.now() - startTimeRef.current : 0;
    const payload = {
      username: username.trim(),
      answers: Object.entries(answers).map(([questionId, selectedIndex]) => ({
        questionId,
        selectedIndex,
      })),
      timeSpent,
    };
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? `HTTP ${res.status}`);
      setResult(data);
      setSubmitted(true);
      setPhase('leaderboard');
    } catch (err) {
      setSubmitError(err.message);
    }
  }, [username, answers, submitted]);

  const handleRestart = useCallback(() => {
    setPhase('intro');
    setAnswers({});
    setResult(null);
    setSubmitError(null);
    setSubmitted(false);
    setUsername('');
    setUsernameErr('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // ── Derived ───────────────────────────────────────────────────────────────
  const rank = result ? getRank(result.score, result.total) : null;
  const correctMap = {};
  if (result?.correctAnswers) {
    result.correctAnswers.forEach(a => { correctMap[a.questionId] = a.correctIndex; });
  }
  const answeredCount = Object.keys(answers).length;

  // ── LOADING ───────────────────────────────────────────────────────────────
  const renderLoading = () => (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      minHeight: 'calc(100vh - 90px)', gap: 28,
    }}>
      <div style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: 'clamp(60px, 12vw, 140px)',
        letterSpacing: 8, color: T.white, lineHeight: 0.9, textAlign: 'center',
        opacity: 0, animation: 'fadeUpIn 0.8s ease forwards 0.2s',
      }}>
        LOADING<br />
        <span style={{ color: 'rgba(237,233,223,0.4)', fontSize: '0.55em' }}>MISSION DATA</span>
      </div>
      <div style={{ width: 180, height: 1, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          background: `linear-gradient(90deg, transparent, ${T.amber}, transparent)`,
          animation: 'loadBar 1.4s ease-in-out infinite',
        }} />
      </div>
      <div style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: 9, letterSpacing: 5, color: T.gray, textTransform: 'uppercase',
        animation: 'lbBlink 1.2s ease-in-out infinite',
      }}>
        Connecting to Gargantua...
      </div>
    </div>
  );

  // ── ERROR ─────────────────────────────────────────────────────────────────
  const renderError = () => (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      minHeight: 'calc(100vh - 90px)', padding: '0 24px', textAlign: 'center', gap: 28,
    }}>
      <div style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: 9, letterSpacing: 7, color: 'rgba(200,80,80,0.8)', textTransform: 'uppercase',
      }}>
        // SIGNAL LOST //
      </div>
      <h2 style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: 'clamp(40px, 8vw, 90px)', letterSpacing: 8, color: T.white,
      }}>
        TRANSMISSION FAILED
      </h2>
      <p style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontStyle: 'italic', fontSize: 18, color: T.gray, maxWidth: 440,
      }}>
        {fetchError ?? 'Unable to reach the mission database. Check your connection.'}
      </p>
      <button
        onClick={() => window.location.reload()}
        style={{
          background: 'transparent', border: '1px solid rgba(240,160,0,0.55)',
          color: T.white, padding: '14px 40px',
          fontFamily: "'Space Mono', monospace",
          fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', cursor: 'pointer',
          transition: 'all 0.3s',
        }}
        onMouseEnter={amberIn} onMouseLeave={amberOut}
      >
        RETRY CONNECTION
      </button>
    </div>
  );

  // ── INTRO ─────────────────────────────────────────────────────────────────
  const renderIntro = () => (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', minHeight: 'calc(100vh - 90px)',
      padding: '0 24px', textAlign: 'center',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(36px)',
      transition: 'opacity 1s ease, transform 1s ease',
    }}>
      <div style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: 10, letterSpacing: 9, color: T.amber,
        textTransform: 'uppercase', marginBottom: 32,
      }}>
        // LAZARUS INTELLIGENCE ASSESSMENT — SECTOR GARGANTUA //
      </div>

      <h1 style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: 'clamp(72px, 14vw, 180px)',
        lineHeight: 0.88, letterSpacing: 8, color: T.white, marginBottom: 12,
        textShadow: '0 0 120px rgba(240,150,0,0.14)',
      }}>MISSION</h1>
      <h1 style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: 'clamp(72px, 14vw, 180px)',
        lineHeight: 0.88, letterSpacing: 8,
        color: 'rgba(237,233,223,0.8)', marginBottom: 36,
      }}>QUIZ</h1>

      <p style={{
        fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontWeight: 300,
        fontSize: 'clamp(16px, 2vw, 24px)',
        color: T.gray, letterSpacing: 4, marginBottom: 20,
      }}>
        Beyond the Horizon of Human Knowledge
      </p>

      <div style={{
        width: 60, height: 1,
        background: `linear-gradient(90deg, transparent, ${T.amber}, transparent)`,
        margin: '0 auto 36px',
      }} />

      <p style={{
        maxWidth: 580, fontSize: 15, lineHeight: 1.92, color: T.gray,
        marginBottom: 52, fontWeight: 300,
      }}>
        {total} questions stand between you and the stars. Answer all questions, then submit
        your mission report. The cosmos is watching, Commander.
      </p>

      <div style={{ display: 'flex', gap: 48, marginBottom: 56, justifyContent: 'center', flexWrap: 'wrap' }}>
        {[
          { num: total, label: 'Questions'      },
          { num: 5,     label: 'Rank Tiers'     },
          { num: '∞',  label: 'Glory at Stake' },
        ].map(item => (
          <div key={item.label} style={{ borderLeft: `2px solid rgba(120,80,0,0.7)`, paddingLeft: 20, textAlign: 'left' }}>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 44, color: T.white, lineHeight: 1 }}>{item.num}</div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: 3, color: T.gray, textTransform: 'uppercase', marginTop: 6 }}>{item.label}</div>
          </div>
        ))}
      </div>

      <button
        onClick={handleStart}
        style={{
          background: 'transparent', border: '1px solid rgba(240,160,0,0.55)',
          color: T.white, padding: '16px 52px',
          fontFamily: "'Space Mono', monospace",
          fontSize: 11, letterSpacing: 5, textTransform: 'uppercase',
          cursor: 'pointer', transition: 'all 0.4s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = T.amber;
          e.currentTarget.style.color       = T.amber;
          e.currentTarget.style.boxShadow   = '0 0 36px rgba(240,160,0,0.2), inset 0 0 20px rgba(240,160,0,0.04)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'rgba(240,160,0,0.55)';
          e.currentTarget.style.color       = T.white;
          e.currentTarget.style.boxShadow   = 'none';
        }}
      >
        BEGIN MISSION
      </button>

      <div style={{ marginTop: 72, opacity: 0.35, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, letterSpacing: 4, color: T.amber, textTransform: 'uppercase' }}>
          Transmission Ready
        </div>
        <div style={{ width: 1, height: 44, background: `linear-gradient(to bottom, ${T.amber}, transparent)` }} />
      </div>
    </div>
  );

  // ── SUBMITTING ────────────────────────────────────────────────────────────
  const renderSubmitting = () => (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      minHeight: 'calc(100vh - 90px)', gap: 24,
    }}>
      <div style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: 'clamp(48px, 9vw, 100px)', letterSpacing: 8, color: T.white, textAlign: 'center',
      }}>
        TRANSMITTING<br />
        <span style={{ color: 'rgba(237,233,223,0.35)', fontSize: '0.5em' }}>RESULTS TO ARCHIVE</span>
      </div>
      <div style={{ width: 200, height: 1, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          background: `linear-gradient(90deg, transparent, ${T.amber}, transparent)`,
          animation: 'loadBar 1.2s ease-in-out infinite',
        }} />
      </div>
    </div>
  );

  // ── QUIZ — full scroll ────────────────────────────────────────────────────
  const renderQuiz = () => (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '60px 24px 140px' }}>

      {/* Sticky progress bar */}
      <div style={{
        position: 'sticky', top: 70, zIndex: 100,
        background: 'rgba(0,0,10,0.92)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(240,160,0,0.08)',
        padding: '16px 0 14px', marginBottom: 48,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: 5, color: T.amber, textTransform: 'uppercase' }}>
            — MISSION QUIZ —
          </div>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: 3, color: T.gray, textTransform: 'uppercase' }}>
            ANSWERED: <span style={{ color: answeredCount === total ? T.amber : T.white }}>{answeredCount}</span> / {total}
          </div>
        </div>
        {/* Dot indicators */}
        <div style={{ display: 'flex', gap: 6 }}>
          {questions.map((q, i) => (
            <div key={i} style={{
              flex: 1, height: 3,
              background: answers[q._id] !== undefined ? T.amber : 'rgba(255,255,255,0.08)',
              boxShadow: answers[q._id] !== undefined ? '0 0 6px rgba(240,160,0,0.5)' : 'none',
              transition: 'background 0.4s ease, box-shadow 0.4s ease',
            }} />
          ))}
        </div>
      </div>

      {/* All questions */}
      {questions.map((q, qIdx) => (
        <QuestionCard
          key={q._id}
          question={q}
          index={qIdx}
          total={total}
          selectedIdx={answers[q._id] ?? null}
          onSelect={(optIdx) => handleSelect(q._id, optIdx)}
          revealed={false}
          correctIndex={null}
        />
      ))}

      {/* Submit error */}
      {submitError && (
        <div style={{
          padding: '14px 18px', marginBottom: 24,
          background: 'rgba(200,50,50,0.08)', border: '1px solid rgba(200,50,50,0.3)',
          fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: 2,
          color: 'rgba(200,100,100,0.9)',
        }}>
          ⚠ {submitError}
        </div>
      )}

      {/* Submit button */}
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
        marginTop: 16,
        animation: 'fadeUpIn 0.6s ease forwards',
      }}>
        {answeredCount < total && (
          <div style={{
            fontFamily: "'Space Mono', monospace", fontSize: 8, letterSpacing: 3,
            color: 'rgba(122,122,146,0.55)', textTransform: 'uppercase', marginBottom: 4,
          }}>
            {total - answeredCount} question{total - answeredCount !== 1 ? 's' : ''} remaining
          </div>
        )}
        <button
          onClick={handleSubmitQuiz}
          disabled={answeredCount === 0}
          style={{
            background: answeredCount === total
              ? 'transparent'
              : 'transparent',
            border: `1px solid ${answeredCount === total ? 'rgba(240,160,0,0.7)' : 'rgba(240,160,0,0.25)'}`,
            color: answeredCount === total ? T.white : 'rgba(122,122,146,0.5)',
            padding: '18px 64px',
            fontFamily: "'Space Mono', monospace",
            fontSize: 11, letterSpacing: 5, textTransform: 'uppercase',
            cursor: answeredCount === 0 ? 'not-allowed' : 'pointer',
            transition: 'all 0.4s',
          }}
          onMouseEnter={e => {
            if (answeredCount === 0) return;
            e.currentTarget.style.borderColor = T.amber;
            e.currentTarget.style.color       = T.amber;
            e.currentTarget.style.boxShadow   = '0 0 40px rgba(240,160,0,0.2), inset 0 0 20px rgba(240,160,0,0.04)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = answeredCount === total ? 'rgba(240,160,0,0.7)' : 'rgba(240,160,0,0.25)';
            e.currentTarget.style.color       = answeredCount === total ? T.white : 'rgba(122,122,146,0.5)';
            e.currentTarget.style.boxShadow   = 'none';
          }}
        >
          SUBMIT MISSION →
        </button>
        <div style={{
          fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic',
          fontSize: 13, color: 'rgba(122,122,146,0.4)',
        }}>
          You may answer questions in any order before submitting
        </div>
      </div>
    </div>
  );

  // ── RESULT ────────────────────────────────────────────────────────────────
  const renderResult = () => {
    if (!result) return null;
    const { score, total: tot, correctAnswers } = result;
    const r   = getRank(score, tot);
    const pct = Math.round((score / tot) * 100);

    return (
      <div style={{
        maxWidth: 860, margin: '0 auto', padding: '60px 24px 120px', textAlign: 'center',
      }}>
        <div style={{
          fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: 8, color: T.amber,
          textTransform: 'uppercase', marginBottom: 28,
          animation: 'fadeUpIn 0.7s ease forwards',
        }}>
          // TRANSMISSION RECEIVED — MISSION DEBRIEF //
        </div>

        {/* Score card */}
        <div style={{
          background: 'rgba(0,0,14,0.90)', border: '1px solid rgba(240,160,0,0.15)',
          padding: '52px 48px', position: 'relative', marginBottom: 36, overflow: 'hidden',
          backdropFilter: 'blur(16px)',
          animation: 'fadeUpIn 0.8s ease forwards 0.1s', opacity: 0,
        }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 2,
            background: `linear-gradient(90deg, transparent, ${T.amber}, transparent)`,
          }} />
          <div style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(80px, 18vw, 140px)', lineHeight: 1, color: T.white,
            textShadow: '0 0 80px rgba(240,150,0,0.3)',
          }}>
            {score}<span style={{ fontSize: '0.35em', color: T.amberDim, verticalAlign: 'middle' }}>/{tot}</span>
          </div>

          <div style={{
            display: 'inline-block',
            background: 'rgba(240,160,0,0.08)', border: `1px solid rgba(240,160,0,0.2)`,
            padding: '6px 20px', marginBottom: 16,
            fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: 3,
            color: T.amber, textTransform: 'uppercase',
          }}>
            {pct}% ACCURACY
          </div>

          <div style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(28px, 5vw, 52px)', letterSpacing: 8, color: T.amber,
            margin: '8px 0 20px', textShadow: '0 0 30px rgba(240,160,0,0.35)',
          }}>
            {r.title}
          </div>
          <div style={{ width: 60, height: 1, background: `linear-gradient(90deg, transparent, rgba(240,160,0,0.4), transparent)`, margin: '0 auto 24px' }} />
          <p style={{
            fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontWeight: 300,
            fontSize: 18, lineHeight: 1.7, color: T.gray,
          }}>
            {r.desc}
          </p>

          {/* Ghost number */}
          <div style={{
            position: 'absolute', bottom: -20, right: 20,
            fontFamily: "'Bebas Neue', sans-serif", fontSize: 180,
            color: 'rgba(255,255,255,0.018)', lineHeight: 1,
            userSelect: 'none', pointerEvents: 'none',
          }}>
            {score}
          </div>
        </div>

        {/* Per-question answer breakdown */}
        {correctAnswers?.length > 0 && (
          <div style={{
            marginBottom: 48,
            animation: 'fadeUpIn 0.8s ease forwards 0.2s', opacity: 0,
          }}>
            <div style={{
              fontFamily: "'Space Mono', monospace", fontSize: 8, letterSpacing: 4,
              color: T.amberDim, textTransform: 'uppercase', marginBottom: 16, textAlign: 'left',
            }}>
              ◈ Answer Breakdown
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {questions.map((q, i) => {
                const ca = correctAnswers[i];
                if (!ca) return null;
                const isCorrect = ca.isCorrect;
                return (
                  <div key={q._id} style={{
                    display: 'grid', gridTemplateColumns: '32px 1fr auto',
                    gap: 12, alignItems: 'center',
                    padding: '12px 16px',
                    background: isCorrect ? T.greenBg : T.redBg,
                    border: `1px solid ${isCorrect ? T.greenBorder : T.redBorder}`,
                    transition: 'all 0.3s',
                    textAlign: 'left',
                  }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: '50%', display: 'flex',
                      alignItems: 'center', justifyContent: 'center',
                      background: isCorrect ? 'rgba(60,200,100,0.15)' : 'rgba(200,60,50,0.15)',
                      border: `1px solid ${isCorrect ? T.greenBorder : T.redBorder}`,
                      fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: 1,
                      color: isCorrect ? T.green : T.red,
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div style={{
                      fontFamily: "'Lato', sans-serif", fontWeight: 300,
                      fontSize: 13, color: isCorrect ? 'rgba(237,233,223,0.85)' : 'rgba(237,233,223,0.5)',
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>
                      {q.question}
                    </div>
                    <div style={{
                      fontFamily: "'Space Mono', monospace", fontSize: 8, letterSpacing: 2,
                      color: isCorrect ? T.green : T.red, textTransform: 'uppercase', whiteSpace: 'nowrap',
                    }}>
                      {isCorrect ? '✓ CORRECT' : '✗ WRONG'}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Dot bar */}
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${tot}, 1fr)`, gap: 4, marginTop: 20 }}>
              {correctAnswers.map((a, i) => (
                <div key={i} style={{
                  height: 4, borderRadius: 2,
                  background: a.isCorrect ? T.amber : 'rgba(200,50,50,0.55)',
                  boxShadow: a.isCorrect ? '0 0 8px rgba(240,160,0,0.5)' : 'none',
                  transition: 'all 0.4s',
                }} />
              ))}
            </div>
          </div>
        )}

        {/* Name + register */}
        <div style={{
          background: 'rgba(0,0,14,0.92)', border: '1px solid rgba(240,160,0,0.1)',
          padding: '36px 40px', marginBottom: 24, backdropFilter: 'blur(16px)',
          animation: 'fadeUpIn 0.8s ease forwards 0.35s', opacity: 0,
        }}>
          <div style={{
            fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: 5, color: T.amberDim,
            textTransform: 'uppercase', marginBottom: 20,
          }}>
            ◈ Register Your Name — Mission Archive
          </div>

          <label style={{
            display: 'block', fontFamily: "'Space Mono', monospace", fontSize: 8,
            letterSpacing: 4, color: T.gray, textTransform: 'uppercase', marginBottom: 10,
          }}>
            Enter name
          </label>
          <input
            type="text" maxLength={30}
            placeholder="YOUR NAME..."
            value={username}
            onChange={e => { setUsername(e.target.value); setUsernameErr(''); }}
            style={{
              width: '100%', background: 'transparent',
              border: 'none', borderBottom: '1px solid rgba(240,160,0,0.25)',
              color: T.white, padding: '10px 4px',
              fontFamily: "'Space Mono', monospace", fontSize: 14, letterSpacing: 6,
              textTransform: 'uppercase', outline: 'none', marginBottom: 8, caretColor: T.amber,
            }}
            onFocus={e => { e.target.style.borderBottomColor = T.amber; }}
            onBlur={e => { e.target.style.borderBottomColor = 'rgba(240,160,0,0.25)'; }}
          />
          {usernameErr && (
            <div style={{
              fontFamily: "'Space Mono', monospace", fontSize: 8, letterSpacing: 2,
              color: 'rgba(200,80,80,0.8)', marginBottom: 20,
            }}>
              ⚠ {usernameErr}
            </div>
          )}
          {!usernameErr && <div style={{ marginBottom: 20 }} />}

          {submitError && (
            <div style={{
              padding: '10px 14px', marginBottom: 16,
              background: 'rgba(200,50,50,0.08)', border: '1px solid rgba(200,50,50,0.3)',
              fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: 2,
              color: 'rgba(200,100,100,0.9)',
            }}>
              ⚠ {submitError}
            </div>
          )}

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={handleRegisterAndSubmit}
              style={{
                background: 'transparent', border: '1px solid rgba(240,160,0,0.55)',
                color: T.white, padding: '14px 44px',
                fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: 4,
                textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.3s',
              }}
              onMouseEnter={amberIn} onMouseLeave={amberOut}
            >
              {submitted ? 'VIEW LEADERBOARD →' : 'SUBMIT TO ARCHIVE →'}
            </button>
            <button
              onClick={handleRestart}
              style={{
                background: 'transparent', border: '1px solid rgba(255,255,255,0.1)',
                color: T.gray, padding: '14px 36px',
                fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: 4,
                textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.3s',
              }}
              onMouseEnter={ghostIn} onMouseLeave={ghostOut}
            >
              RETRY MISSION
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ── LEADERBOARD ───────────────────────────────────────────────────────────
  const renderLeaderboard = () => (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '80px 24px 140px' }}>
      <Leaderboard highlightUsername={username} />

      <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginTop: 48 }}>
        <button
          onClick={handleRestart}
          style={{
            background: 'transparent', border: '1px solid rgba(240,160,0,0.55)',
            color: T.white, padding: '14px 44px',
            fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: 4,
            textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.3s',
          }}
          onMouseEnter={amberIn} onMouseLeave={amberOut}
        >
          NEW MISSION →
        </button>

        <Link href="/" legacyBehavior>
          <a
            style={{
              background: 'transparent', border: '1px solid rgba(255,255,255,0.1)',
              color: T.gray, padding: '14px 36px',
              fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: 4,
              textTransform: 'uppercase', cursor: 'pointer',
              textDecoration: 'none', display: 'inline-block', transition: 'all 0.3s',
            }}
            onMouseEnter={ghostIn} onMouseLeave={ghostOut}
          >
            ← RETURN HOME
          </a>
        </Link>
      </div>
    </div>
  );

  // ── Main return ───────────────────────────────────────────────────────────
  return (
    <>
      <Head>
        <title>Mission Quiz — INTERSTELLAR</title>
        <meta name="description" content="Test your knowledge of the cosmos." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Space+Mono:wght@400;700&family=Lato:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* Black Hole background */}
      <BlackHoleCanvas />

      {/* Vignette + scrim */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,8,0.65) 100%)',
      }} />
      <div style={{
        position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'rgba(0,0,10,0.48)',
      }} />

      {/* Navbar */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        padding: '22px 64px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'rgba(0,0,12,0.82)', backdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(240,160,0,0.12)',
      }}>
        <Link href="/" style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 20, letterSpacing: 7, color: T.white, textDecoration: 'none',
        }}>
          INTER<span style={{ color: T.amber }}>✦</span>STELLAR
        </Link>

        <div style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 10, letterSpacing: 4, color: T.amber, textTransform: 'uppercase',
        }}>
          // MISSION QUIZ //
        </div>

        <Link href="/" legacyBehavior>
          <a style={{
            fontFamily: "'Space Mono', monospace", fontSize: 9,
            letterSpacing: 3, color: T.gray,
            textDecoration: 'none', textTransform: 'uppercase',
            border: '1px solid rgba(240,160,0,0.2)', padding: '8px 16px',
            transition: 'all 0.3s', display: 'inline-block',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.color       = T.amber;
            e.currentTarget.style.borderColor = 'rgba(240,160,0,0.6)';
            e.currentTarget.style.boxShadow   = '0 0 16px rgba(240,160,0,0.12)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color       = T.gray;
            e.currentTarget.style.borderColor = 'rgba(240,160,0,0.2)';
            e.currentTarget.style.boxShadow   = 'none';
          }}>
            ← HOME
          </a>
        </Link>
      </nav>

      {/* Content */}
      <main style={{
        position: 'relative', zIndex: 2,
        minHeight: '100vh', paddingTop: 90,
        fontFamily: "'Lato', sans-serif", color: T.white,
      }}>
        {phase === 'loading'     && renderLoading()}
        {phase === 'error'       && renderError()}
        {phase === 'intro'       && renderIntro()}
        {phase === 'quiz'        && renderQuiz()}
        {phase === 'submitting'  && renderSubmitting()}
        {phase === 'result'      && renderResult()}
        {phase === 'leaderboard' && renderLeaderboard()}
      </main>

      {/* Footer */}
      <footer style={{
        position: 'relative', zIndex: 2,
        background: '#000', borderTop: '1px solid rgba(240,160,0,0.08)',
        padding: '40px 64px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 20,
      }}>
        <div>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, letterSpacing: 7, color: T.white }}>
            INTER<span style={{ color: T.amber }}>✦</span>STELLAR
          </div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', color: T.gray, fontSize: 13, marginTop: 6 }}>
            We are explorers, born of starlight
          </div>
        </div>
        <div style={{
          fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: 2,
          color: 'rgba(237,233,223,0.4)', lineHeight: 2, textAlign: 'right',
        }}>
          MMXXVII — MISSION LAZARUS<br />
          SECTOR: GARGANTUA SYSTEM<br />
          QUIZ MODULE: ACTIVE
        </div>
      </footer>

      {/* Global styles */}
      <style>{`
        *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
        html { scroll-behavior: smooth; }
        body { background:#000; overflow-x:hidden; cursor:default; }

        @keyframes fadeUpIn {
          from { opacity:0; transform:translateY(22px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes loadBar {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes lbBlink {
          0%,100% { opacity:1; }
          50%      { opacity:0.3; }
        }
        @keyframes optionReveal {
          from { opacity:0; transform:translateX(-8px); }
          to   { opacity:1; transform:translateX(0); }
        }

        button:focus  { outline:none; }
        input::placeholder { color:rgba(122,122,146,0.4); letter-spacing:5px; }

        @media (max-width: 720px) {
          nav { padding: 16px 20px !important; }
          .quiz-answer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}

// ── QuestionCard sub-component ────────────────────────────────────────────────
function QuestionCard({ question, index, total, selectedIdx, onSelect, revealed, correctIndex }) {
  const isAnswered = selectedIdx !== null && selectedIdx !== undefined;

  return (
    <div
      style={{
        marginBottom: 40,
        opacity: 0,
        animation: `fadeUpIn 0.55s ease forwards ${index * 0.07}s`,
      }}
    >
      {/* Question header */}
      <div style={{
        background: 'rgba(0,0,14,0.88)', border: '1px solid rgba(240,160,0,0.12)',
        padding: '36px 40px 32px', marginBottom: 4,
        position: 'relative', overflow: 'hidden', backdropFilter: 'blur(12px)',
        borderBottom: isAnswered ? '1px solid rgba(240,160,0,0.2)' : '1px solid rgba(240,160,0,0.12)',
        transition: 'border-color 0.4s',
      }}>
        {/* Top accent line */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 1,
          background: isAnswered
            ? 'linear-gradient(90deg, transparent, rgba(240,160,0,0.5), transparent)'
            : 'linear-gradient(90deg, transparent, rgba(240,160,0,0.2), transparent)',
          transition: 'background 0.4s',
        }} />

        {/* Ghost number */}
        <div style={{
          position: 'absolute', top: 8, right: 20,
          fontFamily: "'Bebas Neue', sans-serif", fontSize: 88,
          color: 'rgba(255,255,255,0.022)', lineHeight: 1,
          userSelect: 'none', pointerEvents: 'none',
        }}>
          {String(index + 1).padStart(2, '0')}
        </div>

        {/* Question number + category */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20,
        }}>
          <div style={{
            fontFamily: "'Space Mono', monospace", fontSize: 8, letterSpacing: 5,
            color: isAnswered ? '#F0A000' : '#7A5000', textTransform: 'uppercase',
            transition: 'color 0.4s',
          }}>
            — {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')} —
          </div>
          {question.category && (
            <div style={{
              fontFamily: "'Space Mono', monospace", fontSize: 7, letterSpacing: 4,
              color: 'rgba(122,122,146,0.5)', textTransform: 'uppercase',
            }}>
              {question.category}
            </div>
          )}
          {isAnswered && (
            <div style={{
              marginLeft: 'auto',
              fontFamily: "'Space Mono', monospace", fontSize: 7, letterSpacing: 3,
              color: 'rgba(240,160,0,0.6)', textTransform: 'uppercase',
              animation: 'fadeUpIn 0.3s ease forwards',
            }}>
              ✓ ANSWERED
            </div>
          )}
        </div>

        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
          fontSize: 'clamp(20px, 2.8vw, 30px)', lineHeight: 1.45, color: '#EDE9DF', letterSpacing: 0.5,
        }}>
          {question.question}
        </h2>
      </div>

      {/* Options grid */}
      <div className="quiz-answer-grid" style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4,
      }}>
        {question.options.map((opt, i) => {
  const isPicked   = i === selectedIdx;
  const isCorrect  = revealed && correctIndex !== null && i === correctIndex;
  const isWrong    = revealed && isPicked && !isCorrect;

  let borderColor, bg, labelBg, labelColor, textColor, boxShadow, transform;

  if (revealed && isCorrect) {
    borderColor = 'rgba(60,200,100,0.55)';
    bg          = 'rgba(40,160,70,0.10)';
    labelBg     = 'rgba(60,200,100,0.18)';
    labelColor  = 'rgba(60,200,100,0.9)';
    textColor   = '#FFFFFF';
    boxShadow   = '0 0 20px rgba(60,200,100,0.1)';
    transform   = 'none';
  } else if (revealed && isWrong) {
    borderColor = 'rgba(200,70,60,0.55)';
    bg          = 'rgba(200,50,50,0.08)';
    labelBg     = 'rgba(200,70,60,0.18)';
    labelColor  = 'rgba(200,70,60,0.9)';
    textColor   = 'rgba(255,255,255,0.45)';
    boxShadow   = 'none';
    transform   = 'none';
  } else if (isPicked) {
    borderColor = 'rgba(240,160,0,0.65)';
    bg          = 'rgba(240,160,0,0.08)';
    labelBg     = 'rgba(240,160,0,0.22)';
    labelColor  = '#F0A000';
    textColor   = '#FFFFFF';
    boxShadow   = '0 0 24px rgba(240,160,0,0.12)';
    transform   = 'translateY(-1px)';
  } else {
    borderColor = 'rgba(255,255,255,0.10)';
    bg          = 'rgba(0,0,14,0.75)';
    labelBg     = 'rgba(255,255,255,0.05)';
    labelColor  = 'rgba(200,200,220,0.7)';
    textColor   = 'rgba(255,255,255,0.85)';
    boxShadow   = 'none';
    transform   = 'none';
  }

  return (
    <button
      key={i}
      onClick={() => !revealed && onSelect(i)}
      style={{
        background: bg,
        border: `1px solid ${borderColor}`,
        padding: '18px 20px',
        textAlign: 'left',
        cursor: revealed ? 'default' : 'pointer',
        transition: 'all 0.28s ease',
        position: 'relative',
        overflow: 'hidden',
        backdropFilter: 'blur(8px)',
        boxShadow,
        transform,
        display: 'flex',
        alignItems: 'flex-start',
        gap: 14,
        animation: `optionReveal 0.4s ease forwards ${i * 0.06}s`,
        opacity: 0,
      }}
      onMouseEnter={e => {
        if (revealed || isPicked) return;
        e.currentTarget.style.borderColor = 'rgba(240,160,0,0.35)';
        e.currentTarget.style.background  = 'rgba(240,160,0,0.04)';
        e.currentTarget.style.boxShadow   = '0 0 18px rgba(240,160,0,0.08)';
        e.currentTarget.style.transform   = 'translateY(-2px)';
      }}
      onMouseLeave={e => {
        if (revealed || isPicked) return;
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)';
        e.currentTarget.style.background  = 'rgba(0,0,14,0.75)';
        e.currentTarget.style.boxShadow   = 'none';
        e.currentTarget.style.transform   = 'none';
      }}
    >
      {isPicked && !revealed && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(240,160,0,0.6), transparent)',
          }}
        />
      )}

      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: '50%',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: labelBg,
          border: `1px solid ${borderColor}`,
          fontFamily: "'Space Mono', monospace",
          fontSize: 10,
          fontWeight: 700,
          color: labelColor,
          marginTop: 1,
        }}
      >
        {OPTION_LABELS[i]}
      </div>

      <div
        style={{
          fontFamily: "'Lato', sans-serif",
          fontWeight: 400,
          fontSize: 14,
          lineHeight: 1.65,
          color: textColor,
          paddingTop: 4,
        }}
      >
        {opt}
      </div>
    </button>
  );
})}
      </div>
    </div>
  );
}
