// const commentsScraper = require('./commentsScraper.ts');

const ScraperObject = {
    url: 'https://devblogs.microsoft.com/visualstudio/',
    async scraper(browser) {
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}...`);
        await page.goto(this.url);
        let scrapedData = []

        async function scrapeCurrentPage() {
            await page.waitForSelector('.site-main');
            let urls = await page.$$eval('article', links => {
                links = links.map(el => el.querySelector('h5 > a').href)
                return links;
            });

            let pagePromise = (link) => new Promise(async (resolve, reject) => {
                let user = {};
                let newPage = await browser.newPage();
                await newPage.goto(link);
                console.log("BEFORE DATA")
                user['articleTitle'] = await newPage.$eval('div > h1', text => text.textContent.trim());
                user['articleAuthor'] = await newPage.$eval('h5 > a', text => text.textContent.trim());
                await newPage.waitForSelector('#comments > ul');
                user['comments'] = await newPage.evaluate(() => {
                    let commentEle = document.querySelectorAll('.comment');
                    return Object.values(commentEle).map(el => {
                        return {
                            name: el.querySelector('.author-name').textContent.trim(),
                            isMSE: !!el.querySelector('span.author-name>a>img')
                        }
                    });
                });
                console.log("AFTER DATA")
                resolve(user);
                await newPage.close();
            });
            for (let link in urls) {
                let currentPageData = await pagePromise(urls[link]);
                scrapedData.push(currentPageData);
                console.log(currentPageData);
                break;  //TODO: delete, run for the first article
            }
            // let nextButtonExist = false;  //TODO: uncomment - multipage scraping
            // try {
            //     const nextButton = await page.$eval('#most-recent > nav > ul > li:nth-child(6) > a', a => a.textContent);
            //     nextButtonExist = true;
            // } catch (err) {
            //     nextButtonExist = false;
            // }
            // if (nextButtonExist) {
            //     await page.click('#most-recent > nav > ul > li:nth-child(6) > a');
            //     console.log("page")
            //     return scrapeCurrentPage(); // Call this function recursively
            // }
            // await page.close();
            // return scrapedData;
        }

        let data = await scrapeCurrentPage();
        console.log(data);
        return data;

    }
}

module.exports = ScraperObject;


