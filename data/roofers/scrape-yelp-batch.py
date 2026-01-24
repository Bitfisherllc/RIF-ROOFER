#!/usr/bin/env python3
"""
Batch Yelp scraping with prepared URLs
You can prepare a CSV file with roofer names and Yelp URLs, then process them all at once
"""

import json
import csv
import time
from pathlib import Path
from typing import Dict, List, Optional
import requests
from bs4 import BeautifulSoup
import re

OUTPUT_FILE = Path(__file__).parent / "yelp-reviews-analysis.json"
INPUT_FILE = Path(__file__).parent / "roofers-data.json"
URLS_FILE = Path(__file__).parent / "yelp-urls.csv"  # Optional: CSV with roofer names and URLs

class YelpBatchScraper:
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
        })
        self.results = []
        self.load_existing_results()
        self.url_mapping = self.load_url_mapping()
        
    def load_existing_results(self):
        """Load existing results"""
        if OUTPUT_FILE.exists():
            try:
                with open(OUTPUT_FILE, 'r') as f:
                    self.results = json.load(f)
            except:
                self.results = []
    
    def load_url_mapping(self) -> Dict[str, str]:
        """Load Yelp URLs from CSV file if it exists"""
        mapping = {}
        if URLS_FILE.exists():
            try:
                with open(URLS_FILE, 'r', encoding='utf-8') as f:
                    reader = csv.DictReader(f)
                    for row in reader:
                        name = row.get('name', '').upper().strip()
                        url = row.get('yelp_url', '').strip()
                        if name and url:
                            mapping[name] = url
                print(f"Loaded {len(mapping)} Yelp URLs from {URLS_FILE}")
            except Exception as e:
                print(f"Warning: Could not load URLs from CSV: {e}")
        return mapping
    
    def scrape_business_page(self, yelp_url: str) -> Optional[Dict]:
        """Scrape business information from Yelp page"""
        try:
            print(f"  📥 Fetching: {yelp_url}")
            response = self.session.get(yelp_url, timeout=15)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Extract star rating
            rating = None
            rating_elements = soup.find_all(['div', 'span'], {'aria-label': re.compile(r'(\d+\.?\d*)\s+star', re.I)})
            for elem in rating_elements:
                rating_match = re.search(r'(\d+\.?\d*)', elem.get('aria-label', ''))
                if rating_match:
                    try:
                        rating = float(rating_match.group(1))
                        if 0 <= rating <= 5:
                            break
                    except:
                        continue
            
            # Try JSON-LD
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
            review_count_patterns = [
                r'(\d+)\s+review',
                r'(\d+)\s+reviews',
            ]
            page_text = soup.get_text()
            for pattern in review_count_patterns:
                match = re.search(pattern, page_text, re.I)
                if match:
                    try:
                        review_count = int(match.group(1))
                        break
                    except:
                        continue
            
            # Extract reviews (simplified - just get text)
            reviews = []
            review_elements = soup.find_all('div', class_=re.compile(r'review|comment', re.I))
            for review_elem in review_elements[:20]:
                text = review_elem.get_text(strip=True)
                if len(text) > 30 and len(text) < 2000:
                    review_rating = None
                    rating_elem = review_elem.find(['div', 'span'], {'aria-label': re.compile(r'(\d+)\s+star', re.I)})
                    if rating_elem:
                        rating_match = re.search(r'(\d+)', rating_elem.get('aria-label', ''))
                        if rating_match:
                            review_rating = int(rating_match.group(1))
                    
                    if not any(r['text'] == text for r in reviews):
                        reviews.append({
                            'text': text[:1000],
                            'rating': review_rating
                        })
            
            return {
                'rating': rating,
                'review_count': review_count,
                'reviews': reviews[:20],
                'url': yelp_url
            }
            
        except Exception as e:
            print(f"  ❌ Error: {e}")
            return None
    
    def analyze_reviews(self, reviews: List[Dict]) -> Dict:
        """Analyze reviews and categorize"""
        from scrape_yelp_reviews import YelpScraper
        scraper = YelpScraper()
        return scraper.analyze_reviews(reviews)
    
    def process_roofer(self, roofer: Dict, yelp_url: Optional[str] = None) -> Dict:
        """Process a single roofer"""
        name = roofer.get('Name', '')
        city = roofer.get('City', '')
        state = roofer.get('State', 'FL')
        phone = roofer.get('Phone Number', '')
        
        # Check if already processed
        existing = next((r for r in self.results if r.get('name') == name), None)
        if existing and existing.get('yelp_found'):
            print(f"  ⏭️  {name} - Already processed, skipping...")
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
            'synopsis': None,
            'review_analysis': {
                'positive': [],
                'negative': [],
                'total_analyzed': 0,
                'synopsis': None
            }
        }
        
        # Get Yelp URL
        if not yelp_url:
            name_upper = name.upper().strip()
            yelp_url = self.url_mapping.get(name_upper)
        
        if yelp_url:
            result['yelp_found'] = True
            result['yelp_url'] = yelp_url
            
            business_info = self.scrape_business_page(yelp_url)
            
            if business_info:
                result['star_rating'] = business_info.get('rating')
                result['review_count'] = business_info.get('review_count', 0)
                
                reviews = business_info.get('reviews', [])
                if reviews:
                    review_analysis = self.analyze_reviews(reviews)
                    result['review_analysis'] = review_analysis
                    result['synopsis'] = review_analysis.get('synopsis')
                    
                    print(f"  ✅ Rating: {result['star_rating']} stars")
                    print(f"  ✅ Reviews: {result['review_count']} total")
                    print(f"  ✅ Analysis: {len(review_analysis['positive'])} positive, {len(review_analysis['negative'])} negative")
        else:
            print(f"  ⏭️  No Yelp URL provided - skipping")
        
        time.sleep(1)  # Rate limiting
        return result
    
    def run(self, limit: Optional[int] = None, start_from: int = 0):
        """Run batch processing"""
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
        
        print(f"\n{'='*70}")
        print(f"YELP BATCH SCRAPING")
        print(f"{'='*70}")
        print(f"Total roofers: {len(roofers)}")
        print(f"URLs loaded from CSV: {len(self.url_mapping)}")
        print(f"Starting from index: {start_from}")
        print()
        
        for i, roofer in enumerate(roofers, start=start_from):
            name = roofer.get('Name', '')
            city = roofer.get('City', '')
            print(f"\n[{i + 1}/{total}] Processing: {name}")
            if city:
                print(f"  Location: {city}, FL")
            
            result = self.process_roofer(roofer)
            
            # Update or add result
            existing_index = next((idx for idx, r in enumerate(self.results) if r.get('name') == result['name']), None)
            if existing_index is not None:
                self.results[existing_index] = result
            else:
                self.results.append(result)
            
            # Save after each roofer
            self.save_results()
            
            if (i + 1) % 10 == 0:
                print(f"\n✓ Saved progress after {i + 1} roofers")
        
        print(f"\n{'='*70}")
        print(f"Batch complete!")
        print(f"Results saved to: {OUTPUT_FILE}")
        print(f"Total processed: {len([r for r in self.results if r.get('yelp_found')])} found on Yelp")
        print(f"{'='*70}\n")
    
    def save_results(self):
        """Save results"""
        with open(OUTPUT_FILE, 'w') as f:
            json.dump(self.results, f, indent=2)

def create_urls_template():
    """Create a template CSV file for Yelp URLs"""
    template_file = Path(__file__).parent / "yelp-urls-template.csv"
    
    with open(template_file, 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow(['name', 'yelp_url'])
        writer.writerow(['1 ROOF LLC', 'https://www.yelp.com/biz/1-roof-llc-ponte-vedra'])
        writer.writerow(['3MG ROOFING LLC', 'https://www.yelp.com/biz/3mg-roofing-winter-park'])
    
    print(f"Created template: {template_file}")
    print("Fill in Yelp URLs for each roofer, then save as yelp-urls.csv")

def main():
    import argparse
    
    parser = argparse.ArgumentParser(description='Batch scrape Yelp reviews')
    parser.add_argument('--limit', type=int, help='Limit number of roofers')
    parser.add_argument('--start-from', type=int, default=0, help='Start from index')
    parser.add_argument('--create-template', action='store_true', help='Create CSV template')
    
    args = parser.parse_args()
    
    if args.create_template:
        create_urls_template()
        return
    
    scraper = YelpBatchScraper()
    scraper.run(limit=args.limit, start_from=args.start_from)

if __name__ == '__main__':
    main()

















