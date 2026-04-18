import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, RefreshCw, Wifi, WifiOff, Globe, Upload, Mic, CheckCircle, Loader, X } from 'lucide-react'

/* ── Design tokens (matching BioHarmonize pipeline aesthetic) ── */
const C = {
  bg: '#FAFAF8', surface: '#FFFFFF', s2: '#F5F4F0',
  primary: '#2C1A0E', accent: '#C4713A', success: '#5A7A5E',
  warning: '#D97706', error: '#DC2626', muted: '#78716C',
  border: '#E7E5E0',
}

/* ── Agents ── */
const AGENTS = [
  { key: 'brand_parse',  label: 'Brand Parser',        done: 'GTM brief created · Aarong textiles + organics' },
  { key: 'icp_scout',   label: 'ICP Scout (Apify)',    done: '2,400 US buyers scanned · 62 high-fit matches' },
  { key: 'enrichment',  label: 'Contact Enricher',     done: '38 emails + LinkedIn URLs found' },
  { key: 'outreach',    label: 'Outreach Agent',        done: '24 personalized pitches drafted + sent' },
  { key: 'social',      label: 'Social Scraper',        done: 'Top 50 US ethical-fashion hashtags extracted' },
  { key: 'reel_gen',    label: 'Reel Generator',        done: '6 Reels + 4 TikTok scripts created' },
  { key: 'analytics',   label: 'Analytics Agent',       done: 'Pipeline report generated · 3 responses flagged' },
]

/* ── Log timeline ── */
const LOG_TIMELINE = [
  { t: 500,   k: 'info',    txt: 'Starting Grameen GTM pipeline for Aarong — Handloom Textiles & Organics…' },
  { t: 900,   k: 'info',    txt: 'Parsing voice brief → US market GTM document…' },
  { t: 1400,  k: 'success', txt: 'GTM brief created: Aarong · Handloom sarees + organic wheat · Target: specialty retail + DTC' },
  { t: 2100,  k: 'info',    txt: '[Apify] Launching actor: ethical-retail-buyer-scraper · US market · handloom category…' },
  { t: 2600,  k: 'apify',   company: 'Anthropologie',    segment: 'Ethical fashion buyer',           score: 0.94 },
  { t: 3000,  k: 'apify',   company: 'World Market',     segment: 'Artisan goods sourcing manager',  score: 0.91 },
  { t: 3400,  k: 'apify',   company: 'Whole Foods Market', segment: 'Specialty food buyer',          score: 0.88 },
  { t: 3800,  k: 'apify',   company: 'Ten Thousand Villages', segment: 'Fair trade director',       score: 0.87 },
  { t: 4200,  k: 'apify',   company: 'Grove Collaborative', segment: 'Sustainable goods lead',       score: 0.85 },
  { t: 4600,  k: 'apify',   company: 'The Detox Market', segment: 'Clean beauty buyer',              score: 0.83 },
  { t: 5000,  k: 'apify',   company: 'Package Free Shop', segment: 'Zero-waste sourcing',           score: 0.81 },
  { t: 5600,  k: 'success', txt: '[Apify] 2,400 companies scanned · 62 high-fit ICP matches found (conf ≥ 0.80)' },
  { t: 6300,  k: 'info',    txt: 'Contact Enricher: finding emails + LinkedIn profiles for 62 buyers…' },
  { t: 6800,  k: 'enrich',  name: 'Sarah Chen',       title: 'VP Sourcing, Anthropologie',         email: 's.chen@anthropologie.com' },
  { t: 7100,  k: 'enrich',  name: 'Marcus Webb',      title: 'Ethical Goods Dir., World Market',   email: 'm.webb@worldmarket.com' },
  { t: 7400,  k: 'enrich',  name: 'Priya Nair',       title: 'Global Buyer, Whole Foods',          email: 'p.nair@wholefoods.com' },
  { t: 7700,  k: 'enrich',  name: 'Tom Kiely',        title: 'Founder, Ten Thousand Villages',     email: 't.kiely@tenv.org' },
  { t: 8100,  k: 'success', txt: '38 verified contacts enriched · 24 emails + LinkedIn URLs confirmed' },
  { t: 8900,  k: 'info',    txt: 'Outreach Agent: drafting personalized buyer pitches…' },
  { t: 9400,  k: 'email',   to: 'Sarah Chen', subject: 'Aarong handloom textiles — premium sourcing opportunity for Anthropologie' },
  { t: 9800,  k: 'email',   to: 'Marcus Webb', subject: 'Artisan jamdani weaves from Bangladesh — World Market fit' },
  { t: 10200, k: 'email',   to: 'Priya Nair', subject: 'Certified organic wheat & moringa from Aarong cooperative network' },
  { t: 10800, k: 'success', txt: '24 personalized outreach emails sent · follow-up sequences queued at +3d, +7d' },
  { t: 11500, k: 'info',    txt: '[Apify] Social Scraper: analyzing US ethical-fashion Instagram & TikTok landscape…' },
  { t: 12000, k: 'social',  platform: 'Instagram', insight: '#slowfashion (2.1M posts) · #handloom (890K) · #artisanmade (1.4M) — high engagement on "origin story" content' },
  { t: 12600, k: 'social',  platform: 'TikTok',    insight: '#ethicalfashion trending +34% · "brand behind the craft" content format performing 3× benchmark' },
  { t: 13200, k: 'success', txt: 'Social intelligence complete · Content strategy brief generated' },
  { t: 13900, k: 'info',    txt: 'Reel Generator: creating US-optimized video content from Aarong brand assets…' },
  { t: 14400, k: 'reel',    title: '"How Aarong\'s handloom saree is made" — 45s origin story Reel' },
  { t: 14800, k: 'reel',    title: '"From Dhaka to your wardrobe" — TikTok stitch format, 30s' },
  { t: 15200, k: 'reel',    title: '"What is jamdani weaving?" — educational carousel + Reel' },
  { t: 15700, k: 'success', txt: '6 Reels + 4 TikTok scripts created · estimated 40K–120K US reach on launch week' },
  { t: 16500, k: 'info',    txt: 'Analytics Agent: compiling pipeline report…' },
  { t: 17000, k: 'match',   company: 'Anthropologie', status: 'Email opened · link clicked', score: 0.94 },
  { t: 17500, k: 'match',   company: 'World Market',  status: 'Email opened · replied (positive)', score: 0.91 },
  { t: 18000, k: 'match',   company: 'Whole Foods',   status: 'Forwarded to category buyer', score: 0.88 },
  { t: 18800, k: 'complete', txt: '✓ GTM pipeline complete · 62 leads · 24 emails sent · 3 engaged · 10 reels · ~$340K ARR potential mapped' },
]

