import { useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap, useGSAP } from '../lib/scroll.js';
import { chapters, person, photo } from '../data.js';
import { ChapterTag, Corners, EASE, Letters } from './ui.jsx';

const ch = chapters.dawn;

// Dawn: a small window of first light sits between the letters of the name.
// Scrolling opens it, like an aperture, until the morning fills the screen.
export default function Hero({ ready }) {
  const root = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: root.current, start: 'top top', end: '+=140%', scrub: 1, pin: true },
    });
    tl.to('.hero__lens', { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'power1.inOut' }, 0)
      .to('.hero__lens img', { scale: 1, ease: 'power1.inOut' }, 0)
      .to('.hero__lens .corners', { opacity: 0, duration: 0.2 }, 0)
      .to('.hero__line--a', { xPercent: -30, opacity: 0, ease: 'power1.in' }, 0)
      .to('.hero__line--b', { xPercent: 30, opacity: 0, ease: 'power1.in' }, 0)
      .to('.hero__meta, .hero__scroll', { opacity: 0, y: 30, duration: 0.3 }, 0)
      .fromTo('.hero__caption', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.35 }, 0.65);
  }, { scope: root });

  const fade = (delay) => ({
    initial: { opacity: 0, y: 20 },
    animate: ready ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 1, ease: EASE, delay },
  });

  return (
    <section className="hero" id="top" ref={root} data-chapter={ch.name} data-tone={ch.tone}>
      <div className="hero__lens">
        <img src={photo('dawn-hero', 1920, 1280)} alt="First light over the dunes" />
        <Corners />
        <p className="hero__caption">
          <span className="mono">{ch.time} — first light</span>
          Every story I tell <em>starts with light.</em>
        </p>
      </div>

      <h1 className="hero__title">
        <span className="hero__line hero__line--a"><Letters text={person.first} play={ready} delay={0.2} /></span>
        <span className="hero__line hero__line--b"><em><Letters text={person.last} play={ready} delay={0.45} stagger={0.035} /></em></span>
      </h1>

      <motion.div className="hero__meta" {...fade(1.1)}>
        <ChapterTag chapter={ch} />
        <p className="hero__roles">Photographer <span>&amp;</span> Videographer</p>
        <p className="hero__intro">One day, kept two ways — <em>still</em> and <em>moving</em>.</p>
      </motion.div>

      <motion.p className="hero__scroll mono" {...fade(1.4)}>
        <span>Scroll — the day begins</span><i />
      </motion.p>
    </section>
  );
}
