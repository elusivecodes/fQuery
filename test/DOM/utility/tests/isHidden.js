import assert from 'node:assert/strict';
import { exec, setStyle } from './../../../setup.js';

describe('#isHidden', function() {
    beforeEach(async function() {
        await setStyle('.test { display: none; }');
        await exec((_) => {
            document.body.innerHTML =
                '<div id="div1" class="test">' +
                '<span></span>' +
                '</div>' +
                '<div id="div2">' +
                '<span></span>' +
                '</div>' +
                '<div id="div3" class="test">' +
                '<span></span>' +
                '</div>' +
                '<div id="div4">' +
                '<span></span>' +
                '</div>';
        });
    });

    it('returns true if any node is hidden', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.isHidden('div'),
            ),
            true,
        );
    });

    it('returns false if no nodes are hidden', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.isHidden('div:not(.test)'),
            ),
            false,
        );
    });

    it('returns true if any node is a descendent of a hidden node', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.isHidden('span'),
            ),
            true,
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.isHidden(
                    document.getElementById('div1'),
                ),
            ),
            true,
        );
    });

    it('works with NodeList nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.isHidden(
                    document.querySelectorAll('div'),
                ),
            ),
            true,
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.isHidden(
                    document.body.children,
                ),
            ),
            true,
        );
    });

    it('works with Document nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                const myDoc = new Document();
                return $.isHidden(myDoc);
            }),
            true,
        );
    });

    it('works with Window nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                const myWindow = {
                    document: {},
                    id: 'window',
                };
                myWindow.document.defaultView = myWindow;
                return $.isHidden(myWindow);
            }),
            true,
        );
    });

    it('works with array nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.isHidden([
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
