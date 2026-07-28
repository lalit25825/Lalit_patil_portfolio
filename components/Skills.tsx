"use client";

import { motion } from "framer-motion";
import SplitText from "./SplitText";
import { skillCategories } from "@/lib/data";

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="mx-auto max-w-6xl">
        <p className="eyebrow mb-3">Skills</p>
        <SplitText
          text="Depth across the stack, not just breadth."
          className="font-display font-bold text-3xl md:text-4xl mb-14 max-w-xl"
        />

        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((cat, ci) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: ci * 0.08 }}
              className="glass rounded-3xl p-7"
            >
              <h3 className="font-display font-semibold text-lg mb-6">{cat.name}</h3>
              <div className="space-y-5">
                {cat.skills.map((s) => (
                  <div key={s.name}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-ink">{s.name}</span>
                      <span className="font-mono text-muted text-xs">{s.level}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${s.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                        className="h-full rounded-full bg-grad-primary"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
