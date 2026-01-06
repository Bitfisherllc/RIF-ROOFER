#!/usr/bin/env python3
"""
Import scraped Yelp reviews into the site's TypeScript data file
Maps Yelp data to roofer IDs and generates TypeScript code
"""

import json
from pathlib import Path
from typing import Dict, List, Optional

YELP_DATA_FILE = Path(__file__).parent / "yelp-reviews-analysis.json"
ROOFERS_DATA_FILE = Path(__file__).parent / "roofers-data.json"
OUTPUT_FILE = Path(__file__).parent.parent.parent / "app/roofers/data/yelp-reviews.ts"

def load_roofers_data() -> Dict[str, Dict]:
    """Load roofers data to map names to IDs"""
    with open(ROOFERS_DATA_FILE, 'r') as f:
        roofers = json.load(f)
    
    # Create mapping by name (case-insensitive)
    mapping = {}
    for roofer in roofers:
        name = roofer.get('Name', '').upper().strip()
        mapping[name] = roofer
    
    return mapping

def find_roofer_id(roofer_name: str, roofers_map: Dict) -> Optional[str]:
    """Find roofer ID by matching name"""
    name_upper = roofer_name.upper().strip()
    
    # Try exact match
    if name_upper in roofers_map:
        # Try to get ID from the roofer data
        # Since we don't have IDs in the JSON, we'll need to match by slug or name
        return None  # Will need to match by slug/name in TypeScript
    
    # Try partial match
    for key, roofer in roofers_map.items():
        if name_upper in key or key in name_upper:
            return None
    
    return None

def generate_typescript(yelp_data: List[Dict], roofers_map: Dict) -> str:
    """Generate TypeScript code for Yelp reviews"""
    
    lines = []
    lines.append("// Yelp Reviews data structure")
    lines.append("// Reviews imported from Yelp scraping")
    lines.append("")
    lines.append("export interface YelpReview {")
    lines.append("  id: string; // Unique ID for the review")
    lines.append("  rooferId: string; // Links to roofer.id")
    lines.append("  text: string;")
    lines.append("  rating: number; // 1-5 stars")
    lines.append("  sentimentScore: number; // Positive/negative sentiment score")
    lines.append("  isPositive: boolean; // Categorized as positive or negative")
    lines.append("}")
    lines.append("")
    lines.append("export interface YelpReviewData {")
    lines.append("  rooferId: string;")
    lines.append("  yelpUrl?: string;")
    lines.append("  starRating?: number; // Overall Yelp star rating")
    lines.append("  reviewCount?: number; // Total number of reviews on Yelp")
    lines.append("  synopsis?: string; // AI-generated synopsis of reviews")
    lines.append("  positiveReviews: YelpReview[];")
    lines.append("  negativeReviews: YelpReview[];")
    lines.append("  lastUpdated: string;")
    lines.append("}")
    lines.append("")
    lines.append("// Yelp reviews data storage")
    lines.append("// Format: Record<rooferId, YelpReviewData>")
    lines.append("// NOTE: rooferId must match the ID in roofers.ts")
    lines.append("// You may need to manually map roofer names to IDs")
    lines.append("export const yelpReviews: Record<string, YelpReviewData> = {")
    
    # Process each roofer with Yelp data
    review_id_counter = 1
    
    for roofer_data in yelp_data:
        if not roofer_data.get('yelp_found', False):
            continue
        
        name = roofer_data.get('name', '')
        # Try to find matching roofer
        # For now, we'll use a placeholder - user will need to map manually
        roofer_id = f'"{name}"'  # Placeholder - needs manual mapping
        
        lines.append(f"  // {name}")
        lines.append(f"  // TODO: Replace with actual roofer ID from roofers.ts")
        lines.append(f"  // Example: '2': {{  // for roofer with id: '2'")
        lines.append(f"  '{name.lower().replace(' ', '-').replace('&', 'and')}': {{")
        lines.append(f"    rooferId: 'PLACEHOLDER_ID', // Replace with actual roofer ID")
        
        if roofer_data.get('yelp_url'):
            lines.append(f"    yelpUrl: '{roofer_data['yelp_url']}',")
        
        if roofer_data.get('star_rating'):
            lines.append(f"    starRating: {roofer_data['star_rating']},")
        
        if roofer_data.get('review_count'):
            lines.append(f"    reviewCount: {roofer_data['review_count']},")
        
        synopsis = roofer_data.get('synopsis') or roofer_data.get('review_analysis', {}).get('synopsis')
        if synopsis:
            # Escape quotes
            synopsis_escaped = synopsis.replace("'", "\\'").replace('"', '\\"')
            lines.append(f"    synopsis: '{synopsis_escaped}',")
        
        # Positive reviews
        lines.append("    positiveReviews: [")
        positive_reviews = roofer_data.get('review_analysis', {}).get('positive', [])
        for i, review in enumerate(positive_reviews[:10], 1):  # Limit to 10
            text = review.get('text', '').replace("'", "\\'").replace('"', '\\"')
            rating = review.get('rating', 0)
            sentiment = review.get('sentiment_score', 0)
            lines.append("      {")
            lines.append(f"        id: 'yelp-pos-{review_id_counter}',")
            lines.append(f"        rooferId: 'PLACEHOLDER_ID',")
            lines.append(f"        text: '{text[:200]}...',")  # Truncate long reviews
            lines.append(f"        rating: {rating},")
            lines.append(f"        sentimentScore: {sentiment},")
            lines.append("        isPositive: true,")
            lines.append("      },")
            review_id_counter += 1
        lines.append("    ],")
        
        # Negative reviews
        lines.append("    negativeReviews: [")
        negative_reviews = roofer_data.get('review_analysis', {}).get('negative', [])
        for i, review in enumerate(negative_reviews[:10], 1):  # Limit to 10
            text = review.get('text', '').replace("'", "\\'").replace('"', '\\"')
            rating = review.get('rating', 0)
            sentiment = review.get('sentiment_score', 0)
            lines.append("      {")
            lines.append(f"        id: 'yelp-neg-{review_id_counter}',")
            lines.append(f"        rooferId: 'PLACEHOLDER_ID',")
            lines.append(f"        text: '{text[:200]}...',")  # Truncate long reviews
            lines.append(f"        rating: {rating},")
            lines.append(f"        sentimentScore: {sentiment},")
            lines.append("        isPositive: false,")
            lines.append("      },")
            review_id_counter += 1
        lines.append("    ],")
        
        from datetime import datetime
        lines.append(f"    lastUpdated: '{datetime.now().isoformat()}',")
        lines.append("  },")
        lines.append("")
    
    lines.append("};")
    lines.append("")
    lines.append("// Helper functions")
    lines.append("export function getYelpReviewsForRoofer(rooferId: string): YelpReviewData | null {")
    lines.append("  return yelpReviews[rooferId] || null;")
    lines.append("}")
    lines.append("")
    lines.append("export function hasYelpReviews(rooferId: string): boolean {")
    lines.append("  const data = yelpReviews[rooferId];")
    lines.append("  if (!data) return false;")
    lines.append("  return (data.positiveReviews.length + data.negativeReviews.length) > 0;")
    lines.append("}")
    
    return '\n'.join(lines)

