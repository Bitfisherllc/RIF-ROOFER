/**
 * Google Business Profile API Integration
 * 
 * This service fetches reviews from Google Business Profile API
 * 
 * Setup Required:
 * 1. Create a Google Cloud Project
 * 2. Enable Google Business Profile API
 * 3. Create a Service Account
 * 4. Download JSON credentials file
 * 5. Add service account email to Google Business Profile as Manager/Owner
 * 6. Place credentials in: .env.local (GOOGLE_SERVICE_ACCOUNT_JSON)
 */

import { google } from 'googleapis';
import type { GoogleReview } from '@/app/roofers/data/reviews';

interface GoogleBusinessLocation {
  name: string; // locations/{locationId}
  locationId: string;
  storeCode?: string;
  title?: string;
  websiteUri?: string;
  phoneNumbers?: {
    primaryPhone?: string;
  };
}

interface GoogleReviewResponse {
  reviews?: Array<{
    reviewId: string;
    reviewer: {
      displayName: string;
      profilePhotoUrl?: string;
    };
    starRating: 'ONE' | 'TWO' | 'THREE' | 'FOUR' | 'FIVE';
    comment?: string;
    createTime: string;
    updateTime?: string;
    reviewReply?: {
      comment: string;
      updateTime: string;
    };
    reviewUrl?: string;
  }>;
  averageRating?: number;
  totalReviewCount?: number;
  nextPageToken?: string;
}

// Map Google star rating enum to number
function mapStarRating(rating: string): number {
  const mapping: Record<string, number> = {
    ONE: 1,
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5,
  };
  return mapping[rating] || 0;
}

/**
 * Initialize Google Business Profile API client
 */
async function getGoogleBusinessClient() {
  try {
    // Get credentials from environment variable
    const credentialsJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
    
    if (!credentialsJson) {
      throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON environment variable is not set');
    }

    const credentials = JSON.parse(credentialsJson);
    
    // Create JWT client for service account
    const auth = new google.auth.JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: [
        'https://www.googleapis.com/auth/business.manage',
      ],
    });

    // Create Business Profile API clients
    // Note: Google has consolidated APIs - using mybusinessbusinessinformation for reviews
    const businessProfile = google.mybusinessaccountmanagement({
      version: 'v1',
      auth,
    });

    const businessInfo = google.mybusinessbusinessinformation({
      version: 'v1',
      auth,
    });

    return {
      businessProfile,
      businessInfo,
      auth,
    };
  } catch (error) {
    console.error('Error initializing Google Business API client:', error);
    throw error;
  }
}

/**
 * Get all locations for the account
 */
export async function getGoogleBusinessLocations(): Promise<GoogleBusinessLocation[]> {
  try {
    const { businessProfile } = await getGoogleBusinessClient();
    
    // List all accounts
    const accountsResponse = await businessProfile.accounts.list();
    const accounts = accountsResponse.data.accounts || [];
    
    if (accounts.length === 0) {
      throw new Error('No Google Business Profile accounts found');
    }

    // Get locations for the first account (or iterate through all)
    const accountName = accounts[0].name;
    const locationsResponse = await (businessProfile.accounts as any).locations.list({
      parent: accountName || '',
    });

    const locations = locationsResponse.data.locations || [];
    
    return locations.map((location: any) => ({
      name: location.name || '',
      locationId: location.name?.split('/').pop() || '',
      storeCode: location.storeCode || undefined,
      title: location.title || undefined,
      websiteUri: location.websiteUri || undefined,
      phoneNumbers: location.phoneNumbers || undefined,
    }));
  } catch (error) {
    console.error('Error fetching Google Business locations:', error);
    throw error;
  }
}

/**
 * Get reviews for a specific location
 * 
 * Note: Google Business Profile API v4.9 reviews endpoint was deprecated.
 * This attempts to use the Business Information API v1, which may have
 * different endpoints or limitations.
 */
