/**
 * API Route to sync Google Business Reviews
 * 
 * This endpoint:
 * 1. Fetches reviews from Google Business Profile API
 * 2. Maps them to roofers by location ID or store code
 * 3. Updates the reviews.ts file
 * 
 * Can be called:
 * - Manually via POST request
 * - Automatically via cron job (weekly)
 */

import { NextRequest, NextResponse } from 'next/server';
import { getAllReviewsForAllLocations, getGoogleBusinessLocations } from '@/lib/google-business-api';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import type { GoogleReview } from '@/app/roofers/data/reviews';

// Path to reviews.ts file
const REVIEWS_FILE_PATH = join(process.cwd(), 'app', 'roofers', 'data', 'reviews.ts');

interface RooferMapping {
  rooferId: string;
  googleLocationId?: string;
  googleStoreCode?: string;
}

/**
 * Read existing reviews from reviews.ts
 */
function readExistingReviews(): Map<string, GoogleReview[]> {
  try {
    const content = readFileSync(REVIEWS_FILE_PATH, 'utf-8');
    const reviewsMap = new Map<string, GoogleReview[]>();

    // Extract reviews from the file (simplified parser)
    // This is a basic implementation - may need refinement
    const reviewsMatch = content.match(/export const googleReviews[^=]*=\s*\{([\s\S]*?)\};/);
    
    if (reviewsMatch) {
      // Parse reviews (this is simplified - actual parsing would be more robust)
      // For now, we'll merge with new reviews
    }

    return reviewsMap;
  } catch (error) {
    console.error('Error reading existing reviews:', error);
    return new Map();
  }
}

/**
 * Generate TypeScript code for reviews
 */
