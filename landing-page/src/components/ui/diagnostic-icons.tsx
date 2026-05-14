"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// ═══════════════════════════════════════════════════════════════════════════════
//  DESIGN SYSTEM — Monochrome HUD
//  Palette  : #FFFFFF (white) → #666666 (gray)
//  Stroke   : 0.6 – 1.5 px  |  Glow: feGaussianBlur 2–6 px
//  Geometry : concentric, HUD radar, precision ticks
// ═══════════════════════════════════════════════════════════════════════════════

// Hero banner dark tones reference: #050505 → #0f0f0f → #080808
const CARD_BG = "linear-gradient(145deg, #060606 0%, #0e0e0e 45%, #080808 100%)";
const AMBIENT = "radial-gradient(ellipse 90% 55% at 50% 100%, rgba(255,255,255,0.05) 0%, transparent 100%)";

const _cos = (deg: number) => Math.round(Math.cos((deg * Math.PI) / 180) * 1e6) / 1e6;
const _sin = (deg: number) => Math.round(Math.sin((deg * Math.PI) / 180) * 1e6) / 1e6;
const hexPoints = (cx: number, cy: number, r: number) =>
  Array.from({ length: 6 }, (_, i) => `${cx + r * _cos(i * 60 - 30)},${cy + r * _sin(i * 60 - 30)}`).join(" ");

