import Head from 'next/head';
import Footer from '../components/designndev/Footer';
import ContactForm from '../components/designndev/ContactForm';

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact | GetPaid Workshop</title>
        <meta 
          name="description" 
          content="Get in touch with GetPaid Workshop. Questions, feedback, or sign up for our AI reselling workshop." 
        />
        <meta 
          name="keywords" 
          content="contact, feedback, workshop, GetPaid" 
        />
        <meta property="og:title" content="Contact | GetPaid Workshop" />
        <meta 
          property="og:description" 
          content="Get in touch with GetPaid Workshop." 
        />
        <meta property="og:type" content="website" />
      </Head>
      <div className="min-h-screen bg-slate-50">
        <main className="pt-10 pb-16 sm:pt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Contact Us
              </h1>
              <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto px-1">
                Questions about the workshop or ready to scale your AI software business? Get in touch—we&apos;re here to help.
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-12">
              <ContactForm showHeading={false} />

              <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-12 shadow-sm border-2 border-slate-200 w-full min-w-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  <div className="text-center md:text-left">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4">What You Get</h3>
                    <ul className="space-y-3 text-slate-600 text-sm sm:text-base">
                      <li>How to start & scale an AI software business in 30 days</li>
                      <li>No coding required—proven strategies that work</li>
                      <li>Charge $1000 per client & keep 100% profits</li>
                      <li>Workshop updates and exclusive insights</li>
                    </ul>
                  </div>

                  <div className="text-center md:text-left">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4">Reach Out For</h3>
                    <ul className="space-y-3 text-slate-600 text-sm sm:text-base">
                      <li>Workshop signup and webinar access</li>
                      <li>AI Voice, CRM & WhatsApp marketing solutions</li>
                      <li>Partnership or custom inquiries</li>
                      <li>General questions about GetPaid Workshop</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

