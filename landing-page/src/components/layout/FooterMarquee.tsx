"use client";

import { motion } from "framer-motion";
import type { FooterConfig } from "./footer.config";

type Props = {
  config: FooterConfig["marquee"];
};

const MarqueeBlock = ({ config, prefix }: { config: Props["config"]; prefix: string }) => (
  <div className="flex items-center min-w-max">
    {Array.from({ length: config.itemCount }, (_, i) => (
      <span key={`${prefix}-${i}`} className="flex items-center">
        <img
          src={config.logoSrc}
          alt=""
          role="presentation"
          className={`${config.logoHeight} ${config.logoMaxHeight} object-contain brightness-0 invert ${config.logoPaddingX}`}
        />
        <span className="text-white text-[20vw] md:text-[15vw] leading-none select-none" aria-hidden="true">
          {config.separator}
        </span>
      </span>
    ))}
  </div>
);

export const FooterMarquee = ({ config }: Props) => (
  <div className={`w-full overflow-hidden flex whitespace-nowrap ${config.opacityClass} pointer-events-none select-none`}>
    <motion.div
      className="flex items-center"
      animate={{ x: ["0%", "-50%"] }}
      transition={{
        repeat: Infinity,
        ease: "linear",
        duration: config.duration,
      }}
    >
      <MarqueeBlock config={config} prefix="b1" />
      <MarqueeBlock config={config} prefix="b2" />
    </motion.div>
  </div>
);
