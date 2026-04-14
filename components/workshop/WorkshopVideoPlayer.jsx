'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Plyr from 'plyr'
import 'plyr/dist/plyr.css'

/** After 35 minutes of playback (2100s), the enroll control becomes visible. */
const DEFAULT_ENROLL_AFTER_SECONDS = 35 * 60 // 2100

/** Small slack so keyframe seeks (e.g. ~2099.8s) still count as “past” the mark. */
const REVEAL_TIME_SLACK_SEC = 0.35

function formatWorkshopClock(totalSeconds) {
  if (!Number.isFinite(totalSeconds) || totalSeconds < 0) return '0:00'
  const s = Math.floor(totalSeconds % 60)
  const m = Math.floor(totalSeconds / 60) % 60
  const h = Math.floor(totalSeconds / 3600)
  if (h > 0) {
    return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }
  return `${m}:${String(s).padStart(2, '0')}`
}

const BASE_CONTROLS = [
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
]

/**
 * Workshop video with Plyr. Multiple files are stitched in playback order; when
 * `totalDurationSec` is set, the UI shows one continuous timeline (custom progress + clock).
 * The <video> node is created imperatively so Plyr destroy never fights React.
 */
export default function WorkshopVideoPlayer({
  sources,
  totalDurationSec,
  enrollHref,
  enrollAfterSeconds = DEFAULT_ENROLL_AFTER_SECONDS,
}) {
  const plyrHostRef = useRef(null)
  const globalBarFillRef = useRef(null)
  const [showEnroll, setShowEnroll] = useState(false)
  const enrollShownRef = useRef(false)

  const openEnroll = useCallback(() => {
    const win = window.open(enrollHref, '_blank')
    if (win) win.opener = null
  }, [enrollHref])

  const sourcesKey = Array.isArray(sources) ? sources.join('\0') : ''
  const total =
    typeof totalDurationSec === 'number' && Number.isFinite(totalDurationSec) && totalDurationSec > 0
      ? totalDurationSec
      : 0
  const unifiedTimeline = sources?.length > 1 && total > 0

  useEffect(() => {
    enrollShownRef.current = false
    setShowEnroll(false)

    if (!sourcesKey || !sources?.length) return

    const host = plyrHostRef.current
    if (!host) return

    host.replaceChildren()

    const video = document.createElement('video')
    video.className = 'w-full h-full object-contain bg-black'
    video.setAttribute('playsinline', '')
    video.setAttribute('controls', '')
    const sourceEl = document.createElement('source')
    sourceEl.src = sources[0]
    sourceEl.type = 'video/mp4'
    video.appendChild(sourceEl)
    host.appendChild(video)

    const controls = unifiedTimeline ? BASE_CONTROLS.filter((c) => c !== 'progress') : BASE_CONTROLS

    const player = new Plyr(video, {
      controls,
      settings: ['speed'],
      keyboard: { focused: true, global: false },
      tooltips: { controls: true, seek: true },
      seekTime: 10,
      invertTime: false,
      ...(unifiedTimeline ? { duration: total } : {}),
    })

    const media = player.media
    if (!media || typeof media.addEventListener !== 'function') {
      player.destroy()
      host.replaceChildren()
      return
    }

    const threshold = Math.max(0, enrollAfterSeconds - REVEAL_TIME_SLACK_SEC)

    let secondsPriorParts = 0
    let partIndex = 0

    const globalTime = () => {
      const el = player.media
      const local = el?.currentTime
      if (!Number.isFinite(local)) return NaN
      return secondsPriorParts + local
    }

    const tryRevealEnroll = () => {
      if (enrollShownRef.current) return
      const t = globalTime()
      if (!Number.isFinite(t) || t < threshold) return
      enrollShownRef.current = true
      setShowEnroll(true)
    }

    const patchUnifiedChrome = () => {
      if (!unifiedTimeline) return
      const g = globalTime()
      if (!Number.isFinite(g)) return
      const pct = Math.min(100, Math.max(0, (g / total) * 100))
      const fill = globalBarFillRef.current
      if (fill) {
        fill.style.width = `${pct}%`
      }
      const ct = player.elements?.display?.currentTime
      const du = player.elements?.display?.duration
      if (ct) ct.textContent = formatWorkshopClock(g)
      if (du) du.textContent = formatWorkshopClock(total)
    }

    const silencePlay = (p) => {
      const maybe = p.play()
      if (maybe && typeof maybe.catch === 'function') {
        maybe.catch(() => {})
      }
    }

    const loadPartOnMedia = (index) => {
      const el = player.media
      if (!el) return
      while (el.firstChild) {
        el.removeChild(el.firstChild)
      }
      const next = document.createElement('source')
      next.src = sources[index]
      next.type = 'video/mp4'
      el.appendChild(next)
      el.load()
    }

    const onEnded = () => {
      if (partIndex + 1 >= sources.length) return
      const el = player.media
      const d = el?.duration
      if (Number.isFinite(d) && d > 0) {
        secondsPriorParts += d
      }
      partIndex += 1
      loadPartOnMedia(partIndex)
      silencePlay(player)
    }

    const onTick = () => {
      tryRevealEnroll()
      queueMicrotask(patchUnifiedChrome)
    }

    media.addEventListener('timeupdate', onTick)
    media.addEventListener('seeked', onTick)
    media.addEventListener('seeking', onTick)
    media.addEventListener('ended', onEnded)

    const pollMs = 250
    const pollId = window.setInterval(onTick, pollMs)

    return () => {
      window.clearInterval(pollId)
      media.removeEventListener('timeupdate', onTick)
      media.removeEventListener('seeked', onTick)
      media.removeEventListener('seeking', onTick)
      media.removeEventListener('ended', onEnded)
      player.destroy()
      plyrHostRef.current?.replaceChildren()
    }
  }, [sourcesKey, enrollAfterSeconds, total, unifiedTimeline])

  if (!sources?.length) return null

  return (
    <div className="flex flex-col items-stretch">
      <div className="aspect-video w-full max-h-[80vh] bg-black">
        <div
          className="workshop-plyr relative h-full w-full [&_.plyr]:h-full [&_.plyr]:min-h-0 [&_.plyr__video-wrapper]:h-full [&_.plyr__video-wrapper]:max-h-[80vh] [&_video]:h-full [&_video]:max-h-[80vh] [&_video]:object-contain"
          style={{
            '--plyr-color-main': '#fbbf24',
            '--plyr-video-background': '#000000',
          }}
        >
          <div ref={plyrHostRef} className="h-full min-h-0 w-full" />
          {unifiedTimeline ? (
            <div
              className="pointer-events-none absolute inset-x-0 bottom-[3.25rem] z-20 px-3 sm:bottom-14 sm:px-4"
              aria-hidden
            >
              <div className="h-1 overflow-hidden rounded-full bg-white/15 sm:h-1.5">
                <div
                  ref={globalBarFillRef}
                  className="h-full rounded-full bg-amber-400"
                  style={{ width: '0%', transition: 'width 120ms linear' }}
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>

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
