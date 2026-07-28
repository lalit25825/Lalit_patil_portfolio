"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Loader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(100, p + Math.random() * 18 + 6);
        if (next >= 100) clearInterval(interval);
        return next;
      });
    }, 140);

    const timeout = setTimeout(() => setVisible(false), 1900);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-bg"
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-3xl md:text-4xl font-bold tracking-tight text-ink"
          >
            LP<span className="text-gradient">.</span>
          </motion.div>
          <div className="mt-8 h-px w-40 overflow-hidden bg-white/10">
            <motion.div
              className="h-full bg-grad-primary"
              style={{ width: `${Math.floor(progress)}%` }}
            />
          </div>
          <p className="mt-3 font-mono text-xs text-muted tabular-nums">
            {Math.floor(progress)}%
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
