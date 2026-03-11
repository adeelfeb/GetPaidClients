'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Footer from '../components/designndev/Footer'

const fadeUp = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } }
const stagger = (delay = 0) => ({ ...fadeUp, transition: { duration: 0.5, delay } })
const enrolHref = '/workshop'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero: H1 → Image → Subtitle → CTA — darker, brighter denim */}
      <section className="relative min-h-0 flex flex-col items-center pt-10 pb-16 sm:pt-14 sm:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#0f2d4a] border-b-2 border-black">
        <div className="max-w-3xl mx-auto w-full flex flex-col items-center text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight text-center"
          >
            How to Start an AI Software Reselling Business From Scratch...!
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 sm:mt-8 w-full max-w-md sm:max-w-lg mx-auto relative"
          >
            <Image
              src="/hero-section-image.jpeg"
              alt="AI Software Reselling Business"
              width={800}
              height={800}
              className="w-full h-auto rounded-xl border-2 border-black shadow-lg object-cover"
              priority
            />
            {/* Play button centered on image — smaller, blurred, fancy */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              aria-hidden
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/50 backdrop-blur-md flex items-center justify-center shadow-xl ring-2 ring-white/40 ring-offset-2 ring-offset-black/10 border border-white/30">
                <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-slate-800 border-b-[8px] border-b-transparent sm:border-t-[9px] sm:border-b-[9px] sm:border-l-[16px] ml-0.5" />
              </div>
            </div>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 sm:mt-6 text-base sm:text-lg md:text-xl text-white/95 leading-relaxed text-center"
          >
            <i>I will reveal the secrets on how my agency does $200,000/yr in USA</i>
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 sm:mt-10"
          >
            <Link
              href={enrolHref}
              className="inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-slate-900 bg-yellow-400 hover:bg-yellow-300 rounded-xl border-2 border-black shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-[#0f2d4a]"
            >
              Enroll Me for the Workshop
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA strip — light blue box with margin, blue text */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto rounded-2xl py-16 sm:py-20 px-6 sm:px-8 bg-[#e0eef9] border-2 border-[#1e4976]/20">
          <div className="text-center">
            <motion.h2 {...stagger(0)} className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1e4976] text-center">
              Charge $1000 per client & Keep 100% Profits to yourself...!
            </motion.h2>
            <motion.p {...stagger(0.1)} className="mt-4 text-[#1e4976]/90 text-center max-w-2xl mx-auto">
              Learn how to GetPaid Recurring Month on Month revenue, In US, UK & India too.
            </motion.p>
            <motion.div {...stagger(0.2)} className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href={enrolHref}
                className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-slate-900 bg-yellow-400 hover:bg-yellow-300 rounded-lg border-2 border-black transition-colors"
              >
                Sign Up Now
              </Link>
              <Link
                href={enrolHref}
                className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-[#1e4976] bg-white hover:bg-[#1e4976] hover:text-white rounded-lg border-2 border-[#1e4976] transition-colors"
              >
                Reserve My Spot
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products / Solutions — golden headline, white bg */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.p {...stagger(0)} className="text-[#1e4976] font-medium text-sm uppercase tracking-wider text-center">
            Empower Your Journey
          </motion.p>
          <motion.h2 {...stagger(0.05)} className="mt-2 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#b8860b] text-center">
            Learn How to Build Successful Facebook & Google Ads To Get 100&apos;s Customers Per Day With AI Automation...
          </motion.h2>
          <motion.h3 {...stagger(0.1)} className="mt-2 text-lg sm:text-xl md:text-2xl font-semibold text-slate-600 text-center">
            Become an Official Owner of An AI Software...
          </motion.h3>
          <motion.p {...stagger(0.12)} className="mt-2 text-base sm:text-lg text-slate-600 text-center">
            Which has 100 More Features like-:
          </motion.p>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'AI Voice Calling Agent',
                price: 'You can Charge $200 Alone for this Feature',
                description: 'Unlock the potential of artificial intelligence with our tailored software solutions. We streamline your processes, enhance productivity, and help you stay ahead in your industry. Experience seamless integration and support designed for your growth.',
                cta: 'DISCOVER NOW',
                href: enrolHref,
              },
              {
                title: 'CRM- Email Marketing',
                price: 'You can Charge $297 for this',
                description: 'Join our comprehensive online courses designed for aspiring marketing agency owners. Learn at your own pace with practical examples and expert guidance. Equip yourself with the knowledge to boost your business and achieve your financial goals.',
                cta: 'ENROLL TODAY',
                href: enrolHref,
              },
              {
                title: 'AI Whatsapp Marketing',
                price: 'Packages starting at $250 per month',
                description: 'Our marketing consulting services deliver tailored strategies to grow your agency. Gain insights into market trends, and client acquisition techniques, and streamline your campaigns for success. Partner with us, and let\'s reach those milestones together.',
                cta: 'SCHEDULE A CALL',
                href: enrolHref,
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
                <Link
                  href={item.href}
                  className="mt-6 inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold text-slate-900 bg-yellow-400 hover:bg-yellow-300 border-2 border-black rounded-lg transition-colors w-full md:w-fit md:mx-0 mx-auto"
                >
                  {item.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* As seen on — bright by default, even brighter on hover */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-slate-50 border-y-2 border-slate-200">
        <div className="max-w-5xl mx-auto">
          <motion.h2 {...stagger(0)} className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-12">
            As seen on
          </motion.h2>
          <motion.div {...stagger(0.1)} className="flex flex-wrap items-center justify-center gap-10 sm:gap-16">
            <div className="rounded-xl bg-white border border-slate-200 shadow-lg p-6 flex items-center justify-center brightness-100 hover:brightness-110 transition-all duration-300 hover:shadow-xl hover:border-slate-300 min-h-[100px] w-[220px] sm:w-[260px] md:w-[280px]">
              <div className="relative w-full h-16 sm:h-20 md:h-24">
                <Image
                  src="/as-seen-international-business-times.jpg"
                  alt="International Business Times"
                  fill
                  className="object-contain object-center"
                  sizes="280px"
                />
              </div>
            </div>
            <div className="rounded-xl bg-white border border-slate-200 shadow-lg p-6 flex items-center justify-center brightness-100 hover:brightness-110 transition-all duration-300 hover:shadow-xl hover:border-slate-300 min-h-[100px] w-[160px] sm:w-[180px] md:w-[200px]">
              <div className="relative w-full h-16 sm:h-20 md:h-24">
                <Image
                  src="/as-seen-asian-news.png"
                  alt="Asian News"
                  fill
                  className="object-contain object-center"
                  sizes="200px"
                />
              </div>
            </div>
            <div className="rounded-xl bg-white border border-slate-200 shadow-lg p-6 flex items-center justify-center brightness-100 hover:brightness-110 transition-all duration-300 hover:shadow-xl hover:border-slate-300 min-h-[100px] w-[180px] sm:w-[200px] md:w-[220px]">
              <div className="relative w-full h-16 sm:h-20 md:h-24">
                <Image
                  src="/as-seen-business-standard.png"
                  alt="Business Standard"
                  fill
                  className="object-contain object-center"
                  sizes="220px"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What Will You Learn */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 {...stagger(0)} className="text-2xl sm:text-3xl font-bold text-slate-900">
            What Will You Learn...
          </motion.h2>
        </div>
      </section>

      {/* Foundation #1 - Premium */}
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
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-slate-100" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Foundation #2 - Premium */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white border-y-2 border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div {...stagger(0)} className="relative aspect-video rounded-2xl overflow-hidden border-2 border-slate-200 shadow-xl bg-slate-100">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-blue-100/30" />
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

      {/* Foundation #3 - Premium */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50/50 via-white to-slate-50 border-y-2 border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div {...stagger(0)} className="order-2 lg:order-1 text-center lg:text-left">
              <span className="inline-block text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">Foundation #3</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
                The secret strategy I use to Build successful ads <span className="text-blue-600">within 60 seconds to Get 100 customers Per day</span> with the Same AI Software
              </h2>
              <p className="mt-6 text-slate-600 leading-relaxed text-base sm:text-lg">
                Join our workshop to discover essential tips and strategies for launching your own marketing agency. You&apos;ll gain insights into finding clients, maximizing income, and leveraging AI solutions to streamline your business.
              </p>
            </motion.div>
            <motion.div {...stagger(0.1)} className="order-1 lg:order-2 relative aspect-video rounded-2xl overflow-hidden border-2 border-slate-200 shadow-xl bg-slate-100">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-slate-100" />
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
