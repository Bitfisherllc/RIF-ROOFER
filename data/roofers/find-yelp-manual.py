#!/usr/bin/env python3
"""
Manual Yelp URL entry tool - allows you to manually find and enter Yelp URLs
Then analyzes reviews automatically
"""

import json
import time
import re
from pathlib import Path
from typing import Dict, List, Optional
import requests
from bs4 import BeautifulSoup

OUTPUT_FILE = Path(__file__).parent / "yelp-reviews-analysis.json"
INPUT_FILE = Path(__file__).parent / "roofers-data.json"

class YelpManualAnalyzer:
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate',
            'Connection': 'keep-alive',
        })
        self.results = []
        self.load_existing_results()
    
    def load_existing_results(self):
        """Load existing results if any"""
        if OUTPUT_FILE.exists():
            try:
                with open(OUTPUT_FILE, 'r') as f:
                    self.results = json.load(f)
            except:
                self.results = []
    
    def get_yelp_url_from_user(self, roofer_name: str, city: str = None) -> Optional[str]:
        """Prompt user to enter Yelp URL"""
        location = f" ({city}, FL)" if city else ""
        print(f"\n{'='*60}")
        print(f"Roofer: {roofer_name}{location}")
        print(f"{'='*60}")
        print("Please find this roofer on Yelp and enter the URL.")
        print("Or press Enter to skip this roofer.")
        print("\nExample URL: https://www.yelp.com/biz/company-name-city")
        
        url = input("\nYelp URL (or Enter to skip): ").strip()
        
        if not url:
            return None
        
        # Validate URL
        if 'yelp.com/biz/' not in url:
            print("⚠️  Warning: URL doesn't look like a Yelp business URL")
            confirm = input("Continue anyway? (y/n): ").strip().lower()
            if confirm != 'y':
                return None
        
        return url
    
    def extract_business_info(self, business_url: str) -> Optional[Dict]:
        """Extract business information from Yelp business page"""
        try:
            print(f"  Fetching: {business_url}")
            response = self.session.get(business_url, timeout=15)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Extract star rating from various possible locations
            rating = None
            
            # Method 1: Look for aria-label with rating
            rating_elem = soup.find('div', {'aria-label': re.compile(r'(\d+\.?\d*)\s+star', re.I)})
            if rating_elem:
                rating_match = re.search(r'(\d+\.?\d*)', rating_elem.get('aria-label', ''))
                if rating_match:
                    rating = float(rating_match.group(1))
            
            # Method 2: Look in JSON-LD structured data
            if not rating:
                json_scripts = soup.find_all('script', type='application/ld+json')
                for script in json_scripts:
                    try:
                        data = json.loads(script.string)
                        if isinstance(data, dict):
                            # Check for aggregateRating
                            if 'aggregateRating' in data:
                                rating = float(data['aggregateRating'].get('ratingValue', 0))
                                break
                            # Check if it's a list
                            elif isinstance(data, list):
                                for item in data:
                                    if isinstance(item, dict) and 'aggregateRating' in item:
                                        rating = float(item['aggregateRating'].get('ratingValue', 0))
                                        break
                    except:
                        continue
            
            # Method 3: Look for rating in class names or data attributes
            if not rating:
                rating_divs = soup.find_all('div', class_=re.compile(r'rating|star', re.I))
                for div in rating_divs:
                    text = div.get_text()
                    rating_match = re.search(r'(\d+\.?\d*)', text)
                    if rating_match:
                        try:
                            rating = float(rating_match.group(1))
                            if 0 <= rating <= 5:
                                break
                        except:
                            continue
            
            # Extract review count
            review_count = 0
            review_text = soup.get_text()
            review_match = re.search(r'(\d+)\s+review', review_text, re.I)
            if review_match:
                review_count = int(review_match.group(1))
            
            # Extract reviews - look for review text
            reviews = []
            
            # Try to find review containers
            review_containers = soup.find_all(['div', 'span', 'p'], 
                                             class_=re.compile(r'review|comment|text', re.I))
            
            for container in review_containers[:30]:  # Check up to 30 containers
                text = container.get_text(strip=True)
                # Filter for actual review text (not too short, not navigation)
                if (len(text) > 50 and 
                    len(text) < 2000 and
                    'review' not in text.lower()[:20] and  # Skip "X reviews" text
                    'rating' not in text.lower()[:20]):
                    
                    # Try to extract rating from nearby elements
                    review_rating = None
                    parent = container.parent
                    if parent:
                        rating_elem = parent.find('div', {'aria-label': re.compile(r'(\d+)\s+star', re.I)})
                        if rating_elem:
                            rating_match = re.search(r'(\d+)', rating_elem.get('aria-label', ''))
                            if rating_match:
                                review_rating = int(rating_match.group(1))
                    
                    # Avoid duplicates
                    if not any(r['text'] == text for r in reviews):
                        reviews.append({
                            'text': text[:500],  # Limit length
                            'rating': review_rating
                        })
            
            # Limit to 20 reviews
            reviews = reviews[:20]
            
            return {
                'rating': rating,
                'review_count': review_count,
                'reviews': reviews,
                'url': business_url
            }
            
        except requests.exceptions.RequestException as e:
            print(f"  ❌ Error fetching page: {e}")
            return None
        except Exception as e:
            print(f"  ❌ Error parsing page: {e}")
            return None
    
    def analyze_reviews(self, reviews: List[Dict]) -> Dict:
        """Analyze reviews and categorize into positive and negative"""
        positive_reviews = []
        negative_reviews = []
        
        # Keywords for sentiment analysis
        positive_keywords = [
            'excellent', 'great', 'amazing', 'wonderful', 'fantastic', 'outstanding',
            'professional', 'quality', 'satisfied', 'happy', 'recommend', 'perfect',
            'timely', 'clean', 'efficient', 'responsive', 'fair', 'honest', 'reliable',
            'exceeded', 'pleased', 'impressed', 'awesome', 'terrific', 'superb'
        ]
        
        negative_keywords = [
            'poor', 'terrible', 'awful', 'horrible', 'disappointed', 'unprofessional',
            'delayed', 'messy', 'unresponsive', 'overpriced', 'shoddy', 'incomplete',
            'rude', 'unreliable', 'problem', 'issue', 'complaint', 'unsatisfied',
            'worst', 'bad', 'avoid', 'waste', 'ripoff', 'scam', 'incompetent'
        ]
        
        for review in reviews:
            text = review.get('text', '').lower()
            rating = review.get('rating')
            
            # Count keyword matches
            positive_score = sum(1 for keyword in positive_keywords if keyword in text)
            negative_score = sum(1 for keyword in negative_keywords if keyword in text)
            
            # Determine sentiment
            if rating is not None:
                # Use rating as primary indicator
                is_positive = rating >= 4
            else:
                # Use keyword analysis
                is_positive = positive_score > negative_score or (positive_score == negative_score and positive_score > 0)
            
            review_data = {
                'text': review.get('text', ''),
                'rating': rating,
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
        
        # Check if already processed
        existing = next((r for r in self.results if r.get('name') == name), None)
        if existing and existing.get('yelp_found'):
            print(f"\n[{index + 1}/{total}] {name} - Already processed, skipping...")
            return existing
        
        result = {
            'name': name,
            'city': city,
            'state': state,
            'phone': phone,
            'website': roofer.get('website', ''),
            'yelp_found': False,
            'yelp_url': None,
            'star_rating': None,
            'review_count': 0,
            'review_analysis': {
                'positive': [],
                'negative': [],
                'total_analyzed': 0
            }
        }
        
        # Get Yelp URL from user
        yelp_url = self.get_yelp_url_from_user(name, city)
        
        if yelp_url:
            result['yelp_found'] = True
            result['yelp_url'] = yelp_url
            
            # Extract business info
            business_info = self.extract_business_info(yelp_url)
            
            if business_info:
                result['star_rating'] = business_info.get('rating')
                result['review_count'] = business_info.get('review_count', 0)
                
                # Analyze reviews
                reviews = business_info.get('reviews', [])
                if reviews:
                    review_analysis = self.analyze_reviews(reviews)
                    result['review_analysis'] = review_analysis
                    
                    print(f"\n  ✅ Rating: {result['star_rating']} stars")
                    print(f"  ✅ Reviews: {result['review_count']} total")
                    print(f"  ✅ Analysis: {len(review_analysis['positive'])} positive, {len(review_analysis['negative'])} negative")
                else:
                    print(f"  ⚠️  Rating: {result['star_rating']} stars, but no reviews extracted")
            else:
                print(f"  ❌ Could not extract business information")
        else:
            print(f"  ⏭️  Skipped")
        
        return result
    
    def run(self, limit: Optional[int] = None, start_from: int = 0):
        """Run the analysis"""
        if not INPUT_FILE.exists():
            print(f"Error: {INPUT_FILE} not found")
            return
        
        with open(INPUT_FILE, 'r') as f:
            roofers = json.load(f)
        
        total = len(roofers)
        if limit:
            total = min(limit, total)
            roofers = roofers[:limit]
        
        roofers = roofers[start_from:]
        
        print(f"\n{'='*60}")
        print(f"YELP REVIEW ANALYSIS - MANUAL ENTRY MODE")
        print(f"{'='*60}")
        print(f"Total roofers to process: {len(roofers)}")
        print(f"Starting from index: {start_from}")
        print(f"\nYou'll be prompted to enter Yelp URLs for each roofer.")
        print(f"Press Ctrl+C at any time to save progress and exit.\n")
        
        try:
            for i, roofer in enumerate(roofers, start=start_from):
                result = self.process_roofer(roofer, i, total)
                
                # Update or add result
                existing_index = next((idx for idx, r in enumerate(self.results) if r.get('name') == result['name']), None)
                if existing_index is not None:
                    self.results[existing_index] = result
                else:
                    self.results.append(result)
                
                # Save after each roofer
                self.save_results()
                
        except KeyboardInterrupt:
            print("\n\n⚠️  Interrupted by user. Progress saved.")
        
        print(f"\n{'='*60}")
        print(f"Analysis complete!")
        print(f"Results saved to: {OUTPUT_FILE}")
        print(f"Total processed: {len([r for r in self.results if r.get('yelp_found')])} found on Yelp")
        print(f"{'='*60}\n")
    
    def save_results(self):
        """Save results to JSON file"""
        with open(OUTPUT_FILE, 'w') as f:
            json.dump(self.results, f, indent=2)


def main():
    import argparse
    
    parser = argparse.ArgumentParser(description='Manually enter Yelp URLs and analyze reviews')
    parser.add_argument('--limit', type=int, help='Limit number of roofers to process')
    parser.add_argument('--start-from', type=int, default=0, help='Start from this index')
    
    args = parser.parse_args()
    
    analyzer = YelpManualAnalyzer()
    analyzer.run(limit=args.limit, start_from=args.start_from)


if __name__ == '__main__':
    main()
















