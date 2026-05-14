import { Outlet, Link } from 'react-router-dom';
import { Navbar } from './Navbar';

export function Layout() {
  return (
    <div className="min-h-screen bg-cream-50 flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-maroon-900 text-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr] gap-8">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.3em] text-gold-300 uppercase mb-2">
              Auspicious Bookings
            </p>
            <p
              className="text-3xl text-white mb-2"
              style={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700 }}
            >
              ShubhMandap
            </p>
            <div className="h-0.5 w-12 bg-gold-400 rounded-full mb-3" />
            <p className="text-sm text-cream-200/85 leading-relaxed max-w-sm">
              A curated directory of Kalyana Mandapams and wedding halls across Bengaluru — capacity, pricing, photos and direct enquiries in one place.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white mb-3">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/mandapams" className="text-cream-200 hover:text-gold-300 transition-colors">Browse mandapams</Link></li>
              <li><Link to="/about" className="text-cream-200 hover:text-gold-300 transition-colors">About us</Link></li>
              <li><Link to="/contact" className="text-cream-200 hover:text-gold-300 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white mb-3">Reach us</h3>
            <p className="text-sm text-cream-200/85">
              <a href="mailto:hello@shubhmandap.in" className="hover:text-gold-300 transition-colors">
                hello@shubhmandap.in
              </a>
            </p>
            <p className="text-xs text-cream-200/60 mt-3 leading-relaxed">
              We respond within one working day.
            </p>
          </div>
        </div>

        <div className="border-t border-maroon-800/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-cream-200/60">
            <p>© {new Date().getFullYear()} ShubhMandap. All wedding venues — vetted, listed, ready.</p>
            <p>Made for Bengaluru's wedding families 🌸</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
