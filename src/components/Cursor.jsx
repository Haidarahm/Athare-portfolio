import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// A soft ring that trails the pointer and names what a click will do (data-cursor="View").
export default function Cursor() {
  const [label, setLabel] = useState('');
  const [enabled] = useState(() => window.matchMedia('(hover: hover) and (pointer: fine)').matches);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 350, damping: 32, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 350, damping: 32, mass: 0.5 });

  useEffect(() => {
    if (!enabled) return;
    const move = (e) => { x.set(e.clientX); y.set(e.clientY); };
    const over = (e) => setLabel(e.target.closest('[data-cursor]')?.dataset.cursor ?? '');
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerover', over);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerover', over);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div className="cursor-dot" style={{ x, y }} aria-hidden="true" />
      <motion.div
        className="cursor-ring"
        style={{ x: sx, y: sy }}
        animate={{ width: label ? 96 : 36, height: label ? 96 : 36 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        aria-hidden="true"
      >
        <motion.span animate={{ opacity: label ? 1 : 0, scale: label ? 1 : 0.6 }}>{label}</motion.span>
      </motion.div>
    </>
  );
}
