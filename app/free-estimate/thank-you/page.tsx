'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faPhone, faCalculator, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const STORAGE_KEY = 'rif-estimate-confirmation';

const PROJECT_TYPE_LABELS: Record<string, string> = {
  'new-installation': 'New stone-coated metal roof installation',
  'roof-replacement': 'Stone-coated metal roof replacement',
  repair: 'Repair',
  inspection: 'Inspection',
  maintenance: 'Maintenance',
  'materials-only': 'Materials-only quote',
  other: 'Other',
};

interface ConfirmationPayload {
  fullName: string;
  quoteType: 'installation' | 'materials-only';
  projectType: string;
  city: string;
  zipCode: string;
  rooferCount: number;
  productNames: string[];
  locationNames: string[];
}

export default function FreeEstimateThankYouPage() {
  const router = useRouter();
  const [payload, setPayload] = useState<ConfirmationPayload | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return;
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) {
        router.replace('/free-estimate');
        return;
      }
      const data = JSON.parse(raw) as ConfirmationPayload;
      setPayload(data);
      sessionStorage.removeItem(STORAGE_KEY);
      document.title = 'Thank You | Free Quote Request Received | RIF Roofing';
    } catch {
      router.replace('/free-estimate');
    }
  }, [mounted, router]);

  if (!mounted || !payload) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    );
  }

  const quoteDescription =
    payload.quoteType === 'installation'
      ? 'One of our preferred roofers will reach out to schedule a visit and provide a detailed installation quote.'
      : "We'll get back to you with materials-only pricing so you can plan your project or coordinate with your own installer.";

  const projectLabel =
    PROJECT_TYPE_LABELS[payload.projectType] ||
    (payload.quoteType === 'materials-only' ? 'Materials-only quote' : payload.projectType || 'Installation quote');

  return (
    <div className="min-h-screen bg-white">
      <section className="pt-24 pb-16 px-6 bg-gradient-to-b from-rif-blue-50 to-white">
        <div className="max-w-2xl mx-auto">
          <Link
            href="/free-estimate"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-rif-blue-600 mb-8"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="h-4 w-4" />
            Back to quote form
          </Link>

          <div className="flex justify-center mb-8">
            <div className="flex items-center justify-center w-20 h-20 bg-green-100 rounded-full">
              <FontAwesomeIcon icon={faCheckCircle} className="h-10 w-10 text-green-600" />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-semibold text-rif-black mb-4 text-center">
            Thank you for your request!
          </h1>

          <p className="text-lg text-gray-700 leading-relaxed mb-8 text-center">
            We&apos;ve received your quote request. {quoteDescription} No obligation—we&apos;re here to help.
          </p>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8 mb-10">
            <h2 className="text-xl font-semibold text-rif-black mb-4">Summary of your request</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex gap-3">
                <span className="text-gray-500 font-medium min-w-[120px]">Name</span>
                <span>{payload.fullName}</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gray-500 font-medium min-w-[120px]">Quote type</span>
                <span>
                  {payload.quoteType === 'installation' ? 'Installation quote' : 'Materials-only quote'}
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-gray-500 font-medium min-w-[120px]">Project</span>
                <span>{projectLabel}</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gray-500 font-medium min-w-[120px]">Location</span>
                <span>
                  {payload.city}
                  {payload.zipCode ? `, ${payload.zipCode}` : ''}
                </span>
              </li>
              {payload.rooferCount > 0 && (
                <li className="flex gap-3">
                  <span className="text-gray-500 font-medium min-w-[120px]">Favorite roofers</span>
                  <span>{payload.rooferCount} roofer{payload.rooferCount !== 1 ? 's' : ''} included</span>
                </li>
              )}
              {payload.productNames.length > 0 && (
                <li className="flex gap-3">
                  <span className="text-gray-500 font-medium min-w-[120px]">Products</span>
                  <span>{payload.productNames.join(', ')}</span>
                </li>
              )}
              {payload.locationNames.length > 0 && (
                <li className="flex gap-3">
                  <span className="text-gray-500 font-medium min-w-[120px]">Areas</span>
                  <span>{payload.locationNames.join(', ')}</span>
                </li>
              )}
            </ul>
          </div>

          <div className="bg-rif-blue-50 border border-rif-blue-200 rounded-2xl p-6 md:p-8 text-center">
            <h2 className="text-xl font-semibold text-rif-black mb-2">Prefer to talk to someone?</h2>
            <p className="text-gray-700 mb-6">
              You can call anytime for a warm body—no voicemail runaround. We&apos;re happy to answer questions or
              help with your quote request in person.
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

          <p className="text-center text-gray-600 mt-8 text-sm">
            We&apos;ll reach out at the email you provided. If you need anything in the meantime, just give us a call.
          </p>

          <p className="text-center text-gray-500 mt-6 text-sm">
            Your information is used only to process your quote request. We do not sell or share your data with third parties.
          </p>

          <div className="mt-10 text-center">
            <Link
              href="/free-estimate"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium"
            >
              <FontAwesomeIcon icon={faCalculator} className="h-4 w-4" />
              Submit another request
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
