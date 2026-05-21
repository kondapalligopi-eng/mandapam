import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { getService, type Vendor } from '@/data/services';
import { ALL_LOCATIONS } from '@/data/karnataka';

const readAsDataURL = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const PRICE_BUCKETS = [
  { label: 'Under ₹25,000', min: 0, max: 24999 },
  { label: '₹25,000 – ₹49,999', min: 25000, max: 49999 },
  { label: '₹50,000 – ₹74,999', min: 50000, max: 74999 },
  { label: '₹75,000 – ₹99,999', min: 75000, max: 99999 },
  { label: '₹1,00,000 & above', min: 100000, max: Infinity },
];

// Lower-bound rupee value parsed from a priceLabel like "₹45,000 – ₹1.5L".
const parsePriceFrom = (label: string): number => {
  const first = label.split('–')[0];
  const m = first.match(/₹\s*([\d.,]+)\s*(L)?/i);
  if (!m) return 0;
  let n = parseFloat(m[1].replace(/,/g, ''));
  if (m[2]) n *= 100000; // "L" = lakh
  return n;
};

const singular = (unit: string) => unit.replace(/s$/, '');

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

export function ServiceCategory() {
  const { category } = useParams<{ category: string }>();
  const service = getService(category);
  const navigate = useNavigate();
  const goBack = () => (typeof window !== 'undefined' && window.history.length > 1 ? navigate(-1) : navigate('/categories'));

  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [specialtyFilters, setSpecialtyFilters] = useState<Set<string>>(new Set());
  const [priceBuckets, setPriceBuckets] = useState<Set<number>>(new Set());
  const [onlyHandpicked, setOnlyHandpicked] = useState(false);
  const [topRated, setTopRated] = useState(false);
  const [view, setView] = useState<'list' | 'images'>('list');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [editMode, setEditMode] = useState(false);
  const [images, setImages] = useState<Record<string, string[]>>({});

  const storageKey = `vendorImages:${category}`;
  const favKey = `vendorFavorites:${category}`;

  useEffect(() => {
    if (!service) return;
    const base: Record<string, string[]> = {};
    service.vendors.forEach((v) => { base[v.name] = [v.img]; });
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) Object.assign(base, JSON.parse(saved) as Record<string, string[]>);
    } catch { /* ignore */ }
    setImages(base);
    try {
      const favs = localStorage.getItem(favKey);
      if (favs) setFavorites(new Set(JSON.parse(favs) as string[]));
    } catch { /* ignore */ }
  }, [service, storageKey, favKey]);

  const saveImages = (next: Record<string, string[]>) => {
    setImages(next);
    try { localStorage.setItem(storageKey, JSON.stringify(next)); } catch { /* ignore */ }
  };

  const addImages = async (name: string, files: FileList | null) => {
    const picked = Array.from(files ?? []).filter((f) => f.type.startsWith('image/'));
    if (!picked.length) return;
    const dataUrls = await Promise.all(picked.map(readAsDataURL));
    saveImages({ ...images, [name]: [...(images[name] ?? []), ...dataUrls] });
  };

  const removeImage = (name: string, idx: number) => {
    saveImages({ ...images, [name]: (images[name] ?? []).filter((_, i) => i !== idx) });
  };

  const toggleFavorite = (name: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      try { localStorage.setItem(favKey, JSON.stringify([...next])); } catch { /* ignore */ }
      return next;
    });
  };

  const toggleSetItem = <T,>(setter: React.Dispatch<React.SetStateAction<Set<T>>>, value: T) =>
    setter((prev) => {
      const next = new Set(prev);
      next.has(value) ? next.delete(value) : next.add(value);
      return next;
    });

  const specialties = useMemo(
    () => (service ? Array.from(new Set(service.vendors.map((v) => v.specialty))).sort() : []),
    [service],
  );
  const locationOptions = useMemo(() => {
    const vendorCities = service ? service.vendors.map((v) => v.city) : [];
    return Array.from(new Set([...vendorCities, ...ALL_LOCATIONS])).sort();
  }, [service]);

  const results = useMemo(() => {
    if (!service) return [];
    const q = query.trim().toLowerCase();
    return service.vendors.filter((v) => {
      if (q && !(v.name.toLowerCase().includes(q) || v.city.toLowerCase().includes(q) || v.specialty.toLowerCase().includes(q))) return false;
      if (location && v.city !== location) return false;
      if (specialtyFilters.size && !specialtyFilters.has(v.specialty)) return false;
      if (onlyHandpicked && !v.handpicked) return false;
      if (topRated && v.rating < 4.7) return false;
      if (priceBuckets.size) {
        const from = parsePriceFrom(v.priceLabel);
        const inBucket = [...priceBuckets].some((i) => from >= PRICE_BUCKETS[i].min && from <= PRICE_BUCKETS[i].max);
        if (!inBucket) return false;
      }
      return true;
    });
  }, [service, query, location, specialtyFilters, onlyHandpicked, topRated, priceBuckets]);

  if (!service) return <Navigate to="/categories" replace />;

  const clearAll = () => {
    setQuery('');
    setLocation('');
    setSpecialtyFilters(new Set());
    setPriceBuckets(new Set());
    setOnlyHandpicked(false);
    setTopRated(false);
  };

  const intro = `Create unforgettable memories with our curated selection of ${service.title.toLowerCase()} across Karnataka. Compare styles, reviews and pricing, then enquire with the ${service.unit} you love.`;

  // Shared bits ----------------------------------------------------------
  const heart = (name: string) => (
    <button
      type="button"
      onClick={(e) => { e.preventDefault(); toggleFavorite(name); }}
      aria-label={favorites.has(name) ? 'Remove from saved' : 'Save'}
      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow text-base transition-colors"
    >
      <span className={favorites.has(name) ? 'text-rose-500' : 'text-warm-400'}>
        {favorites.has(name) ? '♥' : '♡'}
      </span>
    </button>
  );

  const editStrip = (v: Vendor, imgs: string[]) =>
    editMode && (
      <div className="p-3 border-t border-cream-200 bg-cream-50 flex flex-wrap gap-2">
        {imgs.map((src, i) => (
          <div key={`${src.slice(0, 24)}-${i}`} className="relative w-12 h-12 rounded-md overflow-hidden ring-1 ring-cream-300">
            <img src={src} alt="" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => removeImage(v.name, i)}
              aria-label="Delete image"
              className="absolute top-0 right-0 w-4 h-4 bg-maroon-700/90 text-white text-[10px] flex items-center justify-center rounded-bl"
            >
              ✕
            </button>
          </div>
        ))}
        <label className="w-12 h-12 rounded-md border-2 border-dashed border-warm-300 hover:border-maroon-400 flex items-center justify-center cursor-pointer text-warm-500 hover:text-maroon-600 transition-colors text-lg">
          ＋
          <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => addImages(v.name, e.target.files)} />
        </label>
      </div>
    );

  return (
    <div className="bg-cream-50 min-h-screen">
      {/* ── Header ───────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-9">
          <button
            type="button"
            onClick={goBack}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-warm-600 hover:text-maroon-700 mb-4 transition-colors"
          >
            <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
            <div className="max-w-2xl">
              <h1
                className="text-2xl sm:text-3xl lg:text-4xl text-maroon-900"
                style={{ fontFamily: '"Plus Jakarta Sans", Inter, system-ui, sans-serif', fontWeight: 800, letterSpacing: '-0.02em' }}
              >
                {service.title}
              </h1>
              <p className="text-sm text-warm-600 mt-2 leading-relaxed">{intro}</p>
            </div>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex items-stretch bg-white ring-1 ring-warm-300 rounded-full shadow-sm overflow-hidden w-full lg:w-[460px] shrink-0"
            >
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={service.searchPlaceholder}
                className="flex-1 min-w-0 px-4 py-2.5 text-sm text-warm-800 placeholder:text-warm-400 outline-none"
              />
              <span className="w-px my-2 bg-cream-300" />
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className={`px-3 py-2.5 text-sm bg-transparent outline-none cursor-pointer ${location ? 'text-warm-800' : 'text-warm-400'}`}
                aria-label="Location"
              >
                <option value="">Location</option>
                {locationOptions.map((c) => (
                  <option key={c} value={c} className="text-warm-800">{c}</option>
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
            <div className="rounded-2xl border-2 border-cream-200 bg-white p-5 space-y-4">
              <h3 className="text-sm font-bold tracking-[0.12em] uppercase text-maroon-900">Special filters</h3>
              <Toggle on={onlyHandpicked} onToggle={() => setOnlyHandpicked((v) => !v)} label="Handpicked only" icon="👑" />
              <Toggle on={topRated} onToggle={() => setTopRated((v) => !v)} label="Top rated (4.7★+)" icon="🏆" />
            </div>

            {specialties.length > 1 && (
              <div className="rounded-2xl border-2 border-cream-200 bg-white p-5">
                <h3 className="text-sm font-bold tracking-[0.12em] uppercase text-maroon-900 mb-3">Specialty</h3>
                <div className="space-y-2">
                  {specialties.map((s) => (
                    <label key={s} className="flex items-center gap-2.5 text-sm text-warm-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={specialtyFilters.has(s)}
                        onChange={() => toggleSetItem(setSpecialtyFilters, s)}
                        className="w-4 h-4 accent-maroon-600"
                      />
                      {s}
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div className="rounded-2xl border-2 border-cream-200 bg-white p-5">
              <h3 className="text-sm font-bold tracking-[0.12em] uppercase text-maroon-900 mb-3">Price range</h3>
              <div className="space-y-2">
                {PRICE_BUCKETS.map((b, i) => (
                  <label key={b.label} className="flex items-center gap-2.5 text-sm text-warm-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={priceBuckets.has(i)}
                      onChange={() => toggleSetItem(setPriceBuckets, i)}
                      className="w-4 h-4 accent-maroon-600"
                    />
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
                {results.length} {results.length === 1 ? 'result' : 'results'}
              </p>
              <div className="flex items-center gap-2">
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
                </div>
                <button
                  type="button"
                  onClick={() => setEditMode((e) => !e)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.1em] uppercase transition-all ${editMode ? 'bg-maroon-600 text-white shadow' : 'border-2 border-warm-300 text-warm-700 hover:border-maroon-400'}`}
                >
                  {editMode ? '✓ Done' : '✎ Edit'}
                </button>
              </div>
            </div>

            {results.length === 0 ? (
              <div className="text-center py-20 rounded-2xl border-2 border-dashed border-cream-300 bg-white">
                <p className="text-5xl mb-3">{service.emoji}</p>
                <p className="text-warm-600">No {service.unit} match your filters yet.</p>
                <button onClick={clearAll} className="mt-4 text-sm font-semibold text-maroon-700 hover:text-maroon-900 underline underline-offset-4">
                  Clear filters
                </button>
              </div>
            ) : view === 'list' ? (
              /* ── List view ── */
              <div className="space-y-5">
                {results.map((v) => {
                  const imgs = images[v.name] ?? [v.img];
                  const cover = imgs[0];
                  return (
                    <div key={v.name} className="rounded-2xl border-2 border-cream-200 bg-white overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="flex flex-col sm:flex-row">
                        <div className="relative sm:w-72 shrink-0 aspect-[16/10] sm:aspect-auto bg-cream-200">
                          {cover ? (
                            <img src={cover} alt={v.name} loading="lazy" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-5xl text-warm-300">{service.emoji}</div>
                          )}
                          {v.handpicked && (
                            <span className="absolute top-0 left-0 inline-flex items-center gap-0.5 px-2 py-0.5 bg-maroon-600 text-white text-[9px] font-bold tracking-[0.12em] uppercase rounded-br-lg shadow">
                              👑 Handpicked
                            </span>
                          )}
                          {heart(v.name)}
                        </div>
                        <div className="flex-1 p-5 flex flex-col">
                          <div className="flex items-start justify-between gap-3">
                            <h3
                              className="text-lg sm:text-xl text-maroon-900 leading-tight"
                              style={{ fontFamily: '"Plus Jakarta Sans", Inter, system-ui, sans-serif', fontWeight: 800, letterSpacing: '-0.02em' }}
                            >
                              {v.name}
                            </h3>
                          </div>
                          <p className="text-xs text-warm-600 mt-1 flex items-center gap-1.5">
                            <span className="text-gold-600 font-bold">★ {v.rating.toFixed(1)}</span>
                            <span className="text-warm-400">({v.reviews})</span>
                            <span>· 📍 {v.city}</span>
                          </p>
                          <p className="text-sm text-warm-700 leading-relaxed mt-2 line-clamp-3">
                            {v.name} is a sought-after {singular(service.unit)} in {v.city}, known for {v.specialty.toLowerCase()}. Trusted by couples across Karnataka to make every moment count.
                          </p>
                          <div className="mt-auto pt-4 flex flex-wrap items-end justify-between gap-3">
                            <div>
                              <p className="text-sm font-bold text-maroon-800">From {v.priceLabel.split('–')[0].trim()}</p>
                              <p className="text-[11px] text-gold-700 font-semibold flex items-center gap-1 mt-0.5">⚡ Responds within 24 hours</p>
                            </div>
                            <Link
                              to="/contact"
                              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-maroon-600 hover:bg-maroon-700 text-white text-sm font-bold tracking-[0.1em] uppercase transition-colors shadow"
                            >
                              Request pricing
                            </Link>
                          </div>
                        </div>
                      </div>
                      {editStrip(v, imgs)}
                    </div>
                  );
                })}
              </div>
            ) : (
              /* ── Images (grid) view ── */
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {results.map((v) => {
                  const imgs = images[v.name] ?? [v.img];
                  const cover = imgs[0];
                  return (
                    <div key={v.name} className="rounded-2xl border-2 border-cream-200 bg-white overflow-hidden hover:shadow-xl transition-shadow flex flex-col">
                      <div className="relative aspect-[16/10] overflow-hidden bg-cream-200">
                        {cover ? (
                          <img src={cover} alt={v.name} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-5xl text-warm-300">{service.emoji}</div>
                        )}
                        {v.handpicked && (
                          <span className="absolute top-0 left-0 inline-flex items-center gap-0.5 px-2 py-0.5 bg-maroon-600 text-white text-[9px] font-bold tracking-[0.12em] uppercase rounded-br-lg shadow">
                            👑 Handpicked
                          </span>
                        )}
                        {heart(v.name)}
                      </div>
                      <div className="p-4 flex-1 flex flex-col">
                        <h3
                          className="text-base text-maroon-900 leading-tight"
                          style={{ fontFamily: '"Plus Jakarta Sans", Inter, system-ui, sans-serif', fontWeight: 800, letterSpacing: '-0.02em' }}
                        >
                          {v.name}
                        </h3>
                        <p className="text-[11px] text-warm-600 mt-0.5">
                          <span className="text-gold-600 font-bold">★ {v.rating.toFixed(1)}</span> ({v.reviews}) · 📍 {v.city}
                        </p>
                        <p className="text-xs text-warm-700 mt-1.5 flex-1">{v.specialty}</p>
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-sm font-bold text-maroon-800">From {v.priceLabel.split('–')[0].trim()}</span>
                          <Link to="/contact" className="text-xs font-bold tracking-[0.1em] uppercase text-gold-700 hover:text-maroon-700">Enquire →</Link>
                        </div>
                      </div>
                      {editStrip(v, imgs)}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
