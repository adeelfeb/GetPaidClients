'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

function useRouterCompat() {
  const [pathname, setPathname] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPathname(window.location.pathname)
      const handleRouteChange = () => setPathname(window.location.pathname)
      window.addEventListener('popstate', handleRouteChange)
      const op = history.pushState
      const or = history.replaceState
      history.pushState = function (...args) {
        op.apply(history, args)
        handleRouteChange()
      }
      history.replaceState = function (...args) {
        or.apply(history, args)
        handleRouteChange()
      }
      return () => {
        window.removeEventListener('popstate', handleRouteChange)
        history.pushState = op
        history.replaceState = or
      }
    }
  }, [])
  return { asPath: pathname, pathname }
}

export default function Navbar() {
  const router = useRouterCompat()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const handleScroll = () => setIsScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMenuOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isMenuOpen])

  const isActive = (href) => {
    if (!isMounted) return false
    const pathname = router.asPath || router.pathname
    if (!pathname) return false
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/privacy-policy', label: 'Privacy Policy' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-6">
        <header
          className={`
            flex items-center justify-between gap-3 sm:gap-4
            min-h-[56px] sm:min-h-[60px] lg:min-h-[64px]
            rounded-2xl sm:rounded-2xl
            px-4 sm:px-5 lg:px-6
            transition-all duration-300 ease-out
            ${isScrolled
              ? 'bg-white/98 backdrop-blur-md shadow-lg shadow-slate-200/80 border border-slate-200/90'
              : 'bg-white/95 backdrop-blur-sm shadow-md shadow-slate-200/50 border border-slate-200/70'
            }
          `}
        >
          {/* Logo — tap target 44px+ */}
          <div className="flex-shrink-0 min-w-0">
            <Link
              href="/"
              className="inline-flex items-center min-h-[44px] min-w-[44px] -m-2 p-2 rounded-xl text-base sm:text-lg font-bold no-underline hover:opacity-90 active:opacity-80 transition-opacity tracking-tight"
            >
              <span className="text-amber-600">GetPaid</span>
              <span className="text-slate-700"> Workshop</span>
            </Link>
          </div>

          {/* Desktop: nav links + CTAs */}
          <div className="hidden lg:flex flex-1 items-center justify-center gap-1 min-w-0">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  min-h-[44px] inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium no-underline transition-colors duration-200
                  ${isActive(item.href)
                    ? 'text-amber-600 bg-amber-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }
                `}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
            <Link
              href="/workshop"
              className="inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-xl shadow-md shadow-red-600/25 hover:shadow-red-600/30 transition-all duration-200 no-underline focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-white"
            >
              Join Workshop
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center min-h-[44px] px-4 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl no-underline transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2 focus:ring-offset-white"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center min-h-[44px] px-4 py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl no-underline transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2 focus:ring-offset-white"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile: menu button — 44px touch target */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((o) => !o)}
            className="lg:hidden flex items-center justify-center w-12 h-12 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 active:bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2 focus:ring-offset-white"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </header>

        {/* Mobile menu — full viewport, responsive */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 top-[56px] sm:top-[60px] z-40 bg-slate-900/20 backdrop-blur-sm"
              aria-hidden="false"
              onClick={() => setIsMenuOpen(false)}
            >
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="mx-4 mt-2 rounded-2xl bg-white border border-slate-200 shadow-xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="py-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`
                        flex items-center min-h-[48px] px-4 py-3 text-base font-medium no-underline transition-colors
                        ${isActive(item.href) ? 'text-amber-600 bg-amber-50' : 'text-slate-700 hover:bg-slate-50 active:bg-slate-100'}
                      `}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
                <div className="border-t border-slate-200 p-3 space-y-2">
                  <Link
                    href="/workshop"
                    className="flex items-center justify-center min-h-[48px] w-full py-3 text-base font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl no-underline transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Join Workshop
                  </Link>
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="/login"
                      className="flex items-center justify-center min-h-[48px] py-3 text-base font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl no-underline transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      className="flex items-center justify-center min-h-[48px] py-3 text-base font-semibold text-slate-700 border border-slate-200 hover:bg-slate-50 rounded-xl no-underline transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
