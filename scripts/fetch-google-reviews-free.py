#!/usr/bin/env python3
"""
Free Google Reviews Fetcher
Uses Outscraper API (free tier: 500 reviews/month)

Setup:
1. Sign up at https://outscraper.com (free account)
2. Get your API key from dashboard
3. Set OUTSCRAPER_API_KEY in .env.local
4. Run: python3 scripts/fetch-google-reviews-free.py
"""

import os
import json
import sys
import requests
from pathlib import Path
from datetime import datetime

# Paths
ROOFERS_FILE = Path(__file__).parent.parent / 'app' / 'roofers' / 'data' / 'roofers.ts'
REVIEWS_FILE = Path(__file__).parent.parent / 'app' / 'roofers' / 'data' / 'reviews.ts'

def get_api_key():
    """Get API key from environment"""
    api_key = os.getenv('OUTSCRAPER_API_KEY')
    if not api_key:
        print("❌ OUTSCRAPER_API_KEY not found in environment")
        print("   Sign up at https://outscraper.com and get your free API key")
        print("   Add to .env.local: OUTSCRAPER_API_KEY=your-key-here")
        sys.exit(1)
    return api_key

def extract_roofers():
    """Extract roofer data from roofers.ts"""
    content = ROOFERS_FILE.read_text()
    roofers = []
    
    # Extract roofer entries
    import re
    pattern = r"'([^']+)':\s*\{([^}]+(?:\{[^}]*\}[^}]*)*)\}"
    matches = re.finditer(pattern, content, re.DOTALL)
    
    for match in matches:
        slug = match.group(1)
        roofer_data = match.group(2)
        
        # Extract fields
        id_match = re.search(r'"id":\s*"([^"]+)"', roofer_data)
        name_match = re.search(r'"name":\s*"([^"]+)"', roofer_data)
        google_url_match = re.search(r'"googleBusinessUrl":\s*"([^"]+)"', roofer_data)
        
        if id_match and name_match:
            roofers.append({
                'id': id_match.group(1),
                'slug': slug,
                'name': name_match.group(1),
                'googleBusinessUrl': google_url_match.group(1) if google_url_match else None,
            })
    
    return roofers

def extract_place_id_from_url(url):
    """Extract Place ID from Google Maps URL"""
    if not url:
        return None
    
    import re
    # Try different URL formats
    patterns = [
        r'place_id=([^&]+)',
        r'/place/([^/]+)',
        r'cid=(\d+)',
        r'data-cid="([^"]+)"',
    ]
    
    for pattern in patterns:
        match = re.search(pattern, url)
        if match:
            return match.group(1)
    
    return None

def fetch_reviews_from_outscraper(place_id, api_key):
    """Fetch reviews using Outscraper API"""
    url = "https://api.outscraper.com/maps/reviews-v3"
    
    params = {
        'query': place_id,
        'limit': 100,  # Max reviews per request
        'language': 'en',
        'region': 'us',
    }
    
    headers = {
        'X-API-KEY': api_key,
    }
    
    try:
        response = requests.get(url, params=params, headers=headers, timeout=30)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"  ⚠️  Error fetching reviews: {e}")
        return None

def convert_outscraper_review(review_data, roofer_id):
    """Convert Outscraper review format to our format"""
    return {
        'id': f"outscraper-{roofer_id}-{review_data.get('review_id', '')}-{review_data.get('review_datetime_utc', '')}",
        'rooferId': roofer_id,
        'reviewerName': review_data.get('reviewer_name', 'Anonymous'),
        'rating': int(review_data.get('rating', 5)),
        'reviewText': review_data.get('review_text', ''),
        'reviewDate': review_data.get('review_datetime_utc', datetime.now().isoformat()),
        'googleReviewUrl': review_data.get('review_url', ''),
        'reviewerPhotoUrl': review_data.get('reviewer_photo', ''),
        'responseText': review_data.get('owner_answer', ''),
        'responseDate': review_data.get('owner_answer_datetime_utc', ''),
        'importedAt': datetime.now().isoformat() + 'Z',
    }

def main():
    print("🔍 Free Google Reviews Fetcher")
    print("=" * 50)
    
    # Get API key
    api_key = get_api_key()
    print(f"✅ API key found\n")
    
    # Get roofers
    roofers = extract_roofers()
    print(f"📋 Found {len(roofers)} roofers\n")
    
    # Filter roofers with Google Business URLs
    roofers_with_urls = [r for r in roofers if r['googleBusinessUrl']]
    print(f"🌐 {len(roofers_with_urls)} roofers have Google Business URLs\n")
    
    if not roofers_with_urls:
        print("⚠️  No roofers have googleBusinessUrl set")
        print("   Add Google Business URLs to roofers in app/roofers/data/roofers.ts")
        return
    
    # Fetch reviews
    all_reviews = {}
    success_count = 0
    
    for i, roofer in enumerate(roofers_with_urls[:10], 1):  # Limit to 10 for free tier
        print(f"[{i}/{min(10, len(roofers_with_urls))}] {roofer['name']}")
        
        place_id = extract_place_id_from_url(roofer['googleBusinessUrl'])
        if not place_id:
            print(f"  ⚠️  Could not extract Place ID from URL")
            continue
        
        result = fetch_reviews_from_outscraper(place_id, api_key)
        if not result:
            continue
        
        # Parse results
        reviews = []
        if 'data' in result and len(result['data']) > 0:
            for place_data in result['data']:
                if 'reviews' in place_data:
                    for review in place_data['reviews']:
                        reviews.append(convert_outscraper_review(review, roofer['id']))
        
        if reviews:
            all_reviews[roofer['id']] = reviews
            success_count += 1
            print(f"  ✅ Found {len(reviews)} reviews")
        else:
            print(f"  ⚠️  No reviews found")
    
    # Write to reviews.ts
    if all_reviews:
        print(f"\n💾 Writing {sum(len(r) for r in all_reviews.values())} reviews to reviews.ts...")
        # This would need to merge with existing reviews
        print("   (Manual merge required - see GET-GOOGLE-REVIEWS-GUIDE.md)")
    
    print(f"\n✅ Complete! Fetched reviews for {success_count} roofers")
    print(f"\n💡 Tip: Outscraper free tier allows 500 reviews/month")
    print(f"   For more roofers, upgrade or use manual import")

if __name__ == '__main__':
    main()
















