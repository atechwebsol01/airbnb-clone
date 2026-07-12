"use client";

import { format } from "date-fns";
import { AiFillStar } from "react-icons/ai";

import { SafeReview } from "@/app/types";

import Avatar from "../Avatar";
import Heading from "../Heading";

interface ReviewListProps {
  reviews: SafeReview[];
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  if (reviews.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-6">
      <Heading title={`${reviews.length} ${reviews.length === 1 ? "Review" : "Reviews"}`} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((review) => (
          <div key={review.id} className="flex flex-col gap-2">
            <div className="flex flex-row items-center gap-3">
              <Avatar src={review.user.image} />
              <div className="flex flex-col">
                <div className="font-semibold">
                  {review.user.name || "Anonymous"}
                </div>
                <div className="text-neutral-500 text-sm">
                  {format(new Date(review.createdAt), "MMMM yyyy")}
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <AiFillStar
                  key={i}
                  size={14}
                  className={i < review.rating ? "text-gold-500" : "text-ink-600"}
                />
              ))}
            </div>
            <div className="font-light text-neutral-400">
              {review.comment}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
