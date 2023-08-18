import { ResultItem } from "./crawler.js";
import { Options } from "./main.js";

function sort(items: ResultItem[], key: string, asc: boolean) {
  return items.sort((a, b) => {
    if (asc) {
      return a[key] - b[key];
    }

    return b[key] - a[key];
  });
}

export function applyTransforms(results: ResultItem[], options: Options) {
  if (options.prime) {
    results = results.filter((item) => item.isPrime);
  }

  switch (options.sort) {
    case "name":
      return sort(results, "name", options.asc);
    case "rating":
      return sort(results, "rating", options.asc);
    case "price":
      return sort(results, "price", options.asc);
    default:
      return results;
  }
}

export function getStarRating(rating: number): string {
  const fullStars = Math.floor(rating);
  const halfStar = Math.round(rating - fullStars);
  const emptyStars = 5 - fullStars - halfStar;

  const stars =
    "★".repeat(fullStars) + "☆".repeat(halfStar) + "☆".repeat(emptyStars);

  return stars;
}

export function printResults(results: ResultItem[]) {
  for (const result of results) {
    console.log(result.name);
    console.log(`Price: ${result.price}`);
    console.log(
      `Rating: ${result.rating} ${getStarRating(result.rating)} (${
        result.reviews
      })`
    );
    console.log(`URL: ${result.link} \n`);
  }
}
