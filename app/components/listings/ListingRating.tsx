"use client";

import { AiFillStar } from "react-icons/ai";

interface ListingRatingProps {
  rating: number;
  reviewCount: number;
  size?: number;
}

const ListingRating: React.FC<ListingRatingProps> = ({
  rating,
  reviewCount,
  size = 14,
}) => {
  if (reviewCount === 0) {
    return <div className="font-light text-neutral-500 text-sm">New</div>;
  }

  return (
    <div className="flex flex-row items-center gap-1 text-sm">
      <AiFillStar size={size} className="text-gold-500" />
      <div className="font-medium text-neutral-100">{rating.toFixed(1)}</div>
      <div className="font-light text-neutral-500">
        ({reviewCount} {reviewCount === 1 ? "review" : "reviews"})
      </div>
    </div>
  );
};

export default ListingRating;
