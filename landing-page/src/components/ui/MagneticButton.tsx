"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface BaseProps {
  children: React.ReactNode;
  className?: string;
  "aria-label"?: string;
}

interface ButtonProps extends BaseProps {
  href?: never;
  onClick?: () => void;
  target?: never;
  rel?: never;
  type?: "button" | "submit" | "reset";
}

interface AnchorProps extends BaseProps {
  href: string;
  onClick?: () => void;
  target?: string;
  rel?: string;
  type?: never;
}

type Props = ButtonProps | AnchorProps;

export const MagneticButton = ({ children, className, onClick, "aria-label": ariaLabel, ...rest }: Props) => {
  const elRef = useRef<HTMLButtonElement & HTMLAnchorElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const xTo = gsap.quickTo(el, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(el, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = el.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      xTo(x * 0.35);
      yTo(y * 0.35);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  if ("href" in rest && rest.href) {
    return (
      <a
        ref={elRef}
        href={rest.href}
        target={rest.target}
        rel={rest.rel ?? (rest.target === "_blank" ? "noopener noreferrer" : undefined)}
        className={className}
        onClick={onClick}
        aria-label={ariaLabel}
      >
        <span className="relative z-10">{children}</span>
      </a>
    );
  }

  return (
    <button
      ref={elRef}
      className={className}
      onClick={onClick}
      aria-label={ariaLabel}
      type={"type" in rest ? rest.type ?? "button" : "button"}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
};
