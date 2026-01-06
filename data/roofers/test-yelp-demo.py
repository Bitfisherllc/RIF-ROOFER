#!/usr/bin/env python3
"""
Demo script to test Yelp review analysis with a few roofers
Shows the output format and structure
"""

import json
from pathlib import Path
import requests
from bs4 import BeautifulSoup
import re
import time

def test_yelp_extraction(yelp_url):
    """Test extracting data from a Yelp URL"""
    session = requests.Session()
    session.headers.update({
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
    })
    
    try:
        print(f"  Fetching: {yelp_url}")
        response = session.get(yelp_url, timeout=15)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Try to extract rating
        rating = None
        rating_elem = soup.find('div', {'aria-label': re.compile(r'(\d+\.?\d*)\s+star', re.I)})
        if rating_elem:
            rating_match = re.search(r'(\d+\.?\d*)', rating_elem.get('aria-label', ''))
            if rating_match:
                rating = float(rating_match.group(1))
        
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
        review_text = soup.get_text()
        review_match = re.search(r'(\d+)\s+review', review_text, re.I)
        if review_match:
            review_count = int(review_match.group(1))
        
        return {
            'rating': rating,
            'review_count': review_count,
            'success': True
        }
    except Exception as e:
        return {
            'success': False,
            'error': str(e)
        }

def analyze_reviews_sentiment(reviews):
    """Categorize reviews into positive/negative"""
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
    
    positive = []
    negative = []
    
    for review in reviews:
        text = review.get('text', '').lower()
        rating = review.get('rating')
        
        positive_score = sum(1 for k in positive_keywords if k in text)
        negative_score = sum(1 for k in negative_keywords if k in text)
        
        is_positive = rating >= 4 if rating else (positive_score > negative_score)
        
        review_data = {
            'text': review.get('text', ''),
            'rating': rating,
            'sentiment_score': positive_score - negative_score
        }
        
        if is_positive:
            positive.append(review_data)
        else:
            negative.append(review_data)
    
    return {'positive': positive, 'negative': negative, 'total': len(reviews)}

# Test with sample roofers
print("=" * 70)
print("YELP REVIEW ANALYSIS - TEST DEMONSTRATION")
print("=" * 70)

# Load roofers data
data_file = Path(__file__).parent / "roofers-data.json"
with open(data_file, 'r') as f:
    roofers = json.load(f)

# Test with first 3 roofers
test_roofers = roofers[:3]

results = []

for i, roofer in enumerate(test_roofers, 1):
    name = roofer.get('Name', '')
    city = roofer.get('City', '')
    state = roofer.get('State', 'FL')
    phone = roofer.get('Phone Number', '')
    
    print(f"\n[{i}/{len(test_roofers)}] Testing: {name}")
    print(f"  Location: {city}, {state}")
    print(f"  Phone: {phone}")
    
    # Construct Yelp search URL for manual lookup
    search_query = f"{name} roofing {city} {state}".replace(' ', '+')
    yelp_search_url = f"https://www.yelp.com/search?find_desc={search_query}&find_loc={city}+{state}"
    
    print(f"  Yelp Search: {yelp_search_url}")
    print(f"  ⚠️  Note: To get actual data, you need to:")
    print(f"     1. Visit the search URL above")
    print(f"     2. Find the business")
    print(f"     3. Copy the business URL")
    print(f"     4. Use find-yelp-manual.py to enter it")
    
    # Create example result structure
    result = {
        'name': name,
        'city': city,
        'state': state,
        'phone': phone,
        'website': roofer.get('website', ''),
        'yelp_found': False,  # Would be True if we had the URL
        'yelp_url': None,
        'star_rating': None,
        'review_count': 0,
        'review_analysis': {
            'positive': [],
            'negative': [],
            'total_analyzed': 0
        }
    }
    
    results.append(result)
    time.sleep(1)

# Show example with sample data
print("\n" + "=" * 70)
print("EXAMPLE OUTPUT STRUCTURE (with sample data)")
print("=" * 70)

example_result = {
    'name': 'EXAMPLE ROOFING COMPANY',
    'city': 'Tampa',
    'state': 'FL',
    'phone': '813-555-1234',
    'website': 'example-roofing.com',
    'yelp_found': True,
    'yelp_url': 'https://www.yelp.com/biz/example-roofing-tampa',
    'star_rating': 4.5,
    'review_count': 47,
    'review_analysis': {
        'positive': [
            {
                'text': 'Excellent service! They were professional, on time, and did a great job on our roof replacement. Highly recommend!',
                'rating': 5,
                'sentiment_score': 4
            },
            {
                'text': 'Great quality work and fair pricing. The team was responsive and cleaned up after themselves. Very satisfied.',
                'rating': 5,
                'sentiment_score': 3
            },
            {
                'text': 'Outstanding roofing company. They exceeded our expectations and the roof looks fantastic.',
                'rating': 4,
                'sentiment_score': 3
            }
        ],
        'negative': [
            {
                'text': 'Had some delays in the project timeline. Communication could have been better.',
                'rating': 3,
                'sentiment_score': -1
            },
            {
                'text': 'The work was okay but took longer than expected. Price was a bit high.',
                'rating': 2,
                'sentiment_score': -2
            }
        ],
        'total_analyzed': 20
    }
}

print("\n📊 Sample Result Structure:")
print(json.dumps(example_result, indent=2))

# Save test results
output_file = Path(__file__).parent / "yelp-test-results.json"
with open(output_file, 'w') as f:
    json.dump(results, f, indent=2)

print(f"\n✓ Test results saved to: {output_file}")
print("\n" + "=" * 70)
print("NEXT STEPS:")
print("=" * 70)
print("1. Get Yelp API key from https://www.yelp.com/developers (free)")
print("2. Run: export YELP_API_KEY='your-key'")
print("3. Run: python3 find-yelp-reviews-api.py --limit 10")
print("\nOR use manual method:")
print("1. Run: python3 find-yelp-manual.py --limit 10")
print("2. Manually find and paste Yelp URLs when prompted")
print("=" * 70)
















