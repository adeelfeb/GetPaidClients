'use client';
import { useEffect } from 'react';

const DEFAULT_PIXEL_ID = '527572000359726';

function injectMetaPixel(pixelId) {
  if (typeof window === 'undefined' || !pixelId) return;
  if (window.__metaPixelIds && window.__metaPixelIds.includes(pixelId)) return;
  if (typeof window.fbq !== 'function') {
    (function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n;
      n.push = n; n.loaded = true; n.version = '2.0'; n.queue = [];
      t = b.createElement(e); t.async = true; t.src = v;
      s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  }
  window.fbq('init', pixelId);
  window.fbq('track', 'PageView');
  window.__metaPixelIds = window.__metaPixelIds || [];
  window.__metaPixelIds.push(pixelId);
}

export default function MetaPixel() {
  useEffect(() => {
    fetch('/api/pixel-snippets', { credentials: 'include' })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        const ids = (Array.isArray(data?.data) ? data.data : [])
          .map((s) => s.pixelId)
          .filter(Boolean);
        (ids.length ? ids : [DEFAULT_PIXEL_ID]).forEach(injectMetaPixel);
      })
      .catch(() => injectMetaPixel(DEFAULT_PIXEL_ID));
  }, []);
  return null;
}
