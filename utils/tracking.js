const GOOGLE_ADS_ID = 'AW-337880956'
const OPT_IN_RETARGETING_LABEL = 'CY7KCN2bicEcEPzOjqEB'

export function sendOptInRetargetingConversion() {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return

  window.gtag('event', 'conversion', {
    send_to: `${GOOGLE_ADS_ID}/${OPT_IN_RETARGETING_LABEL}`,
  })
}

export function sendConversion(conversionLabel, options = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return

  window.gtag('event', 'conversion', {
    send_to: `${GOOGLE_ADS_ID}/${conversionLabel}`,
    ...options,
  })
}
