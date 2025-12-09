import React from 'react';
import { StarIcon } from './icons';

interface RatingProps {
  rating: number;
  reviews: number;
  className?: string;
}

const Rating: React.FC<RatingProps> = ({ rating, reviews, className = '' }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className={`flex items-center gap-2 text-sm ${className}`}>
      <div className="flex items-center text-yellow-400">
        {[...Array(fullStars)].map((_, i) => (
          <StarIcon key={`full-${i}`} className="w-4 h-4 fill-current" />
        ))}
        {/* Note: Half star display is omitted for simplicity, can be added later */}
        {[...Array(emptyStars + (halfStar ? 1 : 0))].map((_, i) => (
          <StarIcon key={`empty-${i}`} className="w-4 h-4 text-gray-500 fill-current" />
        ))}
      </div>
      <span className="text-gray-400">({reviews} reviews)</span>
    </div>
  );
};

export default Rating;