/**
 * Alternative Google Business Profile API Implementation
 * 
 * This version attempts to use different API endpoints and methods
 * to access reviews, as the direct reviews endpoint may be deprecated.
 * 
 * Options:
 * 1. Google Business Profile Performance API
 * 2. Google Places API (if reviews are public)
 * 3. Third-party review aggregation services
 */

import { google } from 'googleapis';
import type { GoogleReview } from '@/app/roofers/data/reviews';

/**
 * Attempt to fetch reviews using Places API (if business is public)
 * This requires a different API key and may have limitations
 */
export async function getReviewsViaPlacesAPI(
  placeId: string,
  apiKey: string
): Promise<GoogleReview[]> {
  try {
    // Note: Places API has different structure and may require different setup
    // This is a placeholder for alternative implementation
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating&key=${apiKey}`
    );

    const data = await response.json();

    if (data.status !== 'OK' || !data.result) {
      throw new Error(`Places API error: ${data.status}`);
    }

    const reviews: GoogleReview[] = [];

    if (data.result.reviews) {
      for (const review of data.result.reviews) {
        reviews.push({
          id: review.time?.toString() || `place-${Date.now()}-${Math.random()}`,
          rooferId: '', // Will be mapped
          reviewerName: review.author_name || 'Anonymous',
          rating: review.rating || 5,
          reviewText: review.text || '',
          reviewDate: new Date(review.time * 1000).toISOString(),
          reviewerPhotoUrl: review.profile_photo_url || undefined,
          importedAt: new Date().toISOString(),
        });
      }
    }

    return reviews;
  } catch (error) {
    console.error('Error fetching reviews via Places API:', error);
    throw error;
  }
}

/**
 * Get Place ID from Google Business URL
 * This can help if you have the Google Maps URL
 */
export function extractPlaceIdFromUrl(url: string): string | null {
  // Extract place ID from various Google Maps URL formats
  const patterns = [
    /place_id=([^&]+)/,
    /\/place\/([^\/]+)/,
    /cid=(\d+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }

  return null;
}
