const AGENT_EVENTS = [
  { t: 400,   agent: 'brand_parse', state: 'running' },
  { t: 1600,  agent: 'brand_parse', state: 'done' },
  { t: 1900,  agent: 'icp_scout',   state: 'running' },
  { t: 5800,  agent: 'icp_scout',   state: 'done' },
  { t: 6100,  agent: 'enrichment',  state: 'running' },
  { t: 8300,  agent: 'enrichment',  state: 'done' },
  { t: 8700,  agent: 'outreach',    state: 'running' },
  { t: 11000, agent: 'outreach',    state: 'done' },
  { t: 11300, agent: 'social',      state: 'running' },
  { t: 13400, agent: 'social',      state: 'done' },
  { t: 13700, agent: 'reel_gen',    state: 'running' },
  { t: 15900, agent: 'reel_gen',    state: 'done' },
  { t: 16300, agent: 'analytics',   state: 'running' },
  { t: 19000, agent: 'analytics',   state: 'done' },
]

const COUNTER_EVENTS = [
  { t: 5800,  leads: 62 },
  { t: 10800, emails: 24 },
  { t: 15900, reels: 10 },
]

const TOTAL_MS = 19500
const SPEED = 2.2

function animCount(setter, target, ms = 900) {
  const start = Date.now()
  const step = () => {
    const p = Math.min((Date.now() - start) / ms, 1)
    const e = 1 - Math.pow(1 - p, 3)
    setter(Math.round(e * target))
    if (p < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

/* ── Score badge ── */
const ScoreBadge = ({ score }) => {
  const [bg, color] =
    score >= 0.90 ? ['rgba(90,122,94,0.1)', '#5A7A5E'] :
    score >= 0.85 ? ['rgba(196,113,58,0.1)', '#C4713A'] :
                    ['rgba(217,119,6,0.1)', '#D97706']
  return (
    <span style={{
      fontFamily: 'monospace', fontSize: '11px', fontWeight: 600,
      padding: '2px 8px', borderRadius: 20, background: bg, color,
    }}>
      {score.toFixed(2)}
    </span>
  )
}

/* ── Log entry renderer ── */
const LogEntry = ({ entry }) => {
  const base = {
    padding: '9px 14px', fontSize: '12.5px', lineHeight: 1.55,
    borderLeft: '3px solid transparent',
    borderBottom: `1px solid ${C.border}`,
    display: 'flex', gap: 10, alignItems: 'flex-start',
    background: C.surface,
  }

  if (entry.k === 'info') return (
    <div style={{ ...base, borderLeftColor: '#D6D3CE' }}>
      <span style={{ color: C.muted, marginTop: 1 }}>›</span>
      <span style={{ color: C.muted }}>{entry.txt}</span>
    </div>
  )

  if (entry.k === 'apify') return (
    <div style={{ ...base, borderLeftColor: C.accent, alignItems: 'center', gap: 8 }}>
      <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.5px', color: C.accent,
        background: 'rgba(196,113,58,0.08)', padding: '1px 6px', borderRadius: 3, flexShrink: 0 }}>
        APIFY
      </span>
      <span style={{ color: C.primary, flex: 1, fontWeight: 500 }}>{entry.company}</span>
      <span style={{ color: C.muted, flex: 2 }}>{entry.segment}</span>
      <ScoreBadge score={entry.score} />
    </div>
  )

  if (entry.k === 'enrich') return (
    <div style={{ ...base, borderLeftColor: C.success, alignItems: 'center', gap: 8 }}>
      <span style={{ fontSize: 10, fontWeight: 700, color: C.success,
        background: 'rgba(90,122,94,0.08)', padding: '1px 6px', borderRadius: 3, flexShrink: 0 }}>
        CONTACT
      </span>
      <span style={{ color: C.primary, fontWeight: 500, flex: 1 }}>{entry.name}</span>
      <span style={{ color: C.muted, flex: 1.5 }}>{entry.title}</span>
      <span style={{ fontFamily: 'monospace', fontSize: 11, color: C.accent }}>{entry.email}</span>
    </div>
  )

  if (entry.k === 'email') return (
    <div style={{ ...base, borderLeftColor: '#7C3AED', flexDirection: 'column', gap: 3 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: '#7C3AED',
          background: 'rgba(124,58,237,0.08)', padding: '1px 6px', borderRadius: 3 }}>EMAIL SENT</span>
        <span style={{ color: C.muted, fontSize: 11 }}>→ {entry.to}</span>
      </div>
      <span style={{ color: C.primary, fontSize: 12 }}>"{entry.subject}"</span>
    </div>
  )

  if (entry.k === 'social') return (
    <div style={{ ...base, borderLeftColor: '#EC4899', flexDirection: 'column', gap: 3 }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: '#EC4899',
          background: 'rgba(236,72,153,0.08)', padding: '1px 6px', borderRadius: 3 }}>{entry.platform.toUpperCase()}</span>
      </div>
      <span style={{ color: C.muted, fontSize: 12 }}>{entry.insight}</span>
    </div>
  )

  if (entry.k === 'reel') return (
    <div style={{ ...base, borderLeftColor: '#8B5CF6', alignItems: 'center', gap: 8 }}>
      <span style={{ fontSize: 10, fontWeight: 700, color: '#8B5CF6',
        background: 'rgba(139,92,246,0.08)', padding: '1px 6px', borderRadius: 3, flexShrink: 0 }}>REEL</span>
      <span style={{ color: C.primary }}>{entry.title}</span>
    </div>
  )

  if (entry.k === 'match') return (
    <div style={{ ...base, borderLeftColor: C.success, alignItems: 'center', gap: 8 }}>
      <span style={{ fontSize: 10, fontWeight: 700, color: C.success,
        background: 'rgba(90,122,94,0.08)', padding: '1px 6px', borderRadius: 3, flexShrink: 0 }}>RESPONSE</span>
      <span style={{ color: C.primary, fontWeight: 600, flex: 1 }}>{entry.company}</span>
      <span style={{ color: C.muted, flex: 2 }}>{entry.status}</span>
      <ScoreBadge score={entry.score} />
    </div>
  )

  if (entry.k === 'success') return (
    <div style={{ ...base, borderLeftColor: C.success, background: 'rgba(90,122,94,0.03)' }}>
      <svg width={12} height={12} viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
        <circle cx={6} cy={6} r={5} fill={C.success} />
        <path d="M3.5 6l1.8 1.8L8.5 4" stroke="white" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span style={{ color: C.success, fontWeight: 500 }}>{entry.txt}</span>
    </div>
  )

  if (entry.k === 'complete') return (
    <div style={{ ...base, borderLeftColor: C.primary, background: C.s2, padding: '12px 14px' }}>
      <span style={{ fontWeight: 700, color: C.primary, fontSize: 13 }}>{entry.txt}</span>
    </div>
  )

  return null
}

