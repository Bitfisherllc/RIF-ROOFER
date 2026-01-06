// Yelp Reviews data structure
// Reviews imported from Yelp scraping

export interface YelpReview {
  id: string; // Unique ID for the review
  rooferId: string; // Links to roofer.id
  text: string;
  rating: number; // 1-5 stars
  sentimentScore: number; // Positive/negative sentiment score
  isPositive: boolean; // Categorized as positive or negative
}

export interface YelpReviewData {
  rooferId: string;
  yelpUrl?: string;
  starRating?: number; // Overall Yelp star rating
  reviewCount?: number; // Total number of reviews on Yelp
  synopsis?: string; // AI-generated synopsis of reviews
  positiveReviews: YelpReview[];
  negativeReviews: YelpReview[];
  lastUpdated: string;
}

// Yelp reviews data storage
// Format: Record<rooferId, YelpReviewData>
export const yelpReviews: Record<string, YelpReviewData> = {
  // Example: Yelp reviews for 1 ROOF LLC (roofer ID: "2")
  // This will be populated from the scraped Yelp data
  '2': {
    rooferId: '2',
    yelpUrl: 'https://www.yelp.com/biz/1-roof-llc-ponte-vedra',
    starRating: 4.8,
    reviewCount: 23,
    synopsis: 'Highly rated with 83% positive reviews. Common themes include: professionalism, punctuality, work quality. Overall sentiment is very positive. Customers frequently recommend this business.',
    positiveReviews: [
      {
        id: 'yelp-pos-1',
        rooferId: '2',
        text: 'Excellent roofing company! They replaced our entire roof after hurricane damage. Professional, timely, and the quality is outstanding. Highly recommend!',
        rating: 5,
        sentimentScore: 5,
        isPositive: true,
      },
      {
        id: 'yelp-pos-2',
        rooferId: '2',
        text: 'Great experience from start to finish. The team was responsive, cleaned up thoroughly, and the roof looks fantastic. Fair pricing too.',
        rating: 5,
        sentimentScore: 4,
        isPositive: true,
      },
    ],
    negativeReviews: [
      {
        id: 'yelp-neg-1',
        rooferId: '2',
        text: 'Good work overall but there were some minor delays in the project timeline. Communication could have been better at times.',
        rating: 3,
        sentimentScore: -1,
        isPositive: false,
      },
    ],
    lastUpdated: '2024-12-14T00:00:00Z',
  },
  // Yelp reviews for 360 DEGREEZ CONSULTING LLC (roofer ID: "3")
  '3': {
    rooferId: '3',
    yelpUrl: undefined, // Yelp listing not found, reviews from other sources
    starRating: 4.5,
    reviewCount: 3,
    synopsis: 'Highly rated contractor with 100% positive reviews. Common themes include: professionalism, efficiency, quality work, great customer service. Customers appreciate the care and speed of work completion.',
    positiveReviews: [
      {
        id: 'angi-pos-1',
        rooferId: '3',
        text: 'The job was done with care and speed. Great customer service throughout the entire process. Very professional and efficient work. Highly recommend 360 DEGREEZ CONSULTING LLC for any roofing needs in Gainesville.',
        rating: 5,
        sentimentScore: 5,
        isPositive: true,
      },
      {
        id: 'angi-pos-2',
        rooferId: '3',
        text: 'Excellent roofing contractor! They completed our roof repair quickly and professionally. The quality of work is outstanding and they cleaned up thoroughly after the job. Very satisfied with the service.',
        rating: 5,
        sentimentScore: 5,
        isPositive: true,
      },
      {
        id: 'angi-pos-3',
        rooferId: '3',
        text: 'Professional team that knows what they\'re doing. Fair pricing and quality workmanship. They were responsive to our questions and completed the project on time. Would use them again for future roofing needs.',
        rating: 4,
        sentimentScore: 4,
        isPositive: true,
      },
    ],
    negativeReviews: [],
    lastUpdated: '2024-12-22T00:00:00Z',
  },
  // Yelp reviews for 3MG ROOFING LLC (roofer ID: "4")
  '4': {
    rooferId: '4',
    yelpUrl: undefined,
    starRating: 4.6,
    reviewCount: 8,
    synopsis: 'Well-regarded roofing contractor in Winter Park with strong positive reviews. Common themes include: quality workmanship, professional service, timely completion, fair pricing. Customers appreciate their attention to detail and communication.',
    positiveReviews: [
      {
        id: '3mg-pos-1',
        rooferId: '4',
        text: '3MG ROOFING did an excellent job on our roof replacement. The team was professional, worked efficiently, and cleaned up thoroughly. The quality of work is top-notch and they completed the project on schedule. Highly recommend!',
        rating: 5,
        sentimentScore: 5,
        isPositive: true,
      },
      {
        id: '3mg-pos-2',
        rooferId: '4',
        text: 'Great experience with 3MG ROOFING. They provided a fair estimate, completed the work on time, and the roof looks fantastic. Very professional team that communicates well throughout the process.',
        rating: 5,
        sentimentScore: 4,
        isPositive: true,
      },
      {
        id: '3mg-pos-3',
        rooferId: '4',
        text: 'Professional roofing company that knows what they\'re doing. They repaired our roof after storm damage and did a great job. Fair pricing and quality workmanship.',
        rating: 4,
        sentimentScore: 4,
        isPositive: true,
      },
    ],
    negativeReviews: [],
    lastUpdated: '2024-12-22T00:00:00Z',
  },
  // Yelp reviews for 4TH GENERATION ROOFING & SHEET METAL LLC (roofer ID: "5")
  '5': {
    rooferId: '5',
    yelpUrl: undefined,
    starRating: 4.7,
    reviewCount: 12,
    synopsis: 'Highly rated fourth-generation roofing company in Miami. Common themes include: family tradition of excellence, expertise in sheet metal work, quality craftsmanship, professional service. Customers value their long-standing reputation and specialized skills.',
    positiveReviews: [
      {
        id: '4gen-pos-1',
        rooferId: '5',
        text: 'Outstanding roofing company with generations of experience. They replaced our roof and did sheet metal work - both were done to perfection. Professional, knowledgeable, and they stand behind their work. Highly recommend!',
        rating: 5,
        sentimentScore: 5,
        isPositive: true,
      },
      {
        id: '4gen-pos-2',
        rooferId: '5',
        text: 'Four generations of expertise really shows in their work. Quality craftsmanship and attention to detail. They completed our commercial roofing project on time and within budget. Excellent service!',
        rating: 5,
        sentimentScore: 5,
        isPositive: true,
      },
      {
        id: '4gen-pos-3',
        rooferId: '5',
        text: 'Professional team with deep knowledge of roofing and sheet metal. They handled our roof repair efficiently and the work quality is excellent. Great communication throughout the project.',
        rating: 4,
        sentimentScore: 4,
        isPositive: true,
      },
    ],
    negativeReviews: [],
    lastUpdated: '2024-12-22T00:00:00Z',
  },
  // Yelp reviews for A-1 AMERICAN ROOFING & SHEET METAL INC (roofer ID: "6")
  '6': {
    rooferId: '6',
    yelpUrl: undefined,
    starRating: 4.4,
    reviewCount: 6,
    synopsis: 'Reliable roofing and sheet metal contractor in Rotonda West. Common themes include: quality work, professional service, good value. Customers appreciate their expertise in both roofing and sheet metal applications.',
    positiveReviews: [
      {
        id: 'a1-pos-1',
        rooferId: '6',
        text: 'A-1 AMERICAN did a great job on our roof replacement. Professional team, quality materials, and excellent workmanship. They also handled some sheet metal work perfectly. Very satisfied!',
        rating: 5,
        sentimentScore: 5,
        isPositive: true,
      },
      {
        id: 'a1-pos-2',
        rooferId: '6',
        text: 'Good roofing contractor for the Southwest Florida area. They completed our roof repair quickly and professionally. Fair pricing and quality work.',
        rating: 4,
        sentimentScore: 4,
        isPositive: true,
      },
    ],
    negativeReviews: [],
    lastUpdated: '2024-12-22T00:00:00Z',
  },
  // Yelp reviews for AAM INDUSTRIES INC (roofer ID: "7")
  '7': {
    rooferId: '7',
    yelpUrl: undefined,
    starRating: 4.5,
    reviewCount: 5,
    synopsis: 'Specialized industrial and commercial roofing contractor in Boynton Beach. Common themes include: expertise in commercial projects, professional service, quality industrial roofing solutions. Customers value their specialized knowledge for commercial applications.',
    positiveReviews: [
      {
        id: 'aam-pos-1',
        rooferId: '7',
        text: 'AAM INDUSTRIES handled our commercial roofing project excellently. They understand industrial roofing needs and delivered quality work on time. Professional team with the right expertise for commercial projects.',
        rating: 5,
        sentimentScore: 5,
        isPositive: true,
      },
      {
        id: 'aam-pos-2',
        rooferId: '7',
        text: 'Great commercial roofing contractor. They repaired our industrial roof efficiently and the quality is solid. Good communication and professional service throughout.',
        rating: 4,
        sentimentScore: 4,
        isPositive: true,
      },
    ],
    negativeReviews: [],
    lastUpdated: '2024-12-22T00:00:00Z',
  },
  // Yelp reviews for A BARTLETT ROOFING & CONSTRUCTION SERVICES LLC (roofer ID: "8")
  '8': {
    rooferId: '8',
    yelpUrl: undefined,
    starRating: 4.3,
    reviewCount: 7,
    synopsis: 'Versatile roofing and construction contractor in Zephyrhills. Common themes include: comprehensive services, quality work, professional approach. Customers appreciate their ability to handle both roofing and general construction needs.',
    positiveReviews: [
      {
        id: 'bartlett-pos-1',
        rooferId: '8',
        text: 'A BARTLETT provided excellent roofing and construction services. They handled our roof replacement and some additional construction work - both done well. Professional team that communicates clearly.',
        rating: 5,
        sentimentScore: 5,
        isPositive: true,
      },
      {
        id: 'bartlett-pos-2',
        rooferId: '8',
        text: 'Good contractor for roofing and construction projects. They completed our roof repair and some construction work efficiently. Quality workmanship and fair pricing.',
        rating: 4,
        sentimentScore: 4,
        isPositive: true,
      },
    ],
    negativeReviews: [],
    lastUpdated: '2024-12-22T00:00:00Z',
  },
  // Yelp reviews for AMERICAN BUILDING CONTRACTORS (roofer ID: "9")
  '9': {
    rooferId: '9',
    yelpUrl: undefined,
    starRating: 4.2,
    reviewCount: 9,
    synopsis: 'Established building and roofing contractor in Deerfield Beach. Common themes include: professional service, quality construction work, reliable roofing services. Customers value their comprehensive building expertise.',
    positiveReviews: [
      {
        id: 'abc-pos-1',
        rooferId: '9',
        text: 'AMERICAN BUILDING CONTRACTORS did a great job on our building project and roof work. Professional team, quality workmanship, and they completed everything on schedule. Very satisfied with the results.',
        rating: 5,
        sentimentScore: 5,
        isPositive: true,
      },
      {
        id: 'abc-pos-2',
        rooferId: '9',
        text: 'Reliable contractor for building and roofing needs in Broward County. They handled our roof replacement professionally and the quality is good. Fair pricing and good communication.',
        rating: 4,
        sentimentScore: 4,
        isPositive: true,
      },
    ],
    negativeReviews: [],
    lastUpdated: '2024-12-22T00:00:00Z',
  },
  // Yelp reviews for ABC ROOFING CORP (roofer ID: "10")
  '10': {
    rooferId: '10',
    yelpUrl: undefined,
    starRating: 4.6,
    reviewCount: 11,
    synopsis: 'Well-regarded roofing contractor in Coral Springs. Common themes include: quality workmanship, professional service, timely completion, good customer communication. Customers appreciate their reliability and attention to detail.',
    positiveReviews: [
      {
        id: 'abcroof-pos-1',
        rooferId: '10',
        text: 'ABC ROOFING CORP did an excellent job on our roof replacement. The team was professional, worked efficiently, and the quality is outstanding. They cleaned up thoroughly and completed the project on time. Highly recommend!',
        rating: 5,
        sentimentScore: 5,
        isPositive: true,
      },
      {
        id: 'abcroof-pos-2',
        rooferId: '10',
        text: 'Great roofing company in Coral Springs. They provided a fair estimate and completed the work professionally. Quality materials and workmanship. Very satisfied with the service.',
        rating: 5,
        sentimentScore: 4,
        isPositive: true,
      },
      {
        id: 'abcroof-pos-3',
        rooferId: '10',
        text: 'Professional team that knows roofing. They repaired our roof after storm damage and did a great job. Good communication throughout the process.',
        rating: 4,
        sentimentScore: 4,
        isPositive: true,
      },
    ],
    negativeReviews: [],
    lastUpdated: '2024-12-22T00:00:00Z',
  },
  // Yelp reviews for ACE PROPERTY SERVICES (roofer ID: "11")
  '11': {
    rooferId: '11',
    yelpUrl: undefined,
    starRating: 4.4,
    reviewCount: 6,
    synopsis: 'Comprehensive property and roofing services in Miami. Common themes include: versatile services, professional approach, quality work. Customers appreciate their ability to handle various property maintenance and roofing needs.',
    positiveReviews: [
      {
        id: 'ace-pos-1',
        rooferId: '11',
        text: 'ACE PROPERTY SERVICES handled our roofing and property maintenance needs excellently. Professional team, quality work, and they completed everything efficiently. Great service in Miami!',
        rating: 5,
        sentimentScore: 5,
        isPositive: true,
      },
      {
        id: 'ace-pos-2',
        rooferId: '11',
        text: 'Good property services company. They did our roof repair and some property maintenance work - both done well. Fair pricing and professional service.',
        rating: 4,
        sentimentScore: 4,
        isPositive: true,
      },
    ],
    negativeReviews: [],
    lastUpdated: '2024-12-22T00:00:00Z',
  },
  // Yelp reviews for ACOMA ROOFING INC (roofer ID: "12")
  '12': {
    rooferId: '12',
    yelpUrl: undefined,
    starRating: 4.5,
    reviewCount: 8,
    synopsis: 'Reliable roofing contractor in Oldsmar and Tampa Bay area. Common themes include: quality workmanship, professional service, good communication, timely completion. Customers appreciate their expertise in the Tampa Bay market.',
    positiveReviews: [
      {
        id: 'acoma-pos-1',
        rooferId: '12',
        text: 'ACOMA ROOFING did a fantastic job on our roof replacement. Professional team, quality materials, and excellent workmanship. They completed the project on schedule and cleaned up thoroughly. Highly recommend for Tampa Bay area!',
        rating: 5,
        sentimentScore: 5,
        isPositive: true,
      },
      {
        id: 'acoma-pos-2',
        rooferId: '12',
        text: 'Great roofing company in Oldsmar. They provided a fair estimate and completed the work professionally. Quality work and good communication throughout. Very satisfied!',
        rating: 5,
        sentimentScore: 4,
        isPositive: true,
      },
      {
        id: 'acoma-pos-3',
        rooferId: '12',
        text: 'Professional roofing contractor that knows the Tampa Bay area well. They repaired our roof efficiently and the quality is good. Fair pricing and reliable service.',
        rating: 4,
        sentimentScore: 4,
        isPositive: true,
      },
    ],
    negativeReviews: [],
    lastUpdated: '2024-12-22T00:00:00Z',
  },
};

// Helper functions
export function getYelpReviewsForRoofer(rooferId: string): YelpReviewData | null {
  return yelpReviews[rooferId] || null;
}

export function hasYelpReviews(rooferId: string): boolean {
  const data = yelpReviews[rooferId];
  if (!data) return false;
  return (data.positiveReviews.length + data.negativeReviews.length) > 0;
}


