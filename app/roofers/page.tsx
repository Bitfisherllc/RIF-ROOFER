'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers,
  faCertificate,
  faPhone,
  faGlobe,
  faMapLocationDot,
  faArrowRight,
  faSearch,
  faFilter,
  faTimes,
  faMap,
  faCity,
  faBuilding,
  faShield,
} from '@fortawesome/free-solid-svg-icons';
import {
  getAllRoofers,
  getPreferredRoofers,
  getOtherRoofers,
  type RooferData,
} from './data/roofers';
import { searchData } from '@/app/service-areas/data/search-data';
import FavoriteButton from '@/components/FavoriteButton';

// Region mapping for display
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

// Helper to get region name from slug
function getRegionName(regionSlug: string): string {
  return regionNames[regionSlug] || regionSlug;
}

// Helper to get county name from slug
function getCountyName(countySlug: string): string {
  const county = searchData.find(
    (item) => item.type === 'county' && item.slug === countySlug
  );
  return county ? county.name.replace(' County', '') : countySlug;
}

// Animated Stat Component
interface AnimatedStatProps {
  value: number;
  label: string;
  icon: any;
  delay?: number;
}

function AnimatedStat({ value, label, icon, delay = 0 }: AnimatedStatProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const statRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (statRef.current) {
      observer.observe(statRef.current);
    }

    return () => {
      if (statRef.current) {
        observer.unobserve(statRef.current);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = value / steps;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        currentStep++;
        const nextValue = Math.min(
          Math.ceil(increment * currentStep),
          value
        );
        setDisplayValue(nextValue);

        if (currentStep >= steps || nextValue >= value) {
          setDisplayValue(value);
          clearInterval(interval);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [isVisible, value, delay]);

  return (
    <div
      ref={statRef}
      className="relative group"
    >
      <div className="flex flex-col items-center">
        {/* Icon with animation */}
        <div className="mb-3 relative">
          <div className="absolute inset-0 bg-rif-blue-500 rounded-full opacity-20 group-hover:opacity-30 animate-ping"></div>
          <div className="relative bg-gradient-to-br from-rif-blue-400 to-rif-blue-600 rounded-full p-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
            <FontAwesomeIcon
              icon={icon}
              className="h-6 w-6 text-white"
            />
          </div>
        </div>
        
        {/* Animated number */}
        <div className="text-3xl font-semibold text-rif-blue-500 mb-1 transition-all duration-300 group-hover:scale-110">
          {displayValue.toLocaleString()}
        </div>
        
        {/* Label */}
        <div className="text-sm text-gray-600 font-medium">{label}</div>
      </div>
    </div>
  );
}

// Enhanced Roofer Card Component
function RooferCard({ roofer }: { roofer: RooferData }) {
  const router = useRouter();
  // Get service area display names
  const serviceAreaNames: string[] = [];
  
  if (roofer.serviceAreas?.regions) {
    roofer.serviceAreas.regions.forEach((slug) => {
      const name = getRegionName(slug);
      if (name) serviceAreaNames.push(name);
    });
  }
  
  if (roofer.serviceAreas?.counties) {
    roofer.serviceAreas.counties.forEach((slug) => {
      const name = getCountyName(slug);
      if (name) serviceAreaNames.push(name);
    });
  }

  // Determine category label and styling
  const getCategoryLabel = () => {
    if (roofer.category === 'preferred' || roofer.isPreferred) {
      return { label: 'Certified', bg: 'bg-blue-100', text: 'text-blue-800' };
    }
    if (roofer.category === 'sponsored') {
      return { label: 'Sponsored', bg: 'bg-purple-100', text: 'text-purple-800' };
    }
    if (roofer.category === 'general') {
      return { label: 'General', bg: 'bg-gray-100', text: 'text-gray-800' };
    }
    return null;
  };

  const categoryInfo = getCategoryLabel();
  const isGeneral = roofer.category === 'general' || roofer.category === undefined;

  return (
    <div className="group block bg-white p-6 rounded-2xl border-2 border-gray-200 hover:border-rif-blue-300 hover:shadow-lg transition-all duration-200 relative">
      <div className="flex items-start justify-between mb-4">
        {categoryInfo && (
          <div className={`flex items-center gap-2 px-3 py-1 ${categoryInfo.bg} ${categoryInfo.text} rounded-full text-sm font-semibold`}>
            <FontAwesomeIcon icon={faCertificate} className="h-4 w-4" />
            {categoryInfo.label}
          </div>
        )}
        <div className="flex items-center gap-2 ml-auto">
          <FavoriteButton
            rooferId={roofer.id}
            rooferSlug={roofer.slug}
            rooferName={roofer.name}
            rooferPhone={roofer.phone}
            rooferEmail={roofer.email}
            rooferWebsiteUrl={roofer.websiteUrl}
            size="sm"
          />
          <Link href={`/roofers/${roofer.slug}`}>
            <FontAwesomeIcon
              icon={faArrowRight}
              className="h-4 w-4 text-gray-400 group-hover:text-rif-blue-500 group-hover:translate-x-1 transition-all"
            />
          </Link>
        </div>
      </div>
      
      <div className="cursor-pointer" onClick={() => router.push(`/roofers/${roofer.slug}`)}>
        <h3 className="text-2xl font-semibold text-rif-black mb-3 group-hover:text-rif-blue-500 transition-colors">
          {roofer.name}
        </h3>
        
        <div className="space-y-2 mb-4">
          {/* Hide city/address for General listings */}
          {!isGeneral && roofer.city && (
            <div className="flex items-center gap-2 text-gray-600">
              <FontAwesomeIcon icon={faMapLocationDot} className="h-4 w-4 text-rif-blue-500" />
              <span>{roofer.city}{roofer.state && `, ${roofer.state}`}</span>
            </div>
          )}
          
          {/* Hide phone for General listings */}
          {!isGeneral && roofer.phone && (
            <div className="flex items-center gap-2 text-gray-600">
              <FontAwesomeIcon icon={faPhone} className="h-4 w-4 text-rif-blue-500" />
              <a
                href={`tel:${roofer.phone}`}
                onClick={(e) => e.stopPropagation()}
                className="hover:text-rif-blue-500 transition-colors"
              >
                {roofer.phone}
              </a>
            </div>
          )}
          
          {/* Hide website for General listings */}
          {!isGeneral && roofer.websiteUrl && (
            <div className="flex items-center gap-2 text-gray-600">
              <FontAwesomeIcon icon={faGlobe} className="h-4 w-4 text-rif-blue-500" />
              <a
                href={roofer.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="hover:text-rif-blue-500 transition-colors truncate"
              >
                Visit Website
              </a>
            </div>
          )}
          
          {roofer.licenseNumber && (
            <div className="text-sm text-gray-500">
              License: {roofer.licenseNumber}
            </div>
          )}
          
          {/* Show contact message for General listings */}
          {isGeneral && (
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 mt-2">
              <p className="text-sm text-gray-600">
                <strong className="text-gray-800">FREE FLORIDA ROOFER LISTING</strong> - Upgrade to Certified or Sponsored to show contact details
              </p>
            </div>
          )}
        </div>
        
        {serviceAreaNames.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <FontAwesomeIcon icon={faMapLocationDot} className="h-4 w-4 text-rif-blue-500" />
              <span className="font-medium">Service Areas:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {serviceAreaNames.slice(0, 3).map((name, idx) => (
                <span
                  key={idx}
                  className="inline-block px-2 py-1 bg-gray-50 text-gray-700 rounded text-xs"
                >
                  {name}
                </span>
              ))}
              {serviceAreaNames.length > 3 && (
                <span className="inline-block px-2 py-1 bg-gray-50 text-gray-700 rounded text-xs">
                  +{serviceAreaNames.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}
        
        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-sm text-rif-blue-500 font-medium group-hover:text-rif-blue-600">
            View Profile →
          </span>
          {/* BBB Accredited Badge */}
          {roofer.bbbAccredited && (
            <a
              href={roofer.bbbUrl || 'https://www.bbb.org/'}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 px-2 py-1 bg-blue-50 hover:bg-blue-100 rounded-md border border-blue-200 transition-colors group/bbb"
              title="BBB Accredited Business"
            >
              <FontAwesomeIcon icon={faShield} className="h-3 w-3 text-blue-600" />
              <span className="text-xs font-semibold text-blue-700">BBB Accredited</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function RoofersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRegion, setFilterRegion] = useState<string>('all');
  const [filterPreferred, setFilterPreferred] = useState<'all' | 'preferred' | 'other'>('all');
  
  // Safely get roofers with error handling
  let allRoofers: RooferData[] = [];
  let preferredRoofers: RooferData[] = [];
  let otherRoofers: RooferData[] = [];
  
  try {
    allRoofers = getAllRoofers();
    preferredRoofers = getPreferredRoofers();
    otherRoofers = getOtherRoofers();
  } catch (error) {
    console.error('Error loading roofers:', error);
    // Return error state
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-rif-black mb-4">Error Loading Roofers</h1>
          <p className="text-gray-600">Please refresh the page or contact support if the problem persists.</p>
        </div>
      </div>
    );
  }

  // Get unique regions from all roofers
  const availableRegions = useMemo(() => {
    const regions = new Set<string>();
    allRoofers.forEach((roofer) => {
      roofer.serviceAreas?.regions?.forEach((region) => regions.add(region));
    });
    return Array.from(regions).sort();
  }, [allRoofers]);

  // Filter roofers
  const filteredRoofers = useMemo(() => {
    let filtered = allRoofers;

    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (roofer) =>
          roofer.name.toLowerCase().includes(term) ||
          roofer.city?.toLowerCase().includes(term) ||
          roofer.phone?.includes(term) ||
          roofer.email?.toLowerCase().includes(term) ||
          roofer.licenseNumber?.toLowerCase().includes(term)
      );
    }

    // Apply preferred filter
    if (filterPreferred === 'preferred') {
      filtered = filtered.filter((r) => r.isPreferred);
    } else if (filterPreferred === 'other') {
      filtered = filtered.filter((r) => !r.isPreferred);
    }

    // Apply region filter
    if (filterRegion !== 'all') {
      filtered = filtered.filter((roofer) =>
        roofer.serviceAreas?.regions?.includes(filterRegion)
      );
    }

    // Sort: Certified (preferred) first, then Sponsored, then General, then alphabetical
    return filtered.sort((a, b) => {
      // Category ranking: Certified (preferred) first, then Sponsored, then General
      const categoryRank = (category?: string, isPreferred?: boolean) => {
        if (category === 'preferred' || isPreferred) return 1; // Certified/Preferred
        if (category === 'sponsored') return 2; // Sponsored
        if (category === 'general') return 3; // General
        return 4; // No category
      };
      
      const rankA = categoryRank(a.category, a.isPreferred);
      const rankB = categoryRank(b.category, b.isPreferred);
      
      if (rankA !== rankB) return rankA - rankB;
      
      return a.name.localeCompare(b.name);
    });
  }, [allRoofers, searchTerm, filterRegion, filterPreferred]);

  // Statistics
  const stats = useMemo(() => {
    const totalCounties = new Set<string>();
    const totalCities = new Set<string>();
    
    allRoofers.forEach((roofer) => {
      roofer.serviceAreas?.counties?.forEach((county) => totalCounties.add(county));
      roofer.serviceAreas?.cities?.forEach((city) => totalCities.add(city));
    });

    return {
      totalRoofers: allRoofers.length,
      preferredCount: preferredRoofers.length,
      regionsCovered: availableRegions.length,
      countiesCovered: totalCounties.size,
      citiesCovered: totalCities.size,
    };
  }, [allRoofers, preferredRoofers, availableRegions]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-6 bg-gradient-to-b from-rif-blue-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-rif-black mb-6 tracking-tight">
            Roofers in Florida
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Our network of RIF Certified Installers serves Florida with
            manufacturer-trained expertise. Each installer is vetted, trained on
            specific product systems, and held to higher standards for installation
            quality and code compliance.
          </p>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 px-6 bg-gradient-to-b from-white to-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            <AnimatedStat
              value={stats.totalRoofers}
              label="Total Roofers"
              icon={faUsers}
              delay={0}
            />
            <AnimatedStat
              value={stats.preferredCount}
              label="Preferred"
              icon={faCertificate}
              delay={200}
            />
            <AnimatedStat
              value={stats.regionsCovered}
              label="Regions"
              icon={faMap}
              delay={400}
            />
            <AnimatedStat
              value={stats.countiesCovered}
              label="Counties"
              icon={faBuilding}
              delay={600}
            />
            <AnimatedStat
              value={stats.citiesCovered}
              label="Cities"
              icon={faCity}
              delay={800}
            />
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-6 px-6 bg-gray-50 border-b border-gray-200 sticky top-14 z-40">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="flex-1 relative">
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"
              />
              <input
                type="text"
                placeholder="Search by name, city, phone, or license..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-transparent"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <FontAwesomeIcon icon={faTimes} className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Preferred Filter */}
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faFilter} className="text-gray-400" />
              <select
                value={filterPreferred}
                onChange={(e) => setFilterPreferred(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-transparent"
              >
                <option value="all">All Roofers</option>
                <option value="preferred">Preferred Only</option>
                <option value="other">Other Roofers</option>
              </select>
            </div>

            {/* Region Filter */}
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faMapLocationDot} className="text-gray-400" />
              <select
                value={filterRegion}
                onChange={(e) => setFilterRegion(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rif-blue-500 focus:border-transparent min-w-[180px]"
              >
                <option value="all">All Regions</option>
                {availableRegions.map((regionSlug) => (
                  <option key={regionSlug} value={regionSlug}>
                    {getRegionName(regionSlug)}
                  </option>
                ))}
              </select>
            </div>

            {/* Map View Button */}
            <Link
              href="/roofers/map"
              className="ml-auto px-4 py-2 bg-rif-blue-500 text-white rounded-lg hover:bg-rif-blue-600 transition-colors font-medium flex items-center gap-2 whitespace-nowrap"
            >
              <FontAwesomeIcon icon={faMapLocationDot} />
              View Map
            </Link>
          </div>

          {/* Active Filters Display */}
          {(searchTerm || filterRegion !== 'all' || filterPreferred !== 'all') && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-600">Active filters:</span>
              {searchTerm && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-rif-blue-100 text-rif-blue-700 rounded-full text-sm">
                  Search: "{searchTerm}"
                  <button
                    onClick={() => setSearchTerm('')}
                    className="hover:text-rif-blue-900"
                  >
                    <FontAwesomeIcon icon={faTimes} className="h-3 w-3" />
                  </button>
                </span>
              )}
              {filterPreferred !== 'all' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-rif-blue-100 text-rif-blue-700 rounded-full text-sm">
                  {filterPreferred === 'preferred' ? 'Preferred Only' : 'Other Roofers'}
                  <button
                    onClick={() => setFilterPreferred('all')}
                    className="hover:text-rif-blue-900"
                  >
                    <FontAwesomeIcon icon={faTimes} className="h-3 w-3" />
                  </button>
                </span>
              )}
              {filterRegion !== 'all' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-rif-blue-100 text-rif-blue-700 rounded-full text-sm">
                  Region: {getRegionName(filterRegion)}
                  <button
                    onClick={() => setFilterRegion('all')}
                    className="hover:text-rif-blue-900"
                  >
                    <FontAwesomeIcon icon={faTimes} className="h-3 w-3" />
                  </button>
                </span>
              )}
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilterRegion('all');
                  setFilterPreferred('all');
                }}
                className="text-sm text-gray-600 hover:text-rif-blue-500 underline"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-rif-black mb-2">
                {filteredRoofers.length === 0
                  ? 'No Roofers Found'
                  : `${filteredRoofers.length} Roofer${filteredRoofers.length !== 1 ? 's' : ''} Found`}
              </h2>
              {filteredRoofers.length > 0 && (
                <p className="text-gray-600">
                  {filteredRoofers.filter((r) => r.isPreferred).length} preferred
                  {filteredRoofers.filter((r) => !r.isPreferred).length > 0 &&
                    `, ${filteredRoofers.filter((r) => !r.isPreferred).length} other`}
                </p>
              )}
            </div>
          </div>

          {/* Roofers Grid */}
          {filteredRoofers.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl border border-gray-200 text-center">
              <FontAwesomeIcon icon={faUsers} className="h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-rif-black mb-2">
                No roofers match your criteria
              </h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search or filters to find roofers.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilterRegion('all');
                  setFilterPreferred('all');
                }}
                className="text-rif-blue-500 hover:text-rif-blue-600 underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRoofers.map((roofer) => (
                <RooferCard key={roofer.id} roofer={roofer} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-rif-blue-50 p-8 rounded-2xl border-2 border-rif-blue-200">
            <h3 className="text-2xl font-semibold text-rif-black mb-4">
              About the RIF Network
            </h3>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                RIF (Roofing Installation Framework) is the installation division of{' '}
                <strong>Premium Roofing Products (PRP Roofing)</strong>. Our network
                connects homeowners with certified, trained roofers who specialize in
                stone-coated metal roofing systems.
              </p>
              <p>
                <strong>Preferred Roofing Contractors</strong> are vetted, trained on
                specific products, and held to higher standards for installation quality,
                code compliance, and professionalism. They appear first in all listings.
              </p>
              <p>
                All RIF-backed projects benefit from{' '}
                <strong>distributor-level pricing</strong>, faster access to inventory, and
                priority material availability after storms or during high-demand periods.
              </p>
              <div className="mt-6 pt-6 border-t border-rif-blue-200 flex flex-wrap gap-4">
                <Link
                  href="/service-areas"
                  className="inline-flex items-center gap-2 text-rif-blue-600 hover:text-rif-blue-700 font-medium"
                >
                  <FontAwesomeIcon icon={faMapLocationDot} />
                  Browse by Service Area
                </Link>
                <Link
                  href="/roofers/map"
                  className="inline-flex items-center gap-2 text-rif-blue-600 hover:text-rif-blue-700 font-medium"
                >
                  <FontAwesomeIcon icon={faMapLocationDot} />
                  View Interactive Map
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}



