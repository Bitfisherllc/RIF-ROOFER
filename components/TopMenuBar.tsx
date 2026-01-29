'use client';

import { useState, useEffect, useRef } from 'react';
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
  faBars,
  faTimes,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';

export default function TopMenuBar() {
  const pathname = usePathname();
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [partnershipsOpen, setPartnershipsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const resourcesRef = useRef<HTMLDivElement>(null);
  const partnershipsRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => pathname === path || pathname?.startsWith(path + '/');

  // Close dropdowns when pathname changes (navigation)
  useEffect(() => {
    setResourcesOpen(false);
    setPartnershipsOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (resourcesRef.current && !resourcesRef.current.contains(event.target as Node)) {
        setResourcesOpen(false);
      }
      if (partnershipsRef.current && !partnershipsRef.current.contains(event.target as Node)) {
        setPartnershipsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Mobile Top Bar */}
      <nav className="md:hidden bg-rif-blue-500 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-2 hover:bg-rif-blue-600 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} className="h-5 w-5" />
            </button>
            <Link
              href="/free-estimate"
              className="px-4 py-1.5 bg-green-500 text-white text-sm font-semibold rounded-lg hover:bg-green-600 transition-colors flex items-center gap-1"
            >
              Free Estimate
              <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Slide-out Menu */}
      <div
        className={`md:hidden fixed inset-0 z-50 transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setMobileMenuOpen(false)}></div>
        <div className="absolute left-0 top-0 bottom-0 w-80 bg-white shadow-xl overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-rif-blue-600">Menu</h2>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-500 hover:text-gray-700 p-2"
                aria-label="Close menu"
              >
                <FontAwesomeIcon icon={faTimes} className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex flex-col gap-2">
              <Link
                href="/service-areas"
                className={`flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                  isActive('/service-areas')
                    ? 'bg-rif-blue-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <FontAwesomeIcon icon={faMapLocationDot} className="h-5 w-5" />
                Service Areas
              </Link>
              <Link
                href="/roofers"
                className={`flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                  isActive('/roofers')
                    ? 'bg-rif-blue-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <FontAwesomeIcon icon={faUsers} className="h-5 w-5" />
                Roofer Directory
              </Link>
              <Link
                href="/products"
                className={`flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                  isActive('/products')
                    ? 'bg-rif-blue-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <FontAwesomeIcon icon={faBoxes} className="h-5 w-5" />
                Products
              </Link>
              
              {/* Resources Section */}
              <div className="pt-2">
                <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">Resources</div>
                <Link
                  href="/resources"
                  className={`flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                    isActive('/resources')
                      ? 'bg-rif-blue-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FontAwesomeIcon icon={faBook} className="h-5 w-5" />
                  Overview
                </Link>
                <Link
                  href="/guides"
                  className={`flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                    isActive('/guides')
                      ? 'bg-rif-blue-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FontAwesomeIcon icon={faBook} className="h-5 w-5" />
                  Guides
                </Link>
                <Link
                  href="/videos"
                  className={`flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                    isActive('/videos')
                      ? 'bg-rif-blue-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FontAwesomeIcon icon={faBook} className="h-5 w-5" />
                  Videos
                </Link>
                <Link
                  href="/glossary"
                  className={`flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                    isActive('/glossary')
                      ? 'bg-rif-blue-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FontAwesomeIcon icon={faBook} className="h-5 w-5" />
                  Glossary
                </Link>
                <Link
                  href="/faq"
                  className={`flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                    isActive('/faq')
                      ? 'bg-rif-blue-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FontAwesomeIcon icon={faBook} className="h-5 w-5" />
                  FAQ
                </Link>
              </div>

              {/* Partnerships Section */}
              <div className="pt-2">
                <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">Partnerships</div>
                <Link
                  href="/partnerships"
                  className={`flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                    isActive('/partnerships')
                      ? 'bg-rif-blue-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FontAwesomeIcon icon={faHandshake} className="h-5 w-5" />
                  Overview
                </Link>
                <Link
                  href="/partnerships/preferred-contractor"
                  className={`flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                    isActive('/partnerships/preferred-contractor')
                      ? 'bg-rif-blue-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FontAwesomeIcon icon={faHandshake} className="h-5 w-5" />
                  Preferred Contractor
                </Link>
                <Link
                  href="/partnerships/general-listings"
                  className={`flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                    isActive('/partnerships/general-listings')
                      ? 'bg-rif-blue-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FontAwesomeIcon icon={faHandshake} className="h-5 w-5" />
                  General Listings
                </Link>
                <Link
                  href="/partnerships/sponsorship-subscription"
                  className={`flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                    isActive('/partnerships/sponsorship-subscription')
                      ? 'bg-rif-blue-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FontAwesomeIcon icon={faHandshake} className="h-5 w-5" />
                  Sponsorship & Subscription
                </Link>
                <Link
                  href="/training"
                  className={`flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                    isActive('/training')
                      ? 'bg-rif-blue-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FontAwesomeIcon icon={faHandshake} className="h-5 w-5" />
                  Training Programs
                </Link>
                <Link
                  href="/partnerships/signup"
                  className={`flex items-center gap-3 px-4 py-3 text-base font-semibold text-rif-blue-600 bg-rif-blue-50 rounded-lg transition-colors ${
                    isActive('/partnerships/signup')
                      ? 'bg-rif-blue-100'
                      : 'hover:bg-rif-blue-100'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                  <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
                </Link>
              </div>

              {/* Right Navigation Items */}
              <div className="pt-4 border-t border-gray-200">
                <Link
                  href="/my-plan"
                  className={`flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                    isActive('/my-plan')
                      ? 'bg-rif-blue-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FontAwesomeIcon icon={faUser} className="h-5 w-5" />
                  My Plan
                </Link>
                <Link
                  href="/login"
                  className={`flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                    isActive('/login')
                      ? 'bg-rif-blue-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/contact"
                  className={`flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                    isActive('/contact')
                      ? 'bg-rif-blue-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FontAwesomeIcon icon={faEnvelope} className="h-5 w-5" />
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Top Bar */}
      <nav className="hidden md:block bg-gray-50 border-b border-gray-200 sticky top-0 z-40">
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
            <div className="relative" ref={resourcesRef}>
              <button
                onClick={() => setResourcesOpen(!resourcesOpen)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  resourcesOpen || isActive('/resources') || isActive('/guides') || isActive('/videos') || isActive('/glossary') || isActive('/faq')
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
                    href="/resources"
                    className="block px-4 py-2 text-sm font-semibold text-rif-blue-600 hover:bg-rif-blue-50 transition-colors"
                    onClick={() => setResourcesOpen(false)}
                  >
                    Overview
                  </Link>
                  <div className="border-t border-gray-200 my-1"></div>
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
            <div className="relative" ref={partnershipsRef}>
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
                    href="/partnerships"
                    className="block px-4 py-2 text-sm font-semibold text-rif-blue-600 hover:bg-rif-blue-50 transition-colors"
                    onClick={() => setPartnershipsOpen(false)}
                  >
                    Overview
                  </Link>
                  <div className="border-t border-gray-200 my-1"></div>
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
    </>
  );
}
