#!/usr/bin/env python3
"""
Find each roofer on Yelp and analyze their reviews
Extracts star ratings and categorizes reviews into positive/negative sections
"""

import json
import time
import re
from pathlib import Path
from urllib.parse import quote_plus
import requests
from bs4 import BeautifulSoup
from typing import Dict, List, Optional
import os

# Configuration
DELAY_BETWEEN_REQUESTS = 2  # seconds to wait between requests to avoid rate limiting
MAX_RETRIES = 3
OUTPUT_FILE = Path(__file__).parent / "yelp-reviews-analysis.json"
PROGRESS_FILE = Path(__file__).parent / "yelp-progress.json"

class YelpReviewAnalyzer:
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
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
    
    def construct_yelp_search_url(self, name: str, city: str = None, state: str = "FL") -> str:
        """Construct Yelp search URL"""
        query = f"{name} roofing"
        if city:
            location = f"{city}, {state}"
        else:
            location = state
        encoded_query = quote_plus(query)
        encoded_location = quote_plus(location)
        return f"https://www.yelp.com/search?find_desc={encoded_query}&find_loc={encoded_location}"
    
    def search_yelp_business(self, name: str, city: str = None, state: str = "FL", phone: str = None) -> Optional[str]:
        """Search for business on Yelp and return business URL"""
        search_url = self.construct_yelp_search_url(name, city, state)
        
        try:
            response = self.session.get(search_url, timeout=10)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Look for business links in search results
            business_links = soup.find_all('a', href=re.compile(r'/biz/'))
            
            if business_links:
                # Get the first result (most relevant)
                biz_path = business_links[0].get('href')
                if biz_path:
                    if biz_path.startswith('/'):
                        return f"https://www.yelp.com{biz_path}"
                    return biz_path
            
            return None
            
        except Exception as e:
            print(f"  Error searching Yelp: {e}")
            return None
    
    def extract_business_info(self, business_url: str) -> Optional[Dict]:
        """Extract business information from Yelp business page"""
        try:
            response = self.session.get(business_url, timeout=10)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Extract star rating
            rating = None
            rating_elem = soup.find('div', {'aria-label': re.compile(r'(\d+\.?\d*)\s+star')})
            if rating_elem:
                rating_match = re.search(r'(\d+\.?\d*)', rating_elem.get('aria-label', ''))
                if rating_match:
                    rating = float(rating_match.group(1))
            
            # Alternative: look for rating in JSON-LD or other formats
            if not rating:
                json_scripts = soup.find_all('script', type='application/ld+json')
                for script in json_scripts:
                    try:
                        data = json.loads(script.string)
                        if isinstance(data, dict) and 'aggregateRating' in data:
                            rating = float(data['aggregateRating'].get('ratingValue', 0))
                            break
                    except:
                        continue
            
            # Extract review count
            review_count = 0
            review_count_elem = soup.find(text=re.compile(r'(\d+)\s+review'))
            if review_count_elem:
                review_match = re.search(r'(\d+)', review_count_elem)
                if review_match:
                    review_count = int(review_match.group(1))
            
            # Extract reviews
            reviews = []
            
            # Method 1: Look for review elements
            review_elements = soup.find_all('div', class_=re.compile(r'review|comment', re.I))
            
            for review_elem in review_elements[:20]:  # Get up to 20 reviews
                review_text = review_elem.get_text(strip=True)
                if len(review_text) > 20:  # Filter out very short text
                    # Try to extract rating from review
                    review_rating = None
                    rating_in_review = review_elem.find('div', {'aria-label': re.compile(r'(\d+)\s+star')})
                    if rating_in_review:
                        rating_match = re.search(r'(\d+)', rating_in_review.get('aria-label', ''))
                        if rating_match:
                            review_rating = int(rating_match.group(1))
                    
                    reviews.append({
                        'text': review_text[:500],  # Limit review length
                        'rating': review_rating
                    })
            
            # Method 2: Look in JSON-LD for reviews
            if not reviews:
                for script in json_scripts:
                    try:
                        data = json.loads(script.string)
                        if isinstance(data, dict) and 'review' in data:
                            for rev in data['review']:
                                if isinstance(rev, dict):
                                    review_text = rev.get('reviewBody', '')
                                    review_rating = rev.get('reviewRating', {}).get('ratingValue')
                                    if review_text:
                                        reviews.append({
                                            'text': review_text[:500],
                                            'rating': int(review_rating) if review_rating else None
                                        })
                    except:
                        continue
            
            return {
                'rating': rating,
                'review_count': review_count,
                'reviews': reviews[:20],  # Limit to 20 reviews
                'url': business_url
            }
            
        except Exception as e:
            print(f"  Error extracting business info: {e}")
            return None
    
    def analyze_reviews(self, reviews: List[Dict]) -> Dict:
        """Analyze reviews and categorize into positive and negative"""
        positive_reviews = []
        negative_reviews = []
        
        # Keywords for positive/negative sentiment
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
            rating = review.get('rating')
            
            # Determine sentiment
            positive_score = sum(1 for keyword in positive_keywords if keyword in text)
            negative_score = sum(1 for keyword in negative_keywords if keyword in text)
            
            # Use rating if available, otherwise use keyword analysis
            if rating:
                is_positive = rating >= 4
            else:
                is_positive = positive_score > negative_score
            
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
            'star_rating': None,
            'review_count': 0,
            'review_analysis': {
                'positive': [],
                'negative': [],
                'total_analyzed': 0
            }
        }
        
        # Search for business on Yelp
        business_url = self.search_yelp_business(name, city, state, phone)
        
        if business_url:
            print(f"  Found Yelp page: {business_url}")
            result['yelp_found'] = True
            result['yelp_url'] = business_url
            
            # Extract business info and reviews
            business_info = self.extract_business_info(business_url)
            
            if business_info:
                result['star_rating'] = business_info.get('rating')
                result['review_count'] = business_info.get('review_count', 0)
                
                # Analyze reviews
                reviews = business_info.get('reviews', [])
                if reviews:
                    review_analysis = self.analyze_reviews(reviews)
                    result['review_analysis'] = review_analysis
                    
                    print(f"  Rating: {result['star_rating']} stars")
                    print(f"  Reviews: {result['review_count']} total, {len(review_analysis['positive'])} positive, {len(review_analysis['negative'])} negative")
                else:
                    print(f"  Rating: {result['star_rating']} stars, but no reviews extracted")
            else:
                print(f"  Could not extract business information")
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
        
        print(f"Processing {total} roofers...")
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
    
    parser = argparse.ArgumentParser(description='Find roofers on Yelp and analyze reviews')
    parser.add_argument('--limit', type=int, help='Limit number of roofers to process')
    parser.add_argument('--reset', action='store_true', help='Reset progress and start from beginning')
    
    args = parser.parse_args()
    
    if args.reset and PROGRESS_FILE.exists():
        PROGRESS_FILE.unlink()
        print("Progress reset. Starting from beginning.")
    
    analyzer = YelpReviewAnalyzer()
    analyzer.run(limit=args.limit)


if __name__ == '__main__':
    main()
















