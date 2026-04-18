import { motion } from 'framer-motion'
import { Search, Video, Share2, Mail, TrendingUp, Zap } from 'lucide-react'

const FEATURES = [
  {
    icon: Search,
    title: 'Apify Buyer Intelligence',
    tag: 'Powered by Apify',
    desc: 'Scrapes US ethical retailers, Amazon Premium sellers, LinkedIn procurement managers, and specialty store buyers that match your product ICP. Updated daily.',
    metrics: ['2,400+ US buyers scanned', 'ICP match scoring', 'Contact enrichment'],
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
  },
  {
    icon: Mail,
    title: 'Automated US Outreach',
    tag: 'Agent-driven',
    desc: 'AI drafts personalized pitch emails, buyer decks, and sample request letters tailored to each retailer\'s buying profile. Sent autonomously on a schedule.',
    metrics: ['Personalized per buyer', 'Follow-up sequences', 'Response tracking'],
    color: 'text-terracotta',
    bg: 'bg-orange-50',
    border: 'border-orange-100',
  },
  {
    icon: Video,
    title: 'Reel & Content Generator',
    tag: 'Social automation',
    desc: 'Upload brand photos — agents create Instagram Reels, TikTok scripts, and product showcase videos optimized for US audience engagement. No production team needed.',
    metrics: ['IG Reels + TikTok', 'US-tuned copywriting', 'Batch creation'],
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-100',
  },
  {
    icon: Share2,
    title: 'Organic Social Automation',
    tag: 'Grow without ads',
    desc: 'Agents manage posting schedules, hashtag research, comment engagement, and influencer outreach on Instagram and TikTok — building US brand awareness organically.',
    metrics: ['Auto-scheduling', 'Hashtag intelligence', 'Influencer matching'],
    color: 'text-pink-600',
    bg: 'bg-pink-50',
    border: 'border-pink-100',
  },
  {
    icon: TrendingUp,
    title: 'US Market Pricing Intelligence',
    tag: 'Powered by Apify',
    desc: 'Continuously scrapes competitor pricing on Etsy, Amazon, Whole Foods, and specialty retailers to benchmark your products for optimal US market positioning.',
    metrics: ['Real-time benchmarks', 'Margin optimization', 'Category insights'],
    color: 'text-sage',
    bg: 'bg-green-50',
    border: 'border-green-100',
  },
  {
    icon: Zap,
    title: 'Live GTM Dashboard',
    tag: 'Full visibility',
    desc: 'Watch every agent run in real-time. Buyer pipeline, outreach open rates, social analytics, and revenue attribution — all in one view built for brand founders.',
    metrics: ['Real-time agent logs', 'Revenue attribution', 'Buyer pipeline CRM'],
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
  },
]

export default function Features() {
  return (
    <section className="py-24 bg-cream-dark">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-xs font-medium text-terracotta uppercase tracking-widest">What we do</span>
          <h2 className="text-4xl font-bold text-bark mt-3">A full GTM stack. Zero agency overhead.</h2>
          <p className="text-bark-light mt-4 max-w-xl mx-auto text-sm leading-relaxed">
            Six autonomous agents working 24/7 to get your brand in front of the right US buyers —
            from first discovery to signed purchase order.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`bg-white rounded-2xl p-6 border ${f.border} flex flex-col gap-4 hover:shadow-md transition-shadow`}
            >
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 ${f.bg} rounded-xl flex items-center justify-center`}>
                  <f.icon size={18} className={f.color} />
                </div>
                <span className={`text-xs font-medium ${f.bg} ${f.color} px-2.5 py-1 rounded-full border ${f.border}`}>
                  {f.tag}
                </span>
              </div>

              <div>
                <p className="font-semibold text-bark text-sm mb-1">{f.title}</p>
                <p className="text-xs text-bark-light leading-relaxed">{f.desc}</p>
              </div>

              <ul className="flex flex-col gap-1 mt-auto">
                {f.metrics.map(m => (
                  <li key={m} className="flex items-center gap-2 text-xs text-bark-light">
                    <span className={`w-1 h-1 rounded-full ${f.bg.replace('bg-', 'bg-').replace('-50', '-400')} shrink-0`} style={{ background: 'currentColor' }} />
                    {m}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
