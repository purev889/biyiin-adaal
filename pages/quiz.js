// pages/quiz.js
// Interstellar — Mission Quiz Page
// Matches the visual language of the main Interstellar landing page exactly.

import { useState, useEffect, useRef, useCallback } from 'react';
import Head from 'next/head';
import QUESTIONS, { RANK_TIERS } from '../data/questions';

// ─── Starfield Canvas ────────────────────────────────────────────────────────
function StarCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, stars = [], anim;

    function resize() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
      stars = Array.from({ length: Math.min(Math.floor(W * H / 7000), 420) }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.2 + 0.1,
        b: Math.random() * 0.65 + 0.15,
        phase: Math.random() * Math.PI * 2,
        spd: Math.random() * 0.6 + 0.2,
      }));
    }

    let t = 0;
    function frame() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#00000A';
      ctx.fillRect(0, 0, W, H);

      // Subtle nebula glow
      const gr = ctx.createRadialGradient(W * 0.5, H * 0.35, H * 0.1, W * 0.5, H * 0.5, H * 0.9);
      gr.addColorStop(0,   'rgba(25,45,120,0.07)');
      gr.addColorStop(0.5, 'rgba(10,20,60,0.04)');
      gr.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.fillStyle = gr;
      ctx.fillRect(0, 0, W, H);

      stars.forEach(s => {
        const b = s.b * (0.5 + 0.5 * Math.sin(t * s.spd + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(210,218,255,${b})`;
        ctx.fill();
      });

      t += 0.008;
      anim = requestAnimationFrame(frame);
    }

    resize();
    window.addEventListener('resize', resize);
    frame();
    return () => {
      cancelAnimationFrame(anim);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
    />
  );
}

// ─── Utility helpers ─────────────────────────────────────────────────────────
function getRank(score) {
  return RANK_TIERS.find(t => score >= t.min && score <= t.max) || RANK_TIERS[0];
}

function getLeaderboard() {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem('interstellar_lb') || '[]');
  } catch { return []; }
}

function saveScore(name, score) {
  const lb = getLeaderboard();
  lb.push({ name: name.trim().toUpperCase() || 'UNKNOWN', score, date: Date.now() });
  lb.sort((a, b) => b.score - a.score || a.date - b.date);
  const top = lb.slice(0, 20);
  localStorage.setItem('interstellar_lb', JSON.stringify(top));
  return top;
}

// ─── Phases ──────────────────────────────────────────────────────────────────
// 'intro' | 'quiz' | 'result' | 'leaderboard'

export default function QuizPage() {
  const [phase, setPhase]         = useState('intro');
  const [qIndex, setQIndex]       = useState(0);
  const [selected, setSelected]   = useState(null); // index of picked option
  const [revealed, setRevealed]   = useState(false);
  const [score, setScore]         = useState(0);
  const [answers, setAnswers]     = useState([]); // {qId, picked, correct}
  const [nameInput, setNameInput] = useState('');
  const [leaderboard, setLb]      = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [visible, setVisible]     = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (phase === 'leaderboard') setLb(getLeaderboard());
  }, [phase]);

  const currentQ = QUESTIONS[qIndex];
  const total    = QUESTIONS.length;

  const handleStart = () => {
    setPhase('quiz');
    setQIndex(0);
    setScore(0);
    setAnswers([]);
    setSelected(null);
    setRevealed(false);
  };

  const handleSelect = (optIdx) => {
    if (revealed) return;
    setSelected(optIdx);
    setRevealed(true);
    const isCorrect = optIdx === currentQ.correct;
    if (isCorrect) setScore(s => s + 1);
    setAnswers(a => [...a, { qId: currentQ.id, picked: optIdx, correct: isCorrect }]);
  };

  const handleNext = () => {
    if (transitioning) return;
    setTransitioning(true);
    setTimeout(() => {
      if (qIndex + 1 >= total) {
        setPhase('result');
      } else {
        setQIndex(i => i + 1);
        setSelected(null);
        setRevealed(false);
      }
      setTransitioning(false);
    }, 420);
  };

  const handleSubmitScore = () => {
    if (submitted) { setPhase('leaderboard'); return; }
    const top = saveScore(nameInput, score);
    setLb(top);
    setSubmitted(true);
    setPhase('leaderboard');
  };

  const handleRestart = () => {
    setPhase('intro');
    setQIndex(0);
    setScore(0);
    setAnswers([]);
    setSelected(null);
    setRevealed(false);
    setSubmitted(false);
    setNameInput('');
  };

  const rank = getRank(score);

  return (
    <>
      <Head>
        <title>Mission Quiz — INTERSTELLAR</title>
        <meta name="description" content="Test your knowledge of the cosmos. The Interstellar challenge awaits." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Space+Mono:wght@400;700&family=Lato:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* ── Background ── */}
      <StarCanvas />
      <div style={{
        position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,8,0.55) 100%)'
      }} />

      {/* ── Navbar ── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        padding: '22px 64px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'rgba(0,0,12,0.82)', backdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(240,160,0,0.12)',
      }}>
        <a href="/" style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 20, letterSpacing: 7,
          color: '#EDE9DF', textDecoration: 'none',
        }}>
          INTER<span style={{ color: '#F0A000' }}>✦</span>STELLAR
        </a>
        <div style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 10, letterSpacing: 4, color: '#F0A000',
          textTransform: 'uppercase',
        }}>
          // MISSION QUIZ //
        </div>
        <a href="/" style={{
          fontFamily: "'Space Mono', monospace", fontSize: 9,
          letterSpacing: 3, color: '#7A7A92',
          textDecoration: 'none', textTransform: 'uppercase',
          border: '1px solid rgba(240,160,0,0.2)',
          padding: '8px 16px', transition: 'all 0.3s',
        }}
        onMouseEnter={e => { e.currentTarget.style.color='#F0A000'; e.currentTarget.style.borderColor='rgba(240,160,0,0.6)'; }}
        onMouseLeave={e => { e.currentTarget.style.color='#7A7A92'; e.currentTarget.style.borderColor='rgba(240,160,0,0.2)'; }}
        >
          ← HOME
        </a>
      </nav>

      {/* ── Main Content ── */}
      <main style={{
        position: 'relative', zIndex: 2,
        minHeight: '100vh',
        paddingTop: 90,
        fontFamily: "'Lato', sans-serif",
        color: '#EDE9DF',
      }}>

        {/* ════════════════════════ INTRO PHASE ════════════════════════ */}
        {phase === 'intro' && (
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', minHeight: 'calc(100vh - 90px)',
            padding: '0 24px', textAlign: 'center',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(36px)',
            transition: 'opacity 1s ease, transform 1s ease',
          }}>
            {/* Eyebrow */}
            <div style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 10, letterSpacing: 9, color: '#F0A000',
              textTransform: 'uppercase', marginBottom: 32,
            }}>
              // LAZARUS INTELLIGENCE ASSESSMENT — SECTOR GARGANTUA //
            </div>

            {/* Title */}
            <h1 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(72px, 14vw, 180px)',
              lineHeight: 0.88, letterSpacing: 8, color: '#EDE9DF',
              marginBottom: 12,
              textShadow: '0 0 120px rgba(240,150,0,0.14), 0 0 40px rgba(255,255,255,0.04)',
            }}>
              MISSION
            </h1>
            <h1 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(72px, 14vw, 180px)',
              lineHeight: 0.88, letterSpacing: 8,
              color: 'rgba(237,233,223,0.80)',
              marginBottom: 36,
            }}>
              QUIZ
            </h1>

            {/* Subtitle */}
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic', fontWeight: 300,
              fontSize: 'clamp(16px, 2vw, 24px)',
              color: '#7A7A92', letterSpacing: 4, marginBottom: 20,
            }}>
              Beyond the Horizon of Human Knowledge
            </p>

            {/* Divider */}
            <div style={{
              width: 60, height: 1,
              background: 'linear-gradient(90deg, transparent, #F0A000, transparent)',
              margin: '0 auto 36px',
            }} />

            {/* Intro text */}
            <p style={{
              maxWidth: 580, fontSize: 15, lineHeight: 1.92, color: '#7A7A92',
              marginBottom: 52, fontWeight: 300,
            }}>
              Ten questions stand between you and the stars. Answer correctly and your name
              joins the annals of Mission Lazarus. The cosmos is watching, Commander.
            </p>

            {/* Stats */}
            <div style={{
              display: 'flex', gap: 48, marginBottom: 56,
              justifyContent: 'center', flexWrap: 'wrap',
            }}>
              {[
                { num: total, label: 'Questions' },
                { num: 10, label: 'Ranks Available' },
                { num: '∞', label: 'Glory at Stake' },
              ].map(item => (
                <div key={item.label} style={{
                  borderLeft: '2px solid rgba(120,80,0,0.7)',
                  paddingLeft: 20, textAlign: 'left',
                }}>
                  <div style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 44, color: '#EDE9DF', lineHeight: 1,
                  }}>
                    {item.num}
                  </div>
                  <div style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 9, letterSpacing: 3, color: '#7A7A92',
                    textTransform: 'uppercase', marginTop: 6,
                  }}>
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button
              onClick={handleStart}
              style={{
                background: 'transparent',
                border: '1px solid rgba(240,160,0,0.55)',
                color: '#EDE9DF',
                padding: '16px 52px',
                fontFamily: "'Space Mono', monospace",
                fontSize: 11, letterSpacing: 5, textTransform: 'uppercase',
                cursor: 'pointer', position: 'relative', overflow: 'hidden',
                transition: 'all 0.4s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#F0A000';
                e.currentTarget.style.color = '#F0A000';
                e.currentTarget.style.boxShadow = '0 0 36px rgba(240,160,0,0.2), inset 0 0 20px rgba(240,160,0,0.04)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(240,160,0,0.55)';
                e.currentTarget.style.color = '#EDE9DF';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              BEGIN MISSION
            </button>

            {/* Scroll-like decoration at bottom */}
            <div style={{
              marginTop: 80, display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 10, opacity: 0.4,
            }}>
              <div style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 8, letterSpacing: 4, color: '#F0A000', textTransform: 'uppercase',
              }}>Transmission Ready</div>
              <div style={{
                width: 1, height: 44,
                background: 'linear-gradient(to bottom, #F0A000, transparent)',
              }} />
            </div>
          </div>
        )}

        {/* ════════════════════════ QUIZ PHASE ════════════════════════ */}
        {phase === 'quiz' && (
          <div style={{
            maxWidth: 820, margin: '0 auto', padding: '60px 24px 120px',
            opacity: transitioning ? 0 : 1,
            transform: transitioning ? 'translateY(20px)' : 'translateY(0)',
            transition: 'opacity 0.4s ease, transform 0.4s ease',
          }}>

            {/* ── Progress Bar ── */}
            <div style={{ marginBottom: 52 }}>
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                marginBottom: 12,
              }}>
                <div style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 9, letterSpacing: 5, color: '#F0A000',
                  textTransform: 'uppercase',
                }}>
                  — QUESTION {qIndex + 1} / {total} —
                </div>
                <div style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 9, letterSpacing: 3, color: '#7A7A92',
                  textTransform: 'uppercase',
                }}>
                  SCORE: <span style={{ color: '#F0A000' }}>{score}</span> / {qIndex + (revealed ? 1 : 0)}
                </div>
              </div>
              {/* Track */}
              <div style={{
                height: 1,
                background: 'rgba(255,255,255,0.07)',
                position: 'relative',
              }}>
                <div style={{
                  position: 'absolute', top: 0, left: 0, height: '100%',
                  width: `${((qIndex) / total) * 100}%`,
                  background: 'linear-gradient(90deg, transparent, #F0A000)',
                  transition: 'width 0.6s ease',
                  boxShadow: '0 0 12px rgba(240,160,0,0.6)',
                }} />
              </div>
              {/* Dots */}
              <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
                {QUESTIONS.map((_, i) => (
                  <div key={i} style={{
                    flex: 1, height: 3,
                    background: i < qIndex
                      ? (answers[i]?.correct ? '#F0A000' : 'rgba(200,50,50,0.6)')
                      : i === qIndex
                        ? 'rgba(240,160,0,0.4)'
                        : 'rgba(255,255,255,0.06)',
                    transition: 'background 0.4s ease',
                  }} />
                ))}
              </div>
            </div>

            {/* ── Question Card ── */}
            <div style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(240,160,0,0.12)',
              padding: '48px 48px 40px',
              marginBottom: 32,
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Glassy top highlight */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                background: 'linear-gradient(90deg, transparent, rgba(240,160,0,0.25), transparent)',
              }} />

              {/* Category chip */}
              <div style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 8, letterSpacing: 6, color: '#7A5000',
                textTransform: 'uppercase', marginBottom: 22,
                display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <span style={{ display: 'inline-block', width: 18, height: 1, background: '#7A5000' }} />
                {currentQ.category}
              </div>

              {/* Question number ghost */}
              <div style={{
                position: 'absolute', top: 12, right: 24,
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 88, color: 'rgba(255,255,255,0.025)',
                lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
              }}>
                {String(qIndex + 1).padStart(2, '0')}
              </div>

              {/* Question text */}
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: 'clamp(22px, 3vw, 34px)',
                lineHeight: 1.42,
                color: '#EDE9DF',
                letterSpacing: 0.5,
              }}>
                {currentQ.text}
              </h2>
            </div>

            {/* ── Answer Options ── */}
            <div className="quiz-answer-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 36 }}>
              {currentQ.options.map((opt, i) => {
                const isCorrect  = i === currentQ.correct;
                const isPicked   = i === selected;
                const isWrong    = revealed && isPicked && !isCorrect;
                const showCorrect = revealed && isCorrect;

                let borderColor = 'rgba(255,255,255,0.09)';
                let bg          = 'rgba(255,255,255,0.025)';
                let textColor   = '#7A7A92';
                let glow        = 'none';

                if (revealed) {
                  if (showCorrect) {
                    borderColor = 'rgba(240,160,0,0.75)';
                    bg          = 'rgba(240,160,0,0.075)';
                    textColor   = '#F0A000';
                    glow        = '0 0 28px rgba(240,160,0,0.18)';
                  } else if (isWrong) {
                    borderColor = 'rgba(200,50,50,0.6)';
                    bg          = 'rgba(200,50,50,0.06)';
                    textColor   = 'rgba(200,80,80,0.9)';
                  } else {
                    borderColor = 'rgba(255,255,255,0.04)';
                    textColor   = 'rgba(120,120,145,0.4)';
                  }
                }

                return (
                  <button
                    key={i}
                    onClick={() => handleSelect(i)}
                    disabled={revealed}
                    style={{
                      background: bg,
                      border: `1px solid ${borderColor}`,
                      padding: '20px 24px',
                      textAlign: 'left',
                      cursor: revealed ? 'default' : 'pointer',
                      transition: 'all 0.35s ease',
                      boxShadow: glow,
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                    onMouseEnter={e => {
                      if (revealed) return;
                      e.currentTarget.style.borderColor = 'rgba(240,160,0,0.4)';
                      e.currentTarget.style.background  = 'rgba(240,160,0,0.04)';
                      e.currentTarget.style.color       = '#EDE9DF';
                    }}
                    onMouseLeave={e => {
                      if (revealed) return;
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)';
                      e.currentTarget.style.background  = 'rgba(255,255,255,0.025)';
                      e.currentTarget.style.color       = '#7A7A92';
                    }}
                  >
                    {/* Option letter */}
                    <div style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: 11, letterSpacing: 4, color: showCorrect ? '#F0A000' : (isWrong ? 'rgba(200,80,80,0.7)' : '#7A5000'),
                      marginBottom: 8, textTransform: 'uppercase',
                    }}>
                      {['ALPHA', 'BETA', 'GAMMA', 'DELTA'][i]}
                    </div>
                    <div style={{
                      fontFamily: "'Lato', sans-serif",
                      fontWeight: 300,
                      fontSize: 14, lineHeight: 1.6,
                      color: textColor,
                      transition: 'color 0.35s',
                    }}>
                      {opt}
                    </div>

                    {/* Correct indicator */}
                    {showCorrect && (
                      <div style={{
                        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                        background: 'linear-gradient(90deg, transparent, #F0A000, transparent)',
                      }} />
                    )}
                  </button>
                );
              })}
            </div>

            {/* ── Post-reveal: fact + next ── */}
            {revealed && (
              <div style={{
                opacity: 1,
                animation: 'fadeUpIn 0.5s ease forwards',
              }}>
                {/* Mission Log / Fact */}
                <div style={{
                  background: 'rgba(0,0,18,0.9)',
                  border: '1px solid rgba(240,160,0,0.10)',
                  borderLeft: '2px solid rgba(120,80,0,0.8)',
                  padding: '22px 28px',
                  marginBottom: 28,
                }}>
                  <div style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 8, letterSpacing: 5, color: '#7A5000',
                    textTransform: 'uppercase', marginBottom: 10,
                  }}>
                    ◈ Mission Log
                  </div>
                  <p style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: 'italic', fontWeight: 300,
                    fontSize: 15, lineHeight: 1.72, color: '#7A7A92',
                  }}>
                    {currentQ.fact}
                  </p>
                </div>

                {/* Next / Finish Button */}
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    onClick={handleNext}
                    style={{
                      background: 'transparent',
                      border: '1px solid rgba(240,160,0,0.55)',
                      color: '#EDE9DF',
                      padding: '14px 44px',
                      fontFamily: "'Space Mono', monospace",
                      fontSize: 10, letterSpacing: 4,
                      textTransform: 'uppercase', cursor: 'pointer',
                      transition: 'all 0.3s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = '#F0A000';
                      e.currentTarget.style.color = '#F0A000';
                      e.currentTarget.style.boxShadow = '0 0 24px rgba(240,160,0,0.18)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'rgba(240,160,0,0.55)';
                      e.currentTarget.style.color = '#EDE9DF';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {qIndex + 1 >= total ? 'VIEW RESULTS →' : 'NEXT QUESTION →'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ════════════════════════ RESULT PHASE ════════════════════════ */}
        {phase === 'result' && (
          <div style={{
            maxWidth: 720, margin: '0 auto',
            padding: '80px 24px 120px',
            textAlign: 'center',
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.8s ease',
          }}>
            {/* Header */}
            <div style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 9, letterSpacing: 8, color: '#F0A000',
              textTransform: 'uppercase', marginBottom: 28,
            }}>
              // TRANSMISSION RECEIVED — MISSION DEBRIEF //
            </div>

            {/* Score Display */}
            <div style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(240,160,0,0.15)',
              padding: '52px 48px',
              position: 'relative',
              marginBottom: 36,
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                background: 'linear-gradient(90deg, transparent, #F0A000, transparent)',
              }} />

              {/* Big score */}
              <div style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(80px, 18vw, 140px)',
                lineHeight: 1, color: '#EDE9DF',
                textShadow: '0 0 80px rgba(240,150,0,0.3)',
              }}>
                {score}<span style={{
                  fontSize: '0.35em', color: '#7A5000',
                  verticalAlign: 'middle',
                }}>/{total}</span>
              </div>

              {/* Rank */}
              <div style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(28px, 5vw, 52px)',
                letterSpacing: 8, color: '#F0A000',
                margin: '12px 0 20px',
                textShadow: '0 0 30px rgba(240,160,0,0.35)',
              }}>
                {rank.title}
              </div>

              <div style={{
                width: 60, height: 1,
                background: 'linear-gradient(90deg, transparent, rgba(240,160,0,0.4), transparent)',
                margin: '0 auto 24px',
              }} />

              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: 'italic', fontWeight: 300,
                fontSize: 18, lineHeight: 1.7, color: '#7A7A92',
              }}>
                {rank.desc}
              </p>

              {/* Ghost number */}
              <div style={{
                position: 'absolute', bottom: -20, right: 20,
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 180, color: 'rgba(255,255,255,0.018)',
                lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
              }}>
                {score}
              </div>
            </div>

            {/* Answer breakdown */}
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)',
              gap: 6, marginBottom: 48,
            }}>
              {answers.map((a, i) => (
                <div key={i} title={`Q${i + 1}`} style={{
                  height: 6,
                  background: a.correct ? '#F0A000' : 'rgba(200,50,50,0.55)',
                  boxShadow: a.correct ? '0 0 8px rgba(240,160,0,0.5)' : 'none',
                }} />
              ))}
            </div>

            {/* Name Input + Submit */}
            <div style={{
              background: 'rgba(0,0,14,0.9)',
              border: '1px solid rgba(240,160,0,0.1)',
              padding: '36px 40px',
              marginBottom: 24,
            }}>
              <div style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 9, letterSpacing: 5, color: '#7A5000',
                textTransform: 'uppercase', marginBottom: 20,
              }}>
                ◈ Register Your Name — Mission Archive
              </div>

              <input
                type="text"
                maxLength={22}
                placeholder="ENTER CALLSIGN..."
                value={nameInput}
                onChange={e => setNameInput(e.target.value)}
                style={{
                  width: '100%', background: 'transparent',
                  border: 'none', borderBottom: '1px solid rgba(240,160,0,0.25)',
                  color: '#EDE9DF', padding: '10px 4px',
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 14, letterSpacing: 6,
                  textTransform: 'uppercase', outline: 'none',
                  marginBottom: 28,
                  caretColor: '#F0A000',
                }}
                onFocus={e => { e.target.style.borderBottomColor = '#F0A000'; }}
                onBlur={e => { e.target.style.borderBottomColor = 'rgba(240,160,0,0.25)'; }}
              />

              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <button
                  onClick={handleSubmitScore}
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(240,160,0,0.55)',
                    color: '#EDE9DF',
                    padding: '14px 44px',
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 10, letterSpacing: 4,
                    textTransform: 'uppercase', cursor: 'pointer',
                    transition: 'all 0.3s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = '#F0A000';
                    e.currentTarget.style.color = '#F0A000';
                    e.currentTarget.style.boxShadow = '0 0 24px rgba(240,160,0,0.18)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(240,160,0,0.55)';
                    e.currentTarget.style.color = '#EDE9DF';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  SUBMIT TO ARCHIVE →
                </button>

                <button
                  onClick={handleRestart}
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#7A7A92',
                    padding: '14px 36px',
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 10, letterSpacing: 4,
                    textTransform: 'uppercase', cursor: 'pointer',
                    transition: 'all 0.3s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                    e.currentTarget.style.color = '#EDE9DF';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.color = '#7A7A92';
                  }}
                >
                  RETRY MISSION
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ════════════════════════ LEADERBOARD PHASE ════════════════════════ */}
        {phase === 'leaderboard' && (
          <div style={{
            maxWidth: 780, margin: '0 auto',
            padding: '80px 24px 140px',
          }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <div style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 9, letterSpacing: 8, color: '#F0A000',
                textTransform: 'uppercase', marginBottom: 24,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              }}>
                <span style={{ display: 'inline-block', width: 24, height: 1, background: '#F0A000' }} />
                Mission Archive
                <span style={{ display: 'inline-block', width: 24, height: 1, background: '#F0A000' }} />
              </div>
              <h2 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(52px, 9vw, 100px)',
                letterSpacing: 10, color: '#EDE9DF',
                marginBottom: 12,
              }}>
                LEADERBOARD
              </h2>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: 'italic', fontSize: 18, color: '#7A7A92',
              }}>
                Those who dared to answer the stars
              </p>
            </div>

            {/* Divider */}
            <div style={{
              height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(240,160,0,0.35), transparent)',
              marginBottom: 8,
              boxShadow: '0 0 18px rgba(240,160,0,0.2)',
            }} />

            {/* Column headers */}
            <div style={{
              display: 'grid', gridTemplateColumns: '60px 1fr auto auto',
              padding: '12px 28px',
              gap: 16, alignItems: 'center',
            }}>
              {['RANK', 'CALLSIGN', 'SCORE', 'TITLE'].map(h => (
                <div key={h} style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 8, letterSpacing: 4, color: '#7A5000',
                  textTransform: 'uppercase',
                }}>
                  {h}
                </div>
              ))}
            </div>

            <div style={{
              height: 1,
              background: 'rgba(240,160,0,0.08)',
              marginBottom: 4,
            }} />

            {/* Rows */}
            {leaderboard.length === 0 ? (
              <div style={{
                textAlign: 'center', padding: '60px 24px',
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: 'italic', fontSize: 18, color: 'rgba(122,122,146,0.5)',
              }}>
                No records yet — be the first to claim the stars.
              </div>
            ) : leaderboard.map((entry, i) => {
              const entryRank = getRank(entry.score);
              const isTop3 = i < 3;
              const isUser = entry.name === (nameInput.trim().toUpperCase() || '');

              return (
                <div
                  key={i}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '60px 1fr auto auto',
                    padding: '18px 28px', gap: 16, alignItems: 'center',
                    background: isUser
                      ? 'rgba(240,160,0,0.04)'
                      : i % 2 === 0 ? 'rgba(255,255,255,0.012)' : 'transparent',
                    border: isUser
                      ? '1px solid rgba(240,160,0,0.15)'
                      : '1px solid transparent',
                    borderLeft: isTop3
                      ? `2px solid ${['#F0A000', 'rgba(200,160,60,0.7)', 'rgba(160,120,40,0.5)'][i]}`
                      : '2px solid transparent',
                    marginBottom: 2,
                    transition: 'all 0.3s',
                  }}
                >
                  {/* Rank number */}
                  <div style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: isTop3 ? 28 : 20,
                    color: isTop3
                      ? ['#F0A000', 'rgba(220,180,70,0.85)', 'rgba(160,120,50,0.7)'][i]
                      : 'rgba(122,122,146,0.4)',
                    lineHeight: 1,
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>

                  {/* Name */}
                  <div style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 13, letterSpacing: 4,
                    color: isUser ? '#F0A000' : isTop3 ? '#EDE9DF' : '#7A7A92',
                    textTransform: 'uppercase',
                  }}>
                    {entry.name}
                  </div>

                  {/* Score */}
                  <div style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 32, color: '#EDE9DF', lineHeight: 1,
                  }}>
                    {entry.score}<span style={{ fontSize: 14, color: '#7A5000' }}>/{total}</span>
                  </div>

                  {/* Rank title */}
                  <div style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 7, letterSpacing: 3,
                    color: '#7A5000', textTransform: 'uppercase',
                    textAlign: 'right',
                    maxWidth: 120,
                    lineHeight: 1.5,
                  }}>
                    {entryRank.title}
                  </div>
                </div>
              );
            })}

            <div style={{
              height: 1,
              background: 'rgba(240,160,0,0.08)',
              marginTop: 4, marginBottom: 60,
            }} />

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={handleRestart}
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(240,160,0,0.55)',
                  color: '#EDE9DF',
                  padding: '14px 44px',
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 10, letterSpacing: 4,
                  textTransform: 'uppercase', cursor: 'pointer',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#F0A000';
                  e.currentTarget.style.color = '#F0A000';
                  e.currentTarget.style.boxShadow = '0 0 24px rgba(240,160,0,0.18)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(240,160,0,0.55)';
                  e.currentTarget.style.color = '#EDE9DF';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                NEW MISSION →
              </button>
              <a
                href="/"
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#7A7A92',
                  padding: '14px 36px',
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 10, letterSpacing: 4,
                  textTransform: 'uppercase', cursor: 'pointer',
                  textDecoration: 'none', display: 'inline-block',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                  e.currentTarget.style.color = '#EDE9DF';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.color = '#7A7A92';
                }}
              >
                ← RETURN HOME
              </a>
            </div>
          </div>
        )}
      </main>

      {/* ── Footer ── */}
      <footer style={{
        position: 'relative', zIndex: 2,
        background: '#000',
        borderTop: '1px solid rgba(240,160,0,0.08)',
        padding: '40px 64px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 20,
      }}>
        <div>
          <div style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 20, letterSpacing: 7, color: '#EDE9DF',
          }}>
            INTER<span style={{ color: '#F0A000' }}>✦</span>STELLAR
          </div>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic', color: '#7A7A92', fontSize: 13, marginTop: 6,
          }}>
            We are explorers, born of starlight
          </div>
        </div>
        <div style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 9, letterSpacing: 2,
          color: 'rgba(237,233,223,0.4)', lineHeight: 2,
          textAlign: 'right',
        }}>
          MMXXVII — MISSION LAZARUS<br />
          SECTOR: GARGANTUA SYSTEM<br />
          QUIZ MODULE: ACTIVE
        </div>
      </footer>

      {/* ── Global Keyframes (injected via style tag) ── */}
      <style>{`
        * { margin:0; padding:0; box-sizing:border-box; }
        html { scroll-behavior: smooth; }
        body { background: #000; overflow-x: hidden; cursor: default; }

        @keyframes fadeUpIn {
          from { opacity:0; transform:translateY(22px); }
          to   { opacity:1; transform:translateY(0); }
        }

        button:focus { outline: none; }
        input::placeholder { color: rgba(122,122,146,0.45); letter-spacing: 5px; }

        @media (max-width: 720px) {
          nav { padding: 16px 20px !important; }
          .quiz-options-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
