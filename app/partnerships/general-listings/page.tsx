import type { Metadata } from 'next';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faList,
  faCheckCircle,
  faUsers,
  faSearch,
  faPhone,
  faEnvelope,
  faArrowRight,
  faGlobe,
  faMapLocationDot,
} from '@fortawesome/free-solid-svg-icons';

export const metadata: Metadata = {
  title: 'General Listing Partnership | RIF Roofing',
  description:
    'Get listed in the RIF directory. Reach customers searching for roofing services in your area with a basic listing in our network.',
};

export default function GeneralListingsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - light background, same gray palette */}
      <section className="pt-20 pb-12 px-6 bg-gradient-to-b from-gray-50 to-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <div className="p-4 bg-gray-200 rounded-2xl">
              <FontAwesomeIcon icon={faList} className="h-12 w-12 text-gray-700" />
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-rif-black mb-6 tracking-tight">
            General Listing Partnership
          </h1>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
            Get listed in the RIF directory and reach customers searching for roofing services in your service areas.
          </p>
          <div className="mt-10">
            <Link
              href="/partnerships/general-listings/apply"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-700 text-white text-lg font-semibold rounded-lg hover:bg-gray-800 transition-colors shadow-md"
            >
              Apply for a General Listing
              <FontAwesomeIcon icon={faArrowRight} className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-rif-black text-center mb-12">
            What's Included
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-gray-50 rounded-2xl border-2 border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gray-600 rounded-xl">
                  <FontAwesomeIcon icon={faGlobe} className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-rif-black">Directory Listing</h3>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                Your business information listed in the RIF directory, appearing on relevant location pages.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faCheckCircle} className="h-4 w-4 text-gray-500 mt-1 flex-shrink-0" />
                  <span>Business name</span>
                </li>
                <li className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faCheckCircle} className="h-4 w-4 text-gray-500 mt-1 flex-shrink-0" />
                  <span>Service area information</span>
                </li>
                <li className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faCheckCircle} className="h-4 w-4 text-gray-500 mt-1 flex-shrink-0" />
                  <span>Link to your business profile page</span>
                </li>
              </ul>
            </div>

            <div className="p-6 bg-gray-50 rounded-2xl border-2 border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gray-600 rounded-xl">
                  <FontAwesomeIcon icon={faMapLocationDot} className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-rif-black">Location Page Presence</h3>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                Your business appears on location pages for the areas you serve, helping customers find you.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faCheckCircle} className="h-4 w-4 text-gray-500 mt-1 flex-shrink-0" />
                  <span>Listed on region, county, and city pages</span>
                </li>
                <li className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faCheckCircle} className="h-4 w-4 text-gray-500 mt-1 flex-shrink-0" />
                  <span>Appears in directory search results</span>
                </li>
                <li className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faCheckCircle} className="h-4 w-4 text-gray-500 mt-1 flex-shrink-0" />
                  <span>Linked from relevant service area pages</span>
                </li>
              </ul>
            </div>

            <div className="p-6 bg-gray-50 rounded-2xl border-2 border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gray-600 rounded-xl">
                  <FontAwesomeIcon icon={faUsers} className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-rif-black">Business Profile Page</h3>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                A dedicated profile page for your business with key information for potential customers.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faCheckCircle} className="h-4 w-4 text-gray-500 mt-1 flex-shrink-0" />
                  <span>General information about your business, including reviews if available</span>
                </li>
              </ul>
            </div>

            <div className="p-6 bg-gray-50 rounded-2xl border-2 border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gray-600 rounded-xl">
                  <FontAwesomeIcon icon={faSearch} className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-rif-black">SEO Benefits</h3>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                Benefit from RIF's SEO-focused website that ranks well in search engines for roofing-related queries.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faCheckCircle} className="h-4 w-4 text-gray-500 mt-1 flex-shrink-0" />
                  <span>Increased online visibility</span>
                </li>
                <li className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faCheckCircle} className="h-4 w-4 text-gray-500 mt-1 flex-shrink-0" />
                  <span>Local search optimization</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-16 px-6 bg-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-rif-black text-center mb-4">
            Listing Types Comparison
          </h2>
          <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
            Sponsored Roofers (These are paid listings). Preferred Roofers listings are free but must qualify and complete training and approval process.
          </p>
          <div className="bg-white rounded-2xl p-8 border-2 border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-rif-black mb-4">General Listing</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Basic directory listing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Profile page with business info</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Appears on location pages</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Listed after preferred contractors</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-rif-black mb-2">Preferred Contractor</h3>
                <p className="text-sm text-gray-600 mb-4 italic">
                  Free listings - must qualify and complete training and approval process
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Everything in General Listing, plus:</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Top placement on location pages</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Preferred badge and enhanced profile</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Wholesale pricing and priority materials</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Training and certification support</span>
                  </li>
                </ul>
                <Link
                  href="/partnerships/preferred-contractor"
                  className="inline-flex items-center gap-2 mt-4 text-gray-600 hover:text-gray-700 font-medium"
                >
                  Learn more about Preferred Contractor
                  <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
                </Link>
              </div>
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
            Use the application form above to get listed. We&apos;re real people in the roofing industry, and we&apos;re available by phone whenever you want to talk.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/partnerships/general-listings/apply"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-rif-blue-600 text-lg font-semibold rounded-xl hover:bg-blue-50 transition-colors shadow-lg"
            >
              Apply for a General Listing
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

