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
import ServiceAreaSearch from '@/components/ServiceAreaSearch';
import FavoriteButton from '@/components/FavoriteButton';
import { getRooferFastCoordinates } from '@/lib/fast-coordinates';
import type { Coordinates } from '@/lib/geocoding';

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

// Helper to get city name from slug
function getCityName(citySlug: string): string {
  const city = searchData.find(
    (item) => item.type === 'city' && item.slug === citySlug
  );
  return city ? city.name : citySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

// Calculate distance between two coordinates using Haversine formula (in miles)
function calculateDistance(coord1: Coordinates, coord2: Coordinates): number {
  const R = 3959; // Earth's radius in miles
  const dLat = (coord2.lat - coord1.lat) * (Math.PI / 180);
  const dLon = (coord2.lng - coord1.lng) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(coord1.lat * (Math.PI / 180)) *
      Math.cos(coord2.lat * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
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
function RooferCard({ roofer, distance }: { roofer: RooferData; distance?: number }) {
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
  
  if (roofer.serviceAreas?.cities) {
    roofer.serviceAreas.cities.forEach((slug) => {
      const name = getCityName(slug);
      if (name) serviceAreaNames.push(name);
    });
  }

  // Determine category label and styling (card-blue = Sponsored, card-green = Certified)
  const getCategoryLabel = () => {
    if (roofer.category === 'preferred' || roofer.isPreferred) {
      return { label: 'Certified', bg: 'bg-card-green-100', text: 'text-card-green-800' };
    }
    if (roofer.category === 'sponsored') {
      return { label: 'Sponsored', bg: 'bg-card-blue-100', text: 'text-card-blue-800' };
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
        
        {/* Address - Show for all roofers */}
        {(roofer.address || roofer.city) && (
          <div className="flex items-start gap-2 text-gray-600 mb-4">
            <FontAwesomeIcon icon={faMapLocationDot} className="h-4 w-4 text-rif-blue-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              {roofer.address && (
                <div>{roofer.address}</div>
              )}
              {(roofer.city || roofer.state || roofer.zipCode) && (
                <div>
                  {roofer.city && roofer.city}
                  {roofer.city && roofer.state && ', '}
                  {roofer.state && roofer.state}
                  {roofer.zipCode && ` ${roofer.zipCode}`}
                </div>
              )}
              {distance !== undefined && distance !== Infinity && (
                <div className="mt-1 text-sm font-semibold text-rif-blue-600">
                  {distance.toFixed(1)} miles away
                </div>
              )}
            </div>
          </div>
        )}
        
        <div className="space-y-2 mb-4">
          
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
  // #region agent log
  useEffect(() => {
    try {
      fetch('http://127.0.0.1:7242/ingest/16419525-2d8f-4245-a872-e347769048b8',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'roofers/page.tsx:372',message:'Component render start',data:{timestamp:Date.now()},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    } catch (e) {}
  }, []);
  // #endregion
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [locationLoading, setLocationLoading] = useState(true);
  const [showNearMe, setShowNearMe] = useState(false);
  const [userLocationAddress, setUserLocationAddress] = useState<string | null>(null);
  const [generalDisplayLimit, setGeneralDisplayLimit] = useState(3);

  
  // Safely get roofers with error handling - memoize to prevent excessive re-renders
  const { allRoofers, preferredRoofers, otherRoofers, hasError } = useMemo(() => {
    try {
      const all = getAllRoofers();
      const preferred = getPreferredRoofers();
      const other = getOtherRoofers();
      return {
        allRoofers: all,
        preferredRoofers: preferred,
        otherRoofers: other,
        hasError: false,
      };
    } catch (error) {
      console.error('Error loading roofers:', error);
      return {
        allRoofers: [],
        preferredRoofers: [],
        otherRoofers: [],
        hasError: true,
      };
    }
  }, []); // Empty deps - only load once

  // Show error state if roofers failed to load
  if (hasError || (allRoofers.length === 0 && preferredRoofers.length === 0 && otherRoofers.length === 0)) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-rif-black mb-4">Error Loading Roofers</h1>
          <p className="text-gray-600">Please refresh the page or contact support if the problem persists.</p>
        </div>
      </div>
    );
  }

  // Reverse geocode coordinates to get address (with timeout)
  const reverseGeocode = async (coords: Coordinates) => {
    try {
      // Create a timeout promise that rejects after 3 seconds
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Reverse geocoding timeout')), 3000);
      });

      // Race between the fetch and timeout
      const response = await Promise.race([
        fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.lat}&lon=${coords.lng}`,
          {
            headers: {
              'User-Agent': 'Florida Roofers Application',
            },
          }
        ),
        timeoutPromise,
      ]) as Response;

      const data = await response.json();
      if (data.display_name) {
        setUserLocationAddress(data.display_name);
      }
      // If no display_name, keep the coordinates that were already set
    } catch (error) {
      // Silently fail - coordinates are already displayed as fallback
      console.debug('Reverse geocoding failed or timed out, using coordinates');
    }
  };

  // Get user's location when "Roofers Near Me" is clicked (browser will ask for permission)
  const handleNearMeClick = () => {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser.');
      return;
    }

    setLocationLoading(true);
    setLocationError(null);

    const options: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 15000, // 15 seconds to allow user to respond to permission prompt
      maximumAge: 300000, // Cache location for 5 minutes
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(coords);
        setLocationError(null);
        setLocationLoading(false);
        setShowNearMe(true);
        setUserLocationAddress(`${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}`);
        reverseGeocode(coords).catch((error) => {
          console.error('Reverse geocoding error:', error);
        });
      },
      (error: GeolocationPositionError) => {
        console.error('Geolocation error:', error);
        // User-friendly messages; browser already asked for permission
        const message =
          error.code === 1
            ? 'Location access was denied. Please allow location for this site in your browser settings and try again.'
            : error.code === 2
              ? 'Location is unavailable. Please try again.'
              : error.code === 3
                ? 'Location request timed out. Please try again.'
                : error.message || 'Unable to get your location. Please try again.';
        setLocationError(message);
        setLocationLoading(false);
        setShowNearMe(false);
      },
      options
    );
  };

  // Get unique regions from all roofers
  const availableRegions = useMemo(() => {
    const regions = new Set<string>();
    allRoofers.forEach((roofer) => {
      roofer.serviceAreas?.regions?.forEach((region) => regions.add(region));
    });
    return Array.from(regions).sort();
  }, [allRoofers]);

  // Store distances for roofers (when using 'closest' filter)
  const [rooferDistances, setRooferDistances] = useState<Map<string, number>>(new Map());

  // Filter roofers
  const filteredRoofers = useMemo(() => {
    let filtered = allRoofers;

    // Calculate distances and add to roofers if "near me" mode is active and user location is available
    if (showNearMe && userLocation) {
      // Helper function to determine category
      const getCategory = (roofer: RooferData): 'preferred' | 'sponsored' | 'general' => {
        if (roofer.category === 'preferred' || roofer.isPreferred) return 'preferred';
        if (roofer.category === 'sponsored') return 'sponsored';
        return 'general';
      };

      // Add distance to each roofer and filter out those without coordinates
      const roofersWithDistance = filtered
        .map((roofer) => {
          const rooferCoords = getRooferFastCoordinates(roofer);
          if (rooferCoords) {
            const distance = calculateDistance(userLocation, rooferCoords);
            return { roofer, distance, category: getCategory(roofer) };
          }
          return null;
        })
        .filter((r): r is { roofer: RooferData; distance: number; category: 'preferred' | 'sponsored' | 'general' } => r !== null);


      // Separate by category
      const preferredRoofers = roofersWithDistance.filter((r) => r.category === 'preferred');
      const sponsoredRoofers = roofersWithDistance.filter((r) => r.category === 'sponsored');
      const generalRoofers = roofersWithDistance.filter((r) => r.category === 'general');


      // Sort each category by distance
      preferredRoofers.sort((a, b) => a.distance - b.distance);
      sponsoredRoofers.sort((a, b) => a.distance - b.distance);
      generalRoofers.sort((a, b) => a.distance - b.distance);

      // Take the closest from each category: 3 preferred, 3 sponsored, 5 general
      const closestPreferred = preferredRoofers.slice(0, 3).map((r) => r.roofer);
      const closestSponsored = sponsoredRoofers.slice(0, 3).map((r) => r.roofer);
      const closestGeneral = generalRoofers.slice(0, 5).map((r) => r.roofer);


      // Combine in priority order: Preferred first, then Sponsored, then General
      filtered = [...closestPreferred, ...closestSponsored, ...closestGeneral];
    } else {
      // Sort: Certified (preferred) first, then Sponsored, then General, then alphabetical
      filtered.sort((a, b) => {
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
    }

    return filtered;
  }, [allRoofers, userLocation, showNearMe]);

  // Limit displayed roofers: show all preferred, all sponsored, then limit general
  // (Skip limiting if "near me" mode is active, as it already has its own limits)
  const { displayedRoofers, remainingGeneralCount } = useMemo(() => {
    // #region agent log
    try {
      fetch('http://127.0.0.1:7242/ingest/16419525-2d8f-4245-a872-e347769048b8',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'roofers/page.tsx:592',message:'displayedRoofers useMemo start',data:{filteredCount:filteredRoofers.length,showNearMe,generalDisplayLimit},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
    } catch (e) {}
    // #endregion
    try {
      if (showNearMe) {
        // "Near me" mode already limits to 3 preferred, 3 sponsored, 5 general
        return { displayedRoofers: filteredRoofers, remainingGeneralCount: 0 };
      }

      // Helper function to determine category
      const getCategory = (roofer: RooferData): 'preferred' | 'sponsored' | 'general' => {
        if (roofer.category === 'preferred' || roofer.isPreferred) return 'preferred';
        if (roofer.category === 'sponsored') return 'sponsored';
        return 'general';
      };

      // Separate by category
      const preferred = filteredRoofers.filter((r) => getCategory(r) === 'preferred');
      const sponsored = filteredRoofers.filter((r) => getCategory(r) === 'sponsored');
      const general = filteredRoofers.filter((r) => getCategory(r) === 'general');

      // Show all preferred, all sponsored, and limited general
      const limitedGeneral = general.slice(0, generalDisplayLimit);
      // Calculate remaining: if we've shown all general roofers, remaining is 0
      const remainingGeneral = Math.max(0, general.length - generalDisplayLimit);

      // #region agent log
      try {
        fetch('http://127.0.0.1:7242/ingest/16419525-2d8f-4245-a872-e347769048b8',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'roofers/page.tsx:637',message:'displayedRoofers calculation',data:{generalLength:general.length,generalDisplayLimit,limitedGeneralLength:limitedGeneral.length,remainingGeneral,calculation:'general.length - generalDisplayLimit'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
      } catch (e) {}
      // #endregion

      return {
        displayedRoofers: [...preferred, ...sponsored, ...limitedGeneral],
        remainingGeneralCount: remainingGeneral,
      };
    } catch (error) {
      // #region agent log
      try {
        fetch('http://127.0.0.1:7242/ingest/16419525-2d8f-4245-a872-e347769048b8',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'roofers/page.tsx:618',message:'displayedRoofers useMemo error',data:{error:error instanceof Error?error.message:String(error)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
      } catch (e) {}
      // #endregion
      console.error('Error in displayedRoofers useMemo:', error);
      // Fallback to showing all filtered roofers
      return { displayedRoofers: filteredRoofers, remainingGeneralCount: 0 };
    }
  }, [filteredRoofers, showNearMe, generalDisplayLimit]);

  // Reset general display limit when filters change
  useEffect(() => {
    setGeneralDisplayLimit(3);
  }, [showNearMe]);

  // #region agent log
  // Monitor click events to see if they're being blocked
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      try {
        const target = e.target as HTMLElement;
        const isLink = target.closest('a') || target.tagName === 'A';
        const linkHref = target.closest('a')?.getAttribute('href') || (target.tagName === 'A' ? (target as HTMLAnchorElement).href : null);
        const computedStyle = window.getComputedStyle(target);
        const pointerEvents = computedStyle.pointerEvents;
        const zIndex = computedStyle.zIndex;
        fetch('http://127.0.0.1:7242/ingest/16419525-2d8f-4245-a872-e347769048b8',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'roofers/page.tsx:660',message:'Click event detected',data:{isLink,linkHref,tagName:target.tagName,id:target.id,className:target.className,defaultPrevented:e.defaultPrevented,pointerEvents,zIndex},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
      } catch (err) {
        try {
          fetch('http://127.0.0.1:7242/ingest/16419525-2d8f-4245-a872-e347769048b8',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'roofers/page.tsx:660',message:'Click handler error',data:{error:err instanceof Error?err.message:String(err)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
        } catch {}
      }
    };
    document.addEventListener('click', handleClick, true);
    // #region agent log
    try {
      fetch('http://127.0.0.1:7242/ingest/16419525-2d8f-4245-a872-e347769048b8',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'roofers/page.tsx:670',message:'Click listener attached',data:{timestamp:Date.now()},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
    } catch {}
    // #endregion
    return () => document.removeEventListener('click', handleClick, true);
  }, []);
  // #endregion

  // Calculate and store distances separately in useEffect to avoid infinite re-renders
  useEffect(() => {
    if (showNearMe && userLocation) {
      const distancesMap = new Map<string, number>();
      filteredRoofers.forEach((roofer) => {
        const rooferCoords = getRooferFastCoordinates(roofer);
        if (rooferCoords) {
          const distance = calculateDistance(userLocation, rooferCoords);
          distancesMap.set(roofer.id, distance);
        } else {
          distancesMap.set(roofer.id, Infinity);
        }
      });
      setRooferDistances(distancesMap);
    } else {
      setRooferDistances(new Map());
    }
  }, [filteredRoofers, showNearMe, userLocation]);

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
          <button
            onClick={handleNearMeClick}
            disabled={locationLoading}
            className="inline-flex items-center gap-2 px-6 py-3 bg-rif-blue-500 text-white rounded-lg hover:bg-rif-blue-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FontAwesomeIcon 
              icon={faMapLocationDot} 
              className={locationLoading ? 'animate-bounce' : ''}
            />
            {locationLoading ? 'Getting Location...' : 'Roofers Near Me'}
          </button>
          <p className="mt-3 text-sm text-gray-500">
            Your browser will ask for location permission to show roofers near you.
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
          <div className="flex flex-col md:flex-row gap-4 items-end">
            {/* Search — same as header: city, county, region; navigates to service area */}
            <div className="flex-1 w-full max-w-4xl">
              <div className="pl-12 mb-[-2px] z-10 relative">
                <span className="inline-block px-4 py-1.5 bg-green-500 text-white text-sm font-bold uppercase rounded-t-2xl">
                  FIND A ROOFER NEAR ME
                </span>
              </div>
              <ServiceAreaSearch variant="hero" />
            </div>

            {/* Map View Button */}
            <Link
              href="/roofers/map"
              className="px-4 py-2 bg-rif-blue-500 text-white rounded-lg hover:bg-rif-blue-600 transition-colors font-medium flex items-center gap-2 whitespace-nowrap"
            >
              <FontAwesomeIcon icon={faMapLocationDot} />
              View Map
            </Link>
          </div>

          {/* Active Filters Display */}
          {showNearMe && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-600">Active filters:</span>
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-rif-blue-100 text-rif-blue-700 rounded-full text-sm">
                <FontAwesomeIcon icon={faMapLocationDot} />
                Roofers Near Me
                <button
                  onClick={() => {
                    setShowNearMe(false);
                    setUserLocationAddress(null);
                  }}
                  className="hover:text-rif-blue-900"
                >
                  <FontAwesomeIcon icon={faTimes} className="h-3 w-3" />
                </button>
              </span>
              <button
                onClick={() => {
                  setShowNearMe(false);
                  setUserLocationAddress(null);
                }}
                className="text-sm text-gray-600 hover:text-rif-blue-500 underline"
              >
                Clear all
              </button>
            </div>
          )}
          
          {/* Location Status */}
          {showNearMe && (
            <div className="mt-4">
              {locationLoading && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FontAwesomeIcon icon={faMapLocationDot} className="h-4 w-4 animate-pulse" />
                  <span>Getting your location...</span>
                </div>
              )}
              {locationError && (
                <div className="flex flex-col gap-2 text-sm text-amber-700 bg-amber-50 px-4 py-3 rounded-lg border border-amber-200">
                  <div className="flex items-start gap-2">
                    <FontAwesomeIcon icon={faMapLocationDot} className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>{locationError}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleNearMeClick}
                    className="self-start px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-800 font-medium rounded-lg transition-colors"
                  >
                    Try again
                  </button>
                </div>
              )}
              {userLocation && !locationError && !locationLoading && (
                <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-2 rounded-lg">
                  <FontAwesomeIcon icon={faMapLocationDot} className="h-4 w-4" />
                  <span>
                    Showing closest roofers: 3 Certified, 3 Sponsored, 5 General
                    {userLocationAddress && ` (${userLocationAddress})`}
                  </span>
                </div>
              )}
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
                  {!showNearMe && displayedRoofers.length < filteredRoofers.length && (
                    <span className="ml-2 text-rif-blue-600">
                      (Showing {displayedRoofers.length} of {filteredRoofers.length})
                    </span>
                  )}
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
                Try adjusting your filters to find roofers.
              </p>
              <button
                onClick={() => {
                  setShowNearMe(false);
                  setUserLocationAddress(null);
                }}
                className="text-rif-blue-500 hover:text-rif-blue-600 underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedRoofers.map((roofer) => (
                  <RooferCard 
                    key={roofer.id} 
                    roofer={roofer}
                    distance={rooferDistances.get(roofer.id)}
                  />
                ))}
              </div>
              {/* Load More Button */}
              {!showNearMe && remainingGeneralCount > 0 && (
                <div className="mt-8 text-center">
                  <button
                    onClick={() => {
                      // #region agent log
                      try {
                        fetch('http://127.0.0.1:7242/ingest/16419525-2d8f-4245-a872-e347769048b8',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'roofers/page.tsx:1030',message:'Load More button clicked',data:{currentLimit:generalDisplayLimit,remainingBefore:remainingGeneralCount},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
                      } catch (e) {}
                      // #endregion
                      setGeneralDisplayLimit((prev) => {
                        const newLimit = prev + 10;
                        // #region agent log
                        try {
                          fetch('http://127.0.0.1:7242/ingest/16419525-2d8f-4245-a872-e347769048b8',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'roofers/page.tsx:1035',message:'setGeneralDisplayLimit called',data:{prev,newLimit},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
                        } catch (e) {}
                        // #endregion
                        return newLimit;
                      });
                    }}
                    className="px-6 py-3 bg-rif-blue-500 text-white rounded-lg hover:bg-rif-blue-600 transition-colors font-medium inline-flex items-center gap-2"
                  >
                    <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
                    Load More Roofers ({remainingGeneralCount} remaining)
                  </button>
                </div>
              )}
            </>
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



