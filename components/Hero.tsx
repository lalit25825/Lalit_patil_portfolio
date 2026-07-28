"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import SplitText from "./SplitText";
import MagneticButton from "./MagneticButton";
import { roles, socials } from "@/lib/data";

const iconFor: Record<string, React.ReactNode> = {
  GitHub: <Github size={18} />,
  LinkedIn: <Linkedin size={18} />,
  Email: <Mail size={18} />,
};

function useTypewriter(words: string[]) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    const speed = deleting ? 40 : 75;
    const pause = 1400;

    const timeout = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, text.length + 1);
        setText(next);
        if (next === current) setTimeout(() => setDeleting(true), pause);
      } else {
        const next = current.slice(0, text.length - 1);
        setText(next);
        if (next === "") {
          setDeleting(false);
          setWordIndex((i) => i + 1);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words]);

  return text;
}

export default function Hero() {
  const typed = useTypewriter(roles);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const glowX = useTransform(sx, (v) => `${v}px`);
  const glowY = useTransform(sy, (v) => `${v}px`);
  const rotX = useTransform(sy, [-200, 200], [4, -4]);
  const rotY = useTransform(sx, [-200, 200], [-4, 4]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX - window.innerWidth / 2);
      my.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <section id="top" className="relative min-h-[100svh] flex flex-col justify-center px-5 md:px-8 overflow-hidden">
      <motion.div
        className="pointer-events-none absolute w-[600px] h-[600px] rounded-full bg-blue/10 blur-[120px]"
        style={{ left: glowX, top: glowY, x: "-50%", y: "-50%" }}
      />

      <div className="relative mx-auto max-w-6xl w-full">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.1, duration: 0.6 }}
          className="eyebrow mb-6"
        >
          Portfolio / 2026
        </motion.p>

        <motion.div style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 1200 }}>
          <SplitText
            text="Hi, I'm Lucky Patil"
            delay={2.2}
            className="font-display font-extrabold leading-[0.95] tracking-tight text-[clamp(2.6rem,8vw,6.2rem)]"
          />
        </motion.div>

        <div className="mt-4 h-[clamp(2rem,5vw,3.5rem)] flex items-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.9, duration: 0.6 }}
            className="font-mono text-[clamp(1.1rem,2.6vw,1.8rem)] text-gradient"
          >
            {typed}
            <span className="inline-block w-[2px] h-[1em] bg-cyan ml-1 align-middle animate-pulse" />
          </motion.span>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.1, duration: 0.6 }}
          className="mt-6 max-w-lg text-muted text-base md:text-lg leading-relaxed"
        >
          I design and ship intelligent systems — from multi-agent AI platforms
          to production web apps — for problems that matter, like India&apos;s
          agricultural supply chain.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.3, duration: 0.6 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton href="#work">View Projects</MagneticButton>
          <MagneticButton href="/resume.pdf" variant="outline">
            Download Resume
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5, duration: 0.6 }}
          className="mt-14 flex items-center gap-5"
        >
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              data-cursor-hover
              aria-label={s.label}
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-muted hover:text-ink hover:shadow-glow transition-all"
            >
              {iconFor[s.label]}
            </a>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 3.8, duration: 0.6 }, y: { repeat: Infinity, duration: 1.8 } }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted"
      >
        <span className="eyebrow">Scroll</span>
        <ArrowDown size={16} />
      </motion.div>
    </section>
  );
}
