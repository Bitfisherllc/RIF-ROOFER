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
      <header className="bg-white border-b border-gray-200 sticky md:top-14 top-14 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col gap-4">
            {/* Desktop: Logo, Search bar, and Free Estimate Row */}
            <div className="hidden md:flex items-end justify-between gap-4">
              <Link href="/" className="flex-shrink-0 flex items-center">
                <Logo variant="full" color="blue" width={180} priority />
              </Link>

              {/* Desktop: Search bar with text above */}
              <div className="flex-1 flex-col max-w-4xl relative">
                <div className="pl-12 mb-[-2px] z-10 relative">
                  <span className="inline-block px-4 py-1.5 bg-green-500 text-white text-sm font-bold uppercase rounded-t-2xl">
                    FIND A ROOFER NEAR ME
                  </span>
                </div>
                <ServiceAreaSearch variant="hero" />
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="h-5"></div>
                <Link
                  href="/free-estimate"
                  className="inline-flex items-center justify-center gap-2 px-6 h-[42px] bg-green-500 text-white text-base font-semibold rounded-2xl hover:bg-green-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex-shrink-0 animate-bounce-in border-2 border-transparent"
                >
                  Free Estimate
                  <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Mobile: Logo and Search bar in same row */}
            <div className="md:hidden flex items-end gap-4">
              <Link href="/" className="flex-shrink-0 flex items-center">
                <Logo variant="full" color="blue" width={180} priority />
              </Link>
              
              <div className="flex-1 flex flex-col relative">
                <div className="pl-12 mb-[-2px] z-10 relative">
                  <span className="inline-block px-4 py-1.5 bg-green-500 text-white text-sm font-bold uppercase rounded-t-2xl">
                    FIND A ROOFER NEAR ME
                  </span>
                </div>
                <ServiceAreaSearch variant="hero" />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
