// components/Leaderboard.js
// Cinematic leaderboard table — Interstellar design language.
// Polls /api/leaderboard every 5 seconds for near-real-time updates.
// Accepts an optional `highlightUsername` prop to glow the current user's row.

import { useState, useEffect, useRef, useCallback } from 'react';

// ── Design tokens (mirrored from main page) ────────────────────────────────
const T = {
  amber:    '#F0A000',
  amberDim: '#7A5000',
  white:    '#EDE9DF',
  gray:     '#7A7A92',
  line:     'rgba(240,160,0,0.15)',
};

// ── Helpers ────────────────────────────────────────────────────────────────
function formatTime(ms) {
  if (!ms && ms !== 0) return '—';
  const s = Math.round(ms / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  const r = s % 60;
  return r > 0 ? `${m}m ${r}s` : `${m}m`;
}

function timeAgo(isoString) {
  if (!isoString) return '—';
  const diff = Math.floor((Date.now() - new Date(isoString).getTime()) / 1000);
  if (diff < 5)   return 'just now';
  if (diff < 60)  return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

const TOP3_COLORS = ['#F0A000', 'rgba(200,160,60,0.85)', 'rgba(160,120,50,0.70)'];

// ── Component ──────────────────────────────────────────────────────────────
export default function Leaderboard({ highlightUsername = '' }) {
  const [entries,    setEntries]    = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [pulse,      setPulse]      = useState(false);   // flash on new data
  const intervalRef = useRef(null);
  const prevCountRef = useRef(0);

  const normalised = highlightUsername.trim().toUpperCase();

  // ── Fetch ────────────────────────────────────────────────────────────────
  const fetchLeaderboard = useCallback(async () => {
    try {
      const res = await fetch('/api/leaderboard');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      setEntries(data.entries ?? []);
      setLastUpdate(data.updatedAt);
      setError(null);

      // Pulse animation when new entry appears
      if (data.entries?.length !== prevCountRef.current) {
        setPulse(true);
        setTimeout(() => setPulse(false), 800);
        prevCountRef.current = data.entries?.length ?? 0;
      }
    } catch (e) {
      setError('Transmission interrupted. Retrying...');
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch + 5-second polling
  useEffect(() => {
    fetchLeaderboard();
    intervalRef.current = setInterval(fetchLeaderboard, 5_000);
    return () => clearInterval(intervalRef.current);
  }, [fetchLeaderboard]);

  // ── Rank medal helper ─────────────────────────────────────────────────────
  const rankLabel = (rank) => {
    if (rank === 1) return '✦';
    if (rank === 2) return '◆';
    if (rank === 3) return '◇';
    return String(rank).padStart(2, '0');
  };

  return (
    <div style={{
      background:   'rgba(0,0,14,0.92)',
      border:       `1px solid ${T.line}`,
      backdropFilter: 'blur(20px)',
      position:     'relative',
      overflow:     'hidden',
      transition:   'box-shadow 0.4s',
      boxShadow:    pulse ? '0 0 40px rgba(240,160,0,0.15)' : 'none',
    }}>

      {/* ── Top amber line ── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: 'linear-gradient(90deg, transparent, #F0A000, transparent)',
      }} />

      {/* ── Header ── */}
      <div style={{
        padding: '32px 36px 24px',
        borderBottom: `1px solid rgba(240,160,0,0.08)`,
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 12,
        }}>
          <div>
            <div style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 9, letterSpacing: 7, color: T.amber,
              textTransform: 'uppercase', marginBottom: 8,
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <span style={{ display: 'inline-block', width: 20, height: 1, background: T.amber }} />
              Mission Archive
            </div>
            <h2 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(40px, 6vw, 72px)',
              letterSpacing: 10, color: T.white, lineHeight: 1,
            }}>
              LEADERBOARD
            </h2>
          </div>

          {/* Live indicator + last update */}
          <div style={{ textAlign: 'right' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontFamily: "'Space Mono', monospace", fontSize: 8,
              letterSpacing: 3, color: loading ? T.gray : T.amber,
              textTransform: 'uppercase',
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: '50%',
                background: loading ? T.gray : T.amber,
                boxShadow: loading ? 'none' : `0 0 8px ${T.amber}`,
                animation: loading ? 'none' : 'lbPulse 2s ease-in-out infinite',
                display: 'inline-block',
              }} />
              {loading ? 'SYNCING...' : 'LIVE'}
            </div>
            {lastUpdate && (
              <div style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 7, letterSpacing: 2, color: 'rgba(122,122,146,0.45)',
                marginTop: 4,
              }}>
                updated {timeAgo(lastUpdate)}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Column headers ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '56px 1fr 80px 80px 100px',
        padding: '10px 36px',
        gap: 8, alignItems: 'center',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}>
        {['#', 'CALLSIGN', 'SCORE', 'TIME', 'WHEN'].map(h => (
          <div key={h} style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 7, letterSpacing: 4, color: T.amberDim,
            textTransform: 'uppercase',
            textAlign: h === '#' ? 'left' : h === 'SCORE' || h === 'TIME' ? 'center' : 'right',
          }}>
            {h}
          </div>
        ))}
      </div>

      {/* ── Body ── */}
      <div style={{ minHeight: 120 }}>

        {/* Loading skeleton */}
        {loading && (
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '60px 36px',
            fontFamily: "'Space Mono', monospace",
            fontSize: 9, letterSpacing: 5, color: T.gray,
            textTransform: 'uppercase',
          }}>
            <span style={{ animation: 'lbBlink 1.2s ease-in-out infinite' }}>
              ◈ RETRIEVING RECORDS...
            </span>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div style={{
            padding: '40px 36px', textAlign: 'center',
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic', fontSize: 16, color: 'rgba(200,80,80,0.7)',
          }}>
            {error}
          </div>
        )}

        {/* Empty */}
        {!loading && !error && entries.length === 0 && (
          <div style={{
            padding: '60px 36px', textAlign: 'center',
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic', fontSize: 18, color: 'rgba(122,122,146,0.45)',
          }}>
            No records yet — be the first to claim the stars.
          </div>
        )}

        {/* Rows */}
        {!loading && !error && entries.map((entry, i) => {
          const isTop3    = entry.rank <= 3;
          const isMe      = normalised && entry.username === normalised;
          const rankColor = isTop3 ? TOP3_COLORS[i] : 'rgba(122,122,146,0.3)';

          return (
            <div
              key={`${entry.username}-${i}`}
              style={{
                display: 'grid',
                gridTemplateColumns: '56px 1fr 80px 80px 100px',
                padding: '16px 36px', gap: 8, alignItems: 'center',
                background: isMe
                  ? 'rgba(240,160,0,0.04)'
                  : i % 2 === 0 ? 'rgba(255,255,255,0.008)' : 'transparent',
                borderLeft: isTop3
                  ? `2px solid ${rankColor}`
                  : isMe ? `2px solid rgba(240,160,0,0.3)` : '2px solid transparent',
                borderBottom: '1px solid rgba(255,255,255,0.03)',
                transition: 'background 0.3s',
              }}
              onMouseEnter={e  => { if (!isMe) e.currentTarget.style.background = 'rgba(255,255,255,0.018)'; }}
              onMouseLeave={e => {
                e.currentTarget.style.background = isMe
                  ? 'rgba(240,160,0,0.04)'
                  : i % 2 === 0 ? 'rgba(255,255,255,0.008)' : 'transparent';
              }}
            >
              {/* Rank */}
              <div style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: isTop3 ? 26 : 18, color: rankColor, lineHeight: 1,
              }}>
                {rankLabel(entry.rank)}
              </div>

              {/* Username */}
              <div style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 11, letterSpacing: 3,
                color: isMe ? T.amber : isTop3 ? T.white : T.gray,
                textTransform: 'uppercase',
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }}>
                {entry.username}
                {isMe && (
                  <span style={{ marginLeft: 8, fontSize: 7, letterSpacing: 2, color: 'rgba(240,160,0,0.55)' }}>
                    ← YOU
                  </span>
                )}
              </div>

              {/* Score */}
              <div style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 24, color: T.white, lineHeight: 1, textAlign: 'center',
              }}>
                {entry.score}
                <span style={{ fontSize: 11, color: T.amberDim }}>/{entry.total}</span>
              </div>

              {/* Time */}
              <div style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 9, letterSpacing: 2, color: T.gray,
                textAlign: 'center',
              }}>
                {formatTime(entry.timeSpent)}
              </div>

              {/* When */}
              <div style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 8, letterSpacing: 1, color: 'rgba(122,122,146,0.45)',
                textAlign: 'right',
              }}>
                {timeAgo(entry.completedAt)}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Footer bar ── */}
      <div style={{
        padding: '14px 36px',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 7, letterSpacing: 3, color: 'rgba(122,122,146,0.3)',
          textTransform: 'uppercase',
        }}>
          Auto-refresh every 5s
        </div>
        <div style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 7, letterSpacing: 3, color: 'rgba(122,122,146,0.3)',
          textTransform: 'uppercase',
        }}>
          {entries.length} / 20 records
        </div>
      </div>

      <style>{`
        @keyframes lbPulse {
          0%,100% { box-shadow: 0 0 6px #F0A000; }
          50%      { box-shadow: 0 0 14px #F0A000, 0 0 24px rgba(240,160,0,0.4); }
        }
        @keyframes lbBlink {
          0%,100% { opacity: 1; }
          50%      { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
