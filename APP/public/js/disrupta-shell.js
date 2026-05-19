/**
 * Disrupta Shell — Componentes compartilhados da interface (Background Interativo, Float Dash, Header).
 * Aplicado em todas as páginas para manter a paridade visual da "Interface de Pensamento Intelectual".
 */
(function () {
  'use strict';

  const body = document.body;
  const mqReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mqFine = window.matchMedia('(pointer: fine)');

  /**
   * 1. Sparkle Field — Fundo interativo reativo ao mouse.
   */
  (function initSparkleField() {
    const CELL = 24;
    const REPULSE_R = 180;
    const REPULSE_R2 = REPULSE_R * REPULSE_R;
    const MAX_PUSH = 44;
    const EASE = 0.16;

    const canvas = document.createElement('canvas');
    canvas.id = 'lab-sparkle-field';
    canvas.setAttribute('aria-hidden', 'true');
    
    // Insere no início do body para ficar atrás de tudo
    if (body.firstChild) body.insertBefore(canvas, body.firstChild);
    else body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let dpr = 1;
    const particles = [];
    let mx = -1e9;
    let my = -1e9;
    let raf = 0;

    function pushGrid(offsetX, offsetY, layer) {
      const w = window.innerWidth;
      const h = window.innerHeight;
      for (let gx = offsetX; gx <= w + CELL; gx += CELL) {
        for (let gy = offsetY; gy <= h + CELL; gy += CELL) {
          particles.push({
            ox: gx,
            oy: gy,
            x: gx,
            y: gy,
            phase: (gx * 0.09 + gy * 0.07) % 6.28318,
            layer,
          });
        }
      }
    }

    function rebuild() {
      cancelAnimationFrame(raf);
      particles.length = 0;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      pushGrid(0, 0, 0);
      pushGrid(CELL * 0.5, CELL * 0.5, 1);

      function frame(t) {
        const cw = window.innerWidth;
        const ch = window.innerHeight;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, cw, ch);

        const repulseOn = mqFine.matches && !mqReduceMotion.matches;
        const time = t * 0.001;

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          let tx = p.ox;
          let ty = p.oy;
          if (repulseOn) {
            const dx = p.ox - mx;
            const dy = p.oy - my;
            const d2 = dx * dx + dy * dy;
            if (d2 < REPULSE_R2 && d2 > 0.25) {
              const d = Math.sqrt(d2);
              const fall = 1 - d / REPULSE_R;
              const push = MAX_PUSH * fall * fall;
              tx += (dx / d) * push;
              ty += (dy / d) * push;
            }
          }
          p.x += (tx - p.x) * EASE;
          p.y += (ty - p.y) * EASE;

          let base = p.layer ? 0.2 : 0.1;
          if (!mqReduceMotion.matches) {
            base *= 0.78 + 0.22 * (0.5 + 0.5 * Math.sin(time * 2.1 + p.phase));
          }
          const sz = p.layer ? 1.05 : 0.72;
          ctx.fillStyle = p.layer ? `rgba(165,165,165,${base})` : `rgba(255,255,255,${base})`;
          ctx.fillRect(p.x - sz * 0.5, p.y - sz * 0.5, sz, sz);
        }
        raf = requestAnimationFrame(frame);
      }
      raf = requestAnimationFrame(frame);
    }

    function onMove(ev) {
      mx = ev.clientX;
      my = ev.clientY;
    }

    function parkPointer() {
      mx = -1e9;
      my = -1e9;
    }

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('blur', parkPointer, { passive: true });
    window.addEventListener('resize', rebuild, { passive: true });
    
    mqReduceMotion.addEventListener('change', rebuild);
    mqFine.addEventListener('change', rebuild);

    rebuild();
  })();

  /**
   * 2. Float Dash — Menu lateral expansível e efeito dock.
   */
  (function initFloatDash() {
    const dash = document.getElementById('float-dash');
    if (!dash) return;

    const surface = dash.querySelector('.float-dash__surface');
    const collapsed = document.getElementById('float-dash-collapsed');
    const expanded = document.getElementById('float-dash-expanded');
    const btnOpen = document.getElementById('float-dash-open');
    const btnClose = document.getElementById('float-dash-close');

    if (btnOpen && btnClose && expanded && collapsed) {
      btnOpen.addEventListener('click', () => {
        dash.dataset.expanded = 'true';
        expanded.hidden = false;
        collapsed.setAttribute('aria-hidden', 'true');
      });
      btnClose.addEventListener('click', () => {
        dash.dataset.expanded = 'false';
        expanded.hidden = true;
        collapsed.setAttribute('aria-hidden', 'false');
      });
    }

    // Proximidade (Dock Effect)
    if (surface && collapsed && mqFine.matches && !mqReduceMotion.matches) {
      const INFL = 52;
      const MAX_SCALE = 1.14;
      const MAX_LIFT = 8;

      function paintDock(clientX, clientY) {
        if (dash.dataset.expanded === 'true') return;
        const nodes = collapsed.querySelectorAll('.float-dash__icon-btn');
        nodes.forEach(el => {
          const r = el.getBoundingClientRect();
          const cx = r.left + r.width * 0.5;
          const cy = r.top + r.height * 0.5;
          const d = Math.hypot(clientX - cx, clientY - cy);
          if (d > INFL * 1.75) {
            el.style.transform = '';
            el.style.zIndex = '';
            return;
          }
          const t = Math.max(0, 1 - d / INFL);
          const s = t * t * (3 - 2 * t);
          const scale = 1 + s * (MAX_SCALE - 1);
          const lift = s * MAX_LIFT;
          el.style.transform = `translateY(${(-lift).toFixed(2)}px) scale(${scale.toFixed(3)})`;
          el.style.zIndex = String(10 + Math.round(s * 24));
        });
      }

      surface.addEventListener('pointermove', (ev) => paintDock(ev.clientX, ev.clientY), { passive: true });
      surface.addEventListener('pointerleave', () => {
        collapsed.querySelectorAll('.float-dash__icon-btn').forEach(el => {
          el.style.transform = '';
          el.style.zIndex = '';
        });
      }, { passive: true });
    }
  })();

})();
