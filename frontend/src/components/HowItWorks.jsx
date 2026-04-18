import { motion } from 'framer-motion'
import { Mic, Search, Megaphone, Video, BarChart2 } from 'lucide-react'

const STEPS = [
  {
    icon: Mic,
    title: 'Brand speaks, agents listen',
    desc: 'A brand manager records their story in any language. The agent builds a US market GTM brief — products, positioning, target segment.',
  },
  {
    icon: Search,
    title: 'Apify finds US buyers',
    desc: 'Agents scrape US ethical retailers, specialty stores, Amazon Premium, and LinkedIn procurement managers that match the brand\'s ICP.',
  },
  {
    icon: Megaphone,
    title: 'Outreach campaigns ship',
    desc: 'Personalized pitch emails, buyer decks, and sample requests drafted and sent — all while the brand team sleeps.',
  },
  {
    icon: Video,
    title: 'Social content & reels created',
    desc: 'Agents generate US-optimized Instagram reels, TikTok scripts, and product content from existing brand imagery — zero production cost.',
  },
  {
    icon: BarChart2,
    title: 'Pipeline tracked, results reported',
    desc: 'Live dashboard shows buyer responses, open rates, conversion funnel, and which channels are driving US traction.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-cream-dark">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-xs font-medium text-terracotta uppercase tracking-widest">The process</span>
          <h2 className="text-4xl font-bold text-bark mt-3 max-w-lg">
            Your brand, done selling itself. We handle the rest.
          </h2>
          <p className="text-bark-light mt-4 max-w-xl text-sm leading-relaxed">
            Brands like Aarong already have the quality. The problem is nobody in the US knows they exist.
            Grameen fixes that — fully automated, zero agency markup.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-8 left-8 right-8 h-px bg-gradient-to-r from-transparent via-terracotta/30 to-transparent" />

          <div className="grid md:grid-cols-5 gap-6">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-cream rounded-2xl p-5 flex flex-col gap-3 relative"
              >
                <div className="absolute top-4 right-4 text-3xl font-bold text-cream-dark select-none">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="w-10 h-10 bg-terracotta/10 rounded-xl flex items-center justify-center">
                  <step.icon size={18} className="text-terracotta" />
                </div>
                <p className="font-semibold text-bark text-sm leading-tight">{step.title}</p>
                <p className="text-xs text-bark-light leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
