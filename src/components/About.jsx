import { useRef } from 'react';
import { gsap, useGSAP } from '../lib/scroll.js';
import { chapters, photo } from '../data.js';
import { ChapterTag, Corners } from './ui.jsx';

const ch = chapters.eye;

const statement =
  'I’m Athari. I carry two cameras through every day — one to stop time, one to let it run. ' +
  'Portraits, places, brands and weddings: I look for the quiet second before something happens, ' +
  'then keep it as a photograph or cut it into a film.';

const stats = [
  { value: 8, suffix: '', label: 'Years behind the lens' },
  { value: 140, suffix: '+', label: 'Films delivered' },
  { value: 60, suffix: 'k', label: 'Frames kept' },
];

export default function About() {
  const root = useRef(null);

  useGSAP(() => {
    // Words light up one by one as you read down the page.
    gsap.fromTo('.about__statement .w', { opacity: 0.12 }, {
      opacity: 1, stagger: 0.1, ease: 'none',
      scrollTrigger: { trigger: '.about__statement', start: 'top 80%', end: 'bottom 45%', scrub: true },
    });

    gsap.fromTo('.about__portrait', { clipPath: 'inset(100% 0% 0% 0%)' }, {
      clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.inOut',
      scrollTrigger: { trigger: '.about__portrait', start: 'top 85%' },
    });
    gsap.fromTo('.about__portrait img', { yPercent: -12, scale: 1.15 }, {
      yPercent: 12, scale: 1.15, ease: 'none',
      scrollTrigger: { trigger: '.about__portrait', start: 'top bottom', end: 'bottom top', scrub: true },
    });

    gsap.from('.about__pair > div', {
      y: 60, opacity: 0, stagger: 0.15, duration: 1.1, ease: 'power3.out',
      scrollTrigger: { trigger: '.about__pair', start: 'top 80%' },
    });

    gsap.utils.toArray('.stat__num').forEach((el) => {
      const counter = { v: 0 };
      gsap.to(counter, {
        v: Number(el.dataset.value), duration: 2, ease: 'power2.out',
        onUpdate: () => { el.textContent = Math.round(counter.v) + el.dataset.suffix; },
        scrollTrigger: { trigger: el, start: 'top 90%' },
      });
    });
  }, { scope: root });

  return (
    <section className="about" id="about" ref={root} data-chapter={ch.name} data-tone={ch.tone}>
      <ChapterTag chapter={ch} />
      <p className="about__statement">
        {statement.split(' ').map((w, i) => <span className="w" key={i}>{w} </span>)}
      </p>

      <div className="about__row">
        <figure className="about__portrait">
          <img src={photo('athari-portrait', 900, 1200)} alt="Portrait of Athari" loading="lazy" />
          <Corners />
          <figcaption className="mono">Self portrait — {ch.time}</figcaption>
        </figure>

        <div className="about__pair">
          <div>
            <span className="mono">A.</span>
            <h3>Still</h3>
            <p>For the moment that will never come back. Portraits, places and the light between them.</p>
          </div>
          <div>
            <span className="mono">B.</span>
            <h3><em>Motion</em></h3>
            <p>For moments that need time to be felt. Documentary, brand films, music and weddings.</p>
          </div>
        </div>
      </div>

      <ul className="about__stats">
        {stats.map((s) => (
          <li className="stat" key={s.label}>
            <span className="stat__num" data-value={s.value} data-suffix={s.suffix}>0</span>
            <span className="stat__label mono">{s.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
