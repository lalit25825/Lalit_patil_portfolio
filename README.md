# Lucky Patil — Portfolio

A cinematic, dark-themed developer portfolio built with Next.js 15, TypeScript,
Tailwind CSS, Framer Motion, GSAP-style orbit motion, and Lenis smooth scroll.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Drop your resume at `public/resume.pdf` — the "Download Resume" and nav
"Resume" buttons already link there.

## Structure

```
app/
  layout.tsx        Fonts, metadata, cursor + smooth scroll providers
  page.tsx           Composes every section in order
  globals.css        Design tokens, glass/noise utilities, reduced-motion support
components/
  SmoothScroll.tsx    Lenis wrapper
  CustomCursor.tsx     Magnetic dot + ring cursor (desktop only)
  Background.tsx       Gradient blobs, canvas particles, scroll progress bar
  Loader.tsx            Preload screen with logo + progress
  Nav.tsx                 Sticky glass nav, condenses on scroll
  Hero.tsx                 Landing section, typewriter roles, mouse parallax
  About.tsx                 Timeline-style intro, animated stat counters
  TechOrbit.tsx             Signature rotating tech-stack orbit (hover for detail)
  Projects.tsx               Expandable case-study cards (challenge/solution/impact)
  Skills.tsx                  Categorized animated progress bars
  Experience.tsx               Vertical animated timeline
  Achievements.tsx              Animated counters
  Testimonials.tsx               Infinite marquee, pauses on hover
  Contact.tsx                     Validated form with success state
  Footer.tsx                      Animated divider + back-to-top
  MagneticButton.tsx               Shared magnetic CTA button
  SplitText.tsx                     Line/word reveal-on-scroll helper
lib/
  data.ts    All copy & content (projects, skills, experience, testimonials)
  utils.ts    cn() classname helper
```

## Notes on scope

This ships every section from the brief (hero, about, tech orbit, projects,
skills, experience, achievements, testimonials, contact, footer) as real,
working code with Framer Motion + CSS-driven animation, a canvas particle
field, and Lenis smooth scroll. The Three.js/React Three Fiber dependency is
included in `package.json` for a hero 3D object if you want to extend
`Hero.tsx` with a `<Canvas>` — it's left out of the default build to keep the
hero fast and dependency-light; add it back in if you want a literal 3D
scene there.

Replace the placeholder project links (GitHub/Live Demo hrefs are `#` in
`Projects.tsx`) and the initials-based "photo" panel in `About.tsx` with your
real image and links before shipping.

## Editing content

Everything text-based — role list, project case studies, skills, experience,
testimonials — lives in `lib/data.ts`. No need to touch component files to
update copy.
