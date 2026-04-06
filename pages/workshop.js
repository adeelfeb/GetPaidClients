'use client'

import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Footer from '../components/designndev/Footer'
import { useRecaptcha } from '../utils/useRecaptcha'
import { motion } from 'framer-motion'

/** Google Drive file preview embed (client webinar). */
const WEBINAR_DRIVE_EMBED =
  'https://drive.google.com/file/d/1CXYJg83DGpJKfvpKaRg3GGiqMxtdAB3c/preview?embedded=true'

// Drive’s UI is inside a cross-origin iframe — no API to remove controls; sandbox without allow-popups blocks pop-out.
const DRIVE_IFRAME_SANDBOX =
  'allow-scripts allow-same-origin allow-forms allow-modals allow-presentation allow-orientation-lock allow-pointer-lock'

export default function WorkshopPage() {
  const { execute: executeRecaptcha, isAvailable: recaptchaAvailable } = useRecaptcha()
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState(null)

  const mp4Url = typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_WEBINAR_MP4_URL : ''

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
        <title>Workshop | GetPaid Workshop</title>
        <meta
          name="description"
          content="Join our free workshop to learn how to start an AI software reselling business and charge $1000 per client."
        />
        <meta property="og:title" content="Workshop | GetPaid Workshop" />
        <meta property="og:type" content="website" />
      </Head>
      <div className="min-h-screen bg-gradient-to-b from-zinc-700 via-zinc-900 to-black">
        {/* Webinar player — theater-style frame */}
        <section className="relative py-10 sm:py-16 px-4 sm:px-6 lg:px-10 border-b border-amber-950/40 overflow-hidden">
          {/* Atmospheric backdrop */}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#3d3530] via-[#1c1917] to-[#0a0908]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage: `
                linear-gradient(90deg, rgba(212, 175, 55, 0.045) 1px, transparent 1px),
                linear-gradient(rgba(212, 175, 55, 0.045) 1px, transparent 1px),
                linear-gradient(135deg, transparent 40%, rgba(0,0,0,0.25) 100%)
              `,
              backgroundSize: '28px 28px, 28px 28px, auto',
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_45%,transparent_20%,rgba(0,0,0,0.55)_75%,rgba(0,0,0,0.85)_100%)]"
            aria-hidden
          />
          {/* Side curtain strips */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-[min(18%,9rem)] bg-gradient-to-r from-black/55 via-black/20 to-transparent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-[min(18%,9rem)] bg-gradient-to-l from-black/55 via-black/20 to-transparent"
            aria-hidden
          />

          <div className="relative z-10 max-w-6xl mx-auto">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white text-center mb-8 sm:mb-10 tracking-tight px-2 drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
              Workshop in Progress Do Not Close the window.
            </h2>

            <div className="relative mx-auto max-w-5xl px-2 sm:px-0">
              {/* Corner crosses + gold frame accents */}
              <div className="pointer-events-none absolute -top-3 -left-2 sm:-left-4 text-amber-500/35" aria-hidden>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 4v32M4 20h32" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>
              <div className="pointer-events-none absolute -top-3 -right-2 sm:-right-4 text-amber-500/35" aria-hidden>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 4v32M4 20h32" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>
              <div className="pointer-events-none absolute -bottom-3 -left-2 sm:-left-4 text-amber-500/35" aria-hidden>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 4v32M4 20h32" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>
              <div className="pointer-events-none absolute -bottom-3 -right-2 sm:-right-4 text-amber-500/35" aria-hidden>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 4v32M4 20h32" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>

              <div className="relative border border-amber-900/40 bg-gradient-to-b from-stone-900/80 to-black p-[2px] shadow-[0_0_0_1px_rgba(0,0,0,0.5),0_25px_70px_-12px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(212,175,55,0.12)]">
                <div className="relative overflow-hidden bg-black aspect-video w-full max-h-[80vh]">
                  {mp4Url ? (
                    <video
                      src={mp4Url}
                      className="w-full h-full object-contain bg-black"
                      controls
                      controlsList="nodownload noplaybackrate"
                      disablePictureInPicture
                      playsInline
                    />
                  ) : (
                    <iframe
                      title="Workshop video"
                      src={WEBINAR_DRIVE_EMBED}
                      className="absolute inset-0 h-full w-full border-0"
                      allow="autoplay; fullscreen; encrypted-media"
                      allowFullScreen
                      sandbox={DRIVE_IFRAME_SANDBOX}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8 sm:mt-10 flex justify-center">
              <Link
                href="/contact"
                className="inline-flex w-full max-w-md sm:w-auto items-center justify-center px-10 py-4 sm:px-14 sm:py-5 text-lg sm:text-xl font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-none border-2 border-amber-950/50 shadow-[0_8px_30px_-6px_rgba(0,0,0,0.65)] transition-all focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-stone-900"
              >
                Schedule a Call Now
              </Link>
            </div>
          </div>
        </section>

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
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-white">$1000 per client</h3>
                <p className="mt-1 text-sm text-white/90">Learn how to charge premium and keep 100% of the profits.</p>
              </div>
              <div>
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-yellow-400/20 text-yellow-400 mb-3">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-white">AI tools & support</h3>
                <p className="mt-1 text-sm text-white/90">Leverage AI solutions and get guidance along the way.</p>
              </div>
            </div>
          </div>
        </section>

        <main className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-zinc-100/95">
          <div className="max-w-2xl mx-auto">
            <motion.section
              id="workshop-signup"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="relative rounded-3xl bg-white border-2 border-black shadow-xl p-8 sm:p-10 md:p-12 scroll-mt-24"
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
                  <label htmlFor="workshop-email" className="sr-only">
                    Your best email address
                  </label>
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
                  <p
                    className={`mt-4 text-sm font-medium ${message.type === 'success' ? 'text-emerald-600' : 'text-red-600'}`}
                  >
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
