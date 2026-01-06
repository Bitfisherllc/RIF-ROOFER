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
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <div className="p-4 bg-rif-blue-500 rounded-2xl">
              <FontAwesomeIcon icon={faList} className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-rif-black mb-6 tracking-tight">
            General Listing Partnership
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto font-light">
            Get listed in the RIF directory and reach customers searching for roofing services in your service areas.
          </p>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-rif-black text-center mb-12">
            What's Included
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-rif-blue-500 rounded-xl">
                  <FontAwesomeIcon icon={faGlobe} className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-rif-black">Directory Listing</h3>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                Your business information listed in the RIF directory, appearing on relevant location pages.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faCheckCircle} className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Business name</span>
                </li>
                <li className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faCheckCircle} className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Service area information</span>
                </li>
                <li className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faCheckCircle} className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Link to your business profile page</span>
                </li>
              </ul>
            </div>

            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-rif-blue-500 rounded-xl">
                  <FontAwesomeIcon icon={faMapLocationDot} className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-rif-black">Location Page Presence</h3>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                Your business appears on location pages for the areas you serve, helping customers find you.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faCheckCircle} className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Listed on region, county, and city pages</span>
                </li>
                <li className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faCheckCircle} className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Appears in directory search results</span>
                </li>
                <li className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faCheckCircle} className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Linked from relevant service area pages</span>
                </li>
              </ul>
            </div>

            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-rif-blue-500 rounded-xl">
                  <FontAwesomeIcon icon={faUsers} className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-rif-black">Business Profile Page</h3>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                A dedicated profile page for your business with key information for potential customers.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faCheckCircle} className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>General information about your business, including reviews if available</span>
                </li>
              </ul>
            </div>

            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-rif-blue-500 rounded-xl">
                  <FontAwesomeIcon icon={faSearch} className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-rif-black">SEO Benefits</h3>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                Benefit from RIF's SEO-focused website that ranks well in search engines for roofing-related queries.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faCheckCircle} className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Increased online visibility</span>
                </li>
                <li className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faCheckCircle} className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Local search optimization</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-rif-black text-center mb-4">
            Listing Types Comparison
          </h2>
          <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
            Sponsored Roofers (These are paid listings). Preferred Roofers listings are free but must qualify and complete training and approval process.
          </p>
          <div className="bg-white rounded-2xl p-8 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-rif-black mb-4">General Listing</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Basic directory listing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Profile page with business info</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Appears on location pages</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
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
                  className="inline-flex items-center gap-2 mt-4 text-rif-blue-500 hover:text-rif-blue-600 font-medium"
                >
                  Learn more about Preferred Contractor
                  <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-rif-black mb-6">
            Ready to Get Listed?
          </h2>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            Contact us to add your business to the RIF directory and start reaching more customers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:813-777-8272"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-rif-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-rif-blue-600 transition-colors"
            >
              <FontAwesomeIcon icon={faPhone} className="h-5 w-5" />
              Call: 813-777-8272
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-rif-blue-500 text-rif-blue-500 text-lg font-semibold rounded-lg hover:bg-rif-blue-50 transition-colors"
            >
              <FontAwesomeIcon icon={faEnvelope} className="h-5 w-5" />
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

