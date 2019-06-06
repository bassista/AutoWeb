const launchChrome = require("@serverless-chrome/lambda");
const CDP = require("chrome-remote-interface");
const puppeteer = require("puppeteer");

exports.lambdaHandler = async (event, context) => {
    let slsChrome;
    let browser;
    let page;
    let navigationPromise;
    let userName = 'w_enslin';
    let passWord = '$NMyhhBacy07';

    try {

        slsChrome = await launchChrome();
        browser = await puppeteer.connect({
            //https://github.com/cyrus-and/chrome-remote-interface#cdpversionoptions-callback
            // fetch the browser version (since Chrome 62 the browser target URL is
            // generated at runtime and can be obtained via the '/json/version'
            // endpoint,
            //https://pptr.dev/#?product=Puppeteer&version=v1.17.0&show=api-browserwsendpoint
            //https://chromedevtools.github.io/devtools-protocol/#how-do-i-access-the-browser-target
            browserWSEndpoint: (await CDP.Version()).webSocketDebuggerUrl,


        });
        page = await browser.newPage();
        //await page.goto("https://www.fieldglass.net",{waitUntil:'networkidle2'});
        await page.goto("https://www.example.com");

        //console.log("content:"+(await resp.text()));
        
        //await page.evaluate(()=>console.log(document.querySelector('input')));
        await page.setViewport({ width: 1920, height: 1001 })
        let s = await page.waitForXPath('/html/body/div/p[2]/a');
        console.log((await page.content()));
        /*await page.click('#usernameId_new');

        //await page.waitForSelector('#usernameId_new');
        await page.click('#usernameId_new');
        await page.type('#usernameId_new', userName);

        //await page.waitForSelector('form > #content_area_new > #primary_content #passwordId_new')
        await page.click('form > #content_area_new > #primary_content #passwordId_new')
        await page.type('form > #content_area_new > #primary_content #passwordId_new', passWord);

        //await page.waitForSelector('form > #content_area_new > #primary_content > .entryLoginInput_button > .formLoginButton_new')
        await page.click('form > #content_area_new > #primary_content > .entryLoginInput_button > .formLoginButton_new')

        //await page.waitForSelector('#menuBarId > #viewMenuTitle > figure > a > .anchorText')
        await page.click('#menuBarId > #viewMenuTitle > figure > a > .anchorText')

        //await page.waitForSelector('.column #viewMenu_3_timeSheets_link')
        await page.click('.column #viewMenu_3_timeSheets_link')

        //await browser.close()*/

    } catch (err) {
        console.log(err);
        return err;
    } finally {
        /*if (page) {
            await page.close();
        }

        if (browser) {
            await browser.disconnect();
        }

        if (slsChrome) {
            await slsChrome.kill();
        }*/
    }
};