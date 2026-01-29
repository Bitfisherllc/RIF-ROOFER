'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCertificate,
  faPhone,
  faGlobe,
  faMapLocationDot,
  faArrowRight,
  faEnvelope,
  faShield,
  faChevronDown,
  faChevronUp,
} from '@fortawesome/free-solid-svg-icons';
import FavoriteButton from './FavoriteButton';
import { getRoofersByServiceArea, type RooferData } from '@/app/roofers/data/roofers';
import { searchData } from '@/app/service-areas/data/search-data';

interface RooferListProps {
  regionSlug: string;
  countySlug?: string;
  citySlug?: string;
  locationName: string;
}

// Helper to get region name from slug
function getRegionName(regionSlug: string): string {
  const region = searchData.find((item) => item.type === 'region' && item.slug === regionSlug);
  return region ? region.name : regionSlug;
}

// Helper to get county name from slug
function getCountyName(countySlug: string): string {
  const county = searchData.find((item) => item.type === 'county' && item.slug === countySlug);
  return county ? county.name.replace(' County', '') : countySlug;
}

// Helper to get city name from slug
function getCityName(citySlug: string): string {
  const city = searchData.find((item) => item.type === 'city' && item.slug === citySlug);
  return city ? city.name : citySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

// Roofer Card Component
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
            <div className="text-sm text-gray-500">License: {roofer.licenseNumber}</div>
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
                <span key={idx} className="inline-block px-2 py-1 bg-gray-50 text-gray-700 rounded text-xs">
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

const INITIAL_DISPLAY_COUNT = 3;

export default function RooferList({ regionSlug, countySlug, citySlug, locationName }: RooferListProps) {
  // Get roofers for this service area (already sorted by category)
  const allRoofers = getRoofersByServiceArea(regionSlug, countySlug, citySlug);

  // Separate by category (getRoofersByServiceArea already sorts them correctly)
  const certifiedRoofers = allRoofers.filter((roofer) => roofer.category === 'preferred' || roofer.isPreferred);
  const sponsoredRoofers = allRoofers.filter((roofer) => roofer.category === 'sponsored');
  const generalRoofers = allRoofers.filter((roofer) => roofer.category === 'general' || roofer.category === undefined);

  // Show 3 per section initially; "View more" expands in place
  const [certifiedExpanded, setCertifiedExpanded] = useState(false);
  const [sponsoredExpanded, setSponsoredExpanded] = useState(false);
  const [generalExpanded, setGeneralExpanded] = useState(false);

  if (allRoofers.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 text-center">
        <FontAwesomeIcon icon={faMapLocationDot} className="h-12 w-12 text-gray-300 mb-4" />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Roofers Found</h3>
        <p className="text-gray-600 mb-4">
          We don't currently have any roofers serving {locationName}. Check back soon or{' '}
          <Link href="/contact" className="text-rif-blue-500 hover:text-rif-blue-600">
            contact us
          </Link>{' '}
          to learn more.
        </p>
        <Link
          href="/service-areas"
          className="inline-block px-6 py-3 bg-rif-blue-500 text-white rounded-lg hover:bg-rif-blue-600 transition-colors"
        >
          Browse Other Areas
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Certified Roofers */}
      {certifiedRoofers.length > 0 && (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-card-green-500 to-card-green-600 text-white rounded-full text-sm font-bold">
              <FontAwesomeIcon icon={faCertificate} className="h-4 w-4" />
              Certified RIF Contractors
            </div>
            <span className="text-sm text-gray-600">({certifiedRoofers.length})</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(certifiedExpanded ? certifiedRoofers : certifiedRoofers.slice(0, INITIAL_DISPLAY_COUNT)).map((roofer) => (
              <RooferCard key={roofer.id} roofer={roofer} />
            ))}
          </div>
          {certifiedRoofers.length > INITIAL_DISPLAY_COUNT && (
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setCertifiedExpanded((v) => !v)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-card-green-100 text-card-green-800 rounded-lg hover:bg-card-green-200 transition-colors font-semibold text-sm"
              >
                {certifiedExpanded ? (
                  <>
                    <FontAwesomeIcon icon={faChevronUp} className="h-4 w-4" />
                    Show less
                  </>
                ) : (
                  <>
                    View more ({certifiedRoofers.length - INITIAL_DISPLAY_COUNT} more)
                    <FontAwesomeIcon icon={faChevronDown} className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Sponsored Roofers */}
      {sponsoredRoofers.length > 0 && (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-card-blue-500 to-card-blue-600 text-white rounded-full text-sm font-bold">
              <FontAwesomeIcon icon={faCertificate} className="h-4 w-4" />
              Sponsored Roofers
            </div>
            <span className="text-sm text-gray-600">({sponsoredRoofers.length})</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(sponsoredExpanded ? sponsoredRoofers : sponsoredRoofers.slice(0, INITIAL_DISPLAY_COUNT)).map((roofer) => (
              <RooferCard key={roofer.id} roofer={roofer} />
            ))}
          </div>
          {sponsoredRoofers.length > INITIAL_DISPLAY_COUNT && (
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setSponsoredExpanded((v) => !v)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-card-blue-100 text-card-blue-800 rounded-lg hover:bg-card-blue-200 transition-colors font-semibold text-sm"
              >
                {sponsoredExpanded ? (
                  <>
                    <FontAwesomeIcon icon={faChevronUp} className="h-4 w-4" />
                    Show less
                  </>
                ) : (
                  <>
                    View more ({sponsoredRoofers.length - INITIAL_DISPLAY_COUNT} more)
                    <FontAwesomeIcon icon={faChevronDown} className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      )}

      {/* General Listings */}
      {generalRoofers.length > 0 && (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-full text-sm font-bold">
              <FontAwesomeIcon icon={faCertificate} className="h-4 w-4" />
              General Listings
            </div>
            <span className="text-sm text-gray-600">({generalRoofers.length})</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(generalExpanded ? generalRoofers : generalRoofers.slice(0, INITIAL_DISPLAY_COUNT)).map((roofer) => (
              <RooferCard key={roofer.id} roofer={roofer} />
            ))}
          </div>
          {generalRoofers.length > INITIAL_DISPLAY_COUNT && (
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setGeneralExpanded((v) => !v)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors font-semibold text-sm"
              >
                {generalExpanded ? (
                  <>
                    <FontAwesomeIcon icon={faChevronUp} className="h-4 w-4" />
                    Show less
                  </>
                ) : (
                  <>
                    View more ({generalRoofers.length - INITIAL_DISPLAY_COUNT} more)
                    <FontAwesomeIcon icon={faChevronDown} className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
