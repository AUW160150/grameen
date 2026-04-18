import { motion } from 'framer-motion'
import { Bot, Search, Mail, BarChart2, CheckCircle, Clock } from 'lucide-react'

const AGENTS = [
  {
    icon: Search,
    name: 'Market Scout',
    status: 'active',
    task: 'Scanning 2,400 US natural food buyers for coconut oil ICP match…',
    result: '38 high-fit leads identified',
    color: 'text-blue-500',
    bg: 'bg-blue-50',
  },
  {
    icon: Mail,
    name: 'Outreach Agent',
    status: 'active',
    task: 'Drafting personalized pitch for Thrive Market sourcing team…',
    result: '12 emails sent this week',
    color: 'text-terracotta',
    bg: 'bg-orange-50',
  },
  {
    icon: BarChart2,
    name: 'Price Benchmarker',
    status: 'done',
    task: 'Compared 140 Etsy/Amazon listings for jute tote pricing',
    result: 'Suggested $14.50 export price (+22% vs current)',
    color: 'text-sage',
    bg: 'bg-green-50',
  },
  {
    icon: Bot,
    name: 'Export Doc Agent',
    status: 'done',
    task: 'Generated HS code, USDA import requirements for moringa powder',
    result: 'Export brief ready for download',
    color: 'text-purple-500',
    bg: 'bg-purple-50',
  },
]

export default function AgentDashboard() {
  return (
    <section className="py-24 bg-bark">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-xs font-medium text-terracotta uppercase tracking-widest">GTM engine</span>
          <h2 className="text-4xl font-bold text-cream mt-3">Agents working while artisans weave.</h2>
          <p className="text-cream/60 mt-4 max-w-xl mx-auto text-sm leading-relaxed">
            Powered by Apify's web intelligence layer, our agents continuously find buyers,
            benchmark prices, and ship campaigns — fully autonomous.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4">
          {AGENTS.map((agent, i) => (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 flex gap-4"
            >
              <div className={`w-10 h-10 ${agent.bg} rounded-xl flex items-center justify-center shrink-0`}>
                <agent.icon size={18} className={agent.color} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-semibold text-cream">{agent.name}</p>
                  {agent.status === 'active' ? (
                    <span className="flex items-center gap-1 text-xs text-emerald-400">
                      <Clock size={10} />
                      Running
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs text-cream/40">
                      <CheckCircle size={10} />
                      Done
                    </span>
                  )}
                </div>
                <p className="text-xs text-cream/50 leading-relaxed mb-2">{agent.task}</p>
                <div className="bg-white/5 rounded-lg px-3 py-2">
                  <p className="text-xs text-cream/80 font-medium">{agent.result}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <p className="text-cream/40 text-xs mb-4">Powered by</p>
          <div className="flex items-center justify-center gap-6">
            <span className="text-cream/60 text-sm font-medium">Apify</span>
            <span className="text-cream/20">·</span>
            <span className="text-cream/60 text-sm font-medium">OpenAI Whisper</span>
            <span className="text-cream/20">·</span>
            <span className="text-cream/60 text-sm font-medium">GPT-4o</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
