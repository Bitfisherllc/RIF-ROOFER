'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLocationDot,
  faMapLocationDot,
  faArrowLeft,
  faSpinner,
  faCertificate,
  faPhone,
  faGlobe,
  faArrowRight,
  faShield,
  faCircleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import {
  getAllRoofers,
  type RooferData,
} from '../data/roofers';
import { searchData } from '@/app/service-areas/data/search-data';
import { getRooferFastCoordinates } from '@/lib/fast-coordinates';
import type { Coordinates } from '@/lib/geocoding';
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

function getRegionName(regionSlug: string): string {
  return regionNames[regionSlug] || regionSlug;
}

function getCountyName(countySlug: string): string {
  const county = searchData.find(
    (item) => item.type === 'county' && item.slug === countySlug
  );
  return county ? county.name.replace(' County', '') : countySlug;
}

function getCityName(citySlug: string): string {
  const city = searchData.find(
    (item) => item.type === 'city' && item.slug === citySlug
  );
  return city ? city.name : citySlug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
}

// Haversine distance in miles
function distanceMiles(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 3959; // Earth radius in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Optional reverse geocode via Nominatim (no API key)
async function reverseGeocode(lat: number, lng: number): Promise<string | null> {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;
    const res = await fetch(url, {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return null;
    const data = await res.json();
    const city = data.address?.city || data.address?.town || data.address?.village;
    const state = data.address?.state;
    if (city && state) return `${city}, ${state}`;
    return city || state || null;
  } catch {
    return null;
  }
}

// Roofer card (matches main roofers page, with distance)
function RooferCard({ roofer, distance }: { roofer: RooferData; distance?: number }) {
  const router = useRouter();
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

  const getCategoryLabel = () => {
    if (roofer.category === 'preferred' || roofer.isPreferred) {
      return {
        label: (
          <>
            <span className="rif-brand">RiF</span> Certified
          </>
        ),
        bg: 'bg-card-green-100',
        text: 'text-card-green-800',
      };
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
          <div
            className={`flex items-center gap-2 px-3 py-1 ${categoryInfo.bg} ${categoryInfo.text} rounded-full text-sm font-semibold`}
          >
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
            rooferListingType={roofer.category === 'preferred' || roofer.isPreferred ? 'preferred' : roofer.category === 'sponsored' ? 'sponsored' : 'general'}
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

      <div
        className="cursor-pointer"
        onClick={() => router.push(`/roofers/${roofer.slug}`)}
      >
        <h3 className="text-2xl font-semibold text-rif-black mb-3 group-hover:text-rif-blue-500 transition-colors">
          {roofer.name}
        </h3>

        {(roofer.address || roofer.city) && (
          <div className="flex items-start gap-2 text-gray-600 mb-4">
            <FontAwesomeIcon
              icon={faMapLocationDot}
              className="h-4 w-4 text-rif-blue-500 mt-0.5 flex-shrink-0"
            />
            <div className="flex-1">
              {roofer.address && <div>{roofer.address}</div>}
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
          {isGeneral && (
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 mt-2">
              <p className="text-sm text-gray-600">
                <strong className="text-gray-800">FREE FLORIDA ROOFER LISTING</strong> - Upgrade
                to Certified or Sponsored to show contact details
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

type LocationStatus = 'idle' | 'loading' | 'success' | 'denied' | 'error' | 'unsupported';

export default function NearMePage() {
  const [locationStatus, setLocationStatus] = useState<LocationStatus>('idle');
  const [userCoords, setUserCoords] = useState<Coordinates | null>(null);
  const [locationLabel, setLocationLabel] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      setLocationStatus('unsupported');
      return;
    }
    setLocationStatus('loading');
    setErrorMessage(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const coords: Coordinates = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserCoords(coords);
        setLocationStatus('success');
        const label = await reverseGeocode(coords.lat, coords.lng);
        setLocationLabel(label);
      },
      (err) => {
        if (err.code === 1) {
          setLocationStatus('denied');
          setErrorMessage('Location access was denied. Enable location in your browser to see roofers near you.');
        } else {
          setLocationStatus('error');
          setErrorMessage(err.message || 'Could not get your location.');
        }
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 60000 }
    );
  }, []);

  const { nearestRoofers, distances } = useMemo(() => {
    const all = getAllRoofers();
    if (!userCoords) {
      return { nearestRoofers: [], distances: new Map<string, number>() };
    }

    const withDistance: Array<{ roofer: RooferData; distance: number }> = [];
    for (const roofer of all) {
      const coords = getRooferFastCoordinates(roofer);
      if (!coords) continue;
      const dist = distanceMiles(
        userCoords.lat,
        userCoords.lng,
        coords.lat,
        coords.lng
      );
      withDistance.push({ roofer, distance: dist });
    }
    withDistance.sort((a, b) => a.distance - b.distance);

    const getCategory = (r: RooferData): 'preferred' | 'sponsored' | 'general' => {
      if (r.category === 'preferred' || r.isPreferred) return 'preferred';
      if (r.category === 'sponsored') return 'sponsored';
      return 'general';
    };

    const preferred = withDistance.filter((x) => getCategory(x.roofer) === 'preferred').slice(0, 3);
    const sponsored = withDistance.filter((x) => getCategory(x.roofer) === 'sponsored').slice(0, 3);
    const general = withDistance.filter((x) => getCategory(x.roofer) === 'general').slice(0, 5);

    const combined = [...preferred, ...sponsored, ...general];
    const distMap = new Map<string, number>();
    combined.forEach(({ roofer, distance }) => distMap.set(roofer.id, distance));

    return {
      nearestRoofers: combined.map((x) => x.roofer),
      distances: distMap,
    };
  }, [userCoords]);

  return (
    <div className="min-h-screen bg-white">
      <section className="pt-20 pb-8 px-6 bg-gradient-to-b from-rif-blue-50 to-white">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/roofers"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-rif-blue-600 mb-6"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="h-4 w-4" />
            Back to all roofers
          </Link>
          <h1 className="text-4xl md:text-5xl font-semibold text-rif-black mb-4 tracking-tight">
            Roofers Near Me
          </h1>
          <p className="text-xl text-gray-600">
            Roofers closest to your location, sorted by distance.
          </p>
        </div>
      </section>

      <section className="py-6 px-6 bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto">
          {locationStatus === 'loading' && (
            <div className="flex items-center gap-3 text-gray-600">
              <FontAwesomeIcon icon={faSpinner} className="h-5 w-5 animate-spin" />
              <span>Getting your location…</span>
            </div>
          )}
          {locationStatus === 'success' && userCoords && (
            <div className="flex items-center gap-2 text-green-700 bg-green-50 px-4 py-2 rounded-lg border border-green-200">
              <FontAwesomeIcon icon={faLocationDot} className="h-5 w-5 text-green-600" />
              <span className="font-medium">
                {locationLabel ? `Near ${locationLabel}` : 'Location found'}
              </span>
            </div>
          )}
          {locationStatus === 'denied' && (
            <div className="flex items-start gap-3 text-amber-800 bg-amber-50 px-4 py-3 rounded-lg border border-amber-200">
              <FontAwesomeIcon icon={faCircleExclamation} className="h-5 w-5 text-amber-600 mt-0.5" />
              <div>
                <p className="font-medium">Location access denied</p>
                <p className="text-sm mt-1">{errorMessage}</p>
                <p className="text-sm mt-2">
                  You can still{' '}
                  <Link href="/roofers" className="text-rif-blue-600 hover:underline">
                    browse all roofers
                  </Link>{' '}
                  or search by city, county, or region.
                </p>
              </div>
            </div>
          )}
          {locationStatus === 'error' && (
            <div className="flex items-start gap-3 text-amber-800 bg-amber-50 px-4 py-3 rounded-lg border border-amber-200">
              <FontAwesomeIcon icon={faCircleExclamation} className="h-5 w-5 text-amber-600 mt-0.5" />
              <div>
                <p className="font-medium">Could not get location</p>
                <p className="text-sm mt-1">{errorMessage}</p>
                <Link href="/roofers" className="text-rif-blue-600 hover:underline text-sm mt-2 inline-block">
                  Browse all roofers
                </Link>
              </div>
            </div>
          )}
          {locationStatus === 'unsupported' && (
            <div className="flex items-start gap-3 text-amber-800 bg-amber-50 px-4 py-3 rounded-lg border border-amber-200">
              <FontAwesomeIcon icon={faCircleExclamation} className="h-5 w-5 text-amber-600 mt-0.5" />
              <div>
                <p className="font-medium">Location not supported</p>
                <p className="text-sm mt-1">Your browser or device does not support geolocation.</p>
                <Link href="/roofers" className="text-rif-blue-600 hover:underline text-sm mt-2 inline-block">
                  Browse all roofers
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {locationStatus === 'loading' && (
            <div className="flex justify-center py-12">
              <FontAwesomeIcon icon={faSpinner} className="h-10 w-10 text-rif-blue-500 animate-spin" />
            </div>
          )}

          {(locationStatus === 'denied' || locationStatus === 'error' || locationStatus === 'unsupported') && (
            <div className="max-w-2xl mx-auto text-center py-12">
              <p className="text-gray-600 mb-6">
                Enable location to see roofers sorted by distance from you.
              </p>
              <Link
                href="/roofers"
                className="inline-flex items-center gap-2 px-6 py-3 bg-rif-blue-500 text-white rounded-lg hover:bg-rif-blue-600 transition-colors font-medium"
              >
                <FontAwesomeIcon icon={faMapLocationDot} />
                View all roofers
              </Link>
            </div>
          )}

          {locationStatus === 'success' && (
            <>
              <h2 className="text-2xl font-semibold text-rif-black mb-6">
                {nearestRoofers.length === 0
                  ? 'No roofers with location data nearby'
                  : `${nearestRoofers.length} roofer${nearestRoofers.length !== 1 ? 's' : ''} nearest to you`}
              </h2>
              {nearestRoofers.length === 0 ? (
                <div className="bg-white p-12 rounded-2xl border border-gray-200 text-center">
                  <p className="text-gray-600 mb-4">
                    We couldn&apos;t find roofers with coordinates in our database for your area.
                  </p>
                  <Link
                    href="/roofers"
                    className="text-rif-blue-500 hover:text-rif-blue-600 underline"
                  >
                    View all roofers in Florida
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {nearestRoofers.map((roofer) => (
                    <RooferCard
                      key={roofer.id}
                      roofer={roofer}
                      distance={distances.get(roofer.id)}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
