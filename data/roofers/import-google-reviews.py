#!/usr/bin/env python3
"""
Import Google Business Reviews from CSV into reviews.ts

Usage:
    python3 import-google-reviews.py reviews.csv

CSV Format:
    rooferId,reviewerName,rating,reviewText,reviewDate,googleReviewUrl,responseText,responseDate
"""

import csv
import sys
import json
import re
from datetime import datetime
from pathlib import Path

# Path to reviews.ts file
REVIEWS_FILE = Path(__file__).parent.parent.parent / 'app' / 'roofers' / 'data' / 'reviews.ts'

def sanitize_text(text):
    """Sanitize text for TypeScript string"""
    if not text:
        return ''
    # Escape quotes and newlines
    text = text.replace('\\', '\\\\')
    text = text.replace('"', '\\"')
    text = text.replace('\n', '\\n')
    text = text.replace('\r', '\\r')
    return text

def generate_review_id(reviewer_name, review_date, roofer_id):
    """Generate a unique review ID"""
    # Create ID from reviewer name, date, and roofer ID
    date_str = review_date.replace('-', '')[:8]  # YYYYMMDD
    name_slug = re.sub(r'[^a-z0-9]', '', reviewer_name.lower())[:10]
    return f"google-{roofer_id}-{date_str}-{name_slug}"

def parse_date(date_str):
    """Parse various date formats to ISO format"""
    formats = [
        '%Y-%m-%d',
        '%m/%d/%Y',
        '%d/%m/%Y',
        '%Y-%m-%dT%H:%M:%S',
        '%Y-%m-%d %H:%M:%S',
    ]
    
    for fmt in formats:
        try:
            dt = datetime.strptime(date_str.strip(), fmt)
            return dt.isoformat() + 'Z'
        except ValueError:
            continue
    
    # If no format works, return as-is
    return date_str

def read_existing_reviews():
    """Read existing reviews from reviews.ts"""
    if not REVIEWS_FILE.exists():
        return {}
    
    content = REVIEWS_FILE.read_text()
    
    # Extract the googleReviews object
    # This is a simple parser - may need refinement
    reviews = {}
    
    # Look for the googleReviews object
    match = re.search(r'export const googleReviews[^=]*=\s*\{([^}]*)\}', content, re.DOTALL)
    if match:
        # Parse individual reviews (simplified)
        # For now, we'll just append new reviews
        pass
    
    return reviews

