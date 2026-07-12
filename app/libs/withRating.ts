type Rated<T> = T & { reviews: { rating: number }[] };

export default function withRating<T>(listing: Rated<T>) {
  const { reviews, ...rest } = listing;
  const reviewCount = reviews.length;
  const rating = reviewCount
    ? Math.round(
        (reviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount) * 10
      ) / 10
    : 0;

  return { ...rest, rating, reviewCount };
}
