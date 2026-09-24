import { useEffect, useRef } from 'react';
import { gsap, useGSAP } from '../lib/scroll.js';
import { chapters, films } from '../data.js';
import { ChapterTag, Corners } from './ui.jsx';

const ch = chapters.motion;

// Two reels per column; the column count follows the number of films.
const columns = Array.from({ length: Math.ceil(films.length / 2) }, (_, c) => films.slice(c * 2, c * 2 + 2));

function ReelCard({ film, index, onOpen }) {
  const video = useRef(null);

  // Reels only play while they're on screen.
  useEffect(() => {
    const v = video.current;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) v.play().catch(() => {});
      else v.pause();
    }, { threshold: 0.2 });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <button type="button" className="reel" data-cursor="Play" onClick={() => onOpen(film)}>
      <div className="reel__media">
        <video ref={video} src={film.video} poster={film.poster} muted loop playsInline preload="none" />
        <Corners />
        <span className="reel__rec mono"><i />REC</span>
        <span className="reel__index mono">{String(index + 1).padStart(2, '0')}</span>
        <span className="reel__info">
          <b>{film.title}</b>
          <span className="mono">{film.type} · {film.year}</span>
        </span>
      </div>
    </button>
  );
}

export default function Motion({ onOpen }) {
  const root = useRef(null);
  const track = useRef(null);
  const bar = useRef(null);
  const counter = useRef(null);

  useGSAP(() => {
    const distance = () => track.current.scrollWidth - window.innerWidth;
    const skew = gsap.quickTo('.reel__media', 'skewX', { duration: 0.5, ease: 'power3' });

    const pan = gsap.to(track.current, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: root.current,
        start: 'top top',
        end: () => '+=' + distance(),
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          bar.current.style.transform = `scaleX(${self.progress})`;
          counter.current.textContent = String(Math.min(columns.length, Math.floor(self.progress * columns.length) + 1)).padStart(2, '0');
          skew(gsap.utils.clamp(-6, 6, self.getVelocity() / -400));
        },
      },
    });

    // Columns drift up and down against each other while the reel pans.
    gsap.utils.toArray('.reel-col').forEach((col, i) => {
      const drift = i % 2 ? -50 : 50;
      gsap.fromTo(col, { y: drift }, {
        y: -drift, ease: 'none',
        scrollTrigger: { trigger: col, containerAnimation: pan, start: 'left right', end: 'right left', scrub: true },
      });
    });

    // Each reel slides open like a shutter as it enters from the right.
    gsap.utils.toArray('.reel__media').forEach((media) => {
      gsap.fromTo(media, { clipPath: 'inset(0% 0% 0% 100%)' }, {
        clipPath: 'inset(0% 0% 0% 0%)', ease: 'power2.out',
        scrollTrigger: { trigger: media, containerAnimation: pan, start: 'left 105%', end: 'left 65%', scrub: true },
      });
    });

    gsap.from('.motion__intro > *', {
      x: 80, opacity: 0, stagger: 0.1, duration: 1.2, ease: 'power3.out',
      scrollTrigger: { trigger: root.current, start: 'top 70%' },
    });
  }, { scope: root });

  return (
    <section className="motion" id="motion" ref={root} data-chapter={ch.name} data-tone={ch.tone}>
      <div className="motion__track" ref={track}>
        <div className="motion__intro">
          <ChapterTag chapter={ch} />
          <h2>When one frame<br />isn’t <em>enough.</em></h2>
          <p>Documentaries, brand films, music videos and weddings — shot, directed and cut as the light goes gold.</p>
          <p className="mono motion__meta">{films.length} films · {columns.length} columns · keep scrolling →</p>
        </div>

        {columns.map((col, c) => (
          <div className="reel-col" key={c}>
            {col.map((film, r) => (
              <ReelCard key={film.title} film={film} index={c * 2 + r} onOpen={onOpen} />
            ))}
          </div>
        ))}

        <div className="motion__outro">
          <p className="mono">End of reel</p>
          <h3>More on <em>Vimeo</em> ↗</h3>
        </div>
      </div>

      <div className="motion__hud mono">
        <span><b ref={counter}>01</b> / {String(columns.length).padStart(2, '0')}</span>
        <span className="motion__bar"><i ref={bar} /></span>
        <span>{ch.time} — golden hour</span>
      </div>
    </section>
  );
}
