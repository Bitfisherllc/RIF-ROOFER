import type { Metadata } from 'next';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCertificate,
  faCheckCircle,
  faUsers,
  faDollarSign,
  faHandshake,
  faPhone,
  faEnvelope,
  faArrowRight,
  faShield,
  faChartLine,
} from '@fortawesome/free-solid-svg-icons';

export const metadata: Metadata = {
  title: 'Become a Preferred Contractor | RIF Roofing',
  description:
    'Join the RIF network as a Preferred Contractor. Get preferred placement, enhanced profiles, and access to premium materials at wholesale pricing.',
};

export default function PreferredContractorPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <div className="p-4 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl">
              <FontAwesomeIcon icon={faCertificate} className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-rif-black mb-6 tracking-tight">
            Become a Preferred Contractor
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto font-light">
            Join the RIF network as a Preferred Contractor and get top placement, enhanced profiles, and priority access to premium materials.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-rif-black text-center mb-12">
            Preferred Contractor Benefits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-rif-blue-500 rounded-xl">
                  <FontAwesomeIcon icon={faCertificate} className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-rif-black">Preferred Placement</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Your business appears first on location pages, giving you maximum visibility to potential customers in your service areas.
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-rif-blue-500 rounded-xl">
                  <FontAwesomeIcon icon={faUsers} className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-rif-black">Enhanced Profile</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Get a comprehensive profile page with reviews, certifications, service areas, and detailed business information.
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-rif-blue-500 rounded-xl">
                  <FontAwesomeIcon icon={faDollarSign} className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-rif-black">Wholesale Pricing</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Access distributor-level pricing on premium stone-coated metal roofing materials through our warehouse network.
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-rif-blue-500 rounded-xl">
                  <FontAwesomeIcon icon={faShield} className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-rif-black">Priority Materials Access</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Get faster access to inventory and priority availability after storms or during high-demand periods.
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-rif-blue-500 rounded-xl">
                  <FontAwesomeIcon icon={faChartLine} className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-rif-black">Marketing Support</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Benefit from RIF's SEO-focused marketing and lead generation efforts across Florida.
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-rif-blue-500 rounded-xl">
                  <FontAwesomeIcon icon={faHandshake} className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-rif-black">Network Benefits</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Join a network of certified professionals with training opportunities and quality standards support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-rif-black text-center mb-8">
            Preferred Contractor Requirements
          </h2>
          <div className="bg-white rounded-2xl p-8 border border-gray-200">
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <FontAwesomeIcon icon={faCheckCircle} className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-rif-black mb-1">Valid Florida Roofing License</h3>
                  <p className="text-gray-600">Must hold a current, active Florida roofing contractor license.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <FontAwesomeIcon icon={faCheckCircle} className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-rif-black mb-1">Insurance Coverage</h3>
                  <p className="text-gray-600">Adequate liability and workers' compensation insurance as required by state law.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <FontAwesomeIcon icon={faCheckCircle} className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-rif-black mb-1">Product Training</h3>
                  <p className="text-gray-600">Complete manufacturer training on stone-coated metal roofing systems.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <FontAwesomeIcon icon={faCheckCircle} className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-rif-black mb-1">Quality Standards</h3>
                  <p className="text-gray-600">Commitment to meeting RIF quality standards for installation and code compliance.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <FontAwesomeIcon icon={faCheckCircle} className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-rif-black mb-1">Service Area Coverage</h3>
                  <p className="text-gray-600">Ability to serve specific regions, counties, or cities in Florida.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-rif-black mb-6">
            Ready to Join the Network?
          </h2>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            Contact us to learn more about becoming a Preferred Contractor and start benefiting from the RIF network.
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


