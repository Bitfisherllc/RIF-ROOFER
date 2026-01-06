// Geocoding utility to convert addresses to coordinates
// Uses Nominatim (OpenStreetMap) geocoding service - free, no API key required

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface GeocodeResult {
  coordinates: Coordinates | null;
  formattedAddress: string | null;
}

// Cache for geocoding results to avoid repeated API calls
const geocodeCache = new Map<string, GeocodeResult>();

// Load cache from localStorage on initialization (client-side only)
if (typeof window !== 'undefined') {
  try {
    const cached = localStorage.getItem('geocodeCache');
    if (cached) {
      const parsed = JSON.parse(cached);
      Object.entries(parsed).forEach(([key, value]: [string, any]) => {
        geocodeCache.set(key, value);
      });
    }
  } catch (e) {
    console.warn('Failed to load geocode cache from localStorage', e);
  }
}

// Save cache to localStorage (debounced)
let saveCacheTimeout: NodeJS.Timeout | null = null;
function saveCacheToStorage() {
  if (typeof window === 'undefined') return;
  
  if (saveCacheTimeout) {
    clearTimeout(saveCacheTimeout);
  }
  
  saveCacheTimeout = setTimeout(() => {
    try {
      const cacheObj: Record<string, GeocodeResult> = {};
      geocodeCache.forEach((value, key) => {
        cacheObj[key] = value;
      });
      localStorage.setItem('geocodeCache', JSON.stringify(cacheObj));
    } catch (e) {
      console.warn('Failed to save geocode cache to localStorage', e);
    }
  }, 1000);
}

// Global rate limiter for Nominatim API (1 request per second)
let lastRequestTime = 0;
const RATE_LIMIT_DELAY = 1100; // 1.1 seconds between requests to be safe

async function waitForRateLimit(): Promise<void> {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  
  if (timeSinceLastRequest < RATE_LIMIT_DELAY) {
    const waitTime = RATE_LIMIT_DELAY - timeSinceLastRequest;
    await new Promise(resolve => setTimeout(resolve, waitTime));
  }
  
  lastRequestTime = Date.now();
}

/**
 * Geocode an address to get latitude and longitude
 * Uses the address data as the primary location source
 * @param address - Street address
 * @param city - City name
 * @param state - State abbreviation (defaults to FL)
 * @param zipCode - ZIP code
 * @returns Promise with coordinates or null if not found
 */
