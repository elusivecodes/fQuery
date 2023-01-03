import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('#nearestTo', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="test1" style="display: block; width: 100px; height: 100px; margin: 1050px; padding: 50px;"></div>' +
                '<div id="test2" style="display: block; width: 100px; height: 100px; margin: 1050px; padding: 50px;"></div>';
            window.scrollTo(1000, 1000);
        });
    });

    it('returns the nearest node to a position', async function() {
        assert.strictEqual(
            await exec((_) => {
                const nearest = $.nearestTo('div', 1000, 1000);
                return nearest.id;
            }),
            'test2',
        );
    });

    it('returns the nearest node to a position with offset', async function() {
        assert.strictEqual(
            await exec((_) => {
                const nearest = $.nearestTo('div', 1000, 1000, { offset: true });
                return nearest.id;
            }),
            'test1',
        );
    });

    it('returns undefined for empty nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.nearestTo('#invalid', 1000, 1000),
            ),
            undefined,
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                const nearest = $.nearestTo(
                    document.getElementById('test1'),
                    1000,
                    1000,
                );
                return nearest.id;
            }),
            'test1',
        );
    });

    it('works with NodeList nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                const nearest = $.nearestTo(
                    document.querySelectorAll('div'),
                    1000,
                    1000,
                );
                return nearest.id;
            }),
            'test2',
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                const nearest = $.nearestTo(
                    document.body.children,
                    1000,
                    1000,
                );
                return nearest.id;
            }),
            'test2',
        );
    });

    it('works with array nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                const nearest = $.nearestTo([
                    document.getElementById('test1'),
                    document.getElementById('test2'),
                ], 1000, 1000);
                return nearest.id;
            }),
            'test2',
        );
    });
});
