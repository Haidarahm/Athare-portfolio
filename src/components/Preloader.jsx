import { useEffect, useState } from 'react';
import { AnimatePresence, animate, motion } from 'framer-motion';
import { EASE } from './ui.jsx';

// "Developing the roll": a counter runs to 100 while a blank print fades into an image.
export default function Preloader({ onDone }) {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const controls = animate(0, 100, {
      duration: 2.4,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => setTimeout(() => setVisible(false), 250),
    });
    return () => controls.stop();
  }, []);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          className="preloader"
          exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          transition={{ duration: 1.1, ease: EASE }}
        >
          <p className="preloader__top mono">
            <span>Roll 01</span><span>Developing</span><span>ISO 400</span>
          </p>

          <div className="preloader__print">
            <motion.img
              src="https://picsum.photos/seed/dawn-hero/600/750"
              alt=""
              initial={{ opacity: 0, filter: 'brightness(2.4) contrast(0.3) grayscale(1)' }}
              animate={{ opacity: 1, filter: 'brightness(1) contrast(1) grayscale(0)' }}
              transition={{ duration: 2.4, ease: 'easeInOut' }}
            />
            <span className="preloader__corners" />
          </div>

          <div className="preloader__count">
            <span>{String(count).padStart(3, '0')}</span>
            <small className="mono">%</small>
          </div>
          <p className="preloader__label mono">One day of light — still &amp; moving</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
