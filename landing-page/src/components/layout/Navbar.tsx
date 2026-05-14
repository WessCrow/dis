"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { MagneticButton } from "@/components/ui/MagneticButton";

export const Navbar = () => {
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const footerEl = document.querySelector("[data-footer-trigger]");
    if (!footerEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0.01 }
    );

    observer.observe(footerEl);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={
        footerVisible
          ? { y: -64, opacity: 0, pointerEvents: "none" }
          : { y: 0,   opacity: 1, pointerEvents: "auto" }
      }
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between header-container py-4 backdrop-blur-[12px] bg-ds-bg-1/5 border-b border-white/10"
    >
      <Link href="/" className="flex items-center gap-3 group">
        <img src="/img/Dis-branco-vert-txt.svg" alt="Disrupta" className="h-7 w-auto" />
      </Link>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-6">
          <a
            href="mailto:hi@disrupta.app"
            aria-label="Enviar email para hi@disrupta.app"
            className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-white/60 hover:text-white transition-all group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/50"
          >
            <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-80 group-hover:opacity-100">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <span aria-hidden="true" className="hidden xl:inline">hi@disrupta.app</span>
          </a>

          <MagneticButton
            href="#access"
            className="btn-primary !w-auto !min-h-0 !px-4 !py-2 !border-white !text-white hover:!bg-white hover:!text-black relative overflow-hidden group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Solicitar acesso ao Disrupta"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl bg-white" />
            Solicitar Acesso
          </MagneticButton>
        </div>
      </div>
    </motion.nav>
  );
};
