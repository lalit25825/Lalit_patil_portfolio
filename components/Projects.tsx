"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Github, X } from "lucide-react";
import SplitText from "./SplitText";
import { projects, type Project } from "@/lib/data";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.7, delay: (index % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -6 }}
        data-cursor-hover
        onClick={() => setOpen(true)}
        className="group relative rounded-3xl overflow-hidden glass cursor-pointer"
      >
        <div className={`relative h-56 bg-gradient-to-br ${project.gradient} opacity-80`}>
          <div className="absolute inset-0 bg-bg/40 group-hover:bg-bg/20 transition-colors duration-500" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display font-black text-5xl text-white/20 group-hover:scale-110 transition-transform duration-500">
              {project.name}
            </span>
          </div>
          <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/30 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowUpRight size={16} className="text-white" />
          </div>
        </div>
        <div className="p-6">
          <h3 className="font-display font-bold text-xl mb-1">{project.name}</h3>
          <p className="text-muted text-sm mb-4">{project.tagline}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span key={t} className="font-mono text-[11px] text-muted glass rounded-full px-3 py-1">
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-start md:items-center justify-center p-4 md:p-8 bg-black/70 backdrop-blur-sm overflow-y-auto"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl glass-strong rounded-3xl p-8 md:p-10 my-auto"
            >
              <button
                onClick={() => setOpen(false)}
                data-cursor-hover
                aria-label="Close"
                className="absolute top-6 right-6 w-9 h-9 rounded-full glass flex items-center justify-center"
              >
                <X size={16} />
              </button>

              <p className="eyebrow mb-2">Case Study</p>
              <h3 className="font-display font-bold text-3xl mb-6">{project.name}</h3>

              <div className="space-y-6">
                <div>
                  <p className="font-mono text-xs text-blue mb-2">CHALLENGE</p>
                  <p className="text-muted leading-relaxed">{project.challenge}</p>
                </div>
                <div>
                  <p className="font-mono text-xs text-purple mb-2">SOLUTION</p>
                  <p className="text-muted leading-relaxed">{project.solution}</p>
                </div>
                <div>
                  <p className="font-mono text-xs text-cyan mb-2">TECH STACK</p>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((t) => (
                      <span key={t} className="font-mono text-xs glass rounded-full px-3 py-1">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-mono text-xs text-ink mb-2">IMPACT</p>
                  <ul className="space-y-1.5">
                    {project.impact.map((im) => (
                      <li key={im} className="text-muted text-sm flex gap-2">
                        <span className="text-blue mt-1">—</span>
                        {im}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mt-8">
                <a
                  href="#"
                  data-cursor-hover
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ink text-bg text-sm font-medium hover:shadow-glow transition-shadow"
                >
                  <Github size={15} /> GitHub
                </a>
                <a
                  href="#"
                  data-cursor-hover
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass text-sm font-medium hover:shadow-glow transition-shadow"
                >
                  Live Demo <ArrowUpRight size={15} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function Projects() {
  return (
    <section id="work" className="section">
      <div className="mx-auto max-w-6xl">
        <p className="eyebrow mb-3">Featured Work</p>
        <SplitText
          text="Projects built to actually matter."
          className="font-display font-bold text-3xl md:text-4xl mb-14 max-w-xl"
        />
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
