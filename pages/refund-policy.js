import Head from 'next/head';
import Link from 'next/link';
import Footer from '../components/designndev/Footer';

export default function RefundPolicyPage() {
  return (
    <>
      <Head>
        <title>Refund Policy | GetPaid Workshop</title>
        <meta
          name="description"
          content="Refund policy for GetPaid Workshop, including workshop access, cancellations, and support contact details."
        />
        <meta name="keywords" content="refund policy, GetPaid Workshop, cancellations, workshop access" />
        <meta property="og:title" content="Refund Policy | GetPaid Workshop" />
        <meta property="og:type" content="website" />
      </Head>
      <div className="min-h-screen bg-slate-50">
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 sm:pt-12 sm:pb-20 md:py-16">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Refund Policy</h1>
          <p className="text-slate-500 text-sm mb-10">Last updated: April 2026</p>

          <div className="prose prose-slate max-w-none space-y-10 text-slate-700">
            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">1. Overview</h2>
              <p>
                This Refund Policy explains how refund requests are handled for GetPaid Workshop products,
                workshop access, and related digital services. By purchasing or registering through this
                website, you agree to the terms below.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">2. Digital Products and Workshop Access</h2>
              <p>
                Because our workshop, recordings, and related resources are delivered digitally, all sales are
                generally treated as final once access has been granted, a session link has been shared, or the
                product has been delivered.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">3. Eligibility for Review</h2>
              <p>
                If you were charged incorrectly, received duplicate billing, or did not receive the access that
                was promised, you may contact us within 7 days of the transaction and we will review the case.
                Approved resolutions may include access restoration, rescheduling, credit, or a refund where
                appropriate.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">4. Non-Refundable Cases</h2>
              <p>
                Refunds are normally not issued for missed sessions, change of mind, failure to attend, failure
                to use the material, or dissatisfaction after digital access has already been provided.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">5. Contact for Refund Requests</h2>
              <p>
                To request help with billing or access, email{' '}
                <a href="mailto:smithpatvekar@gmail.com" className="text-blue-600 hover:underline">
                  smithpatvekar@gmail.com
                </a>{' '}
                with your name, payment details, and a short description of the issue.
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-200">
            <Link href="/" className="text-blue-600 hover:underline font-medium">
              ← Back to Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
