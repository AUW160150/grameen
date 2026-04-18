import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, CheckCircle } from 'lucide-react'

const STEPS = [
  { id: 'idle' },
  { id: 'recording', label: 'Listening…' },
  {
    id: 'transcribing',
    label: 'আমাদের ব্র্যান্ড আড়ং, আমরা হাতে বোনা কাপড় এবং জৈব পণ্য তৈরি করি…',
    sublabel: 'Transcribing Bengali…',
  },
  {
    id: 'translating',
    label: '"Our brand Aarong creates handwoven textiles and organic goods — we want to reach US consumers and retail buyers."',
    sublabel: 'Translated from Bengali',
  },
  {
    id: 'done',
    brief: {
      brand: 'Aarong — Bangladesh',
      category: 'Handloom textiles · Organic foods',
      usEntry: 'DTC + Specialty retail (Anthropologie, World Market)',
      icpTarget: 'US ethical sourcing managers, boutique buyers',
      action: 'GTM brief generated — agents starting US buyer scan',
    },
  },
]

export default function VoiceWidget() {
  const [step, setStep] = useState(0)
  const [running, setRunning] = useState(false)

  function startDemo() {
    if (running) return
    setRunning(true)
    setStep(1)
    setTimeout(() => setStep(2), 1800)
    setTimeout(() => setStep(3), 3600)
    setTimeout(() => setStep(4), 5200)
    setTimeout(() => setRunning(false), 5400)
  }

  const current = STEPS[step]

  return (
    <div className="bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl p-5 w-full">
      <p className="text-xs font-medium text-cream/50 uppercase tracking-widest mb-4">
        Brand Onboarding — Voice
      </p>

      <AnimatePresence mode="wait">
        {current.id === 'idle' && (
          <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex items-center gap-4">
            <button onClick={startDemo}
              className="relative w-12 h-12 bg-terracotta rounded-full flex items-center justify-center shadow-lg hover:bg-bark-light transition-colors shrink-0">
              <Mic size={20} className="text-cream" />
            </button>
            <p className="text-cream/70 text-sm">Speak your brand story in any language — Bengali, Hindi, Swahili…</p>
          </motion.div>
        )}

        {current.id === 'recording' && (
          <motion.div key="recording" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex items-center gap-4">
            <div className="relative w-12 h-12 shrink-0">
              <span className="absolute inset-0 bg-terracotta/30 rounded-full pulse-ring" />
              <div className="w-12 h-12 bg-terracotta rounded-full flex items-center justify-center">
                <Mic size={20} className="text-cream" />
              </div>
            </div>
            <div className="flex items-end gap-1">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="w-0.5 bg-cream/60 rounded-full wave-bar" style={{ animationDelay: `${i * 0.09}s` }} />
              ))}
            </div>
            <p className="text-cream/70 text-sm">{current.label}</p>
          </motion.div>
        )}

        {(current.id === 'transcribing' || current.id === 'translating') && (
          <motion.div key={current.id} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-terracotta rounded-full animate-pulse" />
              <span className="text-xs text-cream/50">{current.sublabel}</span>
            </div>
            <p className={`text-sm leading-relaxed ${current.id === 'transcribing' ? 'text-cream font-medium' : 'text-cream/80 italic'}`}>
              {current.label}
            </p>
          </motion.div>
        )}

        {current.id === 'done' && (
          <motion.div key="done" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-sage">
              <CheckCircle size={14} />
              <span className="text-xs font-medium text-cream/80">GTM brief generated — agents activated</span>
            </div>
            <div className="bg-white/10 rounded-xl p-4 flex flex-col gap-1.5 text-xs">
              {Object.entries(current.brief).map(([k, v]) => (
                <div key={k} className="flex gap-2">
                  <span className="text-cream/40 shrink-0 capitalize">{k.replace('usEntry', 'US entry').replace('icpTarget', 'ICP')}:</span>
                  <span className="text-cream/80">{v}</span>
                </div>
              ))}
            </div>
            <button onClick={() => { setStep(0); setRunning(false) }}
              className="text-xs text-cream/30 underline underline-offset-2 text-center hover:text-cream/60">
              Try again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
