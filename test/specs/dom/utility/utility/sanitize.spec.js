import { expect, test } from '@playwright/test';
import { resetPage } from '../../../../setup/browser.js';

test.beforeEach(async ({ page }) => {
    await resetPage(page);
});

test.describe('#sanitize', () => {
    test('returns a sanitized HTML string', async ({ page }) => {
        expect(await page.evaluate((_) =>
            $.sanitize(
                '<script>' +
                    'window.alert(123);' +
                    '</script>' +
                    '<div class="div">' +
                    '<a href="#" title="Test 1" target="_blank" rel="nofollow" onclick="window.alert(123)">Test</a>' +
                    '</div>',
            ))).toBe('<div class="div">' +
            '<a href="#" title="Test 1" target="_blank" rel="nofollow">Test</a>' +
            '</div>');
    });

    test('sanitizes a HTML string with allowed tags', async ({ page }) => {
        expect(await page.evaluate((_) =>
            $.sanitize(
                '<div id="div" class="test">' +
                    '<span id="span" class="test">Test</span>' +
                    '<a href="#" title="Test 1">Test</a>' +
                    '</div>',
                {
                    div: [],
                },
            ))).toBe('<div></div>');
    });

    test('sanitizes a HTML string with allowed attributes', async ({ page }) => {
        expect(await page.evaluate((_) =>
            $.sanitize(
                '<div id="div" class="test">' +
                    '<span id="span" class="test">Test</span>' +
                    '<a href="#" title="Test 1">Test</a>' +
                    '</div>',
                {
                    div: ['class', 'id'],
                    span: [],
                },
            ))).toBe('<div id="div" class="test">' +
            '<span>Test</span>' +
            '</div>');
    });

    test('sanitizes a HTML string with allowed wildcard attributes', async ({ page }) => {
        expect(await page.evaluate((_) =>
            $.sanitize(
                '<div id="div" class="test">' +
                    '<span id="span" class="test">Test</span>' +
                    '<a href="#" title="Test 1">Test</a>' +
                    '</div>',
                {
                    '*': ['class', 'id'],
                    'div': [],
                    'span': [],
                },
            ))).toBe('<div id="div" class="test">' +
            '<span id="span" class="test">Test</span>' +
            '</div>');
    });
});
