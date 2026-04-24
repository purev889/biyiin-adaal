// components/BlackHoleCanvas.js
// Reusable Gargantua Black Hole background — extracted from interstellar (1).html
// Uses useRef + useEffect for proper Next.js lifecycle management.
// All animation frames and resize listeners are cleaned up on unmount.

import { useRef, useEffect } from 'react';

export default function BlackHoleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // ── State ─────────────────────────────────────────────────────────────────
    let W, H, cx, cy, R;
    let time = 0;
    let stars = [];
    let dustParticles = [];
    let rafId = null;

    // ── Resize ────────────────────────────────────────────────────────────────
    function resize() {
      W  = canvas.width  = window.innerWidth;
      H  = canvas.height = window.innerHeight;
      cx = W * 0.5;
      cy = H * 0.44;
      R  = Math.min(W, H) * 0.135;
      buildStars();
      buildDust();
    }

    // ── Build star field ──────────────────────────────────────────────────────
    function buildStars() {
      stars = [];
      const N = Math.min(Math.floor(W * H / 6000), 500);
      for (let i = 0; i < N; i++) {
        stars.push({
          x:     Math.random() * W,
          y:     Math.random() * H,
          r:     Math.random() * 1.3 + 0.1,
          b:     Math.random() * 0.7 + 0.15,
          phase: Math.random() * Math.PI * 2,
          spd:   Math.random() * 0.7 + 0.3,
        });
      }
    }

    // ── Build accretion-disk dust ─────────────────────────────────────────────
    function buildDust() {
      dustParticles = [];
      for (let i = 0; i < 60; i++) {
        const angle = Math.random() * Math.PI * 2;
        const rad   = R * (1.3 + Math.random() * 2.8);
        dustParticles.push({
          angle,
          rad,
          speed: (0.003 + Math.random() * 0.006) * (Math.random() < 0.5 ? 1 : -1),
          size:  Math.random() * 1.2 + 0.3,
          alpha: Math.random() * 0.4 + 0.1,
          color: Math.random() < 0.5 ? 'rgba(255,180,60,' : 'rgba(255,130,20,',
        });
      }
    }

    // ── Draw helpers ──────────────────────────────────────────────────────────
    function drawStars() {
      stars.forEach(s => {
        const b = s.b * (0.55 + 0.45 * Math.sin(time * s.spd + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(210,220,255,${b})`;
        ctx.fill();
      });
    }

    function drawDust() {
      dustParticles.forEach(p => {
        p.angle += p.speed;
        const ex  = p.rad;
        const ey  = p.rad * 0.38;
        const px  = cx + Math.cos(p.angle) * ex;
        const py  = cy + Math.sin(p.angle) * ey;
        const d2  = (px - cx) ** 2 + (py - cy) ** 2;
        if (d2 < (R * 1.12) ** 2) return;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.alpha + ')';
        ctx.fill();
      });
    }

    // front=true  → near side (bottom half, bright)
    // front=false → far side  (top half, dim)
    function drawDisk(front) {
      const DX       = R * 2.55;
      const DY       = R * 0.40;
      const dopplerX = Math.sin(time * 0.35) * DX * 0.08;

      const rings = [
        { s: 2.30, lw: 3,  rc: [140,  40,   5], ac: 0.14 },
        { s: 2.10, lw: 5,  rc: [190,  65,   8], ac: 0.22 },
        { s: 1.92, lw: 7,  rc: [225,  95,  12], ac: 0.32 },
        { s: 1.75, lw: 9,  rc: [250, 130,  20], ac: 0.44 },
        { s: 1.60, lw: 11, rc: [255, 165,  45], ac: 0.56 },
        { s: 1.47, lw: 11, rc: [255, 195,  75], ac: 0.66 },
        { s: 1.35, lw: 9,  rc: [255, 215, 110], ac: 0.74 },
        { s: 1.24, lw: 7,  rc: [255, 232, 160], ac: 0.82 },
        { s: 1.15, lw: 5,  rc: [255, 245, 200], ac: 0.90 },
      ];

      rings.forEach(ring => {
        const rx = DX * ring.s;
        const ry = DY * ring.s;

        ctx.save();
        ctx.beginPath();
        if (front) {
          ctx.ellipse(cx + dopplerX, cy, rx * 1.05, ry * 1.05, 0, 0, Math.PI);
        } else {
          ctx.ellipse(cx - dopplerX, cy, rx * 1.05, ry * 1.05, 0, Math.PI, Math.PI * 2);
        }
        ctx.clip();

        const [r, g, b] = ring.rc;
        const alpha     = front ? ring.ac : ring.ac * 0.38;
        const glow      = front ? 18 : 6;

        ctx.beginPath();
        ctx.ellipse(cx + (front ? dopplerX : -dopplerX), cy, rx, ry, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.lineWidth   = ring.lw;
        ctx.shadowColor = `rgba(${r},${Math.floor(g * 0.5)},0,0.7)`;
        ctx.shadowBlur  = glow;
        ctx.stroke();

        ctx.restore();
      });
    }

    function drawLensing() {
      ctx.save();
      for (let i = 0; i < 4; i++) {
        const lr = R * (1.14 + i * 0.07);
        const la = (0.09 - i * 0.019) * (1 + 0.3 * Math.sin(time * 0.6 + i));
        ctx.beginPath();
        ctx.arc(cx, cy, lr, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,210,120,${la})`;
        ctx.lineWidth   = i === 0 ? 2.5 : 1;
        ctx.shadowColor = 'rgba(255,180,60,0.5)';
        ctx.shadowBlur  = i === 0 ? 12 : 6;
        ctx.stroke();
      }
      ctx.restore();
    }

    function drawNebulaGlow() {
      const gr = ctx.createRadialGradient(cx, cy - R * 0.5, R * 1.5, cx, cy, R * 9);
      gr.addColorStop(0,   'rgba(30,55,140,0.10)');
      gr.addColorStop(0.4, 'rgba(15,25,80,0.06)');
      gr.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.fillStyle = gr;
      ctx.fillRect(0, 0, W, H);
    }

    function drawEventHorizon() {
      // Outer mask sphere
      ctx.save();
      ctx.shadowBlur = 0;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.08, 0, Math.PI * 2);
      ctx.fillStyle = '#000000';
      ctx.fill();
      ctx.restore();

      // Photon sphere ring
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.06, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255,200,90,0.22)';
      ctx.lineWidth   = 2.5;
      ctx.shadowColor = 'rgba(255,160,30,0.6)';
      ctx.shadowBlur  = 20;
      ctx.stroke();
      ctx.restore();

      // True event horizon
      ctx.save();
      ctx.shadowBlur = 0;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = '#000000';
      ctx.fill();
      ctx.restore();

      // Ambient amber fringe
      const fringe = ctx.createRadialGradient(cx, cy, R * 0.82, cx, cy, R * 1.32);
      fringe.addColorStop(0,    'rgba(0,0,0,0)');
      fringe.addColorStop(0.65, 'rgba(255,110,10,0.055)');
      fringe.addColorStop(1,    'rgba(0,0,0,0)');
      ctx.fillStyle = fringe;
      ctx.fillRect(cx - R * 2, cy - R * 2, R * 4, R * 4);
    }

    // ── Main render loop ──────────────────────────────────────────────────────
    function render() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#00000A';
      ctx.fillRect(0, 0, W, H);

      drawNebulaGlow();
      drawStars();
      drawDisk(false);       // far side — behind black hole
      drawLensing();
      drawEventHorizon();
      drawDisk(true);        // near side — in front of black hole
      drawDust();

      time  += 0.009;
      rafId  = requestAnimationFrame(render);
    }

    // ── Bootstrap ─────────────────────────────────────────────────────────────
    window.addEventListener('resize', resize);
    resize();
    render();

    // ── Cleanup on unmount ────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
