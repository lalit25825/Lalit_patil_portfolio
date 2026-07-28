"use client";

import SplitText from "./SplitText";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  const loop = [...testimonials, ...testimonials];

  return (
    <section className="section overflow-hidden">
      <div className="mx-auto max-w-6xl mb-14 px-0">
        <p className="eyebrow mb-3">Kind Words</p>
        <SplitText
          text="What collaborators say."
          className="font-display font-bold text-3xl md:text-4xl max-w-xl"
        />
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bg to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg to-transparent z-10" />
        <div className="flex gap-6 w-max animate-marquee hover:[animation-play-state:paused]">
          {loop.map((t, i) => (
            <div
              key={i}
              className="glass rounded-3xl p-8 w-[340px] shrink-0"
            >
              <p className="text-ink leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
              <div>
                <p className="font-display font-semibold text-sm">{t.name}</p>
                <p className="font-mono text-xs text-muted mt-0.5">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
