import { useRef } from 'react';
import { gsap, useGSAP } from '../lib/scroll.js';
import { chapters, person } from '../data.js';
import { ChapterTag, Magnetic } from './ui.jsx';

const ch = chapters.dusk;

// Dusk: the sun that rose in the hero sets behind the horizon, and the day ends in an invitation.
export default function Dusk() {
  const root = useRef(null);

  useGSAP(() => {
    gsap.fromTo('.dusk__sun', { yPercent: -70 }, {
      yPercent: 45, ease: 'none',
      scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom bottom', scrub: true },
    });
    gsap.fromTo('.dusk__horizon', { scaleX: 0 }, {
      scaleX: 1, ease: 'none',
      scrollTrigger: { trigger: root.current, start: 'top 70%', end: 'top 10%', scrub: true },
    });
    gsap.from('.dusk__title .dusk__line > span', {
      yPercent: 110, stagger: 0.12, duration: 1.3, ease: 'expo.out',
      scrollTrigger: { trigger: '.dusk__title', start: 'top 80%' },
    });
    gsap.from('.dusk__cta, .dusk__socials li', {
      y: 30, opacity: 0, stagger: 0.08, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: '.dusk__cta', start: 'top 90%' },
    });
  }, { scope: root });

  return (
    <section className="dusk" id="dusk" ref={root} data-chapter={ch.name} data-tone={ch.tone}>
      <div className="dusk__sky" aria-hidden="true">
        <div className="dusk__sun" />
      </div>
      <span className="dusk__horizon" aria-hidden="true" />

      <div className="dusk__content">
        <ChapterTag chapter={ch} />
        <h2 className="dusk__title">
          <span className="dusk__line"><span>Before the</span></span>
          <span className="dusk__line"><span><em>light goes,</em></span></span>
          <span className="dusk__line"><span>let’s talk.</span></span>
        </h2>

        <div className="dusk__cta">
          <Magnetic>
            <a className="dusk__mail" href={`mailto:${person.email}`} data-cursor="Write">
              <span>{person.email}</span><i>→</i>
            </a>
          </Magnetic>
          <p className="dusk__note">Stills, films, or both — tell me about the day you want kept.</p>
        </div>

        <ul className="dusk__socials mono">
          {person.socials.map((s) => <li key={s}><a href="#" target="_blank" rel="noopener">{s}</a></li>)}
        </ul>
      </div>

      <footer className="credits mono">
        <span>© 2026 {person.first} {person.last}</span>
        <span>Fin. — {ch.time}</span>
        <span>Shot on light &amp; patience</span>
      </footer>
    </section>
  );
}
