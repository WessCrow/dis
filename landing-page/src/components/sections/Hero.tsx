"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MagneticButton } from "../ui/MagneticButton";
import { WovenLightHero } from "../ui/woven-light-hero";
import { useState, useEffect } from "react";
import {
  HERO_HEADLINES,
  HERO_ROTATION_INTERVAL,
  HERO_SUBTITLE,
  HERO_CTA_PRIMARY,
  HERO_STATUS_LABEL,
  HERO_STATUS_VALUE,
} from "../../../docx/hero-content";

const headlines = HERO_HEADLINES;

interface UIConfig {
  titleSize: number;
  titleColor: string;
  titleMaxWidth: number;
  subtitleSize: number;
  subtitleColor: string;
  subtitleMaxWidth: number;
  spacing: number;
  lateralPadding: number;
  accentColor: string;
  letterSpacing: number; // em em
}

export const Hero = () => {
  const [index, setIndex] = useState(0);
  const [uiConfig] = useState<UIConfig>({
    titleSize: 5.0,
    titleColor: '#FFFFFF',
    titleMaxWidth: 52, // rem
    subtitleSize: 1.25,
    subtitleColor: '#FFFFFF',
    subtitleMaxWidth: 39, // rem
    spacing: 0.9,
    lateralPadding: 2.5, // rem
    accentColor: '#FFFFFF',
    letterSpacing: -0.05,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % headlines.length);
    }, HERO_ROTATION_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const s = (val: number) => val * uiConfig.spacing;

  return (
    <WovenLightHero>
      <section 
        className="relative min-h-screen flex flex-col items-start justify-center pt-32 pb-20 overflow-hidden w-full"
        style={{ paddingLeft: `${uiConfig.lateralPadding}rem`, paddingRight: `${uiConfig.lateralPadding}rem` }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-left z-10 w-full"
        >
          <div className="flex items-center justify-start w-full" style={{ height: `${s(200)}px`, marginBottom: `${s(32)}px` }}>
            <AnimatePresence mode="wait">
              <motion.h1
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-bold tracking-tighter leading-[0.9]"
                style={{ 
                  fontSize: `${uiConfig.titleSize}rem`, 
                  color: uiConfig.titleColor,
                  maxWidth: `${uiConfig.titleMaxWidth}rem`,
                  letterSpacing: `${uiConfig.letterSpacing}em`
                }}
              >
                {headlines[index]}
              </motion.h1>
            </AnimatePresence>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="leading-relaxed"
            style={{ 
              fontSize: `${uiConfig.subtitleSize}rem`, 
              color: uiConfig.subtitleColor, 
              marginBottom: `${s(56)}px`,
              maxWidth: `${uiConfig.subtitleMaxWidth}rem`
            }}
          >
            {HERO_SUBTITLE}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-col md:flex-row items-center justify-start gap-12"
          >
            <div className="w-full md:w-auto">
              <MagneticButton className="btn-primary !w-auto px-12 !rounded-none relative overflow-hidden group !border-white !text-white hover:!bg-white hover:!text-black transition-all">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl" style={{ backgroundColor: uiConfig.accentColor }} />
                {HERO_CTA_PRIMARY}
              </MagneticButton>
            </div>

            <div className="flex flex-col items-start text-left border-l border-white/20 pl-10">
              <span className="text-[10px] font-mono tracking-widest uppercase text-white/50 mb-1">{HERO_STATUS_LABEL}</span>
              <span className="text-[11px] font-artnik flex items-center gap-2" style={{ color: uiConfig.accentColor }}>
                {HERO_STATUS_VALUE}
              </span>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </WovenLightHero>
  );
};
