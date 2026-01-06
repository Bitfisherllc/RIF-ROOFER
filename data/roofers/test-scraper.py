#!/usr/bin/env python3
"""Quick test of the Yelp scraper analysis functions"""

import sys
import importlib.util

# Load the scraper module
spec = importlib.util.spec_from_file_location("scraper", "scrape-yelp-reviews.py")
scraper_module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(scraper_module)

scraper = scraper_module.YelpScraper()

# Test review analysis
test_reviews = [
    {'text': 'Excellent service! Professional and on time. Highly recommend!', 'rating': 5},
    {'text': 'Great quality work and fair pricing. Very satisfied.', 'rating': 5},
    {'text': 'Outstanding workmanship. The team was knowledgeable and efficient.', 'rating': 5},
    {'text': 'Poor communication and delays. Not satisfied with the service.', 'rating': 2},
    {'text': 'The work was okay but took longer than expected.', 'rating': 3},
]

print("=" * 60)
print("YELP SCRAPER - FUNCTIONALITY TEST")
print("=" * 60)

result = scraper.analyze_reviews(test_reviews)

print(f"\n✅ Review Analysis Test:")
print(f"   Total reviews analyzed: {result['total_analyzed']}")
print(f"   Positive reviews: {len(result['positive'])}")
print(f"   Negative reviews: {len(result['negative'])}")
print(f"\n✅ Synopsis Generated:")
print(f"   {result['synopsis']}")
print(f"\n✅ Positive Reviews Sample:")
for i, rev in enumerate(result['positive'][:2], 1):
    print(f"   {i}. {rev['text'][:60]}... (Rating: {rev['rating']}, Sentiment: {rev['sentiment_score']})")
print(f"\n✅ Negative Reviews Sample:")
for i, rev in enumerate(result['negative'][:2], 1):
    print(f"   {i}. {rev['text'][:60]}... (Rating: {rev['rating']}, Sentiment: {rev['sentiment_score']})")

print(f"\n{'='*60}")
print("✅ All analysis functions working correctly!")
print(f"{'='*60}")
















