import { Link } from 'react-router-dom';

// Real category photos pulled by keyword from LoremFlickr — topical but not
// the reference screenshot's images. `lock` keeps each tile stable per load.
const catPhoto = (keywords: string, lock: number) =>
  `https://loremflickr.com/320/320/${keywords}?lock=${lock}`;

// Wedding service categories — Venues links to the live directory; the
// rest open an enquiry until their own listings exist.
const WEDDING_CATEGORIES: {
  title: string;
  subtitle: string;
  img: string;
  to: string;
  cardBg: string;
  circleTint: string;
}[] = [
  { title: 'Venues', subtitle: 'Banquet Halls, Marriage Gardens / Lawns', img: catPhoto('wedding,venue', 21), to: '/mandapams', cardBg: 'bg-indigo-100', circleTint: 'from-indigo-300 to-purple-200' },
  { title: 'Photographers', subtitle: 'Candid & traditional photographers', img: catPhoto('wedding,photographer', 22), to: '/services/photographers', cardBg: 'bg-orange-100', circleTint: 'from-orange-300 to-amber-200' },
  { title: 'Makeup', subtitle: 'Bridal Makeup Artists, Family Makeup', img: catPhoto('bride,makeup', 23), to: '/services/makeup', cardBg: 'bg-rose-100', circleTint: 'from-rose-300 to-pink-200' },
  { title: 'Planning & Decor', subtitle: 'Wedding Planners, Decorators', img: catPhoto('wedding,decoration', 24), to: '/services/planning-decor', cardBg: 'bg-amber-100', circleTint: 'from-amber-300 to-orange-200' },
  { title: 'Mehndi', subtitle: 'Mehendi Artists', img: catPhoto('henna,hands', 25), to: '/services/mehndi', cardBg: 'bg-stone-100', circleTint: 'from-amber-200 to-stone-300' },
  { title: 'Music & Dance', subtitle: 'DJs, Sangeet Choreographers, Bands', img: catPhoto('wedding,dance', 26), to: '/services/music-dance', cardBg: 'bg-orange-100', circleTint: 'from-orange-300 to-rose-200' },
  { title: 'Invites & Gifts', subtitle: 'Invitations, Favors, Trousseau Packers', img: catPhoto('wedding,gift', 27), to: '/services/invites-gifts', cardBg: 'bg-pink-100', circleTint: 'from-pink-300 to-rose-200' },
  { title: 'Food & Catering', subtitle: 'Catering Services, Cakes, Chaat & Live Food', img: catPhoto('indian,food', 28), to: '/services/food-catering', cardBg: 'bg-purple-100', circleTint: 'from-purple-300 to-fuchsia-200' },
  { title: 'Pandit & Rituals', subtitle: 'Purohits, Homam & Pooja services', img: catPhoto('wedding,ceremony', 29), to: '/services/pandit-rituals', cardBg: 'bg-yellow-100', circleTint: 'from-yellow-300 to-amber-200' },
  { title: 'Pre-Wedding Shoot', subtitle: 'Shoot Locations, Themes & Crews', img: catPhoto('couple,love', 30), to: '/services/pre-wedding-shoot', cardBg: 'bg-violet-100', circleTint: 'from-violet-300 to-indigo-200' },
];

export function Categories() {
  return (
    <div className="bg-cream-50">
      {/* ── Page header ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-paisley text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/25 via-orange-400/15 to-yellow-300/30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <p className="text-[11px] sm:text-xs font-semibold tracking-[0.3em] text-gold-300 uppercase mb-2">
            Plan the whole wedding
          </p>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl text-white"
            style={{ fontFamily: '"Plus Jakarta Sans", Inter, system-ui, sans-serif', fontWeight: 800, letterSpacing: '-0.02em' }}
          >
            Wedding Categories
          </h1>
          <p className="text-sm sm:text-base text-cream-100/90 mt-3 max-w-2xl">
            Everything you need to plan a wedding in one place — from venues and
            photographers to makeup, décor, food and rituals.
          </p>
        </div>
      </section>

      {/* ── Category grid ────────────────────────────────────────────── */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {WEDDING_CATEGORIES.map(({ title, subtitle, img, to, cardBg, circleTint }) => (
              <Link
                key={title}
                to={to}
                className={`group relative overflow-hidden rounded-2xl ${cardBg} flex items-center justify-between gap-3 pl-6 pr-0 min-h-[112px] sm:min-h-[124px] ring-1 ring-black/5 hover:shadow-lg hover:-translate-y-0.5 transition-all`}
              >
                <div className="relative z-10 py-5 max-w-[58%]">
                  <h3 className="text-lg sm:text-xl font-bold text-warm-800 flex items-center gap-1.5">
                    {title}
                    <span aria-hidden="true" className="text-warm-500 group-hover:translate-x-0.5 transition-transform">→</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-warm-600 mt-1 leading-snug">
                    {subtitle}
                  </p>
                </div>
                <div className="relative shrink-0 self-stretch flex items-center pr-4 sm:pr-5">
                  <div
                    className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-gradient-to-br ${circleTint} shadow-inner ring-4 ring-white/60`}
                  >
                    <img
                      src={img}
                      alt={title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
