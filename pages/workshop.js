import dynamic from 'next/dynamic'
import Head from 'next/head'
import Footer from '../components/designndev/Footer'

const WorkshopVideoPlayer = dynamic(() => import('../components/workshop/WorkshopVideoPlayer'), {
  ssr: false,
  loading: () => (
    <div className="flex aspect-video w-full max-h-[80vh] items-center justify-center bg-black text-sm text-white/50">
      Loading video player…
    </div>
  ),
})

const WORKSHOP_VIDEO_FILENAME = 'Software 8 april Webinar-esv2-50p-bg-10p-music-10p.mp4'

/** Public folder asset — encode spaces for reliable URLs. */
const WORKSHOP_VIDEO_SRC = `/${encodeURIComponent(WORKSHOP_VIDEO_FILENAME)}`

/** Opened when the viewer taps “Enroll Me Now!” (after the threshold below). */
const WORKSHOP_ENROLL_URL = 'https://calendly.com/yspmediafunnel/15min'

/** Seconds of playback before the enroll button appears (35 minutes = 2100). */
const WORKSHOP_ENROLL_AFTER_SECONDS = 35 * 60

export default function WorkshopPage() {
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
                <div className="relative bg-black">
                  <WorkshopVideoPlayer
                    src={WORKSHOP_VIDEO_SRC}
                    enrollHref={WORKSHOP_ENROLL_URL}
                    enrollAfterSeconds={WORKSHOP_ENROLL_AFTER_SECONDS}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}
