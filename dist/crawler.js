import puppeteer from "puppeteer";
function getStarRating(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = Math.round(rating - fullStars);
    const emptyStars = 5 - fullStars - halfStar;
    const stars = "★".repeat(fullStars) + "☆".repeat(halfStar) + "☆".repeat(emptyStars);
    return stars;
}
function getSearchResultsFromPage(document) {
    const resultComponentSelector = '[data-component-type="s-search-result"]';
    const elements = document.querySelectorAll(resultComponentSelector);
    const results = Array.from(elements).map((element) => {
        const resultName = element.querySelector(".a-size-base-plus.a-color-base.a-text-normal")?.textContent;
        const resultLink = element
            .querySelector(".a-link-normal.s-underline-text.s-underline-link-text.s-link-style.a-text-normal")
            ?.getAttribute("href");
        const resultPrice = element
            .querySelector(".a-price")
            ?.querySelector("span")?.textContent;
        const resultRating = element.querySelector('[aria-label$="stars"]')
            ?.firstChild?.textContent;
        const resultReviews = element
            .querySelector('[aria-label$="stars"]')
            ?.nextElementSibling?.getAttribute("aria-label");
        return {
            name: resultName,
            price: resultPrice ?? "NA",
            rating: parseFloat(resultRating),
            reviews: parseInt(resultReviews.replace(/,/g, "")),
            link: resultLink,
        };
    });
    return results;
}
export async function getContent(query) {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    // Navigate the page to a URL
    await page.goto(`https://www.amazon.com/s?k=${query}`);
    const results = await page.evaluate((getSearchResultsFromPage) => {
        const searchResults = getSearchResultsFromPage(document);
        return searchResults;
    }, getSearchResultsFromPage);
    await browser.close();
    return results;
}
//# sourceMappingURL=crawler.js.map