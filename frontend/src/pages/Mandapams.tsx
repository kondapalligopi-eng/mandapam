import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { MANDAPAMS, type Mandapam } from '@/data/mandapams';
import { DISTRICT_NAMES, taluksOf, localitiesOf } from '@/data/karnataka';

const CAP_BUCKETS = [
  { label: '0 – 99', min: 0, max: 99 },
  { label: '100 – 199', min: 100, max: 199 },
  { label: '200 – 299', min: 200, max: 299 },
  { label: '300 – 499', min: 300, max: 499 },
  { label: '500 – 749', min: 500, max: 749 },
  { label: '750 – 999', min: 750, max: 999 },
  { label: '1,000 – 1,499', min: 1000, max: 1499 },
  { label: '1,500 & above', min: 1500, max: Infinity },
];
// Derive a browseable venue "type" from the venue name.
const venueType = (m: Mandapam): string => {
  const n = m.name.toLowerCase();
  if (n.includes('palace') || n.includes('fort')) return 'Palace / Fort';
  if (n.includes('farmhouse') || n.includes('farm')) return 'Farmhouse';
  if (n.includes('hotel')) return 'Hotel';
  if (n.includes('resort') || n.includes('residency')) return 'Resort';
  if (n.includes('banquet')) return 'Banquet';
  if (n.includes('lawn')) return 'Lawn';
  if (n.includes('garden') || n.includes('meadow')) return 'Marriage Garden';
  if (n.includes('community') || n.includes('convention')) return 'Marriage / Community Hall';
  return 'Mandapam';
};

// Fixed display order; only show types that actually have venues.
const TYPE_ORDER = ['Banquet', 'Hotel', 'Farmhouse', 'Lawn', 'Resort', 'Marriage Garden', 'Palace / Fort', 'Mandapam', 'Marriage / Community Hall'];
const presentTypes = new Set(MANDAPAMS.map(venueType));
const VENUE_TYPES = TYPE_ORDER.filter((t) => presentTypes.has(t));

