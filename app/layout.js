import { Poppins } from 'next/font/google'
import Script from 'next/script'
import '../styles/globals.css'

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
        <Script src="https://www.googletagmanager.com/gtag/js?id=AW-337880956" strategy="afterInteractive" />
        <Script id="google-ads-gtag-base" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-337880956');
          `}
        </Script>
        {children}
      </body>
    </html>
  )
}

