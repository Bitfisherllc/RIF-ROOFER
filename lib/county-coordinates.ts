// County center coordinates for Florida counties
// These are approximate center points for each county, used for initial map display

import { Coordinates } from './geocoding';

// County center coordinates (approximate geographic centers)
// These are well-known coordinates that don't require geocoding
export const countyCoordinates: Record<string, Coordinates> = {
  // Sun Coast
  'hillsborough': { lat: 27.9904, lng: -82.3018 }, // Tampa area
  'pinellas': { lat: 27.8961, lng: -82.7412 }, // St. Petersburg/Clearwater area
  'pasco': { lat: 28.3078, lng: -82.4654 }, // New Port Richey area
  'hernando': { lat: 28.5556, lng: -82.4544 }, // Brooksville area
  
  // Treasure Coast
  'indian-river': { lat: 27.6936, lng: -80.4756 }, // Vero Beach area
  'st-lucie': { lat: 27.3773, lng: -80.4756 }, // Fort Pierce area
  'martin': { lat: 27.0664, lng: -80.3989 }, // Stuart area
  'palm-beach': { lat: 26.7056, lng: -80.0364 }, // West Palm Beach area
  
  // Southwest Florida
  'sarasota': { lat: 27.3364, lng: -82.5307 }, // Sarasota area
  'charlotte': { lat: 26.9298, lng: -81.9498 }, // Punta Gorda area
  'lee': { lat: 26.6636, lng: -81.9532 }, // Fort Myers area
  'collier': { lat: 26.1420, lng: -81.7948 }, // Naples area
  
  // South Florida
  'miami-dade': { lat: 25.7617, lng: -80.1918 }, // Miami area
  'broward': { lat: 26.1224, lng: -80.1373 }, // Fort Lauderdale area
  'palm-beach-south': { lat: 26.7056, lng: -80.0364 }, // West Palm Beach area
  'monroe': { lat: 24.5557, lng: -81.7826 }, // Key West area
  
  // North Florida
  'duval': { lat: 30.3322, lng: -81.6557 }, // Jacksonville area
  'st-johns': { lat: 29.9012, lng: -81.3124 }, // St. Augustine area
  'alachua': { lat: 29.6516, lng: -82.3248 }, // Gainesville area
  'clay': { lat: 30.1094, lng: -81.8196 }, // Green Cove Springs area
  
  // Florida Panhandle
  'escambia': { lat: 30.4383, lng: -87.2166 }, // Pensacola area
  'santa-rosa': { lat: 30.7000, lng: -87.0167 }, // Milton area
  'okaloosa': { lat: 30.6638, lng: -86.5928 }, // Fort Walton Beach area
  'bay': { lat: 30.1844, lng: -85.6608 }, // Panama City area
  'leon': { lat: 30.4550, lng: -84.2807 }, // Tallahassee area
  
  // First Coast (duplicates with different slugs)
  'duval-fc': { lat: 30.3322, lng: -81.6557 }, // Jacksonville area
  'st-johns-fc': { lat: 29.9012, lng: -81.3124 }, // St. Augustine area
  'nassau': { lat: 30.6105, lng: -81.8001 }, // Fernandina Beach area
  'clay-fc': { lat: 30.1094, lng: -81.8196 }, // Green Cove Springs area
  
  // Central Florida
  'orange': { lat: 28.5383, lng: -81.3792 }, // Orlando area
  'seminole': { lat: 28.7178, lng: -81.3081 }, // Sanford area
  'osceola': { lat: 28.3056, lng: -81.4165 }, // Kissimmee area
  'polk': { lat: 28.0406, lng: -81.9498 }, // Lakeland area
  'lake': { lat: 28.7505, lng: -81.6859 }, // Tavares area
};

/**
 * Get coordinates for a county by its slug
 */
export function getCountyCoordinates(countySlug: string): Coordinates | null {
  return countyCoordinates[countySlug.toLowerCase()] || null;
}

/**
 * Get all county slugs that have coordinates
 */
export function getAllCountySlugs(): string[] {
  return Object.keys(countyCoordinates);
}










