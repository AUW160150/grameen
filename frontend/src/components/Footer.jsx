export default function Footer() {
  return (
    <footer className="bg-bark py-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <span className="text-xl">🌾</span>
          <span className="text-cream font-semibold tracking-tight">Grameen</span>
        </div>
        <p className="text-cream/30 text-xs text-center">
          Connecting village crafts to global markets. Built with care for artisans, cooperatives, and the planet.
        </p>
        <div className="flex gap-6">
          <a href="#" className="text-cream/40 text-xs hover:text-cream/70 transition-colors">Privacy</a>
          <a href="#" className="text-cream/40 text-xs hover:text-cream/70 transition-colors">Contact</a>
          <a href="#" className="text-cream/40 text-xs hover:text-cream/70 transition-colors">For NGOs</a>
        </div>
      </div>
    </footer>
  )
}
