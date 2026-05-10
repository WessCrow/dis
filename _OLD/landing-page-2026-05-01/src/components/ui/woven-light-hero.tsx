"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Utilities ────────────────────────────────────────────────────────────────
function rnd(min: number, max: number) { return min + Math.random() * (max - min); }

const PALETTE = [
  { w: 0.05, h: 196, s: 90, l: 40 },  // deep cyan
  { w: 0.07, h: 196, s: 85, l: 65 },  // bright #29BDF2
  { w: 0.10, h: 196, s: 80, l: 28 },  // dark cyan
  { w: 0.12, h: 196, s: 88, l: 78 },  // light cyan
  { w: 0.66, h: 196, s: 40, l: 93 },  // near-white cyan
];

function pickColor(): string {
  let r = Math.random();
  for (const p of PALETTE) { r -= p.w; if (r <= 0) return `hsl(${p.h},${p.s}%,${p.l}%)`; }
  return 'hsl(196,40%,93%)';
}

// ─── Types ────────────────────────────────────────────────────────────────────
interface Particle {
  x: number; y: number; vx: number; vy: number;
  r: number; opacity: number; friction: number;
  color: string; trail: {x:number;y:number}[]; trailLen: number;
}
interface Star {
  x: number; y: number; r: number; opacity: number;
  speed: number; depth: number; phase: number; color: string; glow: boolean;
}
interface Ring { gap: boolean; gapStart: number; gapEnd: number; }

// ─── Spawn Helpers ────────────────────────────────────────────────────────────
function spawnParticle(cx: number, cy: number, bhR: number): Particle {
  const angle = Math.random() * Math.PI * 2;
  const dist  = bhR * rnd(1.6, 5.1);
  const speed = rnd(0.18, 0.40);
  const dir   = Math.random() < 0.5 ? 1 : -1;
  return {
    x: cx + Math.cos(angle) * dist,
    y: cy + Math.sin(angle) * dist * 0.65,
    vx: -Math.sin(angle) * speed * dir + rnd(-0.04, 0.04),
    vy:  Math.cos(angle) * speed * dir * 0.65 + rnd(-0.04, 0.04),
    r: rnd(0.5, 1.7), opacity: rnd(0.4, 1.0),
    friction: rnd(0.992, 0.998), color: pickColor(),
    trail: [], trailLen: Math.floor(rnd(4, 22)),
  };
}

function spawnStar(w: number, h: number): Star {
  const r = rnd(0.4, 1.8);
  return {
    x: Math.random() * w, y: Math.random() * h, r,
    opacity: rnd(0.2, 1.0), speed: rnd(0.01, 0.045),
    depth: rnd(0.6, 1.0), phase: Math.random() * Math.PI * 2,
    color: pickColor(), glow: r > 1.1,
  };
}

function buildRings(count: number): Ring[] {
  return Array.from({ length: count }, (_, i) => {
    const gap = ((i * 7919) % 100) / 100 < 0.15;
    const gapStart = ((i * 3571) % 100) / 100 * Math.PI * 2;
    const gapEnd   = gapStart + 0.1 + ((i * 2311) % 100) / 100 * 0.3;
    return { gap, gapStart, gapEnd };
  });
}

// ─── Orbital Ring (Photon Sphere / Accretion Disk) ────────────────────────────
const TILT = 0.32; 

const RING_PAL = [
  { w: 0.08, h: 196, s: 90, l: 45 },  
  { w: 0.12, h: 196, s: 88, l: 60 },  
  { w: 0.22, h: 196, s: 82, l: 33 },  
  { w: 0.25, h: 196, s: 75, l: 78 },  
  { w: 0.33, h: 196, s: 40, l: 94 },  
];
function pickRingColor(): string {
  let r = Math.random();
  for (const p of RING_PAL) { r -= p.w; if (r <= 0) return `hsl(${p.h},${p.s}%,${p.l}%)`; }
  return 'hsl(196,40%,94%)';
}

interface OrbitalParticle {
  angle: number; speed: number; bandR: number;
  baseR: number; baseOpacity: number;
  flickerPhase: number; flickerSpeed: number;
  color: string; trail: number[];
}

const ORBITAL_BANDS = [
  { r: 1.06, spd: 0.0090, var: 0.002 },
  { r: 1.13, spd: 0.0075, var: 0.002 },
  { r: 1.22, spd: 0.0062, var: 0.002 },
  { r: 1.34, spd: 0.0050, var: 0.002 },
];

