"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative px-5 md:px-8 pb-8 pt-4">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent origin-center mb-8"
      />
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted">
        <p className="font-mono text-xs">© {new Date().getFullYear()} Lucky Patil. Built from scratch.</p>
        <a
          href="#top"
          data-cursor-hover
          className="inline-flex items-center gap-2 hover:text-ink transition-colors"
        >
          Back to top <ArrowUp size={14} />
        </a>
      </div>
    </footer>
  );
}
