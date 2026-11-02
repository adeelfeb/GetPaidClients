import { Poppins } from 'next/font/google'
import Script from 'next/script'
import ExternalTrackingScript from '../components/ExternalTrackingScript'
import MetaPixel from '../components/MetaPixel'
import '../styles/globals.css'

const GOOGLE_ADS_ID = 'AW-337880956'
const META_PIXEL_ID = '527572000359726'

const poppins = Poppins({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata = {
  title: 'GetPaid Workshop | AI Software Reselling Business',
  description:
    'How to start an AI software reselling business from scratch — using practical systems to land international clients and build recurring offers.',
  keywords: 'AI reselling, marketing agency, workshop, GetPaid',
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'GetPaid Workshop | AI Software Reselling Business',
    description:
      'How to start an AI software reselling business from scratch — using practical systems to land international clients and build recurring offers.',
    siteName: 'GetPaid Workshop',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable} suppressHydrationWarning>
      <body
        className={`${poppins.className} antialiased bg-white text-slate-900`}
        suppressHydrationWarning
      >
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-ads-gtag-base" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ADS_ID}');
          `}
        </Script>
        <MetaPixel />
        <ExternalTrackingScript />
        {children}
      </body>
    </html>
  )
}

