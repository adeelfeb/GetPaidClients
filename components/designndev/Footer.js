'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-100 text-slate-800 border-t border-slate-200">
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Site Info */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-blue-600">
                GetPaid Workshop
              </h3>
              <p className="text-slate-600 text-sm">
                Learn how to start an AI software reselling business from scratch. Charge $1000 per client and keep 100% of the profits.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4 text-slate-800">Quick Links</h4>
              <ul className="space-y-2 text-slate-600 text-sm">
                <li>
                  <Link href="/" className="hover:text-slate-900 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/workshop" className="hover:text-slate-900 transition-colors">
                    Workshop
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="hover:text-slate-900 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-slate-900 transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Account */}
            <div>
              <h4 className="font-semibold mb-4 text-slate-800">Account</h4>
              <ul className="space-y-2 text-slate-600 text-sm">
                <li>
                  <Link href="/login" className="hover:text-slate-900 transition-colors">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/signup" className="hover:text-slate-900 transition-colors">
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-slate-900 transition-colors">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-4 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-slate-500 text-sm">
            <p>© {currentYear} GetPaid Workshop. All rights reserved.</p>
          </div>
        </div>
      </section>
    </footer>
  )
}
