import { useRef } from 'react';
import { gsap, useGSAP } from '../lib/scroll.js';
import { chapters, contactSheet, photo, stills } from '../data.js';
import { ChapterTag, Corners } from './ui.jsx';

const ch = chapters.still;

// Position of `el` inside `ancestor`, ignoring transforms — stable while pinned.
function offsetWithin(el, ancestor) {
  let x = 0, y = 0;
  for (let n = el; n && n !== ancestor; n = n.offsetParent) { x += n.offsetLeft; y += n.offsetTop; }
  return { x, y };
}

// Distribute stills into three columns for the parallax gallery.
const columns = [0, 1, 2].map((c) => stills.filter((_, i) => i % 3 === c));

export default function Still() {
  const root = useRef(null);

  useGSAP(() => {
    const sheet = root.current.querySelector('.sheet');
    const pick = sheet.querySelector('.sheet__frame.is-pick');
    const others = sheet.querySelectorAll('.sheet__frame:not(.is-pick)');

    // 1. The contact sheet: frames print in, one gets circled, then it fills the screen.
    const zoom = () => {
      const { x, y } = offsetWithin(pick, sheet);
      const w = pick.offsetWidth, h = pick.offsetHeight;
      return {
        x: sheet.offsetWidth / 2 - (x + w / 2),
        y: sheet.offsetHeight / 2 - (y + h / 2),
        scale: Math.max(sheet.offsetWidth / w, sheet.offsetHeight / h) * 1.02,
      };
    };

    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { trigger: sheet, start: 'top top', end: '+=280%', scrub: 1, pin: true, invalidateOnRefresh: true },
    });
    tl.from('.sheet__frame', { clipPath: 'inset(0% 0% 100% 0%)', stagger: 0.06, duration: 0.5, ease: 'power2.out' }, 0)
      .from('.sheet__frame img', { filter: 'brightness(2.2) contrast(0.4) grayscale(1)', stagger: 0.06, duration: 0.8 }, 0)
      .fromTo('.sheet__mark path', { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.6, ease: 'power1.inOut' }, 1.3)
      .to(others, { opacity: 0.12, duration: 0.4 }, 2)
      .to('.sheet__head, .sheet__label', { opacity: 0, y: -20, duration: 0.3 }, 2.2)
      .to('.sheet__mark', { opacity: 0, duration: 0.2 }, 2.5)
      .to(pick, { x: () => zoom().x, y: () => zoom().y, scale: () => zoom().scale, duration: 1.4, ease: 'power2.inOut' }, 2.5)
      .to(others, { opacity: 0, duration: 0.4 }, 2.8)
      .fromTo('.sheet__caption', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.4 }, 3.8)
      .to({}, { duration: 0.4 });

    // 2. Selected stills: columns drift at different speeds, each print wipes in.
    gsap.utils.toArray('.gallery__col').forEach((col, i) => {
      const drift = [70, -70, 140][i];
      gsap.fromTo(col, { y: drift }, {
        y: -drift, ease: 'none',
        scrollTrigger: { trigger: '.gallery__grid', start: 'top bottom', end: 'bottom top', scrub: true },
      });
    });

    gsap.utils.toArray('.print').forEach((print) => {
      const img = print.querySelector('img');
      gsap.fromTo(print.querySelector('.print__img'), { clipPath: 'inset(15% 15% 15% 15%)' }, {
        clipPath: 'inset(0% 0% 0% 0%)', ease: 'none',
        scrollTrigger: { trigger: print, start: 'top 95%', end: 'top 45%', scrub: true },
      });
      gsap.fromTo(img, { scale: 1.35 }, {
        scale: 1, ease: 'none',
        scrollTrigger: { trigger: print, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    });

    gsap.from('.gallery__head > *', {
      y: 50, opacity: 0, stagger: 0.12, duration: 1.1, ease: 'power3.out',
      scrollTrigger: { trigger: '.gallery__head', start: 'top 80%' },
    });
  }, { scope: root });

  return (
    <section className="still" id="still" ref={root} data-chapter={ch.name} data-tone={ch.tone}>
      <div className="sheet">
        <div className="sheet__head">
          <ChapterTag chapter={ch} />
          <h2>Thirty-six chances.<br /><em>One photograph.</em></h2>
        </div>

        <div className="sheet__grid">
          {contactSheet.frames.map((seed, i) => {
            const isPick = i === contactSheet.pick;
            return (
              <figure className={`sheet__frame${isPick ? ' is-pick' : ''}`} key={seed}>
                <img src={photo(seed, isPick ? 1800 : 600, isPick ? 1200 : 400)} alt="" loading={isPick ? 'eager' : 'lazy'} />
                <span className="sheet__label mono">{String(i + 1).padStart(2, '0')}A</span>
                {isPick && (
                  <svg className="sheet__mark" viewBox="0 0 120 80" preserveAspectRatio="none" aria-hidden="true">
                    <path pathLength="1" d="M60 4 C 100 2, 118 22, 116 42 C 114 66, 84 78, 56 76 C 22 74, 3 58, 5 38 C 7 16, 34 5, 66 7 C 80 8, 92 12, 98 18" />
                  </svg>
                )}
              </figure>
            );
          })}
        </div>

        <p className="sheet__roll mono">{contactSheet.roll} · Kodak Portra 400</p>
        <p className="sheet__caption">
          <span className="mono">{ch.time} — high noon</span>
          {contactSheet.caption}
        </p>
      </div>

      <div className="gallery">
        <div className="gallery__head">
          <p className="mono">Selected stills — 2023 / 2026</p>
          <h2>Light, <em>kept.</em></h2>
          <p className="gallery__note">Printed small, looked at slowly. A handful of frames from the last few years of walking around with a camera.</p>
        </div>

        <div className="gallery__grid">
          {columns.map((col, c) => (
            <div className="gallery__col" key={c}>
              {col.map((s) => {
                const n = stills.indexOf(s) + 1;
                return (
                  <figure className="print" key={s.seed} data-cursor="Still">
                    <div className="print__img" style={{ aspectRatio: s.ratio }}>
                      <img src={photo(s.seed, 900, 1200)} alt={s.title} loading="lazy" />
                      <Corners />
                    </div>
                    <figcaption>
                      <span className="mono">{String(n).padStart(2, '0')}</span>
                      <b>{s.title}</b>
                      <span className="mono">{s.place}, {s.year}</span>
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
