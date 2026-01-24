// Region center coordinates for Florida regions
// These are approximate center points for each region, calculated from county centers

import { Coordinates } from './geocoding';

// Region center coordinates (approximate geographic centers)
// Calculated as the average of county centers within each region
export const regionCoordinates: Record<string, Coordinates> = {
  'sun-coast': { lat: 28.1875, lng: -82.4907 }, // Average of Hillsborough, Pinellas, Pasco, Hernando
  'treasure-coast': { lat: 27.2107, lng: -80.3466 }, // Average of Indian River, St. Lucie, Martin, Palm Beach
  'southwest-florida': { lat: 26.7679, lng: -82.0173 }, // Average of Sarasota, Charlotte, Lee, Collier
  'south-florida': { lat: 25.7860, lng: -80.2650 }, // Average of Miami-Dade, Broward, Palm Beach South, Monroe
  'north-florida': { lat: 30.1361, lng: -81.7783 }, // Average of Duval, St. Johns, Alachua, Clay
  'florida-panhandle': { lat: 30.4951, lng: -85.1523 }, // Average of Escambia, Santa Rosa, Okaloosa, Bay, Leon
  'first-coast': { lat: 30.2386, lng: -81.6470 }, // Average of Duval-FC, St. Johns-FC, Nassau, Clay-FC
  'central-florida': { lat: 28.3294, lng: -81.5481 }, // Average of Orange, Seminole, Osceola, Polk, Lake
};

/**
 * Get coordinates for a region by its slug
 */
export function getRegionCoordinates(regionSlug: string): Coordinates | null {
  return regionCoordinates[regionSlug.toLowerCase()] || null;
}

/**
 * Get all region slugs that have coordinates
 */
export function getAllRegionSlugs(): string[] {
  return Object.keys(regionCoordinates);
}

