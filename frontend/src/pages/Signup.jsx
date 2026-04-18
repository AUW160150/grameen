import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, CheckCircle, ArrowLeft, Globe, Upload, FileText, X, Mic, MicOff } from 'lucide-react'
import Nav from '../components/Nav'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000'

export default function Signup() {
  const [submitted, setSubmitted] = useState(false)
  const [mode, setMode] = useState('brand')
  const [form, setForm] = useState({
    email: '', brand: '', country: '', category: '',
    revenue: '', description: '', handle: '', followers: '',
    websiteUrl: '',
  })
  const [briefMethod, setBriefMethod] = useState(null) // null | 'url' | 'upload'
  const [uploadFile, setUploadFile] = useState(null)
  const [briefStatus, setBriefStatus] = useState('idle') // idle | loading | ready | error
  const [briefPreview, setBriefPreview] = useState('')
  const [briefError, setBriefError] = useState('')
  const fileRef = useRef()
  const navigate = useNavigate()
  const recognitionRef = useRef(null)
  const [voiceState, setVoiceState] = useState('idle') // idle | recording | unsupported
  const [voiceLang, setVoiceLang] = useState('en-US')

  const VOICE_LANGS = [
    { code: 'en-US', label: 'English' },
    { code: 'bn-BD', label: 'বাংলা' },
    { code: 'hi-IN', label: 'हिन्दी' },
    { code: 'ur-PK', label: 'اردو' },
    { code: 'si-LK', label: 'සිංහල' },
    { code: 'es-GT', label: 'Español' },
    { code: 'sw-KE', label: 'Swahili' },
  ]

  function toggleVoice() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SR) { setVoiceState('unsupported'); return }

    if (voiceState === 'recording') {
      recognitionRef.current?.stop()
      setVoiceState('idle')
      return
    }

    const rec = new SR()
    rec.lang = voiceLang
    rec.continuous = true
    rec.interimResults = true
    recognitionRef.current = rec

    let finalText = form.description

    rec.onresult = (e) => {
      let interim = ''
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript
        if (e.results[i].isFinal) finalText += (finalText ? ' ' : '') + t
        else interim = t
      }
      setForm(f => ({ ...f, description: finalText + (interim ? ' ' + interim : '') }))
    }
    rec.onerror = () => setVoiceState('idle')
    rec.onend = () => setVoiceState('idle')
    rec.start()
    setVoiceState('recording')
  }

  useEffect(() => () => recognitionRef.current?.stop(), [])

  async function scrapeUrl() {
    if (!form.websiteUrl.trim()) return
    setBriefStatus('loading')
    setBriefError('')
    try {
      const res = await fetch(
        `${API_BASE}/api/brand/from-url?url=${encodeURIComponent(form.websiteUrl)}`,
        { method: 'POST' }
      )
      if (!res.ok) throw new Error()
      const data = await res.json()
      setBriefPreview(data.text.slice(0, 300))
      setBriefStatus('ready')
    } catch {
      setBriefStatus('error')
      setBriefError('Could not reach that URL. Check the backend is running, or try uploading a document instead.')
    }
  }

  async function parseDoc(file) {
    if (!file) return
    setUploadFile(file)
    setBriefStatus('loading')
    setBriefError('')
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch(`${API_BASE}/api/brand/from-doc`, { method: 'POST', body: fd })
      if (!res.ok) throw new Error()
      const data = await res.json()
      setBriefPreview(data.text.slice(0, 300))
      setBriefStatus('ready')
    } catch {
      setBriefStatus('error')
      setBriefError('Could not parse that file. Try PDF, DOCX, or TXT.')
    }
  }

  function clearBrief() {
    setBriefStatus('idle')
    setBriefPreview('')
    setBriefError('')
    setUploadFile(null)
    setForm(f => ({ ...f, websiteUrl: '' }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-cream flex flex-col">
        <Nav />
        <div className="flex-1 flex items-center justify-center px-6 pt-16">
          <div className="max-w-md w-full text-center flex flex-col items-center gap-6">
            <div className="w-16 h-16 bg-sage/10 rounded-full flex items-center justify-center">
              <CheckCircle size={32} className="text-sage" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-bark mb-2">
                {mode === 'brand' ? 'Application received' : "You're in the queue"}
              </h2>
              <p className="text-bark-light text-sm leading-relaxed">
                {mode === 'brand'
                  ? briefStatus === 'ready'
                    ? "We've parsed your brand brief. Your Apify buyer scan is being queued — you'll see results in the dashboard within minutes."
                    : "We review applications within 48 hours. You'll get a calendar invite to kick off your brand's GTM scan."
                  : "We review applications within 48 hours. You'll get a calendar invite to set up your first affiliate reel."}
              </p>
            </div>
            {mode === 'brand' && briefStatus === 'ready' && (
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-terracotta text-cream px-6 py-3 rounded-full font-semibold text-sm hover:bg-bark-light transition-colors flex items-center gap-2"
              >
                Go to dashboard <ArrowRight size={14} />
              </button>
            )}
            <Link to="/" className="flex items-center gap-2 text-sm text-bark-light hover:text-bark">
              <ArrowLeft size={14} /> Back to home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <Nav />
      <div className="flex-1 flex items-center justify-center px-6 pt-16 py-16">
        <div className="max-w-xl w-full">
          <Link to="/" className="flex items-center gap-2 text-sm text-bark-light hover:text-bark mb-8">
            <ArrowLeft size={14} /> Back
          </Link>

          <div className="mb-6">
            <span className="text-xs font-medium text-terracotta uppercase tracking-widest">Early access</span>
            <h1 className="text-3xl font-bold text-bark mt-2">Join the Grameen network.</h1>
            <p className="text-bark-light text-sm mt-3 leading-relaxed">
              Whether you're a brand ready for the US or a creator ready to earn — we're building for both.
            </p>
          </div>

          {/* Mode toggle */}
          <div className="flex gap-2 mb-6 bg-cream-dark p-1 rounded-xl">
            {[['brand', 'I have a brand'], ['creator', 'I create content']].map(([val, label]) => (
              <button key={val} type="button" onClick={() => setMode(val)}
                className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  mode === val ? 'bg-white text-bark shadow-sm' : 'text-bark-light hover:text-bark'
                }`}>
                {label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="bg-white border border-cream-dark rounded-2xl p-8 flex flex-col gap-5 shadow-sm">

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-bark">Email *</label>
              <input required type="email" value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder={mode === 'brand' ? 'you@aarong.com' : 'you@gmail.com'}
                className="border border-cream-dark rounded-xl px-4 py-2.5 text-sm text-bark placeholder:text-bark-light/40 outline-none focus:border-terracotta/40" />
            </div>

            {mode === 'brand' ? (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-bark">Brand name *</label>
                    <input required type="text" value={form.brand}
                      onChange={e => setForm({ ...form, brand: e.target.value })}
                      placeholder="Aarong"
                      className="border border-cream-dark rounded-xl px-4 py-2.5 text-sm text-bark placeholder:text-bark-light/40 outline-none focus:border-terracotta/40" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-bark">Country</label>
                    <input type="text" value={form.country}
                      onChange={e => setForm({ ...form, country: e.target.value })}
                      placeholder="Bangladesh"
                      className="border border-cream-dark rounded-xl px-4 py-2.5 text-sm text-bark placeholder:text-bark-light/40 outline-none focus:border-terracotta/40" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-bark">Annual revenue</label>
                    <select value={form.revenue} onChange={e => setForm({ ...form, revenue: e.target.value })}
                      className="border border-cream-dark rounded-xl px-4 py-2.5 text-sm text-bark outline-none focus:border-terracotta/40 bg-white">
                      <option value="">Select range</option>
                      <option>Under $1M</option>
                      <option>$1M – $10M</option>
                      <option>$10M – $50M</option>
                      <option>$50M+</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-bark">Product category *</label>
                    <select required value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                      className="border border-cream-dark rounded-xl px-4 py-2.5 text-sm text-bark outline-none focus:border-terracotta/40 bg-white">
                      <option value="">Select</option>
                      <option>Handloom textiles & apparel</option>
                      <option>Organic food & agriculture</option>
                      <option>Handicrafts & home goods</option>
                      <option>Beauty & wellness</option>
                      <option>Jute & natural fiber products</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-medium text-bark">Tell us about your brand</label>
                    <div className="flex items-center gap-2">
                      {/* Language selector */}
                      <select
                        value={voiceLang}
                        onChange={e => setVoiceLang(e.target.value)}
                        className="text-xs border border-cream-dark rounded-lg px-2 py-1 text-bark-light bg-cream outline-none"
                      >
                        {VOICE_LANGS.map(l => (
                          <option key={l.code} value={l.code}>{l.label}</option>
                        ))}
                      </select>
                      {/* Mic button */}
                      <button
                        type="button"
                        onClick={toggleVoice}
                        title={voiceState === 'unsupported' ? 'Voice not supported in this browser' : voiceState === 'recording' ? 'Stop recording' : 'Speak your brand story'}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                          voiceState === 'recording'
                            ? 'bg-red-50 border-red-200 text-red-600 animate-pulse'
                            : voiceState === 'unsupported'
                            ? 'bg-cream border-cream-dark text-bark-light/40 cursor-not-allowed'
                            : 'bg-cream border-cream-dark text-bark-light hover:border-terracotta/40 hover:text-terracotta'
                        }`}
                      >
                        {voiceState === 'recording' ? <MicOff size={11} /> : <Mic size={11} />}
                        {voiceState === 'recording' ? 'Stop' : 'Speak'}
                      </button>
                    </div>
                  </div>

                  {voiceState === 'recording' && (
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50 border border-red-100 rounded-lg">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse shrink-0" />
                      <span className="text-xs text-red-600">Recording in {VOICE_LANGS.find(l => l.code === voiceLang)?.label} — speak now, text appears below</span>
                    </div>
                  )}
                  {voiceState === 'unsupported' && (
                    <p className="text-xs text-bark-light">Voice input requires Chrome or Edge. Use the text box instead.</p>
                  )}

                  <textarea
                    value={form.description}
                    onChange={e => setForm({ ...form, description: e.target.value })}
                    placeholder="What makes your brand special? Do you already export? What US channels interest you? — or press Speak to record in your language"
                    rows={3}
                    className={`border rounded-xl px-4 py-3 text-sm text-bark placeholder:text-bark-light/40 outline-none resize-none transition-colors ${
                      voiceState === 'recording' ? 'border-red-200 bg-red-50/30' : 'border-cream-dark focus:border-terracotta/40'
                    }`}
                  />
                </div>

                {/* ── Brand materials section ── */}
                <div className="flex flex-col gap-3">
                  <div>
                    <label className="text-xs font-medium text-bark block mb-0.5">Brand materials</label>
                    <p className="text-xs text-bark-light">Share your website or a document so our agents can build your GTM brief immediately.</p>
                  </div>

                  {/* Method toggle */}
                  {briefStatus !== 'ready' && (
                    <div className="flex gap-2">
                      <button type="button"
                        onClick={() => { setBriefMethod('url'); clearBrief() }}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border transition-colors ${
                          briefMethod === 'url'
                            ? 'bg-terracotta/8 border-terracotta/30 text-terracotta'
                            : 'bg-cream border-cream-dark text-bark-light hover:text-bark'
                        }`}>
                        <Globe size={12} /> Website URL
                      </button>
                      <button type="button"
                        onClick={() => { setBriefMethod('upload'); clearBrief() }}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border transition-colors ${
                          briefMethod === 'upload'
                            ? 'bg-terracotta/8 border-terracotta/30 text-terracotta'
                            : 'bg-cream border-cream-dark text-bark-light hover:text-bark'
                        }`}>
                        <Upload size={12} /> Upload doc
                      </button>
                      <span className="self-center text-xs text-bark-light/50">PDF · DOCX · TXT</span>
                    </div>
                  )}

                  {/* URL input */}
                  {briefMethod === 'url' && briefStatus !== 'ready' && (
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={form.websiteUrl}
                        onChange={e => setForm({ ...form, websiteUrl: e.target.value })}
                        onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), scrapeUrl())}
                        placeholder="https://www.aarong.com"
                        className="flex-1 border border-cream-dark rounded-xl px-4 py-2.5 text-sm text-bark placeholder:text-bark-light/40 outline-none focus:border-terracotta/40"
                      />
                      <button type="button" onClick={scrapeUrl}
                        disabled={!form.websiteUrl.trim() || briefStatus === 'loading'}
                        className="bg-terracotta text-cream text-xs font-semibold px-4 py-2.5 rounded-xl hover:bg-bark-light transition-colors disabled:opacity-50 whitespace-nowrap">
                        {briefStatus === 'loading' ? 'Scraping…' : 'Scrape →'}
                      </button>
                    </div>
                  )}

                  {/* File upload */}
                  {briefMethod === 'upload' && briefStatus !== 'ready' && (
                    <label className="flex items-center gap-3 border-2 border-dashed border-cream-dark rounded-xl px-4 py-4 cursor-pointer hover:border-terracotta/40 transition-colors">
                      <div className="w-9 h-9 bg-cream-dark rounded-lg flex items-center justify-center shrink-0">
                        <FileText size={16} className="text-bark-light" />
                      </div>
                      <div className="flex-1">
                        {briefStatus === 'loading' ? (
                          <p className="text-xs text-bark-light">Parsing document…</p>
                        ) : uploadFile ? (
                          <p className="text-xs text-bark font-medium">{uploadFile.name}</p>
                        ) : (
                          <>
                            <p className="text-xs font-medium text-bark">Drop your brand deck, catalog, or brief</p>
                            <p className="text-xs text-bark-light mt-0.5">PDF, DOCX, or TXT · up to 10MB</p>
                          </>
                        )}
                      </div>
                      <input type="file" accept=".pdf,.docx,.txt" className="hidden"
                        ref={fileRef}
                        onChange={e => { if (e.target.files[0]) parseDoc(e.target.files[0]) }} />
                    </label>
                  )}

                  {/* Error */}
                  {briefStatus === 'error' && (
                    <p className="text-xs text-red-600 bg-red-50 px-3 py-2 rounded-lg">{briefError}</p>
                  )}

                  {/* Ready state */}
                  {briefStatus === 'ready' && (
                    <div className="flex items-start gap-3 bg-sage/5 border border-sage/20 rounded-xl p-4">
                      <CheckCircle size={16} className="text-sage mt-0.5 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-sage mb-1">
                          Brand brief extracted — agents are ready to run
                        </p>
                        <p className="text-xs text-bark-light font-mono leading-relaxed line-clamp-3">
                          {briefPreview}…
                        </p>
                      </div>
                      <button type="button" onClick={clearBrief} className="shrink-0 text-bark-light hover:text-bark">
                        <X size={13} />
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-bark">Instagram handle *</label>
                    <input required type="text" value={form.handle}
                      onChange={e => setForm({ ...form, handle: e.target.value })}
                      placeholder="@tasnim.weaves"
                      className="border border-cream-dark rounded-xl px-4 py-2.5 text-sm text-bark placeholder:text-bark-light/40 outline-none focus:border-terracotta/40" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-bark">Followers</label>
                    <select value={form.followers} onChange={e => setForm({ ...form, followers: e.target.value })}
                      className="border border-cream-dark rounded-xl px-4 py-2.5 text-sm text-bark outline-none focus:border-terracotta/40 bg-white">
                      <option value="">Select range</option>
                      <option>Under 10K</option>
                      <option>10K – 50K</option>
                      <option>50K – 200K</option>
                      <option>200K+</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-bark">Country *</label>
                    <input required type="text" value={form.country}
                      onChange={e => setForm({ ...form, country: e.target.value })}
                      placeholder="Bangladesh"
                      className="border border-cream-dark rounded-xl px-4 py-2.5 text-sm text-bark placeholder:text-bark-light/40 outline-none focus:border-terracotta/40" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-bark">Content niche</label>
                    <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                      className="border border-cream-dark rounded-xl px-4 py-2.5 text-sm text-bark outline-none focus:border-terracotta/40 bg-white">
                      <option value="">Select</option>
                      <option>Fashion & lifestyle</option>
                      <option>Food & wellness</option>
                      <option>Artisan & craft</option>
                      <option>Sustainable living</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div className="bg-terracotta/5 border border-terracotta/15 rounded-xl p-4 text-xs text-bark-light leading-relaxed">
                  <span className="font-semibold text-bark">Earn 8–15% affiliate commission</span> on every US sale your content drives.
                  We handle tracking, attribution, and monthly payouts. You just create.
                </div>
              </>
            )}

            <button type="submit"
              className="bg-terracotta text-cream px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-bark-light transition-colors text-sm mt-1">
              {mode === 'brand' ? 'Submit brand application' : 'Apply as creator'}
              <ArrowRight size={16} />
            </button>

            {mode === 'brand' && briefStatus === 'ready' && (
              <p className="text-xs text-center text-bark-light -mt-2">
                Your brief will be used immediately to run the buyer scan
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
