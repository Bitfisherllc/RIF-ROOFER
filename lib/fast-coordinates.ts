// Fast coordinate lookup using city/county data before geocoding
// This provides instant coordinates for most roofers without API calls

import { Coordinates } from './geocoding';
import { getCountyCoordinates } from './county-coordinates';
import { cityData } from '@/app/service-areas/data/cities';

/**
 * Get coordinates quickly using city/county data (no API call)
 * Returns null if city/county coordinates not available
 */
export function getFastCoordinates(
  city?: string,
  countySlug?: string
): Coordinates | null {
  // First try to get city coordinates (most accurate)
  if (city) {
    const citySlug = city.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    
    // Search through all regions and counties for this city
    for (const regionData of Object.values(cityData)) {
      for (const countyData of Object.values(regionData)) {
        for (const cityEntry of Object.values(countyData)) {
          const entrySlug = cityEntry.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
          if (entrySlug === citySlug && cityEntry.latitude && cityEntry.longitude) {
            return {
              lat: cityEntry.latitude,
              lng: cityEntry.longitude,
            };
          }
        }
      }
    }
  }
  
  // Fall back to county coordinates
  if (countySlug) {
    const countyCoords = getCountyCoordinates(countySlug);
    if (countyCoords) {
      return countyCoords;
    }
  }
  
  // Try to find county from city if we have city but no county slug
  if (city && !countySlug) {
    // Search for city in cityData to find its county
    const citySlug = city.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    
    for (const regionData of Object.values(cityData)) {
      for (const [countySlugKey, countyData] of Object.entries(regionData)) {
        for (const cityEntry of Object.values(countyData)) {
          const entrySlug = cityEntry.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
          if (entrySlug === citySlug) {
            const countyCoords = getCountyCoordinates(cityEntry.countySlug);
            if (countyCoords) {
              return countyCoords;
            }
          }
        }
      }
    }
  }
  
  return null;
}

/**
 * Get approximate coordinates for a roofer (fast, no API call)
 * Uses city coordinates if available, otherwise county coordinates
 */
export function getRooferFastCoordinates(roofer: {
  city?: string;
  serviceAreas?: {
    counties?: string[];
  };
}): Coordinates | null {
  const city = roofer.city;
  const countySlug = roofer.serviceAreas?.counties?.[0]; // Use first county
  
  return getFastCoordinates(city, countySlug);
}


