import { motion } from 'framer-motion'
import { MapPin, ArrowRight } from 'lucide-react'

const BRANDS = [
  {
    name: 'Aarong',
    origin: 'Dhaka, Bangladesh',
    founded: '1978',
    categories: ['Handloom textiles', 'Organic food', 'Handicrafts'],
    description: 'Bangladesh\'s most iconic lifestyle brand, built on rural artisan cooperatives. Premium handloom sarees, jamdani weaves, and organic goods.',
    usPotential: 'Specialty retail + DTC',
    image: '/image2.jpg',
    fallbackImage: '/grameen-apparel.jpg',
    highlight: true,
  },
  {
    name: 'Fab India',
    origin: 'New Delhi, India',
    founded: '1960',
    categories: ['Block-print apparel', 'Organic food', 'Home textiles'],
    description: 'India\'s largest retail chain for handcrafted goods. 55,000+ artisans. Established quality standards and export infrastructure.',
    usPotential: 'Whole Foods + boutique retail',
  },
  {
    name: 'Khaadi',
    origin: 'Karachi, Pakistan',
    founded: '1998',
    categories: ['Hand-woven fabrics', 'Ready-to-wear'],
    description: 'Pakistan\'s premium handloom fashion brand. Unique aesthetic with strong US diaspora demand already present.',
    usPotential: 'DTC + South Asian diaspora',
  },
  {
    name: 'Bindi Designs',
    origin: 'Tamil Nadu, India',
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
            These brands already have global distribution infrastructure, quality certifications, and
            artisan supply chains. They just need the US GTM layer.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {BRANDS.map((brand, i) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`rounded-2xl border overflow-hidden hover:shadow-lg transition-shadow ${
                brand.highlight ? 'border-terracotta/30 bg-terracotta/5' : 'border-cream-dark bg-white'
              }`}
            >
              {brand.image && (
                <div className={`relative overflow-hidden ${brand.highlight ? 'h-56' : 'h-36'}`}>
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="w-full h-full object-cover object-top"
                    onError={e => { if (brand.fallbackImage) e.target.src = brand.fallbackImage }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bark/70 to-transparent" />
                  <div className="absolute bottom-3 left-4">
                    <span className="text-cream font-bold text-lg">{brand.name}</span>
                    {brand.highlight && (
                      <span className="ml-2 text-xs bg-terracotta text-cream px-2 py-0.5 rounded-full">Featured partner</span>
                    )}
                  </div>
                </div>
              )}

              <div className="p-5 flex flex-col gap-3">
                {!brand.image && (
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-bark text-base">{brand.name}</p>
                    {brand.highlight && (
                      <span className="text-xs bg-terracotta text-cream px-2 py-0.5 rounded-full">Featured</span>
                    )}
                  </div>
                )}

                <div className="flex items-center gap-1">
                  <MapPin size={11} className="text-bark-light" />
                  <p className="text-xs text-bark-light">{brand.origin} · Est. {brand.founded}</p>
                </div>

                <p className="text-sm text-bark-light leading-relaxed">{brand.description}</p>

                <div className="flex flex-wrap gap-1">
                  {brand.categories.map(c => (
                    <span key={c} className="text-xs bg-sage/10 text-sage-dark px-2 py-0.5 rounded-full">{c}</span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-cream-dark">
                  <div>
                    <p className="text-xs text-bark-light">US entry strategy</p>
                    <p className="text-xs font-medium text-bark">{brand.usPotential}</p>
                  </div>
                  <button className="flex items-center gap-1 text-xs text-terracotta font-medium hover:gap-2 transition-all">
                    View GTM plan <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
