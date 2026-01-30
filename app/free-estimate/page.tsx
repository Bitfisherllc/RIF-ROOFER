'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator, faPhone } from '@fortawesome/free-solid-svg-icons';
import FreeEstimateForm from '@/components/FreeEstimateForm';

export default function FreeEstimatePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-6 bg-gradient-to-b from-rif-blue-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-rif-blue-500 rounded-full mb-6">
            <FontAwesomeIcon icon={faCalculator} className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-rif-black mb-6 tracking-tight">
            Free Stone-Coated Metal Roof Quote
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Request a <strong>stone-coated metal roof replacement or new installation quote</strong> from one of our preferred roofers, or a <strong>materials-only quote</strong>. For an installation quote, a preferred roofer will assess your project and provide a detailed estimate for labor and materials. For materials only, we can connect you with pricing so you can plan your project or coordinate with your own installer. No obligation—just tell us what you need.
          </p>
          <p className="mt-6 text-sm text-gray-500 max-w-2xl mx-auto">
            Your information is used only to process your quote request. We do not sell or share your data with third parties.
          </p>
        </div>
      </section>

      {/* Estimate Request Form */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <FreeEstimateForm />
        </div>
      </section>

      {/* Additional Information */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-rif-black mb-6">
            Prefer to Call?
          </h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Prefer to call? We can help you request a stone-coated metal roof installation quote from a preferred roofer or get you a materials-only quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:813-777-8272"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-rif-blue-500 text-white rounded-lg hover:bg-rif-blue-600 transition-colors font-medium"
            >
              <FontAwesomeIcon icon={faPhone} className="h-5 w-5" />
              Call: 813-777-8272
            </a>
            <a
              href="tel:813-803-4599"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-rif-blue-500 text-rif-blue-500 rounded-lg hover:bg-rif-blue-50 transition-colors font-medium"
            >
              <FontAwesomeIcon icon={faPhone} className="h-5 w-5" />
              Office: 813-803-4599
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
