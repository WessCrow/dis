"use client";

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

export const WovenLightHero = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="relative w-full h-full min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <StarkOpticalEngine />
      {/* Cinematic Vignette Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(circle,transparent_20%,black_120%)]" />
      <div className="relative z-20 w-full h-full pointer-events-none">
        <div className="pointer-events-auto w-full h-full">{children}</div>
      </div>
    </div>
  );
};

const StarkOpticalEngine = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // ── Configuration State ──
  const [config, setConfig] = useState({
    showConsole: false,
    // Physics
    bhRadius: 5.0,
    gravityStrength: 30.0,
    viscosity: 0.995,
    particleCount: 12000,
    // Accretion Disk
    diskTilt: -1.0,
    diskSpeed: 0.1,
    diskInnerRel: 1.1,
    diskOuterRel: 5.7,
    diskOpacity: 0.65,
    // Camera & Motion
    cameraY: 2.5,
    cameraZ: 18,
    autoRotateSpeed: 0.15,
    damping: 0.04,
    // Blackhole Transform
    bhPosX: -6.5,
    bhPosY: 0.0,
    bhPosZ: 0,
    bhRotX: 3,
    bhRotY: -84,
    bhRotZ: -41,
    bhAutoRotateSpeed: 0.0,
    // Environment
    gridOpacity: 0.1,
    fogOpacity: 0.07,
    asteroidParallax: 5.0,
    // Optics
    bloomStrength: 1.8,
    bloomRadius: 0.6,
    bloomThreshold: 0.15,
    flareIntensity: 0.15,
    grainIntensity: 0.0,
    exposure: 0.1,
    // Color
    hue: 198,
    saturation: 1.0,
    lightness: 0.9
  });

  const configRef = useRef(config);
  useEffect(() => { configRef.current = config; }, [config]);

  useEffect(() => {
    if (!containerRef.current) return;

    // ── Renderer ──
    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = configRef.current.exposure;
    containerRef.current.appendChild(renderer.domElement);

    // ── Camera & Controls ──
    const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.set(0, configRef.current.cameraY, configRef.current.cameraZ);
    
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = configRef.current.damping;
    controls.target.set(0, 0, 0);
    controls.minDistance = 8;
    controls.maxDistance = 40;
    controls.autoRotate = true;
    controls.autoRotateSpeed = configRef.current.autoRotateSpeed;
    controls.enablePan = false;
    controls.enableZoom = false; // Disable zoom to not interfere with scroll

    // ── Mouse Parallax ──
    const mouse = new THREE.Vector2(0, 0);
    const smoothMouse = new THREE.Vector2(0, 0);
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    // ── Keyboard Controls ──
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key.toLowerCase() === 'h') {
        setConfig(prev => ({ ...prev, showConsole: !prev.showConsole }));
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // ── Scene ──
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    // ── Blackhole Group ──
    const blackHoleGroup = new THREE.Group();
    scene.add(blackHoleGroup);

    // ── Constants ──
    const CYAN_PRIMARY = new THREE.Color().setHSL(configRef.current.hue / 360, configRef.current.saturation, configRef.current.lightness);
    let bhRadius = configRef.current.bhRadius;

    // 1. BACKGROUND — Blueprint Void Grid
    const gridMat = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
      uniforms: { 
        uTime: { value: 0 },
        uAlpha: { value: configRef.current.gridOpacity }
      },
      vertexShader: `
        varying vec3 vWorldPos;
        void main() {
          vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;
        varying vec3 vWorldPos;
        uniform float uTime;
        uniform float uAlpha;
        void main() {
          vec3 p = vWorldPos * 0.02;
          float gx = abs(fract(p.x) - 0.5);
          float gy = abs(fract(p.y) - 0.5);
          float gz = abs(fract(p.z) - 0.5);
          float line = min(min(
            smoothstep(0.48, 0.5, gx),
            smoothstep(0.48, 0.5, gy)),
            smoothstep(0.48, 0.5, gz)
          );
          float dist = length(vWorldPos) * 0.001;
          float alpha = line * uAlpha * (1.0 - smoothstep(0.0, 1.0, dist));
          gl_FragColor = vec4(1.0, 1.0, 1.0, alpha);
        }
      `
    });
    const gridSphere = new THREE.Mesh(new THREE.SphereGeometry(800, 32, 32), gridMat);
    scene.add(gridSphere);

    // 2. BLACK HOLE CORE
    const bhCoreMat = new THREE.ShaderMaterial({
      uniforms: { 
        uTime: { value: 0 },
        uColor: { value: new THREE.Color().setHSL(configRef.current.hue / 360, configRef.current.saturation, configRef.current.lightness) }
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vViewDir;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
          vViewDir = normalize(-mvPos.xyz);
          gl_Position = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: `
        precision highp float;
        varying vec3 vNormal;
        varying vec3 vViewDir;
        uniform float uTime;
        uniform vec3 uColor;
        void main() {
          float rim = 1.0 - max(dot(vNormal, vViewDir), 0.0);
          float photonRing = pow(rim, 32.0) * 3.0;
          vec3 col = uColor * photonRing;
          float alpha = smoothstep(0.92, 1.0, rim) * 0.8;
          gl_FragColor = vec4(col, max(alpha, 1.0));
        }
      `,
      transparent: false
    });
    const bhCore = new THREE.Mesh(new THREE.SphereGeometry(bhRadius, 64, 64), bhCoreMat);
    blackHoleGroup.add(bhCore);

    // Photon Sphere Ring
    const photonRingGeo = new THREE.TorusGeometry(bhRadius * 1.06, 0.015, 16, 256);
    const photonRingMat = new THREE.ShaderMaterial({
      uniforms: { 
        uTime: { value: 0 },
        uColor: { value: new THREE.Color().setHSL(configRef.current.hue / 360, configRef.current.saturation, configRef.current.lightness) }
      },
      transparent: true, side: THREE.DoubleSide, depthWrite: false,
      vertexShader: `
        varying vec2 vUv;
        void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
      `,
      fragmentShader: `
        precision highp float;
        varying vec2 vUv;
        uniform float uTime;
        uniform vec3 uColor;
        void main() {
          float pulse = 0.7 + 0.3 * sin(uTime * 3.0 + vUv.x * 40.0);
          gl_FragColor = vec4(uColor * pulse * 4.0, pulse * 0.9);
        }
      `
    });
    const photonRing = new THREE.Mesh(photonRingGeo, photonRingMat);
    photonRing.rotation.x = Math.PI * 0.5;
    blackHoleGroup.add(photonRing);

    // 3. ACCRETION DISK
    const DISK_INNER = bhRadius * configRef.current.diskInnerRel;
    const DISK_OUTER = bhRadius * configRef.current.diskOuterRel;
    const DISK_TILT = configRef.current.diskTilt * Math.PI / 180.0;

    const diskMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uInner: { value: DISK_INNER },
        uOuter: { value: DISK_OUTER },
        uSpeed: { value: configRef.current.diskSpeed },
        uOpacity: { value: configRef.current.diskOpacity },
        uColor: { value: new THREE.Color().setHSL(configRef.current.hue / 360, configRef.current.saturation, configRef.current.lightness) }
      },
      side: THREE.DoubleSide,
      transparent: true,
      depthWrite: false,
      vertexShader: `
        varying vec3 vLocalPos;
        void main() {
          vLocalPos = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;
        varying vec3 vLocalPos;
        uniform float uTime;
        uniform float uInner;
        uniform float uOuter;
        uniform float uSpeed;
        uniform float uOpacity;
        uniform vec3 uColor;
        float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        float noise(vec2 p) {
          vec2 i = floor(p); vec2 f = fract(p);
          f = f * f * (3.0 - 2.0 * f);
          return mix(mix(hash(i), hash(i + vec2(1,0)), f.x), mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), f.x), f.y);
        }
        float fbm(vec2 p) {
          float v = 0.0, a = 0.5;
          for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.1; a *= 0.5; }
          return v;
        }
        void main() {
          float dist = length(vLocalPos.xy);
          float t = (dist - uInner) / (uOuter - uInner);
          if (t < 0.0 || t > 1.0) discard;
          float angle = atan(vLocalPos.y, vLocalPos.x);
          float orbitalPhase = angle + uTime * (uSpeed / (0.5 + t * 2.0));
          vec2 turbCoord = vec2(orbitalPhase * 3.0, t * 8.0);
          float turb = fbm(turbCoord + uTime * 0.3);
          float filaments = smoothstep(0.3, 0.7, turb);
          float gaps = smoothstep(0.15, 0.25, turb) * smoothstep(0.05, 0.15, abs(turb - 0.5));
          float doppler = 0.7 + 0.3 * sin(angle + uTime * 0.5);
          
          vec3 innerColor = mix(vec3(1.0), uColor, 0.2);
          vec3 midColor = uColor;
          vec3 outerColor = uColor * 0.4;
          
          vec3 baseColor = mix(innerColor, midColor, smoothstep(0.0, 0.3, t));
          baseColor = mix(baseColor, outerColor, smoothstep(0.3, 1.0, t));
          float sss = exp(-t * 3.0) * 0.5;
          baseColor += uColor * 0.5 * sss;
          baseColor *= filaments * gaps * doppler;
          float emission = exp(-t * 4.0) * 3.0;
          baseColor += innerColor * emission * filaments;
          float alpha = smoothstep(0.0, 0.08, t) * smoothstep(1.0, 0.85, t) * filaments * uOpacity * (0.3 + turb * 0.7);
          gl_FragColor = vec4(baseColor, alpha);
        }
      `
    });
    const diskGeo = new THREE.RingGeometry(DISK_INNER, DISK_OUTER, 512, 128);
    const disk = new THREE.Mesh(diskGeo, diskMat);
    disk.rotation.x = -Math.PI * 0.5 + DISK_TILT;
    blackHoleGroup.add(disk);

    // Gravitational Lensing Halo
    const lensHaloMat = new THREE.ShaderMaterial({
      uniforms: { 
        uTime: { value: 0 }, 
        uRadius: { value: bhRadius },
        uColor: { value: new THREE.Color().setHSL(configRef.current.hue / 360, configRef.current.saturation, configRef.current.lightness) }
      },
      side: THREE.DoubleSide, transparent: true, depthWrite: false,
      vertexShader: `
        varying vec3 vPos;
        void main() {
          vPos = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;
        varying vec3 vPos;
        uniform float uTime;
        uniform float uRadius;
        uniform vec3 uColor;
        float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
        float noise(vec2 p) {
          vec2 i = floor(p); vec2 f = fract(p);
          f = f*f*(3.0-2.0*f);
          return mix(mix(hash(i),hash(i+vec2(1,0)),f.x), mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x), f.y);
        }
        void main() {
          float dist = length(vPos.xz);
          float t = (dist - uRadius * 1.05) / (uRadius * 5.0);
          if (t < 0.0 || t > 1.0) discard;
          float angle = atan(vPos.z, vPos.x);
          float orbPhase = angle + uTime * 1.8 / (0.3 + t * 2.0);
          float turb = noise(vec2(orbPhase * 4.0, t * 6.0) + uTime * 0.2);
          vec3 color = mix(uColor, uColor * 0.5, t);
          float alpha = smoothstep(0.0, 0.1, t) * smoothstep(1.0, 0.7, t) * turb * 0.35 * exp(-abs(vPos.y) * 15.0);
          float doppler = 0.6 + 0.4 * sin(angle + uTime * 0.5 + 3.14);
          gl_FragColor = vec4(color * 1.5 * doppler, alpha);
        }
      `
    });
    const lensGeoUp = new THREE.RingGeometry(bhRadius * 1.05, bhRadius * 5.5, 256, 64);
    const lensHaloUp = new THREE.Mesh(lensGeoUp, lensHaloMat);
    lensHaloUp.rotation.x = -Math.PI * 0.5 - DISK_TILT * 0.3;
    lensHaloUp.position.y = 0.15;
    blackHoleGroup.add(lensHaloUp);

    const lensHaloDown = new THREE.Mesh(lensGeoUp.clone(), lensHaloMat.clone());
    lensHaloDown.rotation.x = Math.PI * 0.5 + DISK_TILT * 0.3;
    lensHaloDown.position.y = -0.15;
    blackHoleGroup.add(lensHaloDown);

    // 4. PARTICLE ENGINE
    const PARTICLE_COUNT = configRef.current.particleCount;
    const BAND_COUNT = 4;
    const BAND_RADII = [1.06, 1.13, 1.22, 1.34];
    const BAND_PARTICLES = 800;
    const INFALL_PARTICLES = PARTICLE_COUNT - BAND_COUNT * BAND_PARTICLES;

    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);
    const phases = new Float32Array(PARTICLE_COUNT);
    const particleTypes = new Float32Array(PARTICLE_COUNT);

    function initParticle(i: number, type: number) {
      particleTypes[i] = type;
      phases[i] = Math.random() * Math.PI * 2;
      if (type === 0) {
        const angle = Math.random() * Math.PI * 2;
        const dist = 15 + Math.random() * 40;
        const y = (Math.random() - 0.5) * 4;
        positions[i * 3] = Math.cos(angle) * dist;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = Math.sin(angle) * dist;
        const speed = 0.3 + Math.random() * 0.5;
        velocities[i * 3] = -Math.sin(angle) * speed + (Math.random() - 0.5) * 0.1;
        velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.05;
        velocities[i * 3 + 2] = Math.cos(angle) * speed + (Math.random() - 0.5) * 0.1;
        sizes[i] = 0.8 + Math.random() * 1.5;
        colors[i * 3] = 0.0; colors[i * 3 + 1] = 0.4 + Math.random() * 0.3; colors[i * 3 + 2] = 0.5 + Math.random() * 0.3;
      } else {
        const r = BAND_RADII[type - 1] * bhRadius * 2.5;
        const angle = Math.random() * Math.PI * 2;
        positions[i * 3] = Math.cos(angle) * r;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 0.15;
        positions[i * 3 + 2] = Math.sin(angle) * r;
        const orbSpeed = 2.0 / Math.sqrt(r);
        velocities[i * 3] = -Math.sin(angle) * orbSpeed;
        velocities[i * 3 + 1] = 0;
        velocities[i * 3 + 2] = Math.cos(angle) * orbSpeed;
        sizes[i] = 0.5 + Math.random() * 0.8;
        colors[i * 3] = 0.3 + Math.random() * 0.3; colors[i * 3 + 1] = 0.8 + Math.random() * 0.2; colors[i * 3 + 2] = 0.9 + Math.random() * 0.1;
      }
    }

    let pIdx = 0;
    for (let b = 0; b < BAND_COUNT; b++) for (let j = 0; j < BAND_PARTICLES; j++) initParticle(pIdx++, b + 1);
    for (let j = 0; j < INFALL_PARTICLES; j++) initParticle(pIdx++, 0);

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particleGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const particleMat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 }, uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) } },
      vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      vertexShader: `
        attribute float size;
        varying vec3 vColor;
        uniform float uPixelRatio;
        void main() {
          vColor = color;
          vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * uPixelRatio * (200.0 / -mvPos.z);
          gl_PointSize = clamp(gl_PointSize, 0.5, 40.0);
          gl_Position = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: `
        precision highp float;
        varying vec3 vColor;
        void main() {
          float d = length(gl_PointCoord - 0.5) * 2.0;
          float alpha = exp(-d * d * 3.0);
          if (alpha < 0.01) discard;
          gl_FragColor = vec4(vColor * (1.0 + alpha * 2.0), alpha * 0.7);
        }
      `
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    blackHoleGroup.add(particles);

    function updateParticles(dt: number, time: number) {
      const pos = particleGeo.attributes.position.array as Float32Array;
      const col = particleGeo.attributes.color.array as Float32Array;
      const sz = particleGeo.attributes.size.array as Float32Array;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;
        const px = pos[i3], py = pos[i3 + 1], pz = pos[i3 + 2];
        const dist = Math.sqrt(px * px + py * py + pz * pz);
        const type = particleTypes[i];
        if (dist < configRef.current.bhRadius * 0.8 || dist > 80) { initParticle(i, type); continue; }
        const grav = configRef.current.gravityStrength / (dist * dist + 0.1);
        const nx = px / dist, ny = py / dist, nz = pz / dist;
        velocities[i3] -= nx * grav * dt; velocities[i3 + 1] -= ny * grav * dt; velocities[i3 + 2] -= nz * grav * dt;
        if (type > 0) {
          const bandR = BAND_RADII[type - 1] * configRef.current.bhRadius * 2.5;
          const rDiff = dist - bandR;
          velocities[i3] -= nx * rDiff * 0.5 * dt; velocities[i3 + 1] -= ny * rDiff * 0.5 * dt; velocities[i3 + 2] -= nz * rDiff * 0.5 * dt;
          velocities[i3 + 1] -= py * 2.0 * dt;
          const flicker = 0.5 + 0.5 * Math.sin(time * (3.0 + type * 1.7) + phases[i] * 10.0);
          col[i3] = (0.3 + type * 0.1) * flicker; col[i3 + 1] = (0.7 + type * 0.05) * flicker; col[i3 + 2] = (0.85 + type * 0.03) * flicker;
          sz[i] = (0.4 + 0.4 * flicker);
        } else {
          const brightness = Math.min(1.0, 3.0 / (dist + 1.0));
          col[i3] = 0.0; col[i3 + 1] = 0.3 * brightness + 0.2; col[i3 + 2] = 0.4 * brightness + 0.3;
          sz[i] = 0.5 + brightness * 1.5;
        }
        velocities[i3] *= configRef.current.viscosity; velocities[i3 + 1] *= configRef.current.viscosity; velocities[i3 + 2] *= configRef.current.viscosity;
        pos[i3] += velocities[i3] * dt; pos[i3 + 1] += velocities[i3 + 1] * dt; pos[i3 + 2] += velocities[i3 + 2] * dt;
      }
      particleGeo.attributes.position.needsUpdate = true;
      particleGeo.attributes.color.needsUpdate = true;
      particleGeo.attributes.size.needsUpdate = true;
    }

    // 5. VOLUMETRIC FOG
    const fogPlanes: THREE.Mesh[] = [];
    for (let i = 0; i < 8; i++) {
      const fogMat = new THREE.ShaderMaterial({
        uniforms: { 
          uTime: { value: 0 }, 
          uLayer: { value: i / 8 },
          uOpacity: { value: configRef.current.fogOpacity },
          uColor: { value: new THREE.Color().setHSL(configRef.current.hue / 360, configRef.current.saturation, configRef.current.lightness) }
        },
        transparent: true, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending,
        vertexShader: `
          varying vec2 vUv;
          void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
        `,
        fragmentShader: `
          precision highp float;
          varying vec2 vUv;
          uniform float uTime;
          uniform float uLayer;
          uniform float uOpacity;
          uniform vec3 uColor;
          float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
          float noise(vec2 p) {
            vec2 i=floor(p), f=fract(p); f=f*f*(3.-2.*f);
            return mix(mix(hash(i),hash(i+vec2(1,0)),f.x), mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x), f.y);
          }
          float fbm(vec2 p) {
            float v=0., a=0.5;
            for(int i=0;i<4;i++){v+=a*noise(p);p*=2.1;a*=0.5;}
            return v;
          }
          void main() {
            vec2 centered = vUv - 0.5;
            float dist = length(centered);
            float fogDensity = fbm(centered * 4.0 + uTime * 0.1 + uLayer * 3.0) * exp(-dist * 2.5);
            float angle = atan(centered.y, centered.x);
            float rays = pow(abs(sin(angle * 6.0 + uTime * 0.2 + uLayer * 1.5)), 8.0);
            vec3 color = uColor * (1.0 + uLayer * 0.5);
            gl_FragColor = vec4(color, fogDensity * (0.3 + rays * 0.7) * uOpacity);
          }
        `
      });
      const fogPlane = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), fogMat);
      fogPlane.rotation.x = -Math.PI * 0.5 + DISK_TILT;
      fogPlane.position.y = (i - 4) * 0.08;
      blackHoleGroup.add(fogPlane);
      fogPlanes.push(fogPlane);
    }

    // 6. ASTEROID DEBRIS
    const asteroidGroup = new THREE.Group();
    const asteroidData: any[] = [];
    for (let i = 0; i < 40; i++) {
      const geo = new THREE.IcosahedronGeometry(0.3 + Math.random() * 0.8, Math.floor(Math.random() * 2));
      const posAttr = geo.attributes.position;
      for (let v = 0; v < posAttr.count; v++) {
        const nx = posAttr.getX(v), ny = posAttr.getY(v), nz = posAttr.getZ(v);
        const scale = 0.7 + Math.random() * 0.6;
        posAttr.setXYZ(v, nx * scale, ny * scale, nz * scale);
      }
      geo.computeVertexNormals();
      const mat = new THREE.ShaderMaterial({
        uniforms: { uCyanLight: { value: CYAN_PRIMARY }, uTime: { value: 0 } },
        vertexShader: `
          varying vec3 vNormal;
          varying vec3 vWorldPos;
          void main() {
            vNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
            vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          precision highp float;
          varying vec3 vNormal;
          varying vec3 vWorldPos;
          uniform vec3 uCyanLight;
          void main() {
            vec3 toCenter = normalize(-vWorldPos);
            float rim = pow(1.0 - max(dot(vNormal, toCenter), 0.0), 3.0);
            gl_FragColor = vec4(vec3(0.02, 0.02, 0.03) + uCyanLight * rim * 0.8, 1.0);
          }
        `
      });
      const mesh = new THREE.Mesh(geo, mat);
      const angle = Math.random() * Math.PI * 2;
      const dist = 12 + Math.random() * 25;
      const base_y = -4.5 - Math.random() * 3;
      mesh.position.set(Math.cos(angle) * dist, base_y, Math.sin(angle) * dist);
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      asteroidData.push({ mesh, parallaxFactor: 0.3 + Math.random() * 0.7, rotSpeed: (Math.random() - 0.5) * 0.2, orbitSpeed: (Math.random() - 0.5) * 0.01, baseAngle: angle, dist, base_y });
      asteroidGroup.add(mesh);
    }
    blackHoleGroup.add(asteroidGroup);
    
    // 6.5. MOUNTAIN SILHOUETTE (BACKGROUND)
    const mountainMat = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(0xffffff) }, // 100% White silhouette
        uOpacity: { value: 1.0 },
        uPrimaryColor: { value: CYAN_PRIMARY }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;
        varying vec2 vUv;
        uniform float uTime;
        uniform vec3 uColor;
        uniform vec3 uPrimaryColor;
        uniform float uOpacity;

        void main() {
          vec2 p = vUv * 2.0 - 1.0;
          
          // Peak 1: Large, rounded, left side
          float peak1 = exp(-pow(p.x + 0.45, 2.0) * 4.5) * 0.55;
          
          // Peak 2: Small, rounded, extreme right
          float peak2 = exp(-pow(p.x - 0.85, 2.0) * 18.0) * 0.18;
          
          float mountainLine = peak1 + peak2;
          
          // The silhouette mask
          float mask = smoothstep(mountainLine, mountainLine - 0.02, p.y + 0.4);
          
          // Fade out at the very bottom
          float bottomFade = smoothstep(-1.0, -0.6, p.y);
          
          gl_FragColor = vec4(uColor, mask * uOpacity * bottomFade);
        }
      `
    });

    const mountainGeo = new THREE.PlaneGeometry(160, 40);
    const mountains = new THREE.Mesh(mountainGeo, mountainMat);
    // Positioned in the extreme foreground (closer to camera at Z=18)
    // Recalibrated Y and Z to ensure visibility within the camera frustum
    mountains.position.set(0, -1.5, 10);
    scene.add(mountains);

    // 7. POST-PROCESSING
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight), 
      configRef.current.bloomStrength, 
      configRef.current.bloomRadius, 
      configRef.current.bloomThreshold
    );
    composer.addPass(bloomPass);

    const anamorphicShader = {
      uniforms: { 
        tDiffuse: { value: null }, 
        uTime: { value: 0 }, 
        uFlareIntensity: { value: configRef.current.flareIntensity }, 
        uGrainIntensity: { value: configRef.current.grainIntensity } 
      },
      vertexShader: `
        varying vec2 vUv;
        void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
      `,
      fragmentShader: `
        precision highp float;
        varying vec2 vUv;
        uniform sampler2D tDiffuse;
        uniform float uTime;
        uniform float uFlareIntensity;
        uniform float uGrainIntensity;
        float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
        void main() {
          vec4 color = texture2D(tDiffuse, vUv);
          float yDist = abs(vUv.y - 0.5);
          float xStretch = exp(-yDist * yDist * 80.0);
          float streak = 0.0;
          for (float i = -8.0; i <= 8.0; i += 1.0) {
            vec4 s = texture2D(tDiffuse, vUv + vec2(i * 0.008, 0.0));
            streak += dot(s.rgb, vec3(0.2126, 0.7152, 0.0722)) * exp(-abs(i) * 0.3);
          }
          color.rgb += vec3(0.3, 0.8, 1.0) * (streak / 17.0) * xStretch * uFlareIntensity;
          color.rgb += vec3((hash(vUv * 1000.0 + uTime * 100.0) - 0.5) * uGrainIntensity) * vec3(0.9, 0.95, 1.0);
          color.rgb *= smoothstep(0.0, 0.5, 1.0 - dot((vUv - 0.5) * 1.2, (vUv - 0.5) * 1.2));
          color.rgb = mix(color.rgb, color.rgb * vec3(0.85, 0.95, 1.1), 0.3);
          gl_FragColor = color;
        }
      `
    };
    const anamorphicPass = new ShaderPass(anamorphicShader);
    composer.addPass(anamorphicPass);
    composer.addPass(new OutputPass());

    // 8. ANIMATION LOOP
    const clock = new THREE.Clock();
    const baseLookAt = new THREE.Vector3(0, 0, 0);
    const currentLookAt = new THREE.Vector3(0, 0, 0);

    let rafId: number;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const dt = Math.min(clock.getDelta(), 0.05);
      const time = clock.getElapsedTime();
      const primaryColor = new THREE.Color().setHSL(configRef.current.hue / 360, configRef.current.saturation, configRef.current.lightness);

      // Update from config
      renderer.toneMappingExposure = configRef.current.exposure;
      bloomPass.strength = configRef.current.bloomStrength;
      bloomPass.radius = configRef.current.bloomRadius;
      bloomPass.threshold = configRef.current.bloomThreshold;
      anamorphicPass.material.uniforms.uFlareIntensity.value = configRef.current.flareIntensity;
      anamorphicPass.material.uniforms.uGrainIntensity.value = configRef.current.grainIntensity;
      controls.autoRotateSpeed = configRef.current.autoRotateSpeed;
      controls.dampingFactor = configRef.current.damping;

      // Update Blackhole Transform
      blackHoleGroup.position.set(configRef.current.bhPosX, configRef.current.bhPosY, configRef.current.bhPosZ);
      const autoY = time * configRef.current.bhAutoRotateSpeed;
      blackHoleGroup.rotation.set(
        configRef.current.bhRotX * Math.PI / 180,
        (configRef.current.bhRotY + autoY) * Math.PI / 180,
        configRef.current.bhRotZ * Math.PI / 180
      );

      // Note: camera position is mostly managed by controls, but we can set it if needed
      // camera.position.z = configRef.current.cameraZ;

      smoothMouse.x += (mouse.x - smoothMouse.x) * 0.03;
      smoothMouse.y += (mouse.y - smoothMouse.y) * 0.03;

      currentLookAt.x = baseLookAt.x + smoothMouse.x * 1.5;
      currentLookAt.y = baseLookAt.y + smoothMouse.y * 0.8;
      controls.target.lerp(currentLookAt, 0.02);
      
      // Mountain Parallax (Extreme Foreground)
      mountains.position.x = smoothMouse.x * 3.5;
      mountains.position.y = -1.5 + smoothMouse.y * 1.2;

      const timed = [bhCoreMat, photonRingMat, diskMat, lensHaloMat, gridMat, particleMat, anamorphicPass.material];
      timed.forEach(m => { 
        if (m && (m as THREE.ShaderMaterial).uniforms && (m as THREE.ShaderMaterial).uniforms.uTime) {
          (m as THREE.ShaderMaterial).uniforms.uTime.value = time; 
        }
      });
      if (mountainMat.uniforms.uTime) mountainMat.uniforms.uTime.value = time;
      mountainMat.uniforms.uPrimaryColor.value.copy(primaryColor);

      fogPlanes.forEach(f => { 
        if (f.material && (f.material as THREE.ShaderMaterial).uniforms) {
          (f.material as THREE.ShaderMaterial).uniforms.uTime.value = time; 
        }
      });

      updateParticles(dt, time);

      const currentBhRadius = configRef.current.bhRadius;
      bhCore.scale.setScalar(currentBhRadius / bhRadius);
      photonRing.scale.setScalar(currentBhRadius / bhRadius);
      
      
      bhCoreMat.uniforms.uColor.value.copy(primaryColor);
      photonRingMat.uniforms.uColor.value.copy(primaryColor);
      lensHaloMat.uniforms.uColor.value.copy(primaryColor);
      diskMat.uniforms.uColor.value.copy(primaryColor);
      
      gridMat.uniforms.uAlpha.value = configRef.current.gridOpacity;
      lensHaloMat.uniforms.uRadius.value = currentBhRadius;
      
      diskMat.uniforms.uInner.value = currentBhRadius * configRef.current.diskInnerRel;
      diskMat.uniforms.uOuter.value = currentBhRadius * configRef.current.diskOuterRel;
      diskMat.uniforms.uSpeed.value = configRef.current.diskSpeed;
      diskMat.uniforms.uOpacity.value = configRef.current.diskOpacity;
      disk.rotation.x = -Math.PI * 0.5 + (configRef.current.diskTilt * Math.PI / 180.0);

      asteroidData.forEach(a => {
        const angle = a.baseAngle + time * a.orbitSpeed;
        a.mesh.position.x = Math.cos(angle) * a.dist + smoothMouse.x * a.parallaxFactor * 3.0 * configRef.current.asteroidParallax;
        a.mesh.position.z = Math.sin(angle) * a.dist;
        a.mesh.position.y = a.base_y + smoothMouse.y * a.parallaxFactor * 1.5 * configRef.current.asteroidParallax;
        a.mesh.rotation.x += a.rotSpeed * dt;
        a.mesh.rotation.y += a.rotSpeed * dt * 0.7;
        const mat = a.mesh.material as THREE.ShaderMaterial;
        if (mat.uniforms) {
          mat.uniforms.uTime.value = time;
          mat.uniforms.uCyanLight.value.copy(primaryColor);
        }
      });

      fogPlanes.forEach(f => { 
        const mat = f.material as THREE.ShaderMaterial;
        if (mat.uniforms) {
          mat.uniforms.uTime.value = time;
          mat.uniforms.uOpacity.value = configRef.current.fogOpacity;
          mat.uniforms.uColor.value.copy(primaryColor);
        }
      });

      controls.update();
      composer.render();
    };
    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
      particleMat.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('keydown', handleKeyDown);
      if (containerRef.current) containerRef.current.removeChild(renderer.domElement);
      // Cleanup Three.js resources
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) object.material.forEach(m => m.dispose());
          else object.material.dispose();
        }
      });
      renderer.dispose();
    };
  }, []);

  return (
    <>
      <div ref={containerRef} className="absolute inset-0 z-0 bg-black" />
      
      {/* Stark Console UI - Hidden by default, accessible via Shift+H */}
      <div className="fixed bottom-10 left-10 z-[9999] pointer-events-auto transition-opacity duration-500">
        {config.showConsole && (
          <div className="w-96 max-h-[85vh] overflow-y-auto p-6 bg-black/90 backdrop-blur-3xl border border-white/20 rounded-none shadow-2xl select-none custom-scrollbar font-mono">
            <div className="flex items-center justify-between mb-6 sticky top-0 bg-transparent py-2 z-10">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#29BDF2] animate-pulse" />
                <span className="text-[10px] tracking-[0.2em] uppercase text-white/80">Stark Art Direction</span>
              </div>
              <button 
                onClick={() => setConfig(c => ({...c, showConsole: false}))}
                className="text-white/40 hover:text-white text-[10px] uppercase"
              >
                [X]
              </button>
            </div>

            <div className="space-y-10">
              {/* Physics Section */}
              <div className="space-y-4">
                <span className="text-[9px] uppercase text-[#29BDF2] block tracking-widest">01. Singularity</span>
                <ScannerSlider 
                  label="Horizon Radius" value={config.bhRadius} min={0.5} max={5.0} step={0.1}
                  onChange={(v: number) => setConfig(c => ({...c, bhRadius: v}))}
                />
                <ScannerSlider 
                  label="Gravity" value={config.gravityStrength} min={0} max={30} step={0.5}
                  onChange={(v: number) => setConfig(c => ({...c, gravityStrength: v}))}
                />
                
                {/* Posicionamento Espacial */}
                <div className="pt-2 grid grid-cols-2 gap-4">
                  <ScannerSlider 
                    label="Posição X" value={config.bhPosX} min={-20} max={20} step={0.1}
                    onChange={(v: number) => setConfig(c => ({...c, bhPosX: v}))}
                  />
                  <ScannerSlider 
                    label="Posição Y" value={config.bhPosY} min={-20} max={20} step={0.1}
                    onChange={(v: number) => setConfig(c => ({...c, bhPosY: v}))}
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <ScannerSlider 
                    label="Rot X" value={config.bhRotX} min={-180} max={180} step={1}
                    onChange={(v: number) => setConfig(c => ({...c, bhRotX: v}))}
                  />
                  <ScannerSlider 
                    label="Rot Y" value={config.bhRotY} min={-180} max={180} step={1}
                    onChange={(v: number) => setConfig(c => ({...c, bhRotY: v}))}
                  />
                  <ScannerSlider 
                    label="Rot Z" value={config.bhRotZ} min={-180} max={180} step={1}
                    onChange={(v: number) => setConfig(c => ({...c, bhRotZ: v}))}
                  />
                </div>
                <ScannerSlider 
                  label="Auto Rotation Y" value={config.bhAutoRotateSpeed} min={0} max={50} step={0.5}
                  onChange={(v: number) => setConfig(c => ({...c, bhAutoRotateSpeed: v}))}
                />
              </div>

              {/* Accretion Disk Section */}
              <div className="pt-4 border-t border-white/5 space-y-4">
                <span className="text-[9px] uppercase text-[#29BDF2] block tracking-widest">02. Accretion Disk</span>
                <ScannerSlider 
                  label="Disk Tilt" value={config.diskTilt} min={-45} max={45} step={1}
                  onChange={(v: number) => setConfig(c => ({...c, diskTilt: v}))}
                />
                <ScannerSlider 
                  label="Orbital Speed" value={config.diskSpeed} min={0.1} max={10.0} step={0.1}
                  onChange={(v: number) => setConfig(c => ({...c, diskSpeed: v}))}
                />
                <ScannerSlider 
                  label="Disk Opacity" value={config.diskOpacity} min={0} max={1} step={0.05}
                  onChange={(v: number) => setConfig(c => ({...c, diskOpacity: v}))}
                />
                <div className="grid grid-cols-2 gap-4">
                  <ScannerSlider 
                    label="Inner Multi" value={config.diskInnerRel} min={1.1} max={3.0} step={0.1}
                    onChange={(v: number) => setConfig(c => ({...c, diskInnerRel: v}))}
                  />
                  <ScannerSlider 
                    label="Outer Multi" value={config.diskOuterRel} min={4.0} max={12.0} step={0.1}
                    onChange={(v: number) => setConfig(c => ({...c, diskOuterRel: v}))}
                  />
                </div>
              </div>

              {/* Color & Light Section */}
              <div className="pt-4 border-t border-white/5 space-y-4">
                <span className="text-[9px] uppercase text-[#29BDF2] block tracking-widest">03. Chromatic Engine</span>
                <ScannerSlider 
                  label="Global Hue" value={config.hue} min={0} max={360} step={1}
                  onChange={(v: number) => setConfig(c => ({...c, hue: v}))}
                />
                <ScannerSlider 
                  label="Saturation" value={config.saturation} min={0} max={1} step={0.01}
                  onChange={(v: number) => setConfig(c => ({...c, saturation: v}))}
                />
                <ScannerSlider 
                  label="Luminance" value={config.lightness} min={0.1} max={0.9} step={0.01}
                  onChange={(v: number) => setConfig(c => ({...c, lightness: v}))}
                />
              </div>

              {/* Atmosphere Section */}
              <div className="pt-4 border-t border-white/5 space-y-4">
                <span className="text-[9px] uppercase text-[#29BDF2] block tracking-widest">04. Atmosphere</span>
                <ScannerSlider 
                  label="Void Grid Alpha" value={config.gridOpacity} min={0} max={0.1} step={0.001}
                  onChange={(v: number) => setConfig(c => ({...c, gridOpacity: v}))}
                />
                <ScannerSlider 
                  label="Volumetric Fog" value={config.fogOpacity} min={0} max={0.1} step={0.001}
                  onChange={(v: number) => setConfig(c => ({...c, fogOpacity: v}))}
                />
                <ScannerSlider 
                  label="Parallax Scale" value={config.asteroidParallax} min={0} max={5.0} step={0.1}
                  onChange={(v: number) => setConfig(c => ({...c, asteroidParallax: v}))}
                />
              </div>

              {/* Camera & Optics Section */}
              <div className="pt-4 border-t border-white/5 space-y-4">
                <span className="text-[9px] uppercase text-[#29BDF2] block tracking-widest">05. Optical Post</span>
                <ScannerSlider 
                  label="Anamorphic Bloom" value={config.bloomStrength} min={0} max={5} step={0.1}
                  onChange={(v: number) => setConfig(c => ({...c, bloomStrength: v}))}
                />
                <ScannerSlider 
                  label="Flare Intensity" value={config.flareIntensity} min={0} max={1} step={0.01}
                  onChange={(v: number) => setConfig(c => ({...c, flareIntensity: v}))}
                />
                <ScannerSlider 
                  label="Digital Grain" value={config.grainIntensity} min={0} max={0.2} step={0.01}
                  onChange={(v: number) => setConfig(c => ({...c, grainIntensity: v}))}
                />
                <ScannerSlider 
                  label="Exposure" value={config.exposure} min={0.1} max={2.0} step={0.05}
                  onChange={(v: number) => setConfig(c => ({...c, exposure: v}))}
                />
              </div>
              
              <div className="pt-6 border-t border-white/10">
                <div className="bg-white/5 p-3 rounded-none">
                  <p className="text-[8px] text-white/40 uppercase leading-loose font-mono">
                    System: Stark High-Fidelity V3.4<br/>
                    Status: Art Direction Mode Active<br/>
                    Hotkeys: Shift+H (Toggle)
                  </p>
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
        value={typeof value === 'number' ? parseFloat(value.toFixed(3)) : value}
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
