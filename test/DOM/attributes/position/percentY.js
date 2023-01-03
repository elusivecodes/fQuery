import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('#percentY', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="test1" style="display: block; width: 100px; height: 100px; margin: 1050px; padding: 50px;"></div>' +
                '<div id="test2"></div>';
            window.scrollTo(1000, 1000);
        });
    });

    it('returns the percent of a position along the Y-axis for the first node', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.percentY('div', 150),
            ),
            50,
        );
    });

    it('returns the percent of a position along the Y-axis for the first node with offset', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.percentY('div', 1150, { offset: true }),
            ),
            50,
        );
    });

    it('clamps the returned value between 0 and 100', async function() {
        assert.deepStrictEqual(
            await exec((_) => [
                $.percentY('div', 0),
                $.percentY('div', 2000),
            ]),
            [
                0,
                100,
            ],
        );
    });

    it('returns undefined for empty nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.percentY('#invalid', 150),
            ),
            undefined,
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.percentY(
                    document.getElementById('test1'),
                    150,
                ),
            ),
            50,
        );
    });

    it('works with NodeList nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.percentY(
                    document.querySelectorAll('div'),
                    150,
                ),
            ),
            50,
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.percentY(
                    document.body.children,
                    150,
                ),
            ),
            50,
        );
    });

    it('works with array nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.percentY([
                    document.getElementById('test1'),
                    document.getElementById('test2'),
                ], 150),
            ),
            50,
        );
    });
});
