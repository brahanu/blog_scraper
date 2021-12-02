const ScraperObject = {
    url: 'https://devblogs.microsoft.com/visualstudio/',
    async scraper(browser) {

        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}...`);
        await page.goto(this.url);
        let scrapedData = []
        // let userDataBase = []
        let articleDataBase = []

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
                let users = [];
                for (let i = 0; i < comments.length - 1; i += 2) {
                    if ((comments[i].name === comments[i + 1].name)) {
                        let curUser = {}
                        curUser['name'] = comments[i].name;
                        curUser['isMSE'] = comments[i].isMSE != comments[i + 1].isMSE;
                        users.push(curUser);
                    }
                }
                resolve({articleTitle, articleAuthor, link, users});
                await newPage.close();
            });
            for (let link in urls) {
                let currentPageData = await pagePromise(urls[link]);
                scrapedData.push(currentPageData);
                console.log(articleDataBase);
                // break;  //TODO: delete, run for the first article
            }
            let nextButtonExist = false;  //TODO: uncomment - multipage scraping
            try {
                const nextButton = await page.$eval('#most-recent > nav > ul > li:nth-child(6) > a', a => a.textContent);
                nextButtonExist = true;
            } catch (err) {
                nextButtonExist = false;
            }
            if (nextButtonExist) {
                await page.click('#most-recent > nav > ul > li:nth-child(6) > a');
                console.log("page")
                return scrapeCurrentPage(); // Call this function recursively
            }
            await page.close();
            return scrapedData;
        }

        let data = await scrapeCurrentPage();

        // let userDataBase = [User]
        //
        // for (let i = 0; i < data.length; i++){
        //     let curArticle = data[i]['articleTitle'];
        //     let curArticleURL = data[i]['link'];
        //     for (let j=0; j<data[i]['users'].length;j++){
        //         if (userDataBase.indexOf(data[i]['users'][j])===-1){
        //         }
        //     }
        // }
        console.log("DATA")
        console.log(data);
        // for (let i = 0; i < data.length; i++) {
        //     console.log(data[0]['users'])
        // }
        return data;
    }
}

module.exports = ScraperObject;


