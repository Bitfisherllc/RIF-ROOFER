import type { Metadata } from 'next';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGraduationCap,
  faCheckCircle,
  faArrowRight,
  faBook,
  faCertificate,
  faPhone,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';

export const metadata: Metadata = {
  title: 'Training | RiF Roofing',
  description:
    'Stone-coated metal roofing training through PRP (Premium Roofing Products), one of Florida\'s largest distributors. Product installation and sales education for all roofers. RiF Certification signals to customers that you\'re trained and trusted by RiF.',
};

export default function TrainingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - partnerships style */}
      <section className="pt-24 pb-16 px-6 bg-gradient-to-b from-rif-blue-50 via-white to-gray-50">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-8 flex justify-center">
            <div className="p-5 bg-gradient-to-br from-rif-blue-500 to-rif-blue-600 rounded-3xl shadow-lg">
              <FontAwesomeIcon icon={faGraduationCap} className="h-16 w-16 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-rif-black mb-6 tracking-tight">
            Training
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto font-light mb-4">
            Develop the skills to excel as a stone-coated metal roofing installer
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            All training is delivered through <strong>PRP (<a href="https://prproofing.com/" target="_blank" rel="noopener noreferrer" className="text-rif-blue-600 hover:underline">Premium Roofing Products</a>)</strong>, one of Florida&apos;s largest stone-coated roofing distributors. Classes are educational and open to all roofers—no obligation to participate with PRP or RiF. Training Certifications are not a license; They signal to customers that you&apos;ve been professionally trained on product installation.
          </p>
        </div>
      </section>

      {/* Who delivers training / RiF & PRP */}
      <section className="py-12 px-6 bg-white border-y border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-rif-black mb-4 text-center">Who We Are</h2>
          <p className="text-gray-700 leading-relaxed text-center">
            <strong>RiF (Roofers in Florida)</strong> is a division of <strong>PRP (<a href="https://prproofing.com/" target="_blank" rel="noopener noreferrer" className="text-rif-blue-600 hover:underline">Premium Roofing Products</a>)</strong>. PRP delivers all product training—expert knowledge on stone-coated metal installation and sales. RiF acts as a consultant to <strong>RiF Certified</strong> roofing companies, providing qualified leads to trusted roofers. Product training is for every roofer; participation with PRP or RiF is optional. The classes are purely educational and designed to give you expert-level product installation and sales knowledge.
          </p>
        </div>
      </section>

      {/* Two-card section - from Training Programs on partnerships */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-rif-blue-100 rounded-xl">
                  <FontAwesomeIcon icon={faBook} className="h-8 w-8 text-rif-blue-500" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-rif-black">Product Training</h3>
                  <p className="text-gray-600">For all roofers · delivered by PRP</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                Product training is open to <strong>all roofers</strong>. You get expert product installation and sales education from <strong>PRP (<a href="https://prproofing.com/" target="_blank" rel="noopener noreferrer" className="text-rif-blue-600 hover:underline">Premium Roofing Products</a>)</strong> and manufacturer reps. There is <strong>no obligation</strong> to participate with PRP or RiF—the training is purely educational. You can also learn about RiF Certification and Preferred Roofer partnership if you&apos;re interested.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Open to all roofers—no obligation to join PRP or RiF</span>
                </li>
                <li className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Expert product installation and sales education from PRP and manufacturer reps</span>
                </li>
                <li className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Hands-on training on stone-coated metal systems</span>
                </li>
                <li className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Installation best practices and code compliance</span>
                </li>
                <li className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Optional path to RiF Certification and Preferred Roofer partnership</span>
                </li>
              </ul>
              <Link
                href="/training-schedule"
                className="inline-flex items-center gap-2 text-rif-blue-500 font-semibold hover:text-rif-blue-600 transition-colors"
              >
                View Training Schedule
                <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-card-green-100 rounded-xl">
                  <FontAwesomeIcon icon={faCertificate} className="h-8 w-8 text-card-green-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-rif-black">RiF Certification & Partnership</h3>
                  <p className="text-gray-600">Not a license—trusted by RiF, preferred by customers</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>RiF Certification</strong> is not a license. It&apos;s a credential that tells customers you&apos;ve been trained on product installation and are trusted by RiF. RiF Certified companies can partner with RiF (a division of PRP) as Preferred Roofers—RiF acts as a consultant and provides qualified leads to trusted roofers. Training is still through PRP; certification is your choice after meeting RiF standards.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-card-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700"><strong>RiF Certification</strong>—a credential that shows customers you&apos;re trained on product installation and trusted by RiF</span>
                </li>
                <li className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-card-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Free optimized placement on the RiF website as a preferred roofer</span>
                </li>
                <li className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-card-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">RiF provides qualified leads to RiF Certified roofing companies</span>
                </li>
                <li className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-card-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Ongoing training and resource opportunities</span>
                </li>
              </ul>
              <Link
                href="/training-schedule"
                className="inline-flex items-center gap-2 text-card-green-600 font-semibold hover:text-card-green-700 transition-colors"
              >
                View Training Schedule
                <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-rif-black mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-700 mb-4 leading-relaxed">
            Have questions about our training programs? We're here to help. Call or email us for more information.
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
          <div className="mt-10">
            <Link
              href="/training-schedule"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-card-green-500 text-white text-lg font-semibold rounded-lg hover:bg-card-green-600 transition-colors"
            >
              View Training Schedule
              <FontAwesomeIcon icon={faArrowRight} className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