function buildOrbitalRing(count: number): OrbitalParticle[] {
  const perBand = Math.floor(count / ORBITAL_BANDS.length);
  const result: OrbitalParticle[] = [];
  for (const band of ORBITAL_BANDS) {
    for (let i = 0; i < perBand; i++) {
      const dir = Math.random() < 0.5 ? 1 : -1;
      result.push({
        angle: Math.random() * Math.PI * 2,
        speed: (band.spd + rnd(-band.var, band.var)) * dir,
        bandR: band.r,
        baseR: rnd(0.8, 2.2),
        baseOpacity: rnd(0.5, 1.0),
        flickerPhase: Math.random() * Math.PI * 2,
        flickerSpeed: rnd(0.02, 0.09),
        color: pickRingColor(),
        trail: [],
      });
    }
  }
  return result;
}

// ─── Main Component ───────────────────────────────────────────────────────────
interface WovenConfig {
  size: number;
  vThickness: number;
  hThickness: number;
  vCount: number;
  hCount: number;
  color: string;
  hTilt: number;
  vTilt: number;
  posX: number;
  posY: number;
  vignette: number;
  rotation: number;
}

export const WovenLightHero = ({ children }: { children?: React.ReactNode }) => {
  const [config] = useState<WovenConfig>({
    size: 0.29,
    vThickness: 0.8,
    hThickness: 3.0,
    vCount: 600,
    hCount: 120,
    color: '#29BDF2',
    hTilt: 0.15,
    vTilt: 0.25,
    posX: 0.71,
    posY: 0.49,
    vignette: 1.0,
    rotation: 343,
  });

  return (
    <div className="relative w-full h-full min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <DisruptaCanvas config={config} />
      
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
          className="relative z-20 w-full h-full pointer-events-none"
        >
          <div className="pointer-events-auto w-full h-full">{children}</div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// ─── Canvas Engine ────────────────────────────────────────────────────────────
const STAR_COUNT = 600;

const DisruptaCanvas = ({ config }: { config: any }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef  = useRef({ x: 0.5, y: 0.5 });
  const configRef = useRef(config);

  useEffect(() => {
    configRef.current = config;
  }, [config]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0, time = 0, w = 0, h = 0;
    let particles: Particle[] = [];
    let stars: Star[] = [];
    let orbital: OrbitalParticle[] = buildOrbitalRing(520);
    const rings: Ring[] = buildRings(600);

    function resize() {
      if (!canvas) return;
      w = canvas.width  = window.innerWidth;
      h = canvas.height = window.innerHeight;
      stars = Array.from({ length: STAR_COUNT }, () => spawnStar(w, h));
      const bhR = Math.min(w, h) * configRef.current.size;
      const cx = w * configRef.current.posX, cy = h * configRef.current.posY;
      particles = Array.from({ length: 900 }, () => spawnParticle(cx, cy, bhR));
    }
    resize();
    window.addEventListener('resize', resize);

    function drawHatch() {
      ctx!.save();
      ctx!.strokeStyle = 'rgba(255,255,255,0.045)';
      ctx!.lineWidth = 0.35;
      const diag = Math.sqrt(w * w + h * h);
      for (const deg of [30, 150]) {
        const a = deg * Math.PI / 180;
        const cos = Math.cos(a), sin = Math.sin(a);
        for (let d = -diag; d < diag; d += 9) {
          ctx!.beginPath();
          ctx!.moveTo(w/2 + cos*(-diag) - sin*d, h/2 + sin*(-diag) + cos*d);
          ctx!.lineTo(w/2 + cos*diag  - sin*d, h/2 + sin*diag  + cos*d);
          ctx!.stroke();
        }
      }
      ctx!.restore();
    }

    function drawStars() {
      for (const s of stars) {
        const tw = s.depth + (1 - s.depth) * (0.5 + 0.5 * Math.sin(time * s.speed + s.phase));
        const a  = s.opacity * tw;
        if (s.glow) {
          const g = ctx!.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 2.5);
          g.addColorStop(0, s.color); g.addColorStop(1, 'rgba(0,0,0,0)');
          ctx!.save(); ctx!.globalAlpha = a * 0.6;
          ctx!.beginPath(); ctx!.arc(s.x, s.y, s.r * 2.5, 0, Math.PI*2);
          ctx!.fillStyle = g; ctx!.fill(); ctx!.restore();
        }
        ctx!.save(); ctx!.globalAlpha = a;
        ctx!.beginPath(); ctx!.arc(s.x, s.y, s.r, 0, Math.PI*2);
        ctx!.fillStyle = s.color; ctx!.fill(); ctx!.restore();
      }
    }

    function drawRings(cx: number, cy: number, bhR: number) {
      const rMax = bhR * 12;
      ctx!.save();
      const count = Math.floor(configRef.current.vCount);
      for (let i = 0; i < count; i++) {
        const t  = i / count;
        const r  = bhR + Math.pow(t, 0.7) * rMax;
        const op = (0.04 + 0.35 * (1 - t)) * configRef.current.vThickness;
        const lw = (0.25 + 0.45 * (1 - t)) * configRef.current.vThickness;
        const wb = r * 0.015 * Math.sin(time * 0.0008 + i * 0.3);
        const ring = rings[i];
        ctx!.beginPath();
        ctx!.strokeStyle = `rgba(255,255,255,${op.toFixed(3)})`;
        ctx!.lineWidth = lw;
        if (ring.gap) {
          ctx!.arc(cx, cy, r + wb, ring.gapEnd, ring.gapStart + Math.PI * 2);
        } else {
          ctx!.arc(cx, cy, r + wb, 0, Math.PI * 2);
        }
        ctx!.stroke();
      }
      ctx!.restore();
    }

    function drawHorizontalRings(isBack: boolean, cx: number, cy: number, bhR: number) {
      const hCount = Math.floor(configRef.current.hCount);
      const flowSpeed = 0.0008; 
      const animT = (time * flowSpeed) % 1;

      ctx!.save();
      for (let i = 0; i < hCount; i++) {
        const t_base = i / hCount;
        let t = (t_base - animT + 1) % 1;
        const r = bhR * (1.1 + t * 4.2);
        const edgeFade = Math.pow(Math.sin(t * Math.PI), 0.6);
        const op = (0.06 + 0.18 * (1 - t)) * 0.55 * configRef.current.hThickness * edgeFade;
        const lw = (0.35 + 0.55 * (1 - t)) * configRef.current.hThickness;
        const wb = r * 0.008 * Math.sin(time * 0.0014 + i * 0.6);
        const tilt = configRef.current.hTilt; 
        const rot  = 0.03; 

        ctx!.beginPath();
        ctx!.lineWidth = lw;
        ctx!.strokeStyle = configRef.current.color; 
        if (isBack) {
          ctx!.ellipse(cx, cy, r + wb, (r + wb) * tilt, rot, Math.PI, Math.PI * 2);
        } else {
          ctx!.ellipse(cx, cy, r + wb, (r + wb) * tilt, rot, 0, Math.PI);
        }
        ctx!.stroke();
      }
      ctx!.restore();
    }

    function updateParticles(cx: number, cy: number, bhR: number) {
      const escapeR = bhR * 1.08;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        const dx = cx - p.x, dy = cy - p.y;
        const distSq = dx*dx + dy*dy + 200;
        const dist   = Math.sqrt(distSq);
        const force  = 0.018 * 9000 / distSq;
        p.vx += (dx / dist) * force; p.vy += (dy / dist) * force;
        p.vx *= p.friction; p.vy *= p.friction;
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > p.trailLen) p.trail.shift();
        p.x += p.vx; p.y += p.vy;
        if (Math.hypot(p.x - cx, p.y - cy) < escapeR || p.x < -200 || p.x > w+200 || p.y < -200 || p.y > h+200) {
          particles[i] = spawnParticle(cx, cy, bhR); continue;
        }
        for (let t = 1; t < p.trail.length; t++) {
          ctx!.save();
          ctx!.globalAlpha = (t / p.trail.length) * p.opacity * 0.55;
          ctx!.strokeStyle = p.color; ctx!.lineWidth = p.r * 0.8;
          ctx!.beginPath();
          ctx!.moveTo(p.trail[t-1].x, p.trail[t-1].y);
          ctx!.lineTo(p.trail[t].x,   p.trail[t].y);
          ctx!.stroke(); ctx!.restore();
        }
        const g = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 2.2);
        g.addColorStop(0, p.color); g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx!.save(); ctx!.globalAlpha = p.opacity * 0.5;
        ctx!.beginPath(); ctx!.arc(p.x, p.y, p.r * 2.2, 0, Math.PI*2);
        ctx!.fillStyle = g; ctx!.fill(); ctx!.restore();
        ctx!.save(); ctx!.globalAlpha = p.opacity;
        ctx!.beginPath(); ctx!.arc(p.x, p.y, p.r, 0, Math.PI*2);
        ctx!.fillStyle = p.color; ctx!.fill(); ctx!.restore();
      }
    }

    function drawSingularity(cx: number, cy: number, bhR: number) {
      const pulse  = 1 + 0.03 * Math.sin(time * 0.001 * Math.PI * 2);
      const escR   = bhR * 1.08;
      const og = ctx!.createRadialGradient(cx, cy, escR, cx, cy, escR + 32 * pulse);
      og.addColorStop(0.0, 'rgba(41,189,242,0.95)');   
      og.addColorStop(0.3, 'rgba(15,130,195,0.75)');   
      og.addColorStop(0.7, 'rgba(120,210,245,0.25)');  
      og.addColorStop(1.0, 'rgba(180,235,252,0)');     
      ctx!.beginPath(); ctx!.arc(cx, cy, escR + 32*pulse, 0, Math.PI*2);
      ctx!.fillStyle = og; ctx!.fill();
      const ig = ctx!.createRadialGradient(cx, cy, escR - 8, cx, cy, escR);
      ig.addColorStop(0, 'rgba(150,225,250,0.6)');     
      ig.addColorStop(1, 'rgba(150,225,250,0)');
      ctx!.beginPath(); ctx!.arc(cx, cy, escR, 0, Math.PI*2);
      ctx!.fillStyle = ig; ctx!.fill();
      ctx!.beginPath(); ctx!.arc(cx, cy, bhR, 0, Math.PI*2);
      ctx!.fillStyle = '#000000'; ctx!.fill();
    }

    const LAYERS = [
      { yOff: 10,  freq: 0.0042, amp: 110, phase: 0.0,  ho: 0.08,  hs: 5 },
      { yOff: 0,   freq: 0.0028, amp: 170, phase: 1.8,  ho: 0.055, hs: 7 },
      { yOff: -15, freq: 0.0018, amp: 240, phase: 3.4,  ho: 0.035, hs: 9 },
    ];
    const HATCH_A = 31 * Math.PI / 180;

    function drawSilhouettes() {
      const diag = Math.sqrt(w*w + h*h);
      const cosH = Math.cos(HATCH_A), sinH = Math.sin(HATCH_A);
      for (const L of LAYERS) {
        const baseY = h * 0.78 + L.yOff;
        ctx!.save();
        ctx!.beginPath(); ctx!.moveTo(0, h);
        for (let x = 0; x <= w; x += 2) {
          const y = baseY - Math.sin(x * L.freq + L.phase) * L.amp
                          - Math.sin(x * L.freq * 1.7 + L.phase * 0.8) * L.amp * 0.3;
          ctx!.lineTo(x, y);
        }
        ctx!.lineTo(w, h); ctx!.closePath();
        const grad = ctx!.createLinearGradient(0, baseY - L.amp, 0, h);
        grad.addColorStop(0.0, 'rgba(30, 30, 32, 0.98)'); 
        grad.addColorStop(0.6, 'rgba(10, 10, 12, 0.99)'); 
        grad.addColorStop(1.0, 'rgba(2, 2, 3, 1.0)');     
        ctx!.fillStyle = grad; 
        ctx!.fill();
        ctx!.clip();
        ctx!.strokeStyle = `rgba(255,255,255,${L.ho})`; ctx!.lineWidth = 0.45;
        for (let d = -diag; d < diag; d += L.hs) {
          ctx!.beginPath();
          ctx!.moveTo(w/2 + cosH*(-diag) - sinH*d, h/2 + sinH*(-diag) + cosH*d);
          ctx!.lineTo(w/2 + cosH*diag   - sinH*d, h/2 + sinH*diag   + cosH*d);
          ctx!.stroke();
        }
        ctx!.restore();
      }
    }

    function updateOrbital() {
      for (const p of orbital) {
        p.trail.push(p.angle);
        if (p.trail.length > 16) p.trail.shift();
        p.angle += p.speed;
      }
    }

    function drawOrbitalPass(isBack: boolean, cx: number, cy: number, bhR: number) {
      for (const p of orbital) {
        const sinA = Math.sin(p.angle);
        if (isBack ? sinA >= 0 : sinA < 0) continue; 
        const depth  = Math.abs(sinA);   
        const flicker = 0.72 + 0.28 * Math.sin(p.flickerPhase + time * p.flickerSpeed);
        const pr = p.baseR * (isBack ? (0.35 + depth * 0.25) : (0.75 + depth * 0.65));
        const po = (isBack ? (0.18 + depth * 0.32) : (0.55 + depth * 0.45)) * flicker * p.baseOpacity * configRef.current.vThickness;
        const px = cx + Math.cos(p.angle) * p.bandR * bhR;
        const py = cy + sinA * p.bandR * bhR * configRef.current.vTilt;

        for (let t = 1; t < p.trail.length; t++) {
          const ratio = t / p.trail.length;
          const tx1 = cx + Math.cos(p.trail[t-1]) * p.bandR * bhR;
          const ty1 = cy + Math.sin(p.trail[t-1]) * p.bandR * bhR * TILT;
          const tx2 = cx + Math.cos(p.trail[t])   * p.bandR * bhR;
          const ty2 = cy + Math.sin(p.trail[t])   * p.bandR * bhR * TILT;
          ctx!.save();
          ctx!.globalAlpha = po * ratio * 0.45;
          ctx!.strokeStyle = p.color;
          ctx!.lineWidth   = pr * 0.65;
          ctx!.beginPath(); ctx!.moveTo(tx1, ty1); ctx!.lineTo(tx2, ty2);
          ctx!.stroke(); ctx!.restore();
        }

        if (!isBack && pr > 1.0) {
          const g = ctx!.createRadialGradient(px, py, 0, px, py, pr * 2.5);
          g.addColorStop(0, p.color); g.addColorStop(1, 'rgba(0,0,0,0)');
          ctx!.save(); ctx!.globalAlpha = po * 0.35;
          ctx!.beginPath(); ctx!.arc(px, py, pr * 2.5, 0, Math.PI * 2);
          ctx!.fillStyle = g; ctx!.fill(); ctx!.restore();
        }

        ctx!.save(); ctx!.globalAlpha = po;
        ctx!.beginPath(); ctx!.arc(px, py, Math.max(pr, 0.3), 0, Math.PI * 2);
        ctx!.fillStyle = p.color; ctx!.fill(); ctx!.restore();
      }
    }

    function animate() {
      raf = requestAnimationFrame(animate);
      time++;
      const px = (mouseRef.current.x - 0.5) * w * 0.012;
      const py = (mouseRef.current.y - 0.5) * h * 0.010;
      const cx  = w * configRef.current.posX + px;
      const cy  = h * configRef.current.posY + py;
      const bhR = Math.min(w, h) * configRef.current.size;

      ctx!.fillStyle = '#000000'; ctx!.fillRect(0, 0, w, h);
      drawHatch();
      drawStars();

      ctx!.save();
      ctx!.translate(cx, cy);
      ctx!.rotate(configRef.current.rotation * Math.PI / 180);
      ctx!.translate(-cx, -cy);

      drawRings(cx, cy, bhR);
      updateParticles(cx, cy, bhR);
      updateOrbital();
      drawOrbitalPass(true, cx, cy, bhR);        
      drawHorizontalRings(true, cx, cy, bhR);    
      drawSingularity(cx, cy, bhR);              
      drawHorizontalRings(false, cx, cy, bhR);   
      drawOrbitalPass(false, cx, cy, bhR);       
      
      ctx!.restore();

      drawSilhouettes();
      drawVignette();
    }

    function drawVignette() {
      const vVal = configRef.current.vignette;
      const gv = ctx!.createRadialGradient(w * 0.5, h * 0.5, 0, w * 0.5, h * 0.5, Math.max(w, h) * 0.85);
      gv.addColorStop(0.00, 'rgba(0,0,0,0)');
      gv.addColorStop(0.15, `rgba(0,0,0,${vVal * 0.4})`);  
      gv.addColorStop(0.50, `rgba(0,0,0,${vVal * 0.85})`); 
      gv.addColorStop(1.00, `rgba(0,0,0,${vVal})`);       
      ctx!.fillStyle = gv;
      ctx!.fillRect(0, 0, w, h);

      const gl = ctx!.createLinearGradient(0, 0, w * 0.5, 0);
      gl.addColorStop(0.0, `rgba(0,0,0,${vVal})`);      
      gl.addColorStop(0.4, `rgba(0,0,0,${vVal * 0.7})`); 
      gl.addColorStop(1.0, 'rgba(0,0,0,0)');
      ctx!.fillStyle = gl;
      ctx!.fillRect(0, 0, w, h);
    }
    animate();

    function onMouse(e: MouseEvent) {
      mouseRef.current = { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight };
    }
    window.addEventListener('mousemove', onMouse);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" style={{ display: 'block' }} />;
};
