import { expect, test } from '@playwright/test';
import { resetPage } from '../../../setup/browser.js';

test.beforeEach(async ({ page }) => {
    await resetPage(page);
});

test.describe('#getCookie', () => {
    test('returns a cookie value', async ({ page }) => {
        expect(await page.evaluate((_) => {
            const myDoc = {
                cookie: 'test=Test',
                nodeType: Node.DOCUMENT_NODE,
            };
            $.setContext(myDoc);
            return $.getCookie('test');
        })).toBe('Test');
    });

    test('returns a cookie value from multiple cookie values', async ({ page }) => {
        expect(await page.evaluate((_) => {
            const myDoc = {
                cookie: 'test1=Test 1;test2=Test 2;test3=Test 3',
                nodeType: Node.DOCUMENT_NODE,
            };
            $.setContext(myDoc);
            return [
                $.getCookie('test1'),
                $.getCookie('test2'),
                $.getCookie('test3'),
            ];
        })).toEqual([
            'Test 1',
            'Test 2',
            'Test 3',
        ]);
    });
});
