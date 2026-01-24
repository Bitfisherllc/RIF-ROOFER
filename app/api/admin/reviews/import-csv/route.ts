/**
 * Import reviews from CSV
 * No API keys needed - just upload a CSV file
 */

import { NextRequest, NextResponse } from 'next/server';
import { writeFileSync } from 'fs';
import { join } from 'path';
import type { GoogleReview } from '@/app/roofers/data/reviews';

const REVIEWS_FILE_PATH = join(process.cwd(), 'app', 'roofers', 'data', 'reviews.ts');

function parseCSV(csvText: string): GoogleReview[] {
  const lines = csvText.split('\n').filter(line => line.trim());
  if (lines.length < 2) return [];

  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
  const reviews: GoogleReview[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim().replace(/^"|"$/g, ''));
    if (values.length < headers.length) continue;

    const row: Record<string, string> = {};
    headers.forEach((header, index) => {
      row[header] = values[index] || '';
    });

    if (!row.rooferId || !row.rating) continue;

    const reviewId = row.reviewId || `csv-${row.rooferId}-${Date.now()}-${i}`;
    
    reviews.push({
      id: reviewId,
      rooferId: row.rooferId,
      reviewerName: row.reviewerName || 'Anonymous',
      rating: parseInt(row.rating) || 5,
      reviewText: row.reviewText || '',
      reviewDate: row.reviewDate || new Date().toISOString(),
      googleReviewUrl: row.googleReviewUrl || undefined,
      reviewerPhotoUrl: row.reviewerPhotoUrl || undefined,
      responseText: row.responseText || undefined,
      responseDate: row.responseDate || undefined,
      importedAt: new Date().toISOString(),
    });
  }

  return reviews;
}

function writeReviews(reviews: Record<string, GoogleReview[]>): void {
  // Read existing file structure
  let existingContent = '';
  try {
    existingContent = require('fs').readFileSync(REVIEWS_FILE_PATH, 'utf-8');
  } catch (error) {
    // File doesn't exist
  }

  // Extract header and footer (same as in route.ts)
  const headerMatch = existingContent.match(/^([\s\S]*?)(?:export const googleReviews|$)/);
  let header = headerMatch ? headerMatch[1] : '';
  
  if (!header || header.trim().length === 0) {
    header = `// Google Business Reviews data structure
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
  ratingDistribution: { 5: number; 4: number; 3: number; 2: number; 1: number; };
  lastUpdated: string;
}

`;
  }

  const footerMatch = existingContent.match(/export const googleReviews[\s\S]*?\};\s*([\s\S]*)$/);
  let footer = footerMatch ? footerMatch[1] : '';
  
  if (!footer || footer.trim().length === 0) {
    footer = `
export function getReviewsForRoofer(rooferId: string): GoogleReview[] {
  return googleReviews[rooferId] || [];
}

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

export function getAllReviews(): GoogleReview[] {
  return Object.values(googleReviews).flat();
}
`;
  }

  // Generate reviews code
  const lines: string[] = [];
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
      if (review.googleReviewUrl) lines.push(`      googleReviewUrl: '${review.googleReviewUrl}',`);
      if (review.reviewerPhotoUrl) lines.push(`      reviewerPhotoUrl: '${review.reviewerPhotoUrl}',`);
      if (review.responseText) lines.push(`      responseText: ${JSON.stringify(review.responseText)},`);
      if (review.responseDate) lines.push(`      responseDate: '${review.responseDate}',`);
      lines.push(`      importedAt: '${review.importedAt}',`);
      lines.push('    },');
    }
    lines.push('  ],');
  }

  lines.push('};');
  const reviewsCode = lines.join('\n');
  const newContent = header + reviewsCode + '\n' + footer;
  writeFileSync(REVIEWS_FILE_PATH, newContent, 'utf-8');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { csv } = body;

    if (!csv) {
      return NextResponse.json({ error: 'CSV data required' }, { status: 400 });
    }

    // Parse CSV
    const newReviews = parseCSV(csv);

    // Get existing reviews
    const reviewsModule = await import('@/app/roofers/data/reviews');
    const allReviews = reviewsModule.getAllReviews();

    // Merge with existing
    const reviewsByRoofer: Record<string, GoogleReview[]> = {};
    
    // Add existing reviews
    for (const review of allReviews) {
      if (!reviewsByRoofer[review.rooferId]) {
        reviewsByRoofer[review.rooferId] = [];
      }
      reviewsByRoofer[review.rooferId].push(review);
    }

    // Add new reviews
    for (const review of newReviews) {
      if (!reviewsByRoofer[review.rooferId]) {
        reviewsByRoofer[review.rooferId] = [];
      }
      reviewsByRoofer[review.rooferId].push(review);
    }

    // Write to file
    writeReviews(reviewsByRoofer);

    return NextResponse.json({
      success: true,
      imported: newReviews.length,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to import CSV', message: error.message },
      { status: 500 }
    );
  }
}

















