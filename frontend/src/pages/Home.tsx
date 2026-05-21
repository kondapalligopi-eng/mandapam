import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MANDAPAMS } from '@/data/mandapams';

// Festive gradient palette — cycled across the Karnataka city tiles.
const CITY_TINTS = [
  'from-maroon-600 to-maroon-400',
  'from-fuchsia-500 to-rose-400',
  'from-orange-500 to-gold-400',
  'from-amber-500 to-yellow-400',
  'from-emerald-500 to-green-400',
  'from-teal-500 to-emerald-400',
  'from-rose-500 to-orange-400',
  'from-pink-500 to-fuchsia-400',
];

// Cities & district headquarters across Karnataka.
const KARNATAKA_CITIES: { name: string; emoji: string }[] = [
  { name: 'Bengaluru', emoji: '🏙️' },
  { name: 'Mysuru', emoji: '🏰' },
  { name: 'Mangaluru', emoji: '🌊' },
  { name: 'Hubballi', emoji: '🏬' },
  { name: 'Dharwad', emoji: '📚' },
  { name: 'Belagavi', emoji: '🏯' },
  { name: 'Kalaburagi', emoji: '🕌' },
  { name: 'Vijayapura', emoji: '🕋' },
  { name: 'Davanagere', emoji: '🍪' },
  { name: 'Ballari', emoji: '🏜️' },
  { name: 'Shivamogga', emoji: '🌴' },
  { name: 'Tumakuru', emoji: '🛕' },
  { name: 'Raichur', emoji: '🏰' },
  { name: 'Bidar', emoji: '🏯' },
  { name: 'Hassan', emoji: '🛕' },
  { name: 'Udupi', emoji: '🥥' },
  { name: 'Chitradurga', emoji: '🏰' },
  { name: 'Mandya', emoji: '🌾' },
  { name: 'Chikkamagaluru', emoji: '☕' },
  { name: 'Karwar', emoji: '⛵' },
  { name: 'Ramanagara', emoji: '⛰️' },
  { name: 'Kolar', emoji: '⛏️' },
  { name: 'Chikkaballapura', emoji: '🌄' },
  { name: 'Hosapete', emoji: '🗿' },
  { name: 'Gadag', emoji: '🛕' },
  { name: 'Bagalkote', emoji: '🏯' },
  { name: 'Haveri', emoji: '🌻' },
  { name: 'Koppal', emoji: '🗿' },
  { name: 'Yadgir', emoji: '🏞️' },
  { name: 'Madikeri', emoji: '🏔️' },
  { name: 'Chamarajanagar', emoji: '🐯' },
];

// City → district (most match; these are the ones that differ).
const CITY_DISTRICT: Record<string, string> = {
  Bengaluru: 'Bengaluru Urban',
  Mangaluru: 'Dakshina Kannada',
  Hubballi: 'Dharwad',
  Hosapete: 'Vijayanagara',
  Madikeri: 'Kodagu',
  Karwar: 'Uttara Kannada',
};
const districtOf = (city: string) => CITY_DISTRICT[city] ?? city;

