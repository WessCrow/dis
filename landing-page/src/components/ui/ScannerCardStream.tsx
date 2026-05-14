'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import * as THREE from 'three';

// --- Default Images (used if no cardImages prop is provided) ---
const defaultCardImages = [
  "https://cdn.prod.website-files.com/68789c86c8bc802d61932544/689f20b55e654d1341fb06f8_4.1.png",
  "https://cdn.prod.website-files.com/68789c86c8bc802d61932544/689f20b5a080a31ee7154b19_1.png",
  "https://cdn.prod.website-files.com/68789c86c8bc802d61932544/689f20b5c1e4919fd69672b8_3.png",
  "https://cdn.prod.website-files.com/68789c86c8bc802d61932544/689f20b5f6a5e232e7beb4be_2.png",
  "https://cdn.prod.website-files.com/68789c86c8bc802d61932544/689f20b5bea2f1b07392d936_4.png",
];

// --- Helper function to generate ASCII-like code ---
const ASCII_CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789(){}[]<>;:,._-+=!@#$%^&*|\\/\"'`~?";
const generateCode = (width: number, height: number): string => {
  let text = "";
  for (let i = 0; i < width * height; i++) {
    text += ASCII_CHARS[Math.floor(Math.random() * ASCII_CHARS.length)];
  }
  let out = "";
  for (let i = 0; i < height; i++) {
    out += text.substring(i * width, (i + 1) * width) + "\n";
  }
  return out;
};

// --- Component Props Type Definition ---
export interface ScannerConfig {
  speed: number;
  direction: -1 | 1;
  cardGap: number;
  friction: number;
  scanEffect: 'clip' | 'scramble';
  repeat: number;
  showConsole: boolean;
  intensity: number;
  scale: number;
  rotation: number;
  rotationX: number;
  rotationY: number;
  lateralPadding: number;
  offsetX: number;
  offsetY: number;
  viewportWidth: number;
  // Container
  containerHeight: number;
  containerWidth: number;
  containerBgOpacity: number;
  containerBorderOpacity: number;
  containerMarginX: number;
  containerX: number;
  containerY: number;
}

type ScannerCardStreamProps = {
  cardImages?: string[];
};

