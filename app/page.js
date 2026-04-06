'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Footer from '../components/designndev/Footer'
import RegisterWorkshopModal from '../components/RegisterWorkshopModal'

const fadeUp = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } }
const stagger = (delay = 0) => ({ ...fadeUp, transition: { duration: 0.5, delay } })
const enrolHref = '/workshop'

/** Unsplash — free to use under Unsplash License (https://unsplash.com/license) */
const FOUNDATION_IMAGES = {
  internationalClients:
    'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80',
  firstClient:
    'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
  adsAndScale:
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
}

const ctaHero =
  'inline-flex items-center justify-center px-8 py-4 sm:px-12 sm:py-5 text-lg sm:text-2xl font-bold text-slate-900 bg-yellow-400 hover:bg-yellow-300 rounded-2xl border-2 border-black shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-[#0f2d4a]'

const ctaStripPrimary =
  'inline-flex items-center justify-center px-8 py-4 sm:px-10 sm:py-5 text-lg sm:text-xl font-bold text-slate-900 bg-yellow-400 hover:bg-yellow-300 rounded-2xl border-2 border-black shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2'

const ctaStripOutline =
  'inline-flex items-center justify-center px-8 py-4 sm:px-10 sm:py-5 text-lg sm:text-xl font-bold text-[#1e4976] bg-white hover:bg-[#1e4976] hover:text-white rounded-2xl border-2 border-[#1e4976] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1e4976] focus:ring-offset-2'

const ctaCard =
  'mt-6 inline-flex items-center justify-center px-6 py-3.5 sm:px-8 sm:py-4 text-base sm:text-lg font-bold text-slate-900 bg-yellow-400 hover:bg-yellow-300 border-2 border-black rounded-xl transition-colors w-full md:w-fit md:mx-0 mx-auto'

const SESSION_AUTO_POPUP = 'gpc-workshop-register-auto'

