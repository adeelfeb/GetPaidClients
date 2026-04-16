import { Poppins } from 'next/font/google'
import Script from 'next/script'
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
  description: 'Learn how to start an AI software reselling business from scratch. Charge $1000 per client and keep 100% profits. Join our free workshop.',
  keywords: 'AI reselling, marketing agency, workshop, GetPaid',
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'GetPaid Workshop | AI Software Reselling Business',
    description: 'Learn how to start an AI software reselling business. Join our free workshop.',
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
            src="https://www.facebook.com/tr?id=527572000359726&ev=PageView&noscript=1"
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
        <Script id="meta-pixel-base" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
        {children}
      </body>
    </html>
  )
}

