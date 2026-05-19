# Website UI Kit — Disrupta Landing

Static React + Babel recreation of `landing-page/src/app/page.tsx` from the canonical repo.

## Sections
- `Nav.jsx` — fixed top navigation (logo + mailto + Solicitar Acesso CTA)
- `Hero.jsx` — full-viewport hero with dot-grid background, rotating headline, primary CTA
- `AuditGrid.jsx` — 8-dimension SIID audit timeline; icon size grows from 96px → 288px to simulate camera recession
- `FinalCTA.jsx` — bottom "Comando de Missão" final CTA

## How to view
Open `index.html`. All sections use real Disrupta tokens from `../../colors_and_type.css` and real classes from the canonical `globals.css` (`.btn-primary`, `.btn-ghost`, `.siid-molding`).

## Differences from production
- Framer Motion animations replaced with CSS transitions / IntersectionObserver
- WovenLightHero Three.js engine replaced with a static dot-grid + radial-gradient pattern (the full version uses a Three.js black-hole shader)
- Lucide icons replaced with simple inline geometric SVGs for the 8 SIID dimensions

## Design width
1440px desktop. Responsive down to 768px.
