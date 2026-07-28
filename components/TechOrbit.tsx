"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SplitText from "./SplitText";
import { techStack, techExpertise } from "@/lib/data";

export default function TechOrbit() {
  const [active, setActive] = useState<string | null>(null);
  const radius = 220;

  return (
    <section id="stack" className="section overflow-hidden">
      <div className="mx-auto max-w-6xl">
        <p className="eyebrow mb-3 text-center">Tech Stack</p>
        <SplitText
          text="Tools I orbit around daily."
          className="font-display font-bold text-3xl md:text-4xl text-center mb-16"
        />

        <div className="relative mx-auto w-full max-w-[560px] aspect-square flex items-center justify-center">
          {/* orbit rings */}
          <div className="absolute inset-0 rounded-full border border-line" />
          <div className="absolute inset-[15%] rounded-full border border-line" />

          {/* glowing core */}
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="relative w-24 h-24 rounded-full bg-grad-primary shadow-glow flex items-center justify-center z-10"
          >
            <span className="font-display font-bold text-bg text-sm text-center px-2">
              {active ? active : "STACK"}
            </span>
          </motion.div>

          {/* orbiting items */}
          <div className="absolute inset-0 animate-spin-slow" style={{ animationPlayState: active ? "paused" : "running" }}>
            {techStack.map((tech, i) => {
              const angle = (i / techStack.length) * 2 * Math.PI;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              return (
                <div
                  key={tech.name}
                  className="absolute top-1/2 left-1/2"
                  style={{ transform: `translate(${x}px, ${y}px)` }}
                >
                  <div className="animate-spin-slow-rev">
                    <motion.button
                      data-cursor-hover
                      onMouseEnter={() => setActive(tech.name)}
                      onMouseLeave={() => setActive(null)}
                      onFocus={() => setActive(tech.name)}
                      onBlur={() => setActive(null)}
                      whileHover={{ scale: 1.2 }}
                      className="relative -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-2xl glass flex items-center justify-center text-xs font-mono font-medium text-center px-1"
                      style={{
                        boxShadow: active === tech.name ? `0 0 24px ${tech.color}66` : undefined,
                        borderColor: active === tech.name ? tech.color : undefined,
                      }}
                    >
                      {tech.name}
                    </motion.button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <motion.div
          key={active ?? "default"}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-8 h-6 text-sm text-muted font-mono"
        >
          {active ? techExpertise[active] : "Hover a node to see how I use it"}
        </motion.div>
      </div>
    </section>
  );
}
