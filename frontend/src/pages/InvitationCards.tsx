import { useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

type CardType = 'wedding' | 'video' | 'save';

type CardDesign = {
  id: string;
  type: CardType;
  couple: string;
  date: string;
  tint: string;   // outer gradient border
  motif: string;  // decorative emoji
};

const TABS: { key: CardType; label: string }[] = [
  { key: 'wedding', label: 'Wedding Cards' },
  { key: 'video', label: 'Video Cards' },
  { key: 'save', label: 'Save the Date Cards' },
];

const DESIGNS: CardDesign[] = [
  { id: 'w1', type: 'wedding', couple: 'Aarav & Aarohi', date: 'July 13, 2026 · 1:30 PM', tint: 'from-rose-400 to-pink-300', motif: '🌸' },
  { id: 'w2', type: 'wedding', couple: 'Amayra & Ayan', date: 'April 22, 2026', tint: 'from-fuchsia-500 to-orange-400', motif: '🏵️' },
  { id: 'w3', type: 'wedding', couple: 'Priya & Rohan', date: 'November 9, 2026', tint: 'from-emerald-500 to-teal-400', motif: '🦚' },
  { id: 'w4', type: 'wedding', couple: 'Shreya & Karthik', date: 'February 2, 2026', tint: 'from-maroon-700 to-gold-500', motif: '🪔' },
  { id: 'w5', type: 'wedding', couple: 'Ananya & Vikram', date: 'August 18, 2026', tint: 'from-amber-500 to-yellow-400', motif: '🌿' },
  { id: 'w6', type: 'wedding', couple: 'Diya & Aditya', date: 'December 5, 2026', tint: 'from-pink-500 to-rose-400', motif: '💐' },
  { id: 'vid1', type: 'video', couple: 'Meera & Arjun', date: 'March 14, 2026', tint: 'from-purple-500 to-fuchsia-400', motif: '🎬' },
  { id: 'vid2', type: 'video', couple: 'Kavya & Nikhil', date: 'June 21, 2026', tint: 'from-rose-500 to-orange-400', motif: '🎬' },
  { id: 'vid3', type: 'video', couple: 'Isha & Varun', date: 'October 2, 2026', tint: 'from-teal-500 to-emerald-400', motif: '🎬' },
  { id: 'vid4', type: 'video', couple: 'Tara & Sameer', date: 'May 30, 2026', tint: 'from-maroon-600 to-rose-400', motif: '🎬' },
  { id: 's1', type: 'save', couple: 'Riya & Dev', date: 'Save the date · Jan 2027', tint: 'from-gold-500 to-amber-400', motif: '📅' },
  { id: 's2', type: 'save', couple: 'Neha & Sahil', date: 'Save the date · Sep 2026', tint: 'from-fuchsia-500 to-pink-400', motif: '📅' },
  { id: 's3', type: 'save', couple: 'Pooja & Manish', date: 'Save the date · Jul 2026', tint: 'from-emerald-600 to-gold-400', motif: '📅' },
  { id: 's4', type: 'save', couple: 'Anjali & Rahul', date: 'Save the date · Apr 2027', tint: 'from-rose-500 to-fuchsia-400', motif: '📅' },
];

export function InvitationCards() {
  const navigate = useNavigate();
  const goBack = () => (typeof window !== 'undefined' && window.history.length > 1 ? navigate(-1) : navigate('/categories'));
  const [searchParams] = useSearchParams();
  const initial = (searchParams.get('tab') as CardType) || 'wedding';
  const [tab, setTab] = useState<CardType>(TABS.some((t) => t.key === initial) ? initial : 'wedding');

  const designs = useMemo(() => DESIGNS.filter((d) => d.type === tab), [tab]);

  return (
    <div className="bg-cream-50 min-h-screen">
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
            <Link to="/" className="hover:text-maroon-700">Home</Link>
            <span>›</span>
            <Link to="/categories" className="hover:text-maroon-700">Invitation Maker</Link>
            <span>›</span>
            <span className="text-maroon-700 font-semibold">{TABS.find((t) => t.key === tab)?.label}</span>
          </nav>

          <div className="flex items-end justify-between gap-4 flex-wrap">
            <h1
              className="text-2xl sm:text-3xl lg:text-4xl text-maroon-900"
              style={{ fontFamily: '"Plus Jakarta Sans", Inter, system-ui, sans-serif', fontWeight: 800, letterSpacing: '-0.02em' }}
            >
              {TABS.find((t) => t.key === tab)?.label}{' '}
              <span className="text-base font-semibold text-warm-400">{designs.length} designs</span>
            </h1>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border-2 border-warm-300 text-warm-700 hover:border-maroon-400 hover:text-maroon-700 text-xs font-bold tracking-[0.15em] uppercase transition-colors"
            >
              ✉️ Your cards
            </Link>
          </div>

          {/* Tabs */}
          <div className="mt-5 flex gap-6 border-b border-cream-200 -mb-px">
            {TABS.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setTab(t.key)}
                className={`pb-3 text-sm font-semibold transition-colors border-b-2 ${
                  tab === t.key ? 'border-maroon-600 text-maroon-700' : 'border-transparent text-warm-500 hover:text-maroon-700'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Card designer CTA */}
          <div className="rounded-2xl bg-gradient-to-r from-pink-100 to-rose-100 ring-1 ring-rose-200/70 p-5 sm:p-6 mb-7 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <p className="text-base font-bold text-pink-700 flex items-center justify-center sm:justify-start gap-2">
                <span aria-hidden="true">🎨</span> Are you a card designer?
              </p>
              <p className="text-sm text-warm-600 mt-0.5">
                Add your company details and showcase your invitation designs to couples across Karnataka.
              </p>
            </div>
            <Link
              to="/list-your-business?category=invites-gifts"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-maroon-600 hover:bg-maroon-700 text-white text-sm font-bold tracking-[0.12em] uppercase transition-colors shadow shrink-0"
            >
              <span aria-hidden="true" className="text-base leading-none">＋</span>
              Add your company
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {designs.map((d) => (
              <Link
                key={d.id}
                to="/contact"
                className="group relative rounded-2xl overflow-hidden aspect-[3/4] bg-gradient-to-br shadow-sm hover:shadow-xl transition-all hover:-translate-y-0.5"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${d.tint}`} />
                {/* Inner card */}
                <div className="absolute inset-2.5 rounded-xl bg-cream-50/95 flex flex-col items-center justify-center text-center px-4">
                  <span aria-hidden="true" className="absolute top-2 left-2 text-lg opacity-80">{d.motif}</span>
                  <span aria-hidden="true" className="absolute top-2 right-2 text-lg opacity-80">{d.motif}</span>
                  <span aria-hidden="true" className="absolute bottom-2 left-2 text-lg opacity-80">{d.motif}</span>
                  <span aria-hidden="true" className="absolute bottom-2 right-2 text-lg opacity-80">{d.motif}</span>

                  {d.type !== 'save' && (
                    <p className="text-[9px] tracking-[0.2em] uppercase text-warm-500 mb-2">We invite you to celebrate</p>
                  )}
                  <p
                    className="text-lg sm:text-xl text-maroon-800 leading-tight"
                    style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: 600 }}
                  >
                    {d.couple}
                  </p>
                  <div className="my-2 h-px w-10 bg-gold-400" />
                  <p className="text-[10px] sm:text-xs text-warm-600">{d.date}</p>

                  {d.type === 'video' && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="w-10 h-10 rounded-full bg-maroon-600/90 text-white flex items-center justify-center text-base shadow-lg">▶</span>
                    </span>
                  )}
                </div>

                {/* Hover CTA */}
                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="block text-center text-xs font-bold tracking-[0.15em] uppercase text-white">Use this design →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
