import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { AuditGrid } from "@/components/sections/AuditGrid";
import { DoomSection } from "@/components/sections/DoomSection";
import { ValidationRigor } from "@/components/sections/ValidationRigor";
import { WasteNotSection } from "@/components/sections/WasteNotSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-ds-bg-1 selection:bg-ds-blue selection:text-white">
      <Navbar />
      
      <Hero />
      
      <ValidationRigor />

      <WasteNotSection />
      
      <div id="method">
        <AuditGrid />
      </div>
      
      <DoomSection />
      
      {/* Footer CTA Final */}
      <section className="py-48 px-6 text-center border-t border-ds-c-4 bg-ds-bg-2 relative">
        <div className="max-w-4xl mx-auto">
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-ds-c-9 mb-8 block">Veredito Final</span>
          <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-14 leading-[0.95]">
            O autoengano é o imposto mais caro da inovação. <br />
            <span className="text-ds-c-9">Pare de pagá-lo hoje.</span>
          </h2>
          
          <div className="flex flex-col items-center gap-6">
            <button className="px-14 py-6 bg-ds-c-10 text-ds-bg-1 font-bold text-xs tracking-[0.2em] uppercase hover:bg-ds-blue transition-all duration-1000 ease-bugatti">
               Acessar Protocolo de Validação
            </button>
            <p className="text-[10px] font-mono uppercase tracking-widest text-ds-c-9">
              Interface Stark Mode. Resposta técnica em tempo real.
            </p>
          </div>
        </div>

        {/* Decorative Radial */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-t from-ds-blue/5 to-transparent pointer-events-none" />
      </section>

      {/* Footer Minimalista */}
      <footer className="py-12 px-8 border-t border-ds-c-4 flex flex-col md:flex-row justify-between items-center gap-8 bg-ds-bg-1">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border border-ds-c-4 flex items-center justify-center text-[10px] font-bold">D</div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-ds-c-9">© 2026 Disrupta Lab</span>
        </div>
        <div className="flex gap-8 text-[10px] font-mono tracking-widest uppercase text-ds-c-9">
          <a href="#" className="hover:text-white transition-colors">Termos</a>
          <a href="#" className="hover:text-white transition-colors">Privacidade</a>
          <a href="#" className="hover:text-white transition-colors">Audit API</a>
        </div>
      </footer>
    </main>
  );
}