// ── 1. DISTORÇÃO DE REALIDADE / FALSA CERTEZA ─────────────────────────────────
export const FalseCertaintyIcon = () => {
  const ticks = Array.from({ length: 24 }, (_, i) => {
    const a = i * 15 - 90;
    const major = i % 6 === 0;
    return { a, major, r1: major ? 155 : 161, r2: 169 };
  });

  return (
    <div className="w-full h-full relative overflow-hidden">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400" fill="none">
        <defs>
          <linearGradient id="fc-g" x1="40" y1="40" x2="360" y2="360" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#666666" />
          </linearGradient>
          <filter id="fc-gl" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="b" />
            <feComposite in="SourceGraphic" in2="b" operator="over" />
          </filter>
          <filter id="fc-sm" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="b" />
            <feComposite in="SourceGraphic" in2="b" operator="over" />
          </filter>
        </defs>

        {/* HUD corners */}
        <g stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" strokeLinecap="square" opacity="0.55">
          <path d="M18,36 L18,18 L36,18" /><path d="M364,18 L382,18 L382,36" />
        </g>
        <g stroke="rgba(180,180,180,0.45)" strokeWidth="1.5" strokeLinecap="square" opacity="0.45">
          <path d="M18,364 L18,382 L36,382" /><path d="M382,364 L382,382 L364,382" />
        </g>

        {/* Precision tick ring */}
        {ticks.map(({ a, major, r1, r2 }, i) => (
          <line key={i}
            x1={200 + r1 * _cos(a)} y1={200 + r1 * _sin(a)}
            x2={200 + r2 * _cos(a)} y2={200 + r2 * _sin(a)}
            stroke={major ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.2)"}
            strokeWidth={major ? "1.2" : "0.7"}
          />
        ))}

        {/* 5 concentric rings */}
        <motion.circle cx="200" cy="200" r="155" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5"
          strokeOpacity="0.15" strokeDasharray="7 21"
          animate={{ rotate: [0, -360] }}
          transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
          style={{ originX: "200px", originY: "200px" }}
        />
        <motion.circle cx="200" cy="200" r="120" stroke="url(#fc-g)" strokeWidth="0.7"
          strokeOpacity="0.25" strokeDasharray="4 16"
          animate={{ rotate: [360, 0] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          style={{ originX: "200px", originY: "200px" }}
        />
        <circle cx="200" cy="200" r="88" stroke="url(#fc-g)" strokeWidth="1" strokeOpacity="0.45" />
        <circle cx="200" cy="200" r="58" stroke="url(#fc-g)" strokeWidth="1.2" strokeOpacity="0.72" filter="url(#fc-sm)" />
        <motion.circle cx="200" cy="200" r="28" stroke="rgba(200,200,200,0.8)" strokeWidth="1.5"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          filter="url(#fc-gl)"
        />

        {/* Ghost axis */}
        <line x1="200" y1="24" x2="200" y2="376" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        <line x1="24" y1="200" x2="376" y2="200" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />

        {/* Slow sweep arm */}
        <motion.line x1="200" y1="200" x2="200" y2="46"
          stroke="rgba(255,255,255,0.35)" strokeWidth="0.8" strokeOpacity="0.35"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          style={{ originX: "200px", originY: "200px" }}
        />

        {/* Displaced crosshair */}
        <motion.g
          animate={{ x: [0, 26, -20, 12, 0], y: [0, -20, 28, -12, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        >
          <line x1="200" y1="166" x2="200" y2="189" stroke="white" strokeWidth="0.9" strokeOpacity="0.9" strokeLinecap="square" />
          <line x1="200" y1="211" x2="200" y2="234" stroke="white" strokeWidth="0.9" strokeOpacity="0.9" strokeLinecap="square" />
          <line x1="166" y1="200" x2="189" y2="200" stroke="white" strokeWidth="0.9" strokeOpacity="0.9" strokeLinecap="square" />
          <line x1="211" y1="200" x2="234" y2="200" stroke="white" strokeWidth="0.9" strokeOpacity="0.9" strokeLinecap="square" />
          <circle cx="200" cy="200" r="4.5" fill="white" filter="url(#fc-gl)" />
          <circle cx="200" cy="200" r="2" fill="white" />
        </motion.g>

        {/* True center */}
        <circle cx="200" cy="200" r="1.5" fill="rgba(180,180,180,0.4)" opacity="0.3" />

        <text x="22" y="390" fill="rgba(255,255,255,0.25)" fontSize="8.5" fontFamily="monospace" letterSpacing="0.22em">
          TARGET_LOCK: NOMINAL
        </text>
      </svg>
    </div>
  );
};

// ── 2. RALO DE RECURSOS / O BURACO NEGRO DO CAPITAL ──────────────────────────
export const ResourceDrainIcon = () => {
  const rays = Array.from({ length: 16 }, (_, i) => ({
    angle: i * (360 / 16),
    delay: i * 0.14,
  }));
  const rings = [158, 124, 92, 64, 40, 21];

  return (
    <div className="w-full h-full relative overflow-hidden">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400" fill="none">
        <defs>
          <linearGradient id="rd-g" x1="40" y1="40" x2="360" y2="360" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#666666" />
          </linearGradient>
          <filter id="rd-gl" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="b" />
            <feComposite in="SourceGraphic" in2="b" operator="over" />
          </filter>
          <filter id="rd-sm" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="b" />
            <feComposite in="SourceGraphic" in2="b" operator="over" />
          </filter>
          <radialGradient id="rd-void-fill" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(200,200,200,1)" stopOpacity="1" />
            <stop offset="100%" stopColor="rgba(200,200,200,0)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* HUD corners */}
        <g stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" strokeLinecap="square" opacity="0.55">
          <path d="M18,36 L18,18 L36,18" /><path d="M364,18 L382,18 L382,36" />
        </g>
        <g stroke="rgba(180,180,180,0.45)" strokeWidth="1.5" strokeLinecap="square" opacity="0.45">
          <path d="M18,364 L18,382 L36,382" /><path d="M382,364 L382,382 L364,382" />
        </g>

        {/* Precision tick ring */}
        {Array.from({ length: 32 }, (_, i) => {
          const a = i * (360 / 32) - 90;
          const major = i % 8 === 0;
          return (
            <line key={i}
              x1={200 + (major ? 152 : 159) * _cos(a)} y1={200 + (major ? 152 : 159) * _sin(a)}
              x2={200 + 168 * _cos(a)} y2={200 + 168 * _sin(a)}
              stroke={major ? "rgba(200,200,200,0.8)" : "rgba(255,255,255,0.15)"}
              strokeWidth={major ? "1.2" : "0.6"}
            />
          );
        })}

        {/* Radial drain lines */}
        {rays.map((r, i) => (
          <motion.line key={i}
            x1={200 + 168 * _cos(r.angle)} y1={200 + 168 * _sin(r.angle)}
            x2="200" y2="200"
            stroke="url(#rd-g)" strokeWidth="0.6"
            animate={{ opacity: [0.04, 0.22, 0.04] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: r.delay }}
          />
        ))}

        {/* Concentric rings */}
        {rings.map((r, i) => (
          <motion.circle key={r}
            cx="200" cy="200" r={r}
            stroke={i < 4 ? "url(#rd-g)" : "rgba(180,180,180,0.6)"}
            strokeWidth={0.55 + i * 0.14}
            strokeOpacity={0.18 + i * 0.1}
            strokeDasharray={i % 2 !== 0 ? "3 10" : undefined}
            filter={i >= 4 ? "url(#rd-sm)" : undefined}
            animate={{ r: [r, r * 0.85, r], opacity: [0.3 + i * 0.08, 0.88, 0.3 + i * 0.08] }}
            transition={{ duration: 4 + i * 0.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.18 }}
            style={{ originX: "200px", originY: "200px" }}
          />
        ))}

        {/* Void singularity */}
        <circle cx="200" cy="200" r="15" fill="#060606" />
        <motion.circle cx="200" cy="200" r="15" stroke="rgba(200,200,200,0.8)" strokeWidth="1.5"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          filter="url(#rd-gl)"
        />
        <circle cx="200" cy="200" r="6" fill="url(#rd-void-fill)" filter="url(#rd-gl)" />

        <text x="22" y="390" fill="rgba(255,255,255,0.25)" fontSize="8.5" fontFamily="monospace" letterSpacing="0.22em">
          CAPITAL_DRAIN: CRITICAL
        </text>
      </svg>
    </div>
  );
};

// ── 3. FALHA SISTÊMICA / CEGUEIRA OPERACIONAL ─────────────────────────────────
export const SystemicFailureIcon = () => <OperationalBlindnessIcon />;

export const OperationalBlindnessIcon = () => {
  const rings = [150, 112, 76, 44];

  return (
    <div className="w-full h-full relative overflow-hidden">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400" fill="none">
        <defs>
          <linearGradient id="ob-g" x1="40" y1="40" x2="360" y2="360" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#666666" />
          </linearGradient>
          <filter id="ob-gl" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="b" />
            <feComposite in="SourceGraphic" in2="b" operator="over" />
          </filter>
          <filter id="ob-sm" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="b" />
            <feComposite in="SourceGraphic" in2="b" operator="over" />
          </filter>
          <clipPath id="ob-3q">
            <polygon points="0,0 400,0 400,200 200,200 200,400 0,400" />
          </clipPath>
        </defs>

        {/* HUD corners */}
        <g stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" strokeLinecap="square" opacity="0.55">
          <path d="M18,36 L18,18 L36,18" /><path d="M364,18 L382,18 L382,36" />
        </g>
        <g stroke="rgba(180,180,180,0.22)" strokeWidth="1.5" strokeLinecap="square" opacity="0.22">
          <path d="M18,364 L18,382 L36,382" /><path d="M382,364 L382,382 L364,382" />
        </g>

        {/* SE dead zone fill */}
        <rect x="200" y="200" width="200" height="200" fill="rgba(255,255,255,0.015)" />

        {/* SE interference lines */}
        {Array.from({ length: 11 }, (_, i) => (
          <motion.line key={i}
            x1="202" y1={214 + i * 17} x2="396" y2={214 + i * 17}
            stroke="rgba(255,255,255,0.15)" strokeWidth="0.7"
            animate={{ opacity: [0, 0.7, 0], x1: [202, 202 + (i % 3) * 8, 202] }}
            transition={{ duration: 0.5 + i * 0.1, repeat: Infinity, ease: "easeInOut", delay: i * 0.07 }}
          />
        ))}

        {/* NO SIGNAL */}
        <motion.text x="298" y="298"
          fill="rgba(255,255,255,0.35)" fontSize="10" fontFamily="monospace"
          textAnchor="middle" letterSpacing="0.18em"
          animate={{ opacity: [0.12, 0.5, 0.12] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >NO SIGNAL</motion.text>

        {/* SE dashed border */}
        <motion.rect x="201" y="201" width="196" height="196"
          stroke="rgba(255,255,255,0.28)" strokeWidth="0.9" strokeDasharray="5 8" strokeOpacity="0.28"
          animate={{ strokeDashoffset: [0, -26] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
        />

        {/* Radar rings — clipped to 3 quadrants */}
        <g clipPath="url(#ob-3q)">
          {rings.map((r, i) => (
            <circle key={r} cx="200" cy="200" r={r}
              stroke={i < 4 ? "url(#ob-g)" : "rgba(180,180,180,0.6)"}
              strokeWidth={0.8 + i * 0.1}
              strokeOpacity={0.28 + i * 0.12}
              filter={i >= 2 ? "url(#ob-sm)" : undefined}
            />
          ))}
        </g>

        {/* Radar tick ring — clipped to 3 quadrants */}
        <g clipPath="url(#ob-3q)">
          {Array.from({ length: 24 }, (_, i) => {
            const a = i * 15 - 90;
            const major = i % 6 === 0;
            return (
              <line key={i}
                x1={200 + (major ? 156 : 162) * _cos(a)} y1={200 + (major ? 156 : 162) * _sin(a)}
                x2={200 + 170 * _cos(a)} y2={200 + 170 * _sin(a)}
                stroke={major ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.2)"}
                strokeWidth={major ? "1.2" : "0.7"}
              />
            );
          })}
        </g>

        {/* Axis ghost */}
        <line x1="200" y1="24" x2="200" y2="376" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        <line x1="24" y1="200" x2="376" y2="200" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

        {/* Sweep arm */}
        <motion.line x1="200" y1="200" x2="200" y2="52"
          stroke="rgba(255,255,255,0.72)" strokeWidth="1" strokeOpacity="0.72"
          filter="url(#ob-sm)"
          animate={{
            rotate: [0, 85, 90, 175, 180, 360],
            opacity: [0.72, 0.72, 0, 0, 0.72, 0.72],
          }}
          transition={{
            duration: 6, repeat: Infinity, ease: "linear",
            times: [0, 0.235, 0.25, 0.485, 0.5, 1],
          }}
          style={{ originX: "200px", originY: "200px" }}
        />

        {/* Sweep blip */}
        <g clipPath="url(#ob-3q)">
          <motion.g
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            style={{ originX: "200px", originY: "200px" }}
          >
            <circle cx="200" cy="52" r="4" fill="white" filter="url(#ob-gl)" />
          </motion.g>
        </g>

        {/* Center target */}
        <circle cx="200" cy="200" r="5" fill="white" filter="url(#ob-gl)" opacity="0.9" />
        <motion.circle cx="200" cy="200" r="10" stroke="white" strokeWidth="1"
          animate={{ opacity: [0.28, 0.8, 0.28] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        <text x="22" y="390" fill="rgba(255,255,255,0.25)" fontSize="8.5" fontFamily="monospace" letterSpacing="0.22em">
          SYS_SCAN: BLIND_ZONE_SE
        </text>
      </svg>
    </div>
  );
};

// ── 4. TEATRO CORPORATIVO / INOVAÇÃO POR VAIDADE ──────────────────────────────
export const VanityTheaterIcon = () => {
  const hexRings = [158, 118, 82, 52, 28];

  return (
    <div className="w-full h-full relative overflow-hidden">

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "conic-gradient(from 0deg at 50% -10%, rgba(255,255,255,0.04) 0deg, transparent 28deg)",
        }}
        animate={{ rotate: [-28, 28, -28] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400" fill="none">
        <defs>
          <linearGradient id="vt-g" x1="40" y1="40" x2="360" y2="360" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#666666" />
          </linearGradient>
          <filter id="vt-gl" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="b" />
            <feComposite in="SourceGraphic" in2="b" operator="over" />
          </filter>
          <filter id="vt-sm" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="b" />
            <feComposite in="SourceGraphic" in2="b" operator="over" />
          </filter>
        </defs>

        {/* HUD corners */}
        <g stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" strokeLinecap="square" opacity="0.55">
          <path d="M18,36 L18,18 L36,18" /><path d="M364,18 L382,18 L382,36" />
        </g>
        <g stroke="rgba(180,180,180,0.45)" strokeWidth="1.5" strokeLinecap="square" opacity="0.45">
          <path d="M18,364 L18,382 L36,382" /><path d="M382,364 L382,382 L364,382" />
        </g>

        {/* Vertex-to-center structural lines */}
        {Array.from({ length: 6 }, (_, i) => {
          const a = i * 60 - 30;
          return (
            <motion.line key={i}
              x1="200" y1="200"
              x2={200 + 158 * _cos(a)} y2={200 + 158 * _sin(a)}
              stroke="url(#vt-g)" strokeWidth="0.5"
              animate={{ opacity: [0.04, 0.18, 0.04] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.55 }}
            />
          );
        })}

        {/* Concentric hexagons */}
        {hexRings.map((r, i) => (
          <motion.polygon key={r}
            points={hexPoints(200, 200, r)}
            stroke={i < 4 ? "url(#vt-g)" : "rgba(180,180,180,0.7)"}
            strokeWidth={0.6 + i * 0.15}
            strokeOpacity={0.2 + i * 0.1}
            fill="none"
            filter={i >= 3 ? "url(#vt-sm)" : undefined}
            animate={{
              rotate: i % 2 === 0 ? [0, 360] : [360, 0],
              opacity: [0.28 + i * 0.08, 0.78, 0.28 + i * 0.08],
            }}
            transition={{
              rotate: { duration: 28 - i * 3.5, repeat: Infinity, ease: "linear" },
              opacity: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.35 },
            }}
            style={{ originX: "200px", originY: "200px" }}
          />
        ))}

        {/* Hollow void core */}
        <circle cx="200" cy="200" r="16" fill="#060606" />
        <motion.polygon points={hexPoints(200, 200, 20)}
          stroke="rgba(180,180,180,0.8)" strokeWidth="1.5" fill="none"
          animate={{ opacity: [0.28, 1, 0.28] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          filter="url(#vt-gl)"
        />

        {/* Void symbol */}
        <motion.text x="200" y="205" fill="rgba(200,200,200,0.55)"
          fontSize="10" fontFamily="monospace" textAnchor="middle"
          animate={{ opacity: [0.18, 0.65, 0.18] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >∅</motion.text>

        <text x="22" y="390" fill="rgba(255,255,255,0.25)" fontSize="8.5" fontFamily="monospace" letterSpacing="0.22em">
          CORE_INTEGRITY: NULL
        </text>
      </svg>
    </div>
  );
};

// ─── CARD ICONS — 8 Dimensões SIID — Orbital Series ─────────────────────────
// Aesthetic: asymmetric elliptical orbital rings, blue glowing planet
// core, ultra-thin white strokes, cinematic blur, sci-fi minimal geometry.

// DIM_01 — Intensidade da Dor
export const PainIntensityIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
    <defs>
      <radialGradient id="d01-cg" cx="38%" cy="32%" r="65%">
        <stop offset="0%" stopColor="#70C8FF" />
        <stop offset="55%" stopColor="#3291ff" />
        <stop offset="100%" stopColor="#003899" />
      </radialGradient>
      <filter id="d01-gl" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="b" />
        <feComposite in="SourceGraphic" in2="b" operator="over" />
      </filter>
    </defs>
    <g transform="rotate(-30 24 24)">
      <ellipse cx="24" cy="24" rx="21" ry="7.5" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
      <ellipse cx="24" cy="24" rx="14" ry="5" stroke="rgba(255,255,255,0.38)" strokeWidth="0.7" />
      <motion.ellipse cx="24" cy="24" rx="14" ry="5"
        stroke="rgba(255,255,255,0.9)" strokeWidth="1.8"
        strokeDasharray="4 59"
        animate={{ strokeDashoffset: [0, -63] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
      />
    </g>
    <motion.g style={{ originX: "24px", originY: "24px" }}
      animate={{ scale: [0.8, 1.4, 0.8], opacity: [0.4, 0.8, 0.4] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
    >
      <circle cx="24" cy="24" r="5.5" fill="rgba(50,145,255,0.5)" filter="url(#d01-gl)" />
    </motion.g>
    <circle cx="24" cy="24" r="3" fill="url(#d01-cg)" />
  </svg>
);

// DIM_02 — Frequência de Uso
export const UsageFrequencyIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
    <defs>
      <radialGradient id="d02-cg" cx="38%" cy="32%" r="65%">
        <stop offset="0%" stopColor="#70C8FF" />
        <stop offset="55%" stopColor="#3291ff" />
        <stop offset="100%" stopColor="#003899" />
      </radialGradient>
      <filter id="d02-gl" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="b" />
        <feComposite in="SourceGraphic" in2="b" operator="over" />
      </filter>
    </defs>
    <g transform="rotate(-20 24 24)">
      {[{ rx: 20, ry: 6, delay: 0, base: 0.22 }, { rx: 13, ry: 4.5, delay: 0.8, base: 0.38 }, { rx: 7, ry: 2.5, delay: 1.6, base: 0.55 }].map((r, i) => (
        <motion.ellipse key={i} cx="24" cy="24" rx={r.rx} ry={r.ry}
          stroke="rgba(255,255,255,1)" strokeWidth="0.6"
          animate={{ opacity: [r.base * 0.35, r.base, r.base * 0.35] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: r.delay }}
        />
      ))}
      <motion.ellipse cx="24" cy="24" rx="20" ry="6"
        stroke="rgba(255,255,255,0.85)" strokeWidth="1.5"
        strokeDasharray="4 84"
        animate={{ strokeDashoffset: [0, -88] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
      />
    </g>
    <motion.g style={{ originX: "24px", originY: "24px" }}
      animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
    >
      <circle cx="24" cy="24" r="5" fill="rgba(50,145,255,0.45)" filter="url(#d02-gl)" />
    </motion.g>
    <circle cx="24" cy="24" r="3" fill="url(#d02-cg)" />
  </svg>
);

// DIM_03 — Tamanho do Mercado
export const MarketSizeIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
    <defs>
      <radialGradient id="d03-cg" cx="38%" cy="32%" r="65%">
        <stop offset="0%" stopColor="#70C8FF" />
        <stop offset="55%" stopColor="#3291ff" />
        <stop offset="100%" stopColor="#003899" />
      </radialGradient>
      <filter id="d03-gl" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="b" />
        <feComposite in="SourceGraphic" in2="b" operator="over" />
      </filter>
    </defs>
    <g transform="rotate(-15 24 24)">
      <ellipse cx="24" cy="24" rx="22" ry="9" stroke="rgba(255,255,255,0.18)" strokeWidth="0.55" />
      <motion.ellipse cx="24" cy="24" rx="22" ry="9"
        stroke="rgba(255,255,255,0.75)" strokeWidth="1.4"
        strokeDasharray="5 97"
        animate={{ strokeDashoffset: [0, -102] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "linear" }}
      />
      <ellipse cx="24" cy="24" rx="13" ry="5" stroke="rgba(255,255,255,0.38)" strokeWidth="0.65" />
    </g>
    <circle cx="24" cy="24" r="5" fill="rgba(50,145,255,0.4)" filter="url(#d03-gl)" />
    <circle cx="24" cy="24" r="3" fill="url(#d03-cg)" />
  </svg>
);

// DIM_04 — Soluções Atuais
export const CurrentSolutionsIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
    <defs>
      <radialGradient id="d04-cg" cx="38%" cy="32%" r="65%">
        <stop offset="0%" stopColor="#70C8FF" />
        <stop offset="55%" stopColor="#3291ff" />
        <stop offset="100%" stopColor="#003899" />
      </radialGradient>
      <filter id="d04-gl" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="b" />
        <feComposite in="SourceGraphic" in2="b" operator="over" />
      </filter>
    </defs>
    <g transform="rotate(-40 24 24)">
      <ellipse cx="24" cy="24" rx="18" ry="6" stroke="rgba(255,255,255,0.35)" strokeWidth="0.7" />
      <motion.ellipse cx="24" cy="24" rx="18" ry="6"
        stroke="rgba(255,255,255,0.85)" strokeWidth="1.5"
        strokeDasharray="4 76"
        animate={{ strokeDashoffset: [0, -80] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
    </g>
    <g transform="rotate(20 24 24)">
      <ellipse cx="24" cy="24" rx="18" ry="6"
        stroke="rgba(255,255,255,0.2)" strokeWidth="0.55"
        strokeDasharray="3 6"
      />
    </g>
    <circle cx="24" cy="24" r="5" fill="rgba(50,145,255,0.4)" filter="url(#d04-gl)" />
    <circle cx="24" cy="24" r="3" fill="url(#d04-cg)" />
  </svg>
);

// DIM_05 — Barreira de Troca
export const SwitchingBarrierIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
    <defs>
      <radialGradient id="d05-cg" cx="38%" cy="32%" r="65%">
        <stop offset="0%" stopColor="#70C8FF" />
        <stop offset="55%" stopColor="#3291ff" />
        <stop offset="100%" stopColor="#003899" />
      </radialGradient>
      <filter id="d05-gl" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="b" />
        <feComposite in="SourceGraphic" in2="b" operator="over" />
      </filter>
    </defs>
    <g transform="rotate(-25 24 24)">
      <ellipse cx="24" cy="24" rx="18" ry="7"
        stroke="rgba(255,255,255,0.38)" strokeWidth="0.75"
        strokeDasharray="68 14" strokeDashoffset="-7"
      />
      <motion.ellipse cx="24" cy="24" rx="18" ry="7"
        stroke="rgba(255,255,255,0.9)" strokeWidth="1.8"
        strokeDasharray="4 78"
        animate={{ strokeDashoffset: [0, -58, -58, 0] }}
        transition={{ duration: 3.2, times: [0, 0.78, 0.92, 1], repeat: Infinity, ease: "easeInOut" }}
      />
    </g>
    <circle cx="24" cy="24" r="5" fill="rgba(50,145,255,0.4)" filter="url(#d05-gl)" />
    <circle cx="24" cy="24" r="3" fill="url(#d05-cg)" />
  </svg>
);

// DIM_06 — Capacidade de Execução
export const ExecutionCapabilityIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
    <defs>
      <radialGradient id="d06-cg" cx="38%" cy="32%" r="65%">
        <stop offset="0%" stopColor="#70C8FF" />
        <stop offset="55%" stopColor="#3291ff" />
        <stop offset="100%" stopColor="#003899" />
      </radialGradient>
      <filter id="d06-gl" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="b" />
        <feComposite in="SourceGraphic" in2="b" operator="over" />
      </filter>
    </defs>
    <g transform="rotate(-22 24 24)">
      <ellipse cx="24" cy="24" rx="19" ry="6.5" stroke="rgba(255,255,255,0.15)" strokeWidth="0.55" />
      <ellipse cx="24" cy="24" rx="13" ry="4.5" stroke="rgba(255,255,255,0.35)" strokeWidth="0.7" />
      <ellipse cx="24" cy="24" rx="7.5" ry="2.5" stroke="rgba(255,255,255,0.52)" strokeWidth="0.7" />
      <motion.ellipse cx="24" cy="24" rx="13" ry="4.5"
        stroke="rgba(255,255,255,0.9)" strokeWidth="1.6"
        strokeDasharray="4 54"
        animate={{ strokeDashoffset: [0, -58] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }}
      />
    </g>
    <circle cx="24" cy="24" r="4.5" fill="rgba(50,145,255,0.42)" filter="url(#d06-gl)" />
    <circle cx="24" cy="24" r="3" fill="url(#d06-cg)" />
  </svg>
);

// DIM_07 — Modelo de Monetização
export const MonetizationModelIcon = () => {
  const c = 0.906, s = -0.423; // cos(-25°), sin(-25°)
  const nodes = [90, 210, 330].map(deg => {
    const r = (deg * Math.PI) / 180;
    return { x: 24 + 18 * Math.cos(r) * c - 7 * Math.sin(r) * s, y: 24 + 18 * Math.cos(r) * s + 7 * Math.sin(r) * c };
  });
  return (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <defs>
        <radialGradient id="d07-cg" cx="38%" cy="32%" r="65%">
          <stop offset="0%" stopColor="#70C8FF" />
          <stop offset="55%" stopColor="#3291ff" />
          <stop offset="100%" stopColor="#003899" />
        </radialGradient>
        <filter id="d07-gl" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="b" />
          <feComposite in="SourceGraphic" in2="b" operator="over" />
        </filter>
      </defs>
      <g transform="rotate(-25 24 24)">
        <ellipse cx="24" cy="24" rx="18" ry="7" stroke="rgba(255,255,255,0.32)" strokeWidth="0.7" />
        <motion.ellipse cx="24" cy="24" rx="18" ry="7"
          stroke="rgba(255,255,255,0.85)" strokeWidth="1.5"
          strokeDasharray="4 78"
          animate={{ strokeDashoffset: [0, -82] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </g>
      {nodes.map((n, i) => (
        <motion.circle key={i} cx={n.x} cy={n.y} r="1.8" fill="white"
          animate={{ opacity: [0.25, 0.9, 0.25], scale: [0.7, 1.3, 0.7] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.7 }}
          style={{ originX: `${n.x}px`, originY: `${n.y}px` }}
        />
      ))}
      <circle cx="24" cy="24" r="5" fill="rgba(50,145,255,0.42)" filter="url(#d07-gl)" />
      <circle cx="24" cy="24" r="3" fill="url(#d07-cg)" />
    </svg>
  );
};

// DIM_08 — Custo de Aquisição
export const AcquisitionCostIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
    <defs>
      <radialGradient id="d08-cg" cx="38%" cy="32%" r="65%">
        <stop offset="0%" stopColor="#70C8FF" />
        <stop offset="55%" stopColor="#3291ff" />
        <stop offset="100%" stopColor="#003899" />
      </radialGradient>
      <filter id="d08-gl" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="b" />
        <feComposite in="SourceGraphic" in2="b" operator="over" />
      </filter>
    </defs>
    <g transform="rotate(-35 24 24)">
      <ellipse cx="24" cy="24" rx="21" ry="7" stroke="rgba(255,255,255,0.18)" strokeWidth="0.55" />
      <motion.ellipse cx="24" cy="24" rx="21" ry="7"
        stroke="rgba(255,255,255,0.75)" strokeWidth="1.3"
        strokeDasharray="5 89"
        animate={{ strokeDashoffset: [0, -94] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
      />
    </g>
    <g transform="rotate(10 24 24)">
      <ellipse cx="24" cy="24" rx="14" ry="8"
        stroke="rgba(255,255,255,0.28)" strokeWidth="0.65"
        strokeDasharray="3 6"
      />
    </g>
    <circle cx="24" cy="24" r="5" fill="rgba(50,145,255,0.42)" filter="url(#d08-gl)" />
    <circle cx="24" cy="24" r="3" fill="url(#d08-cg)" />
  </svg>
);

// ─── Mapa de ícones Doom por índice ───────────────────────────────────────────
export const DOOM_ICONS: Record<number, React.ComponentType> = {
  0: FalseCertaintyIcon,
  1: VanityTheaterIcon,
  2: ResourceDrainIcon,
  3: SystemicFailureIcon,
};

// ─── Mapa de ícones por ID de dimensão ────────────────────────────────────────
export const SIID_ICONS: Record<number, React.ComponentType> = {
  1: PainIntensityIcon,
  2: UsageFrequencyIcon,
  3: MarketSizeIcon,
  4: CurrentSolutionsIcon,
  5: SwitchingBarrierIcon,
  6: ExecutionCapabilityIcon,
  7: MonetizationModelIcon,
  8: AcquisitionCostIcon,
};
