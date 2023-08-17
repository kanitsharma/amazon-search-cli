import puppeteer from "puppeteer";
(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    // Navigate the page to a URL
    await page.goto("https://developer.chrome.com/");
    // Set screen size
    const content = await page.content();
    console.log(content);
    await browser.close();
})();
//# sourceMappingURL=parser.js.map