import puppeteer from "puppeteer";

export async function getContent(query: string) {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto(`https://www.amazon.com/s?k=${query}`);

  const elements = await page.evaluate(() => {
    const selector = ".a-size-base-plus.a-color-base.a-text-normal"; // Combined class selector
    const elements = document.querySelectorAll(selector);
    return Array.from(elements).map((element) => element.textContent);
  });

  console.log(elements);

  await browser.close();
}
