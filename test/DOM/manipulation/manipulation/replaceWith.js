const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('#replaceWith', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div class="outer1">' +
                '<div class="inner1">' +
                '<a href="#">Test</a>' +
                '<a href="#">Test</a>' +
                '</div>' +
                '</div>' +
                '<div class="outer2">' +
                '<div class="inner2">' +
                '<a href="#">Test</a>' +
                '<a href="#">Test</a>' +
                '</div>' +
                '</div>';
        });
    });

    it('replaces each node with other nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.replaceWith(
                    'div',
                    'a'
                );
                return document.body.innerHTML;
            }),
            '<a href="#">Test</a>' +
            '<a href="#">Test</a>' +
            '<a href="#">Test</a>' +
            '<a href="#">Test</a>' +
            '<a href="#">Test</a>' +
            '<a href="#">Test</a>' +
            '<a href="#">Test</a>' +
            '<a href="#">Test</a>'
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.replaceWith(
                    document.querySelector('.inner2'),
                    'a'
                );
                return document.body.innerHTML;
            }),
            '<div class="outer1">' +
            '<div class="inner1">' +
            '<a href="#">Test</a>' +
            '<a href="#">Test</a>' +
            '</div>' +
            '</div>' +
            '<div class="outer2">' +
            '<a href="#">Test</a>' +
            '<a href="#">Test</a>' +
            '<a href="#">Test</a>' +
            '<a href="#">Test</a>' +
            '</div>'
        );
    });

    it('works with NodeList nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.replaceWith(
                    document.querySelectorAll('.inner2'),
                    'a'
                );
                return document.body.innerHTML;
            }),
            '<div class="outer1">' +
            '<div class="inner1">' +
            '<a href="#">Test</a>' +
            '<a href="#">Test</a>' +
            '</div>' +
            '</div>' +
            '<div class="outer2">' +
            '<a href="#">Test</a>' +
            '<a href="#">Test</a>' +
            '<a href="#">Test</a>' +
            '<a href="#">Test</a>' +
            '</div>'
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.replaceWith(
                    document.querySelector('.outer2').children,
                    'a'
                );
                return document.body.innerHTML;
            }),
            '<div class="outer1">' +
            '<div class="inner1">' +
            '<a href="#">Test</a>' +
            '<a href="#">Test</a>' +
            '</div>' +
            '</div>' +
            '<div class="outer2">' +
            '<a href="#">Test</a>' +
            '<a href="#">Test</a>' +
            '<a href="#">Test</a>' +
            '<a href="#">Test</a>' +
            '</div>'
        );
    });

    it('works with array nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.replaceWith(
                    [
                        document.querySelector('.inner2')
                    ],
                    'a'
                );
                return document.body.innerHTML;
            }),
            '<div class="outer1">' +
            '<div class="inner1">' +
            '<a href="#">Test</a>' +
            '<a href="#">Test</a>' +
            '</div>' +
            '</div>' +
            '<div class="outer2">' +
            '<a href="#">Test</a>' +
            '<a href="#">Test</a>' +
            '<a href="#">Test</a>' +
            '<a href="#">Test</a>' +
            '</div>'
        );
    });

    it('works with HTMLElement other nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.replaceWith(
                    'div',
                    document.querySelector('.inner1')
                );
                return document.body.innerHTML;
            }),
            '<div class="inner1">' +
            '<a href="#">Test</a>' +
            '<a href="#">Test</a>' +
            '</div>' +
            '<div class="inner1">' +
            '<a href="#">Test</a>' +
            '<a href="#">Test</a>' +
            '</div>'
        );
    });

    it('works with NodeList other nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.replaceWith(
                    'div',
                    document.querySelectorAll('.inner1'),
                );
                return document.body.innerHTML;
            }),
            '<div class="inner1">' +
            '<a href="#">Test</a>' +
            '<a href="#">Test</a>' +
            '</div>' +
            '<div class="inner1">' +
            '<a href="#">Test</a>' +
            '<a href="#">Test</a>' +
            '</div>'
        );
    });

    it('works with HTMLCollection other nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.replaceWith(
                    'div',
                    document.querySelector('.outer1').children
                );
                return document.body.innerHTML;
            }),
            '<div class="inner1">' +
            '<a href="#">Test</a>' +
            '<a href="#">Test</a>' +
            '</div>' +
            '<div class="inner1">' +
            '<a href="#">Test</a>' +
            '<a href="#">Test</a>' +
            '</div>'
        );
    });

    it('works with DocumentFragment other nodes', async function() {
        assert.equal(
            await exec(_ => {
                const range = document.createRange();
                const fragment = range.createContextualFragment(
                    '<div><span></span></div>'
                );
                dom.replaceWith(
                    'a',
                    fragment
                );
                return document.body.innerHTML;
            }),
            '<div class="outer1">' +
            '<div class="inner1">' +
            '<div><span></span></div>' +
            '<div><span></span></div>' +
            '</div>' +
            '</div>' +
            '<div class="outer2">' +
            '<div class="inner2">' +
            '<div><span></span></div>' +
            '<div><span></span></div>' +
            '</div>' +
            '</div>'
        );
    });

    it('works with array other nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.replaceWith(
                    'div',
                    [
                        document.querySelector('.inner1')
                    ]
                );
                return document.body.innerHTML;
            }),
            '<div class="inner1">' +
            '<a href="#">Test</a>' +
            '<a href="#">Test</a>' +
            '</div>' +
            '<div class="inner1">' +
            '<a href="#">Test</a>' +
            '<a href="#">Test</a>' +
            '</div>'
        );
    });

    it('works with HTML other nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.replaceWith(
                    'a',
                    '<div><span class="test">Test</span></div>'
                );
                return document.body.innerHTML;
            }),
            '<div class="outer1">' +
            '<div class="inner1">' +
            '<div><span class="test">Test</span></div>' +
            '<div><span class="test">Test</span></div>' +
            '</div>' +
            '</div>' +
            '<div class="outer2">' +
            '<div class="inner2">' +
            '<div><span class="test">Test</span></div>' +
            '<div><span class="test">Test</span></div>' +
            '</div>' +
            '</div>'
        );
    });

});