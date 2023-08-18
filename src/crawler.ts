import puppeteer, { Page } from "puppeteer";
import { Options } from "./main.js";

export interface ResultItem {
  name: string;
  price: string;
  rating: number;
  reviews: number;
  link: string;
  isPrime: boolean;
}

// DOM selections are done asynchronously, similar functions like this can be run together.
async function getSearchResultsFromPage(
  page: Page,
  options: Options
): Promise<ResultItem[]> {
  const { limit } = options;

  return await page.evaluate((limit) => {
    const resultComponents = Array.from(
      document.querySelectorAll('[data-component-type="s-search-result"]')
    ).slice(0, limit); // Limits are applied here, so that we don't query more data than we need;

    const searchResults = resultComponents.map((element) => {
      const resultName = element.querySelector(
        ".a-size-base-plus.a-color-base.a-text-normal"
      )?.textContent;

      const resultLink = element
        .querySelector(
          ".a-link-normal.s-underline-text.s-underline-link-text.s-link-style.a-text-normal"
        )
        ?.getAttribute("href");

      const resultPrice = element
        .querySelector(".a-price")
        ?.querySelector("span")?.textContent;

      const resultRating =
        element.querySelector('[aria-label$="stars"]')?.firstChild
          ?.textContent ?? "0";

      const resultReviews =
        element
          .querySelector('[aria-label$="stars"]')
          ?.nextElementSibling?.getAttribute("aria-label") ?? "0";

      const isPrime = !!element.querySelector(".s-prime");

      return {
        name: resultName,
        price: resultPrice ?? "NA",
        rating: parseFloat(resultRating),
        reviews: parseInt(resultReviews?.replace(/,/g, "")),
        link: "https://amazon.in" + resultLink,
        isPrime: isPrime,
      };
    });

    return searchResults;
  }, limit);
}

export async function getContent(
  query: string,
  options: Options
): Promise<ResultItem[]> {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto(`https://www.amazon.in/s?k=${query}`);

  // Similar async functions can be created for other data extractions
  const searchResults = await getSearchResultsFromPage(page, options);

  await browser.close();

  return searchResults;
}
