'use client'

import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Footer from '../components/designndev/Footer'
import { useRecaptcha } from '../utils/useRecaptcha'
import { motion } from 'framer-motion'

export default function WorkshopPage() {
  const { execute: executeRecaptcha, isAvailable: recaptchaAvailable } = useRecaptcha()
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = recaptchaAvailable ? await executeRecaptcha() : null
    if (recaptchaAvailable && !token) {
      setMessage({ type: 'error', text: 'Security verification failed. Please refresh and try again.' })
      return
    }
    setIsSubmitting(true)
    setMessage(null)
    try {
      const res = await fetch('/api/workshop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), recaptchaToken: token }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok) {
        setMessage({ type: 'success', text: data.message || "You're on the list! We'll be in touch soon." })
        setEmail('')
      } else {
        setMessage({ type: 'error', text: data.message || 'Something went wrong. Please try again.' })
      }
    } catch {
      setMessage({ type: 'error', text: 'Network error. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Head>
        <title>Workshop | GetPaid Workshop — Launch Your Marketing Journey</title>
        <meta name="description" content="Join our free workshop to learn how to start an AI software reselling business and charge $1000 per client. Launch your marketing journey today." />
        <meta property="og:title" content="Workshop | GetPaid Workshop" />
        <meta property="og:type" content="website" />
      </Head>
      <div className="min-h-screen bg-white">
        {/* Hero — reduced height/padding */}
        <section className="relative flex items-center pt-6 pb-8 sm:pt-8 sm:pb-10 px-4 sm:px-6 lg:px-8 overflow-hidden bg-blue-600 border-b-2 border-black">
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight"
            >
              Launch Your Marketing Journey
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-5 sm:mt-6 text-lg sm:text-xl text-white/95 leading-relaxed"
            >
              Are you ready to take the first step toward building your own marketing agency? Join us as we explore proven strategies and valuable insights that can set you on the path to success. Discover how you can attract clients and generate income through effective online marketing.
            </motion.p>
          </div>
        </section>

        {/* Benefits strip */}
        <section className="py-10 sm:py-12 px-4 sm:px-6 lg:px-8 bg-blue-600 border-y-2 border-black">
          <div className="max-w-4xl mx-auto">
            <p className="text-center text-yellow-400 text-sm font-medium uppercase tracking-wider mb-6">
              What you get
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
              <div>
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-yellow-400/20 text-yellow-400 mb-3">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-white">Proven strategies</h3>
                <p className="mt-1 text-sm text-white/90">Step-by-step playbooks that work for real agencies.</p>
              </div>
              <div>
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-yellow-400/20 text-yellow-400 mb-3">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-white">$1000 per client</h3>
                <p className="mt-1 text-sm text-white/90">Learn how to charge premium and keep 100% of the profits.</p>
              </div>
              <div>
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-yellow-400/20 text-yellow-400 mb-3">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-white">AI tools & support</h3>
                <p className="mt-1 text-sm text-white/90">Leverage AI solutions and get guidance along the way.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Main signup card */}
        <main className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="relative rounded-3xl bg-white border-2 border-black shadow-xl p-8 sm:p-10 md:p-12"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="inline-block px-4 py-1.5 rounded-full bg-yellow-400 text-slate-900 text-sm font-semibold">
                  Free workshop
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mt-2">
                Join Our Exciting Workshop
              </h2>
              <p className="mt-4 text-slate-600 text-center max-w-lg mx-auto">
                Ready to elevate your marketing skills? Sign up now to gain insights and strategies that will empower you to build a successful agency. This workshop is your first step towards turning your goals into reality.
              </p>
              <form onSubmit={handleSubmit} className="mt-10">
                <div className="flex flex-col sm:flex-row gap-3">
                  <label htmlFor="workshop-email" className="sr-only">Your best email address</label>
                  <input
                    id="workshop-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your best email address"
                    required
                    disabled={isSubmitting}
                    className="flex-1 min-w-0 px-5 py-3.5 rounded-xl border-2 border-slate-200 bg-slate-50/50 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:opacity-60 transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-slate-900 bg-yellow-400 hover:bg-yellow-300 disabled:opacity-60 disabled:cursor-not-allowed transition-all border-2 border-black focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-white"
                  >
                    {isSubmitting ? 'Joining…' : 'Join Now'}
                  </button>
                </div>
                {message && (
                  <p className={`mt-4 text-sm font-medium ${message.type === 'success' ? 'text-emerald-600' : 'text-red-600'}`}>
                    {message.text}
                  </p>
                )}
              </form>
              <p className="mt-6 text-slate-500 text-sm text-center">
                By clicking Join Now, you&apos;re agreeing to our Terms and Conditions. We&apos;ll only use your email to send workshop updates.
              </p>
            </motion.section>

            <p className="mt-10 text-center">
              <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1">
                <span aria-hidden>←</span> Back to Home
              </Link>
            </p>
          </div>
        </main>

        {/* Trust line */}
        <section className="py-10 px-4 sm:px-6 lg:px-8 bg-blue-600 border-t-2 border-black">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-white/90 text-sm">
              Join others who are building their marketing agencies. No spam — just valuable content and workshop invites.
            </p>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}
