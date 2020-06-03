const fs = require('fs');
const http = require('http');
const puppeteer = require('puppeteer');
const port = 3001;

let browser, page;

const core = fs.readFileSync('../FrostCore/dist/frost-core.js');
const dom = fs.readFileSync('./dist/frost-dom.js');

const server = http.createServer((request, response) => {
    if (request.url === '/') {
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

before(async function() {
    this.timeout(30000);

    await startServer();

    browser = await puppeteer.launch({
        args: ['--no-sandbox']
    });

    page = await browser.newPage();

    await page.goto('http://localhost:3001', {
        waitUntil: 'domcontentloaded'
    });
});

beforeEach(async function() {
    await page.evaluate(_ => {
        dom.removeData(window);
        dom.removeData(document);

        dom.removeEvent(window);
        dom.removeEvent(document);

        window.data = {};
        window.id = 'window';
        document.id = 'document';
        document.body.innerHTML = '';
    });
});

after(async function() {
    this.timeout(30000);

    await browser.close();
    await closeServer();
});

module.exports.exec = async (callback, data) =>
    await page.evaluate(callback, data);

module.exports.waitFor = ms => {
    return _ => new Promise(resolve => {
        setTimeout(
            _ => {
                exec(_ => document.body.innerHTML).then(resolve);
            },
            ms
        );
    });
};