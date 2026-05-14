import { Link, NavLink } from 'react-router-dom';

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `relative pb-1.5 text-xs sm:text-sm font-medium tracking-[0.2em] uppercase transition-colors ${
    isActive
      ? 'text-maroon-700 after:content-[""] after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-0.5 after:bg-gold-400'
      : 'text-warm-600 hover:text-maroon-700'
  }`;

export function Navbar() {
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

          <nav className="hidden md:flex items-center gap-8">
            <NavLink to="/" className={navLinkClass} end>Home</NavLink>
            <NavLink to="/mandapams" className={navLinkClass}>Mandapams</NavLink>
            <NavLink to="/about" className={navLinkClass}>About</NavLink>
            <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
          </nav>

          <Link
            to="/contact"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gold-400 hover:bg-gold-300 text-maroon-900 text-xs font-bold tracking-[0.2em] uppercase ring-2 ring-gold-300/50 hover:ring-gold-200 transition-all shadow"
          >
            Enquire
          </Link>
        </div>
      </div>
    </header>
  );
}
