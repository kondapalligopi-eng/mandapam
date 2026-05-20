import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { getService, type Vendor } from '@/data/services';

const readAsDataURL = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export function ServiceCategory() {
  const { category } = useParams<{ category: string }>();
  const service = getService(category);

  // Draft filters (what's in the controls) vs applied filters (what filters results).
  const [draft, setDraft] = useState({ query: '', specialty: '', location: '' });
  const [applied, setApplied] = useState({ query: '', specialty: '', location: '' });

  const [editMode, setEditMode] = useState(false);
  // Per-vendor image lists (cover = first). Overrides persist to localStorage.
  const [images, setImages] = useState<Record<string, string[]>>({});

  const storageKey = `vendorImages:${category}`;

  // Seed from vendor data, then layer any locally-saved edits (client only).
  useEffect(() => {
    if (!service) return;
    const base: Record<string, string[]> = {};
    service.vendors.forEach((v) => { base[v.name] = [v.img]; });
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) Object.assign(base, JSON.parse(saved) as Record<string, string[]>);
    } catch { /* ignore */ }
    setImages(base);
  }, [service, storageKey]);

  const save = (next: Record<string, string[]>) => {
    setImages(next);
    try { localStorage.setItem(storageKey, JSON.stringify(next)); } catch { /* ignore */ }
  };

  const addImages = async (name: string, files: FileList | null) => {
    const picked = Array.from(files ?? []).filter((f) => f.type.startsWith('image/'));
    if (!picked.length) return;
    const dataUrls = await Promise.all(picked.map(readAsDataURL));
    save({ ...images, [name]: [...(images[name] ?? []), ...dataUrls] });
  };

  const removeImage = (name: string, idx: number) => {
    save({ ...images, [name]: (images[name] ?? []).filter((_, i) => i !== idx) });
  };

  // Dropdown options derived from this category's vendors.
  const specialties = useMemo(
    () => (service ? Array.from(new Set(service.vendors.map((v) => v.specialty))).sort() : []),
    [service],
  );
  const locations = useMemo(
    () => (service ? Array.from(new Set(service.vendors.map((v) => v.city))).sort() : []),
    [service],
  );

  const results = useMemo(() => {
    if (!service) return [];
    const q = applied.query.trim().toLowerCase();
    return service.vendors.filter((v) => {
      const locOk = !applied.location || v.city === applied.location;
      const specOk = !applied.specialty || v.specialty === applied.specialty;
      const queryOk =
        !q ||
        v.name.toLowerCase().includes(q) ||
        v.city.toLowerCase().includes(q) ||
        v.specialty.toLowerCase().includes(q);
      return locOk && specOk && queryOk;
    });
  }, [service, applied]);

  // Unknown category slug → back to the categories grid.
  if (!service) return <Navigate to="/categories" replace />;

  const runSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    setApplied({ ...draft });
  };

  const clearAll = () => {
    setDraft({ query: '', specialty: '', location: '' });
    setApplied({ query: '', specialty: '', location: '' });
  };

  // Card inner content, shared between the edit (div) and view (Link) wrappers.
  const renderCard = (v: Vendor) => {
    const imgs = images[v.name] ?? [v.img];
    const cover = imgs[0];
    return (
      <>
        <div className="relative aspect-[16/9] overflow-hidden bg-cream-200">
          {cover ? (
            <img
              src={cover}
              alt={v.name}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-5xl text-warm-300">
              {service.emoji}
            </div>
          )}
          {v.handpicked && (
            <span className="absolute top-0 left-0 inline-flex items-center gap-0.5 px-2 py-0.5 bg-maroon-600 text-white text-[9px] font-bold tracking-[0.12em] uppercase rounded-br-lg shadow">
              👑 Handpicked
            </span>
          )}
          <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-gold-400 text-maroon-900 text-[10px] font-bold shadow">
            ★ {v.rating.toFixed(1)}
          </span>
        </div>

        {/* Image editor strip (edit mode only) */}
        {editMode && (
          <div className="p-3 border-b border-cream-200 bg-cream-50 flex flex-wrap gap-2">
            {imgs.map((src, i) => (
              <div key={`${src.slice(0, 24)}-${i}`} className="relative w-14 h-14 rounded-md overflow-hidden ring-1 ring-cream-300">
                <img src={src} alt="" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(v.name, i)}
                  aria-label="Delete image"
                  className="absolute top-0 right-0 w-5 h-5 bg-maroon-700/90 text-white text-[11px] flex items-center justify-center rounded-bl-md hover:bg-maroon-800"
                >
                  ✕
                </button>
              </div>
            ))}
            <label className="w-14 h-14 rounded-md border-2 border-dashed border-warm-300 hover:border-maroon-400 flex flex-col items-center justify-center cursor-pointer text-warm-500 hover:text-maroon-600 transition-colors">
              <span className="text-lg leading-none">＋</span>
              <span className="text-[9px]">Add</span>
              <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => addImages(v.name, e.target.files)} />
            </label>
          </div>
        )}

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
            {!editMode && (
              <span className="text-xs font-bold tracking-[0.15em] uppercase text-gold-700 group-hover:text-maroon-700 transition-colors">
                Enquire →
              </span>
            )}
          </div>
        </div>
      </>
    );
  };

  const cardClass =
    'group rounded-2xl overflow-hidden bg-white border-2 border-cream-200 hover:border-gold-300 hover:shadow-xl transition-all flex flex-col';
  const selectClass =
    'px-3 py-2.5 rounded-full bg-white text-sm text-warm-800 ring-1 ring-warm-300 focus:ring-2 focus:ring-gold-300 focus:outline-none shadow-sm';

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
                {applied.location ? ` in ${applied.location}` : ' across Karnataka'}
              </p>
            </div>
            <Link
              to={`/list-your-business?category=${service.slug}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-gold-400 hover:bg-gold-300 text-maroon-900 text-xs sm:text-sm font-bold tracking-[0.15em] uppercase ring-2 ring-gold-300/50 hover:ring-gold-200 transition-all shadow-lg shrink-0"
            >
              <span aria-hidden="true" className="text-base leading-none">＋</span>
              {service.listLabel}
            </Link>
          </div>
        </div>
      </section>

      {/* ── Search bar ───────────────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-cream-100 to-cream-50 border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <form onSubmit={runSearch} className="flex flex-col lg:flex-row gap-3">
            <div className="relative flex-1 min-w-0">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-400">🔍</span>
              <input
                value={draft.query}
                onChange={(e) => setDraft({ ...draft, query: e.target.value })}
                placeholder={service.searchPlaceholder}
                className="w-full pl-11 pr-4 py-2.5 rounded-full bg-white text-warm-800 text-sm placeholder:text-warm-400 ring-1 ring-warm-300 focus:ring-2 focus:ring-gold-300 focus:outline-none shadow-sm"
              />
            </div>

            <select
              value={draft.specialty}
              onChange={(e) => setDraft({ ...draft, specialty: e.target.value })}
              className={`${selectClass} ${draft.specialty ? 'text-warm-800' : 'text-warm-500'}`}
              aria-label="Specialty"
            >
              <option value="">All Specialties</option>
              {specialties.map((s) => (
                <option key={s} value={s} className="text-warm-800">{s}</option>
              ))}
            </select>

            <select
              value={draft.location}
              onChange={(e) => setDraft({ ...draft, location: e.target.value })}
              className={`${selectClass} ${draft.location ? 'text-warm-800' : 'text-warm-500'}`}
              aria-label="Location"
            >
              <option value="">All Locations</option>
              {locations.map((c) => (
                <option key={c} value={c} className="text-warm-800">{c}</option>
              ))}
            </select>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-gold-400 hover:bg-gold-300 text-maroon-900 text-sm font-bold tracking-[0.15em] uppercase ring-2 ring-gold-300/50 transition-all shadow-md shrink-0"
            >
              🔍 Search
            </button>
            <button
              type="button"
              onClick={clearAll}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white border-2 border-warm-300 text-warm-700 hover:border-maroon-400 hover:text-maroon-700 text-sm font-bold tracking-[0.15em] uppercase transition-all shrink-0"
            >
              ✕ Clear
            </button>
          </form>
        </div>
      </section>

      {/* ── Listings ─────────────────────────────────────────────────── */}
      <section className="py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Edit toolbar */}
          <div className="flex items-center justify-between gap-3 mb-6">
            <p className="text-xs sm:text-sm text-warm-500">
              {editMode ? 'Tap ✕ to delete or ＋ to add photos. Changes save in this browser.' : ''}
            </p>
            <button
              type="button"
              onClick={() => setEditMode((e) => !e)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold tracking-[0.12em] uppercase transition-all shrink-0 ${
                editMode
                  ? 'bg-maroon-600 text-white hover:bg-maroon-700 shadow'
                  : 'border-2 border-warm-300 text-warm-700 hover:border-maroon-400 hover:text-maroon-700'
              }`}
            >
              {editMode ? '✓ Done' : '✎ Edit images'}
            </button>
          </div>

          {results.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-5xl mb-3">{service.emoji}</p>
              <p className="text-warm-600">No {service.unit} match your search yet.</p>
              <button
                onClick={clearAll}
                className="mt-4 text-sm font-semibold text-maroon-700 hover:text-maroon-900 underline underline-offset-4"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((v) =>
                editMode ? (
                  <div key={v.name} className={cardClass}>
                    {renderCard(v)}
                  </div>
                ) : (
                  <Link key={v.name} to="/contact" className={cardClass}>
                    {renderCard(v)}
                  </Link>
                ),
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
