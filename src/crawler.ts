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
    const resultName = element.querySelector("h2");

    const resultLink = resultName?.firstElementChild;

    const resultPrice = element.querySelector(".a-price")?.firstElementChild;

    const resultRating = element.querySelector(
      '[aria-label$="stars"]'
    )?.firstChild;

    const resultReviews = element.querySelector(
      '[aria-label$="stars"]'
    )?.nextElementSibling;

    const isPrime = element.querySelector(".s-prime");

    // The content from the elements is parsed into our Data Structure -> ResultItem
    return {
      name: resultName?.textContent?.trim(),
      price: resultPrice?.textContent ?? "NA",
      rating: parseFloat(resultRating?.textContent ?? "0"),
      reviews: parseInt(
        resultReviews?.getAttribute("aria-label")?.replace(/,/g, "") ?? "0"
      ),
      link: resultLink?.getAttribute("href") ?? "NA",
      isPrime: Boolean(isPrime),
    };
  });

  return searchResults;
}

export async function getContent(query: string): Promise<ResultItem[]> {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  try {
    const response = await page.goto(`https://www.amazon.com/s?k=${query}`);

    // Amazon is detecting puppeteer as bot if testing in cloud IDE platforms like codespaces etc. amazon.in works somehow.
    if (response.status() === 503) {
      throw "Amazon is detecting this CLI as bot";
    }

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
