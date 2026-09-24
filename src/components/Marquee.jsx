import { useRef } from 'react';
import { gsap, useGSAP } from '../lib/scroll.js';

const words = ['Still', 'Motion', 'Portrait', 'Documentary', 'Place', 'Brand Film', 'Wedding', 'Light'];

// The hinge between the two halves of the day: two bands slide past each other.
export default function Marquee() {
  const root = useRef(null);

  useGSAP(() => {
    gsap.fromTo('.marquee__row--a', { xPercent: 0 }, {
      xPercent: -25, ease: 'none',
      scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
    });
    gsap.fromTo('.marquee__row--b', { xPercent: -25 }, {
      xPercent: 0, ease: 'none',
      scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  }, { scope: root });

  const row = [...words, ...words].map((w, i) => (
    <span key={i}>{i % 2 ? <em>{w}</em> : w}<b>✺</b></span>
  ));

  return (
    <div className="marquee" ref={root} aria-hidden="true">
      <div className="marquee__row marquee__row--a">{row}</div>
      <div className="marquee__row marquee__row--b">{row}</div>
    </div>
  );
}