// --- The Main Component ---
const ScannerCardStream = ({
  cardImages = defaultCardImages,
}: ScannerCardStreamProps) => {

  const [config, setConfig] = useState<ScannerConfig>({
    speed: 150,
    direction: -1,
    cardGap: 60,
    friction: 0.95,
    scanEffect: 'clip',
    repeat: 12,
    showConsole: false,
    intensity: 1.5,
    scale: 1.35,
    rotation: -90,
    rotationX: 0,
    rotationY: 0,
    lateralPadding: 0,
    offsetX: 0,
    offsetY: 0,
    viewportWidth: 580,
    // Container
    containerHeight: 640,
    containerWidth: 100,
    containerBgOpacity: 0,
    containerBorderOpacity: 0,
    containerMarginX: -132,
    containerX: 0,
    containerY: 0,
  });

  const configRef = useRef(config);
  useEffect(() => {
    configRef.current = config;
  }, [config]);

  // Shift+S para abrir/fechar console do ScannerCardStream
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key.toLowerCase() === "s") {
        setConfig(c => ({ ...c, showConsole: !c.showConsole }));
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const [mounted, setMounted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cards = useMemo(() => {
    const totalCards = cardImages.length * config.repeat;
    return Array.from({ length: totalCards }, (_, i) => ({
      id: i,
      image: cardImages[i % cardImages.length],
      ascii: mounted ? generateCode(Math.floor(400 / 6.5), Math.floor(250 / 13)) : "",
    }))
  }, [cardImages, config.repeat, mounted]);

  const cardLineRef = useRef<HTMLDivElement>(null);
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);
  const scannerCanvasRef = useRef<HTMLCanvasElement>(null);
  const originalAscii = useRef(new Map<number, string>());

  const cardStreamState = useRef({
    position: 0, 
    velocity: config.speed, 
    direction: config.direction, 
    isDragging: false,
    lastMouseX: 0, 
    lastTime: performance.now(), 
    cardLineWidth: (400 + config.cardGap) * cards.length,
    friction: config.friction, 
    minVelocity: 30,
  });

  // Keep cardStreamState in sync with config changes that affect physics
  useEffect(() => {
    cardStreamState.current.friction = config.friction;
    cardStreamState.current.cardLineWidth = (400 + config.cardGap) * cards.length;
  }, [config.friction, config.cardGap, cards.length]);

  const scannerState = useRef({ isScanning: false });
  
  const toggleAnimation = useCallback(() => setIsPaused(prev => !prev), []);
  const resetPosition = useCallback(() => {
    if (cardLineRef.current) {
        cardStreamState.current.position = cardLineRef.current.parentElement?.offsetWidth || 0;
        cardStreamState.current.velocity = config.speed;
        cardStreamState.current.direction = config.direction;
        setIsPaused(false);
    }
  }, [config.speed, config.direction]);
  const changeDirection = useCallback(() => { cardStreamState.current.direction *= -1; }, []);

  useEffect(() => {
    const cardLine = cardLineRef.current;
    const particleCanvas = particleCanvasRef.current;
    const scannerCanvas = scannerCanvasRef.current;

    if (!cardLine || !particleCanvas || !scannerCanvas) return;
    
    cards.forEach(card => originalAscii.current.set(card.id, card.ascii));
    let animationFrameId: number;

    // --- (SETUP LOGIC for Three.js, Canvas, etc. - no changes here) ---
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-window.innerWidth / 2, window.innerWidth / 2, 125, -125, 1, 1000);
    camera.position.z = 100;
    const renderer = new THREE.WebGLRenderer({ canvas: particleCanvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, 250);
    renderer.setClearColor(0x000000, 0);
    const particleCount = 400;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount);
    const alphas = new Float32Array(particleCount);
    const texCanvas = document.createElement("canvas");
    texCanvas.width = 100; texCanvas.height = 100;
    const texCtx = texCanvas.getContext("2d")!;
    const half = 50;
    const gradient = texCtx.createRadialGradient(half, half, 0, half, half, half);
    gradient.addColorStop(0.025, "#fff");
    gradient.addColorStop(0.1, `hsl(217, 61%, 33%)`);
    gradient.addColorStop(0.25, `hsl(217, 64%, 6%)`);
    gradient.addColorStop(1, "transparent");
    texCtx.fillStyle = gradient;
    texCtx.arc(half, half, half, 0, Math.PI * 2);
    texCtx.fill();
    const texture = new THREE.CanvasTexture(texCanvas);
    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * window.innerWidth * 2;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 250;
        velocities[i] = Math.random() * 60 + 30;
        alphas[i] = (Math.random() * 8 + 2) / 10;
    }
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("alpha", new THREE.BufferAttribute(alphas, 1));
    const material = new THREE.ShaderMaterial({
      uniforms: { pointTexture: { value: texture } },
      vertexShader: `attribute float alpha; varying float vAlpha; void main() { vAlpha = alpha; vec4 mvPosition = modelViewMatrix * vec4(position, 1.0); gl_PointSize = 15.0; gl_Position = projectionMatrix * mvPosition; }`,
      fragmentShader: `uniform sampler2D pointTexture; varying float vAlpha; void main() { gl_FragColor = vec4(1.0, 1.0, 1.0, vAlpha) * texture2D(pointTexture, gl_PointCoord); }`,
      transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, vertexColors: false,
    });
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    const ctx = scannerCanvas.getContext('2d')!;
    scannerCanvas.width = window.innerWidth;
    scannerCanvas.height = 300;
    let scannerParticles: any[] = [];
    const baseMaxParticles = 800;
    let currentMaxParticles = baseMaxParticles;
    const scanTargetMaxParticles = 2500;
    const createScannerParticle = () => ({
      x: window.innerWidth / 2 + (Math.random() - 0.5) * 3, y: Math.random() * 300, vx: Math.random() * 0.8 + 0.2, vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 0.6 + 0.4, alpha: Math.random() * 0.4 + 0.6, life: 1.0, decay: Math.random() * 0.02 + 0.005,
    });
    for (let i = 0; i < baseMaxParticles; i++) scannerParticles.push(createScannerParticle());
    
    const runScrambleEffect = (element: HTMLElement, cardId: number) => {
        if (element.dataset.scrambling === 'true') return;
        element.dataset.scrambling = 'true';
        const originalText = originalAscii.current.get(cardId) || '';
        let scrambleCount = 0;
        const maxScrambles = 10;
        const interval = setInterval(() => {
            element.textContent = generateCode(Math.floor(400 / 6.5), Math.floor(250 / 13));
            scrambleCount++;
            if (scrambleCount >= maxScrambles) {
                clearInterval(interval);
                element.textContent = originalText;
                delete element.dataset.scrambling;
            }
        }, 30);
    };

    const updateCardEffects = () => {
      const containerWidth = cardLine.parentElement?.offsetWidth || 0;
      const scannerX = containerWidth / 2; 
      const scannerWidth = 10;
      const scannerLeft = scannerX - scannerWidth / 2;
      const scannerRight = scannerX + scannerWidth / 2;
      
      let anyCardIsScanning = false;
      const currentPos = cardStreamState.current.position;
      const currentConfig = configRef.current;
      const cardTotalWidth = 400 + currentConfig.cardGap;

      cardLine.querySelectorAll<HTMLElement>(".card-wrapper").forEach((wrapper, index) => {
        const normalCard = wrapper.querySelector<HTMLElement>(".card-normal")!;
        const asciiCard = wrapper.querySelector<HTMLElement>(".card-ascii")!;
        const asciiContent = asciiCard.querySelector<HTMLElement>('pre')!;
        
        // Posição local do card no eixo X interno
        const cardX = currentPos + (index * cardTotalWidth);
        const cardCenter = cardX + 200;
        
        // Detecção de colisão local baseada no centro do card
        if (cardX < scannerRight && (cardX + 400) > scannerLeft) {
          anyCardIsScanning = true;
          if (currentConfig.scanEffect === 'scramble' && wrapper.dataset.scanned !== 'true') {
              runScrambleEffect(asciiContent, index);
          }
          wrapper.dataset.scanned = 'true';
          
          // Cálculo de corte 100% imune a rotação (referencial interno)
          const distFromStart = scannerX - cardX;
          const clipPercent = Math.min(Math.max((distFromStart / 400) * 100, 0), 100);

          normalCard.style.setProperty("--clip-right", `${clipPercent}%`);
          asciiCard.style.setProperty("--clip-left", `${clipPercent}%`);
        } else {
          delete wrapper.dataset.scanned;
          if (cardCenter < scannerX) {
            normalCard.style.setProperty("--clip-right", "100%");
            asciiCard.style.setProperty("--clip-left", "100%");
          } else {
            normalCard.style.setProperty("--clip-right", "0%");
            asciiCard.style.setProperty("--clip-left", "0%");
          }
        }
      });
      setIsScanning(anyCardIsScanning);
      scannerState.current.isScanning = anyCardIsScanning;
    };
    

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - cardStreamState.current.lastTime) / 1000;
      cardStreamState.current.lastTime = currentTime;
      const currentConfig = configRef.current;

      if (!isPaused && !cardStreamState.current.isDragging) {
        if (cardStreamState.current.velocity > cardStreamState.current.minVelocity) {
            cardStreamState.current.velocity *= currentConfig.friction;
        }
        cardStreamState.current.position += cardStreamState.current.velocity * cardStreamState.current.direction * deltaTime;
      }
      const { position, cardLineWidth } = cardStreamState.current;
      const containerWidth = cardLine.parentElement?.offsetWidth || window.innerWidth;
      if (position < -cardLineWidth) cardStreamState.current.position = containerWidth;
      else if (position > containerWidth) cardStreamState.current.position = -cardLineWidth;
      cardLine.style.transform = `translateX(${cardStreamState.current.position}px)`;
      updateCardEffects();
      const time = currentTime * 0.001;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] += velocities[i] * 0.016;
        if (positions[i * 3] > window.innerWidth / 2 + 100) positions[i * 3] = -window.innerWidth / 2 - 100;
        positions[i * 3 + 1] += Math.sin(time + i * 0.1) * 0.5;
        alphas[i] = Math.max(0.1, Math.min(1, alphas[i] + (Math.random() - 0.5) * 0.05));
      }
      geometry.attributes.position.needsUpdate = true;
      geometry.attributes.alpha.needsUpdate = true;
      renderer.render(scene, camera);
      const canvas = scannerCanvasRef.current;
      if (canvas && ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const canvasCenterX = canvas.width / 2;

        scannerParticles.forEach(p => {
          p.x += p.vx; p.y += p.vy; p.life -= p.decay;
          // Reiniciar partículas exatamente sobre a linha central
          if (p.life <= 0 || p.x > canvas.width || p.x < 0) {
              Object.assign(p, createScannerParticle());
              p.x = canvasCenterX + (Math.random() - 0.5) * 4;
          }
          ctx.globalAlpha = p.alpha * p.life; ctx.fillStyle = "white";
          ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2); ctx.fill();
        });
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);
    
      return () => {
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      texture.dispose();
    };
  }, [isPaused, cards]);

  return (
    <>
      <div
        className="relative flex items-center justify-center overflow-hidden"
        style={{
          width: `${config.containerWidth}%`,
          height: `${config.containerHeight}px`,
          backgroundColor: `rgba(0,0,0,${config.containerBgOpacity / 100})`,
          borderTop: `1px solid rgba(255,255,255,${config.containerBorderOpacity / 100})`,
          borderBottom: `1px solid rgba(255,255,255,${config.containerBorderOpacity / 100})`,
          marginLeft: `${config.containerMarginX}px`,
          marginRight: `${config.containerMarginX}px`,
          maxWidth: `${config.viewportWidth}px`,
          paddingLeft: `${config.lateralPadding}px`,
          paddingRight: `${config.lateralPadding}px`,
          transform: `translate(${config.containerX}px, ${config.containerY}px) perspective(2000px) translate3d(${config.offsetX}px, ${config.offsetY}px, 0) scale(${config.scale}) rotateX(${config.rotationX}deg) rotateY(${config.rotationY}deg) rotateZ(${config.rotation}deg)`
        }}
      >
        <canvas ref={particleCanvasRef} className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-[250px] z-0 pointer-events-none" />
        <canvas ref={scannerCanvasRef} className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-[300px] z-10 pointer-events-none" />
        
        <div
          className={`
            scanner-line absolute top-1/2 left-1/2 h-[280px] w-0.5 -translate-x-1/2 -translate-y-1/2 
            bg-gradient-to-b from-transparent via-ds-blue to-transparent rounded-full
            transition-opacity duration-300 z-20 pointer-events-none animate-scan-pulse
            ${isScanning ? 'opacity-100' : 'opacity-0'}
          `}
          style={{
            boxShadow: `
              0 0 ${10 * config.intensity}px rgba(41, 189, 242, 0.5), 
              0 0 ${20 * config.intensity}px rgba(41, 189, 242, 0.3), 
              0 0 ${30 * config.intensity}px rgba(41, 189, 242, 0.2), 
              0 0 ${50 * config.intensity}px rgba(41, 189, 242, 0.1)`
          }}
        />

        <div className="absolute w-full h-[250px] flex items-center">
          <div ref={cardLineRef} className="flex items-center whitespace-nowrap select-none will-change-transform" style={{ gap: `${config.cardGap}px` }}>
            {cards.map(card => (
              <div key={card.id} className="card-wrapper relative w-[400px] h-[250px] shrink-0">
                <div className="card-normal card absolute top-0 left-0 w-full h-full rounded-none overflow-hidden bg-transparent shadow-[0_15px_40px_rgba(0,0,0,0.4)] z-[2] [clip-path:inset(0_0_0_var(--clip-right,0%))]">
                  <img src={card.image} alt="" role="presentation" className="w-full h-full object-cover rounded-none transition-all duration-300 ease-in-out brightness-110 contrast-110 shadow-[inset_0_0_20px_rgba(0,0,0,0.1)]" />
                </div>
                <div className="card-ascii card absolute top-0 left-0 w-full h-full rounded-none overflow-hidden bg-transparent z-[1] [clip-path:inset(0_calc(100%-var(--clip-left,0%))_0_0)]">
                  <pre className="ascii-content absolute top-0 left-0 w-full h-full text-[rgba(220,210,255,0.6)] font-mono text-[11px] leading-[13px] overflow-hidden whitespace-pre m-0 p-0 text-left align-top box-border [mask-image:linear-gradient(to_right,rgba(0,0,0,1)_0%,rgba(0,0,0,0.8)_30%,rgba(0,0,0,0.6)_50%,rgba(0,0,0,0.4)_80%,rgba(0,0,0,0.2)_100%)] animate-glitch">
                    {card.ascii}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stark Optical Engine Console — Renderizado fora do overflow-hidden */}
      <div className="pointer-events-auto">
        {config.showConsole && (
          <div className="fixed bottom-10 left-10 z-[9999] w-80 max-h-[80vh] overflow-y-auto p-6 bg-black/80 backdrop-blur-3xl border border-white/20 rounded-none shadow-2xl select-none custom-scrollbar">
            <div className="flex items-center justify-between mb-6 sticky top-0 bg-transparent py-2 z-10">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#29BDF2] animate-pulse" />
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/80">Stark Optical Engine</span>
              </div>
              <button
                onClick={() => setConfig(c => ({...c, showConsole: false}))}
                className="text-white/40 hover:text-white text-[10px] uppercase font-mono"
                aria-label="Fechar console Stark Optical Engine"
              >
                [X]
              </button>
            </div>

            <div className="space-y-8">
              {/* Seção Flow Physics */}
              <div className="space-y-4">
                <span className="font-mono text-[9px] uppercase text-[#29BDF2] block">Flow Physics</span>
                <ScannerSlider 
                  label="Data Flow Rate" value={config.speed} min={0} max={1000} step={10}
                  onChange={(v: number) => setConfig(c => ({...c, speed: v}))}
                />
                <ScannerSlider 
                  label="Momentum Resistance" value={config.friction} min={0.8} max={0.99} step={0.01}
                  onChange={(v: number) => setConfig(c => ({...c, friction: v}))}
                />
                <ScannerSlider 
                  label="Optical Buffer (Gap)" value={config.cardGap} min={0} max={200} step={5}
                  onChange={(v: number) => setConfig(c => ({...c, cardGap: v}))}
                />
                <div className="pt-2">
                  <label className="font-mono text-[9px] uppercase text-white/50 block mb-2">Flux Direction</label>
                  <div className="flex gap-2">
                    {[1, -1].map(dir => (
                      <button 
                        key={dir}
                        onClick={() => setConfig(c => ({...c, direction: dir as any}))}
                        className={`px-3 py-1 rounded-none font-mono text-[10px] uppercase border ${config.direction === dir ? 'bg-[#29BDF2] text-black border-[#29BDF2]' : 'border-white/20 text-white/40'}`}
                      >
                        {dir === 1 ? 'Forward' : 'Reverse'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Seção Spatial Transform */}
              <div className="pt-4 border-t border-white/5 space-y-4">
                <span className="font-mono text-[9px] uppercase text-[#29BDF2] block">Spatial Transform</span>
                <ScannerSlider 
                  label="Viewport Scale" value={config.scale} min={0.2} max={2.0} step={0.05}
                  onChange={(v: number) => setConfig(c => ({...c, scale: v}))}
                />
                <div className="grid grid-cols-1 gap-4">
                  <ScannerSlider 
                    label="Axial Rotation (Z)" value={config.rotation} min={-360} max={360} step={1}
                    onChange={(v: number) => setConfig(c => ({...c, rotation: v}))}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <ScannerSlider 
                      label="Tilt (Rotation X)" value={config.rotationX} min={-90} max={90} step={1}
                      onChange={(v: number) => setConfig(c => ({...c, rotationX: v}))}
                    />
                    <ScannerSlider 
                      label="Pan (Rotation Y)" value={config.rotationY} min={-90} max={90} step={1}
                      onChange={(v: number) => setConfig(c => ({...c, rotationY: v}))}
                    />
                  </div>
                </div>
                <ScannerSlider 
                  label="Lateral Inset (Padding)" value={config.lateralPadding} min={0} max={300} step={5}
                  onChange={(v: number) => setConfig(c => ({...c, lateralPadding: v}))}
                />
                <ScannerSlider 
                  label="Viewport Clipping (Width)" value={config.viewportWidth} min={400} max={2000} step={20}
                  onChange={(v: number) => setConfig(c => ({...c, viewportWidth: v}))}
                />
                <div className="grid grid-cols-2 gap-4">
                  <ScannerSlider 
                    label="Nodal Offset X" value={config.offsetX} min={-500} max={500} step={5}
                    onChange={(v: number) => setConfig(c => ({...c, offsetX: v}))}
                  />
                  <ScannerSlider 
                    label="Nodal Offset Y" value={config.offsetY} min={-500} max={500} step={5}
                    onChange={(v: number) => setConfig(c => ({...c, offsetY: v}))}
                  />
                </div>
              </div>

              {/* Container */}
              <div className="pt-4 border-t border-white/5 space-y-4">
                <span className="font-mono text-[9px] uppercase text-[#29BDF2] block">Container</span>
                <ScannerSlider
                  label="Height (px)" value={config.containerHeight} min={100} max={1200} step={10}
                  onChange={(v: number) => setConfig(c => ({...c, containerHeight: v}))}
                />
                <ScannerSlider
                  label="Width (%)" value={config.containerWidth} min={10} max={100} step={1}
                  onChange={(v: number) => setConfig(c => ({...c, containerWidth: v}))}
                />
                <ScannerSlider
                  label="BG Opacidade (%)" value={config.containerBgOpacity} min={0} max={100} step={1}
                  onChange={(v: number) => setConfig(c => ({...c, containerBgOpacity: v}))}
                />
                <ScannerSlider
                  label="Border Opacidade (%)" value={config.containerBorderOpacity} min={0} max={100} step={1}
                  onChange={(v: number) => setConfig(c => ({...c, containerBorderOpacity: v}))}
                />
                <ScannerSlider
                  label="Margin X (px)" value={config.containerMarginX} min={-400} max={400} step={4}
                  onChange={(v: number) => setConfig(c => ({...c, containerMarginX: v}))}
                />
                <div className="grid grid-cols-2 gap-4">
                  <ScannerSlider
                    label="Position X (px)" value={config.containerX} min={-800} max={800} step={4}
                    onChange={(v: number) => setConfig(c => ({...c, containerX: v}))}
                  />
                  <ScannerSlider
                    label="Position Y (px)" value={config.containerY} min={-800} max={800} step={4}
                    onChange={(v: number) => setConfig(c => ({...c, containerY: v}))}
                  />
                </div>
              </div>

              {/* Seção Scanner Core */}
              <div className="pt-4 border-t border-white/5 space-y-4">
                <span className="font-mono text-[9px] uppercase text-[#29BDF2] block">Scanner Core</span>
                <div className="space-y-2">
                  <label className="font-mono text-[9px] uppercase text-white/50">Efeito de Scan</label>
                  <div className="flex gap-2">
                    {['clip', 'scramble'].map(mode => (
                      <button 
                        key={mode}
                        onClick={() => setConfig(c => ({...c, scanEffect: mode as any}))}
                        className={`px-3 py-1 rounded-none font-mono text-[10px] uppercase border ${config.scanEffect === mode ? 'bg-white text-black border-white' : 'border-white/20 text-white/40'}`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>
                <ScannerSlider 
                  label="Glow Intensity" value={config.intensity} min={0.1} max={3} step={0.1}
                  onChange={(v: number) => setConfig(c => ({...c, intensity: v}))}
                />
              </div>

              {/* Seção Assets */}
              <div className="pt-4 border-t border-white/5 space-y-4">
                <span className="font-mono text-[9px] uppercase text-white/40 block">Data Stream Assets</span>
                <ScannerSlider 
                  label="Stream Multiplier (Repeat)" value={config.repeat} min={1} max={20} step={1}
                  onChange={(v: number) => setConfig(c => ({...c, repeat: v}))}
                />
                <div className="space-y-2 text-[10px] font-mono text-white/40 leading-tight">
                  <p>Assets injetados: {cardImages.length}</p>
                  <p>Total de nós no fluxo: {cardImages.length * config.repeat}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const ScannerSlider = ({ label, value, min, max, step, onChange }: any) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <label className="font-mono text-[9px] uppercase text-white/50">{label}</label>
      <input 
        type="number"
        step={step}
        value={typeof value === 'number' ? parseFloat(value.toFixed(2)) : value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="bg-transparent border-b border-white/10 font-mono text-[10px] text-white/80 w-16 text-right focus:outline-none focus:border-[#29BDF2] transition-colors"
      />
    </div>
    <input 
      type="range" min={min} max={max} step={step} value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className="w-full h-1 bg-white/10 rounded-none appearance-none cursor-pointer accent-[#29BDF2]"
    />
  </div>
);

export {ScannerCardStream};
