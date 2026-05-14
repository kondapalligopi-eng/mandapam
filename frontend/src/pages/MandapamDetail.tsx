import { Link, useParams } from 'react-router-dom';
import { getMandapam } from '@/data/mandapams';

export function MandapamDetail() {
  const { slug } = useParams<{ slug: string }>();
  const m = slug ? getMandapam(slug) : undefined;

  if (!m) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">🪷</div>
        <h1
          className="text-3xl text-maroon-900 mb-3"
          style={{ fontFamily: '"Plus Jakarta Sans", Inter, system-ui, sans-serif', fontWeight: 800, letterSpacing: '-0.02em' }}
        >
          Mandapam not found
        </h1>
        <p className="text-warm-600 mb-6">We couldn't find a venue at that link.</p>
        <Link
          to="/mandapams"
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gold-400 hover:bg-gold-300 text-maroon-900 text-sm font-bold tracking-[0.15em] uppercase ring-2 ring-gold-300/50 transition-all shadow"
        >
          See all mandapams
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-cream-50">
      {/* Hero banner */}
      <section className={`relative overflow-hidden bg-gradient-to-br ${m.tint} text-white`}>
        <div className="absolute inset-0 bg-black/15" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 flex flex-col sm:flex-row items-start sm:items-end gap-6">
          <span aria-hidden="true" className="text-[120px] sm:text-[160px] leading-none drop-shadow-2xl">{m.emoji}</span>
          <div className="flex-1">
            <p className="text-[11px] sm:text-xs font-semibold tracking-[0.3em] text-white/90 uppercase mb-1">
              {m.locality} · {m.city}
            </p>
            <h1
              className="text-3xl sm:text-5xl text-white leading-tight"
              style={{ fontFamily: '"Plus Jakarta Sans", Inter, system-ui, sans-serif', fontWeight: 800, letterSpacing: '-0.02em' }}
            >
              {m.name}
            </h1>
            <div className="mt-3 h-0.5 w-16 bg-gold-300 rounded-full" />
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-xs font-bold tracking-wider uppercase">
                ★ {m.rating.toFixed(1)} · {m.reviews} reviews
              </span>
              <span className="px-3 py-1 rounded-full bg-gold-400 text-maroon-900 text-xs font-bold tracking-wider uppercase">
                {m.capacityMin}–{m.capacityMax} guests
              </span>
              <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-xs font-bold tracking-wider uppercase">
                {m.priceLabel}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Back link */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Link
          to="/mandapams"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 border-warm-300 text-warm-700 text-sm font-semibold hover:border-maroon-500 hover:text-maroon-700 hover:shadow-sm transition-all"
        >
          <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
          Back to results
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
        {/* Main column */}
        <div>
          <section className="mb-10">
            <h2
              className="text-2xl text-maroon-900 mb-3"
              style={{ fontFamily: '"Plus Jakarta Sans", Inter, system-ui, sans-serif', fontWeight: 800, letterSpacing: '-0.02em' }}
            >
              About this venue
            </h2>
            <p className="text-base text-warm-800 leading-relaxed">{m.description}</p>
          </section>

          <section className="mb-10">
            <h2
              className="text-2xl text-maroon-900 mb-4"
              style={{ fontFamily: '"Plus Jakarta Sans", Inter, system-ui, sans-serif', fontWeight: 800, letterSpacing: '-0.02em' }}
            >
              What's included
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {m.features.map((f) => (
                <li key={f} className="flex items-start gap-3 px-4 py-3 rounded-xl bg-white border border-cream-200">
                  <span aria-hidden="true" className="w-7 h-7 rounded-full bg-gold-100 text-gold-700 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-sm text-warm-800">{f}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Sticky contact card */}
        <aside>
          <div className="rounded-2xl border-2 border-maroon-100 bg-white shadow-md overflow-hidden lg:sticky lg:top-24">
            <div className="bg-gradient-to-br from-maroon-700 to-maroon-900 text-white px-5 py-4">
              <p className="text-[10px] font-semibold tracking-[0.3em] text-gold-300 uppercase">Book direct</p>
              <p className="text-lg font-bold mt-0.5">Speak with the venue</p>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-maroon-700 mb-1">Phone</p>
                <a
                  href={`tel:${m.phone.replace(/\s+/g, '')}`}
                  className="text-base font-bold text-warm-900 hover:text-maroon-700 transition-colors"
                >
                  {m.phone}
                </a>
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-maroon-700 mb-1">Address</p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${m.name}, ${m.address}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-warm-800 hover:text-maroon-700 hover:underline transition-colors leading-relaxed block"
                >
                  {m.address}
                </a>
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-maroon-700 mb-1">Pricing</p>
                <p className="text-sm font-semibold text-warm-900">{m.priceLabel}</p>
              </div>
              <a
                href={`tel:${m.phone.replace(/\s+/g, '')}`}
                className="block w-full text-center px-5 py-3 rounded-full bg-gold-400 hover:bg-gold-300 text-maroon-900 text-sm font-bold tracking-[0.18em] uppercase ring-2 ring-gold-300/50 transition-all shadow-md"
              >
                Call now
              </a>
              <Link
                to="/contact"
                className="block w-full text-center px-5 py-3 rounded-full border-2 border-maroon-700 text-maroon-700 hover:bg-maroon-700 hover:text-white text-sm font-bold tracking-[0.18em] uppercase transition-all"
              >
                Send enquiry
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
