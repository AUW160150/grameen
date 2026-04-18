import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft, CheckCircle, Mail, Video, TrendingUp,
  ExternalLink, Download, RefreshCw, Star, Calendar,
  DollarSign, Users, Eye
} from 'lucide-react'
import Nav from '../components/Nav'

/* ── mock result data (replace with real API data in prod) ── */
const RESULT = {
  brand: 'Aarong',
  category: 'Handloom textiles & apparel',
  runDate: 'April 18, 2026',
  duration: '4m 38s',

  summary: {
    buyersScanned: 2400,
    leadsFound: 62,
    emailsSent: 24,
    reelsCreated: 6,
    estimatedReach: '~120K',
    projectedARR: '$340K',
  },

  topLeads: [
    { company: 'Anthropologie (URBN Group)', title: 'VP Global Sourcing', email: 's.chen@anthropologie.com', score: 0.94, status: 'opened', note: 'Email opened · link clicked' },
    { company: 'World Market (Cost Plus)', title: 'Ethical Goods Director', email: 'm.webb@worldmarket.com', score: 0.91, status: 'replied', note: 'Positive reply received ✓' },
    { company: 'Whole Foods Market', title: 'Global Category Buyer', email: 'p.nair@wholefoods.com', score: 0.88, status: 'forwarded', note: 'Forwarded to category buyer' },
    { company: 'Ten Thousand Villages', title: 'Fair Trade Director', email: 't.kiely@tenv.org', score: 0.87, status: 'sent', note: 'Awaiting response' },
    { company: 'Grove Collaborative', title: 'Sustainable Goods Lead', email: 'r.jones@grove.co', score: 0.85, status: 'sent', note: 'Awaiting response' },
  ],

  emails: [
    {
      to: 'Sarah Chen — Anthropologie',
      subject: 'Aarong handloom textiles — premium sourcing opportunity',
      preview: 'Hi Sarah, I wanted to share something I think would resonate with Anthropologie\'s commitment to artisan craft...',
      openRate: true,
      sentAt: '9:14 AM EST',
    },
    {
      to: 'Marcus Webb — World Market',
      subject: 'Artisan jamdani weaves from Bangladesh — World Market fit',
      preview: 'Hi Marcus, Aarong has been the benchmark for handloom textiles in South Asia since 1978...',
      openRate: true,
      sentAt: '9:16 AM EST',
    },
    {
      to: 'Priya Nair — Whole Foods',
      subject: 'Certified organic wheat & moringa from Aarong cooperative network',
      preview: 'Hi Priya, I\'m reaching out on behalf of Aarong, Bangladesh\'s largest artisan brand...',
      openRate: false,
      sentAt: '9:18 AM EST',
    },
  ],

  reels: [
    {
      title: '"How Aarong\'s handloom saree is made" — Origin story',
      platform: 'Instagram Reel',
      duration: '45s',
      hook: '"This saree took 3 days and 2 weavers — it costs $12 to make and sells for $280 at Anthropologie."',
      estimatedReach: '40K–80K US users',
      hashtags: '#slowfashion #handloom #artisanmade #ethicalfashion #sustainablestyle',
      status: 'ready',
      thumbnail: '/grameen-apparel.jpg',
    },
    {
      title: '"From Dhaka to your wardrobe" — TikTok format',
      platform: 'TikTok',
      duration: '30s',
      hook: '"I found the brand that makes clothes for Anthropologie — and they\'re based in Bangladesh 🇧🇩"',
      estimatedReach: '20K–60K US users',
      hashtags: '#ethicalfashion #sustainableootd #bangladeshfashion #slowfashion',
      status: 'ready',
      thumbnail: '/grameen2.jpg',
    },
    {
      title: '"What is jamdani weaving?" — Educational carousel',
      platform: 'Instagram Reel + Carousel',
      duration: '60s',
      hook: '"UNESCO-listed. 400-year-old technique. You\'ve probably never heard of it."',
      estimatedReach: '30K–90K US users',
      hashtags: '#jamdani #heritageweaving #artisancraft #UNESCO #slowtextiles',
      status: 'ready',
      thumbnail: '/grameen1.jpg',
    },
  ],

  contentCalendar: [
    { day: 'Mon Apr 21', platform: 'Instagram', type: 'Reel', title: 'Origin story — handloom saree', time: '6:00 PM EST' },
    { day: 'Wed Apr 23', platform: 'TikTok',    type: 'Short', title: '"From Dhaka to your wardrobe"', time: '7:00 PM EST' },
    { day: 'Fri Apr 25', platform: 'Instagram', type: 'Carousel', title: 'Jamdani weaving explainer', time: '12:00 PM EST' },
    { day: 'Mon Apr 28', platform: 'Instagram', type: 'Story', title: 'Skincare line — natural origins', time: '5:00 PM EST' },
    { day: 'Thu May 1',  platform: 'TikTok',    type: 'Short', title: 'Skincare & organic wheat', time: '6:30 PM EST' },
  ],

  nextSteps: [
    { priority: 'high', action: 'Reply to World Market — they responded positively', deadline: 'Today', cta: 'Draft reply' },
    { priority: 'high', action: 'Post Reel #1 on Instagram (Origin story)', deadline: 'Mon Apr 21', cta: 'Download reel' },
    { priority: 'med',  action: 'Follow up with Anthropologie (opened, no reply yet)', deadline: 'Apr 22 (+3 days)', cta: 'Send follow-up' },
    { priority: 'med',  action: 'Send sample pack to creator @tasnim.weaves', deadline: 'This week', cta: 'Generate shipping brief' },
    { priority: 'low',  action: 'Set up Amazon Premium storefront for DTC channel', deadline: 'Apr 30', cta: 'Start setup' },
  ],
}

