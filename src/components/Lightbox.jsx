import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Corners, EASE } from './ui.jsx';

export default function Lightbox({ film, onClose }) {
  useEffect(() => {
    if (!film) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [film, onClose]);

  return (
    <AnimatePresence>
      {film && (
        <motion.div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={film.title}
          initial={{ clipPath: 'inset(50% 0% 50% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{ clipPath: 'inset(50% 0% 50% 0%)' }}
          transition={{ duration: 0.8, ease: EASE }}
          onClick={onClose}
          data-cursor="Close"
        >
          <motion.div
            className="lightbox__frame"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
            onClick={(e) => e.stopPropagation()}
            data-cursor=""
          >
            <video src={film.video} poster={film.poster} controls autoPlay playsInline />
            <Corners />
          </motion.div>
          <motion.div
            className="lightbox__meta"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.35 }}
          >
            <h3>{film.title}</h3>
            <p className="mono">{film.type} · {film.role} · {film.year}</p>
          </motion.div>
          <button type="button" className="lightbox__close mono" onClick={onClose}>Close ✕</button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
