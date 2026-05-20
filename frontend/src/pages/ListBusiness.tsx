import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SERVICES, SERVICE_CITIES } from '@/data/services';

// Category options: Venues (the mandapam directory) + every service category.
const CATEGORY_OPTIONS = [
  { value: 'venues', label: 'Venues / Kalyana Mandapam' },
  ...Object.values(SERVICES).map((s) => ({ value: s.slug, label: s.title })),
];

const CITY_OPTIONS = [...SERVICE_CITIES.map((c) => c.name), 'Other (Karnataka)'];

const MAX_PHOTOS = 8;

type Photo = { file: File; url: string };

export function ListBusiness() {
  const [searchParams] = useSearchParams();
  const presetCategory = searchParams.get('category') ?? '';

  const [form, setForm] = useState({
    businessName: '',
    category: CATEGORY_OPTIONS.some((c) => c.value === presetCategory) ? presetCategory : '',
    city: '',
    contactName: '',
    email: '',
    phone: '',
    priceRange: '',
    website: '',
    description: '',
    agree: false,
  });
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Keep the dropdown in sync if the user lands with a ?category= deep link.
  useEffect(() => {
    if (presetCategory && CATEGORY_OPTIONS.some((c) => c.value === presetCategory)) {
      setForm((f) => ({ ...f, category: presetCategory }));
    }
  }, [presetCategory]);

  // Release object URLs when the component unmounts.
  useEffect(() => () => photos.forEach((p) => URL.revokeObjectURL(p.url)), [photos]);

  const onPhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []).filter((f) => f.type.startsWith('image/'));
    const mapped = files.map((file) => ({ file, url: URL.createObjectURL(file) }));
    setPhotos((prev) => [...prev, ...mapped].slice(0, MAX_PHOTOS));
    e.target.value = ''; // allow re-selecting the same file
  };

  const removePhoto = (url: string) => {
    URL.revokeObjectURL(url);
    setPhotos((prev) => prev.filter((p) => p.url !== url));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.businessName.trim() ||
      !form.category ||
      !form.city ||
      !form.contactName.trim() ||
      !form.email.trim() ||
      !form.phone.trim() ||
      !form.description.trim()
    ) {
      setError('Please fill in all required fields (marked with *).');
      return;
    }
    if (!form.agree) {
      setError('Please accept the listing terms to continue.');
      return;
    }
    setError(null);
    setSubmitting(true);
    // Simulated submit — wire to a real backend / upload endpoint later.
    await new Promise((r) => setTimeout(r, 600));
    setSubmitting(false);
    setSubmitted(true);
    photos.forEach((p) => URL.revokeObjectURL(p.url));
    setPhotos([]);
  };

  const inputClass =
    'w-full px-3 py-2 border-2 border-warm-300 rounded-md text-sm outline-none focus:border-maroon-500 transition-colors';

  return (
    <div className="bg-cream-50">
      {/* ── Header ───────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-paisley text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/25 via-orange-400/15 to-yellow-300/30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <p className="text-[11px] sm:text-xs font-semibold tracking-[0.3em] text-gold-300 uppercase mb-2">
            Grow with ShubhMandap
          </p>
          <h1
            className="text-3xl sm:text-5xl text-white leading-tight"
            style={{ fontFamily: '"Plus Jakarta Sans", Inter, system-ui, sans-serif', fontWeight: 800, letterSpacing: '-0.02em' }}
          >
            List your business
          </h1>
          <div className="mt-3 h-0.5 w-16 bg-gold-400 rounded-full" />
          <p className="mt-3 text-sm sm:text-base text-cream-100/90 max-w-xl">
            Reach Karnataka's wedding families directly — no commissions, ever.
            Tell us about your business and we'll get you listed within two
            working days.
          </p>
        </div>
      </section>

      {/* ── Form ─────────────────────────────────────────────────────── */}
      <section className="py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border-2 border-cream-200 bg-white shadow-sm p-6 sm:p-8">
            {submitted ? (
              <div className="text-center py-6">
                <div className="text-5xl mb-4">🎉</div>
                <h2
                  className="text-2xl text-maroon-900 mb-2"
                  style={{ fontFamily: '"Plus Jakarta Sans", Inter, system-ui, sans-serif', fontWeight: 800, letterSpacing: '-0.02em' }}
                >
                  Application received!
                </h2>
                <p className="text-sm text-warm-700 mb-6 max-w-md mx-auto">
                  Thanks for sharing your details. Our team will review your
                  listing and reach out within two working days.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2.5 rounded-full border-2 border-warm-300 text-warm-700 hover:bg-cream-100 text-sm font-semibold transition-colors"
                >
                  List another business
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                {error && (
                  <div className="rounded-lg bg-rose-50 border border-rose-200 px-4 py-2 text-sm text-rose-800">
                    {error}
                  </div>
                )}

                <label className="block">
                  <span className="block text-sm font-semibold text-maroon-900 mb-1">Business name <span className="text-rose-500">*</span></span>
                  <input
                    type="text"
                    required
                    value={form.businessName}
                    onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                    placeholder="e.g. Lensa Wedding Co."
                    className={inputClass}
                  />
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="block text-sm font-semibold text-maroon-900 mb-1">Category <span className="text-rose-500">*</span></span>
                    <select
                      required
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className={`${inputClass} bg-white ${form.category ? 'text-warm-900' : 'text-warm-400'}`}
                    >
                      <option value="" disabled>Choose a category</option>
                      {CATEGORY_OPTIONS.map((c) => (
                        <option key={c.value} value={c.value} className="text-warm-900">{c.label}</option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    <span className="block text-sm font-semibold text-maroon-900 mb-1">City <span className="text-rose-500">*</span></span>
                    <select
                      required
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className={`${inputClass} bg-white ${form.city ? 'text-warm-900' : 'text-warm-400'}`}
                    >
                      <option value="" disabled>Choose a city</option>
                      {CITY_OPTIONS.map((c) => (
                        <option key={c} value={c} className="text-warm-900">{c}</option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="block text-sm font-semibold text-maroon-900 mb-1">Contact person <span className="text-rose-500">*</span></span>
                    <input
                      type="text"
                      required
                      value={form.contactName}
                      onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                      placeholder="Full name"
                      className={inputClass}
                    />
                  </label>
                  <label className="block">
                    <span className="block text-sm font-semibold text-maroon-900 mb-1">Phone <span className="text-rose-500">*</span></span>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 ..."
                      className={inputClass}
                    />
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="block text-sm font-semibold text-maroon-900 mb-1">Email <span className="text-rose-500">*</span></span>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@business.com"
                      className={inputClass}
                    />
                  </label>
                  <label className="block">
                    <span className="block text-sm font-semibold text-maroon-900 mb-1">Price range</span>
                    <input
                      type="text"
                      value={form.priceRange}
                      onChange={(e) => setForm({ ...form, priceRange: e.target.value })}
                      placeholder="e.g. ₹45,000 – ₹1.5L"
                      className={inputClass}
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="block text-sm font-semibold text-maroon-900 mb-1">Website / Instagram</span>
                  <input
                    type="text"
                    value={form.website}
                    onChange={(e) => setForm({ ...form, website: e.target.value })}
                    placeholder="https:// or @handle"
                    className={inputClass}
                  />
                </label>

                <label className="block">
                  <span className="block text-sm font-semibold text-maroon-900 mb-1">About your business <span className="text-rose-500">*</span></span>
                  <textarea
                    required
                    rows={4}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Specialties, experience, what makes you stand out…"
                    className={`${inputClass} resize-y`}
                  />
                </label>

                {/* Photos */}
                <div className="block">
                  <span className="block text-sm font-semibold text-maroon-900 mb-1">
                    Photos <span className="font-normal text-warm-500">(up to {MAX_PHOTOS})</span>
                  </span>
                  <div className="flex flex-wrap gap-3">
                    {photos.map((p) => (
                      <div key={p.url} className="relative w-20 h-20 rounded-lg overflow-hidden ring-2 ring-cream-200 group">
                        <img src={p.url} alt="" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removePhoto(p.url)}
                          aria-label="Remove photo"
                          className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-maroon-700/90 text-white text-xs flex items-center justify-center hover:bg-maroon-800"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                    {photos.length < MAX_PHOTOS && (
                      <label className="w-20 h-20 rounded-lg border-2 border-dashed border-warm-300 hover:border-maroon-400 flex flex-col items-center justify-center cursor-pointer text-warm-500 hover:text-maroon-600 transition-colors">
                        <span className="text-xl leading-none">＋</span>
                        <span className="text-[10px] mt-0.5">Add</span>
                        <input type="file" accept="image/*" multiple onChange={onPhotos} className="hidden" />
                      </label>
                    )}
                  </div>
                  <p className="text-xs text-warm-500 mt-1.5">JPG or PNG. Clear, recent photos get more enquiries.</p>
                </div>

                <label className="flex items-start gap-2.5 pt-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.agree}
                    onChange={(e) => setForm({ ...form, agree: e.target.checked })}
                    className="mt-0.5 w-4 h-4 accent-maroon-600"
                  />
                  <span className="text-sm text-warm-700">
                    I confirm the details are accurate and agree to be contacted by ShubhMandap about my listing.
                  </span>
                </label>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-gold-400 hover:bg-gold-300 disabled:opacity-60 disabled:cursor-not-allowed text-maroon-900 text-sm font-bold tracking-[0.18em] uppercase ring-2 ring-gold-300/50 transition-all shadow-md"
                  >
                    {submitting ? 'Submitting…' : 'Submit listing'}
                  </button>
                </div>
              </form>
            )}
          </div>

          <p className="text-center text-xs text-warm-500 mt-6">
            Questions? <a href="mailto:partners@shubhmandap.in" className="text-maroon-700 hover:underline font-semibold">partners@shubhmandap.in</a>
          </p>
        </div>
      </section>
    </div>
  );
}