def import_reviews_from_csv(csv_path):
    """Import reviews from CSV file"""
    reviews = []
    
    with open(csv_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        
        for row in reader:
            # Validate required fields
            if not row.get('rooferId') or not row.get('rating'):
                print(f"Skipping row: missing required fields")
                continue
            
            try:
                rating = int(row['rating'])
                if rating < 1 or rating > 5:
                    print(f"Skipping row: invalid rating {rating}")
                    continue
            except ValueError:
                print(f"Skipping row: invalid rating {row['rating']}")
                continue
            
            review_id = row.get('reviewId') or generate_review_id(
                row.get('reviewerName', 'Anonymous'),
                row.get('reviewDate', ''),
                row.get('rooferId', '')
            )
            
            review = {
                'id': review_id,
                'rooferId': row['rooferId'],
                'reviewerName': row.get('reviewerName', 'Anonymous'),
                'rating': rating,
                'reviewText': sanitize_text(row.get('reviewText', '')),
                'reviewDate': parse_date(row.get('reviewDate', datetime.now().isoformat())),
                'googleReviewUrl': row.get('googleReviewUrl', ''),
                'reviewerPhotoUrl': row.get('reviewerPhotoUrl', ''),
                'responseText': sanitize_text(row.get('responseText', '')),
                'responseDate': parse_date(row.get('responseDate', '')) if row.get('responseDate') else '',
                'importedAt': datetime.now().isoformat() + 'Z',
            }
            
            reviews.append(review)
    
    return reviews

def generate_typescript_reviews(reviews_dict):
    """Generate TypeScript code for reviews"""
    lines = []
    lines.append('// Roofer reviews grouped by rooferId')
    lines.append('export const googleReviews: Record<string, GoogleReview[]> = {')
    
    for roofer_id, reviews in sorted(reviews_dict.items()):
        lines.append(f"  '{roofer_id}': [")
        
        for review in reviews:
            lines.append('    {')
            lines.append(f"      id: '{review['id']}',")
            lines.append(f"      rooferId: '{review['rooferId']}',")
            lines.append(f"      reviewerName: '{sanitize_text(review['reviewerName'])}',")
            lines.append(f"      rating: {review['rating']},")
            lines.append(f"      reviewText: \"{review['reviewText']}\",")
            lines.append(f"      reviewDate: '{review['reviewDate']}',")
            
            if review.get('googleReviewUrl'):
                lines.append(f"      googleReviewUrl: '{review['googleReviewUrl']}',")
            
            if review.get('reviewerPhotoUrl'):
                lines.append(f"      reviewerPhotoUrl: '{review['reviewerPhotoUrl']}',")
            
            if review.get('responseText'):
                lines.append(f"      responseText: \"{sanitize_text(review['responseText'])}\",")
            
            if review.get('responseDate'):
                lines.append(f"      responseDate: '{review['responseDate']}',")
            
            lines.append(f"      importedAt: '{review['importedAt']}',")
            lines.append('    },')
        
        lines.append('  ],')
    
    lines.append('};')
    
    return '\n'.join(lines)

def main():
    if len(sys.argv) < 2:
        print("Usage: python3 import-google-reviews.py reviews.csv")
        sys.exit(1)
    
    csv_path = Path(sys.argv[1])
    if not csv_path.exists():
        print(f"Error: CSV file not found: {csv_path}")
        sys.exit(1)
    
    print(f"Importing reviews from {csv_path}...")
    
    # Import reviews from CSV
    new_reviews = import_reviews_from_csv(csv_path)
    print(f"Found {len(new_reviews)} reviews to import")
    
    # Group by rooferId
    reviews_dict = {}
    for review in new_reviews:
        roofer_id = review['rooferId']
        if roofer_id not in reviews_dict:
            reviews_dict[roofer_id] = []
        reviews_dict[roofer_id].append(review)
    
    # Read existing reviews.ts to preserve structure
    existing_content = REVIEWS_FILE.read_text() if REVIEWS_FILE.exists() else ''
    
    # Find where to insert reviews
    # For now, we'll create a backup and generate new file
    backup_path = REVIEWS_FILE.with_suffix('.ts.backup')
    if REVIEWS_FILE.exists():
        REVIEWS_FILE.rename(backup_path)
        print(f"Backed up existing file to {backup_path}")
    
    # Generate new reviews.ts content
    # Read the interface definitions from existing file or create new
    if backup_path.exists():
        existing_content = backup_path.read_text()
        # Extract everything before googleReviews definition
        parts = existing_content.split('export const googleReviews')
        header = parts[0] if len(parts) > 0 else ''
    else:
        header = '''// Google Business Reviews data structure
// Reviews can be imported from Google Business pages

export interface GoogleReview {
  id: string; // Unique ID for the review
  rooferId: string; // Links to roofer.id
  reviewerName: string;
  rating: number; // 1-5 stars
  reviewText: string;
  reviewDate: string; // ISO date string
  googleReviewUrl?: string; // Link to the review on Google
  reviewerPhotoUrl?: string; // Profile photo from Google
  responseText?: string; // Business owner's response
  responseDate?: string; // ISO date string
  importedAt: string; // When this review was imported
  lastUpdated?: string; // Last time review was synced
}

// Aggregated rating data for a roofer
export interface RooferRatingSummary {
  rooferId: string;
  averageRating: number; // 0-5
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

'''
    
    # Generate reviews code
    reviews_code = generate_typescript_reviews(reviews_dict)
    
    # Read helper functions from backup or create new
    if backup_path.exists():
        existing_content = backup_path.read_text()
        # Extract helper functions
        helper_match = re.search(r'// Helper.*', existing_content, re.DOTALL)
        helpers = helper_match.group(0) if helper_match else ''
    else:
        helpers = '''
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
    averageRating: Math.round((totalRating / reviews.length) * 10) / 10, // Round to 1 decimal
    totalReviews: reviews.length,
    ratingDistribution: distribution,
    lastUpdated: reviews[reviews.length - 1]?.importedAt || new Date().toISOString(),
  };
}

// Helper to get all reviews (for admin)
export function getAllReviews(): GoogleReview[] {
  return Object.values(googleReviews).flat();
}
'''
    
    # Write new file
    full_content = header + '\n' + reviews_code + '\n' + helpers
    REVIEWS_FILE.write_text(full_content)
    
    print(f"✅ Successfully imported {len(new_reviews)} reviews")
    print(f"   Reviews written to {REVIEWS_FILE}")
    print(f"\nReview summary:")
    for roofer_id, reviews in reviews_dict.items():
        print(f"   {roofer_id}: {len(reviews)} reviews")

if __name__ == '__main__':
    main()

