def main():
    """Main function"""
    if not YELP_DATA_FILE.exists():
        print(f"Error: {YELP_DATA_FILE} not found")
        print("Please run scrape-yelp-reviews.py first to generate Yelp data")
        return
    
    print("Loading Yelp data...")
    with open(YELP_DATA_FILE, 'r') as f:
        yelp_data = json.load(f)
    
    print(f"Found {len(yelp_data)} roofers in Yelp data")
    
    roofers_map = load_roofers_data()
    print(f"Loaded {len(roofers_map)} roofers for mapping")
    
    # Filter to only roofers with Yelp data
    yelp_roofers = [r for r in yelp_data if r.get('yelp_found', False)]
    print(f"Found {len(yelp_roofers)} roofers with Yelp reviews")
    
    print("Generating TypeScript...")
    ts_code = generate_typescript(yelp_roofers, roofers_map)
    
    # Write to file
    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_FILE, 'w') as f:
        f.write(ts_code)
    
    print(f"\n✅ Generated TypeScript file: {OUTPUT_FILE}")
    print("\n⚠️  IMPORTANT: You need to manually:")
    print("  1. Map roofer names to roofer IDs from roofers.ts")
    print("  2. Replace 'PLACEHOLDER_ID' with actual roofer IDs")
    print("  3. Replace the key (roofer name) with the roofer ID")
    print("\nExample:")
    print("  '1-roof-llc': {")
    print("    rooferId: '2',  // Replace 'PLACEHOLDER_ID' with '2'")
    print("    ...")
    print("  },")
    print("\nThen change the key to match:")
    print("  '2': {  // Use roofer ID as key")
    print("    rooferId: '2',")
    print("    ...")
    print("  },")

if __name__ == '__main__':
    main()
















