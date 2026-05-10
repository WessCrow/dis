"use client";

import { motion } from "framer-motion";

const pains = [
  { 
    title: "O 'Pitch Bonito' sem lastro", 
    desc: "Você convence o palco, mas o modelo de negócio quebra no primeiro cenário de crise. Sem auditoria, o carisma é apenas um risco oculto." 
  },
  { 
    title: "Inovação por Vaidade", 
    desc: "Gastar meses codando uma solução sofisticada para um problema que ninguém está disposto a pagar para resolver. O cemitério de MVPs é feito de vaidade." 
  },
  { 
    title: "Risco de Cauda Invisível", 
    desc: "Onde exatamente uma fraude ou um churn de 5% destrói sua margem alvo? Se você não sabe o ponto de ruptura, você não tem um negócio." 
  },
];

export const DoomSection = () => {
  return (
    <section className="py-48 px-6 bg-black relative overflow-hidden">
      {/* Background Vignette */}
      <div className="absolute inset-0 bg-radial-[at_center,_var(--ds-bg-1)_0%,_transparent_70%] opacity-40 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div className="sticky top-40">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-mono text-[10px] tracking-[0.5em] uppercase text-ds-red mb-8 block font-bold"
            >
              Protocolo de Realidade
            </motion.span>
            <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-12 leading-[0.9] text-white">
              Você está operando sob a <br />
              <span className="text-ds-red italic underline decoration-1 underline-offset-8">Ilusão de Demanda?</span>
            </h2>
            <p className="text-xl text-ds-c-9 mb-12 max-w-lg leading-relaxed">
              A maioria dos negócios falha não por falta de tecnologia, mas por excesso de autoengano. <br /><br />
              <strong className="text-white">O autoengano é o imposto mais caro da inovação.</strong> Pare de pagá-lo hoje com o filtro de sobrevivência Disrupta.
            </p>
          </div>
          
          <div className="space-y-16 pt-12">
            {pains.map((pain, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: i * 0.15, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="group relative border-l border-ds-red/30 pl-12 py-4 hover:border-ds-red transition-colors duration-700"
              >
                <div className="absolute left-[-2px] top-4 w-1 h-8 bg-ds-red scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" />
                <h3 className="text-3xl font-bold mb-6 tracking-tight text-white group-hover:text-ds-red transition-colors duration-500">{pain.title}</h3>
                <p className="text-lg text-ds-c-9 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                  {pain.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Red Glow */}
      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-ds-red/5 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
};
