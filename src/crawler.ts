import puppeteer from "puppeteer";

export interface ResultItem {
  name: string;
  price: string;
  rating: number;
  reviews: number;
  link: string;
  isPrime: boolean;
}

function getSearchResultsFromDocument(): ResultItem[] {
  // First, all the result components are queried
  const resultComponents = Array.from(
    document.querySelectorAll('[data-component-type="s-search-result"]')
  );

  // Then the component's inner elements are queried
  const searchResults = resultComponents.map((element) => {
    const resultName = element.querySelector(
      ".a-size-base-plus.a-color-base.a-text-normal"
    )?.textContent;

    const resultLink = element
      .querySelector(
        ".a-link-normal.s-underline-text.s-underline-link-text.s-link-style.a-text-normal"
      )
      ?.getAttribute("href");

    const resultPrice =
      element.querySelector(".a-price")?.querySelector("span")?.textContent ??
      "NA";

    const resultRating =
      element.querySelector('[aria-label$="stars"]')?.firstChild?.textContent ??
      "0";

    const resultReviews =
      element
        .querySelector('[aria-label$="stars"]')
        ?.nextElementSibling?.getAttribute("aria-label") ?? "0";

    const isPrime = !!element.querySelector(".s-prime");

    return {
      name: resultName,
      price: resultPrice,
      rating: parseFloat(resultRating),
      reviews: parseInt(resultReviews?.replace(/,/g, "")),
      link: "https://amazon.in" + resultLink,
      isPrime: isPrime,
    };
  });

  return searchResults;
}

export async function getContent(query: string): Promise<ResultItem[]> {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  try {
    await page.goto(`https://www.amazon.in/s?k=${query}`);

    // DOM selections are done asynchronously, similar functions like this can be run together.
    const searchResults = await page.evaluate(getSearchResultsFromDocument);

    return searchResults;
  } catch (error) {
    console.error("Error during content retrieval:", error);
    return [];
  } finally {
    await browser.close();
  }
}
