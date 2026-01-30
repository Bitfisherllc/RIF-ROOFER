'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapLocationDot,
  faLocationDot,
  faSearch,
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

const PRODUCT_DETAIL_THRESHOLD = 300;

export default function Header() {
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [partnershipsOpen, setPartnershipsOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isSearchRoofersPage = pathname === '/roofers/search';
  const qFromUrl = searchParams.get('q') ?? '';
  const [companyQuery, setCompanyQuery] = useState(qFromUrl);

  const isProductDetailPage = Boolean(
    pathname?.startsWith('/products/') && pathname !== '/products' && !pathname.replace(/^\/products\/?/, '').includes('/')
  );
  const [hideHeader, setHideHeader] = useState(false);
  const headerInnerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    if (isSearchRoofersPage) setCompanyQuery(qFromUrl);
  }, [isSearchRoofersPage, qFromUrl]);

  useEffect(() => {
    if (!isProductDetailPage) return;
    const el = headerInnerRef.current;
    const measure = () => {
      if (el) setHeaderHeight(el.offsetHeight);
    };
    measure();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    if (ro && el) ro.observe(el);
    window.addEventListener('resize', measure);
    return () => {
      ro && el && ro.unobserve(el);
      window.removeEventListener('resize', measure);
    };
  }, [isProductDetailPage, pathname]);

  useEffect(() => {
    if (!isProductDetailPage) return;
    const handleScroll = () => {
      const y = window.scrollY ?? document.documentElement.scrollTop;
      setHideHeader(y > PRODUCT_DETAIL_THRESHOLD);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isProductDetailPage]);

  const headerContent = (
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
                {isSearchRoofersPage ? (
                  <>
                    <div className="pl-12 mb-[-2px] z-10 relative">
                      <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-rif-blue-500 text-white text-sm font-bold uppercase rounded-t-2xl">
                        <FontAwesomeIcon icon={faSearch} className="h-4 w-4" />
                        Search Roofing Companies
                      </span>
                    </div>
                    <form action="/roofers/search" method="get" className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FontAwesomeIcon icon={faSearch} className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="search"
                        name="q"
                        value={companyQuery}
                        onChange={(e) => setCompanyQuery(e.target.value)}
                        placeholder="Enter company name"
                        className="w-full pl-12 pr-4 h-[42px] text-base border-2 border-gray-300 rounded-2xl focus:border-rif-blue-500 focus:outline-none focus:ring-2 focus:ring-rif-blue-200"
                        aria-label="Search roofing companies"
                      />
                    </form>
                  </>
                ) : (
                  <>
                    <div className="pl-12 mb-[-2px] z-10 relative">
                      <Link
                        href="/roofers/near-me"
                        className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-500 hover:bg-green-600 text-white text-sm font-bold uppercase rounded-t-2xl transition-colors"
                      >
                        <FontAwesomeIcon icon={faLocationDot} className="h-4 w-4 text-white animate-location-pulse" />
                        FIND A ROOFER NEAR ME
                      </Link>
                    </div>
                    <ServiceAreaSearch variant="hero" />
                  </>
                )}
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

            {/* Mobile: Search bar only (logo is in top bar) */}
            <div className="md:hidden flex flex-col relative">
              {isSearchRoofersPage ? (
                <>
                  <div className="pl-12 mb-[-2px] z-10 relative">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-rif-blue-500 text-white text-sm font-bold uppercase rounded-t-2xl">
                      <FontAwesomeIcon icon={faSearch} className="h-4 w-4" />
                      Search Roofing Companies
                    </span>
                  </div>
                  <form action="/roofers/search" method="get" className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FontAwesomeIcon icon={faSearch} className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="search"
                      name="q"
                      value={companyQuery}
                      onChange={(e) => setCompanyQuery(e.target.value)}
                      placeholder="Enter company name"
                      className="w-full pl-12 pr-4 h-[42px] text-base border-2 border-gray-300 rounded-2xl focus:border-rif-blue-500 focus:outline-none focus:ring-2 focus:ring-rif-blue-200"
                      aria-label="Search roofing companies"
                    />
                  </form>
                </>
              ) : (
                <>
                  <div className="pl-12 mb-[-2px] z-10 relative">
                    <Link
                      href="/roofers/near-me"
                      className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-500 hover:bg-green-600 text-white text-sm font-bold uppercase rounded-t-2xl transition-colors"
                    >
                      <FontAwesomeIcon icon={faLocationDot} className="h-4 w-4 text-white animate-location-pulse" />
                      FIND A ROOFER NEAR ME
                    </Link>
                  </div>
                  <ServiceAreaSearch variant="hero" />
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );

  if (!isProductDetailPage) {
    return headerContent;
  }

  return (
    <div
      className="overflow-hidden transition-[height] duration-300 ease-out"
      style={hideHeader && headerHeight > 0 ? { height: headerHeight } : undefined}
    >
      <div
        ref={headerInnerRef}
        className={`transition-transform duration-300 ease-out ${hideHeader ? '-translate-y-full' : 'translate-y-0'}`}
      >
        {headerContent}
      </div>
    </div>
  );
}
