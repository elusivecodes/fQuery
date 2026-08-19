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
