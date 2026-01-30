'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import GeneralListingsApplyForm from '@/components/GeneralListingsApplyForm';

export default function GeneralListingsApplyPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="pt-20 pb-8 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/partnerships/general-listings"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-rif-blue-600 mb-6"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="h-4 w-4" />
            Back to General Listings
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-rif-blue-500 rounded-xl">
              <FontAwesomeIcon icon={faList} className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-semibold text-rif-black">
              Apply for a General Listing
            </h1>
          </div>
          <p className="text-gray-700">
            Submit your business details to get listed in the RIF directory. We will review and add you to the relevant location pages.
          </p>
        </div>
      </section>

      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <GeneralListingsApplyForm />
        </div>
      </section>
    </div>
  );
}