function Toggle({ on, onToggle, label, icon }: { on: boolean; onToggle: () => void; label: string; icon: string }) {
  return (
    <button type="button" onClick={onToggle} className="flex items-center justify-between w-full group">
      <span className="flex items-center gap-2 text-sm text-warm-700 group-hover:text-maroon-700 transition-colors">
        <span aria-hidden="true">{icon}</span>
        {label}
      </span>
      <span className={`relative w-11 h-6 rounded-full transition-colors ${on ? 'bg-maroon-600' : 'bg-warm-300'}`}>
        <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${on ? 'translate-x-5' : ''}`} />
      </span>
    </button>
  );
}

export function Mandapams() {
  const navigate = useNavigate();
  const goBack = () => (typeof window !== 'undefined' && window.history.length > 1 ? navigate(-1) : navigate('/'));
  const [searchParams] = useSearchParams();
  const districtParam = searchParams.get('district') ?? '';
  const [query, setQuery] = useState('');
  const [district, setDistrict] = useState(DISTRICT_NAMES.includes(districtParam) ? districtParam : '');
  const [taluk, setTaluk] = useState('');
  const [types, setTypes] = useState<Set<string>>(new Set());
  const [localities, setLocalities] = useState<Set<string>>(new Set());
  const [localitySearch, setLocalitySearch] = useState('');
  const [capBuckets, setCapBuckets] = useState<Set<number>>(new Set());
  const [deals, setDeals] = useState(false);
  const [awardWinners, setAwardWinners] = useState(false);
  const [view, setView] = useState<'list' | 'images' | 'map'>('list');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const favKey = 'mandapamFavorites';
  useEffect(() => {
    try {
      const favs = localStorage.getItem(favKey);
      if (favs) setFavorites(new Set(JSON.parse(favs) as string[]));
    } catch { /* ignore */ }
  }, []);

  // Apply the district from the URL (e.g. coming from a home-page city tile).
  useEffect(() => {
    if (districtParam && DISTRICT_NAMES.includes(districtParam)) {
      setDistrict(districtParam);
      setTaluk('');
    }
  }, [districtParam]);

  const toggleFavorite = (slug: string) =>
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(slug) ? next.delete(slug) : next.add(slug);
      try { localStorage.setItem(favKey, JSON.stringify([...next])); } catch { /* ignore */ }
      return next;
    });

  const toggleSetItem = <T,>(setter: React.Dispatch<React.SetStateAction<Set<T>>>, value: T) =>
    setter((prev) => {
      const next = new Set(prev);
      next.has(value) ? next.delete(value) : next.add(value);
      return next;
    });

  const talukOptions = district ? taluksOf(district) : [];

  // All localities for the chosen city/district (searchable). When no district
  // is chosen yet, fall back to localities present in the data.
  const localityOptions = useMemo(() => {
    const all = district
      ? [...localitiesOf(district)].sort()
      : Array.from(new Set(MANDAPAMS.map((m) => m.locality))).sort();
    const s = localitySearch.trim().toLowerCase();
    return s ? all.filter((l) => l.toLowerCase().includes(s)) : all;
  }, [district, localitySearch]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MANDAPAMS.filter((m) => {
      if (q && !`${m.name} ${m.locality} ${m.taluk}`.toLowerCase().includes(q)) return false;
      if (district && m.district !== district) return false;
      if (taluk && m.taluk !== taluk) return false;
      if (types.size && !types.has(venueType(m))) return false;
      if (localities.size && !localities.has(m.locality)) return false;
      if (deals && !m.promotion) return false;
      if (awardWinners && m.rating < 4.7) return false;
      if (capBuckets.size) {
        const ok = [...capBuckets].some((i) => m.capacityMax >= CAP_BUCKETS[i].min && m.capacityMin <= CAP_BUCKETS[i].max);
        if (!ok) return false;
      }
      return true;
    });
  }, [query, district, taluk, types, localities, capBuckets, deals, awardWinners]);

  const onDistrictChange = (value: string) => {
    setDistrict(value);
    setTaluk('');
    setLocalities(new Set());
  };

  const onTalukChange = (value: string) => {
    setTaluk(value);
    setLocalities(new Set());
  };

  const clearAll = () => {
    setQuery('');
    setDistrict('');
    setTaluk('');
    setTypes(new Set());
    setLocalities(new Set());
    setLocalitySearch('');
    setCapBuckets(new Set());
    setDeals(false);
    setAwardWinners(false);
  };

  const heart = (slug: string) => (
    <button
      type="button"
      onClick={(e) => { e.preventDefault(); toggleFavorite(slug); }}
      aria-label={favorites.has(slug) ? 'Remove from saved' : 'Save'}
      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow text-base transition-colors z-10"
    >
      <span className={favorites.has(slug) ? 'text-rose-500' : 'text-warm-400'}>{favorites.has(slug) ? '♥' : '♡'}</span>
    </button>
  );

  return (
    <div className="bg-cream-50 min-h-screen">
      {/* ── Header ───────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-9">
          <button
            type="button"
            onClick={goBack}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-warm-600 hover:text-maroon-700 mb-3 transition-colors"
          >
            <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          {/* Breadcrumb */}
          <nav className="text-xs text-warm-500 mb-4 flex flex-wrap items-center gap-1.5">
            <Link to="/" className="hover:text-maroon-700">Wedding</Link>
            <span>/</span>
            <Link to="/mandapams" className="hover:text-maroon-700">Wedding Venues</Link>
            <span>/</span>
            <span>Karnataka</span>
            {district && (<><span>/</span><span className="text-maroon-700 font-semibold">{district}</span></>)}
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
            <div className="max-w-2xl">
              <h1
                className="text-2xl sm:text-3xl lg:text-4xl text-maroon-900"
                style={{ fontFamily: '"Plus Jakarta Sans", Inter, system-ui, sans-serif', fontWeight: 800, letterSpacing: '-0.02em' }}
              >
                Wedding Venues {district || 'Karnataka'}
              </h1>
              <p className="text-sm text-warm-600 mt-2 leading-relaxed">
                From luxurious resorts to charming heritage halls, our wedding venues across Karnataka
                offer something for every couple — compare capacity, pricing and photos, then enquire directly.
              </p>
            </div>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex items-stretch bg-white ring-1 ring-warm-300 rounded-full shadow-sm overflow-hidden w-full lg:w-[460px] shrink-0"
            >
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search venues by name or area"
                className="flex-1 min-w-0 px-4 py-2.5 text-sm text-warm-800 placeholder:text-warm-400 outline-none"
              />
              <span className="w-px my-2 bg-cream-300" />
              <select
                value={district}
                onChange={(e) => onDistrictChange(e.target.value)}
                className={`px-3 py-2.5 text-sm bg-transparent outline-none cursor-pointer ${district ? 'text-warm-800' : 'text-warm-400'}`}
                aria-label="District"
              >
                <option value="">Location</option>
                {DISTRICT_NAMES.map((d) => (
                  <option key={d} value={d} className="text-warm-800">{d}</option>
                ))}
              </select>
              <button type="submit" aria-label="Search" className="px-5 bg-gold-400 hover:bg-gold-300 text-maroon-900 flex items-center justify-center transition-colors">
                🔍
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ── Body: sidebar + results ──────────────────────────────────── */}
      <section className="py-7 sm:py-9">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-7">
          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border-2 border-cream-200 bg-white p-5">
              <h3 className="text-sm font-bold tracking-[0.12em] uppercase text-maroon-900 mb-3">Type</h3>
              <div className="space-y-2">
                {VENUE_TYPES.map((t) => (
                  <label key={t} className="flex items-center gap-2.5 text-sm text-warm-700 cursor-pointer">
                    <input type="checkbox" checked={types.has(t)} onChange={() => toggleSetItem(setTypes, t)} className="w-4 h-4 accent-maroon-600" />
                    {t}
                  </label>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border-2 border-cream-200 bg-white p-5 space-y-4">
              <h3 className="text-sm font-bold tracking-[0.12em] uppercase text-maroon-900">Special filters</h3>
              <Toggle on={deals} onToggle={() => setDeals((v) => !v)} label="Deals" icon="🏷️" />
              <Toggle on={awardWinners} onToggle={() => setAwardWinners((v) => !v)} label="Award winners" icon="🏆" />
              <div className="pt-1">
                <p className="text-xs font-semibold text-warm-600 mb-2">Taluk</p>
                <select
                  value={taluk}
                  onChange={(e) => onTalukChange(e.target.value)}
                  disabled={!district}
                  className="w-full px-3 py-2 border-2 border-warm-300 rounded-md bg-white text-sm text-warm-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">{district ? 'All taluks' : 'Pick a location first'}</option>
                  {talukOptions.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="rounded-2xl border-2 border-cream-200 bg-white p-5">
              <h3 className="text-sm font-bold tracking-[0.12em] uppercase text-maroon-900 mb-3">Locality</h3>
              <label className="relative block mb-3">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-400 text-sm">🔍</span>
                <input
                  value={localitySearch}
                  onChange={(e) => setLocalitySearch(e.target.value)}
                  placeholder="Search locality"
                  className="w-full pl-9 pr-3 py-2 rounded-full bg-cream-50 text-sm text-warm-800 placeholder:text-warm-400 ring-1 ring-cream-300 focus:ring-2 focus:ring-gold-300 focus:outline-none"
                />
              </label>
              {localityOptions.length === 0 ? (
                <p className="text-xs text-warm-400">No localities found.</p>
              ) : (
                <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                  {localityOptions.map((l) => (
                    <label key={l} className="flex items-center gap-2.5 text-sm text-warm-700 cursor-pointer">
                      <input type="checkbox" checked={localities.has(l)} onChange={() => toggleSetItem(setLocalities, l)} className="w-4 h-4 accent-maroon-600 shrink-0" />
                      <span className="truncate">{l}</span>
                    </label>
                  ))}
                </div>
              )}
              {!district && <p className="text-[11px] text-warm-400 mt-2">Pick a location above to narrow localities.</p>}
            </div>

            <div className="rounded-2xl border-2 border-cream-200 bg-white p-5">
              <h3 className="text-sm font-bold tracking-[0.12em] uppercase text-maroon-900 mb-3">Capacity</h3>
              <div className="space-y-2">
                {CAP_BUCKETS.map((b, i) => (
                  <label key={b.label} className="flex items-center gap-2.5 text-sm text-warm-700 cursor-pointer">
                    <input type="checkbox" checked={capBuckets.has(i)} onChange={() => toggleSetItem(setCapBuckets, i)} className="w-4 h-4 accent-maroon-600" />
                    {b.label}
                  </label>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={clearAll}
              className="w-full px-4 py-2 rounded-full border-2 border-warm-300 text-warm-700 hover:border-maroon-400 hover:text-maroon-700 text-xs font-bold tracking-[0.15em] uppercase transition-colors"
            >
              Clear filters
            </button>
          </aside>

          {/* Results */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <p className="text-sm font-bold tracking-[0.1em] uppercase text-warm-600">
                {filtered.length} {filtered.length === 1 ? 'result' : 'results'}
              </p>
              <div className="inline-flex rounded-full border-2 border-cream-200 bg-white overflow-hidden">
                <button
                  type="button"
                  onClick={() => setView('list')}
                  className={`px-4 py-1.5 text-xs font-bold tracking-[0.1em] uppercase transition-colors ${view === 'list' ? 'bg-maroon-600 text-white' : 'text-warm-600 hover:text-maroon-700'}`}
                >
                  ☰ List
                </button>
                <button
                  type="button"
                  onClick={() => setView('images')}
                  className={`px-4 py-1.5 text-xs font-bold tracking-[0.1em] uppercase transition-colors ${view === 'images' ? 'bg-maroon-600 text-white' : 'text-warm-600 hover:text-maroon-700'}`}
                >
                  ▦ Images
                </button>
                <button
                  type="button"
                  onClick={() => setView('map')}
                  className={`px-4 py-1.5 text-xs font-bold tracking-[0.1em] uppercase transition-colors ${view === 'map' ? 'bg-maroon-600 text-white' : 'text-warm-600 hover:text-maroon-700'}`}
                >
                  📍 Map
                </button>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-20 rounded-2xl border-2 border-dashed border-cream-300 bg-white">
                <p className="text-5xl mb-3">🪷</p>
                <p className="text-warm-600">No venues match your filters yet.</p>
                <button onClick={clearAll} className="mt-4 text-sm font-semibold text-maroon-700 hover:text-maroon-900 underline underline-offset-4">
                  Clear filters
                </button>
              </div>
            ) : view === 'list' ? (
              /* ── List view ── */
              <div className="space-y-5">
                {filtered.map((m) => (
                  <div key={m.slug} className="rounded-2xl border-2 border-cream-200 bg-white overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="flex flex-col sm:flex-row">
                      <Link to={`/mandapams/${m.slug}`} className={`relative sm:w-72 shrink-0 aspect-[16/10] sm:aspect-auto bg-gradient-to-br ${m.tint} flex items-center justify-center text-6xl`}>
                        <span aria-hidden="true" className="drop-shadow-lg">{m.emoji}</span>
                        {m.rating >= 4.7 && (
                          <span className="absolute top-2 left-2 px-2 py-0.5 bg-gold-400 text-maroon-900 text-[10px] font-bold tracking-[0.12em] uppercase rounded shadow">TOP</span>
                        )}
                        {heart(m.slug)}
                      </Link>
                      <div className="flex-1 p-5 flex flex-col">
                        <Link
                          to={`/mandapams/${m.slug}`}
                          className="text-lg sm:text-xl text-maroon-900 hover:text-maroon-700 leading-tight transition-colors"
                          style={{ fontFamily: '"Plus Jakarta Sans", Inter, system-ui, sans-serif', fontWeight: 800, letterSpacing: '-0.02em' }}
                        >
                          {m.name}
                        </Link>
                        <p className="text-xs text-warm-600 mt-1 flex flex-wrap items-center gap-1.5">
                          <span className="text-gold-600 font-bold">★ {m.rating.toFixed(1)}</span>
                          <span className="text-warm-400">({m.reviews})</span>
                          <span>· 📍 {m.locality}, {m.taluk}</span>
                          <span className="px-1.5 py-0.5 rounded bg-cream-200 text-warm-600 text-[10px] font-semibold">{venueType(m)}</span>
                        </p>
                        <p className="text-sm text-warm-700 leading-relaxed mt-2 line-clamp-3">{m.description}</p>
                        <div className="mt-auto pt-4 flex flex-wrap items-end justify-between gap-3">
                          <div className="text-xs text-warm-600 space-y-1">
                            <p className="text-sm font-bold text-maroon-800">From ₹{m.perPlateVeg.toLocaleString('en-IN')} <span className="text-xs font-normal text-warm-500">/ veg plate</span></p>
                            <p className="flex items-center gap-1.5">
                              <span>👥 {m.capacityMin} to {m.capacityMax} guests</span>
                              {m.promotion && (
                                <span className="text-rose-600 font-bold">🏷️ 1 promotion -{m.promotion}%</span>
                              )}
                            </p>
                          </div>
                          <Link
                            to={`/mandapams/${m.slug}`}
                            className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-maroon-600 hover:bg-maroon-700 text-white text-sm font-bold tracking-[0.1em] uppercase transition-colors shadow"
                          >
                            Request pricing
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : view === 'map' ? (
              /* ── Map view ── */
              <div className="space-y-5">
                <div className="rounded-2xl overflow-hidden border-2 border-cream-200 shadow-sm">
                  <iframe
                    title={`Map of ${district || taluk || 'Karnataka'}`}
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(`wedding venues, ${[taluk, district, 'Karnataka'].filter(Boolean).join(', ')}`)}&z=11&output=embed`}
                    className="w-full h-[420px] border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <p className="text-xs text-warm-500">
                  Showing the {taluk || district || 'Karnataka'} area. Open a venue for its exact location.
                </p>
                {/* Compact result list under the map */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {filtered.map((m) => (
                    <Link
                      key={m.slug}
                      to={`/mandapams/${m.slug}`}
                      className="flex items-center gap-3 rounded-xl border-2 border-cream-200 bg-white p-3 hover:border-gold-300 hover:shadow-sm transition-all"
                    >
                      <span className={`w-12 h-12 shrink-0 rounded-lg bg-gradient-to-br ${m.tint} flex items-center justify-center text-2xl`}>{m.emoji}</span>
                      <span className="min-w-0">
                        <span className="block text-sm font-bold text-maroon-900 truncate">{m.name}</span>
                        <span className="block text-xs text-warm-500">★ {m.rating.toFixed(1)} · 📍 {m.locality}, {m.taluk}</span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              /* ── Images (grid) view ── */
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((m) => (
                  <Link
                    key={m.slug}
                    to={`/mandapams/${m.slug}`}
                    className="group rounded-2xl border-2 border-cream-200 bg-white overflow-hidden hover:shadow-xl hover:border-gold-300 transition-all flex flex-col"
                  >
                    <div className={`relative aspect-[16/10] bg-gradient-to-br ${m.tint} flex items-center justify-center text-5xl`}>
                      <span aria-hidden="true" className="drop-shadow-lg">{m.emoji}</span>
                      {m.rating >= 4.7 && (
                        <span className="absolute top-2 left-2 px-2 py-0.5 bg-gold-400 text-maroon-900 text-[10px] font-bold tracking-[0.12em] uppercase rounded shadow">TOP</span>
                      )}
                      {heart(m.slug)}
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <h3
                        className="text-base text-maroon-900 group-hover:text-maroon-700 leading-tight transition-colors"
                        style={{ fontFamily: '"Plus Jakarta Sans", Inter, system-ui, sans-serif', fontWeight: 800, letterSpacing: '-0.02em' }}
                      >
                        {m.name}
                      </h3>
                      <p className="text-[11px] text-warm-600 mt-0.5">
                        <span className="text-gold-600 font-bold">★ {m.rating.toFixed(1)}</span> ({m.reviews}) · 📍 {m.locality}
                      </p>
                      <p className="text-xs text-warm-700 mt-1.5 flex-1 line-clamp-2">{m.description}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-sm font-bold text-maroon-800">From ₹{m.perPlateVeg.toLocaleString('en-IN')}<span className="text-[10px] font-normal text-warm-500"> /plate</span></span>
                        <span className="text-xs font-bold tracking-[0.1em] uppercase text-gold-700 group-hover:text-maroon-700">View →</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
