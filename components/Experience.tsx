"use client";

import { motion } from "framer-motion";
import SplitText from "./SplitText";
import { experience } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="mx-auto max-w-4xl">
        <p className="eyebrow mb-3">Experience</p>
        <SplitText
          text="Where the work has taken me."
          className="font-display font-bold text-3xl md:text-4xl mb-14 max-w-xl"
        />

        <div className="relative pl-8">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-blue via-purple to-cyan" />
          <div className="space-y-10">
            {experience.map((e, i) => (
              <motion.div
                key={e.role + e.period}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                whileHover={{ x: 4 }}
                className="relative"
              >
                <span className="absolute -left-8 top-1.5 w-3.5 h-3.5 rounded-full bg-bg border-2 border-blue" />
                <p className="font-mono text-xs text-muted mb-1">{e.period}</p>
                <h3 className="font-display font-semibold text-xl">
                  {e.role} <span className="text-muted font-normal">· {e.org}</span>
                </h3>
                <p className="text-muted text-sm mt-2 leading-relaxed max-w-xl">{e.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
