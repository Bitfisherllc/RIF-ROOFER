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
  faBullhorn,
  faUserTie,
} from '@fortawesome/free-solid-svg-icons';

export const metadata: Metadata = {
  title: 'Become a Preferred Contractor | RIF Roofing',
  description:
    'Join the RIF network as a Preferred Contractor. Get qualified leads from our partner roofing distributor, preferred placement, and access to premium materials at wholesale pricing.',
};

export default function PreferredContractorPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - light background, same green palette */}
      <section className="pt-20 pb-12 px-6 bg-gradient-to-b from-card-green-100 to-white border-b border-card-green-200">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <div className="p-4 bg-card-green-200 rounded-2xl">
              <FontAwesomeIcon icon={faUserTie} className="h-12 w-12 text-card-green-700" />
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-rif-black mb-6 tracking-tight">
            Become a Preferred Contractor
          </h1>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
            Join the RIF network as a Preferred Contractor and receive qualified leads from our partner roofing distributor—plus top placement, enhanced profiles, and priority access to premium materials.
          </p>
          <div className="mt-10">
            <Link
              href="/partnerships/preferred-contractor/apply"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-card-green-600 text-white text-lg font-semibold rounded-lg hover:bg-card-green-700 transition-colors shadow-md"
            >
              Apply to Become a Preferred Contractor
              <FontAwesomeIcon icon={faArrowRight} className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-rif-black text-center mb-12">
            Preferred Contractor Benefits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* #1 Benefit: Leads from partner distributor */}
            <div className="md:col-span-2 lg:col-span-3 p-8 bg-card-green-100 rounded-2xl border-2 border-card-green-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-card-green-500 rounded-xl">
                  <FontAwesomeIcon icon={faBullhorn} className="h-7 w-7 text-white" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wide text-card-green-600">Biggest benefit</span>
                  <h3 className="text-2xl font-semibold text-rif-black">Leads from Our Partner Roofing Distributor</h3>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg max-w-3xl">
                Get qualified leads directly from our partner roofing distributor company. Preferred contractors receive referrals and project leads from our distributor network—pre-vetted opportunities that help you grow your business.
              </p>
            </div>

            <div className="p-6 bg-card-green-100/50 rounded-2xl border-2 border-card-green-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-card-green-500 rounded-xl">
                  <FontAwesomeIcon icon={faUserTie} className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-rif-black">Preferred Placement</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Your business appears first on location pages, giving you maximum visibility to potential customers in your service areas.
              </p>
            </div>

            <div className="p-6 bg-card-green-100/50 rounded-2xl border-2 border-card-green-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-card-green-500 rounded-xl">
                  <FontAwesomeIcon icon={faUsers} className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-rif-black">Enhanced Profile</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Get a comprehensive profile page with reviews, certifications, service areas, and detailed business information.
              </p>
            </div>

            <div className="p-6 bg-card-green-100/50 rounded-2xl border-2 border-card-green-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-card-green-500 rounded-xl">
                  <FontAwesomeIcon icon={faDollarSign} className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-rif-black">Wholesale Pricing</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Access distributor-level pricing on premium stone-coated metal roofing materials through our warehouse network.
              </p>
            </div>

            <div className="p-6 bg-card-green-100/50 rounded-2xl border-2 border-card-green-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-card-green-500 rounded-xl">
                  <FontAwesomeIcon icon={faShield} className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-rif-black">Priority Materials Access</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Get faster access to inventory and priority availability after storms or during high-demand periods.
              </p>
            </div>

            <div className="p-6 bg-card-green-100/50 rounded-2xl border-2 border-card-green-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-card-green-500 rounded-xl">
                  <FontAwesomeIcon icon={faChartLine} className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-rif-black">Marketing Support</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Benefit from RIF's SEO-focused marketing and lead generation efforts across Florida.
              </p>
            </div>

            <div className="p-6 bg-card-green-100/50 rounded-2xl border-2 border-card-green-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-card-green-500 rounded-xl">
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
      <section className="py-16 px-6 bg-card-green-100/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-rif-black text-center mb-8">
            Preferred Contractor Requirements
          </h2>
          <div className="bg-white rounded-2xl p-8 border-2 border-card-green-200">
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <FontAwesomeIcon icon={faCheckCircle} className="h-6 w-6 text-card-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-rif-black mb-1">Valid Florida Roofing License</h3>
                  <p className="text-gray-600">Must hold a current, active Florida roofing contractor license.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <FontAwesomeIcon icon={faCheckCircle} className="h-6 w-6 text-card-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-rif-black mb-1">Insurance Coverage</h3>
                  <p className="text-gray-600">Adequate liability and workers' compensation insurance as required by state law.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <FontAwesomeIcon icon={faCheckCircle} className="h-6 w-6 text-card-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-rif-black mb-1">Product Training</h3>
                  <p className="text-gray-600">Complete manufacturer training on stone-coated metal roofing systems.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <FontAwesomeIcon icon={faCheckCircle} className="h-6 w-6 text-card-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-rif-black mb-1">Quality Standards</h3>
                  <p className="text-gray-600">Commitment to meeting RIF quality standards for installation and code compliance.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <FontAwesomeIcon icon={faCheckCircle} className="h-6 w-6 text-card-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-rif-black mb-1">Service Area Coverage</h3>
                  <p className="text-gray-600">Ability to serve specific regions, counties, or cities in Florida.</p>
                </div>
              </li>
            </ul>
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
            Use the application form above to apply. We&apos;re real people in the roofing industry, and we&apos;re available by phone whenever you want to talk.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/partnerships/preferred-contractor/apply"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-rif-blue-600 text-lg font-semibold rounded-xl hover:bg-blue-50 transition-colors shadow-lg"
            >
              Apply to become a Preferred Contractor
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