function generateReviewsCode(reviewsMap: Map<string, GoogleReview[]>): string {
  const lines: string[] = [];
  
  lines.push('// Google Business Reviews - Auto-synced from Google Business Profile API');
  lines.push('// Last synced: ' + new Date().toISOString());
  lines.push('');
  lines.push('export const googleReviews: Record<string, GoogleReview[]> = {');

  for (const [rooferId, reviews] of reviewsMap.entries()) {
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
 * Get roofer mappings from roofers.ts
 * Maps roofers to their Google Business location IDs
 */
function getRooferMappings(): Map<string, RooferMapping> {
  try {
    const roofersPath = join(process.cwd(), 'app', 'roofers', 'data', 'roofers.ts');
    const content = readFileSync(roofersPath, 'utf-8');
    const mappings = new Map<string, RooferMapping>();

    // Extract roofer data and look for googleLocationId or googleStoreCode
    // This is a simplified parser - in production, you'd want a more robust solution
    const rooferMatches = content.matchAll(/['"]([^'"]+)['"]:\s*\{([^}]+)\}/g);
    
    for (const match of rooferMatches) {
      const slug = match[1];
      const rooferData = match[2];
      
      // Extract id
      const idMatch = rooferData.match(/id:\s*['"]([^'"]+)['"]/);
      if (!idMatch) continue;
      
      const rooferId = idMatch[1];
      
      // Look for googleLocationId or googleStoreCode
      const locationIdMatch = rooferData.match(/googleLocationId:\s*['"]([^'"]+)['"]/);
      const storeCodeMatch = rooferData.match(/googleStoreCode:\s*['"]([^'"]+)['"]/);
      
      mappings.set(rooferId, {
        rooferId,
        googleLocationId: locationIdMatch?.[1],
        googleStoreCode: storeCodeMatch?.[1],
      });
    }

    return mappings;
  } catch (error) {
    console.error('Error reading roofer mappings:', error);
    return new Map();
  }
}

/**
 * Map Google reviews to roofers
 */
function mapReviewsToRoofers(
  googleReviews: Map<string, GoogleReview[]>,
  rooferMappings: Map<string, RooferMapping>
): Map<string, GoogleReview[]> {
  const mappedReviews = new Map<string, GoogleReview[]>();

  // Create reverse mapping: googleLocationId/storeCode -> rooferId
  const locationToRoofer = new Map<string, string>();
  
  for (const mapping of rooferMappings.values()) {
    if (mapping.googleLocationId) {
      locationToRoofer.set(mapping.googleLocationId, mapping.rooferId);
    }
    if (mapping.googleStoreCode) {
      locationToRoofer.set(mapping.googleStoreCode, mapping.rooferId);
    }
  }

  // Also create mapping from locationId to rooferId (for direct location ID matching)
  const locationIdToRoofer = new Map<string, string>();
  for (const mapping of rooferMappings.values()) {
    if (mapping.googleLocationId) {
      locationIdToRoofer.set(mapping.googleLocationId, mapping.rooferId);
    }
  }

  // Map reviews
  for (const [locationKey, reviews] of googleReviews.entries()) {
    // Try to find roofer by locationKey (could be locationId or storeCode)
    let rooferId = locationToRoofer.get(locationKey);
    
    // If not found, try matching by locationId directly
    if (!rooferId) {
      rooferId = locationIdToRoofer.get(locationKey);
    }
    
    if (rooferId) {
      // Update rooferId in reviews
      reviews.forEach((review) => {
        review.rooferId = rooferId!;
      });
      mappedReviews.set(rooferId, reviews);
    } else {
      console.warn(`No roofer mapping found for location: ${locationKey}`);
      // Still add reviews with locationKey as rooferId for manual mapping later
      mappedReviews.set(locationKey, reviews);
    }
  }

  return mappedReviews;
}

export async function POST(request: NextRequest) {
  try {
    // No authentication required - simple local/admin use
    console.log('Starting Google Reviews sync...');

    // Get roofer mappings
    const rooferMappings = getRooferMappings();
    console.log(`Found ${rooferMappings.size} roofer mappings`);

    // Fetch all reviews from Google
    let googleReviews: Map<string, GoogleReview[]>;
    try {
      googleReviews = await getAllReviewsForAllLocations();
      console.log(`Fetched reviews from ${googleReviews.size} locations`);
    } catch (error: any) {
      // If API fails, check if it's a deprecation/availability issue
      if (error.message?.includes('deprecated') || error.message?.includes('not found') || error.code === 404) {
        return NextResponse.json(
          {
            error: 'Google Business Profile API reviews endpoint may be unavailable',
            message: 'The reviews endpoint appears to be deprecated or not available. Please see data/roofers/API-ALTERNATIVES.md for alternative methods.',
            suggestion: 'Consider using Google Places API or manual CSV import',
          },
          { status: 503 }
        );
      }
      throw error;
    }

    // Map reviews to roofers
    const mappedReviews = mapReviewsToRoofers(googleReviews, rooferMappings);
    console.log(`Mapped reviews to ${mappedReviews.size} roofers`);

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
// Reviews are auto-synced from Google Business Profile API

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
    const reviewsCode = generateReviewsCode(mappedReviews);

    // Write updated file
    const newContent = header + reviewsCode + '\n' + footer;
    writeFileSync(REVIEWS_FILE_PATH, newContent, 'utf-8');

    // Calculate statistics
    let totalReviews = 0;
    for (const reviews of mappedReviews.values()) {
      totalReviews += reviews.length;
    }

    return NextResponse.json({
      success: true,
      message: 'Reviews synced successfully',
      statistics: {
        locationsProcessed: googleReviews.size,
        roofersUpdated: mappedReviews.size,
        totalReviews,
        syncedAt: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    console.error('Error syncing reviews:', error);
    return NextResponse.json(
      {
        error: 'Failed to sync reviews',
        message: error.message,
      },
      { status: 500 }
    );
  }
}

// GET endpoint for manual trigger and status
export async function GET() {
  try {
    const locations = await getGoogleBusinessLocations();
    
    return NextResponse.json({
      status: 'ready',
      locationsFound: locations.length,
      locations: locations.map((loc) => ({
        locationId: loc.locationId,
        title: loc.title,
        storeCode: loc.storeCode,
      })),
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

















