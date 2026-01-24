/**
 * Google Places API Integration
 * 
 * This service fetches reviews from Google Places API (public API)
 * Much simpler than Business Profile API - just needs an API key!
 * 
 * Setup:
 * 1. Get Google Places API key from Google Cloud Console
 * 2. Enable "Places API" in your project
 * 3. Add API key to .env.local as GOOGLE_PLACES_API_KEY
 */

import type { GoogleReview } from '@/app/roofers/data/reviews';

interface GooglePlaceDetails {
  place_id: string;
  name?: string;
  rating?: number;
  user_ratings_total?: number;
  reviews?: Array<{
    author_name: string;
    author_url?: string;
    profile_photo_url?: string;
    rating: number;
    relative_time_description: string;
    text: string;
    time: number; // Unix timestamp
  }>;
}

interface PlaceSearchResult {
  place_id: string;
  name: string;
  formatted_address?: string;
  rating?: number;
  user_ratings_total?: number;
}

/**
 * Search for a place by name and address
 */
export async function searchPlace(
  name: string,
  address?: string
): Promise<PlaceSearchResult | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  
  if (!apiKey) {
    throw new Error('GOOGLE_PLACES_API_KEY environment variable is not set');
  }

  // Build search query
  let query = name;
  if (address) {
    query += ` ${address}`;
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?` +
      `query=${encodeURIComponent(query)}&` +
      `key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`Places API error: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
      throw new Error(`Places API error: ${data.status} - ${data.error_message || ''}`);
    }

    if (data.results && data.results.length > 0) {
      // Return the first result (most relevant)
      const result = data.results[0];
      return {
        place_id: result.place_id,
        name: result.name,
        formatted_address: result.formatted_address,
        rating: result.rating,
        user_ratings_total: result.user_ratings_total,
      };
    }

    return null;
  } catch (error: any) {
    console.error('Error searching for place:', error);
    throw error;
  }
}

/**
 * Get place details including reviews
 */
export async function getPlaceDetails(
  placeId: string
): Promise<GooglePlaceDetails | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  
  if (!apiKey) {
    throw new Error('GOOGLE_PLACES_API_KEY environment variable is not set');
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?` +
      `place_id=${placeId}&` +
      `fields=place_id,name,rating,user_ratings_total,reviews&` +
      `key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`Places API error: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.status !== 'OK') {
      throw new Error(`Places API error: ${data.status} - ${data.error_message || ''}`);
    }

    if (data.result) {
      return {
        place_id: data.result.place_id,
        name: data.result.name,
        rating: data.result.rating,
        user_ratings_total: data.result.user_ratings_total,
        reviews: data.result.reviews || [],
      };
    }

    return null;
  } catch (error: any) {
    console.error('Error fetching place details:', error);
    throw error;
  }
}

/**
 * Convert Google Places review to our GoogleReview format
 */
export function convertPlaceReviewToReview(
  placeReview: any,
  rooferId: string,
  placeId: string
): GoogleReview {
  // Convert Unix timestamp to ISO date
  const reviewDate = new Date(placeReview.time * 1000).toISOString();
  
  // Generate review ID
  const reviewId = `places-${placeId}-${placeReview.time}-${placeReview.author_name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;

  return {
    id: reviewId,
    rooferId,
    reviewerName: placeReview.author_name || 'Anonymous',
    rating: placeReview.rating || 0,
    reviewText: placeReview.text || '',
    reviewDate,
    googleReviewUrl: placeReview.author_url || undefined,
    reviewerPhotoUrl: placeReview.profile_photo_url || undefined,
    importedAt: new Date().toISOString(),
  };
}

/**
 * Get all reviews for a place
 */
export async function getPlaceReviews(
  placeId: string,
  rooferId: string
): Promise<GoogleReview[]> {
  try {
    const placeDetails = await getPlaceDetails(placeId);
    
    if (!placeDetails || !placeDetails.reviews) {
      return [];
    }

    return placeDetails.reviews.map((review) =>
      convertPlaceReviewToReview(review, rooferId, placeId)
    );
  } catch (error: any) {
    console.error(`Error fetching reviews for place ${placeId}:`, error);
    return [];
  }
}

/**
 * Search for a place and get its reviews
 */
export async function searchAndGetReviews(
  name: string,
  address: string | undefined,
  rooferId: string
): Promise<{ place: PlaceSearchResult | null; reviews: GoogleReview[] }> {
  const place = await searchPlace(name, address);
  
  if (!place) {
    return { place: null, reviews: [] };
  }

  const reviews = await getPlaceReviews(place.place_id, rooferId);
  
  return { place, reviews };
}

















