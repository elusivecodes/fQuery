import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('#hasAnimation', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="div1" class="test"></div>' +
                '<div id="div2"></div>' +
                '<div id="div3" class="test"></div>' +
                '<div id="div4"></div>';
            $.fadeIn(
                '.test',
            );
        });
    });

    it('returns true if any node has an animation', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.hasAnimation('div'),
            ),
            true,
        );
    });

    it('returns false if no nodes have an animation', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.hasAnimation('div:not(.test)'),
            ),
            false,
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.hasAnimation(
                    document.getElementById('div1'),
                ),
            ),
            true,
        );
    });

    it('works with NodeList nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.hasAnimation(
                    document.querySelectorAll('div'),
                ),
            ),
            true,
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.hasAnimation(
                    document.body.children,
                ),
            ),
            true,
        );
    });

    it('works with array nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.hasAnimation([
                    document.getElementById('div1'),
                    document.getElementById('div2'),
                    document.getElementById('div3'),
                    document.getElementById('div4'),
                ]),
            ),
            true,
        );
    });
});
