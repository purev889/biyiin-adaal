// components/Leaderboard.js

import { useState, useEffect, useRef, useCallback } from 'react';

// ── Design tokens ─────────────────────────────────────────
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

// ── Helpers ───────────────────────────────────────────────s
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
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff/60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff/3600)}h ago`;
  return `${Math.floor(diff/86400)}d ago`;
}

const TOP3 = [T.gold1, T.gold2, T.gold3];

const rankLabel = (r) => {
  if (r === 1) return '✦';
  if (r === 2) return '◆';
  if (r === 3) return '◇';
  return String(r).padStart(2, '0');
};

// ── Main Component ────────────────────────────────────────
export default function Leaderboard({ highlightUsername = '' }) {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pulse, setPulse] = useState(false);
  const prevCount = useRef(0);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/leaderboard');
      const data = await res.json();

      const list = data.entries || [];
      setEntries(list);

      if (list.length !== prevCount.current) {
        setPulse(true);
        setTimeout(() => setPulse(false), 1500);
        prevCount.current = list.length;
      }

    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const i = setInterval(fetchData, 5000);
    return () => clearInterval(i);
  }, [fetchData]);

  const me = highlightUsername.toUpperCase();

  return (
    <div style={{
      background: 'rgba(0,0,15,0.95)',
      border: `1px solid ${T.line}`,
      boxShadow: pulse
        ? '0 0 60px rgba(240,160,0,0.2)'
        : '0 8px 40px rgba(0,0,0,0.6)'
    }}>

      {/* HEADER */}
      <div style={{
        padding: '30px',
        borderBottom: `1px solid ${T.line}`
      }}>
        <h2 style={{
          fontFamily: 'Bebas Neue',
          letterSpacing: 8,
          fontSize: 48
        }}>
          LEADERBOARD
        </h2>
      </div>

      {/* BODY */}
      {loading ? (
        <div style={{ padding: 40 }}>Loading...</div>
      ) : (
        entries.map((e, i) => {
          const isTop = e.rank <= 3;
          const isMe = e.username === me;

          return (
            <div key={i} style={{
              display: 'grid',
              gridTemplateColumns: '50px 1fr 100px 100px',
              padding: '16px 30px',
              borderLeft: isTop
                ? `3px solid ${TOP3[i]}`
                : isMe
                  ? `3px solid ${T.amber}`
                  : '3px solid transparent',
              borderBottom: '1px solid rgba(255,255,255,0.03)',
              background: isMe
                ? 'rgba(240,160,0,0.05)'
                : 'transparent',
              transition: 'all 0.3s ease'
            }}>
              <div>{rankLabel(e.rank)}</div>
              <div>{e.username}</div>
              <div>{e.score}/{e.total}</div>
              <div>{formatTime(e.timeSpent)}</div>
            </div>
          );
        })
      )}
    </div>
  );
}
