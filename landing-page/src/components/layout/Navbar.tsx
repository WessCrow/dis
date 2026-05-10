"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between header-container py-4 backdrop-blur-[12px] bg-ds-bg-1/5 border-b border-ds-c-4"
    >
      <Link href="/" className="flex items-center gap-3 group">
        <img src="/img/Dis-branco-vert-txt.svg" alt="Disrupta" className="h-7 w-auto" />
      </Link>
      
      <div className="flex items-center gap-6">
        <div className="hidden lg:flex items-center gap-8 mr-4">
          <Link href="#method" className="text-[10px] font-mono tracking-[0.2em] uppercase text-ds-c-9 hover:text-ds-c-10 transition-colors">Metodologia</Link>
          <Link href="#pricing" className="text-[10px] font-mono tracking-[0.2em] uppercase text-ds-c-9 hover:text-ds-c-10 transition-colors">Planos</Link>
        </div>

        <div className="flex items-center gap-6 ml-4 pl-6 border-l border-white/10">
          <a 
            href="mailto:hi@disrupta.app" 
            className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-white/60 hover:text-white transition-all group"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-80 group-hover:opacity-100">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <span className="hidden xl:inline">hi@disrupta.app</span>
          </a>

          <Link href="#access" className="px-4 py-2 border border-white rounded-none text-[10px] font-mono tracking-[0.2em] uppercase text-white hover:bg-white hover:text-black transition-all duration-300">
            Solicitar Acesso
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};
