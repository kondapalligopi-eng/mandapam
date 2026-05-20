import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const NAV_ITEMS = [
  { to: '/', label: 'Home', end: true },
  { to: '/mandapams', label: 'Mandapams', end: false },
  { to: '/categories', label: 'Categories', end: false },
  { to: '/about', label: 'About', end: false },
  { to: '/contact', label: 'Contact', end: false },
];

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `relative pb-1.5 text-xs sm:text-sm font-medium tracking-[0.2em] uppercase transition-colors ${
    isActive
      ? 'text-maroon-700 after:content-[""] after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-0.5 after:bg-gold-400'
      : 'text-warm-600 hover:text-maroon-700'
  }`;

const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
  `block px-3 py-2.5 rounded-lg text-sm font-semibold tracking-[0.12em] uppercase transition-colors ${
    isActive ? 'bg-maroon-50 text-maroon-700' : 'text-warm-700 hover:bg-cream-100'
  }`;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Close the mobile menu whenever the route changes.
  useEffect(() => { setOpen(false); }, [location]);

  return (
    <header className="sticky top-0 z-50 bg-cream-50/95 backdrop-blur border-b border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <span aria-hidden="true" className="text-2xl sm:text-3xl">🛕</span>
            <div className="leading-none">
              <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.3em] uppercase text-gold-600">
                Auspicious Bookings
              </p>
              <p
                className="text-xl sm:text-2xl text-maroon-800 group-hover:text-maroon-600 transition-colors"
                style={{ fontFamily: '"Plus Jakarta Sans", Inter, system-ui, sans-serif', fontWeight: 800, letterSpacing: '-0.02em' }}
              >
                ShubhMandap
              </p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.to} to={item.to} className={navLinkClass} end={item.end}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTA */}
          <Link
            to="/contact"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gold-400 hover:bg-gold-300 text-maroon-900 text-xs font-bold tracking-[0.2em] uppercase ring-2 ring-gold-300/50 hover:ring-gold-200 transition-all shadow"
          >
            Enquire
          </Link>

          {/* Mobile controls */}
          <div className="flex items-center gap-1 md:hidden">
            <Link
              to="/"
              aria-label="Home"
              className="p-2 rounded-lg text-warm-700 hover:bg-cream-100 hover:text-maroon-700 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 11.5 12 4l9 7.5M5 10v9a1 1 0 0 0 1 1h3v-5h6v5h3a1 1 0 0 0 1-1v-9" />
              </svg>
            </Link>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="p-2 rounded-lg text-warm-700 hover:bg-cream-100 hover:text-maroon-700 transition-colors"
            >
              {open ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" d="M6 6l12 12M18 6 6 18" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <nav className="md:hidden border-t border-cream-200 bg-cream-50">
          <div className="px-4 py-3 space-y-1">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.to} to={item.to} className={mobileLinkClass} end={item.end}>
                {item.label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              className="block text-center mt-2 px-5 py-2.5 rounded-full bg-gold-400 hover:bg-gold-300 text-maroon-900 text-xs font-bold tracking-[0.2em] uppercase ring-2 ring-gold-300/50 transition-all shadow"
            >
              Enquire
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
