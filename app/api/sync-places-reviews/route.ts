/**
 * API Route to sync Google Places Reviews
 * 
 * This endpoint:
 * 1. Reads roofer data from roofers.ts
 * 2. Searches for each roofer on Google Places
 * 3. Fetches reviews from Google Places API
 * 4. Updates the reviews.ts file
 * 
 * No API key authentication needed - uses Google Places API key from env
 */

import { NextRequest, NextResponse } from 'next/server';
import { searchAndGetReviews, searchPlace, getPlaceReviews } from '@/lib/google-places-api';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import type { GoogleReview } from '@/app/roofers/data/reviews';
import { rooferData } from '@/app/roofers/data/roofers';

// Path to reviews.ts file
const REVIEWS_FILE_PATH = join(process.cwd(), 'app', 'roofers', 'data', 'reviews.ts');

interface RooferData {
  id: string;
  name: string;
  address?: string;
  city?: string;
  state?: string;
  googlePlaceId?: string; // Optional: if you already know the place_id
}

/**
 * Read roofers from rooferData (imported directly)
 */
function getAllRoofers(): RooferData[] {
  try {
    const roofers: RooferData[] = [];
    
    // Get all roofers from the imported rooferData
    const allRoofers = Object.values(rooferData);
    
    for (const roofer of allRoofers) {
      // Skip hidden roofers
      if (roofer.isHidden) continue;
      
      roofers.push({
        id: roofer.id,
        name: roofer.name,
        address: (roofer as any).address,
        city: (roofer as any).city,
        state: (roofer as any).state,
        googlePlaceId: (roofer as any).googlePlaceId,
      });
    }

    return roofers;
  } catch (error) {
    console.error('Error reading roofers:', error);
    return [];
  }
}

/**
 * Generate TypeScript code for reviews
 */
function generateReviewsCode(reviewsMap: Map<string, GoogleReview[]>): string {
  const lines: string[] = [];
  
  lines.push('// Google Places Reviews - Auto-synced from Google Places API');
  lines.push('// Last synced: ' + new Date().toISOString());
  lines.push('');
  lines.push('export const googleReviews: Record<string, GoogleReview[]> = {');

  for (const [rooferId, reviews] of reviewsMap.entries()) {
    if (reviews.length === 0) continue;
    
    lines.push(`  '${rooferId}': [`);
    
    for (const review of reviews) {
      lines.push('    {');
      lines.push(`      id: '${review.id}',`);
      lines.push(`      rooferId: '${review.rooferId}',`);
      lines.push(`      reviewerName: ${JSON.stringify(review.reviewerName)},`);
      lines.push(`      rating: ${review.rating},`);
      lines.push(`      reviewText: ${JSON.stringify(review.reviewText)},`);
      lines.push(`      reviewDate: '${review.reviewDate}',`);
      
      if (review.googleReviewUrl) {
        lines.push(`      googleReviewUrl: '${review.googleReviewUrl}',`);
      }
      
      if (review.reviewerPhotoUrl) {
        lines.push(`      reviewerPhotoUrl: '${review.reviewerPhotoUrl}',`);
      }
      
      if (review.responseText) {
        lines.push(`      responseText: ${JSON.stringify(review.responseText)},`);
      }
      
      if (review.responseDate) {
        lines.push(`      responseDate: '${review.responseDate}',`);
      }
      
      lines.push(`      importedAt: '${review.importedAt}',`);
      lines.push('    },');
    }
    
    lines.push('  ],');
  }

  lines.push('};');
  
  return lines.join('\n');
}

/**
 * Sync reviews for all roofers
 */
