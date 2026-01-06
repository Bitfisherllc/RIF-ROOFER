'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faExternalLink } from '@fortawesome/free-solid-svg-icons';
import type { GoogleReview } from '@/app/roofers/data/reviews';
import { format } from 'date-fns';

interface GoogleReviewCardProps {
  review: GoogleReview;
}

export default function GoogleReviewCard({ review }: GoogleReviewCardProps) {
  const reviewDate = new Date(review.reviewDate);
  const responseDate = review.responseDate ? new Date(review.responseDate) : null;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      {/* Review Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {review.reviewerPhotoUrl ? (
            <img
              src={review.reviewerPhotoUrl}
              alt={review.reviewerName}
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500 text-sm font-medium">
                {review.reviewerName.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <div>
            <div className="font-semibold text-gray-900">{review.reviewerName}</div>
            <div className="text-sm text-gray-500">
              {format(reviewDate, 'MMMM dd, yyyy')}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
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
          {review.googleReviewUrl && (
            <a
              href={review.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-rif-blue-500 transition-colors"
              title="View on Google"
            >
              <FontAwesomeIcon icon={faExternalLink} className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>

      {/* Review Text */}
      <div className="text-gray-700 leading-relaxed mb-4">{review.reviewText}</div>

      {/* Business Response */}
      {review.responseText && (
        <div className="mt-4 pt-4 border-t border-gray-100 bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-semibold text-gray-900">Business Response</span>
            {responseDate && (
              <span className="text-xs text-gray-500">
                {format(responseDate, 'MMMM dd, yyyy')}
              </span>
            )}
          </div>
          <div className="text-sm text-gray-700 leading-relaxed">
            {review.responseText}
          </div>
        </div>
      )}

      {/* Google Badge */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          <span>Review from Google</span>
        </div>
      </div>
    </div>
  );
}
















