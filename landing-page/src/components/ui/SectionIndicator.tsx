"use client";

import { useEffect, useState, useRef, useCallback } from "react";

const SECTIONS = [
  { id: "hero",       label: "Home" },
  { id: "validation", label: "Diagnóstico" },
  { id: "waste",      label: "Oportunidade" },
  { id: "method",     label: "Auditoria" },
  { id: "access",     label: "Missão" },
];

export const SectionIndicator = () => {
  const [fills, setFills] = useState<number[]>(SECTIONS.map(() => 0));
  const [activeIdx, setActiveIdx] = useState(0);
  const [visible, setVisible] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const rafRef = useRef<number | null>(null);

  // Mirror Navbar: hide when footer enters viewport
  useEffect(() => {
    const el = document.querySelector("[data-footer-trigger]");
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0.01 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const update = useCallback(() => {
    const sy = window.scrollY;
    const vh = window.innerHeight;
    const newFills: number[] = [];
    let newActive = 0;

    SECTIONS.forEach(({ id }, i) => {
      const el = document.getElementById(id);
      if (!el) { newFills.push(0); return; }

      const top = el.getBoundingClientRect().top + sy;
      const h = el.offsetHeight;

      const raw = Math.max(0, Math.min(1, (sy - top) / h));
      // Dead zone: ignore fills below 8% to prevent the residual line on first appear
      newFills.push(raw < 0.08 ? 0 : raw);

      if (sy + vh * 0.45 >= top) newActive = i;
    });

    setVisible(sy > 80);
    setFills(newFills);
    setActiveIdx(newActive);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    const raf = requestAnimationFrame(() => { setTimeout(update, 50); });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      cancelAnimationFrame(raf);
    };
  }, [update]);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const isShowing = visible && !footerVisible;

  return (
    <div
      className="fixed z-40 flex items-center"
      style={{
        right: "2rem",
        top: "50%",
        transform: "translateY(-50%)",
        height: "80vh",
        pointerEvents: "none",
        opacity: isShowing ? 1 : 0,
        transition: "opacity 0.4s ease",
      }}
    >
      <div
        className="relative flex flex-col h-full"
        style={{ width: "2px", gap: "6px" }}
      >
        {SECTIONS.map(({ id, label }, i) => {
          const isActive = activeIdx === i;
          const fill = fills[i];

          return (
            <div
              key={id}
              onClick={() => scrollTo(id)}
              style={{
                flex: 1,
                position: "relative",
                background: "rgba(255,255,255,0.08)",
                cursor: "pointer",
                pointerEvents: "auto",
                transformOrigin: "center",
                transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scaleX(3)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scaleX(1)")}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: `${fill * 100}%`,
                  background: "#fff",
                  transition: "height 0.1s linear",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "calc(100% + 14px)",
                  transform: "translateY(-50%)",
                  whiteSpace: "nowrap",
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: "clamp(0.7rem, 1vw, 0.85rem)",
                  letterSpacing: "0.02em",
                  color: "#fff",
                  opacity: isActive ? 1 : 0,
                  transition: "opacity 0.4s ease",
                  pointerEvents: "none",
                  userSelect: "none",
                }}
              >
                {label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
