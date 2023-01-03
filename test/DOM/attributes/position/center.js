import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('#center', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="test1" style="display: block; width: 100px; height: 100px; margin: 1050px; padding: 50px;"></div>' +
                '<div id="test2"></div>';
            window.scrollTo(1000, 1000);
        });
    });

    it('returns the center position of the first node', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $.center('div'),
            ),
            {
                x: 700,
                y: 150,
            },
        );
    });

    it('returns the center position of the first node with offset', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $.center('div', { offset: true }),
            ),
            {
                x: 1158,
                y: 1150,
            },
        );
    });

    it('returns undefined for empty nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.center('#invalid'),
            ),
            undefined,
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $.center(
                    document.getElementById('test1'),
                ),
            ),
            {
                x: 700,
                y: 150,
            },
        );
    });

    it('works with NodeList nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $.center(
                    document.querySelectorAll('div'),
                ),
            ),
            {
                x: 700,
                y: 150,
            },
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $.center(
                    document.body.children,
                ),
            ),
            {
                x: 700,
                y: 150,
            },
        );
    });

    it('works with array nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $.center([
                    document.getElementById('test1'),
                    document.getElementById('test2'),
                ]),
            ),
            {
                x: 700,
                y: 150,
            },
        );
    });
});