export async function POST(request: NextRequest) {
  try {
    console.log('Starting Google Places Reviews sync...');

    const roofers = getAllRoofers();
    console.log(`Found ${roofers.length} roofers to sync`);

    const reviewsMap = new Map<string, GoogleReview[]>();
    const stats = {
      roofersProcessed: 0,
      roofersWithReviews: 0,
      totalReviews: 0,
      errors: [] as string[],
    };

    // Process each roofer
    for (const roofer of roofers) {
      try {
        stats.roofersProcessed++;
        
        let reviews: GoogleReview[] = [];

        // If we have a place_id, use it directly
        if (roofer.googlePlaceId) {
          console.log(`Fetching reviews for ${roofer.name} using place_id: ${roofer.googlePlaceId}`);
          reviews = await getPlaceReviews(roofer.googlePlaceId, roofer.id);
        } else {
          // Otherwise, search for the place
          const address = [roofer.address, roofer.city, roofer.state]
            .filter(Boolean)
            .join(', ');
          
          console.log(`Searching for ${roofer.name} at ${address || 'no address'}`);
          
          const result = await searchAndGetReviews(roofer.name, address || undefined, roofer.id);
          
          if (result.place) {
            reviews = result.reviews;
            console.log(`Found place: ${result.place.name} (${result.place.place_id})`);
          } else {
            console.log(`No place found for ${roofer.name}`);
          }
        }

        if (reviews.length > 0) {
          reviewsMap.set(roofer.id, reviews);
          stats.roofersWithReviews++;
          stats.totalReviews += reviews.length;
          console.log(`  ✓ Found ${reviews.length} reviews for ${roofer.name}`);
        }

        // Add small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 200));
      } catch (error: any) {
        const errorMsg = `Error syncing ${roofer.name}: ${error.message}`;
        console.error(errorMsg);
        stats.errors.push(errorMsg);
      }
    }

    // Read existing reviews file to preserve structure
    let existingContent = '';
    try {
      existingContent = readFileSync(REVIEWS_FILE_PATH, 'utf-8');
    } catch (error) {
      // File doesn't exist, we'll create it
    }

    // Extract header (everything before googleReviews)
    const headerMatch = existingContent.match(/^([\s\S]*?)(?:export const googleReviews|$)/);
    let header = headerMatch ? headerMatch[1] : '';
    
    // If no existing file, create default header
    if (!header || header.trim().length === 0) {
      header = `// Google Business Reviews data structure
// Reviews are auto-synced from Google Places API

export interface GoogleReview {
  id: string;
  rooferId: string;
  reviewerName: string;
  rating: number;
  reviewText: string;
  reviewDate: string;
  googleReviewUrl?: string;
  reviewerPhotoUrl?: string;
  responseText?: string;
  responseDate?: string;
  importedAt: string;
  lastUpdated?: string;
}

export interface RooferRatingSummary {
  rooferId: string;
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  lastUpdated: string;
}

`;
    }

    // Extract footer (helper functions after googleReviews)
    const footerMatch = existingContent.match(/export const googleReviews[\s\S]*?\};\s*([\s\S]*)$/);
    let footer = footerMatch ? footerMatch[1] : '';
    
    // If no footer, create default helper functions
    if (!footer || footer.trim().length === 0) {
      footer = `
// Helper to get reviews for a specific roofer
export function getReviewsForRoofer(rooferId: string): GoogleReview[] {
  return googleReviews[rooferId] || [];
}

// Helper to get rating summary for a roofer
export function getRatingSummary(rooferId: string): RooferRatingSummary {
  const reviews = getReviewsForRoofer(rooferId);
  
  if (reviews.length === 0) {
    return {
      rooferId,
      averageRating: 0,
      totalReviews: 0,
      ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      lastUpdated: new Date().toISOString(),
    };
  }

  const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  let totalRating = 0;

  reviews.forEach((review) => {
    distribution[review.rating as keyof typeof distribution]++;
    totalRating += review.rating;
  });

  return {
    rooferId,
    averageRating: Math.round((totalRating / reviews.length) * 10) / 10,
    totalReviews: reviews.length,
    ratingDistribution: distribution,
    lastUpdated: reviews[reviews.length - 1]?.importedAt || new Date().toISOString(),
  };
}

// Helper to get all reviews (for admin)
export function getAllReviews(): GoogleReview[] {
  return Object.values(googleReviews).flat();
}
`;
    }

    // Generate new reviews code
    const reviewsCode = generateReviewsCode(reviewsMap);

    // Write updated file
    const newContent = header + reviewsCode + '\n' + footer;
    writeFileSync(REVIEWS_FILE_PATH, newContent, 'utf-8');

    return NextResponse.json({
      success: true,
      message: 'Reviews synced successfully',
      statistics: {
        roofersProcessed: stats.roofersProcessed,
        roofersWithReviews: stats.roofersWithReviews,
        totalReviews: stats.totalReviews,
        errors: stats.errors.length,
        syncedAt: new Date().toISOString(),
      },
      errors: stats.errors.length > 0 ? stats.errors : undefined,
    });
  } catch (error: any) {
    console.error('Error syncing reviews:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to sync reviews',
        message: error.message,
      },
      { status: 500 }
    );
  }
}

// GET endpoint for testing
export async function GET() {
  try {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        {
          status: 'error',
          error: 'GOOGLE_PLACES_API_KEY not set in environment variables',
          message: 'Add GOOGLE_PLACES_API_KEY to your .env.local file',
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      status: 'ready',
      message: 'Google Places API is configured',
      note: 'Use POST to sync reviews',
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 'error',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
















