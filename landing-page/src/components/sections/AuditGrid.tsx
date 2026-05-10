"use client";

import { motion } from "framer-motion";

const dimensions = [
  { id: 1, title: "Intensidade da Dor", desc: "Mapeamento da urgência real do problema no cotidiano do usuário." },
  { id: 2, title: "Frequência de Uso", desc: "Análise da recorrência da dor e a janela de oportunidade de solução." },
  { id: 3, title: "Tamanho do Mercado", desc: "Auditoria quantitativa de potenciais adotantes e expansão vertical." },
  { id: 4, title: "Soluções Atuais", desc: "Estudo do 'status quo' e das alternativas precárias utilizadas hoje." },
  { id: 5, title: "Barreira de Troca", desc: "Cálculo do esforço cognitivo e financeiro para migração do usuário." },
  { id: 6, title: "Capacidade de Execução", desc: "Validação da viabilidade técnica e operacional para entrega do valor." },
  { id: 7, title: "Modelo de Monetização", desc: "Teste de estresse sobre a disposição a pagar e geração de caixa." },
  { id: 8, title: "Custo de Aquisição", desc: "Projeção de eficiência de canais e sustentabilidade de marketing." },
];

export const AuditGrid = () => {
  return (
    <section id="method" className="px-6 bg-ds-bg-1">
      <div className="max-w-[1000px] mx-auto">
        <div className="mb-48 flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="font-mono text-[10px] tracking-[0.4em] uppercase text-ds-c-9 mb-6 block"
            >
              Metodologia SIID
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight mb-8">
              As 8 Dimensões da <br /> <span className="text-ds-c-9 font-sans font-normal italic">Sobrevivência de Mercado.</span>
            </h2>
          </div>
          <div className="flex items-center gap-4 border-l border-ds-c-4 pl-10 h-20">
             <div className="text-4xl font-bold tracking-tighter">08</div>
             <div className="text-[10px] font-mono leading-tight tracking-widest text-ds-c-9 uppercase">
               Critérios de <br /> Auditoria
             </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dimensions.map((dim, i) => (
            <motion.div 
              key={dim.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="group relative siid-molding p-10 overflow-hidden"
            >
              <span className="font-mono text-[11px] text-ds-c-9 mb-8 block group-hover:text-ds-c-10 transition-colors">DIM_0{dim.id}</span>
              <h3 className="text-xl font-bold mb-4 tracking-tight">{dim.title}</h3>
              <p className="text-sm text-ds-c-9 leading-relaxed opacity-80">
                {dim.desc}
              </p>
              
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-ds-c-10 group-hover:w-full transition-all duration-1000 ease-bugatti" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