export function Home() {
  const featured = MANDAPAMS.slice(0, 3);
  const [cityQuery, setCityQuery] = useState('');

  const q = cityQuery.trim().toLowerCase();
  const matchedCities = q ? KARNATAKA_CITIES.filter((c) => c.name.toLowerCase().includes(q)) : [];
  const shownCities = q ? matchedCities : KARNATAKA_CITIES.slice(0, 8);

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-paisley text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/25 via-orange-400/15 to-yellow-300/30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6 lg:gap-8 items-center">
          <div className="relative max-w-xl">
            {/* Pulsing color halo behind the card */}
            <div aria-hidden="true" className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-yellow-300/60 via-fuchsia-500/55 to-orange-400/55 blur-2xl opacity-80 animate-pulse" />
            {/* Corner marigold ornament */}
            <span aria-hidden="true" className="absolute -top-4 -right-3 text-4xl drop-shadow-xl rotate-12 z-10">🌼</span>
            <div className="relative rounded-2xl p-1 bg-gradient-to-br from-yellow-300 via-fuchsia-500 to-orange-500 shadow-[0_25px_60px_-15px_rgba(217,70,239,0.6)]">
              <div className="rounded-xl bg-gradient-to-br from-maroon-900/70 via-fuchsia-900/55 to-rose-900/60 backdrop-blur-md p-4 sm:p-5 lg:p-6 ring-1 ring-white/15">
              <div className="flex items-center gap-3 mb-2">
                <p className="text-[11px] sm:text-xs font-semibold tracking-[0.35em] text-gold-300 uppercase">
                  Across Karnataka
                </p>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-green-500 text-white text-[10px] font-bold tracking-[0.18em] uppercase shadow">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  Now booking
                </span>
              </div>
              <h1
                className="text-2xl sm:text-3xl lg:text-4xl text-white leading-[1.1] mb-3"
                style={{ fontFamily: '"Plus Jakarta Sans", Inter, system-ui, sans-serif', fontWeight: 800, letterSpacing: '-0.02em' }}
              >
                Find the perfect Kalyana Mandapam
              </h1>
              {/* Tricolor accent — yellow / white / green */}
              <div className="flex w-28 h-1 rounded-full overflow-hidden mb-4 ring-1 ring-white/20">
                <span className="flex-1 bg-gold-400" />
                <span className="flex-1 bg-white" />
                <span className="flex-1 bg-green-500" />
              </div>
              <p className="text-sm text-cream-100/90 leading-relaxed mb-4">
                Hand-picked wedding halls and convention venues across Karnataka —
                from Bengaluru and Mysuru to Mangaluru, Hubballi and beyond.
                Capacity, pricing, photos, and direct enquiries, all in one place.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/mandapams"
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-gold-400 hover:bg-gold-300 text-maroon-900 text-xs sm:text-sm font-bold tracking-[0.18em] uppercase ring-2 ring-gold-300/50 hover:ring-gold-200 transition-all shadow-lg"
                >
                  Browse mandapams
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full border-2 border-cream-200/60 text-cream-100 hover:bg-white/10 text-xs sm:text-sm font-bold tracking-[0.18em] uppercase transition-all"
                >
                  Speak with us
                </Link>
              </div>
              </div>
            </div>
          </div>

          {/* Right ornament */}
          <div className="hidden lg:flex justify-end">
            <div className="relative w-44 h-44">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-300/60 via-fuchsia-400/40 to-teal-300/30 blur-3xl" />
              <div className="relative h-full flex items-center justify-center text-[100px] drop-shadow-2xl">
                🛕
              </div>
              <span className="absolute top-2 right-0 text-3xl drop-shadow-2xl">🌸</span>
              <span className="absolute bottom-4 left-0 text-2xl drop-shadow-2xl">🪔</span>
              <span className="absolute top-1/2 left-0 text-xl drop-shadow-2xl">🎊</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Browse by Karnataka city ─────────────────────────────────── */}
      <section className="py-12 sm:py-14 bg-white border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8">
            <p className="text-[11px] sm:text-xs font-semibold tracking-[0.3em] text-gold-700 uppercase mb-2">
              Across Karnataka
            </p>
            <h2
              className="text-2xl sm:text-3xl text-maroon-900"
              style={{ fontFamily: '"Plus Jakarta Sans", Inter, system-ui, sans-serif', fontWeight: 800, letterSpacing: '-0.02em' }}
            >
              Find mandapams by city
            </h2>
            <div className="mx-auto mt-3 h-0.5 w-16 bg-gold-400 rounded-full" />

            {/* City search + dropdown */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto mt-6">
              <label className="relative flex-1">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-400">🔍</span>
                <input
                  value={cityQuery}
                  onChange={(e) => setCityQuery(e.target.value)}
                  placeholder="Search your city…"
                  className="w-full pl-11 pr-4 py-2.5 rounded-full bg-cream-50 text-warm-800 text-sm placeholder:text-warm-400 ring-1 ring-cream-300 focus:ring-2 focus:ring-gold-300 focus:outline-none shadow-sm"
                />
              </label>
              <select
                value={KARNATAKA_CITIES.some((c) => c.name === cityQuery) ? cityQuery : ''}
                onChange={(e) => setCityQuery(e.target.value)}
                className={`px-4 py-2.5 rounded-full bg-cream-50 text-sm ring-1 ring-cream-300 focus:ring-2 focus:ring-gold-300 focus:outline-none shadow-sm cursor-pointer sm:w-52 ${cityQuery ? 'text-warm-800' : 'text-warm-400'}`}
                aria-label="Choose a city"
              >
                <option value="">All cities</option>
                {KARNATAKA_CITIES.map((c) => (
                  <option key={c.name} value={c.name} className="text-warm-800">{c.name}</option>
                ))}
              </select>
            </div>
            <p className="text-xs text-warm-400 mt-2">
              {q ? `${matchedCities.length} ${matchedCities.length === 1 ? 'match' : 'matches'}` : 'Popular cities — search to see all 31'}
            </p>
          </div>

          {shownCities.length === 0 ? (
            <p className="text-center text-warm-500 py-6">No city matches "{cityQuery}". Try another name.</p>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-x-4 gap-y-6 sm:gap-y-7">
              {shownCities.map(({ name, emoji }) => {
                const tint = CITY_TINTS[KARNATAKA_CITIES.findIndex((c) => c.name === name) % CITY_TINTS.length];
                return (
                  <Link key={name} to={`/mandapams?district=${encodeURIComponent(districtOf(name))}`} className="group flex flex-col items-center gap-2.5">
                    <div
                      className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br ${tint} flex items-center justify-center text-2xl sm:text-3xl shadow-md ring-4 ring-white group-hover:ring-gold-200 group-hover:shadow-xl group-hover:-translate-y-1 transition-all`}
                    >
                      <span aria-hidden="true" className="drop-shadow">{emoji}</span>
                    </div>
                    <span className="text-[11px] sm:text-xs font-semibold text-warm-700 group-hover:text-maroon-700 transition-colors text-center leading-tight">
                      {name}
                    </span>
                  </Link>
                );
              })}
            </div>
          )}
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
              style={{ fontFamily: '"Plus Jakarta Sans", Inter, system-ui, sans-serif', fontWeight: 800, letterSpacing: '-0.02em' }}
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
                iconBg: 'bg-green-100',
              },
              {
                emoji: '💰',
                title: 'Transparent pricing',
                body: 'Day rates and inclusions listed upfront. Compare halls side by side with no hidden fees.',
                iconBg: 'bg-gold-100',
              },
              {
                emoji: '📞',
                title: 'Direct enquiries',
                body: 'Reach the hall manager in one tap. No middlemen, no commissions — pay the venue directly.',
                iconBg: 'bg-maroon-50',
              },
            ].map(({ emoji, title, body, iconBg }) => (
              <div
                key={title}
                className="rounded-2xl border-2 border-cream-200 bg-white p-6 hover:border-gold-300 hover:shadow-md transition-all"
              >
                <div className={`w-12 h-12 rounded-full ${iconBg} flex items-center justify-center text-2xl mb-4`}>
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
                style={{ fontFamily: '"Plus Jakarta Sans", Inter, system-ui, sans-serif', fontWeight: 800, letterSpacing: '-0.02em' }}
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
                    style={{ fontFamily: '"Plus Jakarta Sans", Inter, system-ui, sans-serif', fontWeight: 800, letterSpacing: '-0.02em' }}
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

      {/* ── Vendor section ───────────────────────────────────────────── */}
      <section className="bg-paisley relative overflow-hidden text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-600/55 via-rose-500/35 to-orange-400/40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 items-center">
            <div>
              <p className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-bold tracking-[0.3em] text-gold-200 uppercase mb-3">
                <span aria-hidden="true">💼</span> Are you a vendor?
              </p>
              <h2
                className="text-3xl sm:text-4xl text-white leading-tight"
                style={{ fontFamily: '"Plus Jakarta Sans", Inter, system-ui, sans-serif', fontWeight: 800, letterSpacing: '-0.02em' }}
              >
                Grow your business with ShubhMandap
              </h2>
              <ul className="mt-5 space-y-2.5">
                {[
                  'Showcase your venue or services to wedding families across Karnataka',
                  'Reach engaged couples and book more weddings — no commissions, ever',
                  'Trusted by venues, photographers, caterers and planners statewide',
                ].map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm sm:text-base text-cream-100/90">
                    <span aria-hidden="true" className="mt-0.5 w-5 h-5 shrink-0 rounded-full bg-green-500 text-white text-xs flex items-center justify-center">✓</span>
                    {point}
                  </li>
                ))}
              </ul>
              <Link
                to="/list-your-business"
                className="inline-flex items-center justify-center gap-2 mt-7 px-8 py-3 rounded-full bg-gold-400 hover:bg-gold-300 text-maroon-900 text-sm font-bold tracking-[0.18em] uppercase ring-2 ring-gold-300/50 hover:ring-gold-200 transition-all shadow-lg"
              >
                List your business
              </Link>
            </div>

            {/* Sign-up prompt card */}
            <div className="rounded-2xl bg-white/95 text-warm-800 shadow-2xl p-6 sm:p-8 ring-1 ring-white/30">
              <h3
                className="text-xl text-maroon-900 text-center"
                style={{ fontFamily: '"Plus Jakarta Sans", Inter, system-ui, sans-serif', fontWeight: 800, letterSpacing: '-0.02em' }}
              >
                Become a partner
              </h3>
              <p className="text-sm text-warm-600 text-center mt-1">
                Create your free listing in minutes.
              </p>
              <Link
                to="/list-your-business"
                className="block text-center mt-5 px-6 py-3 rounded-full bg-maroon-600 hover:bg-maroon-700 text-white text-sm font-bold tracking-[0.15em] uppercase transition-colors shadow"
              >
                Sign up free
              </Link>
              <p className="text-center text-xs text-warm-500 mt-4">
                Already listed?{' '}
                <Link to="/contact" className="text-maroon-700 font-semibold hover:underline">Contact us</Link>
              </p>
            </div>
          </div>

          {/* Three benefits */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 pt-10 border-t border-white/20">
            {[
              { emoji: '🔍', title: 'Reach engaged couples', body: 'Couples find your listing and request details about your business directly.' },
              { emoji: '✉️', title: 'Get more leads', body: 'Receive enquiries straight to your phone or inbox — no middlemen.' },
              { emoji: '💍', title: 'Book more weddings', body: 'Feature across Karnataka to drive more bookings and grow your business.' },
            ].map(({ emoji, title, body }) => (
              <div key={title} className="text-center">
                <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-white/15 ring-1 ring-white/25 flex items-center justify-center text-2xl">
                  {emoji}
                </div>
                <h4 className="text-base font-bold text-white">{title}</h4>
                <p className="text-sm text-cream-100/80 mt-1 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
