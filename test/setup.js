import assert from 'node:assert/strict';
import puppeteer from 'puppeteer';
import * as server from './../server/server.js';

const port = 3001;

let browser;
let page;

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
            '--single-process',
        ],
    });

    page = await browser.newPage();

    await page.goto('http://localhost:3001', {
        waitUntil: 'domcontentloaded',
    });

    await page.evaluate((_) => {
        $.setAjaxDefaults({
            xhr: (_) => new MockXMLHttpRequest(),
        });
        $.setAnimationDefaults({
            duration: 200,
        });
        $.useTimeout();
    });

    assert.strictEqual(
        await page.evaluate((_) => {
            if (window.$ !== window.fQuery) {
                return false;
            }

            $.noConflict();

            if (window.$ === window.fQuery) {
                return false;
            }

            window.$ = window.fQuery;

            return true;
        }),
        true,
    );
});

beforeEach(async function() {
    this.timeout(30000);

    await page.evaluate((_) => {
        $.setWindow(window);
        $.setContext(document);

        $.removeData(window);
        $.removeData(document);

        $.removeEvent(window);
        $.removeEvent(document);

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

/**
 * Execute a callback in the document.
 * @param {function} callback The callback to execute.
 * @param {array} [data] The data to provide to the callback.
 * @return {Promise} The promise.
 */
export async function exec(callback, data) {
    return await page.evaluate(callback, data);
};

/**
 * Add a stylesheet to the document.
 * @param {string} style The stylesheet.
 * @return {Promise} The promise.
 */
export async function setStyle(style = '') {
    return await exec((style) => {
        const element = document.createElement('style');
        element.textContent = style;
        document.head.appendChild(element);
    }, style);
};
