import Script from 'next/script'

const GHL_TRACKING_SCRIPT_SRC = 'https://link.msgsndr.com/js/external-tracking.js'
const DEFAULT_GHL_TRACKING_ID = 'tk_94c47a1009ed40ffb4213433322394f3'

const trackingId =
  process.env.NEXT_PUBLIC_GHL_TRACKING_ID || DEFAULT_GHL_TRACKING_ID

const debugEnabled =
  process.env.NEXT_PUBLIC_GHL_TRACKING_DEBUG === 'true' ||
  (process.env.NEXT_PUBLIC_GHL_TRACKING_DEBUG !== 'false' &&
    process.env.NODE_ENV === 'development')

export default function ExternalTrackingScript() {
  if (!trackingId) return null

  return (
    <Script
      id="ghl-external-tracking"
      src={GHL_TRACKING_SCRIPT_SRC}
      data-tracking-id={trackingId}
      {...(debugEnabled ? { 'data-debug': 'true' } : {})}
      strategy="afterInteractive"
    />
  )
}
