import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

export default function Nav({ transparent = false }) {
  const [open, setOpen] = useState(false)
  const loc = useLocation()
  const isHome = loc.pathname === '/'

  const base = transparent && isHome
    ? 'bg-transparent border-white/10'
    : 'bg-cream/95 backdrop-blur-sm border-cream-dark shadow-sm'

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-300 ${base}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">🌾</span>
          <span className={`font-semibold text-lg tracking-tight ${isHome && transparent ? 'text-cream' : 'text-bark'}`}>
            Grameen
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {[
            { to: '/#how-it-works', label: 'How it works' },
            { to: '/#brands', label: 'For brands' },
            { to: '/dashboard', label: 'Live agents' },
          ].map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-sm transition-colors ${
                isHome && transparent
                  ? 'text-cream/70 hover:text-cream'
                  : 'text-bark-light hover:text-bark'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/signup"
            className="bg-terracotta text-cream text-sm px-5 py-2 rounded-full hover:bg-bark-light transition-colors"
          >
            Apply for access
          </Link>
        </div>

        <button
          className={`md:hidden ${isHome && transparent ? 'text-cream' : 'text-bark'}`}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-cream border-t border-cream-dark px-6 py-4 flex flex-col gap-4">
          <Link to="/#how-it-works" className="text-bark-light text-sm" onClick={() => setOpen(false)}>How it works</Link>
          <Link to="/#brands" className="text-bark-light text-sm" onClick={() => setOpen(false)}>For brands</Link>
          <Link to="/dashboard" className="text-bark-light text-sm" onClick={() => setOpen(false)}>Live agents</Link>
          <Link to="/signup" className="bg-terracotta text-cream text-sm px-5 py-2 rounded-full text-center" onClick={() => setOpen(false)}>
            Apply for access
          </Link>
        </div>
      )}
    </nav>
  )
}
