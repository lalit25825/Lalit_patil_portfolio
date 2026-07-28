"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Github, Linkedin, Send } from "lucide-react";
import SplitText from "./SplitText";
import MagneticButton from "./MagneticButton";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

export default function Contact() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const validate = () => {
    const e: Errors = {};
    if (!values.name.trim()) e.name = "Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) e.email = "Enter a valid email";
    if (values.message.trim().length < 10) e.message = "Message should be at least 10 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 1200);
  };

  return (
    <section id="contact" className="section">
      <div className="mx-auto max-w-4xl">
        <p className="eyebrow mb-3 text-center">Contact</p>
        <SplitText
          text="Let's build something intelligent."
          className="font-display font-bold text-3xl md:text-5xl text-center mb-4"
        />
        <p className="text-muted text-center max-w-md mx-auto mb-14">
          Open to collaborations, freelance work, and interesting problems in AI and agriculture.
        </p>

        <div className="grid md:grid-cols-[1fr_1.3fr] gap-8 items-start">
          <div className="glass rounded-3xl p-7 space-y-4">
            <a
              href="mailto:hello@luckypatil.dev"
              data-cursor-hover
              className="flex items-center gap-3 text-sm hover:text-blue transition-colors"
            >
              <Send size={16} /> hello@luckypatil.dev
            </a>
            <a
              href="https://github.com/"
              data-cursor-hover
              className="flex items-center gap-3 text-sm hover:text-blue transition-colors"
            >
              <Github size={16} /> github.com/luckypatil
            </a>
            <a
              href="https://linkedin.com/"
              data-cursor-hover
              className="flex items-center gap-3 text-sm hover:text-blue transition-colors"
            >
              <Linkedin size={16} /> linkedin.com/in/luckypatil
            </a>
          </div>

          <div className="relative glass-strong rounded-3xl p-8 min-h-[380px]">
            <AnimatePresence mode="wait">
              {status === "sent" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center px-8"
                >
                  <CheckCircle2 className="text-cyan" size={44} />
                  <p className="font-display font-semibold text-lg">Message sent</p>
                  <p className="text-muted text-sm">I&apos;ll get back to you within a day or two.</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  noValidate
                >
                  <div>
                    <label className="font-mono text-xs text-muted block mb-2">Name</label>
                    <input
                      value={values.name}
                      onChange={(e) => setValues({ ...values, name: e.target.value })}
                      className="w-full bg-white/5 border border-line rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue transition-colors"
                      placeholder="Your name"
                    />
                    {errors.name && <p className="text-xs text-purple mt-1.5">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="font-mono text-xs text-muted block mb-2">Email</label>
                    <input
                      value={values.email}
                      onChange={(e) => setValues({ ...values, email: e.target.value })}
                      className="w-full bg-white/5 border border-line rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue transition-colors"
                      placeholder="you@email.com"
                    />
                    {errors.email && <p className="text-xs text-purple mt-1.5">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="font-mono text-xs text-muted block mb-2">Message</label>
                    <textarea
                      value={values.message}
                      onChange={(e) => setValues({ ...values, message: e.target.value })}
                      rows={4}
                      className="w-full bg-white/5 border border-line rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue transition-colors resize-none"
                      placeholder="What are you building?"
                    />
                    {errors.message && <p className="text-xs text-purple mt-1.5">{errors.message}</p>}
                  </div>
                  <MagneticButton className="w-full justify-center">
                    {status === "sending" ? "Sending..." : "Send Message"}
                  </MagneticButton>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
