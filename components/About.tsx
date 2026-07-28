"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import SplitText from "./SplitText";

const focusAreas = ["AI", "Machine Learning", "Web Development", "Agentic AI", "Problem Solving"];

const stats = [
  { value: 15, suffix: "+", label: "Projects Shipped" },
  { value: 3, suffix: "", label: "Years Building" },
  { value: 7, suffix: "", label: "AI Agents Designed" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.floor(v));

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, { duration: 1.6, ease: [0.16, 1, 0.3, 1] });
      return controls.stop;
    }
  }, [inView, value, count]);

  return (
    <span ref={ref} className="font-display font-bold text-4xl md:text-5xl text-ink">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export default function About() {
  return (
    <section id="about" className="section">
      <div className="mx-auto max-w-6xl grid md:grid-cols-[1fr_1.2fr] gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden glass">
            <div className="absolute inset-0 bg-gradient-to-br from-blue/30 via-purple/20 to-cyan/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-8xl font-black text-white/10">LP</span>
            </div>
          </div>
          <div className="absolute -bottom-6 -right-6 glass-strong rounded-2xl px-5 py-4 shadow-glass">
            <p className="eyebrow">Based in</p>
            <p className="font-display font-semibold">Pune, India</p>
          </div>
        </motion.div>

        <div>
          <p className="eyebrow mb-3">About</p>
          <SplitText
            text="I build systems that think, and interfaces people trust."
            className="font-display font-bold text-3xl md:text-4xl leading-tight mb-6"
          />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted leading-relaxed max-w-xl"
          >
            I work at the intersection of AI and full-stack engineering — designing
            multi-agent systems, then building the production-grade web apps that
            put them in front of real users. Most of my work centers on Indian
            agriculture, where good software still has an outsized, tangible impact.
          </motion.p>

          <div className="flex flex-wrap gap-2 mt-6">
            {focusAreas.map((f, i) => (
              <motion.span
                key={f}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 * i }}
                className="glass rounded-full px-4 py-1.5 text-sm font-mono text-muted"
              >
                {f}
              </motion.span>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-line">
            {stats.map((s) => (
              <div key={s.label}>
                <Counter value={s.value} suffix={s.suffix} />
                <p className="text-xs text-muted mt-1 font-mono">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
