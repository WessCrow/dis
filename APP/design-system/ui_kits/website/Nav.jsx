// Nav.jsx — Disrupta fixed top navigation
// Mirrors landing-page/src/components/layout/Navbar.tsx

const Nav = () => {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navStyle = {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "16px clamp(16px, 5vw, 40px)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    background: scrolled ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0.05)",
    borderBottom: "1px solid rgba(255,255,255,0.10)",
    transition: "background 250ms cubic-bezier(0.16, 1, 0.3, 1)",
  };
  const linkStyle = {
    display: "inline-flex", alignItems: "center", gap: 8,
    fontFamily: "var(--font-mono)", fontSize: 10,
    letterSpacing: "0.2em", textTransform: "uppercase",
    color: "rgba(255,255,255,0.6)", textDecoration: "none",
    transition: "color 200ms cubic-bezier(0.16, 1, 0.3, 1)",
  };

  return (
    <nav style={navStyle}>
      <a href="#" aria-label="Disrupta — início" style={{ display: "inline-flex" }}>
        <img src="../../assets/logo-txt-white.svg" alt="Disrupta" style={{ height: 28 }} />
      </a>
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <a
          href="mailto:hi@disrupta.app"
          style={linkStyle}
          onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
        >
          <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          <span>hi@disrupta.app</span>
        </a>
        <a
          href="#access"
          className="btn-primary"
          style={{ borderColor: "#fff", color: "#fff", minHeight: 0, padding: "8px 16px" }}
          onMouseEnter={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#000"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#fff"; }}
        >
          Solicitar Acesso
        </a>
      </div>
    </nav>
  );
};

Object.assign(window, { Nav });
