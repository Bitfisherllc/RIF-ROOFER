'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faArrowLeft,
  faArrowRight,
  faMapLocationDot,
  faCertificate,
  faBuilding,
  faPhone,
  faGlobe,
  faBullhorn,
} from '@fortawesome/free-solid-svg-icons';
import { getAllRoofers, getPreferredRoofers, getSponsoredRoofers, type RooferData } from '../data/roofers';
import { searchData } from '@/app/service-areas/data/search-data';

const regionNames: Record<string, string> = {
  'sun-coast': 'Sun Coast',
  'treasure-coast': 'Treasure Coast',
  'southwest-florida': 'Southwest Florida',
  'south-florida': 'South Florida',
  'north-florida': 'North Florida',
  'florida-panhandle': 'Florida Panhandle',
  'first-coast': 'First Coast',
  'central-florida': 'Central Florida',
};

function getRegionName(regionSlug: string): string {
  return regionNames[regionSlug] || regionSlug;
}

function getCountyName(countySlug: string): string {
  const county = searchData.find(
    (item) => item.type === 'county' && item.slug === countySlug
  );
  return county ? county.name.replace(' County', '') : countySlug;
}

function getCategoryLabel(roofer: RooferData): string {
  if (roofer.category === 'preferred' || roofer.isPreferred) return 'RiF Certified';
  if (roofer.category === 'sponsored') return 'Sponsored';
  if (roofer.category === 'general') return 'General';
  return '';
}

function SearchRoofersContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const qFromUrl = searchParams.get('q') ?? '';
  const [query, setQuery] = useState(qFromUrl);
  const [featuredPreferred, setFeaturedPreferred] = useState<RooferData | null>(null);
  const [featuredSponsored, setFeaturedSponsored] = useState<RooferData | null>(null);

  useEffect(() => {
    setQuery(qFromUrl);
  }, [qFromUrl]);

  // Load and randomly select featured roofers on mount (same as home page)
  useEffect(() => {
    try {
      const preferred = getPreferredRoofers();
      const sponsored = getSponsoredRoofers();
      if (preferred.length > 0) {
        setFeaturedPreferred(preferred[Math.floor(Math.random() * preferred.length)]);
      }
      if (sponsored.length > 0) {
        setFeaturedSponsored(sponsored[Math.floor(Math.random() * sponsored.length)]);
      }
    } catch (error) {
      console.error('Error loading featured roofers:', error);
    }
  }, []);

  const allRoofers = useMemo(() => getAllRoofers(), []);

  const filteredRoofers = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return allRoofers.filter((roofer) => roofer.name.toLowerCase().includes(q));
  }, [allRoofers, query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (q) {
      router.push(`/roofers/search?q=${encodeURIComponent(q)}`);
    }
  };

  const showResults = query.trim().length > 0;
  const regionLabel = (roofer: RooferData) => {
    const firstRegion = roofer.serviceAreas?.regions?.[0];
    if (firstRegion) return getRegionName(firstRegion);
    const firstCounty = roofer.serviceAreas?.counties?.[0];
    if (firstCounty) return getCountyName(firstCounty);
    return roofer.city || 'Florida';
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="pt-20 pb-8 px-6 bg-gradient-to-b from-rif-blue-50 to-white">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/roofers"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-rif-blue-600 mb-6"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="h-4 w-4" />
            Back to roofers
          </Link>
          <h1 className="text-4xl md:text-5xl font-semibold text-rif-black mb-4 tracking-tight">
            Search Roofing Companies
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Enter a company name to find roofers in our directory.
          </p>

          {/* Same style as header search bar: green pill label + input bar */}
          <form onSubmit={handleSearch} className="relative">
            <div className="pl-12 mb-[-2px] z-10 relative">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-rif-blue-500 text-white text-sm font-bold uppercase rounded-t-2xl">
                <FontAwesomeIcon icon={faSearch} className="h-4 w-4" />
                Search Roofing Companies
              </span>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FontAwesomeIcon icon={faSearch} className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter company name"
                className="w-full pl-12 pr-4 h-[42px] text-base border-2 border-gray-300 rounded-2xl focus:border-rif-blue-500 focus:outline-none focus:ring-2 focus:ring-rif-blue-200"
                autoFocus
                aria-label="Search roofing companies"
              />
            </div>
          </form>
        </div>
      </section>

      {/* Featured Roofers Section (same as home page) */}
      {(featuredPreferred || featuredSponsored) && (
        <section className="py-20 px-6 bg-white border-t border-gray-200">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-semibold text-rif-black mb-4">
                Featured Roofers
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Meet some of our certified and sponsored roofing professionals
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredPreferred && (
                <Link
                  href={`/roofers/${featuredPreferred.slug}`}
                  className="group block bg-gradient-to-br from-green-50 to-card-green-100 rounded-2xl p-8 border-2 border-card-green-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-card-green-500 rounded-xl">
                        <FontAwesomeIcon icon={faCertificate} className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <span className="inline-block px-3 py-1 bg-card-green-500 text-white text-xs font-bold rounded-full mb-2">
                          <span className="rif-brand">RiF</span> CERTIFIED
                        </span>
                        <h3 className="text-2xl font-bold text-rif-black group-hover:text-card-green-600 transition-colors">
                          {featuredPreferred.name}
                        </h3>
                      </div>
                    </div>
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="h-5 w-5 text-gray-400 group-hover:text-card-green-500 group-hover:translate-x-1 transition-all"
                    />
                  </div>
                  {(featuredPreferred.city || featuredPreferred.state) && (
                    <div className="flex items-center gap-2 text-gray-600 mb-4">
                      <FontAwesomeIcon icon={faMapLocationDot} className="h-4 w-4 text-card-green-500" />
                      <span>
                        {featuredPreferred.city && featuredPreferred.city}
                        {featuredPreferred.city && featuredPreferred.state && ', '}
                        {featuredPreferred.state && featuredPreferred.state}
                      </span>
                    </div>
                  )}
                  {featuredPreferred.phone && (
                    <div className="flex items-center gap-2 text-gray-700 mb-2">
                      <FontAwesomeIcon icon={faPhone} className="h-4 w-4 text-card-green-500" />
                      <a
                        href={`tel:${featuredPreferred.phone}`}
                        onClick={(e) => e.stopPropagation()}
                        className="hover:text-card-green-600 transition-colors"
                      >
                        {featuredPreferred.phone}
                      </a>
                    </div>
                  )}
                  {featuredPreferred.websiteUrl && (
                    <div className="flex items-center gap-2 text-gray-700 mb-4">
                      <FontAwesomeIcon icon={faGlobe} className="h-4 w-4 text-card-green-500" />
                      <a
                        href={featuredPreferred.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="hover:text-card-green-600 transition-colors text-sm truncate"
                      >
                        Visit Website
                      </a>
                    </div>
                  )}
                  <div className="mt-4 pt-4 border-t border-card-green-200">
                    <span className="text-sm text-gray-600">View Full Profile →</span>
                  </div>
                </Link>
              )}

              {featuredSponsored && (
                <Link
                  href={`/roofers/${featuredSponsored.slug}`}
                  className="group block bg-gradient-to-br from-rif-blue-50 to-rif-blue-100 rounded-2xl p-8 border-2 border-rif-blue-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-rif-blue-500 rounded-xl">
                        <FontAwesomeIcon icon={faBullhorn} className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <span className="inline-block px-3 py-1 bg-rif-blue-500 text-white text-xs font-bold rounded-full mb-2">
                          SPONSORED ROOFER
                        </span>
                        <h3 className="text-2xl font-bold text-rif-black group-hover:text-rif-blue-600 transition-colors">
                          {featuredSponsored.name}
                        </h3>
                      </div>
                    </div>
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="h-5 w-5 text-gray-400 group-hover:text-rif-blue-500 group-hover:translate-x-1 transition-all"
                    />
                  </div>
                  {(featuredSponsored.city || featuredSponsored.state) && (
                    <div className="flex items-center gap-2 text-gray-600 mb-4">
                      <FontAwesomeIcon icon={faMapLocationDot} className="h-4 w-4 text-rif-blue-500" />
                      <span>
                        {featuredSponsored.city && featuredSponsored.city}
                        {featuredSponsored.city && featuredSponsored.state && ', '}
                        {featuredSponsored.state && featuredSponsored.state}
                      </span>
                    </div>
                  )}
                  {featuredSponsored.phone && (
                    <div className="flex items-center gap-2 text-gray-700 mb-2">
                      <FontAwesomeIcon icon={faPhone} className="h-4 w-4 text-rif-blue-500" />
                      <a
                        href={`tel:${featuredSponsored.phone}`}
                        onClick={(e) => e.stopPropagation()}
                        className="hover:text-rif-blue-500 transition-colors"
                      >
                        {featuredSponsored.phone}
                      </a>
                    </div>
                  )}
                  {featuredSponsored.websiteUrl && (
                    <div className="flex items-center gap-2 text-gray-700 mb-4">
                      <FontAwesomeIcon icon={faGlobe} className="h-4 w-4 text-rif-blue-500" />
                      <a
                        href={featuredSponsored.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="hover:text-rif-blue-600 transition-colors text-sm truncate"
                      >
                        Visit Website
                      </a>
                    </div>
                  )}
                  <div className="mt-4 pt-4 border-t border-rif-blue-200">
                    <span className="text-sm text-gray-600">View Full Profile →</span>
                  </div>
                </Link>
              )}
            </div>

            <div className="text-center mt-8">
              <Link
                href="/roofers"
                className="inline-flex items-center gap-2 px-6 py-3 bg-rif-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-rif-blue-600 transition-colors"
              >
                View All Roofers
                <FontAwesomeIcon icon={faArrowRight} className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          {!showResults && (
            <div className="text-center py-12 text-gray-500">
              <FontAwesomeIcon icon={faSearch} className="h-12 w-12 text-gray-300 mb-4" />
              <p className="text-lg">Type a company name above to search our directory.</p>
              <p className="text-sm mt-2">
                Or <Link href="/roofers" className="text-rif-blue-600 hover:underline">browse all roofers</Link>.
              </p>
            </div>
          )}

          {showResults && (
            <>
              <h2 className="text-2xl font-semibold text-rif-black mb-6">
                {filteredRoofers.length === 0
                  ? 'No companies found'
                  : `${filteredRoofers.length} compan${filteredRoofers.length === 1 ? 'y' : 'ies'} found`}
              </h2>

              {filteredRoofers.length === 0 ? (
                <div className="bg-white p-8 rounded-2xl border border-gray-200 text-center">
                  <p className="text-gray-600 mb-4">
                    No roofing companies match &quot;{query.trim()}&quot;. Try a different name or browse all roofers.
                  </p>
                  <Link
                    href="/roofers"
                    className="inline-flex items-center gap-2 text-rif-blue-600 hover:text-rif-blue-700 font-medium"
                  >
                    View all roofers
                    <FontAwesomeIcon icon={faArrowLeft} className="h-4 w-4 rotate-180" />
                  </Link>
                </div>
              ) : (
                <ul className="space-y-3">
                  {filteredRoofers.map((roofer) => {
                    const category = getCategoryLabel(roofer);
                    return (
                      <li key={roofer.id}>
                        <Link
                          href={`/roofers/${roofer.slug}`}
                          className="group flex flex-wrap items-center gap-3 p-4 bg-white rounded-xl border-2 border-gray-200 hover:border-rif-blue-300 hover:shadow-md transition-all"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-semibold text-rif-black truncate">
                                {roofer.name}
                              </span>
                              {category && (
                                <span
                                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
                                    category === 'RiF Certified'
                                      ? 'bg-card-green-100 text-card-green-800'
                                      : category === 'Sponsored'
                                        ? 'bg-card-blue-100 text-card-blue-800'
                                        : 'bg-gray-100 text-gray-800'
                                  }`}
                                >
                                  {category === 'RiF Certified' && (
                                    <FontAwesomeIcon icon={faCertificate} className="h-3 w-3" />
                                  )}
                                  {category === 'Sponsored' && (
                                    <FontAwesomeIcon icon={faBuilding} className="h-3 w-3" />
                                  )}
                                  {category}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                              <FontAwesomeIcon icon={faMapLocationDot} className="h-4 w-4 text-rif-blue-500 flex-shrink-0" />
                              <span>{roofer.city && `${roofer.city}, `}{roofer.state || 'FL'} · {regionLabel(roofer)}</span>
                            </div>
                          </div>
                          <span className="text-sm font-medium text-rif-blue-600">
                            View profile →
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default function SearchRoofersPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    }>
      <SearchRoofersContent />
    </Suspense>
  );
}
