import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ScrollTrigger, useGSAP } from '../lib/scroll.js';
import { EASE } from './ui.jsx';

const START = 5.5 * 60;  // 05:30
const END = 20 * 60;     // 20:00
const R = 26;            // arc radius

const fmt = (mins) => `${String(Math.floor(mins / 60)).padStart(2, '0')}:${String(Math.floor(mins % 60)).padStart(2, '0')}`;

// The site's heartbeat: scrolling the page is living through one day.
// A sun rides a small arc from sunrise to sunset while the clock runs.
export default function DayClock({ ready }) {
  const timeRef = useRef(null);
  const sunRef = useRef(null);
  const [chapter, setChapter] = useState('Dawn');

  useGSAP(() => {
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: ({ progress }) => {
        timeRef.current.textContent = fmt(START + progress * (END - START));
        const a = Math.PI * (1 - progress);
        sunRef.current.setAttribute('cx', 30 + Math.cos(a) * R);
        sunRef.current.setAttribute('cy', 30 - Math.sin(a) * R);
      },
    });
    document.querySelectorAll('[data-chapter]').forEach((el) => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 55%',
        end: 'bottom 55%',
        onToggle: (self) => self.isActive && setChapter(el.dataset.chapter),
      });
    });
  });

  return (
    <motion.div
      className="dayclock mono"
      initial={{ opacity: 0, y: 20 }}
      animate={ready ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 1, ease: EASE, delay: 0.9 }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 60 34" width="60" height="34">
        <path d={`M4 30 A${R} ${R} 0 0 1 56 30`} className="dayclock__arc" />
        <line x1="0" y1="30" x2="60" y2="30" className="dayclock__horizon" />
        <circle ref={sunRef} cx={30 - R} cy="30" r="4" className="dayclock__sun" />
      </svg>
      <div>
        <span ref={timeRef} className="dayclock__time">05:30</span>
        <motion.span key={chapter} className="dayclock__chapter" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
          {chapter}
        </motion.span>
      </div>
    </motion.div>
  );
}