export default function Home() {
  const router = useRouter()
  const [registerOpen, setRegisterOpen] = useState(false)

  const openRegister = useCallback(() => setRegisterOpen(true), [])

  const handleRegisterSubmit = useCallback(() => {
    setRegisterOpen(false)
    router.push(enrolHref)
  }, [router])

  useEffect(() => {
    if (typeof window === 'undefined') return undefined
    let cancelled = false
    const t = window.setTimeout(() => {
      if (cancelled) return
      try {
        if (sessionStorage.getItem(SESSION_AUTO_POPUP) === '1') return
        sessionStorage.setItem(SESSION_AUTO_POPUP, '1')
      } catch {
        /* ignore */
      }
      setRegisterOpen(true)
    }, 4500)
    return () => {
      cancelled = true
      window.clearTimeout(t)
    }
  }, [])

  return (
    <main className="min-h-screen bg-white">
      <RegisterWorkshopModal isOpen={registerOpen} onClose={() => setRegisterOpen(false)} onSubmit={handleRegisterSubmit} />

      <section className="relative min-h-0 flex flex-col items-center pt-8 pb-12 sm:pt-10 sm:pb-16 px-6 sm:px-10 md:px-14 lg:px-20 xl:px-28 overflow-hidden bg-[#0f2d4a] border-b-2 border-black">
        <div className="w-full max-w-6xl xl:max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 sm:mb-5"
          >
            <Link href="/" className="inline-block" aria-label="GetPaid Clients home">
              <Image
                src="/getpaid-logo.svg"
                alt="GetPaid Clients"
                width={280}
                height={62}
                className="h-12 sm:h-14 w-auto mx-auto drop-shadow-md"
                priority
              />
            </Link>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.04 }}
            className="mt-2 sm:mt-3 w-full px-1 sm:px-2 md:px-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.12] sm:leading-[1.1] tracking-normal text-center"
          >
            <span className="block">How to Start an AI Software</span>
            <span className="block mt-1.5 sm:mt-2">Reselling Business From Scratch</span>
            <span className="block mt-2 sm:mt-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white/95">— and</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="mt-3 sm:mt-4 w-full max-w-5xl mx-auto px-2 sm:px-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-[#fcd34d] text-center leading-snug"
          >
            Charge $1,000+ Per Client While Keeping 100% of the Profits
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="mt-3 sm:mt-4 w-full max-w-5xl xl:max-w-6xl mx-auto px-2 sm:px-4 text-base sm:text-lg md:text-xl text-white/90 leading-relaxed"
          >
            No fluff — just the same systems we use to land international clients and scale with AI automation, funnels, and recurring offers.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 sm:mt-5 w-full max-w-md sm:max-w-lg mx-auto"
          >
            <Link
              href={enrolHref}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f2d4a]"
              aria-label="Workshop (opens in new tab)"
            >
              <Image
                src="/hero-section-image.jpeg"
                alt=""
                width={800}
                height={800}
                className="w-full h-auto rounded-xl border-2 border-black shadow-lg object-cover transition-opacity hover:opacity-95"
                priority
              />
            </Link>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 sm:mt-4 w-full max-w-5xl xl:max-w-6xl mx-auto px-2 sm:px-4 text-base sm:text-lg md:text-xl text-white/95 leading-relaxed text-center"
          >
            <i>I will reveal the secrets on how my agency does $200,000/yr in USA</i>
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 sm:mt-8"
          >
            <button type="button" onClick={openRegister} className={ctaHero}>
              Enroll Me for the Workshop
            </button>
          </motion.div>
        </div>
      </section>

      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto rounded-2xl py-16 sm:py-20 px-6 sm:px-8 bg-[#e0eef9] border-2 border-[#1e4976]/20">
          <div className="text-center">
            <motion.h2 {...stagger(0)} className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1e4976] text-center">
              Charge $1000 per client & Keep 100% Profits to yourself...!
            </motion.h2>
            <motion.p {...stagger(0.1)} className="mt-4 text-[#1e4976]/90 text-center max-w-2xl mx-auto text-base sm:text-lg">
              Learn how to GetPaid Recurring Month on Month revenue, In US, UK & India too.
            </motion.p>
            <motion.div {...stagger(0.2)} className="mt-8 flex flex-wrap justify-center gap-4 sm:gap-5">
              <button type="button" onClick={openRegister} className={ctaStripPrimary}>
                Sign Up Now
              </button>
              <button type="button" onClick={openRegister} className={ctaStripOutline}>
                Reserve My Spot
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#1e4976]">
        <div className="max-w-6xl mx-auto">
          <motion.p {...stagger(0)} className="text-yellow-400 font-medium text-sm uppercase tracking-wider text-center">
            Empower Your Journey
          </motion.p>
          <motion.h2 {...stagger(0.05)} className="mt-2 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#fcd34d] text-center">
            Learn How to Build Successful Facebook & Google Ads To Get 100&apos;s Customers Per Day With AI Automation...
          </motion.h2>
          <motion.h3 {...stagger(0.1)} className="mt-2 text-lg sm:text-xl md:text-2xl font-semibold text-white/95 text-center">
            Become an Official Owner of An AI Software...
          </motion.h3>
          <motion.p {...stagger(0.12)} className="mt-2 text-base sm:text-lg text-white/90 text-center">
            Which has 100 More Features like-:
          </motion.p>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'AI Voice Calling Agent',
                price: 'You can Charge $200 Alone for this Feature',
                description:
                  'Unlock the potential of artificial intelligence with our tailored software solutions. We streamline your processes, enhance productivity, and help you stay ahead in your industry. Experience seamless integration and support designed for your growth.',
                cta: 'DISCOVER NOW',
              },
              {
                title: 'CRM- Email Marketing',
                price: 'You can Charge $297 for this',
                description:
                  'Join our comprehensive online courses designed for aspiring marketing agency owners. Learn at your own pace with practical examples and expert guidance. Equip yourself with the knowledge to boost your business and achieve your financial goals.',
                cta: 'ENROLL TODAY',
              },
              {
                title: 'AI Whatsapp Marketing',
                price: 'Packages starting at $250 per month',
                description:
                  "Our marketing consulting services deliver tailored strategies to grow your agency. Gain insights into market trends, and client acquisition techniques, and streamline your campaigns for success. Partner with us, and let's reach those milestones together.",
                cta: 'SCHEDULE A CALL',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                {...stagger(0.15 + i * 0.05)}
                className="rounded-2xl bg-white border-2 border-black shadow-sm p-6 sm:p-8 flex flex-col hover:shadow-md transition-all text-center md:text-left"
              >
                <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="text-blue-600 text-sm mt-1">{item.price}</p>
                <p className="mt-4 text-slate-600 text-sm leading-relaxed flex-1">{item.description}</p>
                <button type="button" onClick={openRegister} className={ctaCard}>
                  {item.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 lg:py-36 w-full max-w-none px-0 bg-gradient-to-b from-white to-slate-50 border-y-2 border-slate-200 overflow-x-hidden">
        <motion.h2
          {...stagger(0)}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 text-center mb-14 sm:mb-16 lg:mb-20 px-4 sm:px-6"
        >
          As seen on
        </motion.h2>
        <motion.div
          {...stagger(0.1)}
          className="flex flex-row flex-nowrap items-stretch w-full shadow-lg"
        >
          <div className="flex-1 min-w-0 bg-white border-y border-l border-r border-slate-200 p-4 sm:p-6 lg:p-10 flex items-center justify-center brightness-100 hover:brightness-110 transition-all duration-300 hover:shadow-xl min-h-[120px] sm:min-h-[150px] lg:min-h-[180px]">
            <div className="relative w-full h-24 sm:h-28 md:h-32 lg:h-40">
              <Image
                src="/as-seen-international-business-times.jpg"
                alt="International Business Times"
                fill
                className="object-contain object-center"
                sizes="33vw"
              />
            </div>
          </div>
          <div className="flex-1 min-w-0 bg-white border-y border-r border-slate-200 p-4 sm:p-6 lg:p-10 flex items-center justify-center brightness-100 hover:brightness-110 transition-all duration-300 hover:shadow-xl min-h-[120px] sm:min-h-[150px] lg:min-h-[180px]">
            <div className="relative w-full h-24 sm:h-28 md:h-32 lg:h-40">
              <Image
                src="/as-seen-asian-news.png"
                alt="Asian News"
                fill
                className="object-contain object-center"
                sizes="33vw"
              />
            </div>
          </div>
          <div className="flex-1 min-w-0 bg-white border-y border-r border-slate-200 p-4 sm:p-6 lg:p-10 flex items-center justify-center brightness-100 hover:brightness-110 transition-all duration-300 hover:shadow-xl min-h-[120px] sm:min-h-[150px] lg:min-h-[180px]">
            <div className="relative w-full h-24 sm:h-28 md:h-32 lg:h-40">
              <Image
                src="/as-seen-business-standard.png"
                alt="Business Standard"
                fill
                className="object-contain object-center"
                sizes="33vw"
              />
            </div>
          </div>
        </motion.div>
      </section>

      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 {...stagger(0)} className="text-2xl sm:text-3xl font-bold text-slate-900">
            What Will You Learn...
          </motion.h2>
        </div>
      </section>

      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-white to-blue-50/50 border-y-2 border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div {...stagger(0)} className="order-2 lg:order-1 text-center lg:text-left">
              <span className="inline-block text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">Foundation #1</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
                How do I find <span className="text-blue-600">International High-Paying</span> Clients from the comfort of my home.
              </h2>
              <p className="mt-6 text-slate-600 leading-relaxed text-base sm:text-lg">
                Join our workshop to discover essential tips and strategies for launching your own marketing agency. You&apos;ll gain insights into finding clients, maximizing income, and leveraging AI solutions to streamline your business.
              </p>
            </motion.div>
            <motion.div {...stagger(0.1)} className="order-1 lg:order-2 relative aspect-video rounded-2xl overflow-hidden border-2 border-slate-200 shadow-xl bg-slate-100">
              <Image
                src={FOUNDATION_IMAGES.internationalClients}
                alt="Video call with remote team — finding international clients from home"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white border-y-2 border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div {...stagger(0)} className="relative aspect-video rounded-2xl overflow-hidden border-2 border-slate-200 shadow-xl bg-slate-100">
              <Image
                src={FOUNDATION_IMAGES.firstClient}
                alt="Business handshake — signing your first high-value client"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
            <motion.div {...stagger(0.1)} className="text-center lg:text-left">
              <span className="inline-block text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">Foundation #2</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
                How to Sign your First client within, <span className="text-blue-600">24 Hours of watching this webinar</span>
              </h2>
              <p className="mt-6 text-slate-600 leading-relaxed text-base sm:text-lg">
                Join our workshop to discover essential tips and strategies for launching your own marketing agency. You&apos;ll gain insights into finding clients, maximizing income, and leveraging AI solutions to streamline your business.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50/50 via-white to-slate-50 border-y-2 border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div {...stagger(0)} className="order-2 lg:order-1 text-center lg:text-left">
              <span className="inline-block text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">Foundation #3</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
                The secret strategy I use to Build successful ads{' '}
                <span className="text-blue-600">within 60 seconds to Get 100 customers Per day</span> with the Same AI Software
              </h2>
              <p className="mt-6 text-slate-600 leading-relaxed text-base sm:text-lg">
                Join our workshop to discover essential tips and strategies for launching your own marketing agency. You&apos;ll gain insights into finding clients, maximizing income, and leveraging AI solutions to streamline your business.
              </p>
            </motion.div>
            <motion.div {...stagger(0.1)} className="order-1 lg:order-2 relative aspect-video rounded-2xl overflow-hidden border-2 border-slate-200 shadow-xl bg-slate-100">
              <Image
                src={FOUNDATION_IMAGES.adsAndScale}
                alt="Marketing analytics dashboard — scaling ads and customer acquisition"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <Footer variant="landing" onEnrollClick={openRegister} />
    </main>
  )
}
