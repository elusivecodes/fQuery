const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('QuerySetImmutable #wrapSelection', function() {

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
                '<div id="wrapper">' +
                '<div class="outer">' +
                '<div class="inner"></div>' +
                '</div>' +
                '</div>';

            const range = document.createRange();
            const span1 = document.getElementById('span1');
            const span2 = document.getElementById('span2');
            range.setStart(span1.firstChild, 3);
            range.setEnd(span2.firstChild, 3);

            const selection = document.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        });
    });

    it('wraps selected nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.query('.outer')
                    .wrapSelection();
                return document.body.innerHTML;
            }),
            '<div id="select">' +
            '<div id="div1">' +
            '<span id="span1">Tes</span>' +
            '</div>' +
            '<div class="outer">' +
            '<div class="inner">' +
            '<div id="div1">' +
            '<span id="span1">t 1</span>' +
            '</div>' +
            '<div id="div2">' +
            '<span id="span2">Tes</span>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div id="div2">' +
            '<span id="span2">t 2</span>' +
            '</div>' +
            '</div>' +
            '<div id="wrapper">' +
            '</div>'
        )
    });

    it('returns the QuerySet', async function() {
        assert.equal(
            await exec(_ => {
                const query = dom.query('.outer');
                return query === query.wrapSelection();
            }),
            true
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.equal(
            await exec(_ => {
                const range = document.createRange();
                const fragment = range.createContextualFragment(
                    '<div class="div-outer"><div class="div-inner"></div></div>'
                );
                dom.query(fragment)
                    .wrapSelection();
                return document.body.innerHTML;
            }),
            '<div id="select">' +
            '<div id="div1">' +
            '<span id="span1">Tes</span>' +
            '</div>' +
            '<div class="div-outer">' +
            '<div class="div-inner">' +
            '<div id="div1">' +
            '<span id="span1">t 1</span>' +
            '</div>' +
            '<div id="div2">' +
            '<span id="span2">Tes</span>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div id="div2">' +
            '<span id="span2">t 2</span>' +
            '</div>' +
            '</div>' +
            '<div id="wrapper">' +
            '<div class="outer">' +
            '<div class="inner">' +
            '</div>' +
            '</div>' +
            '</div>'
        )
    });

});