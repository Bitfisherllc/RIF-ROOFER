'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapLocationDot,
  faUsers,
  faBoxes,
  faBook,
  faHandshake,
  faChevronDown,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import Logo from './Logo';
import TopMenuBar from './TopMenuBar';
import ServiceAreaSearch from './ServiceAreaSearch';

export default function Header() {
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [partnershipsOpen, setPartnershipsOpen] = useState(false);

  return (
    <>
      <TopMenuBar />
      <header className="bg-white border-b border-gray-200 sticky top-14 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col gap-4">
            {/* Logo and Search Row */}
            <div className="flex items-center justify-between gap-4">
              <Link href="/" className="flex-shrink-0">
                <Logo variant="full" color="blue" width={180} priority />
              </Link>

              <div className="flex-1 max-w-2xl">
                <ServiceAreaSearch variant="hero" />
              </div>

              <Link
                href="/free-estimate"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white text-base font-semibold rounded-lg hover:bg-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex-shrink-0"
              >
                Free Estimate
                <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
