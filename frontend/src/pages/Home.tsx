import { Link } from 'react-router-dom';
import { MANDAPAMS } from '@/data/mandapams';

export function Home() {
  const featured = MANDAPAMS.slice(0, 3);

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-paisley text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-maroon-900/85 via-maroon-800/80 to-maroon-700/75" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 items-center">
          <div className="max-w-xl">
            <p className="text-[11px] sm:text-xs font-semibold tracking-[0.35em] text-gold-300 uppercase mb-3">
              Bengaluru · Karnataka
            </p>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.1] mb-4"
              style={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700 }}
            >
              Find the perfect Kalyana Mandapam
            </h1>
            <div className="h-0.5 w-20 bg-gold-400 rounded-full mb-5" />
            <p className="text-base sm:text-lg text-cream-100/85 leading-relaxed mb-8">
              Hand-picked wedding halls and convention venues across Bengaluru.
              Capacity, pricing, photos, and direct enquiries — all in one place.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/mandapams"
                className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-gold-400 hover:bg-gold-300 text-maroon-900 text-sm font-bold tracking-[0.18em] uppercase ring-2 ring-gold-300/50 hover:ring-gold-200 transition-all shadow-lg"
              >
                Browse mandapams
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full border-2 border-cream-200/40 text-cream-100 hover:bg-white/10 text-sm font-bold tracking-[0.18em] uppercase transition-all"
              >
                Speak with us
              </Link>
            </div>
          </div>

          {/* Right ornament */}
          <div className="hidden lg:flex justify-end">
            <div className="relative w-80 h-80">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold-400/30 to-maroon-500/20 blur-3xl" />
              <div className="relative h-full flex items-center justify-center text-[180px] drop-shadow-2xl">
                🛕
              </div>
              <span className="absolute top-6 right-2 text-5xl drop-shadow-2xl">🌸</span>
              <span className="absolute bottom-8 left-2 text-4xl drop-shadow-2xl">🪔</span>
              <span className="absolute top-1/2 left-0 text-3xl drop-shadow-2xl">🎊</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Three pillars ────────────────────────────────────────────── */}
      <section className="py-14 sm:py-16 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[11px] sm:text-xs font-semibold tracking-[0.3em] text-gold-700 uppercase mb-2">
              Why ShubhMandap
            </p>
            <h2
              className="text-3xl sm:text-4xl text-maroon-900"
              style={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700 }}
            >
              Wedding planning, simplified
            </h2>
            <div className="mx-auto mt-3 h-0.5 w-16 bg-gold-400 rounded-full" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                emoji: '✅',
                title: 'Vetted venues only',
                body: 'Every hall is visited and verified before it appears in our directory — no fake photos, no surprises.',
              },
              {
                emoji: '💰',
                title: 'Transparent pricing',
                body: 'Day rates and inclusions listed upfront. Compare halls side by side with no hidden fees.',
              },
              {
                emoji: '📞',
                title: 'Direct enquiries',
                body: 'Reach the hall manager in one tap. No middlemen, no commissions — pay the venue directly.',
              },
            ].map(({ emoji, title, body }) => (
              <div
                key={title}
                className="rounded-2xl border-2 border-cream-200 bg-white p-6 hover:border-gold-300 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-maroon-50 flex items-center justify-center text-2xl mb-4">
                  {emoji}
                </div>
                <h3 className="text-lg font-bold text-maroon-900 mb-1">{title}</h3>
                <p className="text-sm text-warm-700 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured mandapams ───────────────────────────────────────── */}
      <section className="py-14 sm:py-16 bg-gradient-to-b from-cream-100 to-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-[11px] sm:text-xs font-semibold tracking-[0.3em] text-gold-700 uppercase mb-2">
                Featured this season
              </p>
              <h2
                className="text-3xl sm:text-4xl text-maroon-900"
                style={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700 }}
              >
                Hand-picked mandapams
              </h2>
            </div>
            <Link to="/mandapams" className="hidden sm:inline text-sm font-semibold text-maroon-700 hover:text-maroon-900 underline-offset-4 hover:underline">
              See all →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map((m) => (
              <Link
                key={m.slug}
                to={`/mandapams/${m.slug}`}
                className="group rounded-2xl overflow-hidden bg-white border-2 border-cream-200 hover:border-gold-300 hover:shadow-xl transition-all flex flex-col"
              >
                <div className={`relative aspect-[4/3] bg-gradient-to-br ${m.tint} flex items-center justify-center text-7xl`}>
                  <span aria-hidden="true" className="drop-shadow-lg">{m.emoji}</span>
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 text-[10px] font-bold tracking-[0.15em] uppercase text-maroon-800 shadow">
                    {m.locality}
                  </span>
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-gold-400 text-maroon-900 text-[11px] font-bold shadow">
                    ★ {m.rating.toFixed(1)}
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3
                    className="text-lg text-maroon-900 group-hover:text-maroon-700 transition-colors leading-tight mb-1"
                    style={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700 }}
                  >
                    {m.name}
                  </h3>
                  <p className="text-xs text-warm-500 mb-3">
                    {m.capacityMin}–{m.capacityMax} guests · {m.priceLabel}
                  </p>
                  <p className="text-sm text-warm-700 leading-relaxed flex-1 line-clamp-3">
                    {m.description}
                  </p>
                  <p className="mt-4 text-xs font-bold tracking-[0.15em] uppercase text-gold-700 group-hover:text-maroon-700 transition-colors">
                    View details →
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8 sm:hidden">
            <Link to="/mandapams" className="text-sm font-semibold text-maroon-700 hover:text-maroon-900 underline-offset-4 hover:underline">
              See all mandapams →
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA strip ────────────────────────────────────────────────── */}
      <section className="bg-paisley relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-maroon-900/90 to-maroon-700/80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <p className="text-[11px] sm:text-xs font-semibold tracking-[0.3em] text-gold-300 uppercase mb-1">
              List your venue
            </p>
            <h2
              className="text-2xl sm:text-3xl text-white"
              style={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700 }}
            >
              Own a Kalyana Mandapam?
            </h2>
            <p className="text-sm text-cream-100/80 mt-1">
              Reach Bengaluru's wedding families directly — no commissions, ever.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-gold-400 hover:bg-gold-300 text-maroon-900 text-sm font-bold tracking-[0.18em] uppercase ring-2 ring-gold-300/50 hover:ring-gold-200 transition-all shadow-lg shrink-0"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </div>
  );
}
