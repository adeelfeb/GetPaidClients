import '../styles/globals.css';
import 'ag-grid-community/styles/ag-grid.min.css';
import 'ag-grid-community/styles/ag-theme-quartz.min.css';
import Head from 'next/head';
import Script from 'next/script';
import { ToastProvider } from '../components/ToastProvider';
import ErrorBoundary from '../components/ErrorBoundary';
import RecaptchaPreloader from '../components/RecaptchaPreloader';

const GOOGLE_ADS_ID = 'AW-337880956';
const META_PIXEL_ID = '1707671407083892';

export default function App({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <Head>
          <title>Design n Dev</title>
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
          <link rel="alternate icon" href="/favicon.svg" />
          <link rel="apple-touch-icon" href="/favicon.svg" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="preconnect" href="https://www.google.com" />
          <link rel="preconnect" href="https://www.gstatic.com" crossOrigin="" />
        </Head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-ads-gtag-base-pages" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ADS_ID}');
          `}
        </Script>
        <Script id="meta-pixel-base-pages" strategy="afterInteractive">
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
        <RecaptchaPreloader />
        <Component {...pageProps} />
      </ToastProvider>
    </ErrorBoundary>
  );
}
