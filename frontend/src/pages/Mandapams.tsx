import { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { MANDAPAMS } from '@/data/mandapams';
import { DISTRICT_NAMES, taluksOf } from '@/data/karnataka';

const countByDistrict = (d: string) => MANDAPAMS.filter((m) => m.district === d).length;
const CAPACITY_BUCKETS = [
  { label: 'Any capacity', min: 0,    max: 99999 },
  { label: 'Up to 500',     min: 0,    max: 500   },
  { label: '500 – 1,000',   min: 500,  max: 1000  },
  { label: '1,000 – 1,500', min: 1000, max: 1500  },
  { label: '1,500+',        min: 1500, max: 99999 },
];

const cityPhoto = (keywords: string, lock: number) =>
  `https://loremflickr.com/400/520/${keywords}?lock=${lock}`;

// Showcase carousel — top cities mapped to the district they filter by.
const TOP_CITIES: { name: string; district: string; img: string }[] = [
  { name: 'Bengaluru', district: 'Bengaluru Urban', img: cityPhoto('bangalore,city', 81) },
  { name: 'Mysuru', district: 'Mysuru', img: cityPhoto('mysore,palace', 82) },
  { name: 'Mangaluru', district: 'Dakshina Kannada', img: cityPhoto('mangalore,beach', 83) },
  { name: 'Hubballi', district: 'Dharwad', img: cityPhoto('hubli,city', 84) },
  { name: 'Belagavi', district: 'Belagavi', img: cityPhoto('belgaum,fort', 85) },
  { name: 'Udupi', district: 'Udupi', img: cityPhoto('udupi,temple', 86) },
  { name: 'Shivamogga', district: 'Shivamogga', img: cityPhoto('shimoga,waterfall', 87) },
  { name: 'Tumakuru', district: 'Tumakuru', img: cityPhoto('temple,karnataka', 88) },
  { name: 'Hassan', district: 'Hassan', img: cityPhoto('belur,temple', 89) },
  { name: 'Hampi', district: 'Vijayanagara', img: cityPhoto('hampi,ruins', 90) },
];

export function Mandapams() {
  const [query, setQuery] = useState('');
  const [district, setDistrict] = useState('All');
  const [taluk, setTaluk] = useState('All');
  const [locality, setLocality] = useState('All');
  const [capIdx, setCapIdx] = useState(0);

  const talukOptions = district === 'All' ? [] : taluksOf(district);

  // Localities depend on the chosen district/taluk so the dropdown stays short.
  const localityOptions = useMemo(() => {
    const pool = MANDAPAMS.filter(
      (m) =>
        (district === 'All' || m.district === district) &&
        (taluk === 'All' || m.taluk === taluk),
    );
    return Array.from(new Set(pool.map((m) => m.locality))).sort();
  }, [district, taluk]);

  const scrollerRef = useRef<HTMLDivElement>(null);
  const scrollCarousel = (dir: 1 | -1) =>
    scrollerRef.current?.scrollBy({ left: dir * 320, behavior: 'smooth' });

  const pickCity = (cityDistrict: string) => {
    setDistrict(cityDistrict);
    setTaluk('All');
    document.getElementById('venue-results')?.scrollIntoView({ behavior: 'smooth' });
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const bucket = CAPACITY_BUCKETS[capIdx];
    return MANDAPAMS.filter((m) => {
      if (q && !`${m.name} ${m.locality}`.toLowerCase().includes(q)) return false;
      if (district !== 'All' && m.district !== district) return false;
      if (taluk !== 'All' && m.taluk !== taluk) return false;
      if (locality !== 'All' && m.locality !== locality) return false;
      if (m.capacityMax < bucket.min || m.capacityMin > bucket.max) return false;
      return true;
    });
  }, [query, district, taluk, locality, capIdx]);

  const onDistrictChange = (value: string) => {
    setDistrict(value);
    setTaluk('All'); // reset taluk + locality when district changes
    setLocality('All');
  };

  const onTalukChange = (value: string) => {
    setTaluk(value);
    setLocality('All');
  };

  const resetFilters = () => {
    setQuery('');
    setDistrict('All');
    setTaluk('All');
    setLocality('All');
    setCapIdx(0);
  };

  return (
    <div className="bg-cream-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-paisley text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-maroon-900/85 via-maroon-800/80 to-maroon-700/75" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          <span aria-hidden="true" className="text-5xl drop-shadow">🛕</span>
          <div className="flex-1">
            <p className="text-[11px] sm:text-xs font-semibold tracking-[0.3em] text-gold-300 uppercase mb-1">
              Browse · Bengaluru
            </p>
            <h1
              className="text-3xl sm:text-4xl text-white leading-tight"
              style={{ fontFamily: '"Plus Jakarta Sans", Inter, system-ui, sans-serif', fontWeight: 800, letterSpacing: '-0.02em' }}
            >
              All Kalyana Mandapams
            </h1>
            <div className="mt-2 h-0.5 w-16 bg-gold-400 rounded-full" />
            <p className="mt-2 text-sm text-cream-100/85 max-w-2xl">
              Filter by area or guest count and dive into individual venues for capacity, pricing, and direct phone numbers.
            </p>
          </div>
        </div>
      </section>

      {/* Top Venues by City */}
      <section className="py-10 sm:py-12 bg-cream-50 border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4 mb-6">
            <div>
              <h2
                className="text-2xl sm:text-3xl text-maroon-900"
                style={{ fontFamily: '"Plus Jakarta Sans", Inter, system-ui, sans-serif', fontWeight: 800, letterSpacing: '-0.02em' }}
              >
                Top Venues by City
              </h2>
              <p className="text-sm text-warm-600 mt-1 max-w-xl">
                Start your happily-ever-after in the most breath-taking venues across Karnataka.
              </p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                type="button"
                onClick={() => scrollCarousel(-1)}
                aria-label="Scroll left"
                className="w-10 h-10 rounded-full border-2 border-warm-300 text-warm-600 hover:border-maroon-400 hover:text-maroon-700 flex items-center justify-center transition-colors"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() => scrollCarousel(1)}
                aria-label="Scroll right"
                className="w-10 h-10 rounded-full bg-maroon-600 hover:bg-maroon-700 text-white flex items-center justify-center transition-colors shadow"
              >
                ›
              </button>
            </div>
          </div>

          <div
            ref={scrollerRef}
            className="flex gap-4 overflow-x-auto snap-x scroll-smooth pb-2 -mb-2"
            style={{ scrollbarWidth: 'none' }}
          >
            {TOP_CITIES.map((c) => (
              <button
                key={c.name}
                type="button"
                onClick={() => pickCity(c.district)}
                className="group relative shrink-0 w-44 sm:w-52 aspect-[3/4] rounded-2xl overflow-hidden snap-start ring-1 ring-black/5 shadow-sm hover:shadow-lg transition-shadow text-left"
              >
                <img
                  src={c.img}
                  alt={c.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <p className="text-lg font-bold leading-tight drop-shadow">{c.name}</p>
                  <p className="text-xs text-white/90 mt-0.5 flex items-center gap-1">
                    {countByDistrict(c.district)} properties <span aria-hidden="true">›</span>
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Filter toolbar */}
      <section className="border-b border-cream-200 bg-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center gap-2 lg:gap-3">
          <label className="flex items-center gap-2 px-3 py-2 border-2 border-warm-300 rounded-md bg-white flex-1 w-full sm:w-auto sm:min-w-[220px] cursor-text">
            <svg aria-hidden="true" className="w-4 h-4 text-warm-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or area"
              className="w-full text-sm outline-none bg-transparent placeholder:text-warm-400"
            />
          </label>

          <select
            value={district}
            onChange={(e) => onDistrictChange(e.target.value)}
            className="px-3 py-2 border-2 border-warm-300 rounded-md bg-white text-sm cursor-pointer text-warm-800 w-full sm:w-auto sm:min-w-[170px]"
          >
            <option value="All">All districts</option>
            {DISTRICT_NAMES.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          <select
            value={taluk}
            onChange={(e) => onTalukChange(e.target.value)}
            disabled={district === 'All'}
            className="px-3 py-2 border-2 border-warm-300 rounded-md bg-white text-sm cursor-pointer text-warm-800 w-full sm:w-auto sm:min-w-[160px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="All">All taluks</option>
            {talukOptions.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          <select
            value={locality}
            onChange={(e) => setLocality(e.target.value)}
            disabled={localityOptions.length === 0}
            className="px-3 py-2 border-2 border-warm-300 rounded-md bg-white text-sm cursor-pointer text-warm-800 w-full sm:w-auto sm:min-w-[160px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="All">All localities</option>
            {localityOptions.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>

          <select
            value={capIdx}
            onChange={(e) => setCapIdx(Number(e.target.value))}
            className="px-3 py-2 border-2 border-warm-300 rounded-md bg-white text-sm cursor-pointer text-warm-800 w-full sm:w-auto sm:min-w-[180px]"
          >
            {CAPACITY_BUCKETS.map((b, i) => (
              <option key={b.label} value={i}>{b.label}</option>
            ))}
          </select>

          <button
            type="button"
            onClick={resetFilters}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full border-2 border-warm-400 bg-white hover:border-maroon-500 hover:text-maroon-700 text-warm-700 text-xs font-bold tracking-[0.15em] uppercase transition-colors"
          >
            Clear
          </button>
        </div>
      </section>

      {/* Results */}
      <section id="venue-results" className="scroll-mt-4 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-100 ring-1 ring-gold-300 text-sm shadow-sm">
            <span className="text-base font-extrabold text-gold-700">{filtered.length}</span>
            <span className="text-warm-800 font-semibold">
              {filtered.length === 1 ? 'mandapam' : 'mandapams'} found
            </span>
          </div>

          {filtered.length === 0 ? (
            <div className="max-w-md mx-auto text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cream-200 flex items-center justify-center text-3xl">
                🪷
              </div>
              <h3 className="text-lg font-bold text-maroon-900 mb-2">No mandapams match your filters</h3>
              <p className="text-sm text-warm-700 mb-6">Try widening the locality or capacity range.</p>
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gold-400 hover:bg-gold-300 text-maroon-900 text-sm font-bold tracking-[0.15em] uppercase ring-2 ring-gold-300/50 transition-all shadow-md"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-6">
              {filtered.map((m) => (
                <Link
                  key={m.slug}
                  to={`/mandapams/${m.slug}`}
                  className="group rounded-2xl overflow-hidden bg-white border-2 border-cream-200 hover:border-gold-300 hover:shadow-xl transition-all flex flex-col"
                >
                  <div className={`relative aspect-[16/9] bg-gradient-to-br ${m.tint} flex items-center justify-center text-5xl`}>
                    <span aria-hidden="true" className="drop-shadow-lg">{m.emoji}</span>
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-white/90 text-[9px] font-bold tracking-[0.12em] uppercase text-maroon-800 shadow">
                      {m.locality}
                    </span>
                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-gold-400 text-maroon-900 text-[10px] font-bold shadow">
                      ★ {m.rating.toFixed(1)}
                    </span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3
                      className="text-lg text-maroon-900 group-hover:text-maroon-700 transition-colors leading-tight mb-1"
                      style={{ fontFamily: '"Plus Jakarta Sans", Inter, system-ui, sans-serif', fontWeight: 800, letterSpacing: '-0.02em' }}
                    >
                      {m.name}
                    </h3>
                    <p className="text-xs text-warm-500 mb-2">
                      {m.capacityMin}–{m.capacityMax} guests · {m.priceLabel}
                    </p>
                    <p className="text-sm text-warm-700 leading-relaxed flex-1 line-clamp-3">
                      {m.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
