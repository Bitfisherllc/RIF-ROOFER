'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';

interface StarRatingProps {
  rating: number; // 0-5
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
  className?: string;
}

export default function StarRating({
  rating,
  maxRating = 5,
  size = 'md',
  showNumber = false,
  className = '',
}: StarRatingProps) {
  const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex items-center">
        {Array.from({ length: fullStars }).map((_, i) => (
          <FontAwesomeIcon
            key={`full-${i}`}
            icon={faStar}
            className={`${sizeClasses[size]} text-yellow-400`}
          />
        ))}
        {hasHalfStar && (
          <div className="relative">
            <FontAwesomeIcon
              icon={faStarRegular}
              className={`${sizeClasses[size]} text-yellow-400`}
            />
            <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
              <FontAwesomeIcon
                icon={faStar}
                className={`${sizeClasses[size]} text-yellow-400`}
              />
            </div>
          </div>
        )}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <FontAwesomeIcon
            key={`empty-${i}`}
            icon={faStarRegular}
            className={`${sizeClasses[size]} text-gray-300`}
          />
        ))}
      </div>
      {showNumber && (
        <span className="text-sm font-medium text-gray-700 ml-1">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
















