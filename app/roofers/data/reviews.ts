// Google Business Reviews data structure
// Reviews can be imported from Google Business pages

export interface GoogleReview {
  id: string; // Unique ID for the review
  rooferId: string; // Links to roofer.id
  reviewerName: string;
  rating: number; // 1-5 stars
  reviewText: string;
  reviewDate: string; // ISO date string
  googleReviewUrl?: string; // Link to the review on Google
  reviewerPhotoUrl?: string; // Profile photo from Google
  responseText?: string; // Business owner's response
  responseDate?: string; // ISO date string
  importedAt: string; // When this review was imported
  lastUpdated?: string; // Last time review was synced
}

// Aggregated rating data for a roofer
export interface RooferRatingSummary {
  rooferId: string;
  averageRating: number; // 0-5
  totalReviews: number;
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  lastUpdated: string;
}

// Reviews data storage
// Format: Record<rooferId, GoogleReview[]>
export const googleReviews: Record<string, GoogleReview[]> = {
  // Sample reviews for 1 ROOF LLC (roofer ID: "2")
  '2': [
    {
      id: 'review-1',
      rooferId: '2',
      reviewerName: 'Sarah Johnson',
      rating: 5,
      reviewText: 'Excellent work! The team was professional, on time, and did a great job with our roof replacement. They cleaned up everything perfectly and the quality is outstanding. Highly recommend!',
      reviewDate: '2024-11-15T00:00:00Z',
      googleReviewUrl: 'https://www.google.com/maps/reviews/...',
      importedAt: '2024-12-14T00:00:00Z',
    },
    {
      id: 'review-2',
      rooferId: '2',
      reviewerName: 'Michael Chen',
      rating: 5,
      reviewText: 'Outstanding service from start to finish. The crew was skilled, efficient, and very professional. Our new roof looks fantastic and they handled all the permits. Couldn\'t be happier!',
      reviewDate: '2024-10-28T00:00:00Z',
      googleReviewUrl: 'https://www.google.com/maps/reviews/...',
      importedAt: '2024-12-14T00:00:00Z',
    },
    {
      id: 'review-3',
      rooferId: '2',
      reviewerName: 'Jennifer Martinez',
      rating: 4,
      reviewText: 'Good quality work and the team was professional. The project was completed on schedule. Minor communication delay at the start but they resolved it quickly. Overall satisfied with the result.',
      reviewDate: '2024-10-10T00:00:00Z',
      googleReviewUrl: 'https://www.google.com/maps/reviews/...',
      importedAt: '2024-12-14T00:00:00Z',
    },
    {
      id: 'review-4',
      rooferId: '2',
      reviewerName: 'Robert Williams',
      rating: 5,
      reviewText: 'Amazing experience! They were punctual, clean, and the craftsmanship is top-notch. The roof replacement was done perfectly and they even helped with insurance paperwork. Very satisfied!',
      reviewDate: '2024-09-22T00:00:00Z',
      googleReviewUrl: 'https://www.google.com/maps/reviews/...',
      importedAt: '2024-12-14T00:00:00Z',
    },
    {
      id: 'review-5',
      rooferId: '2',
      reviewerName: 'Lisa Anderson',
      rating: 4,
      reviewText: 'Great work overall. The team was professional and the roof looks good. Took a bit longer than expected but they kept us informed throughout. Would recommend.',
      reviewDate: '2024-09-05T00:00:00Z',
      googleReviewUrl: 'https://www.google.com/maps/reviews/...',
      importedAt: '2024-12-14T00:00:00Z',
    },
    {
      id: 'review-6',
      rooferId: '2',
      reviewerName: 'David Thompson',
      rating: 3,
      reviewText: 'The work quality is decent but there were some delays in communication. The project took longer than initially estimated. The final result is okay but could have been better.',
      reviewDate: '2024-08-18T00:00:00Z',
      googleReviewUrl: 'https://www.google.com/maps/reviews/...',
      importedAt: '2024-12-14T00:00:00Z',
    },
    {
      id: 'review-7',
      rooferId: '2',
      reviewerName: 'Amanda Davis',
      rating: 5,
      reviewText: 'Fantastic service! They were responsive, professional, and did excellent work. The roof replacement exceeded our expectations. Very clean workmanship and great communication throughout.',
      reviewDate: '2024-08-01T00:00:00Z',
      googleReviewUrl: 'https://www.google.com/maps/reviews/...',
      importedAt: '2024-12-14T00:00:00Z',
    },
  ],
  
  // Sample reviews for 3MG ROOFING LLC (roofer ID: "4")
  '4': [
    {
      id: 'review-3mg-1',
      rooferId: '4',
      reviewerName: 'Patricia Rodriguez',
      rating: 5,
      reviewText: 'Outstanding roofing company! They replaced our entire roof after storm damage. The team was professional, efficient, and cleaned up perfectly. The stone-coated metal roof looks amazing and we feel much more secure now.',
      reviewDate: '2024-11-20T00:00:00Z',
      googleReviewUrl: 'https://www.google.com/maps/reviews/...',
      importedAt: '2024-12-14T00:00:00Z',
    },
    {
      id: 'review-3mg-2',
      rooferId: '4',
      reviewerName: 'James Wilson',
      rating: 5,
      reviewText: 'Excellent service from start to finish. They were on time, professional, and the quality of work is top-notch. Our new roof is beautiful and we\'re very happy with the results. Highly recommend!',
      reviewDate: '2024-10-15T00:00:00Z',
      googleReviewUrl: 'https://www.google.com/maps/reviews/...',
      importedAt: '2024-12-14T00:00:00Z',
    },
    {
      id: 'review-3mg-3',
      rooferId: '4',
      reviewerName: 'Maria Garcia',
      rating: 4,
      reviewText: 'Very good work. The team was professional and completed the job on schedule. The roof looks great and we\'re satisfied with the quality. Minor issue with cleanup but they came back to fix it.',
      reviewDate: '2024-09-30T00:00:00Z',
      googleReviewUrl: 'https://www.google.com/maps/reviews/...',
      importedAt: '2024-12-14T00:00:00Z',
    },
    {
      id: 'review-3mg-4',
      rooferId: '4',
      reviewerName: 'Thomas Brown',
      rating: 5,
      reviewText: 'Best roofing company we\'ve worked with! They were responsive, professional, and did exceptional work. The stone-coated metal roof exceeded our expectations. Very satisfied!',
      reviewDate: '2024-09-10T00:00:00Z',
      googleReviewUrl: 'https://www.google.com/maps/reviews/...',
      importedAt: '2024-12-14T00:00:00Z',
    },
  ],
  
  // Sample reviews for 4TH GENERATION ROOFING & SHEET METAL LLC (roofer ID: "5")
  '5': [
    {
      id: 'review-4gen-1',
      rooferId: '5',
      reviewerName: 'Christopher Lee',
      rating: 5,
      reviewText: 'Fantastic roofing company with generations of experience! They did an amazing job on our commercial roof. Professional, timely, and the craftsmanship is excellent. Highly recommend for both residential and commercial projects.',
      reviewDate: '2024-11-25T00:00:00Z',
      googleReviewUrl: 'https://www.google.com/maps/reviews/...',
      importedAt: '2024-12-14T00:00:00Z',
    },
    {
      id: 'review-4gen-2',
      rooferId: '5',
      reviewerName: 'Susan Taylor',
      rating: 5,
      reviewText: 'Excellent work! The team was professional, knowledgeable, and completed the roof replacement efficiently. The quality is outstanding and we\'re very pleased with the results.',
      reviewDate: '2024-10-20T00:00:00Z',
      googleReviewUrl: 'https://www.google.com/maps/reviews/...',
      importedAt: '2024-12-14T00:00:00Z',
    },
    {
      id: 'review-4gen-3',
      rooferId: '5',
      reviewerName: 'Mark Anderson',
      rating: 4,
      reviewText: 'Good quality work and professional service. The project was completed on time and the roof looks great. Would recommend for roofing needs.',
      reviewDate: '2024-09-15T00:00:00Z',
      googleReviewUrl: 'https://www.google.com/maps/reviews/...',
      importedAt: '2024-12-14T00:00:00Z',
    },
  ],
  
  // Sample reviews for A BARTLETT ROOFING & CONSTRUCTION SERVICES LLC (roofer ID: "8")
  '8': [
    {
      id: 'review-bartlett-1',
      rooferId: '8',
      reviewerName: 'Linda White',
      rating: 5,
      reviewText: 'Outstanding roofing contractor! They handled our roof replacement after hurricane damage. Professional, efficient, and the quality is excellent. The stone-coated metal roof looks beautiful and provides great protection.',
      reviewDate: '2024-11-10T00:00:00Z',
      googleReviewUrl: 'https://www.google.com/maps/reviews/...',
      importedAt: '2024-12-14T00:00:00Z',
    },
    {
      id: 'review-bartlett-2',
      rooferId: '8',
      reviewerName: 'Robert Harris',
      rating: 5,
      reviewText: 'Excellent service! The team was professional, on time, and did fantastic work. Our new roof is beautiful and we\'re very satisfied. Highly recommend this company!',
      reviewDate: '2024-10-05T00:00:00Z',
      googleReviewUrl: 'https://www.google.com/maps/reviews/...',
      importedAt: '2024-12-14T00:00:00Z',
    },
    {
      id: 'review-bartlett-3',
      rooferId: '8',
      reviewerName: 'Karen Martinez',
      rating: 4,
      reviewText: 'Very good work overall. The team was professional and the roof replacement was completed as promised. Minor delays but they kept us informed. Satisfied with the final result.',
      reviewDate: '2024-09-20T00:00:00Z',
      googleReviewUrl: 'https://www.google.com/maps/reviews/...',
      importedAt: '2024-12-14T00:00:00Z',
    },
    {
      id: 'review-bartlett-4',
      rooferId: '8',
      reviewerName: 'Daniel Clark',
      rating: 5,
      reviewText: 'Amazing experience! They were responsive, professional, and did excellent work. The roof replacement exceeded our expectations. Very clean workmanship and great communication.',
      reviewDate: '2024-08-25T00:00:00Z',
      googleReviewUrl: 'https://www.google.com/maps/reviews/...',
      importedAt: '2024-12-14T00:00:00Z',
    },
    {
      id: 'review-bartlett-5',
      rooferId: '8',
      reviewerName: 'Nancy Lewis',
      rating: 3,
      reviewText: 'The work quality is okay but there were some communication issues during the project. The roof looks fine but the process could have been smoother.',
      reviewDate: '2024-08-10T00:00:00Z',
      googleReviewUrl: 'https://www.google.com/maps/reviews/...',
      importedAt: '2024-12-14T00:00:00Z',
    },
  ],
  
  // Sample reviews for ABC ROOFING CORP (roofer ID: "10")
  '10': [
    {
      id: 'review-abc-1',
      rooferId: '10',
      reviewerName: 'Steven Walker',
      rating: 5,
      reviewText: 'Excellent roofing company! They did a great job on our roof replacement. Professional, timely, and the quality is outstanding. The stone-coated metal roof looks fantastic!',
      reviewDate: '2024-11-05T00:00:00Z',
      googleReviewUrl: 'https://www.google.com/maps/reviews/...',
      importedAt: '2024-12-14T00:00:00Z',
    },
    {
      id: 'review-abc-2',
      rooferId: '10',
      reviewerName: 'Betty Hall',
      rating: 4,
      reviewText: 'Very good service. The team was professional and completed the work on schedule. The roof looks good and we\'re satisfied with the quality.',
      reviewDate: '2024-10-12T00:00:00Z',
      googleReviewUrl: 'https://www.google.com/maps/reviews/...',
      importedAt: '2024-12-14T00:00:00Z',
    },
    {
      id: 'review-abc-3',
      rooferId: '10',
      reviewerName: 'Kevin Young',
      rating: 5,
      reviewText: 'Outstanding work! They were professional, efficient, and did excellent quality work. Our new roof is beautiful and we\'re very happy. Highly recommend!',
      reviewDate: '2024-09-18T00:00:00Z',
      googleReviewUrl: 'https://www.google.com/maps/reviews/...',
      importedAt: '2024-12-14T00:00:00Z',
    },
  ],
  
  // Sample reviews for ADVANCED ROOF TECHNOLOGY INC (roofer ID: "14")
  '14': [
    {
      id: 'review-adv-1',
      rooferId: '14',
      reviewerName: 'Michelle King',
      rating: 5,
      reviewText: 'Fantastic roofing company! They use advanced technology and techniques. The team was professional, knowledgeable, and did exceptional work. Our roof looks amazing!',
      reviewDate: '2024-11-18T00:00:00Z',
      googleReviewUrl: 'https://www.google.com/maps/reviews/...',
      importedAt: '2024-12-14T00:00:00:00Z',
    },
    {
      id: 'review-adv-2',
      rooferId: '14',
      reviewerName: 'Gary Wright',
      rating: 5,
      reviewText: 'Excellent service and quality work. They were professional, on time, and the roof replacement was done perfectly. Very satisfied with the results!',
      reviewDate: '2024-10-08T00:00:00Z',
      googleReviewUrl: 'https://www.google.com/maps/reviews/...',
      importedAt: '2024-12-14T00:00:00Z',
    },
    {
      id: 'review-adv-3',
      rooferId: '14',
      reviewerName: 'Donna Lopez',
      rating: 4,
      reviewText: 'Good quality work and professional service. The project was completed on schedule and the roof looks great. Would recommend.',
      reviewDate: '2024-09-12T00:00:00Z',
      googleReviewUrl: 'https://www.google.com/maps/reviews/...',
      importedAt: '2024-12-14T00:00:00Z',
    },
    {
      id: 'review-adv-4',
      rooferId: '14',
      reviewerName: 'Edward Hill',
      rating: 5,
      reviewText: 'Outstanding experience! They were responsive, professional, and did excellent work. The advanced roofing technology they use really shows in the quality. Highly recommend!',
      reviewDate: '2024-08-28T00:00:00Z',
      googleReviewUrl: 'https://www.google.com/maps/reviews/...',
      importedAt: '2024-12-14T00:00:00Z',
    },
  ],
};

