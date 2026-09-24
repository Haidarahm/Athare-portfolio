import { motion } from 'framer-motion';
import { scrollTo } from '../lib/scroll.js';
import { EASE } from './ui.jsx';

const links = [
  ['#about', 'The Eye'],
  ['#still', 'Still'],
  ['#motion', 'Motion'],
  ['#dusk', 'Contact'],
];

export default function Nav({ ready }) {
  const go = (e, href) => { e.preventDefault(); scrollTo(href); };

  return (
    <motion.header
      className="nav"
      initial={{ y: -40, opacity: 0 }}
      animate={ready ? { y: 0, opacity: 1 } : undefined}
      transition={{ duration: 1, ease: EASE, delay: 0.6 }}
    >
      <a href="#top" className="nav__logo" onClick={(e) => go(e, '#top')}>A<em>h</em></a>
      <nav className="nav__links">
        {links.map(([href, label]) => (
          <a key={href} href={href} onClick={(e) => go(e, href)}>
            <span data-text={label}>{label}</span>
          </a>
        ))}
      </nav>
      <p className="nav__status mono"><span className="dot" />Booking autumn 2026</p>
    </motion.header>
  );
}
