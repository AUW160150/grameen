import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle } from 'lucide-react'

export default function SignupSection() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ email: '', brand: '', country: '', category: '' })

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="signup" className="py-24 bg-cream">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs font-medium text-terracotta uppercase tracking-widest">Early access</span>
            <h2 className="text-4xl font-bold text-bark mt-3 leading-tight">
              Ready to bring your brand to the US?
            </h2>
            <p className="text-bark-light mt-4 text-sm leading-relaxed">
              We're onboarding 10 brand partners in our first cohort. Each brand gets a dedicated
              GTM agent setup, 90-day US buyer pipeline, and full social content calendar.
            </p>

            <ul className="flex flex-col gap-3 mt-8">
              {[
                'Dedicated Apify buyer intelligence run for your category',
                '90-day outreach campaign to US retailers & DTC channels',
                'Reel + social content creation for US audiences',
                'Live dashboard — see exactly what your agents are doing',
              ].map(item => (
                <li key={item} className="flex items-start gap-3 text-sm text-bark-light">
                  <CheckCircle size={16} className="text-sage mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {submitted ? (
              <div className="bg-sage/10 border border-sage/20 rounded-2xl p-10 text-center flex flex-col gap-4">
                <CheckCircle size={40} className="text-sage mx-auto" />
                <p className="text-xl font-bold text-bark">You're on the list</p>
                <p className="text-bark-light text-sm">We'll reach out within 48 hours to set up your brand's GTM brief.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white border border-cream-dark rounded-2xl p-8 flex flex-col gap-4 shadow-sm">
                <p className="font-semibold text-bark text-base">Apply for early access</p>

                <input
                  required
                  type="email"
                  placeholder="Work email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="border border-cream-dark rounded-xl px-4 py-3 text-sm text-bark placeholder:text-bark-light/50 outline-none focus:border-terracotta/40 transition-colors"
                />
                <input
                  required
                  type="text"
                  placeholder="Brand name (e.g. Aarong, Fab India)"
                  value={form.brand}
                  onChange={e => setForm({ ...form, brand: e.target.value })}
                  className="border border-cream-dark rounded-xl px-4 py-3 text-sm text-bark placeholder:text-bark-light/50 outline-none focus:border-terracotta/40 transition-colors"
                />
                <input
                  type="text"
                  placeholder="Country of origin"
                  value={form.country}
                  onChange={e => setForm({ ...form, country: e.target.value })}
                  className="border border-cream-dark rounded-xl px-4 py-3 text-sm text-bark placeholder:text-bark-light/50 outline-none focus:border-terracotta/40 transition-colors"
                />
                <select
                  value={form.category}
                  onChange={e => setForm({ ...form, category: e.target.value })}
                  className="border border-cream-dark rounded-xl px-4 py-3 text-sm text-bark outline-none focus:border-terracotta/40 transition-colors bg-white"
                >
                  <option value="">Product category</option>
                  <option>Handloom textiles & apparel</option>
                  <option>Organic food & agriculture</option>
                  <option>Handicrafts & home goods</option>
                  <option>Beauty & wellness</option>
                  <option>Other</option>
                </select>

                <button
                  type="submit"
                  className="bg-terracotta text-cream px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-bark-light transition-colors text-sm mt-1"
                >
                  Apply for early access
                  <ArrowRight size={16} />
                </button>

                <p className="text-xs text-bark-light text-center">
                  No commitment. We'll reach out within 48 hours.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