// Helper to get reviews for a specific roofer
export function getReviewsForRoofer(rooferId: string): GoogleReview[] {
  return googleReviews[rooferId] || [];
}

// Helper to get rating summary for a roofer
export function getRatingSummary(rooferId: string): RooferRatingSummary {
  const reviews = getReviewsForRoofer(rooferId);
  
  if (reviews.length === 0) {
    return {
      rooferId,
      averageRating: 0,
      totalReviews: 0,
      ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      lastUpdated: new Date().toISOString(),
    };
  }

  const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  let totalRating = 0;

  reviews.forEach((review) => {
    distribution[review.rating as keyof typeof distribution]++;
    totalRating += review.rating;
  });

  return {
    rooferId,
    averageRating: Math.round((totalRating / reviews.length) * 10) / 10, // Round to 1 decimal
    totalReviews: reviews.length,
    ratingDistribution: distribution,
    lastUpdated: reviews[reviews.length - 1]?.importedAt || new Date().toISOString(),
  };
}

// Helper to get all reviews (for admin)
export function getAllReviews(): GoogleReview[] {
  return Object.values(googleReviews).flat();
}

// Helper to add/update a review
export function addOrUpdateReview(review: GoogleReview): void {
  if (!googleReviews[review.rooferId]) {
    googleReviews[review.rooferId] = [];
  }
  
  const existingIndex = googleReviews[review.rooferId].findIndex(
    (r) => r.id === review.id
  );
  
  if (existingIndex >= 0) {
    googleReviews[review.rooferId][existingIndex] = {
      ...review,
      lastUpdated: new Date().toISOString(),
    };
  } else {
    googleReviews[review.rooferId].push(review);
  }
}

// Helper to delete a review
export function deleteReview(rooferId: string, reviewId: string): void {
  if (googleReviews[rooferId]) {
    googleReviews[rooferId] = googleReviews[rooferId].filter(
      (r) => r.id !== reviewId
    );
  }
}
















