import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import VoiceWidget from './VoiceWidget'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Full-bleed background */}
      <img
        src="/grameen2.jpg"
        alt="Artisan women weaving in a rural cooperative"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Gradient overlays: dark top for text, dark bottom for widget */}
      <div className="absolute inset-0 bg-gradient-to-b from-bark/80 via-bark/30 to-bark/85" />

      {/* Content stack */}
      <div className="relative z-10 flex flex-col min-h-screen">

        {/* TOP: headline */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-6 pt-24 pb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-cream/90 text-xs font-medium px-4 py-1.5 rounded-full mb-8 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 bg-terracotta rounded-full animate-pulse" />
              GTM platform for artisan brands across South Asia, Africa & Latin America
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-cream leading-tight tracking-tight mb-6">
              From village<br />
              <span className="text-terracotta">hands</span> to<br />
              global shelves.
            </h1>

            <p className="text-cream/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-6">
              We partner with established brands like <span className="text-cream font-medium">Aarong</span> to crack the US market —
              finding buyers, automating outreach, creating content, and building the distribution channel
              they've never had access to.
            </p>

            {/* Country strip */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
              {[
                { flag: '🇧🇩', name: 'Bangladesh' },
                { flag: '🇮🇳', name: 'India' },
                { flag: '🇵🇰', name: 'Pakistan' },
                { flag: '🇱🇰', name: 'Sri Lanka' },
                { flag: '🇦🇫', name: 'Afghanistan' },
                { flag: '🇬🇹', name: 'Guatemala' },
                { flag: '🇰🇪', name: 'Kenya' },
                { flag: '🇬🇭', name: 'Ghana' },
              ].map(c => (
                <span key={c.name} className="inline-flex items-center gap-1.5 bg-white/8 border border-white/15 text-cream/70 text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                  {c.flag} {c.name}
                </span>
              ))}</div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/signup"
                className="bg-terracotta text-cream px-8 py-3.5 rounded-full font-semibold hover:bg-bark-light transition-colors text-sm"
              >
                Apply for early access
              </Link>
              <Link
                to="/dashboard"
                className="bg-white/10 border border-white/25 text-cream px-8 py-3.5 rounded-full font-medium hover:bg-white/20 transition-colors text-sm backdrop-blur-sm"
              >
                See agents live →
              </Link>
            </div>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="flex items-center gap-8 mt-14"
          >
            {[
              { value: '$340B', label: 'US ethical goods market' },
              { value: '3.2×', label: 'Avg. revenue lift' },
              { value: '60 days', label: 'Time to first US buyer' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl font-bold text-cream">{s.value}</p>
                <p className="text-xs text-cream/50 mt-0.5">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* BOTTOM: voice widget */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="px-6 pb-10 flex flex-col items-center gap-3"
        >
          <p className="text-cream/50 text-xs uppercase tracking-widest">Brand onboarding — speak in any language</p>
          <div className="w-full max-w-md">
            <VoiceWidget />
          </div>
        </motion.div>

      </div>
    </section>
  )
}
