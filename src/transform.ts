import { ResultItem } from "./crawler.js";
import { Options } from "./main.js";

export function applyTransforms(results: ResultItem[], options: Options) {
  return results;
}

export function getStarRating(rating: number): string {
  const fullStars = Math.floor(rating);
  const halfStar = Math.round(rating - fullStars);
  const emptyStars = 5 - fullStars - halfStar;

  const stars =
    "★".repeat(fullStars) + "☆".repeat(halfStar) + "☆".repeat(emptyStars);

  return stars;
}
