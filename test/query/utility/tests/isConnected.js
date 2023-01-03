import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('QuerySet #isConnected', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="div1"></div>' +
                '<div id="div2"></div>' +
                '<div id="div3"></div>' +
                '<div id="div4"></div>';
        });
    });

    it('returns true if any node is connected to the DOM', async function() {
        assert.strictEqual(
            await exec((_) =>
                $('div')
                    .isConnected(),
            ),
            true,
        );
    });

    it('returns false if no nodes are connected to the DOM', async function() {
        assert.strictEqual(
            await exec((_) =>
                $(
                    document.createElement('div'),
                ).isConnected(),
            ),
            false,
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                const fragment = document.createDocumentFragment();
                return $(fragment)
                    .isConnected();
            }),
            false,
        );
    });

    it('works with ShadowRoot nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                const div = document.getElementById('div1');
                const shadow = div.attachShadow({ mode: 'open' });
                return $(shadow)
                    .isConnected();
            }),
            true,
        );
    });
});
