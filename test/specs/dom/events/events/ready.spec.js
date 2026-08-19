import { expect, test } from '@playwright/test';
import { resetPage } from '../../../../setup/browser.js';

test.beforeEach(async ({ page }) => {
    await resetPage(page);
});

test.describe('#ready', () => {
    test('executes a callback when ready', async ({ page }) => {
        expect(await page.evaluate((_) => {
            let result;
            $.ready((_) => {
                result = true;
            });
            return result;
        })).toBe(true);
    });
});
