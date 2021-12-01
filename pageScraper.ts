// const {Article,User} = require("./DataClasses")
import DataClasses from "./DataClasses";
import User = DataClasses.User;
import Article = DataClasses.Article;

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
                let newPage = await browser.newPage();
                await newPage.goto(link);
                console.log("BEFORE DATA")
                let articleTitle = await newPage.$eval('div > h1', text => text.textContent.trim());
                let articleAuthor = await newPage.$eval('h5 > a', text => text.textContent.trim());
                await newPage.waitForSelector('#comments');
                let comments = await newPage.evaluate(() => {
                    let commentEle = document.querySelectorAll('.comment');
                    return Object.values(commentEle).map(el => {
                        return {
                            name: el.querySelector('.author-name').textContent.trim(),
                            isMSE: !!el.querySelector('a>img')
                        }
                    });
                });
                let curArticle= new Article(articleTitle, articleAuthor, link);
                console.log(comments);
                for (let i = 0; i < comments.length - 1; i++) {
                    if ((comments[i].name === comments[i + 1].name)) {
                        let curUser = new User(comments[i].name, comments[i].isMSE != comments[i + 1].isMSE)
                        if (comments.indexOf(curUser) === -1) {
                            comments.push(curUser);
                        }
                    }
                }

                console.log("AFTER DATA")
                resolve(curArticle);
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


