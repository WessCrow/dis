import { Navbar } from "@/components/layout/Navbar";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { AuditGrid } from "@/components/sections/AuditGrid";
import { ValidationRigor } from "@/components/sections/ValidationRigor";
import { WasteNotSection } from "@/components/sections/WasteNotSection";
import { SectionIndicator } from "@/components/ui/SectionIndicator";

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen selection:bg-ds-blue selection:text-white">
      <Navbar />
      <SectionIndicator />

      <div id="hero"><Hero /></div>

      <div id="validation"><ValidationRigor /></div>

      <div id="waste"><WasteNotSection /></div>

      <section id="method">
        <AuditGrid />
      </section>

      {/* Footer CTA Final */}
      <section id="access" className="py-32 px-6 text-center border-t border-white/10 bg-transparent relative">
        <div className="max-w-[1000px] mx-auto relative z-10">
          <span className="font-mono text-[10px] tracking-[0.5em] uppercase text-ds-c-9 mb-8 block">Comando de Missão</span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-14">
            Unicórnio ou rastro de poeira? <br />
            <span className="text-white/70">O horizonte de eventos não aceita desculpas.</span>
          </h2>

          <div className="flex flex-col items-center gap-6">
            <MagneticButton
              type="button"
              className="btn-primary !w-auto px-14 py-6 !border-white !text-white hover:!bg-white hover:!text-black relative overflow-hidden group focus:ring-2 focus:ring-white focus:outline-none"
              aria-label="Executar protocolo Disrupta de validação técnica"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl bg-white" />
              Executar Protocolo Disrupta
            </MagneticButton>
            <p className="text-[10px] font-mono uppercase tracking-widest text-white/50">
              Interface Stark Mode. Auditoria técnica em tempo real. Sem ruído. Sem achismo.
            </p>
          </div>
        </div>

        {/* Decorative Radial */}
        <div aria-hidden="true" className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-t from-ds-blue/5 to-transparent pointer-events-none" />
      </section>

      <Footer />
    </main>
  );
}
