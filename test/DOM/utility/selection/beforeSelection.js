import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('#beforeSelection', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="select">' +
                '<div id="div1">' +
                '<span id="span1">Test 1</span>' +
                '</div>' +
                '<div id="div2">' +
                '<span id="span2">Test 2</span>' +
                '</div>' +
                '</div>' +
                '<div id="parent">' +
                '<a href="#" id="a1">Test</a>' +
                '<a href="#" id="a2">Test</a>' +
                '</div>';

            const range = document.createRange();
            const span1 = document.getElementById('span1');
            const span2 = document.getElementById('span2');
            range.setStart(span1.firstChild, 3);
            range.setEndAfter(span2);

            const selection = document.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        });
    });

    it('inserts each node before the selected nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.beforeSelection('a');
                return document.body.innerHTML;
            }),
            '<div id="select">' +
            '<div id="div1">' +
            '<span id="span1">Tes' +
            '<a href="#" id="a1">Test</a>' +
            '<a href="#" id="a2">Test</a>' +
            't 1</span>' +
            '</div>' +
            '<div id="div2">' +
            '<span id="span2">Test 2</span>' +
            '</div>' +
            '</div>' +
            '<div id="parent"></div>',
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.beforeSelection(
                    document.getElementById('a1'),
                );
                return document.body.innerHTML;
            }),
            '<div id="select">' +
            '<div id="div1">' +
            '<span id="span1">Tes' +
            '<a href="#" id="a1">Test</a>' +
            't 1</span>' +
            '</div>' +
            '<div id="div2">' +
            '<span id="span2">Test 2</span>' +
            '</div>' +
            '</div>' +
            '<div id="parent">' +
            '<a href="#" id="a2">Test</a>' +
            '</div>',
        );
    });

    it('works with NodeList nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.beforeSelection(
                    document.querySelectorAll('a'),
                );
                return document.body.innerHTML;
            }),
            '<div id="select">' +
            '<div id="div1">' +
            '<span id="span1">Tes' +
            '<a href="#" id="a1">Test</a>' +
            '<a href="#" id="a2">Test</a>' +
            't 1</span>' +
            '</div>' +
            '<div id="div2">' +
            '<span id="span2">Test 2</span>' +
            '</div>' +
            '</div>' +
            '<div id="parent"></div>',
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.beforeSelection(
                    document.getElementById('parent').children,
                );
                return document.body.innerHTML;
            }),
            '<div id="select">' +
            '<div id="div1">' +
            '<span id="span1">Tes' +
            '<a href="#" id="a1">Test</a>' +
            '<a href="#" id="a2">Test</a>' +
            't 1</span>' +
            '</div>' +
            '<div id="div2">' +
            '<span id="span2">Test 2</span>' +
            '</div>' +
            '</div>' +
            '<div id="parent"></div>',
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                const range = document.createRange();
                const fragment = range.createContextualFragment(
                    '<div><span></span></div>',
                );
                $.beforeSelection(fragment);
                return document.body.innerHTML;
            }),
            '<div id="select">' +
            '<div id="div1">' +
            '<span id="span1">Tes' +
            '<div><span></span></div>' +
            't 1</span>' +
            '</div>' +
            '<div id="div2">' +
            '<span id="span2">Test 2</span>' +
            '</div>' +
            '</div>' +
            '<div id="parent">' +
            '<a href="#" id="a1">Test</a>' +
            '<a href="#" id="a2">Test</a>' +
            '</div>',
        );
    });

    it('works with array nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.beforeSelection([
                    document.getElementById('a1'),
                    document.getElementById('a2'),
                ]);
                return document.body.innerHTML;
            }),
            '<div id="select">' +
            '<div id="div1">' +
            '<span id="span1">Tes' +
            '<a href="#" id="a1">Test</a>' +
            '<a href="#" id="a2">Test</a>' +
            't 1</span>' +
            '</div>' +
            '<div id="div2">' +
            '<span id="span2">Test 2</span>' +
            '</div>' +
            '</div>' +
            '<div id="parent"></div>',
        );
    });

    it('works with HTML nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.beforeSelection('<div><span></span></div>');
                return document.body.innerHTML;
            }),
            '<div id="select">' +
            '<div id="div1">' +
            '<span id="span1">Tes' +
            '<div><span></span></div>' +
            't 1</span>' +
            '</div>' +
            '<div id="div2">' +
            '<span id="span2">Test 2</span>' +
            '</div>' +
            '</div>' +
            '<div id="parent">' +
            '<a href="#" id="a1">Test</a>' +
            '<a href="#" id="a2">Test</a>' +
            '</div>',
        );
    });
});
