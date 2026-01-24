/**
 * Admin API for managing reviews manually
 * No API keys needed - simple CRUD operations
 */

import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import type { GoogleReview } from '@/app/roofers/data/reviews';

const REVIEWS_FILE_PATH = join(process.cwd(), 'app', 'roofers', 'data', 'reviews.ts');

/**
 * Read reviews from reviews.ts file
 */
function readReviews(): Record<string, GoogleReview[]> {
  try {
    const content = readFileSync(REVIEWS_FILE_PATH, 'utf-8');
    
    // Extract the googleReviews object using regex
    const match = content.match(/export const googleReviews:\s*Record<string,\s*GoogleReview\[\]>\s*=\s*\{([\s\S]*?)\};/);
    
    if (!match) {
      return {};
    }

    // Parse the reviews (simplified parser - in production you'd want a more robust solution)
    const reviews: Record<string, GoogleReview[]> = {};
    const rooferMatches = match[1].matchAll(/'([^']+)':\s*\[([\]]*?)\]/g);
    
    // For now, we'll use a simpler approach - read the file and parse it
    // This is a basic implementation
    return {};
  } catch (error) {
    console.error('Error reading reviews:', error);
    return {};
  }
}

/**
 * Write reviews to reviews.ts file
 */
function writeReviews(reviews: Record<string, GoogleReview[]>): void {
  try {
    // Read existing file to preserve header and footer
    let existingContent = '';
    try {
      existingContent = readFileSync(REVIEWS_FILE_PATH, 'utf-8');
    } catch (error) {
      // File doesn't exist, we'll create it
    }

    // Extract header
    const headerMatch = existingContent.match(/^([\s\S]*?)(?:export const googleReviews|$)/);
    let header = headerMatch ? headerMatch[1] : '';
    
    if (!header || header.trim().length === 0) {
      header = `// Google Business Reviews data structure
// Reviews can be managed manually through the admin interface

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

    // Extract footer
    const footerMatch = existingContent.match(/export const googleReviews[\s\S]*?\};\s*([\s\S]*)$/);
    let footer = footerMatch ? footerMatch[1] : '';
    
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

    // Generate reviews code
    const lines: string[] = [];
    lines.push('// Reviews managed manually - last updated: ' + new Date().toISOString());
    lines.push('export const googleReviews: Record<string, GoogleReview[]> = {');

    for (const [rooferId, rooferReviews] of Object.entries(reviews)) {
      if (rooferReviews.length === 0) continue;
      
      lines.push(`  '${rooferId}': [`);
      
      for (const review of rooferReviews) {
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

    const reviewsCode = lines.join('\n');
    const newContent = header + reviewsCode + '\n' + footer;
    writeFileSync(REVIEWS_FILE_PATH, newContent, 'utf-8');
  } catch (error) {
    console.error('Error writing reviews:', error);
    throw error;
  }
}

// GET - List reviews for a roofer
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const rooferId = searchParams.get('rooferId');

    if (!rooferId) {
      return NextResponse.json({ error: 'rooferId required' }, { status: 400 });
    }

    // Import reviews dynamically
    const reviewsModule = await import('@/app/roofers/data/reviews');
    const reviews = reviewsModule.getReviewsForRoofer(rooferId);

    return NextResponse.json({ reviews });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to load reviews', message: error.message },
      { status: 500 }
    );
  }
}

// POST - Add new review
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, rooferId, reviewerName, rating, reviewText, reviewDate, googleReviewUrl, reviewerPhotoUrl, responseText, responseDate } = body;

    if (!rooferId || !reviewerName || !rating || !reviewText || !reviewDate) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Import existing reviews
    const reviewsModule = await import('@/app/roofers/data/reviews');
    const allReviews = reviewsModule.getAllReviews();
    
    // Group by rooferId
    const reviewsByRoofer: Record<string, GoogleReview[]> = {};
    for (const review of allReviews) {
      if (!reviewsByRoofer[review.rooferId]) {
        reviewsByRoofer[review.rooferId] = [];
      }
      reviewsByRoofer[review.rooferId].push(review);
    }

    // Generate ID if not provided
    const reviewId = id || `manual-${rooferId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Create new review
    const newReview: GoogleReview = {
      id: reviewId,
      rooferId,
      reviewerName,
      rating: parseInt(rating),
      reviewText,
      reviewDate: reviewDate.includes('T') ? reviewDate : `${reviewDate}T00:00:00Z`,
      googleReviewUrl: googleReviewUrl || undefined,
      reviewerPhotoUrl: reviewerPhotoUrl || undefined,
      responseText: responseText || undefined,
      responseDate: responseDate ? (responseDate.includes('T') ? responseDate : `${responseDate}T00:00:00Z`) : undefined,
      importedAt: new Date().toISOString(),
    };

    // Add to reviews
    if (!reviewsByRoofer[rooferId]) {
      reviewsByRoofer[rooferId] = [];
    }
    reviewsByRoofer[rooferId].push(newReview);

    // Write back to file
    writeReviews(reviewsByRoofer);

    return NextResponse.json({ success: true, review: newReview });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to add review', message: error.message },
      { status: 500 }
    );
  }
}

// PUT - Update existing review
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, rooferId, reviewerName, rating, reviewText, reviewDate, googleReviewUrl, reviewerPhotoUrl, responseText, responseDate } = body;

    if (!id || !rooferId || !reviewerName || !rating || !reviewText || !reviewDate) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Import existing reviews
    const reviewsModule = await import('@/app/roofers/data/reviews');
    const allReviews = reviewsModule.getAllReviews();
    
    // Group by rooferId and update
    const reviewsByRoofer: Record<string, GoogleReview[]> = {};
    let found = false;

    for (const review of allReviews) {
      if (!reviewsByRoofer[review.rooferId]) {
        reviewsByRoofer[review.rooferId] = [];
      }
      
      if (review.id === id) {
        // Update this review
        reviewsByRoofer[review.rooferId].push({
          ...review,
          reviewerName,
          rating: parseInt(rating),
          reviewText,
          reviewDate: reviewDate.includes('T') ? reviewDate : `${reviewDate}T00:00:00Z`,
          googleReviewUrl: googleReviewUrl || undefined,
          reviewerPhotoUrl: reviewerPhotoUrl || undefined,
          responseText: responseText || undefined,
          responseDate: responseDate ? (responseDate.includes('T') ? responseDate : `${responseDate}T00:00:00Z`) : undefined,
          lastUpdated: new Date().toISOString(),
        });
        found = true;
      } else {
        reviewsByRoofer[review.rooferId].push(review);
      }
    }

    if (!found) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    // Write back to file
    writeReviews(reviewsByRoofer);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to update review', message: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Delete review
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const reviewId = searchParams.get('reviewId');

    if (!reviewId) {
      return NextResponse.json({ error: 'reviewId required' }, { status: 400 });
    }

    // Import existing reviews
    const reviewsModule = await import('@/app/roofers/data/reviews');
    const allReviews = reviewsModule.getAllReviews();
    
    // Group by rooferId and filter out deleted review
    const reviewsByRoofer: Record<string, GoogleReview[]> = {};

    for (const review of allReviews) {
      if (review.id === reviewId) continue; // Skip deleted review
      
      if (!reviewsByRoofer[review.rooferId]) {
        reviewsByRoofer[review.rooferId] = [];
      }
      reviewsByRoofer[review.rooferId].push(review);
    }

    // Write back to file
    writeReviews(reviewsByRoofer);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to delete review', message: error.message },
      { status: 500 }
    );
  }
}

















