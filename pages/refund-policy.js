import Head from 'next/head';
import Link from 'next/link';
import Footer from '../components/designndev/Footer';

export default function RefundPolicyPage() {
  return (
    <>
      <Head>
        <title>Refund Policy | NextSaaS</title>
        <meta
          name="description"
          content="Next SaaS money back and refund policy."
        />
        <meta name="keywords" content="refund policy, NextSaaS, money back guarantee" />
        <meta property="og:title" content="Refund Policy | NextSaaS" />
        <meta property="og:type" content="website" />
      </Head>
      <div className="min-h-screen bg-slate-50">
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 sm:pt-12 sm:pb-20 md:py-16">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Next SaaS Money Back &amp; Refund Policy</h1>
          <p className="text-slate-500 text-sm mb-10">Effective Date: 01/11/2025</p>

          <div className="prose prose-slate max-w-none space-y-10 text-slate-700">
            <section>
              <p>
                At Next SaaS, we aim to ensure our clients get real business results while protecting our company
                from misuse. Please read this policy carefully — by making any purchase, you agree to all terms below.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">Sales guarantee</h2>
              <p>
                Next SaaS offers a &quot;Sales Guarantee&quot; only to clients who actively use the system and deliver a minimum
                of 30 qualified appointments per month.
              </p>
              <p>
                Qualified appointments&quot; mean meetings booked with potential clients who show genuine interest in SaaS
                services and have the ability and intent to purchase.
              </p>
              <p>
                The client must use Next SaaS tools correctly — including the CRM, automation, and ad setup system —
                and must not pause, delete, or misuse the account during the guarantee period.
              </p>
              <p>
                The client is not qualified for money back if he has purchased account under any discount, offer or not
                paid full amount.
              </p>
              <p>
                The Sales Guarantee applies only if all required proof (CRM data, booking links, etc.) is shared by the
                client for verification.Money back guarantee only applies to first year of subscription, from second
                year there is no sales or money back guarantee.
              </p>
              <p>
                If the client meets the above conditions and still fails to close sales, Next SaaS will offer a 100%
                money-back guarantee.
              </p>
              <p>
                Clients who do not meet the above criteria, or who partially complete the requirements, will not be
                eligible for any refund under this guarantee.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">Yearly Plan Policy</h2>
              <p>
                Yearly plan users get full access to all Next SaaS tools and features for 12 months from the date of
                activation.
              </p>
              <p>
                If for any reason Next SaaS discontinues operations, refunds will be issued only for the remaining
                unused months of the yearly subscription.
              </p>
              <p>
                Clients who have already sold Committed as per plan or more sub-accounts using their reselling account
                will not be eligible for any refund, as they have already earned from the service.
              </p>
              <p>
                If a client purchased the yearly plan under any discount, offer, or promotional code, they are not
                eligible for a refund.Client Must submit the invoice to claim refund, no refund applicable without
                invoice submission.
              </p>
              <p>
                Refunds, if applicable, will be processed only after internal verification and may take up to 45
                business days.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">Lifetime Plan Policy</h2>
              <p>
                The Lifetime Deal remains valid as long as the Next SaaS platform is active and operational.
              </p>
              <p>
                If Next SaaS, for any reason, discontinues its services or shuts down, the Lifetime Deal will
                automatically expire, and no refund or compensation will be issued.
              </p>
              <p>
                The lifetime deal becomes active only after full payment is received. Clients who fail to pay in full
                or miss any installment will have their deal voided.
              </p>
              <p>
                Clients who purchase the Lifetime Deal through any discount, coupon, or limited-time offer are not
                eligible for refunds under any circumstances.
              </p>
              <p>All Lifetime Deals are non-transferable and non-refundable once activated except Sales policy.</p>
              <p>Next SaaS reserves the right to modify, amend, or discontinue this policy without prior notice.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">Refund Request Process</h2>
              <p>If you meet the above conditions and applicable for money back:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Submit your refund request</li>
                <li>Provide access to your software dashboard for verification.</li>
              </ul>
              <p>We will review:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Number of appointments delivered</li>
                <li>Leads generated</li>
                <li>Training completion</li>
                <li>Lead authenticity (via random verification calls)</li>
              </ul>
              <p>Once approved, your refund will be processed within 30–45 business days.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">Contact Information</h2>
              <p>For all refund-related queries or support requests, please reach out to:</p>
              <p>
                Email:{' '}
                <a href="mailto:support@nextsaas.in" className="text-blue-600 hover:underline">
                  support@nextsaas.in
                </a>{' '}
                Support Hours: Monday to Friday, 12 PM – 5 PM (IST)
              </p>
              <p>
                This policy is designed to ensure transparency and fairness while protecting the integrity of our
                digital business. If you have further concerns, feel free to contact us prior to making a purchase.
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
