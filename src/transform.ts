import { ResultItem } from "./crawler.js";
import { Options } from "./main.js";

export function applyTransforms(results: ResultItem[], options: Options) {
  if (options.prime) {
    results = results.filter((item) => item.isPrime);
  }

  // Filtering items that have no prices, in future we can add this behind a separate flag like --show-no-price
  results = results.filter((item) => item.price !== "NA");

  switch (options.sort) {
    case "name":
      results = results.sort((a, b) =>
        options.asc
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      );
    case "rating":
      results = results.sort((a, b) =>
        options.asc ? a.rating - b.rating : b.rating - a.rating
      );
    case "price":
      results = results.sort((a, b) => {
        const priceA = parseFloat(a.price.slice(1));
        const priceB = parseFloat(b.price.slice(1));

        return options.asc ? priceA - priceB : priceB - priceA;
      });
  }

  // Limits are applied after filtering primes and NA prices, so no. of results is same as limit
  return results.slice(0, options.limit);
}

function getStarRating(rating: number): string {
  const fullStars = Math.round(rating);
  const emptyStars = 5 - fullStars;

  // I would like to add half star there as well, but I cant find its unicode.
  const stars = "★".repeat(fullStars) + "☆".repeat(emptyStars);

  return stars;
}

export function printSearchResults(results: ResultItem[]) {
  if (results.length === 0) {
    console.log("No Results found.");
  }

  for (const result of results) {
    console.log(`\n${result.name}`);
    console.log(`Price: ${result.price}`);
    console.log(
      `Rating: ${result.rating} ${getStarRating(result.rating)} (${
        result.reviews
      })`
    );
    if (result.isPrime) {
      console.log("✓Prime");
    }
    console.log(`URL: https://amazon.com${result.link}`);
  }
}
