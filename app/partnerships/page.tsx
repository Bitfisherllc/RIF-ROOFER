import type { Metadata } from 'next';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHandshake,
  faCertificate,
  faUserTie,
  faList,
  faBullhorn,
  faCheckCircle,
  faArrowRight,
  faUsers,
  faDollarSign,
  faShield,
  faChartLine,
  faStar,
  faRocket,
  faPhone,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';

export const metadata: Metadata = {
  title: 'Partnership Programs | RIF Roofing',
  description:
    'Join the RIF network through our partnership programs. Choose from Preferred Contractor, General Listings, or Sponsored results. Access training programs and grow your roofing business.',
};

export default function PartnershipsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6 bg-gradient-to-b from-rif-blue-50 via-white to-gray-50">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-8 flex justify-center">
            <div className="p-5 bg-gradient-to-br from-rif-blue-500 to-rif-blue-600 rounded-3xl shadow-lg">
              <FontAwesomeIcon icon={faHandshake} className="h-16 w-16 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-rif-black mb-6 tracking-tight">
            Partnership Programs
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto font-light mb-4">
            Join the RIF network and grow your roofing business with our comprehensive partnership programs
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From free listings to Sponsored results, we have options for every roofing professional in Florida.
          </p>
        </div>
      </section>

      {/* Partnership Levels Overview */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-rif-black mb-4">
              Choose Your Partnership Level
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Select the partnership program that best fits your business needs and goals
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Preferred Contractor Card - GREEN */}
            <div className="relative bg-card-green-100 rounded-3xl p-8 border-2 border-card-green-200 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 bg-card-green-500 text-white text-xs font-bold rounded-full whitespace-nowrap">
                  Certification Training
                </span>
              </div>
              <div className="mb-6">
                <div className="p-4 bg-card-green-500 rounded-2xl w-fit mb-4">
                  <FontAwesomeIcon icon={faUserTie} className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-rif-black mb-3">Preferred Contractor</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Top-tier partnership with preferred placement, wholesale pricing, and enhanced benefits. Must qualify and complete training.
                </p>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-card-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Top placement on location pages</span>
                </li>
                <li className="flex items-start gap-3">
                  <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-card-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Business address and phone displayed</span>
                </li>
                <li className="flex items-start gap-3">
                  <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-card-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Wholesale pricing on materials</span>
                </li>
                <li className="flex items-start gap-3">
                  <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-card-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Priority lead routing</span>
                </li>
                <li className="flex items-start gap-3">
                  <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-card-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Website listing</span>
                </li>
                <li className="flex items-start gap-3">
                  <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-card-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Click to call</span>
                </li>
                <li className="flex items-start gap-3">
                  <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-card-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Enhanced profile with reviews</span>
                </li>
                <li className="flex items-start gap-3">
                  <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-card-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Priority materials access</span>
                </li>
              </ul>
              <Link
                href="/partnerships/preferred-contractor"
                className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-card-green-500 text-white font-semibold rounded-lg hover:bg-card-green-600 transition-colors"
              >
                Learn More
                <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
              </Link>
            </div>

            {/* Sponsored results Card - BLUE */}
            <div className="relative bg-rif-blue-50 rounded-3xl p-8 border-2 border-rif-blue-200 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 bg-rif-blue-500 text-white text-xs font-bold rounded-full">
                  PAID
                </span>
              </div>
              <div className="mb-6">
                <div className="p-4 bg-rif-blue-500 rounded-2xl w-fit mb-4">
                  <FontAwesomeIcon icon={faBullhorn} className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-rif-black mb-3">Sponsored results</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Premium placement and enhanced features for maximum visibility and lead generation.
                </p>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-rif-blue-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Featured placement on key pages</span>
                </li>
                <li className="flex items-start gap-3">
                  <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-rif-blue-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Business address and phone displayed</span>
                </li>
                <li className="flex items-start gap-3">
                  <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-rif-blue-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Wholesale pricing</span>
                </li>
                <li className="flex items-start gap-3">
                  <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-rif-blue-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Logo and branding opportunities</span>
                </li>
                <li className="flex items-start gap-3">
                  <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-rif-blue-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Enhanced profile features</span>
                </li>
                <li className="flex items-start gap-3">
                  <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-rif-blue-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Marketing support & analytics</span>
                </li>
              </ul>
              <Link
                href="/partnerships/sponsorship-subscription"
                className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-rif-blue-500 text-white font-semibold rounded-lg hover:bg-rif-blue-600 transition-colors"
              >
                Learn More
                <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
              </Link>
            </div>

            {/* General Listings Card - GREY */}
            <div className="relative bg-gray-50 rounded-3xl p-8 border-2 border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 bg-gray-600 text-white text-xs font-bold rounded-full">
                  FREE
                </span>
              </div>
              <div className="mb-6">
                <div className="p-4 bg-gray-600 rounded-2xl w-fit mb-4">
                  <FontAwesomeIcon icon={faList} className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-rif-black mb-3">General Listings</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Basic directory listing to get your business in front of customers searching for roofing services.
                </p>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Directory listing on location pages</span>
                </li>
                <li className="flex items-start gap-3">
                  <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Business profile page</span>
                </li>
                <li className="flex items-start gap-3">
                  <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Wholesale pricing</span>
                </li>
                <li className="flex items-start gap-3">
                  <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Service area coverage</span>
                </li>
                <li className="flex items-start gap-3">
                  <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">SEO benefits from RIF platform</span>
                </li>
                <li className="flex items-start gap-3">
                  <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Appears after preferred contractors</span>
                </li>
              </ul>
              <Link
                href="/partnerships/general-listings"
                className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors"
              >
                Learn More
                <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-rif-black mb-4">
              Why Partner with RIF?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join a network that helps you grow your business and serve customers better
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="p-5 bg-rif-blue-100 rounded-2xl w-fit mx-auto mb-4">
                <FontAwesomeIcon icon={faUsers} className="h-10 w-10 text-rif-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-rif-black mb-3">Network of Professionals</h3>
              <p className="text-gray-600">
                Join a community of certified roofing professionals committed to quality and excellence.
              </p>
            </div>

            <div className="text-center">
              <div className="p-5 bg-yellow-100 rounded-2xl w-fit mx-auto mb-4">
                <FontAwesomeIcon icon={faDollarSign} className="h-10 w-10 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-rif-black mb-3">Cost Savings</h3>
              <p className="text-gray-600">
                Access wholesale pricing on premium materials and reduce your project costs.
              </p>
            </div>

            <div className="text-center">
              <div className="p-5 bg-green-100 rounded-2xl w-fit mx-auto mb-4">
                <FontAwesomeIcon icon={faChartLine} className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-rif-black mb-3">More Leads</h3>
              <p className="text-gray-600">
                Benefit from RIF's SEO-focused marketing and reach more customers in your service areas.
              </p>
            </div>

            <div className="text-center">
              <div className="p-5 bg-purple-100 rounded-2xl w-fit mx-auto mb-4">
                <FontAwesomeIcon icon={faShield} className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-rif-black mb-3">Quality Standards</h3>
              <p className="text-gray-600">
                Training and support to ensure your installations meet the highest quality standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-rif-black mb-4">
              Partnership Comparison
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Compare features across all partnership levels
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

      {/* CTA Section - solid blue, form + real people, three contact options */}
      <section className="py-20 px-6 bg-rif-blue-600 text-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Get started—we&apos;re here to help
          </h2>
          <p className="text-xl text-blue-100 text-center max-w-3xl mx-auto mb-4 leading-relaxed">
            Choose your partnership level above and use the signup form to apply. We&apos;re real people in the roofing industry, and we&apos;re available by phone whenever you want to talk.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/partnerships/signup"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-rif-blue-600 text-lg font-semibold rounded-xl hover:bg-blue-50 transition-colors shadow-lg"
            >
              Choose your partnership level & sign up
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

