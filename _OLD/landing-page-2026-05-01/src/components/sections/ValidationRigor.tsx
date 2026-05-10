"use client";

import { ReactLenis } from "lenis/react";
import { useTransform, motion, useScroll, MotionValue } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface ProjectData {
  title: string;
  description: string;
  link: string;
  color: string;
  tag: string;
}

interface CardProps {
  i: number;
  title: string;
  description: string;
  url: string;
  color: string;
  tag: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

const Card = ({
  i,
  title,
  description,
  url,
  color,
  tag,
  progress,
  range,
  targetScale,
}: CardProps) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.5, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky top-0"
    >
      <motion.div
        style={{
          backgroundColor: color,
          scale,
          top: `calc(10vh + ${i * 30}px)`,
          zIndex: i,
        }}
        className={cn(
          "flex flex-col relative h-[500px] w-[90%] md:w-[75%] rounded-2xl border border-white/10 overflow-hidden shadow-2xl origin-top backdrop-blur-xl",
          "bg-gradient-to-br from-white/5 to-transparent"
        )}
      >
        <div className="p-8 md:p-12 flex flex-col h-full">
          <div className="flex justify-between items-start mb-6">
            <div className="flex flex-col">
              <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-ds-c-9 mb-2">
                {tag}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-white">
                {title}
              </h2>
            </div>
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-xs font-mono text-ds-c-9">
              0{i + 1}
            </div>
          </div>

          <div className="flex flex-col md:flex-row h-full gap-10">
            <div className="w-full md:w-[45%] flex flex-col justify-between py-4">
              <p className="text-ds-c-10 text-lg leading-relaxed font-light">
                {description}
              </p>
              <div className="group flex items-center gap-3 cursor-pointer mt-8">
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/50 group-hover:text-ds-blue transition-colors">
                  Explorar Protocolo
                </span>
                <div className="w-8 h-px bg-white/20 group-hover:w-12 group-hover:bg-ds-blue transition-all" />
              </div>
            </div>

            <div className="relative flex-1 h-full rounded-xl overflow-hidden border border-white/5 bg-black/40">
              <motion.div
                className="w-full h-full"
                style={{ scale: imageScale }}
              >
                <img
                  src={url}
                  alt={title}
                  className="absolute inset-0 w-full h-full object-cover opacity-80"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const ValidationRigor = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const projects: ProjectData[] = [
    {
      title: "Falsa Certeza",
      tag: "Distorção de Realidade",
      description: "Você acredita no modelo porque ele parece lógico, mas não tem dados que comprovem a demanda real.",
      link: "/false_certainty.png",
      color: "#0A0A0A",
    },
    {
      title: "O Buraco Negro do Capital",
      tag: "Ralo de Recursos",
      description: "Projetos que sugam recursos infinitos porque foram validados apenas no brainstorming solto.",
      link: "/capital_black_hole.png",
      color: "#0D0D0D",
    },
    {
      title: "Cegueira Operacional",
      tag: "Falha Sistêmica",
      description: "Ignorar que churn, falhas de margem ou fraudes podem quebrar sua empresa antes mesmo do lançamento.",
      link: "/operational_blindness.png",
      color: "#080808",
    },
    {
      title: "Inovação por Vaidade",
      tag: "Teatro Corporativo",
      description: "Gastar energia com tecnologia e pitch bonito enquanto negligencia a viabilidade financeira.",
      link: "/vanity_innovation.png",
      color: "#0C0C0C",
    },
  ];

  return (
    <section className="bg-ds-bg-1 relative z-20" ref={container}>
      <section className="h-[50vh] flex flex-col items-center justify-center relative overflow-hidden">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(41,189,242,0.1),transparent_70%)]" />
         <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-mono text-[10px] tracking-[0.5em] uppercase text-ds-c-9 mb-6 z-10"
          >
            Diagnóstico
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white text-center z-10 max-w-4xl px-6">
            Você sente a gravidade do achismo<br/>puxando seu projeto?
          </h2>
      </section>

      <section className="relative h-[400vh]">
        {projects.map((project, i) => {
          const targetScale = 1 - (projects.length - i) * 0.05;
          return (
            <Card
              key={`p_${i}`}
              i={i}
              url={project.link}
              title={project.title}
              color={project.color}
              tag={project.tag}
              description={project.description}
              progress={scrollYProgress}
              range={[i * 0.2, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </section>

      <div className="h-[20vh]" />
    </section>
  );
};
