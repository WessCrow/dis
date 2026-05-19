// HudButton.jsx — Brutalist CTA with HUD micro-interaction.
//
// On hover:
//   1. Four L-shaped corner brackets fly in from outside (target acquisition)
//   2. A thin scan line sweeps top→bottom inside the button
//   3. A "TARGET_LOCK: NOMINAL" telemetry readout fades in below
//   4. Magnetic pull on the button (small translation following the cursor)
//   5. Subtle border-color brighten + corner blink
//
// Used in the hero CTA + final CTA.

const HudButton = ({
  children,
  href = "#",
  status = "TARGET_LOCK: NOMINAL",
  size = "lg",   // "md" | "lg"
  tone = "blue", // "blue" | "white"
}) => {
  const ref = React.useRef(null);
  const [hover, setHover] = React.useState(false);
  const [pos, setPos] = React.useState({ x: 0, y: 0 });

  // Magnetic pull
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * 0.25;
    const y = (e.clientY - (r.top + r.height / 2)) * 0.25;
    setPos({ x, y });
  };
  const onLeave = () => { setHover(false); setPos({ x: 0, y: 0 }); };

  const accent = tone === "blue" ? "#3291ff" : "#ffffff";
  const accentSoft = tone === "blue" ? "rgba(50,145,255,0.55)" : "rgba(255,255,255,0.55)";

  const padding = size === "lg" ? "20px 48px" : "14px 28px";
  const fontSize = size === "lg" ? 14 : 12;

  const wrapStyle = {
    position: "relative",
    display: "inline-block",
    padding: "32px 32px 56px",  // outer hit area for brackets + status
    margin: "-32px -32px -56px",
    pointerEvents: "none",      // brackets/status are decorative; button gets pointer-events:auto
  };

  return (
    <div
      style={wrapStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={onLeave}
      onMouseMove={onMove}
    >
      {/* Telemetry readout — below the button */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "50%",
          bottom: 24,
          transform: `translateX(-50%) translateY(${hover ? 0 : 6}px)`,
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: "0.32em",
          textTransform: "uppercase",
          color: accent,
          opacity: hover ? 1 : 0,
          transition: "opacity 250ms cubic-bezier(0.16,1,0.3,1), transform 250ms cubic-bezier(0.16,1,0.3,1)",
          whiteSpace: "nowrap",
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            width: 6, height: 6, background: accent,
            animation: hover ? "hudBlink 1.1s infinite" : "none",
          }}
        />
        {status}
      </div>

      {/* Four L-corner brackets — start outside, slide in to button edge on hover */}
      {[
        { top: 0,   left: 0,   path: "M0,12 L0,0 L12,0",  origin: "top left",     idle: { tx: -12, ty: -12 } },
        { top: 0,   right: 0,  path: "M0,0 L12,0 L12,12", origin: "top right",    idle: { tx: 12,  ty: -12 } },
        { bottom: 0,left: 0,   path: "M0,0 L0,12 L12,12", origin: "bottom left",  idle: { tx: -12, ty: 12  } },
        { bottom: 0,right: 0,  path: "M0,12 L12,12 L12,0",origin: "bottom right", idle: { tx: 12,  ty: 12  } },
      ].map((b, i) => (
        <svg
          key={i}
          aria-hidden="true"
          width="12" height="12" viewBox="0 0 12 12"
          style={{
            position: "absolute",
            ...(b.top != null ? { top: b.top } : {}),
            ...(b.bottom != null ? { bottom: b.bottom } : {}),
            ...(b.left != null ? { left: b.left } : {}),
            ...(b.right != null ? { right: b.right } : {}),
            transform: hover ? "translate(0,0)" : `translate(${b.idle.tx}px, ${b.idle.ty}px)`,
            opacity: hover ? 1 : 0,
            transition: "transform 350ms cubic-bezier(0.16,1,0.3,1), opacity 250ms cubic-bezier(0.16,1,0.3,1)",
            pointerEvents: "none",
            zIndex: 3,
          }}
        >
          <path d={b.path} fill="none" stroke={accent} strokeWidth="1.5" />
        </svg>
      ))}

      {/* Coordinate ticks — top/bottom center, small "+" reticle */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", top: -4, left: "50%", transform: "translateX(-50%)",
          fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.2em",
          color: accentSoft, opacity: hover ? 1 : 0,
          transition: "opacity 200ms 100ms",
          pointerEvents: "none",
        }}
      >
        ▼
      </div>

      {/* The actual button — magnetic pull, scan line overlay */}
      <a
        ref={ref}
        href={href}
        className="btn-primary"
        style={{
          position: "relative",
          pointerEvents: "auto",
          padding,
          fontSize,
          borderColor: hover ? "#fff" : "#fff",
          color: hover ? "#000" : "#fff",
          background: hover ? "#fff" : "transparent",
          transform: `translate(${pos.x}px, ${pos.y}px)`,
          transition: "background 220ms cubic-bezier(0.16,1,0.3,1), color 220ms cubic-bezier(0.16,1,0.3,1), transform 600ms cubic-bezier(0.16,1,0.3,1), border-color 220ms",
          overflow: "hidden",
          zIndex: 2,
          textDecoration: "none",
          display: "inline-flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        {/* Scan line — sweeps top to bottom on hover */}
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 0, right: 0,
            top: hover ? "100%" : "-2px",
            height: 2,
            background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
            boxShadow: `0 0 12px ${accent}`,
            opacity: hover ? 0.9 : 0,
            transition: hover
              ? "top 900ms linear, opacity 80ms"
              : "opacity 200ms",
            pointerEvents: "none",
          }}
        />
        <span style={{ position: "relative", zIndex: 1, letterSpacing: "0.1em" }}>{children}</span>
        <span
          aria-hidden="true"
          style={{
            position: "relative", zIndex: 1, fontFamily: "var(--font-mono)",
            fontSize: 14, opacity: 0.8,
            transform: hover ? "translateX(4px)" : "translateX(0)",
            transition: "transform 220ms cubic-bezier(0.16,1,0.3,1)",
          }}
        >→</span>
      </a>
    </div>
  );
};

Object.assign(window, { HudButton });
