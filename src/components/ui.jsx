import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const EASE = [0.76, 0, 0.24, 1];

// Letters that rise out of a mask once `play` turns true.
export function Letters({ text, play, delay = 0, stagger = 0.045 }) {
  return (
    <span className="letters" aria-label={text}>
      {[...text].map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className="letter"
          initial={{ y: '115%', rotate: 8 }}
          animate={play ? { y: '0%', rotate: 0 } : undefined}
          transition={{ duration: 1.1, ease: EASE, delay: delay + i * stagger }}
        >
          {ch === ' ' ? ' ' : ch}
        </motion.span>
      ))}
    </span>
  );
}

// Viewfinder brackets — the visual thread that runs through every chapter.
export function Corners({ className = '' }) {
  return (
    <span className={`corners ${className}`} aria-hidden="true">
      <i /><i /><i /><i />
    </span>
  );
}

export function ChapterTag({ chapter }) {
  return (
    <p className="chapter-tag mono">
      <span>Ch. {chapter.n}</span>
      <span className="chapter-tag__line" />
      <span>{chapter.name}</span>
      <span className="chapter-tag__time">{chapter.time}</span>
    </p>
  );
}

// Pulls its child toward the pointer, springs back on leave.
export function Magnetic({ children, strength = 0.35 }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 14, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 14, mass: 0.4 });

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div ref={ref} className="magnetic" style={{ x: sx, y: sy }} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </motion.div>
  );
}
