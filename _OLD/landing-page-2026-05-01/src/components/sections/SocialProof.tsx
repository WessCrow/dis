"use client";

import { motion } from "framer-motion";

export const SocialProof = () => {
  return (
    <section className="py-24 px-6 bg-ds-bg-1 border-y border-ds-c-4 overflow-hidden">
      <div className="max-w-[1000px] mx-auto flex flex-col items-center">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono text-[10px] tracking-[0.4em] uppercase text-ds-c-9 mb-16 block"
        >
          Validação & Rigor Institucional
        </motion.span>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-32">
          <motion.div 
            initial={{ opacity: 0.2, filter: "grayscale(100%)" }}
            whileInView={{ opacity: 0.4 }}
            whileHover={{ opacity: 1, filter: "grayscale(0%)" }}
            viewport={{ once: true }}
            className="flex items-center gap-5 cursor-help transition-all duration-1000 ease-bugatti"
          >
            {/* Einstein Placeholder Icon */}
            <div className="w-14 h-14 border border-ds-c-4 flex items-center justify-center font-bold text-xl tracking-tighter">
              HIAE
            </div>
            <div className="text-left">
               <div className="text-sm font-bold uppercase tracking-tight leading-none mb-1 text-white md:text-ds-c-10">Hospital Israelita</div>
               <div className="text-[11px] font-mono uppercase tracking-widest text-ds-c-9">Albert Einstein</div>
            </div>
          </motion.div>
          
          <div className="hidden md:block h-12 w-px bg-ds-c-4" />
          
          <motion.div 
            initial={{ opacity: 0.2 }}
            whileInView={{ opacity: 0.5 }}
            whileHover={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center group transition-all duration-700"
          >
            <div className="text-3xl font-bold tracking-tighter mb-1 group-hover:text-ds-blue transition-colors">Metodologia SIID</div>
            <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-ds-c-9">Padrão Ouro para Triagem de Inovação</div>
          </motion.div>

          <div className="hidden md:block h-12 w-px bg-ds-c-4" />

          <motion.div 
            initial={{ opacity: 0.2 }}
            whileInView={{ opacity: 0.4 }}
            whileHover={{ opacity: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <div className="text-2xl font-bold tracking-tighter text-white md:text-ds-c-10">+450</div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-ds-c-9">Ideias Auditadas</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
