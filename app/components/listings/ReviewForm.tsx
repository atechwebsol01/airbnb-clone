"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { AiFillStar } from "react-icons/ai";

import Heading from "../Heading";
import Button from "../Button";

interface ReviewFormProps {
  listingId: string;
  reservationId: string;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  listingId,
  reservationId,
}) => {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = () => {
    if (rating < 1) {
      toast.error("Please select a star rating.");
      return;
    }

    if (comment.trim().length < 1) {
      toast.error("Please write a short comment.");
      return;
    }

    setIsLoading(true);

    axios
      .post("/api/reviews", { listingId, reservationId, rating, comment })
      .then(() => {
        toast.success("Thanks for your review!");
        setComment("");
        setRating(0);
        router.refresh();
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error || "Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="flex flex-col gap-4 border-t border-ink-700 pt-6">
      <Heading title="Leave a review" subtitle="Tell others about your stay" />
      <div className="flex flex-row gap-1">
        {Array.from({ length: 5 }).map((_, i) => {
          const value = i + 1;
          return (
            <button
              key={value}
              type="button"
              aria-label={`Rate ${value} star${value === 1 ? "" : "s"}`}
              disabled={isLoading}
              onClick={() => setRating(value)}
              onMouseEnter={() => setHoverRating(value)}
              onMouseLeave={() => setHoverRating(0)}
            >
              <AiFillStar
                size={28}
                className={
                  value <= (hoverRating || rating)
                    ? "text-gold-500"
                    : "text-ink-600"
                }
              />
            </button>
          );
        })}
      </div>
      <textarea
        aria-label="Review comment"
        disabled={isLoading}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="How was your stay?"
        rows={4}
        className="
          w-full
          p-4
          font-light
          bg-ink-800
          text-neutral-100
          border-2
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          border-ink-600
          focus:border-gold-500
          placeholder:text-neutral-500
        "
      />
      <div className="w-40">
        <Button disabled={isLoading} label="Submit review" onClick={onSubmit} />
      </div>
    </div>
  );
};

export default ReviewForm;
