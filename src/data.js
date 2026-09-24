// Placeholder content — swap for Athari's real work.
// Photos come from picsum.photos (seeded, so they stay the same between visits).
// Videos are public sample clips used only as stand-ins.

export const photo = (seed, w = 900, h = 1200) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const person = {
  first: 'Athari',
  last: 'al-Hassouni',
  email: 'hello@atharialhassouni.com',
  socials: ['Instagram', 'Vimeo', 'Behance', 'YouTube'],
};

// The site is one day. Each chapter owns a time of day and a background tone.
export const chapters = {
  dawn:   { n: '00', time: '05:42', name: 'Dawn',    tone: '#f6ece2' },
  eye:    { n: '01', time: '09:10', name: 'The Eye', tone: '#f4f1ea' },
  still:  { n: '02', time: '12:00', name: 'Still',   tone: '#efeee9' },
  motion: { n: '03', time: '17:30', name: 'Motion',  tone: '#eaece6' },
  dusk:   { n: '04', time: '19:48', name: 'Dusk',    tone: '#f4e1cd' },
};

// Contact sheet: 12 frames from one roll. `pick` is the frame that gets circled and enlarged.
export const contactSheet = {
  roll: 'Roll 14 — Muscat, spring',
  pick: 6,
  caption: 'Frame 07A — the one that made the whole roll worth it.',
  frames: ['sheet-a', 'sheet-b', 'sheet-c', 'sheet-d', 'sheet-e', 'sheet-f', 'sheet-g', 'sheet-h', 'sheet-i', 'sheet-j', 'sheet-k', 'sheet-l'],
};

export const stills = [
  { seed: 'still-dune',     title: 'Dune Study',        place: 'Wahiba Sands',   year: 2026, ratio: '3 / 4' },
  { seed: 'still-harbor',   title: 'Harbour, 6am',      place: 'Muttrah',        year: 2026, ratio: '4 / 5' },
  { seed: 'still-hands',    title: 'Hands of a Weaver', place: 'Nizwa',          year: 2025, ratio: '2 / 3' },
  { seed: 'still-window',   title: 'North Window',      place: 'Studio',         year: 2025, ratio: '4 / 5' },
  { seed: 'still-market',   title: 'Souq at Noon',      place: 'Muttrah',        year: 2025, ratio: '2 / 3' },
  { seed: 'still-sea',      title: 'Flat Sea',          place: 'Sur',            year: 2024, ratio: '3 / 4' },
  { seed: 'still-portrait', title: 'Grandfather',       place: 'Bahla',          year: 2024, ratio: '3 / 4' },
  { seed: 'still-road',     title: 'Long Road',         place: 'Jebel Akhdar',   year: 2024, ratio: '4 / 5' },
  { seed: 'still-palms',    title: 'Palm Shade',        place: 'Birkat al Mouz', year: 2023, ratio: '2 / 3' },
];

const TV = 'https://test-videos.co.uk/vids/';
const MDN = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/';
const W3 = 'https://media.w3.org/2010/05/';
const SL = 'https://download.samplelib.com/mp4/';

// Reels: two per column, so the reel grows to ceil(films.length / 2) columns.
export const films = [
  { title: 'Salt & Silence', type: 'Documentary',  role: 'Director / DP',     year: 2026, video: TV + 'jellyfish/mp4/h264/720/Jellyfish_720_10s_2MB.mp4',         poster: photo('film-salt', 540, 960) },
  { title: 'Desert Bloom',   type: 'Fashion Film', role: 'Cinematographer',   year: 2026, video: MDN + 'flower.mp4',                                              poster: photo('film-bloom', 540, 960) },
  { title: 'Nightshift',     type: 'Music Video',  role: 'Director / Editor', year: 2026, video: TV + 'sintel/mp4/h264/720/Sintel_720_10s_2MB.mp4',               poster: photo('film-night', 540, 960) },
  { title: 'Low Tide',       type: 'Travel Film',  role: 'Director / Aerial', year: 2025, video: 'https://vjs.zencdn.net/v/oceans.mp4',                           poster: photo('film-tide', 540, 960) },
  { title: 'Oud',            type: 'Brand Film',   role: 'DP / Colorist',     year: 2025, video: TV + 'bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_2MB.mp4', poster: photo('film-oud', 540, 960) },
  { title: 'Friday Hands',   type: 'Short Film',   role: 'Cinematographer',   year: 2025, video: MDN + 'friday.mp4',                                              poster: photo('film-friday', 540, 960) },
  { title: 'Ember',          type: 'Music Video',  role: 'Director / DP',     year: 2025, video: W3 + 'sintel/trailer.mp4',                                       poster: photo('film-ember', 540, 960) },
  { title: 'Green Hour',     type: 'Commercial',   role: 'Cinematographer',   year: 2024, video: SL + 'sample-10s.mp4',                                           poster: photo('film-green', 540, 960) },
  { title: 'Ever After',     type: 'Wedding Film', role: 'Videographer',      year: 2024, video: SL + 'sample-5s.mp4',                                            poster: photo('film-ever', 540, 960) },
  { title: 'Paper Moons',    type: 'Promo',        role: 'Editor / Colorist', year: 2024, video: W3 + 'bunny/trailer.mp4',                                        poster: photo('film-moons', 540, 960) },
];
