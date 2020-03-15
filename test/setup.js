const fs = require('fs');
const puppeteer = require('puppeteer');

let browser;
let page;

before(async function() {
    browser = await puppeteer.launch({
        args: ['--no-sandbox']
    });

    page = await browser.newPage();

    await page.evaluate(data => {
        eval(data.coreSrc);
        eval(data.domSrc);
    }, {
        coreSrc: await fs.readFileSync('../FrostCore/dist/frost-core.js', 'utf8'),
        domSrc: await fs.readFileSync('./dist/frost-dom.js', 'utf8')
    });
});

beforeEach(async function() {
    await page.setContent(
        '<html>' +
        '<head>' +
        '<meta charset="UTF-8">' +
        '<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
        '<meta http-equiv="X-UA-Compatible" content="ie=edge">' +
        '</head>' +
        '<body>' +
        '</body>' +
        '</html>'
    );
});

after(async function() {
    await page.close();
    await browser.close();
});

module.exports = async (callback, data) =>
    await page.evaluate(callback, data);