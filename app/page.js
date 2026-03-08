'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Footer from '../components/designndev/Footer'

const fadeUp = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } }
const stagger = (delay = 0) => ({ ...fadeUp, transition: { duration: 0.5, delay } })

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero: blue background, no header */}
      <section className="relative min-h-[70vh] flex items-center pt-10 pb-16 sm:pt-14 sm:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-blue-600 border-b-2 border-black">
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight"
          >
            How to start & Scale an Ai Software Business within the next 30 days without Learning how to code.....!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-5 sm:mt-6 text-lg sm:text-xl text-white/95 leading-relaxed"
          >
            I will be revealing how my Software Business makes 200,000/yr
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 sm:mt-10"
          >
            <Link
              href="/workshop"
              className="inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-slate-900 bg-yellow-400 hover:bg-yellow-300 rounded-xl border-2 border-black shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-blue-600"
            >
              Enroll Me for the Workshop
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-blue-600 border-y-2 border-black">
        <div className="max-w-4xl mx-auto">
          <motion.h2 {...stagger(0)} className="text-2xl sm:text-3xl font-bold text-white text-center">
            Charge $1000 per client & Keep 100% Profits to yourself…!
          </motion.h2>
          <motion.p {...stagger(0.1)} className="mt-4 text-white/90 text-center max-w-2xl mx-auto">
            Join our free webinar to learn the secrets of launching your own marketing agency. Gain insights and practical tips to thrive in the digital landscape.
          </motion.p>
          <motion.div {...stagger(0.2)} className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/workshop"
              className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-slate-900 bg-yellow-400 hover:bg-yellow-300 rounded-lg border-2 border-black transition-colors"
            >
              Sign Up Now
            </Link>
            <Link
              href="/workshop"
              className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-transparent hover:bg-white/10 rounded-lg border-2 border-white transition-colors"
            >
              Reserve My Spot
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Products / Solutions */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.p {...stagger(0)} className="text-blue-600 font-medium text-sm uppercase tracking-wider text-center">
            Empower Your Journey
          </motion.p>
          <motion.h2 {...stagger(0.05)} className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 text-center">
            Transform Your Ideas into Successful Solutions
          </motion.h2>
          <motion.h3 {...stagger(0.1)} className="mt-2 text-xl sm:text-2xl font-semibold text-slate-600 text-center">
            Become an Official Owner of An AI Software
          </motion.h3>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'AI Voice Calling Agent',
                price: 'Starting at just $200/month',
                description: 'Unlock the potential of artificial intelligence with our tailored software solutions. We streamline your processes, enhance productivity, and help you stay ahead in your industry.',
                cta: 'DISCOVER NOW',
                href: '/workshop',
              },
              {
                title: 'CRM- Email Marketing',
                price: 'Starting at $199 each',
                description: 'Join our comprehensive online courses designed for aspiring marketing agency owners. Learn at your own pace with practical examples and expert guidance.',
                cta: 'ENROLL TODAY',
                href: '/workshop',
              },
              {
                title: 'AI Whatsapp Marketing',
                price: 'Packages starting at $250',
                description: 'Our marketing consulting services deliver tailored strategies to grow your agency. Gain insights into market trends, client acquisition, and streamlined campaigns.',
                cta: 'SCHEDULE A CALL',
                href: '/contact',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                {...stagger(0.15 + i * 0.05)}
                className="rounded-2xl bg-white border-2 border-black shadow-sm p-6 sm:p-8 flex flex-col hover:shadow-md transition-all"
              >
                <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="text-blue-600 text-sm mt-1">{item.price}</p>
                <p className="mt-4 text-slate-600 text-sm leading-relaxed flex-1">{item.description}</p>
                <Link
                  href={item.href}
                  className="mt-6 inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold text-slate-900 bg-yellow-400 hover:bg-yellow-300 border-2 border-black rounded-lg transition-colors w-fit"
                >
                  {item.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-blue-600 border-y-2 border-black">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p {...stagger(0)} className="text-yellow-400 font-medium text-sm uppercase tracking-wider">
            What Our Clients Say
          </motion.p>
          <motion.h2 {...stagger(0.05)} className="mt-2 text-2xl sm:text-3xl font-bold text-white">
            Real Stories from Our Happy Clients
          </motion.h2>
          <motion.div {...stagger(0.15)} className="mt-10 rounded-2xl bg-white/10 border-2 border-white p-8 sm:p-10 text-left max-w-2xl mx-auto">
            <div className="flex gap-1 text-yellow-400 mb-4" aria-hidden>
              {[1, 2, 3, 4, 5].map((i) => (
                <span key={i} className="text-lg">★</span>
              ))}
            </div>
            <blockquote className="text-white text-lg leading-relaxed">
              This program transformed my approach to marketing! The insights and strategies are practical and really work. I&apos;ve seen amazing growth in my agency since joining.
            </blockquote>
            <footer className="mt-6">
              <p className="font-semibold text-white">John Doe</p>
              <p className="text-sm text-white/80">Marketing Consultant</p>
            </footer>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white border-t-2 border-black">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <motion.div {...stagger(0)} className="flex-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Unlock Your Marketing Success
            </h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Join our workshop to discover essential tips and strategies for launching your own marketing agency. You&apos;ll gain insights into finding clients, maximizing income, and leveraging AI solutions to streamline your business.
            </p>
            <Link
              href="/workshop"
              className="mt-6 inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-slate-900 bg-yellow-400 hover:bg-yellow-300 rounded-xl border-2 border-black transition-colors"
            >
              Join the Workshop
            </Link>
          </motion.div>
          <motion.div {...stagger(0.1)} className="flex-1 w-full max-w-lg aspect-video rounded-2xl bg-slate-100 border-2 border-black overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80"
              alt="Workshop"
              width={800}
              height={450}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Contact strip */}
      <section className="py-16 bg-blue-600 border-t-2 border-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white mb-6">Questions? We&apos;re here to help.</p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-slate-900 bg-yellow-400 hover:bg-yellow-300 border-2 border-black rounded-lg transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
