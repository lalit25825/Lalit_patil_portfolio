"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { achievements } from "@/lib/data";

function Stat({ number, suffix, label }: { number: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.floor(v));

  useEffect(() => {
    if (inView) {
      const controls = animate(count, number, { duration: 1.8, ease: [0.16, 1, 0.3, 1] });
      return controls.stop;
    }
  }, [inView, number, count]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display font-black text-5xl md:text-6xl text-gradient">
        <motion.span>{rounded}</motion.span>
        {suffix}
      </div>
      <p className="text-muted text-sm mt-3 font-mono">{label}</p>
    </div>
  );
}

export default function Achievements() {
  return (
    <section className="section">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-strong rounded-[2.5rem] px-8 py-14 grid grid-cols-2 md:grid-cols-4 gap-10"
        >
          {achievements.map((a) => (
            <Stat key={a.label} number={a.number} suffix={a.suffix} label={a.label} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
