"use client";

import { useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

export interface TiltCardProps {
  tiltLimit?: number;
  scale?: number;
  perspective?: number;
  effect?: "gravitate" | "evade";
  spotlight?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export function TiltCard({
  tiltLimit = 15,
  scale = 1.05,
  perspective = 1200,
  effect = "evade",
  spotlight = true,
  className,
  style,
  children,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltTransform, setTiltTransform] = useState(
    "rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
  );
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const dir = effect === "evade" ? -1 : 1;

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const xRot = (py - 0.5) * (tiltLimit * 2) * dir;
      const yRot = (px - 0.5) * -(tiltLimit * 2) * dir;
      setTiltTransform(
        `rotateX(${xRot}deg) rotateY(${yRot}deg) scale3d(${scale}, ${scale}, ${scale})`
      );
      if (spotlight) setSpotlightPos({ x: px * 100, y: py * 100 });
    },
    [tiltLimit, scale, dir, spotlight]
  );

  const handlePointerEnter = useCallback(() => setIsHovered(true), []);

  const handlePointerLeave = useCallback(() => {
    setTiltTransform("rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    setIsHovered(false);
  }, []);

  return (
    // Perspective wrapper — defines the 3D space (CSS property, not function)
    <div
      style={{ perspective: `${perspective}px`, ...style }}
      className={cn("relative", className)}
    >
      {/* Card — tilts in 3D, no overflow-hidden so corners lift visibly */}
      <div
        ref={cardRef}
        onPointerEnter={handlePointerEnter}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="will-change-transform relative w-full h-full"
        style={{
          transform: tiltTransform,
          transition: "transform 0.2s ease-out",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Content clip — keeps rounded corners / overflow without breaking 3D */}
        <div className="absolute inset-0 overflow-hidden">
          {children}
        </div>

        {spotlight && (
          <div
            className="pointer-events-none absolute inset-0 z-10"
            style={{ overflow: "clip", opacity: isHovered ? 1 : 0, transition: "opacity 0.3s" }}
          >
            <div
              className="absolute w-[200%] h-[200%] rounded-full"
              style={{
                left: `${spotlightPos.x}%`,
                top: `${spotlightPos.y}%`,
                transform: "translate(-50%, -50%)",
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 40%)",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
