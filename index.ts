const browserObject = require('./browser.ts');
const scraperController = require('./pageController.ts');
let browserInstance = browserObject.startBrowser();

scraperController(browserInstance)
