"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const COUNT = reduced ? 0 : Math.min(70, Math.floor((width * height) / 22000));

    type P = { x: number; y: number; vx: number; vy: number; r: number };
    const particles: P[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      r: Math.random() * 1.4 + 0.4,
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(237,237,237,0.5)";
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-40 pointer-events-none" />;
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-grad-primary z-[90] origin-left"
      style={{ scaleX }}
    />
  );
}

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-bg">
      <div className="absolute inset-0 bg-grad-radial" />
      <div className="absolute -top-40 -left-40 w-[36rem] h-[36rem] rounded-full bg-blue/20 blur-[140px] animate-float" />
      <div
        className="absolute top-1/3 -right-40 w-[32rem] h-[32rem] rounded-full bg-purple/20 blur-[140px] animate-float"
        style={{ animationDelay: "-2s" }}
      />
      <div
        className="absolute bottom-0 left-1/3 w-[28rem] h-[28rem] rounded-full bg-cyan/15 blur-[140px] animate-float"
        style={{ animationDelay: "-4s" }}
      />
      <Particles />
    </div>
  );
}
