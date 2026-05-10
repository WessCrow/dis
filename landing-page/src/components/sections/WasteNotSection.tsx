"use client";

import { motion } from "framer-motion";
import { ScannerCardStream } from "../ScannerCardStream";

export const WasteNotSection = () => {
  return (
    <section className="pt-48 pb-24 bg-ds-bg-1 border-t border-white/5 overflow-hidden">
      <div className="max-w-[1000px] mx-auto px-6 mb-48">
        <motion.span 
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="font-mono text-[10px] tracking-[0.4em] uppercase text-ds-c-9 mb-6 block"
        >
          Oportunidade Blindada
        </motion.span>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-[0.95] mb-8 text-white">
          Não desperdice <br /> 
          <span className="text-ds-c-10 italic">ideia.</span>
        </h2>
        <p className="text-lg text-ds-c-9 max-w-xl leading-relaxed opacity-80">
          Muitos criadores estão deixando dinheiro na mesa por não saber como continuar. 
          O protocolo Disrupta transforma o "e se?" em um roadmap documental de execução.
        </p>
      </div>

      <div className="w-full">
        <ScannerCardStream />
      </div>
    </section>
  );
};
