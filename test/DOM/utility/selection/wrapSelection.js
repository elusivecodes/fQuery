const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('#wrapSelection', function() {

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
                dom.wrapSelection(
                    '.outer'
                );
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

    it('works with HTMLElement nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.wrapSelection(
                    document.querySelector('.outer')
                );
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

    it('works with NodeList nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.wrapSelection(
                    document.querySelectorAll('.outer')
                );
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

    it('works with HTMLCollection nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.wrapSelection(
                    document.getElementById('wrapper').children
                );
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

    it('works with DocumentFragment nodes', async function() {
        assert.equal(
            await exec(_ => {
                const range = document.createRange();
                const fragment = range.createContextualFragment(
                    '<div class="div-outer"><div class="div-inner"></div></div>'
                );
                dom.wrapSelection(
                    fragment
                );
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

    it('works with array nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.wrapSelection(
                    [
                        document.querySelector('.outer')
                    ]
                );
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

    it('works with HTML nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.wrapSelection(
                    '<div class="div-outer"><div class="div-inner"></div></div>'
                );
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