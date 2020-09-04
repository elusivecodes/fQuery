const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('QuerySet #beforeSelection', function() {

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
            range.setStart(span1.firstChild, 3);
            range.setEndAfter(span2);

            const selection = document.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        });
    });

    it('inserts each node before the selected nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.queryMutable('a')
                    .beforeSelection();
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
            '<div id="parent"></div>'
        );
    });

    it('returns the QuerySet', async function() {
        assert.equal(
            await exec(_ => {
                const query = dom.queryMutable('a');
                return query === query.beforeSelection();
            }),
            true
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.equal(
            await exec(_ => {
                const range = document.createRange();
                const fragment = range.createContextualFragment(
                    '<div><span></span></div>'
                );
                dom.queryMutable(fragment)
                    .beforeSelection();
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
            '</div>'
        );
    });

});