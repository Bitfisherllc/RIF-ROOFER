import type { Metadata } from 'next';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHandshake,
  faUserTie,
  faList,
  faBullhorn,
  faCheckCircle,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';

export const metadata: Metadata = {
  title: 'Partnership Signup | RIF Roofing',
  description:
    'Choose your partnership level and sign up. Preferred Contractor, Sponsored results, or General Listings.',
};

export default function PartnershipSignupPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - match /partnerships style */}
      <section className="pt-24 pb-16 px-6 bg-gradient-to-b from-rif-blue-50 via-white to-gray-50">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-8 flex justify-center">
            <div className="p-5 bg-gradient-to-br from-rif-blue-500 to-rif-blue-600 rounded-3xl shadow-lg">
              <FontAwesomeIcon icon={faHandshake} className="h-16 w-16 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-rif-black mb-6 tracking-tight">
            Partnership Signup
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto font-light mb-4">
            Choose your partnership level and complete the signup form
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select the program that fits your business. Each option takes you to its application form.
          </p>
        </div>
      </section>

      {/* Choose Your Partnership Level - same style & verbiage as /partnerships, links to apply forms */}
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
            {/* Preferred Contractor Card - GREEN → preferred-contractor/apply */}
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
                href="/partnerships/preferred-contractor/apply"
                className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-card-green-500 text-white font-semibold rounded-lg hover:bg-card-green-600 transition-colors"
              >
                Apply Now
                <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
              </Link>
            </div>

            {/* Sponsored results Card - BLUE → sponsorship-subscription/apply */}
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
                href="/partnerships/sponsorship-subscription/apply"
                className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-rif-blue-500 text-white font-semibold rounded-lg hover:bg-rif-blue-600 transition-colors"
              >
                Sign up for Sponsored results
                <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
              </Link>
            </div>

            {/* General Listings Card - GREY → general-listings/apply */}
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
                href="/partnerships/general-listings/apply"
                className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors"
              >
                Apply for Listing
                <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
