import type { Metadata } from 'next';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBullhorn,
  faCheckCircle,
  faUsers,
  faChartLine,
  faPhone,
  faEnvelope,
  faArrowRight,
  faStar,
  faRocket,
  faDollarSign,
  faGlobe,
  faImage,
  faAddressCard,
  faArrowUp,
  faList,
  faHandshake,
  faFileSignature,
} from '@fortawesome/free-solid-svg-icons';

export const metadata: Metadata = {
  title: 'Sponsored results | RIF Roofing',
  description:
    'Get Sponsored results: premium placement, business address & phone, wholesale pricing, website listing, click-to-call, and logo branding on the RIF platform.',
};

const INCLUDED_FEATURES = [
  { icon: faList, label: 'Directory listing on location pages', description: 'Your company appears where Florida homeowners search for roofers.' },
  { icon: faAddressCard, label: 'Business address and phone displayed', description: 'Full contact details so customers can reach you directly.' },
  { icon: faDollarSign, label: 'Wholesale pricing', description: 'Access to wholesale pricing on materials through the RIF network.' },
  { icon: faArrowUp, label: 'Featured placement on key pages', description: 'Top placement so you stand out above general listings.' },
  { icon: faGlobe, label: 'Website listing', description: 'Your website linked on your profile for more traffic and leads.' },
  { icon: faPhone, label: 'Click to call', description: 'One-tap calling from your listing so hot leads reach you faster.' },
  { icon: faImage, label: 'Logo and branding opportunities', description: 'Your logo and brand on your profile and key pages.' },
  { icon: faStar, label: 'Enhanced profile features', description: 'A professional profile that builds trust with homeowners.' },
  { icon: faChartLine, label: 'Marketing support & analytics', description: 'Support and insights to help you get the most from your listing.' },
];

export default function SponsorshipSubscriptionPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero - light background, same blue palette */}
      <section className="pt-24 pb-16 px-6 bg-gradient-to-b from-rif-blue-50 to-white border-b border-rif-blue-100">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-8 flex justify-center">
            <div className="p-5 bg-rif-blue-100 rounded-3xl">
              <FontAwesomeIcon icon={faBullhorn} className="h-16 w-16 text-rif-blue-600" />
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-rif-black mb-6 tracking-tight">
            Sponsored results
          </h1>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto mb-4">
            Premium placement and enhanced features for maximum visibility and lead generation
          </p>
          <p className="text-base text-gray-600 max-w-2xl mx-auto mb-10">
            Get in front of more Florida homeowners with a Sponsored results subscription. One level, everything included.
          </p>
          <Link
            href="/partnerships/sponsorship-subscription/apply"
            className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-rif-blue-500 text-white text-lg font-semibold rounded-xl hover:bg-rif-blue-600 transition-colors shadow-md"
          >
            Sign up for Sponsored results
            <FontAwesomeIcon icon={faArrowRight} className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* What's included - single level, process + features */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-rif-black mb-4">
              Everything included in one subscription
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
              A single Sponsored results subscription includes the full set of benefits. No tiers, no upsells—just one straightforward plan designed to get your business in front of more customers.
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              After you submit your business information, you will receive an invoice by email. Our marketing team then reviews and analyzes the details you provide—including your website and reviews—to build your enhanced profile and add your listing and promotions across the site. You may review everything and request changes at any time. Our marketing team is at your service for updates and support whenever you need them, and is available by phone and email.
            </p>
          </div>
          <div className="max-w-3xl mx-auto mb-16 rounded-2xl bg-rif-blue-50 border-2 border-rif-blue-100 p-6 md:p-8">
            <h3 className="text-lg font-semibold text-rif-black mb-4">How it works</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-rif-blue-500 mt-0.5 flex-shrink-0" />
                <span>Submit your business information and receive your invoice via email.</span>
              </li>
              <li className="flex items-start gap-3">
                <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-rif-blue-500 mt-0.5 flex-shrink-0" />
                <span>Our marketing department researches and analyzes your information, including your website and reviews.</span>
              </li>
              <li className="flex items-start gap-3">
                <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-rif-blue-500 mt-0.5 flex-shrink-0" />
                <span>We create your enhanced profile page and add your promotions to the site.</span>
              </li>
              <li className="flex items-start gap-3">
                <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-rif-blue-500 mt-0.5 flex-shrink-0" />
                <span>You review the listing and can request changes at any time.</span>
              </li>
              <li className="flex items-start gap-3">
                <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-rif-blue-500 mt-0.5 flex-shrink-0" />
                <span>Our marketing team remains at your service for updates and support, available by phone and email whenever you need them.</span>
              </li>
            </ul>
          </div>
          <h3 className="text-2xl font-bold text-rif-black text-center mb-8">What you get</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INCLUDED_FEATURES.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-6 rounded-2xl border-2 border-rif-blue-100 bg-rif-blue-50/50 hover:border-rif-blue-200 hover:shadow-md transition-all"
              >
                <div className="p-3 bg-rif-blue-500 rounded-xl flex-shrink-0">
                  <FontAwesomeIcon icon={item.icon} className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-rif-black mb-1">{item.label}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Sponsored results - value props with icons */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-rif-black mb-4">
              Why choose Sponsored results?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stand out in the RIF directory and connect with more customers in your service area.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-lg text-center">
              <div className="p-5 bg-rif-blue-100 rounded-2xl w-fit mx-auto mb-6">
                <FontAwesomeIcon icon={faRocket} className="h-10 w-10 text-rif-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-rif-black mb-3">More visibility</h3>
              <p className="text-gray-600">
                Featured placement on key pages puts your business in front of homeowners when they search for roofers in Florida. You appear above general listings where it matters.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-lg text-center">
              <div className="p-5 bg-green-100 rounded-2xl w-fit mx-auto mb-6">
                <FontAwesomeIcon icon={faChartLine} className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-rif-black mb-3">More leads</h3>
              <p className="text-gray-600">
                RIF is built for search and discovery. With your address, phone, website, and click-to-call on your listing, qualified leads can reach you quickly and easily.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-lg text-center">
              <div className="p-5 bg-purple-100 rounded-2xl w-fit mx-auto mb-6">
                <FontAwesomeIcon icon={faUsers} className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-rif-black mb-3">Professional presence</h3>
              <p className="text-gray-600">
                Your logo, branding, and enhanced profile build trust with homeowners. Look like the pro you are and benefit from marketing support and analytics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Comparison Table - full chart from /partnerships */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-rif-black mb-4">
              How Sponsored results compares
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See what you get with Sponsored results versus other partnership levels.
            </p>
          </div>
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-2 border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="px-6 py-4 text-left font-bold bg-gray-100 text-gray-900">Feature</th>
                    <th className="px-6 py-4 text-center font-bold bg-card-green-500 text-white">Preferred Contractor</th>
                    <th className="px-6 py-4 text-center font-bold bg-rif-blue-500 text-white">Sponsored results</th>
                    <th className="px-6 py-4 text-center font-bold bg-gray-600 text-white">General Listing</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">Directory Listing</td>
                    <td className="px-6 py-4 text-center bg-card-green-100/50">
                      <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-card-green-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center bg-rif-blue-50">
                      <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-rif-blue-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center bg-gray-50">
                      <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-gray-500 mx-auto" />
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">Business address and phone</td>
                    <td className="px-6 py-4 text-center bg-card-green-100/50">
                      <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-card-green-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center bg-rif-blue-50">
                      <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-rif-blue-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center bg-gray-50">
                      <span className="text-gray-400">No</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">Business Profile Page</td>
                    <td className="px-6 py-4 text-center bg-card-green-100/50">
                      <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-card-green-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center bg-rif-blue-50">
                      <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-rif-blue-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center bg-gray-50">
                      <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-gray-500 mx-auto" />
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">Top Placement</td>
                    <td className="px-6 py-4 text-center bg-card-green-100/50">
                      <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-card-green-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center bg-rif-blue-50">
                      <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-rif-blue-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center bg-gray-50">
                      <span className="text-gray-400">No</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">Wholesale Pricing</td>
                    <td className="px-6 py-4 text-center bg-card-green-100/50">
                      <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-card-green-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center bg-rif-blue-50">
                      <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-rif-blue-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center bg-gray-50">
                      <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-gray-500 mx-auto" />
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">Priority Lead Routing</td>
                    <td className="px-6 py-4 text-center bg-card-green-100/50">
                      <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-card-green-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center bg-rif-blue-50">
                      <span className="text-gray-400">No</span>
                    </td>
                    <td className="px-6 py-4 text-center bg-gray-50">
                      <span className="text-gray-400">No</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">Website Listing</td>
                    <td className="px-6 py-4 text-center bg-card-green-100/50">
                      <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-card-green-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center bg-rif-blue-50">
                      <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-rif-blue-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center bg-gray-50">
                      <span className="text-gray-400">No</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">Click to call</td>
                    <td className="px-6 py-4 text-center bg-card-green-100/50">
                      <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-card-green-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center bg-rif-blue-50">
                      <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-rif-blue-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center bg-gray-50">
                      <span className="text-gray-400">No</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">Logo & Branding</td>
                    <td className="px-6 py-4 text-center bg-card-green-100/50">
                      <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-card-green-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center bg-rif-blue-50">
                      <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-rif-blue-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center bg-gray-50">
                      <span className="text-gray-400">No</span>
                    </td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td className="px-6 py-4 font-bold text-gray-900">Cost</td>
                    <td className="px-6 py-4 text-center font-semibold text-gray-900 bg-card-green-100/50">Free*</td>
                    <td className="px-6 py-4 text-center font-semibold text-gray-900 bg-rif-blue-50">Paid</td>
                    <td className="px-6 py-4 text-center font-semibold text-gray-900 bg-gray-50">Free</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <p className="text-sm text-gray-600 text-center">
                *Preferred Contractor listings are free but require qualification, training, and approval
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How to get started */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-rif-black mb-4">
              Get started in three steps
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Sign up, receive your invoice, and go live with Sponsored results.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-rif-blue-500 text-white text-xl font-bold mb-4">1</div>
              <FontAwesomeIcon icon={faFileSignature} className="h-10 w-10 text-rif-blue-500 mb-4" />
              <h3 className="text-lg font-semibold text-rif-black mb-2">Complete the signup form</h3>
              <p className="text-gray-600 text-sm">Share your business and contact details so we can set up your listing and send your invoice.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-rif-blue-500 text-white text-xl font-bold mb-4">2</div>
              <FontAwesomeIcon icon={faEnvelope} className="h-10 w-10 text-rif-blue-500 mb-4" />
              <h3 className="text-lg font-semibold text-rif-black mb-2">Receive your invoice</h3>
              <p className="text-gray-600 text-sm">We’ll send your invoice and get your subscription started. Payment options will be provided.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-rif-blue-500 text-white text-xl font-bold mb-4">3</div>
              <FontAwesomeIcon icon={faRocket} className="h-10 w-10 text-rif-blue-500 mb-4" />
              <h3 className="text-lg font-semibold text-rif-black mb-2">Go live</h3>
              <p className="text-gray-600 text-sm">Your Sponsored results listing goes live. You’ll appear in the directory with all included features.</p>
            </div>
          </div>
          <div className="text-center">
            <Link
              href="/partnerships/sponsorship-subscription/apply"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-rif-blue-500 text-white text-lg font-semibold rounded-xl hover:bg-rif-blue-600 transition-colors shadow-lg"
            >
              Sign up for Sponsored results
              <FontAwesomeIcon icon={faArrowRight} className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA - solid blue, form + real people, three contact options */}
      <section className="py-20 px-6 bg-rif-blue-600 text-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Get started—we&apos;re here to help
          </h2>
          <p className="text-xl text-blue-100 text-center max-w-3xl mx-auto mb-4 leading-relaxed">
            Use the signup form above to get your Sponsored results listing. We&apos;re real people in the industry, and we&apos;re available by phone whenever you want to talk.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/partnerships/sponsorship-subscription/apply"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-rif-blue-600 text-lg font-semibold rounded-xl hover:bg-blue-50 transition-colors shadow-lg"
            >
              Sign up for Sponsored results
              <FontAwesomeIcon icon={faArrowRight} className="h-5 w-5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href="tel:813-777-8272"
              className="block p-6 bg-white/10 hover:bg-white/15 rounded-2xl border-2 border-white/30 text-left transition-colors"
            >
              <div className="font-semibold text-white mb-1">Discuss Preferred Contractor options</div>
              <div className="text-blue-100 text-sm mb-2"><a href="https://prproofing.com/" target="_blank" rel="noopener noreferrer" className="text-blue-100 hover:text-white hover:underline">PRP Roofing (Premium Roofing Products)</a></div>
              <div className="flex items-center gap-2 text-white font-medium mt-3">
                <FontAwesomeIcon icon={faPhone} className="h-4 w-4" />
                813-777-8272
              </div>
              <p className="text-sm text-blue-100 mt-2">Chris Willingham, Owner Operator</p>
            </a>
            <a
              href="tel:410-430-6904"
              className="block p-6 bg-white/10 hover:bg-white/15 rounded-2xl border-2 border-white/30 text-left transition-colors"
            >
              <div className="font-semibold text-white mb-1">Ask questions about Sponsored results</div>
              <div className="text-blue-100 text-sm mb-2">Bitfisher Design (Marketing)</div>
              <div className="flex items-center gap-2 text-white font-medium mt-3">
                <FontAwesomeIcon icon={faPhone} className="h-4 w-4" />
                410-430-6904
              </div>
              <p className="text-sm text-blue-100 mt-2">Craig Costantino, Owner Operator, Creative Director</p>
            </a>
            <Link
              href="/marketing"
              className="block p-6 bg-white/10 hover:bg-white/15 rounded-2xl border-2 border-white/30 text-left transition-colors"
            >
              <div className="font-semibold text-white mb-1">The Full Package</div>
              <div className="text-blue-100 text-sm mb-2">Complete marketing: websites, print collateral, marketing & SEO</div>
              <div className="flex items-center gap-2 text-white font-medium mt-3">
                Marketing
                <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
