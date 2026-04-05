'use client'

import Link from 'next/link'
import Image from 'next/image'

const defaultCtaClass =
  'inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-slate-900 bg-yellow-400 hover:bg-yellow-300 rounded-lg border-2 border-black transition-colors whitespace-nowrap'

const landingCtaClass =
  'inline-flex items-center justify-center w-full sm:w-auto px-10 py-5 text-lg sm:text-xl font-bold text-slate-900 bg-yellow-400 hover:bg-yellow-300 rounded-2xl border-2 border-black shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-slate-900'

export default function Footer({ variant = 'default', onEnrollClick }) {
  const isLanding = variant === 'landing'

  return (
    <footer className="bg-slate-900 text-white border-t-2 border-black">
      <section className="py-8 md:py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center justify-center sm:justify-start">
              <Link href="/" className="flex items-center gap-2">
                <Image src="/getpaid-logo.svg" alt="GetPaid Clients" width={180} height={40} className="h-9 w-auto" />
              </Link>
            </div>
            {isLanding ? (
              <div className="w-full sm:w-auto flex justify-center sm:justify-end">
                {typeof onEnrollClick === 'function' ? (
                  <button type="button" onClick={onEnrollClick} className={landingCtaClass}>
                    Enroll Me for the Workshop
                  </button>
                ) : (
                  <Link href="/workshop" className={landingCtaClass}>
                    Enroll Me for the Workshop
                  </Link>
                )}
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <span className="text-sm text-slate-300 whitespace-nowrap">Subscribe to our updates</span>
                <Link href="/workshop" className={defaultCtaClass}>
                  Join Now
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </footer>
  )
}
