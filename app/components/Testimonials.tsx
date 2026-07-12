"use client";

import Link from "next/link";
import { AiFillStar } from "react-icons/ai";

import Avatar from "./Avatar";
import Heading from "./Heading";

interface TestimonialReview {
  id: string;
  rating: number;
  comment: string;
  user: { name: string | null; image: string | null };
  listing: { id: string; title: string };
}

interface TestimonialsProps {
  reviews: TestimonialReview[];
}

const Testimonials: React.FC<TestimonialsProps> = ({ reviews }) => {
  if (reviews.length === 0) {
    return null;
  }

  return (
    <section className="mt-20 border-t border-ink-700 pt-16">
      <div className="mb-10">
        <Heading
          center
          title="What our guests say"
          subtitle="Real reviews from real stays — not marketing copy"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="
              bg-ink-900
              border
              border-ink-700
              rounded-2xl
              p-6
              flex
              flex-col
              gap-4
            "
          >
            <div className="flex flex-row gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <AiFillStar
                  key={i}
                  size={16}
                  className={
                    i < review.rating ? "text-gold-500" : "text-ink-600"
                  }
                />
              ))}
            </div>
            <p className="text-neutral-300 font-light italic flex-1">
              &ldquo;{review.comment}&rdquo;
            </p>
            <div className="flex flex-row items-center gap-3 border-t border-ink-700 pt-4">
              <Avatar src={review.user.image} />
              <div className="flex flex-col">
                <div className="font-semibold text-neutral-50 text-sm">
                  {review.user.name || "Verified guest"}
                </div>
                <Link
                  href={`/listings/${review.listing.id}`}
                  className="text-neutral-500 text-xs hover:text-gold-400 transition"
                >
                  Stayed at {review.listing.title}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
