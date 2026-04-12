'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Plyr from 'plyr'
import 'plyr/dist/plyr.css'

/** After 35 minutes of playback (2100s), the enroll control becomes visible. */
const DEFAULT_ENROLL_AFTER_SECONDS = 35 * 60 // 2100

/** Small slack so keyframe seeks (e.g. ~2099.8s) still count as “past” the mark. */
const REVEAL_TIME_SLACK_SEC = 0.35

/**
 * Self-hosted workshop video with Plyr controls; enroll CTA appears after `enrollAfterSeconds`.
 * Mirrors vanilla `video.addEventListener('timeupdate', …)` behavior, plus polling so Plyr seeks
 * cannot skip the check.
 */
export default function WorkshopVideoPlayer({
  src,
  enrollHref,
  enrollAfterSeconds = DEFAULT_ENROLL_AFTER_SECONDS,
}) {
  const rootRef = useRef(null)
  const videoRef = useRef(null)
  const [showEnroll, setShowEnroll] = useState(false)
  const [videoMountKey, setVideoMountKey] = useState(0)
  const enrollShownRef = useRef(false)

  const openEnroll = useCallback(() => {
    const win = window.open(enrollHref, '_blank')
    if (win) win.opener = null
  }, [enrollHref])

  useEffect(() => {
    enrollShownRef.current = false
    setShowEnroll(false)

    const el = videoRef.current
    if (!el) return

    const player = new Plyr(el, {
      controls: [
        'play-large',
        'restart',
        'rewind',
        'play',
        'fast-forward',
        'progress',
        'current-time',
        'duration',
        'mute',
        'volume',
        'settings',
        'pip',
        'airplay',
        'fullscreen',
      ],
      settings: ['speed'],
      keyboard: { focused: true, global: false },
      tooltips: { controls: true, seek: true },
      seekTime: 10,
      invertTime: false,
    })

    const media = player.media
    if (!media || typeof media.addEventListener !== 'function') {
      player.destroy()
      return
    }

    const threshold = Math.max(0, enrollAfterSeconds - REVEAL_TIME_SLACK_SEC)

    /** Same idea as `if (video.currentTime >= 2100 && !shown)` in your snippet. */
    const tryRevealEnroll = () => {
      if (enrollShownRef.current) return
      const t = media.currentTime
      if (!Number.isFinite(t) || t < threshold) return
      enrollShownRef.current = true
      setShowEnroll(true)
    }

    // Native media events (Plyr’s `player.on('timeupdate')` is on the container; `timeupdate` does not bubble.)
    media.addEventListener('timeupdate', tryRevealEnroll)
    media.addEventListener('seeked', tryRevealEnroll)
    media.addEventListener('seeking', tryRevealEnroll)

    // Fallback: Plyr scrubbing can miss sparse `timeupdate` frames — poll like a watchdog.
    const pollMs = 250
    const pollId = window.setInterval(tryRevealEnroll, pollMs)

    return () => {
      window.clearInterval(pollId)
      media.removeEventListener('timeupdate', tryRevealEnroll)
      media.removeEventListener('seeked', tryRevealEnroll)
      media.removeEventListener('seeking', tryRevealEnroll)
      player.destroy()

      /*
       * Plyr hard-destroy replaces its UI with a clone of the original <video>. React’s ref still
       * points at the detached node, so timeupdate/polling never see the element the user actually
       * plays. Remount <video> only when our root is still on the page (skip real page unmount).
       */
      queueMicrotask(() => {
        if (!rootRef.current?.isConnected) return
        const v = videoRef.current
        if (v && !v.isConnected) {
          setVideoMountKey((k) => k + 1)
        }
      })
    }
  }, [src, enrollAfterSeconds, videoMountKey])

  return (
    <div ref={rootRef} className="flex flex-col items-stretch">
      <div className="aspect-video w-full max-h-[80vh] bg-black">
        <div
          className="workshop-plyr h-full w-full [&_.plyr]:h-full [&_.plyr]:min-h-0 [&_.plyr__video-wrapper]:h-full [&_.plyr__video-wrapper]:max-h-[80vh] [&_video]:h-full [&_video]:max-h-[80vh] [&_video]:object-contain"
          style={{
            '--plyr-color-main': '#fbbf24',
            '--plyr-video-background': '#000000',
          }}
        >
          <video
            key={videoMountKey}
            ref={videoRef}
            className="w-full h-full object-contain bg-black"
            playsInline
            controls
          >
            <source src={src} type="video/mp4" />
          </video>
        </div>
      </div>

      {/* Before threshold: not rendered (no layout). At/after threshold: visible once. */}
      {showEnroll ? (
        <div className="mt-6 flex justify-center animate-fade-in" aria-live="polite">
          <button
            type="button"
            onClick={openEnroll}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-black bg-blue-600 px-7 py-3.5 text-lg font-semibold text-white shadow-[0_4px_14px_rgba(0,0,0,0.25)] transition hover:scale-[1.03] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-stone-900"
          >
            <span className="text-xl leading-none" aria-hidden>
              📞
            </span>
            Enroll Me Now!
          </button>
        </div>
      ) : null}
    </div>
  )
}
