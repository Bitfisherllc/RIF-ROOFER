#!/usr/bin/env python3
"""
Generate report from scraped Yelp review analysis
Includes star rating, synopsis, and positive/negative sections
"""

import json
from pathlib import Path
from typing import Dict, List
from datetime import datetime

def generate_report(input_file: str, output_file: str = None):
    """Generate a markdown report from Yelp scraping results"""
    
    data_file = Path(input_file)
    if not data_file.exists():
        print(f"Error: {input_file} not found")
        return
    
    with open(data_file, 'r') as f:
        results = json.load(f)
    
    if output_file is None:
        output_file = data_file.parent / "yelp-analysis-report.md"
    else:
        output_file = Path(output_file)
    
    # Statistics
    total_roofers = len(results)
    found_on_yelp = sum(1 for r in results if r.get('yelp_found', False))
    with_ratings = sum(1 for r in results if r.get('star_rating') is not None)
    with_reviews = sum(1 for r in results if r.get('review_analysis', {}).get('total_analyzed', 0) > 0)
    
    # Calculate average rating
    ratings = [r.get('star_rating') for r in results if r.get('star_rating') is not None]
    avg_rating = sum(ratings) / len(ratings) if ratings else 0
    
    # Generate report
    report = []
    report.append("# Yelp Review Analysis Report")
    report.append(f"\n*Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}*\n")
    
    # Summary Statistics
    report.append("## Summary Statistics\n")
    report.append(f"- **Total Roofers Analyzed:** {total_roofers}")
    report.append(f"- **Found on Yelp:** {found_on_yelp} ({found_on_yelp/total_roofers*100:.1f}%)")
    report.append(f"- **With Star Ratings:** {with_ratings}")
    report.append(f"- **With Review Analysis:** {with_reviews}")
    if ratings:
        report.append(f"- **Average Rating:** {avg_rating:.2f} stars\n")
    
    # Rating Distribution
    if ratings:
        report.append("## Rating Distribution\n")
        rating_dist = {}
        for rating in ratings:
            rating_rounded = round(rating)
            rating_dist[rating_rounded] = rating_dist.get(rating_rounded, 0) + 1
        
        for star in sorted(rating_dist.keys(), reverse=True):
            count = rating_dist[star]
            bar = "█" * (count // max(1, max(rating_dist.values()) // 20))
            report.append(f"- **{star} stars:** {count} roofers {bar}")
        report.append("")
    
    # Detailed Results
    report.append("## Detailed Results\n")
    
    # Sort by rating (highest first), then by review count
    sorted_results = sorted(
        [r for r in results if r.get('yelp_found', False)],
        key=lambda x: (
            x.get('star_rating') or 0,
            x.get('review_count', 0)
        ),
        reverse=True
    )
    
    for i, roofer in enumerate(sorted_results, 1):
        name = roofer.get('name', 'Unknown')
        city = roofer.get('city', '')
        state = roofer.get('state', 'FL')
        rating = roofer.get('star_rating')
        review_count = roofer.get('review_count', 0)
        yelp_url = roofer.get('yelp_url', '')
        synopsis = roofer.get('synopsis') or roofer.get('review_analysis', {}).get('synopsis', '')
        review_analysis = roofer.get('review_analysis', {})
        
        report.append(f"### {i}. {name}")
        if city:
            report.append(f"**Location:** {city}, {state}")
        if roofer.get('phone'):
            report.append(f"**Phone:** {roofer.get('phone')}")
        if yelp_url:
            report.append(f"**Yelp:** [View Profile]({yelp_url})")
        
        if rating:
            stars = "⭐" * int(rating) + ("½" if rating % 1 >= 0.5 else "")
            report.append(f"\n**Overall Rating:** {rating:.1f} stars {stars}")
            report.append(f"**Total Reviews:** {review_count}")
        
        # Synopsis Section
        if synopsis:
            report.append(f"\n#### 📝 Synopsis")
            report.append(f"{synopsis}\n")
        
        # Positive Reviews Section
        positive_reviews = review_analysis.get('positive', [])
        if positive_reviews:
            report.append(f"\n#### ✅ Positive Reviews ({len(positive_reviews)})\n")
            for j, review in enumerate(positive_reviews[:5], 1):  # Top 5 positive
                review_text = review.get('text', '')
                review_rating = review.get('rating')
                if review_text:
                    rating_display = f" ({review_rating}⭐)" if review_rating else ""
                    # Truncate long reviews
                    if len(review_text) > 300:
                        review_text = review_text[:300] + "..."
                    report.append(f"{j}. {review_text}{rating_display}\n")
        
        # Negative Reviews Section
        negative_reviews = review_analysis.get('negative', [])
        if negative_reviews:
            report.append(f"\n#### ❌ Negative Reviews ({len(negative_reviews)})\n")
            for j, review in enumerate(negative_reviews[:5], 1):  # Top 5 negative
                review_text = review.get('text', '')
                review_rating = review.get('rating')
                if review_text:
                    rating_display = f" ({review_rating}⭐)" if review_rating else ""
                    # Truncate long reviews
                    if len(review_text) > 300:
                        review_text = review_text[:300] + "..."
                    report.append(f"{j}. {review_text}{rating_display}\n")
        
        if not positive_reviews and not negative_reviews and rating:
            report.append("\n*No detailed reviews extracted, but rating available.*\n")
        
        report.append("\n---\n")
    
    # Roofers Not Found on Yelp
    not_found = [r for r in results if not r.get('yelp_found', False)]
    if not_found:
        report.append("## Roofers Not Found on Yelp\n")
        report.append(f"*{len(not_found)} roofers could not be located on Yelp:*\n")
        for roofer in not_found[:50]:  # Limit to first 50
            name = roofer.get('name', 'Unknown')
            city = roofer.get('city', '')
            if city:
                report.append(f"- {name} ({city})")
            else:
                report.append(f"- {name}")
        if len(not_found) > 50:
            report.append(f"\n*... and {len(not_found) - 50} more*")
    
    # Write report
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write('\n'.join(report))
    
    print(f"✓ Report generated: {output_file}")
    print(f"  - {len(sorted_results)} roofers with Yelp profiles")
    print(f"  - {len(not_found)} roofers not found")


def generate_summary_csv(input_file: str, output_file: str = None):
    """Generate a CSV summary of the results"""
    import csv
    
    data_file = Path(input_file)
    if not data_file.exists():
        print(f"Error: {input_file} not found")
        return
    
    with open(data_file, 'r') as f:
        results = json.load(f)
    
    if output_file is None:
        output_file = data_file.parent / "yelp-summary.csv"
    else:
        output_file = Path(output_file)
    
    with open(output_file, 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow([
            'Name', 'City', 'State', 'Phone', 'Website',
            'Yelp Found', 'Yelp URL', 'Star Rating', 'Review Count',
            'Synopsis', 'Positive Reviews', 'Negative Reviews', 'Total Reviews Analyzed'
        ])
        
        for roofer in results:
            review_analysis = roofer.get('review_analysis', {})
            synopsis = roofer.get('synopsis') or review_analysis.get('synopsis', '')
            # Truncate synopsis for CSV
            synopsis_short = synopsis[:200] + '...' if len(synopsis) > 200 else synopsis
            writer.writerow([
                roofer.get('name', ''),
                roofer.get('city', ''),
                roofer.get('state', 'FL'),
                roofer.get('phone', ''),
                roofer.get('website', ''),
                'Yes' if roofer.get('yelp_found') else 'No',
                roofer.get('yelp_url', ''),
                roofer.get('star_rating', ''),
                roofer.get('review_count', 0),
                synopsis_short,
                len(review_analysis.get('positive', [])),
                len(review_analysis.get('negative', [])),
                review_analysis.get('total_analyzed', 0)
            ])
    
    print(f"✓ CSV summary generated: {output_file}")


if __name__ == '__main__':
    import argparse
    
    parser = argparse.ArgumentParser(description='Generate Yelp scraping analysis report')
    parser.add_argument('input', nargs='?', default='yelp-reviews-analysis.json',
                       help='Input JSON file (default: yelp-reviews-analysis.json)')
    parser.add_argument('--output', help='Output markdown file')
    parser.add_argument('--csv', action='store_true', help='Also generate CSV summary')
    
    args = parser.parse_args()
    
    generate_report(args.input, args.output)
    
    if args.csv:
        generate_summary_csv(args.input)

















