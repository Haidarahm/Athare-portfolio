# v2 — One Day of Light

React + Vite · GSAP ScrollTrigger · Framer Motion · Lenis. No Three.js / WebGL. Light mode.

## Story
The whole site is one day. A fixed sun-arc clock (bottom-left) runs 05:30 → 20:00 as you scroll,
and the page background shifts tone per chapter. Viewfinder corners recur in every chapter.

| Ch. | Time  | Section            | Signature motion |
|-----|-------|--------------------|------------------|
| 00  | 05:42 | Dawn (hero)        | Name letters rise; a small lens window opens to full-bleed on scroll |
| 01  | 09:10 | The Eye (about)    | Words light up as you read; portrait wipe + parallax; count-up stats |
| 02  | 12:00 | Still (photography)| Pinned contact sheet → red grease-pencil circle → chosen frame fills the screen; 3-column parallax gallery |
| —   |       | Marquee            | Solid and outlined bands slide against each other |
| 03  | 17:30 | Motion (films)     | Pinned horizontal reel: 2 rows, columns = ceil(films / 2), columns drift, shutter reveals, velocity skew, lightbox |
| 04  | 19:48 | Dusk (contact)     | Sun sets behind the horizon; magnetic email CTA; credits |

## Files
- `src/data.js` — all content (placeholder photos from picsum, sample videos). Swap for real work here.
- `src/lib/scroll.js` — Lenis ⇄ GSAP ticker ⇄ ScrollTrigger wiring.
- `src/components/*` — one component per chapter plus Preloader, Cursor, Nav, DayClock, Lightbox.

## Run
```
npm install
npm run dev
npm run build   # outputs dist/ with relative paths
```
