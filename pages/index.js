// pages/index.js
// Interstellar — Main Landing Page (Next.js conversion of interstellar (1).html)
// Includes: BlackHoleCanvas background, Web Audio ambient sound, all sections,
// sticky navbar, parallax, scroll animations, and "START MISSION QUIZ" hero CTA.

import { useState, useEffect, useRef, useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import BlackHoleCanvas from '../components/BlackHoleCanvas';

// ─── Scroll-reveal hook ───────────────────────────────────────────────────────
function useFadeUp(threshold = 0.12) {
  const ref     = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el  = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// ─── FadeUp wrapper component ─────────────────────────────────────────────────
function FadeUp({ children, delay = 0, style = {} }) {
  const [ref, inView] = useFadeUp();
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(44px)',
        transition: `opacity 0.9s ease ${delay}s, transform 0.9s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─── Design tokens ────────────────────────────────────────────────────────────
const T = {
  amber:     '#F0A000',
  amberDim:  '#7A5000',
  amberGlow: 'rgba(240,160,0,0.35)',
  white:     '#EDE9DF',
  gray:      '#7A7A92',
  line:      'rgba(240,160,0,0.15)',
  navBg:     'rgba(0,0,12,0.88)',
};

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [soundOn, setSoundOn]   = useState(false);
  const [heroOpacity, setHeroOpacity] = useState(1);
  const [heroY, setHeroY]       = useState(0);

  // Web Audio refs
  const audioCtxRef   = useRef(null);
  const masterGainRef = useRef(null);
  const audioNodesRef = useRef([]);

  // ── Scroll effects ──────────────────────────────────────────────────────────
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const sy = window.scrollY;
          setScrolled(sy > 60);
          setHeroOpacity(Math.max(0, 1 - sy / 480));
          setHeroY(sy * 0.32);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Web Audio — synthesized ambient drones ──────────────────────────────────
  const buildAudio = useCallback(() => {
    if (audioCtxRef.current) return;
    const ctx  = new (window.AudioContext || window.webkitAudioContext)();
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.connect(ctx.destination);
    audioCtxRef.current  = ctx;
    masterGainRef.current = gain;

    const droneDefs = [
      { freq: 28,  type: 'sine',     vol: 0.38, lfoF: 0.025, lfoD: 0.25 },
      { freq: 36,  type: 'sine',     vol: 0.30, lfoF: 0.040, lfoD: 0.20 },
      { freq: 54,  type: 'sine',     vol: 0.18, lfoF: 0.055, lfoD: 0.15 },
      { freq: 72,  type: 'triangle', vol: 0.10, lfoF: 0.030, lfoD: 0.10 },
      { freq: 108, type: 'triangle', vol: 0.06, lfoF: 0.070, lfoD: 0.08 },
      { freq: 216, type: 'sine',     vol: 0.03, lfoF: 0.090, lfoD: 0.05 },
    ];

    droneDefs.forEach(def => {
      const osc     = ctx.createOscillator();
      const oscGain = ctx.createGain();
      const lfo     = ctx.createOscillator();
      const lfoGain = ctx.createGain();

      osc.type = def.type;
      osc.frequency.setValueAtTime(def.freq, ctx.currentTime);
      lfo.frequency.setValueAtTime(def.lfoF, ctx.currentTime);
      lfoGain.gain.setValueAtTime(def.freq * def.lfoD, ctx.currentTime);
      oscGain.gain.setValueAtTime(def.vol, ctx.currentTime);

      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      osc.connect(oscGain);
      oscGain.connect(gain);
      osc.start(); lfo.start();
      audioNodesRef.current.push(osc, lfo);
    });

    // Filtered noise band
    const sr  = ctx.sampleRate;
    const buf = ctx.createBuffer(1, sr * 4, sr);
    const dat = buf.getChannelData(0);
    for (let i = 0; i < dat.length; i++) dat[i] = Math.random() * 2 - 1;
    const noise    = ctx.createBufferSource();
    noise.buffer   = buf; noise.loop = true;
    const bp       = ctx.createBiquadFilter();
    bp.type        = 'bandpass';
    bp.frequency.setValueAtTime(60, ctx.currentTime);
    bp.Q.setValueAtTime(0.25, ctx.currentTime);
    const nGain    = ctx.createGain();
    nGain.gain.setValueAtTime(0.05, ctx.currentTime);
    noise.connect(bp); bp.connect(nGain); nGain.connect(gain);
    noise.start();
    audioNodesRef.current.push(noise);
  }, []);

  const toggleSound = useCallback(() => {
    if (!audioCtxRef.current) buildAudio();
    const ctx  = audioCtxRef.current;
    const gain = masterGainRef.current;
    if (!soundOn) {
      ctx.resume();
      gain.gain.cancelScheduledValues(ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.7, ctx.currentTime + 2.5);
      setSoundOn(true);
    } else {
      gain.gain.cancelScheduledValues(ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.2);
      setSoundOn(false);
    }
  }, [soundOn, buildAudio]);

  // ── Cleanup audio on unmount ────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      audioNodesRef.current.forEach(n => { try { n.stop(); } catch (_) {} });
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  // ── Shared button styles ────────────────────────────────────────────────────
  const btnPrimary = {
    display: 'inline-block', padding: '15px 44px',
    fontFamily: "'Space Mono', monospace",
    fontSize: 10, letterSpacing: 4, textTransform: 'uppercase',
    textDecoration: 'none', cursor: 'pointer', transition: 'all 0.4s',
    background: 'transparent',
    border: `1px solid rgba(240,160,0,0.55)`, color: T.white,
  };
  const btnGhost = {
    ...btnPrimary,
    border: '1px solid rgba(255,255,255,0.12)', color: T.gray,
  };

  return (
    <>
      <Head>
        <title>INTERSTELLAR — Beyond the Stars</title>
        <meta name="description" content="A cinematic journey beyond the horizon of time and space." />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Space+Mono:wght@400;700&family=Lato:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* ── Background ── */}
      <BlackHoleCanvas />
      <div style={{
        position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,8,0.55) 100%)',
      }} />

      {/* ══════════════════════════════════════════════════
          MOBILE MENU
      ══════════════════════════════════════════════════ */}
      {mobileOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 300,
          background: 'rgba(0,0,12,0.97)', backdropFilter: 'blur(20px)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 40,
        }}>
          <button
            onClick={() => setMobileOpen(false)}
            style={{
              position: 'absolute', top: 28, right: 32,
              fontFamily: "'Space Mono', monospace", fontSize: 11,
              letterSpacing: 3, color: T.gray, cursor: 'pointer',
              background: 'none', border: 'none',
            }}
          >
            ✕ CLOSE
          </button>
          {['/#hero', '/#story', '/#pillars', '/#gallery'].map((href, i) => {
            const labels = ['HOME', 'STORY', 'MISSION', 'GALLERY'];
            return (
              <a key={href} href={href} onClick={() => setMobileOpen(false)} style={{
                fontFamily: "'Bebas Neue', sans-serif", fontSize: 52, letterSpacing: 8,
                color: T.white, textDecoration: 'none', transition: 'color 0.3s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = T.amber}
              onMouseLeave={e => e.currentTarget.style.color = T.white}
              >
                {labels[i]}
              </a>
            );
          })}
        </div>
      )}

      {/* ══════════════════════════════════════════════════
          STICKY NAVBAR
      ══════════════════════════════════════════════════ */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        padding: scrolled ? '16px 64px' : '28px 64px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? T.navBg : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: `1px solid ${scrolled ? T.line : 'transparent'}`,
        transition: 'padding 0.4s ease, background 0.4s ease, border-color 0.4s ease',
      }}>
        <a href="#hero" style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 20, letterSpacing: 7, color: T.white, textDecoration: 'none',
        }}>
          INTER<span style={{ color: T.amber }}>✦</span>STELLAR
        </a>

        {/* Desktop nav links */}
        <ul style={{ display: 'flex', gap: 44, listStyle: 'none', margin: 0, padding: 0 }}>
          {[['#hero','Home'],['#story','Story'],['#pillars','Mission'],['#gallery','Gallery']].map(([href, label]) => (
            <li key={href} style={{ display: 'none' }} className="desktop-nav-item">
              <a href={href} style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 10, letterSpacing: 3, textTransform: 'uppercase',
                color: T.gray, textDecoration: 'none', transition: 'color 0.3s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = T.white}
              onMouseLeave={e => e.currentTarget.style.color = T.gray}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {/* Sound toggle */}
          <button
            onClick={toggleSound}
            style={{
              display: 'flex', alignItems: 'center', gap: 9,
              background: 'none',
              border: `1px solid ${soundOn ? T.amber : 'rgba(240,160,0,0.25)'}`,
              color: soundOn ? T.amber : T.gray,
              padding: '9px 18px',
              fontFamily: "'Space Mono', monospace",
              fontSize: 9, letterSpacing: 3, textTransform: 'uppercase',
              cursor: 'pointer', transition: 'all 0.3s',
              boxShadow: soundOn ? '0 0 16px rgba(240,160,0,0.15)' : 'none',
            }}
          >
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: soundOn ? T.amber : T.amberDim,
              boxShadow: soundOn ? `0 0 10px ${T.amber}` : 'none',
              transition: 'all 0.3s',
              display: 'inline-block',
            }} />
            {soundOn ? 'MUTE' : 'AMBIENT'}
          </button>

          {/* Hamburger (mobile) */}
          <button
            onClick={() => setMobileOpen(true)}
            style={{
              display: 'flex', flexDirection: 'column', gap: 5,
              cursor: 'pointer', padding: 4, background: 'none', border: 'none',
            }}
            className="nav-hamburger"
            aria-label="Open menu"
          >
            <span style={{ display: 'block', width: 22, height: 1, background: T.white }} />
            <span style={{ display: 'block', width: 22, height: 1, background: T.white }} />
            <span style={{ display: 'block', width: 22, height: 1, background: T.white }} />
          </button>
        </div>
      </nav>

      {/* ══════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════ */}
      <section id="hero" style={{
        position: 'relative', zIndex: 2,
        height: '100vh', minHeight: 600,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '0 24px',
      }}>
        <div style={{ opacity: heroOpacity, transform: `translateY(${heroY}px)`, transition: 'none' }}>
          {/* Eyebrow */}
          <div style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 10, letterSpacing: 9, color: T.amber,
            textTransform: 'uppercase', marginBottom: 32,
            opacity: 0, animation: 'fadeUp 1s ease forwards 0.6s',
          }}>
            // Year 2067 — Mission Lazarus — Sector Gargantua //
          </div>

          {/* Main title */}
          <h1 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(90px, 15vw, 200px)',
            lineHeight: 0.88, letterSpacing: 10, color: T.white,
            textShadow: '0 0 120px rgba(240,150,0,0.12), 0 0 40px rgba(255,255,255,0.04)',
            opacity: 0, animation: 'fadeUp 1.4s ease forwards 0.9s',
          }}>
            INTER<span style={{ display: 'block', color: 'rgba(237,233,223,0.82)' }}>STELLAR</span>
          </h1>

          {/* Sub */}
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic', fontWeight: 300,
            fontSize: 'clamp(16px, 2.2vw, 26px)',
            color: T.gray, letterSpacing: 5, marginTop: 24,
            opacity: 0, animation: 'fadeUp 1s ease forwards 1.3s',
          }}>
            Beyond the Horizon of Time and Space
          </p>

          {/* CTA buttons */}
          <div style={{
            display: 'flex', gap: 20, marginTop: 60, justifyContent: 'center', flexWrap: 'wrap',
            opacity: 0, animation: 'fadeUp 1s ease forwards 1.7s',
          }}>
            {/* ── START MISSION QUIZ — primary CTA ── */}
            <Link href="/quiz" legacyBehavior>
              <a
                style={{
                  ...btnPrimary,
                  letterSpacing: 5,
                  fontSize: 11,
                  padding: '17px 52px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = T.amber;
                  e.currentTarget.style.color       = T.amber;
                  e.currentTarget.style.boxShadow   = '0 0 36px rgba(240,160,0,0.25), inset 0 0 20px rgba(240,160,0,0.04)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(240,160,0,0.55)';
                  e.currentTarget.style.color       = T.white;
                  e.currentTarget.style.boxShadow   = 'none';
                }}
              >
                ✦ START MISSION QUIZ
              </a>
            </Link>

            {/* Scroll to story */}
            <a
              href="#story"
              style={btnGhost}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.color = T.white; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = T.gray; }}
            >
              Explore the Cosmos
            </a>
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{
          position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
          opacity: 0, animation: 'fadeIn 1s ease forwards 2.6s',
        }}>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, letterSpacing: 4, color: T.amber, opacity: 0.6, textTransform: 'uppercase' }}>
            Scroll
          </span>
          <div style={{
            width: 1, height: 52,
            background: `linear-gradient(to bottom, ${T.amber}, transparent)`,
            animation: 'scrollPulse 2.2s ease-in-out infinite',
          }} />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          STORY
      ══════════════════════════════════════════════════ */}
      <section id="story" style={{
        position: 'relative', zIndex: 2,
        padding: '140px 0',
        background: 'linear-gradient(to bottom, transparent, rgba(0,0,14,0.96) 8%, rgba(0,0,14,0.96) 92%, transparent)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 64px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 90, alignItems: 'center' }} className="story-grid">

            <FadeUp>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: 6, color: T.amber, textTransform: 'uppercase', marginBottom: 18, display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ display: 'inline-block', width: 24, height: 1, background: T.amber }} />
                Origin
              </div>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
                fontSize: 'clamp(36px, 3.8vw, 62px)', lineHeight: 1.12, marginBottom: 28, color: T.white,
              }}>
                When the <em style={{ fontStyle: 'italic', color: T.amber }}>stars</em> call,<br />
                we must <em style={{ fontStyle: 'italic', color: T.amber }}>answer</em>
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.92, color: T.gray, marginBottom: 22 }}>
                Humanity stands at the precipice of extinction. The Earth grows cold and barren under waves
                of encroaching dust. Through the vast corridors of deep space, a faint hope stirs —
                a wormhole placed with impossible precision near Saturn's rings.
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.92, color: T.gray, marginBottom: 22 }}>
                Our greatest explorers venture beyond the known, crossing the threshold between universes,
                carrying the singular force that defies physics — one that transcends gravity, light,
                and the cold mathematics of spacetime.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, marginTop: 44 }}>
                {[
                  { num: '4,900', lbl: 'Light Years Traveled' },
                  { num: '47',    lbl: 'Years of Isolation'  },
                  { num: '∞',     lbl: 'Dimensions Crossed'  },
                  { num: '1',     lbl: 'Chance at Survival'  },
                ].map((d, i) => (
                  <FadeUp key={d.lbl} delay={0.12 * (i + 1)}>
                    <div style={{ borderLeft: `2px solid ${T.amberDim}`, paddingLeft: 22 }}>
                      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 52, color: T.white, lineHeight: 1 }}>{d.num}</div>
                      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: 3, color: T.gray, textTransform: 'uppercase', marginTop: 6 }}>{d.lbl}</div>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div style={{ position: 'relative' }}>
                <img
                  src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=900&auto=format&fit=crop&q=80"
                  alt="Galaxy"
                  loading="lazy"
                  style={{ width: '100%', height: 520, objectFit: 'cover', display: 'block', filter: 'brightness(0.65) saturate(0.55)', transition: 'filter 0.7s' }}
                  onMouseEnter={e => e.currentTarget.style.filter = 'brightness(0.85) saturate(0.8)'}
                  onMouseLeave={e => e.currentTarget.style.filter = 'brightness(0.65) saturate(0.55)'}
                />
                <div style={{ position: 'absolute', inset: -1, border: '1px solid rgba(240,160,0,0.18)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 160, background: 'linear-gradient(transparent, rgba(0,0,14,0.85))', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: 20, left: 24, fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: 3, color: 'rgba(240,160,0,0.7)', textTransform: 'uppercase' }}>
                  LOG-4421 · MILKY WAY CORE
                </div>
              </div>
            </FadeUp>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          PILLARS
      ══════════════════════════════════════════════════ */}
      <section id="pillars" style={{
        position: 'relative', zIndex: 2,
        padding: '110px 0',
        background: 'rgba(0,0,16,0.98)',
        borderTop: `1px solid ${T.line}`,
        borderBottom: `1px solid ${T.line}`,
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 64px' }}>
          <FadeUp style={{ textAlign: 'center', marginBottom: 70 }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: 6, color: T.amber, textTransform: 'uppercase', marginBottom: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
              <span style={{ display: 'inline-block', width: 24, height: 1, background: T.amber }} />
              Core Forces
            </div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(52px, 7vw, 100px)', letterSpacing: 12, color: T.white }}>
              LAWS OF THE UNIVERSE
            </h2>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 20, color: T.gray, marginTop: 12 }}>
              Four pillars that govern existence beyond the stars
            </p>
          </FadeUp>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 2 }} className="pillars-grid">
            {[
              { num: '01', icon: '⚫', title: 'GRAVITY',  text: 'The one force that transcends all dimensions. It whispers across spacetime, bending light and warping time — carrying messages between worlds that words cannot reach.' },
              { num: '02', icon: '⏳', title: 'TIME',     text: 'Near a singularity, one hour equals seven years on Earth. Time is not a river but an ocean — its depths uncharted, its shores unreachable by ordinary means.' },
              { num: '03', icon: '🌌', title: 'SPACE',    text: 'The void between stars hums with dark matter and echoes with cosmic radiation. It harbors gateways to realms we cannot yet imagine — folded impossibly upon themselves.' },
              { num: '04', icon: '✦',  title: 'LOVE',     text: 'Perhaps the only force existing beyond the fourth dimension. Quantifiable, observable, yet inexplicable by known physics — the compass guiding us across the dark.' },
            ].map((p, i) => (
              <FadeUp key={p.title} delay={0.12 * (i + 1)}>
                <div
                  style={{
                    padding: '52px 36px 44px',
                    background: 'rgba(255,255,255,0.018)',
                    border: '1px solid rgba(255,255,255,0.045)',
                    position: 'relative', overflow: 'hidden',
                    transition: 'background 0.4s, border-color 0.4s',
                    height: '100%',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background   = 'rgba(240,160,0,0.035)';
                    e.currentTarget.style.borderColor  = 'rgba(240,160,0,0.18)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background  = 'rgba(255,255,255,0.018)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.045)';
                  }}
                >
                  <span style={{
                    position: 'absolute', top: 14, right: 16,
                    fontFamily: "'Bebas Neue', sans-serif", fontSize: 80,
                    color: 'rgba(255,255,255,0.03)', lineHeight: 1, pointerEvents: 'none',
                  }}>
                    {p.num}
                  </span>
                  <span style={{ fontSize: 30, marginBottom: 26, display: 'block', lineHeight: 1 }}>{p.icon}</span>
                  <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 34, letterSpacing: 6, color: T.white, marginBottom: 14 }}>
                    {p.title}
                  </h3>
                  <p style={{ fontSize: 14, lineHeight: 1.85, color: T.gray }}>{p.text}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* ── Quiz CTA inside pillars section ── */}
          <FadeUp style={{ textAlign: 'center', marginTop: 80 }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 18, color: T.gray, marginBottom: 32 }}>
              Think you understand these forces? Put your knowledge to the test.
            </p>
            <Link href="/quiz" legacyBehavior>
              <a
                style={{
                  display: 'inline-block',
                  padding: '15px 48px',
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 10, letterSpacing: 5, textTransform: 'uppercase',
                  textDecoration: 'none', cursor: 'pointer', transition: 'all 0.4s',
                  background: 'transparent',
                  border: `1px solid rgba(240,160,0,0.45)`,
                  color: T.white,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = T.amber;
                  e.currentTarget.style.color       = T.amber;
                  e.currentTarget.style.boxShadow   = '0 0 32px rgba(240,160,0,0.2)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(240,160,0,0.45)';
                  e.currentTarget.style.color       = T.white;
                  e.currentTarget.style.boxShadow   = 'none';
                }}
              >
                TAKE THE MISSION QUIZ →
              </a>
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          QUOTE BAND
      ══════════════════════════════════════════════════ */}
      <section style={{
        padding: '140px 0', textAlign: 'center',
        background: 'rgba(0,0,18,0.99)',
        position: 'relative', overflow: 'hidden', zIndex: 2,
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 64px' }}>
          <FadeUp>
            <blockquote style={{
              fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontWeight: 300,
              fontSize: 'clamp(26px, 3.8vw, 54px)', lineHeight: 1.38,
              color: T.white, maxWidth: 940, margin: '0 auto',
            }}>
              "We've always defined ourselves by the ability to overcome the impossible — and we count
              those moments when we dared to aim higher as our greatest achievements."
            </blockquote>
          </FadeUp>
          <FadeUp delay={0.12}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: 5, color: T.amber, textTransform: 'uppercase', marginTop: 34 }}>
              — Commander Cooper · Mission Lazarus
            </div>
          </FadeUp>
          <FadeUp delay={0.24}>
            <div style={{ width: 60, height: 1, background: T.amber, margin: '22px auto 0' }} />
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          GALLERY
      ══════════════════════════════════════════════════ */}
      <section id="gallery" style={{ padding: '110px 0', background: '#00000D', position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 64px 56px' }}>
          <FadeUp>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: 6, color: T.amber, textTransform: 'uppercase', marginBottom: 18, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ display: 'inline-block', width: 24, height: 1, background: T.amber }} />
              Visual Logs
            </div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(52px, 7vw, 100px)', letterSpacing: 12, color: T.white }}>
              BEYOND THE HORIZON
            </h2>
          </FadeUp>
        </div>

        <div style={{ padding: '0 64px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 4 }} className="gallery-grid">
            {[
              { src: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1200&auto=format&fit=crop&q=80', caption: 'Gargantua Nebula — Sector VII',  log: 'LOG-0001', span: 2, h: 420 },
              { src: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=800&auto=format&fit=crop&q=80',  caption: "Miller's Planet — Tidal Lock",  log: 'LOG-0012', span: 1, h: 420 },
              { src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',  caption: 'Earth — Final Orbit View',       log: 'LOG-0023', span: 1, h: 300 },
              { src: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&auto=format&fit=crop&q=80',  caption: 'Milky Way Core Transit',         log: 'LOG-0034', span: 1, h: 300 },
              { src: 'https://images.unsplash.com/photo-1484589065579-248aad0d8b13?w=800&auto=format&fit=crop&q=80',  caption: 'Endurance Station — Day 730',    log: 'LOG-0041', span: 1, h: 300 },
            ].map((item, idx) => (
              <FadeUp key={idx} delay={0.08 * idx} style={{ gridColumn: `span ${item.span}` }}>
                <div
                  style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer', height: item.h }}
                  onMouseEnter={e => {
                    e.currentTarget.querySelector('img').style.filter   = 'brightness(0.92) saturate(1.0)';
                    e.currentTarget.querySelector('img').style.transform = 'scale(1.06)';
                    e.currentTarget.querySelector('.gal-overlay').style.opacity = '1';
                    e.currentTarget.querySelector('.gal-tag').style.opacity     = '1';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.querySelector('img').style.filter   = 'brightness(0.65) saturate(0.55)';
                    e.currentTarget.querySelector('img').style.transform = 'scale(1.0)';
                    e.currentTarget.querySelector('.gal-overlay').style.opacity = '0';
                    e.currentTarget.querySelector('.gal-tag').style.opacity     = '0';
                  }}
                >
                  <img
                    src={item.src} alt={item.caption} loading="lazy"
                    style={{
                      width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                      filter: 'brightness(0.65) saturate(0.55)',
                      transform: 'scale(1.0)',
                      transition: 'filter 0.7s, transform 0.8s',
                    }}
                  />
                  <div className="gal-overlay" style={{
                    position: 'absolute', inset: 0, opacity: 0, transition: 'opacity 0.45s',
                    background: 'linear-gradient(to top, rgba(0,0,22,0.82) 0%, transparent 55%)',
                    display: 'flex', alignItems: 'flex-end', padding: 28,
                  }}>
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: 3, color: T.white, textTransform: 'uppercase' }}>
                      {item.caption}
                    </span>
                  </div>
                  <div className="gal-tag" style={{
                    position: 'absolute', top: 20, right: 20,
                    fontFamily: "'Space Mono', monospace", fontSize: 8, letterSpacing: 2,
                    color: 'rgba(240,160,0,0.5)', textTransform: 'uppercase',
                    border: '1px solid rgba(240,160,0,0.2)', padding: '5px 10px',
                    opacity: 0, transition: 'opacity 0.45s',
                  }}>
                    {item.log}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          TRANSMISSION STRIP
      ══════════════════════════════════════════════════ */}
      <FadeUp>
        <div style={{
          padding: '70px 0', background: 'rgba(0,0,10,1)',
          borderTop: `1px solid ${T.line}`,
          textAlign: 'center', position: 'relative', zIndex: 2,
        }}>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: 8, color: T.amber, textTransform: 'uppercase', marginBottom: 16, opacity: 0.7 }}>
            Last Known Coordinates
          </div>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(22px, 3vw, 38px)', letterSpacing: 6, color: 'rgba(237,233,223,0.2)' }}>
            SATURN WORMHOLE ·{' '}
            <span style={{ color: T.white }}>49°14&apos;22&quot; N</span>
            {' '}·{' '}
            <span style={{ color: T.white }}>84°11&apos;07&quot; W</span>
            {' '}· DEPTH{' '}
            <span style={{ color: T.white }}>∞ AU</span>
          </div>
        </div>
      </FadeUp>

      {/* ══════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════ */}
      <footer style={{
        background: '#000', borderTop: '1px solid rgba(240,160,0,0.08)',
        padding: '60px 64px',
        display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 40, alignItems: 'center',
        position: 'relative', zIndex: 2,
      }} className="footer-grid">
        <div>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, letterSpacing: 8, color: T.white }}>
            INTER<span style={{ color: T.amber }}>✦</span>STELLAR
          </div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', color: T.gray, fontSize: 13, marginTop: 8 }}>
            We are explorers, born of starlight
          </div>
        </div>

        <nav style={{ display: 'flex', gap: 32, justifyContent: 'center', flexWrap: 'wrap' }}>
          {[['#hero','Home'],['#story','Story'],['#pillars','Mission'],['#gallery','Gallery'],['/quiz','Quiz']].map(([href, label]) => (
            href.startsWith('/') ? (
              <Link key={href} href={href} style={{
                fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: 3,
                color: T.gray, textDecoration: 'none', textTransform: 'uppercase',
                transition: 'color 0.3s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = T.amber}
              onMouseLeave={e => e.currentTarget.style.color = T.gray}
              >
                {label}
              </Link>
            ) : (
              <a key={href} href={href} style={{
                fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: 3,
                color: T.gray, textDecoration: 'none', textTransform: 'uppercase',
                transition: 'color 0.3s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = T.amber}
              onMouseLeave={e => e.currentTarget.style.color = T.gray}
              >
                {label}
              </a>
            )
          ))}
        </nav>

        <div style={{
          textAlign: 'right',
          fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: 2,
          color: 'rgba(122,122,146,0.35)', lineHeight: 2,
        }}>
          MMXXVII — MISSION LAZARUS<br />
          SECTOR: GARGANTUA SYSTEM<br />
          STATUS: TRANSMISSION ACTIVE
        </div>
      </footer>

      {/* ── Global Styles ── */}
      <style>{`
        *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
        html { scroll-behavior: smooth; }
        body { background:#000; color:#EDE9DF; font-family:'Lato',sans-serif; font-weight:300; overflow-x:hidden; cursor:default; }

        @keyframes fadeUp {
          from { opacity:0; transform:translateY(36px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity:0; } to { opacity:1; }
        }
        @keyframes scrollPulse {
          0%,100%{ opacity:1; transform:scaleY(1); }
          50%    { opacity:0.3; transform:scaleY(0.7); }
        }

        @media (min-width: 720px) {
          .desktop-nav-item { display: list-item !important; }
          .nav-hamburger    { display: none !important; }
        }
        @media (max-width: 900px) {
          .story-grid   { grid-template-columns: 1fr !important; gap: 50px !important; }
          .pillars-grid { grid-template-columns: repeat(2,1fr) !important; }
          .gallery-grid { grid-template-columns: 1fr 1fr !important; }
          .footer-grid  { grid-template-columns: 1fr !important; gap: 28px !important; }
        }
        @media (max-width: 720px) {
          nav { padding: 18px 24px !important; }
          .pillars-grid { grid-template-columns: 1fr !important; }
          .gallery-grid { grid-template-columns: 1fr !important; }
          .gallery-grid > * { grid-column: span 1 !important; }
        }
      `}</style>
    </>
  );
}
