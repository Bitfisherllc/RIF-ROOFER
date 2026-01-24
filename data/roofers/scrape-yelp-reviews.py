#!/usr/bin/env python3
"""
Scrape Yelp reviews, analyze them, and generate star ratings, synopsis, and positive/negative sections
Works without API - uses web scraping
"""

import json
import time
import re
from pathlib import Path
from typing import Dict, List, Optional
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse

OUTPUT_FILE = Path(__file__).parent / "yelp-reviews-analysis.json"
INPUT_FILE = Path(__file__).parent / "roofers-data.json"
PROGRESS_FILE = Path(__file__).parent / "yelp-scrape-progress.json"

class YelpScraper:
    def __init__(self):
        self.session = requests.Session()
        # Use realistic browser headers
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'none',
            'Cache-Control': 'max-age=0',
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
    
    def get_yelp_url_manual(self, roofer_name: str, city: str = None) -> Optional[str]:
        """Prompt user to enter Yelp URL manually"""
        location = f" ({city}, FL)" if city else ""
        print(f"\n{'='*70}")
        print(f"Roofer: {roofer_name}{location}")
        print(f"{'='*70}")
        print("Please find this roofer on Yelp:")
        print(f"  Search: https://www.yelp.com/search?find_desc={roofer_name.replace(' ', '+')}+roofing&find_loc={city.replace(' ', '+') if city else 'Florida'}")
        print("\nThen copy and paste the Yelp business URL here.")
        print("Example: https://www.yelp.com/biz/company-name-city")
        print("(Press Enter to skip this roofer)")
        
        url = input("\nYelp URL: ").strip()
        
        if not url:
            return None
        
        # Validate and normalize URL
        if 'yelp.com/biz/' not in url:
            print("⚠️  Warning: URL doesn't look like a Yelp business URL")
            confirm = input("Continue anyway? (y/n): ").strip().lower()
            if confirm != 'y':
                return None
        
        # Ensure it's a full URL
        if not url.startswith('http'):
            url = 'https://' + url
        
        return url
    
    def scrape_business_page(self, yelp_url: str) -> Optional[Dict]:
        """Scrape business information and reviews from Yelp page"""
        try:
            print(f"  📥 Fetching: {yelp_url}")
            response = self.session.get(yelp_url, timeout=15)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Extract star rating
            rating = None
            
            # Method 1: Look for rating in aria-label
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
            
            # Method 2: Look in JSON-LD structured data
            if not rating:
                json_scripts = soup.find_all('script', type='application/ld+json')
                for script in json_scripts:
                    try:
                        data = json.loads(script.string)
                        if isinstance(data, dict):
                            if 'aggregateRating' in data:
                                rating = float(data['aggregateRating'].get('ratingValue', 0))
                                break
                        elif isinstance(data, list):
                            for item in data:
                                if isinstance(item, dict) and 'aggregateRating' in item:
                                    rating = float(item['aggregateRating'].get('ratingValue', 0))
                                    break
                    except:
                        continue
            
            # Method 3: Look for rating in text (e.g., "4.5 out of 5")
            if not rating:
                rating_text = soup.get_text()
                rating_match = re.search(r'(\d+\.?\d*)\s*(?:out of|/)\s*5', rating_text, re.I)
                if rating_match:
                    try:
                        rating = float(rating_match.group(1))
                    except:
                        pass
            
            # Extract review count
            review_count = 0
            review_count_patterns = [
                r'(\d+)\s+review',
                r'(\d+)\s+reviews',
                r'reviewCount["\']?\s*:\s*(\d+)',
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
            
            # Extract reviews
            reviews = []
            
            # Look for review containers - Yelp uses various class names
            review_selectors = [
                {'class': re.compile(r'review', re.I)},
                {'data-review-id': True},
                {'itemprop': 'review'},
            ]
            
            for selector in review_selectors:
                review_elements = soup.find_all('div', selector)
                for review_elem in review_elements[:30]:  # Limit to 30 potential reviews
                    # Extract review text
                    text_elem = review_elem.find('p', class_=re.compile(r'comment|text|review', re.I))
                    if not text_elem:
                        text_elem = review_elem.find('span', class_=re.compile(r'comment|text|review', re.I))
                    if not text_elem:
                        # Try to get text from the element itself
                        text_elem = review_elem
                    
                    review_text = text_elem.get_text(strip=True) if text_elem else ''
                    
                    # Filter for actual review text
                    if (len(review_text) > 30 and 
                        len(review_text) < 2000 and
                        'review' not in review_text.lower()[:15] and
                        'rating' not in review_text.lower()[:15]):
                        
                        # Extract rating from review
                        review_rating = None
                        
                        # Look for rating in aria-label nearby
                        rating_elem = review_elem.find(['div', 'span'], {'aria-label': re.compile(r'(\d+)\s+star', re.I)})
                        if rating_elem:
                            rating_match = re.search(r'(\d+)', rating_elem.get('aria-label', ''))
                            if rating_match:
                                review_rating = int(rating_match.group(1))
                        
                        # Avoid duplicates
                        if not any(r['text'] == review_text for r in reviews):
                            reviews.append({
                                'text': review_text[:1000],  # Limit length
                                'rating': review_rating
                            })
                
                if reviews:
                    break
            
            # Limit to 20 reviews
            reviews = reviews[:20]
            
            return {
                'rating': rating,
                'review_count': review_count,
                'reviews': reviews,
                'url': yelp_url
            }
            
        except requests.exceptions.RequestException as e:
            print(f"  ❌ Error fetching page: {e}")
            return None
        except Exception as e:
            print(f"  ❌ Error parsing page: {e}")
            return None
    
    def analyze_reviews(self, reviews: List[Dict]) -> Dict:
        """Analyze reviews and categorize into positive/negative, generate synopsis"""
        positive_reviews = []
        negative_reviews = []
        
        # Enhanced keyword lists
        positive_keywords = [
            'excellent', 'great', 'amazing', 'wonderful', 'fantastic', 'outstanding',
            'professional', 'quality', 'satisfied', 'happy', 'recommend', 'perfect',
            'timely', 'clean', 'efficient', 'responsive', 'fair', 'honest', 'reliable',
            'exceeded', 'pleased', 'impressed', 'awesome', 'terrific', 'superb',
            'expert', 'skilled', 'knowledgeable', 'courteous', 'polite', 'helpful',
            'thorough', 'complete', 'well done', 'top notch', 'best', 'love'
        ]
        
        negative_keywords = [
            'poor', 'terrible', 'awful', 'horrible', 'disappointed', 'unprofessional',
            'delayed', 'messy', 'unresponsive', 'overpriced', 'shoddy', 'incomplete',
            'rude', 'unreliable', 'problem', 'issue', 'complaint', 'unsatisfied',
            'worst', 'bad', 'avoid', 'waste', 'ripoff', 'scam', 'incompetent',
            'slow', 'late', 'damage', 'broken', 'failed', 'mistake', 'error',
            'unhappy', 'frustrated', 'angry', 'disgusted'
        ]
        
        all_positive_scores = []
        all_negative_scores = []
        
        for review in reviews:
            text = review.get('text', '').lower()
            rating = review.get('rating')
            
            # Count keyword matches
            positive_score = sum(1 for keyword in positive_keywords if keyword in text)
            negative_score = sum(1 for keyword in negative_keywords if keyword in text)
            
            all_positive_scores.append(positive_score)
            all_negative_scores.append(negative_score)
            
            # Determine sentiment
            if rating is not None:
                is_positive = rating >= 4
            else:
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
        
        # Generate synopsis
        synopsis = self.generate_synopsis(reviews, positive_reviews, negative_reviews, all_positive_scores, all_negative_scores)
        
        return {
            'positive': positive_reviews,
            'negative': negative_reviews,
            'total_analyzed': len(reviews),
            'synopsis': synopsis
        }
    
    def generate_synopsis(self, reviews: List[Dict], positive: List[Dict], 
                         negative: List[Dict], pos_scores: List[int], 
                         neg_scores: List[int]) -> str:
        """Generate a synopsis of the reviews"""
        if not reviews:
            return "No reviews available for analysis."
        
        total_reviews = len(reviews)
        positive_count = len(positive)
        negative_count = len(negative)
        positive_pct = (positive_count / total_reviews * 100) if total_reviews > 0 else 0
        
        # Calculate average sentiment
        avg_sentiment = (sum(pos_scores) - sum(neg_scores)) / total_reviews if total_reviews > 0 else 0
        
        # Common themes
        themes = []
        all_text = ' '.join([r.get('text', '').lower() for r in reviews])
        
        if any(word in all_text for word in ['professional', 'expert', 'skilled']):
            themes.append('professionalism')
        if any(word in all_text for word in ['timely', 'on time', 'schedule']):
            themes.append('punctuality')
        if any(word in all_text for word in ['clean', 'cleanup', 'mess']):
            themes.append('cleanliness')
        if any(word in all_text for word in ['price', 'cost', 'affordable', 'expensive']):
            themes.append('pricing')
        if any(word in all_text for word in ['communication', 'responsive', 'contact']):
            themes.append('communication')
        if any(word in all_text for word in ['quality', 'workmanship', 'craftsmanship']):
            themes.append('work quality')
        
        # Build synopsis
        synopsis_parts = []
        
        if positive_pct >= 80:
            synopsis_parts.append(f"Highly rated with {positive_pct:.0f}% positive reviews.")
        elif positive_pct >= 60:
            synopsis_parts.append(f"Generally positive with {positive_pct:.0f}% positive reviews.")
        elif positive_pct >= 40:
            synopsis_parts.append(f"Mixed reviews with {positive_pct:.0f}% positive feedback.")
        else:
            synopsis_parts.append(f"More negative feedback with only {positive_pct:.0f}% positive reviews.")
        
        if themes:
            synopsis_parts.append(f"Common themes include: {', '.join(themes[:3])}.")
        
        if avg_sentiment > 2:
            synopsis_parts.append("Overall sentiment is very positive.")
        elif avg_sentiment > 0:
            synopsis_parts.append("Overall sentiment is positive.")
        elif avg_sentiment > -2:
            synopsis_parts.append("Overall sentiment is mixed.")
        else:
            synopsis_parts.append("Overall sentiment is negative.")
        
        if positive_count > negative_count * 2:
            synopsis_parts.append("Customers frequently recommend this business.")
        elif negative_count > positive_count:
            synopsis_parts.append("Some customers have expressed concerns.")
        
        return ' '.join(synopsis_parts) if synopsis_parts else "Review analysis available."
    
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
            'synopsis': None,
            'review_analysis': {
                'positive': [],
                'negative': [],
                'total_analyzed': 0,
                'synopsis': None
            }
        }
        
        # Get Yelp URL from user
        yelp_url = self.get_yelp_url_manual(name, city)
        
        if yelp_url:
            result['yelp_found'] = True
            result['yelp_url'] = yelp_url
            
            # Scrape business info
            business_info = self.scrape_business_page(yelp_url)
            
            if business_info:
                result['star_rating'] = business_info.get('rating')
                result['review_count'] = business_info.get('review_count', 0)
                
                # Analyze reviews
                reviews = business_info.get('reviews', [])
                if reviews:
                    review_analysis = self.analyze_reviews(reviews)
                    result['review_analysis'] = review_analysis
                    result['synopsis'] = review_analysis.get('synopsis')
                    
                    print(f"\n  ✅ Rating: {result['star_rating']} stars")
                    print(f"  ✅ Reviews: {result['review_count']} total")
                    print(f"  ✅ Analysis: {len(review_analysis['positive'])} positive, {len(review_analysis['negative'])} negative")
                    print(f"  ✅ Synopsis: {result['synopsis'][:100]}...")
                else:
                    print(f"  ⚠️  Rating: {result['star_rating']} stars, but no reviews extracted")
            else:
                print(f"  ❌ Could not scrape business information")
        else:
            print(f"  ⏭️  Skipped")
        
        # Small delay
        time.sleep(1)
        
        return result
    
    def run(self, limit: Optional[int] = None, start_from: int = 0):
        """Run the scraping analysis"""
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
        print(f"YELP REVIEW SCRAPING & ANALYSIS")
        print(f"{'='*70}")
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
                self.save_progress(i)
                
        except KeyboardInterrupt:
            print("\n\n⚠️  Interrupted by user. Progress saved.")
        
        print(f"\n{'='*70}")
        print(f"Analysis complete!")
        print(f"Results saved to: {OUTPUT_FILE}")
        print(f"Total processed: {len([r for r in self.results if r.get('yelp_found')])} found on Yelp")
        print(f"{'='*70}\n")
    
    def save_results(self):
        """Save results to JSON file"""
        with open(OUTPUT_FILE, 'w') as f:
            json.dump(self.results, f, indent=2)


def main():
    import argparse
    
    parser = argparse.ArgumentParser(description='Scrape Yelp reviews and analyze them')
    parser.add_argument('--limit', type=int, help='Limit number of roofers to process')
    parser.add_argument('--start-from', type=int, default=0, help='Start from this index')
    
    args = parser.parse_args()
    
    scraper = YelpScraper()
    scraper.run(limit=args.limit, start_from=args.start_from)


if __name__ == '__main__':
    main()

















