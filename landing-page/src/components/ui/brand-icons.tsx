"use client";

/**
 * Disrupta Lab — Brand Icon System
 * Direção de Arte: High-Contrast Technical Brutalism
 *
 * Paleta: #000 (fundo) · #fff (forma) · #FF5500 (alerta/erro)
 * Grid: rígido, matemático, sem raio de borda
 * Linguagem: formas sólidas que sofrem intervenções — cortes, distorções, glitch
 */

import { motion } from "framer-motion";

const ALERT = "#FF5500";
const WIRE  = "rgba(255,255,255,0.85)";
const DIM   = "rgba(255,255,255,0.18)";

// ─── 01. CUBO IMPOSSÍVEL — Falsa Certeza / Distorção de Realidade ────────────
//
// Geometria: cubo isométrico (Necker) onde o vértice central é simultaneamente
// o ponto mais próximo E mais distante do observador.
// A mente tenta "fechar" a forma, mas a geometria a trai.
//
// Animação: alterna entre duas "leituras" do cubo ao iluminar 3 arestas opostas.
// Cada leitura é igualmente válida — a realidade muda conforme o foco.

const CENTER = { x: 200, y: 210 };
const CUBE_VERTICES = {
  // 6 pontos externos do hexágono isométrico
  top:   { x: 200, y: 115 },
  right: { x: 272, y: 157 },
  br:    { x: 272, y: 242 },
  bot:   { x: 200, y: 283 },
  bl:    { x: 128, y: 242 },
  left:  { x: 128, y: 157 },
};

// 12 arestas do cubo. A=H=CENTER (ambiguidade isométrica de Necker)
const EDGES = [
  // 6 arestas radiando do centro
  [CENTER, CUBE_VERTICES.top],
  [CENTER, CUBE_VERTICES.right],
  [CENTER, CUBE_VERTICES.br],
  [CENTER, CUBE_VERTICES.bot],
  [CENTER, CUBE_VERTICES.bl],
  [CENTER, CUBE_VERTICES.left],
  // 6 arestas do anel externo
  [CUBE_VERTICES.top,   CUBE_VERTICES.right],
  [CUBE_VERTICES.right, CUBE_VERTICES.br],
  [CUBE_VERTICES.br,    CUBE_VERTICES.bot],
  [CUBE_VERTICES.bot,   CUBE_VERTICES.bl],
  [CUBE_VERTICES.bl,    CUBE_VERTICES.left],
  [CUBE_VERTICES.left,  CUBE_VERTICES.top],
];

// Índices das arestas que formam a "face dianteira" em cada leitura
const READING_A = [0, 2, 4]; // top, br, bl — leitura A: centro é canto frontal-inferior
const READING_B = [1, 3, 5]; // right, bot, left — leitura B: centro é canto traseiro-superior