/* ── Agent stepper card ── */
const AgentCard = ({ agent, state }) => {
  const running = state === 'running', done = state === 'done'
  return (
    <div style={{
      padding: '11px 14px',
      borderLeft: done ? `3px solid ${C.success}` : running ? `3px solid ${C.accent}` : '3px solid transparent',
      borderBottom: `1px solid ${C.border}`,
      background: running ? 'rgba(196,113,58,0.025)' : C.surface,
      transition: 'all 0.3s ease',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {done ? (
          <div style={{ width: 18, height: 18, borderRadius: '50%', background: C.success, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width={10} height={10} viewBox="0 0 10 10" fill="none">
              <path d="M2 5l2 2 4-4" stroke="white" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        ) : running ? (
          <div style={{ width: 13, height: 13, border: `2px solid rgba(196,113,58,0.2)`, borderTopColor: C.accent,
            borderRadius: '50%', flexShrink: 0, animation: 'spin 0.7s linear infinite' }} />
        ) : (
          <div style={{ width: 13, height: 13, borderRadius: '50%', border: `1.5px solid ${C.border}`, flexShrink: 0 }} />
        )}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12.5, fontWeight: done || running ? 600 : 400,
            color: done ? C.primary : running ? C.accent : C.muted }}>
            {agent.label}
          </div>
          {done && <div style={{ fontSize: 10.5, color: C.muted, marginTop: 2, fontFamily: 'monospace' }}>{agent.done}</div>}
          {running && <div style={{ fontSize: 10.5, color: C.accent, marginTop: 2 }}>Running…</div>}
        </div>
      </div>
    </div>
  )
}

/* ── Counter ── */
const Counter = ({ label, value, active, color = C.accent }) => (
  <div style={{
    flex: 1, padding: '10px 12px', background: active ? 'rgba(196,113,58,0.04)' : C.s2,
    borderRadius: 8, border: `1px solid ${active ? 'rgba(196,113,58,0.2)' : C.border}`,
    textAlign: 'center', transition: 'all 0.3s ease',
  }}>
    <div style={{ fontFamily: 'monospace', fontSize: 22, fontWeight: 500, color: active ? color : C.muted, letterSpacing: -1, lineHeight: 1 }}>
      {value}
    </div>
    <div style={{ fontSize: 10, color: C.muted, marginTop: 4 }}>{label}</div>
  </div>
)

/* ── Funnel chart ── */
const FunnelChart = ({ leads, emails, reels, responses }) => {
  const bars = [
    { label: 'Buyers scanned', val: 2400, fill: leads, color: C.accent },
    { label: 'ICP matches', val: leads, fill: leads, color: '#7C3AED' },
    { label: 'Emails sent', val: emails, fill: emails * 4, color: C.success },
    { label: 'Responses', val: responses, fill: responses * 20, color: '#EC4899' },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {bars.map(b => (
        <div key={b.label}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
            <span style={{ fontSize: 10.5, color: C.muted }}>{b.label}</span>
            <span style={{ fontFamily: 'monospace', fontSize: 10.5, color: C.primary, fontWeight: 600 }}>{b.val}</span>
          </div>
          <div style={{ height: 5, background: C.s2, borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${Math.min(b.fill / 24, 100)}%`, background: b.color, borderRadius: 3, transition: 'width 0.8s ease' }} />
          </div>
        </div>
      ))}
    </div>
  )
}

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000'

/* ── Main dashboard ── */
export default function Dashboard() {
  const [agentStates, setAgentStates] = useState(Object.fromEntries(AGENTS.map(a => [a.key, 'waiting'])))
  const [logEntries, setLogEntries] = useState([])
  const [progress, setProgress] = useState(0)
  const [timeLeft, setTimeLeft] = useState(Math.round(TOTAL_MS * SPEED / 1000))
  const [leads, setLeads] = useState(0)
  const [emails, setEmails] = useState(0)
  const [reels, setReels] = useState(0)
  const [done, setDone] = useState(false)
  const [running, setRunning] = useState(false)
  const navigate = useNavigate()
  const [apiMode, setApiMode] = useState(null)
  const [jobId, setJobId] = useState(null)
  const [realLeads, setRealLeads] = useState([])
  const logRef = useRef()
  const timers = useRef([])
  const pollRef = useRef(null)

  // Brand setup state
  const [inputMethod, setInputMethod] = useState('none') // 'none' | 'url' | 'upload' | 'voice'
  const [brandUrl, setBrandUrl] = useState('')
  const [uploadFile, setUploadFile] = useState(null)
  const [briefStatus, setBriefStatus] = useState('idle') // 'idle' | 'loading' | 'ready' | 'error'
  const [briefText, setBriefText] = useState('')
  const [briefError, setBriefError] = useState('')

  function clearAll() {
    timers.current.forEach(id => { clearTimeout(id); clearInterval(id) })
    timers.current = []
    if (pollRef.current) { clearInterval(pollRef.current); pollRef.current = null }
  }

  async function parseBrandUrl() {
    if (!brandUrl.trim()) return
    setBriefStatus('loading')
    setBriefError('')
    try {
      const res = await fetch(`${API_BASE}/api/brand/from-url?url=${encodeURIComponent(brandUrl)}`, { method: 'POST' })
      if (!res.ok) throw new Error('Scrape failed')
      const data = await res.json()
      setBriefText(data.text)
      setBriefStatus('ready')
    } catch (e) {
      setBriefStatus('error')
      setBriefError('Could not scrape that URL. Check the backend is running and the URL is accessible.')
    }
  }

  async function parseBrandDoc() {
    if (!uploadFile) return
    setBriefStatus('loading')
    setBriefError('')
    try {
      const form = new FormData()
      form.append('file', uploadFile)
      const res = await fetch(`${API_BASE}/api/brand/from-doc`, { method: 'POST', body: form })
      if (!res.ok) throw new Error('Parse failed')
      const data = await res.json()
      setBriefText(data.text)
      setBriefStatus('ready')
    } catch (e) {
      setBriefStatus('error')
      setBriefError('Could not parse that file. Supported: PDF, DOCX, TXT.')
    }
  }

  function clearBrief() {
    setBriefText('')
    setBriefStatus('idle')
    setBriefError('')
    setUploadFile(null)
    setBrandUrl('')
  }

  // Try to fire a real Apify pipeline via backend
  async function fireRealPipeline() {
    try {
      const res = await fetch(`${API_BASE}/api/pipeline/run`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brand: 'Aarong',
          category: 'Handloom textiles & apparel',
          country: 'Bangladesh',
          brand_brief: briefText,
        }),
      })
      if (!res.ok) throw new Error('backend offline')
      const data = await res.json()
      setJobId(data.job_id)
      setApiMode('live')

      // Poll for results
      pollRef.current = setInterval(async () => {
        try {
          const s = await fetch(`${API_BASE}/api/pipeline/status/${data.job_id}`).then(r => r.json())
          if (s.status === 'complete') {
            clearInterval(pollRef.current)
            const result = await fetch(`${API_BASE}/api/pipeline/results/${data.job_id}`).then(r => r.json())
            setRealLeads(result.top_leads || [])
            // Inject real leads into log
            if (result.top_leads?.length) {
              const realEntries = result.top_leads.slice(0, 5).map(l => ({
                k: 'apify',
                company: l.company,
                segment: l.snippet?.slice(0, 70) || 'US buyer',
                score: l.score,
                real: true,
              }))
              setLogEntries(prev => [
                ...prev,
                { k: 'info', txt: '[Apify] ✓ Real scrape complete — injecting live results…' },
                ...realEntries,
              ])
            }
          }
        } catch { clearInterval(pollRef.current) }
      }, 4000)
    } catch {
      setApiMode('demo')
    }
  }

  function startPipeline() {
    clearAll()
    setAgentStates(Object.fromEntries(AGENTS.map(a => [a.key, 'waiting'])))
    setLogEntries([])
    setProgress(0)
    setLeads(0); setEmails(0); setReels(0)
    setDone(false)
    setRunning(true)
    setRealLeads([])
    setApiMode(null)
    fireRealPipeline()

    const startTime = Date.now()

    const progInterval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const p = Math.min(elapsed / (TOTAL_MS * SPEED), 1)
      setProgress(p)
      setTimeLeft(Math.max(0, Math.ceil(((TOTAL_MS * SPEED) - elapsed) / 1000)))
      if (elapsed >= TOTAL_MS * SPEED) clearInterval(progInterval)
    }, 80)
    timers.current.push(progInterval)

    LOG_TIMELINE.forEach(ev => {
      const id = setTimeout(() => setLogEntries(prev => [...prev, ev]), ev.t * SPEED)
      timers.current.push(id)
    })

    AGENT_EVENTS.forEach(ev => {
      const id = setTimeout(() => {
        setAgentStates(prev => ({ ...prev, [ev.agent]: ev.state }))
        if (ev.agent === 'analytics' && ev.state === 'done') { setDone(true); setRunning(false) }
      }, ev.t * SPEED)
      timers.current.push(id)
    })

    COUNTER_EVENTS.forEach(ev => {
      const id = setTimeout(() => {
        if (ev.leads)  animCount(setLeads, ev.leads)
        if (ev.emails) animCount(setEmails, ev.emails)
        if (ev.reels)  animCount(setReels, ev.reels)
      }, ev.t * SPEED)
      timers.current.push(id)
    })

    return () => clearAll()
  }

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight
  }, [logEntries])

  useEffect(() => () => clearAll(), [])

  const pct = Math.round(progress * 100)
  const statusLabel =
    pct < 9  ? 'Parsing brand brief…' :
    pct < 30 ? 'Scanning US buyers (Apify)…' :
    pct < 45 ? 'Enriching contacts…' :
    pct < 57 ? 'Sending outreach campaigns…' :
    pct < 70 ? 'Scraping social intelligence…' :
    pct < 83 ? 'Generating reels & content…' :
    done     ? 'Pipeline complete' :
               'Compiling analytics report…'

  return (
    <div style={{ height: '100vh', background: C.bg, fontFamily: "'Inter', system-ui, sans-serif",
      display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      {/* Nav */}
      <nav style={{ height: 56, background: C.surface, borderBottom: `1px solid ${C.border}`,
        display: 'flex', alignItems: 'center', padding: '0 20px', gap: 0,
        boxShadow: '0 1px 0 rgba(44,26,14,0.04)', flexShrink: 0 }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, marginRight: 20,
          textDecoration: 'none', color: C.primary }}>
          <ArrowLeft size={14} />
          <span style={{ fontSize: 22 }}>🌾</span>
          <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: -0.3 }}>Grameen</span>
        </Link>

        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 12, color: C.muted }}>GTM Pipeline</span>
          <span style={{ color: C.border }}>/</span>
          <span style={{ fontSize: 12, color: C.primary, fontWeight: 500 }}>Aarong — Handloom Textiles & Organics</span>
          <span style={{ color: C.border }}>/</span>
          <span style={{ fontSize: 11, color: C.muted }}>Run #1</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 11px', borderRadius: 20,
            background: done ? 'rgba(90,122,94,0.1)' : running ? 'rgba(196,113,58,0.1)' : C.s2,
            border: `1px solid ${done ? 'rgba(90,122,94,0.3)' : running ? 'rgba(196,113,58,0.3)' : C.border}` }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%',
              background: done ? C.success : running ? C.accent : C.muted,
              animation: running ? 'pulse 2s infinite' : 'none' }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: done ? C.success : running ? C.accent : C.muted }}>
              {done ? 'Complete' : running ? 'Running' : 'Idle'}
            </span>
          </div>

          {/* API mode badge */}
          {apiMode && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '4px 10px',
              borderRadius: 7, fontSize: 10, fontWeight: 600, fontFamily: 'monospace',
              background: apiMode === 'live' ? 'rgba(90,122,94,0.08)' : 'rgba(217,119,6,0.08)',
              border: `1px solid ${apiMode === 'live' ? 'rgba(90,122,94,0.2)' : 'rgba(217,119,6,0.2)'}`,
              color: apiMode === 'live' ? C.success : C.warning }}>
              {apiMode === 'live' ? <Wifi size={10}/> : <WifiOff size={10}/>}
              {apiMode === 'live' ? 'Apify live' : 'Demo mode · backend offline'}
            </div>
          )}

          <button onClick={startPipeline} style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '6px 14px', background: C.accent, border: 'none',
            borderRadius: 8, color: 'white', fontSize: 12, fontWeight: 600,
            cursor: 'pointer', fontFamily: 'inherit',
          }}>
            <RefreshCw size={12} />
            {running ? 'Restart' : done ? 'Run again' : 'Run pipeline'}
          </button>
        </div>
      </nav>

      {/* Brand Setup Panel — shown before pipeline runs */}
      {!running && !done && (
        <div style={{ padding: '12px 14px 0', flexShrink: 0 }}>
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10,
            padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                Brand Parser — Input source
              </span>
              {briefStatus === 'ready' && (
                <button onClick={clearBrief} style={{ fontSize: 10, color: C.muted, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 3 }}>
                  <X size={10} /> Clear
                </button>
              )}
            </div>

            {/* Method tabs */}
            <div style={{ display: 'flex', gap: 6 }}>
              {[
                { id: 'url', icon: Globe, label: 'Website URL' },
                { id: 'upload', icon: Upload, label: 'Upload doc' },
                { id: 'voice', icon: Mic, label: 'Voice' },
              ].map(({ id, icon: Icon, label }) => (
                <button key={id} onClick={() => { setInputMethod(id); clearBrief() }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 5, padding: '5px 12px',
                    borderRadius: 6, fontSize: 11, fontWeight: 500, cursor: 'pointer',
                    border: `1px solid ${inputMethod === id ? C.accent : C.border}`,
                    background: inputMethod === id ? 'rgba(196,113,58,0.06)' : C.s2,
                    color: inputMethod === id ? C.accent : C.muted,
                    fontFamily: 'inherit',
                  }}>
                  <Icon size={11} /> {label}
                </button>
              ))}
              {inputMethod === 'none' && (
                <span style={{ fontSize: 11, color: C.muted, alignSelf: 'center', marginLeft: 4 }}>
                  — or skip to run with default Aarong profile
                </span>
              )}
            </div>

            {/* URL input */}
            {inputMethod === 'url' && briefStatus !== 'ready' && (
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <input
                  value={brandUrl}
                  onChange={e => setBrandUrl(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && parseBrandUrl()}
                  placeholder="https://www.aarong.com  (or any brand website)"
                  style={{
                    flex: 1, padding: '7px 12px', fontSize: 12, borderRadius: 6,
                    border: `1px solid ${C.border}`, fontFamily: 'inherit',
                    background: C.bg, color: C.primary, outline: 'none',
                  }}
                />
                <button onClick={parseBrandUrl} disabled={!brandUrl.trim() || briefStatus === 'loading'}
                  style={{
                    padding: '7px 14px', fontSize: 11, fontWeight: 600, borderRadius: 6,
                    background: C.accent, color: 'white', border: 'none', cursor: 'pointer',
                    fontFamily: 'inherit', opacity: !brandUrl.trim() ? 0.5 : 1,
                    display: 'flex', alignItems: 'center', gap: 5,
                  }}>
                  {briefStatus === 'loading' ? <><Loader size={10} style={{ animation: 'spin 1s linear infinite' }} /> Scraping…</> : 'Scrape →'}
                </button>
              </div>
            )}

            {/* File upload */}
            {inputMethod === 'upload' && briefStatus !== 'ready' && (
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <label style={{
                  flex: 1, padding: '7px 12px', fontSize: 12, borderRadius: 6,
                  border: `1px dashed ${C.border}`, background: C.s2, color: C.muted,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                }}>
                  <Upload size={12} />
                  {uploadFile ? uploadFile.name : 'Choose PDF, DOCX, or TXT…'}
                  <input type="file" accept=".pdf,.docx,.txt" style={{ display: 'none' }}
                    onChange={e => { setUploadFile(e.target.files[0]); setBriefStatus('idle') }} />
                </label>
                <button onClick={parseBrandDoc} disabled={!uploadFile || briefStatus === 'loading'}
                  style={{
                    padding: '7px 14px', fontSize: 11, fontWeight: 600, borderRadius: 6,
                    background: C.accent, color: 'white', border: 'none', cursor: 'pointer',
                    fontFamily: 'inherit', opacity: !uploadFile ? 0.5 : 1,
                    display: 'flex', alignItems: 'center', gap: 5,
                  }}>
                  {briefStatus === 'loading' ? <><Loader size={10} style={{ animation: 'spin 1s linear infinite' }} /> Parsing…</> : 'Parse →'}
                </button>
              </div>
            )}

            {/* Voice note */}
            {inputMethod === 'voice' && (
              <p style={{ fontSize: 11, color: C.muted }}>
                Voice onboarding is shown in the landing page demo (Whisper). For pipeline runs, use URL or upload to provide brand context.
              </p>
            )}

            {/* Error */}
            {briefStatus === 'error' && (
              <p style={{ fontSize: 11, color: '#DC2626', background: '#FEF2F2', padding: '6px 10px', borderRadius: 6 }}>
                {briefError}
              </p>
            )}

            {/* Ready confirmation */}
            {briefStatus === 'ready' && (
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, background: 'rgba(90,122,94,0.06)', border: '1px solid rgba(90,122,94,0.2)', borderRadius: 6, padding: '8px 12px' }}>
                <CheckCircle size={13} color={C.success} style={{ marginTop: 1, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 11, fontWeight: 600, color: C.success, marginBottom: 2 }}>
                    Brand brief ready — {briefText.length.toLocaleString()} chars extracted
                  </p>
                  <p style={{ fontSize: 10.5, color: C.muted, fontFamily: 'monospace', lineHeight: 1.5 }}>
                    {briefText.slice(0, 180)}…
                  </p>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* 3-column body */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', padding: '14px 14px 0', gap: 0 }}>

        {/* LEFT: agent stepper */}
        <div style={{ width: 230, flexShrink: 0, marginRight: 12, display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: C.muted, letterSpacing: '0.3px',
            textTransform: 'uppercase', marginBottom: 10, paddingLeft: 2 }}>
            GTM Agent Pipeline
          </div>
          <div style={{ flex: 1, background: C.surface, border: `1px solid ${C.border}`,
            borderRadius: 12, overflow: 'hidden' }}>
            {AGENTS.map(agent => (
              <AgentCard key={agent.key} agent={agent} state={agentStates[agent.key]} />
            ))}
            {!running && !done && (
              <div style={{ padding: '20px 14px', textAlign: 'center', color: C.muted, fontSize: 12 }}>
                Press "Run pipeline" to start
              </div>
            )}
          </div>
        </div>

        {/* CENTER: live log */}
        <div style={{ flex: '1 1 0', marginRight: 12, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: C.muted, letterSpacing: '0.3px',
            textTransform: 'uppercase', marginBottom: 10, paddingLeft: 2 }}>
            Live Agent Output
          </div>
          <div style={{ flex: 1, background: C.surface, border: `1px solid ${C.border}`,
            borderRadius: 12, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '12px 16px', borderBottom: `1px solid ${C.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: C.primary }}>Processing Log</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontFamily: 'monospace', fontSize: 10, color: C.muted }}>{logEntries.length} events</span>
                {running && (
                  <div style={{ width: 11, height: 11, border: `2px solid rgba(196,113,58,0.2)`,
                    borderTopColor: C.accent, borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                )}
              </div>
            </div>
            <div ref={logRef} style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
              {logEntries.length === 0 ? (
                <div style={{ padding: 32, textAlign: 'center', color: C.muted, fontSize: 12 }}>
                  {running ? 'Starting pipeline…' : 'Waiting for pipeline to start…'}
                </div>
              ) : logEntries.map((entry, i) => <LogEntry key={i} entry={entry} />)}
            </div>
          </div>
        </div>

        {/* RIGHT: metrics */}
        <div style={{ width: 240, flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: C.muted, letterSpacing: '0.3px',
            textTransform: 'uppercase', marginBottom: 10, paddingLeft: 2 }}>
            Live Metrics
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1, overflowY: 'auto' }}>

            {/* Counters */}
            <div style={{ display: 'flex', gap: 6 }}>
              <Counter label="Leads" value={leads} active={leads > 0} />
              <Counter label="Emails" value={emails} active={emails > 0} />
              <Counter label="Reels" value={reels} active={reels > 0} color="#8B5CF6" />
            </div>

            {/* Funnel */}
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: 14 }}>
              <div style={{ fontSize: 10.5, fontWeight: 600, color: C.muted, textTransform: 'uppercase',
                letterSpacing: '0.5px', marginBottom: 12 }}>
                GTM Funnel
              </div>
              <FunnelChart leads={leads} emails={emails} reels={reels} responses={done ? 3 : 0} />
            </div>

            {/* Apify stats */}
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: 14 }}>
              <div style={{ fontSize: 10.5, fontWeight: 600, color: C.muted, textTransform: 'uppercase',
                letterSpacing: '0.5px', marginBottom: 12 }}>
                Apify Actor Stats
              </div>
              {[
                ['Buyers scanned', leads > 0 ? '2,400' : '—'],
                ['Dataset items', leads > 0 ? `${leads * 12}` : '—'],
                ['Run duration', leads > 0 ? '4m 12s' : '—'],
                ['Actor cost', leads > 0 ? '$0.34' : '—'],
                ['ICP match rate', leads > 0 ? '2.6%' : '—'],
              ].map(([label, val]) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between',
                  alignItems: 'baseline', marginBottom: 6 }}>
                  <span style={{ fontSize: 11, color: C.muted }}>{label}</span>
                  <span style={{ fontFamily: 'monospace', fontSize: 10.5, color: C.primary, fontWeight: 500 }}>{val}</span>
                </div>
              ))}
            </div>

            {/* Real Apify leads */}
            {realLeads.length > 0 && (
              <div style={{ background: C.surface, border: `1px solid rgba(90,122,94,0.3)`,
                borderRadius: 12, padding: 14 }}>
                <div style={{ fontSize: 10.5, fontWeight: 600, textTransform: 'uppercase',
                  letterSpacing: '0.5px', marginBottom: 10,
                  color: C.success, display: 'flex', alignItems: 'center', gap: 5 }}>
                  <Wifi size={10}/> Live Apify Results
                </div>
                {realLeads.slice(0, 4).map((l, i) => (
                  <div key={i} style={{ marginBottom: 8, paddingBottom: 8,
                    borderBottom: i < 3 ? `1px solid ${C.border}` : 'none' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <span style={{ fontSize: 11, fontWeight: 600, color: C.primary,
                        maxWidth: '75%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {l.company}
                      </span>
                      <span style={{ fontFamily: 'monospace', fontSize: 10, fontWeight: 700,
                        color: l.score >= 0.88 ? C.success : C.accent }}>
                        {l.score.toFixed(2)}
                      </span>
                    </div>
                    <p style={{ fontSize: 10, color: C.muted, marginTop: 2, lineHeight: 1.4,
                      display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {l.snippet}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Revenue projection */}
            {done && (
              <div style={{ background: 'rgba(90,122,94,0.06)', border: '1px solid rgba(90,122,94,0.2)',
                borderRadius: 12, padding: 14 }}>
                <div style={{ fontSize: 10.5, fontWeight: 600, color: C.success, textTransform: 'uppercase',
                  letterSpacing: '0.5px', marginBottom: 10 }}>
                  Revenue Projection
                </div>
                {[
                  ['Engaged buyers', '3'],
                  ['Avg deal size', '$85,000 ARR'],
                  ['Est. pipeline', '~$340K ARR'],
                  ['Time to close', '45–90 days'],
                ].map(([label, val]) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between',
                    marginBottom: 6, alignItems: 'baseline' }}>
                    <span style={{ fontSize: 11, color: C.muted }}>{label}</span>
                    <span style={{ fontFamily: 'monospace', fontSize: 10.5, color: C.success, fontWeight: 600 }}>{val}</span>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ padding: '12px 14px 14px', flexShrink: 0 }}>
        <div style={{ background: C.surface, borderRadius: 10, border: `1px solid ${C.border}`,
          padding: '10px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontFamily: 'monospace', fontSize: 13, fontWeight: 600, color: C.primary }}>{pct}%</span>
              <span style={{ fontSize: 12, color: C.muted }}>{running || done ? statusLabel : 'Ready to run'}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {running && <span style={{ fontFamily: 'monospace', fontSize: 12, color: C.muted }}>~{timeLeft}s remaining</span>}
              {done && (
                <button onClick={() => navigate('/results')} style={{
                  padding: '6px 16px', background: C.success, border: 'none', borderRadius: 7,
                  color: 'white', fontSize: 12, fontWeight: 600, cursor: 'pointer',
                  fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6,
                }}>
                  View Results →
                </button>
              )}
              <span style={{ fontSize: 10, color: C.muted }}>Powered by</span>
              <span style={{ fontSize: 10, color: C.accent, fontWeight: 700 }}>Apify</span>
            </div>
          </div>
          <div style={{ height: 5, background: C.s2, borderRadius: 3, overflow: 'hidden' }}>
            <div style={{
              height: '100%', borderRadius: 3,
              background: done
                ? `linear-gradient(to right, ${C.success}, ${C.accent})`
                : `linear-gradient(to right, ${C.accent}, #E8935A)`,
              width: `${pct}%`, transition: 'width 0.08s linear',
            }} />
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {AGENTS.map(agent => (
              <div key={agent.key} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%',
                  background: agentStates[agent.key] === 'done' ? C.success :
                              agentStates[agent.key] === 'running' ? C.accent : C.border,
                  transition: 'background 0.3s ease' }} />
                <span style={{ fontSize: 9.5, fontFamily: 'monospace',
                  color: agentStates[agent.key] === 'done' ? C.success :
                         agentStates[agent.key] === 'running' ? C.accent : C.border }}>
                  {agent.label.split(' ')[0]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
