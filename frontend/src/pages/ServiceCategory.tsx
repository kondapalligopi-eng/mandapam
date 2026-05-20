import { useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { getService, SERVICE_CITIES } from '@/data/services';

export function ServiceCategory() {
  const { category } = useParams<{ category: string }>();
  const service = getService(category);

  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!service) return [];
    const q = query.trim().toLowerCase();
    return service.vendors.filter((v) => {
      const cityOk = !selectedCity || v.city === selectedCity;
      const queryOk =
        !q ||
        v.name.toLowerCase().includes(q) ||
        v.city.toLowerCase().includes(q) ||
        v.specialty.toLowerCase().includes(q);
      return cityOk && queryOk;
    });
  }, [service, selectedCity, query]);

  // Unknown category slug → back to the categories grid.
  if (!service) return <Navigate to="/categories" replace />;

  return (
    <div className="bg-cream-50 min-h-screen">
      {/* ── Header ───────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-paisley text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/25 via-orange-400/15 to-yellow-300/30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-[11px] sm:text-xs font-semibold tracking-[0.3em] text-gold-300 uppercase mb-2">
                {service.kicker}
              </p>
              <h1
                className="text-3xl sm:text-4xl lg:text-5xl text-white"
                style={{ fontFamily: '"Plus Jakarta Sans", Inter, system-ui, sans-serif', fontWeight: 800, letterSpacing: '-0.02em' }}
              >
                {service.title}
              </h1>
              <p className="text-sm text-cream-100/90 mt-2">
                Showing <span className="font-bold text-white">{results.length}</span>{' '}
                {service.unit}
                {selectedCity ? ` in ${selectedCity}` : ' across Karnataka'}
              </p>
            </div>
            <div className="w-full sm:w-auto flex flex-col gap-3 sm:items-end">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-gold-400 hover:bg-gold-300 text-maroon-900 text-xs sm:text-sm font-bold tracking-[0.15em] uppercase ring-2 ring-gold-300/50 hover:ring-gold-200 transition-all shadow-lg shrink-0"
              >
                <span aria-hidden="true" className="text-base leading-none">＋</span>
                {service.listLabel}
              </Link>
              <label className="relative w-full sm:w-80">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-400">🔍</span>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={service.searchPlaceholder}
                  className="w-full pl-11 pr-4 py-2.5 rounded-full bg-white/95 text-warm-800 text-sm placeholder:text-warm-400 ring-2 ring-white/40 focus:ring-gold-300 focus:outline-none shadow"
                />
              </label>
            </div>
          </div>
        </div>
      </section>

      {/* ── City filter row ──────────────────────────────────────────── */}
      <section className="bg-white border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex gap-5 sm:gap-7 overflow-x-auto pb-2 -mb-2">
            <button
              onClick={() => setSelectedCity(null)}
              className="group flex flex-col items-center gap-2 shrink-0"
            >
              <div
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-2xl sm:text-3xl ring-4 transition-all ${
                  selectedCity === null
                    ? 'ring-gold-400 bg-gradient-to-br from-maroon-600 to-maroon-400 shadow-lg'
                    : 'ring-white bg-gradient-to-br from-warm-400 to-warm-300 group-hover:ring-gold-200'
                }`}
              >
                <span aria-hidden="true" className="drop-shadow">🛕</span>
              </div>
              <span className={`text-[11px] sm:text-xs font-semibold text-center leading-tight ${selectedCity === null ? 'text-maroon-700' : 'text-warm-700'}`}>
                All Karnataka
              </span>
            </button>

            {SERVICE_CITIES.map(({ name, img }) => {
              const active = selectedCity === name;
              return (
                <button
                  key={name}
                  onClick={() => setSelectedCity(active ? null : name)}
                  className="group flex flex-col items-center gap-2 shrink-0"
                >
                  <div
                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden ring-4 transition-all ${
                      active ? 'ring-gold-400 shadow-lg scale-105' : 'ring-white group-hover:ring-gold-200'
                    }`}
                  >
                    <img src={img} alt={name} loading="lazy" className="w-full h-full object-cover" />
                  </div>
                  <span className={`text-[11px] sm:text-xs font-semibold text-center leading-tight ${active ? 'text-maroon-700' : 'text-warm-700'}`}>
                    {name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Listings ─────────────────────────────────────────────────── */}
      <section className="py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {results.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-5xl mb-3">{service.emoji}</p>
              <p className="text-warm-600">No {service.unit} match your filters yet.</p>
              <button
                onClick={() => { setSelectedCity(null); setQuery(''); }}
                className="mt-4 text-sm font-semibold text-maroon-700 hover:text-maroon-900 underline underline-offset-4"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((v) => (
                <Link
                  key={v.name}
                  to="/contact"
                  className="group rounded-2xl overflow-hidden bg-white border-2 border-cream-200 hover:border-gold-300 hover:shadow-xl transition-all flex flex-col"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-cream-200">
                    <img
                      src={v.img}
                      alt={v.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {v.handpicked && (
                      <span className="absolute top-0 left-0 inline-flex items-center gap-1 px-3 py-1 bg-maroon-600 text-white text-[10px] font-bold tracking-[0.15em] uppercase rounded-br-xl shadow">
                        👑 Handpicked
                      </span>
                    )}
                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-gold-400 text-maroon-900 text-[11px] font-bold shadow">
                      ★ {v.rating.toFixed(1)}
                    </span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3
                      className="text-lg text-maroon-900 group-hover:text-maroon-700 transition-colors leading-tight"
                      style={{ fontFamily: '"Plus Jakarta Sans", Inter, system-ui, sans-serif', fontWeight: 800, letterSpacing: '-0.02em' }}
                    >
                      {v.name}
                    </h3>
                    <p className="text-xs text-warm-500 mt-0.5 mb-2">
                      📍 {v.city} · {v.reviews} reviews
                    </p>
                    <p className="text-sm text-warm-700 leading-relaxed flex-1">{v.specialty}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm font-bold text-maroon-800">{v.priceLabel}</span>
                      <span className="text-xs font-bold tracking-[0.15em] uppercase text-gold-700 group-hover:text-maroon-700 transition-colors">
                        Enquire →
                      </span>
                    </div>
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
