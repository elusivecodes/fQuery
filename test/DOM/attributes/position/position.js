import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('#position', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="parent" style="position: relative; margin: 1050px; padding: 25px 50px;">' +
                '<div id="test1" data-toggle="child" style="display: block; width: 100px; height: 100px; padding: 50px;"></div>' +
                '<div id="test2" data-toggle="child"></div>';
            window.scrollTo(1000, 1000);
        });
    });

    it('returns the position of the first node', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $.position('[data-toggle="child"]'),
            ),
            {
                x: 50,
                y: 25,
            },
        );
    });

    it('returns the position of the first node with offset', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $.position('[data-toggle="child"]', { offset: true }),
            ),
            {
                x: 1108,
                y: 1075,
            },
        );
    });

    it('returns undefined for empty nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.position('#invalid'),
            ),
            undefined,
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $.position(
                    document.getElementById('test1'),
                ),
            ),
            {
                x: 50,
                y: 25,
            },
        );
    });

    it('works with NodeList nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $.position(
                    document.querySelectorAll('[data-toggle="child"]'),
                ),
            ),
            {
                x: 50,
                y: 25,
            },
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $.position(
                    document.getElementById('parent').children,
                ),
            ),
            {
                x: 50,
                y: 25,
            },
        );
    });

    it('works with array nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $.position([
                    document.getElementById('test1'),
                    document.getElementById('test2'),
                ]),
            ),
            {
                x: 50,
                y: 25,
            },
        );
    });
});
