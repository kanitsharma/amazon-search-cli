import puppeteer from "puppeteer";
function getSearchResultsFromDocument() {
    const resultComponents = Array.from(document.querySelectorAll('[data-component-type="s-search-result"]'));
    const searchResults = resultComponents.map((element) => {
        const resultName = element.querySelector(".a-size-base-plus.a-color-base.a-text-normal")?.textContent;
        const resultLink = element
            .querySelector(".a-link-normal.s-underline-text.s-underline-link-text.s-link-style.a-text-normal")
            ?.getAttribute("href");
        const resultPrice = element
            .querySelector(".a-price")
            ?.querySelector("span")?.textContent;
        const resultRating = element.querySelector('[aria-label$="stars"]')?.firstChild?.textContent ??
            "0";
        const resultReviews = element
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
}
export async function getContent(query, options) {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    // Navigate the page to a URL
    await page.goto(`https://www.amazon.in/s?k=${query}`);
    // DOM selections are done asynchronously, similar functions like this can be run together.
    const searchResults = await page.evaluate(getSearchResultsFromDocument);
    await browser.close();
    return searchResults;
}
//# sourceMappingURL=crawler.js.map