// components/Leaderboard.js
// Interstellar — Cinematic leaderboard.
// Polls /api/leaderboard every 5 seconds for near-real-time updates.
// Accepts an optional `highlightUsername` prop to glow the current user's row.
//
// ENHANCED:
//   // NEW: fastest highlight logic  — highlights the entry with lowest timeSpent
//   // NEW: date formatting          — shows "Apr 27, 2026" + "(2m ago)" in WHEN column

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

// ── Design tokens (mirrored from main page) ────────────────────────────────
const T = {
  amber:    '#F0A000',
  amberDim: '#7A5000',
  white:    '#EDE9DF',
  gray:     '#7A7A92',
  line:     'rgba(240,160,0,0.15)',
  gold1:    '#F0A000',
  gold2:    'rgba(200,155,55,0.9)',
  gold3:    'rgba(155,120,45,0.75)',
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

function timeAgo(iso) {
  if (!iso) return '—';
  const diff = Math.floor((Date.now() - new Date(iso)) / 1000);
  if (diff < 5)    return 'just now';
  if (diff < 60)   return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

// NEW: date formatting — returns "Apr 27, 2026"
function formatDate(iso) {
  if (!iso) return '—';
  try {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day:   'numeric',
      year:  'numeric',
    }).format(new Date(iso));
  } catch {
    return '—';
  }
}

const TOP3 = [T.gold1, T.gold2, T.gold3];

const rankLabel = (r) => {
  if (r === 1) return '✦';
  if (r === 2) return '◆';
  if (r === 3) return '◇';
  return String(r).padStart(2, '0');
};

// ── Component ──────────────────────────────────────────────────────────────
export default function Leaderboard({ highlightUsername = '' }) {
  const [entries,    setEntries]    = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [pulse,      setPulse]      = useState(false);
  const intervalRef  = useRef(null);
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

      if (data.entries?.length !== prevCountRef.current) {
        setPulse(true);
        setTimeout(() => setPulse(false), 1500);
        prevCountRef.current = data.entries?.length ?? 0;
      }
    } catch {
      setError('Transmission interrupted. Retrying...');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeaderboard();
    intervalRef.current = setInterval(fetchLeaderboard, 5_000);
    return () => clearInterval(intervalRef.current);
  }, [fetchLeaderboard]);

  // NEW: fastest highlight logic ────────────────────────────────────────────
  // Find username of the fastest entry (lowest timeSpent).
  // Tie-break: highest score wins. Computed once per entries change via useMemo.
  const fastestUsername = useMemo(() => {
    if (!entries.length) return null;
    const valid = entries.filter(e => e.timeSpent != null && e.timeSpent > 0);
    if (!valid.length) return null;

    const fastest = valid.reduce((best, cur) => {
      if (cur.timeSpent < best.timeSpent) return cur;
      if (cur.timeSpent === best.timeSpent && cur.score > best.score) return cur;
      return best;
    });

    return fastest.username;
  }, [entries]);

  return (
    <div style={{
      background:   'rgba(0,0,15,0.95)',
      border:       `1px solid ${T.line}`,
      backdropFilter: 'blur(20px)',
      position:     'relative',
      overflow:     'hidden',
      transition:   'box-shadow 0.6s ease',
      boxShadow:    pulse
        ? '0 0 60px rgba(240,160,0,0.2)'
        : '0 8px 40px rgba(0,0,0,0.6)',
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
                {/* NEW: date formatting — show formatted date + relative time */}
                updated {timeAgo(lastUpdate)}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Column headers ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '56px 1fr 90px 80px 130px',
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

        {/* Loading */}
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
          const isTop3   = entry.rank <= 3;
          const isMe     = normalised && entry.username === normalised;
          const rankColor = isTop3 ? TOP3[i] : 'rgba(122,122,146,0.3)';

          // NEW: fastest highlight logic
          const isFastest = entry.username === fastestUsername;

          return (
            <div
              key={`${entry.username}-${i}`}
              style={{
                display: 'grid',
                gridTemplateColumns: '56px 1fr 90px 80px 130px',
                padding: '16px 36px', gap: 8, alignItems: 'center',
                // NEW: fastest gets a very subtle amber glow overlay on top of existing bg
                background: isMe
                  ? 'rgba(240,160,0,0.04)'
                  : isFastest
                  ? 'rgba(240,160,0,0.025)'
                  : i % 2 === 0 ? 'rgba(255,255,255,0.008)' : 'transparent',
                borderLeft: isTop3
                  ? `2px solid ${rankColor}`
                  : isMe  ? `2px solid rgba(240,160,0,0.3)`
                  : isFastest ? `2px solid rgba(240,160,0,0.18)` // NEW: subtle left border for fastest
                  : '2px solid transparent',
                borderBottom: '1px solid rgba(255,255,255,0.03)',
                // NEW: fastest gets a very faint outer glow on the row
                boxShadow: isFastest
                  ? 'inset 0 0 40px rgba(240,160,0,0.03)'
                  : 'none',
                transition: 'background 0.3s, box-shadow 0.3s',
              }}
              onMouseEnter={e => {
                if (!isMe) e.currentTarget.style.background = 'rgba(255,255,255,0.018)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = isMe
                  ? 'rgba(240,160,0,0.04)'
                  : isFastest
                  ? 'rgba(240,160,0,0.025)'
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

                {/* YOU label */}
                {isMe && (
                  <span style={{
                    marginLeft: 8, fontSize: 7, letterSpacing: 2,
                    color: 'rgba(240,160,0,0.55)',
                  }}>
                    ← YOU
                  </span>
                )}

                {/* NEW: fastest highlight logic — FASTEST ⚡ badge */}
                {isFastest && (
                  <span style={{
                    marginLeft: 10,
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 7, letterSpacing: 2,
                    color: 'rgba(240,160,0,0.6)',
                    border: '1px solid rgba(240,160,0,0.2)',
                    padding: '2px 6px',
                    display: 'inline-block',
                    lineHeight: 1.4,
                    verticalAlign: 'middle',
                    // subtle flicker — same keyframe as the live dot
                    animation: 'lbPulse 3s ease-in-out infinite',
                    whiteSpace: 'nowrap',
                  }}>
                    FASTEST ⚡
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
                fontSize: 9, letterSpacing: 2,
                // NEW: fastest highlight logic — amber tint on the time cell for fastest row
                color: isFastest ? 'rgba(240,160,0,0.65)' : T.gray,
                textAlign: 'center',
                transition: 'color 0.3s',
              }}>
                {formatTime(entry.timeSpent)}
              </div>

              {/* When — NEW: date formatting ────────────────────────────────
                  Shows date on top line and relative time below.
                  Two-line layout fits the existing column width with no reflow. */}
              <div style={{
                textAlign: 'right',
                lineHeight: 1,
              }}>
                <div style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 8, letterSpacing: 1,
                  color: 'rgba(237,233,223,0.32)',
                  marginBottom: 4,
                }}>
                  {formatDate(entry.completedAt)}
                </div>
                <div style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 7, letterSpacing: 1,
                  color: 'rgba(122,122,146,0.38)',
                }}>
                  ({timeAgo(entry.completedAt)})
                </div>
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
          0%,100% { box-shadow: 0 0 6px #F0A000; opacity: 1; }
          50%      { box-shadow: 0 0 14px #F0A000, 0 0 24px rgba(240,160,0,0.4); opacity: 0.7; }
        }
        @keyframes lbBlink {
          0%,100% { opacity: 1; }
          50%      { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
