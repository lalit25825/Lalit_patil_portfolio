"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function MagneticButton({
  children,
  className,
  href,
  onClick,
  variant = "solid",
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  variant?: "solid" | "outline";
}) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  };

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };

  const classes = cn(
    "relative inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-medium text-sm transition-[box-shadow,background-color] duration-300 will-change-transform",
    variant === "solid"
      ? "bg-ink text-bg hover:shadow-glow"
      : "glass text-ink hover:shadow-glow",
    className
  );

  if (href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        data-cursor-hover
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className={classes}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      data-cursor-hover
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={classes}
    >
      {children}
    </motion.button>
  );
}