const STATUS_STYLE = {
  replied:   { bg: 'bg-sage/10',      text: 'text-sage-dark',  label: '● Replied' },
  opened:    { bg: 'bg-blue-50',      text: 'text-blue-600',   label: '● Opened' },
  forwarded: { bg: 'bg-amber-50',     text: 'text-amber-700',  label: '● Forwarded' },
  sent:      { bg: 'bg-cream-dark',   text: 'text-bark-light', label: '○ Sent' },
}

const PRIORITY_STYLE = {
  high: 'bg-red-50 text-red-600 border-red-100',
  med:  'bg-amber-50 text-amber-700 border-amber-100',
  low:  'bg-cream-dark text-bark-light border-cream-dark',
}

export default function Results() {
  const [activeTab, setActiveTab] = useState('leads')
  const R = RESULT

  return (
    <div className="min-h-screen bg-cream">
      <Nav />

      <div className="max-w-6xl mx-auto px-6 pt-24 pb-16">

        {/* Back + header */}
        <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
          <div>
            <Link to="/dashboard" className="flex items-center gap-1.5 text-sm text-bark-light hover:text-bark mb-4">
              <ArrowLeft size={14} /> Back to dashboard
            </Link>
            <div className="flex items-center gap-3 mb-1">
              <CheckCircle size={22} className="text-sage" />
              <h1 className="text-2xl font-bold text-bark">GTM Pipeline — Complete</h1>
            </div>
            <p className="text-bark-light text-sm">
              {R.brand} · {R.category} · Ran {R.runDate} · {R.duration}
            </p>
          </div>
          <div className="flex gap-2">
            <Link to="/dashboard"
              className="flex items-center gap-2 border border-cream-dark text-bark-light text-sm px-4 py-2 rounded-full hover:border-bark transition-colors">
              <RefreshCw size={13} /> Run again
            </Link>
            <button className="flex items-center gap-2 bg-terracotta text-cream text-sm px-5 py-2 rounded-full hover:bg-bark-light transition-colors">
              <Download size={13} /> Export report
            </button>
          </div>
        </div>

        {/* Summary KPI strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-10"
        >
          {[
            { icon: Users,      label: 'Buyers scanned', value: R.summary.buyersScanned.toLocaleString() },
            { icon: Star,       label: 'ICP matches',    value: R.summary.leadsFound },
            { icon: Mail,       label: 'Emails sent',    value: R.summary.emailsSent },
            { icon: Video,      label: 'Reels created',  value: R.summary.reelsCreated },
            { icon: Eye,        label: 'Est. reach',     value: R.summary.estimatedReach },
            { icon: DollarSign, label: 'Pipeline value', value: R.summary.projectedARR, highlight: true },
          ].map((k, i) => (
            <div key={i} className={`rounded-2xl p-4 text-center border ${k.highlight ? 'bg-sage-dark border-sage-dark' : 'bg-white border-cream-dark'}`}>
              <k.icon size={16} className={`mx-auto mb-1.5 ${k.highlight ? 'text-cream/60' : 'text-bark-light'}`} />
              <p className={`text-xl font-bold ${k.highlight ? 'text-cream' : 'text-bark'}`}>{k.value}</p>
              <p className={`text-xs mt-0.5 ${k.highlight ? 'text-cream/60' : 'text-bark-light'}`}>{k.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-1 bg-cream-dark p-1 rounded-xl mb-8 w-fit">
          {[
            ['leads', 'Buyer leads'],
            ['emails', 'Outreach sent'],
            ['reels', 'Reels & content'],
            ['calendar', 'Content calendar'],
            ['next', 'Next steps'],
          ].map(([id, label]) => (
            <button key={id} onClick={() => setActiveTab(id)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === id ? 'bg-white text-bark shadow-sm' : 'text-bark-light hover:text-bark'
              }`}>
              {label}
            </button>
          ))}
        </div>

        {/* ── LEADS TAB ── */}
        {activeTab === 'leads' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-3">

            {/* Provenance card — attached to every buyer pitch */}
            <div className="relative rounded-2xl overflow-hidden mb-2 shadow-md">
              <img
                src="/grameen2.jpg"
                alt="Artisans weaving at the cooperative"
                className="w-full h-52 object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-bark/80 via-bark/50 to-transparent" />
              <div className="absolute inset-0 flex items-center px-8">
                <div className="max-w-sm">
                  <span className="text-xs font-semibold text-terracotta uppercase tracking-widest">
                    Attached to every buyer pitch
                  </span>
                  <h3 className="text-cream text-xl font-bold leading-snug mt-1 mb-2">
                    This is where your goods come from.
                  </h3>
                  <p className="text-cream/70 text-sm leading-relaxed">
                    Each outreach email includes this provenance story — real artisans, real cooperative,
                    traceable supply chain. US ethical buyers pay a premium for exactly this.
                  </p>
                </div>
              </div>
              <div className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2 text-right">
                <p className="text-cream text-xs font-medium">Sundarbans Cooperative</p>
                <p className="text-cream/50 text-xs">Khulna, Bangladesh</p>
              </div>
            </div>

            <p className="text-sm text-bark-light mb-1">Top {R.topLeads.length} high-fit US buyers — sorted by ICP match score</p>
            {R.topLeads.map((lead, i) => (
              <div key={i} className="bg-white border border-cream-dark rounded-2xl p-5 flex items-center gap-5">
                <div className="w-10 h-10 bg-cream-dark rounded-xl flex items-center justify-center shrink-0 text-sm font-bold text-bark">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-bark text-sm">{lead.company}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${STATUS_STYLE[lead.status].bg} ${STATUS_STYLE[lead.status].text}`}>
                      {STATUS_STYLE[lead.status].label}
                    </span>
                  </div>
                  <p className="text-xs text-bark-light mt-0.5">{lead.title} · {lead.email}</p>
                  <p className="text-xs text-bark-light mt-1 italic">{lead.note}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className={`text-lg font-bold ${lead.score >= 0.90 ? 'text-sage' : lead.score >= 0.85 ? 'text-terracotta' : 'text-bark-light'}`}>
                    {lead.score.toFixed(2)}
                  </p>
                  <p className="text-xs text-bark-light">ICP score</p>
                </div>
                <button className="shrink-0 border border-cream-dark text-bark-light text-xs px-3 py-1.5 rounded-full hover:border-terracotta hover:text-terracotta transition-colors">
                  Draft reply
                </button>
              </div>
            ))}
          </motion.div>
        )}

        {/* ── EMAILS TAB ── */}
        {activeTab === 'emails' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-4">
            <p className="text-sm text-bark-light mb-1">{R.emails.length} outreach emails sent · {R.emails.filter(e => e.openRate).length} opened</p>
            {R.emails.map((email, i) => (
              <div key={i} className="bg-white border border-cream-dark rounded-2xl overflow-hidden">
                <div className="flex items-center justify-between px-5 py-3 border-b border-cream-dark">
                  <div className="flex items-center gap-3">
                    <Mail size={14} className="text-bark-light" />
                    <span className="text-sm font-medium text-bark">To: {email.to}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-bark-light">{email.sentAt}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${email.openRate ? 'bg-sage/10 text-sage-dark' : 'bg-cream-dark text-bark-light'}`}>
                      {email.openRate ? '● Opened' : '○ Sent'}
                    </span>
                  </div>
                </div>
                <div className="px-5 py-4">
                  <p className="text-sm font-semibold text-bark mb-2">"{email.subject}"</p>
                  <p className="text-sm text-bark-light leading-relaxed">{email.preview}</p>
                  <p className="text-xs text-bark-light/50 mt-2">…</p>
                </div>
                <div className="px-5 py-3 border-t border-cream-dark bg-cream flex gap-3">
                  <button className="text-xs text-terracotta font-medium hover:underline">View full email</button>
                  <button className="text-xs text-bark-light hover:text-bark">Send follow-up</button>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* ── REELS TAB ── */}
        {activeTab === 'reels' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="text-sm text-bark-light mb-5">{R.reels.length} reels generated — ready to post</p>
            <div className="grid md:grid-cols-3 gap-6">
              {R.reels.map((reel, i) => (
                <div key={i} className="bg-white border border-cream-dark rounded-2xl overflow-hidden">
                  {/* Thumbnail */}
                  <div className="relative" style={{ aspectRatio: '9/16', maxHeight: 280 }}>
                    <img src={reel.thumbnail} alt={reel.title}
                      className="w-full h-full object-cover object-top"
                      onError={e => e.target.src = '/grameen2.jpg'} />
                    <div className="absolute inset-0 bg-gradient-to-t from-bark/80 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-2.5 py-1 text-xs text-cream font-medium">
                      {reel.platform}
                    </div>
                    <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-2.5 py-1 text-xs text-cream">
                      {reel.duration}
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="text-xs bg-sage/80 text-cream px-2 py-0.5 rounded-full">Ready to post</span>
                    </div>
                  </div>
                  {/* Info */}
                  <div className="p-4 flex flex-col gap-2">
                    <p className="text-sm font-semibold text-bark leading-tight">{reel.title}</p>
                    <div className="bg-cream rounded-xl p-3">
                      <p className="text-xs text-bark-light italic leading-relaxed">Hook: {reel.hook}</p>
                    </div>
                    <div>
                      <p className="text-xs text-bark-light">{reel.hashtags}</p>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-1 text-xs text-bark-light">
                        <Eye size={11} /> {reel.estimatedReach}
                      </div>
                      <button className="flex items-center gap-1 text-xs text-terracotta font-medium hover:gap-2 transition-all">
                        <Download size={11} /> Download
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Skincare product section */}
            <div className="mt-8 bg-white border border-cream-dark rounded-2xl p-6 flex gap-6 items-center">
              <img src="/skincare.jpeg" alt="Natural skincare products"
                className="w-28 h-28 object-cover rounded-xl shrink-0"
                onError={e => e.target.style.display = 'none'} />
              <div>
                <p className="text-xs text-terracotta font-medium uppercase tracking-widest mb-1">Additional product line detected</p>
                <p className="font-semibold text-bark mb-1">Natural skincare & organic wellness</p>
                <p className="text-sm text-bark-light leading-relaxed">
                  Agents detected a skincare product line in the brand profile.
                  3 additional reels can be generated targeting the US clean beauty segment
                  (Credo Beauty, The Detox Market, Erewhon).
                </p>
                <button className="mt-3 bg-terracotta/10 text-terracotta text-xs font-medium px-4 py-2 rounded-full hover:bg-terracotta hover:text-cream transition-colors">
                  Generate skincare reels →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── CALENDAR TAB ── */}
        {activeTab === 'calendar' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center gap-2 mb-6">
              <Calendar size={16} className="text-bark-light" />
              <p className="text-sm text-bark-light">5-post content calendar — optimised for US EST prime time</p>
            </div>
            <div className="flex flex-col gap-3">
              {R.contentCalendar.map((item, i) => (
                <div key={i} className="bg-white border border-cream-dark rounded-2xl px-5 py-4 flex items-center gap-5">
                  <div className="w-24 shrink-0">
                    <p className="text-xs font-semibold text-bark">{item.day.split(' ')[0]}</p>
                    <p className="text-xs text-bark-light">{item.day.split(' ').slice(1).join(' ')}</p>
                  </div>
                  <div className={`px-2.5 py-1 rounded-full text-xs font-medium shrink-0 ${
                    item.platform === 'Instagram' ? 'bg-pink-50 text-pink-600' : 'bg-blue-50 text-blue-600'
                  }`}>
                    {item.platform}
                  </div>
                  <div className="bg-cream-dark text-bark-light text-xs px-2 py-1 rounded-full shrink-0">{item.type}</div>
                  <p className="text-sm text-bark flex-1">{item.title}</p>
                  <p className="text-xs text-bark-light shrink-0">{item.time}</p>
                  <button className="shrink-0 text-xs text-terracotta border border-terracotta/20 px-3 py-1.5 rounded-full hover:bg-terracotta hover:text-cream transition-colors">
                    Schedule
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── NEXT STEPS TAB ── */}
        {activeTab === 'next' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-3">
            <p className="text-sm text-bark-light mb-1">Recommended actions — sorted by priority</p>
            {R.nextSteps.map((step, i) => (
              <div key={i} className="bg-white border border-cream-dark rounded-2xl px-5 py-4 flex items-center gap-5">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border shrink-0 uppercase tracking-wide ${PRIORITY_STYLE[step.priority]}`}>
                  {step.priority}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-bark">{step.action}</p>
                  <p className="text-xs text-bark-light mt-0.5">Deadline: {step.deadline}</p>
                </div>
                <button className="shrink-0 bg-terracotta/10 text-terracotta text-xs font-medium px-4 py-2 rounded-full hover:bg-terracotta hover:text-cream transition-colors whitespace-nowrap">
                  {step.cta} →
                </button>
              </div>
            ))}

            {/* Summary box */}
            <div className="mt-4 bg-bark rounded-2xl p-6 flex items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp size={16} className="text-terracotta" />
                  <p className="text-cream font-semibold text-sm">Estimated pipeline value</p>
                </div>
                <p className="text-3xl font-bold text-cream">{R.summary.projectedARR}</p>
                <p className="text-cream/50 text-xs mt-1">Based on 3 engaged buyers · avg $85K deal · 45–90 day close</p>
              </div>
              <Link to="/signup"
                className="shrink-0 bg-terracotta text-cream text-sm font-semibold px-6 py-3 rounded-full hover:bg-bark-light transition-colors">
                Upgrade to full access
              </Link>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  )
}
