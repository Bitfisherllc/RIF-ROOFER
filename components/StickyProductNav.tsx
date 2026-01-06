'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

interface StickyProductNavProps {
  logoPath: string;
  logoAlt: string;
  backToProductsHref: string;
  freeEstimateHref: string;
}

export default function StickyProductNav({
  logoPath,
  logoAlt,
  backToProductsHref,
  freeEstimateHref,
}: StickyProductNavProps) {
  const [isVisible, setIsVisible] = useState(false);

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

  if (!isVisible) return null;

  return (
    <div 
      className="fixed top-28 left-0 right-0 z-[55] bg-white border-b-2 border-rif-blue-200 shadow-xl transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 gap-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Image
              src={logoPath}
              alt={logoAlt}
              width={100}
              height={46}
              className="brightness-0"
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3">
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
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium bg-rif-blue-600 text-white rounded-lg hover:bg-rif-blue-700 transition-colors"
            >
              Get Free Estimate
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
















