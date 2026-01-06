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
  faCrown,
} from '@fortawesome/free-solid-svg-icons';

export const metadata: Metadata = {
  title: 'Sponsorship & Subscription | RIF Roofing',
  description:
    'Sponsor the RIF platform or subscribe to premium placement and enhanced features for your roofing business.',
};

export default function SponsorshipSubscriptionPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <div className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl">
              <FontAwesomeIcon icon={faBullhorn} className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-rif-black mb-6 tracking-tight">
            Sponsorship & Subscription
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto font-light">
            Sponsor the RIF platform or subscribe to premium placement and enhanced features for your roofing business.
          </p>
        </div>
      </section>

      {/* Sponsorship Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-rif-black text-center mb-4">
            Platform Sponsorship
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Support the RIF platform and get prominent placement and branding opportunities.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="p-8 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border-2 border-purple-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-purple-500 rounded-xl">
                  <FontAwesomeIcon icon={faCrown} className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-rif-black">Premium Sponsorship</h3>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">
                Maximum visibility and branding opportunities across the platform.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Featured placement on homepage and key pages</span>
                </li>
                <li className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Logo and branding on multiple pages</span>
                </li>
                <li className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Dedicated sponsorship page</span>
                </li>
                <li className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Priority lead routing</span>
                </li>
                <li className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Custom marketing content and features</span>
                </li>
              </ul>
            </div>

            <div className="p-8 bg-gray-50 rounded-2xl border-2 border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-rif-blue-500 rounded-xl">
                  <FontAwesomeIcon icon={faStar} className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-rif-black">Standard Sponsorship</h3>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">
                Enhanced visibility and branding on selected pages.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-rif-blue-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Prominent placement on location pages</span>
                </li>
                <li className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-rif-blue-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Logo and branding on key pages</span>
                </li>
                <li className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-rif-blue-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Enhanced profile features</span>
                </li>
                <li className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-rif-blue-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Priority listing in directory</span>
                </li>
                <li className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-rif-blue-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Marketing support and analytics</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-rif-black text-center mb-4">
            Sponsored Listing
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Enhanced placement and features for your roofing business.
          </p>
          <div className="flex justify-center">
            <div className="p-8 bg-white rounded-2xl border-2 border-rif-blue-300 shadow-lg max-w-md w-full">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-semibold text-rif-black mb-2">Sponsored Listing</h3>
                <div className="text-4xl font-bold text-rif-blue-500 mb-1">$300</div>
                <p className="text-sm text-gray-500">Annually</p>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Enhanced placement on location pages</span>
                </li>
                <li className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Logo display on your profile</span>
                </li>
                <li className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Full contact information displayed</span>
                </li>
                <li className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Priority listing in directory</span>
                </li>
                <li className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Enhanced profile features</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-rif-black text-center mb-12">
            Benefits of Sponsorship & Subscription
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="p-4 bg-rif-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon icon={faRocket} className="h-8 w-8 text-rif-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-rif-black mb-3">Increased Visibility</h3>
              <p className="text-gray-600">
                Get in front of more potential customers with prominent placement and enhanced features.
              </p>
            </div>

            <div className="text-center">
              <div className="p-4 bg-rif-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon icon={faChartLine} className="h-8 w-8 text-rif-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-rif-black mb-3">More Leads</h3>
              <p className="text-gray-600">
                Benefit from RIF's SEO-focused marketing and lead generation efforts across Florida.
              </p>
            </div>

            <div className="text-center">
              <div className="p-4 bg-rif-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon icon={faUsers} className="h-8 w-8 text-rif-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-rif-black mb-3">Network Benefits</h3>
              <p className="text-gray-600">
                Join a network of certified professionals with training and support opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-rif-black mb-6">
            Interested in Sponsorship or Subscription?
          </h2>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            Contact us to discuss sponsorship opportunities or subscription plans tailored to your business needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:813-777-8272"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-rif-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-rif-blue-600 transition-colors"
            >
              <FontAwesomeIcon icon={faPhone} className="h-5 w-5" />
              Call: 813-777-8272
            </a>
            <a
              href="tel:813-803-4599"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-rif-blue-500 text-rif-blue-500 text-lg font-semibold rounded-lg hover:bg-rif-blue-50 transition-colors"
            >
              <FontAwesomeIcon icon={faPhone} className="h-5 w-5" />
              Office: 813-803-4599
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-300 text-gray-700 text-lg font-semibold rounded-lg hover:bg-gray-50 transition-colors"
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

