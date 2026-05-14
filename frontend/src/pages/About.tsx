export function About() {
  return (
    <div className="bg-cream-50">
      <section className="relative overflow-hidden bg-paisley text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-maroon-900/85 via-maroon-800/80 to-maroon-700/75" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
          <p className="text-[11px] sm:text-xs font-semibold tracking-[0.3em] text-gold-300 uppercase mb-2">
            Our story
          </p>
          <h1
            className="text-3xl sm:text-5xl text-white leading-tight"
            style={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700 }}
          >
            Built for Bengaluru weddings
          </h1>
          <div className="mt-3 h-0.5 w-16 bg-gold-400 rounded-full" />
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-warm-800 leading-relaxed">
          <p className="text-lg">
            ShubhMandap started with a frustration every Bengaluru family knows: planning a
            wedding means juggling photocopied brochures, WhatsApp forwards, and the same five
            hall agents quoting wildly different numbers for the same venue.
          </p>
          <p>
            We built ShubhMandap to put every Kalyana Mandapam in the city on a single page —
            capacity, real day rates, what's included, photos that match the venue, and a phone
            number that connects you to the actual manager. No commission. No "your friend's
            wedding got a special rate, we can match it" games.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6">
            {[
              { stat: '40+', label: 'Venues across Bengaluru' },
              { stat: '100%', label: 'Vetted in person' },
              { stat: '₹0', label: 'Commission, ever' },
            ].map(({ stat, label }) => (
              <div key={label} className="rounded-2xl border-2 border-cream-200 bg-white p-5 text-center">
                <p
                  className="text-3xl text-maroon-800"
                  style={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700 }}
                >
                  {stat}
                </p>
                <p className="text-xs text-warm-600 mt-1 leading-snug">{label}</p>
              </div>
            ))}
          </div>

          <h2
            className="text-2xl text-maroon-900 pt-4"
            style={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700 }}
          >
            What we believe
          </h2>
          <ul className="space-y-3">
            {[
              'Pricing should be visible upfront — no "depends on date" runaround.',
              'Photos should match the venue. Period.',
              'The venue manager should answer the phone, not a middleman.',
              "We don't take commission — your full payment goes to the hall.",
            ].map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="mt-1 w-2 h-2 rounded-full bg-gold-400 shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
