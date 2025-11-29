import { ReviewItem } from "./types";

// Safely get score from a ReviewItem (handles legacy and nested structures)
export const getReviewScore = (review: ReviewItem): number => {
  // Check if result.reviews exists and has a score
  if (review.result?.reviews && review.result.reviews.length > 0) {
    const firstReview = review.result.reviews[0] as any;
    return firstReview?.score || 0;
  }
  return 0;
};
