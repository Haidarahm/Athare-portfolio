import { useEffect, useState } from 'react';
import { initScroll, lenis, gsap, ScrollTrigger, useGSAP } from './lib/scroll.js';
import Preloader from './components/Preloader.jsx';
import Cursor from './components/Cursor.jsx';
import Nav from './components/Nav.jsx';
import DayClock from './components/DayClock.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Still from './components/Still.jsx';
import Marquee from './components/Marquee.jsx';
import Motion from './components/Motion.jsx';
import Lightbox from './components/Lightbox.jsx';
import Dusk from './components/Dusk.jsx';

export default function App() {
  const [ready, setReady] = useState(false);
  const [film, setFilm] = useState(null);

  useEffect(() => {
    const kill = initScroll();
    lenis.stop();
    return kill;
  }, []);

  // Wake the scroll once the preloader has left, and freeze it while a film is open.
  useEffect(() => {
    if (!ready || !lenis) return;
    if (film) lenis.stop();
    else lenis.start();
  }, [ready, film]);

  // The day's light: every chapter tints the page as it takes over the screen.
  useGSAP(() => {
    document.querySelectorAll('[data-tone]').forEach((section) => {
      const tone = () => gsap.to(document.body, { backgroundColor: section.dataset.tone, duration: 1.2, ease: 'power2.out', overwrite: 'auto' });
      ScrollTrigger.create({ trigger: section, start: 'top 55%', end: 'bottom 55%', onEnter: tone, onEnterBack: tone });
    });
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
  });

  useEffect(() => {
    if (!ready) return;
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener('load', refresh);
    return () => window.removeEventListener('load', refresh);
  }, [ready]);

  return (
    <>
      <Preloader onDone={() => setReady(true)} />
      <Cursor />
      <div className="grain" aria-hidden="true" />
      <Nav ready={ready} />
      <DayClock ready={ready} />
      <main>
        <Hero ready={ready} />
        <About />
        <Still />
        <Marquee />
        <Motion onOpen={setFilm} />
        <Dusk />
      </main>
      <Lightbox film={film} onClose={() => setFilm(null)} />
    </>
  );
}
