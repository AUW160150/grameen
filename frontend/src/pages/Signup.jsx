import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, ArrowLeft } from 'lucide-react'
import Nav from '../components/Nav'

export default function Signup() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ email: '', brand: '', country: '', category: '', revenue: '', description: '' })

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

          <div className="mb-8">
            <span className="text-xs font-medium text-terracotta uppercase tracking-widest">Early access</span>
            <h1 className="text-3xl font-bold text-bark mt-2">Bring your brand to the US market.</h1>
            <p className="text-bark-light text-sm mt-3 leading-relaxed">
              We're onboarding 10 brand partners in our first cohort.
              Complete this form and we'll be in touch within 48 hours.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white border border-cream-dark rounded-2xl p-8 flex flex-col gap-4 shadow-sm">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-bark">Work email *</label>
                <input required type="email" value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="you@aarong.com"
                  className="border border-cream-dark rounded-xl px-4 py-2.5 text-sm text-bark placeholder:text-bark-light/40 outline-none focus:border-terracotta/40" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-bark">Brand name *</label>
                <input required type="text" value={form.brand}
                  onChange={e => setForm({ ...form, brand: e.target.value })}
                  placeholder="Aarong"
                  className="border border-cream-dark rounded-xl px-4 py-2.5 text-sm text-bark placeholder:text-bark-light/40 outline-none focus:border-terracotta/40" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-bark">Country</label>
                <input type="text" value={form.country}
                  onChange={e => setForm({ ...form, country: e.target.value })}
                  placeholder="Bangladesh"
                  className="border border-cream-dark rounded-xl px-4 py-2.5 text-sm text-bark placeholder:text-bark-light/40 outline-none focus:border-terracotta/40" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-bark">Annual revenue (USD)</label>
                <select value={form.revenue}
                  onChange={e => setForm({ ...form, revenue: e.target.value })}
                  className="border border-cream-dark rounded-xl px-4 py-2.5 text-sm text-bark outline-none focus:border-terracotta/40 bg-white">
                  <option value="">Select range</option>
                  <option>Under $1M</option>
                  <option>$1M – $10M</option>
                  <option>$10M – $50M</option>
                  <option>$50M+</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-bark">Product category *</label>
              <select required value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}
                className="border border-cream-dark rounded-xl px-4 py-2.5 text-sm text-bark outline-none focus:border-terracotta/40 bg-white">
                <option value="">Select category</option>
                <option>Handloom textiles & apparel</option>
                <option>Organic food & agriculture</option>
                <option>Handicrafts & home goods</option>
                <option>Beauty & wellness</option>
                <option>Jute & natural fiber products</option>
                <option>Other</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-bark">Tell us about your brand</label>
              <textarea value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                placeholder="What makes your brand special? Do you already export? What US channels interest you?"
                rows={4}
                className="border border-cream-dark rounded-xl px-4 py-3 text-sm text-bark placeholder:text-bark-light/40 outline-none focus:border-terracotta/40 resize-none" />
            </div>

            <button type="submit"
              className="bg-terracotta text-cream px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-bark-light transition-colors text-sm mt-2">
              Submit application
              <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
