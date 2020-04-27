const fs = require('fs');
const http = require('http');
const puppeteer = require('puppeteer');
const port = 3000;

const server = http.createServer((request, response) => {
    if (request.url === '/') {
        const core = fs.readFileSync('../FrostCore/dist/frost-core.js');
        const dom = fs.readFileSync('./dist/frost-dom.js');
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(
            '<html id="html">' +
            '<head>' +
            '</head>' +
            '<body id="body">' +
            '<script>' +
            core +
            dom +
            '</script>' +
            '</body>' +
            '</html>'
        );
        return;
    }
});

const startServer = _ => {
    return new Promise((resolve, reject) => {
        server.listen(port, (err) => {
            if (err) {
                return reject(err);
            }

            resolve();
        });
    });
};

const closeServer = _ => {
    return new Promise(resolve => {
        server.close(resolve);
    });
};

let browser, page;

before(async function() {
    this.timeout(30000);

    await startServer();

    browser = await puppeteer.launch({
        args: ['--no-sandbox']
    });

    page = await browser.newPage();

    await page.goto('http://localhost:3000', {
        waitUntil: 'domcontentloaded'
    });
});

beforeEach(async function() {
    await page.evaluate(_ => {
        document.body.innerHTML = '';
    });
});

after(async function() {
    this.timeout(30000);

    await browser.close();
    await closeServer();
});

module.exports = async (callback, data) =>
    await page.evaluate(callback, data);