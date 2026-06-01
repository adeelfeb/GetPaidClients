import { useCallback, useEffect, useState } from 'react'
import Head from 'next/head'
import Script from 'next/script'
import Footer from '../components/designndev/Footer'

const WORKSHOP_ENROLL_URL = 'https://calendly.com/yspmediafunnel/15min'
const WORKSHOP_ENROLL_AFTER_SECONDS = 40 * 60
const WORKSHOP_VIDEO_TITLE = '$ 97 SaaS Webianr'
const WORKSHOP_VIMEO_SRC =
  'https://player.vimeo.com/video/1197304141?h=dcbf71b7cc&badge=0&autopause=0&player_id=0&app_id=58479'

export default function WorkshopPage() {
  const [isPlayerApiReady, setIsPlayerApiReady] = useState(false)
  const [showEnrollButton, setShowEnrollButton] = useState(false)
  const [playerUnavailable, setPlayerUnavailable] = useState(false)

  const reattachIframeIfNeeded = useCallback(() => {
    if (typeof document === 'undefined') return
    const iframe = document.querySelector(`iframe[title="${WORKSHOP_VIDEO_TITLE}"]`)
    if (!iframe) return

    const currentSrc = iframe.getAttribute('src')
    if (!currentSrc || !currentSrc.includes('player.vimeo.com/video/1197304141')) {
      iframe.setAttribute('src', WORKSHOP_VIMEO_SRC)
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Vimeo) {
      setIsPlayerApiReady(true)
    }
  }, [])

  useEffect(() => {
    if (!isPlayerApiReady || typeof window === 'undefined' || !window.Vimeo) return

    const iframe = document.querySelector(`iframe[title="${WORKSHOP_VIDEO_TITLE}"]`)
    if (!iframe) return

    const player = new window.Vimeo.Player(iframe)
    const revealWhenEligible = ({ seconds }) => {
      if (seconds >= WORKSHOP_ENROLL_AFTER_SECONDS) {
        setShowEnrollButton(true)
      }
    }

    let isMounted = true

    player
      .getVideoTitle()
      .then((title) => {
        if (!isMounted) return
        if (title !== WORKSHOP_VIDEO_TITLE) {
          setPlayerUnavailable(true)
          return
        }

        setPlayerUnavailable(false)
        player.on('timeupdate', revealWhenEligible)
        player.on('seeked', revealWhenEligible)
        player.getCurrentTime().then((seconds) => revealWhenEligible({ seconds })).catch(() => {})
      })
      .catch(() => {
        if (isMounted) {
          setPlayerUnavailable(true)
        }
      })

    return () => {
      isMounted = false
      player.off('timeupdate', revealWhenEligible)
      player.off('seeked', revealWhenEligible)
    }
  }, [isPlayerApiReady])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleRestore = () => {
      reattachIframeIfNeeded()
      if (window.Vimeo) {
        setIsPlayerApiReady(true)
      }
    }

    window.addEventListener('focus', handleRestore)
    window.addEventListener('pageshow', handleRestore)
    document.addEventListener('visibilitychange', handleRestore)

    return () => {
      window.removeEventListener('focus', handleRestore)
      window.removeEventListener('pageshow', handleRestore)
      document.removeEventListener('visibilitychange', handleRestore)
    }
  }, [reattachIframeIfNeeded])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const conversionGuardKey = 'workshop_conversion_aw_337880956_3ygLCIf_8bAYEPzOjqEB'

    const hasSentConversion =
      window.__workshopTrackingSent?.[conversionGuardKey] ||
      window.sessionStorage?.getItem(conversionGuardKey) === '1'

    if (!window.__workshopTrackingSent) {
      window.__workshopTrackingSent = {}
    }

    if (!hasSentConversion && typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', { send_to: 'AW-337880956/3ygLCIf_8bAYEPzOjqEB' })
      window.__workshopTrackingSent[conversionGuardKey] = true
      window.sessionStorage?.setItem(conversionGuardKey, '1')
    }
  }, [])

  return (
    <>
      <Head>
        <title>Workshop | GetPaid Workshop</title>
        <meta
          name="description"
          content="Join our free workshop to learn how to scale a global service business with high-ticket client strategies and recurring revenue systems."
        />
        <meta property="og:title" content="Workshop | GetPaid Workshop" />
        <meta property="og:type" content="website" />
      </Head>
      <div className="min-h-screen bg-gradient-to-b from-zinc-700 via-zinc-900 to-black">
        {/* Webinar player — theater-style frame */}
        <section className="relative mb-14 sm:mb-20 lg:mb-24 py-10 sm:py-16 px-4 sm:px-6 lg:px-10 border-b border-amber-950/40 overflow-hidden">
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
                <div className="relative bg-black p-2 sm:p-3">
                  <div className="relative w-full aspect-video overflow-hidden">
                    <iframe
                      id="workshop-vimeo-player"
                      src={WORKSHOP_VIMEO_SRC}
                      frameBorder="0"
                      allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                      title={WORKSHOP_VIDEO_TITLE}
                    />
                  </div>
                  <div className="pt-4 pb-1 flex justify-center">
                    <a
                      href={WORKSHOP_ENROLL_URL}
                      target="_blank"
                      rel="noreferrer"
                      data-video-title={WORKSHOP_VIDEO_TITLE}
                      aria-hidden={!showEnrollButton}
                      className={`group relative inline-flex items-center justify-center rounded-md px-10 py-5 text-base sm:text-lg font-bold text-black transition-all duration-700 ease-out ${
                        showEnrollButton
                          ? 'translate-y-0 scale-100 opacity-100 bg-amber-400 shadow-[0_0_0_1px_rgba(251,191,36,0.35),0_0_24px_rgba(251,191,36,0.45)] hover:bg-amber-300 hover:shadow-[0_0_0_1px_rgba(251,191,36,0.55),0_0_32px_rgba(251,191,36,0.65)]'
                          : 'pointer-events-none translate-y-3 scale-95 opacity-0 bg-amber-500'
                      }`}
                    >
                      {showEnrollButton ? (
                        <span
                          className="pointer-events-none absolute -inset-1 rounded-md bg-amber-300/30 blur-md animate-pulse"
                          aria-hidden
                        />
                      ) : null}
                      Schedule a Meeting
                    </a>
                  </div>
                  {playerUnavailable ? (
                    <p className="px-4 pb-3 text-center text-xs text-amber-200/80">
                      Video temporarily unavailable. Refresh the page if it does not recover after switching back.
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
      <Script
        src="https://player.vimeo.com/api/player.js"
        strategy="afterInteractive"
        onLoad={() => setIsPlayerApiReady(true)}
        onReady={() => {
          if (typeof window !== 'undefined' && window.Vimeo) {
            setIsPlayerApiReady(true)
          }
        }}
      />
    </>
  )
}
