import { expect, test } from '@playwright/test';
import { resetPage } from '../../../setup/browser.js';
import { expectAnimation, expectNoAnimation } from '../../../support/assertions/animation.js';
import { easeInOut } from '../../../support/utils/animation.js';

test.beforeEach(async ({ page }) => {
    await resetPage(page);
});

test.describe('QuerySet #stop', () => {
    test.beforeEach(async ({ page }) => {
        await page.evaluate((_) => {
            document.body.innerHTML =
                '<div id="test1"></div>' +
                '<div id="test2" class="animate"></div>' +
                '<div id="test3"></div>' +
                '<div id="test4" class="animate"></div>';
        });
    });

    test('stops animations on all nodes', async ({ page }) => {
        await page.evaluate((_) => {
            $.animate(
                '.animate',
                (_) => { },
                {
                    duration: 100,
                    debug: true,
                },
            );
        });
        await page.waitForTimeout(25);
        await page.evaluate((_) => {
            $('.animate')
                    .stop();
        });
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test2');
        await expectNoAnimation(page, '#test3');
        await expectNoAnimation(page, '#test4');
    });

    test('stops animations on all nodes (without finishing)', async ({ page }) => {
        await page.evaluate((_) => {
            $.animate(
                '.animate',
                (_) => { },
                {
                    duration: 100,
                    debug: true,
                },
            );
        });
        await page.waitForTimeout(25);
        const testHtml = await page.evaluate((_) => {
            $('.animate')
                    .stop({ finish: false });
            return document.body.innerHTML;
        });
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectAnimation(page, '#test2', easeInOut, 100);
        await expectAnimation(page, '#test4', easeInOut, 100);
        await page.waitForTimeout(25);
        const html = await page.evaluate((_) => document.body.innerHTML);
        expect(html).toBe(testHtml);
    });

    test('returns the QuerySet', async ({ page }) => {
        expect(await page.evaluate((_) => {
            const query = $('.animate');
            return query === query.stop();
        })).toBe(true);
    });
});
