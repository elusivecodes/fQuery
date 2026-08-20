/**
 * Install Playwright's browser clock and pause it at a stable fixed time.
 * @param {import('@playwright/test').Page} page The Playwright page.
 * @return {Promise<void>} The promise.
 */
export async function setupClock(page) {
    await page.clock.install({ time: 0 });
    await page.clock.pauseAt(60000);
}

/**
 * Resume the browser clock.
 * @param {import('@playwright/test').Page} page The Playwright page.
 * @return {Promise<void>} The promise.
 */
export async function resumeClock(page) {
    await page.clock.resume();
}

/**
 * Deterministically advance the browser clock, including a one-millisecond
 * margin so a frame on the requested boundary is processed.
 * @param {import('@playwright/test').Page} page The Playwright page.
 * @param {number} milliseconds The duration to advance.
 * @return {Promise<void>} The promise.
 */
export async function advanceClock(page, milliseconds) {
    await page.clock.runFor(milliseconds + 1);
}

/**
 * Reset the browser page to the shared test app and clear any state that a
 * previous test could have left behind.
 * @param {import('@playwright/test').Page} page The Playwright page.
 * @return {Promise<void>} The promise.
 */
export async function resetPage(page) {
    await page.goto('/', {
        waitUntil: 'domcontentloaded',
    });

    const stateReset = await page.evaluate((_) => {
        window.$ = window.fQuery;

        $.setAjaxDefaults({
            xhr: (_) => new window.MockXMLHttpRequest(),
        });
        $.setAnimationDefaults({
            duration: 200,
        });
        $.useTimeout();
        $.setWindow(window);
        $.setContext(document);

        $.removeData(window);
        $.removeData(document);

        $.removeEvent(window);
        $.removeEvent(document);

        $.empty(document.head);
        $.empty(document.body);

        delete window.data;
        window.id = 'window';
        document.id = 'document';
        document.body.style.display = '';

        return window.$ === window.fQuery;
    });

    if (!stateReset) {
        throw new Error('Failed to restore fQuery on the test page.');
    }
}
