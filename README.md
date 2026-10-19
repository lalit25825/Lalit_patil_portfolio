# Lalit Patil — Portfolio

A static, zero-build portfolio site. HTML + CSS + vanilla JS, with GSAP, ScrollTrigger and Lenis loaded from a CDN.

## Structure

```
lalit-portfolio/
├── index.html                 # all page content and markup
├── 404.html                   # not-found page
├── css/
│   └── styles.css             # all styling (tokens are in :root)
├── js/
│   ├── main.js                # contact links (SITE), project case studies, menu, dialog, reveals
│   ├── ui.js                  # sticky header, active nav link, cursor glow, magnetic buttons
│   ├── resume.js              # résumé download / open
│   ├── certificates.js        # certificate deck + dialog
│   ├── viewport.js            # pauses off-screen animations, achievements reveal
│   ├── appearance.js          # entrance choreography
│   ├── scroll.js              # scroll-linked effects (hero, stacking projects, coverflow, marquee)
│   ├── intro.js               # opening trailer + reading-time chips
│   ├── enhance.js             # Lenis smooth scroll + GSAP effects
│   └── skills.js              # Technical skills animations
├── assets/
│   ├── Lalit_Patil_Resume.pdf
│   ├── favicon.svg
│   └── certs/*.jpg            # certificate images
├── vercel.json  netlify.toml  # headers + caching
├── robots.txt  .nojekyll  package.json  .gitignore
```

Script order in `index.html` matters. Keep `enhance.js` after the three CDN `<script>` tags.

## Run locally

```bash
npx serve .          # or: npm start
# or
python3 -m http.server 3000
```

Open http://localhost:3000. Opening `index.html` by double-click also works, except the résumé download.

## Deploy

**Vercel** — push to GitHub → vercel.com/new → import the repo. Framework preset: *Other*. No build command, output directory `.`.
Or with the CLI: `npx vercel --prod`.

**Netlify** — drag the folder onto app.netlify.com/drop, or connect the repo (build command empty, publish directory `.`).

**GitHub Pages** — push to GitHub → Settings → Pages → Deploy from branch → `main` / root. `.nojekyll` is already included.

**Cloudflare Pages** — connect the repo, build command empty, output directory `.`.

## Edit your content

| What | Where |
|---|---|
| Email / GitHub / LinkedIn buttons | `js/main.js` → `SITE` at the top |
| Project case-study popups | `js/main.js` → `projects` object |
| Project cards, skills, achievements, résumé text | `index.html` |
| Certificates | `index.html` → `.cert` buttons (`data-*` fields) + `assets/certs/` |
| Résumé PDF | replace `assets/Lalit_Patil_Resume.pdf` (keep the filename) |
| Colours / fonts | `css/styles.css` → `:root` |

## Notes

- Animations respect `prefers-reduced-motion`.
- GSAP 3.12.5, ScrollTrigger 3.12.5 and Lenis 1.1.18 are pinned CDN versions. To self-host, download them into `vendor/` and change the three `<script src>` tags in `index.html`.
- Set your real domain in `og:` tags once you have one, and add `og:image` for link previews.