export const ImpossibleCubeIcon = () => (
  <div className="w-full h-full flex items-center justify-center bg-black relative overflow-hidden">
    <svg viewBox="0 0 400 400" fill="none" className="w-[78%] h-[78%]" aria-hidden="true" role="presentation">
      {/* Arestas base — todas em DIM */}
      {EDGES.map(([a, b], i) => (
        <line
          key={`base-${i}`}
          x1={a.x} y1={a.y} x2={b.x} y2={b.y}
          stroke={DIM} strokeWidth="1.5" strokeLinecap="square"
        />
      ))}

      {/* Leitura A — alerta laranja nas arestas "dianteiras" */}
      {READING_A.map((edgeIdx) => {
        const [a, b] = EDGES[edgeIdx];
        return (
          <motion.line
            key={`ra-${edgeIdx}`}
            x1={a.x} y1={a.y} x2={b.x} y2={b.y}
            stroke={ALERT} strokeWidth="2.5" strokeLinecap="square"
            animate={{ opacity: [1, 1, 0, 0, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", times: [0, 0.38, 0.5, 0.88, 1] }}
          />
        );
      })}

      {/* Leitura B — branco nas arestas "traseiras" que passam a frente */}
      {READING_B.map((edgeIdx) => {
        const [a, b] = EDGES[edgeIdx];
        return (
          <motion.line
            key={`rb-${edgeIdx}`}
            x1={a.x} y1={a.y} x2={b.x} y2={b.y}
            stroke={WIRE} strokeWidth="2.5" strokeLinecap="square"
            animate={{ opacity: [0, 0, 1, 1, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", times: [0, 0.38, 0.5, 0.88, 1] }}
          />
        );
      })}

      {/* Ponto central — o vértice impossível */}
      <motion.rect
        x={CENTER.x - 4} y={CENTER.y - 4} width="8" height="8"
        fill={ALERT}
        animate={{ opacity: [0.5, 1, 0.5], scale: [0.8, 1.3, 0.8] }}
        style={{ transformOrigin: `${CENTER.x}px ${CENTER.y}px` }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Label */}
      <text x="200" y="360" fill={DIM} fontSize="10" fontFamily="monospace"
        textAnchor="middle" letterSpacing="0.35em">
        DISTORÇÃO DE REALIDADE
      </text>
    </svg>
  </div>
);


// ─── 02. VÓRTEX — Buraco Negro do Capital / Ralo de Recursos ─────────────────
//
// Geometria: 8 quadrados concêntricos em rotações progressivas,
// cada anel ligeiramente mais girado que o anterior, criando a ilusão
// de espiral/vórtex. O centro é um vazio absoluto que pulsa.
//
// Animação: os anéis "caem" para dentro em cascata contínua.
// Cada anel scala para 0 enquanto um novo aparece no exterior.

const VORTEX_RINGS = 8;

export const VortexIcon = () => (
  <div className="w-full h-full flex items-center justify-center bg-black relative overflow-hidden">
    <svg viewBox="0 0 400 400" fill="none" className="w-[82%] h-[82%]" aria-hidden="true" role="presentation">
      {Array.from({ length: VORTEX_RINGS }).map((_, i) => {
        const base = 320 - i * 34;
        const off  = (400 - base) / 2;
        const rot  = i * 8; // rotação base de cada anel
        const opacity = 0.12 + (i / VORTEX_RINGS) * 0.72; // mais brilhante = mais interno
        const delay = i * 0.22;

        return (
          <motion.rect
            key={i}
            x={off} y={off}
            width={base} height={base}
            stroke={i === VORTEX_RINGS - 1 ? ALERT : WIRE}
            strokeWidth={i === VORTEX_RINGS - 1 ? "2.5" : "1"}
            strokeOpacity={opacity}
            style={{ transformOrigin: "200px 200px" }}
            animate={{
              rotate:  [rot, rot + 8],
              scale:   [1, 0.88, 1],
              opacity: [opacity, opacity * 0.4, opacity],
            }}
            transition={{
              rotate:  { duration: 12, repeat: Infinity, ease: "linear" },
              scale:   { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay },
              opacity: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay },
            }}
          />
        );
      })}

      {/* Centro — o vazio que absorve tudo */}
      <motion.rect
        x="192" y="192" width="16" height="16"
        fill="#000" stroke={ALERT} strokeWidth="2"
        style={{ transformOrigin: "200px 200px" }}
        animate={{ scale: [1, 2.5, 1], opacity: [1, 0.2, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Linhas de tensão diagonais — o "pull" gravitacional */}
      {[45, 135, 225, 315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x2  = 200 + Math.cos(rad) * 155;
        const y2  = 200 + Math.sin(rad) * 155;
        return (
          <motion.line
            key={`pull-${i}`}
            x1="200" y1="200" x2={x2} y2={y2}
            stroke={DIM} strokeWidth="1" strokeDasharray="4 8"
            animate={{ strokeDashoffset: [0, -36] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: i * 0.5 }}
          />
        );
      })}

      <text x="200" y="368" fill={DIM} fontSize="10" fontFamily="monospace"
        textAnchor="middle" letterSpacing="0.35em">
        RALO DE RECURSOS
      </text>
    </svg>
  </div>
);


// ─── 03. GRID GLITCH — Falha Sistêmica / Cegueira Operacional ────────────────
//
// Geometria: grid 5×5 perfeito. Um único nó está "quebrado" — deslocado de sua
// posição e com cor de alerta. O erro espalha-se silenciosamente para vizinhos.
//
// Animação: o nó corrompido "migra" para células adjacentes a cada ciclo,
// nunca na mesma posição — o defeito sistêmico que não para de se mover.

const GRID_COLS    = 5;
const GRID_ROWS    = 5;
const CELL_SIZE    = 56;
const GRID_PADDING = 32;

function cellCenter(row: number, col: number) {
  return {
    x: GRID_PADDING + col * CELL_SIZE + CELL_SIZE / 2,
    y: GRID_PADDING + row * CELL_SIZE + CELL_SIZE / 2,
  };
}

// Sequência de migração do glitch (linha, coluna)
const GLITCH_PATH: [number, number][] = [
  [2, 3], [1, 3], [1, 4], [2, 4], [3, 4], [3, 3], [3, 2], [2, 2],
];
const CYCLE = GLITCH_PATH.length;

export const GridGlitchIcon = () => (
  <div className="w-full h-full flex items-center justify-center bg-black relative overflow-hidden">
    <svg viewBox="0 0 400 400" fill="none" className="w-[86%] h-[86%]" aria-hidden="true" role="presentation">
      {/* Grid cells */}
      {Array.from({ length: GRID_ROWS }).map((_, row) =>
        Array.from({ length: GRID_COLS }).map((_, col) => {
          const { x, y } = cellCenter(row, col);
          const cx = x - CELL_SIZE / 2 + 2;
          const cy = y - CELL_SIZE / 2 + 2;
          const w  = CELL_SIZE - 4;
          return (
            <rect
              key={`cell-${row}-${col}`}
              x={cx} y={cy} width={w} height={w}
              stroke={DIM} strokeWidth="1" fill="none"
            />
          );
        })
      )}

      {/* Nó normal — pequeno ponto em cada intersecção */}
      {Array.from({ length: GRID_ROWS }).map((_, row) =>
        Array.from({ length: GRID_COLS }).map((_, col) => {
          const { x, y } = cellCenter(row, col);
          return (
            <rect
              key={`dot-${row}-${col}`}
              x={x - 2.5} y={y - 2.5} width="5" height="5"
              fill={DIM}
            />
          );
        })
      )}

      {/* Glitch — migra pela sequência GLITCH_PATH */}
      {GLITCH_PATH.map(([row, col], step) => {
        const { x, y } = cellCenter(row, col);
        const cx = x - CELL_SIZE / 2 + 2;
        const cy = y - CELL_SIZE / 2 + 2;
        const w  = CELL_SIZE - 4;
        const enterTime  = step / CYCLE;
        const exitTime   = (step + 1) / CYCLE;
        const midEnter   = enterTime + (exitTime - enterTime) * 0.1;
        const midExit    = exitTime - (exitTime - enterTime) * 0.1;

        return (
          <motion.g key={`glitch-${step}`}>
            {/* Cell fill */}
            <motion.rect
              x={cx} y={cy} width={w} height={w}
              fill={`${ALERT}22`} stroke={ALERT} strokeWidth="1.5"
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{
                duration: CYCLE * 1.2,
                repeat: Infinity,
                times: [enterTime, midEnter, midExit, exitTime],
                ease: [0.99, 0, 0.01, 1],
              }}
            />
            {/* Centro do nó corrompido */}
            <motion.rect
              x={x - 4} y={y - 4} width="8" height="8"
              fill={ALERT}
              animate={{ opacity: [0, 1, 1, 0], scale: [0.5, 1, 1, 0.5] }}
              style={{ transformOrigin: `${x}px ${y}px` }}
              transition={{
                duration: CYCLE * 1.2,
                repeat: Infinity,
                times: [enterTime, midEnter, midExit, exitTime],
                ease: [0.99, 0, 0.01, 1],
              }}
            />
            {/* Cruz de erro */}
            <motion.line
              x1={x - 10} y1={y} x2={x + 10} y2={y}
              stroke={ALERT} strokeWidth="1.5"
              animate={{ opacity: [0, 0.8, 0.8, 0] }}
              transition={{
                duration: CYCLE * 1.2,
                repeat: Infinity,
                times: [enterTime, midEnter, midExit, exitTime],
                ease: [0.99, 0, 0.01, 1],
              }}
            />
            <motion.line
              x1={x} y1={y - 10} x2={x} y2={y + 10}
              stroke={ALERT} strokeWidth="1.5"
              animate={{ opacity: [0, 0.8, 0.8, 0] }}
              transition={{
                duration: CYCLE * 1.2,
                repeat: Infinity,
                times: [enterTime, midEnter, midExit, exitTime],
                ease: [0.99, 0, 0.01, 1],
              }}
            />
          </motion.g>
        );
      })}

      <text x="200" y="368" fill={DIM} fontSize="10" fontFamily="monospace"
        textAnchor="middle" letterSpacing="0.35em">
        FALHA SISTÊMICA
      </text>
    </svg>
  </div>
);


// ─── 04. HOLOFOTE VAZIO — Teatro Corporativo / Inovação por Vaidade ───────────
//
// Geometria: holofote clássico (fonte de luz + cone) iluminando um pedestal
// que sustenta uma moldura vazia — onde deveria estar o produto, há ausência.
//
// Animação: o cone de luz oscila levemente (pitch bonito, direcionamento falso).
// A moldura pulsa para enfatizar o vazio. O pedestal é sólido mas suporta nada.

export const HollowSpotlightIcon = () => (
  <div className="w-full h-full flex items-center justify-center bg-black relative overflow-hidden">
    <svg viewBox="0 0 400 400" fill="none" className="w-[78%] h-[78%]" aria-hidden="true" role="presentation">
      {/* Cone de luz — oscila */}
      <motion.g
        style={{ transformOrigin: "200px 80px" }}
        animate={{ rotate: [-12, 12, -12] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Preenchimento do cone */}
        <path
          d="M200,80 L108,290 L292,290 Z"
          fill="rgba(255,255,255,0.04)"
        />
        {/* Bordas do cone */}
        <line x1="200" y1="80" x2="108" y2="290" stroke={DIM} strokeWidth="1" />
        <line x1="200" y1="80" x2="292" y2="290" stroke={DIM} strokeWidth="1" />

        {/* Gradiente de luz (faixas horizontais simulando intensidade) */}
        {[130, 160, 190, 220, 250, 278].map((yy, i) => {
          const halfW = ((yy - 80) / (290 - 80)) * 92;
          return (
            <motion.line
              key={`ray-${i}`}
              x1={200 - halfW} y1={yy} x2={200 + halfW} y2={yy}
              stroke="rgba(255,255,255,0.06)" strokeWidth="1"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.18 }}
            />
          );
        })}
      </motion.g>

      {/* Fonte do holofote */}
      <rect x="188" y="60" width="24" height="20" fill={WIRE} />
      <rect x="194" y="52" width="12" height="10" fill={DIM} />

      {/* Pedestal */}
      <rect x="160" y="290" width="80" height="12" fill={WIRE} />
      <rect x="172" y="302" width="56" height="8"  fill={DIM} />
      <rect x="180" y="310" width="40" height="5"  fill={DIM} />

      {/* Moldura vazia — onde deveria estar o produto */}
      <motion.rect
        x="148" y="218" width="104" height="74"
        stroke={ALERT} strokeWidth="2"
        fill="none"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Diagonais da moldura vazia */}
      <motion.line
        x1="148" y1="218" x2="252" y2="292"
        stroke={ALERT} strokeWidth="1" strokeOpacity="0.35"
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.line
        x1="252" y1="218" x2="148" y2="292"
        stroke={ALERT} strokeWidth="1" strokeOpacity="0.35"
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Label "EMPTY" dentro da moldura */}
      <motion.text
        x="200" y="260"
        fill={ALERT} fontSize="11" fontFamily="monospace"
        textAnchor="middle" letterSpacing="0.4em"
        animate={{ opacity: [0.25, 0.7, 0.25] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        EMPTY
      </motion.text>

      <text x="200" y="368" fill={DIM} fontSize="10" fontFamily="monospace"
        textAnchor="middle" letterSpacing="0.35em">
        TEATRO CORPORATIVO
      </text>
    </svg>
  </div>
);
