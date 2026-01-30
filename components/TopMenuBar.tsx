'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapLocationDot,
  faLocationDot,
  faSun,
  faSearch,
  faBoxes,
  faBook,
  faHandshake,
  faChevronDown,
  faUser,
  faRightToBracket,
  faEnvelope,
  faBars,
  faTimes,
  faArrowRight,
  faList,
  faMap,
  faCircleInfo,
  faBookOpen,
  faVideo,
  faCircleQuestion,
  faUserTie,
  faStar,
  faGraduationCap,
} from '@fortawesome/free-solid-svg-icons';
import Logo from './Logo';

export default function TopMenuBar() {
  const pathname = usePathname();
  const [roofersOpen, setRoofersOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [partnershipsOpen, setPartnershipsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const roofersRef = useRef<HTMLDivElement>(null);
  const resourcesRef = useRef<HTMLDivElement>(null);
  const partnershipsRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => pathname === path || pathname?.startsWith(path + '/');

  // Partnerships section = main page, any sub-route (including apply), or training pages
  const isPartnershipsSection =
    (pathname?.startsWith('/partnerships') ?? false) ||
    pathname === '/training' ||
    (pathname?.startsWith('/training-schedule') ?? false);

  // Close dropdowns when pathname changes (navigation)
  useEffect(() => {
    setRoofersOpen(false);
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
      if (roofersRef.current && !roofersRef.current.contains(event.target as Node)) {
        setRoofersOpen(false);
      }
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
          <div className="flex items-center justify-between h-14 gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-2 hover:bg-rif-blue-600 rounded-lg transition-colors flex-shrink-0"
              aria-label="Toggle menu"
            >
              <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} className="h-5 w-5" />
            </button>
            <Link href="/" className="flex-1 flex justify-center min-w-0">
              <Logo variant="full" color="white" width={140} priority />
            </Link>
            <Link
              href="/free-estimate"
              className="px-4 py-1.5 bg-green-500 text-white text-sm font-semibold rounded-lg hover:bg-green-600 transition-colors flex items-center gap-1 flex-shrink-0"
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
              {/* Florida Roofer Directory section */}
              <div className="pt-0">
                <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase flex items-center gap-2">
                  <FontAwesomeIcon icon={faSun} className="h-4 w-4" />
                  Florida Roofer Directory
                </div>
                <Link
                  href="/roofers"
                  className={`flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                    isActive('/roofers')
                      ? 'bg-rif-blue-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FontAwesomeIcon icon={faList} className="h-5 w-5" />
                  Search All Roofers
                </Link>
                <Link
                  href="/roofers/search"
                  className={`flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                    isActive('/roofers/search')
                      ? 'bg-rif-blue-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FontAwesomeIcon icon={faSearch} className="h-5 w-5" />
                  Search Roofing Companies
                </Link>
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
                  Explore Service Areas
                </Link>
                <Link
                  href="/roofers/map"
                  className={`flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                    isActive('/roofers/map')
                      ? 'bg-rif-blue-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FontAwesomeIcon icon={faMap} className="h-5 w-5" />
                  View Map
                </Link>
                <Link
                  href="/roofers/near-me"
                  className={`flex items-center gap-3 px-4 py-3 text-base font-semibold text-rif-blue-600 bg-rif-blue-50 rounded-lg transition-colors ${
                    isActive('/roofers/near-me')
                      ? 'bg-rif-blue-100'
                      : 'hover:bg-rif-blue-100'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FontAwesomeIcon icon={faLocationDot} className="h-5 w-5" />
                  Find Closest Roofer
                  <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
                </Link>
              </div>
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
                <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase flex items-center gap-2">
                  <FontAwesomeIcon icon={faBook} className="h-4 w-4" />
                  Resources
                </div>
                <Link
                  href="/resources"
                  className={`flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                    isActive('/resources')
                      ? 'bg-rif-blue-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FontAwesomeIcon icon={faCircleInfo} className="h-5 w-5" />
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
                  <FontAwesomeIcon icon={faBookOpen} className="h-5 w-5" />
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
                  <FontAwesomeIcon icon={faVideo} className="h-5 w-5" />
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
                  <FontAwesomeIcon icon={faCircleQuestion} className="h-5 w-5" />
                  FAQ
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
                  <FontAwesomeIcon icon={faRightToBracket} className="h-5 w-5" />
                  Login
                </Link>
                {/* Roofers: Get Listed Section */}
                <div className="pt-2">
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase flex items-center gap-2">
                    <FontAwesomeIcon icon={faHandshake} className="h-4 w-4" />
                    Roofers: Get Listed
                  </div>
                  <Link
                    href="/partnerships"
                    className={`flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                      isActive('/partnerships')
                        ? 'bg-rif-blue-500 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FontAwesomeIcon icon={faCircleInfo} className="h-5 w-5" />
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
                    <FontAwesomeIcon icon={faUserTie} className="h-5 w-5" />
                    Preferred Contractor
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
                    <FontAwesomeIcon icon={faStar} className="h-5 w-5" />
                    Sponsored results
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
                    <FontAwesomeIcon icon={faList} className="h-5 w-5" />
                    General Listings
                  </Link>
                  <Link
                    href="/training-schedule"
                    className={`flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                      isActive('/training-schedule')
                        ? 'bg-rif-blue-500 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FontAwesomeIcon icon={faGraduationCap} className="h-5 w-5" />
                    Training Schedule
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
            <div className="relative" ref={roofersRef}>
              <button
                onClick={() => setRoofersOpen(!roofersOpen)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  roofersOpen || isActive('/roofers') || isActive('/service-areas') || pathname === '/roofers/near-me' || pathname === '/roofers/search' || pathname === '/roofers/map'
                    ? 'bg-rif-blue-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-rif-blue-600'
                }`}
              >
                <FontAwesomeIcon icon={faSun} className="h-4 w-4" />
                Florida Roofer Directory
                <FontAwesomeIcon icon={faChevronDown} className="h-3 w-3" />
              </button>
              {roofersOpen && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-[220px] z-50">
                  <Link
                    href="/roofers"
                    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-rif-blue-600 hover:bg-rif-blue-50 transition-colors"
                    onClick={() => setRoofersOpen(false)}
                  >
                    <FontAwesomeIcon icon={faList} className="h-4 w-4" />
                    Search All Roofers
                  </Link>
                  <Link
                    href="/roofers/search"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-rif-blue-600 transition-colors"
                    onClick={() => setRoofersOpen(false)}
                  >
                    <FontAwesomeIcon icon={faSearch} className="h-4 w-4" />
                    Search Roofing Companies
                  </Link>
                  <div className="border-t border-gray-200 my-1"></div>
                  <Link
                    href="/service-areas"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-rif-blue-600 transition-colors"
                    onClick={() => setRoofersOpen(false)}
                  >
                    <FontAwesomeIcon icon={faMapLocationDot} className="h-4 w-4" />
                    Explore Service Areas
                  </Link>
                  <Link
                    href="/roofers/map"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-rif-blue-600 transition-colors"
                    onClick={() => setRoofersOpen(false)}
                  >
                    <FontAwesomeIcon icon={faMap} className="h-4 w-4" />
                    View Map
                  </Link>
                  <div className="border-t border-gray-200 my-1"></div>
                  <Link
                    href="/roofers/near-me"
                    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-rif-blue-600 bg-rif-blue-50 hover:bg-rif-blue-100 hover:text-rif-blue-700 transition-colors rounded-md mx-1"
                    onClick={() => setRoofersOpen(false)}
                  >
                    <FontAwesomeIcon icon={faLocationDot} className="h-4 w-4" />
                    Find Closest Roofer →
                  </Link>
                </div>
              )}
            </div>
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
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-[220px] z-50">
                  <Link
                    href="/resources"
                    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-rif-blue-600 hover:bg-rif-blue-50 transition-colors"
                    onClick={() => setResourcesOpen(false)}
                  >
                    <FontAwesomeIcon icon={faCircleInfo} className="h-4 w-4" />
                    Overview
                  </Link>
                  <div className="border-t border-gray-200 my-1"></div>
                  <Link
                    href="/guides"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-rif-blue-600 transition-colors"
                    onClick={() => setResourcesOpen(false)}
                  >
                    <FontAwesomeIcon icon={faBookOpen} className="h-4 w-4" />
                    Guides
                  </Link>
                  <Link
                    href="/videos"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-rif-blue-600 transition-colors"
                    onClick={() => setResourcesOpen(false)}
                  >
                    <FontAwesomeIcon icon={faVideo} className="h-4 w-4" />
                    Videos
                  </Link>
                  <Link
                    href="/glossary"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-rif-blue-600 transition-colors"
                    onClick={() => setResourcesOpen(false)}
                  >
                    <FontAwesomeIcon icon={faBook} className="h-4 w-4" />
                    Glossary
                  </Link>
                  <Link
                    href="/faq"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-rif-blue-600 transition-colors"
                    onClick={() => setResourcesOpen(false)}
                  >
                    <FontAwesomeIcon icon={faCircleQuestion} className="h-4 w-4" />
                    FAQ
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
              <FontAwesomeIcon icon={faRightToBracket} className="h-4 w-4" />
              Login
            </Link>
            <div className="relative" ref={partnershipsRef}>
              <button
                onClick={() => setPartnershipsOpen(!partnershipsOpen)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  partnershipsOpen || isPartnershipsSection
                    ? 'bg-rif-blue-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-rif-blue-600'
                }`}
              >
                <FontAwesomeIcon icon={faHandshake} className="h-4 w-4" />
                Roofers: Get Listed
                <FontAwesomeIcon icon={faChevronDown} className="h-3 w-3" />
              </button>
              {partnershipsOpen && (
                <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-[220px] z-50">
                  <Link
                    href="/partnerships"
                    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-rif-blue-600 hover:bg-rif-blue-50 transition-colors"
                    onClick={() => setPartnershipsOpen(false)}
                  >
                    <FontAwesomeIcon icon={faCircleInfo} className="h-4 w-4" />
                    Overview
                  </Link>
                  <div className="border-t border-gray-200 my-1"></div>
                  <Link
                    href="/partnerships/preferred-contractor"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-rif-blue-600 transition-colors"
                    onClick={() => setPartnershipsOpen(false)}
                  >
                    <FontAwesomeIcon icon={faUserTie} className="h-4 w-4" />
                    Preferred Contractor
                  </Link>
                  <Link
                    href="/partnerships/sponsorship-subscription"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-rif-blue-600 transition-colors"
                    onClick={() => setPartnershipsOpen(false)}
                  >
                    <FontAwesomeIcon icon={faStar} className="h-4 w-4" />
                    Sponsored results
                  </Link>
                  <Link
                    href="/partnerships/general-listings"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-rif-blue-600 transition-colors"
                    onClick={() => setPartnershipsOpen(false)}
                  >
                    <FontAwesomeIcon icon={faList} className="h-4 w-4" />
                    General Listings
                  </Link>
                  <Link
                    href="/training"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-rif-blue-600 transition-colors"
                    onClick={() => setPartnershipsOpen(false)}
                  >
                    <FontAwesomeIcon icon={faGraduationCap} className="h-4 w-4" />
                    Training
                  </Link>
                  <Link
                    href="/training-schedule"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-rif-blue-600 transition-colors"
                    onClick={() => setPartnershipsOpen(false)}
                  >
                    <FontAwesomeIcon icon={faGraduationCap} className="h-4 w-4" />
                    Training Schedule
                  </Link>
                  <div className="border-t border-gray-200 my-1"></div>
                  <Link
                    href="/partnerships/signup"
                    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-rif-blue-600 bg-rif-blue-50 hover:bg-rif-blue-100 hover:text-rif-blue-700 transition-colors rounded-md mx-1"
                    onClick={() => setPartnershipsOpen(false)}
                  >
                    <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
                    Sign Up →
                  </Link>
                </div>
              )}
            </div>
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
