import { motion } from 'framer-motion'
import { MapPin, ArrowRight } from 'lucide-react'

const FEATURED = {
  name: 'Aarong',
  origin: 'Dhaka, Bangladesh',
  founded: '1978',
  categories: ['Handloom textiles', 'Organic food', 'Handicrafts'],
  description: 'Bangladesh\'s most iconic lifestyle brand, built on rural artisan cooperatives. 65,000+ artisans. Premium handloom sarees, jamdani weaves, and certified organic goods — ready for US specialty retail.',
  usPotential: 'Anthropologie · World Market · Whole Foods',
  image: '/image2.jpg',
  fallbackImage: '/grameen-apparel.jpg',
}

const BRANDS = [
  {
    name: 'Fab India',
    origin: 'New Delhi, India',
    flag: '🇮🇳',
    founded: '1960',
    categories: ['Block-print apparel', 'Organic food', 'Home textiles'],
    description: 'India\'s largest retail chain for handcrafted goods. 55,000+ artisans, established export infrastructure.',
    usPotential: 'Whole Foods + boutique retail',
  },
  {
    name: 'Khaadi',
    origin: 'Karachi, Pakistan',
    flag: '🇵🇰',
    founded: '1998',
    categories: ['Hand-woven fabrics', 'Ready-to-wear'],
    description: 'Pakistan\'s premium handloom fashion brand. Strong US diaspora demand already present.',
    usPotential: 'DTC + South Asian diaspora',
  },
  {
    name: 'Dilmah Tea',
    origin: 'Colombo, Sri Lanka',
    flag: '🇱🇰',
    founded: '1988',
    categories: ['Premium Ceylon tea', 'Organic wellness'],
    description: 'Sri Lanka\'s most celebrated single-origin tea brand. Estate-picked, ethically traded, beloved by specialty importers.',
    usPotential: 'Whole Foods + specialty tea retail',
  },
  {
    name: 'Mayaworks',
    origin: 'Guatemala City, Guatemala',
    flag: '🇬🇹',
    founded: '1997',
    categories: ['Hand-woven textiles', 'Fair trade goods'],
    description: 'Maya women artisans weaving traditional huipil. Fair Trade certified, UNESCO-recognized craft tradition, 300+ weavers.',
    usPotential: 'Ten Thousand Villages + DTC',
  },
  {
    name: 'Afghan Hands',
    origin: 'Kabul, Afghanistan',
    flag: '🇦🇫',
    founded: '2003',
    categories: ['Hand-knotted carpets', 'Lapis lazuli crafts'],
    description: 'Afghanistan\'s finest hand-knotted wool carpets and lapis lazuli jewelry. Each piece takes 6–18 months and tells a generational story.',
    usPotential: 'Design trade + luxury retail',
  },
  {
    name: 'Bindi Designs',
    origin: 'Tamil Nadu, India',
    flag: '🇮🇳',
    founded: '2008',
    categories: ['Natural dyes', 'Sustainable fashion'],
    description: 'Kantha-stitch and natural dye textiles by women artisans. Certified organic, GI-tagged, export-ready.',
    usPotential: 'Anthropologie + ethical fashion',
  },
]

export default function BrandPartners() {
  return (
    <section id="brands" className="py-24 bg-cream">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="text-xs font-medium text-terracotta uppercase tracking-widest">Target brands</span>
          <h2 className="text-4xl font-bold text-bark mt-3">Brands that are ready. Markets that don't know yet.</h2>
          <p className="text-bark-light mt-4 max-w-xl text-sm leading-relaxed">
            From Bangladesh to Guatemala, these brands already have world-class products and artisan supply chains.
            They just need the US GTM layer.
          </p>
        </motion.div>

        {/* Featured Aarong card — full width, image left */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-terracotta/30 bg-terracotta/5 overflow-hidden mb-6 flex flex-col md:flex-row hover:shadow-lg transition-shadow"
        >
          <div className="md:w-80 shrink-0 relative" style={{ minHeight: 220 }}>
            <img
              src={FEATURED.image}
              alt={FEATURED.name}
              className="absolute inset-0 w-full h-full object-cover object-top"
              onError={e => { e.target.src = FEATURED.fallbackImage }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-terracotta/10" />
            <div className="absolute bottom-3 left-4">
              <span className="text-cream font-bold text-xl drop-shadow">{FEATURED.name}</span>
              <span className="ml-2 text-xs bg-terracotta text-cream px-2 py-0.5 rounded-full">🇧🇩 Featured partner</span>
            </div>
          </div>
          <div className="p-6 flex flex-col gap-3 flex-1">
            <div className="flex items-center gap-1">
              <MapPin size={11} className="text-bark-light" />
              <p className="text-xs text-bark-light">{FEATURED.origin} · Est. {FEATURED.founded}</p>
            </div>
            <p className="text-sm text-bark-light leading-relaxed">{FEATURED.description}</p>
            <div className="flex flex-wrap gap-1">
              {FEATURED.categories.map(c => (
                <span key={c} className="text-xs bg-sage/10 text-sage-dark px-2 py-0.5 rounded-full">{c}</span>
              ))}
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-terracotta/15 mt-auto">
              <div>
                <p className="text-xs text-bark-light">US entry strategy</p>
                <p className="text-xs font-medium text-bark">{FEATURED.usPotential}</p>
              </div>
              <button className="flex items-center gap-1 text-xs text-terracotta font-medium hover:gap-2 transition-all">
                View GTM plan <ArrowRight size={12} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Secondary brand grid */}
        <div className="grid md:grid-cols-3 gap-5">
          {BRANDS.map((brand, i) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="rounded-2xl border border-cream-dark bg-white p-5 flex flex-col gap-3 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{brand.flag}</span>
                <div>
                  <p className="font-bold text-bark text-sm">{brand.name}</p>
                  <p className="text-xs text-bark-light flex items-center gap-1">
                    <MapPin size={9} /> {brand.origin} · Est. {brand.founded}
                  </p>
                </div>
              </div>

              <p className="text-xs text-bark-light leading-relaxed">{brand.description}</p>

              <div className="flex flex-wrap gap-1">
                {brand.categories.map(c => (
                  <span key={c} className="text-xs bg-sage/10 text-sage-dark px-2 py-0.5 rounded-full">{c}</span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-cream-dark mt-auto">
                <div>
                  <p className="text-xs text-bark-light">US channel</p>
                  <p className="text-xs font-medium text-bark">{brand.usPotential}</p>
                </div>
                <button className="flex items-center gap-1 text-xs text-terracotta font-medium hover:gap-2 transition-all">
                  GTM plan <ArrowRight size={11} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
