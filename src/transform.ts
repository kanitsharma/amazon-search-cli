import { ResultItem } from "./crawler.js";
import { Options } from "./main.js";

export function applyTransforms(results: ResultItem[], options: Options) {
  if (options.prime) {
    results = results.filter((item) => item.isPrime);
  }

  results = results.slice(0, options.limit);

  switch (options.sort) {
    case "name":
      return results.sort((a, b) =>
        options.asc
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      );
    case "rating":
      return results.sort((a, b) =>
        options.asc ? a.rating - b.rating : b.rating - a.rating
      );
    case "price":
      return results.sort((a, b) => {
        const priceA = parseFloat(a.price.slice(1));
        const priceB = parseFloat(b.price.slice(1));
        return options.asc ? priceA - priceB : priceB - priceA;
      });
    default:
      return results;
  }
}

function getStarRating(rating: number): string {
  const fullStars = Math.floor(rating);
  const halfStar = Math.round(rating - fullStars);
  const emptyStars = 5 - fullStars - halfStar;

  const stars =
    "★".repeat(fullStars) + "☆".repeat(halfStar) + "☆".repeat(emptyStars);

  return stars;
}

export function printSearchResults(results: ResultItem[]) {
  for (const result of results) {
    console.log(result.name);
    console.log(`Price: ${result.price}`);
    console.log(
      `Rating: ${result.rating} ${getStarRating(result.rating)} (${
        result.reviews
      })`
    );
    if (result.isPrime) {
      console.log("Prime");
    }
    console.log(`URL: ${result.link} \n`);
  }
}
