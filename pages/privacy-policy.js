import Head from 'next/head';
import Footer from '../components/designndev/Footer';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <>
      <Head>
        <title>Privacy Policy | GetPaid Workshop</title>
        <meta
          name="description"
          content="Privacy policy for GetPaid Workshop. How we handle your data when you use our website and workshop."
        />
        <meta name="keywords" content="privacy policy, GetPaid Workshop, data protection, website usage" />
        <meta property="og:title" content="Privacy Policy | GetPaid Workshop" />
        <meta property="og:type" content="website" />
      </Head>
      <div className="min-h-screen bg-slate-50">
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 sm:pt-12 sm:pb-20 md:py-16">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Privacy Policy</h1>
          <p className="text-slate-500 text-sm mb-10">Last updated: March 2025</p>

          <div className="prose prose-slate max-w-none space-y-10 text-slate-700">
            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">1. Introduction</h2>
              <p>
                This Privacy Policy describes how GetPaid Workshop (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) collects, uses, and protects your information when you use our website. By using our site—including the home page, workshop signup, and contact form—you agree to the practices described here. Our focus is on helping you start and scale an AI software business; we keep your data minimal and secure.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">2. How We Use This Website</h2>
              <p className="mb-3">
                GetPaid Workshop offers:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Home & workshop:</strong> You can browse the site and sign up for our workshop with your email. We use your email only to send workshop updates, webinar invites, and relevant content. We do not sell or share it for marketing.</li>
                <li><strong>Contact form:</strong> When you submit the contact form, we receive your name and email so we can respond. We do not use this information for unrelated marketing.</li>
                <li><strong>Account & dashboard (if applicable):</strong> If you create an account (e.g. for blog or dashboard access), we store only what is needed to run the service (e.g. email, account data). We do not sell your personal information.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">3. Information We Collect</h2>
              <p>
                We collect only what is necessary: email and name when you sign up for the workshop or use the contact form; account details if you register; and technical data (e.g. IP, browser) where needed for security or operation. We do not sell your data. We use it only to provide, maintain, and improve GetPaid Workshop and to communicate with you about the workshop and your inquiries.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">4. Cookies and Similar Technologies</h2>
              <p>
                We may use cookies or similar technologies for essential operation (e.g. keeping you logged in if you have an account). We do not use cookies for third-party advertising or tracking beyond what is needed for the website to function.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">5. Data Security and Retention</h2>
              <p>
                We take reasonable steps to protect your data. Workshop signups and contact submissions are handled securely. We retain data only as long as necessary to provide the services or as required by law.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">6. Your Rights</h2>
              <p>
                You may request access to, correction of, or deletion of your personal data where applicable. Use the contact form or your account settings (if you have an account) to make a request.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">7. Contact</h2>
              <p>
                For questions about this Privacy Policy or your data, use our <Link href="/contact" className="text-blue-600 hover:underline">Contact</Link> page.
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
