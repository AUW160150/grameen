import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, ArrowLeft } from 'lucide-react'
import Nav from '../components/Nav'

export default function Signup() {
  const [submitted, setSubmitted] = useState(false)
  const [mode, setMode] = useState('brand') // 'brand' | 'creator'
  const [form, setForm] = useState({ email: '', brand: '', country: '', category: '', revenue: '', description: '', handle: '', followers: '' })

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
              <h2 className="text-2xl font-bold text-bark mb-2">You're in the queue</h2>
              <p className="text-bark-light text-sm leading-relaxed">
                We review applications within 48 hours. You'll get a calendar invite to set up
                your brand's GTM brief and kick off your Apify buyer scan.
              </p>
            </div>
            <Link to="/" className="flex items-center gap-2 text-sm text-bark-light hover:text-bark">
              <ArrowLeft size={14} />
              Back to home
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
            <ArrowLeft size={14} />
            Back
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

          <form onSubmit={handleSubmit} className="bg-white border border-cream-dark rounded-2xl p-8 flex flex-col gap-4 shadow-sm">

            {/* Email — always shown */}
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
                  <label className="text-xs font-medium text-bark">Tell us about your brand</label>
                  <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                    placeholder="What makes your brand special? Do you already export? What US channels interest you?"
                    rows={3} className="border border-cream-dark rounded-xl px-4 py-3 text-sm text-bark placeholder:text-bark-light/40 outline-none focus:border-terracotta/40 resize-none" />
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
              className="bg-terracotta text-cream px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-bark-light transition-colors text-sm mt-2">
              {mode === 'brand' ? 'Submit brand application' : 'Apply as creator'}
              <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
