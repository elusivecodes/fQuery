import { expect, test } from '@playwright/test';
import { resetPage } from '../../../../setup/browser.js';

const bodyMarkup = '<div id="test1" style="background-color: blue; color: white;"></div><div id="test2" style="background-color: blue; color: white;"></div>';

test.beforeEach(async ({ page }) => {
    await resetPage(page);
});

test.describe('QuerySet #removeStyle', () => {
    test.beforeEach(async ({ page }) => {
        await page.evaluate((html) => {
            document.body.innerHTML = html;
        }, bodyMarkup);
    });

    test('sets a style value for all nodes', async ({ page }) => {
        await page.evaluate((_) => {
            $('div').removeStyle('color');
        });

        await expect(page.locator('#test1')).toHaveAttribute('style', 'background-color: blue;');
        await expect(page.locator('#test2')).toHaveAttribute('style', 'background-color: blue;');
    });

    test('returns the QuerySet', async ({ page }) => {
        expect(await page.evaluate((_) => {
            const query = $('div');
            return query === query.removeStyle('color');
        })).toBe(true);
    });
});
