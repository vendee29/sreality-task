import puppeteer from "puppeteer";

type Ad = {
  title: string;
  imageUrl: string;
};

async function scrapeAds() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const baseUrl = "https://www.sreality.cz/en/search/for-sale/apartments";
  const desiredAdsCount = 5;
  let allAds: Ad[] = [];
  let currentPage = 1;

  while (allAds.length < desiredAdsCount) {
    const pageUrl = `${baseUrl}?page=${currentPage}`;
    await page.goto(pageUrl);

    await page.waitForSelector(".property");

    const pageAds = await page.evaluate(() => {
      const adElements = document.querySelectorAll(".property");
      const ads: Ad[] = [];

      adElements.forEach((el) => {
        const title = el.querySelector(".name")?.textContent || "no title";
        const imageUrl = el.querySelector("img")?.src || "no image";

        ads.push({ title, imageUrl });
      });

      return ads;
    });

    allAds = allAds.concat(pageAds);
    currentPage++;

    if (allAds.length >= desiredAdsCount) {
      break;
    }
  }

  await browser.close();

  return allAds.slice(0, desiredAdsCount);
}

export default scrapeAds;