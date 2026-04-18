import { motion } from 'framer-motion'

const STATS = [
  { value: '$340B', label: 'US ethical goods market', sub: 'growing 12% YoY' },
  { value: '94%', label: 'Brands lack US distributor', sub: 'of South Asian premium brands' },
  { value: '60 days', label: 'Average time to first buyer', sub: 'with Grameen GTM' },
  { value: '$0', label: 'Agency retainer', sub: 'pure performance model' },
]

export default function Impact() {
  return (
    <section id="impact" className="py-24 bg-sage-dark">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-medium text-cream/50 uppercase tracking-widest">The opportunity</span>
          <h2 className="text-4xl font-bold text-cream mt-3">The market is massive. The gap is fixable.</h2>
          <p className="text-cream/60 mt-4 max-w-lg mx-auto text-sm leading-relaxed">
            American consumers spend $340 billion annually on ethical, artisan, and premium goods.
            Brands like Aarong and Fab India are missing almost all of it.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <p className="text-4xl font-bold text-cream">{s.value}</p>
              <p className="text-sm font-medium text-cream/80 mt-1">{s.label}</p>
              <p className="text-xs text-cream/40 mt-0.5">{s.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Photo with overlay */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden shadow-xl"
        >
          <img
            src="/grameen1.jpg"
            alt="Bangladeshi cooperative members"
            className="w-full h-72 object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-bark/80 via-bark/40 to-transparent" />
          <div className="absolute inset-0 flex items-center px-10">
            <div className="max-w-sm">
              <p className="text-cream text-xl font-bold leading-snug mb-2">
                Behind every brand is a cooperative.
              </p>
              <p className="text-cream/70 text-sm leading-relaxed">
                Aarong alone supports 65,000 artisans across Bangladesh. When the brand grows,
                the entire supply chain wins — directly.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
