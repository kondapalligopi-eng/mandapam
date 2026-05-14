import { useState } from 'react';

const TOPICS = [
  'Wedding enquiry',
  'List my mandapam',
  'Partnership',
  'General feedback',
];

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', topic: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.topic || !form.message.trim()) {
      setError('Name, email, topic, and message are required.');
      return;
    }
    setError(null);
    setSubmitting(true);
    // For now this just simulates a submit — wire to a real backend / FormSubmit hash later.
    await new Promise((r) => setTimeout(r, 500));
    setSubmitting(false);
    setSubmitted(true);
    setForm({ name: '', email: '', phone: '', topic: '', message: '' });
  };

  return (
    <div className="bg-cream-50">
      <section className="relative overflow-hidden bg-paisley text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-maroon-900/85 via-maroon-800/80 to-maroon-700/75" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
          <p className="text-[11px] sm:text-xs font-semibold tracking-[0.3em] text-gold-300 uppercase mb-2">
            Reach us
          </p>
          <h1
            className="text-3xl sm:text-5xl text-white leading-tight"
            style={{ fontFamily: '"Plus Jakarta Sans", Inter, system-ui, sans-serif', fontWeight: 800, letterSpacing: '-0.02em' }}
          >
            Let's plan your day
          </h1>
          <div className="mt-3 h-0.5 w-16 bg-gold-400 rounded-full" />
          <p className="mt-3 text-sm sm:text-base text-cream-100/85 max-w-xl">
            Tell us what you're looking for and we'll line up the right venues. We reply within a day.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border-2 border-cream-200 bg-white shadow-sm p-6 sm:p-8">
            {submitted ? (
              <div className="text-center py-6">
                <div className="text-5xl mb-4">🌸</div>
                <h2
                  className="text-2xl text-maroon-900 mb-2"
                  style={{ fontFamily: '"Plus Jakarta Sans", Inter, system-ui, sans-serif', fontWeight: 800, letterSpacing: '-0.02em' }}
                >
                  Thank you!
                </h2>
                <p className="text-sm text-warm-700 mb-6">
                  Your enquiry has been received. We'll respond within one working day.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2.5 rounded-full border-2 border-warm-300 text-warm-700 hover:bg-cream-100 text-sm font-semibold transition-colors"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                {error && (
                  <div className="rounded-lg bg-rose-50 border border-rose-200 px-4 py-2 text-sm text-rose-800">
                    {error}
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="block text-sm font-semibold text-maroon-900 mb-1">Your name <span className="text-rose-500">*</span></span>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Full name"
                      className="w-full px-3 py-2 border-2 border-warm-300 rounded-md text-sm outline-none focus:border-maroon-500 transition-colors"
                    />
                  </label>
                  <label className="block">
                    <span className="block text-sm font-semibold text-maroon-900 mb-1">Email <span className="text-rose-500">*</span></span>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@example.com"
                      className="w-full px-3 py-2 border-2 border-warm-300 rounded-md text-sm outline-none focus:border-maroon-500 transition-colors"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="block text-sm font-semibold text-maroon-900 mb-1">Phone</span>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 ..."
                    className="w-full px-3 py-2 border-2 border-warm-300 rounded-md text-sm outline-none focus:border-maroon-500 transition-colors"
                  />
                </label>

                <label className="block">
                  <span className="block text-sm font-semibold text-maroon-900 mb-1">Topic <span className="text-rose-500">*</span></span>
                  <select
                    required
                    value={form.topic}
                    onChange={(e) => setForm({ ...form, topic: e.target.value })}
                    className={`w-full px-3 py-2 border-2 border-warm-300 rounded-md text-sm outline-none focus:border-maroon-500 transition-colors bg-white ${form.topic ? 'text-warm-900' : 'text-warm-400'}`}
                  >
                    <option value="" disabled>Choose a topic</option>
                    {TOPICS.map((t) => (
                      <option key={t} value={t} className="text-warm-900">{t}</option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="block text-sm font-semibold text-maroon-900 mb-1">Message <span className="text-rose-500">*</span></span>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Wedding date, expected guest count, area preference…"
                    className="w-full px-3 py-2 border-2 border-warm-300 rounded-md text-sm outline-none focus:border-maroon-500 transition-colors resize-y"
                  />
                </label>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-gold-400 hover:bg-gold-300 disabled:opacity-60 disabled:cursor-not-allowed text-maroon-900 text-sm font-bold tracking-[0.18em] uppercase ring-2 ring-gold-300/50 transition-all shadow-md"
                  >
                    {submitting ? 'Sending…' : 'Send enquiry'}
                  </button>
                </div>
              </form>
            )}
          </div>

          <p className="text-center text-xs text-warm-500 mt-6">
            Prefer email? <a href="mailto:hello@shubhmandap.in" className="text-maroon-700 hover:underline font-semibold">hello@shubhmandap.in</a>
          </p>
        </div>
      </section>
    </div>
  );
}
