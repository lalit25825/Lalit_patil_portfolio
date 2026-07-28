"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const links = [
  { href: "#about", label: "About" },
  { href: "#stack", label: "Stack" },
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 1.9, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 inset-x-0 z-[80] transition-all duration-500 ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      <div
        className={`mx-auto max-w-6xl flex items-center justify-between px-5 md:px-8 transition-all duration-500 ${
          scrolled ? "glass-strong rounded-full py-2.5 mx-4 md:mx-auto shadow-glass" : ""
        }`}
      >
        <a href="#top" data-cursor-hover className="font-display font-bold text-lg tracking-tight">
          LP<span className="text-blue">.</span>
        </a>
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                data-cursor-hover
                className="text-sm text-muted hover:text-ink transition-colors relative group"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-grad-primary group-hover:w-full transition-all duration-300" />
              </a>
            </li>
          ))}
        </ul>
        <a
          href="/resume.pdf"
          data-cursor-hover
          className="hidden md:inline-flex text-sm font-medium px-4 py-2 rounded-full glass hover:shadow-glow transition-shadow"
        >
          Resume
        </a>
      </div>
    </motion.nav>
  );
}
