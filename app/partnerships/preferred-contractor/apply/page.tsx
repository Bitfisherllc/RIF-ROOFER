'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import PreferredContractorApplyForm from '@/components/PreferredContractorApplyForm';

export default function PreferredContractorApplyPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="pt-20 pb-8 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/partnerships/preferred-contractor"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-rif-blue-600 mb-6"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="h-4 w-4" />
            Back to Preferred Contractor
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-card-green-500 rounded-xl">
              <FontAwesomeIcon icon={faUserTie} className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-semibold text-rif-black">
              Preferred Contractor Application
            </h1>
          </div>
          <p className="text-gray-700">
            Complete the form below with your business and licensing information. We&apos;ll review your application and get back to you.
          </p>
        </div>
      </section>

      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <PreferredContractorApplyForm />
        </div>
      </section>
    </div>
  );
}