export async function getLocationReviews(
  locationId: string,
  pageSize: number = 50,
  pageToken?: string
): Promise<{ reviews: GoogleReview[]; nextPageToken?: string }> {
  try {
    const { businessInfo } = await getGoogleBusinessClient();
    
    // Try Business Information API reviews endpoint
    // Note: This endpoint may not be available in v1 API
    let response;
    try {
      response = await (businessInfo.locations as any).reviews.list({
        name: `locations/${locationId}`,
        pageSize,
        pageToken,
      });
    } catch (apiError: any) {
      // If reviews endpoint doesn't exist, try alternative methods
      if (apiError.code === 404 || apiError.message?.includes('not found')) {
        console.warn(`Reviews endpoint not available for location ${locationId}. API may have changed.`);
        // Try to get location details which might include review summary
        try {
          const locationDetails = await businessInfo.locations.get({
            name: `locations/${locationId}`,
          });
          
          // If location has review data in a different format, extract it
          // This is a fallback - actual implementation depends on API response
          console.log('Location details available, but reviews endpoint may be deprecated');
        } catch (detailError) {
          console.error('Could not fetch location details:', detailError);
        }
      }
      throw apiError;
    }

    const data = response.data as any;
    const reviews: GoogleReview[] = [];

    if (data.reviews && Array.isArray(data.reviews)) {
      for (const review of data.reviews) {
        reviews.push({
          id: review.reviewId || `review-${Date.now()}-${Math.random()}`,
          rooferId: '', // Will be mapped by locationId
          reviewerName: review.reviewer?.displayName || 'Anonymous',
          rating: mapStarRating(review.starRating || 'FIVE'),
          reviewText: review.comment || '',
          reviewDate: review.createTime || new Date().toISOString(),
          googleReviewUrl: review.reviewUrl || undefined,
          reviewerPhotoUrl: review.reviewer?.profilePhotoUrl || undefined,
          responseText: review.reviewReply?.comment || undefined,
          responseDate: review.reviewReply?.updateTime || undefined,
          importedAt: new Date().toISOString(),
        });
      }
    }

    return {
      reviews,
      nextPageToken: data.nextPageToken,
    };
  } catch (error: any) {
    console.error(`Error fetching reviews for location ${locationId}:`, error);
    
    // If API endpoint is not available, return empty with warning
    if (error.code === 404 || error.message?.includes('not found') || error.message?.includes('deprecated')) {
      console.warn('Reviews API endpoint may be deprecated or unavailable. Consider using alternative methods.');
      return {
        reviews: [],
        nextPageToken: undefined,
      };
    }
    
    // For other errors, still return empty to allow other locations to sync
    return {
      reviews: [],
      nextPageToken: undefined,
    };
  }
}

/**
 * Get all reviews for all locations (paginated)
 */
export async function getAllReviewsForAllLocations(): Promise<
  Map<string, GoogleReview[]>
> {
  try {
    const locations = await getGoogleBusinessLocations();
    const reviewsMap = new Map<string, GoogleReview[]>();

    for (const location of locations) {
      try {
        let pageToken: string | undefined;
        const allReviews: GoogleReview[] = [];

        do {
          const result = await getLocationReviews(location.locationId, 50, pageToken);
          
          // Map reviews to location/storeCode or use locationId
          const rooferId = location.storeCode || location.locationId;
          
          result.reviews.forEach((review) => {
            review.rooferId = rooferId;
            allReviews.push(review);
          });

          pageToken = result.nextPageToken;
        } while (pageToken);

        if (allReviews.length > 0) {
          const rooferId = location.storeCode || location.locationId;
          reviewsMap.set(rooferId, allReviews);
        }
      } catch (error) {
        console.error(`Error fetching reviews for location ${location.name}:`, error);
        // Continue with other locations
      }
    }

    return reviewsMap;
  } catch (error) {
    console.error('Error fetching all reviews:', error);
    throw error;
  }
}

/**
 * Sync reviews for a specific roofer by Google Business location ID
 */
export async function syncReviewsForRoofer(
  rooferId: string,
  googleLocationId: string
): Promise<GoogleReview[]> {
  try {
    const result = await getLocationReviews(googleLocationId);
    
    // Map all reviews to this roofer
    result.reviews.forEach((review) => {
      review.rooferId = rooferId;
    });

    return result.reviews;
  } catch (error) {
    console.error(`Error syncing reviews for roofer ${rooferId}:`, error);
    throw error;
  }
}

















