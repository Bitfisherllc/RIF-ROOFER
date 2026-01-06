'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faExternalLink,
} from '@fortawesome/free-solid-svg-icons';
import type { YelpReviewData } from '@/app/roofers/data/yelp-reviews';

interface YelpReviewSummaryProps {
  yelpData: YelpReviewData;
}

export default function YelpReviewSummary({ yelpData }: YelpReviewSummaryProps) {
  if (!yelpData) {
    return null;
  }

  const totalReviews = yelpData.positiveReviews.length + yelpData.negativeReviews.length;
  const topPositive = yelpData.positiveReviews.slice(0, 3);
  const topNegative = yelpData.negativeReviews.slice(0, 3);

  return (
    <div className="bg-white p-8 rounded-2xl border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-rif-black">Yelp Reviews</h2>
        {yelpData.yelpUrl && (
          <a
            href={yelpData.yelpUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-rif-blue-500 hover:text-rif-blue-600 transition-colors font-medium"
          >
            View on Yelp
            <FontAwesomeIcon icon={faExternalLink} className="h-4 w-4" />
          </a>
        )}
      </div>

      {/* Overall Rating */}
      {yelpData.starRating && (
        <div className="mb-6 p-6 bg-gray-50 rounded-xl border border-gray-200">
          <div className="flex items-center gap-4 mb-2">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <FontAwesomeIcon
                  key={i}
                  icon={faStar}
                  className={`h-6 w-6 ${
                    i < Math.floor(yelpData.starRating!) ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <div>
              <div className="text-3xl font-bold text-rif-black">
                {yelpData.starRating.toFixed(1)}
              </div>
              {yelpData.reviewCount && (
                <div className="text-sm text-gray-600">
                  Based on {yelpData.reviewCount} review{yelpData.reviewCount !== 1 ? 's' : ''}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Synopsis */}
      {yelpData.synopsis && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="font-semibold text-rif-black mb-2">Review Summary</h3>
          <p className="text-gray-700 leading-relaxed">{yelpData.synopsis}</p>
        </div>
      )}

      {/* Positive Reviews */}
      {topPositive.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-rif-black mb-4">
            Positive Reviews ({yelpData.positiveReviews.length})
          </h3>
          <div className="space-y-4">
            {topPositive.map((review) => (
              <div
                key={review.id}
                className="p-4 bg-green-50 rounded-lg border border-green-200"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FontAwesomeIcon
                        key={i}
                        icon={faStar}
                        className={`h-4 w-4 ${
                          i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {review.rating} star{review.rating !== 1 ? 's' : ''}
                  </span>
                </div>
                <p className="text-gray-700 leading-relaxed">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Negative Reviews */}
      {topNegative.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-rif-black mb-4">
            Critical Reviews ({yelpData.negativeReviews.length})
          </h3>
          <div className="space-y-4">
            {topNegative.map((review) => (
              <div
                key={review.id}
                className="p-4 bg-orange-50 rounded-lg border border-orange-200"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FontAwesomeIcon
                        key={i}
                        icon={faStar}
                        className={`h-4 w-4 ${
                          i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {review.rating} star{review.rating !== 1 ? 's' : ''}
                  </span>
                </div>
                <p className="text-gray-700 leading-relaxed">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
