import Head from 'next/head';
import Footer from '../components/designndev/Footer';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <>
      <Head>
        <title>Privacy Policy | GetPaid Clients</title>
        <meta
          name="description"
          content="GetPaid Clients privacy policy."
        />
        <meta name="keywords" content="privacy policy, GetPaid Clients, data protection" />
        <meta property="og:title" content="Privacy Policy | GetPaid Clients" />
        <meta property="og:type" content="website" />
      </Head>
      <div className="min-h-screen bg-slate-50">
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 sm:pt-12 sm:pb-20 md:py-16">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">GetPaid Clients Privacy Policy</h1>
          <p className="text-slate-500 text-sm mb-10">Effective Date: 01/01/2025</p>

          <div className="prose prose-slate max-w-none space-y-10 text-slate-700">
            <section>
              <p>
                Welcome to GetPaid Clients! Your privacy is important to us. This Privacy Policy explains how we collect,
                use, and protect your personal information when you use our website, software, or services. By using
                our platform, you agree to the terms of this policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">1. Information We Collect</h2>
              <p>We collect the following types of data to improve your experience and deliver our services:</p>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">a. Personal Information:</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Full name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Billing &amp; payment details</li>
                <li>Company name (if provided)</li>
              </ul>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">b. Usage Data:</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>IP address</li>
                <li>Device type &amp; browser</li>
                <li>Pages visited &amp; actions taken</li>
                <li>Login history</li>
                <li>Time spent on the platform</li>
              </ul>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">c. Cookies &amp; Tracking:</h3>
              <p>
                We use cookies to personalize your experience, remember your settings, and analyze site performance.
                You can disable cookies in your browser settings anytime.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">2. How We Use Your Information</h2>
              <p>We use your information to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Create and manage your account</li>
                <li>Provide access to our software tools</li>
                <li>Process payments and send invoices</li>
                <li>Send important notifications and service updates</li>
                <li>Respond to support queries</li>
                <li>Analyze usage to improve performance</li>
                <li>Offer promotions or product updates (with your consent)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">3. How We Protect Your Information</h2>
              <p>We take your privacy seriously and use industry-standard security practices:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>SSL encryption for data transfer</li>
                <li>Secure cloud hosting &amp; firewall protection</li>
                <li>Restricted access to sensitive data</li>
                <li>Regular platform updates &amp; security audits</li>
              </ul>
              <p>
                However, no method of transmission over the internet is 100% secure. While we do our best, we cannot
                guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">4. What We Don&apos;t Do</h2>
              <p>At GetPaid Clients, we respect your boundaries:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>We never sell or rent your personal data to third parties</li>
                <li>We don&apos;t access your clients&apos; data unless required for technical support</li>
                <li>
                  We don&apos;t store your payment details — payments are processed securely by third-party gateways
                  (e.g., Stripe, Razorpay)
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">5. Data Sharing &amp; Third Parties</h2>
              <p>We may share your data only with trusted partners for specific reasons:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Payment gateways (to process your payments)</li>
                <li>Email service providers (for transactional and support emails)</li>
                <li>Technical vendors (to help us improve our services)</li>
              </ul>
              <p>These partners are contractually obligated to protect your information.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">6. Your Rights</h2>
              <p>You have full control over your data. You can:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Request a copy of your personal data</li>
                <li>Edit or update your profile info</li>
                <li>Request account deletion or data erasure</li>
                <li>Opt-out of promotional emails anytime</li>
              </ul>
              <p>
                To make any such request, just email us at{' '}
                <a href="mailto:support@nextsaas.in" className="text-blue-600 hover:underline">
                  support@nextsaas.in
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">7. Children&apos;s Privacy</h2>
              <p>
                Our services are not intended for children under 13. We do not knowingly collect or store data from
                anyone under this age. If we find that such data has been collected, it will be deleted immediately.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">8. International Users</h2>
              <p>
                If you&apos;re accessing GetPaid Clients from outside India, please note that your information will be processed and
                stored in accordance with Indian laws. By using our platform, you consent to this transfer.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">9. Updates to This Policy</h2>
              <p>
                We may occasionally update this Privacy Policy to reflect changes in law or platform functionality.
                When we do, we&apos;ll notify you via dashboard notifications and email alerts (if critical).
              </p>
              <p>We encourage you to review this page regularly.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">10. Contact Us</h2>
              <p>Have questions about this Privacy Policy? We&apos;re here to help.</p>
              <p>
                Email:{' '}
                <a href="mailto:support@nextsaas.in" className="text-blue-600 hover:underline">
                  support@nextsaas.in
                </a>
              </p>
              <p>
                Website:{' '}
                <a
                  href="https://nextsaas.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  https://nextsaas.in
                </a>
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