export async function geocodeAddress(
  address?: string,
  city?: string,
  state?: string,
  zipCode?: string
): Promise<GeocodeResult> {
  // Build full address string using all available address components
  // Priority: full address > city+state+zip > city+state > city only
  const addressParts: string[] = [];
  
  // Always include street address if available
  if (address) {
    addressParts.push(address.trim());
  }
  
  // Add city if available
  if (city) {
    addressParts.push(city.trim());
  }
  
  // Add state (default to FL if not provided but we have other location data)
  const stateToUse = state || (city ? 'FL' : undefined);
  if (stateToUse) {
    addressParts.push(stateToUse);
  }
  
  // Add ZIP code if available
  if (zipCode) {
    // Handle string zip codes
    const zipStr = zipCode.trim();
    addressParts.push(zipStr);
  }
  
  // If we have at least city or address, add USA for better geocoding
  const fullAddress = addressParts.length > 0 
    ? addressParts.join(', ') + ', USA'
    : '';
  
  if (!fullAddress) {
    return { coordinates: null, formattedAddress: null };
  }
  
  // Check cache first - cached results don't need rate limiting
  const cacheKey = fullAddress.toLowerCase().trim();
  if (geocodeCache.has(cacheKey)) {
    return geocodeCache.get(cacheKey)!;
  }
  
  try {
    // Wait for rate limit before making API request
    await waitForRateLimit();
    
    // Use Nominatim geocoding service (free, no API key)
    // This service uses the address data as the location source
    const encodedAddress = encodeURIComponent(fullAddress);
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}&limit=1&addressdetails=1`;
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Florida Roofers Map Application', // Required by Nominatim
      },
    });
    
    if (!response.ok) {
      throw new Error(`Geocoding failed: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (data && data.length > 0) {
      const result = data[0];
      const coordinates: Coordinates = {
        lat: parseFloat(result.lat),
        lng: parseFloat(result.lon),
      };
      
      // Use the formatted address from the geocoding service, or fall back to our constructed address
      const formattedAddress = result.display_name || addressParts.join(', ');
      
      const geocodeResult: GeocodeResult = {
        coordinates,
        formattedAddress,
      };
      
      // Cache the result
      geocodeCache.set(cacheKey, geocodeResult);
      saveCacheToStorage();
      
      return geocodeResult;
    }
    
    // No results found - try with just city and state if we had a full address
    if (address && city && stateToUse && addressParts.length > 2) {
      const fallbackAddress = `${city}, ${stateToUse}, USA`;
      const fallbackKey = fallbackAddress.toLowerCase().trim();
      
      if (!geocodeCache.has(fallbackKey)) {
        // Wait for rate limit before making fallback request
        await waitForRateLimit();
        
        const fallbackEncoded = encodeURIComponent(fallbackAddress);
        const fallbackUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${fallbackEncoded}&limit=1`;
        
        try {
          const fallbackResponse = await fetch(fallbackUrl, {
            headers: {
              'User-Agent': 'Florida Roofers Map Application',
            },
          });
          
          if (fallbackResponse.ok) {
            const fallbackData = await fallbackResponse.json();
            if (fallbackData && fallbackData.length > 0) {
              const fallbackResult = fallbackData[0];
              const fallbackCoords: Coordinates = {
                lat: parseFloat(fallbackResult.lat),
                lng: parseFloat(fallbackResult.lon),
              };
              
              const fallbackGeocodeResult: GeocodeResult = {
                coordinates: fallbackCoords,
                formattedAddress: fallbackResult.display_name || fallbackAddress,
              };
              
              geocodeCache.set(fallbackKey, fallbackGeocodeResult);
              saveCacheToStorage();
              return fallbackGeocodeResult;
            }
          }
        } catch (fallbackError) {
          console.error('Fallback geocoding error:', fallbackError);
        }
      } else {
        // Return cached fallback result
        return geocodeCache.get(fallbackKey)!;
      }
    }
    
    // No results found
    const noResult: GeocodeResult = { coordinates: null, formattedAddress: null };
    geocodeCache.set(cacheKey, noResult);
    saveCacheToStorage();
    return noResult;
  } catch (error) {
    console.error('Geocoding error:', error);
    const errorResult: GeocodeResult = { coordinates: null, formattedAddress: null };
    geocodeCache.set(cacheKey, errorResult);
    saveCacheToStorage();
    return errorResult;
  }
}

/**
 * Batch geocode multiple addresses with parallel processing and rate limiting
 * Processes addresses in parallel batches to respect rate limits while maximizing throughput
 * @param addresses - Array of address objects
 * @param onProgress - Optional callback for progress updates
 * @param concurrency - Number of concurrent requests (default: 2, max recommended: 3)
 * @returns Promise with array of geocode results in same order as input
 */
export async function batchGeocode(
  addresses: Array<{ address?: string; city?: string; state?: string; zipCode?: string }>,
  onProgress?: (current: number, total: number) => void,
  concurrency: number = 2
): Promise<GeocodeResult[]> {
  const results: GeocodeResult[] = new Array(addresses.length);
  let completed = 0;
  
  // Process in batches with controlled concurrency
  const processBatch = async (startIndex: number) => {
    const batch: Promise<void>[] = [];
    
    for (let i = startIndex; i < addresses.length && i < startIndex + concurrency; i++) {
      const index = i;
      const addr = addresses[index];
      
      const promise = geocodeAddress(addr.address, addr.city, addr.state, addr.zipCode)
        .then((result) => {
          results[index] = result;
          completed++;
          if (onProgress) {
            onProgress(completed, addresses.length);
          }
        })
        .catch((error) => {
          console.error(`Geocoding error for address ${index}:`, error);
          results[index] = { coordinates: null, formattedAddress: null };
          completed++;
          if (onProgress) {
            onProgress(completed, addresses.length);
          }
        });
      
      batch.push(promise);
    }
    
    await Promise.all(batch);
  };
  
  // Process all addresses in batches
  for (let i = 0; i < addresses.length; i += concurrency) {
    await processBatch(i);
  }
  
  return results;
}

