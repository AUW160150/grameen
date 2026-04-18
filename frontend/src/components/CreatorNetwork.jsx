import { motion } from 'framer-motion'
import { Play, Share2, DollarSign, TrendingUp, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const CREATORS = [
  {
    handle: '@tasnim.weaves',
    location: 'Dhaka, Bangladesh',
    followers: '124K',
    niche: 'Handloom & traditional fashion',
    earned: '$1,840',
    reels: 12,
    // Reel thumbnail — warm editorial style
    bg: 'from-amber-100 to-orange-100',
    accent: '#C4713A',
    product: 'Aarong jamdani saree',
    views: '2.1M',
  },
  {
    handle: '@nadia.organics',
    location: 'Chittagong, Bangladesh',
    followers: '87K',
    niche: 'Organic food & sustainable living',
    earned: '$960',
    reels: 8,
    bg: 'from-green-50 to-emerald-100',
    accent: '#5A7A5E',
    product: 'Cold-pressed coconut oil',
    views: '890K',
  },
  {
    handle: '@riya.crafts',
    location: 'Rajshahi, Bangladesh',
    followers: '203K',
    niche: 'Artisan lifestyle & heritage',
    earned: '$3,200',
    reels: 21,
    bg: 'from-rose-50 to-pink-100',
    accent: '#9D4E6F',
    product: 'Kantha quilt & jute collection',
    views: '5.4M',
  },
]

const REEL_STEPS = [
  { step: '01', title: 'Brand sends sample', desc: 'Aarong ships the product directly to the creator in Bangladesh.' },
  { step: '02', title: 'Creator shoots reel', desc: 'Authentic, unscripted — creator wears or uses the product in their natural setting.' },
  { step: '03', title: 'Grameen amplifies', desc: 'Agent reposts, schedules, and optimises the reel for US audience timing and hashtags.' },
  { step: '04', title: 'Creator earns', desc: '8–15% affiliate commission on every US sale traced to their content.' },
]

export default function CreatorNetwork() {
  return (
    <section className="py-24 bg-cream">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <span className="text-xs font-medium text-terracotta uppercase tracking-widest">Creator network</span>
          <h2 className="text-4xl font-bold text-bark mt-3 max-w-xl">
            Real creators. Real products.<br />Real affiliate revenue.
          </h2>
          <p className="text-bark-light mt-4 max-w-xl text-sm leading-relaxed">
            South Asian content creators wear and use these products authentically —
            then their reels reach US audiences organically. No studio. No ad spend.
            Creators earn affiliate commission on every sale their content drives.
          </p>
        </motion.div>

        {/* Featured reel embed-style card + creator cards */}
        <div className="grid md:grid-cols-2 gap-10 items-start mb-16">

          {/* Left — featured reel mockup (links to real reel) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xs font-medium text-bark-light uppercase tracking-widest mb-3">Featured reel</p>
            <a
              href="https://www.instagram.com/p/DWaCCAdjz6Q/"
              target="_blank"
              rel="noopener noreferrer"
              className="block relative rounded-2xl overflow-hidden shadow-xl group cursor-pointer"
            >
              {/* Reel frame using the apparel image */}
              <div className="relative" style={{ aspectRatio: '9/16', maxHeight: 480 }}>
                <img
                  src="/image2.jpg"
                  alt="Creator wearing Aarong handloom saree"
                  className="w-full h-full object-cover object-top"
                  onError={e => e.target.src = '/grameen-apparel.jpg'}
                />
                {/* Dark cinematic overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-bark/80 via-transparent to-bark/20" />

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform">
                    <Play size={22} className="text-cream fill-cream ml-1" />
                  </div>
                </div>

                {/* Instagram badge top-right */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5">
                  <Share2 size={13} className="text-cream" />
                  <span className="text-cream text-xs font-medium">Instagram Reel</span>
                </div>

                {/* Bottom info */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-cream/60 text-xs mb-1">@tasnim.weaves · Dhaka, Bangladesh</p>
                  <p className="text-cream font-semibold text-sm">Aarong handloom saree — authentic origin story</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-cream/70 text-xs">2.1M views</span>
                    <span className="text-cream/70 text-xs">124K followers</span>
                    <span className="text-terracotta text-xs font-semibold">$1,840 earned</span>
                  </div>
                </div>
              </div>
            </a>
            <p className="text-xs text-bark-light text-center mt-3">
              ↗ Click to view on Instagram
            </p>
          </motion.div>

          {/* Right — how it works steps */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-5 pt-8"
          >
            <div className="bg-terracotta/5 border border-terracotta/15 rounded-2xl p-5 mb-2">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign size={15} className="text-terracotta" />
                <span className="text-sm font-semibold text-bark">Affiliate model</span>
              </div>
              <p className="text-xs text-bark-light leading-relaxed">
                Creators earn <span className="font-semibold text-terracotta">8–15% commission</span> on every US sale
                their reel drives. Grameen handles tracking, attribution, and monthly payouts — all automated.
              </p>
            </div>

            {REEL_STEPS.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4 items-start"
              >
                <div className="w-8 h-8 bg-bark rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-cream">{s.step}</span>
                </div>
                <div>
                  <p className="font-semibold text-bark text-sm">{s.title}</p>
                  <p className="text-xs text-bark-light mt-0.5 leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}

            <Link
              to="/signup"
              className="mt-2 flex items-center gap-2 text-sm font-medium text-terracotta hover:gap-3 transition-all"
            >
              Apply as a creator <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>

        {/* Creator cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {CREATORS.map((c, i) => (
            <motion.div
              key={c.handle}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`bg-gradient-to-br ${c.bg} rounded-2xl p-5 border border-white/60`}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-semibold text-bark text-sm">{c.handle}</p>
                  <p className="text-xs text-bark-light">{c.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold" style={{ color: c.accent }}>{c.followers}</p>
                  <p className="text-xs text-bark-light">followers</p>
                </div>
              </div>

              {/* Product */}
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 mb-3">
                <p className="text-xs text-bark-light">Promoting</p>
                <p className="text-sm font-medium text-bark">{c.product}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-sm font-bold text-bark">{c.views}</p>
                  <p className="text-xs text-bark-light">views</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-bark">{c.reels}</p>
                  <p className="text-xs text-bark-light">reels</p>
                </div>
                <div>
                  <p className="text-sm font-bold" style={{ color: c.accent }}>{c.earned}</p>
                  <p className="text-xs text-bark-light">earned</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 bg-bark rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={16} className="text-terracotta" />
              <span className="text-cream text-sm font-semibold">For content creators in Bangladesh, India & Africa</span>
            </div>
            <p className="text-cream/60 text-sm">
              Wear the products. Post the reel. Earn commission from US sales — while staying home.
            </p>
          </div>
          <Link
            to="/signup"
            className="shrink-0 bg-terracotta text-cream px-7 py-3 rounded-full text-sm font-semibold hover:bg-bark-light transition-colors"
          >
            Join as a creator
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
