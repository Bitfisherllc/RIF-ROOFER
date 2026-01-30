'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faBars,
  faTimes,
  faHome,
  faList,
  faMap,
  faLocationDot,
  faBoxes,
  faBook,
  faBookOpen,
  faVideo,
  faCircleQuestion,
  faHandshake,
  faUserTie,
  faStar,
  faGraduationCap,
  faUser,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import AddToPlanButton from './AddToPlanButton';

interface StickyProductNavProps {
  logoPath: string;
  logoAlt: string;
  backToProductsHref: string;
  freeEstimateHref: string;
  /** When provided, shows "Add to plan" (heart) button for My Plan */
  productSlug?: string;
  productName?: string;
  productCategory?: string;
}

export default function StickyProductNav({
  logoPath,
  logoAlt,
  backToProductsHref,
  freeEstimateHref,
  productSlug,
  productName,
  productCategory,
}: StickyProductNavProps) {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path || pathname?.startsWith(path + '/');

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      // Show sticky nav after scrolling past the hero section (approximately 300px)
      const scrollPosition = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      // Calculate based on viewport height - show when scrolled past initial view
      setIsVisible(scrollPosition > 300);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  if (!isVisible) return null;

  return (
    <>
    <div 
      className="fixed top-0 left-0 right-0 z-[55] bg-white border-b-2 border-rif-blue-200 shadow-xl transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 gap-4">
          {/* Hamburger + Logo */}
          <div className="flex items-center gap-3 flex-shrink-0 min-w-0">
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-gray-700 hover:text-rif-blue-600 hover:bg-rif-blue-50 rounded-lg transition-colors"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} className="h-5 w-5" />
            </button>
            <div className="flex-shrink-0">
              <Image
                src={logoPath}
                alt={logoAlt}
                width={100}
                height={46}
                className="brightness-0"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3">
            {productSlug && productName && productCategory && (
              <AddToPlanButton
                productSlug={productSlug}
                productName={productName}
                productCategory={productCategory}
                productLogo={logoPath}
                variant="button"
              />
            )}
            <Link
              href={backToProductsHref}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-rif-blue-600 transition-colors"
            >
              <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3 rotate-180" />
              <span className="hidden sm:inline">Back to Products</span>
              <span className="sm:hidden">Products</span>
            </Link>
            <Link
              href={freeEstimateHref}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-medium bg-rif-blue-600 text-white rounded-lg hover:bg-rif-blue-700 transition-colors"
            >
              Get Free Estimate
            </Link>
          </div>
        </div>
      </div>
    </div>

    {/* Slide-out menu */}
    <div
      className={`fixed inset-0 z-[54] transition-transform duration-300 ease-in-out ${
        menuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
      aria-hidden={!menuOpen}
    >
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />
      <div className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-xl overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-rif-blue-600">Menu</h2>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100"
              aria-label="Close menu"
            >
              <FontAwesomeIcon icon={faTimes} className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex flex-col gap-1">
            <Link
              href="/"
              className={`flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                pathname === '/' ? 'bg-rif-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setMenuOpen(false)}
            >
              <FontAwesomeIcon icon={faHome} className="h-5 w-5" />
              Home
            </Link>
            <Link
              href="/roofers"
              className={`flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                isActive('/roofers') ? 'bg-rif-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setMenuOpen(false)}
            >
              <FontAwesomeIcon icon={faList} className="h-5 w-5" />
              Search Roofers
            </Link>
            <Link
              href="/roofers/map"
              className={`flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                isActive('/roofers/map') ? 'bg-rif-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setMenuOpen(false)}
            >
              <FontAwesomeIcon icon={faMap} className="h-5 w-5" />
              View Map
            </Link>
            <Link
              href="/roofers/near-me"
              className={`flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                isActive('/roofers/near-me') ? 'bg-rif-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setMenuOpen(false)}
            >
              <FontAwesomeIcon icon={faLocationDot} className="h-5 w-5" />
              Find Roofer Near Me
            </Link>
            <Link
              href="/products"
              className={`flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                isActive('/products') ? 'bg-rif-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setMenuOpen(false)}
            >
              <FontAwesomeIcon icon={faBoxes} className="h-5 w-5" />
              Products
            </Link>
            <div className="pt-2 mt-2 border-t border-gray-200">
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">Resources</div>
              <Link href="/resources" className={`flex items-center gap-3 px-4 py-2 text-base font-medium rounded-lg transition-colors ${isActive('/resources') ? 'bg-rif-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => setMenuOpen(false)}>
                <FontAwesomeIcon icon={faBook} className="h-5 w-5" />
                Resources
              </Link>
              <Link href="/guides" className={`flex items-center gap-3 px-4 py-2 text-base font-medium rounded-lg transition-colors ${isActive('/guides') ? 'bg-rif-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => setMenuOpen(false)}>
                <FontAwesomeIcon icon={faBookOpen} className="h-5 w-5" />
                Guides
              </Link>
              <Link href="/videos" className={`flex items-center gap-3 px-4 py-2 text-base font-medium rounded-lg transition-colors ${isActive('/videos') ? 'bg-rif-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => setMenuOpen(false)}>
                <FontAwesomeIcon icon={faVideo} className="h-5 w-5" />
                Videos
              </Link>
              <Link href="/faq" className={`flex items-center gap-3 px-4 py-2 text-base font-medium rounded-lg transition-colors ${isActive('/faq') ? 'bg-rif-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => setMenuOpen(false)}>
                <FontAwesomeIcon icon={faCircleQuestion} className="h-5 w-5" />
                FAQ
              </Link>
            </div>
            <div className="pt-2 mt-2 border-t border-gray-200">
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">Partnerships</div>
              <Link href="/partnerships" className={`flex items-center gap-3 px-4 py-2 text-base font-medium rounded-lg transition-colors ${isActive('/partnerships') && pathname === '/partnerships' ? 'bg-rif-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => setMenuOpen(false)}>
                <FontAwesomeIcon icon={faHandshake} className="h-5 w-5" />
                Overview
              </Link>
              <Link href="/partnerships/preferred-contractor" className={`flex items-center gap-3 px-4 py-2 text-base font-medium rounded-lg transition-colors ${isActive('/partnerships/preferred-contractor') ? 'bg-rif-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => setMenuOpen(false)}>
                <FontAwesomeIcon icon={faUserTie} className="h-5 w-5" />
                Preferred Contractor
              </Link>
              <Link href="/partnerships/sponsorship-subscription" className={`flex items-center gap-3 px-4 py-2 text-base font-medium rounded-lg transition-colors ${isActive('/partnerships/sponsorship-subscription') ? 'bg-rif-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => setMenuOpen(false)}>
                <FontAwesomeIcon icon={faStar} className="h-5 w-5" />
                Sponsored results
              </Link>
              <Link href="/training-schedule" className={`flex items-center gap-3 px-4 py-2 text-base font-medium rounded-lg transition-colors ${isActive('/training-schedule') ? 'bg-rif-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => setMenuOpen(false)}>
                <FontAwesomeIcon icon={faGraduationCap} className="h-5 w-5" />
                Training Schedule
              </Link>
              <Link href="/partnerships/signup" className={`flex items-center gap-3 px-4 py-2 text-base font-semibold text-rif-blue-600 bg-rif-blue-50 rounded-lg transition-colors hover:bg-rif-blue-100 ${isActive('/partnerships/signup') ? 'bg-rif-blue-100' : ''}`} onClick={() => setMenuOpen(false)}>
                Sign Up
                <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
              </Link>
            </div>
            <div className="pt-2 mt-2 border-t border-gray-200">
              <Link href="/my-plan" className={`flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg transition-colors ${isActive('/my-plan') ? 'bg-rif-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => setMenuOpen(false)}>
                <FontAwesomeIcon icon={faUser} className="h-5 w-5" />
                My Plan
              </Link>
              <Link href="/contact" className={`flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg transition-colors ${isActive('/contact') ? 'bg-rif-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => setMenuOpen(false)}>
                <FontAwesomeIcon icon={faEnvelope} className="h-5 w-5" />
                Contact
              </Link>
              <Link href="/free-estimate" className="flex items-center gap-3 px-4 py-3 text-base font-semibold text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors" onClick={() => setMenuOpen(false)}>
                Free Estimate
                <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </div>
    </>
  );
}

















