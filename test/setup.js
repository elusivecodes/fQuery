const puppeteer = require('puppeteer');
const assert = require('assert');
const server = require('../server/server.js');
const port = 3001;

let browser, page;

before(async function() {
    this.timeout(30000);

    await server.start(port);

    browser = await puppeteer.launch({
        args: [
            '--disable-gpu',
            '--disable-dev-shm-usage',
            '--disable-setuid-sandbox',
            '--no-first-run',
            '--no-sandbox',
            '--no-zygote',
            '--single-process'
        ]
    });

    page = await browser.newPage();

    await page.goto('http://localhost:3001', {
        waitUntil: 'domcontentloaded'
    });

    assert.strictEqual(
        await page.evaluate(_ => {
            return AjaxRequest.useMock;
        }),
        false
    );

    assert.strictEqual(
        await page.evaluate(_ => {
            return Animation.useTimeout;
        }),
        false
    );

    assert.strictEqual(
        await page.evaluate(_ => {
            return Animation.defaults.duration;
        }),
        1000
    );

    await page.evaluate(_ => {
        AjaxRequest.useMock = true;
        Animation.useTimeout = true;
        Animation.defaults.duration = 200;
    });
});

beforeEach(async function() {
    this.timeout(30000);

    await page.evaluate(_ => {
        dom.removeData(window);
        dom.removeData(document);

        dom.removeEvent(window);
        dom.removeEvent(document);

        delete window.data;
        window.id = 'window';
        document.id = 'document';
        document.head.innerHTML = '';
        document.body.innerHTML = '';
        document.body.style.display = '';
    });
});

after(async function() {
    this.timeout(30000);

    await page.close();
    await browser.close();
    await server.close();
});

const exec = async (callback, data) =>
    await page.evaluate(callback, data);

const setStyle = async (style = '') =>
    await exec(style => {
        const element = document.createElement('style');
        element.textContent = style;
        document.head.appendChild(element);
    }, style);

module.exports = {
    exec,
    setStyle
};