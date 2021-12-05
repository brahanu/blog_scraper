const pageScraper = require('./pageScraper.ts');
const fs = require('fs');
async function scrapeAll(browserInstance){
    let browser;
    try{
        browser = await browserInstance;
        const data = await pageScraper.scraper(browser);
        fs.writeFile("data2.json",JSON.stringify(data),function(err){
            if (err) throw err;
            console.log(data.length);
            console.log('complete');
        });
    }
    catch(err){
        console.log("Could not resolve the browser instance => ", err);
    }
}

module.exports = (browserInstance) => scrapeAll(browserInstance)