const fs = require('fs');
const http = require('http');
const puppeteer = require('puppeteer');
const port = 3001;

let browser, page;

const dom = fs.readFileSync('./dist/frost-dom-bundle.js');

const server = http.createServer((request, response) => {
    if (request.url === '/') {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(
            '<html id="html">' +
            '<head>' +
            '</head>' +
            '<body id="body">' +
            '<script>' +
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
        args: [
            '--disable-background-timer-throttling',
            '--disable-backgrounding-occluded-windows',
            '--disable-renderer-backgrounding',
            '--no-sandbox'
        ]
    });

    page = await browser.newPage();

    await page.goto('http://localhost:3001', {
        waitUntil: 'domcontentloaded'
    });

    await page.evaluate(_ => {
        AjaxRequest.useMock = true;
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

const exec = async (callback, data) =>
    await page.evaluate(callback, data);

const waitFor = ms => {
    return _ => new Promise(resolve => {
        setTimeout(
            _ => {
                exec(_ => document.body.innerHTML).then(resolve);
            },
            ms
        );
    });
};

module.exports = {
    exec,
    waitFor
};