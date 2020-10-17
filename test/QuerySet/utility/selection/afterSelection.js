const assert = require('assert');
const { exec } = require('../../../setup');

describe('QuerySet #afterSelection', function() {

    beforeEach(async function() {
        await exec(_ => {
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
            range.setStartBefore(span1);
            range.setEnd(span2.firstChild, 3);

            const selection = document.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        });
    });

    it('inserts each node after the selected nodes', async function() {
        assert.strictEqual(
            await exec(_ => {
                dom.queryMutable('a')
                    .afterSelection();
                return document.body.innerHTML;
            }),
            '<div id="select">' +
            '<div id="div1">' +
            '<span id="span1">Test 1</span>' +
            '</div>' +
            '<div id="div2">' +
            '<span id="span2">Tes' +
            '<a href="#" id="a1">Test</a>' +
            '<a href="#" id="a2">Test</a>' +
            't 2</span>' +
            '</div>' +
            '</div>' +
            '<div id="parent"></div>'
        );
    });

    it('returns the QuerySet', async function() {
        assert.strictEqual(
            await exec(_ => {
                const query = dom.queryMutable('a');
                return query === query.afterSelection();
            }),
            true
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.strictEqual(
            await exec(_ => {
                const range = document.createRange();
                const fragment = range.createContextualFragment(
                    '<div><span></span></div>'
                );
                dom.queryMutable(fragment)
                    .afterSelection();
                return document.body.innerHTML;
            }),
            '<div id="select">' +
            '<div id="div1">' +
            '<span id="span1">Test 1</span>' +
            '</div>' +
            '<div id="div2">' +
            '<span id="span2">Tes' +
            '<div><span></span></div>' +
            't 2</span>' +
            '</div>' +
            '</div>' +
            '<div id="parent">' +
            '<a href="#" id="a1">Test</a>' +
            '<a href="#" id="a2">Test</a>' +
            '</div>'
        );
    });

});