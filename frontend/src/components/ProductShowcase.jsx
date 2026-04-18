import { motion } from 'framer-motion'
import { MapPin, Star } from 'lucide-react'

const PRODUCTS = [
  {
    name: 'Virgin Coconut Oil — Cold Pressed',
    origin: 'Khulna, Bangladesh',
    cooperative: 'Sundarbans Women\'s Cooperative',
    price: '$18–24',
    unit: '500ml',
    rating: 4.9,
    reviews: 142,
    tags: ['Organic', 'USDA eligible', 'Traceable'],
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&q=80',
    color: 'from-amber-50 to-orange-50',
  },
  {
    name: 'Natural Jute Tote — Woven',
    origin: 'Rajshahi, Bangladesh',
    cooperative: 'Bengal Artisan Collective',
    price: '$12–16',
    unit: 'per piece',
    rating: 4.8,
    reviews: 89,
    tags: ['Biodegradable', 'Bulk available', 'Custom print'],
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80',
    color: 'from-yellow-50 to-amber-50',
  },
  {
    name: 'Handloom Cotton Throws',
    origin: 'Kutch, Gujarat, India',
    cooperative: 'Kutch Weavers Guild',
    price: '$34–48',
    unit: 'per throw',
    rating: 4.9,
    reviews: 211,
    tags: ['Handloom certified', 'Azo-free dyes', 'GI tagged'],
    image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=600&q=80',
    color: 'from-red-50 to-rose-50',
  },
  {
    name: 'Raw Shea Butter — Unrefined',
    origin: 'Tamale, Ghana',
    cooperative: 'Northern Ghana Women\'s Union',
    price: '$22–30',
    unit: '1kg',
    rating: 4.7,
    reviews: 67,
    tags: ['Wild-harvested', 'Fair trade', 'Cosmetic grade'],
    image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&q=80',
    color: 'from-stone-50 to-yellow-50',
  },
  {
    name: 'Moringa Leaf Powder',
    origin: 'Anantapur, Andhra Pradesh',
    cooperative: 'Deccan Tribal Farms',
    price: '$14–20',
    unit: '250g',
    rating: 4.8,
    reviews: 178,
    tags: ['Organic certified', 'FSSAI', 'US FDA compliant'],
    image: 'https://images.unsplash.com/photo-1515023115689-589c33041d3c?w=600&q=80',
    color: 'from-green-50 to-emerald-50',
  },
  {
    name: 'Brass Dhokra Figurines',
    origin: 'Bastar, Chhattisgarh',
    cooperative: 'Bastar Tribal Artisans',
    price: '$28–65',
    unit: 'per piece',
    rating: 5.0,
    reviews: 43,
    tags: ['Lost-wax casting', 'Museum quality', 'GI tagged'],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    color: 'from-amber-50 to-yellow-50',
  },
]

export default function ProductShowcase() {
  return (
    <section id="products" className="py-24 bg-cream">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="text-xs font-medium text-terracotta uppercase tracking-widest">The marketplace</span>
          <h2 className="text-4xl font-bold text-bark mt-3">Premium. Traceable. Export-ready.</h2>
          <p className="text-bark-light mt-4 max-w-xl text-sm leading-relaxed">
            Every product is verified, benchmarked, and ready for US retail. Cooperatives
            are vetted. Pricing is data-driven. Provenance is documented.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {PRODUCTS.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="bg-white rounded-2xl overflow-hidden border border-cream-dark hover:shadow-lg transition-shadow group cursor-pointer"
            >
              <div className="relative h-52 overflow-hidden bg-cream-dark">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.parentElement.classList.add(`bg-gradient-to-br`, ...p.color.split(' '))
                  }}
                />
                <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                  {p.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="text-xs bg-white/90 text-bark-light px-2 py-0.5 rounded-full backdrop-blur-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-5 flex flex-col gap-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-bark text-sm leading-tight">{p.name}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <MapPin size={11} className="text-bark-light" />
                      <p className="text-xs text-bark-light">{p.origin}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-semibold text-terracotta">{p.price}</p>
                    <p className="text-xs text-bark-light">{p.unit}</p>
                  </div>
                </div>

                <p className="text-xs text-sage-dark font-medium">{p.cooperative}</p>

                <div className="flex items-center gap-1 pt-1">
                  <Star size={12} className="text-amber-400 fill-amber-400" />
                  <span className="text-xs font-medium text-bark">{p.rating}</span>
                  <span className="text-xs text-bark-light">({p.reviews} orders)</span>
                </div>

                <button className="mt-2 w-full border border-terracotta/30 text-terracotta text-xs py-2 rounded-full hover:bg-terracotta hover:text-cream transition-colors font-medium">
                  Request samples →
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <button className="border border-bark-light/30 text-bark px-8 py-3 rounded-full text-sm hover:border-bark transition-colors">
            Browse all 340+ products
          </button>
        </motion.div>
      </div>
    </section>
  )
}
