'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapLocationDot,
  faUsers,
  faBoxes,
  faBook,
  faHandshake,
  faChevronDown,
  faUser,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';

export default function TopMenuBar() {
  const pathname = usePathname();
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [partnershipsOpen, setPartnershipsOpen] = useState(false);

  const isActive = (path: string) => pathname === path || pathname?.startsWith(path + '/');

  return (
    <nav className="bg-gray-50 border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-14">
          {/* Left Navigation */}
          <div className="flex items-center gap-1">
            <Link
              href="/service-areas"
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive('/service-areas')
                  ? 'bg-rif-blue-500 text-white'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-rif-blue-600'
              }`}
            >
              <FontAwesomeIcon icon={faMapLocationDot} className="h-4 w-4" />
              Service Areas
            </Link>
            <Link
              href="/roofers"
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive('/roofers')
                  ? 'bg-rif-blue-500 text-white'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-rif-blue-600'
              }`}
            >
              <FontAwesomeIcon icon={faUsers} className="h-4 w-4" />
              Roofer Directory
            </Link>
            <Link
              href="/products"
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive('/products')
                  ? 'bg-rif-blue-500 text-white'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-rif-blue-600'
              }`}
            >
              <FontAwesomeIcon icon={faBoxes} className="h-4 w-4" />
              Products
            </Link>
            <div className="relative">
              <button
                onClick={() => setResourcesOpen(!resourcesOpen)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  resourcesOpen || isActive('/guides') || isActive('/videos') || isActive('/glossary') || isActive('/faq')
                    ? 'bg-rif-blue-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-rif-blue-600'
                }`}
              >
                <FontAwesomeIcon icon={faBook} className="h-4 w-4" />
                Resources
                <FontAwesomeIcon icon={faChevronDown} className="h-3 w-3" />
              </button>
              {resourcesOpen && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-[200px] z-50">
                  <Link
                    href="/guides"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-rif-blue-600 transition-colors"
                    onClick={() => setResourcesOpen(false)}
                  >
                    Guides
                  </Link>
                  <Link
                    href="/videos"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-rif-blue-600 transition-colors"
                    onClick={() => setResourcesOpen(false)}
                  >
                    Videos
                  </Link>
                  <Link
                    href="/glossary"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-rif-blue-600 transition-colors"
                    onClick={() => setResourcesOpen(false)}
                  >
                    Glossary
                  </Link>
                  <Link
                    href="/faq"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-rif-blue-600 transition-colors"
                    onClick={() => setResourcesOpen(false)}
                  >
                    FAQ
                  </Link>
                </div>
              )}
            </div>
            <div className="relative">
              <button
                onClick={() => setPartnershipsOpen(!partnershipsOpen)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  partnershipsOpen || 
                  isActive('/partnerships') || 
                  isActive('/partnerships/preferred-contractor') ||
                  isActive('/partnerships/general-listings') ||
                  isActive('/partnerships/sponsorship-subscription') ||
                  isActive('/partnerships/signup') ||
                  isActive('/training')
                    ? 'bg-rif-blue-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-rif-blue-600'
                }`}
              >
                <FontAwesomeIcon icon={faHandshake} className="h-4 w-4" />
                Partnerships
                <FontAwesomeIcon icon={faChevronDown} className="h-3 w-3" />
              </button>
              {partnershipsOpen && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-[200px] z-50">
                  <Link
                    href="/partnerships/preferred-contractor"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-rif-blue-600 transition-colors"
                    onClick={() => setPartnershipsOpen(false)}
                  >
                    Preferred Contractor
                  </Link>
                  <Link
                    href="/partnerships/general-listings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-rif-blue-600 transition-colors"
                    onClick={() => setPartnershipsOpen(false)}
                  >
                    General Listings
                  </Link>
                  <Link
                    href="/partnerships/sponsorship-subscription"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-rif-blue-600 transition-colors"
                    onClick={() => setPartnershipsOpen(false)}
                  >
                    Sponsorship & Subscription
                  </Link>
                  <Link
                    href="/training"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-rif-blue-600 transition-colors"
                    onClick={() => setPartnershipsOpen(false)}
                  >
                    Training Programs
                  </Link>
                  <div className="border-t border-gray-200 my-1"></div>
                  <Link
                    href="/partnerships/signup"
                    className="block px-4 py-2 text-sm font-semibold text-rif-blue-600 bg-rif-blue-50 hover:bg-rif-blue-100 hover:text-rif-blue-700 transition-colors rounded-md mx-1"
                    onClick={() => setPartnershipsOpen(false)}
                  >
                    Sign Up →
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Right Navigation */}
          <div className="flex items-center gap-1">
            <Link
              href="/my-plan"
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive('/my-plan')
                  ? 'bg-rif-blue-500 text-white'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-rif-blue-600'
              }`}
            >
              <FontAwesomeIcon icon={faUser} className="h-4 w-4" />
              My Plan
            </Link>
            <Link
              href="/login"
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive('/login')
                  ? 'bg-rif-blue-500 text-white'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-rif-blue-600'
              }`}
            >
              Login
            </Link>
            <Link
              href="/contact"
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive('/contact')
                  ? 'bg-rif-blue-500 text-white'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-rif-blue-600'
              }`}
            >
              <FontAwesomeIcon icon={faEnvelope} className="h-4 w-4" />
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
