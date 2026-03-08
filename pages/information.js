import Head from 'next/head';
import Navbar from '../components/designndev/Navbar';
import Footer from '../components/designndev/Footer';

export default function InformationPage() {
  return (
    <>
      <Head>
        <title>Information | GetPaid Workshop</title>
        <meta
          name="description"
          content="Information about GetPaid Workshop. Learn about our AI software reselling and marketing agency workshop."
        />
        <meta name="keywords" content="workshop, AI reselling, marketing agency, information" />
      </Head>
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <h1 className="text-3xl md:4xl font-bold text-slate-900 mb-2">Information</h1>
          <p className="text-slate-500 text-sm mb-10">About GetPaid Workshop</p>

          <div className="prose prose-slate max-w-none space-y-8 text-slate-700">
            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">About This Site</h2>
              <p>
                GetPaid Workshop helps you start an AI software reselling business from scratch. We offer workshops, webinars, and resources on how to charge $1000 per client and keep 100% of the profits. The site includes a blog and contact options for support.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">Workshop &amp; Resources</h2>
              <p>
                Sign up for our free workshop to learn proven strategies for launching your marketing agency. We cover AI voice calling, CRM and email marketing, and WhatsApp marketing solutions. All content is designed to work on desktop and mobile.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">Features</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Free workshop signup and webinar access</li>
                <li>AI voice calling, CRM, and WhatsApp marketing solutions</li>
                <li>Resources and strategies for agency growth</li>
                <li>Mobile-responsive design</li>
                <li>Blog section and contact support</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">Contact</h2>
              <p>
                For questions or feedback, please use our{' '}
                <a href="/contact" className="text-amber-600 hover:text-amber-700 underline">
                  Contact
                </a>{' '}
                page.
              </p>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
