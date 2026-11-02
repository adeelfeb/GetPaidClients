import '../styles/globals.css';
import 'ag-grid-community/styles/ag-grid.min.css';
import 'ag-grid-community/styles/ag-theme-quartz.min.css';
import Head from 'next/head';
import Script from 'next/script';
import { ToastProvider } from '../components/ToastProvider';
import ErrorBoundary from '../components/ErrorBoundary';
import RecaptchaPreloader from '../components/RecaptchaPreloader';
import ExternalTrackingScript from '../components/ExternalTrackingScript';
import MetaPixel from '../components/MetaPixel';

const GOOGLE_ADS_ID = 'AW-337880956';

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
        <MetaPixel />
        <ExternalTrackingScript />
        <RecaptchaPreloader />
        <Component {...pageProps} />
      </ToastProvider>
    </ErrorBoundary>
  );
}
