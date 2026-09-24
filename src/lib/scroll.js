import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export let lenis = null;

// Lenis drives the scroll, GSAP's ticker drives Lenis, ScrollTrigger listens to Lenis.
export function initScroll() {
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);

  lenis = new Lenis({ lerp: 0.09 });
  lenis.on('scroll', ScrollTrigger.update);
  const tick = (time) => lenis?.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(tick);
    lenis?.destroy();
    lenis = null;
  };
}

export function scrollTo(target) {
  if (lenis) lenis.scrollTo(target, { duration: 1.8 });
  else document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
}

export { gsap, ScrollTrigger, useGSAP };
