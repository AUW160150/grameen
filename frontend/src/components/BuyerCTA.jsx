import { motion } from 'framer-motion'
import { ArrowRight, ShieldCheck, Truck, FileText } from 'lucide-react'

const FEATURES = [
  { icon: ShieldCheck, label: 'Vetted cooperatives', desc: 'Every supplier is verified, certified, and regularly audited.' },
  { icon: FileText, label: 'Full documentation', desc: 'HS codes, compliance docs, certificates of origin — all generated.' },
  { icon: Truck, label: 'Logistics partners', desc: 'Pre-negotiated freight rates and customs clearance support.' },
]

export default function BuyerCTA() {
  return (
    <section id="source" className="py-24 bg-cream">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-terracotta rounded-3xl p-10 md:p-16 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs font-medium text-cream/70 uppercase tracking-widest">For sourcing teams</span>
            <h2 className="text-4xl font-bold text-cream mt-3 leading-tight">
              Ready to source ethical, premium goods at scale?
            </h2>
            <p className="text-cream/80 mt-4 text-sm leading-relaxed">
              Tell us what you're looking for. Our agents will match you with cooperatives,
              generate a sourcing brief, and have samples moving within 2 weeks.
            </p>
            <div className="flex flex-col gap-3 mt-8">
              <input
                type="email"
                placeholder="Work email"
                className="bg-white/10 border border-white/20 text-cream placeholder:text-cream/40 rounded-xl px-4 py-3 text-sm outline-none focus:border-cream/50 transition-colors"
              />
              <input
                type="text"
                placeholder="What products are you looking to source?"
                className="bg-white/10 border border-white/20 text-cream placeholder:text-cream/40 rounded-xl px-4 py-3 text-sm outline-none focus:border-cream/50 transition-colors"
              />
              <button className="bg-cream text-terracotta font-semibold px-6 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-cream-dark transition-colors text-sm">
                Get matched with suppliers
                <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-5"
          >
            {FEATURES.map((f) => (
              <div key={f.label} className="flex gap-4 items-start">
                <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                  <f.icon size={17} className="text-cream" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-cream">{f.label}</p>
                  <p className="text-xs text-cream/70 mt-0.5 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}

            <div className="mt-4 bg-white/10 rounded-2xl p-5">
              <p className="text-xs text-cream/60 mb-3">Companies already sourcing</p>
              <div className="flex flex-wrap gap-2">
                {['Thrive Market', 'Grove Co.', 'The Detox Market', 'Package Free Shop', 'Whole Foods'].map(b => (
                  <span key={b} className="text-xs bg-white/10 text-cream/80 px-3 py-1 rounded-full">{b}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
