#!/usr/bin/env python3
"""
Find each roofer on Yelp using Yelp Fusion API
Requires Yelp API credentials (API key)
"""

import json
import time
import os
from pathlib import Path
from typing import Dict, List, Optional
import requests

# Configuration
YELP_API_KEY = os.getenv('YELP_API_KEY')
YELP_API_BASE = 'https://api.yelp.com/v3'
DELAY_BETWEEN_REQUESTS = 0.5  # Yelp API allows more frequent requests
OUTPUT_FILE = Path(__file__).parent / "yelp-reviews-analysis-api.json"
PROGRESS_FILE = Path(__file__).parent / "yelp-progress-api.json"

class YelpAPIAnalyzer:
    def __init__(self, api_key: str = None):
        self.api_key = api_key or YELP_API_KEY
        if not self.api_key:
            raise ValueError("Yelp API key required. Set YELP_API_KEY environment variable or pass as argument.")
        
        self.session = requests.Session()
        self.session.headers.update({
            'Authorization': f'Bearer {self.api_key}'
        })
        self.results = []
        self.progress = self.load_progress()
        
    def load_progress(self) -> Dict:
        """Load progress from previous run"""
        if PROGRESS_FILE.exists():
            try:
                with open(PROGRESS_FILE, 'r') as f:
                    return json.load(f)
            except:
                return {'processed': [], 'last_index': 0}
        return {'processed': [], 'last_index': 0}
    
    def save_progress(self, index: int):
        """Save progress"""
        self.progress['last_index'] = index
        with open(PROGRESS_FILE, 'w') as f:
            json.dump(self.progress, f, indent=2)
    
    def search_business(self, name: str, city: str = None, state: str = "FL") -> Optional[Dict]:
        """Search for business using Yelp API"""
        url = f"{YELP_API_BASE}/businesses/search"
        
        params = {
            'term': f"{name} roofing",
            'location': f"{city}, {state}" if city else state,
            'limit': 5
        }
        
        try:
            response = self.session.get(url, params=params, timeout=10)
            response.raise_for_status()
            data = response.json()
            
            businesses = data.get('businesses', [])
            if businesses:
                # Return the first (most relevant) result
                return businesses[0]
            return None
            
        except requests.exceptions.HTTPError as e:
            if e.response.status_code == 429:
                print("  Rate limit exceeded. Waiting 60 seconds...")
                time.sleep(60)
                return self.search_business(name, city, state)
            print(f"  API Error: {e}")
            return None
        except Exception as e:
            print(f"  Error searching: {e}")
            return None
    
    def get_business_details(self, business_id: str) -> Optional[Dict]:
        """Get detailed business information including reviews"""
        url = f"{YELP_API_BASE}/businesses/{business_id}"
        
        try:
            response = self.session.get(url, timeout=10)
            response.raise_for_status()
            return response.json()
        except Exception as e:
            print(f"  Error getting details: {e}")
            return None
    
    def get_reviews(self, business_id: str) -> List[Dict]:
        """Get reviews for a business"""
        url = f"{YELP_API_BASE}/businesses/{business_id}/reviews"
        
        try:
            response = self.session.get(url, timeout=10)
            response.raise_for_status()
            data = response.json()
            return data.get('reviews', [])
        except Exception as e:
            print(f"  Error getting reviews: {e}")
            return []
    
    def analyze_reviews(self, reviews: List[Dict]) -> Dict:
        """Analyze reviews and categorize into positive and negative"""
        positive_reviews = []
        negative_reviews = []
        
        # Keywords for sentiment analysis
        positive_keywords = [
            'excellent', 'great', 'amazing', 'wonderful', 'fantastic', 'outstanding',
            'professional', 'quality', 'satisfied', 'happy', 'recommend', 'perfect',
            'timely', 'clean', 'efficient', 'responsive', 'fair', 'honest', 'reliable'
        ]
        
        negative_keywords = [
            'poor', 'terrible', 'awful', 'horrible', 'disappointed', 'unprofessional',
            'delayed', 'messy', 'unresponsive', 'overpriced', 'shoddy', 'incomplete',
            'rude', 'unreliable', 'problem', 'issue', 'complaint', 'unsatisfied'
        ]
        
        for review in reviews:
            text = review.get('text', '').lower()
            rating = review.get('rating', 0)
            
            # Determine sentiment
            positive_score = sum(1 for keyword in positive_keywords if keyword in text)
            negative_score = sum(1 for keyword in negative_keywords if keyword in text)
            
            # Use rating if available, otherwise use keyword analysis
            is_positive = rating >= 4 or (positive_score > negative_score and rating >= 3)
            
            review_data = {
                'text': review.get('text', ''),
                'rating': rating,
                'user': review.get('user', {}).get('name', ''),
                'time_created': review.get('time_created', ''),
                'sentiment_score': positive_score - negative_score
            }
            
            if is_positive:
                positive_reviews.append(review_data)
            else:
                negative_reviews.append(review_data)
        
        return {
            'positive': positive_reviews,
            'negative': negative_reviews,
            'total_analyzed': len(reviews)
        }
    
    def process_roofer(self, roofer: Dict, index: int, total: int) -> Dict:
        """Process a single roofer"""
        name = roofer.get('Name', '')
        city = roofer.get('City', '')
        state = roofer.get('State', 'FL')
        phone = roofer.get('Phone Number', '')
        
        print(f"\n[{index + 1}/{total}] Processing: {name}")
        if city:
            print(f"  Location: {city}, {state}")
        
        result = {
            'name': name,
            'city': city,
            'state': state,
            'phone': phone,
            'website': roofer.get('website', ''),
            'yelp_found': False,
            'yelp_url': None,
            'yelp_id': None,
            'star_rating': None,
            'review_count': 0,
            'price_range': None,
            'categories': [],
            'review_analysis': {
                'positive': [],
                'negative': [],
                'total_analyzed': 0
            }
        }
        
        # Search for business
        business = self.search_business(name, city, state)
        
        if business:
            business_id = business.get('id')
            yelp_url = business.get('url', '')
            
            print(f"  Found: {business.get('name', 'Unknown')}")
            result['yelp_found'] = True
            result['yelp_id'] = business_id
            result['yelp_url'] = yelp_url
            result['star_rating'] = business.get('rating')
            result['review_count'] = business.get('review_count', 0)
            result['price_range'] = business.get('price')
            result['categories'] = [cat.get('title') for cat in business.get('categories', [])]
            
            print(f"  Rating: {result['star_rating']} stars ({result['review_count']} reviews)")
            
            # Get detailed reviews
            if business_id:
                reviews = self.get_reviews(business_id)
                if reviews:
                    review_analysis = self.analyze_reviews(reviews)
                    result['review_analysis'] = review_analysis
                    print(f"  Reviews: {len(review_analysis['positive'])} positive, {len(review_analysis['negative'])} negative")
        else:
            print(f"  Not found on Yelp")
        
        # Delay to avoid rate limiting
        time.sleep(DELAY_BETWEEN_REQUESTS)
        
        return result
    
    def run(self, limit: Optional[int] = None):
        """Run the analysis for all roofers"""
        data_file = Path(__file__).parent / "roofers-data.json"
        
        if not data_file.exists():
            print(f"Error: {data_file} not found")
            return
        
        with open(data_file, 'r') as f:
            roofers = json.load(f)
        
        total = len(roofers)
        if limit:
            total = min(limit, total)
            roofers = roofers[:limit]
        
        print(f"Processing {total} roofers using Yelp API...")
        print(f"Starting from index {self.progress['last_index']}")
        
        start_index = self.progress['last_index']
        
        for i, roofer in enumerate(roofers[start_index:], start=start_index):
            # Skip if already processed
            if i in self.progress.get('processed', []):
                continue
            
            try:
                result = self.process_roofer(roofer, i, total)
                self.results.append(result)
                self.progress['processed'].append(i)
                self.save_progress(i)
                
                # Save intermediate results every 10 roofers
                if (i + 1) % 10 == 0:
                    self.save_results()
                    print(f"\n✓ Saved progress after {i + 1} roofers")
                    
            except KeyboardInterrupt:
                print("\n\nInterrupted by user. Saving progress...")
                self.save_results()
                break
            except Exception as e:
                print(f"\n  Error processing roofer: {e}")
                continue
        
        # Final save
        self.save_results()
        print(f"\n\n✓ Analysis complete! Results saved to {OUTPUT_FILE}")
        print(f"  Total processed: {len(self.results)}")
        print(f"  Found on Yelp: {sum(1 for r in self.results if r['yelp_found'])}")
    
    def save_results(self):
        """Save results to JSON file"""
        with open(OUTPUT_FILE, 'w') as f:
            json.dump(self.results, f, indent=2)


def main():
    import argparse
    
    parser = argparse.ArgumentParser(description='Find roofers on Yelp using API and analyze reviews')
    parser.add_argument('--api-key', help='Yelp API key (or set YELP_API_KEY env var)')
    parser.add_argument('--limit', type=int, help='Limit number of roofers to process')
    parser.add_argument('--reset', action='store_true', help='Reset progress and start from beginning')
    
    args = parser.parse_args()
    
    if args.reset and PROGRESS_FILE.exists():
        PROGRESS_FILE.unlink()
        print("Progress reset. Starting from beginning.")
    
    try:
        analyzer = YelpAPIAnalyzer(api_key=args.api_key)
        analyzer.run(limit=args.limit)
    except ValueError as e:
        print(f"Error: {e}")
        print("\nTo get a Yelp API key:")
        print("1. Go to https://www.yelp.com/developers")
        print("2. Create an app")
        print("3. Get your API key")
        print("4. Set it as: export YELP_API_KEY='your-key-here'")


if __name__ == '__main__':
    main()
















